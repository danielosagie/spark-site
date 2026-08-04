# Spark OpenGraph / share cards — V1 layout system

Spec for the renderer and for the Figma build. Every number is either derived from a stated
constraint or measured. Where something is unmeasured it says so.

---

## 0. Status

| Item | State |
|---|---|
| Spec (this document) | Done |
| Contrast ratios | Measured (WCAG, section 5) |
| Type ramp, Inter | **Measured** against the local Inter variable font, section 4 |
| Type sizing, Poppins | Specified as fit-to-box, so exact metrics are not on the critical path |
| Safe zones, grid, crop, fallback, privacy, alt text, copy tokens, assets | Done |
| Figma components and variants | **Blocked** — Figma MCP daily quota (200 calls/day, Full seat on Organization) exhausted; resets daily |
| Daniel review + node links | Blocked on the above |

---

## 1. Canonical theme: Spark Ink (dark only)

V1 ships **one** theme. No light variant.

1. A dark card holds its edge against both light and dark client chrome. A white card
   dissolves into Slack light, iMessage light, and X light.
2. One theme halves the render matrix.
3. Ink `#111418` plus the signature gradient is the strongest brand read at thumbnail size.

Light is a V2 decision, not an omission.

---

## 2. Canvas, safe zones, grid

**Canvas: 1200 x 630** (1.91:1). Standard for `og:image` and `twitter:card=summary_large_image`.

### Bleed zone: 40 px on every edge. Background only, nothing legible.

Receipt: the worst common re-crop is a client trimming 1.91:1 to 16:9. Holding height,
`630 x 1.778 = 1120` wide, so 40 px comes off each side. That is where 40 comes from.

### Content safe area: x 64 → 1136, y 48 → 566

64 px side gutter = 40 px bleed + 24 px breathing.

### Reserved bands

| Band | y | Height | Contents |
|---|---|---|---|
| Header | 48 → 128 | 80 | Author row, topic kicker |
| Body | 164 → 504 | 340 | Post text, topic name, profile block |
| Brand | 526 → 566 | 40 | Spark lockup |

Bottom margin below the lockup is 64 px, matching the side gutter.

### 1:1 centre crop is out of scope for V1

Surfaces that hard-crop to a centred square (X `summary`, some WhatsApp thumbnails) show only
x 285 → 915. Left-composed templates lose their leading content there.

**Renderer requirement: always emit `twitter:card=summary_large_image`. Never `summary`.**

`topic`, `referral`, and `generic` are centre-composed and survive a square crop anyway.

---

## 3. Compact unfurl policy

| Surface | Rendered width | Scale from 1200 |
|---|---|---|
| Discord | ~400 px | 0.333 |
| Slack desktop | ~360 px | 0.300 |
| iMessage rich link | ~300 px | 0.250 |

Worst case 0.25. Taking ~12 px as the legibility floor, the design-size floor is
`12 / 0.25 = 48 px`.

**Rule: the primary line of every template is >= 48 px.**

Below 48 px is decorative at compact size and must never be the only place a fact appears.
Author name (32), handle (24), bio (28), summary (30), chips (20) are all decorative by this
definition, and so is post text once it drops to the 44 px step.

Stated plainly: a 280-character post cannot be legible in a 300 px preview. That is physics.
On those surfaces `og:title` carries the author and `og:description` carries the text; the
image carries brand and shape.

---

## 4. Typography

### Font pairing: Poppins + Inter

> **Poppins speaks as Spark. Inter speaks as the user.**

- **Poppins ExtraBold** — topic names, referral headline and code, profile display name,
  generic tagline, expired/unavailable headlines.
- **Inter** (400 / 600) — post text, author name, handle, bio, summaries, status chips.

**Recorded deviation:** the brand board (`01 · Foundations`, node `4129:58952`) specifies
Lexend for editorial and marketing. Daniel selected Inter for these cards. Inter is also the
Spark product design-system font, and OG cards are a product surface rendered by the app
rather than marketing collateral, so the pairing is consistent with the product. Either
update the brand board or record this as a named exception.

