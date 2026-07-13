import type { Metadata, Viewport } from 'next'
import { Kanit, Playfair_Display } from 'next/font/google'
import './globals.css'

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-kanit',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-playfair',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://abdulmoiz.com'),
  title: {
    default: 'Abdul Moiz — Web Designer & Developer',
    template: '%s | Abdul Moiz',
  },
  description:
    'Abdul Moiz — Web Designer, Developer & Digital Growth Strategist. I build high-converting websites, e-commerce stores, and run Meta Ad campaigns for local businesses in Lahore, Pakistan.',
  keywords: [
    'web designer lahore',
    'web developer pakistan',
    'digital marketing lahore',
    'SEO services pakistan',
    'Meta Ads management',
    'e-commerce website development',
    'UI UX designer',
    'Google Business Profile optimization',
    'social media management',
  ],
  authors: [{ name: 'Abdul Moiz' }],
  creator: 'Abdul Moiz',
  publisher: 'Abdul Moiz',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abdulmoiz.com',
    siteName: 'Abdul Moiz Portfolio',
    title: 'Abdul Moiz — Web Designer & Developer',
    description:
      'Web Designer, Developer & Digital Growth Strategist. I build high-converting websites, e-commerce stores, and run Meta Ad campaigns for local businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Moiz — Web Designer & Developer',
    description:
      'Web Designer, Developer & Digital Growth Strategist. I build high-converting websites, e-commerce stores, and run Meta Ad campaigns for local businesses.',
  },
  icons: { icon: '/favicon.svg' },
  alternates: {
    canonical: 'https://abdulmoiz.com',
    languages: {
      'en': 'https://abdulmoiz.com',
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
    '@type': 'Person',
    name: 'Abdul Moiz',
    jobTitle: 'Web Designer, Developer & Digital Growth Strategist',
    url: 'https://abdulmoiz.com',
    email: 'khanggmoiz@gmail.com',
    telephone: '+923213258386',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    sameAs: [],
    knowsAbout: [
      'Web Design',
      'Web Development',
      'UI/UX Design',
      'SEO',
      'Local SEO',
      'Digital Marketing',
      'Meta Ads',
      'Social Media Management',
      'E-commerce',
    ],
  }

  return (
    <html lang="en" className={`${kanit.variable} ${playfair.variable}`}>
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
