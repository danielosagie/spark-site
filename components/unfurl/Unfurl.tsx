import { IMG } from '@/lib/assets'
import {
  Phone, Bubble, LinkFoot, PlayButton, OgCard, TextPostCard, ReferralCard,
} from './primitives'
import { MetaTable, Gotchas } from './static'

/** 305px bubble / 1200px card. Matches the real delivered size in iMessage. */
const BUBBLE_SCALE = 0.2542
/** 526px X card / 1200px card. */
const X_SCALE = 0.4383

export default function Unfurl() {
  return (
    <div className="page">
      <h1>Spark share previews</h1>
      <p className="sub">
        How a Spark link unfurls in iMessage, X, and Slack. These are the{' '}
        <b>native rich previews</b> the platform composes from meta tags. They are a different
        surface from the 1200×630 OG image, and the video variants are driven by{' '}
        <code>og:video</code> / <code>twitter:player</code>, not by the static card.
      </p>

      <h2>1 · iMessage</h2>
      <p className="h2note">
        iOS renders the link preview inside the message bubble. When <code>og:video</code> points
        at a playable MP4, the video plays <b>inline in the thread</b> and the static image is only
        the poster. Dark and light are both shown because Messages follows the system appearance,
        not ours.
      </p>

      <div className="row">
        <div>
          <Phone>
            <Bubble dark>
              <div className="lp-media">
                <img src={IMG.cardBreaking.src} alt="" />
                <PlayButton />
              </div>
              <div className="lp-body">
                <div className="lp-text">
                  Wow. Just witnessed a two car crash and one of the cars caught fire. Praying
                  everybody made it out safely.
                </div>
                <LinkFoot title="Bobbyjohn14 (@bobbyjohn14) on Spark" />
              </div>
            </Bubble>
          </Phone>
          <p className="spec">
            <b>Video post, dark.</b> Poster is the video&rsquo;s own first frame, not the OG card.
            Duration chip is burned into the poster by the renderer.
            <span className="tag">og:video</span>
            <span className="tag">og:video:type</span>
            <span className="tag">og:image</span>
          </p>
        </div>

        <div>
          <Phone light>
            <Bubble>
              <div className="lp-body">
                <div className="lp-text">
                  Four and a half hours through security at Hartsfield-Jackson this morning.
                  Roughly 4,450 flights impacted nationwide and TSA is telling people to arrive
                  five hours early.
                </div>
                <LinkFoot title="ATL Fire Watch (@ATLFireWatch) on Spark" />
              </div>
            </Bubble>
          </Phone>
          <p className="spec">
            <b>Text post, light.</b> No media, so iOS drops the image well entirely and leads with{' '}
            <code>og:description</code>. This is why the description has to carry the post text,
            not a marketing line.
          </p>
        </div>

        <div>
          <Phone>
            <Bubble dark>
              <OgCard scale={BUBBLE_SCALE}><TextPostCard /></OgCard>
              <div className="lp-body">
                <LinkFoot title="Maya Chen (@mayawrites) on Spark" />
              </div>
            </Bubble>
          </Phone>
          <p className="spec">
            <b>Static OG card in the wild.</b> This is the 1200×630 card at its real delivered
            size, roughly 305 px wide. The 48 px design floor exists so this stays readable.
          </p>
        </div>

        <div>
          <Phone light>
            <Bubble>
              <OgCard scale={BUBBLE_SCALE} gradient><ReferralCard /></OgCard>
              <div className="lp-body">
                <LinkFoot title="You’re invited to Spark" sub="Code 7F3A9C2E1B" gradientIcon />
              </div>
            </Bubble>
          </Phone>
          <p className="spec">
            <b>Referral.</b> The code is in the image <i>and</i> in <code>og:description</code>,
            so it survives clients that show text only.
          </p>
        </div>
      </div>

      <h2>2 · X</h2>
      <p className="h2note">
        Two different cards. <code>summary_large_image</code> shows the static 1200×630. The{' '}
        <b>player card</b> plays video inline, but <code>twitter:player</code> requires the domain
        to be allowlisted by X, so treat inline video there as a launch task with lead time, not a
        config flag.
      </p>

      <div className="row">
        <div>
          <div className="x">
            <div className="x-head">
              <div className="x-av"><img src={IMG.boltMark.src} alt="" /></div>
              <div>
                <div className="x-name">Maya Chen</div>
                <div className="x-handle">@mayawrites</div>
              </div>
            </div>
            <div className="x-text">
              APS board just voted. The meal debt is gone. spark.com/p/8f21
            </div>
            <div className="x-card">
              <OgCard scale={X_SCALE}><TextPostCard /></OgCard>
              <div className="x-cap">
                <div className="x-dom">spark.com</div>
                <div className="x-t">Maya Chen (@mayawrites) on Spark</div>
                <div className="x-d">APS board just voted. The meal debt is gone.</div>
              </div>
            </div>
          </div>
          <p className="spec">
            <b>summary_large_image.</b> Default for every Spark link.
            <span className="tag">twitter:card=summary_large_image</span>
          </p>
        </div>

        <div>
          <div className="x">
            <div className="x-head">
              <div className="x-av"><img src={IMG.boltMark.src} alt="" /></div>
              <div>
                <div className="x-name">ATL Fire Watch</div>
                <div className="x-handle">@ATLFireWatch</div>
              </div>
            </div>
            <div className="x-text">Two car crash on Peachtree, one vehicle fully involved.</div>
            <div className="x-card">
              <div className="x-media">
                <img src={IMG.cardBreaking.src} alt="" />
                <PlayButton />
              </div>
              <div className="x-cap">
                <div className="x-dom">spark.com</div>
                <div className="x-t">ATL Fire Watch (@ATLFireWatch) on Spark</div>
              </div>
            </div>
          </div>
          <p className="spec">
            <b>Player card.</b> Inline playback, poster is the video frame.
            <span className="tag">twitter:card=player</span>
            <span className="tag">twitter:player</span>
            <span className="tag">twitter:player:width</span>
          </p>
        </div>
      </div>

      <h2>3 · Slack</h2>
      <p className="h2note">
        Slack builds its own attachment from the same tags and shows the image at roughly 360 px.
        Video never plays inline; it links out.
      </p>

      <div className="row">
        <div>
          <div className="slack">
            <div className="slack-rail">
              <div className="slack-app">
                <div className="lp-icon"><img src={IMG.boltMark.src} alt="" /></div>{' '}
                Spark
              </div>
              <div className="slack-t">ATL Fire Watch (@ATLFireWatch) on Spark</div>
              <div className="slack-d">
                Wow. Just witnessed a two car crash and one of the cars caught fire. Praying
                everybody made it out safely.
              </div>
              <div className="slack-img">
                <img src={IMG.cardBreaking.src} alt="" />
                <PlayButton />
              </div>
            </div>
          </div>
          <p className="spec">
            <b>Slack unfurl.</b> The coloured rail picks up <code>theme-color</code>. Set it to
            brand violet <code>#7A26E6</code>.
          </p>
        </div>
      </div>

      <h2>4 · Meta tags per template</h2>
      <MetaTable />
      <Gotchas />

      <p className="sub" style={{ marginTop: 28 }}>
        <b>Open token:</b> the domain shown in every preview is a placeholder. Confirm the real one
        and it becomes a single copy token.
      </p>
    </div>
  )
}
