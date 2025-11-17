'use client';

import { Sparkles } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="relative inline-block">
          <Sparkles className="w-20 h-20 text-[#D4AF37] mb-6 animate-pulse" />
          <div className="absolute inset-0 bg-[#D4AF37] blur-3xl opacity-30 animate-pulse" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-[#D4AF37] tracking-tight animate-shimmer bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-[length:200%_100%] bg-clip-text text-transparent">
          DecoraX Pro
        </h1>
        <p className="text-gray-400 mt-4 text-sm tracking-widest">DESIGN INTELIGENTE</p>
      </div>
    </div>
  );
}
