'use client'
import React from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useTheme } from '../../hooks/useTheme'

export default function AboutMe() {
  // Consolidate scroll animations with similar thresholds
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.2 })
  const [photoRef, photoVisible] = useScrollAnimation({ threshold: 0.3 })
  const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.3 })
  const { isDarkMode } = useTheme()

  return (
    <div className="about-me-section" id="about">
      <style jsx>{`
        .about-me-section {
          position: relative;
          background: transparent; /* unified body color shows through */
          /* Flow naturally after the hero and connect straight into Works —
             no forced full-viewport stage / vertical centering. */
          padding: 4rem 0 4rem;
        }

        .about-container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .about-title {
          font-size: clamp(2.25rem, 5vw, 3.25rem);
          font-weight: 600;
          letter-spacing: -0.035em;
          color: var(--text);
          text-align: center;
          margin-bottom: 3rem;
          font-family: var(--font-sans), sans-serif;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.32, 0.72, 0, 1);
        }

        .about-title.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .about-content {
          background: ${isDarkMode
            ? 'linear-gradient(180deg, rgba(34, 40, 72, 0.55), rgba(18, 22, 42, 0.45))'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.4))'};
          -webkit-backdrop-filter: blur(28px) saturate(1.7);
          backdrop-filter: blur(28px) saturate(1.7);
          border-radius: 28px;
          padding: 3rem;
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.09)' : 'rgba(255, 255, 255, 0.6)'};
          box-shadow: ${isDarkMode
            ? '0 30px 60px -30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 30px 60px -32px rgba(38, 41, 72, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.9)'};
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
        }

        .photo-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: translateX(-40px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .photo-section.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .profile-photo {
          width: 280px;
          height: 350px;
          border-radius: 22px;
          object-fit: cover;
          box-shadow: ${isDarkMode
            ? '0 26px 50px -22px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.08)'
            : '0 26px 50px -24px rgba(38, 41, 72, 0.32), inset 0 0 0 1px rgba(255, 255, 255, 0.5)'};
          margin-bottom: 1.5rem;
          border: 6px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.55)'};
        }

        .info-section {
          opacity: 0;
          transform: translateX(40px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s;
        }

        .info-section.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .info-content {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .education,
        .involvement,
        .interests {
          border-left: 2px solid ${isDarkMode ? 'rgba(83, 201, 201, 0.6)' : 'rgba(83, 201, 201, 0.55)'};
          padding-left: 1.5rem;
        }

        .education h3,
        .involvement h3,
        .interests h3 {
          color: var(--text);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 0.6rem;
          font-family: var(--font-sans), sans-serif;
        }

        .education p,
        .involvement p,
        .interests p {
          color: ${isDarkMode ? 'rgba(242, 242, 242, 0.72)' : 'rgba(26, 26, 26, 0.68)'};
          font-size: 1.05rem;
          line-height: 1.7;
          margin: 0;
        }

        .resume-button-section {
          margin-top: 2rem;
          display: flex;
          justify-content: flex-start;
        }

        .resume-button {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          background: linear-gradient(140deg, #7fe4e4 0%, #53c9c9 50%, #37b6b6 100%);
          color: #ffffff;
          padding: 0.65rem 0.65rem 0.65rem 1.5rem;
          border-radius: 999px;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.35s ease;
          box-shadow: 0 12px 26px -10px rgba(83, 201, 201, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          font-family: var(--font-sans), sans-serif;
        }

        .resume-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 34px -12px rgba(83, 201, 201, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.4);
        }

        .resume-button:active {
          transform: translateY(0) scale(0.98);
        }

        .resume-icon-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.22);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3);
          transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), background 0.3s ease;
        }

        .resume-button:hover .resume-icon-circle {
          background: rgba(255, 255, 255, 0.32);
          transform: translateY(2px) scale(1.05);
        }

        .resume-icon {
          width: 18px;
          height: 18px;
        }

        .involvement-item {
          margin-bottom: 0.5rem;
        }

        .involvement-item:last-child {
          margin-bottom: 0;
        }

        .hobbies {
          background: ${isDarkMode
            ? 'linear-gradient(180deg, rgba(34, 40, 72, 0.55), rgba(18, 22, 42, 0.45))'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.4))'};
          -webkit-backdrop-filter: blur(28px) saturate(1.7);
          backdrop-filter: blur(28px) saturate(1.7);
          border-radius: 28px;
          padding: 3rem;
          margin-top: 2rem;
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.09)' : 'rgba(255, 255, 255, 0.6)'};
          box-shadow: ${isDarkMode
            ? '0 30px 60px -30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 30px 60px -32px rgba(38, 41, 72, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.9)'};
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.32, 0.72, 0, 1) 0.2s;
          max-width: 1200px;
          margin: 2rem auto 0;
        }

        .hobbies.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hobbies h3 {
          color: var(--text);
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          font-family: var(--font-sans), sans-serif;
        }

        .hobbies-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .hobby-item {
          aspect-ratio: 1;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: ${isDarkMode
            ? '0 14px 30px -14px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.06)'
            : '0 14px 30px -16px rgba(38, 41, 72, 0.28), inset 0 0 0 1px rgba(255, 255, 255, 0.4)'};
          transition: transform 0.45s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.45s ease;
        }

        .hobby-item:hover {
          transform: translateY(-6px);
          box-shadow: ${isDarkMode
            ? '0 22px 40px -14px rgba(0, 0, 0, 0.6)'
            : '0 22px 40px -16px rgba(38, 41, 72, 0.4)'};
        }

        .hobby-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.32, 0.72, 0, 1);
        }

        .hobby-item:hover .hobby-image {
          transform: scale(1.06);
        }

        .hobby-description {
          color: var(--text);
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 1rem;
        }

        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .about-content,
          .hobbies {
            background: ${isDarkMode ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
          }
        }

        @media (max-width: 768px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
            padding: 2rem;
          }

          .photo-section {
            order: 1;
          }

          .info-section {
            order: 2;
          }

          .profile-photo {
            width: 220px;
            height: 280px;
          }

          .info-content {
            gap: 2rem;
          }

          .education,
          .involvement,
          .interests {
            text-align: left;
            border-left: 3px solid var(--accent);
            padding-left: 1rem;
          }

          .education h3,
          .involvement h3,
          .interests h3 {
            font-size: 1.5rem;
          }

          .education p,
          .involvement p,
          .interests p {
            font-size: 1.1rem;
          }

          .hobbies h3 {
            font-size: 1.5rem;
          }

          .hobby-description {
            font-size: 1.1rem;
          }

          .hobbies {
            padding: 2rem;
          }

          .hobbies-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.8rem;
          }

          .resume-button-section {
            justify-content: center;
            margin-top: 1.5rem;
          }

          .resume-button {
            font-size: 0.95rem;
            padding: 0.55rem 0.55rem 0.55rem 1.35rem;
          }

          .resume-icon {
            width: 17px;
            height: 17px;
          }
        }

        @media (max-width: 480px) {
          .about-container {
            padding: 0 1rem;
          }

          .about-content {
            padding: 1.5rem;
          }

          .profile-photo {
            width: 180px;
            height: 230px;
          }

          .hobbies {
            padding: 1.5rem;
          }

          .hobbies-grid {
            gap: 0.6rem;
          }

          .resume-button {
            font-size: 0.9rem;
            padding: 0.5rem 0.5rem 0.5rem 1.15rem;
          }

          .resume-icon {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>

      <div className="about-container">
        <h2
          ref={sectionRef}
          className={`about-title ${sectionVisible ? 'visible' : ''}`}
        >
          About Me
        </h2>

        <div className="about-content">
          <div 
            ref={photoRef}
            className={`photo-section ${photoVisible ? 'visible' : ''}`}
          >
            <img 
              src="/brian.JPG" 
              alt="Brian Seo"
              className="profile-photo"
            />
          </div>

          <div 
            ref={contentRef}
            className={`info-section ${contentVisible ? 'visible' : ''}`}
          >
            <div className="info-content">
              <div className="education">
                <h3>University of California, Irvine</h3>
                <p>B.S. Software Engineering ('26)</p>
              </div>

              <div className="involvement">
                <h3>Involvement</h3>
                <div className="involvement-item">
                  <p>Associate of Computing Machinery @ UCI (2023-2026)</p>
                </div>
                <div className="involvement-item">
                  <p>Hacks at UCI (2025-2026)</p>
                </div>
              </div>

              <div className="interests">
                <h3>Interests</h3>
                <p>AI/ML development, Full-stack Software Engineering</p>
              </div>

              <div className="resume-button-section">
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-button"
                >
                  <span className="resume-label">Download Resume</span>
                  <span className="resume-icon-circle" aria-hidden="true">
                    <svg className="resume-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 4v10m0 0l-4-4m4 4l4-4M5 19h14" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
} 