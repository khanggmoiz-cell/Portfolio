'use client'

import { useRef, useEffect, useCallback } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const charRefs = useRef<HTMLSpanElement[]>([])
  const progressRef = useRef(0)
  const rafRef = useRef<number>(0)

  const updateCharOpacities = useCallback((progress: number) => {
    const totalChars = text.length
    for (let i = 0; i < charRefs.current.length; i++) {
      const el = charRefs.current[i]
      if (!el) continue
      const charStart = i / totalChars
      const charEnd = (i + 1) / totalChars
      const raw = (progress - charStart) / (charEnd - charStart)
      const opacity = Math.min(1, Math.max(0.2, raw))
      el.style.opacity = String(opacity)
    }
  }, [text.length])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const start = windowHeight * 0.8
        const end = windowHeight * 0.2
        const raw = (start - rect.top) / (start - end)
        const progress = Math.min(1, Math.max(0, raw))

        if (Math.abs(progress - progressRef.current) > 0.001) {
          progressRef.current = progress
          updateCharOpacities(progress)
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [updateCharOpacities])

  const words = text.split(' ')
  let charIndex = 0

  return (
    <p ref={containerRef} className={`relative ${className}`} style={style}>
      {words.map((word, wi) => {
        const wordStart = charIndex
        const chars = word.split('')
        charIndex += word.length + 1
        return (
          <span key={wi} className="inline-block">
            {chars.map((char, ci) => {
              const i = wordStart + ci
              return (
                <span key={ci} className="relative inline-block">
                  <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
                  <span
                    ref={(el) => { charRefs.current[i] = el! }}
                    className="absolute inset-0"
                    style={{ opacity: 0.2 }}
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
