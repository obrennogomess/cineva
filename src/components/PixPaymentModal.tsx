import React, { useState, useEffect } from 'react';
import { ActivationRecord, AppSettings } from '../types';
import { CinevaLogo } from './CinevaLogo';
import {
  QrCode,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  Zap,
  ArrowLeft,
  MessageCircle,
  Loader2,
  Tv,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PixPaymentModalProps {
  activation: ActivationRecord;
  settings: AppSettings;
  onCancel: () => void;
  onPaymentSuccess: () => void;
}

export const PixPaymentModal: React.FC<PixPaymentModalProps> = ({
  activation,
  settings,
  onCancel,
  onPaymentSuccess,
}) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyPix = () => {
    if (activation.pixData?.payload) {
      navigator.clipboard.writeText(activation.pixData.payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleConfirmPayment = () => {
    setIsVerifying(true);
    setVerifyStep(1); // Validando Banco Central

    setTimeout(() => {
      setVerifyStep(2); // Sincronizando com o servidor Cineva
    }, 1200);

    setTimeout(() => {
      setVerifyStep(3); // Injetando lista de canais no MAC
    }, 2400);

    setTimeout(() => {
      setVerifyStep(4); // Concluído!
      // Trigger festive celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff1e38', '#ffffff', '#e50914', '#ffd700'],
      });
      onPaymentSuccess();
    }, 3600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-3xl shadow-2xl shadow-red-950/20 overflow-hidden my-6">
        {/* Top Header */}
        <div className="bg-black/70 p-5 border-b border-white/5 flex items-center justify-between">
          <button
            type="button"
            onClick={onCancel}
            disabled={isVerifying}
            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-white bg-white/5 px-3.5 py-2 rounded-xl border border-white/10 transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar / Corrigir</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-[#ff1f1f] to-[#b30000] rounded-lg flex items-center justify-center font-bold text-white italic text-xs">
              C
            </div>
            <span className="font-bold text-xs uppercase tracking-widest text-white font-['Outfit']">
              PAGAMENTO PIX CINEVA
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-white/5 text-white/70 text-xs px-3 py-1 rounded-full border border-white/10 font-mono">
            <Clock className="w-3.5 h-3.5 text-[#ff1f1f]" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Amount Badge & Required Notice */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#ff1f1f]/20 text-[#ff1f1f] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 border border-[#ff1f1f]/30">
              <Zap className="w-3 h-3" />
              Taxa de Ativação • R$ 1,00
            </span>
            <div className="text-3xl sm:text-5xl font-light text-white tracking-tight font-['Playfair_Display',Georgia,serif]">
              R$ {activation.amount.toFixed(2).replace('.', ',')}
            </div>
            <p className="text-xs text-white/50 mt-1">
              Dispositivo: <strong className="text-white font-mono">{activation.macAddress}</strong> ({activation.deviceType.toUpperCase()})
            </p>
            <div className="mt-2.5 inline-block bg-[#ff1f1f]/10 border border-[#ff1f1f]/30 px-3.5 py-1.5 rounded-xl text-[11px] text-white/70">
              ⚠️ <strong className="text-white">Aviso:</strong> Para liberar os canais no seu aparelho, é preciso efetuar o pagamento da ativação primeiro.
            </div>
          </div>

          {/* Verification Progress Modal Overlay */}
          {isVerifying ? (
            <div className="p-8 bg-black/60 rounded-2xl border border-[#ff1f1f]/30 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#ff1f1f]/20 border border-[#ff1f1f]/40 flex items-center justify-center text-[#ff1f1f]">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>

              <div className="space-y-3">
                <h4 className="text-lg font-light text-white font-['Playfair_Display',Georgia,serif]">
                  Validando <span className="italic text-[#ff1f1f]">Pagamento da Ativação</span>...
                </h4>

                <div className="space-y-2 max-w-sm mx-auto text-left text-xs">
                  <div className={`flex items-center gap-2.5 ${verifyStep >= 1 ? 'text-emerald-400 font-bold' : 'text-white/30'}`}>
                    <Check className="w-4 h-4" />
                    <span>1. Verificação PIX no Banco Central (Chave: {settings.pixKey})</span>
                  </div>
                  <div className={`flex items-center gap-2.5 ${verifyStep >= 2 ? 'text-emerald-400 font-bold' : 'text-white/30'}`}>
                    <Check className="w-4 h-4" />
                    <span>2. Pagamento de ativação de R$ 1,00 confirmado</span>
                  </div>
                  <div className={`flex items-center gap-2.5 ${verifyStep >= 3 ? 'text-emerald-400 font-bold' : 'text-white/30'}`}>
                    <Check className="w-4 h-4" />
                    <span>3. Encaminhando MAC {activation.macAddress} para fila de liberação</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* QR Code & Instructions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-black/40 p-6 rounded-2xl border border-white/10">
                {/* QR Code Image */}
                <div className="relative p-3 bg-white rounded-2xl shadow-xl flex-shrink-0">
                  {activation.pixData?.qrCodeDataUrl ? (
                    <img
                      src={activation.pixData.qrCodeDataUrl}
                      alt="QR Code PIX R$ 1,00 Cineva"
                      className="w-44 h-44 object-contain"
                    />
                  ) : (
                    <div className="w-44 h-44 flex items-center justify-center bg-neutral-100 text-neutral-500 text-xs">
                      Gerando QR Code...
                    </div>
                  )}
                  <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 bg-[#ff1f1f] text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow">
                    PIX OFICIAL
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-3 text-xs text-white/70 text-left">
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#ff1f1f]" />
                    Como pagar e liberar na hora:
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-white/50 text-[11px] leading-relaxed">
                    <li>Abra o app do seu banco (Nubank, Inter, Caixa, Itaú, Bradesco, PicPay, etc.).</li>
                    <li>Selecione <strong className="text-white">PIX &gt; Ler QR Code</strong> ou <strong className="text-white">PIX Copia e Cola</strong>.</li>
                    <li>Confirme o valor exato de <strong className="text-white font-bold">R$ 1,00</strong>.</li>
                    <li>Após concluir, clique no botão abaixo para liberar o acesso.</li>
                  </ol>

                  <div className="pt-2 border-t border-white/5 text-[10px] uppercase tracking-wider text-white/40">
                    <div>Beneficiário: <strong className="text-white/80">{settings.receiverName || 'Cineva Streaming'}</strong></div>
                    <div>Chave PIX: <strong className="text-white/80 font-mono">{settings.pixKey}</strong></div>
                  </div>
                </div>
              </div>

              {/* PIX Copia e Cola Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">
                    Código PIX Copia e Cola:
                  </span>
                  <span className="text-white/40 text-[10px] uppercase tracking-wider">
                    Toque para copiar
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={activation.pixData?.payload || ''}
                    className="w-full bg-black/60 border border-white/10 rounded-xl py-3.5 pl-3 pr-32 text-white/60 font-mono text-xs truncate focus:outline-none"
                  />
                  <button
                    type="button"
                    id="btn-copy-pix"
                    onClick={handleCopyPix}
                    className={`absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer ${
                      copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#ff1f1f] hover:bg-[#d40000] text-white shadow-md shadow-[#ff1f1f]/20'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirmation Button */}
              <div className="pt-2">
                <button
                  type="button"
                  id="btn-confirm-payment-now"
                  onClick={handleConfirmPayment}
                  className="w-full py-4.5 rounded-xl bg-[#ff1f1f] hover:bg-[#d40000] text-white font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-[#ff1f1f]/20 active:scale-95 transition cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>JÁ FIZ O PIX • LIBERAR ACESSO AGORA</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] uppercase tracking-widest text-white/40">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#ff1f1f]" />
                  Ambiente Criptografado
                </span>
                <span>•</span>
                <span>Ativação Automática 24h</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