Sentence case throughout. Uppercase is reserved for compact status chips, which the brand
explicitly permits.

### Scale

| Token | Size / line-height | Font | Use |
|---|---|---|---|
| `display-xl` | 88 / 96, -3% | Poppins ExtraBold | Topic name, referral code |
| `display-l` | 64 / 72, -3% | Poppins ExtraBold | Profile display name, generic tagline |
| `display-m` | 56 / 64, -3% | Poppins ExtraBold | Expired / unavailable headlines |
| `post-l` | 64 / 74, -1% | Inter SemiBold | Post text, step 1 |
| `post-m` | 44 / 54, -1% | Inter SemiBold | Post text, step 2 |
| `post-s` | 36 / 46, -1% | Inter SemiBold | Post text, step 3 |
| `name` | 32 / 40 | Inter SemiBold | Author display name |
| `handle` | 24 / 30 | Inter Regular | Handle |
| `sub` | 30 / 42 | Inter Regular | Topic summary, referral inviter line |
| `bio` | 28 / 40 | Inter Regular | Profile bio |
| `chip` | 20 / 24, +12% | Inter Bold | Status chips, uppercase |

### Text sizing rule: fit to box, do not count characters

**Do not size text from a character count.** Character counts do not see all-caps, emoji,
CJK, or long URLs, and every one of those breaks a count-based ramp. Measured proof is below.

**The rule is an ordered fit loop:**

```
for (size, lineHeight, maxLines) in STEPS:
    lines = layout(text, boxWidth, size, lineHeight, tracking)
    if lines <= maxLines:
        render at this step; stop
render at the last step, hard-clamp to maxLines, ellipsize the final line
```

`text_post` STEPS, box **1072 x 340**:

| Step | Size / lh | Max lines |
|---|---|---|
| 1 | 64 / 74 | 4 |
| 2 | 44 / 54 | 6 |
| 3 | 36 / 46 | 7 |

`media_post` STEPS, box **592 x 340**:

| Step | Size / lh | Max lines |
|---|---|---|
| 1 | 44 / 54 | 6 |
| 2 | 34 / 44 | 7 |

### Measured capacities (Inter, mixed-case news copy, tracking -1%)

Greedy word wrap, kerning ignored. Kerning only ever tightens Inter, so these are floors.

| Box | Size | Lines | Capacity |
|---|---|---|---|
| 1072 x 340 | 64 / 74 | 4 | **134 chars** |
| 1072 x 340 | 44 / 54 | 6 | **316 chars** |
| 1072 x 340 | 36 / 46 | 7 | **358 chars** |
| 592 x 340 | 44 / 54 | 6 | **180 chars** |
| 592 x 340 | 34 / 44 | 7 | **262 chars** |

Expected step for typical Latin copy: <= ~120 chars lands on step 1, 121–280 on step 2.
This is an expectation, not the rule. The rule is the fit loop.

### Why the fit loop, with receipts

Real 275-char sample: 6 of 6 lines at 44 px. Fits.
The **same content in all caps (278 chars) needs 8 lines at 44 px** and overflows a 6-line
budget. It only fits at 36 px, where it takes 6 of 7 lines. A character-count ramp would have
sized it at 44 px and shipped a broken card. Step 3 exists specifically for this case.

### Unbreakable tokens

A 280-character token with no spaces wraps to **one line** under word wrap and overflows
horizontally. Real case: a pasted URL.

**Rule:** any token wider than the box breaks at character level
(`overflow-wrap: anywhere`). Apply after word wrap, never instead of it.

### Other text rules

- **Truncation:** cut at the last word boundary that fits, append a single `…` (U+2026, not
  three periods). Segment on grapheme clusters so emoji and combining marks never split.
