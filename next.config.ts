import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'shrug-person-78902957.figma.site' },
      { protocol: 'https', hostname: 'images.higgs.ai' },
      { protocol: 'https', hostname: 'motionsites.ai' },
    ],
  },
}

export default nextConfig
