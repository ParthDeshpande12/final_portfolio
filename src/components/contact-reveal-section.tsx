"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa"
import { SiImdb } from "react-icons/si"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ContactRevealSectionProps {
  className?: string
  portraitImage?: string
}

const ContactRevealSection = ({ className = "", portraitImage = "/portrait.png" }: ContactRevealSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  // Removed unused isLoaded state

  // Framer Motion scroll hooks
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Smooth spring animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  })

  // Portrait zoom effect
  const portraitScale = useTransform(smoothProgress, [0, 1], [1.15, 1])

  // Mouse parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Mouse parallax - subtle
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      setMousePosition({
        x: (clientX - centerX) * 0.005,
        y: (clientY - centerY) * 0.005,
      })
    }

    document.addEventListener("mousemove", handleMouseMove)

    // GSAP Marquee animation with ScrollTrigger
    const initMarquee = () => {
      let direction = 1

      function roll(targets: string, vars: Record<string, unknown>, reverse?: boolean) {
        vars = vars || {}
        if (!vars.ease) {
          vars.ease = "none"
        }

        const tl = gsap.timeline({
          repeat: -1,
          onReverseComplete() {
            this.totalTime(this.rawTime() + this.duration() * 10)
          },
        })

        const elements = gsap.utils.toArray(targets) as HTMLElement[]
        const clones = elements.map((el) => {
          const clone = el.cloneNode(true) as HTMLElement
          el.parentNode?.appendChild(clone)
          return clone
        })

        const positionClones = () => {
          elements.forEach((el, i) => {
            gsap.set(clones[i], {
              position: "absolute",
              overwrite: false,
              top: el.offsetTop,
              left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth),
            })
          })
        }

        positionClones()
        elements.forEach((el, i) => {
          tl.to([el, clones[i]], { xPercent: reverse ? 100 : -100, ...vars }, 0)
        })

        window.addEventListener("resize", () => {
          const time = tl.totalTime()
          tl.totalTime(0)
          positionClones()
          tl.totalTime(time)
        })

        return tl
      }

      // Initialize marquee with very slow speed
      const rollTl = roll(".marquee_line", { duration: 180 })
      rollTl.timeScale(0.05)

      // ScrollTrigger for marquee based on this section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const velocity = self.getVelocity()

          // Direction based on scroll velocity
          const currentDirection = velocity > 0 ? 1 : -1

          if (currentDirection !== direction) {
            direction = currentDirection
            gsap.to(rollTl, {
              timeScale: direction * (0.05 + Math.abs(velocity) * 0.00001),
              duration: 0.8,
              ease: "power3.out",
              overwrite: true,
            })
          }

          // Speed based on scroll progress and velocity (very slow)
          const speedMultiplier = 0.05 + Math.abs(velocity) * 0.00001
          rollTl.timeScale(direction * speedMultiplier)
        },
      })

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }

    const cleanupMarquee = initMarquee()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      cleanupMarquee()
    }
  }, [])

  return (
    <section ref={sectionRef} className={`relative h-screen bg-white text-black overflow-hidden ${className}`}>
      {/* Portrait Background */}
      <motion.div
        className="absolute inset-0 z-20 flex items-end justify-center"
        style={{
          scale: portraitScale,
        }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${portraitImage}')`,
            backgroundSize: "auto 95%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
          }}
        />
      </motion.div>

      {/* GSAP Marquee - "Reach Out" - Behind the portrait */}
      <motion.div
        ref={marqueeRef}
        className="absolute inset-0 z-10 flex items-center overflow-hidden"
        style={{ transform: "translateY(calc(-15vh + 20px))" }}
      >
        <div
          className="marquee_line whitespace-nowrap select-none pointer-events-none will-change-transform"
          style={{
            fontSize: "clamp(6rem, 20vw, 32rem)",
            lineHeight: "0.8",
            letterSpacing: "0.05em",
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span className="text-gray-400/40 tracking-normal">
            Reach Out — Reach Out — Reach Out — Reach Out — Reach Out — Reach Out — Reach Out —
          </span>
        </div>
      </motion.div>

      {/* Contact Info - Bottom Left - Mobile Responsive */}
      <motion.div
        className="absolute bottom-8 sm:bottom-16 md:bottom-32 left-4 sm:left-8 md:left-16 z-30 max-w-xs sm:max-w-sm md:max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      >
        <div className="space-y-3 sm:space-y-4 md:space-y-5 text-black font-light">
          <div className="text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.10)]" style={{textShadow: '0 2px 16px rgba(0,0,0,0.18)', fontFamily: 'Poppins, Quicksand, Arial, sans-serif', fontWeight: 500, letterSpacing: '0.01em'}}>
            <span className="font-medium">Location: </span>
            <span className="text-black/70">Mumbai (W)</span>
          </div>
          <div className="text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.10)]" style={{textShadow: '0 2px 16px rgba(0,0,0,0.18)', fontFamily: 'Poppins, Quicksand, Arial, sans-serif', fontWeight: 500, letterSpacing: '0.01em'}}>
            <span className="font-medium">Email: </span>
            <span className="text-black/70 break-all sm:break-normal">officialsumanrana@gmail.com</span>
          </div>
          <div className="text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.10)]" style={{textShadow: '0 2px 16px rgba(0,0,0,0.18)', fontFamily: 'Poppins, Quicksand, Arial, sans-serif', fontWeight: 500, letterSpacing: '0.01em'}}>
            <span className="font-medium">Phone: </span>
            <span className="text-black/70">91 837 799 0420</span>
          </div>
        </div>

        {/* Social Icons - responsive grid */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 pt-4 sm:pt-6 md:pt-8 relative z-50">
          <a
            href="https://www.linkedin.com/in/sumanranaofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 text-black/60 hover:text-blue-700 transition-all duration-300 font-light focus:outline-none"
            tabIndex={0}
            style={{ pointerEvents: 'auto' }}
          >
            <FaLinkedin size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
            <span className="text-xs sm:text-sm md:text-base">LinkedIn</span>
          </a>
          <a
            href="https://www.youtube.com/@sumanranaofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 text-black/60 hover:text-red-600 transition-all duration-300 font-light focus:outline-none"
            tabIndex={0}
            style={{ pointerEvents: 'auto' }}
          >
            <FaYoutube size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
            <span className="text-xs sm:text-sm md:text-base">YouTube</span>
          </a>
          <a
            href="https://www.facebook.com/sumanranaofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 text-black/60 hover:text-blue-500 transition-all duration-300 font-light focus:outline-none"
            tabIndex={0}
            style={{ pointerEvents: 'auto' }}
          >
            <FaFacebook size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
            <span className="text-xs sm:text-sm md:text-base">Facebook</span>
          </a>
          <a
            href="https://www.instagram.com/sumanranaactor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 text-black/60 hover:text-pink-600 transition-all duration-300 font-light focus:outline-none"
            tabIndex={0}
            style={{ pointerEvents: 'auto' }}
          >
            <FaInstagram size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
            <span className="text-xs sm:text-sm md:text-base">Instagram</span>
          </a>
          {/* IMDB Button */}
          <a
            href="https://www.imdb.com/name/nm14409813/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 sm:gap-3 text-black/60 hover:text-yellow-500 transition-all duration-300 font-light focus:outline-none col-span-2 sm:col-span-1"
            tabIndex={0}
            style={{ pointerEvents: 'auto' }}
          >
            <SiImdb size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
            <span className="text-xs sm:text-sm md:text-base">IMDB</span>
          </a>
        </div>
      </motion.div>
    </section>
  )
}
export default ContactRevealSection
