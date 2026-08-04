'use client'

import { useReveal } from './hooks/useReveal'
import { SITE } from '@/lib/content'

function AppleMark() {
  return (
    <svg width="26" height="30" viewBox="0 0 26 30" fill="#fff" aria-hidden="true" focusable="false">
      <path d="M21.3 15.9c0-3 2.4-4.4 2.5-4.5-1.4-2-3.5-2.3-4.2-2.3-1.8-.2-3.5 1-4.4 1-.9 0-2.3-1-3.8-1-2 0-3.8 1.1-4.8 2.9-2 3.5-.5 8.8 1.5 11.7 1 1.4 2.1 3 3.6 2.9 1.4-.1 2-.9 3.7-.9s2.2.9 3.8.9c1.6 0 2.5-1.4 3.5-2.8 1.1-1.6 1.5-3.2 1.6-3.3-.1 0-3-1.2-3-4.6zM18.4 6.4c.8-1 1.3-2.3 1.2-3.7-1.2 0-2.7.8-3.5 1.8-.7.9-1.4 2.3-1.2 3.6 1.3.1 2.7-.7 3.5-1.7z" />
    </svg>
  )
}

function PlayMark() {
  return (
    <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden="true" focusable="false">
      <path d="M2 1.6v24.8c0 .5.3.9.7 1.1L16.4 14 2.7.5A1.2 1.2 0 0 0 2 1.6z" fill="#00D2FF" />
      <path d="M20.8 10.1 17 7.9 2.7.5 16.4 14z" fill="#00F076" />
      <path d="M20.8 17.9 24.4 15.8c.9-.5.9-1.9 0-2.4l-3.6-2.1L16.4 14z" fill="#FFCE00" />
      <path d="M2.7 27.5 17 20.1l3.8-2.2L16.4 14z" fill="#FF3A44" />
    </svg>
  )
}

export function GetApp() {
  const [ref, cls] = useReveal<HTMLDivElement>()
  return (
    <div className="getapp-outer" id="get">
      <div className={`getapp ${cls}`} ref={ref}>
        <h2>Get the app</h2>
        <p>Spark is invite only while we launch in {SITE.city}.</p>
        <div className="badges">
          <a className="badge" href="#" aria-label="Download Spark on the App Store">
            <AppleMark />
            <span>
              <span className="b1">Download on the</span>
              <br />
              <span className="b2">App Store</span>
            </span>
          </a>
          <a className="badge" href="#" aria-label="Get Spark on Google Play">
            <PlayMark />
            <span>
              <span className="b1">GET IT ON</span>
              <br />
              <span className="b2">Google Play</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
