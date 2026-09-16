import React, { useEffect, useRef, useState } from 'react';
import { Language, AdvisoryItem } from '../types';
import { TRANSLATIONS, Translations } from '../translations';
import { ADVISORIES_DATA } from '../data/mockData';

type ChatRole = 'user' | 'ai' | 'expert' | 'system';

interface ChatMessage {
  id: number;
  role: ChatRole;
  lines: string[];
}

interface AskExpertWidgetProps {
  lang: Language;
  visible?: boolean;
}

let messageSeq = 100;

export function pickAdvisory(question: string): AdvisoryItem | null {
  const s = question.toLowerCase();
  const has = (words: string[]) => words.some(w => s.includes(w));
  if (has(['whitefly', 'whiteflies', 'white fly', 'सफेद मक्खी', 'पांढरा माशी', 'पाणढरा माशी', 'safed'])) {
    return ADVISORIES_DATA.find(a => a.id === 'adv-04') ?? null;
  }
  if (has(['rosette', 'bollworm', 'pink boll', 'boll', 'cotton', 'कपास', 'कापस', 'गुलाबी सुंडी', 'गुलाबी बोंडअळी', 'बोंडअळी', 'गुलाब'])) {
    return ADVISORIES_DATA.find(a => a.id === 'adv-01') ?? null;
  }
  if (has(['thrips', 'chilli', 'मिर्च', 'मिरची', 'काला थ्रिप्स', 'काळ्या थ्रिप्स'])) {
    return ADVISORIES_DATA.find(a => a.id === 'adv-02') ?? null;
  }
  if (has(['groundnut', 'leaf spot', 'मूंगफली', 'भुईमूग', 'धब्बे', 'ठिपके'])) {
    return ADVISORIES_DATA.find(a => a.id === 'adv-03') ?? null;
  }
  return null;
}

function isSprayIntent(question: string): boolean {
  const s = question.toLowerCase();
  return ['spray', 'छिड़काव', 'फवारणी', 'फवारणा'].some(w => s.includes(w));
}

export function buildAiLines(t: Translations['askExpert'], adv: AdvisoryItem): string[] {
  const chem = adv.chemicalEmergencyMeasure.replace(
    /^(If ETL\s*(is\s*)?breached:\s*)/i,
    ''
  );
  const bio = adv.biologicalMeasure.replace(/^If\s+(the\s+)?ETL\s+is\s+breached:\s*/i, '');
  return [
    `${t.thresholdLabel}: ${adv.etThreshold}`,
    `${t.firstStepLabel}: ${bio}`,
    `${t.escalateLabel}: ${chem}`,
    `Advisory ${adv.code} · ${adv.title}`
  ];
}

