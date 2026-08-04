import Image from 'next/image'
import Link from 'next/link'
import { Bolt } from './Bolt'
import { IMG } from '@/lib/assets'
import { SITE } from '@/lib/content'

export function Hero() {
  return (
    <section className="hero">
      <Bolt />
      <div className="hero-copy">
        <h1>{SITE.tagline}</h1>
        <p>{SITE.description}</p>
      </div>
      <div className="hero-cta">
        <Link className="btn-l" href="#get">Sign up free</Link>
        <Link className="btn-l ghost" href="#get">Get the app</Link>
      </div>
      <div className="hero-phone">
        <Image
          src={IMG.feedPhone.src}
          alt="The Spark feed on iPhone with a breaking badge on a live local post"
          fill
          sizes="380px"
          priority
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>
    </section>
  )
}
