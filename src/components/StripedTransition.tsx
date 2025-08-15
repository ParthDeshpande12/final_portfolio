"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function StripedTransition() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const wrapper = wrapperRef.current
    if (!section || !wrapper) return

    const ctx = gsap.context(() => {
      // Animate the rectangle strips to reveal the black background
      gsap.to('.rectangle_animate', {
        scaleY: 0,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: false
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[200vh]"
    >
      <div 
        ref={wrapperRef}
        className="sticky top-0 w-full h-screen"
      >
        {/* Black background that will be revealed */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Animated strips that start covering the black background */}
        <div className="absolute inset-0 flex">
          <div className="rectangle_animate one relative w-1/4 h-full bg-white" style={{transformOrigin: '50% 100%'}} />
          <div className="rectangle_animate two relative w-1/4 h-full bg-white" style={{transformOrigin: '50% 0%'}} />
          <div className="rectangle_animate three relative w-1/4 h-full bg-white" style={{transformOrigin: '50% 100%'}} />
          <div className="rectangle_animate four relative w-1/4 h-full bg-white" style={{transformOrigin: '50% 0%'}} />
        </div>
      </div>
    </section>
  )
}