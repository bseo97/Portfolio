'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from '../../hooks/useTheme'

export default function ChatBot({ onExpand, typingReady }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [placeholder, setPlaceholder] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [botIsTyping, setBotIsTyping] = useState(false)
  const [rotIndex, setRotIndex] = useState(0)
  const [rotAnimate, setRotAnimate] = useState(true)
  const rotPausedRef = useRef(false)
  const messagesEndRef = useRef(null)
  const chatMessagesRef = useRef(null)
  const inputRef = useRef(null)
  const fullText = "Our Legendary Conversation starts here"
  const { isDarkMode } = useTheme()

  // Starter prompts shown in the empty state so the user always has a way in.
  // Declared before the rotation effects below, which read suggestions.length.
  const suggestions = [
    'What have you built?',
    'What is your experience?',
    'What tech do you use?',
  ]

  // Simple markdown parser for basic formatting
  const parseMessage = (text) => {
    if (!text) return text
    
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **text** to bold
      .replace(/^---$/gm, '<div class="message-separator"></div>') // Replace --- with separator
  }

  useEffect(() => {
    if (!typingReady) {
      setPlaceholder('')
      setIsTyping(true)
      return
    }
    
    let currentIndex = 0
    setPlaceholder('')
    setIsTyping(true)
    
    const typeText = () => {
      if (currentIndex <= fullText.length) {
        setPlaceholder(fullText.slice(0, currentIndex))
        currentIndex++
        setTimeout(typeText, 30)
      } else {
        setIsTyping(false)
      }
    }
    
    typeText()
  }, [typingReady])

  useEffect(() => {
    scrollToBottom()
    if (onExpand) onExpand(messages.length > 0)
  }, [messages, onExpand])
  
  useEffect(() => {
    if (botIsTyping) {
      scrollToBottom()
    }
  }, [botIsTyping])

  // Auto-rotate the recommended-question reel while the empty state is shown.
  // Pauses on hover/focus (rotPausedRef) so the chip stays comfortably clickable.
  useEffect(() => {
    if (messages.length > 0) return
    const id = setInterval(() => {
      if (!rotPausedRef.current) setRotIndex((i) => i + 1)
    }, 3000)
    return () => clearInterval(id)
  }, [messages.length])

  // Seamless loop: after sliding into the cloned first item (index === length),
  // snap back to 0 with animation disabled so the reset is invisible.
  useEffect(() => {
    if (rotIndex === suggestions.length) {
      const t = setTimeout(() => {
        setRotAnimate(false)
        setRotIndex(0)
      }, 680)
      return () => clearTimeout(t)
    }
  }, [rotIndex, suggestions.length])

  // Re-enable the slide transition after the silent snap-back has painted.
  useEffect(() => {
    if (!rotAnimate) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setRotAnimate(true))
      )
      return () => cancelAnimationFrame(id)
    }
  }, [rotAnimate])

  // Handle mobile keyboard scroll issues
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth > 768) return

    let savedScrollPosition = 0
    let isKeyboardOpen = false
    let savedBodyBackground = ''

    const inputElement = inputRef.current
    if (!inputElement) return

    // Save scroll position before keyboard opens
    const handleFocus = () => {
      savedScrollPosition = window.scrollY || window.pageYOffset
      isKeyboardOpen = true
      
      // Save current background
      savedBodyBackground = document.body.style.background || ''
      
      // Match the unified site background so the mobile keyboard lock does not
      // flash a mismatched color. Light = ivory, Dark = warm charcoal.
      const isLightTheme = document.documentElement.classList.contains('light-theme') ||
                          document.body.classList.contains('light-theme')
      const backgroundColor = isLightTheme ? '#F4F1E9' : '#262948'
      
      // Lock the body scroll position and prevent white background
      document.body.style.position = 'fixed'
      document.body.style.top = `-${savedScrollPosition}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      document.body.style.height = '100vh'
      document.body.style.overflow = 'hidden'
      // Set background color to match the theme's bottom gradient color
      document.body.style.backgroundColor = backgroundColor
    }

    // Restore scroll position when keyboard closes
    const handleBlur = () => {
      if (isKeyboardOpen) {
        isKeyboardOpen = false
        
        // Unlock body and restore scroll position
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.width = ''
        document.body.style.height = ''
        document.body.style.overflow = ''
        document.body.style.background = savedBodyBackground
        document.body.style.backgroundColor = ''
        
        // Use requestAnimationFrame for smoother restoration
        requestAnimationFrame(() => {
          window.scrollTo(0, savedScrollPosition)
        })
      }
    }

    // Handle visual viewport changes (more reliable for keyboard detection)
    const handleViewportResize = () => {
      if (!isKeyboardOpen && inputElement === document.activeElement) {
        // Keyboard opened but we missed the focus event
        savedScrollPosition = window.scrollY || window.pageYOffset
        isKeyboardOpen = true
      }
    }

    inputElement.addEventListener('focus', handleFocus)
    inputElement.addEventListener('blur', handleBlur)
    
    // Use visualViewport API if available
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportResize)
    }

    return () => {
      inputElement.removeEventListener('focus', handleFocus)
      inputElement.removeEventListener('blur', handleBlur)
      
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportResize)
      }
      
      // Cleanup: ensure body style is restored
      if (isKeyboardOpen) {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.width = ''
        document.body.style.height = ''
        document.body.style.overflow = ''
        document.body.style.background = savedBodyBackground
        document.body.style.backgroundColor = ''
      }
    }
  }, [])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const chatMessages = messagesEndRef.current.closest('.chat-messages')
      if (chatMessages) {
        setTimeout(() => {
          chatMessages.scrollTop = chatMessages.scrollHeight
        }, 50)
      }
    }
  }

  const scrollToTop = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = 0
    }
  }

  const handleScroll = () => {
    if (chatMessagesRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessagesRef.current
      setShowScrollTop(scrollTop < scrollHeight - clientHeight - 50 && messages.length > 2)
    }
  }

  // Helper function to create message objects
  const createMessage = (text, isUser = false, id = null) => ({
    id: id || Date.now(),
    text,
    isUser,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })

  const sendMessage = (text) => {
    const userInput = (text || '').trim()
    if (!userInput) return

    const userMessage = createMessage(userInput, true)
    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setBotIsTyping(true)

    setTimeout(async () => {
      try {
        const botResponseText = await getBotResponse(userInput)
        setBotIsTyping(false)
        const botMessage = createMessage(botResponseText, false, Date.now() + 1)
        setMessages(prev => [...prev, botMessage])
      } catch (error) {
        console.error('Error getting bot response:', error)
        setBotIsTyping(false)
        const errorMessage = createMessage("Sorry, I'm having trouble responding right now. Please try again!", false, Date.now() + 1)
        setMessages(prev => [...prev, errorMessage])
      }
    }, 800)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(message)
  }

  const getBotResponse = async (userMessage) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      return data.reply || "Sorry, I couldn't process your request right now.";
    } catch (error) {
      console.error('Chat API error:', error);
      // Fallback response when API fails
      return "I'm having trouble connecting right now, but I'd love to tell you about my projects, skills, and experience as a Software Engineering student at UC Irvine!";
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="chatbot-container">
      <style jsx>{`
        .chatbot-container {
          width: 100%;
          max-width: 750px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          min-height: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          /* overflow visible so the card's soft ambient shadow renders fully
             instead of being clipped into hard side/edge strips. The chat
             scroll lives on .chat-messages, and .chatbot-wrapper caps height. */
          overflow: visible;
          box-sizing: border-box;
        }
        /* ---- Double-Bezel: OUTER SHELL (translucent glass frame) ---- */
        .chatbot-wrapper {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.28)'};
          -webkit-backdrop-filter: blur(24px) saturate(1.8);
          backdrop-filter: blur(24px) saturate(1.8);
          border-radius: 30px;
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.55)'};
          /* Bottom-weighted ambient shadow + a light-catching top edge highlight.
             Minimal horizontal bleed so it never clips into side strips. */
          box-shadow: ${isDarkMode
            ? '0 30px 50px -28px rgba(0, 0, 0, 0.65), 0 10px 22px -18px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.14)'
            : '0 28px 50px -30px rgba(38, 41, 72, 0.30), 0 10px 22px -18px rgba(38, 41, 72, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.8)'};
          padding: 6px;
          transition: box-shadow 0.5s cubic-bezier(0.32,0.72,0,1), transform 0.5s cubic-bezier(0.32,0.72,0,1);
          position: relative;
          width: 100%;
          min-height: 432px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          margin-top: 0;
          box-sizing: border-box;
        }
        /* ---- Double-Bezel: INNER CORE (primary glass surface) ---- */
        .chatbot-core {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-radius: 24px;
          /* Vertical sheen (light from the top) over a translucent fill so the
             ambient orbs behind subtly refract through the surface. */
          background: ${isDarkMode
            ? 'linear-gradient(180deg, rgba(34, 40, 72, 0.56), rgba(18, 22, 42, 0.46))'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.54), rgba(255, 255, 255, 0.4))'};
          -webkit-backdrop-filter: blur(30px) saturate(1.7);
          backdrop-filter: blur(30px) saturate(1.7);
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.55)'};
          box-shadow: inset 0 1px 0 ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)'},
                      inset 0 -1px 0 ${isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(38, 41, 72, 0.03)'};
        }
        @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
          .chatbot-wrapper {
            background: ${isDarkMode ? 'rgba(30, 41, 59, 0.96)' : 'rgba(244, 241, 233, 0.96)'};
          }
          .chatbot-core {
            background: ${isDarkMode ? 'rgba(18, 22, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
          }
        }
        .chatbot-wrapper.empty {
          min-height: 340px;
        }
        @media (max-width: 900px) {
          .chatbot-wrapper.empty {
            min-height: 300px;
          }
        }
        @media (max-width: 600px) {
          .chatbot-wrapper.empty {
            min-height: 260px;
          }
        }
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.9rem 1.1rem;
          border-bottom: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(38, 41, 72, 0.06)'};
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.35)'};
          flex-shrink: 0;
        }
        .chat-identity {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }
        .chat-avatar {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 800;
          color: #ffffff;
          background: linear-gradient(140deg, #7fe4e4 0%, #53c9c9 50%, #37b6b6 100%);
          box-shadow: 0 6px 16px -6px rgba(83, 201, 201, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          flex-shrink: 0;
        }
        .chat-identity-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          line-height: 1.2;
        }
        .chat-title {
          color: var(--text);
          font-size: 0.98rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin: 0;
        }
        .chat-status {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: ${isDarkMode ? 'rgba(242, 242, 242, 0.5)' : 'rgba(26, 26, 26, 0.5)'};
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #35c759;
          box-shadow: 0 0 0 0 rgba(53, 199, 89, 0.5);
          animation: statusPulse 2.4s cubic-bezier(0.32,0.72,0,1) infinite;
        }
        @keyframes statusPulse {
          0% { box-shadow: 0 0 0 0 rgba(53, 199, 89, 0.5); }
          70% { box-shadow: 0 0 0 6px rgba(53, 199, 89, 0); }
          100% { box-shadow: 0 0 0 0 rgba(53, 199, 89, 0); }
        }
        .header-buttons {
          display: flex;
          gap: 0.5rem;
        }
        .clear-button, .close-button {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(38, 41, 72, 0.04)'};
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(38, 41, 72, 0.08)'};
          color: ${isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 26, 0.65)'};
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          cursor: pointer;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: transform 0.25s cubic-bezier(0.32,0.72,0,1), background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
          font-family: var(--font-sans), sans-serif;
        }
        .clear-button:hover, .close-button:hover {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(38, 41, 72, 0.07)'};
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          transform: translateY(-1px);
        }
        .clear-button:active, .close-button:active {
          transform: scale(0.97);
        }
        .close-button {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.3);
          color: rgba(239, 68, 68, 0.9);
        }
        .close-button:hover {
          background: rgba(239, 68, 68, 0.3);
          color: #ffffff;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-height: 0;
          max-height: 100%;
        }
        .chat-messages.empty {
          justify-content: center;
          align-items: center;
        }
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          border-radius: 3px;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(83, 201, 201, 0.5);
          border-radius: 3px;
        }
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(83, 201, 201, 0.7);
        }
        .message {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          max-width: 80%;
        }
        .message.user {
          flex-direction: row-reverse;
          align-self: flex-end;
        }
        .message.bot {
          align-self: flex-start;
        }
        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 600;
          flex-shrink: 0;
        }
        .message.user .message-avatar {
          background: linear-gradient(135deg, #05d9e8, #53c9c9);
          color: #ffffff;
        }
        .message.bot .message-avatar {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
          color: #05d9e8;
        }
        .message-content {
          flex: 1;
        }
        .message-bubble {
          padding: 0.75rem 1rem;
          border-radius: 16px;
          font-size: 0.95rem;
          line-height: 1.4;
          word-wrap: break-word;
          white-space: pre-line;
        }
        .message-bubble strong {
          font-weight: 700;
          color: inherit;
        }
        .message.bot .message-bubble strong {
          color: var(--accent);
        }
        .message.user .message-bubble {
          background: var(--accent);
          color: #ffffff;
          border-bottom-right-radius: 6px;
        }
        .message.bot .message-bubble {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
          color: ${isDarkMode ? '#ffffff' : '#2c3e50'};
          border-bottom-left-radius: 6px;
        }
        .message-time {
          font-size: 0.75rem;
          color: ${isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
          margin-top: 0.25rem;
          text-align: right;
        }
        .message.bot .message-time {
          text-align: left;
        }
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 0.4rem;
          padding: 1.5rem 1.25rem;
          text-align: center;
        }
        .empty-state-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.35rem;
          opacity: 0.85;
        }
        .empty-state-title {
          font-size: 1.4rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.2;
          color: var(--text);
        }
        .empty-state-subtext {
          font-size: 0.92rem;
          line-height: 1.5;
          color: ${isDarkMode ? 'rgba(242, 242, 242, 0.5)' : 'rgba(26, 26, 26, 0.5)'};
          max-width: 38ch;
          margin-top: 0.15rem;
        }
        .chat-suggestions {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
        }
        /* Auto-rotating recommended-question reel */
        .suggestion-reel {
          --reel-h: 1.95rem;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-sans), sans-serif;
          color: var(--text);
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.6)'};
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(38, 41, 72, 0.09)'};
          box-shadow: inset 0 1px 1px ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)'};
          padding: 0.45rem 0.55rem 0.45rem 0.95rem;
          border-radius: 999px;
          cursor: pointer;
          opacity: 0;
          transform: translateY(12px);
          animation: suggestionIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s forwards;
          transition: transform 0.35s cubic-bezier(0.32,0.72,0,1), background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        @keyframes suggestionIn {
          to { opacity: 1; transform: translateY(0); }
        }
        .suggestion-reel:hover {
          background: ${isDarkMode ? 'rgba(83, 201, 201, 0.12)' : 'rgba(255, 255, 255, 0.92)'};
          border-color: ${isDarkMode ? 'rgba(83, 201, 201, 0.5)' : 'rgba(83, 201, 201, 0.6)'};
          transform: translateY(-2px);
          box-shadow: 0 14px 28px -14px ${isDarkMode ? 'rgba(0,0,0,0.6)' : 'rgba(38,41,72,0.4)'};
        }
        .suggestion-reel:active {
          transform: translateY(0) scale(0.98);
        }
        .reel-spark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          flex-shrink: 0;
          animation: sparkTwinkle 2.6s cubic-bezier(0.32,0.72,0,1) infinite;
        }
        .reel-spark svg {
          width: 15px;
          height: 15px;
        }
        @keyframes sparkTwinkle {
          0%, 100% { opacity: 0.55; transform: scale(0.9) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.05) rotate(90deg); }
        }
        .reel-mask {
          position: relative;
          display: block;
          height: var(--reel-h);
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%);
        }
        .reel-track {
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.65s cubic-bezier(0.76, 0, 0.24, 1);
          will-change: transform;
        }
        .reel-item {
          height: var(--reel-h);
          line-height: var(--reel-h);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          font-weight: 500;
          white-space: nowrap;
          color: var(--text);
        }
        .reel-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          flex-shrink: 0;
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(38, 41, 72, 0.06)'};
          transition: transform 0.35s cubic-bezier(0.32,0.72,0,1), background 0.3s ease;
        }
        .reel-arrow svg {
          width: 13px;
          height: 13px;
          color: var(--accent);
        }
        .suggestion-reel:hover .reel-arrow {
          background: var(--accent);
          transform: translate(2px, -2px) scale(1.05);
        }
        .suggestion-reel:hover .reel-arrow svg {
          color: #ffffff;
        }
        @media (prefers-reduced-motion: reduce) {
          .reel-track { transition: none; }
          .reel-spark { animation: none; }
        }
        .chatbot-form {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 0.7rem 0.7rem 0.75rem;
          border-top: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(38, 41, 72, 0.06)'};
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.35)'};
          position: relative;
          flex-shrink: 0;
        }
        .chatbot-input {
          flex: 1;
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.75)'};
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(38, 41, 72, 0.08)'};
          box-shadow: inset 0 1px 2px ${isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(38, 41, 72, 0.05)'};
          border-radius: 999px;
          padding: 0.8rem 1.25rem;
          color: ${isDarkMode ? '#ffffff' : '#1a1a1a'};
          font-size: 16px; /* Prevent zoom on iOS when input is focused */
          font-weight: 500;
          font-family: var(--font-sans), sans-serif;
          outline: none;
          transition: border-color 0.35s cubic-bezier(0.32,0.72,0,1), box-shadow 0.35s cubic-bezier(0.32,0.72,0,1), background 0.35s ease;
        }
        .chatbot-input:focus {
          border-color: ${isDarkMode ? 'rgba(83, 201, 201, 0.6)' : 'rgba(83, 201, 201, 0.55)'};
          box-shadow: 0 0 0 4px ${isDarkMode ? 'rgba(83, 201, 201, 0.14)' : 'rgba(83, 201, 201, 0.12)'}, inset 0 1px 2px ${isDarkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(38, 41, 72, 0.05)'};
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.95)'};
        }
        .chatbot-input::placeholder {
          color: ${isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(26, 26, 26, 0.38)'};
          font-style: normal;
        }
        .submit-button {
          background: linear-gradient(140deg, #7fe4e4 0%, #53c9c9 50%, #37b6b6 100%);
          border: none;
          border-radius: 50%;
          width: 46px;
          height: 46px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.32,0.72,0,1), box-shadow 0.3s ease, opacity 0.2s ease;
          box-shadow: 0 8px 20px -8px rgba(83, 201, 201, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          flex-shrink: 0;
        }
        .submit-button-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.35s cubic-bezier(0.32,0.72,0,1);
        }
        .submit-button:hover {
          transform: scale(1.06);
          box-shadow: 0 12px 26px -8px rgba(83, 201, 201, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.4);
        }
        .submit-button:hover .submit-button-inner {
          transform: translate(1px, -1px) scale(1.05);
        }
        .submit-button:active {
          transform: scale(0.94);
        }
        .submit-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 4px 12px -6px rgba(83, 201, 201, 0.4);
        }
        .submit-button:disabled .submit-button-inner {
          transform: none;
        }
        .submit-button svg {
          width: 19px;
          height: 19px;
          color: #ffffff;
        }
        .scroll-top-button {
          position: absolute;
          bottom: 6rem;
          right: 1rem;
          background: rgba(5, 217, 232, 0.9);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 20;
          box-shadow: 0 4px 15px rgba(5, 217, 232, 0.3);
        }
        .scroll-top-button:hover {
          background: rgba(5, 217, 232, 1);
          transform: scale(1.1);
        }
        .scroll-top-button svg {
          width: 16px;
          height: 16px;
          color: #ffffff;
        }
        .message-separator {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          margin: 0.75rem 0;
          border: none;
        }
        .typing-cursor {
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
          color: ${isDarkMode ? '#ffffff' : '#2c3e50'};
          border-radius: 16px;
          border-bottom-left-radius: 6px;
        }
        .typing-dots {
          display: flex;
          gap: 0.2rem;
        }
        .typing-dots span {
          width: 6px;
          height: 6px;
          background-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
          border-radius: 50%;
          animation: typingDots 1.4s infinite ease-in-out;
        }
        .typing-dots span:nth-child(1) {
          animation-delay: 0s;
        }
        .typing-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typingDots {
          0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        /* Mobile Responsive */
        @media (max-width: 900px) {
          .chatbot-container {
            max-width: calc(100% - 1rem);
            padding: 0 0.5rem;
            min-height: 0;
            margin-left: auto;
            margin-right: auto;
          }
          .chatbot-wrapper {
            min-height: 340px;
            max-height: 600px;
          }
          .message {
            max-width: 90%;
          }
          .chatbot-input {
            font-size: 16px; /* Keep at 16px to prevent iOS zoom */
            padding: 0.65rem 2.5rem 0.65rem 0.9rem;
          }
          .submit-button {
            width: 36px;
            height: 36px;
          }
          .submit-button svg {
            width: 16px;
            height: 16px;
          }
        }
        @media (max-width: 600px) {
          .chatbot-container {
            max-width: calc(100% - 0.5rem);
            width: 100%;
            padding: 0 0.25rem;
            min-height: 0;
            margin-left: auto;
            margin-right: auto;
            box-sizing: border-box;
          }
          .chatbot-wrapper {
            min-height: 240px;
            max-height: 420px;
            box-sizing: border-box;
          }
          .chat-header {
            padding: 0.75rem 1rem;
          }
          .chatbot-form {
            padding: 0.75rem 1rem;
          }
          .message-bubble {
            padding: 0.65rem 0.85rem;
            font-size: 0.9rem;
            line-height: 1.5;
          }
          .submit-button {
            width: 34px;
            height: 34px;
          }
          .submit-button svg {
            width: 14px;
            height: 14px;
          }
          .header-buttons {
            flex-direction: column;
            gap: 0.25rem;
          }
          .clear-button {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
      
      <div className={`chatbot-wrapper${messages.length === 0 ? ' empty' : ''}`}>
       <div className="chatbot-core">
        <div className="chat-header">
          <div className="chat-identity">
            <div className="chat-avatar" aria-hidden="true">B</div>
            <div className="chat-identity-text">
              <span className="chat-title">Brian</span>
              <span className="chat-status">
                <span className="status-dot" aria-hidden="true"></span>
                Legendary Engineer
              </span>
            </div>
          </div>
          <div className="header-buttons">
            {messages.length > 0 && (
              <button onClick={clearChat} className="clear-button">
                Clear
              </button>
            )}
          </div>
        </div>
        <div
          ref={chatMessagesRef}
          className={`chat-messages ${messages.length === 0 ? 'empty' : ''}`}
          onScroll={handleScroll}
        >
          {messages.length === 0 ? (
            <div className="empty-state">
              {/* <div className="empty-state-eyebrow">Conversation</div> */}
              <div className="empty-state-title">What brings you here?</div>
              {/* <div className="empty-state-subtext">Projects, experience, skills, or what he&apos;s building right now.</div> */}
              <div className="chat-suggestions">
                <button
                  type="button"
                  className="suggestion-reel"
                  onClick={() => sendMessage(suggestions[rotIndex % suggestions.length])}
                  onMouseEnter={() => { rotPausedRef.current = true }}
                  onMouseLeave={() => { rotPausedRef.current = false }}
                  onFocus={() => { rotPausedRef.current = true }}
                  onBlur={() => { rotPausedRef.current = false }}
                  aria-label={`Ask: ${suggestions[rotIndex % suggestions.length]}`}
                >
                  <span className="reel-spark" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3l1.7 5.8L19.5 10l-5.8 1.7L12 17.5l-1.7-5.8L4.5 10l5.8-1.7z" />
                    </svg>
                  </span>
                  <span className="reel-mask">
                    <span
                      className="reel-track"
                      style={{
                        transform: `translateY(calc(var(--reel-h) * -${rotIndex}))`,
                        transition: rotAnimate ? undefined : 'none',
                      }}
                    >
                      {[...suggestions, suggestions[0]].map((q, i) => (
                        <span className="reel-item" key={i}>{q}</span>
                      ))}
                    </span>
                  </span>
                  <span className="reel-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
                  <div className="message-content">
                    <div
                      className="message-bubble"
                      dangerouslySetInnerHTML={{ __html: parseMessage(msg.text) }}
                    />
                    <div className="message-time">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
              {botIsTyping && (
                <div className="message bot">
                  <div className="message-content">
                    <div className="message-bubble typing-indicator">
                      <span>Typing</span>
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        {showScrollTop && (
          <button onClick={scrollToTop} className="scroll-top-button" title="Scroll to top">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
        <form onSubmit={handleSubmit} className="chatbot-form">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder + (isTyping ? '|' : '')}
            className="chatbot-input"
          />
          <button type="submit" className="submit-button" disabled={!message.trim()} aria-label="Send message">
            <span className="submit-button-inner">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.7}
                  d="M7 17L17 7M17 7H8M17 7v9"
                />
              </svg>
            </span>
          </button>
        </form>
       </div>
      </div>
    </div>
  )
}