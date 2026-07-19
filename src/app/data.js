
/**
 * Portfolio project data for slider and project details
 * Contains information about Brian's projects including tech stacks, descriptions, and links
 */
export const DataArray = [
  {
    title: "Personal Portfolio Website Using Reactjs",
    name: "Portfolio Website",
    label: "Portfolio",
    category: "Web / Frontend",
    des: "A portfolio website to showcase my projects and skills.",
    des1: "Built a modern, responsive portfolio website built with Next.js 15 and React 19, featuring animated neural network backgrounds, interactive project carousel, AI chatbot integration, and glassmorphism design. Includes dynamic routing for project details, smooth scroll animations, custom scrollbars, and comprehensive responsive design. Showcases advanced CSS techniques, React hooks, and modern web development practices with full mobile optimization.",
    images: ["/website.png"],
    techStack: ["Next.js", "React.js", "JavaScript", "Tailwind CSS", "CSS"],
    status: {
      text: "Completed",
      color: "green"
    },
    year: "2025",
    demoLink: null,
    repositoryLink: "https://github.com/bseo97/Portfolio"
  },
  {
    title: "Hackathon Project: Rent-spiracy",
    name: "Rent-spiracy",
    label: "Rent-spiracy",
    category: "Hackathon",
    des: "Built a website for a 3-mean team hackathon project that allows users search for potential scams.",
    des1: "Rent-spiracy is a hackathon project developed by a 3-person team to help users identify and avoid potential rental scams. The platform allows users to search for properties and cross-reference them against known scam databases, providing real-time alerts and risk assessments. Built with Next.js and TypeScript for a robust frontend experience, the application integrates with MongoDB for data storage and utilizes Python backend services for advanced data processing. The Gemini API powers intelligent scam detection algorithms, analyzing listing patterns, pricing anomalies, and user reports to provide comprehensive fraud prevention. This project demonstrates rapid prototyping skills, API integration, and collaborative development in a time-constrained hackathon environment.",
    images: ["/Rentspiracy.png"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Python", "Gemini API"],
    status: {
      text: "Live",
      color: "blue"
    },
    year: "2025",
    demoLink: "https://www.youtube.com/watch?v=CsMjk4ld_aA&t=10s",
    repositoryLink: "https://github.com/bseo97/Rent-Spiracy"
  },
  {
    title: "Fabflix full-stack project",
    name: "Fabflix",
    label: "Fabflix",
    category: "Full-Stack",
    des: "A full-stack movie eCommerce platform with secure login, dynamic search, chatbot integration, and full AWS deployment.",
    des1: "Fabflix is a full-stack movie eCommerce web application that allows users to search, browse, and purchase movies through a secure and interactive interface. Built using Java Servlets, MySQL, and AJAX-powered front-end technologies, the platform supports advanced features such as fuzzy search, dynamic shopping cart, and an AI-powered chatbot integrated via the OpenAI API. I implemented secure login with JWT, optimized SQL performance, automated XML data import, and successfully deployed the application on AWS using Docker and Kubernetes, demonstrating a scalable microservices architecture before shutting down the server due to cost constraints. You can test the full project locally by visiting my GitHub repository, Fabflix!",
    images: ["/Decurb_main.png", "/Decurb_login.png"],
    techStack: ["Java", "MySQL", "JavaScript (AJAX)", "HTML/CSS", "Servlet", "JDBC", "Docker", "Kubernetes", "AWS", "Microservices"],
    status: {
      text: "Completed",
      color: "green"
    },
    year: "2025",
    demoLink: "https://youtu.be/R7KXw658VMg",
    repositoryLink: "https://github.com/bseo97/Fabflix"
  },
  {
    title: "Intertru — Full-Stack Software Engineer",
    name: "Intertru",
    label: "Intertru",
    category: "Experience",
    des: "Full-stack software engineer building AI-driven interview session tooling.",
    des1: "As a Full-Stack Software Engineer at Intertru (Newport Beach, CA), I improved system efficiency by consolidating multiple API calls into a single endpoint for every session. I hardened the AI integration by adding security layers—input sanitization and structured JSON output enforcement—to prevent prompt injection and reduce failure points. I integrated hybrid and independent model selection into working-session generation, improving analysis-point accuracy on interview sessions by 2.3x. I also replaced background threading with async AWS Lambda calls through Boto3, so long-running jobs return a response immediately instead of blocking.",
    images: [],
    techStack: ["Python", "AWS Lambda", "Boto3", "LLM Integration", "REST API", "JSON Schema"],
    status: {
      text: "In Progress",
      color: "yellow"
    },
    year: "2026",
    demoLink: null,
    repositoryLink: null
  },
  {
    title: "Point of Sales Software",
    name: "Point of Sales Software",
    label: "POS",
    category: "Full-Stack",
    des: "An offline-first point-of-sale system with local operation and a cloud-sync path.",
    des1: "A point-of-sale application designed around an offline-first SQLite persistence layer for reliable local operation, with a PostgreSQL cloud-sync path. I implemented full order management with server-side price lookups and transactional multi-step writes, and established a sentinel-error pattern that maps domain errors to the correct HTTP status codes with consistent error normalization.",
    images: [],
    techStack: ["Go", "Shell", "Kotlin", "Jetpack Compose", "SQLite", "PostgreSQL"],
    status: {
      text: "In Progress",
      color: "yellow"
    },
    year: "2026",
    demoLink: null,
    repositoryLink: null
  },
];
