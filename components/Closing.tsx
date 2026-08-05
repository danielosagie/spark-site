'use client'

import { useState } from 'react'
import { useReveal } from './hooks/useReveal'

export function Closing({
  title = 'It all starts with a spark.',
  sub = 'Invite only while we grow. Live in Atlanta now.',
}: { title?: string; sub?: string }) {
  const [ref, cls] = useReveal<HTMLDivElement>()
  const [email, setEmail] = useState('')

  return (
    <div className="closing-outer">
      <div className={`closing ${cls}`} ref={ref}>
        <h2>{title}</h2>
        <p className="sub">{sub}</p>
        <form className="field" onSubmit={e => e.preventDefault()}>
          <label className="sr-only" htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button type="submit">Get a code</button>
        </form>
      </div>
    </div>
  )
}
