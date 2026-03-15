import { useEffect, useState, useRef } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const container = document.getElementById('scroll-container')
    if (!container) return

    function handleScroll() {
      const scrollTop = container!.scrollTop
      const scrollHeight = container!.scrollHeight - container!.clientHeight
      const p = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setProgress(p)
      setIsScrolled(scrollTop > 40)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return { progress, isScrolled }
}
