"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScrollImages() {
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const sectionPinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinWrap = pinWrapRef.current;
    const sectionPin = sectionPinRef.current;
    if (!pinWrap || !sectionPin) return;
    const pinWrapWidth = pinWrap.scrollWidth;
    const horizontalScrollLength = pinWrapWidth - window.innerWidth;

    const tween = gsap.to(pinWrap, {
      x: -horizontalScrollLength,
      ease: "none",
      scrollTrigger: {
        trigger: sectionPin,
        pin: true,
        scrub: true,
        start: "top top",
        end: () => `+=${pinWrapWidth}`,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={sectionPinRef} style={{ width: "100vw", height: "100vh", overflow: "hidden", display: "flex" }}>
      <div ref={pinWrapRef} className="pin-wrap" style={{ height: "100vh", display: "flex", alignItems: "center", padding: "50px 10vw" }}>
        <h2 style={{ fontSize: "2rem", maxWidth: 400, minWidth: "60vw", padding: "0 5vw" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h2>
        <Image 
          src="/images/1.jpg" 
          alt="Portfolio image 1" 
          width={800} 
          height={1200}
          style={{ height: "80vh", width: "auto", objectFit: "cover", minWidth: "60vw", padding: "0 5vw" }} 
        />
        <Image 
          src="/images/2.jpg" 
          alt="Portfolio image 2" 
          width={800} 
          height={1200}
          style={{ height: "80vh", width: "auto", objectFit: "cover", minWidth: "60vw", padding: "0 5vw" }} 
        />
        <Image 
          src="/images/3.jpg" 
          alt="Portfolio image 3" 
          width={800} 
          height={1200}
          style={{ height: "80vh", width: "auto", objectFit: "cover", minWidth: "60vw", padding: "0 5vw" }} 
        />
      </div>
    </div>
  );
}
