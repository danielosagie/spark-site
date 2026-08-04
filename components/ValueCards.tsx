'use client'

import { useReveal } from './hooks/useReveal'

/** Reusable 3-up card grid, used for About values and any short list. */
export function ValueCards({ items }: { items: readonly { title: string; body: string }[] }) {
  const [ref, cls] = useReveal<HTMLDivElement>()
  return (
    <div className={`trust3 ${cls}`} ref={ref}>
      {items.map(i => (
        <div className="tcard" key={i.title}>
          <h3>{i.title}</h3>
          <p>{i.body}</p>
        </div>
      ))}
    </div>
  )
}
