/**
 * Every image with its intrinsic size, so next/image always gets correct dimensions
 * and never causes layout shift. All art is a real Spark product screen.
 */
export type Asset = { src: string; width: number; height: number }

const a = (file: string, width: number, height: number): Asset => ({
  src: `/assets/${file}`,
  width,
  height,
})

export const IMG = {
  wordmarkWhite: a('spark_wordmark_white.png', 385, 137),
  boltWhite: a('spark_bolt_white.png', 104, 137),
  og: a('og.webp', 1200, 630),
  feedPhone: a('breaking_phone.webp', 300, 652),
  digestPhone: a('digest_phone.webp', 430, 934),
  mapPhone: a('map_phone.webp', 268, 584),
  searchWeb: a('search_web.webp', 596, 476),
  videoStill: a('video_still.webp', 489, 290),
} as const
