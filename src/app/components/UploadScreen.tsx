'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, Sparkles } from 'lucide-react';

interface UploadScreenProps {
  onUpload: (imageUrl: string) => void;
}

export default function UploadScreen({ onUpload }: UploadScreenProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 sm:p-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4AF37]/10 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-[#D4AF37]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Envie uma foto do ambiente
          </h2>
          <p className="text-lg text-gray-400">
            Nossa IA irá analisar e decorar seu espaço com base nas suas preferências
          </p>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 transition-all duration-300 ${
            isDragging
              ? 'border-[#D4AF37] bg-[#D4AF37]/5'
              : 'border-white/20 bg-white/5 backdrop-blur-xl'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-6" />
            <p className="text-white font-medium mb-2">
              Arraste uma imagem ou clique para selecionar
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Formatos aceitos: JPG, PNG, WEBP (máx. 10MB)
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-medium transition-all duration-300 hover:scale-105 hover:bg-white/20"
              >
                <Upload className="w-5 h-5" />
                Escolher da galeria
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-2xl text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <Camera className="w-5 h-5" />
                Tirar foto
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            Como funciona a IA
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Nossa inteligência artificial analisa a estrutura do ambiente, iluminação e espaço disponível
            para sugerir móveis, cores e decorações que combinam com seu estilo.
          </p>
        </div>
      </div>
    </div>
  );
}
