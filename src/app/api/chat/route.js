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
      console.log(`✅ Embeddings index built successfully with ${passages.length} passages`);
    } catch (error) {
      console.error('❌ Failed to create embeddings:', error);
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
 * Generate response using OpenAI chat completion with intelligent relevance detection
 */
async function generateResponse(message, intent, relevantPassages, maxTokens) {
  const systemPrompt = `You are Brian Seo having a friendly conversation about yourself. 

IMPORTANT: You should answer questions about Brian in ANY language and respond to ALL types of greetings warmly.

Guidelines:
1. Answer questions about Brian's personal info, projects, skills, experience, education, portfolio
2. Respond to greetings in ANY language (English, Spanish, French, German, Japanese, Korean, etc.)
3. Handle casual greetings like "hey man!", "heyy", "sup", "what's up"
4. If a question is clearly unrelated to Brian (e.g., general trivia, other people, unrelated topics), politely redirect with: "That seems like it's not related to me or my portfolio! I'm here to chat about my projects, skills, experiences, education, or anything else you'd like to know about me personally. What would you like to know about my work?"

Answer naturally in first person using the context below. 
Be concise, warm, enthusiastic, and conversational. 

Always format your responses for readability:
- Use short paragraphs separated by blank lines when necessary. if it is not necessary, don't add blank lines.
- Add line breaks instead of long walls of text only when it's necessary. if it is not necessary, don't add line breaks.
- Use bullet points or numbered lists when listing multiple items
- Keep a friendly tone but prioritize clarity
- If skills or projects are mentioned, differentiate the tech stack by field, such as frontend, backend, database, devops, ai, etc. 
- For example: Tech stack (bold font, arrange to middle of the text since tech stack is the heading, do not arrange to the middle for detail of tech stack), (nextline) Frontend: React.js, Next.js, JavaScript, TypeScript, Tailwind CSS, (nextline) Backend: Python, Java, Servlet, FastAPI, Node.js, Express.js (nextline) Database: MongoDB, MySQL, PostgreSQL, JDBC (nextline) Devops: Docker, Kubernetes, AWS, Microservices, vercel, etc.
- The example above is for the projects. Analyze corresponding tech stack of each projects/skills, and differentiate the tech stack by field, such as frontend, backend, database, devops, etc. 

Context: ${relevantPassages.join(' | ')}`;

  try {
    const response = await openai.chat.completions.create({
      model: CHAT_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.3,
      max_tokens: maxTokens
    });
    
    return response.choices[0]?.message?.content || "Sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return getFallbackResponse(intent);
  }
}

/**
 * Create consistent JSON response
 */
function createResponse(reply, intent, status = 200) {
  const response = {
    reply,
    intent,
    timestamp: new Date().toISOString()
  };
  
  return NextResponse.json(response, { status });
}

/**
 * Generate chatbot response with intelligent LLM-based relevance detection
 */
async function getChatbotResponse(message, intent) {
  // No longer block OFF_TOPIC - let LLM make intelligent decisions about relevance
  
  if (!initOpenAI()) {
    return getFallbackResponse(intent);
  }
  
  try {
    await ensureIndex();
    
    if (indexInitialized) {
      const { topK, maxTokens } = getDynamicParameters(intent);
      const relevantPassages = await retrievePassages(message, topK);
      return await generateResponse(message, intent, relevantPassages, maxTokens);
    }
  } catch (error) {
    console.error('Error in OpenAI processing:', error);
  }
  
  return getFallbackResponse(intent);
}

/**
 * Main API route handler
 */
export async function POST(request) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    const intent = routeIntent(message);
    const reply = await getChatbotResponse(message, intent);
    
    return createResponse(reply, intent);
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
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
