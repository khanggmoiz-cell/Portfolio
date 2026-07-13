'use client'

import { useRef, useState, useEffect } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const start = windowHeight * 0.8
      const end = windowHeight * 0.2
      const raw = (start - rect.top) / (start - end)
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const words = text.split(' ')
  const totalChars = text.length
  let charIndex = 0

  return (
    <p ref={ref} className={`relative ${className}`} style={style}>
      {words.map((word, wi) => {
        const wordStart = charIndex
        const chars = word.split('')
        charIndex += word.length + 1
        return (
          <span key={wi} className="inline-block">
            {chars.map((char, ci) => {
              const i = wordStart + ci
              const charStart = i / totalChars
              const charEnd = (i + 1) / totalChars
              const raw = (progress - charStart) / (charEnd - charStart)
              const opacity = Math.min(1, Math.max(0.2, raw))
              return (
                <span key={ci} className="relative inline-block">
                  <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
                  <span
                    className="absolute inset-0"
                    style={{ opacity, transition: 'opacity 0.1s ease' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                </span>
              )
            })}
            {'\u00A0'}
          </span>
        )
      })}
    </p>
  )
}
