/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveScreen, Language, RegisteredField, FieldObservation, FarmerUser } from './types';
import { INITIAL_OBSERVATIONS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { StatSection } from './components/StatSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { InvitationSection } from './components/InvitationSection';
import { CheckCropScreen } from './components/CheckCropScreen';
import { YourAreaScreen } from './components/YourAreaScreen';
import { HowItWorksScreen } from './components/HowItWorksScreen';
import { CommunityScreen } from './components/CommunityScreen';
import { AuthModal } from './components/AuthModal';
import { FieldSentinelModal } from './components/FieldSentinelModal';
import { ReportObservationModal } from './components/ReportObservationModal';

export default function App() {
  const getInitialScreen = (): ActiveScreen => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/community' || hash === '#community') return 'community';
    if (path === '/check-crop' || hash === '#check-crop') return 'check-crop';
    if (path === '/my-area' || hash === '#my-area') return 'my-area';
    if (path === '/how-it-works' || hash === '#how-it-works') return 'how-it-works';
    return 'home';
  };

  const [activeScreen, setActiveScreen] = useState<ActiveScreen>(getInitialScreen);
  const [lang, setLang] = useState<Language>('en');
  const [isSentinelModalOpen, setIsSentinelModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [registeredField, setRegisteredField] = useState<RegisteredField | null>(null);
  const [observations, setObservations] = useState<FieldObservation[]>(INITIAL_OBSERVATIONS);

  // Farmer User Auth session
  const [currentUser, setCurrentUser] = useState<FarmerUser | null>(() => {
    const saved = localStorage.getItem('fasal_rakshak_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    return null;
  });

  useEffect(() => {
    const handlePopState = () => {
      setActiveScreen(getInitialScreen());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleNavigate = (screen: ActiveScreen) => {
    setActiveScreen(screen);
    try {
      if (screen === 'home') {
        window.history.pushState(null, '', '/');
      } else {
        window.history.pushState(null, '', `/${screen}`);
      }
    } catch (e) {
      // fallback for constrained sandboxes
      window.location.hash = screen;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: FarmerUser) => {
    setCurrentUser(user);
    localStorage.setItem('fasal_rakshak_auth_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fasal_rakshak_auth_user');
  };

  const handleSaveField = (field: RegisteredField) => {
    setRegisteredField(field);
    setIsSentinelModalOpen(false);
  };

  const handleSubmitObservation = (newObs: FieldObservation) => {
    setObservations(prev => [newObs, ...prev]);
  };

  return (
    <div className="min-h-screen w-full bg-[#161309] text-on-surface flex flex-col antialiased selection:bg-[#ffba42] selection:text-[#161309]">
      {/* Top Header with Nav links and Language Toggle: EN | हिं | मर */}
      <Header
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        lang={lang}
        onSelectLang={setLang}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full bg-[#161309] pt-[100px] sm:pt-[104px]">
        {/* PAGE 1: HOME */}
        {activeScreen === 'home' && (
          <div className="flex flex-col w-full animate-fadeIn">
            {/* SECTION 1: HERO */}
            <HeroSection
              onNavigate={handleNavigate}
              lang={lang}
            />

            {/* SECTION 2: THE ONE STAT (80%) */}
            <StatSection lang={lang} />

            {/* SECTION 3: HOW IT WORKS */}
            <HowItWorksSection lang={lang} />

            {/* SECTION 4: THE INVITATION */}
            <InvitationSection
              onNavigate={handleNavigate}
              lang={lang}
            />
          </div>
        )}

        {/* PAGE 2: CHECK YOUR CROP */}
        {activeScreen === 'check-crop' && (
          <div className="animate-fadeIn w-full">
            <CheckCropScreen
              lang={lang}
              onNavigate={handleNavigate}
            />
          </div>
        )}

        {/* PAGE 3: YOUR AREA */}
        {activeScreen === 'my-area' && (
          <div className="animate-fadeIn w-full">
            <YourAreaScreen
              lang={lang}
              onNavigate={handleNavigate}
              userDistrict={registeredField ? `${registeredField.district} (${registeredField.state})` : undefined}
            />
          </div>
        )}

        {/* PAGE 4: COMMUNITY & MINISTRY QA FORUM */}
        {activeScreen === 'community' && (
          <div className="animate-fadeIn w-full">
            <CommunityScreen
              currentUser={currentUser}
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onLogout={handleLogout}
              onNavigate={handleNavigate}
              lang={lang}
            />
          </div>
        )}

        {/* AUXILIARY: HOW IT WORKS */}
        {activeScreen === 'how-it-works' && (
          <div className="animate-fadeIn">
            <HowItWorksScreen
              onNavigate={handleNavigate}
              onOpenSentinel={() => setIsSentinelModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} lang={lang} />

      {/* Farmer Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        lang={lang}
      />

      {/* Field Sentinel Registration & Telemetry Modal */}
      <FieldSentinelModal
        isOpen={isSentinelModalOpen}
        onClose={() => setIsSentinelModalOpen(false)}
        registeredField={registeredField}
        onSaveField={handleSaveField}
      />

      {/* Report Observation Dialog */}
      <ReportObservationModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmitObservation={handleSubmitObservation}
      />
    </div>
  );
}
