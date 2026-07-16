'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

export default function BlurImage(props: ImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      {...props}
      className={`${props.className || ''} transition-all duration-700 ease-out ${
        loaded ? 'blur-0 opacity-100' : 'blur-xl opacity-50'
      }`}
      onLoad={() => setLoaded(true)}
    />
  )
}
