'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DataArray } from '@/app/data'
import Link from 'next/link'
import { getStatusColor, getStatusTextColor } from '@/app/utils/statusHelpers'
import { useTheme } from '@/app/hooks/useTheme'
import AmbientOrbs from '@/app/components/AmbientOrbs/AmbientOrbs'
import MoonIcon from '@/app/components/MoonIcon'
import SunIcon from '@/app/components/SunIcon'

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const projectId = parseInt(params.id)
  const { isDarkMode, toggleTheme } = useTheme()
  
  // Find the project by index
  const project = DataArray[projectId]
  
  if (!project) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-2000 ${
        isDarkMode ? 'bg-[#262948]' : 'bg-[#F4F1E9]'
      }`}>
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-[-0.03em] mb-5 text-[color:var(--text)]">Project Not Found</h1>
          <Link
            href="/"
            className="inline-flex items-center px-7 py-3 rounded-full text-white font-semibold text-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(140deg, #7fe4e4 0%, #53c9c9 50%, #37b6b6 100%)', boxShadow: '0 14px 30px -12px rgba(83,201,201,0.7), inset 0 1px 1px rgba(255,255,255,0.4)' }}
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    )
  }

  // Glass surfaces for the secondary / disabled pills (theme-aware).
  const glassPill = {
    background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.55)',
    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(38,41,72,0.09)'}`,
    boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.45)',
  }
  const iconCircleDark = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(38,41,72,0.06)'

  // Soft glass frame for project imagery (no harsh drop shadows).
  const imageFrame = {
    background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)',
    boxShadow: isDarkMode
      ? '0 30px 60px -26px rgba(0,0,0,0.62), inset 0 0 0 1px rgba(255,255,255,0.08)'
      : '0 30px 60px -28px rgba(38,41,72,0.32), inset 0 0 0 1px rgba(255,255,255,0.55)',
  }
  const captionChip = {
    background: 'rgba(12,14,28,0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.12)',
  }

  // Shared action buttons (primary demo + secondary repo). Rendered in both the
  // Fabflix split layout and the default layout so they stay identical.
  const renderActionButtons = () => (
    <div className="flex flex-wrap gap-3 justify-center mt-7 mb-2">
      {project.demoLink ? (
        <a
          href={project.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-white font-semibold text-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
          style={{ background: 'linear-gradient(140deg, #7fe4e4 0%, #53c9c9 50%, #37b6b6 100%)', boxShadow: '0 14px 30px -12px rgba(83,201,201,0.7), inset 0 1px 1px rgba(255,255,255,0.4)' }}
        >
          <span>View Live Demo</span>
          <span className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.22)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </span>
        </a>
      ) : projectId === 0 ? (
        <span
          className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-white font-semibold text-sm"
          style={{ background: 'linear-gradient(140deg, #7fe4e4 0%, #53c9c9 50%, #37b6b6 100%)', boxShadow: '0 14px 30px -12px rgba(83,201,201,0.7), inset 0 1px 1px rgba(255,255,255,0.4)' }}
        >
          <span>You are exploring the demo</span>
          <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.22)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </span>
      ) : (
        <span className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-sm opacity-50 cursor-not-allowed text-[color:var(--text)]" style={glassPill}>
          Demo Coming Soon
        </span>
      )}

      {project.repositoryLink ? (
        <a
          href={project.repositoryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-sm text-[color:var(--text)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
          style={glassPill}
        >
          <span>Explore Repository</span>
          <span className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105" style={{ background: iconCircleDark }}>
            <svg className="w-4 h-4 text-[color:var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </span>
        </a>
      ) : (
        <span className="inline-flex items-center px-6 py-3 rounded-full font-semibold text-sm opacity-50 cursor-not-allowed text-[color:var(--text)]" style={glassPill}>
          Repository Private
        </span>
      )}
    </div>
  )

  return (
    <>

      <div className={`relative overflow-hidden min-h-screen transition-all duration-2000 ${
        isDarkMode ? 'bg-[#262948]' : 'bg-[#F4F1E9]'
      }`}>
      <AmbientOrbs variant="a" />
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 transition-all duration-500"
        style={{ boxShadow: isDarkMode
          ? '0 12px 30px -18px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)'
          : '0 12px 30px -18px rgba(38,41,72,0.18), inset 0 1px 0 rgba(255,255,255,0.8)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full text-[color:var(--text)] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
              style={{
                background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(38,41,72,0.08)'}`,
                boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4)'
              }}
            >
              <span className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-0.5"
                style={{ background: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(38,41,72,0.06)' }}>
                <svg className="w-4 h-4 text-[color:var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M15 19l-7-7 7-7" />
                </svg>
              </span>
              <span className="font-medium text-sm">Back to Portfolio</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{
                  background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                  border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(38,41,72,0.08)'}`
                }}>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status?.color)}`}></div>
                <span className={`font-medium text-xs ${getStatusTextColor(project.status?.color)}`}>
                  {project.status?.text}
                </span>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105"
                style={{
                  background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                  border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(38,41,72,0.08)'}`,
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4)'
                }}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? <SunIcon/> : <MoonIcon/>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Project Info */}
          <div className="space-y-8">
            {/* Project Header */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)] opacity-85">
                  {project.category}
                </span>
                <span className="w-8 h-px" style={{ background: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(38,41,72,0.15)' }}></span>
                <span className="text-xs font-medium tracking-wide" style={{ color: isDarkMode ? 'rgba(242,242,242,0.5)' : 'rgba(26,26,26,0.5)' }}>
                  {project.year} · {String(projectId + 1).padStart(2, '0')} / {String(DataArray.length).padStart(2, '0')}
                </span>
              </div>

              <h1 className="text-4xl lg:text-[3.25rem] font-semibold mb-5 leading-[1.05] tracking-[-0.035em] text-[color:var(--text)]">
                {project.name}
              </h1>

              <p className="text-lg lg:text-xl leading-relaxed" style={{ color: isDarkMode ? 'rgba(242,242,242,0.68)' : 'rgba(26,26,26,0.64)' }}>
                {project.des}
              </p>
            </div>

            {/* Detailed Description */}
            {project.des1 && (
              <div className="glass rounded-[1.75rem] p-7 transition-all duration-500">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)] opacity-85 mb-2.5">Overview</div>
                <p className="leading-relaxed" style={{ color: isDarkMode ? 'rgba(242,242,242,0.72)' : 'rgba(26,26,26,0.68)' }}>
                  {project.des1}
                </p>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)] opacity-85 mb-4">Stack</div>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack && project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 text-sm font-medium text-[color:var(--text)] rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
                    style={{
                      background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.55)',
                      border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(38,41,72,0.09)'}`,
                      boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.5)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons - removed from here */}
          </div>

          {/* Right Side - Project Image and Action Buttons */}
          <div className="relative flex flex-col items-center">
            {/* Special layout for Fabflix project with two main images */}
            {project.name === "Fabflix" && project.images.length >= 2 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {/* Login Image - Left */}
                  <div className="relative overflow-hidden rounded-[1.5rem] p-1.5" style={imageFrame}>
                    <img
                      src={project.images[1]} // Decurb_login.png
                      alt={`${project.name} - Login Interface`}
                      className="w-full h-auto object-cover rounded-[1.15rem]"
                    />
                    <div className="absolute bottom-3 left-3 text-white text-[11px] font-medium px-2.5 py-1 rounded-full" style={captionChip}>
                      Login Interface
                    </div>
                  </div>
                  {/* Main Image - Right */}
                  <div className="relative overflow-hidden rounded-[1.5rem] p-1.5" style={imageFrame}>
                    <img
                      src={project.images[0]} // Decurb_main.png
                      alt={`${project.name} - Main Interface`}
                      className="w-full h-auto object-cover rounded-[1.15rem]"
                    />
                    <div className="absolute bottom-3 left-3 text-white text-[11px] font-medium px-2.5 py-1 rounded-full" style={captionChip}>
                      Main Interface
                    </div>
                  </div>
                </div>
                {/* Action Buttons below both images */}
                {renderActionButtons()}
              </>
            ) : (
              /* Default layout for other projects */
              <>
                {/* Main Image Container — placeholder slot when no image yet */}
                <div className="relative overflow-hidden rounded-[1.75rem] p-1.5 w-full" style={imageFrame}>
                  {project.images && project.images[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.name}
                      className="w-full h-auto object-cover rounded-[1.35rem]"
                    />
                  ) : (
                    <div className="w-full aspect-[16/10] rounded-[1.35rem] flex flex-col items-center justify-center gap-2 text-center"
                      style={{ background: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(38,41,72,0.03)' }}>
                      <svg className="w-9 h-9 text-[color:var(--accent)] opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M4 16l4.5-4.5a2 2 0 012.8 0L16 16m-2-2l1.5-1.5a2 2 0 012.8 0L21 15M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                      </svg>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: isDarkMode ? 'rgba(242,242,242,0.5)' : 'rgba(26,26,26,0.5)' }}>Image coming soon</span>
                    </div>
                  )}
                </div>
                {/* Action Buttons below image */}
                {renderActionButtons()}
                {/* Additional Images Preview */}
                {project.images.length > 1 && (
                  <div className="mt-6 grid grid-cols-3 gap-4 w-full">
                    {project.images.slice(1, 4).map((image, index) => (
                      <div key={index} className="group relative overflow-hidden rounded-2xl aspect-square p-1" style={imageFrame}>
                        <img
                          src={image}
                          alt={`${project.name} screenshot ${index + 2}`}
                          className="w-full h-full object-cover rounded-[0.85rem] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Additional Project Info Section */}
        <div className="glass mt-16 rounded-[1.75rem] p-8 md:p-10 transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center px-4">
              <div className="text-4xl font-semibold tracking-[-0.03em] text-[color:var(--accent)] mb-2">{project.year}</div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: isDarkMode ? 'rgba(242,242,242,0.5)' : 'rgba(26,26,26,0.5)' }}>Year Completed</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-semibold tracking-[-0.03em] text-[color:var(--accent)] mb-2">{project.techStack?.length || 0}</div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: isDarkMode ? 'rgba(242,242,242,0.5)' : 'rgba(26,26,26,0.5)' }}>Technologies</div>
            </div>
            <div className="text-center px-4">
              <div className={`text-4xl font-semibold tracking-[-0.03em] mb-2 ${getStatusTextColor(project.status?.color)}`}>
                {project.status?.text}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: isDarkMode ? 'rgba(242,242,242,0.5)' : 'rgba(26,26,26,0.5)' }}>Project Status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
} 