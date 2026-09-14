import React from 'react';
import { ActiveScreen, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface InvitationSectionProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang?: Language;
}

export const InvitationSection: React.FC<InvitationSectionProps> = ({ onNavigate, lang = 'en' }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section
      id="invitation-section"
      className="relative w-full bg-[#1F3D2B] text-on-surface py-[56px] md:py-[96px] px-margin-mobile md:px-margin flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Ambient Midnight Soil Glow */}
      <div className="absolute w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -top-20" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Confident, Uncluttered Invitation Headline */}
        <h2 className="font-serif-brand text-3xl sm:text-5xl text-on-surface tracking-tight font-extrabold mb-8">
          {lang === 'hi' ? 'खुद अपनी फसल की जांच करें' : lang === 'mr' ? 'स्वतः आपल्या पिकाची तपासणी करा' : 'See it for yourself.'}
        </h2>

        {/* Action buttons: Check crop & Community */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            id="invitation-check-crop-btn"
            onClick={() => onNavigate('check-crop')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-secondary-container via-secondary to-secondary text-[#161309] font-title-sm text-title-sm font-bold shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">photo_camera</span>
            <span>{t.common.checkCropBtn}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>

          <button
            id="invitation-community-btn"
            onClick={() => onNavigate('community')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-[#fbf3e4] border border-white/15 text-sm font-sans-brand font-semibold transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">forum</span>
            <span>{t.nav.community}</span>
          </button>
        </div>
      </div>

      {/* Transition bridge into footer (#1B4332) */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-transparent to-[#1B4332] pointer-events-none" />
    </section>
  );
};
