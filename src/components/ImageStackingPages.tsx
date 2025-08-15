"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ImageStackingPages() {
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const sectionPinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinWrap = pinWrapRef.current;
    const sectionPin = sectionPinRef.current;

    if (!pinWrap || !sectionPin) return;

    const pinWrapWidth = pinWrap.scrollWidth;
    const horizontalScrollLength = pinWrapWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionPin,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${horizontalScrollLength}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      tl.to(pinWrap, {
        x: -horizontalScrollLength,
        ease: "none",
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
        background: "var(--text-color, #111)",
        color: "var(--bg-color, #b9b3a9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        isolation: "isolate",
      }}
    >
      <div
        ref={pinWrapRef}
        className="pin-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          padding: "50px 10vw",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            maxWidth: "400px",
            minWidth: "60vw",
            padding: "0 5vw",
            flexShrink: 0,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </h2>
        <Image
          src="/images/a.png"
          alt="Portfolio Image A"
          width={800}
          height={1200}
          style={{
            height: "80vh",
            width: "auto",
            objectFit: "cover",
            minWidth: "300px",
            borderRadius: "2em",
            boxShadow: "0 4px 24px 0 rgba(36, 33, 36, 0.08)",
          }}
        />
        <Image
          src="/images/b.png"
          alt="Portfolio Image B"
          width={800}
          height={1200}
          style={{
            height: "80vh",
            width: "auto",
            objectFit: "cover",
            minWidth: "300px",
            borderRadius: "2em",
            boxShadow: "0 4px 24px 0 rgba(36, 33, 36, 0.08)",
          }}
        />
        <Image
          src="/images/c.png"
          alt="Portfolio Image C"
          width={800}
          height={1200}
          style={{
            height: "80vh",
            width: "auto",
            objectFit: "cover",
            minWidth: "300px",
            borderRadius: "2em",
            boxShadow: "0 4px 24px 0 rgba(36, 33, 36, 0.08)",
          }}
        />
      </div>
    </section>
  );
}