import Image from 'next/image'
import { IMG } from '@/lib/assets'

/**
 * The Spark wordmark. Vector, so it stays crisp at any size.
 * The file is white, so the dark variant is a filter rather than a second asset.
 */
export function Wordmark({ dark = false, height = 32 }: { dark?: boolean; height?: number }) {
  const w = Math.round((IMG.wordmark.width / IMG.wordmark.height) * height)
  return (
    <Image
      className="wordmark"
      src={IMG.wordmark.src}
      width={w}
      height={height}
      alt="Spark"
      priority
      style={dark ? { filter: 'brightness(0)' } : undefined}
    />
  )
}
