import type { ReactNode } from 'react'
import { IMG } from '@/lib/assets'

/** iOS Messages device frame. */
export function Phone({ light = false, children }: { light?: boolean; children: ReactNode }) {
  return (
    <div className={`phone${light ? ' light' : ''}`}>
      <div className="status"><span>11:53</span><span>●●●</span></div>
      <div className="thread">{children}</div>
    </div>
  )
}

/** A received message bubble carrying a link preview. */
export function Bubble({ dark = false, children }: { dark?: boolean; children: ReactNode }) {
  return <div className={`bub recv ${dark ? 'dark' : 'light'}`}>{children}</div>
}

/** The favicon + title + optional subtitle + domain row every unfurl ends with. */
export function LinkFoot({
  title, sub, domain = 'spark.com', gradientIcon = false,
}: { title: string; sub?: string; domain?: string; gradientIcon?: boolean }) {
  return (
    <div className="lp-foot">
      <div className={`lp-icon${gradientIcon ? ' grad' : ''}`}>
        <img src={IMG.boltWhite.src} alt="" />
      </div>
      <div className="lp-meta">
        <div className="lp-title">{title}</div>
        {sub && <div className="lp-sub">{sub}</div>}
        <div className="lp-dom">{domain}</div>
      </div>
    </div>
  )
}

export function PlayButton() {
  return <div className="lp-play" />
}

/** A live 1200x630 OG card, scaled into whatever slot it sits in. */
export function OgCard({ scale, children, gradient = false }: {
  scale: number; children: ReactNode; gradient?: boolean
}) {
  return (
    <div className="og-embed">
      <div className={`ogc${gradient ? ' grad' : ''}`} style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}

export function TextPostCard() {
  return (
    <>
      <div className="glow" />
      <div className="av" style={{ background: '#ff1271' }}>MC</div>
      <div className="nm">Maya Chen</div>
      <div className="hd">@mayawrites</div>
      <div className="bodytx">APS board just voted. The meal debt is gone.</div>
      <div className="lock"><img src={IMG.wordmarkWhite.src} alt="" /></div>
    </>
  )
}

export function ReferralCard() {
  return (
    <>
      <div className="rhead">You&rsquo;re invited to Spark</div>
      <div className="plate"><span className="code">7F3A9C2E1B</span></div>
      <div className="rsub">Maya Chen invited you</div>
      <div className="lock"><img src={IMG.wordmarkWhite.src} alt="" /></div>
    </>
  )
}
