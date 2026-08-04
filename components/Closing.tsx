'use client'

import { useState } from 'react'
import { useReveal } from './hooks/useReveal'

export function Closing({
  title = 'It all starts with a spark.',
  sub = 'Live in Atlanta now. Invite only while we grow.',
}: { title?: string; sub?: string }) {
  const [ref, cls] = useReveal<HTMLDivElement>()
  const [code, setCode] = useState('')

  return (
    <div className="closing-outer">
      <div className={`closing ${cls}`} ref={ref}>
        <h2>{title}</h2>
        <p className="sub">{sub}</p>
        <div className="row">
          <form className="field" onSubmit={e => e.preventDefault()}>
            <label className="sr-only" htmlFor="invite">Invite code</label>
            <input
              id="invite"
              name="invite"
              type="text"
              placeholder="S P R K 2 6"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <button type="submit">Redeem</button>
          </form>
          <a className="btn-white" href="#">Sign up free</a>
        </div>
      </div>
    </div>
  )
}