- **Newlines:** each explicit `\n` consumes one line from the budget. Collapse runs of two or
  more blank lines to a single break.
- **Single-line fields** truncate to the box width with `…`. Never truncate a referral code.

### Measured single-line capacities (Inter)

| Field | Size / box | Typical | All-caps worst case |
|---|---|---|---|
| Display name, `text_post` | 32 px / 968 px | 49 chars | 32 chars |
| Display name, `media_post` | 32 px / 488 px | 24 chars | 16 chars |
| Handle, `text_post` | 24 px / 968 px | 68 chars | 44 chars |
| Handle, `media_post` | 24 px / 488 px | 34 chars | 22 chars |
| Profile handle | 32 px / 848 px | 44 chars | 29 chars |
| Bio, 2 lines | 28 px / 848 px | 123 chars | — |
| Topic summary, 2 lines | 30 px / 880 px | 121 chars | — |

Poppins-set strings (topic name, profile display name, referral code, taglines) are all
specified as fit-to-box or auto-width, so exact Poppins metrics do not gate implementation.

---

## 5. Colour and contrast

Palette: ink `#111418`, card `#1a1f26`, hairline `#2a2f38`, white `#ffffff`,
dim `#c9ced6`, mute `#8b9199`, lilac `#ede9ff`.
Signature gradient 225 degrees: `#7A26E6` 0% → `#5151F2` 45% → `#2F6BFF` 100%.

Measured WCAG contrast:

| Background | white | dim `#c9ced6` | mute `#8b9199` | lilac `#ede9ff` |
|---|---|---|---|---|
| ink `#111418` | 18.47 | 11.68 | 5.81 | 15.57 |
| card `#1a1f26` | 16.56 | 10.48 | 5.21 | 13.96 |
| gradient violet `#7a26e6` | 6.47 | 4.09 | 2.03 | 5.45 |
| gradient indigo `#5151f2` | 5.51 | 3.49 | 1.73 | 4.65 |
| gradient blue `#2f6bff` | **4.50** | **2.85** | **1.42** | **3.79** |

Rules from the numbers:

1. On ink or card, white / dim / mute are all safe. Mute at 5.81 clears AA at any size.
2. **On the gradient, primary text is white only.** 4.50 at the blue stop is the floor.
3. **Never dim or mute on the gradient.** Dim at 2.85 fails even AA large.
4. Secondary text on the gradient is lilac and must be **>= 24 px**; 3.79 clears AA large only.
5. The referral code sits on a **white plate with ink text: 18.47**, the highest pairing
   available, because the code has to be transcribable by eye from a screenshot.

---

## 6. Templates

Six renderer keys: five product templates and one system template.

### Shared chrome

- Background ink `#111418`.
- Brand glow: radial gradient ellipse 1100 x 900 at (640, -420), violet 42% → indigo 16% →
  transparent, clipped to the card.
- Brand lockup: white wordmark, 113 x 40, at (64, 526). 113 px clears the brand minimum
  wordmark width of 72 px.

### 6.1 `text_post`

Left-composed. Variants: `length = short | medium | max | emoji | multiline`.

| Element | Position | Spec |
|---|---|---|
| Avatar | (64, 48) | 80 circle |
| Display name | (168, 52) | `name`, 1 line, truncate |
| Handle | (168, 96) | `handle`, mute, 1 line, truncate |
| Post text | (64, 164) | 1072 x 340, fit loop |
| Brand lockup | (64, 526) | 113 x 40 |

Avatar is a circular image when present, otherwise a tint circle with two-letter initials in
Inter SemiBold 32. Tints come from the existing app avatar palette (`#2871fa`, `#ff1271`,
`#7bb304`) chosen by a stable hash of the handle, so an account always gets the same colour.

### 6.2 `media_post`

Left-composed, media panel right. Variants: `media = image | gallery | gif | video | unavailable`.

