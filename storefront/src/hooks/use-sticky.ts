"use client"

import { useEffect, useState } from "react"

export default function useSticky() {
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    let ticking = false

    const stickyHeader = () => {
      const scrollY = window.scrollY
      const shouldBeSticky = scrollY > 80

      // Only update state if it actually changed
      if (shouldBeSticky !== sticky) {
        setSticky(shouldBeSticky)
      }
    }

    const requestTick = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          stickyHeader()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", requestTick, { passive: true })
    return () => {
      window.removeEventListener("scroll", requestTick)
    }
  }, [sticky])

  return { sticky }
}

