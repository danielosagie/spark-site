/**
 * MEDIA SLOTS
 *
 * Every place on the site that can hold a photo or a piece of footage.
 * A slot always ships with a `poster` still so the page is complete before any
 * video exists. When stock footage lands, drop the file in `public/media/` and
 * set `src` — nothing else needs to change, and the layout will not shift
 * because the aspect ratio is fixed here.
 *
 * Encoding for `src`: H.264 MP4, no audio track, <= 8s, <= 2 MB, and matching
 * the slot's aspect ratio. Muted autoplay loops are the only thing that plays
 * inline on iOS, so audio is pointless weight.
 */
import { IMG, type Asset } from './assets'

export type MediaSlot = {
  /** Stable id, used as the key when handing footage over. */
  id: string
  /** Where it appears, for whoever is sourcing the footage. */
  where: string
  /** Still frame. Always present, doubles as the video poster. */
  poster: Asset
  /** Path under /media once footage exists. Undefined renders the poster alone. */
  src?: string
  alt: string
  /** Locked so swapping media can never shift the page. */
  ratio: `${number}/${number}`
}

export const MEDIA: Record<string, MediaSlot> = {
  audience: {
    id: 'audience',
    where: 'Home, Who it is for, right-hand panel',
    poster: { src: '/assets/street_poster.webp', width: 403, height: 717 },
    // src: '/media/audience.mp4',
    alt: 'A cyclist riding past a mural on a neighbourhood street',
    ratio: '403/717',
  },
  posting: {
    id: 'posting',
    where: 'Features, Short-form text and video',
    poster: IMG.videoStill,
    // src: '/media/posting.mp4',
    alt: 'A video post in the Spark feed showing a live local incident',
    ratio: '489/290',
  },
}
