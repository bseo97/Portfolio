/**
 * Intent routing for Brian's portfolio chatbot
 * Routes user queries to appropriate response categories
 */

export const INTENT_TYPES = {
  GREETING: "greeting",
  ABOUT: "about",
  PROJECTS: "projects", 
  SKILLS: "skills",
  EXPERIENCE: "experience",
  CONTACT: "contact",
  FUN: "fun",
  OFF_TOPIC: "off_topic",
  FALLBACK: "fallback"
};

/**
 * Intent patterns for more maintainable routing
 */
const INTENT_PATTERNS = [
  {
    type: INTENT_TYPES.GREETING,
    patterns: [
      /^(hi|hello|hey|good\s+(morning|afternoon|evening)|greetings|what's\s+up|whats\s+up|yo|sup|hiya|howdy)\s*[!.?]*$/,
      /^(hi|hello|hey)\s+(there|brian|bot)\s*[!.?]*$/,
      /^(nice\s+to\s+meet\s+you|pleasure\s+to\s+meet\s+you)\s*[!.?]*$/,
      /^(how\s+(are\s+)?you(\s+doing)?)\s*[!.?]*$/
    ]
  },
  {
    type: INTENT_TYPES.ABOUT,
    patterns: [/\b(who\s+(are\s+)?you|about\s+(you|yourself)|introduce\s+yourself|bio|background.*you)\b/]
  },
  {
    type: INTENT_TYPES.EXPERIENCE,
    patterns: [
      /\b(experience|internship|roles|education|university|uci|irvine|student|academic|hackathon)\b/,
      /\b(have\s+you\s+(ever\s+)?(done|participated|been\s+to|attended).*hackathon)\b/
    ]
  },
  {
    type: INTENT_TYPES.PROJECTS,
    patterns: [
      /\b(projects?\s+(you\s+)?(built|made|developed|created|worked\s+on))\b/,
      /\b(what.*projects|show.*projects|portfolio.*projects)\b/,
      /\b(rentspiracy|fabflix|decurb)\b/,
      /\b(built.*app|made.*website|developed.*platform)\b/
    ]
  },
  {
    type: INTENT_TYPES.SKILLS,
    patterns: [
      /\b(skills?|tech\s+stack|technologies|tools|languages|programming|frameworks?|what.*know)\b/,
      /\b(react|next|python|java|javascript|html|css|mongodb|mysql|golang)\b/
    ]
  },
  {
    type: INTENT_TYPES.CONTACT,
    patterns: [/\b(contact|email|reach|hire|connect|linkedin|github|resume)\b/]
  },
  {
    type: INTENT_TYPES.FUN,
    patterns: [/\b(hobby|hobbies|fun|interests|personal|like|enjoy|free\s+time|outside\s+work)\b/]
  },
];

/**
 * Routes user input to appropriate intent category with intelligent, multilingual context awareness
 * @param {string} query - User's input message
 * @returns {string} Intent type (OFF_TOPIC detection now handled by LLM for better accuracy)
 */
export function routeIntent(query) {
  const s = query.toLowerCase().trim();
  
  // First, check for specific Brian-related intents (projects, skills, contact, fun)
  for (const { type, patterns } of INTENT_PATTERNS) {
    if (patterns.some(pattern => pattern.test(s))) {
      return type;
    }
  }
  
  // Check for greetings in multiple languages and casual formats
  const greetingPatterns = /\b(hi|hello|hey|hola|bonjour|guten\s+tag|ciao|konnichiwa|annyeonghaseyo|안녕|namaste|salaam|shalom|howdy|sup|what's\s+up|whats\s+up|good\s+morning|good\s+afternoon|good\s+evening|hey\s+there|hey\s+man|heyy+|yo|hallo|aloha)\b/;
  
  if (greetingPatterns.test(s)) {
    return INTENT_TYPES.ABOUT; // Treat greetings as about Brian for friendly intro
  }
  
  // Broader pattern matching for Brian-related questions (including multilingual indicators)
  const brianRelatedPatterns = /\b(you|your|brian|portfolio|project|skill|experience|education|study|work|build|develop|create|made|built|uci|irvine|hackathon|university|student|resume|background|journey|story|learn|career|future|goals|achievements|accomplishments|academic|internship|job|hire|contact|email|github|linkedin|tell\s+me|about\s+yourself|who\s+are\s+you|introduce|yourself|퀘스|qui\s+es|quien\s+eres|c'est\s+quoi|wer\s+bist|chi\s+sei)\b/;
  
  const questionPatterns = /\b(what.*you|how.*you|where.*you|when.*you|why.*you|who.*you|tell.*about|describe|explain.*your|show.*your|share.*your|can\s+you|could\s+you|would\s+you|do\s+you|did\s+you|have\s+you|are\s+you|were\s+you)\b/;
  
  // If it contains Brian-related patterns or seems like a personal question, let LLM handle it
  if (brianRelatedPatterns.test(s) || questionPatterns.test(s)) {
    return INTENT_TYPES.FALLBACK; // Let OpenAI determine exact intent and relevance
  }
  
  // For everything else, let the LLM decide if it's relevant
  // This removes rigid off-topic detection and leverages LLM intelligence
  return INTENT_TYPES.FALLBACK;
}

/**
 * Gets appropriate fallback responses for different intents
 * @param {string} intent - Intent type
 * @returns {string} Fallback response
 */
export function getFallbackResponse(intent) {
  const fallbacks = {
    [INTENT_TYPES.GREETING]: "Hello! Great to meet you! I'm Brian, a Software Engineering student at UC Irvine. I'd love to tell you about my projects, experience, or anything else you're curious about!",
    [INTENT_TYPES.ABOUT]: "I'd be happy to tell you about myself! I'm Brian, a Software Engineering student at UC Irvine passionate about AI and full-stack development.",
    [INTENT_TYPES.PROJECTS]: "I've worked on several exciting projects including Rent-spiracy, Fabflix, and Decurb. Which one would you like to know more about?",
    [INTENT_TYPES.SKILLS]: "I have experience with React.js, Next.js, Python, Java, and various AI/ML frameworks. What specific technology are you curious about?",
    [INTENT_TYPES.EXPERIENCE]: "I'm currently a Software Engineering student at UC Irvine, involved with computing organizations and hackathons. What aspect of my experience interests you?",
    [INTENT_TYPES.CONTACT]: "You can find my contact information and resume links on this portfolio. Feel free to connect with me!",
    [INTENT_TYPES.FUN]: "I enjoy hackathons, building innovative solutions, and working on AI projects. I'm also involved with various computing communities at UCI!",
    [INTENT_TYPES.OFF_TOPIC]: "That seems like it's not related to me or my portfolio! I'm here to chat about my projects, skills, experiences, education, or anything else you'd like to know about me personally. What would you like to know about my work?",
    [INTENT_TYPES.FALLBACK]: "I'm not quite sure what you're looking for, but I'd be happy to help! Try asking about my projects, skills, experience, or anything else you'd like to know about me."
  };
  
  return fallbacks[intent] || fallbacks[INTENT_TYPES.FALLBACK];
}
