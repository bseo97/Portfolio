'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Space_Grotesk } from 'next/font/google'
import { DataArray } from '@/app/data'

// Display grotesque for the editorial titles. Scoped to this component only,
// so the rest of the site keeps its existing type (redesign-preserve).
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
})

export default function ProjectIndex() {
  const listRef = useRef(null)
  const parallaxRef = useRef(null) // inner layer that drifts toward the cursor
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const baseY = useRef(0) // vertical offset so the stack centers on the list, not the viewport
  const rafId = useRef(null)
  const running = useRef(false)
  const hoverCapable = useRef(false)
  const reduce = useRef(false)

  // activeIndex changes only on discrete enter/leave/focus events (never per
  // frame), so React state here is safe and avoids setState-on-pointermove jank.
  const [activeIndex, setActiveIndex] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mqHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncHover = () => { hoverCapable.current = mqHover.matches }
    const syncReduce = () => { reduce.current = mqReduce.matches }
    syncHover()
    syncReduce()
    mqHover.addEventListener('change', syncHover)
    mqReduce.addEventListener('change', syncReduce)

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
    const lerp = (a, b, t) => a + (b - a) * t

    // The stack overlay is centered on the viewport; nudge it down so it lands
    // on the vertical center of the works list instead.
    const computeBase = () => {
      const list = listRef.current
      if (!list) return
      const rect = list.getBoundingClientRect()
      const listCenter = rect.top + rect.height / 2
      baseY.current = listCenter - window.innerHeight / 2
    }

    const apply = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform =
          `translate3d(${current.current.x}px, ${current.current.y + baseY.current}px, 0)`
      }
    }

    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.1)
      current.current.y = lerp(current.current.y, target.current.y, 0.1)
      apply()
      rafId.current = requestAnimationFrame(tick)
    }
    const start = () => {
      if (running.current || reduce.current) return
      running.current = true
      rafId.current = requestAnimationFrame(tick)
    }
    const stop = () => {
      running.current = false
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = null
    }

    const el = listRef.current
    if (!el) return

    const onEnter = () => { if (hoverCapable.current) { computeBase(); start() } }
    const onMove = (e) => {
      if (!hoverCapable.current) return
      // Keep the stack centered; drift only slightly toward the cursor.
      target.current = {
        x: clamp((e.clientX - window.innerWidth / 2) * 0.03, -20, 20),
        y: clamp((e.clientY - window.innerHeight / 2) * 0.03, -20, 20),
      }
    }
    const onLeave = () => {
      if (!hoverCapable.current) return
      stop()
      target.current = { x: 0, y: 0 }
      current.current = { x: 0, y: 0 }
      apply()
      setActiveIndex(null)
    }

    // Keep the offset accurate while the card is up (list moves under scroll/resize).
    const onReflow = () => { if (running.current) computeBase() }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onReflow, { passive: true })
    window.addEventListener('resize', onReflow)

    return () => {
      stop()
      mqHover.removeEventListener('change', syncHover)
      mqReduce.removeEventListener('change', syncReduce)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onReflow)
      window.removeEventListener('resize', onReflow)
    }
  }, [])

  const pad = (n) => String(n + 1).padStart(2, '0')

  // Deck geometry: active card sharp + front; every other card fans upward,
  // blurred, scaled down and faded, so the other works read as a stack behind.
  const cardStyle = (k) => {
    if (activeIndex === null) {
      return { transform: 'translate(0, 0) scale(0.97)', filter: 'blur(0px)', opacity: 0, zIndex: 1 }
    }
    const d = k - activeIndex
    const rank = Math.abs(d)
    const tx = Math.sign(d) * rank * 8
    const ty = -rank * 16
    const scale = 1 - rank * 0.05
    const blur = Math.min(rank * 3, 9)
    const opacity = k === activeIndex ? 1 : Math.max(0.28, 0.55 - rank * 0.1)
    return {
      transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
      filter: `blur(${blur}px)`,
      opacity,
      zIndex: 30 - rank,
    }
  }

  const preview = (
    <div className="pi-stack" aria-hidden="true">
      <div ref={parallaxRef} className="pi-parallax">
        <div className={`pi-stack-inner ${activeIndex !== null ? 'is-visible' : ''}`}>
          {DataArray.map((item, index) => (
            <div key={item.label || index} className="pi-card" style={cardStyle(index)}>
              <img src={item.images[0]} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className={`pi-wrap ${display.className}`}>
      <style jsx>{`
        .pi-wrap {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem 0;
        }

        .pi-list {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid rgba(44, 62, 80, 0.18);
        }
        :global(.dark-theme) .pi-list {
          border-top-color: rgba(255, 255, 255, 0.16);
        }

        .pi-row {
          position: relative;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 1.25rem;
          padding: 1.2rem 0.25rem;
          border-bottom: 1px solid rgba(44, 62, 80, 0.18);
          text-decoration: none;
          color: var(--text);
          transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        :global(.dark-theme) .pi-row {
          border-bottom-color: rgba(255, 255, 255, 0.16);
        }
        .pi-row:focus-visible {
          outline: none;
        }

        /* Full-width highlight band behind the hovered/focused row */
        .pi-row::before {
          content: '';
          position: absolute;
          inset: 0 -1rem;
          border-radius: 8px;
          background: transparent;
          z-index: -1;
          transition: background 0.3s ease;
        }
        .pi-row:hover::before,
        .pi-row:focus-visible::before {
          background: rgba(255, 255, 255, 0.5);
        }
        :global(.dark-theme) .pi-row:hover::before,
        :global(.dark-theme) .pi-row:focus-visible::before {
          background: rgba(255, 255, 255, 0.07);
        }

        /* Dim the siblings of the hovered/focused row for editorial focus. */
        .pi-list:hover .pi-row:not(:hover),
        .pi-list:focus-within .pi-row:not(:focus-within) {
          opacity: 0.4;
        }

        .pi-index {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          color: var(--accent);
          font-weight: 500;
        }

        .pi-title {
          font-size: clamp(1.35rem, 2.6vw, 2.2rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.015em;
          white-space: nowrap;
          transform: translateX(0);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pi-row:hover .pi-title,
        .pi-row:focus-visible .pi-title {
          transform: translateX(8px);
        }

        .pi-meta {
          display: flex;
          align-items: center;
          gap: 1.1rem;
          justify-self: end;
        }
        .pi-tag,
        .pi-year {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: rgba(44, 62, 80, 0.55);
          white-space: nowrap;
        }
        .pi-tag {
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }
        :global(.dark-theme) .pi-tag,
        :global(.dark-theme) .pi-year {
          color: rgba(247, 251, 253, 0.55);
        }

        /* Button-in-button arrow: nested circular enclosure */
        .pi-arrow {
          width: 2.35rem;
          height: 2.35rem;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
          line-height: 1;
          color: var(--text);
          background: rgba(44, 62, 80, 0.06);
          border: 1px solid rgba(44, 62, 80, 0.1);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.35s ease, color 0.35s ease;
        }
        :global(.dark-theme) .pi-arrow {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.14);
        }
        .pi-row:hover .pi-arrow,
        .pi-row:focus-visible .pi-arrow {
          background: var(--accent);
          color: #ffffff;
          transform: translate(3px, -3px);
        }

        /* Mobile static thumbnail (shown only on non-hover / coarse pointers) */
        .pi-thumb {
          display: none;
          grid-column: 1 / -1;
          margin-top: 1rem;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 14px;
          overflow: hidden;
          background: rgba(44, 62, 80, 0.06);
        }
        .pi-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 768px) {
          .pi-wrap {
            padding: 0.5rem 1.25rem 0;
          }
          .pi-row {
            gap: 0.85rem;
            padding: 1.4rem 0.1rem;
          }
          .pi-title {
            white-space: normal;
          }
          .pi-meta {
            gap: 0.6rem;
          }
          .pi-tag {
            display: none;
          }
        }

        /* Touch / no-hover devices: reveal static thumbs, drop the dimming. */
        @media (hover: none), (pointer: coarse) {
          .pi-thumb {
            display: block;
          }
          .pi-list:hover .pi-row:not(:hover) {
            opacity: 1;
          }
        }
      `}</style>

      <ul className="pi-list" ref={listRef}>
        {DataArray.map((item, index) => (
          <li key={item.label || index}>
            <Link
              href={`/projects/${index}`}
              className="pi-row"
              onPointerEnter={() => hoverCapable.current && setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              aria-label={`${item.label || item.name}, ${item.category}, ${item.year}`}
            >
              <span className="pi-index" aria-hidden="true">{pad(index)}</span>
              <h3 className="pi-title">{item.label || item.name}</h3>
              <span className="pi-meta">
                <span className="pi-tag">{item.category}</span>
                <span className="pi-year">{item.year}</span>
                <span className="pi-arrow" aria-hidden="true">↗</span>
              </span>

              <span className="pi-thumb" aria-hidden="true">
                <img src={item.images[0]} alt="" loading="lazy" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Centered image stack, portaled to <body>. The outer layer is a fixed
          full-viewport flex overlay so the stack is centered on both axes; the
          inner parallax layer drifts slightly toward the cursor. Hidden on
          touch via CSS. */}
      {mounted && createPortal(preview, document.body)}

      <style jsx global>{`
        .pi-stack {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .pi-parallax {
          will-change: transform;
        }
        .pi-stack-inner {
          position: relative;
          width: min(34vw, 420px);
          aspect-ratio: 16 / 10;
          opacity: 0;
          transform: scale(0.96);
          transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pi-stack-inner.is-visible {
          opacity: 1;
          transform: scale(1);
        }
        .pi-card {
          position: absolute;
          inset: 0;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.28);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.5s ease, opacity 0.4s ease;
        }
        .pi-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (hover: none), (pointer: coarse) {
          .pi-stack {
            display: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pi-stack-inner,
          .pi-card {
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>
    </div>
  )
}
