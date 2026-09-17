import React, { useState } from 'react';
import { ActivationRecord, AppSettings } from '../types';
import { CinevaLogo } from './CinevaLogo';
import {
  CheckCircle2,
  Copy,
  Check,
  Download,
  MessageCircle,
  Tv,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Clock,
  Key,
  Server,
  FileCode,
  AlertTriangle,
  Wrench,
  HelpCircle,
} from 'lucide-react';

interface SuccessActivationProps {
  activation: ActivationRecord;
  settings: AppSettings;
  onReset: () => void;
}

export const SuccessActivation: React.FC<SuccessActivationProps> = ({
  activation,
  settings,
  onReset,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleDownloadM3U = () => {
    const content = `#EXTM3U x-tvg-url="${activation.credentials.epgUrl}"
#EXTINF:-1 tvg-id="globo.br" tvg-name="GLOBO 4K" tvg-logo="https://i.imgur.com/globo.png" group-title="CANAIS ABERTOS 4K",GLOBO 4K ULTRA HD
${activation.credentials.serverDns}/live/${activation.credentials.username}/${activation.credentials.password}/101.ts
#EXTINF:-1 tvg-id="premiere1.br" tvg-name="PREMIERE CLUBES 4K" group-title="FUTEBOL AO VIVO 60FPS",PREMIERE CLUBES 4K 60FPS
${activation.credentials.serverDns}/live/${activation.credentials.username}/${activation.credentials.password}/202.ts
#EXTINF:-1 tvg-id="telecine.br" tvg-name="TELECINE PREMIUM 4K" group-title="FILMES & SERIES 4K",TELECINE PREMIUM 4K
${activation.credentials.serverDns}/live/${activation.credentials.username}/${activation.credentials.password}/303.ts
#EXTINF:-1 tvg-id="hbo.br" tvg-name="HBO MAX 4K" group-title="FILMES & SERIES 4K",HBO MAX 4K
${activation.credentials.serverDns}/live/${activation.credentials.username}/${activation.credentials.password}/404.ts
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cineva_${activation.credentials.username}.m3u`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSendToWhatsApp = () => {
    const cleanPhone = (settings.whatsappSupportNumber || activation.customerPhone || '').replace(/\D/g, '') || '5516980039200';
    const message = `🎬 *ATIVACAO CINEVA IPTV PAGA COM SUCESSO!* 🎬
    
Olá, equipe Cineva!
Já efetuei o pagamento da ativação de R$ 1,00 via PIX.

📌 *Dados da Ativação:*
• *Protocolo:* #CNV-${activation.code}
• *MAC Address:* ${activation.macAddress}
• *Aparelho:* ${activation.deviceType.toUpperCase()}
• *Status:* Em manutenção programada (Liberação em até 24h)

Gostaria de acompanhar a liberação do meu sinal.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  const copyAllCredentials = () => {
    const text = `CINEVA IPTV - DADOS DE ATIVAÇÃO
Protocolo: #CNV-${activation.code}
MAC: ${activation.macAddress}
Status: Em manutenção de servidores (Liberação em até 24h)
DNS: ${activation.credentials.serverDns}
Usuário: ${activation.credentials.username}
Senha: ${activation.credentials.password}
M3U: ${activation.credentials.m3uUrl}`;
    copyToClipboard(text, 'all');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Banner: Payment Received & Maintenance Notice */}
      <div className="bg-[#111111] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-amber-950/20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-4 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
            <Wrench className="w-8 h-8" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-[0.2em] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              PAGAMENTO CONFIRMADO
            </span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              LIBERAÇÃO EM ATÉ 24H
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-light text-white font-['Playfair_Display',Georgia,serif] tracking-tight">
            Pagamento Recebido • <span className="italic text-amber-400 font-normal">Servidor em Manutenção</span>
          </h2>

          {/* Prominent Maintenance Alert Box */}
          <div className="mt-5 w-full max-w-2xl bg-black/70 border border-amber-500/40 rounded-2xl p-5 sm:p-6 text-left space-y-3 shadow-xl">
            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>Aviso Importante sobre a Liberação dos Canais:</span>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              O pagamento da sua ativação de <strong className="text-emerald-400">R$ 1,00</strong> foi <strong className="text-white">confirmado com sucesso</strong>.
            </p>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Nossos servidores principais de transmissão e grade estão passando por uma <strong className="text-amber-300">manutenção preventiva e atualização de canais</strong>. O seu dispositivo (MAC: <strong className="text-white font-mono">{activation.macAddress}</strong>) já foi inserido na fila de liberação prioritária e o sinal completo <strong className="text-amber-300">será liberado em até 24 horas</strong>.
            </p>

            {/* Estimated Release Counter / Status Progress */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-white/70">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Prazo Estimado de Liberação: <strong className="text-white">Até 24 Horas</strong></span>
              </div>
              <div className="flex items-center gap-2 text-amber-300 font-mono text-[11px] bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-lg">
                <span>Protocolo: #CNV-{activation.code}</span>
              </div>
            </div>
          </div>

          {/* Device Badge */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs bg-black/60 px-5 py-2.5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-1.5 text-white/70">
              <Tv className="w-4 h-4 text-amber-400" />
              <span>MAC: <strong className="text-white font-mono">{activation.macAddress}</strong></span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5 text-white/70">
              <Sparkles className="w-4 h-4 text-[#ff1f1f]" />
              <span>App: <strong className="text-white">{activation.playerApp.toUpperCase()}</strong></span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Clock className="w-4 h-4" />
              <span>Fila: ATIVAÇÃO EM ANDAMENTO (24H)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Credentials Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Xtream Codes API */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-[#ff1f1f]" />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider font-['Outfit']">
                Credenciais de Acesso Xtream
              </h3>
            </div>
            <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
              Em Manutenção
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Server URL */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">URL do Servidor / DNS:</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={activation.credentials.serverDns}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(activation.credentials.serverDns, 'dns')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition flex-shrink-0 cursor-pointer"
                  title="Copiar DNS"
                >
                  {copiedField === 'dns' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Usuário (Username):</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={activation.credentials.username}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-emerald-400 font-mono font-bold text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(activation.credentials.username, 'user')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition flex-shrink-0 cursor-pointer"
                  title="Copiar Usuário"
                >
                  {copiedField === 'user' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Senha (Password):</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={activation.credentials.password}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-[#ff1f1f] font-mono font-bold text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(activation.credentials.password, 'pass')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition flex-shrink-0 cursor-pointer"
                  title="Copiar Senha"
                >
                  {copiedField === 'pass' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={copyAllCredentials}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {copiedField === 'all' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>Copiar Todos os Dados de Acesso</span>
          </button>
        </div>

        {/* Card 2: Lista M3U & EPG */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white uppercase tracking-wider font-['Outfit']">
                Link da Lista M3U & EPG
              </h3>
            </div>
            <span className="text-[9px] bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
              Universal
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* M3U Link */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">URL Lista M3U Plus:</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={activation.credentials.m3uUrl}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-white/70 font-mono text-xs truncate focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(activation.credentials.m3uUrl, 'm3u')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition flex-shrink-0 cursor-pointer"
                  title="Copiar URL M3U"
                >
                  {copiedField === 'm3u' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* EPG Link */}
            <div>
              <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Guia de Programação (XMLTV EPG):</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={activation.credentials.epgUrl}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-white/70 font-mono text-xs truncate focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => copyToClipboard(activation.credentials.epgUrl, 'epg')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition flex-shrink-0 cursor-pointer"
                  title="Copiar URL EPG"
                >
                  {copiedField === 'epg' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadM3U}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Baixar Arquivo de Lista (.m3u)</span>
          </button>
        </div>
      </div>

      {/* Action Buttons: WhatsApp & Reset */}
      <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleSendToWhatsApp}
          className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/40 transition active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Acompanhar Liberação no WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Ativar Outro Aparelho</span>
        </button>
      </div>

      {/* Instructions on Maintenance */}
      <div className="bg-black/40 border border-white/10 p-6 rounded-3xl text-xs text-white/60 space-y-2.5">
        <h4 className="font-bold text-sm text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          O que fazer durante o período de manutenção (até 24h):
        </h4>
        <p className="leading-relaxed">
          1. Mantenha o aplicativo <strong className="text-white">Cineva</strong> instalado no seu aparelho ou Smart TV.
        </p>
        <p className="leading-relaxed">
          2. Não é necessário realizar nenhum pagamento adicional. O seu MAC <strong className="text-white font-mono">{activation.macAddress}</strong> já está cadastrado no sistema.
        </p>
        <p className="leading-relaxed">
          3. Assim que a manutenção for concluída no prazo de até 24 horas, basta abrir o app Cineva na sua TV e clicar em <strong className="text-white">"Recarregar Lista"</strong> para carregar toda a grade de canais e filmes.
        </p>
      </div>
    </div>
  );
};
