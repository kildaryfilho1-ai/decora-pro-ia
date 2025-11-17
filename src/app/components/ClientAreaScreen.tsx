'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Package, Image as ImageIcon, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase, Client, ClientProject } from '@/lib/supabase';

interface ClientAreaScreenProps {
  onBack: () => void;
}

export default function ClientAreaScreen({ onBack }: ClientAreaScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [projects, setProjects] = useState<ClientProject[]>([]);

  const handleLogin = async () => {
    if (!email) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        alert('Cliente não encontrado. Por favor, cadastre-se.');
        setIsLogin(false);
      } else {
        setClient(data);
        loadProjects(data.id);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !name) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([{ name, email, phone }])
        .select()
        .single();

      if (error) {
        alert('Erro ao cadastrar. Este email já pode estar em uso.');
      } else {
        setClient(data);
        loadProjects(data.id);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async (clientId: string) => {
    const { data, error } = await supabase
      .from('client_projects')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress':
        return <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'in_progress':
        return 'Em andamento';
      default:
        return 'Pendente';
    }
  };

  if (client) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-6 sm:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white transition-colors mb-4"
            >
              ← Voltar
            </button>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">{client.name}</h1>
                  <p className="text-gray-400 flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4" />
                    {client.email}
                  </p>
                  {client.phone && (
                    <p className="text-gray-400 flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4" />
                      {client.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                Cliente desde {new Date(client.created_at).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>

          {/* Projetos */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#D4AF37]" />
              Meus Projetos ({projects.length})
            </h2>

            {projects.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Você ainda não tem projetos</p>
                <p className="text-gray-500 mt-2">Faça o quiz para criar seu primeiro projeto!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    {project.image_url && (
                      <div className="relative w-full h-48 mb-4 rounded-2xl overflow-hidden bg-gray-800">
                        <img
                          src={project.image_url}
                          alt={project.room_type}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{project.room_type}</h3>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(project.status)}
                        <span className="text-sm text-gray-400">{getStatusText(project.status)}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Estilo:</span>
                        <span className="text-white font-medium">{project.style}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cores:</span>
                        <span className="text-white font-medium">{project.colors}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Orçamento:</span>
                        <span className="text-white font-medium">{project.budget}</span>
                      </div>
                      {project.room_size && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tamanho:</span>
                          <span className="text-white font-medium">{project.room_size}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-white/10">
                        <span className="text-gray-400">Criado em:</span>
                        <span className="text-white font-medium">
                          {new Date(project.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-white transition-colors mb-6"
        >
          ← Voltar
        </button>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Área do Cliente' : 'Cadastro'}
            </h2>
            <p className="text-gray-400">
              {isLogin ? 'Acesse seus projetos' : 'Crie sua conta'}
            </p>
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Seu nome"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Telefone (opcional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="(00) 00000-0000"
                />
              </div>
            )}

            <button
              onClick={isLogin ? handleLogin : handleRegister}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar'}
            </button>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-gray-400 hover:text-white transition-colors text-sm"
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
