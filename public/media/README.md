# Media

Three audience clips, one per accordion tab on the home page. The panel swaps with the open tab.

| file | tab | source |
|---|---|---|
| `neighbors.mp4` | Neighbors | 4320x7680, 198 MB |
| `creators.mp4` | Creators | 1080x1920, 6.9 MB |
| `newsrooms.mp4` | Newsroom | 2160x4096, 37 MB |

All three were transcoded to **720x1280 H.264, no audio, 8s, `+faststart`**, which took the set
from 242 MB to 3.5 MB. Shipping the originals would have been unusable on mobile.

To replace one: keep the name, re-encode with

```
ffmpeg -i in.mp4 -t 8 -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280" \
  -an -c:v libx264 -profile:v main -pix_fmt yuv420p -crf 28 -preset slow -movflags +faststart out.mp4
```

and regenerate the poster:

```
ffmpeg -ss 1 -i in.mp4 -frames:v 1 -vf "scale=403:717:force_original_aspect_ratio=increase,crop=403:717" poster.png
```
