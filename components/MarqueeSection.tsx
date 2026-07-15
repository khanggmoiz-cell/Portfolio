'use client'

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

const blurDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

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
          <Image
            key={`${src}-${i}`}
            src={src}
            alt="Portfolio project preview"
            width={420}
            height={270}
            loading={i < 2 ? 'eager' : 'lazy'}
            priority={i < 2}
            placeholder="blur"
            blurDataURL={blurDataUrl}
            sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, 420px"
            className="w-[240px] h-[155px] sm:w-[320px] sm:h-[210px] md:w-[420px] md:h-[270px] rounded-xl sm:rounded-2xl object-cover flex-shrink-0"
          />
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
