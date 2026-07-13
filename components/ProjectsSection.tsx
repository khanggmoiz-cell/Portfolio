'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import LiveProjectButton from './LiveProjectButton'

interface Project {
  id: string
  num: string
  name: string
  category: string
  col1img1: string
  col1img2: string
  col2img: string
}

const fallbackProjects: Project[] = [
  {
    id: '1',
    num: '01',
    name: 'Nextlevel Studio',
    category: 'Client',
    col1img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    id: '2',
    num: '02',
    name: 'Aura Brand Identity',
    category: 'Personal',
    col1img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    id: '3',
    num: '03',
    name: 'Solaris Digital',
    category: 'Client',
    col1img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
]

function ProjectCard({
  project,
  index,
  totalCards,
}: {
  project: Project
  index: number
  totalCards: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const targetScale = 1 - (totalCards - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div
      ref={ref}
      className="sticky top-16 sm:top-24 md:top-32 h-[75vh] sm:h-[80vh] md:h-[85vh] flex items-start pt-4 sm:pt-6 md:pt-8"
    >
      <motion.div
        style={{
          scale,
          top: `${index * 16}px`,
        }}
        className="rounded-[24px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-3 sm:p-6 md:p-8 w-full"
      >
        <div className="flex items-start justify-between mb-3 sm:mb-6">
          <div className="flex items-start gap-2 sm:gap-4">
            <span className="text-[#D7E2EA] font-black leading-none text-[7vw] sm:text-[6vw] md:text-[5vw] lg:text-[5rem]">
              {project.num}
            </span>
            <div className="pt-1 sm:pt-3">
              <span className="text-[#D7E2EA]/60 text-[9px] sm:text-xs uppercase tracking-widest font-medium">
                {project.category}
              </span>
              <h3 className="text-[#D7E2EA] font-medium uppercase leading-tight text-xs sm:text-base md:text-xl lg:text-2xl">
                {project.name}
              </h3>
            </div>
          </div>
          <div className="hidden sm:block">
            <LiveProjectButton />
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4">
          <div className="flex flex-col gap-2 sm:gap-4 w-[40%]">
            <Image
              src={project.col1img1}
              alt={`${project.name} design screenshot 1`}
              width={400}
              height={230}
              loading="lazy"
              sizes="(max-width: 640px) 40vw, 400px"
              className="w-full rounded-[16px] sm:rounded-[40px] md:rounded-[60px] object-cover"
              style={{ height: 'clamp(80px, 16vw, 230px)' }}
            />
            <Image
              src={project.col1img2}
              alt={`${project.name} design screenshot 2`}
              width={400}
              height={340}
              loading="lazy"
              sizes="(max-width: 640px) 40vw, 400px"
              className="w-full rounded-[16px] sm:rounded-[40px] md:rounded-[60px] object-cover"
              style={{ height: 'clamp(100px, 22vw, 340px)' }}
            />
          </div>
          <div className="w-[60%]">
            <Image
              src={project.col2img}
              alt={`${project.name} full preview`}
              width={600}
              height={600}
              loading="lazy"
              sizes="(max-width: 640px) 60vw, 600px"
              className="w-full h-full rounded-[16px] sm:rounded-[40px] md:rounded-[60px] object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[30px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-8 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pb-16 sm:pb-24 md:pb-32"
    >
      <h2 className="hero-heading font-black uppercase text-center leading-none tracking-tight pt-12 sm:pt-20 md:pt-24 mb-6 sm:mb-8 text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[5rem]">
        Project
      </h2>
      <div className="max-w-5xl mx-auto">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            totalCards={projects.length}
          />
        ))}
      </div>
    </section>
  )
}
