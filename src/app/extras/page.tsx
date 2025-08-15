'use client';

import { useEffect, useState } from 'react';

export default function ExtraPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">Page Not Found</p>
        <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 leading-relaxed">The page you&apos;re looking for doesn&apos;t exist.</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded cursor-pointer text-sm sm:text-base transition-colors duration-200"
          type="button"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}