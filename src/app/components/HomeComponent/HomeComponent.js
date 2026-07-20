'use client'
import React, { useState } from 'react';
import ChatBot from '../ChatBot/ChatBot';
import { useTheme } from '../../hooks/useTheme';

export default function HomeComponent() {
  const [chatExpanded, setChatExpanded] = useState(false);
  const [headingAnimationDone, setHeadingAnimationDone] = useState(false);
  const { isDarkMode } = useTheme();

  // Handler for subtitle animation end
  const handleSubtitleAnimationEnd = () => {
    setHeadingAnimationDone(true)
  }

  return (
<React.Fragment>
      {/* CSS Styles */}
      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          height: 100%;
          position: relative;
          background: transparent; /* unified body color shows through */
          overflow: hidden;
          z-index: 0;
        }

        /* WebGL aurora canvas (dark mode). The gradient is the instant fallback
           shown before the shader paints or if WebGL is unavailable. */
        .aurora-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          z-index: 0;
          background: linear-gradient(180deg, #0b0e1b 0%, #171a2d 55%, #262948 100%);
        }

        @media screen and (max-width: 768px) {
          .hero-section {
            min-height: var(--viewport-height, 100vh);
            height: var(--viewport-height, 100vh);
          }
        }

        /* ---- Ambient glass orbs ---- */
        .hero-ambient {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          will-change: transform;
        }
        .orb-1 {
          width: 46vw;
          max-width: 620px;
          aspect-ratio: 1;
          top: -6%;
          left: -4%;
          background: ${isDarkMode
            ? 'radial-gradient(circle, rgba(83,201,201,0.28), transparent 70%)'
            : 'radial-gradient(circle, rgba(83,201,201,0.40), transparent 70%)'};
          animation: orbDrift1 26s cubic-bezier(0.45,0,0.55,1) infinite;
        }
        .orb-2 {
          width: 40vw;
          max-width: 540px;
          aspect-ratio: 1;
          top: 8%;
          right: -6%;
          background: ${isDarkMode
            ? 'radial-gradient(circle, rgba(122,112,255,0.24), transparent 70%)'
            : 'radial-gradient(circle, rgba(120,168,255,0.30), transparent 70%)'};
          animation: orbDrift2 32s cubic-bezier(0.45,0,0.55,1) infinite;
        }
        .orb-3 {
          width: 44vw;
          max-width: 580px;
          aspect-ratio: 1;
          bottom: -12%;
          left: 24%;
          background: ${isDarkMode
            ? 'radial-gradient(circle, rgba(60,120,180,0.20), transparent 70%)'
            : 'radial-gradient(circle, rgba(255,206,150,0.30), transparent 70%)'};
          animation: orbDrift3 29s cubic-bezier(0.45,0,0.55,1) infinite;
        }
        @keyframes orbDrift1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(6%, 8%, 0) scale(1.12); }
        }
        @keyframes orbDrift2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.05); }
          50% { transform: translate3d(-7%, 5%, 0) scale(0.95); }
        }
        @keyframes orbDrift3 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(5%, -6%, 0) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .orb { animation: none; }
        }

        .neural-network, .star-network {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease-in-out;
        }

        .neural-network.active {
          opacity: 0.4;
        }

        .star-network.active {
          opacity: 0.6;
        }

        .shooting-stars-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .shooting-stars-canvas.active {
          opacity: 1;
        }

        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #262948;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }

        .loading-text {
          color: #53c9c9;
          font-size: 2rem;
          font-weight: bold;
          font-family: var(--font-sans), sans-serif;
          text-shadow: 0 0 20px rgba(83, 201, 201, 0.5);
          animation: loadingPulse 1.5s ease-in-out infinite;
        }

        @keyframes loadingPulse {
          0%, 100% { 
            opacity: 0.6;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }

                 .hero-content {
           min-height: 100vh;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           text-align: center;
           transition: padding 0.5s cubic-bezier(0.4,0,0.2,1);
           padding-top: 0;
           padding-bottom: 0;
           position: relative;
           z-index: 10;
         }

         .hero-text {
           color: var(--accent);
           margin-bottom: 2rem;
           display: flex;
           flex-direction: column;
           align-items: center;
           text-align: center;
           transition: margin-bottom 0.6s cubic-bezier(0.32,0.72,0,1), margin-top 0.6s cubic-bezier(0.32,0.72,0,1);
         }
         .hero-text h2 {
           color: var(--text);
         }
         .hero-text.chat-expanded {
           margin-bottom: 0.75rem;
           margin-top: 0;
         }
         .hero-text.chat-expanded .hero-subtitle {
           opacity: 0;
           max-height: 0;
           margin-top: 0;
           transform: translateY(-6px);
         }

         /* Display headline — refined modern wordmark */
         .hero-title {
           font-size: clamp(2.6rem, 6vw, 4.75rem);
           font-weight: 600;
           line-height: 1.02;
           letter-spacing: -0.035em;
           color: var(--text);
           margin: 0;
         }
         .hero-title-accent {
           color: ${isDarkMode ? 'var(--text)' : 'var(--accent)'};
           background: none;
           -webkit-background-clip: border-box;
           background-clip: border-box;
           -webkit-text-fill-color: currentColor;
         }

         /* Supporting subtitle */
         .hero-subtitle {
           margin-top: 1.35rem;
           max-width: 30ch;
           font-size: clamp(0.95rem, 1.4vw, 1.1rem);
           font-weight: 400;
           line-height: 1.55;
           color: ${isDarkMode ? 'rgba(242,242,242,0.62)' : 'rgba(26,26,26,0.6)'};
           overflow: hidden;
           transition: opacity 0.5s cubic-bezier(0.32,0.72,0,1),
                       max-height 0.6s cubic-bezier(0.32,0.72,0,1),
                       transform 0.5s cubic-bezier(0.32,0.72,0,1),
                       margin-top 0.5s cubic-bezier(0.32,0.72,0,1);
           max-height: 120px;
         }
         .chatbot-hero-wrapper {
           width: 100%;
           max-width: 750px;
           margin: 0 auto;
           display: flex;
           flex-direction: column;
           align-items: center;
         }

        @keyframes advancedPulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.8;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% { 
            transform: scale(1.15); 
            opacity: 1;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.9), inset 0 1px 0 rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.5);
          }
        }

        @keyframes advancedStarTwinkle {
          0%, 100% { 
            transform: scale(1) rotate(0deg); 
            opacity: 0.7;
          }
          25% { 
            transform: scale(1.3) rotate(45deg); 
            opacity: 1;
          }
          50% { 
            transform: scale(0.8) rotate(90deg); 
            opacity: 0.9;
          }
          75% { 
            transform: scale(1.1) rotate(135deg); 
            opacity: 1;
          }
        }

        @keyframes flow {
          0% { opacity: 0; }
          30% { opacity: 0.6; }
          70% { opacity: 0.6; }
          100% { opacity: 0; }
        }

        @keyframes particleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.7; 
          }
          25% { 
            transform: translateY(-15px) translateX(5px) scale(0.8); 
            opacity: 1; 
          }
          50% { 
            transform: translateY(-10px) translateX(-5px) scale(0.6); 
            opacity: 0.8; 
          }
          75% { 
            transform: translateY(-20px) translateX(3px) scale(0.4); 
            opacity: 1; 
          }
        }

        /* Choreographed entry — heavy fade-up with blur resolve */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          filter: blur(10px);
          animation: heroReveal 0.9s cubic-bezier(0.22,1,0.36,1) forwards;
          will-change: transform, opacity, filter;
        }
        .reveal-1 { animation-delay: 0.15s; }
        .reveal-2 { animation-delay: 0.32s; }
        .reveal-3 { animation-delay: 0.5s; }
        @keyframes heroReveal {
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal { animation: none; opacity: 1; transform: none; filter: none; }
        }

        @media (max-width: 900px) {
          .chatbot-hero-wrapper {
            max-width: 98vw;
          }
        }
        @media (max-width: 600px) {
          .chatbot-hero-wrapper {
            max-width: 100vw;
          }
        }
      `}</style>
      <div id="home" className="hero-section">
        {/* The shared page-level backdrop (see page.js) shows through the hero
            in both themes — no per-section ambient layer needed here. */}
        <div className="hero-content">
          <div className={`hero-text${chatExpanded ? ' chat-expanded' : ''}`}>
            <h1
              className="hero-title reveal reveal-1"
              onAnimationEnd={handleSubtitleAnimationEnd}
            >
              I&apos;m <span className="hero-title-accent">Brian</span>
            </h1>
            <p className="hero-subtitle reveal reveal-2">
              Software Engineer who builds AI-driven products &amp; full-stack systems.
            </p>
          </div>
          {/* AI Chatbot */}
          <div className="chatbot-hero-wrapper">
            <ChatBot onExpand={setChatExpanded} typingReady={headingAnimationDone} />
          </div>
        </div>
      </div>
</React.Fragment>
  );
}
