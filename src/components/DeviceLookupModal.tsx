import React, { useState } from 'react';
import { ActivationRecord } from '../types';
import { formatMacAddress } from '../utils/mac';
import { Search, Tv, CheckCircle2, AlertCircle, Clock, Copy, Check, Server, FileCode } from 'lucide-react';

interface DeviceLookupModalProps {
  onClose: () => void;
  savedActivations: ActivationRecord[];
}

export const DeviceLookupModal: React.FC<DeviceLookupModalProps> = ({
  onClose,
  savedActivations,
}) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<ActivationRecord | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cleanQuery = query.trim().toLowerCase();
    const cleanMac = formatMacAddress(query);

    // Search in local saved activations or simulate active demo record
    const found = savedActivations.find(
      (a) =>
        a.macAddress.toLowerCase() === cleanMac.toLowerCase() ||
        a.customerPhone.includes(cleanQuery) ||
        (a.deviceKey && a.deviceKey.toLowerCase() === cleanQuery) ||
        a.credentials.username.toLowerCase() === cleanQuery
    );

    if (found) {
      setResult(found);
    } else if (cleanMac.length === 17) {
      // Simulate live registered check
      const mock: ActivationRecord = {
        id: 'mock-1',
        code: 'CNV-7798',
        deviceType: 'samsung',
        playerApp: 'cineva_pro',
        macAddress: cleanMac,
        customerName: 'Cliente Cineva',
        customerPhone: '(11) 99888-7766',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        status: 'active',
        amount: 1.0,
        credentials: {
          serverDns: 'http://cdn-play.cineva.tv:8080',
          serverHost: 'cdn-play.cineva.tv',
          serverPort: '8080',
          username: `cine_${cleanMac.slice(-5).replace(':', '')}`,
          password: 'cv' + Math.floor(100000 + Math.random() * 900000),
          m3uUrl: `http://cdn-play.cineva.tv:8080/get.php?username=cine_user&password=cv123456&type=m3u_plus`,
          epgUrl: `http://cdn-play.cineva.tv:8080/xmltv.php?username=cine_user&password=cv123456`,
        },
      };
      setResult(mock);
    } else {
      setResult(null);
    }
  };

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#111111] border border-white/10 rounded-3xl shadow-2xl shadow-red-950/20 overflow-hidden my-6">
        <div className="bg-black/60 p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#ff1f1f]/20 border border-[#ff1f1f]/30 flex items-center justify-center text-[#ff1f1f]">
              <Search className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-white font-['Outfit']">
              Consultar Status de Ativação / MAC
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 transition cursor-pointer"
          >
            Fechar
          </button>
        </div>

        <div className="p-6 sm:p-7 space-y-6">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold block">
              Digite o MAC Address, Usuário ou WhatsApp cadastrado:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: 00:1A:79:XX:XX:XX ou seu WhatsApp"
                className="w-full bg-black/60 border border-white/10 focus:border-[#ff1f1f] rounded-xl px-4 py-3.5 text-white text-xs font-mono placeholder:text-white/20 focus:outline-none transition-all"
              />
              <button
                type="submit"
                className="px-5 py-3.5 rounded-xl bg-[#ff1f1f] hover:bg-[#d40000] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0 transition cursor-pointer shadow-md shadow-[#ff1f1f]/20"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Buscar</span>
              </button>
            </div>
          </form>

          {searched && (
            <div>
              {result ? (
                <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/40 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <div>
                        <h4 className="font-bold text-sm text-white">
                          Dispositivo Ativado & Online
                        </h4>
                        <span className="text-xs text-white/40">
                          MAC: <strong className="text-white font-mono">{result.macAddress}</strong>
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-widest">
                      ATIVO
                    </span>
                  </div>

                  {/* Credentials snapshot */}
                  <div className="space-y-2 text-xs bg-black/80 p-3.5 rounded-xl border border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-[10px] uppercase tracking-wider">DNS:</span>
                      <span className="font-mono text-white/80 text-xs">{result.credentials.serverDns}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-[10px] uppercase tracking-wider">Usuário:</span>
                      <span className="font-mono text-emerald-400 font-bold text-xs">{result.credentials.username}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-[10px] uppercase tracking-wider">Senha:</span>
                      <span className="font-mono text-[#ff1f1f] font-bold text-xs">{result.credentials.password}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => copy(result.credentials.m3uUrl, 'm3u')}
                      className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedField === 'm3u' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copiar Link M3U</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => copy(`${result.credentials.serverDns} | ${result.credentials.username} | ${result.credentials.password}`, 'all')}
                      className="flex-1 py-2.5 rounded-xl bg-[#ff1f1f] hover:bg-[#d40000] text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-[#ff1f1f]/20"
                    >
                      {copiedField === 'all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copiar Xtream</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-center space-y-2">
                  <AlertCircle className="w-6 h-6 text-white/30 mx-auto" />
                  <p className="text-xs text-white/80 font-semibold">
                    Nenhuma ativação encontrada para esse termo.
                  </p>
                  <p className="text-[11px] text-white/40">
                    Certifique-se de digitar o MAC completo ou faça uma nova ativação de R$ 1,00.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
