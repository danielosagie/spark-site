export function MetaTable() {
  return (
    <table><tbody>
      <tr><th>Template</th><th>og:title</th><th>og:description</th><th>Media tags</th></tr>
      <tr>
        <td><code>text_post</code></td>
        <td>&#123;displayName&#125; (@&#123;handle&#125;) on Spark</td>
        <td>Post text, truncated to 200 at a word boundary</td>
        <td><code>og:image</code> = static card</td>
      </tr>
      <tr>
        <td><code>media_post</code> (image)</td>
        <td>&#123;displayName&#125; (@&#123;handle&#125;) on Spark</td>
        <td>Post text, 200</td>
        <td><code>og:image</code> = static card</td>
      </tr>
      <tr>
        <td><code>media_post</code> (video)</td>
        <td>&#123;displayName&#125; (@&#123;handle&#125;) on Spark</td>
        <td>Post text, 200</td>
        <td><code>og:video</code>, <code>og:video:secure_url</code>,
            <code>og:video:type=video/mp4</code>, <code>og:video:width/height</code>,
            <code>og:image</code> = <b>video poster frame</b>,
            <code>twitter:card=player</code>, <code>twitter:player</code></td>
      </tr>
      <tr>
        <td><code>topic</code></td>
        <td>&#123;topicName&#125; on Spark</td>
        <td>Topic summary, or the fallback line</td>
        <td><code>og:image</code> = static card</td>
      </tr>
      <tr>
        <td><code>user_profile</code></td>
        <td>&#123;displayName&#125; (@&#123;handle&#125;) on Spark</td>
        <td>Bio if public and published, else omit the tag</td>
        <td><code>og:image</code> = static card</td>
      </tr>
      <tr>
        <td><code>referral</code></td>
        <td>You're invited to Spark</td>
        <td>Code &#123;code&#125;. &#123;inviterDisplayName&#125; invited you.</td>
        <td><code>og:image</code> = static card</td>
      </tr>
      <tr>
        <td><code>generic</code></td>
        <td>Spark</td>
        <td>A live local news network</td>
        <td><code>og:image</code> = <code>og-default.png</code></td>
      </tr>
    </tbody></table>
  )
}

export function Gotchas() {
  return (
    <div className="warn">
      <b>Six things that will bite the implementation.</b>
      <br />1. <b>The video poster is not the OG card.</b> For video posts <code>og:image</code> must be
      the video's own frame. Ship the branded card there and iMessage shows a still of a marketing
      card where the user expects the clip.
      <br />2. <b>X player cards need allowlisting.</b> <code>twitter:player</code> is not self-serve.
      Start that request early or ship <code>summary_large_image</code> for video at launch.
      <br />3. <b>iMessage only plays direct MP4</b> over HTTPS with a correct
      <code>Content-Type</code> and byte-range support. HLS will not inline.
      <br />4. <b>No counts anywhere</b>, including the description. Previews are cached and a stale
      number is worse than no number.
      <br />5. <b>Private and deleted must resolve before any tag is emitted</b>, otherwise the
      description leaks the post text even when the card is the generic one.
      <br />6. <b>Set <code>theme-color</code></b> to <code>#7A26E6</code> for the Slack rail and
      Android chrome.
    </div>
  )
}