| Element | Position | Spec |
|---|---|---|
| Media panel | x 720 → 1200, y 0 → 630 | 480 x 630, `cover`, radius 0, bleeds three edges |
| Panel hairline | x 720 | 1 px `#2a2f38` |
| Panel scrim | x 720, 64 wide | ink → transparent, softens the seam under light images |
| Media chip | bottom-right of panel, 24 inset | GIF / gallery counter / duration |
| Avatar, name, handle | as `text_post` | name and handle boxes narrow to 488 px |
| Post text | (64, 164) | 592 x 340, media fit loop |
| Brand lockup | (64, 526) | |

### 6.3 `topic`

Centre-composed. Variants: `state = active | expired | merged`.

| Element | Position | Spec |
|---|---|---|
| Kicker chip | centred, y 112 | 12 px category dot + category name, `chip` |
| Topic name | centred, y 190, 1000 wide | fit loop: 88/96 max 2 lines, then 64/72 max 3, then clamp |
| Summary | centred, below name, 880 wide | `sub`, max 2 lines, capacity 121 chars |
| Brand lockup | (64, 526) | |

- `active` — full brand gradient background, white name, lilac summary.
- `expired` — ink background, `ARCHIVED` chip on `#2a2f38`, white name, dim summary.
- `merged` — ink background, `MERGED` chip, white name, summary replaced by
  "Now part of {destinationTopicName}" with the destination in Inter SemiBold white.

Summary fallback when a topic has none: `og.topic.summary_fallback`.

### 6.4 `user_profile`

Left-composed. Variants: `state = default | no_photo | private`.

| Element | Position | Spec |
|---|---|---|
| Avatar | (64, 150) | 180 circle |
| Display name | (288, 176), 848 wide | `display-l`, 1 line, truncate to fit |
| Handle | (288, 256) | 32 px Inter Regular, mute, 44 chars typical |
| Bio | (288, 316), 848 wide | `bio`, max 2 lines, capacity 123 chars |
| Brand lockup | (64, 526) | |

- `no_photo` — avatar becomes the initials treatment.
- `private` — **alias.** Renders `generic reason=private`. It exists as a variant only so the
  state is discoverable in the Figma set; the renderer never composes a profile card for a
  private account.

Bio renders only when the account is public and the bio is published. There is no bio
fallback string. No bio means no bio. Never invent one.

### 6.5 `referral`

Centre-composed, gradient background. Variants: `state = active | unavailable`.

| Element | Position | Spec |
|---|---|---|
| Headline | centred, y 104 | "You're invited to Spark", Inter SemiBold 44 / 54, white |
| Code plate | centred, y 200, h 168 | white, radius 28, **width = code width + 112** |
| Code | inside plate | `display-xl` (88), tracking +10%, ink `#111418` |
| Inviter line | centred, y 418 | `sub`, lilac |
| Brand lockup | (64, 526) | |

The code is **10 hex characters**, never truncated, wrapped, or abbreviated. The plate
auto-sizes to the code, so exact Poppins metrics are not needed to implement it.

At 88 px the code survives to ~22 px at the worst compact scale (0.25), comfortably above the
12 px floor, so it stays transcribable from a phone preview.

Uppercase hex only. If the alphabet is ever widened past hex, revisit `0`/`O` and `1`/`I`.

`unavailable` — ink background, no plate, **no code under any circumstance**, including
expired. `og.referral.expired` in `display-m`, sub line in dim.

### 6.6 `generic` (system)

Centre-composed. Variants: `reason = default | deleted | private | ineligible`.

| Element | Position | Spec |
|---|---|---|
| Wordmark | centred, y 210 | 72 px tall, white |
| Tagline | centred, y 330 | "know first", `display-l` |
| Reason line | centred, y 410 | `sub`, dim, optional |

`default` carries no reason line and is the only card that is pre-baked and served statically.

---

## 7. Image crop behaviour

