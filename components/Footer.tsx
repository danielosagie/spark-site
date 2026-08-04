import Link from 'next/link'
import { Wordmark } from './Wordmark'
import { FOOTER_COLUMNS, SOCIALS, SITE } from '@/lib/content'

export function Footer() {
  return (
    <footer>
      <div className="fcols">
        <div className="fbrand">
          <Wordmark />
          <p>A live local news network, launching in {SITE.city}.</p>
        </div>
        {FOOTER_COLUMNS.map(col => (
          <div className="fcol" key={col.heading}>
            <h2>{col.heading}</h2>
            {col.links.map(l => <Link key={l.label + l.href} href={l.href}>{l.label}</Link>)}
          </div>
        ))}
      </div>
      <div className="frule" />
      <div className="fbot">
        <span>© 2026 {SITE.parent}</span>
        <span className="sp" />
        <span className="social">
          {SOCIALS.map(s => (
            <a key={s} href="#" aria-label={`Spark on ${s}`}>{s}</a>
          ))}
        </span>
      </div>
    </footer>
  )
}
