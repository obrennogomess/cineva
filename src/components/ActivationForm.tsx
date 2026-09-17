import React, { useState } from 'react';
import {
  DeviceType,
  PlayerApp,
  ActivationMode,
  ActivationFormState,
} from '../types';
import { DEVICES_DATA, APPS_DATA, formatMacAddress, isValidMacAddress } from '../utils/mac';
import {
  Tv,
  Smartphone,
  Flame,
  Radio,
  Laptop,
  Box,
  MonitorPlay,
  Zap,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  QrCode,
  Info,
  CheckCircle,
} from 'lucide-react';

interface ActivationFormProps {
  onSubmit: (formData: ActivationFormState) => void;
  priceAmount: number;
}

export const ActivationForm: React.FC<ActivationFormProps> = ({
  onSubmit,
  priceAmount,
}) => {
  const [deviceType, setDeviceType] = useState<DeviceType>('samsung');
  const [playerApp, setPlayerApp] = useState<PlayerApp>('cineva_pro');
  const [activationMode, setActivationMode] = useState<ActivationMode>('mac_key');
  const [macAddress, setMacAddress] = useState('');
  const [deviceKey, setDeviceKey] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [showMacHelp, setShowMacHelp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentDevice = DEVICES_DATA[deviceType];

  const handleMacChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMacAddress(e.target.value);
    setMacAddress(formatted);
    if (errorMsg) setErrorMsg('');
  };

  const handleGenerateSampleMac = () => {
    const hex = '0123456789ABCDEF';
    let sample = '00:1A:79:';
    for (let i = 0; i < 6; i++) {
      sample += hex[Math.floor(Math.random() * 16)];
      if (i === 1 || i === 3) sample += ':';
    }
    setMacAddress(sample);
    if (currentDevice.hasDeviceKey) {
      setDeviceKey(Math.floor(100000 + Math.random() * 900000).toString());
    }
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activationMode === 'mac_key') {
      if (!macAddress.trim()) {
        setErrorMsg('Por favor, informe o endereço MAC do seu aplicativo/TV.');
        return;
      }
      if (!isValidMacAddress(macAddress)) {
        setErrorMsg('Endereço MAC inválido. Ele deve conter 12 caracteres hexadecimais (ex: 00:1A:79:3B:4F:12).');
        return;
      }
    }

    if (!customerPhone.trim()) {
      setErrorMsg('Informe seu WhatsApp para receber o comprovante e dados de backup.');
      return;
    }

    setErrorMsg('');
    onSubmit({
      deviceType,
      playerApp,
      activationMode,
      macAddress: macAddress.trim() || '00:1A:79:00:00:00',
      deviceKey: deviceKey.trim(),
      customerName: customerName.trim() || 'Cliente Cineva',
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      durationDays: 1,
    });
  };

  const getDeviceIcon = (type: DeviceType) => {
    switch (type) {
      case 'samsung':
      case 'lg':
        return <Tv className="w-5 h-5" />;
      case 'android_tv':
        return <MonitorPlay className="w-5 h-5" />;
      case 'fire_stick':
        return <Flame className="w-5 h-5" />;
      case 'tv_box':
        return <Box className="w-5 h-5" />;
      case 'roku':
        return <Radio className="w-5 h-5" />;
      case 'smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'pc':
        return <Laptop className="w-5 h-5" />;
      default:
        return <Tv className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Device Selection */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#ff1f1f]/20 text-[#ff1f1f] border border-[#ff1f1f]/40 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                  Selecione onde você vai assistir
                </h2>
                <p className="text-xs text-white/50">
                  Compatível com todas as Smart TVs, TV Boxes e Dispositivos
                </p>
              </div>
            </div>
            <span className="text-[10px] bg-white/5 text-white/60 px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest font-semibold hidden sm:inline">
              Multi-plataforma
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(DEVICES_DATA) as DeviceType[]).map((type) => {
              const dev = DEVICES_DATA[type];
              const isSelected = deviceType === type;
              return (
                <button
                  type="button"
                  key={type}
                  id={`device-select-${type}`}
                  onClick={() => {
                    setDeviceType(type);
                    if (!dev.hasDeviceKey) setDeviceKey('');
                  }}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#ff1f1f]/10 border-[#ff1f1f] shadow-[0_0_20px_rgba(255,31,31,0.2)] text-white'
                      : 'bg-black/50 border-white/10 hover:border-white/20 text-white/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#ff1f1f] text-white' : 'bg-white/5 text-white/60'
                      }`}
                    >
                      {getDeviceIcon(type)}
                    </div>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#ff1f1f] shadow-[0_0_8px_#ff1f1f]" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-white line-clamp-1">
                      {dev.brand}
                    </h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">{dev.badge}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Player App & Activation Mode */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-7 h-7 rounded-lg bg-[#ff1f1f]/20 text-[#ff1f1f] border border-[#ff1f1f]/40 flex items-center justify-center font-bold text-xs">
              2
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                Aplicativo & Método de Ativação
              </h2>
              <p className="text-xs text-white/50">
                Escolha o player instalado na sua TV ou aparelho
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {APPS_DATA.map((app) => {
              const isSelected = playerApp === app.id;
              return (
                <div
                  key={app.id}
                  id={`app-select-${app.id}`}
                  onClick={() => setPlayerApp(app.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#ff1f1f]/10 border-[#ff1f1f] text-white shadow-[0_0_15px_rgba(255,31,31,0.2)]'
                      : 'bg-black/50 border-white/10 hover:border-white/20 text-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#ff1f1f] bg-[#ff1f1f]' : 'border-white/20'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="font-bold text-sm text-white">{app.name}</span>
                    </div>
                    {app.popular && (
                      <span className="text-[9px] bg-[#ff1f1f]/20 text-[#ff1f1f] border border-[#ff1f1f]/40 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/40 pl-6.5">{app.tagline}</p>
                </div>
              );
            })}
          </div>

          {/* Mode Switcher */}
          <div className="bg-black/40 p-3 rounded-2xl border border-white/10">
            <label className="block text-[10px] uppercase tracking-widest text-white/60 font-bold mb-2">
              Como você prefere ativar?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                id="mode-mac"
                onClick={() => setActivationMode('mac_key')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${
                  activationMode === 'mac_key'
                    ? 'bg-[#ff1f1f] text-white shadow-lg shadow-[#ff1f1f]/20'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Endereço MAC (Direto na TV)
              </button>

              <button
                type="button"
                id="mode-credentials"
                onClick={() => setActivationMode('credentials')}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${
                  activationMode === 'credentials'
                    ? 'bg-[#ff1f1f] text-white shadow-lg shadow-[#ff1f1f]/20'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Usuário + Senha (Xtream / M3U)
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: MAC Address & Identification */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#ff1f1f]/20 text-[#ff1f1f] border border-[#ff1f1f]/40 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                  Identificação do Dispositivo & Contato
                </h2>
                <p className="text-xs text-white/50">
                  Preencha os dados para liberação imediata via Pix
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowMacHelp(!showMacHelp)}
              className="text-xs text-[#ff1f1f] hover:text-white flex items-center gap-1.5 bg-[#ff1f1f]/10 px-3 py-1.5 rounded-full border border-[#ff1f1f]/30 transition uppercase font-semibold text-[10px] tracking-wider"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Onde achar o MAC?
            </button>
          </div>

          {/* Help box for finding MAC */}
          {showMacHelp && (
            <div className="mb-5 p-4 rounded-2xl bg-black/60 border border-[#ff1f1f]/30 text-xs text-white/70 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <Info className="w-4 h-4 text-[#ff1f1f]" />
                Como encontrar o MAC Address no seu aparelho:
              </div>
              <p className="text-white/60 leading-relaxed">
                {currentDevice.instructions}
              </p>
              <div className="flex items-center gap-2 text-white/50 pt-1">
                <span>Formato típico:</span>
                <span className="font-mono bg-black px-2.5 py-0.5 rounded text-[#ff1f1f] font-bold border border-white/10">
                  {currentDevice.macFormat}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* MAC Address Input */}
            {activationMode === 'mac_key' ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="input-mac-address"
                    className="text-[10px] uppercase tracking-widest text-white/60 font-bold flex items-center gap-1"
                  >
                    <span>Endereço MAC</span>
                    <span className="text-[#ff1f1f] font-bold">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateSampleMac}
                    className="text-[10px] uppercase tracking-wider text-white/40 hover:text-[#ff1f1f] transition"
                  >
                    Exemplo
                  </button>
                </div>
                <input
                  type="text"
                  id="input-mac-address"
                  value={macAddress}
                  onChange={handleMacChange}
                  placeholder="00:1A:79:AB:CD:EF"
                  maxLength={17}
                  className="w-full bg-black/50 border border-white/10 focus:border-[#ff1f1f] focus:outline-none rounded-xl px-4 py-3.5 text-white font-mono text-sm tracking-wider uppercase placeholder:text-white/20 transition-all"
                />
                <span className="text-[10px] text-white/40 uppercase tracking-wider mt-1.5 block">
                  Exibido na tela inicial do Cineva ou IBO Player
                </span>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="input-device-name"
                  className="text-[10px] uppercase tracking-widest text-white/60 font-bold block mb-2"
                >
                  Nome do Dispositivo
                </label>
                <input
                  type="text"
                  id="input-device-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: Minha TV da Sala"
                  className="w-full bg-black/50 border border-white/10 focus:border-[#ff1f1f] focus:outline-none rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 transition-all"
                />
              </div>
            )}

            {/* Device Key if required by the device */}
            {currentDevice.hasDeviceKey && activationMode === 'mac_key' ? (
              <div>
                <label
                  htmlFor="input-device-key"
                  className="text-[10px] uppercase tracking-widest text-white/60 font-bold flex items-center gap-1 mb-2"
                >
                  <span>{currentDevice.keyLabel || 'Device Key'}</span>
                </label>
                <input
                  type="text"
                  id="input-device-key"
                  value={deviceKey}
                  onChange={(e) => setDeviceKey(e.target.value)}
                  placeholder="Ex: 849201"
                  className="w-full bg-black/50 border border-white/10 focus:border-[#ff1f1f] focus:outline-none rounded-xl px-4 py-3.5 text-white font-mono text-sm tracking-wider placeholder:text-white/20 transition-all"
                />
                <span className="text-[10px] text-white/40 uppercase tracking-wider mt-1.5 block">
                  Código de 6 dígitos exibido junto ao MAC
                </span>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="input-customer-name"
                  className="text-[10px] uppercase tracking-widest text-white/60 font-bold block mb-2"
                >
                  Seu Nome
                </label>
                <input
                  type="text"
                  id="input-customer-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ex: Carlos Silva"
                  className="w-full bg-black/50 border border-white/10 focus:border-[#ff1f1f] focus:outline-none rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 transition-all"
                />
              </div>
            )}

            {/* WhatsApp Phone */}
            <div>
              <label
                htmlFor="input-whatsapp"
                className="text-[10px] uppercase tracking-widest text-white/60 font-bold flex items-center gap-1 mb-2"
              >
                <span>WhatsApp (com DDD)</span>
                <span className="text-[#ff1f1f] font-bold">*</span>
              </label>
              <input
                type="tel"
                id="input-whatsapp"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full bg-black/50 border border-white/10 focus:border-[#ff1f1f] focus:outline-none rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 transition-all"
              />
              <span className="text-[10px] text-white/40 uppercase tracking-wider mt-1.5 block">
                Para envio imediato do comprovante e lista M3U
              </span>
            </div>

            {/* Email (Optional) */}
            <div>
              <label
                htmlFor="input-email"
                className="text-[10px] uppercase tracking-widest text-white/60 font-bold block mb-2"
              >
                E-mail para backup (opcional)
              </label>
              <input
                type="email"
                id="input-email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                className="w-full bg-black/50 border border-white/10 focus:border-[#ff1f1f] focus:outline-none rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 transition-all"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="mt-4 p-3.5 bg-[#ff1f1f]/10 border border-[#ff1f1f]/40 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff1f1f] animate-ping" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Pricing Summary & Checkout Button */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-40 h-40 bg-[#ff1f1f]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-md bg-[#ff1f1f]/20 text-[#ff1f1f] border border-[#ff1f1f]/30 text-[10px] font-bold uppercase tracking-[0.2em]">
                  Liberação Mediante Pagamento
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Taxa Única
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight font-['Playfair_Display',Georgia,serif]">
                Ativação de <span className="italic text-[#ff1f1f] font-normal">Canais e Sinal</span>
              </h3>

              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  R$ {priceAmount.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-xs text-white/30 line-through">
                  R$ 15,00
                </span>
                <span className="text-xs text-[#ff1f1f] font-semibold uppercase tracking-wider">
                  / Taxa de Ativação
                </span>
              </div>

              <p className="text-xs text-white/60 mt-2 max-w-md leading-relaxed">
                <strong className="text-white">Atenção:</strong> Para liberar os canais e o sinal no seu aparelho, <span className="text-[#ff1f1f] font-semibold">é preciso pagar a ativação primeiro</span> via PIX.
              </p>
            </div>

            <button
              type="submit"
              id="btn-generate-pix"
              className="w-full sm:w-auto px-8 py-5 rounded-xl bg-[#ff1f1f] hover:bg-[#d40000] text-white font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg shadow-[#ff1f1f]/20 active:scale-95 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-white" />
              <span>Pagar Ativação e Liberar</span>
            </button>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 flex flex-col items-center">
            <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Compatível com:</p>
            <div className="flex flex-wrap items-center justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition">
              <span className="text-xs font-bold tracking-wider">SAMSUNG</span>
              <span className="text-xs font-bold tracking-wider">LG WEBOS</span>
              <span className="text-xs font-bold tracking-wider">ANDROID TV</span>
              <span className="text-xs font-bold tracking-wider">FIRE STICK</span>
              <span className="text-xs font-bold tracking-wider">ROKU</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
