'use client'

import { useId, useState } from 'react'
import { AUDIENCES } from '@/lib/content'
import { AUDIENCE_MEDIA } from '@/lib/media'
import { Media } from './Media'
import { useReveal } from './hooks/useReveal'

function Chevron() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M18.22 14.78a.75.75 0 0 0 1.06-1.06l-6.5-6.5a.75.75 0 0 0-1.06 0l-6.5 6.5a.75.75 0 1 0 1.06 1.06L12 8.81z"
        fill="#525252"
      />
    </svg>
  )
}

export function WhoItIsFor() {
  // Single-open accordion. The footage panel follows whichever tab is open.
  const [open, setOpen] = useState(0)
  const uid = useId()
  const [titleRef, titleCls] = useReveal<HTMLHeadingElement>()
  const [rowRef, rowCls] = useReveal<HTMLDivElement>()

  const current = AUDIENCES[open] ?? AUDIENCES[0]
  const slot = AUDIENCE_MEDIA[current.id]

  return (
    <section className="who" id="who" aria-labelledby="who-title">
      <h2 id="who-title" className={titleCls} ref={titleRef}>Who it is for</h2>
      <div className={`who-row ${rowCls}`} ref={rowRef}>
        <div className="acc">
          {AUDIENCES.map((a, i) => {
            const isOpen = open === i
            const panelId = `${uid}-panel-${i}`
            const btnId = `${uid}-btn-${i}`
            return (
              <div key={a.id} className="acc-item" data-open={isOpen} style={{ background: a.background }}>
                <div className="inner">
                  <button
                    id={btnId}
                    className="acc-head"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(i)}
                  >
                    <h3>{a.title}</h3>
                    <Chevron />
                  </button>
                  <div id={panelId} role="region" aria-labelledby={btnId}>
                    <p>{a.body}</p>
                    <ul>{a.points.map(p => <li key={p}>{p}</li>)}</ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {slot && <Media slot={slot} className="who-art" sizes="(max-width: 1000px) 92vw, 403px" />}
      </div>
    </section>
  )
}
