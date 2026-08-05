'use client'

import Image from 'next/image'
import { useReveal } from './hooks/useReveal'
import { SITE } from '@/lib/content'

/** Official store badges, exported from the design file. */
const BADGES = [
  { src: '/assets/badge_google_play.png', w: 215, h: 64, alt: 'Get it on Google Play' },
  { src: '/assets/badge_app_store.png', w: 191, h: 64, alt: 'Download on the App Store' },
] as const

export function GetApp() {
  const [ref, cls] = useReveal<HTMLDivElement>()
  return (
    <div className="getapp-outer" id="get">
      <div className={`getapp ${cls}`} ref={ref}>
        <h2>Get the app</h2>
        <p>Spark is invite only while we launch in {SITE.city}.</p>
        <div className="badges">
          {BADGES.map(b => (
            <a className="badge-link" href="#" key={b.src} aria-label={b.alt}>
              <Image src={b.src} width={b.w} height={b.h} alt={b.alt} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
