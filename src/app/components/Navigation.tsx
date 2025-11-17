'use client';

import { Home, FolderOpen, User, Settings } from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export default function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'quiz', label: 'Início', icon: Home },
    { id: 'projects', label: 'Projetos', icon: FolderOpen },
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'settings', label: 'Config', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0B0B0B] border-t border-[#D4AF37]/20 z-50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive 
                    ? 'text-[#D4AF37] scale-110' 
                    : 'text-gray-400 hover:text-[#D4AF37]/70'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
