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
 * Routes user input to appropriate intent category
 * @param {string} query - User's input message
 * @returns {string} Intent type
 */
export function routeIntent(query) {
  const s = query.toLowerCase();
  
  // About/Bio intent
  if (/\b(who|about|introduce|bio|background|tell me about|yourself)\b/.test(s)) {
    return INTENT_TYPES.ABOUT;
  }
  
  // Projects intent
  if (/\b(project|built|made|portfolio|work|developed|created|app|website|rentspiracy|fabflix|decurb)\b/.test(s)) {
    return INTENT_TYPES.PROJECTS;
  }
  
  // Skills/Tech stack intent
  if (/\b(skill|stack|tech|tools|languages|programming|framework|library|react|next|python|java|javascript|html|css|mongodb|mysql)\b/.test(s)) {
    return INTENT_TYPES.SKILLS;
  }
  
  // Experience/Education intent  
  if (/\b(experience|internship|roles|resume|education|university|uci|irvine|student|academic|hackathon)\b/.test(s)) {
    return INTENT_TYPES.EXPERIENCE;
  }
  
  // Contact intent
  if (/\b(contact|email|reach|resume|hire|connect|linkedin|github|social)\b/.test(s)) {
    return INTENT_TYPES.CONTACT;
  }
  
  // Fun/Personal intent
  if (/\b(hobby|fun|interests|personal|like|enjoy|free time|outside)\b/.test(s)) {
    return INTENT_TYPES.FUN;
  }
  
  // Off-topic guard (expand as needed based on real traffic)
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
