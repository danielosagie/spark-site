import Image from 'next/image'
import Link from 'next/link'
import { Bolt } from './Bolt'
import { IMG } from '@/lib/assets'
import { SITE } from '@/lib/content'

/**
 * The stage is a fixed 1600 wide box centred in the viewport. The design places the
 * bolt and the phone at absolute offsets relative to each other, so they have to
 * share one coordinate system. Positioning them against the viewport instead lets
 * the bolt drift right of the phone on wide screens, which is what happened before.
 */
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-stage">
        <Bolt />
        <div className="hero-copy">
          <h1>{SITE.tagline}</h1>
          <p>{SITE.description}</p>
          <div className="hero-cta">
            <Link className="btn-l" href="#get">Sign up free</Link>
            <Link className="btn-l ghost" href="#get">Get the app</Link>
          </div>
        </div>
        <div className="hero-phone">
          <Image
            src={IMG.heroPhone.src}
            alt="The Spark feed on iPhone with a breaking badge on a live local post"
            fill
            sizes="(max-width: 900px) 78vw, 380px"
            priority
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      </div>
    </section>
  )
}
