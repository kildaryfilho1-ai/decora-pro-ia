'use client';

import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Star, 
  Shield, 
  Zap,
  Award,
  Play,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function VendasPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: 'IA Avançada',
      description: 'Tecnologia de ponta que entende seu estilo e transforma seu espaço'
    },
    {
      icon: Zap,
      title: 'Resultado Instantâneo',
      description: 'Veja seu ambiente decorado em segundos, não em semanas'
    },
    {
      icon: Shield,
      title: '100% Seguro',
      description: 'Suas fotos são processadas com total privacidade e segurança'
    },
    {
      icon: Award,
      title: 'Qualidade Premium',
      description: 'Sugestões de produtos de marcas renomadas do mercado'
    }
  ];

  const plans = [
    {
      name: 'Básico',
      price: '19,90',
      period: '/mês',
      features: [
        '3 projetos por mês',
        'IA básica de decoração',
        'Biblioteca de estilos',
        'Suporte por email',
        'Resolução padrão'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '49,90',
      period: '/mês',
      features: [
        '15 projetos por mês',
        'IA avançada premium',
        'Todos os estilos disponíveis',
        'Lista de produtos com preços',
        'Suporte prioritário',
        'Exportação em alta resolução',
        'Sem marca d\'água'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '99,90',
      period: '/mês',
      features: [
        'Projetos ilimitados',
        'IA ultra premium',
        'Estilos exclusivos',
        'Lista completa de produtos',
        'Suporte 24/7 prioritário',
        'Resolução 4K',
        'Acesso antecipado a novidades',
        'Consultoria mensal gratuita'
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Dona de casa',
      image: '👩‍💼',
      text: 'Finalmente consegui visualizar como minha sala ficaria antes de gastar! Economizei muito dinheiro.',
      rating: 5
    },
    {
      name: 'João Santos',
      role: 'Proprietário de apartamento',
      image: '👨‍💻',
      text: 'Testei 10 estilos diferentes antes de decidir. Valeu cada centavo! Minha casa está linda.',
      rating: 5
    },
    {
      name: 'Ana Costa',
      role: 'Mãe e empreendedora',
      image: '👩‍🎨',
      text: 'Perfeito para quem não tem tempo de contratar designer. Resultado profissional em minutos!',
      rating: 5
    }
  ];

  const stats = [
    { value: '50K+', label: 'Ambientes Decorados' },
    { value: '98%', label: 'Satisfação' },
    { value: '24/7', label: 'Suporte' },
    { value: '< 30s', label: 'Tempo Médio' }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section com Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-black"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm text-gray-300">Mais de 50.000 ambientes transformados</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Decore seu espaço
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              com inteligência artificial
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Veja como seu ambiente ficaria decorado antes de investir. 
            Transforme fotos em projetos reais com IA em segundos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => setIsVideoOpen(true)}
              className="group relative px-8 py-5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-2xl text-black font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/50 flex items-center gap-3"
            >
              <Play className="w-6 h-6" />
              Ver como funciona
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <Link
              href="/app"
              className="px-8 py-5 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:scale-105 flex items-center gap-3"
            >
              Começar agora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#D4AF37] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-[#D4AF37] rounded-full" />
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-5xl aspect-video bg-gray-900 rounded-3xl overflow-hidden">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-xl rounded-full text-white hover:bg-black/70 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-20 h-20 text-[#D4AF37] mx-auto mb-4" />
                <p className="text-white text-lg">Insira aqui o embed da sua VSL</p>
                <p className="text-gray-400 text-sm mt-2">
                  (Vimeo, YouTube, Wistia, etc.)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-24 px-6 sm:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Por que escolher o{' '}
              <span className="text-[#D4AF37]">DecoraX Pro</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A ferramenta mais avançada do mercado para visualizar decorações
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6 sm:px-8 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Amado por milhares de pessoas
            </h2>
            <p className="text-xl text-gray-400">
              Veja o que nossos usuários estão dizendo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Planos para você
            </h2>
            <p className="text-xl text-gray-400">
              Escolha o plano ideal e comece a transformar seus ambientes hoje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-3xl transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-[#D4AF37]/20 to-[#D4AF37]/5 border-2 border-[#D4AF37]'
                    : 'bg-white/5 backdrop-blur-xl border border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full text-black text-sm font-bold">
                    Mais Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-sm text-gray-400">R$</span>
                    <span className="text-5xl font-bold text-[#D4AF37]">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/app"
                  className={`block w-full py-4 rounded-2xl font-semibold text-center transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black hover:scale-105 hover:shadow-2xl'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Começar agora
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              💳 Aceitamos todos os cartões de crédito e PIX
            </p>
            <p className="text-sm text-gray-500">
              Cancele quando quiser • Sem taxas ocultas • Suporte em português
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 sm:p-16 bg-gradient-to-br from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent backdrop-blur-xl border border-[#D4AF37]/30 rounded-3xl">
            <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Pronto para transformar seu espaço?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Junte-se a milhares de pessoas que já decoram com inteligência
            </p>
            <Link
              href="/app"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-2xl text-black font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              Começar agora
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Teste grátis por 7 dias • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="mb-4">© 2024 DecoraX Pro. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
