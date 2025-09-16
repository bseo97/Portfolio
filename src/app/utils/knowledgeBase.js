/**
 * Knowledge base extraction and management for Brian's portfolio chatbot
 * Extracts structured information from data.js for RAG (Retrieval Augmented Generation)
 */

import { DataArray } from '../data.js';

/**
 * Brian's core information extracted from portfolio data (written in first person)
 */
const brianInfo = {
  bio: "I'm Brian Seo, a Software Engineering student at UC Irvine passionate about backend infrastructure, scalable systems, and full-stack development. I'm involved with Association for Computing Machinery at UCI and Hacks at UCI, with a focus on building innovative solutions that support real-world businesses.",
  
  highlights: [
    "I'm a Software Engineering student at UC Irvine",
    "I love building real-world software that empowers small businesses to cut costs and improve efficiency",
    "I'm a full-stack developer experienced with React.js, Next.js, Golang, Python, and PostgreSQL",
    "I'm active in hackathons and Association for Computing Machinery at UCI"
  ],
  
  contact: {
    email: "My email and contact info is available on this portfolio",
    resume: "My resume is available for download on this portfolio",
    github: "Check my portfolio links for GitHub",
    linkedin: "Check my portfolio links for LinkedIn"
  },
  
  fun: [
    "I enjoy Weight-lifting and Swimming",
    "I occasionally go hiking and traveling",
    "I like going to the places that I have never been",
  ]
};

/**
 * Skill categorization mapping for efficient categorization
 */
const SKILL_CATEGORIES = {
  "Frontend Technologies": {
    description: "Modern web development frameworks and technologies for building responsive user interfaces",
    keywords: ['react', 'next', 'javascript', 'html', 'css', 'tailwind', 'typescript']
  },
  "Backend Technologies": {
    description: "Server-side technologies, databases, and API development for robust applications", 
    keywords: ['java', 'python', 'node', 'servlet', 'fastapi', 'express']
  },
  "DevOps & Infrastructure": {
    description: "Infrastructure management, containerization, and deployment platforms",
    keywords: ['docker', 'kubernetes', 'aws', 'microservices']
  },
  "AI & APIs": {
    description: "Artificial intelligence integration and API development",
    keywords: ['api', 'openai', 'gemini', 'ai', 'token']
  },
  "Databases": {
    description: "Database management and data storage solutions",
    keywords: ['mysql', 'mongodb', 'postgresql', 'sqlite', 'database', 'jdbc', 'supabase']
  }
};

/**
 * Extracts skills from DataArray projects grouped by category
 * @returns {Object} Skills organized by category
 */
export function getSkillsByCategory() {
  const allSkills = getAllSkills();
  
  // Initialize categories with empty skills arrays
  const skillsMap = Object.fromEntries(
    Object.entries(SKILL_CATEGORIES).map(([category, { description }]) => [
      category, 
      { skills: [], description }
    ])
  );

  // Categorize skills efficiently
  allSkills.forEach(skill => {
    const lowerSkill = skill.toLowerCase();
    
    // Find the first matching category
    const categoryEntry = Object.entries(SKILL_CATEGORIES).find(([, { keywords }]) =>
      keywords.some(keyword => lowerSkill.includes(keyword))
    );
    
    if (categoryEntry) {
      const [categoryName] = categoryEntry;
      if (!skillsMap[categoryName].skills.includes(skill)) {
        skillsMap[categoryName].skills.push(skill);
      }
    }
  });

  return skillsMap;
}

/**
 * Extracts all skills as a flat array from project tech stacks
 * @returns {Array} All unique skills from all projects
 */
export function getAllSkills() {
  return [...new Set(DataArray.flatMap(project => project.techStack))];
}

/**
 * Extracts project information with enhanced details
 * @returns {Array} Enhanced project data
 */
export function getProjectsData() {
  return DataArray.map(project => ({
    ...project,
    summary: project.des1,
    shortDescription: project.des,
    technologies: project.techStack.join(", "),
    links: {
      demo: project.demoLink,
      repo: project.repositoryLink
    }
  }));
}

/**
 * Converts knowledge base to searchable text passages for RAG
 * @returns {Array} Text passages for embedding search
 */
export function kbToPassages() {
  const passages = [];
  
  // Bio and highlights (first person)
  passages.push(`BIO: ${brianInfo.bio}`);
  passages.push(`HIGHLIGHTS: ${brianInfo.highlights.join("; ")}`);
  
  // Skills by category (derived from projects)
  const skillsData = getSkillsByCategory();
  Object.entries(skillsData).forEach(([category, data]) => {
    if (data.skills.length > 0) {
      passages.push(`MY SKILLS - ${category}: ${data.skills.join(", ")} | ${data.description}`);
    }
  });
  
  // All skills summary
  passages.push(`ALL MY SKILLS: ${getAllSkills().join(", ")}`);
  
  // Projects with detailed information (first person)
  DataArray.forEach(project => {
    passages.push(`MY PROJECT: ${project.name} | Status: ${project.status.text} | Year: ${project.year} | Stack: ${project.techStack.join(", ")} | Description: ${project.des1}`);
    
    // Add additional context for each project
    passages.push(`PROJECT SUMMARY: ${project.title} - ${project.des}`);
  });
  
  // Contact and fun facts (first person)
  passages.push(`CONTACT: ${brianInfo.contact.email}, ${brianInfo.contact.resume}, ${brianInfo.contact.github}, ${brianInfo.contact.linkedin}`);
  passages.push(`PERSONAL: ${brianInfo.fun.join("; ")}`);
  
  // Education and involvement (first person)
  passages.push(`MY EDUCATION: I'm a Software Engineering student at UC Irvine, involved with Associate for Computing Machinery and Hacks at UCI`);
  
  return passages;
}

/**
 * Gets project by name (case insensitive)
 * @param {string} projectName 
 * @returns {Object|null} Project data or null if not found
 */
export function getProjectByName(projectName) {
  const normalizedName = projectName.toLowerCase();
  return DataArray.find(project => 
    [project.name, project.title].some(field => 
      field.toLowerCase().includes(normalizedName)
    )
  ) || null;
}

/**
 * Gets projects by technology/skill
 * @param {string} tech 
 * @returns {Array} Projects using the specified technology
 */
export function getProjectsByTech(tech) {
  const normalizedTech = tech.toLowerCase();
  return DataArray.filter(project =>
    project.techStack.some(t => t.toLowerCase().includes(normalizedTech))
  );
}

/**
 * Gets projects by status
 * @param {string} status 
 * @returns {Array} Projects with specified status
 */
export function getProjectsByStatus(status) {
  const normalizedStatus = status.toLowerCase();
  return DataArray.filter(project => 
    project.status.text.toLowerCase().includes(normalizedStatus)
  );
}

/**
 * Searches skills by query
 * @param {string} query 
 * @returns {Array} Matching skills and their categories
 */
export function searchSkills(query) {
  const normalizedQuery = query.toLowerCase();
  const skillsData = getSkillsByCategory();
  
  return Object.entries(skillsData)
    .map(([category, data]) => ({
      category,
      skills: data.skills.filter(skill => 
        skill.toLowerCase().includes(normalizedQuery)
      )
    }))
    .filter(result => result.skills.length > 0);
}

export default {
  brianInfo,
  getSkillsByCategory,
  getAllSkills,
  getProjectsData,
  kbToPassages,
  getProjectByName,
  getProjectsByTech,
  getProjectsByStatus,
  searchSkills
};
