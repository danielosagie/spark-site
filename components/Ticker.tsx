import { Fragment } from 'react'
import { BreakingChip } from './BreakingChip'
import { WIRE } from '@/lib/content'

/** The live wire strip. Headlines are real stories from the product. */
export function Ticker() {
  return (
    <div className="ticker">
      <div className="wrap ticker-in">
        <BreakingChip label="BREAKING NOW" />
        {WIRE.map((headline, i) => (
          <Fragment key={headline}>
            {i > 0 && <span className={`sep s${i}`} aria-hidden="true">·</span>}
            <span className={`t${i + 1}`}>{headline}</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
