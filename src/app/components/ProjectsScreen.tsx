'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Heart, Trash2, Share2 } from 'lucide-react';

interface ProjectsScreenProps {
  onNavigate: (screen: string) => void;
}

interface Project {
  id: string;
  name: string;
  date: string;
  thumbnail: string;
  style: string;
  isFavorite: boolean;
}

export default function ProjectsScreen({ onNavigate }: ProjectsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Sala Moderna',
      date: '2024-01-15',
      thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      style: 'Moderno',
      isFavorite: true,
    },
    {
      id: '2',
      name: 'Quarto Minimalista',
      date: '2024-01-10',
      thumbnail: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=300&fit=crop',
      style: 'Minimalista',
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Cozinha Industrial',
      date: '2024-01-05',
      thumbnail: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&h=300&fit=crop',
      style: 'Industrial',
      isFavorite: true,
    },
  ]);

  const toggleFavorite = (id: string) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] p-6">
        <h1 className="text-2xl font-bold text-black mb-4">Meus Projetos</h1>
        
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 bg-black/20 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-2">
            <Search className="w-5 h-5 text-black/60" />
            <input
              type="text"
              placeholder="Buscar projetos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-black placeholder-black/60 outline-none"
            />
          </div>
          <button
            onClick={() => setFilterActive(!filterActive)}
            className={`bg-black/20 backdrop-blur-sm p-3 rounded-xl hover:bg-black/30 transition-all ${
              filterActive ? 'bg-black/40' : ''
            }`}
          >
            <Filter className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>

      {/* New Project Button */}
      <div className="px-6 py-6">
        <button
          onClick={() => onNavigate('quiz')}
          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg"
        >
          <Plus className="w-6 h-6" />
          Novo Projeto
        </button>
      </div>

      {/* Projects Grid */}
      <div className="px-6 space-y-4">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <p className="text-gray-400 mb-4">Nenhum projeto ainda</p>
              <button
                onClick={() => onNavigate('quiz')}
                className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Criar Primeiro Projeto
              </button>
            </div>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all"
            >
              <div className="relative h-48">
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(project.id)}
                  className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      project.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                    }`}
                  />
                </button>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{project.name}</h3>
                    <p className="text-sm text-gray-400">{project.style}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(project.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] py-2 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Compartilhar
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-500 p-2 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
