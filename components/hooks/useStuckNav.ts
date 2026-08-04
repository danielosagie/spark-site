import { useEffect, useState } from 'react'

/** True once the page has scrolled past the nav, which draws its hairline. */
export function useStuckNav(threshold = 8) {
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return stuck
}
