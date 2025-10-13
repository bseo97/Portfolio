// Portfolio JavaScript - Enhanced Implementation with Full Theme Support
// Author: Brian Seo

document.addEventListener('DOMContentLoaded', function() {
    // Theme Management
    let isDarkMode = true;
    let chatExpanded = false;
    let headingAnimationDone = false;
    
    // Initialize theme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            isDarkMode = savedTheme === 'dark';
        }
        updateTheme();
    }
    
    // Update theme with sophisticated Moon/Sun icon transitions
    function updateTheme() {
        const body = document.body;
        const moonIcon = document.getElementById('moon-icon');
        const sunIcon = document.getElementById('sun-icon');
        const moonIconMobile = document.getElementById('moon-icon-mobile');
        const sunIconMobile = document.getElementById('sun-icon-mobile');
        const header = document.getElementById('header');
        
        if (isDarkMode) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            
            // Update desktop icons
            if (moonIcon) {
                moonIcon.style.opacity = '1';
                moonIcon.style.transform = 'rotate(0deg) scale(1)';
            }
            if (sunIcon) {
                sunIcon.style.opacity = '0';
                sunIcon.style.transform = 'rotate(90deg) scale(0.8)';
            }
            
            // Update mobile icons
            if (moonIconMobile) {
                moonIconMobile.style.display = 'block';
            }
            if (sunIconMobile) {
                sunIconMobile.style.display = 'none';
            }
            
            if (header) {
                header.className = 'fixed top-0 left-0 w-full backdrop-blur-sm bg-slate-800/80 border-b border-slate-700 z-50 transition-all duration-500';
            }
            createDarkModeElements();
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            
            // Update desktop icons
            if (moonIcon) {
                moonIcon.style.opacity = '0';
                moonIcon.style.transform = 'rotate(-90deg) scale(0.8)';
            }
            if (sunIcon) {
                sunIcon.style.opacity = '1';
                sunIcon.style.transform = 'rotate(0deg) scale(1)';
            }
            
            // Update mobile icons
            if (moonIconMobile) {
                moonIconMobile.style.display = 'none';
            }
            if (sunIconMobile) {
                sunIconMobile.style.display = 'block';
            }
            
            if (header) {
                header.className = 'fixed top-0 left-0 w-full backdrop-blur-sm bg-white/90 border-b border-slate-200 z-50 transition-all duration-500';
            }
            removeDarkModeElements();
            setTimeout(() => {
                createLightModeParticles();
                startLightModeParticleSystem();
            }, 500);
        }
        
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
    
    // Theme toggle functionality
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        const themeToggleText = document.getElementById('theme-toggle-text');
        
        function handleToggle() {
            isDarkMode = !isDarkMode;
            updateTheme();
            
            // Update button text
            if (themeToggleText) {
                themeToggleText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
            }
        }
        
        if (themeToggle) {
            themeToggle.addEventListener('click', handleToggle);
        }
        
        if (themeToggleMobile) {
            themeToggleMobile.addEventListener('click', handleToggle);
        }
    }
    
    // Active section detection for navigation
    function setupActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        function updateActiveSection() {
            let currentSection = 'home';
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
            
            // Update nav links
            navLinks.forEach(link => {
                const linkSection = link.getAttribute('data-section');
                const underline = link.querySelector('.nav-underline');
                
                if (linkSection === currentSection) {
                    link.classList.add('active');
                    link.style.color = '#53c9c9';
                    if (underline) underline.classList.remove('hidden');
                } else {
                    link.classList.remove('active');
                    link.style.color = '';
                    if (underline) underline.classList.add('hidden');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveSection);
        updateActiveSection(); // Initial call
    }
    
    // Header scroll effects
    function setupHeaderScroll() {
        const header = document.getElementById('header');
        
        function handleScroll() {
            const scrollY = window.pageYOffset;
            
            if (scrollY > 0) {
                header.classList.add('scrolled');
                if (isDarkMode) {
                    header.style.background = 'rgba(15, 23, 42, 0.9)';
                    header.style.borderBottom = '1px solid rgba(71, 85, 105, 0.5)';
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    // Light mode styles applied via CSS
                }
            } else {
                header.classList.remove('scrolled');
                if (isDarkMode) {
                    header.style.background = 'rgba(15, 23, 42, 0.7)';
                    header.style.borderBottom = '1px solid transparent';
                    header.style.boxShadow = 'none';
                } else {
                    // Light mode styles applied via CSS
                }
            }
        }
        
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call
    }
    
    // Hide loading screen
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }
    
    // Smooth scrolling for navigation links
    function setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = 70;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Scroll animations
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.scroll-animate');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // === SOPHISTICATED CHATBOT SYSTEM ===
    // Recreating your original knowledge base and intent system
    
    // Brian's Knowledge Base (from your original knowledgeBase.js)
    const brianKnowledgeBase = {
        bio: "I'm Brian Seo, a Software Engineering student at UC Irvine passionate about backend infrastructure, scalable systems, and full-stack development. I'm involved with Association for Computing Machinery at UCI and Hacks at UCI, with a focus on building innovative solutions that support real-world businesses.",
        
        projects: [
            {
                name: "Portfolio Website",
                description: "A modern, responsive portfolio website built with Next.js 15 and React 19, featuring animated neural network backgrounds, interactive project carousel, AI chatbot integration, and glassmorphism design.",
                techStack: ["Next.js", "React.js", "JavaScript", "Tailwind CSS", "CSS"],
                status: "Completed",
                year: "2025"
            },
            {
                name: "Rent-spiracy",
                description: "A hackathon project developed by a 3-person team to help users identify and avoid potential rental scams. Built with Next.js and TypeScript, integrates with MongoDB and utilizes Python backend services. The Gemini API powers intelligent scam detection algorithms.",
                techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Python", "Gemini API"],
                status: "Live",
                year: "2025"
            },
            {
                name: "Fabflix (Decurb)",
                description: "A full-stack movie eCommerce web application with secure login, dynamic search, chatbot integration, and full AWS deployment. Built using Java Servlets, MySQL, and AJAX-powered front-end technologies.",
                techStack: ["Java", "MySQL", "JavaScript (AJAX)", "HTML/CSS", "Servlet", "JDBC", "Docker", "Kubernetes", "AWS"],
                status: "Completed",  
                year: "2025"
            },
            {
                name: "Decurb AI Platform",
                description: "An AI platform aimed at helping users optimize token usage when interacting with large language models. Analyzes token usage in real-time and forecasts when prompts are likely to exceed model limits.",
                techStack: ["Python", "FastAPI", "PostgreSQL", "OpenAI API", "Docker", "Kubernetes", "AWS EC2"],
                status: "In Progress",
                year: "2025"
            }
        ],
        
        skills: {
            frontend: ["React.js", "Next.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"],
            backend: ["Java", "Python", "Node.js", "FastAPI", "MySQL", "MongoDB", "PostgreSQL"],
            devops: ["Docker", "Kubernetes", "AWS", "Git", "Microservices"],
            ai: ["OpenAI API", "Gemini API", "Token Forecasting", "AI Integration"]
        },
        
        contact: {
            email: "My email and contact info is available on this portfolio",
            resume: "My resume is available for download on this portfolio",
            github: "Check my portfolio links for GitHub",
            linkedin: "Check my portfolio links for LinkedIn"
        },
        
        fun: [
            "I enjoy Weight-lifting and Swimming",
            "I occasionally go hiking and traveling", 
            "I like going to places that I have never been"
        ]
    };
    
    // Intent Types (from your original intent.js)
    const INTENT_TYPES = {
        GREETING: "greeting",
        ABOUT: "about", 
        PROJECTS: "projects",
        SKILLS: "skills",
        EXPERIENCE: "experience",
        CONTACT: "contact",
        FUN: "fun",
        FALLBACK: "fallback"
    };
    
    // Intent Routing (adapted from your original)
    function routeIntent(query) {
        const s = query.toLowerCase().trim();
        
        // Greeting patterns (multilingual)
        if (/\b(hi|hello|hey|hola|bonjour|guten\s+tag|ciao|konnichiwa|annyeonghaseyo|안녕|namaste|howdy|sup|what's\s+up|whats\s+up|good\s+morning|good\s+afternoon|good\s+evening|hey\s+there|hey\s+man|heyy+|yo)\b/.test(s)) {
            return INTENT_TYPES.GREETING;
        }
        
        // About patterns
        if (/\b(who\s+(are\s+)?you|about\s+(you|yourself)|introduce\s+yourself|bio|background.*you)\b/.test(s)) {
            return INTENT_TYPES.ABOUT;
        }
        
        // Projects patterns
        if (/\b(projects?\s+(you\s+)?(built|made|developed|created|worked\s+on)|what.*projects|show.*projects|portfolio.*projects|rentspiracy|fabflix|decurb|built.*app|made.*website|developed.*platform)\b/.test(s)) {
            return INTENT_TYPES.PROJECTS;
        }
        
        // Skills patterns
        if (/\b(skills?|tech\s+stack|technologies|tools|languages|programming|frameworks?|what.*know|react|next|python|java|javascript|html|css|mongodb|mysql)\b/.test(s)) {
            return INTENT_TYPES.SKILLS;
        }
        
        // Experience patterns
        if (/\b(experience|internship|roles|education|university|uci|irvine|student|academic|hackathon|have\s+you\s+(ever\s+)?(done|participated|been\s+to|attended).*hackathon)\b/.test(s)) {
            return INTENT_TYPES.EXPERIENCE;
        }
        
        // Contact patterns
        if (/\b(contact|email|reach|hire|connect|linkedin|github|resume)\b/.test(s)) {
            return INTENT_TYPES.CONTACT;
        }
        
        // Fun patterns
        if (/\b(hobby|hobbies|fun|interests|personal|like|enjoy|free\s+time|outside\s+work)\b/.test(s)) {
            return INTENT_TYPES.FUN;
        }
        
        return INTENT_TYPES.FALLBACK;
    }
    
    // Generate intelligent responses based on intent and knowledge base
    function generateResponse(message, intent) {
        switch (intent) {
            case INTENT_TYPES.GREETING:
                return "Hello! Great to meet you! I'm Brian, a Software Engineering student at UC Irvine. I'd love to tell you about my projects, experience, or anything else you're curious about! 😊";
                
            case INTENT_TYPES.ABOUT:
                return `${brianKnowledgeBase.bio}\n\nI'm passionate about building innovative solutions and I'm active in hackathons and the Association for Computing Machinery at UCI. What would you like to know more about?`;
                
            case INTENT_TYPES.PROJECTS:
                let projectResponse = "I've worked on several exciting projects:\n\n";
                brianKnowledgeBase.projects.forEach((project, index) => {
                    projectResponse += `**${project.name}** (${project.year}) - ${project.status}\n`;
                    projectResponse += `${project.description}\n`;
                    projectResponse += `**Tech Stack:** ${project.techStack.join(", ")}\n\n`;
                });
                return projectResponse + "Which project would you like to know more about?";
                
            case INTENT_TYPES.SKILLS:
                return `My technical skills span across multiple areas:\n\n**Frontend:** ${brianKnowledgeBase.skills.frontend.join(", ")}\n\n**Backend:** ${brianKnowledgeBase.skills.backend.join(", ")}\n\n**DevOps & Infrastructure:** ${brianKnowledgeBase.skills.devops.join(", ")}\n\n**AI & APIs:** ${brianKnowledgeBase.skills.ai.join(", ")}\n\nWhat specific technology are you curious about?`;
                
            case INTENT_TYPES.EXPERIENCE:
                return "I'm currently a Software Engineering student at UC Irvine, where I'm involved with the Association for Computing Machinery and Hacks at UCI. I have experience in:\n\n• Full-stack web development with modern frameworks\n• AI integration and API development  \n• Cloud deployment and microservices architecture\n• Hackathon participation and collaborative development\n\nI'm passionate about building solutions that help businesses cut costs and improve efficiency. What aspect of my experience interests you most?";
                
            case INTENT_TYPES.CONTACT:
                return `You can find my contact information right here on this portfolio! 📧\n\n${brianKnowledgeBase.contact.email}\n${brianKnowledgeBase.contact.resume}\n${brianKnowledgeBase.contact.github}\n${brianKnowledgeBase.contact.linkedin}\n\nFeel free to connect with me - I'd love to chat about opportunities or collaborations!`;
                
            case INTENT_TYPES.FUN:
                return `Outside of coding, I enjoy:\n\n${brianKnowledgeBase.fun.map(item => `• ${item}`).join('\n')}\n\nI love exploring new places and staying active! It helps me stay creative and focused when I'm working on technical projects. What about you - what do you enjoy doing in your free time?`;
                
            default:
                // Smart fallback - check if question seems Brian-related
                if (/\b(you|your|brian)\b/.test(message.toLowerCase())) {
                    return "I'd be happy to help! I can tell you about my projects, technical skills, experience at UC Irvine, or anything else you'd like to know about me. What specifically interests you?";
                } else {
                    return "That seems like it's not related to me or my portfolio! I'm here to chat about my projects, skills, experiences, education, or anything else you'd like to know about me personally. What would you like to know about my work?";
                }
        }
    }
    
    // Chat Variables
    let chatMessages = [];
    let isTyping = false;
    let botIsTyping = false;
    let placeholderTyping = false;
    
    // Enhanced chat functionality with full sophistication
    function setupChatFunctionality() {
        const chatInput = document.getElementById('chat-input');
        const submitButton = document.getElementById('submit-button');
        const chatMessages = document.getElementById('chat-messages');
        const chatWrapper = document.getElementById('chatbot-wrapper');
        const clearButton = document.getElementById('clear-chat');
        
        let typingReady = false;
        let messages = [];
        
        // Initialize placeholder typing animation
        setTimeout(() => {
            typingReady = true;
            startPlaceholderAnimation();
        }, 2000);
        
        // Placeholder typing animation (like original)
        function startPlaceholderAnimation() {
            const fullText = "Ask anything about Brian!";
            let currentIndex = 0;
            
            function typeText() {
                if (currentIndex <= fullText.length) {
                    chatInput.placeholder = fullText.slice(0, currentIndex) + (currentIndex < fullText.length ? '|' : '');
                    currentIndex++;
                    setTimeout(typeText, 50);
                } else {
                    chatInput.placeholder = fullText;
                }
            }
            
            typeText();
        }
        
        // Enable/disable submit button based on input
        chatInput.addEventListener('input', function() {
            submitButton.disabled = !this.value.trim();
        });
        
        // Handle form submission
        window.handleChatSubmit = function(e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            
            if (message) {
                addMessage(message, true);
                chatInput.value = '';
                submitButton.disabled = true;
                
                // Show typing indicator
                showTypingIndicator();
                
                // Process response after delay
                setTimeout(() => {
                    hideTypingIndicator();
                    const intent = routeIntent(message);
                    const response = generateResponse(message, intent);
                    addMessage(response, false);
                }, 800 + Math.random() * 1200); // Realistic typing delay
            }
        };
        
        // Add message to chat
        function addMessage(text, isUser) {
            const messageId = Date.now();
            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            messages.push({
                id: messageId,
                text: text,
                isUser: isUser,
                timestamp: timestamp
            });
            
            renderMessages();
            updateChatState();
            scrollToBottom();
        }
        
        // Render all messages
        function renderMessages() {
            if (messages.length === 0) {
                chatMessages.innerHTML = `
                    <div class="empty-state">
                        <img src="assets/seo1.svg" alt="Brian" class="empty-state-image" style="width: 64px; height: 64px; margin-bottom: 1rem; color: #05d9e8;">
                        <div class="empty-state-subtext">Ask me anything about my projects, experience, or interests!</div>
                    </div>
                `;
                chatMessages.classList.add('empty');
            } else {
                chatMessages.classList.remove('empty');
                chatMessages.innerHTML = messages.map(msg => `
                    <div class="message ${msg.isUser ? 'user' : 'bot'}">
                        <div class="message-avatar">
                            ${msg.isUser ? 'U' : 'B'}
                        </div>
                        <div class="message-content">
                            <div class="message-bubble">
                                ${parseMarkdown(msg.text)}
                            </div>
                            <div class="message-time">${msg.timestamp}</div>
                        </div>
                    </div>
                `).join('');
            }
        }
        
        // Parse markdown formatting
        function parseMarkdown(text) {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
        }
        
        // Show typing indicator
        function showTypingIndicator() {
            botIsTyping = true;
            const typingHtml = `
                <div class="message bot" id="typing-message">
                    <div class="message-avatar">B</div>
                    <div class="message-content">
                        <div class="message-bubble typing-indicator">
                            <span>Typing</span>
                            <div class="typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            if (messages.length === 0) {
                chatMessages.classList.remove('empty');
                chatMessages.innerHTML = typingHtml;
            } else {
                chatMessages.insertAdjacentHTML('beforeend', typingHtml);
            }
            
            scrollToBottom();
        }
        
        // Hide typing indicator
        function hideTypingIndicator() {
            botIsTyping = false;
            const typingMessage = document.getElementById('typing-message');
            if (typingMessage) {
                typingMessage.remove();
            }
        }
        
        // Update chat state (show/hide clear button, adjust wrapper size)
        function updateChatState() {
            if (messages.length > 0) {
                chatWrapper.classList.remove('empty');
                clearButton.style.display = 'block';
            } else {
                chatWrapper.classList.add('empty');
                clearButton.style.display = 'none';
            }
            
            // Expand chat when there are messages
            setChatExpanded(messages.length > 0);
        }
        
        // Clear chat messages
        window.clearChatMessages = function() {
            messages = [];
            renderMessages();
            updateChatState();
        };
        
        // Scroll to bottom
        function scrollToBottom() {
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 50);
        }
        
        // Initialize
        renderMessages();
        updateChatState();
    }
    
    // Chat expanded state handler
    function setChatExpanded(expanded) {
        chatExpanded = expanded;
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            if (expanded) {
                heroText.classList.add('chat-expanded');
            } else {
                heroText.classList.remove('chat-expanded');
            }
        }
    }
    
    // Project data - Complete structure from original portfolio
    const projectData = [
        {
            title: "Portfolio Website",
            description: "A portfolio website to showcase my projects and skills.",
            detailedDescription: "Built a modern, responsive portfolio website built with Next.js 15 and React 19, featuring animated neural network backgrounds, interactive project carousel, AI chatbot integration, and glassmorphism design. Includes dynamic routing for project details, smooth scroll animations, custom scrollbars, and comprehensive responsive design. Showcases advanced CSS techniques, React hooks, and modern web development practices with full mobile optimization.",
            images: ["assets/website.png"],
            tech: ["Next.js", "React.js", "JavaScript", "Tailwind CSS", "CSS"],
            status: "Completed",
            year: "2025",
            github: "https://github.com/bseo97/Portfolio",
            demo: null
        },
        {
            title: "Rent-spiracy",
            description: "Built a website for a 3-person team hackathon project that allows users search for potential scams.",
            detailedDescription: "Rent-spiracy is a hackathon project developed by a 3-person team to help users identify and avoid potential rental scams. The platform allows users to search for properties and cross-reference them against known scam databases, providing real-time alerts and risk assessments. Built with Next.js and TypeScript for a robust frontend experience, the application integrates with MongoDB for data storage and utilizes Python backend services for advanced data processing. The Gemini API powers intelligent scam detection algorithms, analyzing listing patterns, pricing anomalies, and user reports to provide comprehensive fraud prevention. This project demonstrates rapid prototyping skills, API integration, and collaborative development in a time-constrained hackathon environment.",
            images: ["assets/Rentspiracy.png"],
            tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Python", "Gemini API"],
            status: "Live",
            year: "2025",
            github: "https://github.com/bseo97/Rent-Spiracy",
            demo: "https://www.youtube.com/watch?v=CsMjk4ld_aA&t=10s"
        },
        {
            title: "Fabflix (renamed to Decurb – Academic Project)",
            description: "A full-stack movie eCommerce platform with secure login, dynamic search, chatbot integration, and full AWS deployment.",
            detailedDescription: "Fabflix is a full-stack movie eCommerce web application that allows users to search, browse, and purchase movies through a secure and interactive interface. Built using Java Servlets, MySQL, and AJAX-powered front-end technologies, the platform supports advanced features such as fuzzy search, dynamic shopping cart, and an AI-powered chatbot integrated via the OpenAI API. I implemented secure login with JWT, optimized SQL performance, automated XML data import, and successfully deployed the application on AWS using Docker and Kubernetes, demonstrating a scalable microservices architecture before shutting down the server due to cost constraints. You can test the full project locally by visiting my GitHub repository, Fabflix!",
            images: ["assets/Decurb_main.png", "assets/Decurb_login.png"],
            tech: ["Java", "MySQL", "JavaScript (AJAX)", "HTML/CSS", "Servlet", "JDBC", "Docker", "Kubernetes", "AWS", "Microservices"],
            status: "Completed",
            year: "2025",
            github: "https://github.com/bseo97/Fabflix",
            demo: "https://youtu.be/R7KXw658VMg"
        },
        {
            title: "Decurb – AI Token Forecasting & Optimization Platform",
            description: "An AI infrastructure platform designed to minimize token usage and prevent hallucinations across LLM workflows.",
            detailedDescription: "Decurb is an AI platform I'm currently leading as part of a collaborative team project, aimed at helping users better understand and optimize how much \"token space\" their prompts and completions consume when interacting with large language models like GPT. The platform analyzes token usage in real-time, forecasts when prompts are likely to exceed model limits or produce incomplete responses, and proactively manages those cases by breaking complex prompts into smaller subproblems. It also caches reusable outputs and recombines them intelligently to reduce cost while preserving accuracy and performance. Decurb was born out of both technical curiosity and a practical need for scalable, efficient AI workflows—especially in applications that involve long or dynamic user interactions. Stay Tuned!",
            images: ["assets/Decurb.png"],
            tech: ["Python", "FastAPI", "PostgreSQL", "OpenAI API", "Regex", "Prompt Pattern Matching", "Token Forecasting Heuristics", "Modular Inference Planning", "Caching (LRU/Memoization)", "Docker", "Kubernetes", "AWS EC2", "JWT", "React", "marked.js"],
            status: "In Progress",
            year: "2025",
            github: null,
            demo: null
        }
    ];
    
    // Sophisticated Project Modal (Original Design)
    function setupProjectModal() {
        window.openProjectModal = function(projectIndex) {
            const project = projectData[projectIndex];
            const modal = document.getElementById('project-modal');
            
            // Get all modal elements
            const modalYear = document.getElementById('modal-year');
            const modalProjectNumber = document.getElementById('modal-project-number');
            const modalTitle = document.getElementById('modal-title');
            const modalShortDescription = document.getElementById('modal-short-description');
            const modalStatusDot = document.getElementById('modal-status-dot');
            const modalStatusText = document.getElementById('modal-status-text');
            const modalDetailedDescription = document.getElementById('modal-detailed-description');
            const modalTechGrid = document.getElementById('modal-tech-grid');
            const modalActionButtons = document.getElementById('modal-action-buttons');
            const modalImages = document.getElementById('modal-images');
            
            // Update meta info
            if (modalYear) modalYear.textContent = project.year;
            if (modalProjectNumber) modalProjectNumber.textContent = `Project ${projectIndex + 1} of ${projectData.length}`;
            
            // Update title and descriptions
            if (modalTitle) modalTitle.textContent = project.title;
            if (modalShortDescription) modalShortDescription.textContent = project.description;
            if (modalDetailedDescription) modalDetailedDescription.textContent = project.detailedDescription;
            
            // Update status
            if (modalStatusDot && modalStatusText) {
                const statusClass = project.status === 'Completed' ? 'status-green' : 
                                  project.status === 'Live' ? 'status-blue' : 
                                  'status-yellow';
                const statusTextClass = project.status === 'Completed' ? 'status-green-text' : 
                                       project.status === 'Live' ? 'status-blue-text' : 
                                       'status-yellow-text';
                
                modalStatusDot.className = `status-dot ${statusClass}`;
                modalStatusText.className = `status-text ${statusTextClass}`;
                modalStatusText.textContent = project.status;
            }
            
            // Update tech stack with sophisticated design
            if (modalTechGrid) {
                modalTechGrid.innerHTML = '';
                project.tech.forEach(tech => {
                    const techItem = document.createElement('div');
                    techItem.className = 'modal-tech-item';
                    
                    const techIcon = document.createElement('div');
                    techIcon.className = 'modal-tech-icon';
                    techIcon.textContent = tech.charAt(0).toUpperCase();
                    
                    const techText = document.createElement('span');
                    techText.textContent = tech;
                    
                    techItem.appendChild(techIcon);
                    techItem.appendChild(techText);
                    modalTechGrid.appendChild(techItem);
                });
            }
            
            // Update action buttons
            if (modalActionButtons) {
                modalActionButtons.innerHTML = '';
                
                if (project.demo) {
                    const demoBtn = document.createElement('a');
                    demoBtn.href = project.demo;
                    demoBtn.target = '_blank';
                    demoBtn.rel = 'noopener noreferrer';
                    demoBtn.className = 'modal-btn modal-btn-primary';
                    demoBtn.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        <span>View Demo</span>
                    `;
                    modalActionButtons.appendChild(demoBtn);
                }
                
                if (project.github) {
                    const githubBtn = document.createElement('a');
                    githubBtn.href = project.github;
                    githubBtn.target = '_blank';
                    githubBtn.rel = 'noopener noreferrer';
                    githubBtn.className = 'modal-btn modal-btn-secondary';
                    githubBtn.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                    `;
                    modalActionButtons.appendChild(githubBtn);
                }
                
                if (!project.demo && !project.github) {
                    const inProgressBtn = document.createElement('button');
                    inProgressBtn.className = 'modal-btn modal-btn-disabled';
                    inProgressBtn.disabled = true;
                    inProgressBtn.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>In Development</span>
                    `;
                    modalActionButtons.appendChild(inProgressBtn);
                }
            }
            
            // Update images
            if (modalImages) {
                modalImages.innerHTML = '';
                project.images.forEach((image, idx) => {
                    const imageWrapper = document.createElement('div');
                    imageWrapper.className = 'modal-image-wrapper';
                    
                    const img = document.createElement('img');
                    img.src = image;
                    img.alt = `${project.title} - Screenshot ${idx + 1}`;
                    img.className = 'modal-image';
                    img.loading = 'lazy';
                    
                    imageWrapper.appendChild(img);
                    modalImages.appendChild(imageWrapper);
                });
            }
            
            // Show modal with animation
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        
        window.closeProjectModal = function() {
            const modal = document.getElementById('project-modal');
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 300);
        };
        
        // Close modal on outside click
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    window.closeProjectModal();
                }
            });
        }
        
        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                window.closeProjectModal();
            }
        });
    }
    
    // Background Animations - Shooting Stars
    class ShootingStar {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.reset();
        }
        
        reset() {
            // Start from random position along top and left edges
            if (Math.random() > 0.5) {
                this.x = Math.random() * this.canvas.width;
                this.y = -10;
            } else {
                this.x = -10;
                this.y = Math.random() * this.canvas.height * 0.3;
            }
            
            // Velocity for diagonal movement
            this.vx = Math.random() * 3 + 2;
            this.vy = Math.random() * 3 + 2;
            
            // Trail properties
            this.trail = [];
            this.trailLength = Math.random() * 20 + 15;
            this.size = Math.random() * 1.5 + 1;
            this.brightness = Math.random() * 0.5 + 0.5;
            this.life = 1.0;
            this.decay = Math.random() * 0.015 + 0.005;
            
            // Color variation - keep all white/blue tones
            this.hue = Math.random() * 30 + 200; // Blue to white range
        }
        
        update() {
            // Store current position in trail
            this.trail.push({ x: this.x, y: this.y, life: this.life });
            
            // Remove old trail points
            if (this.trail.length > this.trailLength) {
                this.trail.shift();
            }
            
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            
            // Fade out over time
            this.life -= this.decay;
            
            // Check if off screen or faded
            return this.life > 0 && 
                   this.x < this.canvas.width + 50 && 
                   this.y < this.canvas.height + 50;
        }
        
        draw() {
            this.ctx.save();
            
            // Draw trail
            for (let i = 0; i < this.trail.length; i++) {
                const point = this.trail[i];
                const trailOpacity = (i / this.trail.length) * point.life * this.brightness;
                const trailSize = (i / this.trail.length) * this.size;
                
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
                this.ctx.fillStyle = `hsla(${this.hue}, 100%, 90%, ${trailOpacity})`;
                this.ctx.fill();
                
                // Add glow effect
                this.ctx.shadowBlur = 8;
                this.ctx.shadowColor = `hsla(${this.hue}, 100%, 90%, ${trailOpacity * 0.5})`;
                this.ctx.fill();
            }
            
            // Draw main star (brightest point)
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${this.hue}, 100%, 95%, ${this.life * this.brightness})`;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = `hsla(${this.hue}, 100%, 90%, ${this.life * 0.8})`;
            this.ctx.fill();
            
            this.ctx.restore();
        }
    }
    
    class ShootingStarSystem {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) return;
            
            this.ctx = this.canvas.getContext('2d');
            this.stars = [];
            this.maxStars = 5;
            
            this.resizeCanvas();
            this.animate();
            
            // Create new stars more frequently
            this.starInterval = setInterval(() => {
                if (this.stars.length < this.maxStars && Math.random() > 0.6) {
                    this.stars.push(new ShootingStar(this.canvas));
                    
                    // 50% chance to spawn a second star shortly after
                    if (Math.random() > 0.5) {
                        setTimeout(() => {
                            if (this.stars.length < this.maxStars) {
                                this.stars.push(new ShootingStar(this.canvas));
                            }
                        }, Math.random() * 500 + 200);
                    }
                }
            }, 1500);
            
            // Handle resize
            this.resizeHandler = () => this.resizeCanvas();
            window.addEventListener('resize', this.resizeHandler);
        }
        
        resizeCanvas() {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        }
        
        animate() {
            // Completely clear canvas to prevent lingering marks
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update and draw stars
            this.stars = this.stars.filter(star => {
                const alive = star.update();
                if (alive) {
                    star.draw();
                }
                return alive;
            });
            
            this.animationFrame = requestAnimationFrame(() => this.animate());
        }
        
        destroy() {
            if (this.starInterval) clearInterval(this.starInterval);
            if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
            if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
        }
    }
    
    // Neural Network Background
    function createNeuralNetwork() {
        const container = document.getElementById('neural-network');
        if (!container) return;
        
        // Clear existing nodes
        container.innerHTML = '';
        
        const nodes = [];
        const nodeCount = Math.min(10, Math.floor(window.innerWidth / 100));
        
        // Create nodes only in top 60% of screen
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            
            const x = Math.random() * (window.innerWidth - 50) + 25;
            const y = Math.random() * (window.innerHeight * 0.6) + 25;
            
            Object.assign(node.style, {
                position: 'absolute',
                width: '12px',
                height: '12px',
                background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))',
                borderRadius: '50%',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)',
                left: x + 'px',
                top: y + 'px',
                animation: 'advancedPulse 4s ease-in-out infinite',
                zIndex: '2'
            });
            
            if (i % 2 === 1) node.style.animationDelay = '0.8s';
            if (i % 3 === 0) node.style.animationDelay = '1.6s';
            
            container.appendChild(node);
            nodes.push({ element: node, x, y });
        }
        
        // Create connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(nodes[i].x - nodes[j].x, 2) + 
                    Math.pow(nodes[i].y - nodes[j].y, 2)
                );
                
                if (distance < Math.min(200, window.innerWidth * 0.25)) {
                    const connection = document.createElement('div');
                    connection.className = 'neural-connection';
                    
                    const angle = Math.atan2(
                        nodes[j].y - nodes[i].y,
                        nodes[j].x - nodes[i].x
                    ) * 180 / Math.PI;
                    
                    Object.assign(connection.style, {
                        position: 'absolute',
                        height: '0.5px',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                        opacity: '0',
                        left: nodes[i].x + 'px',
                        top: nodes[i].y + 'px',
                        width: distance + 'px',
                        transform: `rotate(${angle}deg)`,
                        transformOrigin: '0 50%',
                        animation: 'flow 4s ease-in-out infinite',
                        animationDelay: Math.random() * 4 + 's'
                    });
                    
                    container.appendChild(connection);
                }
            }
        }
    }
    
    // Create star network
    function createStarNetwork() {
        const container = document.getElementById('star-network');
        if (!container) return;
        
        // Clear existing stars
        container.innerHTML = '';
        
        const stars = [];
        const starCount = Math.min(6, Math.floor(window.innerWidth / 200));
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star-node';
            
            const x = Math.random() * (window.innerWidth - 50) + 25;
            const y = Math.random() * (window.innerHeight * 0.6) + 25;
            
            Object.assign(star.style, {
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 40%, transparent 70%)',
                borderRadius: '50%',
                left: x + 'px',
                top: y + 'px',
                animation: 'advancedStarTwinkle 6s ease-in-out infinite',
                zIndex: '2'
            });
            
            if (i % 2 === 1) star.style.animationDelay = '1s';
            if (i % 3 === 0) star.style.animationDelay = '2s';
            
            // Add star cross effect
            const before = document.createElement('div');
            Object.assign(before.style, {
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '16px',
                height: '1.5px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                transform: 'translate(-50%, -50%)',
                borderRadius: '2px'
            });
            
            const after = document.createElement('div');
            Object.assign(after.style, {
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '1.5px',
                height: '16px',
                background: 'linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                transform: 'translate(-50%, -50%)',
                borderRadius: '2px'
            });
            
            star.appendChild(before);
            star.appendChild(after);
            
            container.appendChild(star);
            stars.push({ element: star, x, y });
        }
    }
    
    // Create particles for dark mode
    function createParticles() {
        const container = document.getElementById('home');
        if (!container || !isDarkMode) return;
        
        const particleCount = Math.min(12, Math.floor(window.innerWidth / 120));
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            const initialSize = Math.random() * 2 + 2;
            Object.assign(particle.style, {
                position: 'absolute',
                background: '#ffffff',
                borderRadius: '50%',
                opacity: '0.7',
                width: initialSize + 'px',
                height: initialSize + 'px',
                left: Math.random() * window.innerWidth + 'px',
                top: Math.random() * (window.innerHeight * 0.6) + 'px',
                animation: 'particleFloat 6s ease-in-out infinite',
                animationDelay: Math.random() * 6 + 's',
                animationDuration: (Math.random() * 4 + 4) + 's',
                pointerEvents: 'none',
                zIndex: '2'
            });
            
            container.appendChild(particle);
        }
    }
    
    // Create light mode floating particles
    function createLightModeParticles() {
        const container = document.getElementById('home');
        if (!container || isDarkMode) return;
        
        const containerRect = container.getBoundingClientRect();
        
        // Create floating particles for light mode
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'light-particle';
                particle.style.left = Math.random() * containerRect.width + 'px';
                particle.style.top = containerRect.height + 'px'; // Start from bottom
                particle.style.width = (Math.random() * 4 + 2) + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
                particle.style.zIndex = '2';
                container.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                    }
                }, 10000);
            }, i * 300);
        }
    }
    
    // Continuous light mode particle generation
    function startLightModeParticleSystem() {
        if (!isDarkMode) {
            createLightModeParticles();
            
            // Continue generating particles every 5 seconds
            setTimeout(() => {
                if (!isDarkMode) {
                    startLightModeParticleSystem();
                }
            }, 5000);
        }
    }
    
    // Dark mode elements management
    let shootingStarSystem = null;
    
    function createDarkModeElements() {
        if (isDarkMode) {
            createNeuralNetwork();
            createStarNetwork();
            createParticles();
            
            // Initialize shooting star system
            if (shootingStarSystem) {
                shootingStarSystem.destroy();
            }
            shootingStarSystem = new ShootingStarSystem('shootingCanvas');
            
            // Activate animations
            setTimeout(() => {
                const canvas = document.getElementById('shootingCanvas');
                const neuralNetwork = document.getElementById('neural-network');
                const starNetwork = document.getElementById('star-network');
                
                if (canvas) canvas.classList.add('active');
                if (neuralNetwork) neuralNetwork.classList.add('active');
                if (starNetwork) starNetwork.classList.add('active');
            }, 300);
        }
    }
    
    function removeDarkModeElements() {
        // Deactivate animations
        const canvas = document.getElementById('shootingCanvas');
        const neuralNetwork = document.getElementById('neural-network');
        const starNetwork = document.getElementById('star-network');
        const homeContainer = document.getElementById('home');
        
        if (canvas) canvas.classList.remove('active');
        if (neuralNetwork) neuralNetwork.classList.remove('active');
        if (starNetwork) starNetwork.classList.remove('active');
        
        // Destroy shooting star system
        if (shootingStarSystem) {
            shootingStarSystem.destroy();
            shootingStarSystem = null;
        }
        
        // Clear containers
        if (neuralNetwork) neuralNetwork.innerHTML = '';
        if (starNetwork) starNetwork.innerHTML = '';
        
        // Remove dark mode particles
        if (homeContainer) {
            const particles = homeContainer.querySelectorAll('.floating-particle');
            particles.forEach(particle => particle.remove());
        }
    }
    
    // Mobile drawer functionality
    function setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const drawer = document.getElementById('mobile-drawer');
        const overlay = document.getElementById('drawer-overlay');
        const closeBtn = document.getElementById('drawer-close-btn');
        const drawerLinks = document.querySelectorAll('.drawer-link');
        
        if (!mobileMenuBtn || !drawer || !overlay) return;
        
        // Open drawer
        function openDrawer() {
            drawer.classList.add('open');
            overlay.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }
        
        // Close drawer
        function closeDrawer() {
            drawer.classList.remove('open');
            overlay.classList.remove('visible');
            document.body.style.overflow = '';
        }
        
        // Event listeners
        mobileMenuBtn.addEventListener('click', openDrawer);
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeDrawer);
        }
        
        overlay.addEventListener('click', closeDrawer);
        
        // Close drawer when clicking links
        drawerLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeDrawer();
                
                // Update active state
                drawerLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Update drawer active links based on current section
        function updateDrawerActiveLinks() {
            const sections = document.querySelectorAll('section[id]');
            let currentSection = 'home';
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSection = sectionId;
                }
            });
            
            drawerLinks.forEach(link => {
                const linkSection = link.getAttribute('data-section');
                
                if (linkSection === currentSection) {
                    link.classList.add('active');
                    link.style.color = '#53c9c9';
                    link.style.background = 'rgba(83, 201, 201, 0.1)';
                } else {
                    link.classList.remove('active');
                    link.style.color = '';
                    link.style.background = '';
                }
            });
        }
        
        window.addEventListener('scroll', updateDrawerActiveLinks);
        updateDrawerActiveLinks();
    }
    
    // Handler for subtitle animation end
    const handleSubtitleAnimationEnd = () => {
        headingAnimationDone = true;
        // Enable chat interaction after hero animations
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.style.opacity = '1';
        }
    }
    
    // Sophisticated Projects Slider (Original Design)
    function setupProjectsSlider() {
        const sliderTrack = document.querySelector('.projects-slider-track');
        const slides = document.querySelectorAll('.project-slider-card');
        const prevButton = document.getElementById('slider-prev');
        const nextButton = document.getElementById('slider-next');
        const dotsContainer = document.getElementById('slider-dots');
        
        if (!sliderTrack || !slides.length) return;
        
        let currentIndex = 0;
        let slidesToShow = 3; // Default for desktop
        let autoplayInterval;
        const autoplaySpeed = 3000;
        let isTransitioning = false;
        
        // Calculate slides to show based on window width
        function updateSlidesToShow() {
            const width = window.innerWidth;
            if (width < 640) {
                slidesToShow = 1;
            } else if (width < 1024) {
                slidesToShow = 2;
            } else {
                slidesToShow = 3;
            }
        }
        
        // Create dots
        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const totalDots = Math.ceil(slides.length - slidesToShow + 1);
            
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.className = 'slider-dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }
        
        // Update dots
        function updateDots() {
            if (!dotsContainer) return;
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Go to specific slide
        function goToSlide(index) {
            if (isTransitioning) return;
            
            const maxIndex = Math.max(0, slides.length - slidesToShow);
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            
            isTransitioning = true;
            updateSliderPosition();
            updateDots();
            
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
        
        // Update slider position
        function updateSliderPosition() {
            const slideWidth = slides[0].offsetWidth;
            const gap = parseFloat(getComputedStyle(sliderTrack).gap) || 24;
            const offset = -currentIndex * (slideWidth + gap);
            sliderTrack.style.transform = `translateX(${offset}px)`;
        }
        
        // Next slide
        function nextSlide() {
            const maxIndex = Math.max(0, slides.length - slidesToShow);
            if (currentIndex < maxIndex) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0); // Loop back to start
            }
        }
        
        // Previous slide
        function prevSlide() {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else {
                // Go to last slide
                const maxIndex = Math.max(0, slides.length - slidesToShow);
                goToSlide(maxIndex);
            }
        }
        
        // Start autoplay
        function startAutoplay() {
            stopAutoplay(); // Clear any existing interval
            autoplayInterval = setInterval(nextSlide, autoplaySpeed);
        }
        
        // Stop autoplay
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }
        
        // Event listeners
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                stopAutoplay();
                startAutoplay(); // Restart autoplay after user interaction
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                stopAutoplay();
                startAutoplay(); // Restart autoplay after user interaction
            });
        }
        
        // Pause on hover
        const sliderWrapper = document.querySelector('.projects-slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', stopAutoplay);
            sliderWrapper.addEventListener('mouseleave', startAutoplay);
        }
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (sliderTrack) {
            sliderTrack.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoplay();
            });
            
            sliderTrack.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoplay();
            });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const oldSlidesToShow = slidesToShow;
                updateSlidesToShow();
                
                if (oldSlidesToShow !== slidesToShow) {
                    currentIndex = 0; // Reset to first slide
                    createDots();
                }
                
                updateSliderPosition();
                updateDots();
            }, 250);
        });
        
        // Initialize
        updateSlidesToShow();
        createDots();
        updateSliderPosition();
        startAutoplay();
    }
    
    // Initialize everything
    function init() {
        hideLoadingScreen();
        initTheme();
        setupThemeToggle();
        setupActiveSection();
        setupHeaderScroll();
        setupSmoothScrolling();
        setupScrollAnimations();
        setupChatFunctionality();
        setupProjectModal();
        setupMobileMenu();
        setupProjectsSlider();
        
        // Set heading animation as done after delay
        setTimeout(() => {
            handleSubtitleAnimationEnd();
        }, 2000);
        
        // Start light mode particle system if in light mode
        if (!isDarkMode) {
            setTimeout(() => {
                startLightModeParticleSystem();
            }, 2000);
        }
    }
    
    // Start the application
    init();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (isDarkMode) {
            // Clean up existing elements first
            const neuralNetwork = document.getElementById('neural-network');
            const starNetwork = document.getElementById('star-network');
            const homeContainer = document.getElementById('home');
            
            if (neuralNetwork) neuralNetwork.innerHTML = '';
            if (starNetwork) starNetwork.innerHTML = '';
            if (homeContainer) {
                const particles = homeContainer.querySelectorAll('.floating-particle');
                particles.forEach(particle => particle.remove());
            }
            
            // Recreate elements with new dimensions
            setTimeout(() => {
                createNeuralNetwork();
                createStarNetwork();
                createParticles();
                
                // Reactivate if needed
                if (neuralNetwork) neuralNetwork.classList.add('active');
                if (starNetwork) starNetwork.classList.add('active');
            }, 100);
        }
    });
});