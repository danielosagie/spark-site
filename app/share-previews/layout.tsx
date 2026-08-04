import type { Metadata } from 'next'
import './unfurl.css'

export const metadata: Metadata = {
  title: 'Share previews',
  description: 'How a Spark link unfurls in iMessage, X, and Slack.',
}

/** Standalone design doc: no site chrome, its own stylesheet. */
export default function ShareLayout({ children }: { children: React.ReactNode }) {
  return <div className="unfurl-page">{children}</div>
}
