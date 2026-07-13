'use client'

import { useRef, useEffect, type ReactNode } from 'react'

interface MagnetProps {
  children: ReactNode
  padding?: number
  strength?: number
  className?: string
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const spring = 0.08
    const damping = 0.85

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * spring
      posRef.current.y += (targetRef.current.y - posRef.current.y) * spring
      posRef.current.x *= damping
      posRef.current.y *= damping
      el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = Math.abs(e.clientX - centerX)
      const distY = Math.abs(e.clientY - centerY)
      const paddingX = rect.width / 2 + padding
      const paddingY = rect.height / 2 + padding

      if (distX < paddingX && distY < paddingY) {
        targetRef.current = {
          x: (e.clientX - centerX) / strength,
          y: (e.clientY - centerY) / strength,
        }
      } else {
        targetRef.current = { x: 0, y: 0 }
      }
    }

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [padding, strength])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
