import Image from 'next/image'
import type { MediaSlot } from '@/lib/media'

/**
 * Renders a media slot. Shows the poster until footage exists, then an inline
 * muted loop. The aspect ratio comes from the slot, so swapping one for the
 * other never moves the page.
 *
 * Muted + playsInline + autoPlay is the only combination iOS will play inline.
 */
export function Media({
  slot, className = '', sizes = '100vw', priority = false,
}: { slot: MediaSlot; className?: string; sizes?: string; priority?: boolean }) {
  const style = { aspectRatio: slot.ratio.replace('/', ' / ') }

  if (slot.src) {
    return (
      <div className={`media ${className}`} style={style}>
        <video
          poster={slot.poster.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={slot.alt}
        >
          <source src={slot.src} type="video/mp4" />
          {/* Shown if the browser cannot play the source at all. */}
          <img src={slot.poster.src} alt={slot.alt} />
        </video>
      </div>
    )
  }

  return (
    <div className={`media ${className}`} style={style}>
      <Image
        src={slot.poster.src}
        alt={slot.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}
