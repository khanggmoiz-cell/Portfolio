'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

export default function BlurImage({
  className = '',
  style = {},
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative overflow-hidden" style={{ borderRadius: style.borderRadius }}>
      <Image
        {...props}
        className={className}
        style={{
          ...style,
          filter: loaded ? 'blur(0px)' : 'blur(12px)',
          opacity: loaded ? 1 : 0.6,
          transform: loaded ? 'scale(1)' : 'scale(1.05)',
          transition: 'filter 0.5s ease, opacity 0.5s ease, transform 0.5s ease',
        }}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      )}
    </div>
  )
}
