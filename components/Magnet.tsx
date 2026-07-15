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
  const isRunning = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const spring = 0.08
    const damping = 0.85
    const idleThreshold = 0.01

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * spring
      posRef.current.y += (targetRef.current.y - posRef.current.y) * spring
      posRef.current.x *= damping
      posRef.current.y *= damping
      el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`

      const isIdle =
        Math.abs(posRef.current.x) < idleThreshold &&
        Math.abs(posRef.current.y) < idleThreshold &&
        Math.abs(targetRef.current.x) < idleThreshold &&
        Math.abs(targetRef.current.y) < idleThreshold

      if (isIdle) {
        isRunning.current = false
        el.style.transform = 'translate3d(0px, 0px, 0)'
        return
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const startLoop = () => {
      if (!isRunning.current) {
        isRunning.current = true
        rafRef.current = requestAnimationFrame(animate)
      }
    }

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
        startLoop()
      } else {
        targetRef.current = { x: 0, y: 0 }
        startLoop()
      }
    }

    const handleMouseLeave = () => {
      targetRef.current = { x: 0, y: 0 }
      startLoop()
    }

    el.addEventListener('mousemove', handleMouseMove as EventListener)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      isRunning.current = false
      el.removeEventListener('mousemove', handleMouseMove as EventListener)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [padding, strength])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
