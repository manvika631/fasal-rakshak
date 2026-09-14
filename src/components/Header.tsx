import React, { useState } from 'react';
import { ActiveScreen, FarmerUser, Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
  onSelectLang: (lang: Language) => void;
  currentUser?: FarmerUser | null;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  lang,
  onSelectLang,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[lang].nav;

  const handleNav = (screen: ActiveScreen) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="site-header"
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-[#161309]/95 backdrop-blur-md border-b border-white/5"
    >
      {/* Top Utility Helpline Strip — small font size, visible on every page */}
      <div
        id="header-helpline-strip"
        className="w-full bg-[#11291d] border-b border-white/10 px-margin-mobile md:px-margin py-1.5 text-[11px] sm:text-xs text-on-surface-variant flex items-center justify-between"
      >
        <div className="flex items-center gap-2 max-w-full truncate">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="material-symbols-outlined text-[14px] text-secondary">support_agent</span>
          <span className="font-sans-brand font-medium text-[#e4dac6]">
            {lang === 'mr'
              ? 'महाराष्ट्र कृषी मंत्रालय शेतकरी हेल्पलाइन:'
              : lang === 'hi'
              ? 'महाराष्ट्र कृषि मंत्रालय किसान हेल्पलाइन:'
              : 'Maharashtra Agriculture Ministry Helpline:'}
          </span>
          <a
            id="header-helpline-link"
            href="tel:18002334000"
            className="font-mono font-bold text-secondary hover:text-white transition-colors"
          >
            1800-233-4000
          </a>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="hidden sm:inline text-white/60 text-[11px]">
            {lang === 'mr' ? 'टोल-फ्री' : lang === 'hi' ? 'टोल-फ्री' : 'Toll-Free'}
          </span>
        </div>

        <a
          href="tel:18002334000"
          className="hidden md:inline-flex items-center gap-1 text-[11px] text-secondary hover:text-white font-medium transition-colors"
        >
          <span>{lang === 'mr' ? 'कॉल करा' : lang === 'hi' ? 'कॉल करें' : 'Call'}</span>
          <span className="material-symbols-outlined text-[12px]">north_east</span>
        </a>
      </div>

      <div className="h-18 w-full px-margin-mobile md:px-margin flex items-center justify-between">
        {/* Left: Fasal Rakshak wordmark */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center group cursor-pointer text-left focus:outline-none"
          id="nav-logo-btn"
        >
          <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface select-none font-bold">
            Fasal Rakshak
          </span>
        </button>

        {/* Center / Right desktop navigation: Home / Check Crop / My Area / Community */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav className="flex items-center gap-6 lg:gap-8">
            <button
              id="nav-home"
              onClick={() => handleNav('home')}
              className={`font-sans-brand text-sm transition-colors cursor-pointer ${
                activeScreen === 'home'
                  ? 'text-secondary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t.home}
            </button>

            <button
              id="nav-check-crop"
              onClick={() => handleNav('check-crop')}
              className={`font-sans-brand text-sm transition-colors cursor-pointer ${
                activeScreen === 'check-crop'
                  ? 'text-secondary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t.checkCrop}
            </button>

            <button
              id="nav-my-area"
              onClick={() => handleNav('my-area')}
              className={`font-sans-brand text-sm transition-colors cursor-pointer ${
                activeScreen === 'my-area'
                  ? 'text-secondary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t.myArea}
            </button>

            <button
              id="nav-community"
              onClick={() => handleNav('community')}
              className={`font-sans-brand text-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'community'
                  ? 'text-secondary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">forum</span>
              <span>{t.community}</span>
            </button>
          </nav>

          {/* User Auth indicator / button */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <button
                id="header-user-btn"
                onClick={() => handleNav('community')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#231f15] border border-white/10 hover:border-secondary/40 text-xs font-sans-brand text-white cursor-pointer"
                title={`${currentUser.name} (${currentUser.district})`}
              >
                <span>{currentUser.avatar || '👨‍🌾'}</span>
                <span className="max-w-[100px] truncate font-semibold">{currentUser.name}</span>
              </button>
              {onLogout && (
                <button
                  id="header-logout-btn"
                  onClick={onLogout}
                  className="text-on-surface-variant hover:text-white text-xs p-1"
                  title="Sign Out"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                </button>
              )}
            </div>
          ) : (
            onOpenAuth && (
              <button
                id="header-login-btn"
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#1B4332] hover:bg-[#245741] text-secondary text-xs font-sans-brand font-bold border border-secondary/30 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">login</span>
                <span>{lang === 'mr' ? 'प्रवेश' : lang === 'hi' ? 'साइन इन' : 'Sign In'}</span>
              </button>
            )
          )}

          {/* Far right: Language Toggle — compact 3-way segmented control: EN | हिं | मर */}
          <div
            id="lang-segmented-control"
            className="flex items-center p-1 rounded-full bg-[#231f15] border border-white/10"
            role="group"
            aria-label="Language selector"
          >
            <button
              type="button"
              id="lang-toggle-en"
              onClick={() => onSelectLang('en')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans-brand font-bold transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-[#1B4332] text-[#FBF3E4] shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              EN
            </button>
            <span className="text-white/20 text-xs select-none">|</span>
            <button
              type="button"
              id="lang-toggle-hi"
              onClick={() => onSelectLang('hi')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans-brand font-bold transition-all cursor-pointer ${
                lang === 'hi'
                  ? 'bg-[#1B4332] text-[#FBF3E4] shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              हिं
            </button>
            <span className="text-white/20 text-xs select-none">|</span>
            <button
              type="button"
              id="lang-toggle-mr"
              onClick={() => onSelectLang('mr')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans-brand font-bold transition-all cursor-pointer ${
                lang === 'mr'
                  ? 'bg-[#1B4332] text-[#FBF3E4] shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              मर
            </button>
          </div>
        </div>

        {/* Mobile menu trigger + compact language toggle for small screens */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Auth Button */}
          {currentUser ? (
            <button
              onClick={() => handleNav('community')}
              className="text-sm p-1 rounded-full bg-[#231f15]"
            >
              {currentUser.avatar || '👨‍🌾'}
            </button>
          ) : (
            onOpenAuth && (
              <button
                onClick={onOpenAuth}
                className="px-2 py-1 rounded bg-[#1B4332] text-[10px] text-secondary font-bold font-sans-brand"
              >
                Sign In
              </button>
            )
          )}

          {/* Mobile Language Toggle */}
          <div className="flex items-center p-0.5 rounded-full bg-[#231f15] border border-white/10 text-xs">
            <button
              onClick={() => onSelectLang('en')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                lang === 'en' ? 'bg-[#1B4332] text-[#FBF3E4]' : 'text-on-surface-variant'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onSelectLang('hi')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                lang === 'hi' ? 'bg-[#1B4332] text-[#FBF3E4]' : 'text-on-surface-variant'
              }`}
            >
              हिं
            </button>
            <button
              onClick={() => onSelectLang('mr')}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                lang === 'mr' ? 'bg-[#1B4332] text-[#FBF3E4]' : 'text-on-surface-variant'
              }`}
            >
              मर
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface hover:text-secondary focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161309]/95 backdrop-blur-xl border-b border-white/10 px-margin-mobile py-4 space-y-4">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left py-2 font-sans-brand text-sm text-on-surface hover:text-secondary block"
          >
            {t.home}
          </button>
          <button
            onClick={() => handleNav('check-crop')}
            className="w-full text-left py-2 font-sans-brand text-sm text-on-surface hover:text-secondary block"
          >
            {t.checkCrop}
          </button>
          <button
            onClick={() => handleNav('my-area')}
            className="w-full text-left py-2 font-sans-brand text-sm text-on-surface hover:text-secondary block"
          >
            {t.myArea}
          </button>
          <button
            onClick={() => handleNav('community')}
            className="w-full text-left py-2 font-sans-brand text-sm text-on-surface hover:text-secondary block flex items-center justify-between"
          >
            <span>{t.community}</span>
            <span className="material-symbols-outlined text-[16px] text-secondary">forum</span>
          </button>
        </div>
      )}
    </header>
  );
};

