/**
 * Every image with its intrinsic size, so next/image always gets correct dimensions
 * and never causes layout shift.
 *
 * Rasters here are real product screens, exported at 2x their largest rendered size.
 * Marks and badges are SVG where we have it, because they need to stay crisp at any
 * size and recolour from CSS.
 */
export type Asset = { src: string; width: number; height: number }

const a = (file: string, width: number, height: number): Asset => ({
  src: `/assets/${file}`,
  width,
  height,
})

export const IMG = {
  /** Vector. Recoloured with a filter for the light nav. */
  wordmark: a('spark_wordmark_white.svg', 90, 32),
  boltMark: a('spark_bolt_white.png', 71, 93),
  breakingBadge: a('breakingbadge.png', 435, 96),

  /** Card compositions: phone plus its surround, sized for the 453x534 card slot. */
  cardFeed: a('feed.webp', 906, 1067),
  cardBreaking: a('breaking.webp', 906, 1067),
  cardMap: a('map.webp', 906, 1068),

  /** Full-bleed phone screens. */
  heroPhone: a('hero_phone.webp', 880, 1912),
  digest: a('digest.webp', 880, 1912),
  profile: a('profile.webp', 880, 1912),

  storeGooglePlay: a('badge_google_play.png', 215, 64),
  storeAppStore: a('badge_app_store.png', 191, 64),

  og: a('og.webp', 1200, 630),
} as const
