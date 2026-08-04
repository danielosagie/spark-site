import type { Metadata } from 'next'
import Link from 'next/link'
import { ValueCards } from '@/components/ValueCards'
import { SectionHeader } from '@/components/SectionHeader'
import { Closing } from '@/components/Closing'
import { ABOUT, SITE } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About',
  description: ABOUT.lede,
  openGraph: { title: 'About Spark', description: ABOUT.lede },
}

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kick">About</p>
          <h1>{ABOUT.lede}</h1>
        </div>
      </section>

      <section className="prose-wrap" aria-labelledby="story-title">
        <div className="wrap prose">
          <h2 id="story-title" className="sr-only">Our story</h2>
          {ABOUT.story.map(p => <p key={p.slice(0, 32)}>{p}</p>)}
        </div>
      </section>

      <section className="who-for" aria-labelledby="community-title">
        <div className="wrap">
          <SectionHeader title={ABOUT.community.title} sub={ABOUT.community.body} id="community-title" />
        </div>
      </section>

      <section className="values" aria-labelledby="values-title">
        <div className="wrap">
          <SectionHeader eyebrow="How we work" title="What we hold to" id="values-title" />
          <ValueCards items={ABOUT.values} />
        </div>
      </section>

      <section className="split" id="press" aria-labelledby="fanbase-title">
        <div className="wrap split-in">
          <div className="split-col">
            <h2 id="fanbase-title">{ABOUT.fanbase.title}</h2>
            <p>{ABOUT.fanbase.body}</p>
          </div>
          <div className="split-col">
            <h2>{ABOUT.press.title}</h2>
            <p>{ABOUT.press.body}</p>
            <p>
              <a className="inline-link" href={`mailto:${ABOUT.press.contact}`}>
                {ABOUT.press.contact}
              </a>
            </p>
            <p>
              <Link className="inline-link" href="/features">See what {SITE.name} does</Link>
            </p>
          </div>
        </div>
      </section>

      <Closing title="It all starts with a spark." sub={`Live in ${SITE.city} now. Invite only while we grow.`} />
    </>
  )
}
