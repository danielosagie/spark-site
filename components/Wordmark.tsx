import Image from 'next/image'
import { IMG } from '@/lib/assets'

/**
 * The Spark lockup: the real bolt mark plus the Poppins wordmark.
 * The mark is a white-alpha PNG, so `brightness(0)` gives the dark variant.
 */
export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="logo">
      <Image
        src={IMG.boltWhite.src}
        width={IMG.boltWhite.width}
        height={IMG.boltWhite.height}
        alt=""
        priority
        style={dark ? { filter: 'brightness(0)' } : undefined}
      />
      <span className="wm">spark</span>
    </span>
  )
}
