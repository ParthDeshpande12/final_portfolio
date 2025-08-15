"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function VideoToBlackTransition() {
  const transitionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = transitionRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      // Create a smooth transition from transparent to black
      ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        animation: gsap.fromTo(element, 
          {
            background: "linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 80%, #000000 100%)"
          },
          {
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.95) 80%, #000000 100%)"
          }
        ),
      })
    }, element)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={transitionRef}
      className="h-screen w-full relative z-5"
      style={{
        background: "linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 80%, #000000 100%)"
      }}
    />
  )
}