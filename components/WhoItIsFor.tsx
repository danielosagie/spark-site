'use client'

import Image from 'next/image'
import { useId, useState } from 'react'
import { AUDIENCES } from '@/lib/content'
import { IMG } from '@/lib/assets'
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
  // Single-open accordion. The design ships with the first item expanded.
  const [open, setOpen] = useState(0)
  const uid = useId()
  const [titleRef, titleCls] = useReveal<HTMLHeadingElement>()
  const [rowRef, rowCls] = useReveal<HTMLDivElement>()

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
              <div key={a.title} className="acc-item" data-open={isOpen} style={{ background: a.background }}>
                <div className="inner">
                  <button
                    id={btnId}
                    className="acc-head"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
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
        <div className="who-art">
          <Image
            src={IMG.digestPhone.src}
            alt="A Morning Digest brief open on iPhone"
            fill
            sizes="(max-width: 1000px) 100vw, 403px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      </div>
    </section>
  )
}
