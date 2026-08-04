import type { Metadata, Viewport } from 'next'
import { Poppins, Inter, Lexend } from 'next/font/google'
import { Ticker } from '@/components/Ticker'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { SITE } from '@/lib/content'
import './globals.css'

// Self-hosted by next/font: no external request, no layout shift.
const poppins = Poppins({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-poppins', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const lexend = Lexend({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-lexend', display: 'swap' })

export const metadata: Metadata = {
  // Derived from Vercel at build time so og/twitter image URLs are always absolute
  // and always point at the deployment actually serving them.
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3210',
  ),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: '/assets/og.webp', width: 1200, height: 630, alt: 'Spark, a live local news network' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ['/assets/og.webp'],
  },
}

export const viewport: Viewport = { themeColor: '#7A26E6' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`js ${poppins.variable} ${inter.variable} ${lexend.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Ticker />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
