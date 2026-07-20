/**
 * API route for chatbot with RAG
 * Integrates OpenAI for embeddings and chat completion with intent routing
 */

import { NextRequest, NextResponse } from 'next/server';
import { routeIntent, INTENT_TYPES, getFallbackResponse } from '../../utils/intent.js';
import { kbToPassages } from '../../utils/knowledgeBase.js';

// Constants
const EMBEDDING_MODEL = "text-embedding-3-small";
const CHAT_MODEL = "gpt-4o-mini";
const INDEX_INIT_DELAY = 1000;

let OpenAI;
try {
  OpenAI = require('openai').default;
} catch (error) {
  console.warn('OpenAI package not found. Install with: npm install openai');
}

// In-memory vector store (fine for small KB, use a real vector DB for production)
let vectors = null;
let passages = [];
let openai = null;
let indexInitialized = false;
let initializationPromise = null;

function initOpenAI() {
  if (!OpenAI || !process.env.OPENAI_API_KEY) {
    return null;
  }
  
  if (!openai) {
    openai = new OpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });
  }
  
  return openai;
}

/**
 * Ensure embeddings index is built (optimized to run only once)
 */
async function ensureIndex() {
  // Return immediately if already initialized or OpenAI not available
  if (indexInitialized || !initOpenAI()) {
    return;
  }
  
  // If initialization is already in progress, wait for it
  if (initializationPromise) {
    return initializationPromise;
  }
  
  // Start initialization
  console.log('Building embeddings index...');
  initializationPromise = (async () => {
    try {
      passages = kbToPassages();
      console.log(`Creating embeddings for ${passages.length} passages...`);
      
      const response = await openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: passages
      });
      
      vectors = response.data.map(d => d.embedding);
      indexInitialized = true;
      console.log(`Embeddings index built successfully with ${passages.length} passages`);
    } catch (error) {
      console.error('Failed to create embeddings:', error);
      vectors = null;
      indexInitialized = false;
      initializationPromise = null;
      throw error;
    }
  })();
  
  return initializationPromise;
}

/**
 * Calculate cosine similarity between two vectors (optimized)
 */