- **Fit** `cover`. **Position** the post's stored focal point if the API exposes one,
  otherwise centre.
- **No upscaling past 2x.** The panel is 480 x 630, so a source below 960 x 1260 is
  letterboxed on ink rather than upscaled. Past 2x the softening is visible at delivery size.
- **Aspect:** portrait, square, and landscape all centre-crop to the panel. V1 does not switch
  layout on aspect ratio.
- **Animated GIF:** poster frame only. OG images are static and most unfurlers drop animation.
  Chip reads `GIF`.
- **Video:** thumbnail plus play glyph and duration chip.
- **Gallery:** the selected index; out of range falls back to index 0. Chip `{index} / {total}`.
- **Avatars:** centre-crop to a circle, no focal point.
- **Colour:** convert to sRGB on ingest. Untagged sources are assumed sRGB.

---

## 8. Fallback and error matrix

| Condition | Renders | Notes |
|---|---|---|
| No media, or media fetch fails | `text_post` | Same author and text, not a broken-image card |
| Media missing **and** text empty | `generic reason=ineligible` | |
| Post deleted | `generic reason=deleted` | |
| Author account private | `generic reason=private` | Post and profile routes both |
| Post subscriber-only or paywalled | `generic reason=ineligible` | Never leak the body |
| Topic archived | `topic state=expired` | |
| Topic merged | `topic state=merged` | |
| Referral expired, spent, or revoked | `referral state=unavailable` | Code never shown |
| Unknown route or id | `generic reason=default` | |
| **Renderer throws** | **static `og-default.png`** | |

**Render-error rule:** on any renderer exception, serve the pre-baked static
`og-default.png`. Do not attempt a second dynamic render on the error path. If the renderer
is failing it cannot be trusted to compose an error card, and a broken image is worse than a
plain brand card.

Serve `200 OK` with the fallback image, never a `4xx`/`5xx` with no body. Unfurlers cache
failures and many never retry.

---

## 9. Privacy rules

Never render, on any template:

- Email, phone, birthday, or any address-level location
- Legal or real name where it differs from the display name
- **Follower, following, post, like, or view counts.** They go stale behind platform image
  caches, and a wrong number is worse than no number.
- Any field of a private account, including avatar and bio
- Suspension, ban, restriction, or any moderation state
- Report counts or report status
- Community notes that are not published
- Muted or blocked relationships
- Subscriber-only or paywalled post bodies
- Direct messages. DM routes are never OG-eligible at all.

Verified badges may render, published state only.

---

## 10. Image alt text

`og:image:alt` and `twitter:image:alt` on every card. Plain text, no markup. Truncate
interpolated content at the stated cap on a word boundary with `…`.

| Template | Alt string |
|---|---|
| `text_post` | `Post on Spark by {displayName} (@{handle}): "{postText,200}"` |
| `media_post` | `Post on Spark by {displayName} (@{handle}) with {mediaKind}: "{postText,160}". {authorMediaAlt,120}` |
| `topic` | `Spark topic: {topicName}. {summary,160}` |
| `user_profile` | `{displayName} (@{handle}) on Spark` |
| `referral` | `Invite to join Spark. Referral code {code}` |
| `generic` | `Spark, a live local news network` |

`{mediaKind}` is one of `an image`, `a photo gallery`, `a GIF`, `a video`.
`{authorMediaAlt}` is the author's own alt text and is omitted entirely when absent. Never
generate a description of image content the author did not write.

The `generic` alt never names the reason. "This account is private" belongs on the card face,
not in an alt string that gets indexed.

---

## 11. Copy tokens

Spark's own strings, the only text on these cards we control.

