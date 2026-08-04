'use client'

import type { ReactNode } from 'react'
import { useReveal } from './hooks/useReveal'

/** Centred section heading used across Features and About. */
export function SectionHeader({
  eyebrow, title, sub, id,
}: { eyebrow?: string; title: ReactNode; sub?: ReactNode; id?: string }) {
  const [ref, cls] = useReveal<HTMLDivElement>()
  return (
    <div className={`h-head ${cls}`} ref={ref}>
      {eyebrow && <p className="kick">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  )
}
