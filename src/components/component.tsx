"use client"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { WavyBackground } from "@/components/ui/wavy-background"
// ...existing code...

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function UnfixedHero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const heroContainerRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)
  const boostSectionRef = useRef<HTMLDivElement>(null)
  const boostHeadingRef = useRef<HTMLHeadingElement>(null)
  const boostTextRef = useRef<HTMLParagraphElement>(null)
  const slicesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    setIsLoaded(true)

    if (typeof window !== "undefined" && heroContainerRef.current && heroSectionRef.current) {
      const ctx = gsap.context(() => {
        // Slice cover animation - covers the image over full 200vh
        const coverTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroContainerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            pin: heroSectionRef.current,
            // pinSpacing: true, // Use default (true) to push next section down
          },
        })

        // Animate slices from 0 to 102% height (covering the image)
        coverTl.to(slicesRef.current, {
          height: "102%",
          duration: 1,
          ease: "power2.inOut",
          stagger: {
            amount: 0.3,
            from: "start",
          },
        })

        // Background image zoom-out effect during slice animation
        coverTl.to(
          ".hero-background-image",
          {
            scale: 0.8,
            duration: 1,
            ease: "power2.inOut",
          },
          0,
        )

        // Spanize text immediately but control animation with GSAP
        if (boostHeadingRef.current && boostTextRef.current) {
          // Spanize the heading
          const headingText = "Namaste"
          const headingSpanHTML = headingText.split('').map((letter) => 
            `<span>${letter}</span>`
          ).join('')
          boostHeadingRef.current.innerHTML = headingSpanHTML
          
          // Spanize the description text
          const descText = "To the storytellers, visionaries, and creators, if you\nseek a performer who breathes life into every frame with depth, grace, and unwavering dedication, let's bring your vision to life, together.."
          const descSpanHTML = descText.split('').map((letter) => 
            letter === ' ' ? ' ' : letter === '\n' ? '<br>' : `<span>${letter}</span>`
          ).join('')
          boostTextRef.current.innerHTML = descSpanHTML

          // Set initial state - hide all spans
          const headingSpanElements = boostHeadingRef.current.querySelectorAll('span')
          const textSpanElements = boostTextRef.current.querySelectorAll('span')
          
          // Apply CSS animations similar to the reference code
          headingSpanElements.forEach((span, index) => {
            span.style.opacity = '0'
            span.style.textShadow = '0px 0px 1px rgba(255, 255, 255, 0.1)'
            span.style.animation = `letter-glow 0.7s ${index * 0.05}s ease both`
          })
          
          textSpanElements.forEach((span, index) => {
            span.style.opacity = '0'
            span.style.textShadow = '0px 0px 1px rgba(255, 255, 255, 0.1)'
            span.style.animation = `letter-glow 0.7s ${1.25 + (index * 0.05)}s ease both`
          })

          // Create scroll trigger to start animations when entering the section
          ScrollTrigger.create({
            trigger: boostSectionRef.current,
            start: "top 30%",
            toggleActions: "play none none none",
            once: true,
            onEnter: () => {
              // Trigger animations by adding class
              if (boostHeadingRef.current) {
                boostHeadingRef.current.classList.add('animate')
              }
              if (boostTextRef.current) {
                boostTextRef.current.classList.add('animate')
              }
            }
          })
        }
      }, heroContainerRef)

      return () => {
        ctx.revert()
      }
    }
  }, [isLoaded])

  if (!isLoaded) {
    return (
      <div className="h-[200vh] relative z-10" style={{backgroundColor: '#f5f0e8'}}>
        <div className="h-screen sticky top-0 overflow-hidden z-30 flex items-center justify-center" style={{backgroundColor: '#f5f0e8'}}>
          <div className="text-gray-700 text-xl opacity-60">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section with Image Animation */}
      <div ref={heroContainerRef} className="h-[200vh] relative z-10" style={{backgroundColor: '#f5f0e8'}}>
        <section ref={heroSectionRef} className="h-screen sticky top-0 overflow-hidden z-30" style={{backgroundColor: '#f5f0e8'}}>
          {/* Hero Image Container - Full viewport size */}
          <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
            {/* Background Image Container with zoom-out effect and slices */}
            <div
              className="hero-background-image relative w-full h-full"
              style={{
                transformOrigin: "center center",
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
                style={{
                  backgroundImage: `url('/images/hero.jpg')`,
                  filter: "brightness(0.8) contrast(1.1)",
                }}
              />
              
              {/* Slice Cover Effect */}
              <div className="absolute bottom-0 left-0 h-full w-full z-20 pointer-events-none">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      if (el) slicesRef.current[index] = el
                    }}
                    className="absolute h-0"
                    style={{
                      background: "#f5f0e8",
                      transformOrigin: "bottom",
                      left:
                        index === 0
                          ? "-1%"
                          : `${index * 25 - 1}%`,
                      width:
                        index === 0
                          ? "27%"
                          : index === 3
                            ? "28%"
                            : "27%",
                      bottom: "-1%",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* BOOST Section - Hindi Heading Morphing on Scroll */}
      <section 
        ref={boostSectionRef}
        className="min-h-screen text-gray-900 relative z-20 py-8 px-4 sm:px-6 md:px-12 lg:px-24 flex items-center"
        style={{backgroundColor: '#f5f0e8'}}
      >
        <WavyBackground
          backgroundFill="#f5f0e8"
          colors={["#e6d7c3", "#d4c4b0", "#c2b49d", "#b0a48a", "#9e9477"]}
          waveWidth={30}
          blur={8}
          speed="slow"
          waveOpacity={0.3}
          containerClassName="absolute inset-0"
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            {/* Letter glow animated heading */}
            <h1 
              ref={boostHeadingRef}
              className="mast__title text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black mb-10 sm:mb-14 md:mb-16 tracking-tight leading-none pb-4 break-words uppercase"
              style={{
                fontFamily: "Philosopher, serif",
                letterSpacing: "0.3em",
                textRendering: "optimizeLegibility",
                minHeight: "80px",
                color: "#4B2E19" // dark brown
              }}
            >
              Namaste
            </h1>
            
            {/* Letter glow animated text */}
            <p 
              ref={boostTextRef}
              className="mast__text text-base sm:text-lg md:text-2xl lg:text-4xl max-w-5xl leading-relaxed mx-auto px-1 sm:px-2"
              style={{
                fontFamily: "MontserratAlternates, Philosopher, serif",
                textAlign: "center",
                lineHeight: "1.6",
                wordSpacing: "0.1em",
                hyphens: "none",
                wordBreak: "keep-all",
                whiteSpace: "normal",
                overflowWrap: "normal",
                color: "#A47551" // hazelnut brown
              }}
            >
              To the storytellers, visionaries, and creators, if you
seek a performer who breathes life into every frame with depth, grace, and unwavering dedication, let&apos;s bring your vision to life, together..
            </p>

            {/* Scroll indicator */}
            <div className="mt-10 sm:mt-12 md:mt-16 opacity-60">
              <div className="w-1 h-8 sm:h-10 md:h-12 bg-white mx-auto rounded-full animate-pulse"></div>
              <p className="text-xs sm:text-sm mt-3 sm:mt-4 text-gray-400">Scroll to see the magic</p>
            </div>
          </div>
        </div>
      </section>


      {/* Horizontal scroll removed as requested */}
    </>
  )
}