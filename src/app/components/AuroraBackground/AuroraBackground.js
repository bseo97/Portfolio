'use client'
import React from 'react'

/**
 * Cinematic aurora hero backdrop — pure CSS (no canvas, no WebGL, no rAF, no
 * ResizeObserver). Styles live in globals.css (`.aurora` block) so they load
 * reliably with no styled-jsx parsing quirks. Every layer animates via
 * transform/opacity only and is clipped by `.aurora { overflow: hidden }`, so it
 * can never scroll the page or repaint-thrash. Degrades to a static deep-space
 * gradient under reduced motion.
 */
export default function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="ab ab1" />
      <span className="ab ab2" />
      <span className="ab ab3" />
      <span className="curtain c1" />
      <span className="curtain c2" />
      <span className="aurora-stars" />
      <span className="aurora-grain" />
    </div>
  )
}
