'use client'
import React from 'react'
import { useTheme } from '../../hooks/useTheme'

/**
 * Ambient glass orbs — soft, heavily-blurred color that sits BEHIND a section's
 * content so glass surfaces on top refract it. Clipped to its own box so it
 * never bleeds into neighbouring sections or clips sibling card shadows.
 *
 * Place as the first child of a `position: relative` section, and give the
 * section's content wrapper `position: relative; z-index: 1`.
 *
 * `variant` ('a' | 'b') just shifts orb positions so repeated sections don't
 * look identical.
 */
export default function AmbientOrbs({ variant = 'a' }) {
  const { isDarkMode } = useTheme()

  return (
    <div className={`ambient-orbs variant-${variant}`} aria-hidden="true">
      <span className="a-orb a-orb-1"></span>
      <span className="a-orb a-orb-2"></span>
      <span className="a-orb a-orb-3"></span>

      <style jsx>{`
        .ambient-orbs {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .a-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          will-change: transform;
        }
        .a-orb-1 {
          width: 40vw;
          max-width: 560px;
          aspect-ratio: 1;
          background: ${isDarkMode
            ? 'radial-gradient(circle, rgba(83,201,201,0.20), transparent 70%)'
            : 'radial-gradient(circle, rgba(83,201,201,0.30), transparent 70%)'};
          animation: aOrb1 28s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        .a-orb-2 {
          width: 38vw;
          max-width: 520px;
          aspect-ratio: 1;
          background: ${isDarkMode
            ? 'radial-gradient(circle, rgba(122,112,255,0.18), transparent 70%)'
            : 'radial-gradient(circle, rgba(120,168,255,0.24), transparent 70%)'};
          animation: aOrb2 34s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        .a-orb-3 {
          width: 42vw;
          max-width: 560px;
          aspect-ratio: 1;
          background: ${isDarkMode
            ? 'radial-gradient(circle, rgba(60,120,180,0.16), transparent 70%)'
            : 'radial-gradient(circle, rgba(255,206,150,0.24), transparent 70%)'};
          animation: aOrb3 31s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        /* Variant A (About): left / right / lower-center */
        .variant-a .a-orb-1 { top: -14%; left: -6%; }
        .variant-a .a-orb-2 { top: 10%; right: -8%; }
        .variant-a .a-orb-3 { bottom: -22%; left: 30%; }

        /* Variant B (Works): shifted so it doesn't mirror About */
        .variant-b .a-orb-1 { top: 4%; right: -4%; }
        .variant-b .a-orb-2 { bottom: -18%; left: -6%; }
        .variant-b .a-orb-3 { top: -18%; left: 40%; }

        @keyframes aOrb1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(5%, 7%, 0) scale(1.12); }
        }
        @keyframes aOrb2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.05); }
          50% { transform: translate3d(-6%, 4%, 0) scale(0.95); }
        }
        @keyframes aOrb3 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(4%, -5%, 0) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .a-orb { animation: none; }
        }
      `}</style>
    </div>
  )
}
