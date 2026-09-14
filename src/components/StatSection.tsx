import React, { useState } from 'react';
import { HISTORIC_COMPARISON } from '../data/mockData';
import { Language } from '../types';

export const StatSection: React.FC<{ lang?: Language }> = ({ lang = 'en' }) => {
  const [showDossier, setShowDossier] = useState(false);
  const [selectedEra, setSelectedEra] = useState<'2017' | '2026'>('2017');

  const comparisonData = selectedEra === '2017' ? HISTORIC_COMPARISON.year2017 : HISTORIC_COMPARISON.year2026;

  return (
    <section
      id="stat-section"
      className="relative w-full bg-[#161309] py-[72px] md:py-[140px] px-margin-mobile md:px-margin flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Ambient subtle glow */}
      <div className="absolute w-[600px] h-[600px] bg-secondary/[0.04] rounded-full blur-[160px] pointer-events-none -top-20" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Massive Stat Number — vertically centered within bounded section height */}
        <span className="font-['Epilogue'] text-[120px] sm:text-[170px] md:text-[220px] lg:text-[250px] leading-none tracking-tighter text-on-surface font-extrabold select-none transition-all">
          80%
        </span>

        {/* Precise Two-Line Explanatory Sentence */}
        <p className="mt-6 sm:mt-8 text-on-surface-variant font-sans-brand text-base sm:text-lg md:text-xl font-normal max-w-sm sm:max-w-md md:max-w-lg mx-auto text-center leading-relaxed">
          {lang === 'hi'
            ? 'महाराष्ट्र की कपास पट्टी का हिस्सा एक ही प्रकोप में नष्ट हो गया था — जिसे पहले से भांपा जा सकता था।'
            : lang === 'mr'
            ? 'महाराष्ट्रातील कापूस पट्ट्याचे नुकसान एकाच प्रादुर्भावात झाले होते — जो आधीच ओळखता आला असता.'
            : "of Maharashtra's cotton belt was lost to a single outbreak — one that could have been seen coming."}
        </p>

        {/* Subtle, unobtrusive expandable link to view the historical vs 2026 analysis */}
        <button
          onClick={() => setShowDossier(prev => !prev)}
          className="mt-8 inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-secondary/80 hover:text-secondary py-2 px-4 rounded-full border border-secondary/20 hover:border-secondary/40 bg-[#1f1b11]/50 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">
            {showDossier ? 'expand_less' : 'analytics'}
          </span>
          <span>{showDossier ? 'Hide Outbreak Case Study' : 'View Outbreak Case Study'}</span>
        </button>

        {/* Collapsible Chronology Dossier */}
        {showDossier && (
          <div className="mt-8 w-full max-w-2xl bg-[#1f1b11] border border-white/10 rounded-2xl p-6 text-left shadow-2xl backdrop-blur-sm animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-secondary font-semibold">
                  Historical Outbreak Analysis
                </span>
                <h4 className="text-lg font-bold text-on-surface mt-1">
                  {comparisonData.title}
                </h4>
              </div>

              {/* Mode toggler */}
              <div className="flex rounded-full bg-[#161309] p-1 border border-white/10">
                <button
                  onClick={() => setSelectedEra('2017')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedEra === '2017'
                      ? 'bg-[#93000a] text-white shadow-md'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  2017 Crisis
                </button>
                <button
                  onClick={() => setSelectedEra('2026')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedEra === '2026'
                      ? 'bg-[#1B4332] text-primary-fixed border border-primary/40 shadow-md'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  2026 Sentinel
                </button>
              </div>
            </div>

            {/* Timeline steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {comparisonData.timeline.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    selectedEra === '2017'
                      ? 'bg-[#2d1b1e]/40 border-red-900/30'
                      : 'bg-[#14291e]/40 border-emerald-900/30'
                  }`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block mb-2 ${
                      selectedEra === '2017' ? 'text-red-300' : 'text-primary'
                    }`}
                  >
                    {item.day}
                  </span>
                  <p className="text-xs text-on-surface/90 leading-relaxed font-body-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 flex items-center justify-between text-xs text-on-surface-variant border-t border-white/5">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">insights</span>
                Data: ICAR &amp; Maharashtra State Agriculture Reports
              </span>
              <span className="font-semibold text-secondary">{comparisonData.stat}</span>
            </div>
          </div>
        )}
      </div>

      {/* Organic Wave Transition Divider into How It Works (#FBF3E4) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          className="relative block w-full h-12 md:h-20 text-[#FBF3E4]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,45 C320,115 540,15 850,75 C1010,105 1120,40 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
