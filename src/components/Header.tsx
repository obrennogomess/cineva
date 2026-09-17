import React from 'react';
import { CinevaLogo } from './CinevaLogo';
import {
  Tv,
  Search,
  BookOpen,
  Activity,
  Settings,
  MessageCircle,
  Sparkles,
  Zap,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'activate' | 'lookup' | 'guides' | 'speedtest';
  setActiveTab: (tab: 'activate' | 'lookup' | 'guides' | 'speedtest') => void;
  onOpenSettings: () => void;
  whatsappNumber: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSettings,
  whatsappNumber,
}) => {
  const handleWhatsApp = () => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '') || '5516980039200';
    const text = encodeURIComponent(
      'Olá! Gostaria de suporte com a ativação de R$ 1,00 do Cineva IPTV.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#050505]/90 border-b border-white/5">
      {/* Top micro banner */}
      <div className="bg-black/60 border-b border-white/5 py-1.5 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-white/70">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff1f1f] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ff1f1f]"></span>
          </span>
          <span className="font-medium text-white/90 text-[11px] uppercase tracking-wider">Liberação Instantânea via PIX:</span>
          <span className="text-[#ff1f1f] font-bold text-[11px]">R$ 1,00</span>
          <span className="hidden sm:inline text-white/40 text-[11px]">• Smart TVs, TV Box, Fire Stick, Android & iOS</span>
          <span className="bg-[#ff1f1f]/20 text-[#ff1f1f] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest border border-[#ff1f1f]/30">
            AUTO-ATIVADOR 24/7
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            id="cineva-brand-logo"
            onClick={() => setActiveTab('activate')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-[#ff1f1f] to-[#b30000] rounded-xl flex items-center justify-center font-black text-white italic text-lg shadow-[0_0_15px_rgba(255,31,31,0.4)]">
              C
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tighter text-white italic uppercase font-['Outfit']">
                  Cineva
                </span>
                <span className="bg-[#ff1f1f]/20 border border-[#ff1f1f]/40 text-[#ff1f1f] text-[9px] font-bold px-1.5 py-0.5 rounded tracking-widest uppercase">
                  VIP
                </span>
              </div>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold flex items-center gap-1">
                Tecnologia IPTV Segura
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-widest text-white/60">
            <button
              id="nav-tab-activate"
              onClick={() => setActiveTab('activate')}
              className={`transition-colors py-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'activate'
                  ? 'text-[#ff1f1f] border-b-2 border-[#ff1f1f] font-bold'
                  : 'hover:text-[#ff1f1f]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Ativação R$ 1,00
            </button>

            <button
              id="nav-tab-lookup"
              onClick={() => setActiveTab('lookup')}
              className={`transition-colors py-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'lookup'
                  ? 'text-[#ff1f1f] border-b-2 border-[#ff1f1f] font-bold'
                  : 'hover:text-[#ff1f1f]'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Consultar MAC
            </button>

            <button
              id="nav-tab-guides"
              onClick={() => setActiveTab('guides')}
              className={`transition-colors py-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'guides'
                  ? 'text-[#ff1f1f] border-b-2 border-[#ff1f1f] font-bold'
                  : 'hover:text-[#ff1f1f]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Como Instalar
            </button>

            <button
              id="nav-tab-speedtest"
              onClick={() => setActiveTab('speedtest')}
              className={`transition-colors py-2 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'speedtest'
                  ? 'text-[#ff1f1f] border-b-2 border-[#ff1f1f] font-bold'
                  : 'hover:text-[#ff1f1f]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Teste de Rede
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <button
              id="btn-open-settings"
              onClick={onOpenSettings}
              title="Configurações (Chave PIX e Suporte)"
              className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              id="btn-header-whatsapp"
              onClick={handleWhatsApp}
              className="px-5 py-2 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/10 text-white transition-all cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Suporte</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2.5 border-t border-white/5 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('activate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'activate' ? 'bg-[#ff1f1f] text-white' : 'text-white/60'
            }`}
          >
            <Zap className="w-3 h-3" />
            Ativar R$ 1
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'lookup' ? 'bg-[#ff1f1f] text-white' : 'text-white/60'
            }`}
          >
            <Search className="w-3 h-3" />
            Status MAC
          </button>
          <button
            onClick={() => setActiveTab('guides')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'guides' ? 'bg-[#ff1f1f] text-white' : 'text-white/60'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            Tutoriais
          </button>
          <button
            onClick={() => setActiveTab('speedtest')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'speedtest' ? 'bg-[#ff1f1f] text-white' : 'text-white/60'
            }`}
          >
            <Activity className="w-3 h-3" />
            Velocidade
          </button>
        </div>
      </div>
    </header>
  );
};
