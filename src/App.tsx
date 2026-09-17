/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ActivationFormState,
  ActivationRecord,
  AppSettings,
} from './types';
import { generatePixPayload, generateQrCodeDataUrl } from './utils/pix';
import { generateMockCredentials } from './utils/mac';
import { Header } from './components/Header';
import { CinevaLogo } from './components/CinevaLogo';
import { ActivationForm } from './components/ActivationForm';
import { PixPaymentModal } from './components/PixPaymentModal';
import { SuccessActivation } from './components/SuccessActivation';
import { DeviceLookupModal } from './components/DeviceLookupModal';
import { InstallationGuides } from './components/InstallationGuides';
import { SpeedTestModal } from './components/SpeedTestModal';
import { SettingsModal } from './components/SettingsModal';
import { LiveChannelBanner } from './components/LiveChannelBanner';
import { FAQSection } from './components/FAQSection';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Tv,
  MessageCircle,
  CheckCircle2,
  Lock,
  Headphones,
  Flame,
} from 'lucide-react';

const DEFAULT_SETTINGS: AppSettings = {
  pixKey: '23.911.953/0002-98',
  pixKeyType: 'cnpj',
  receiverName: 'CINEVA STREAMING BRASIL',
  receiverCity: 'SAO PAULO',
  priceAmount: 1.0,
  whatsappSupportNumber: '5516980039200',
  defaultDns: 'http://cdn-play.cineva.tv:8080',
  backupDns: 'http://stream.cineva-dns.org:80',
  trialHours: 24,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'activate' | 'lookup' | 'guides' | 'speedtest'>('activate');
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('cineva_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.pixKey || parsed.pixKey.includes('cinevapay@gmail.com') || parsed.whatsappSupportNumber === '5511999999999') {
          return {
            ...parsed,
            pixKey: '23.911.953/0002-98',
            pixKeyType: 'cnpj',
            whatsappSupportNumber: '5516980039200',
          };
        }
        return parsed;
      }
      return DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [currentActivation, setCurrentActivation] = useState<ActivationRecord | null>(null);
  const [showPixModal, setShowPixModal] = useState(false);
  const [activationCompleted, setActivationCompleted] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [savedActivations, setSavedActivations] = useState<ActivationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('cineva_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save settings to localStorage
  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    localStorage.setItem('cineva_settings', JSON.stringify(newSettings));
  };

  // Form submission handler
  const handleFormSubmit = async (formData: ActivationFormState) => {
    const creds = generateMockCredentials(formData.customerPhone, formData.macAddress);
    const txid = `CNV${Math.floor(100000 + Math.random() * 900000)}`;

    const pixPayload = generatePixPayload({
      key: settings.pixKey,
      name: settings.receiverName,
      city: settings.receiverCity,
      amount: settings.priceAmount,
      txid,
    });

    const qrCodeDataUrl = await generateQrCodeDataUrl(pixPayload);

    const record: ActivationRecord = {
      id: `act_${Date.now()}`,
      code: txid,
      deviceType: formData.deviceType,
      playerApp: formData.playerApp,
      macAddress: formData.macAddress,
      deviceKey: formData.deviceKey,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + settings.trialHours * 3600000).toISOString(),
      status: 'pending_payment',
      amount: settings.priceAmount,
      credentials: creds,
      pixData: {
        payload: pixPayload,
        txid,
        qrCodeDataUrl,
      },
    };

    setCurrentActivation(record);
    setShowPixModal(true);
  };

  // Handle successful payment
  const handlePaymentSuccess = () => {
    if (!currentActivation) return;
    const updated: ActivationRecord = {
      ...currentActivation,
      status: 'active',
    };
    setCurrentActivation(updated);
    setShowPixModal(false);
    setActivationCompleted(true);

    const newHistory = [updated, ...savedActivations.filter((a) => a.id !== updated.id)];
    setSavedActivations(newHistory);
    localStorage.setItem('cineva_history', JSON.stringify(newHistory));
  };

  const handleReset = () => {
    setCurrentActivation(null);
    setActivationCompleted(false);
    setShowPixModal(false);
    setActiveTab('activate');
  };

  const handleWhatsAppHelp = () => {
    const cleanNumber = settings.whatsappSupportNumber.replace(/\D/g, '') || '5516980039200';
    const text = encodeURIComponent(
      'Olá! Preciso de ajuda com a ativação de 1 real do Cineva IPTV.'
    );
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] relative overflow-x-hidden">
      {/* Background Sophisticated Radial Red Aura */}
      <div
        className="absolute top-0 left-0 w-full h-[600px] opacity-20 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, #ff1f1f 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'activate' && activationCompleted) {
            // Keep on result or allow viewing
          }
        }}
        onOpenSettings={() => setShowSettingsModal(true)}
        whatsappNumber={settings.whatsappSupportNumber}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        {/* Conditional Tab Rendering */}
        {activeTab === 'lookup' && (
          <DeviceLookupModal
            onClose={() => setActiveTab('activate')}
            savedActivations={savedActivations}
          />
        )}

        {activeTab === 'guides' && <InstallationGuides />}

        {activeTab === 'speedtest' && <SpeedTestModal />}

        {activeTab === 'activate' && (
          <>
            {activationCompleted && currentActivation ? (
              <SuccessActivation
                activation={currentActivation}
                settings={settings}
                onReset={handleReset}
              />
            ) : (
              <div className="space-y-12">
                {/* Sophisticated Dark Hero Section */}
                <div className="text-center max-w-3xl mx-auto space-y-5 pt-2">
                  {/* Cineva Glow Logo Centered */}
                  <div className="flex justify-center mb-2">
                    <CinevaLogo size="hero" withTagline={false} animated={true} />
                  </div>

                  <div>
                    <span className="inline-block px-3.5 py-1 bg-[#ff1f1f]/20 text-[#ff1f1f] text-[10px] font-bold uppercase tracking-[0.2em] rounded-md mb-3 border border-[#ff1f1f]/30 shadow-[0_0_12px_rgba(255,31,31,0.25)]">
                      Ativação Oficial VIP • R$ 1,00
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl font-light text-white tracking-tight font-['Playfair_Display',Georgia,serif] leading-tight">
                    Entretenimento sem <span className="italic text-[#ff1f1f] font-normal">limites</span>.
                  </h1>

                  <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed font-normal">
                    Ative seu acesso à plataforma Cineva na sua Smart TV. Mais de 2.000 canais abertos, fechados, futebol ao vivo e lançamentos em resolução 4K Ultra HD com servidores de alta performance.
                  </p>

                  {/* Notice: Payment Required First to Release Channels */}
                  <div className="bg-[#111111] border border-[#ff1f1f]/30 rounded-2xl p-4 sm:p-5 max-w-xl mx-auto flex items-start gap-3.5 text-left shadow-lg shadow-red-950/20">
                    <div className="w-8 h-8 rounded-xl bg-[#ff1f1f]/20 border border-[#ff1f1f]/30 flex items-center justify-center text-[#ff1f1f] flex-shrink-0 mt-0.5">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <span>Aviso de Liberação do Sinal</span>
                        <span className="text-[9px] bg-[#ff1f1f] text-white px-2 py-0.5 rounded font-mono">OBRIGATÓRIO</span>
                      </h4>
                      <p className="text-xs text-white/60 mt-1 leading-relaxed">
                        Para liberar os canais e o sinal no seu aparelho, <strong className="text-white">é preciso pagar a taxa de ativação de R$ 1,00 primeiro</strong> via PIX. O sinal é processado logo após a confirmação do pagamento.
                      </p>
                    </div>
                  </div>

                  {/* Clean Hero Metric Blocks */}
                  <div className="flex items-center justify-center gap-6 sm:gap-12 pt-4 pb-2 border-y border-white/5 py-4 my-4 max-w-xl mx-auto">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">R$ 1,00</span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Pagamento Único</span>
                    </div>
                    <div className="h-9 w-px bg-white/10" />
                    <div className="flex flex-col items-center">
                      <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">30s</span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Liberação via Pix</span>
                    </div>
                    <div className="h-9 w-px bg-white/10" />
                    <div className="flex flex-col items-center">
                      <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">4K 60FPS</span>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Sem Travamentos</span>
                    </div>
                  </div>
                </div>

                {/* Activation Form Component */}
                <ActivationForm
                  onSubmit={handleFormSubmit}
                  priceAmount={settings.priceAmount}
                />

                {/* Live Channel / Content Library Showcase */}
                <LiveChannelBanner />

                {/* FAQ Section */}
                <FAQSection />
              </div>
            )}
          </>
        )}
      </main>

      {/* PIX Payment Modal */}
      {showPixModal && currentActivation && (
        <PixPaymentModal
          activation={currentActivation}
          settings={settings}
          onCancel={() => setShowPixModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Settings / Admin Modal */}
      {showSettingsModal && (
        <SettingsModal
          settings={settings}
          onSave={handleSaveSettings}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {/* Floating WhatsApp Help Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          id="floating-whatsapp-btn"
          onClick={handleWhatsAppHelp}
          className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-[0_4px_25px_rgba(16,185,129,0.4)] active:scale-95 transition-all duration-300 border border-emerald-400/30"
          title="Precisa de ajuda? Chamar no WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline font-bold text-xs pr-1 tracking-wider uppercase">
            Suporte Cineva
          </span>
        </button>
      </div>

      {/* Sophisticated Dark Footer */}
      <footer className="w-full bg-black border-t border-white/5 py-8 mt-16 text-xs z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <CinevaLogo size="sm" animated={false} />
            <div>
              <span className="font-bold text-white tracking-wider text-sm font-['Outfit'] uppercase">CINEVA NETWORK</span>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Tecnologia IPTV Segura • Ativação 24/7</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#ff1f1f] rounded-full shadow-[0_0_8px_#ff1f1f]" />
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Servidores Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#ff1f1f] rounded-full shadow-[0_0_8px_#ff1f1f]" />
              <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">SSL Criptografado</span>
            </div>
          </div>

          <div className="text-[10px] text-white/30 uppercase tracking-widest">
            © 2026 Cineva Network. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
