"use client";
import React, { useEffect, useState } from "react";
import Drawer from "./DiagonalDrawer";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useTheme } from "../../hooks/useTheme";
import MoonIcon from "../MoonIcon"
import SunIcon from "../SunIcon"

export default function Header() {
  const activeSection = useActiveSection();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent body scrolling when the drawer is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <React.Fragment>
      {/* Drawer */}
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activeSection={activeSection}
      />

      {/* Header */}
      <header
        className="fixed top-0 z-50 w-full transition-all duration-500 backdrop-blur-xl backdrop-saturate-[1.8] border-b"
        style={{
          backgroundColor: isDarkMode
            ? (isScrolled ? 'rgba(30, 34, 62, 0.82)' : 'rgba(30, 34, 62, 0.55)')
            : (isScrolled ? 'rgba(244, 241, 233, 0.82)' : 'rgba(244, 241, 233, 0.55)'),
          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(38, 41, 72, 0.06)',
          boxShadow: isScrolled
            ? isDarkMode
              ? '0 12px 30px -18px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 12px 30px -18px rgba(38, 41, 72, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            : isDarkMode
              ? 'inset 0 1px 0 rgba(255, 255, 255, 0.06)'
              : 'inset 0 1px 0 rgba(255, 255, 255, 0.6)'
        }}
      >
        <div className="relative flex justify-between items-center px-4 py-2">
          {/* Mobile Hamburger */}
          <button
            className={`xl:hidden text-2xl transition-all duration-300 hover:scale-110 ${
              isDarkMode ? 'text-[color:var(--text)] hover:text-[color:var(--accent)]' : 'text-[color:var(--text)] hover:text-[color:var(--accent)]'
            } ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Theme Toggle for Mobile */}
          <button
            onClick={toggleTheme}
            className={`xl:hidden px-3 py-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] text-[color:var(--text)] ${
              isDarkMode
                ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                : 'bg-white/50 border border-[rgba(38,41,72,0.08)] hover:bg-white/80'
            } backdrop-blur-md hover:scale-105 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4)' }}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            <span className="text-sm font-medium">
              {isDarkMode ? <SunIcon/> : <MoonIcon/>}
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:block pb-2">
          <div className="flex justify-center items-center space-x-8">
            <div className="flex items-center space-x-8">
              <a
                className={`menu-item relative px-3 py-1 font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                  activeSection === 'home' 
                    ? "text-[color:var(--accent)]"
                    : isDarkMode 
                      ? "text-[color:var(--text)] hover:text-[color:var(--accent)]" 
                      : "text-[color:var(--text)] hover:text-[color:var(--accent)]"
                }`}
                href="/#home"
              >
                Home
                {activeSection === 'home' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[color:var(--accent)] rounded-full"></div>
                )}
              </a>
              <a
                className={`menu-item relative px-3 py-1 font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                  activeSection === 'about' 
                    ? "text-[color:var(--accent)]"
                    : isDarkMode 
                      ? "text-[color:var(--text)] hover:text-[color:var(--accent)]" 
                      : "text-[color:var(--text)] hover:text-[color:var(--accent)]"
                }`}
                href="/#about"
              >
                About
                {activeSection === 'about' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[color:var(--accent)] rounded-full"></div>
                )}
              </a>
              <a
                className={`menu-item relative px-3 py-1 font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                  activeSection === 'projects' 
                    ? "text-[color:var(--accent)]"
                    : isDarkMode 
                      ? "text-[color:var(--text)] hover:text-[color:var(--accent)]" 
                      : "text-[color:var(--text)] hover:text-[color:var(--accent)]"
                }`}
                href="/#projects"
              >
                Projects
                {activeSection === 'projects' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[color:var(--accent)] rounded-full"></div>
                )}
              </a>
            </div>
            
            <div className="ml-6 pl-6 border-l border-slate-600/30">
              <button
                onClick={toggleTheme}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] backdrop-blur-md hover:scale-105 flex items-center space-x-2 text-[color:var(--text)] ${
                  isDarkMode
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                    : 'bg-white/50 border border-[rgba(38,41,72,0.08)] hover:bg-white/80'
                }`}
                style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4)' }}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                <span className="text-base">
                  {isDarkMode ? <SunIcon/> : <MoonIcon/>}
                </span>
                <span>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}
2