import React from 'react';
import { ActiveScreen, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface HeroSectionProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang?: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, lang = 'en' }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section
      id="hero-section"
      className="relative w-full overflow-hidden pt-[72px] pb-[72px] md:pt-[140px] md:pb-[140px] flex flex-col items-center justify-center"
    >
      {/* Full-bleed panoramic golden hour landscape */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2400&q=85')`
        }}
      />

      {/* Atmospheric Soil & Dusk Overlays for pristine contrast */}
      <div className="absolute inset-0 bg-[#161309]/55 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#161309] via-transparent to-[#161309]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#161309]/90 via-[#161309]/40 to-[#161309]/80" />

      {/* Hero Content Container — content-driven height, ends defined Generous distance below CTA buttons */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-margin-mobile md:px-margin text-center flex flex-col items-center justify-center">
        {/* Subtle Network Radar Ping Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161309]/80 backdrop-blur-md border border-secondary/30 mb-6 shadow-lg animate-fadeIn">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary shadow-[0_0_8px_#ffba42]" />
          </span>
          <span className="font-sans-brand text-[11px] tracking-[0.16em] uppercase text-secondary font-semibold">
            REGIONAL PEST &amp; BLIGHT FORECAST NETWORK
          </span>
        </div>

        {/* Massive Display Serif Headline */}
        <h1 className="font-serif-brand text-4xl sm:text-6xl lg:text-[72px] font-black text-on-surface leading-[1.08] tracking-tight max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
          {lang === 'hi' ? (
            <>नुकसान होने के बाद नहीं,<br />पहले ही अलर्ट पाएं।</>
          ) : lang === 'mr' ? (
            <>नुकसान झाल्यानंतर नाही,<br />आगाऊ अंदाज मिळवा.</>
          ) : (
            <>Detection Isn't Early.<br />Prediction Is.</>
          )}
        </h1>

        {/* Refined Subtext */}
        <p className="mt-6 md:mt-8 text-on-surface/90 font-sans-brand text-base md:text-lg max-w-2xl text-balance leading-relaxed drop-shadow">
          {lang === 'hi'
            ? 'फसल रक्षक वास्तविक मौसम और कृषि विज्ञान के आधार पर प्रकोप आने से पहले ही आपके खेत को सचेत करता है।'
            : lang === 'mr'
            ? 'फसल रक्षक प्रत्यक्ष हवामान आणि कृषी विज्ञानावर आधारित, कीड येण्यापूर्वीच तुमच्या शेताला सावध करतो.'
            : 'Fasal Rakshak warns your field before the outbreak arrives — grounded in real weather data, built on real agricultural science.'}
        </p>

        {/* Two Signature Pill Buttons (Primary Button & Secondary Button) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* CTA 1: Solid Dark Olive Pill (Primary Button) */}
          <button
            id="hero-check-crop-cta"
            onClick={() => onNavigate('check-crop')}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#1B4332] text-[#FBF3E4] font-title-sm text-title-sm shadow-xl hover:bg-[#245741] hover:scale-[1.02] hover:shadow-2xl border border-primary/30 transition-all duration-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            <span>{t.common.checkCropBtn}</span>
            <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>

          {/* CTA 2: Sunset Amber Gradient Pill (Secondary Button) */}
          <button
            id="hero-my-area-cta"
            onClick={() => onNavigate('my-area')}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-secondary-container via-secondary to-secondary text-[#161309] font-title-sm text-title-sm font-bold shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">location_on</span>
            <span>{t.common.checkAreaBtn}</span>
          </button>
        </div>

        {/* Small Font Helpline Note on Hero page */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-sans-brand text-on-surface-variant/90">
          <span className="material-symbols-outlined text-[15px] text-secondary">support_agent</span>
          <span>
            {lang === 'mr'
              ? 'महाराष्ट्र कृषी मंत्रालय शेतकरी हेल्पलाइन:'
              : lang === 'hi'
              ? 'महाराष्ट्र कृषि मंत्रालय किसान हेल्पलाइन:'
              : 'Maharashtra Agriculture Ministry Helpline:'}
          </span>
          <a
            id="hero-helpline-link"
            href="tel:18002334000"
            className="font-mono font-bold text-secondary hover:underline"
          >
            1800-233-4000
          </a>
          <span className="text-white/40">
            ({lang === 'mr' ? 'टोल-फ्री' : lang === 'hi' ? 'टोल-फ्री' : 'Toll-Free'})
          </span>
        </div>

        {/* Gently Bouncing Scroll-Cue Icon — fills the Generous gap with purpose and signals more below */}
        <div className="mt-12 md:mt-16 flex flex-col items-center">
          <a
            href="#stat-section"
            aria-label="Scroll to outbreak analysis"
            className="group flex flex-col items-center gap-1.5 text-on-surface-variant hover:text-secondary transition-colors cursor-pointer focus:outline-none"
          >
            <span className="font-sans-brand text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-secondary/80 group-hover:text-secondary transition-colors">
              {lang === 'hi' ? 'विश्लेषण देखें' : lang === 'mr' ? 'खाली पहा' : 'Explore'}
            </span>
            <span className="material-symbols-outlined text-[24px] animate-bounce text-secondary">
              keyboard_arrow_down
            </span>
          </a>
        </div>
      </div>

      {/* Photo-to-solid-color Transition Bridge: 260px gradient overlay progressively darkening into #161309 */}
      <div className="absolute bottom-0 left-0 w-full h-[260px] bg-gradient-to-b from-transparent via-[#161309]/75 to-[#161309] pointer-events-none z-10" />
    </section>
  );
};
