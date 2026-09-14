import React from 'react';
import { SimpleRiskLevel, Language } from '../../types';
import { TRANSLATIONS } from '../../translations';

// 1. CARD: cream/white background, 16px rounded corners, soft shadow, generous internal padding
export const SharedCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({ children, className = '', id }) => {
  return (
    <div
      id={id}
      className={`bg-[#FDF8EE] text-[#161309] rounded-[16px] p-6 sm:p-8 shadow-md border border-[#e8dfcf] ${className}`}
    >
      {children}
    </div>
  );
};

// 2. RISK BADGE: small pill, always icon + color + word together (never color alone) — Low (green), Medium (amber), High (red)
export const SharedRiskBadge: React.FC<{
  level: SimpleRiskLevel;
  lang: Language;
  size?: 'default' | 'hero';
  id?: string;
}> = ({ level, lang, size = 'default', id }) => {
  const t = TRANSLATIONS[lang].common;

  const isHero = size === 'hero';

  if (level === 'low') {
    return (
      <span
        id={id}
        className={`inline-flex items-center gap-2 rounded-full font-bold border transition-all ${
          isHero
            ? 'px-6 py-3 text-lg bg-[#e8f5e9] text-[#1B4332] border-[#a5d6a7] shadow-sm'
            : 'px-3.5 py-1.5 text-xs bg-[#e8f5e9] text-[#1B4332] border-[#a5d6a7]'
        }`}
      >
        <span
          className={`material-symbols-outlined font-bold ${
            isHero ? 'text-[22px]' : 'text-[16px]'
          } text-[#2e7d32]`}
        >
          check_circle
        </span>
        <span className="font-sans-brand tracking-wide">{t.lowRisk}</span>
      </span>
    );
  }

  if (level === 'medium') {
    return (
      <span
        id={id}
        className={`inline-flex items-center gap-2 rounded-full font-bold border transition-all ${
          isHero
            ? 'px-6 py-3 text-lg bg-[#fff8e1] text-[#8d5b00] border-[#ffe082] shadow-sm'
            : 'px-3.5 py-1.5 text-xs bg-[#fff8e1] text-[#8d5b00] border-[#ffe082]'
        }`}
      >
        <span
          className={`material-symbols-outlined font-bold ${
            isHero ? 'text-[22px]' : 'text-[16px]'
          } text-[#da9600]`}
        >
          warning
        </span>
        <span className="font-sans-brand tracking-wide">{t.mediumRisk}</span>
      </span>
    );
  }

  // High
  return (
    <span
      id={id}
      className={`inline-flex items-center gap-2 rounded-full font-bold border transition-all ${
        isHero
          ? 'px-6 py-3 text-lg bg-[#ffebee] text-[#b71c1c] border-[#ffcdd2] shadow-sm'
          : 'px-3.5 py-1.5 text-xs bg-[#ffebee] text-[#b71c1c] border-[#ffcdd2]'
      }`}
    >
      <span
        className={`material-symbols-outlined font-bold ${
          isHero ? 'text-[22px]' : 'text-[16px]'
        } text-[#c62828]`}
      >
        error
      </span>
      <span className="font-sans-brand tracking-wide">{t.highRisk}</span>
    </span>
  );
};

// 3. PRIMARY BUTTON: solid dark-olive pill, cream text
export const SharedPrimaryButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}> = ({ children, onClick, className = '', id, type = 'button', fullWidth = false }) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#1B4332] text-[#FBF3E4] font-title-sm font-semibold hover:bg-[#245741] transition-all duration-200 shadow-md cursor-pointer ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};

// 4. SECONDARY BUTTON: amber-gradient pill, dark text
export const SharedSecondaryButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}> = ({ children, onClick, className = '', id, type = 'button', fullWidth = false }) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#da9600] via-[#ffba42] to-[#ffba42] text-[#161309] font-title-sm font-bold shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};

// 5. SECTION HEADER: page title in heavy serif font, one short plain-sans subtitle beneath it, left-aligned, same spacing every time
export const SharedSectionHeader: React.FC<{
  title: string;
  subtitle: string;
  id?: string;
}> = ({ title, subtitle, id }) => {
  return (
    <div id={id} className="mb-8 text-left">
      <h1 className="font-serif-brand font-bold text-3xl sm:text-4xl text-[#eae2d0] leading-tight tracking-tight">
        {title}
      </h1>
      <p className="font-sans-brand text-base sm:text-lg text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

// 6. LIST ROW: icon on the left, two lines of stacked text on the right (bold top line, muted bottom line), thin divider beneath
export const SharedListRow: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
  isLast?: boolean;
  id?: string;
}> = ({ icon, title, subtitle, isLast = false, id }) => {
  return (
    <div
      id={id}
      className={`flex items-start gap-4 py-4 ${
        !isLast ? 'border-b border-[#e8dfcf]' : ''
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-[#f3ebd8] flex items-center justify-center shrink-0 text-[#1B4332]">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-sans-brand font-bold text-sm sm:text-base text-[#161309] leading-snug">
          {title}
        </h4>
        <p className="font-sans-brand text-xs sm:text-sm text-[#615c52] mt-0.5 leading-normal">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

// 7. LOADING STATE: the ripple/radar icon gently pulsing, with one short line of text beneath ("Analyzing your photo..."). No spinners, no progress bars — the ripple animation IS the loading state everywhere in the app.
export const SharedLoadingState: React.FC<{
  message: string;
  id?: string;
}> = ({ message, id }) => {
  return (
    <div
      id={id}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {/* Ripple / radar concentric pulse */}
      <div className="relative w-28 h-28 flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-secondary/20 animate-ping" />
        <div className="absolute inset-3 rounded-full border border-secondary/40 animate-pulse" />
        <div className="absolute inset-6 rounded-full border border-[#ffba42]/60" />
        <div className="w-12 h-12 rounded-full bg-[#ffba42]/20 flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined text-[28px] animate-pulse">
            radar
          </span>
        </div>
      </div>
      <p className="font-sans-brand text-base sm:text-lg text-[#eae2d0] font-medium tracking-wide">
        {message}
      </p>
    </div>
  );
};
