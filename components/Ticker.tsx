import Image from 'next/image'
import { Fragment } from 'react'
import { IMG } from '@/lib/assets'
import { WIRE } from '@/lib/content'

/** The live wire strip. Headlines are real stories from the product. */
export function Ticker() {
  return (
    <div className="ticker">
      <div className="wrap ticker-in">
        <Image
          className="mark"
          src={IMG.wordmarkWhite.src}
          width={IMG.wordmarkWhite.width}
          height={IMG.wordmarkWhite.height}
          alt="Spark"
          priority
        />
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
