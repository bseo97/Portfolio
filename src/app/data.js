
/**
 * Portfolio project data for slider and project details
 * Contains information about Brian's projects including tech stacks, descriptions, and links
 */
export const DataArray = [
  {
    title: "Intertru — Backend / AI Engineer",
    name: "Intertru",
    label: "Intertru",
    category: "Backend / AI",
    des: "Backend / AI engineer building AI-driven interview session tooling.",
    des1: "As a Backend/AI Engineer at Intertru (Newport Beach, CA), I optimized system performance and context accuracy across our AI-generated interview platform. I engineered an in-session retrieval architecture (RAG) that dynamically injects document contexts, improving analysis-point accuracy by 2.3x, and hardened the AI integration against prompt injection using input sanitization and structured JSON enforcement layers. To optimize infrastructure, I refactored legacy background-threaded workloads into asynchronous AWS Lambda calls via Boto3 to eliminate idle EC2 runtime charges and cut operational costs by 20%. Additionally, I increased team developer velocity by building an internal, in-platform asynchronous feedback and archive feature that eliminated 2+ hours of synchronous sprint review overhead per cycle.",
    images: ["/Intertru.png", "/Intertru1.png"],
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
    title: "Curability",
    name: "Curability",
    label: "Curability",
    category: "AI, Neuroplascity",
    des: "Real-Time AI Biofeedback for Neuro-Rehabilitation",
    des1: "Developing an edge-computed, closed-loop wearable platform designed to detect and suppress post-stroke muscle spasticity in real time. Using an ESP32-S3 microcontroller, dual-channel sEMG, and a 6-axis IMU, the embedded system captures micro-velocity stretch signals and muscle activation patterns to trigger sub-100ms haptic cues. By integrating real-time TinyML inferencing with physiological feedback loops (reciprocal inhibition), the platform guides users to disrupt involuntary motor lockups and promote neuroplastic recovery.",
    images: [],
    techStack: ["C/C++", "FreeRTOS", "TinyML", "ESP32-S3 MCU", "Python (Data Pipeline)", "BLE", "sEMG/IMU Sensors"],
    status: {
      text: "In Progress",
      color: "yellow"
    },
    year: "2026",
    demoLink: null,
    repositoryLink: null
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
      text: "Completed",
      color: "green"
    },
    year: "2025",
    demoLink: "https://www.youtube.com/watch?v=CsMjk4ld_aA&t=10s",
    repositoryLink: "https://github.com/bseo97/Rent-Spiracy"
  },
  {
    title: "Decurb full-stack project",
    name: "Decurb",
    label: "Decurb",
    category: "Academic Project",
    des: "A full-stack movie eCommerce platform with secure login, dynamic search, chatbot integration, and full AWS deployment.",
    des1: "Decurb is a full-stack movie eCommerce web application that allows users to search, browse, and purchase movies through a secure and interactive interface. Built using Java Servlets, MySQL, and AJAX-powered front-end technologies, the platform supports advanced features such as fuzzy search, dynamic shopping cart, and an AI-powered chatbot integrated via the OpenAI API. I implemented secure login with JWT, optimized SQL performance, automated XML data import, and successfully deployed the application on AWS using Docker and Kubernetes, demonstrating a scalable microservices architecture before shutting down the server due to cost constraints. You can test the full project locally by visiting my GitHub repository, Decurb!",
    images: ["/Decurb_main.png", "/Decurb_login.png"],
    techStack: ["Java", "MySQL", "JavaScript (AJAX)", "HTML/CSS", "Servlet", "JDBC", "Docker", "Kubernetes", "AWS", "Microservices"],
    status: {
      text: "Completed",
      color: "green"
    },
    year: "2025",
    demoLink: "https://youtu.be/R7KXw658VMg",
    repositoryLink: "https://github.com/bseo97/fabflix"
  },
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
    year: "2024",
    demoLink: null,
    repositoryLink: "https://github.com/bseo97/Portfolio"
  },
];