function cosine(a, b) {
  let dotProduct = 0, normA = 0, normB = 0;
  
  for (let i = 0, len = a.length; i < len; i++) {
    const ai = a[i], bi = b[i];
    dotProduct += ai * bi;
    normA += ai * ai;
    normB += bi * bi;
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Retrieve relevant passages for a query (optimized)
 */
async function retrievePassages(query, topK = 5) {
  if (!indexInitialized || !vectors || !openai) {
    console.log('Index not ready for retrieval');
    return [];
  }
  
  try {
    const { data } = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: query
    });
    
    const qEmb = data[0].embedding;
    
    return vectors
      .map((v, i) => ({ index: i, score: cosine(v, qEmb) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(({ index }) => passages[index]);
      
  } catch (error) {
    console.error('Failed to retrieve passages:', error);
    return [];
  }
}

/**
 * Intent-based parameter mapping for RAG optimization
 */
const INTENT_PARAMETERS = {
  [INTENT_TYPES.PROJECTS]: { topK: 12, maxTokens: 1200 }, // All project passages
  [INTENT_TYPES.SKILLS]: { topK: 6, maxTokens: 700 }, // Multiple skill categories
  [INTENT_TYPES.ABOUT]: { topK: 5, maxTokens: 600 }, // Comprehensive but focused
  [INTENT_TYPES.EXPERIENCE]: { topK: 5, maxTokens: 600 }, // Comprehensive but focused
  [INTENT_TYPES.GREETING]: { topK: 3, maxTokens: 400 }, // Brief and welcoming
  [INTENT_TYPES.CONTACT]: { topK: 4, maxTokens: 500 }, // Moderate detail
  [INTENT_TYPES.FUN]: { topK: 4, maxTokens: 500 }, // Moderate detail
};

/**
 * Get dynamic parameters based on intent
 */
function getDynamicParameters(intent) {
  return INTENT_PARAMETERS[intent] || { topK: 5, maxTokens: 600 };
}

/**
 * Build the system prompt shared by streaming and non-streaming paths.
 */
function buildSystemPrompt(relevantPassages) {
  return `You are Brian Seo having a friendly conversation about yourself.

IMPORTANT: You should answer questions about Brian in ANY language and respond to ALL types of greetings warmly.

Guidelines:
1. Answer questions about Brian's personal info, projects, skills, experience, education, portfolio
2. Respond to greetings in ANY language (English, Spanish, French, German, Japanese, Korean, etc.)
3. Handle casual greetings like "hey man!", "heyy", "sup", "what's up"
4. If a question is clearly unrelated to Brian (e.g., general trivia, other people, unrelated topics), politely redirect with: "That seems like it's not related to me or my portfolio! I'm here to chat about my projects, skills, experiences, education, or anything else you'd like to know about me personally. What would you like to know about my work?"

Answer naturally in first person using the context below.
Be concise, warm, enthusiastic, and conversational.

Format every response as clean GitHub-Flavored Markdown (it is rendered as rich text):
- Keep paragraphs short; separate distinct ideas with a blank line. Do not pad with blank lines when a single sentence answers the question.
- Use **bold** for key labels and headings (e.g. **Tech Stack**, project names).
- Use ordered lists (1. 2. 3.) for sequences and unordered lists (- ) for grouped items.
- When listing a project's or skill set's technologies, group them by field on their own bullet lines with a bold label, e.g.:
  - **Frontend:** React.js, Next.js, TypeScript, Tailwind CSS
  - **Backend:** Python, Java, FastAPI, Node.js
  - **Database:** MongoDB, MySQL, PostgreSQL
  - **DevOps:** Docker, Kubernetes, AWS, Vercel
  Analyze each project's/skill's actual stack and only include the fields that apply.
- Prefer readability over density. Never emit a wall of text.

Context: ${relevantPassages.join(' | ')}`;
}

/**
 * Stream an OpenAI chat completion, invoking onToken for each content delta.
 * Stops early if `isClosed()` reports the consumer has gone away.
 * Returns true if at least one token was emitted.
 */
async function streamResponse(message, relevantPassages, maxTokens, onToken, isClosed) {
  const systemPrompt = buildSystemPrompt(relevantPassages);

  const completion = await openai.chat.completions.create({
    model: CHAT_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ],
    temperature: 0.3,
    max_tokens: maxTokens,
    stream: true
  });

  let emitted = false;
  for await (const chunk of completion) {
    if (isClosed && isClosed()) break;
    const token = chunk.choices?.[0]?.delta?.content || '';
    if (token) {
      emitted = true;
      onToken(token);
    }
  }
  return emitted;
}

/**
 * Stream the chatbot response as Server-Sent Events.
 * Emits `{ token }` events for each content delta and a final `{ done: true }`.
 * Falls back to a single-chunk canned reply when OpenAI is unavailable.
 */
async function streamChatbotResponse(message, intent, onToken, isClosed) {
  // If OpenAI isn't configured, stream the canned fallback as one chunk.
  if (!initOpenAI()) {
    onToken(getFallbackResponse(intent));
    return;
  }

  try {
    await ensureIndex();

    if (indexInitialized) {
      const { topK, maxTokens } = getDynamicParameters(intent);
      const relevantPassages = await retrievePassages(message, topK);
      const emitted = await streamResponse(message, relevantPassages, maxTokens, onToken, isClosed);
      if (emitted) return;
    }
  } catch (error) {
    console.error('Error in OpenAI processing:', error);
  }

  // Nothing streamed (index not ready or API error). Only send the fallback if
  // the consumer is still connected — otherwise enqueuing would throw.
  if (!isClosed || !isClosed()) {
    onToken(getFallbackResponse(intent));
  }
}

/**
 * Main API route handler — returns a streaming Server-Sent Events response.
 */
export async function POST(request) {
  let message;
  try {
    ({ message } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const intent = routeIntent(message);
  const encoder = new TextEncoder();

  // `closed` guards every enqueue: once the consumer disconnects (or we close
  // the stream ourselves) further writes are silently dropped instead of
  // throwing ERR_INVALID_STATE from the underlying controller.
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (payload) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        } catch {
          // Controller was closed out from under us — stop writing.
          closed = true;
        }
      };

      try {
        // Announce intent up front so the client can label the message if needed.
        send({ intent });
        await streamChatbotResponse(message, intent, (token) => send({ token }), () => closed);
      } catch (error) {
        console.error('Chat API stream error:', error);
        send({ token: getFallbackResponse(intent) });
      } finally {
        send({ done: true });
        if (!closed) {
          closed = true;
          try { controller.close(); } catch { /* already closed */ }
        }
      }
    },
    cancel() {
      // Consumer went away (navigation, refresh, abort) — halt the OpenAI pull.
      closed = true;
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no'
    }
  });
}

/**
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    openai_configured: !!process.env.OPENAI_API_KEY,
    index_initialized: indexInitialized,
    passages_indexed: indexInitialized ? passages.length : 0,
    vectors_ready: !!vectors
  });
}

// Initialize embeddings on server startup (for better first-request performance)
if (typeof window === 'undefined' && process.env.OPENAI_API_KEY) {
  // Only run on server-side and if OpenAI is configured
  setTimeout(() => {
    ensureIndex().catch(error => {
      console.log('Background index initialization failed:', error.message);
    });
  }, INDEX_INIT_DELAY);
}
