"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IntroImages() {
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const sectionPinRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const sushriRef = useRef<HTMLDivElement>(null);
  const sumanRef = useRef<HTMLDivElement>(null);
  const ranaRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const pinWrap = pinWrapRef.current;
    const sectionPin = sectionPinRef.current;
    
    if (!pinWrap || !sectionPin) return;

    // Calculate the scroll distance to show all three images properly  
    const pinWrapWidth = pinWrap.scrollWidth;
    const horizontalScrollLength = pinWrapWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Set initial states for text elements - simple fade in
      gsap.set([sushriRef.current, sumanRef.current, ranaRef.current], {
        opacity: 0,
        y: 20
      });

      gsap.set(subtitleRef.current, {
        opacity: 0,
        y: 15
      });

      // Simple, elegant text reveal animation (no glow effect)
      const textRevealTl = gsap.timeline({
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: "left center",
          end: "right center",
          scrub: false,
          toggleActions: "play none none reverse"
        }
      });

      // Clean, subtle staggered reveal
      textRevealTl
        .to(sushriRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        })
        .to(sumanRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6")
        .to(ranaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6")
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");

      // Horizontal scroll animation
      const horizontalTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionPin,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${pinWrapWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      horizontalTl.to(pinWrap, {
        x: -horizontalScrollLength,
        ease: "none"
      });

    }, sectionPin);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="sectionPin"
      ref={sectionPinRef}
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        background: "#111",
        color: "#b9b3a9",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        isolation: "isolate", // Contain the effect
      }}
    >
      <div
        ref={pinWrapRef}
        className="pin-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          padding: "0 5vw",
          gap: "5vw",
          minWidth: "350vw",
        }}
      >
        <div
          ref={textContainerRef}
          style={{
            maxWidth: "500px",
            minWidth: "60vw",
            padding: "0 5vw",
            flexShrink: 0,
            lineHeight: 1.4,
            position: "relative",
            overflow: "visible",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "auto"
          }}
        >
          <div
            style={{
              fontSize: "7.2rem",
              fontWeight: "300",
              letterSpacing: "0.1em",
              marginBottom: "2.4rem",
              color: "#f5f0e8",
              fontFamily: "'Noto Serif Devanagari', 'Siddhanta', 'Uttara', serif",
              position: "relative",
              lineHeight: "1.1",
              whiteSpace: "nowrap",
              wordBreak: "keep-all",
              maxWidth: "100%"
            }}
          >
            <div 
              ref={sushriRef}
              style={{ 
                display: "block", 
                fontSize: "4.8rem", 
                color: "#b9b3a9", 
                marginBottom: "0.5rem",
                position: "relative",
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
              }}
            >
              सुश्री
            </div>
            <div 
              ref={sumanRef}
              style={{ 
                display: "block",
                position: "relative",
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
              }}
            >
              Suman
            </div>
            <div 
              ref={ranaRef}
              style={{ 
                display: "block", 
                color: "#b9b3a9",
                position: "relative",
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))"
              }}
            >
              Rana
            </div>
          </div>
          <p
            ref={subtitleRef}
            style={{
              fontSize: "2.88rem",
              fontWeight: "300",
              color: "#b9b3a9",
              letterSpacing: "0.05em",
              fontFamily: "'Noto Serif Devanagari', 'Siddhanta', 'Uttara', serif",
              position: "relative",
              filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.25))",
              textAlign: "justify",
              textJustify: "inter-word",
              lineHeight: "1.2",
              wordSpacing: "normal",
              whiteSpace: "nowrap",
              wordBreak: "keep-all",
              maxWidth: "100%"
            }}
          >
            Actor . Doctor . Entrepreneur
          </p>
        </div>
        <Image
          src="/images/1.jpg"
          alt="Portfolio Image 1"
          width={800}
          height={1200}
          style={{
            height: "80vh",
            width: "auto",
            objectFit: "cover",
            minWidth: "60vw",
            padding: "0 5vw",
            flexShrink: 0,
          }}
        />
        <Image
          src="/images/2.jpg"
          alt="Portfolio Image 2"
          width={800}
          height={1200}
          style={{
            height: "80vh",
            width: "auto",
            objectFit: "cover",
            minWidth: "60vw",
            padding: "0 5vw",
            flexShrink: 0,
          }}
        />
        <Image
          src="/images/3.jpg"
          alt="Portfolio Image 3"
          width={800}
          height={1200}
          style={{
            height: "80vh",
            width: "auto",
            objectFit: "cover",
            minWidth: "60vw",
            padding: "0 5vw",
            flexShrink: 0,
          }}
        />
      </div>
    </section>
  );
}
