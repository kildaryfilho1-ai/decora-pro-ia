'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Check } from 'lucide-react';

interface QuizScreenProps {
  onComplete: (preferences: Record<string, string>) => void;
}

const questions = [
  {
    id: 'room',
    question: 'Qual ambiente você quer transformar?',
    subtitle: 'Escolha o espaço que deseja decorar',
    options: [
      { value: 'Sala de Estar', icon: '🛋️', description: 'Conforto e convivência' },
      { value: 'Quarto', icon: '🛏️', description: 'Descanso e relaxamento' },
      { value: 'Cozinha', icon: '🍳', description: 'Funcionalidade e estilo' },
      { value: 'Escritório', icon: '💼', description: 'Produtividade e foco' },
      { value: 'Banheiro', icon: '🚿', description: 'Bem-estar e spa' },
      { value: 'Área Externa', icon: '🌳', description: 'Lazer e natureza' },
    ],
  },
  {
    id: 'purpose',
    question: 'Qual o objetivo deste espaço?',
    subtitle: 'Entender o uso nos ajuda a criar o ambiente perfeito',
    options: [
      { value: 'Trabalho', icon: '💻', description: 'Home office e produtividade' },
      { value: 'Família', icon: '👨‍👩‍👧‍👦', description: 'Convivência e momentos juntos' },
      { value: 'Filho/Criança', icon: '🧸', description: 'Espaço lúdico e seguro' },
      { value: 'Relaxamento', icon: '🧘', description: 'Descanso e bem-estar' },
      { value: 'Entretenimento', icon: '🎮', description: 'Diversão e lazer' },
      { value: 'Estudo', icon: '📚', description: 'Concentração e aprendizado' },
    ],
  },
  {
    id: 'style',
    question: 'Qual estilo combina com você?',
    subtitle: 'Seu ambiente deve refletir sua personalidade',
    options: [
      { value: 'Moderno', icon: '✨', description: 'Linhas limpas e contemporâneo' },
      { value: 'Clássico', icon: '🏛️', description: 'Elegância atemporal' },
      { value: 'Minimalista', icon: '⚪', description: 'Menos é mais' },
      { value: 'Industrial', icon: '🏭', description: 'Urbano e autêntico' },
      { value: 'Escandinavo', icon: '🌲', description: 'Aconchego nórdico' },
      { value: 'Boho', icon: '🌺', description: 'Livre e criativo' },
    ],
  },
  {
    id: 'colors',
    question: 'Quais cores te inspiram?',
    subtitle: 'As cores definem o clima do ambiente',
    options: [
      { value: 'Neutras', icon: '⚪', description: 'Branco, bege, cinza' },
      { value: 'Vibrantes', icon: '🌈', description: 'Cores vivas e energéticas' },
      { value: 'Pastéis', icon: '🎨', description: 'Suaves e delicadas' },
      { value: 'Escuras', icon: '⚫', description: 'Sofisticadas e dramáticas' },
      { value: 'Naturais', icon: '🌿', description: 'Tons terrosos e orgânicos' },
      { value: 'Monocromáticas', icon: '◻️', description: 'Um tom, várias nuances' },
    ],
  },
  {
    id: 'furniture',
    question: 'Que tipo de móveis você prefere?',
    subtitle: 'Vamos escolher peças que façam sentido para você',
    options: [
      { value: 'Multifuncionais', icon: '🔄', description: 'Versáteis e práticos' },
      { value: 'Confortáveis', icon: '☁️', description: 'Macios e acolhedores' },
      { value: 'Compactos', icon: '📦', description: 'Otimizam o espaço' },
      { value: 'Elegantes', icon: '💎', description: 'Sofisticados e refinados' },
      { value: 'Modernos', icon: '🎯', description: 'Design contemporâneo' },
    ],
  },
  {
    id: 'mood',
    question: 'Que sensação você busca?',
    subtitle: 'O ambiente deve transmitir a energia certa',
    options: [
      { value: 'Relaxante', icon: '🧘', description: 'Calma e tranquilidade' },
      { value: 'Energizante', icon: '⚡', description: 'Vitalidade e motivação' },
      { value: 'Acolhedor', icon: '🤗', description: 'Conforto e aconchego' },
      { value: 'Sofisticado', icon: '🎩', description: 'Elegância e requinte' },
      { value: 'Criativo', icon: '🎨', description: 'Inspiração e inovação' },
    ],
  },
  {
    id: 'priority',
    question: 'O que é mais importante para você?',
    subtitle: 'Vamos priorizar o que realmente importa',
    options: [
      { value: 'Funcionalidade', icon: '🔧', description: 'Praticidade no dia a dia' },
      { value: 'Estética', icon: '🎭', description: 'Visual impecável' },
      { value: 'Conforto', icon: '☁️', description: 'Bem-estar acima de tudo' },
      { value: 'Sustentabilidade', icon: '♻️', description: 'Materiais ecológicos' },
      { value: 'Tecnologia', icon: '📱', description: 'Automação e inovação' },
    ],
  },
  {
    id: 'budget',
    question: 'Qual seu investimento ideal?',
    subtitle: 'Vamos criar algo incrível dentro do seu orçamento',
    options: [
      { value: 'Econômico', icon: '💰', description: 'Até R$ 5.000 - Soluções criativas' },
      { value: 'Moderado', icon: '💵', description: 'R$ 5.000 - R$ 15.000' },
      { value: 'Premium', icon: '💎', description: 'R$ 15.000 - R$ 30.000' },
      { value: 'Luxo', icon: '👑', description: 'Acima de R$ 30.000' },
    ],
  },
  {
    id: 'lighting',
    question: 'Como é a iluminação natural?',
    subtitle: 'Isso nos ajuda a escolher cores e materiais ideais',
    options: [
      { value: 'Muita luz natural', icon: '☀️', description: 'Janelas grandes, sol direto' },
      { value: 'Luz moderada', icon: '🌤️', description: 'Iluminação equilibrada' },
      { value: 'Pouca luz natural', icon: '🌙', description: 'Ambiente mais fechado' },
    ],
  },
  {
    id: 'size',
    question: 'Qual o tamanho do ambiente?',
    subtitle: 'Opcional - nos ajuda a criar um projeto mais preciso',
    optional: true,
    options: [
      { value: 'Pequeno', icon: '📐', description: 'Até 15m²' },
      { value: 'Médio', icon: '📏', description: '15m² - 30m²' },
      { value: 'Grande', icon: '📊', description: '30m² - 50m²' },
      { value: 'Muito Grande', icon: '🏢', description: 'Acima de 50m²' },
      { value: 'Pular', icon: '⏭️', description: 'Continuar sem informar' },
    ],
  },
];

