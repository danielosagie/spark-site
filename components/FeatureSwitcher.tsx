'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SWITCH_STEPS } from '@/lib/content'
import { BreakingChip } from './BreakingChip'
import { useReveal } from './hooks/useReveal'

/**
 * Phone on the left, steps on the right. The phone follows whichever step is
 * active so the screen and the copy always agree.
 *
 * Active step is driven by scroll on desktop (the phone is sticky, the steps
 * scroll past it) and by tapping on narrow screens, where the sticky column
 * would leave nothing to scroll against.
 */
export function FeatureSwitcher() {
  const [active, setActive] = useState(0)
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [headRef, headCls] = useReveal<HTMLDivElement>()

  useEffect(() => {
    if (window.matchMedia('(max-width: 1000px)').matches) return
    const io = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const i = stepRefs.current.indexOf(visible.target as HTMLButtonElement)
        if (i >= 0) setActive(i)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.5, 1] },
    )
    stepRefs.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const step = SWITCH_STEPS[active]

  return (
    <section className="how" id="how" aria-labelledby="how-title">
      <div className={`h-head ${headCls}`} ref={headRef}>
        <h2 id="how-title">How Spark works</h2>
        <p>Three surfaces, one live picture of your city.</p>
      </div>

      <div className="switch">
        <div className="switch-art">
          <div className="switch-phone">
            {SWITCH_STEPS.map((s, i) => (
              <Image
                key={s.id}
                src={s.image.src}
                alt={i === active ? s.alt : ''}
                aria-hidden={i !== active}
                fill
                sizes="(max-width: 1000px) 92vw, 460px"
                priority={i === 0}
                className={i === active ? 'on' : ''}
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            ))}
          </div>
        </div>

        <ol className="switch-steps">
          {SWITCH_STEPS.map((s, i) => (
            <li key={s.id}>
              <button
                ref={el => { stepRefs.current[i] = el }}
                className="switch-step"
                data-active={i === active}
                aria-current={i === active}
                onClick={() => setActive(i)}
              >
                <span className="switch-step-title">
                  {s.chip ? <BreakingChip label={s.title} /> : s.title}
                </span>
                <span className="switch-step-body">{s.body}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
