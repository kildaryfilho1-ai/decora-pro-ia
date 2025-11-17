'use client';

import { useState } from 'react';
import { 
  Bell, 
  Moon, 
  Globe, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Check
} from 'lucide-react';

interface SettingsScreenProps {
  onNavigate: (screen: string) => void;
}

export default function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('pt-BR');

  const settingsSections = [
    {
      title: 'Preferências',
      items: [
        {
          icon: Bell,
          label: 'Notificações',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Moon,
          label: 'Modo Escuro',
          type: 'toggle',
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          icon: Globe,
          label: 'Idioma',
          type: 'select',
          value: language,
          options: ['Português', 'English', 'Español'],
        },
      ],
    },
    {
      title: 'Conta',
      items: [
        {
          icon: Shield,
          label: 'Privacidade e Segurança',
          type: 'link',
        },
        {
          icon: CreditCard,
          label: 'Assinatura e Pagamento',
          type: 'link',
        },
      ],
    },
    {
      title: 'Suporte',
      items: [
        {
          icon: HelpCircle,
          label: 'Central de Ajuda',
          type: 'link',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] p-6">
        <h1 className="text-2xl font-bold text-black">Configurações</h1>
      </div>

      {/* Settings Sections */}
      <div className="px-6 py-6 space-y-6">
        {settingsSections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
              {section.title}
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              {section.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className={`flex items-center justify-between p-4 ${
                    itemIdx !== section.items.length - 1 ? 'border-b border-white/10' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-[#D4AF37]/20 p-2 rounded-xl">
                      <item.icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>

                  {item.type === 'toggle' && (
                    <button
                      onClick={() => item.onChange && item.onChange(!item.value)}
                      className={`relative w-12 h-6 rounded-full transition-all ${
                        item.value ? 'bg-[#D4AF37]' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          item.value ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  )}

                  {item.type === 'link' && (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}

                  {item.type === 'select' && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <span className="text-sm">Português</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Plan Info */}
        <div className="bg-gradient-to-br from-[#D4AF37]/20 to-[#F4D03F]/10 rounded-2xl p-6 border border-[#D4AF37]/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-[#D4AF37]">Plano Pro</h3>
              <p className="text-sm text-gray-400">Renovação em 15 dias</p>
            </div>
            <div className="bg-[#D4AF37] text-black px-3 py-1 rounded-full text-sm font-bold">
              Ativo
            </div>
          </div>
          <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all">
            Gerenciar Assinatura
          </button>
        </div>

        {/* Logout */}
        <button className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 border border-red-500/20">
          <LogOut className="w-5 h-5" />
          Sair da Conta
        </button>

        {/* Version */}
        <p className="text-center text-gray-500 text-sm mt-6">
          DecoraX Pro v1.0.0
        </p>
      </div>
    </div>
  );
}
