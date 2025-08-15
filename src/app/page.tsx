"use client"

import { useEffect, useState, useRef } from 'react'
import LoadingScreen from "@/components/loading-screen"
import SpiceMeridianPreloader from "@/components/SpiceMeridianPreloader"
import { useLoaderContext } from "@/context/LoaderContext"
import Lenis from 'lenis'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Extend the Window interface to include ScrollTrigger
declare global {
  interface Window {
    ScrollTrigger?: {
      refresh: () => void
    }
  }
}

// Import your existing sections
import Introduction from '@/sections/Introduction'
import Features from '@/sections/Features'
import Integrations from '@/sections/Integrations'
import ContactUs from '@/sections/ContactUs'
import UnfixedHero from "@/components/component"
import { VideoSectionsWrapper } from '@/components/VideoSectionsWrapper'

// Global flag to prevent loader on client-side navigation

export default function Home() {
  const { loaderShown, setLoaderShown } = useLoaderContext()
  const [isLoading, setIsLoading] = useState(!loaderShown)
  const [showPreloader, setShowPreloader] = useState(true)
  const lenisRef = useRef<Lenis | null>(null)
  const mantraSectionRef = useRef<HTMLDivElement>(null)
  const mantraHeadingRef = useRef<HTMLHeadingElement>(null)
  const mantraTextRef = useRef<HTMLParagraphElement>(null)

  // Initialize Lenis with section snapping
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.2, // Slightly reduced for better mobile control
      infinite: false
    })

    // Enhanced section snapping logic
    const sections = [
      { selector: '#hero-section', offset: 0 },
      { selector: '#introduction', offset: 0 },
      { selector: '#features', offset: 0 },
      { selector: '#integrations', offset: 0 },
      { selector: '#contact', offset: 0 }
    ]

    let isSnapping = false
    let snapTimeout: NodeJS.Timeout

    const snapToSection = () => {
      if (isSnapping) return
      
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      let targetSection = null
      let minDistance = Infinity
      let targetY = 0

      sections.forEach(({ selector, offset }) => {
        const element = document.querySelector(selector) as HTMLElement
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = scrollY + rect.top + offset
          const distance = Math.abs(scrollY - elementTop)
          
          // Consider viewport position for better snapping decisions
          const elementCenter = elementTop + (element.offsetHeight / 2)
          const viewportCenter = scrollY + (windowHeight / 2)
          const centerDistance = Math.abs(viewportCenter - elementCenter)
          
          if (distance < minDistance && centerDistance < windowHeight) {
            minDistance = distance
            targetSection = selector
            targetY = elementTop
          }
        }
      })

      // Only snap if we're not too close already and not in the middle of user interaction
      if (targetSection && minDistance > 30 && minDistance < windowHeight * 0.8) {
        isSnapping = true
        lenis.scrollTo(targetY, {
          duration: Math.min(1.8, minDistance / 500), // Adjust duration based on distance
          easing: (t) => 1 - Math.pow(1 - t, 3),
          onComplete: () => {
            setTimeout(() => {
              isSnapping = false
            }, 100)
          }
        })
      }
    }

    lenis.on('scroll', () => {
      clearTimeout(snapTimeout)
      snapTimeout = setTimeout(snapToSection, 200)
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      clearTimeout(snapTimeout)
      lenis.destroy()
    }
  }, [])

  // Sanskrit mantra animation effect
  useEffect(() => {
    if (typeof window !== "undefined" && mantraSectionRef.current && mantraHeadingRef.current && mantraTextRef.current) {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: mantraSectionRef.current,
          start: "center 30%",
          toggleActions: "play none none none",
          once: true,
          onEnter: () => {
            // Animate main mantra heading with left-to-right fade and blur
            if (mantraHeadingRef.current) {
              gsap.fromTo(mantraHeadingRef.current, 
                {
                  opacity: 0,
                  x: -100,
                  clipPath: 'inset(-20px 100% -20px 0)',
                  filter: 'blur(10px)'
                },
                {
                  opacity: 1,
                  x: 0,
                  clipPath: 'inset(-20px 0% -20px 0)',
                  filter: 'blur(0px)',
                  duration: 1.5,
                  ease: "power3.out"
                }
              )
            }
            
            // Animate sub mantra text with left-to-right fade and blur (delayed)
            if (mantraTextRef.current) {
              gsap.fromTo(mantraTextRef.current,
                {
                  opacity: 0,
                  x: -100,
                  clipPath: 'inset(-20px 100% -20px 0)',
                  filter: 'blur(10px)'
                },
                {
                  opacity: 1,
                  x: 0,
                  clipPath: 'inset(-20px 0% -20px 0)',
                  filter: 'blur(0px)',
                  duration: 1.5,
                  delay: 0.8,
                  ease: "power3.out"
                }
              )
            }
          }
        })
      }, mantraSectionRef)

      return () => {
        ctx.revert()
      }
    }
  }, [])

  useEffect(() => {
    if (!loaderShown) {
      setIsLoading(true)
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true })
      }
    } else {
      setIsLoading(false)
    }
    // Fix ScrollTrigger race condition and integrate with Lenis
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.ScrollTrigger && lenisRef.current) {
        // Update ScrollTrigger on Lenis scroll
        lenisRef.current.on('scroll', () => {
          window.ScrollTrigger?.refresh()
        })
        window.ScrollTrigger.refresh()
        console.log("ScrollTrigger refreshed with Lenis") // Debug log
      }
    }, 500) // Longer delay to ensure all components are ready

    return () => clearTimeout(timer)
  }, [loaderShown])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setLoaderShown(true)
  }

  const handlePreloaderComplete = () => {
    // Update loader context for other components
    setLoaderShown(true)
    // Show main content immediately - no delay needed since preloader handles timing
    setShowPreloader(false)
  }

  return (
    <>
      {/* Preloader */}
      {showPreloader && <SpiceMeridianPreloader onComplete={handlePreloaderComplete} />}
      
      {/* Main Content */}
      {!showPreloader && (
        <main className="relative" style={{ backgroundColor: '#f5f0e8' }}>
      {/* Contact Us Section - Fixed at back layer */}
      <section id="contact" className="fixed bottom-0 left-0 right-0 h-screen bg-neutral-950 z-0">
        <ContactUs />
      </section>
      {/* Hero Section */}
      <section id="hero-section" className="relative z-10" style={{ backgroundColor: '#f5f0e8' }}>
        <UnfixedHero />
      </section>

      {/* Video Sections Wrapper - covers both Introduction and Features */}
      <div className="relative z-10">
        <VideoSectionsWrapper>
          {/* Introduction Section */}
          <section id="introduction" className="min-h-[160vh] bg-transparent">
            <Introduction />
          </section>

          {/* Features Section */}
          <section id="features" className="min-h-[200vh] h-auto w-full bg-transparent">
            <Features />
          </section>
        </VideoSectionsWrapper>
      </div>
      {/* Integrations Section */}
      <section id="integrations" className="min-h-[200vh] h-auto w-full bg-black relative z-10">
        <Integrations />
      </section>

      {/* Sanskrit Mantra Section */}
      <section ref={mantraSectionRef} className="relative w-full bg-black flex items-center justify-center overflow-hidden z-10 py-16 md:py-24">
        <style jsx>{`
          .sanskrit-heading {
            text-shadow: 0 0 10px rgba(245, 240, 232, 0.6), 0 0 20px rgba(245, 240, 232, 0.4), 0 0 30px rgba(245, 240, 232, 0.2);
          }
          
          .sanskrit-text {
            text-shadow: 0 0 10px rgba(245, 240, 232, 0.6), 0 0 20px rgba(245, 240, 232, 0.4), 0 0 30px rgba(245, 240, 232, 0.2);
          }
        `}</style>
        <div className="relative z-40 max-w-4xl text-center px-8">
          <div 
            ref={mantraHeadingRef}
            className="sanskrit-heading text-xl sm:text-2xl md:text-4xl lg:text-6xl max-w-5xl leading-relaxed mx-auto px-1 sm:px-2 mb-8"
            style={{
              fontFamily: "'Noto Serif Devanagari', 'Siddhanta', 'Uttara', 'Chandas', 'Sanskrit Text', 'Devanagari Sangam MN', serif",
              textAlign: "center",
              color: "#f5f0e8",
              lineHeight: "1.4",
              fontWeight: "400",
              letterSpacing: "0.05em"
            }}
          >
            ॐ नमो भगवते वासुदेवाय
          </div>
          
          <div 
            ref={mantraTextRef}
            className="sanskrit-text text-xl sm:text-2xl md:text-4xl lg:text-6xl leading-relaxed mx-auto px-1 sm:px-2"
            style={{
              fontFamily: "'Noto Serif Devanagari', 'Siddhanta', 'Uttara', 'Chandas', 'Sanskrit Text', 'Devanagari Sangam MN', serif",
              textAlign: "center",
              color: "#f5f0e8",
              lineHeight: "1.4",
              fontWeight: "400",
              letterSpacing: "0.05em",
              whiteSpace: "nowrap",
              maxWidth: "100vw",
              overflow: "visible"
            }}
          >
            ॐ नमः पार्वती पतये, हर-हर महादेव:
          </div>

          <div className="mt-10 sm:mt-12 md:mt-16 opacity-60">
            <div className="w-1 h-8 sm:h-10 md:h-12 bg-white mx-auto rounded-full animate-pulse"></div>
            <p className="text-xs sm:text-sm mt-3 sm:mt-4 text-gray-400">Scroll down to get in touch</p>
          </div>
        </div>
      </section>

      {/* Spacer to allow content to scroll above contact section */}
      <div className="h-screen" />

      {/* Loading Screen and Explosion Grid */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Bottom Navigation removed as requested */}
        </main>
      )}
    </>
  )
}