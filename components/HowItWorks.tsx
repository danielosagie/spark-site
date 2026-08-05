'use client'

import Image from 'next/image'
import { SURFACES, type Surface } from '@/lib/content'
import { BreakingChip } from './BreakingChip'
import { useReveal } from './hooks/useReveal'

function SurfaceCard({ surface }: { surface: Surface }) {
  const [ref, cls] = useReveal<HTMLElement>()
  return (
    <article className={`card ${cls}`} ref={ref}>
      <div className="shot">
        <div className="device" style={{ top: surface.deviceTop }}>
          <Image
            src={surface.image.src}
            alt={surface.alt}
            fill
            sizes="(max-width: 1000px) 100vw, 400px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      </div>
      <div className="tx">
        <h3>{surface.chip ? <BreakingChip label={surface.title} /> : surface.title}</h3>
        <p>{surface.body}</p>
      </div>
    </article>
  )
}

export function HowItWorks() {
  const [headRef, headCls] = useReveal<HTMLDivElement>()
  return (
    <section className="how" id="how" aria-labelledby="how-title">
      <div className={`h-head ${headCls}`} ref={headRef}>
        <h2 id="how-title">How Spark works</h2>
        <p>Three surfaces, one live picture of your city.</p>
      </div>
      <div className="cards">
        {SURFACES.map(s => <SurfaceCard key={s.title} surface={s} />)}
      </div>
    </section>
  )
}
