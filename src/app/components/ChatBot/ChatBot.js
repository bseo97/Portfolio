'use client'
import React, { useState, useEffect, useRef } from 'react'

export default function ChatBot({ onExpand, typingReady }) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [placeholder, setPlaceholder] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false) // New state for toggle
  const messagesEndRef = useRef(null)
  const fullText = "Ask anything about Brian!"

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
    if (onExpand) onExpand(isExpanded && messages.length > 0)
  }, [messages, isExpanded])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const chatMessages = messagesEndRef.current.closest('.chat-messages');
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    }
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    if (onExpand) onExpand(!isExpanded)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const userMessage = {
        id: Date.now(),
        text: message,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, userMessage])
      setMessage('')
      // Simulate bot response
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: getBotResponse(message),
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, botMessage])
      }, 1000)
    }
  }

  const getBotResponse = (userMessage) => {
    // Simple response logic - you can replace this with actual AI integration
    const responses = [
      "Hi! I'm Brian, a Software Engineering student at UC Irvine. I'm passionate about AI infrastructure and ML systems. What would you like to know about my projects or experience?",
      "I've worked on several exciting projects including Rent-spiracy (a rental platform), Fabflix (a movie database), and Decurb (an AI-powered recommendation system). Which one interests you most?",
      "I'm currently involved with the Associate of Computing Academy at UCI and recently joined Hacks at UCI. I love hackathons and building innovative solutions!",
      "My technical skills include React.js, Next.js, Python, Java, and various AI/ML frameworks. I'm particularly interested in prompt optimization and scalable systems.",
      "Thanks for your interest! Feel free to check out my projects or connect with me through the links on this portfolio."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
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
          margin: 2rem auto 0 auto;
          padding: 0 1.5rem;
          position: relative;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          max-height: 50vh;
          overflow-y: auto;
        }
        
        .chat-toggle-button {
          background: linear-gradient(135deg, #05d9e8, #53c9c9);
          color: #ffffff;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(5, 217, 232, 0.3);
          transition: all 0.3s ease;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 auto;
          font-family: 'Inter', Arial, sans-serif;
        }
        
        .chat-toggle-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(5, 217, 232, 0.4);
        }
        
        .chatbot-wrapper {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
          width: 100%;
          min-height: 420px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          margin-top: 1rem;
        }
        .chatbot-wrapper.empty {
          min-height: 180px;
        }
        @media (max-width: 900px) {
          .chatbot-wrapper.empty {
            min-height: 140px;
          }
        }
        @media (max-width: 600px) {
          .chatbot-wrapper.empty {
            min-height: 100px;
          }
        }
        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          flex-shrink: 0;
        }
        .chat-title {
          color: #05d9e8;
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }
        .header-buttons {
          display: flex;
          gap: 0.5rem;
        }
        .clear-button, .close-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
          padding: 0.5rem 1rem;
          border-radius: 10px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          font-family: 'Inter', Arial, sans-serif;
        }
        .clear-button:hover, .close-button:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
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
          justify-content: center;
          align-items: center;
        }
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
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
          background: rgba(255, 255, 255, 0.2);
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
        }
        .message.user .message-bubble {
          background: linear-gradient(135deg, #05d9e8, #53c9c9);
          color: #ffffff;
          border-bottom-right-radius: 6px;
        }
        .message.bot .message-bubble {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          border-bottom-left-radius: 6px;
        }
        .message-time {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
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
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
        }
        .empty-state-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #05d9e8;
        }
        .empty-state-text {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .empty-state-subtext {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
        }
        .chatbot-form {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          position: relative;
          flex-shrink: 0;
        }
        .chatbot-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          padding: 0.75rem 3rem 0.75rem 1rem;
          color: #ffffff;
          font-size: 1rem;
          font-family: 'Inter', Arial, sans-serif;
          outline: none;
          transition: all 0.3s ease;
          margin-right: 0.75rem;
        }
        .chatbot-input:focus {
          border-color: #05d9e8;
          box-shadow: 0 0 0 2px rgba(5, 217, 232, 0.1);
          background: rgba(255, 255, 255, 0.15);
        }
        .chatbot-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
          font-style: italic;
        }
        .submit-button {
          background: linear-gradient(135deg, #05d9e8, #53c9c9);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(5, 217, 232, 0.3);
          flex-shrink: 0;
        }
        .submit-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(5, 217, 232, 0.5);
        }
        .submit-button:active {
          transform: scale(0.95);
        }
        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        .submit-button svg {
          width: 18px;
          height: 18px;
          color: #ffffff;
          transition: transform 0.3s ease;
        }
        .submit-button:hover svg {
          transform: translateX(2px);
        }
        .typing-cursor {
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        /* Mobile Responsive */
        @media (max-width: 900px) {
          .chatbot-container {
            max-width: 98vw;
            padding: 0 0.5rem;
            min-height: 340px;
          }
          .chatbot-wrapper {
            min-height: 340px;
            max-height: 600px;
          }
          .message {
            max-width: 90%;
          }
          .chatbot-input {
            font-size: 0.95rem;
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
          .chat-toggle-button {
            font-size: 1rem;
            padding: 0.8rem 1.5rem;
          }
        }
        @media (max-width: 600px) {
          .chatbot-container {
            max-width: 100vw;
            width: 98vw;
            padding: 0 0.25rem;
            min-height: 240px;
          }
          .chatbot-wrapper {
            min-height: 240px;
            max-height: 420px;
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
          .clear-button, .close-button {
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
      
      <div className="chatbot-container">
        {!isExpanded ? (
          <button className="chat-toggle-button" onClick={handleToggle}>
            <span>💬</span>
            Ask me anything!
          </button>
        ) : (
          <div className={`chatbot-wrapper${messages.length === 0 ? ' empty' : ''}`}>
            <div className="chat-header">
              <h3 className="chat-title">Chat with Brian</h3>
              <div className="header-buttons">
                {messages.length > 0 && (
                  <button onClick={clearChat} className="clear-button">
                    Clear Chat
                  </button>
                )}
                <button onClick={handleToggle} className="close-button">
                  Close Chat
                </button>
              </div>
            </div>
            
            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-text">Start a conversation!</div>
                  <div className="empty-state-subtext">Ask me anything about my projects, experience, or interests</div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
                    <div className="message-avatar">
                      {msg.isUser ? 'U' : 'B'}
                    </div>
                    <div className="message-content">
                      <div className="message-bubble">{msg.text}</div>
                      <div className="message-time">{msg.timestamp}</div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="chatbot-form">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                placeholder={placeholder + (isTyping ? '|' : '')}
                className="chatbot-input"
              />
              <button onClick={handleSubmit} className="submit-button" disabled={!message.trim()}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}