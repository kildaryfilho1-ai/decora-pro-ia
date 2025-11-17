'use client';

import { useState } from 'react';
import { Wand2, Camera, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Wand2,
    title: 'IA Avançada',
    description: 'Nossa inteligência artificial analisa seu ambiente e sugere decorações personalizadas',
  },
  {
    icon: Camera,
    title: 'Tire uma foto',
    description: 'Capture seu ambiente atual e veja como ficaria com diferentes estilos de decoração',
  },
  {
    icon: Sparkles,
    title: 'Resultado instantâneo',
    description: 'Visualize seu espaço transformado em segundos e baixe o resultado',
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-6 sm:p-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-xl w-full">
        <div className="relative mb-12">
          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center">
            <CurrentIcon className="w-14 h-14 sm:w-16 sm:h-16 text-[#D4AF37]" />
          </div>
          <div className="absolute inset-0 bg-[#D4AF37] blur-3xl opacity-20" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
          {slides[currentSlide].title}
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed px-4">
          {slides[currentSlide].description}
        </p>
      </div>

      <div className="w-full max-w-xl">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-[#D4AF37]' : 'w-1.5 bg-gray-600'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          {currentSlide > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/10 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
          >
            {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
