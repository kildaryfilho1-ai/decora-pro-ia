'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página de vendas assim que o componente monta
    router.replace('/vendas');
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="text-[#D4AF37] text-3xl font-bold mb-4 animate-pulse">
          DecoraX Pro
        </div>
        <div className="text-gray-400 text-sm">Carregando...</div>
      </div>
    </div>
  );
}
