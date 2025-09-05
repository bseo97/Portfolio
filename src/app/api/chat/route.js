/**
 * API route for chatbot with RAG
 * Integrates OpenAI for embeddings and chat completion with intent routing
 */

import { NextRequest, NextResponse } from 'next/server';
import { routeIntent, INTENT_TYPES, getFallbackResponse } from '../../utils/intent.js';
import { kbToPassages } from '../../utils/knowledgeBase.js';

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
 * Ensure embeddings index is built
 */
async function ensureIndex() {
  if (vectors || !initOpenAI()) return;
  
  try {
    passages = kbToPassages();
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: passages
    });
    
    vectors = response.data.map(d => d.embedding);
    console.log(`Indexed ${passages.length} passages`);
  } catch (error) {
    console.error('Failed to create embeddings:', error);
    vectors = null;
  }
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosine(a, b) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Retrieve relevant passages for a query
 */
async function retrievePassages(query, topK = 4) {
  if (!vectors || !openai) return [];
  
  try {
    const queryEmbedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: query
    });
    
    const qEmb = queryEmbedding.data[0].embedding;
    
    const scored = vectors.map((v, i) => ({
      index: i,
      score: cosine(v, qEmb)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ index }) => passages[index]);
    
    return scored;
  } catch (error) {
    console.error('Failed to retrieve passages:', error);
    return [];
  }
}

/**
 * Generate response using OpenAI chat completion
 */
async function generateResponse(message, intent, relevantPassages) {
  if (!openai) {
    return getFallbackResponse(intent);
  }
  
  const systemPrompt = `
You are Brian Seo. Respond in first person as if you are Brian himself. Strict rules:
- Only answer using the provided context passages about yourself
- Speak as "I", "my", "me" - you ARE Brian, not talking about him
- If the answer isn't in context, say: "I'm not sure about that specific detail, but I'd be happy to tell you about my projects, skills, or experience!"
- Be concise, friendly, and conversational
- Format responses for readability: use line breaks, organize with clear categories
- When listing items, use "• " for bullet points and add line breaks between sections
- Use **text** for important words and section headers (e.g., "**FRONTEND TECHNOLOGIES:**", "**MY PROJECTS:**")
- Never use "---" as separators, use proper line breaks instead
- If user asks "who are you" or similar, give a 2-3 sentence summary about yourself plus key highlights
- Stay focused on your professional portfolio content
- Don't make up information not in the context

Context passages about you:
${relevantPassages.map((p, idx) => `[${idx + 1}] ${p}`).join('\n')}
`.trim();

  const userPrompt = `User question: "${message}"
Intent: ${intent}

Please provide a helpful response in first person as Brian Seo based on the context about yourself.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 500
    });
    
    return response.choices[0]?.message?.content || "Sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error('OpenAI API error:', error);
    return getFallbackResponse(intent);
  }
}

/**
 * Fallback response system when OpenAI is unavailable
 */
function getLocalResponse(message, intent) {
  const responses = {
    [INTENT_TYPES.ABOUT]: "Hi! I'm **Brian Seo**, a Software Engineering student at UC Irvine.\n\nI'm passionate about AI infrastructure, ML systems, and full-stack development. I'm involved with computing organizations at UCI and love working on innovative projects!",
    
    [INTENT_TYPES.PROJECTS]: "I've worked on several exciting projects:\n\n**MY PROJECTS:**\n• **Rent-spiracy** - A hackathon project I built to identify rental scams using AI\n• **Fabflix/Decurb** - A full-stack movie eCommerce platform I developed with secure features\n• **Portfolio Website** - This responsive site I built with Next.js and React\n• **Decurb AI Platform** - An AI token optimization platform I'm currently working on\n\nWhich project interests you most?",
    
    [INTENT_TYPES.SKILLS]: "I have a diverse set of skills across various technologies:\n\n**FRONTEND TECHNOLOGIES:**\n• React.js, Next.js, JavaScript, TypeScript\n• HTML/CSS, Tailwind CSS\n\n**BACKEND TECHNOLOGIES:**\n• Python, Java, Servlet, FastAPI\n• Node.js, Express.js\n\n**DATABASES:**\n• MongoDB, MySQL, PostgreSQL, JDBC\n\n**DEVOPS & INFRASTRUCTURE:**\n• Docker, Kubernetes, AWS, Microservices\n\n**AI & APIS:**\n• OpenAI API, Gemini API, prompt optimization\n\nWhat specific technology are you curious about?",
    
    [INTENT_TYPES.EXPERIENCE]: "I'm currently a **Software Engineering student at UC Irvine**, actively involved with:\n\n**UCI INVOLVEMENT:**\n• Associate of Computing Academy at UCI\n• Hacks at UCI\n• Various hackathons and coding competitions\n\nI have hands-on experience building full-stack applications, AI systems, and working in collaborative team environments.",
    
    [INTENT_TYPES.CONTACT]: "You can find my **contact information and resume** on this portfolio!\n\nFeel free to connect with me through the links provided here.",
    
    [INTENT_TYPES.FUN]: "Outside of coding, I really enjoy:\n\n**PERSONAL INTERESTS:**\n• Participating in hackathons and coding competitions\n• Building innovative AI solutions\n• Being active in computing communities at UCI\n• Working on scalable systems and optimization challenges",
    
    [INTENT_TYPES.OFF_TOPIC]: "I'd prefer to focus on topics related to my **portfolio**!\n\nFeel free to ask about my projects, skills, experience, or anything else related to my work as a developer.",
    
    [INTENT_TYPES.FALLBACK]: "I'm not sure I understand that question.\n\nTry asking about my **projects**, **technical skills**, **experience**, or background as a Software Engineering student!"
  };
  
  return responses[intent] || responses[INTENT_TYPES.FALLBACK];
}

/**
 * Main API route handler
 */
export async function POST(request) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Route the intent
    const intent = routeIntent(message);
    
    // Handle off-topic requests immediately
    if (intent === INTENT_TYPES.OFF_TOPIC) {
      return NextResponse.json({
        reply: "I don't think that's about me. Ask about my projects, skills, experience, or anything related to my portfolio!",
        intent
      });
    }
    
    // Try to use OpenAI with RAG if available
    let reply;
    const client = initOpenAI();
    
    if (client) {
      await ensureIndex();
      const relevantPassages = await retrievePassages(message);
      reply = await generateResponse(message, intent, relevantPassages);
    } else {
      // Fallback to local responses
      reply = getLocalResponse(message, intent);
    }
    
    return NextResponse.json({
      reply,
      intent,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint
 */
export async function GET() {
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  
  return NextResponse.json({
    status: 'ok',
    openai_configured: hasOpenAI,
    passages_indexed: vectors ? passages.length : 0
  });
}
