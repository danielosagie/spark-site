import { useEffect, useRef, useState } from 'react'

/**
 * Fades an element in once it enters the viewport.
 * Returns a ref and the class string, so any element can opt in without a wrapper.
 * The hidden state lives under `.js .rv` in CSS, so no-JS still renders everything.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, shown ? 'rv in' : 'rv'] as const
}
