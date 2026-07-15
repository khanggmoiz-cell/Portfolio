import dynamic from 'next/dynamic'
import HeroSection from '@/components/HeroSection'
import MarqueeSection from '@/components/MarqueeSection'

const AboutSection = dynamic(() => import('@/components/AboutSection'))
const ServicesSection = dynamic(() => import('@/components/ServicesSection'))
const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'))
const ContactSection = dynamic(() => import('@/components/ContactSection'))

export default function Home() {
  return (
    <main style={{ overflowX: 'clip', background: '#0C0C0C' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