export const AskExpertWidget: React.FC<AskExpertWidgetProps> = ({ lang, visible = true }) => {
  const t = TRANSLATIONS[lang].askExpert;

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState<ChatRole | null>(null);
  const [voiceNote, setVoiceNote] = useState<string | null>(null);
  const [icListening, setListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: 0, role: 'ai', lines: [t.welcome] }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const seqRef = useRef(messageSeq);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, typing]);

  useEffect(() => {
    if (isOpen) {
      const timeout = window.setTimeout(() => inputRef.current?.focus(), 250);
      return () => window.clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.stop();
      } catch {
        /* noop */
      }
    };
  }, []);

  if (!visible) return null;

  const pushAi = (lines: string[]) => {
    setMessages(prev => [...prev, { id: seqRef.current++, role: 'ai', lines }]);
    setTyping(null);
  };

  const pushChat = (role: ChatRole, lines: string[]) => {
    setMessages(prev => [...prev, { id: seqRef.current++, role, lines }]);
  };

  const escalateToExpert = () => {
    setTyping(null);
    pushChat('system', [t.forwardedChip]);
    window.setTimeout(() => {
      setTyping('expert');
      window.setTimeout(() => {
        pushChat('expert', [t.expertReply, t.helplineNote]);
        setTyping(null);
      }, 1700);
    }, 700);
  };

  const sendQuestion = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setInput('');
    pushChat('user', [trimmed]);

    const advisory = pickAdvisory(trimmed);
    const wantsExpert = ['connect me to an expert', 'विशेषज्ञ से जोड़ें', 'मला तज्ज्ञाशी जोडा', 'expert', 'human'].some(w =>
      trimmed.toLowerCase().includes(w)
    );

    if (advisory && !wantsExpert) {
      setTyping('ai');
      window.setTimeout(() => pushAi(buildAiLines(t, advisory)), 1200);
    } else if (isSprayIntent(trimmed) && !wantsExpert) {
      setTyping('ai');
      window.setTimeout(() => pushAi([t.sprayIntro, t.sprayWeather, t.helplineNote]), 1200);
    } else {
      escalateToExpert();
    }
  };

  const handleSend = () => sendQuestion(input);

  const toggleMic = () => {
    const w = window as any;
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) {
      setVoiceNote(t.voiceUnsupported);
      window.setTimeout(() => setVoiceNote(null), 3200);
      return;
    }
    if (icListening) {
      try {
        recognitionRef.current?.stop();
      } catch {
        /* noop */
      }
      setListening(false);
      return;
    }
    const langMap: Record<Language, string> = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN' };
    const rec = new SR();
    rec.lang = langMap[lang] || 'en-IN';
    rec.interimResults = false;
    rec.continuous = false;
    rec.onresult = (e: any) => {
      const transcript = e.results?.[0]?.[0]?.transcript ?? '';
      if (transcript) setInput(prev => prev ? `${prev} ${transcript}` : transcript);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => { setListening(false); setVoiceNote(t.voiceUnsupported); };
    recognitionRef.current = rec;
    setListening(true);
    try {
      rec.start();
    } catch {
      setListening(false);
    }
  };

  const showChips = messages.length <= 1;

  return (
    <>
      {/* Collapsed floating pill — Home page only */}
      <button
        id="ask-expert-pill"
        type="button"
        onClick={() => setIsOpen(o => !o)}
        aria-expanded={isOpen}
        aria-controls="ask-expert-panel"
        aria-label={t.panelTitle}
        className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 inline-flex items-center rounded-full bg-gradient-to-r from-[#da9600] via-[#ffba42] to-[#ffba42] text-[#161309] font-title-sm font-bold shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 cursor-pointer px-4 py-3"
      >
        <span className="relative flex h-6 w-6 items-center justify-center shrink-0">
          <span className="absolute inset-0 rounded-full border-2 border-[#161309]/20 animate-ping" />
          <span className="absolute inset-1 rounded-full border border-[#161309]/40 animate-pulse" />
          <span className="material-symbols-outlined text-[22px]">radar</span>
        </span>
        <span className="hidden sm:inline overflow-hidden whitespace-nowrap ml-0 group-hover:ml-2 max-w-0 opacity-0 group-hover:max-w-[160px] group-hover:opacity-100 transition-all duration-300">
          {t.collapsedLabel}
        </span>
        <span className="sm:hidden ml-2">{t.collapsedLabel}</span>
      </button>

      {/* Expanded chat panel */}
      {isOpen && (
        <div
          id="ask-expert-panel"
          role="dialog"
          aria-label={t.panelTitle}
          className="fixed z-40 bottom-[88px] sm:bottom-[92px] right-5 sm:right-6 w-[calc(100vw-2.5rem)] sm:w-[400px] h-[min(72vh,560px)] flex flex-col rounded-3xl bg-[#1f1b11] border border-white/10 shadow-2xl overflow-hidden animate-panel-in"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 p-5 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#da9600] text-[#161309] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">support_agent</span>
              </div>
              <div>
                <h2 className="font-serif-brand font-bold text-xl sm:text-2xl text-on-surface leading-tight">
                  {t.panelTitle}
                </h2>
                <p className="text-xs text-on-surface-variant mt-0.5">{t.panelSubtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t.close}
              className="w-8 h-8 shrink-0 rounded-full bg-[#2d2a1e] hover:bg-[#393529] text-on-surface flex items-center justify-center cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Quick-reply chips */}
          {showChips && (
            <div className="px-4 pt-3.5 flex flex-wrap gap-2">
              {t.quickReplies.map((chip, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendQuestion(chip)}
                  className="rounded-full bg-[#245741] hover:bg-[#2e6d52] text-primary-fixed text-xs font-bold px-3.5 py-1.5 border border-primary/30 cursor-pointer transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Thread */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map(msg => {
              if (msg.role === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[85%] bg-[#1B4332] text-[#FBF3E4] rounded-2xl rounded-br-sm px-4 py-2.5 space-y-1">
                      {msg.lines.map((line, i) => (
                        <p key={i} className="font-sans-brand text-sm leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                );
              }

              if (msg.role === 'system') {
                return (
                  <div key={msg.id} className="flex flex-col items-center text-center space-y-1.5 py-1">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#fff8e1] text-[#8d5b00] border border-[#ffe082] px-4 py-1.5 text-xs font-bold">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {t.forwardedChip}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">{t.forwardedNote}</span>
                  </div>
                );
              }

              const isExpert = msg.role === 'expert';
              return (
                <div key={msg.id} className="flex flex-col items-start max-w-[88%]">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold mb-1 ${isExpert ? 'bg-[#fff8e1] text-[#8d5b00]' : 'bg-[#2d2a1e] text-[#accfb6]'}`}>
                    <span className="material-symbols-outlined text-[12px]">{isExpert ? 'verified' : 'smart_toy'}</span>
                    {isExpert ? t.expertBadge : t.aiBadge}
                  </span>
                  <div className="bg-[#FDF8EE] text-[#161309] rounded-2xl rounded-bl-sm px-4 py-2.5 space-y-1 border border-[#e8dfcf]">
                    {msg.lines.map((line, i) => (
                      <p key={i} className="font-sans-brand text-sm leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
              );
            })}

            {typing && (
              <div className="flex items-start gap-2">
                <div className="bg-[#2d2a1e] rounded-2xl rounded-bl-sm px-3.5 py-3 flex items-center gap-3">
                  <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 rounded-full border-2 border-secondary/20 animate-ping" />
                    <div className="absolute inset-1 rounded-full border border-secondary/40 animate-pulse" />
                    <div className="w-4 h-4 rounded-full bg-[#ffba42]/20 flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[13px] animate-pulse">radar</span>
                    </div>
                  </div>
                  <span className="text-xs text-on-surface-variant font-medium">
                    {typing === 'expert' ? t.typingExpert : t.typingAi}
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {voiceNote && (
            <p className="px-5 pb-1 text-[11px] text-[#ffddaf]">{voiceNote}</p>
          )}

          {/* Input row */}
          <div className="p-4 pt-3 border-t border-white/10 flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMic}
              aria-label={icListening ? t.listening : 'microphone'}
              className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                icListening
                  ? 'bg-[#da9600] text-[#161309] animate-pulse'
                  : 'bg-[#2d2a1e] hover:bg-[#393529] text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {icListening ? 'graphic_eq' : 'mic'}
              </span>
            </button>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder={icListening ? t.listening : t.inputPlaceholder}
              aria-label={t.inputPlaceholder}
              className="flex-1 min-w-0 bg-[#161309] border border-white/10 rounded-full px-4 py-2.5 text-on-surface text-sm placeholder:text-on-surface-variant/50 focus:border-[#ffba42] focus:outline-none"
            />
            <button
              id="ask-expert-send"
              type="button"
              onClick={handleSend}
              aria-label={t.send}
              disabled={!input.trim() || !!typing}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#da9600] via-[#ffba42] to-[#ffba42] text-[#161309] font-bold text-xs shadow-md hover:scale-[1.03] cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};