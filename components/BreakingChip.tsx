import Image from 'next/image'
import { IMG } from '@/lib/assets'

/** The real badge asset, used where the label is exactly BREAKING NOW. */
export function BreakingBadge({ height = 28 }: { height?: number }) {
  const w = Math.round((IMG.breakingBadge.width / IMG.breakingBadge.height) * height)
  return (
    <Image
      className="breaking-badge"
      src={IMG.breakingBadge.src}
      width={w}
      height={height}
      alt="Breaking now"
      priority
    />
  )
}

/** CSS chip for other labels, matched to the badge's red and radius. */
export function BreakingChip({ label = 'BREAKING' }: { label?: string }) {
  return (
    <span className="breaking">
      <svg width="9" height="12" viewBox="0 0 24 30" aria-hidden="true" focusable="false">
        <path d="M14 1.5 3.5 16.5H10L7.5 28.5 20.5 12H14z" fill="currentColor" />
      </svg>
      {label}
    </span>
  )
}
