import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, prompt, preferences } = await request.json();

    if (!imageUrl || !prompt) {
      return NextResponse.json(
        { error: 'imageUrl e prompt são obrigatórios' },
        { status: 400 }
      );
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      return NextResponse.json(
        { 
          error: 'API key não configurada',
          message: 'Configure OPENAI_API_KEY no .env.local para habilitar a geração de imagens.\n\nPasso a passo:\n1. Crie um arquivo .env.local na raiz do projeto\n2. Adicione: OPENAI_API_KEY=sua-chave-aqui\n3. Obtenha sua chave em: https://platform.openai.com/api-keys'
        },
        { status: 500 }
      );
    }

    console.log('🎨 Iniciando geração de imagem...');
    console.log('📸 Imagem original:', imageUrl.substring(0, 50) + '...');
    console.log('🎯 Preferências:', preferences);

    // ETAPA 1: Analisar a imagem original com GPT-4 Vision de forma DETALHADA
    console.log('🔍 Analisando imagem original em detalhes...');
    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this room in detail: 1) Room type, dimensions, layout 2) Exact position of windows, doors, architectural features 3) Current furniture (describe each piece) 4) Lighting sources and quality 5) Wall/floor/ceiling materials and colors 6) Camera angle and perspective 7) Any objects to REMOVE (clutter, brooms, trash, unwanted items). Be precise - this guides a realistic transformation keeping the EXACT same structure.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
        max_tokens: 600
      }),
    });

    if (!visionResponse.ok) {
      const errorData = await visionResponse.json();
      console.error('❌ Erro GPT-4 Vision:', errorData);
      return NextResponse.json(
        { 
          error: 'Falha ao analisar imagem',
          details: errorData.error?.message || 'Erro desconhecido'
        },
        { status: 500 }
      );
    }

    const visionData = await visionResponse.json();
    const roomAnalysis = visionData.choices[0].message.content;
    console.log('✅ Análise concluída:', roomAnalysis);

    // ETAPA 2: Construir prompt OTIMIZADO para DALL-E 3
    const style = preferences.style || 'moderno';
    const colors = preferences.colors || 'neutras';
    const budget = preferences.budget || 'Moderado';
    const room = preferences.room || 'Sala de Estar';
    const purpose = preferences.purpose || 'Família';
    const furniture = preferences.furniture || 'Confortáveis';
    const mood = preferences.mood || 'Acolhedor';
    
    // Móveis específicos por propósito
    let purposeFurniture = '';
    if (purpose === 'Trabalho') {
      purposeFurniture = 'ergonomic desk, comfortable office chair, organized shelving, task lighting, cable management';
    } else if (purpose === 'Filho/Criança') {
      purposeFurniture = 'safe rounded furniture, toy storage, colorful elements, play area, child-height shelves, soft textiles';
    } else if (purpose === 'Estudo') {
      purposeFurniture = 'study desk, bookshelf, reading lamp, organized storage, quiet atmosphere';
    } else if (purpose === 'Entretenimento') {
      purposeFurniture = 'comfortable seating, entertainment center, ambient lighting, gaming setup or TV area';
    } else if (purpose === 'Relaxamento') {
      purposeFurniture = 'cozy armchair, soft lighting, plants, calming decor, comfortable textiles';
    } else {
      purposeFurniture = 'family-friendly seating, versatile furniture, welcoming atmosphere';
    }

    // Elementos por orçamento
    let budgetElements = '';
    if (budget === 'Econômico') {
      budgetElements = 'Budget-friendly: adhesive wood panels, peel-and-stick wallpaper, LED strip lighting, affordable modern furniture, DIY decorative elements, indoor plants, vinyl or laminate flooring, decorative cushions, framed prints, curtains, area rugs.';
    } else if (budget === 'Moderado') {
      budgetElements = 'Mid-range: quality furniture pieces, good lighting fixtures, decorative elements, quality textiles, modern accessories.';
    } else if (budget === 'Premium') {
      budgetElements = 'Premium: designer furniture, luxury materials, high-end lighting, quality artwork, premium textiles.';
    } else {
      budgetElements = 'Luxury: exclusive designer pieces, premium materials, custom lighting, original artwork, high-end finishes.';
    }

    // Elementos de estilo
    const styleMap: Record<string, string> = {
      'Moderno': 'Clean lines, contemporary furniture, minimalist approach, neutral base with bold accents, modern art, sleek lighting fixtures, glass and metal elements',
      'Clássico': 'Traditional furniture, elegant moldings, rich wood tones, classic patterns, ornate details, timeless elegance',
      'Minimalista': 'Minimal furniture, clean surfaces, monochromatic palette, functional design, hidden storage, essential pieces only',
      'Industrial': 'Exposed materials, metal fixtures, brick or concrete elements, vintage industrial pieces, Edison bulbs, raw textures',
      'Escandinavo': 'Light wood furniture, cozy textiles, natural materials, hygge atmosphere, plants, soft lighting, white and wood tones',
      'Boho': 'Eclectic mix, natural textures, plants, colorful textiles, vintage pieces, layered rugs, macramé, warm atmosphere'
    };

    // Paleta de cores
    const colorMap: Record<string, string> = {
      'Neutras': 'whites, beiges, light grays, taupes, cream tones',
      'Vibrantes': 'bold accent colors, energetic hues, colorful artwork and accessories',
      'Pastéis': 'soft pinks, light blues, mint green, lavender, gentle tones',
      'Escuras': 'deep blues, charcoal gray, black accents, rich browns, dramatic tones',
      'Naturais': 'earth tones, terracotta, sage green, warm browns, natural wood',
      'Monocromáticas': 'single color family, various shades and tones, sophisticated palette'
    };

    // Tipo de móveis
    const furnitureMap: Record<string, string> = {
      'Multifuncionais': 'convertible furniture, storage ottomans, expandable tables, modular pieces',
      'Confortáveis': 'plush seating, soft cushions, cozy textiles, ergonomic design',
      'Compactos': 'space-saving furniture, wall-mounted pieces, slim profiles, efficient layout',
      'Elegantes': 'sophisticated pieces, refined details, luxury materials, statement furniture',
      'Modernos': 'contemporary design, sleek lines, innovative materials, cutting-edge style'
    };

    const enhancedPrompt = `Professional interior design photograph of ${room.toLowerCase()} designed for ${purpose.toLowerCase()}, ${style.toLowerCase()} style, ${colors.toLowerCase()} color palette.

CRITICAL - MAINTAIN EXACT STRUCTURE: ${roomAnalysis}

REMOVE from original: clutter, brooms, cleaning supplies, trash, unwanted objects, damaged items.

KEEP IDENTICAL: room dimensions, window positions, door locations, architectural features, perspective angle, camera viewpoint.

TRANSFORM ONLY: walls, flooring, furniture, lighting, decor.

Purpose-specific furniture: ${purposeFurniture}

Furniture style: ${furnitureMap[furniture] || furnitureMap['Confortáveis']}

Design elements: ${budgetElements}

Style characteristics: ${styleMap[style] || styleMap['Moderno']}

Color scheme: ${colorMap[colors] || colorMap['Neutras']}

Mood: ${mood.toLowerCase()} atmosphere

Technical specs: Professional interior photography, 4K quality, natural daylight, warm ambient lighting, magazine-quality, photorealistic materials, proper furniture scale, inviting atmosphere, sharp details, balanced composition.`;

    console.log('📏 Tamanho do prompt:', enhancedPrompt.length, 'caracteres');

    // Truncar se necessário
    const finalPrompt = enhancedPrompt.length > 4000 
      ? enhancedPrompt.substring(0, 3950) + '...' 
      : enhancedPrompt;

    if (enhancedPrompt.length > 4000) {
      console.warn('⚠️ Prompt truncado de', enhancedPrompt.length, 'para', finalPrompt.length, 'caracteres');
    }

    console.log('🎨 Gerando nova imagem com DALL-E 3...');

    // ETAPA 3: Gerar nova imagem com DALL-E 3
    const dalleResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: finalPrompt,
        n: 1,
        size: '1024x1024',
        quality: 'hd',
        style: 'natural'
      }),
    });

    if (!dalleResponse.ok) {
      const errorData = await dalleResponse.json();
      console.error('❌ Erro DALL-E 3:', errorData);
      return NextResponse.json(
        { 
          error: 'Falha ao gerar imagem com IA',
          details: errorData.error?.message || 'Erro desconhecido'
        },
        { status: 500 }
      );
    }

    const dalleData = await dalleResponse.json();
    const generatedImageUrl = dalleData.data[0].url;

    console.log('✅ Imagem gerada com sucesso!');
    console.log('🖼️ URL:', generatedImageUrl);

    return NextResponse.json({
      success: true,
      imageUrl: generatedImageUrl,
      preferences: preferences,
      roomAnalysis: roomAnalysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erro ao processar requisição:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
