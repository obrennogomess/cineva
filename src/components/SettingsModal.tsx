import React, { useState } from 'react';
import { AppSettings } from '../types';
import { Settings, Save, RotateCcw, X, ShieldAlert, Check } from 'lucide-react';

interface SettingsModalProps {
  settings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<AppSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleResetDefaults = () => {
    const defaults: AppSettings = {
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
    setFormData(defaults);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#111111] border border-white/10 rounded-3xl shadow-2xl shadow-red-950/20 overflow-hidden my-6">
        <div className="bg-black/60 p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#ff1f1f]/20 border border-[#ff1f1f]/30 flex items-center justify-center text-[#ff1f1f]">
              <Settings className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-white font-['Outfit']">
              Configurações do Painel Cineva (PIX & Suporte)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4 text-xs">
          <div className="bg-[#ff1f1f]/10 border border-[#ff1f1f]/20 p-3.5 rounded-2xl text-white/70">
            <span className="font-bold text-[#ff1f1f] text-[10px] uppercase tracking-wider block mb-1">
              Personalização dos Recebimentos:
            </span>
            <span className="text-[11px] leading-relaxed">
              Insira sua chave PIX real e número de WhatsApp. O QR Code e a chave Copia e Cola serão gerados dinamicamente para os seus dados.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Chave PIX */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1.5">
                Chave PIX:
              </label>
              <input
                type="text"
                value={formData.pixKey}
                onChange={(e) => setFormData({ ...formData, pixKey: e.target.value })}
                placeholder="Ex: seuemail@pix.com ou CPF"
                className="w-full bg-black/60 border border-white/10 focus:border-[#ff1f1f] rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none transition-all"
                required
              />
            </div>

            {/* Tipo de Chave */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1.5">
                Tipo de Chave PIX:
              </label>
              <select
                value={formData.pixKeyType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pixKeyType: e.target.value as AppSettings['pixKeyType'],
                  })
                }
                className="w-full bg-black/60 border border-white/10 focus:border-[#ff1f1f] rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none transition-all"
              >
                <option value="email" className="bg-[#111111]">E-mail</option>
                <option value="cpf" className="bg-[#111111]">CPF</option>
                <option value="cnpj" className="bg-[#111111]">CNPJ</option>
                <option value="phone" className="bg-[#111111]">Telefone</option>
                <option value="random" className="bg-[#111111]">Chave Aleatória (EVP)</option>
              </select>
            </div>

            {/* Nome do Beneficiário */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1.5">
                Nome do Titular:
              </label>
              <input
                type="text"
                value={formData.receiverName}
                onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
                placeholder="Ex: CINEVA STREAMING LTDA"
                className="w-full bg-black/60 border border-white/10 focus:border-[#ff1f1f] rounded-xl px-3.5 py-2.5 text-white uppercase text-xs focus:outline-none transition-all"
                required
              />
            </div>

            {/* Cidade */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1.5">
                Cidade do Titular:
              </label>
              <input
                type="text"
                value={formData.receiverCity}
                onChange={(e) => setFormData({ ...formData, receiverCity: e.target.value })}
                placeholder="Ex: SAO PAULO"
                className="w-full bg-black/60 border border-white/10 focus:border-[#ff1f1f] rounded-xl px-3.5 py-2.5 text-white uppercase text-xs focus:outline-none transition-all"
                required
              />
            </div>

            {/* Valor da Ativação */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1.5">
                Valor da Ativação (R$):
              </label>
              <input
                type="number"
                step="0.01"
                min="0.50"
                value={formData.priceAmount}
                onChange={(e) =>
                  setFormData({ ...formData, priceAmount: parseFloat(e.target.value) || 1.0 })
                }
                className="w-full bg-black/60 border border-white/10 focus:border-[#ff1f1f] rounded-xl px-3.5 py-2.5 text-white font-mono font-bold text-xs focus:outline-none transition-all"
                required
              />
            </div>

            {/* WhatsApp Suporte */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1.5">
                WhatsApp Suporte:
              </label>
              <input
                type="text"
                value={formData.whatsappSupportNumber}
                onChange={(e) =>
                  setFormData({ ...formData, whatsappSupportNumber: e.target.value })
                }
                placeholder="5516980039200"
                className="w-full bg-black/60 border border-white/10 focus:border-[#ff1f1f] rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* DNS IPTV Padrão */}
          <div className="pt-2 border-t border-white/5">
            <label className="block text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1.5">
              DNS do Servidor IPTV (URL Padrão):
            </label>
            <input
              type="text"
              value={formData.defaultDns}
              onChange={(e) => setFormData({ ...formData, defaultDns: e.target.value })}
              placeholder="http://cdn-play.cineva.tv:8080"
              className="w-full bg-black/60 border border-white/10 focus:border-[#ff1f1f] rounded-xl px-3.5 py-2.5 text-white font-mono text-xs focus:outline-none transition-all"
            />
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Configurações salvas com sucesso!</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-white/40 hover:text-white flex items-center gap-1.5 transition text-[10px] uppercase tracking-wider font-bold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restaurar Padrão</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-[10px] uppercase tracking-wider font-bold transition cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#ff1f1f] hover:bg-[#d40000] text-white text-[10px] uppercase tracking-wider font-bold flex items-center gap-1.5 shadow-md shadow-[#ff1f1f]/20 transition cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Salvar Configurações</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
