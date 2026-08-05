'use client'

import Image from 'next/image'
import type { Feature } from '@/lib/content'
import { useReveal } from './hooks/useReveal'

/**
 * Reusable feature block. Alternates side by index so a list of features
 * reads as a rhythm rather than a stack. Art is either a device (portrait
 * phone in a frame) or a panel (wide product screen).
 */
export function FeatureRow({ feature, flip = false }: { feature: Feature; flip?: boolean }) {
  const [ref, cls] = useReveal<HTMLElement>()
  return (
    <section
      className={`frow ${flip ? 'flip' : ''} ${cls}`}
      ref={ref}
      id={feature.id}
      aria-labelledby={`${feature.id}-title`}
    >
      <div className="frow-copy">
        <p className="kick">{feature.eyebrow}</p>
        <h2 id={`${feature.id}-title`}>{feature.title}</h2>
        <p className="frow-body">{feature.body}</p>
        <ul className="frow-list">
          {feature.points.map(p => <li key={p}>{p}</li>)}
        </ul>
      </div>
      <div className={`frow-art ${feature.shape}`}>
        {feature.shape === 'device' ? (
          <div className="frow-device">
            <Image
              src={feature.image.src}
              alt={feature.alt}
              fill
              sizes="(max-width: 900px) 70vw, 320px"
              style={{ objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        ) : (
          <Image
            src={feature.image.src}
            width={feature.image.width}
            height={feature.image.height}
            alt={feature.alt}
            sizes="(max-width: 900px) 90vw, 620px"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
    </section>
  )
}