export default function QuizScreen({ onComplete }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedOption(answer);
    
    setTimeout(() => {
      const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Remove "Pular" se foi selecionado no tamanho
        const finalAnswers = { ...newAnswers };
        if (finalAnswers.size === 'Pular') {
          delete finalAnswers.size;
        }
        onComplete(finalAnswers);
      }
    }, 400);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
              <span className="text-xs sm:text-sm font-medium text-white">
                {currentQ.optional ? 'Opcional' : `Pergunta ${currentQuestion + 1} de ${questions.length}`}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#D4AF37]">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] transition-all duration-700 ease-out shadow-lg shadow-[#D4AF37]/50"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-24 sm:py-28">
        <div className="max-w-5xl mx-auto w-full">
          {/* Question Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white leading-tight px-4">
              {currentQ.question}
            </h2>
            <p className="text-base sm:text-lg text-gray-400 px-4">{currentQ.subtitle}</p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedOption === option.value;
              const wasAnswered = answers[currentQ.id] === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`group relative p-6 sm:p-7 rounded-2xl border-2 transition-all duration-500 text-left overflow-hidden
                    ${isSelected 
                      ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/20 border-[#D4AF37] scale-[1.03] sm:scale-105 shadow-2xl shadow-[#D4AF37]/30' 
                      : wasAnswered
                      ? 'bg-white/5 border-[#D4AF37]/50'
                      : 'bg-white/5 border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 hover:scale-[1.02] sm:hover:scale-105'
                    }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'slideUp 0.5s ease-out forwards',
                  }}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#FFD700]/0 transition-all duration-500 pointer-events-none
                    ${isSelected ? 'from-[#D4AF37]/20 to-[#FFD700]/20' : 'group-hover:from-[#D4AF37]/10 group-hover:to-[#FFD700]/10'}`} 
                  />

                  {/* Check Icon */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center shadow-lg animate-scale-in z-10">
                      <Check className="w-5 h-5 sm:w-5 sm:h-5 text-black" strokeWidth={3} />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="relative text-4xl sm:text-5xl mb-3 sm:mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {option.icon}
                  </div>

                  {/* Title */}
                  <h3 className="relative text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {option.value}
                  </h3>

                  {/* Description */}
                  <p className="relative text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          {currentQuestion > 0 && (
            <div className="flex justify-center px-4 animate-fade-in">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">Voltar</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0) rotate(-180deg);
          }
          to {
            transform: scale(1) rotate(0deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
