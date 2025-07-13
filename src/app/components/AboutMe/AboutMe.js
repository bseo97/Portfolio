'use client'
import React from 'react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

export default function AboutMe() {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold: 0.2 })
  const [photoRef, photoVisible] = useScrollAnimation({ threshold: 0.3 })
  const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.3 })
  const [hobbiesRef, hobbiesVisible] = useScrollAnimation({ threshold: 0.3 })

  return (
    <div className="about-me-section" id="about">
      <style jsx>{`
        .about-me-section {
          min-height: 100vh;
          background: linear-gradient(180deg, #475569 0%, #64748b 30%, #94a3b8 60%, #cbd5e1 90%, #e2e8f0 100%);
          padding: 4rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .about-title {
          font-size: clamp(3rem, 6vw, 4rem);
          font-weight: bold;
          color: #F7FBFD;
          text-align: center;
          margin-bottom: 3rem;
          font-family: 'Inter', Arial, sans-serif;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .about-title.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .about-content {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          align-items: start;
          margin-bottom: 4rem;
          max-width: 1200px;
          margin: 0 auto 4rem auto;
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
          border-radius: 20px;
          object-fit: cover;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          margin-bottom: 1.5rem;
          border: 4px solid rgba(255, 255, 255, 0.1);
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
          border-left: 4px solid #05d9e8;
          padding-left: 1.5rem;
        }

        .education h3,
        .involvement h3,
        .interests h3 {
          color: #05d9e8;
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 0.8rem;
          font-family: 'Inter', Arial, sans-serif;
        }

        .education p,
        .involvement p,
        .interests p {
          color: #ffffff;
          font-size: 1.2rem;
          line-height: 1.8;
          margin: 0;
        }

        .involvement-item {
          margin-bottom: 0.5rem;
        }

        .involvement-item:last-child {
          margin-bottom: 0;
        }

        .hobbies {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 3rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hobbies.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hobbies h3 {
          color: #05d9e8;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          font-family: 'Inter', Arial, sans-serif;
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
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
        }

        .hobby-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .hobby-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .hobby-image:hover {
          transform: scale(1.05);
        }

        .hobby-description {
          color: #ffffff;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
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
            border-left: 3px solid #05d9e8;
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

          .hobbies {
            padding: 2rem;
          }

          .hobbies-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.8rem;
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
              src="/brian.jpg" 
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
                  <p>Associate of Computing Machinery @ UCI (2023-present)</p>
                </div>
                <div className="involvement-item">
                  <p>Hacks at UCI (2025-present)</p>
                </div>
              </div>

              <div className="interests">
                <h3>Interests</h3>
                <p>AI Infrastructure, ML Systems Engineer, Prompt Optimization</p>
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={hobbiesRef}
          className={`hobbies ${hobbiesVisible ? 'visible' : ''}`}
        >
          <h3>Hobbies</h3>
          <p className="hobby-description">
            Swimming, Travel, Museums, and Hackathons
          </p>
          <div className="hobbies-grid">
            <div className="hobby-item">
              <img 
                src="/Hackathon.jpg" 
                alt="Hackathon"
                className="hobby-image"
              />
            </div>
            <div className="hobby-item">
              <img 
                src="/hawaii.jpg" 
                alt="Travel"
                className="hobby-image"
              />
            </div>
            <div className="hobby-item">
              <img 
                src="/museum.png" 
                alt="Museums"
                className="hobby-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 