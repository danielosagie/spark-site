/**
 * MEDIA SLOTS
 *
 * Footage that plays inline. Every slot ships a poster still so the page is
 * complete before a video loads, and the aspect ratio is locked per slot so
 * swapping media can never shift the layout.
 *
 * All three audience clips are 9:16 portrait, transcoded to 720x1280 H.264 with
 * no audio track. Muted autoplay is the only thing that plays inline on iOS, so
 * audio would be dead weight.
 */
export type MediaSlot = {
  id: string
  where: string
  poster: string
  src?: string
  alt: string
  /** Locked so swapping media cannot shift the page. */
  ratio: `${number}/${number}`
}

const clip = (id: string, alt: string, where: string): MediaSlot => ({
  id,
  where,
  poster: `/media/${id}_poster.webp`,
  src: `/media/${id}.mp4`,
  alt,
  ratio: '9/16',
})

/** Keyed by audience id so the panel swaps with the open accordion item. */
export const AUDIENCE_MEDIA: Record<string, MediaSlot> = {
  neighbors: clip('neighbors', 'A neighbourhood street in daily use', 'Home, Who it is for'),
  creators: clip('creators', 'A creator filming on location', 'Home, Who it is for'),
  newsrooms: clip('newsrooms', 'A reporter covering a story in the field', 'Home, Who it is for'),
}
