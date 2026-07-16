'use client'

import { useState } from 'react'
import Image from 'next/image'

const row1Images = [
  '/images/marquee/space-voyage.png',
  '/images/marquee/codenest.png',
  '/images/marquee/vex-ventures.png',
  '/images/marquee/stellar-ai-v2.png',
  '/images/marquee/asme.png',
  '/images/marquee/transform-data.png',
  '/images/marquee/vitara.png',
  '/images/marquee/terra.png',
  '/images/marquee/skyelite.png',
  '/images/marquee/aethera.png',
  '/images/marquee/designpro.png',
]

const row2Images = [
  '/images/marquee/stellar-ai.png',
  '/images/marquee/xportfolio.png',
  '/images/marquee/orbit-web3.png',
  '/images/marquee/nexora.png',
  '/images/marquee/evr-ventures.png',
  '/images/marquee/planet-orbit.png',
  '/images/marquee/new-era.png',
  '/images/marquee/wealth.png',
  '/images/marquee/luminex.png',
  '/images/marquee/celestia.png',
]

function BlurImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl flex-shrink-0 w-[240px] h-[155px] sm:w-[320px] sm:h-[210px] md:w-[420px] md:h-[270px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, 420px"
        className={`object-cover transition-all duration-700 ease-out ${
          loaded ? 'blur-0 opacity-100 scale-100' : 'blur-xl opacity-50 scale-105'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

function MarqueRow({
  images,
  direction,
}: {
  images: string[]
  direction: 'left' | 'right'
}) {
  const doubled = [...images, ...images]

  return (
    <div className="flex overflow-hidden">
      <div
        className="flex gap-3"
        style={{
          animation: `scroll-${direction} 30s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((src, i) => (
          <BlurImage key={`${src}-${i}`} src={src} alt="Portfolio project preview" />
        ))}
      </div>
    </div>
  )
}

export default function MarqueeSection() {
  return (
    <section className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-x-clip">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div className="flex flex-col gap-3">
        <MarqueRow images={row1Images} direction="left" />
        <MarqueRow images={row2Images} direction="right" />
      </div>
    </section>
  )
}
