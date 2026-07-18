'use client'

import HomeComponent from './components/HomeComponent/HomeComponent'
import AboutMe from './components/AboutMe/AboutMe'
import ProjectIndex from "./components/ProjectIndex/ProjectIndex";
import { useScrollAnimation } from './hooks/useScrollAnimation';

export default function Home() {
  // Scroll animation hooks for different elements
  const [subtitleRef, subtitleVisible] = useScrollAnimation({ threshold: 0.2 })
  const [descriptionRef, descriptionVisible] = useScrollAnimation({ threshold: 0.2 })
  const [sliderRef, sliderVisible] = useScrollAnimation({ threshold: 0.1 })
  return (
    // minimum height = 100vh
    <main className="min-h-screen relative">
      {/* CSS Styles for Recent Works Section */}
      <style jsx>{`
        .recent-works-subtitle {
          color: var(--accent);
          font-size: clamp(2.5rem, 5vw, 3.25rem);
          font-weight: 800;
          margin-top: 1rem;
        }

        .projects-description {
          max-width: 65ch;
          font-size: 16px;
          color: var(--text);
          line-height: 2;
          margin-top: 1.25rem;
        }

        .projects-container {
          background: transparent; /* unified body color shows through */
          width: 100%;
          font-family: 'Inter', Arial, sans-serif;
          padding-top: 1.25rem;
          padding-bottom: 6rem;
          margin-top: 0;
        }

        @media (max-width: 768px) {
          .recent-works-subtitle {
            padding-left: 1.25rem;
          }
          
          .projects-description {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .recent-works-subtitle {
            padding-left: 80px;
          }
          
          .projects-description {
            padding-left: 80px;
          }
        }
      `}</style>

      {/*Home component self is a closing tag; therefore, we do not need closing tag.*/}
      <HomeComponent />
      
      {/* About Me Section */}
      <AboutMe />
      
      {/* Recent Works Section */}
      <div
        id="projects"
        className="projects-container"
      >
        <div className="container m-auto">
          <div>
            <p 
              ref={subtitleRef}
              className={`recent-works-subtitle ${subtitleVisible ? 'visible' : ''}`}
            >
              Recent Works
            </p>
            <p
              ref={descriptionRef}
              className={`projects-description ${descriptionVisible ? 'visible' : ''}`}
            >
            A selection of what I&apos;ve been building lately, from full-stack web apps to AI tooling. Hover any title to preview the work.
            </p>
          </div>
        </div>
        <div
          ref={sliderRef}
          className={`scroll-animate-delayed-3 ${sliderVisible ? 'visible' : ''}`}
        >
          <ProjectIndex/>
        </div>
      </div>

    </main>

  )
}
