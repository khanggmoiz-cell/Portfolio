'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import ContactButton from './ContactButton'
import Magnet from './Magnet'

const navLinks = ['About', 'Services', 'Projects', 'Contact']

const BLUR_PLACEHOLDER = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0C0C0C]/70 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center px-5 md:px-10 py-3 md:py-5 max-w-7xl mx-auto">
        <a href="#hero" aria-label="CodeComs - Digital Agency Home" className="flex items-center gap-2 group">
          <span className="text-white font-black text-xl md:text-2xl lg:text-3xl tracking-tight bg-gradient-to-r from-white to-white group-hover:from-[#B600A8] group-hover:to-[#BE4C00] bg-clip-text group-hover:text-transparent transition-all duration-500" style={{ fontFamily: 'var(--font-sora)' }}>
            CodeComs
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 lg:gap-10" role="list">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              role="listitem"
              className="text-[#D7E2EA]/80 hover:text-white font-medium uppercase tracking-wider text-xs md:text-sm transition-colors duration-300 relative group cursor-pointer"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#B600A8] to-[#BE4C00] transition-all duration-300 group-hover:w-full" aria-hidden="true" />
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          id="mobile-menu"
          role="list"
          className="md:hidden bg-[#0C0C0C]/95 backdrop-blur-xl border-t border-white/5 px-5 pb-6"
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              role="listitem"
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-[#D7E2EA]/80 hover:text-white font-medium uppercase tracking-wider text-sm transition-colors border-b border-white/5 last:border-0 cursor-pointer"
            >
              {link}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}

function FloatingParticles() {
  const [mounted, setMounted] = useState(false)

  const particleData = useMemo(() =>
    Array.from({ length: 8 }).map(() => ({
      w: Math.random() * 3 + 1,
      h: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    })),
  [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="absolute inset-0 overflow-hidden pointer-events-none" />

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particleData.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: p.w,
            height: p.h,
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function MouseLight() {
  const [isDesktop, setIsDesktop] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    },
    [mouseX, mouseY],
  )

  useEffect(() => {
    if (!isDesktop) return
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove, isDesktop])

  if (!isDesktop) return null

  return (
    <motion.div
      className="fixed w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full pointer-events-none z-0"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background:
          'radial-gradient(circle, rgba(118,33,176,0.06) 0%, transparent 70%)',
      }}
    />
  )
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen h-auto lg:h-screen flex flex-col bg-[#0C0C0C] overflow-hidden"
    >
      <Navbar />
      <MouseLight />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#7621B0]/[0.04] blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#BE4C00]/[0.04] blur-[80px]" />
      </div>

      <FloatingParticles />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="flex-1 flex items-center justify-center px-5 md:px-10 lg:px-16 pt-20 pb-8 lg:pt-0">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <div className="flex flex-col gap-5 sm:gap-6 lg:gap-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="inline-flex self-start"
            >
              <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[#D7E2EA] text-[10px] sm:text-xs font-medium tracking-wider uppercase">
                Web Development & Digital Marketing
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="hero-heading font-black uppercase tracking-tight leading-[0.95]"
            >
              <span className="block text-[12vw] sm:text-[10vw] md:text-[7vw] lg:text-[5.5vw] xl:text-[5.5rem]">
                We Build
              </span>
              <span className="block text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.5vw] xl:text-[4.5rem]">
                Digital <span className="text-[#B600A8]">Success</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-[#D7E2EA]/80 font-light leading-relaxed max-w-sm md:max-w-md text-xs sm:text-sm md:text-base"
            >
              We craft high-converting websites, e-commerce stores, and
              digital marketing strategies that help local businesses
              dominate Google and social media.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.65,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 rounded-full border-2 border-[#D7E2EA]/20 text-[#D7E2EA] font-medium uppercase tracking-widest text-[10px] sm:text-xs md:text-sm hover:bg-white/10 transition-all duration-300 cursor-pointer"
                aria-label="View my projects"
              >
                View Projects
              </a>
              <ContactButton />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="order-1 lg:order-2 flex items-center justify-center lg:justify-end relative"
          >
            <div className="absolute w-[70%] h-[70%] rounded-full bg-[#7621B0]/30 blur-[40px] sm:blur-[60px]" />
            <div className="absolute w-[50%] h-[50%] rounded-full bg-[#B600A8]/20 blur-[30px] sm:blur-[50px]" />
            <div className="absolute w-[40%] h-[40%] rounded-full bg-[#BE4C00]/15 blur-[25px] sm:blur-[40px]" />
            <Magnet padding={150} strength={3}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-[50%] sm:w-[55%] md:w-[45%] lg:w-[85%] xl:w-[90%] max-w-[400px]"
              >
                <Image
                  src="/3d-character.png"
                  alt="CodeComs - Web Development and Digital Marketing Agency"
                  width={450}
                  height={500}
                  priority
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 55vw, (max-width: 1024px) 45vw, 85vw"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </Magnet>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[#D7E2EA]/30 text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-[#D7E2EA]/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
