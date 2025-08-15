"use client"
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface TextGlowProps {
  children: string
  className?: string
  delay?: number
  letterDelay?: number
}

export const TextGlow = ({ 
  children, 
  className = "", 
  delay = 0, 
  letterDelay = 0.05 
}: TextGlowProps) => {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (textRef.current) {
      // Split text into individual letters and wrap each in a span
      const text = children.trim()
      const letters = text.split('')
      
      const spanizedText = letters.map((letter, index) => {
        if (letter === ' ') {
          return ' '
        }
        return `<span style="animation-delay: ${delay + (index * letterDelay)}s">${letter}</span>`
      }).join('')
      
      textRef.current.innerHTML = spanizedText
    }
  }, [children, delay, letterDelay])

  return (
    <span 
      ref={textRef}
      className={cn("text-glow-container", className)}
    >
      {children}
    </span>
  )
}