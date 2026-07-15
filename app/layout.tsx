import type { Metadata, Viewport } from 'next'
import { Kanit, Sora } from 'next/font/google'
import './globals.css'

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-kanit',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sora',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://codecomes.vercel.app'),
  title: {
    default: 'CodeComs — Web Development, E-commerce & Digital Marketing Agency',
    template: '%s | CodeComs',
  },
  description:
    'CodeComs is a full-service digital agency offering professional web development, e-commerce website design, Google My Business optimization, social media management, and Meta Ads services. We help local businesses dominate online.',
  keywords: [
    'web development services',
    'e-commerce website development',
    'Google My Business optimization',
    'GMB services',
    'social media management services',
    'Meta Ads management',
    'digital marketing agency',
    'web design company',
    'local SEO services',
    'online business growth',
    'website development near me',
    'ecommerce website design',
    'Google Business Profile setup',
    'Facebook Instagram ads management',
    'small business web design',
  ],
  authors: [{ name: 'CodeComs' }],
  creator: 'CodeComs',
  publisher: 'CodeComs',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codecomes.vercel.app',
    siteName: 'CodeComs',
    title: 'CodeComs — Web Development, E-commerce & Digital Marketing Agency',
    description:
      'Professional web development, e-commerce solutions, Google My Business optimization, social media management, and Meta Ads. We help businesses grow online.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CodeComs — Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeComs — Web Development, E-commerce & Digital Marketing',
    description:
      'Professional web development, e-commerce solutions, GMB optimization, social media management, and Meta Ads services.',
    images: ['/og-image.png'],
  },
  icons: { icon: '/favicon.svg' },
  alternates: {
    canonical: 'https://codecomes.vercel.app',
    languages: {
      'en': 'https://codecomes.vercel.app',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CodeComs',
    url: 'https://codecomes.vercel.app',
    logo: 'https://codecomes.vercel.app/logo.png',
    description:
      'CodeComs is a full-service digital agency specializing in web development, e-commerce, Google My Business optimization, social media management, and Meta Ads.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 31.5204,
        longitude: 74.3587,
      },
      geoRadius: '50000',
    },
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Urdu'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development Services',
            description: 'Professional website development for businesses, portfolios, and corporate sites.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-commerce Website Services',
            description: 'Custom e-commerce website design and development for online stores.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Google My Business Optimization',
            description: 'GMB setup, optimization, and local SEO to dominate Google Maps.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Social Media Management',
            description: 'Complete social media management for Facebook, Instagram, and TikTok.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Meta Ads Services',
            description: 'High-ROI Meta advertising campaigns on Facebook and Instagram.',
          },
        },
      ],
    },
  }

  return (
    <html lang="en" className={`${kanit.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${kanit.className} antialiased`}
        style={{ background: '#0C0C0C' }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
