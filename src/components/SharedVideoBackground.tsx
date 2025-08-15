"use client"

import React from 'react'

interface SharedVideoBackgroundProps {
  children: React.ReactNode
  className?: string
}

export function SharedVideoBackground({ children, className = "" }: SharedVideoBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{minHeight: '100vh'}}>
      {/* Absolute Background Video - only covers this container */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{zIndex: 1, backgroundColor: '#ff0000'}}
        onError={(e) => console.error('Video error:', e)}
        onLoadStart={() => console.log('Video loading started')}
        onCanPlay={() => console.log('Video can play')}
      >
        <source src="/images/about_bg.mp4" type="video/mp4" />
      </video>
      
      {/* Content */}
      <div className="relative" style={{zIndex: 10}}>
        {children}
      </div>
    </div>
  )
}