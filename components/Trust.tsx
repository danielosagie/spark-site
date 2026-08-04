'use client'

import { TRUST } from '@/lib/content'
import { useReveal } from './hooks/useReveal'

/** Launch collateral: the accountability surfaces that ship with the product. */
export function Trust() {
  const [ref, cls] = useReveal<HTMLDivElement>()
  return (
    <section className="trust" id="trust" aria-labelledby="trust-title">
      <div className={`trust-in ${cls}`} ref={ref}>
        <div className="h-head">
          <h2 id="trust-title">Fast is only worth it if it is true</h2>
          <p>Speed and accountability are the same product decision here.</p>
        </div>
        <div className="trust3">
          {TRUST.map(t => (
            <div className="tcard" key={t.title}>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
