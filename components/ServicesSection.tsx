'use client'

import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

const services = [
  {
    num: '01',
    name: 'Web Development Services',
    desc: 'Professional website development services — custom business websites, landing pages, and corporate sites built with clean code, fast performance, and mobile-first design to convert visitors into customers.',
  },
  {
    num: '02',
    name: 'E-commerce Website Services',
    desc: 'Complete e-commerce website design and development — online stores with secure payment integration, inventory management, and optimized product pages that drive sales 24/7.',
  },
  {
    num: '03',
    name: 'Google My Business Optimization',
    desc: 'Google My Business (GMB) setup, optimization, and local SEO strategies to help your business rank #1 on Google Maps and dominate "near me" searches in your area.',
  },
  {
    num: '04',
    name: 'Social Media Management',
    desc: 'Complete social media management services for Facebook, Instagram, and TikTok — content creation, scheduling, community management, and growth strategies that build your brand.',
  },
  {
    num: '05',
    name: 'Meta Ads Services',
    desc: 'High-ROI Meta advertising campaigns on Facebook and Instagram — audience targeting, ad creative, A/B testing, and conversion optimization to maximize your ad spend.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-[#FFFFFF] rounded-t-[30px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32"
    >
      <FadeIn delay={0.1}>
        <h2 className="text-[#0C0C0C] font-black uppercase text-center mb-10 sm:mb-20 md:mb-28 text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[5rem]">
          Our Services
        </h2>
      </FadeIn>
      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn key={service.num} delay={i * 0.12} y={40} duration={0.8}>
            <motion.div
              className="flex items-start gap-3 sm:gap-6 py-6 sm:py-10 md:py-12 cursor-default rounded-xl"
              style={{
                borderBottom:
                  i < services.length - 1
                    ? '1px solid rgba(12, 12, 12, 0.15)'
                    : 'none',
              }}
              whileHover={{ x: 16, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <motion.span
                className="text-[#0C0C0C] font-black flex-shrink-0 leading-none text-[7vw] sm:text-[6vw] md:text-[5vw] lg:text-[5rem]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 + 0.1 }}
              >
                {service.num}
              </motion.span>
              <div className="flex flex-col pt-1 sm:pt-3 md:pt-4">
                <h3 className="text-[#0C0C0C] font-medium uppercase leading-none text-sm sm:text-base md:text-xl lg:text-2xl">
                  {service.name}
                </h3>
                <p className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl opacity-70 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
