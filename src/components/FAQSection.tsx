import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Como funciona a ativação de R$ 1,00 do Cineva?',
      answer:
        'Para liberar os canais e o sinal no seu aparelho, é obrigatório efetuar o pagamento da taxa de ativação de R$ 1,00 primeiro via PIX. Com a taxa confirmada, seu MAC Address e dispositivo entram na fila prioritária de liberação de sinal.',
    },
    {
      question: 'Qual é o prazo de liberação durante a manutenção dos servidores?',
      answer:
        'Devido às rotinas de manutenção preventiva e sincronização da grade 4K nos servidores, a liberação completa de todos os canais no seu aparelho é realizada no prazo de até 24 horas após o pagamento da ativação.',
    },
    {
      question: 'Preciso de cartão de crédito ou assinatura mensal automática?',
      answer:
        'Não! O pagamento é único e feito exclusivamente via PIX no valor de R$ 1,00. Não há cobranças automáticas no seu cartão nem fidelidade. Você decide quando quer renovar.',
    },
    {
      question: 'O Cineva trava durante jogos de futebol ou finais de campeonatos?',
      answer:
        'O Cineva opera em servidores CDN distribuídos de alta performance no Brasil (São Paulo, Rio de Janeiro e Fortaleza), com tráfego 60 FPS e anti-travas. Caso sua operadora faça traffic shaping, nosso DNS inteligente contorna bloqueios de forma transparente.',
    },
    {
      question: 'Onde encontro o endereço MAC na minha Smart TV?',
      answer:
        'Ao abrir o aplicativo Cineva ou IBO Player na sua TV Samsung, LG, Android TV ou TV Box, o endereço MAC (composto por 12 letras e números, ex: 00:1A:79:XX:XX:XX) e a Device Key aparecem destacados logo na tela inicial do app.',
    },
    {
      question: 'Posso usar o Cineva em quais aparelhos?',
      answer:
        'O Cineva é compatível com Smart TVs Samsung (Tizen), Smart TVs LG (webOS), Android TV, TV Box, Amazon Fire TV Stick, Roku TV, celulares e tablets Android/iOS e computadores (Windows/Mac/Web).',
    },
    {
      question: 'Como renovar meu plano após o teste de 1 real?',
      answer:
        'Após o teste, você pode solicitar a renovação diretamente no painel ou chamar nosso suporte no WhatsApp para escolher planos mensais, trimestrais ou anuais com super descontos.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 my-12">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ff1f1f]/20 border border-[#ff1f1f]/30 text-[#ff1f1f] text-[10px] font-bold uppercase tracking-[0.2em]">
          <HelpCircle className="w-3.5 h-3.5" />
          Tire suas dúvidas
        </div>
        <h2 className="text-2xl sm:text-4xl font-light text-white font-['Playfair_Display',Georgia,serif] tracking-tight">
          Perguntas Frequentes sobre o <span className="italic text-[#ff1f1f] font-normal">Cineva</span>
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden transition-all shadow-xl shadow-red-950/5"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition cursor-pointer"
              >
                <span className="font-semibold text-sm text-white/90 hover:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#ff1f1f] flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-white/50 leading-relaxed border-t border-white/5 pt-3 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
