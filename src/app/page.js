'use client'

import HomeComponent from './components/HomeComponent/HomeComponent'
import AboutMe from './components/AboutMe/AboutMe'
import ProjectIndex from "./components/ProjectIndex/ProjectIndex";
import AmbientOrbs from './components/AmbientOrbs/AmbientOrbs';
import AuroraBackground from './components/AuroraBackground/AuroraBackground';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useTheme } from './hooks/useTheme';

export default function Home() {
  const { isDarkMode } = useTheme()
  // Scroll animation hooks for different elements
  const [subtitleRef, subtitleVisible] = useScrollAnimation({ threshold: 0.2 })
  const [descriptionRef, descriptionVisible] = useScrollAnimation({ threshold: 0.2 })
  const [sliderRef, sliderVisible] = useScrollAnimation({ threshold: 0.1 })
  return (
    // minimum height = 100vh
    <main className="min-h-screen relative">
      {/* Shared dark-mode backdrop behind the whole page (fixed) so hero, About
          and Works read as one continuous surface while scrolling. */}
      {isDarkMode && <AuroraBackground />}
      {/* CSS Styles for Recent Works Section */}
      <style jsx>{`
        .recent-works-subtitle {
          color: var(--text);
          font-size: clamp(2.25rem, 5vw, 3.25rem);
          font-weight: 600;
          letter-spacing: -0.035em;
          margin-top: 0.6rem;
        }

        .projects-container {
          position: relative;
        }

        .projects-inner {
          position: relative;
          z-index: 1;
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
          font-family: var(--font-sans), sans-serif;
          /* Continues the About rhythm so the two read as one connected flow. */
          padding-top: 2rem;
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
        <AmbientOrbs variant="b" />
        <div className="projects-inner">
          <div className="container m-auto">
            <div>
              <p
                ref={subtitleRef}
                className={`recent-works-subtitle ${subtitleVisible ? 'visible' : ''}`}
              >
                Works
              </p>
              {/* <p
                ref={descriptionRef}
                className={`projects-description ${descriptionVisible ? 'visible' : ''}`}
              >
              A selection of what I&apos;ve been building lately, from full-stack web apps to AI tooling. Hover any title to preview the work.
              </p> */}
            </div>
          </div>
          <div
            ref={sliderRef}
            className={`scroll-animate-delayed-3 ${sliderVisible ? 'visible' : ''}`}
          >
            <ProjectIndex/>
          </div>
        </div>
      </div>

    </main>

  )
}
