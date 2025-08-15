"use client"

import React from 'react'

interface VideoSectionsWrapperProps {
  children: React.ReactNode
}

export function VideoSectionsWrapper({ children }: VideoSectionsWrapperProps) {
  return (
    <div className="relative">
      {/* Single Background Video for both sections */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{zIndex: -1}}
      >
        <source src="/images/about_bg.mp4" type="video/mp4" />
      </video>
      
      {/* Both sections content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}