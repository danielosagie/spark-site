# Media slots

Drop footage here and switch the matching slot on in `lib/media.ts` by setting `src`.

| file | slot | ratio | used on |
|---|---|---|---|
| `audience.mp4` | `audience` | 403:717 (portrait) | Home, "Who it is for" |
| `posting.mp4` | `posting` | 489:290 (landscape) | Features, "Short-form text and video" |

Encode as H.264 MP4, **no audio track**, <= 8 seconds, <= 2 MB, matching the ratio above.
Muted autoplay is the only thing that plays inline on iOS, so an audio track is dead weight.
Each slot keeps its poster still, so the page is complete before any footage exists and
swapping one in cannot shift the layout.
