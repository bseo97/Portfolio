'use client'
import React from 'react'
import { useTheme } from '../../hooks/useTheme'

/**
 * Single fixed full-page backdrop so the whole site shares ONE continuous
 * background while scrolling — pure CSS (no canvas/WebGL/rAF), transform/opacity
 * only, clipped by `.aurora { overflow: hidden }`.
 *
 *  - Dark mode  → cinematic aurora (deep gradient + teal/indigo/violet ribbons,
 *    stars, grain).
 *  - Light mode → soft pastel ambient field on ivory (ribbons/stars/grain hidden
 *    via the `.aurora-light` overrides in globals.css).
 */
export default function AuroraBackground() {
  const { isDarkMode } = useTheme()

  return (
    <div className={`aurora${isDarkMode ? '' : ' aurora-light'}`} aria-hidden="true">
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
