import React from 'react';
import { ActiveScreen, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface FooterProps {
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const tNav = TRANSLATIONS[lang].nav;
  const tHelp = TRANSLATIONS[lang].helpline;

  return (
    <footer id="site-footer" className="w-full bg-[#1B4332] text-on-surface border-t border-white/10">
      <div className="w-full px-margin-mobile md:px-margin py-[56px] md:py-[80px] max-w-7xl mx-auto">
        {/* Top Section: Brand + Navigation */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-10 border-b border-white/10">
          <button
            id="footer-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer text-left focus:outline-none"
          >
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface select-none font-bold">
              Fasal Rakshak
            </span>
          </button>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8">
            <button
              id="footer-nav-home"
              onClick={() => onNavigate('home')}
              className="font-sans-brand text-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              {tNav.home}
            </button>
            <button
              id="footer-nav-check-crop"
              onClick={() => onNavigate('check-crop')}
              className="font-sans-brand text-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              {tNav.checkCrop}
            </button>
            <button
              id="footer-nav-my-area"
              onClick={() => onNavigate('my-area')}
              className="font-sans-brand text-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              {tNav.myArea}
            </button>
            <button
              id="footer-nav-community"
              onClick={() => onNavigate('community')}
              className="font-sans-brand text-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              {tNav.community}
            </button>
          </nav>
        </div>

        {/* MAHARASHTRA AGRICULTURE MINISTRY HELPLINE BLOCK */}
        <div className="py-10 border-b border-white/10">
          <div
            id="maharashtra-agri-helpline-card"
            className="p-6 sm:p-8 rounded-2xl bg-[#143225] border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-secondary text-xs font-mono uppercase tracking-wider font-semibold">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                <span>{tHelp.tollFreeLabel}</span>
              </div>
              <h3 className="font-serif-brand text-xl sm:text-2xl text-on-surface font-bold leading-snug">
                {tHelp.ministryName}
              </h3>
              <p className="font-sans-brand text-sm text-on-surface-variant leading-relaxed">
                {tHelp.operatingHours} • {lang === 'mr' ? 'कीड प्रादुर्भाव, शासकीय योजना व तातडीच्या कृषी सल्ल्यासाठी संपर्क साधा.' : lang === 'hi' ? 'कीट प्रकोप, सरकारी योजनाओं और तत्काल कृषि सलाह हेतु संपर्क करें।' : 'Direct access to state agricultural officers, pest warning reporting & government schemes.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center gap-4">
              <div className="text-left sm:text-right lg:text-left xl:text-right">
                <span className="block text-[11px] text-on-surface-variant font-sans-brand uppercase tracking-wider">
                  {lang === 'mr' ? 'मंत्रालय शेतकरी टोल-फ्री क्रमांक' : lang === 'hi' ? 'मंत्रालय किसान टोल-फ्री नंबर' : 'Ministry Toll-Free Helpline'}
                </span>
                <a
                  id="footer-helpline-link"
                  href="tel:18002334000"
                  className="font-mono text-2xl sm:text-3xl font-extrabold text-secondary hover:text-[#ffd276] transition-colors inline-block tracking-tight"
                >
                  1800-233-4000
                </a>
              </div>

              <a
                id="footer-call-now-btn"
                href="tel:18002334000"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-secondary-container via-secondary to-secondary text-[#161309] font-title-sm font-bold shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>{tHelp.callNow}</span>
              </a>
            </div>
          </div>

          {/* Secondary Helpline Note: Kisan Call Center */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-on-surface-variant font-sans-brand px-2">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px] text-secondary">support_agent</span>
              <span>{tHelp.kisanCallCenterLabel}: </span>
              <a href="tel:18001801551" className="font-mono font-bold text-on-surface hover:text-secondary underline ml-1">
                {tHelp.kisanCallCenterNumber}
              </a>
            </span>
            <span>{lang === 'mr' ? '२२ भाषांमध्ये मोफत मार्गदर्शन (सकाळी ६ ते रात्री १०)' : lang === 'hi' ? '22 भाषाओं में निःशुल्क मार्गदर्शन (सुबह 6 से रात 10 बजे)' : 'Toll-free national farmer advisory in Marathi & Hindi'}</span>
          </div>
        </div>

        {/* Bottom Section: Copyright & Identification */}
        <div className="mt-8 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-surface-variant font-label-sm text-label-sm">
          <p>© Fasal Rakshak Early Warning Network. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="font-label-sm text-label-sm text-secondary/80 tracking-wider uppercase">
              Maharashtra Agronomic Early Warning
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs text-on-surface-variant font-mono">Helpline: 1800-233-4000</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
