"use client"

import type React from "react"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

export default function AboutMe() {
  // Ref for the image container
  const imageRef = useRef<HTMLDivElement>(null)
  // Framer Motion scroll/zoom logic
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  })
  // Scale from 1 to 1.08 as you scroll through the section
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section className="text-gray-900 relative" style={{backgroundColor: 'transparent'}} id="aboutme-section">
      {/* Header Section */}
      <motion.div
        className="text-center py-8 sm:py-12 md:py-16 px-4 sm:px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-xs sm:text-sm font-light tracking-wider mb-2 sm:mb-4"
            style={{color: '#826644'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Origin-Focused
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 sm:mb-6"
            style={{color: '#321414'}}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            DISCOVER MY JOURNEY
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg font-light tracking-wide"
            style={{color: '#826644'}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            [ FROM MEDICAL INNOVATION TO CREATIVE MASTERY - A JOURNEY OF SIGNIFICANCE  ]
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 grid-cols-1 items-start">
          {/* Left Column - Image Section (Sticky, With Motion) */}
          <div className="pt-8 sm:pt-16 mb-8 lg:mb-0 lg:sticky lg:top-8 self-start max-w-md w-full mx-auto lg:mx-0">
            <section className="image-section">
              <div className="relative" ref={imageRef}>
                <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-[9/16] w-full max-w-md">
                  {/* Background album covers (z-0) */}
                  <div className="absolute -top-3 sm:-top-6 -left-2 sm:-left-4 w-20 sm:w-28 h-32 sm:h-48 bg-gray-300 rounded-lg transform -rotate-12 opacity-60 z-0"></div>
                  <div className="absolute -bottom-3 sm:-bottom-6 -right-2 sm:-right-4 w-16 sm:w-24 h-28 sm:h-44 bg-gray-400 rounded-lg transform rotate-6 opacity-40 z-0"></div>
                  {/* Main album cover replaced with c.png, with zoom effect, inside the border */}
                  <div className="absolute inset-2 sm:inset-4 rounded-lg overflow-hidden z-10">
                    <motion.div
                      style={{ scale }}
                      className="w-full h-full will-change-transform"
                    >
                      <Image src="/images/c.png" alt="About Me" fill className="object-cover rounded-lg" />
                    </motion.div>
                    {/* White border frame above the zooming image */}
                    <div className="absolute inset-0 rounded-lg pointer-events-none border-2 border-white/30 shadow-xl z-20"></div>
                  </div>
                </div>
              </div>
              {/* Add redirect button below the image */}
              <div className="pt-4 sm:pt-6 flex justify-center">
                <Link href="/actress-bio">
                  <button
                    className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-xl border backdrop-blur-md font-semibold shadow-md transition-all duration-300"
                    style={{
                      borderColor: '#a9a9a9', 
                      backgroundColor: 'rgba(169, 169, 169, 0.1)', 
                      color: '#242124',
                      boxShadow: "0 4px 24px 0 rgba(36, 33, 36, 0.08)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(169, 169, 169, 0.2)';
                      e.currentTarget.style.borderColor = '#242124';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(169, 169, 169, 0.1)';
                      e.currentTarget.style.borderColor = '#a9a9a9';
                    }}
                  >
                    View Bio
                  </button>
                </Link>
              </div>
            </section>
          </div>

          {/* Right Column - Content Sections (Scrollable) */}
          <section className="content-sections">
            {/* Section 01 - Planning */}
            <ContentSection
              sectionNumber="01"
              title={<span className="font-extrabold" style={{color: '#321414'}}>Medical Excellence and Academic Leadership</span>}
              description={
                <>
                  <span className="block text-lg font-semibold mb-2" style={{color: '#321414'}}>Born in the serene landscapes of <span className="font-bold" style={{color: '#826644'}}>Kishtwar, Jammu & Kashmir</span>, Suman Rana is a rare fusion of intellect, artistry, and unwavering determination.</span>
                  <span className="block mb-2" style={{color: '#826644'}}>Her journey began in the realm of medicine, where she earned a <span className="font-bold" style={{color: '#321414'}}>Ph.D. in Health Management (Obstetrics & Gynaecology)</span> and certifications in <span className="font-bold" style={{color: '#321414'}}>Advanced Cardiovascular Life Support (ACLS)</span> and <span className="font-bold" style={{color: '#321414'}}>Basic Life Support (BLS)</span>.</span>
                  <span className="block mb-2" style={{color: '#826644'}}>As a <span className="font-bold" style={{color: '#321414'}}>board member of LIPS Research University Paris, Europe</span> and a visiting consultant at <span className="font-bold" style={{color: '#321414'}}>MAX Hospital, Delhi</span>, and other leading hospitals in Mumbai, she remains deeply committed to research, innovation, and the pursuit of excellence.</span>
                  <div className="my-4">
                    <blockquote className="border-l-4 pl-4 italic font-medium py-2 rounded-md" style={{borderColor: '#321414', color: '#826644', backgroundColor: 'rgba(130, 102, 68, 0.1)'}}>
                      With a mind sharpened by intellect and a soul fuelled by purpose, she walks a path where artistry, innovation, and service converge. Relentless in her pursuit of mastery, she seeks not just success, but significance, each endeavor a reflection of her unwavering commitment to excellence.
                    </blockquote>
                  </div>
                  <span className="block mt-2" style={{color: '#826644'}}>A <span className="font-bold" style={{color: '#321414'}}>patriot at heart</span>, she dreams of earning the <span className="font-bold" style={{color: '#321414'}}>Bharat Ratna</span>, not as an accolade, but as a tribute to a life devoted to elevating her nation and inspiring generations to come.</span>
                </>
              }
              bulletPoints={[]}
              decorativeElement={
                <div className="w-14 h-14 border-2 rounded-full flex items-center justify-center shadow-lg" style={{borderColor: '#242124', backgroundColor: 'rgba(169, 169, 169, 0.2)', boxShadow: '0 10px 15px -3px rgba(36, 33, 36, 0.2)'}}>
                  <div className="w-7 h-7 border-l-2 border-t-2 transform rotate-45" style={{borderColor: '#a9a9a9'}}></div>
                </div>
              }
            />

            {/* Section 02 - Concept & Strategy */}
            <ContentSection
              sectionNumber="02"
              title={<span className="font-extrabold" style={{color: '#321414'}}>Creative Pursuits and Artistic Mastery</span>}
              description={
                <>
                  <span className="block text-lg font-semibold mb-2" style={{color: '#321414'}}>Beyond the world of medicine, her soul finds its rhythm in creativity and storytelling.</span>
                  <span className="block mb-2" style={{color: '#826644'}}>She has explored diverse artistic realms, earning a <span className="font-bold" style={{color: '#321414'}}>Para Activities, Advanced Cabin Crew Diploma</span> and immersing herself in dance, makeup, fashion design, writing, fitness, spirituality, and student of mixed martial arts (MMA).</span>
                  <span className="block mb-2" style={{color: '#826644'}}>Her passion for cinema extends beyond the screen, she has worked behind the lens, assisting film directors and refining her understanding of the art form.</span>
                </>
              }
              bulletPoints={[]}
              decorativeElement={
                <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg" style={{backgroundColor: '#242124', borderColor: '#a9a9a9', boxShadow: '0 10px 15px -3px rgba(36, 33, 36, 0.2)'}}>
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{
                      background:
                        "repeating-linear-gradient(45deg, #a9a9a9 0px, #a9a9a9 2px, transparent 2px, transparent 4px)",
                    }}
                  ></div>
                </div>
              }
              hasBorder
            />

            {/* Section 03 - Design Onboarding */}
            <ContentSection
              sectionNumber="03"
              title={<span className="font-extrabold" style={{color: '#321414'}}>Entertainment Industry and Brand Collaborations</span>}
              description={
                <>
                  <span className="block text-lg font-semibold mb-2" style={{color: '#321414'}}>Her versatility and captivating presence have made her a sought-after actor, model, and brand ambassador.</span>
                  <span className="block mb-2" style={{color: '#826644'}}>She has collaborated with renowned national and global brands, gracing films, music videos, digital campaigns, and print media with an effortless blend of professionalism and authenticity.</span>
                  <span className="block mb-2" style={{color: '#826644'}}>Whether embodying a character on screen or representing a brand, she brings depth, elegance, and an undeniable impact to every project she undertakes.</span>
                </>
              }
              bulletPoints={[]}
              decorativeElement={
                <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg" style={{backgroundColor: '#242124', borderColor: '#a9a9a9', boxShadow: '0 10px 15px -3px rgba(36, 33, 36, 0.2)'}}>
                  <div className="w-8 h-8 flex items-center justify-center">
                    <div className="w-6 h-6 relative">
                      <div className="absolute inset-0 rounded-full" style={{backgroundColor: '#a9a9a9'}}></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                        <div className="w-full h-0.5 bg-white absolute top-1/2 left-0 transform -translate-y-1/2"></div>
                        <div className="w-0.5 h-full bg-white absolute left-1/2 top-0 transform -translate-x-1/2"></div>
                        <div className="w-full h-0.5 bg-white absolute top-1/2 left-0 transform -translate-y-1/2 rotate-45 origin-center"></div>
                        <div className="w-full h-0.5 bg-white absolute top-1/2 left-0 transform -translate-y-1/2 -rotate-45 origin-center"></div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              hasBorder
            />
          </section>
        </div>
      </div>
    </section>
  )
}

// Content Section Component with Only Top-Right Icon
interface ContentSectionProps {
  sectionNumber: string
  title: React.ReactNode // Allow JSX
  description: React.ReactNode // Allow JSX
  bulletPoints: string[]
  decorativeElement: React.ReactNode
  hasBorder?: boolean
}

function ContentSection({
  sectionNumber,
  title,
  description,
  bulletPoints,
  decorativeElement,
  hasBorder = false,
}: ContentSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={`relative space-y-6 sm:space-y-8 py-6 sm:py-8 ${hasBorder ? "border-t pt-10 sm:pt-16" : ""}`}
      style={hasBorder ? {borderTopColor: 'rgba(169, 169, 169, 0.3)'} : {}}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Top Right Icon Only */}
      <div className="absolute top-8 right-0">{decorativeElement}</div>

      <div className="flex items-start space-x-6">
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="text-sm font-light" style={{color: '#826644'}}>[ {sectionNumber} ]</span>
        </motion.div>
        <div className="space-y-4 sm:space-y-6 pr-8 sm:pr-12 lg:pr-16">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {title}
          </motion.h2>

          {/* Render description directly, not inside <p> */}
          <motion.div
            className="text-sm sm:text-base md:text-lg leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {description}
          </motion.div>

          <motion.div
            className="space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {bulletPoints.map((point, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              >
                - {point}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
