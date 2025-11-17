'use client';

import { useState } from 'react';
import { User, Camera, Mail, Phone, MapPin, Edit2, Save } from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    location: 'São Paulo, SP',
    avatar: '',
  });

  const handleSave = () => {
    localStorage.setItem('decorax_profile', JSON.stringify(profile));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] p-6 pb-20">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Meu Perfil</h1>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-black/20 backdrop-blur-sm p-2 rounded-full hover:bg-black/30 transition-all"
          >
            {isEditing ? (
              <Save className="w-5 h-5 text-black" />
            ) : (
              <Edit2 className="w-5 h-5 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Avatar Section */}
      <div className="px-6 -mt-16 mb-6">
        <div className="relative w-32 h-32 mx-auto">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center border-4 border-black shadow-2xl">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-16 h-16 text-black" />
            )}
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 bg-[#D4AF37] p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
              <Camera className="w-5 h-5 text-black" />
            </button>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 space-y-4">
        {/* Name */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <label className="text-sm text-gray-400 mb-2 block">Nome Completo</label>
          {isEditing ? (
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-transparent text-white text-lg font-semibold outline-none"
            />
          ) : (
            <p className="text-lg font-semibold">{profile.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            E-mail
          </label>
          {isEditing ? (
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full bg-transparent text-white outline-none"
            />
          ) : (
            <p className="text-white">{profile.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Telefone
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full bg-transparent text-white outline-none"
            />
          ) : (
            <p className="text-white">{profile.phone}</p>
          )}
        </div>

        {/* Location */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Localização
          </label>
          {isEditing ? (
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full bg-transparent text-white outline-none"
            />
          ) : (
            <p className="text-white">{profile.location}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/10 rounded-2xl p-4 text-center border border-[#D4AF37]/20">
            <p className="text-2xl font-bold text-[#D4AF37]">12</p>
            <p className="text-xs text-gray-400 mt-1">Projetos</p>
          </div>
          <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/10 rounded-2xl p-4 text-center border border-[#D4AF37]/20">
            <p className="text-2xl font-bold text-[#D4AF37]">8</p>
            <p className="text-xs text-gray-400 mt-1">Favoritos</p>
          </div>
          <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/10 rounded-2xl p-4 text-center border border-[#D4AF37]/20">
            <p className="text-2xl font-bold text-[#D4AF37]">Pro</p>
            <p className="text-xs text-gray-400 mt-1">Plano</p>
          </div>
        </div>
      </div>
    </div>
  );
}
