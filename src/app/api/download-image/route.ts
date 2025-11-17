import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'imageUrl é obrigatório' },
        { status: 400 }
      );
    }

    console.log('📥 Baixando imagem:', imageUrl);

    // Fazer fetch da imagem com headers apropriados
    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/png,image/jpeg,image/*',
      },
    });

    if (!response.ok) {
      console.error('❌ Erro ao buscar imagem:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Falha ao buscar imagem' },
        { status: response.status }
      );
    }

    // Obter o blob da imagem
    const blob = await response.blob();
    
    console.log('✅ Imagem baixada com sucesso, tamanho:', blob.size, 'bytes');

    // Retornar a imagem como blob
    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': blob.type || 'image/png',
        'Content-Disposition': `attachment; filename="decorax-${Date.now()}.png"`,
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('❌ Erro ao processar download:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao processar download',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}
