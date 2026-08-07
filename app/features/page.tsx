import type { Metadata } from 'next'
import { FeatureRow } from '@/components/FeatureRow'
import { SectionHeader } from '@/components/SectionHeader'
import { GetApp } from '@/components/GetApp'
import { Closing } from '@/components/Closing'
import { FEATURES, REFERRAL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Two feeds, short-form text and video, topics you can follow to the end, profiles that tell you who is reporting, and search that reads the live world.',
  openGraph: {
    title: 'Spark features',
    description:
      'Two feeds, short-form text and video, topics you can follow to the end, profiles that tell you who is reporting, and search that reads the live world.',
  },
}

export default function FeaturesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kick">Features</p>
          <h1>Everything Spark does, and why it is there.</h1>
          <p className="lead">
            Spark is built around one job: to tell you the stories that matter most to you,
            directly from the people who are in it, with enough context to know what you are
            reading.
          </p>
        </div>
      </section>

      <div className="frows">
        {FEATURES.map((f, i) => (
          <FeatureRow key={f.id} feature={f} flip={i % 2 === 1} />
        ))}
      </div>

      <section className="referral" id="referral" aria-labelledby="referral-title">
        <div className="wrap">
          <SectionHeader
            eyebrow={REFERRAL.eyebrow}
            title={REFERRAL.title}
            sub={REFERRAL.body}
            id="referral-title"
          />
          <ul className="pointlist">
            {REFERRAL.points.map(p => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>

      <GetApp />
      <Closing title="Know first." sub="Live in Atlanta now. Invite only while we grow." />
    </>
  )
}
