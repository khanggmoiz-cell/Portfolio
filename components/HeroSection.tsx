'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import ContactButton from './ContactButton'
import Magnet from './Magnet'

const navLinks = ['About', 'Services', 'Projects', 'Contact']

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
        <a href="#hero" aria-label="Abdul Moiz - Home" className="flex items-center gap-2 group">
          <span className="text-white font-black text-xl md:text-2xl lg:text-3xl tracking-tight bg-gradient-to-r from-white to-white group-hover:from-[#B600A8] group-hover:to-[#BE4C00] bg-clip-text group-hover:text-transparent transition-all duration-500" style={{ fontFamily: 'var(--font-playfair)' }}>
            Sasta Developer
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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="absolute inset-0 overflow-hidden pointer-events-none" />

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function MouseLight() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    },
    [mouseX, mouseY],
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <motion.div
      className="fixed w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full pointer-events-none z-0 hidden sm:block"
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
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#7621B0]/[0.04] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#BE4C00]/[0.04] blur-[120px]" />
      </div>

      <FloatingParticles />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
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
                Hello, welcome
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
                Hi, I&apos;m
              </span>
              <span className="block text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.5vw] xl:text-[4.5rem]">
                Abdul <span className="text-[#B600A8]">Moiz</span>
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
              I craft high-converting digital experiences for local businesses
              — from stunning websites and e-commerce stores to full-stack
              digital growth strategies.
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
            <div className="absolute w-[70%] h-[70%] rounded-full bg-[#7621B0]/30 blur-[60px] sm:blur-[80px]" />
            <div className="absolute w-[50%] h-[50%] rounded-full bg-[#B600A8]/20 blur-[40px] sm:blur-[60px]" />
            <div className="absolute w-[40%] h-[40%] rounded-full bg-[#BE4C00]/15 blur-[30px] sm:blur-[50px]" />
            <Magnet padding={150} strength={3}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 w-[50%] sm:w-[55%] md:w-[45%] lg:w-[85%] xl:w-[90%] max-w-[400px]"
              >
                <Image
                  src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                  alt="Abdul Moiz - 3D Character illustration"
                  width={450}
                  height={500}
                  priority
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
