'use client'

// parent page
import Image from "next/image";

import HomeComponent from './components/HomeComponent/HomeComponent'
import MySlider from "./components/SliderCard/MySlider";

// import { transform } from "next/dist/build/swc/generated-native";
export default function Home() {
  return (
    // minimum height = 100vh
    <main className="min-h-screen relative">
      {/* CSS Styles for Recent Works Section */}
      <style jsx>{`
        .next-section {
          min-height: 100vh;
          background: linear-gradient(180deg, #475569 0%, #64748b 20%, #94a3b8 50%, #cbd5e1 80%, #f1f5f9 100%);
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 2rem;
        }

        .section-content {
          color: #475569;
          font-size: clamp(1.5rem, 4vw, 2rem);
          text-align: center;
          opacity: 0.8;
          padding: 2rem;
          margin-bottom: 3rem;
        }

        .projects-title {
          font-size: clamp(4rem, 8vw, 6rem);
          color: #F7FBFD;
          font-family: "DejaVu Sans Mono, monospace";
          font-weight: bold;
          margin: 0;
          padding: 0;
          text-align: left;
          max-width: 750px;
          width: 100%;
          overflow: hidden;
          transform: translate(0px, -20px);
        }

        .recent-works-subtitle {
          color: #53c9c9;
          font-size: 3rem;
          font-weight: 800;
          margin-top: 1rem;
          transform: translate(0px, -20px);
        }

        .projects-description {
          max-width: 2xl;
          font-size: 16px;
          color: #ffffff;
          line-height: 2;
          margin-top: 1.25rem;
          transform: translate(0px, -20px);
        }

        .projects-container {
          background: linear-gradient(180deg, #475569 0%, #64748b 20%, #94a3b8 50%, #cbd5e1 80%, #e2e8f0 100%);
          width: 100%;
          font-family: "DejaVu Sans Mono, monospace";
          padding-top: 1.25rem;
          padding-bottom: 6rem;
          margin-top: 0;
          opacity: 0;
          animation: fadeInUp 1s ease-in-out 0.5s forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .projects-title {
            font-size: clamp(3rem, 10vw, 4rem);
            padding-left: 1.25rem;
          }
          
          .recent-works-subtitle {
            font-size: 2rem;
            padding-left: 1.25rem;
          }
          
          .projects-description {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .projects-title {
            padding-left: 50px;
          }
          
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
      
      {/* Recent Works Section */}
      <div
        id="projects"
        className="projects-container"
      >
        <div className="container m-auto">
          <p className="projects-title">
            projects
          </p>
          <div>
            <p className="recent-works-subtitle">
              Recent Works
            </p>
            <p className="projects-description">
              Developed a responsive portfolio website using Next.js 14, React.js, and Tailwind CSS, implementing dynamic routing, smooth scrolling, fade-in animations, and a "Get Resume" PDF download button. Integrated Nodemailer for email functionality and deployed the site to Vercel, ensuring cross-device compatibility and modern web development best practices.
            </p>
          </div>
        </div>
        <div className="">
          <MySlider/>
        </div>
      </div>

    </main>

  )
}
