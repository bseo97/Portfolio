'use client'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

/** Recursively collect the raw text of a hast node (for copy-to-clipboard). */
function hastText(node) {
  if (!node) return ''
  if (node.type === 'text') return node.value || ''
  if (Array.isArray(node.children)) return node.children.map(hastText).join('')
  return ''
}

/** A fenced code block with a copy button; keeps rehype-highlight's token spans. */
function CodeBlock({ node, children }) {
  const [copied, setCopied] = useState(false)
  const raw = hastText(node).replace(/\n$/, '')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(raw)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="md-code">
      <button
        type="button"
        className={`md-copy${copied ? ' copied' : ''}`}
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <rect x="9" y="9" width="11" height="11" rx="2" strokeWidth="1.7" />
              <path strokeWidth="1.7" strokeLinecap="round" d="M5 15V5a2 2 0 0 1 2-2h10" />
            </svg>
            Copy
          </>
        )}
      </button>
      <pre>{children}</pre>
    </div>
  )
}

const COMPONENTS = {
  pre: CodeBlock,
  // Inline code has no language/hljs class; block code (inside <pre>) keeps its class.
  code({ className, children, ...props }) {
    if (className) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
    return (
      <code className="md-inline-code" {...props}>
        {children}
      </code>
    )
  },
  a({ children, ...props }) {
    return (
      <a target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  },
}

/**
 * Renders a bot message as GitHub-Flavored Markdown with syntax-highlighted
 * code blocks. Styling lives in ChatBot's global stylesheet, scoped to .md-body.
 */
export default function MarkdownMessage({ text, streaming = false }) {
  return (
    <div className={`md-body${streaming ? ' is-streaming' : ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
        components={COMPONENTS}
      >
        {text || ''}
      </ReactMarkdown>
    </div>
  )
}
