'use client'

import Image from 'next/image'
import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'

const BLUR_PLACEHOLDER = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-16 sm:py-20 bg-[#0C0C0C]"
    >
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[4%] w-[100px] sm:w-[120px] md:w-[160px] lg:w-[210px]"
      >
        <Image
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Moon icon decoration"
          width={210}
          height={210}
          loading="lazy"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          sizes="(max-width: 1024px) 160px, 210px"
          className="w-full h-auto"
        />
      </FadeIn>
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[10%] w-[90px] sm:w-[110px] md:w-[140px] lg:w-[180px]"
      >
        <Image
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D geometric object decoration"
          width={180}
          height={180}
          loading="lazy"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          sizes="(max-width: 1024px) 140px, 180px"
          className="w-full h-auto"
        />
      </FadeIn>
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[4%] w-[100px] sm:w-[120px] md:w-[160px] lg:w-[210px]"
      >
        <Image
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Lego icon decoration"
          width={210}
          height={210}
          loading="lazy"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          sizes="(max-width: 1024px) 160px, 210px"
          className="w-full h-auto"
        />
      </FadeIn>
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[10%] w-[110px] sm:w-[130px] md:w-[170px] lg:w-[220px]"
      >
        <Image
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D group decoration"
          width={220}
          height={220}
          loading="lazy"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          sizes="(max-width: 1024px) 170px, 220px"
          className="w-full h-auto"
        />
      </FadeIn>

      <div className="flex flex-col items-center gap-8 sm:gap-10 md:gap-16 z-10 w-full">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6rem]">
            About CodeComs
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-10 sm:gap-12 md:gap-24">
          <AnimatedText
            text="CodeComs is a full-service digital agency dedicated to helping local businesses thrive online. We specialize in building high-converting websites, custom e-commerce stores, and data-driven digital marketing strategies. Our team combines web development expertise with advanced SEO, Google My Business optimization, social media management, and Meta Ads to deliver measurable results. From restaurants and mechanics to entrepreneurs and retail stores, we provide end-to-end digital transformation — including website design, local search optimization, Facebook and Instagram advertising, and Google Maps ranking strategies. Our approach is simple: we build, we optimize, and we grow your business so you get noticed, booked, and paid."
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[90vw] sm:max-w-[600px] md:max-w-[700px] text-sm sm:text-base md:text-lg"
          />
          <FadeIn delay={0.3}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
