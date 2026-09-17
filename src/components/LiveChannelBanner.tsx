import React from 'react';
import { Film, Tv, ShieldCheck, Zap, Radio, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';

export const LiveChannelBanner: React.FC = () => {
  const categories = [
    { icon: Trophy, name: 'Futebol Ao Vivo & PPV', count: '+120 canais' },
    { icon: Film, name: 'Filmes Lançamentos 2026', count: '+35.000 títulos' },
    { icon: Tv, name: 'Séries Completas & 4K', count: '+12.000 temporadas' },
    { icon: Radio, name: 'Canais Abertos & Fechados', count: '+3.500 canais' },
    { icon: Sparkles, name: 'Canais Infantis & Desenhos', count: '100% Dublado' },
    { icon: ShieldCheck, name: 'Servidores CDN Anti-Travas', count: '60 FPS Ultra HD' },
  ];

  return (
    <div className="w-full bg-[#080808] border-y border-white/5 py-10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#ff1f1f]/20 border border-[#ff1f1f]/30 text-[#ff1f1f] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
            <Zap className="w-3 h-3 text-[#ff1f1f] fill-[#ff1f1f]" />
            Grade Completa Liberada no Teste de 1 Real
          </div>
          <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight font-['Playfair_Display',Georgia,serif]">
            Experiência <span className="italic text-[#ff1f1f] font-normal">Cinema em Casa</span> Completa
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-[#111111] border border-white/10 hover:border-[#ff1f1f]/40 rounded-2xl p-4 flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(255,31,31,0.15)]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ff1f1f]/10 border border-[#ff1f1f]/20 flex items-center justify-center text-[#ff1f1f] group-hover:bg-[#ff1f1f] group-hover:text-white transition-colors mb-2.5">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white/90 line-clamp-1 group-hover:text-white">
                  {cat.name}
                </span>
                <span className="text-[10px] text-white/40 uppercase tracking-wider mt-1">{cat.count}</span>
              </div>
            );
          })}
        </div>

        {/* Benefits list bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] text-white/50 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ff1f1f]" />
            <span>Sem fidelidade ou mensalidade presa</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ff1f1f]" />
            <span>Guia de Programação (EPG) Incluso</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ff1f1f]" />
            <span>Áudio 5.1 & Qualidade 4K UHD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#ff1f1f]" />
            <span>Ativação Automática pelo MAC</span>
          </div>
        </div>
      </div>
    </div>
  );
};
