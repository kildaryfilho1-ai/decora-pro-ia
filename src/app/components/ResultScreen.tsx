'use client';

import { useState, useEffect } from 'react';
import { Download, Share2, ArrowLeft, Sparkles, Loader2, Heart, BookOpen, Palette } from 'lucide-react';
import Image from 'next/image';

interface ResultScreenProps {
  originalImage: string | null;
  preferences: Record<string, string>;
  onNewProject?: () => void;
}

export default function ResultScreen({ originalImage, preferences, onNewProject }: ResultScreenProps) {
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (originalImage && Object.keys(preferences).length > 0) {
      generateTransformedImage();
    }
  }, [originalImage, preferences]);

  const generateTransformedImage = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: originalImage,
          prompt: 'transform interior',
          preferences: preferences
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'API key não configurada') {
          throw new Error('⚠️ Configure sua chave OpenAI no arquivo .env.local para gerar imagens. Veja o arquivo .env.local.example para instruções.');
        }
        throw new Error(data.details || data.error || 'Falha ao gerar imagem transformada');
      }

      if (data.success && data.imageUrl) {
        setTransformedImage(data.imageUrl);
        
        // Salvar imagem na conta do cliente automaticamente
        await saveImageToUserAccount(data.imageUrl, preferences);
      } else {
        throw new Error('Resposta inválida da API');
      }
    } catch (err) {
      console.error('Erro ao gerar imagem:', err);
      setError('Não foi possível gerar a imagem. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveImageToUserAccount = async (imageUrl: string, prefs: Record<string, string>) => {
    try {
      // Salvar no localStorage como histórico do cliente
      const savedProjects = JSON.parse(localStorage.getItem('decorax_projects') || '[]');
      const newProject = {
        id: Date.now(),
        imageUrl: imageUrl,
        originalImage: originalImage,
        preferences: prefs,
        createdAt: new Date().toISOString(),
        style: prefs.style,
        room: prefs.room,
        purpose: prefs.purpose
      };
      
      savedProjects.unshift(newProject);
      
      // Manter apenas os últimos 20 projetos
      if (savedProjects.length > 20) {
        savedProjects.pop();
      }
      
      localStorage.setItem('decorax_projects', JSON.stringify(savedProjects));
      console.log('✅ Projeto salvo na conta do cliente');
    } catch (err) {
      console.error('Erro ao salvar projeto:', err);
    }
  };

  const handleDownload = async () => {
    if (!transformedImage) return;

    try {
      // Método 1: Tentar download direto via proxy
      const response = await fetch('/api/download-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: transformedImage }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `decorax-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        return;
      }

      // Método 2: Fallback - abrir em nova aba
      console.log('Usando método fallback para download');
      const link = document.createElement('a');
      link.href = transformedImage;
      link.target = '_blank';
      link.download = `decorax-${Date.now()}.png`;
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (err) {
      console.error('Erro ao baixar:', err);
      
      // Método 3: Último recurso - abrir em nova aba
      try {
        window.open(transformedImage, '_blank', 'noopener,noreferrer');
      } catch (finalErr) {
        alert('Não foi possível baixar a imagem automaticamente. Clique com o botão direito na imagem e selecione "Salvar imagem como..."');
      }
    }
  };

  const handleShare = async () => {
    if (!transformedImage) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu ambiente decorado - DecoraX Pro',
          text: 'Veja como ficou meu ambiente decorado com IA!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Compartilhamento cancelado');
      }
    } else {
      alert('Compartilhamento não suportado neste navegador');
    }
  };

  // Gerar dicas personalizadas baseadas nas preferências
  const generateTips = () => {
    const tips = [];
    const style = preferences.style || '';
    const budget = preferences.budget || '';
    const colors = preferences.colors || '';

    if (budget === 'Econômico') {
      tips.push({
        icon: '💡',
        title: 'Painel Ripado Adesivo',
        description: 'Transforme uma parede com painéis adesivos. Fácil de aplicar e remove sem danificar.'
      });
      tips.push({
        icon: '🎨',
        title: 'Papel de Parede Adesivo',
        description: 'Renove o ambiente com papéis de parede removíveis. Variedade de estampas modernas.'
      });
      tips.push({
        icon: '💡',
        title: 'Iluminação LED',
        description: 'Fitas de LED criam atmosfera incrível com baixo custo. Instale atrás de móveis ou no teto.'
      });
    }

    if (style === 'Minimalista') {
      tips.push({
        icon: '🪴',
        title: 'Plantas Estratégicas',
        description: 'Poucas plantas bem posicionadas trazem vida sem poluir visualmente.'
      });
    }

    if (style === 'Industrial') {
      tips.push({
        icon: '🔧',
        title: 'Elementos Metálicos',
        description: 'Prateleiras de ferro e luminárias pendentes reforçam o estilo industrial.'
      });
    }

    if (colors === 'Neutras') {
      tips.push({
        icon: '🎭',
        title: 'Texturas Variadas',
        description: 'Em paletas neutras, varie texturas: madeira, metal, tecidos para criar interesse visual.'
      });
    }

    // Dicas gerais sempre úteis
    tips.push({
      icon: '🖼️',
      title: 'Arte na Parede',
      description: 'Quadros e pôsteres personalizados dão identidade ao espaço com baixo investimento.'
    });

    tips.push({
      icon: '🛋️',
      title: 'Almofadas Decorativas',
      description: 'Troque capas de almofadas para renovar o visual sem gastar muito.'
    });

    return tips.slice(0, 6); // Retorna até 6 dicas
  };

  const tips = generateTips();

  return (
    <div className="min-h-screen bg-black">
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={onNewProject}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Novo projeto</span>
          </button>
          <h1 className="text-lg font-semibold text-white">Resultado</h1>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              disabled={!transformedImage}
              className="p-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleDownload}
              disabled={!transformedImage}
              className="p-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl text-black hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Seu ambiente transformado
            </h2>
          </div>
          <p className="text-gray-400">
            Baseado nas suas preferências: {Object.values(preferences).filter(v => v !== 'Pular').join(', ')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Imagem Original */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10">
            {originalImage ? (
              <Image
                src={originalImage}
                alt="Ambiente original"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-800 rounded-2xl mx-auto mb-4" />
                  <p className="text-gray-500">Imagem original</p>
                </div>
              </div>
            )}
            <div className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full text-white text-sm font-medium">
              Antes
            </div>
          </div>

          {/* Imagem Transformada */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/10 backdrop-blur-xl border border-[#D4AF37]/30">
            {isGenerating ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-20 h-20 text-[#D4AF37] mx-auto mb-4 animate-spin" />
                  <p className="text-white font-medium">Gerando seu ambiente...</p>
                  <p className="text-gray-400 text-sm mt-2">Isso pode levar alguns segundos</p>
                </div>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-red-400 font-medium mb-4">{error}</p>
                  <button
                    onClick={generateTransformedImage}
                    className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-xl text-black font-semibold hover:scale-105 transition-all"
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            ) : transformedImage ? (
              <Image
                src={transformedImage}
                alt="Ambiente decorado"
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-20 h-20 text-[#D4AF37] mx-auto mb-4 animate-pulse" />
                  <p className="text-white font-medium">Preparando transformação...</p>
                </div>
              </div>
            )}
            <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full text-black text-sm font-semibold">
              Depois
            </div>
          </div>
        </div>

        {/* Dicas Personalizadas */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 mb-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#D4AF37]" />
            Dicas personalizadas para você
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{tip.icon}</div>
                <h4 className="text-white font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {tip.title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Guia de Implementação */}
        <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#FFD700]/5 backdrop-blur-xl border border-[#D4AF37]/20 rounded-3xl p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-[#D4AF37]/20 rounded-2xl">
              <BookOpen className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Próximos passos para realizar seu projeto
              </h3>
              <p className="text-gray-400">
                Siga este guia para transformar seu ambiente em realidade
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">
                1
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Planeje o orçamento</h4>
                <p className="text-sm text-gray-400">
                  Liste os itens prioritários e pesquise preços em diferentes lojas
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">
                2
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Tire medidas precisas</h4>
                <p className="text-sm text-gray-400">
                  Meça o espaço e os móveis para garantir que tudo se encaixe perfeitamente
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">
                3
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Comece pelas paredes</h4>
                <p className="text-sm text-gray-400">
                  Pintura ou papel de parede transformam o ambiente rapidamente
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">
                4
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Invista em iluminação</h4>
                <p className="text-sm text-gray-400">
                  Boa iluminação valoriza todo o projeto e cria atmosfera
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex-shrink-0 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold">
                5
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Finalize com decoração</h4>
                <p className="text-sm text-gray-400">
                  Almofadas, quadros, plantas e objetos dão personalidade ao espaço
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
            onClick={onNewProject}
            className="px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:bg-white/20"
          >
            Tentar outro estilo
          </button>
          <button
            onClick={handleDownload}
            disabled={!transformedImage}
            className="px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-2xl text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            Baixar resultado
          </button>
        </div>
      </div>
    </div>
  );
}
