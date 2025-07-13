'use client'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { DataArray } from '@/app/data'
import Link from 'next/link'

// Helper functions for status colors (same as SliderCard)
const getStatusColor = (color) => {
  switch (color) {
    case 'green': return 'bg-green-500';
    case 'blue': return 'bg-blue-500';
    case 'yellow': return 'bg-yellow-500';
    case 'purple': return 'bg-purple-500';
    case 'red': return 'bg-red-500';
    default: return 'bg-green-500';
  }
};

const getStatusTextColor = (color) => {
  switch (color) {
    case 'green': return 'text-green-500';
    case 'blue': return 'text-blue-500';
    case 'yellow': return 'text-yellow-500';
    case 'purple': return 'text-purple-500';
    case 'red': return 'text-red-500';
    default: return 'text-green-500';
  }
};

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const projectId = parseInt(params.id)
  
  // Find the project by index
  const project = DataArray[projectId]
  
  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Project Not Found</h1>
          <Link href="/" className="bg-[#53c9c9] text-white px-6 py-3 rounded-lg hover:bg-[#244e4e] transition-colors">
            Back to Portfolio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 4px 15px rgba(5, 217, 232, 0.3), 0 0 20px rgba(5, 217, 232, 0.2);
          }
          50% {
            box-shadow: 0 4px 15px rgba(5, 217, 232, 0.4), 0 0 25px rgba(5, 217, 232, 0.3);
          }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-slate-600 hover:text-[#53c9c9] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Portfolio</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status?.color)}`}></div>
              <span className={`font-medium ${getStatusTextColor(project.status?.color)}`}>
                {project.status?.text}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Project Info */}
          <div className="space-y-8">
            {/* Project Header */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {project.year}
                </span>
                <span className="text-sm text-slate-400">•</span>
                <span className="text-sm text-slate-500">
                  Project {projectId + 1} of {DataArray.length}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
                {project.name}
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                {project.des}
              </p>
            </div>

            {/* Detailed Description */}
            {project.des1 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Project Details</h2>
                <p className="text-slate-600 leading-relaxed">
                  {project.des1}
                </p>
              </div>
            )}

            {/* Tech Stack */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack && project.techStack.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-[#53c9c9]/10 text-[#53c9c9] rounded-lg font-medium border border-[#53c9c9]/20 hover:bg-[#53c9c9]/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.demoLink ? (
                <a 
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#05d9e8] to-[#53c9c9] text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2 hover:shadow-[#05d9e8]/50 animate-pulse-glow"
                  style={{
                    boxShadow: '0 4px 15px rgba(5, 217, 232, 0.3), 0 0 20px rgba(5, 217, 232, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = '0 8px 25px rgba(5, 217, 232, 0.5), 0 0 30px rgba(5, 217, 232, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = '0 4px 15px rgba(5, 217, 232, 0.3), 0 0 20px rgba(5, 217, 232, 0.2)';
                  }}
                >
                  <span>View Live Demo</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                // Special case for Portfolio Website (projectId 0)
                projectId === 0 ? (
                  <button className="bg-gradient-to-r from-[#05d9e8] to-[#53c9c9] text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2">
                    <span>You are exploring demo!</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                ) : (
                  <button className="bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold cursor-not-allowed opacity-50">
                    Demo Coming Soon
                  </button>
                )
              )}
              
              {project.repositoryLink ? (
                <a 
                  href={project.repositoryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold hover:border-[#53c9c9] hover:text-[#53c9c9] transition-colors flex items-center space-x-2"
                >
                  <span>Explore Repository</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              ) : (
                <button className="border-2 border-gray-300 text-gray-400 px-8 py-3 rounded-lg font-semibold cursor-not-allowed opacity-50">
                  Repository Private
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Project Image */}
          <div className="relative">
            {/* Special layout for Fabflix project with two main images */}
            {project.name === "Fabflix (renamed to Decurb – Academic Project)" && project.images.length >= 2 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Login Image - Left */}
                <div className="relative overflow-hidden rounded-xl shadow-xl bg-white">
                  <img 
                    src={project.images[1]} // Decurb_login.png
                    alt={`${project.name} - Login Interface`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Login Interface
                  </div>
                </div>
                
                {/* Main Image - Right */}
                <div className="relative overflow-hidden rounded-xl shadow-xl bg-white">
                  <img 
                    src={project.images[0]} // Decurb_main.png
                    alt={`${project.name} - Main Interface`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Main Interface
                  </div>
                </div>
              </div>
            ) : (
              /* Default layout for other projects */
              <>
                {/* Main Image Container */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
                  <img 
                    src={project.images[0]}
                    alt={project.name}
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>

                {/* Additional Images Preview */}
                {project.images.length > 1 && (
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {project.images.slice(1, 4).map((image, index) => (
                      <div key={index} className="relative overflow-hidden rounded-lg shadow-md bg-white aspect-square">
                        <img 
                          src={image}
                          alt={`${project.name} screenshot ${index + 2}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#53c9c9]/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Additional Project Info Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#53c9c9] mb-2">{project.year}</div>
              <div className="text-slate-600">Year Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#53c9c9] mb-2">{project.techStack?.length || 0}</div>
              <div className="text-slate-600">Technologies</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${getStatusTextColor(project.status?.color)}`}>
                {project.status?.text}
              </div>
              <div className="text-slate-600">Project Status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
} 