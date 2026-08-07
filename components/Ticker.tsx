import { Fragment } from 'react'
import { BreakingBadge } from './BreakingChip'
import { WIRE } from '@/lib/content'

/**
 * Live wire marquee. The headline track is duplicated so the loop is seamless:
 * the animation translates by exactly one copy's width and restarts, and the
 * second copy has already taken its place. aria-hidden on the duplicate keeps
 * screen readers from reading everything twice.
 */
function Track({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="ticker-track" aria-hidden={duplicate || undefined}>
      {WIRE.map((headline, i) => (
        <Fragment key={headline}>
          {i > 0 && <span className="sep" aria-hidden="true">·</span>}
          <span>{headline}</span>
        </Fragment>
      ))}
      <span className="sep" aria-hidden="true">·</span>
    </div>
  )
}

export function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-in">
        <div className="ticker-badge"><BreakingBadge /></div>
        <div className="ticker-marquee">
          <Track />
          <Track duplicate />
        </div>
      </div>
    </div>
  )
}
