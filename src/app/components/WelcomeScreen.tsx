'use client';

import { Home, ArrowRight, User } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onClientArea?: () => void;
}

export default function WelcomeScreen({ onStart, onClientArea }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-between p-6 sm:p-8">
      {/* Botão Área do Cliente no topo */}
      {onClientArea && (
        <div className="w-full max-w-2xl flex justify-end">
          <button
            onClick={onClientArea}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Área do Cliente</span>
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl">
        <div className="relative mb-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-3xl flex items-center justify-center shadow-2xl">
            <Home className="w-16 h-16 sm:w-20 sm:h-20 text-black" />
          </div>
          <div className="absolute inset-0 bg-[#D4AF37] blur-3xl opacity-20 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
          Transforme seu espaço
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 mb-8 leading-relaxed">
          Decore ambientes com inteligência artificial e veja o resultado antes de investir
        </p>

        <button
          onClick={onStart}
          className="group relative px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white font-medium text-lg transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl flex items-center gap-3"
        >
          Começar agora
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      <div className="flex gap-2 mt-8">
        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
        <div className="w-2 h-2 rounded-full bg-gray-600" />
        <div className="w-2 h-2 rounded-full bg-gray-600" />
      </div>
    </div>
  );
}