| Token | Value |
|---|---|
| `og.generic.tagline` | know first |
| `og.generic.deleted` | This post is no longer available |
| `og.generic.private` | This account is private |
| `og.generic.ineligible` | Not available for preview |
| `og.referral.headline` | You're invited to Spark |
| `og.referral.sub` | {inviterDisplayName} invited you |
| `og.referral.sub_noinviter` | Join Spark |
| `og.referral.expired` | This invite has expired |
| `og.referral.expired_sub` | Ask whoever sent it for a new link |
| `og.topic.chip_expired` | ARCHIVED |
| `og.topic.chip_merged` | MERGED |
| `og.topic.merged_sub` | Now part of {destinationTopicName} |
| `og.topic.summary_fallback` | Live coverage on Spark |
| `og.media.chip_gif` | GIF |
| `og.media.chip_gallery` | {index} / {total} |

No emoji in any Spark-authored string. Emoji appear only inside user-generated content.

---

## 12. Assets and licensing

| Asset | Format | Source | Notes |
|---|---|---|---|
| Spark bolt mark | **SVG** | `Spark Logo` set `3979:37824` (White `3979:37823`, Black `3979:37822`) | Vector. White only in V1. |
| Spark wordmark lockup | **SVG** | `Spark Wordmark Logo` set `3979:37827` (White `3979:37825`, Black `3979:37826`) | Rendered 113 x 40, clears the 72 px brand minimum |
| Brand gradient | **Generated** | 225 deg, `#7A26E6` → `#5151F2` 45% → `#2F6BFF` | CSS / canvas. Never ship as a bitmap. |
| Brand glow | **Generated** | radial violet 42% → indigo 16% → transparent | Ellipse 1100 x 900 at (640, -420), clipped |
| Card background | **Generated** | flat `#111418` | |
| Avatars | PNG / JPEG | user CDN | Circle-masked at render |
| Post media | JPEG / PNG / WebP | user CDN | `cover`, sRGB |
| `og-default.png` | **PNG**, pre-baked | export of `generic reason=default` | Static error fallback |
| Poppins ExtraBold | **Font, embedded** | Google Fonts | **SIL OFL 1.1**, embedding permitted |
| Inter 400 / 600 | **Font, embedded** | Google Fonts / rsms.me | **SIL OFL 1.1**, embedding permitted |
| Emoji font | **Font, embedded** | Noto Color Emoji | **SIL OFL 1.1**. Required: Satori and resvg render tofu for emoji without an explicit emoji font. This is the most common cause of broken OG cards carrying user content. |

All type is **font-driven**. No text is baked into an image asset, so every string stays
localisable and re-renderable.

**Licensing flag on sample photography:** the placeholder photos in the Spark Figma file
(mountain lake, street mural, food, band, taxi) have unverified provenance. Fine for mockups.
Production media comes from user uploads. Do not ship any of those files as marketing or
default assets without clearing their source.

---

## 13. Caching and URL shape

Platforms cache OG images aggressively and many never re-fetch.

**URL shape: `/og/{template}/{id}/{contentHash}.png`**

`contentHash` covers every input that affects pixels: text, author, avatar URL, media URL,
selected gallery index, state, and template version. Edit anything and the URL changes, which
is the only reliable cache bust.

This is also the second reason counts are banned from the cards. A cached card showing a
follower count from three weeks ago is a bug with no fix.

`Cache-Control: public, max-age=31536000, immutable` on hashed URLs.

---

## 14. Open items

1. **Approved topic visual treatment is unconfirmed.** V1 uses the brand gradient plus the
   topic's category dot. A `Topic + Image` component exists in the mobile file
   (node `5218:32917`) that I could not inspect before the Figma quota reset. If that is the
   approved treatment, `topic` should adopt it.
2. **Focal point support.** Section 7 assumes the media API may expose one. If it does not,
   everything centre-crops, which is fine, but confirm.
3. **Post character limit.** The 280 ceiling is a card-system decision, not a product fact.
   The fit loop degrades gracefully past it, but confirm the real product limit.
4. **Brand board deviation.** Inter replaces Lexend on these cards, section 4. Update the
   brand board or record the exception.
