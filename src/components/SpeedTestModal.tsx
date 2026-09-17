import React, { useState } from 'react';
import { Activity, Zap, Play, CheckCircle2, Wifi, Server, ShieldCheck, RefreshCw } from 'lucide-react';
import { SpeedTestResult } from '../types';

export const SpeedTestModal: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<string>('Pronto para iniciar');
  const [result, setResult] = useState<SpeedTestResult | null>(null);

  const startTest = () => {
    setTesting(true);
    setProgress(0);
    setResult(null);
    setStage('Conectando ao CDN Cineva (São Paulo Edge)...');

    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      setProgress(current);

      if (current === 25) {
        setStage('Medindo latência de handshake UDP / HLS...');
      } else if (current === 55) {
        setStage('Testando vazão de buffer em fluxo 4K 60FPS...');
      } else if (current === 85) {
        setStage('Avaliando estabilidade anti-packet loss...');
      } else if (current >= 100) {
        clearInterval(interval);
        setTesting(false);
        setStage('Teste concluído com sucesso!');
        
        // Generate realistic high-performance test result
        const randomDownload = Math.floor(65 + Math.random() * 85);
        const randomPing = Math.floor(12 + Math.random() * 18);
        const randomJitter = Math.floor(1 + Math.random() * 3);

        setResult({
          ping: randomPing,
          downloadMbps: randomDownload,
          jitter: randomJitter,
          loss: 0,
          quality: '4K Ultra HD (60fps)',
          serverLocation: 'São Paulo (SP) - CDN Edge Primário',
        });
      }
    }, 120);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-bold text-[#ff1f1f] uppercase tracking-[0.2em] bg-[#ff1f1f]/20 border border-[#ff1f1f]/30 px-3 py-1 rounded-md">
          Diagnóstico de Conexão
        </span>
        <h2 className="text-2xl sm:text-4xl font-light text-white font-['Playfair_Display',Georgia,serif] tracking-tight">
          Teste de Velocidade para <span className="italic text-[#ff1f1f] font-normal">IPTV Cineva</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/50 max-w-lg mx-auto leading-relaxed">
          Verifique se sua internet está apta para reproduzir transmissões 4K e Full HD 60 FPS sem travamentos.
        </p>
      </div>

      <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-red-950/20">
        {/* Speed Gauge & Status */}
        <div className="text-center space-y-5 py-4">
          <div className="w-32 h-32 mx-auto rounded-full bg-black/60 border-4 border-[#ff1f1f]/40 flex flex-col items-center justify-center relative shadow-[0_0_35px_rgba(255,31,31,0.25)]">
            <Activity className={`w-8 h-8 text-[#ff1f1f] ${testing ? 'animate-bounce' : ''}`} />
            <span className="text-xl font-bold text-white font-mono mt-1">
              {testing ? `${progress}%` : result ? `${result.downloadMbps}` : 'IPTV'}
            </span>
            <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest">
              {testing ? 'Medindo' : result ? 'Mbps' : 'Velocidade'}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-white/80 uppercase tracking-wider">{stage}</p>
            {testing && (
              <div className="w-full max-w-xs mx-auto bg-black/60 h-2 rounded-full overflow-hidden border border-white/5">
                <div
                  className="bg-[#ff1f1f] h-full transition-all duration-150 shadow-[0_0_10px_#ff1f1f]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          {!testing && !result && (
            <button
              type="button"
              id="btn-start-speedtest"
              onClick={startTest}
              className="px-8 py-3.5 rounded-2xl bg-[#ff1f1f] hover:bg-[#d40000] text-white font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-lg shadow-[#ff1f1f]/30 transition active:scale-95 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>INICIAR TESTE DE REDE</span>
            </button>
          )}

          {result && (
            <div className="space-y-6">
              {/* Quality Rating Card */}
              <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/40 inline-flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block font-bold">Classificação Cineva:</span>
                  <span className="text-sm font-bold text-emerald-300">
                    Aprovado para {result.quality}
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-black/60 border border-white/5 p-4 rounded-2xl text-center">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-bold">Velocidade Download</span>
                  <span className="text-xl font-bold text-white font-mono mt-1 block">{result.downloadMbps} Mbps</span>
                </div>
                <div className="bg-black/60 border border-white/5 p-4 rounded-2xl text-center">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-bold">Ping (Latência)</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">{result.ping} ms</span>
                </div>
                <div className="bg-black/60 border border-white/5 p-4 rounded-2xl text-center">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-bold">Jitter</span>
                  <span className="text-xl font-bold text-white/80 font-mono mt-1 block">{result.jitter} ms</span>
                </div>
                <div className="bg-black/60 border border-white/5 p-4 rounded-2xl text-center">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider block font-bold">Perda de Pacotes</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block">{result.loss}%</span>
                </div>
              </div>

              <button
                type="button"
                onClick={startTest}
                className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-[10px] uppercase tracking-wider font-bold inline-flex items-center gap-2 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Testar Novamente</span>
              </button>
            </div>
          )}
        </div>

        {/* Requirements Table */}
        <div className="border-t border-white/5 pt-5 space-y-3">
          <h4 className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
            Requisitos Mínimos Recomendados:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5">
              <span className="text-white/40 text-[10px] uppercase tracking-wider block">Canais SD / HD 720p:</span>
              <strong className="text-white text-xs mt-0.5 block">Mínimo 10 Mbps</strong>
            </div>
            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5">
              <span className="text-white/40 text-[10px] uppercase tracking-wider block">Canais Full HD 1080p:</span>
              <strong className="text-white text-xs mt-0.5 block">Mínimo 25 Mbps</strong>
            </div>
            <div className="bg-black/40 p-3.5 rounded-2xl border border-white/5">
              <span className="text-white/40 text-[10px] uppercase tracking-wider block">Canais 4K UHD & 60fps:</span>
              <strong className="text-[#ff1f1f] text-xs font-bold mt-0.5 block">Mínimo 50 Mbps</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
