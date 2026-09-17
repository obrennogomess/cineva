import React, { useState } from 'react';
import { DeviceType } from '../types';
import { DEVICES_DATA } from '../utils/mac';
import {
  Tv,
  MonitorPlay,
  Flame,
  Radio,
  Smartphone,
  Laptop,
  Box,
  CheckCircle,
  Download,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
} from 'lucide-react';

export const InstallationGuides: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('samsung');

  const guides: Record<
    DeviceType,
    {
      title: string;
      appRecommended: string;
      downloaderCode?: string;
      steps: string[];
      tip: string;
    }
  > = {
    samsung: {
      title: 'Samsung Smart TV (Tizen)',
      appRecommended: 'Cineva TV Pro / IBO Player / SS IPTV',
      steps: [
        'No controle remoto da sua Samsung, aperte o botão Home (ícone de casinha).',
        'Abra a loja de aplicativos "APPS" e pesquise por "Cineva" ou "IBO Player" ou "Smart IPTV".',
        'Instale o aplicativo e abra-o na tela da sua TV.',
        'Anote o MAC Address e o Device Key de 6 dígitos que aparecem na tela principal.',
        'Insira o MAC e a Chave no formulário acima e realize a ativação de R$ 1,00.',
        'Pronto! Em 30 segundos, basta clicar em "Reload / Recarregar" na TV para assistir.',
      ],
      tip: 'Caso sua TV seja anterior a 2018, utilize o app SS IPTV ou o Smart IPTV para compatibilidade 100%.',
    },
    lg: {
      title: 'LG Smart TV (webOS)',
      appRecommended: 'Cineva Player / IBO Pro / IPTV Smarters Pro',
      steps: [
        'Acesse a loja "LG Content Store" pelo menu principal da sua TV.',
        'Busque por "Cineva Player" ou "IBO Player" ou "IPTV Smarters".',
        'Baixe e instale o reprodutor.',
        'Abra o aplicativo e visualize o endereço MAC (ex: A4:C3:F0:XX:XX:XX) e Device Key.',
        'Digite o MAC no painel Cineva e conclua o pagamento de R$ 1,00.',
        'O sistema vincula a lista imediatamente. Reinicie o app na TV.',
      ],
      tip: 'Recomendamos configurar o DNS da TV LG para 8.8.8.8 para carregamento mais veloz dos canais 4K.',
    },
    android_tv: {
      title: 'Android TV & Google TV (TCL, Philips, Sony, etc.)',
      appRecommended: 'Cineva TV Pro 2026 (APK Oficial)',
      downloaderCode: '312849',
      steps: [
        'Abra a Google Play Store na sua Android TV.',
        'Pesquise por "Downloader by AFTVnews" e instale-o.',
        'Abra o Downloader e digite o código de download Cineva: 312849 (ou baixe na Play Store).',
        'Instale o Cineva TV Pro e abra o app.',
        'Insira os dados Xtream Codes (Usuário e Senha) gerados na ativação de R$ 1,00.',
        'Aproveite a grade completa com EPG e troca instantânea de canal!',
      ],
      tip: 'O Cineva TV Pro possui suporte a troca rápida de áudio e legendas automáticas em filmes e séries.',
    },
    fire_stick: {
      title: 'Amazon Fire TV Stick (Lite, 4K, Max)',
      appRecommended: 'Cineva TV Fire Edition',
      downloaderCode: '312849',
      steps: [
        'Na tela inicial do Fire Stick, vá em Pesquisar e digite "Downloader".',
        'Instale e abra o aplicativo Downloader.',
        'No campo de URL do Downloader, digite o código Cineva: 312849 e clique em GO.',
        'O download do APK Cineva TV iniciará automaticamente.',
        'Clique em "Instalar" e abra o aplicativo.',
        'Faça login com seu Usuário e Senha ou ative o MAC na tela.',
      ],
      tip: 'No Fire Stick, ative as "Opções de Desenvolvedor > Instalar apps desconhecidos" para o Downloader.',
    },
    tv_box: {
      title: 'TV Box Android (MXQ, TX3, Aquário, Tanix)',
      appRecommended: 'Cineva TV Pro Universal',
      downloaderCode: '312849',
      steps: [
        'Abra o navegador Google Chrome na sua TV Box ou o app Downloader.',
        'Digite o link direto de download do APK Cineva ou o código rápido 312849.',
        'Conclua a instalação do aplicativo Cineva.',
        'Abra o aplicativo e insira os dados Xtream Codes recebidos após a ativação de R$ 1,00.',
        'Selecione a categoria desejada (Futebol, Filmes, Séries, Desenhos, Variedades).',
      ],
      tip: 'Para melhor estabilidade, conecte sua TV Box via cabo de rede RJ45.',
    },
    roku: {
      title: 'Roku TV & Roku Express',
      appRecommended: 'Cineva Roku Web / IBO Player / IPTV Smarters',
      steps: [
        'Na tela inicial da Roku TV, vá na Loja de Canais de Streaming.',
        'Pesquise pelo app "IBO Player" ou "IPTV Smarters".',
        'Abra o aplicativo e copie o Device ID / MAC fornecido.',
        'Realize a ativação de R$ 1,00 aqui no portal Cineva informando o ID.',
        'O catálogo será sincronizado remotamente sem você precisar digitar nada na Roku.',
      ],
      tip: 'A transmissão na Roku ocorre em HLS de baixa latência, ideal para transmissões esportivas.',
    },
    smartphone: {
      title: 'Smartphones & Tablets (Android e iPhone/iOS)',
      appRecommended: 'Cineva Mobile / GSE Smart IPTV / IPTV Smarters',
      steps: [
        'No Android: Baixe o Cineva Mobile na Google Play Store.',
        'No iOS (iPhone/iPad): Baixe o GSE Smart IPTV ou IPTV Smarters na App Store.',
        'Abra o app e escolha "Entrar com Xtream Codes API".',
        'Cole o DNS, Usuário e Senha recebidos na sua ativação de R$ 1,00.',
        'Assista de onde você estiver com qualidade Full HD e 4K.',
      ],
      tip: 'Permite assistir com PiP (Picture-in-Picture) enquanto usa o WhatsApp ou navega na web.',
    },
    pc: {
      title: 'Computador (Windows, Mac ou Web Player)',
      appRecommended: 'Cineva Web Player / VLC Media Player / IPTV Smarters PC',
      steps: [
        'Acesse o Web Player oficial ou baixe o IPTV Smarters Pro para Windows/Mac.',
        'Se preferir o VLC, basta baixar o arquivo de lista (.m3u) gerado no painel.',
        'No VLC: Arquivo > Abrir Arquivo > Selecione o cineva.m3u.',
        'A lista de canais carregará completa com busca e favoritos.',
      ],
      tip: 'No PC você pode gravar transmissões ao vivo direto pelo reprodutor VLC.',
    },
  };

  const current = guides[selectedDevice];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-bold text-[#ff1f1f] uppercase tracking-[0.2em] bg-[#ff1f1f]/20 border border-[#ff1f1f]/30 px-3 py-1 rounded-md">
          Tutoriais Oficiais Cineva
        </span>
        <h2 className="text-2xl sm:text-4xl font-light text-white font-['Playfair_Display',Georgia,serif] tracking-tight">
          Como Instalar e <span className="italic text-[#ff1f1f] font-normal">Ativar na sua TV</span>
        </h2>
        <p className="text-xs sm:text-sm text-white/50 max-w-lg mx-auto leading-relaxed">
          Passo a passo detalhado para configurar o Cineva em qualquer marca de televisão ou aparelho.
        </p>
      </div>

      {/* Device Picker Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {(Object.keys(DEVICES_DATA) as DeviceType[]).map((type) => {
          const isSelected = selectedDevice === type;
          return (
            <button
              key={type}
              onClick={() => setSelectedDevice(type)}
              className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 transition cursor-pointer ${
                isSelected
                  ? 'bg-[#ff1f1f] text-white border-[#ff1f1f] shadow-lg shadow-[#ff1f1f]/20'
                  : 'bg-black/50 text-white/60 border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              <Tv className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{DEVICES_DATA[type].brand}</span>
            </button>
          );
        })}
      </div>

      {/* Guide Content Card */}
      <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-red-950/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div>
            <span className="text-[10px] text-[#ff1f1f] font-bold uppercase tracking-widest">
              Guia de Configuração
            </span>
            <h3 className="text-xl font-light text-white font-['Playfair_Display',Georgia,serif] mt-1">
              {current.title}
            </h3>
            <p className="text-xs text-white/40 mt-1">
              App indicado: <strong className="text-white/80">{current.appRecommended}</strong>
            </p>
          </div>

          {current.downloaderCode && (
            <div className="bg-[#ff1f1f]/10 border border-[#ff1f1f]/30 px-4 py-2.5 rounded-2xl text-center sm:text-right">
              <span className="text-[9px] text-[#ff1f1f] font-bold block uppercase tracking-widest">
                Código Downloader AFTV
              </span>
              <span className="font-mono text-xl font-bold text-white tracking-widest">
                {current.downloaderCode}
              </span>
            </div>
          )}
        </div>

        {/* Steps */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#ff1f1f]" />
            Passo a Passo:
          </h4>
          <div className="space-y-2.5">
            {current.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 bg-black/40 border border-white/5 p-4 rounded-2xl"
              >
                <span className="w-6 h-6 rounded-lg bg-[#ff1f1f]/20 text-[#ff1f1f] border border-[#ff1f1f]/30 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tip Box */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-xs text-white/70 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#ff1f1f] flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5 uppercase tracking-wider text-[10px]">Dica de Especialista Cineva:</strong>
            <span className="leading-relaxed">{current.tip}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
