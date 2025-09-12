/**
 * Intent routing for Brian's portfolio chatbot
 * Routes user queries to appropriate response categories
 */

export const INTENT_TYPES = {
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
 * Routes user input to appropriate intent category with context awareness
 * @param {string} query - User's input message
 * @returns {string} Intent type
 */
export function routeIntent(query) {
  const s = query.toLowerCase();
  
  // About/Bio intent - who are you, tell me about yourself
  if (/\b(who\s+(are\s+)?you|about\s+(you|yourself)|introduce\s+yourself|bio|background.*you)\b/.test(s)) {
    return INTENT_TYPES.ABOUT;
  }
  
  // Experience/Education intent - prioritize hackathon, education, experience contexts
  if (/\b(experience|internship|roles|education|university|uci|irvine|student|academic)\b/.test(s) ||
      /\b(have\s+you\s+(ever\s+)?(done|participated|been\s+to|attended).*hackathon)\b/.test(s) ||
      /\bhackathon\b/.test(s)) {
    return INTENT_TYPES.EXPERIENCE;
  }
  
  // Projects intent - specific project questions, what you built
  if (/\b(projects?\s+(you\s+)?(built|made|developed|created|worked\s+on))\b/.test(s) ||
      /\b(what.*projects|show.*projects|portfolio.*projects)\b/.test(s) ||
      /\b(rentspiracy|fabflix|decurb)\b/.test(s) ||
      /\b(built.*app|made.*website|developed.*platform)\b/.test(s)) {
    return INTENT_TYPES.PROJECTS;
  }
  
  // Skills/Tech stack intent
  if (/\b(skills?|tech\s+stack|technologies|tools|languages|programming|frameworks?|what.*know)\b/.test(s) ||
      /\b(react|next|python|java|javascript|html|css|mongodb|mysql)\b/.test(s)) {
    return INTENT_TYPES.SKILLS;
  }
  
  // Contact intent
  if (/\b(contact|email|reach|hire|connect|linkedin|github|resume)\b/.test(s)) {
    return INTENT_TYPES.CONTACT;
  }
  
  // Fun/Personal intent
  if (/\b(hobby|hobbies|fun|interests|personal|like|enjoy|free\s+time|outside\s+work)\b/.test(s)) {
    return INTENT_TYPES.FUN;
  }
  
  // Off-topic guard
  if (/\b(weather|capital|stocks|math|recipe|define|news|politics|sports|cooking|music|movie|book)\b/.test(s)) {
    return INTENT_TYPES.OFF_TOPIC;
  }
  
  // Default fallback
  return INTENT_TYPES.FALLBACK;
}

/**
 * Gets appropriate fallback responses for different intents
 * @param {string} intent - Intent type
 * @returns {string} Fallback response
 */
export function getFallbackResponse(intent) {
  const fallbacks = {
    [INTENT_TYPES.ABOUT]: "I'd be happy to tell you about myself! I'm Brian, a Software Engineering student at UC Irvine passionate about AI and full-stack development.",
    [INTENT_TYPES.PROJECTS]: "I've worked on several exciting projects including Rent-spiracy, Fabflix, and Decurb. Which one would you like to know more about?",
    [INTENT_TYPES.SKILLS]: "I have experience with React.js, Next.js, Python, Java, and various AI/ML frameworks. What specific technology are you curious about?",
    [INTENT_TYPES.EXPERIENCE]: "I'm currently a Software Engineering student at UC Irvine, involved with computing organizations and hackathons. What aspect of my experience interests you?",
    [INTENT_TYPES.CONTACT]: "You can find my contact information and resume links on this portfolio. Feel free to connect with me!",
    [INTENT_TYPES.FUN]: "I enjoy hackathons, building innovative solutions, and working on AI projects. I'm also involved with various computing communities at UCI!",
    [INTENT_TYPES.OFF_TOPIC]: "I don't think that's about me. Ask about my projects, skills, experience, or anything related to my portfolio!",
    [INTENT_TYPES.FALLBACK]: "I'm not sure I understand. Try asking about my projects, skills, experience, or background!"
  };
  
  return fallbacks[intent] || fallbacks[INTENT_TYPES.FALLBACK];
}
