'use client'

import Link from 'next/link'
import { Wordmark } from './Wordmark'
import { useStuckNav } from './hooks/useStuckNav'
import { NAV_LINKS } from '@/lib/content'

export function Nav() {
  const stuck = useStuckNav()
  return (
    <header className={`nav${stuck ? ' stuck' : ''}`}>
      <div className="wrap nav-in">
        <Link href="/" aria-label="Spark home">
          <Wordmark dark />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
        <span className="nav-spacer" />
        <div className="nav-right">
          <Link className="signin" href="/#get">Sign in</Link>
          <Link className="pill" href="/#get">Get Spark</Link>
        </div>
      </div>
    </header>
  )
}
