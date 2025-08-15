// src/app/actress-bio/page.tsx
"use client";
import { useEffect } from 'react';
import ActressBio from '@/components/actress-bio';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function ActressBioPage() {
  useEffect(() => {
    // Remove any floating bio/work buttons if present
    const bioBtn = document.getElementById('bio-btn');
    const workBtn = document.getElementById('work-btn');
    if (bioBtn) bioBtn.style.display = 'none';
    if (workBtn) workBtn.style.display = 'none';
    // Add a class to body for CSS fallback
    document.body.classList.add('on-actress-bio-page');
    return () => {
      document.body.classList.remove('on-actress-bio-page');
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative" style={{ overflow: 'visible' }}>
      <style>{`
        body.on-actress-bio-page #bio-btn, body.on-actress-bio-page #work-btn { display: none !important; }
      `}</style>
      <motion.button
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -60, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onClick={() => {
          window.location.href = '/#main';
        }}
        className="fixed top-12 sm:top-16 left-3 sm:left-6 z-50 flex items-center gap-1 sm:gap-2 bg-black/70 hover:bg-black/90 border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg backdrop-blur-md cursor-pointer"
        type="button"
        aria-label="Return to Main Page"
      >
        <ArrowLeft size={18} className="sm:w-[22px] sm:h-[22px]" />
        <span className="font-semibold text-sm sm:text-base">Back</span>
      </motion.button>
      <ActressBio />
    </div>
  );
}