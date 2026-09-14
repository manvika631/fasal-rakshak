import React, { useState } from 'react';
import { Language, ActiveScreen, SimpleRiskLevel } from '../types';
import { TRANSLATIONS } from '../translations';
import {
  SharedCard,
  SharedRiskBadge,
  SharedPrimaryButton,
  SharedSectionHeader,
  SharedListRow
} from './common/SharedPatterns';

interface YourAreaScreenProps {
  lang: Language;
  onNavigate: (screen: ActiveScreen) => void;
  userDistrict?: string;
}

export const YourAreaScreen: React.FC<YourAreaScreenProps> = ({
  lang,
  onNavigate,
  userDistrict = 'Ralegaon, Yavatmal'
}) => {
  const [showEmptyState, setShowEmptyState] = useState<boolean>(false);
  const [areaRisk] = useState<SimpleRiskLevel>('medium');

  const t = TRANSLATIONS[lang];

  return (
    <div className="w-full py-[40px] md:py-[64px] px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto flex flex-col justify-start">
      {/* SECTION HEADER: "Your Area" / village + district name */}
      <SharedSectionHeader
        id="your-area-header"
        title={t.myArea.title}
        subtitle={userDistrict || t.myArea.locationDefault}
      />

      {/* HERO ELEMENT: Large Risk Badge at top of the page, bigger than anywhere else on the site */}
      <div className="mb-6 flex items-center justify-between">
        <SharedRiskBadge
          level={showEmptyState ? 'low' : areaRisk}
          lang={lang}
          size="hero"
          id="hero-area-risk-badge"
        />

        {/* Subtle toggle to allow testing empty state */}
        <button
          onClick={() => setShowEmptyState(!showEmptyState)}
          className="text-xs font-sans-brand text-on-surface-variant hover:text-secondary underline cursor-pointer"
        >
          {showEmptyState ? 'Show Active Reports' : 'Simulate Clean Area'}
        </button>
      </div>

      {/* One plain-language line explaining the risk level */}
      <div className="mb-8">
        <p className="font-sans-brand text-lg sm:text-xl text-[#eae2d0] leading-relaxed">
          {showEmptyState ? t.myArea.riskLowNotice : t.myArea.riskRisingNotice}
        </p>
      </div>

      {/* One Card containing the list group (Shared Card pattern) */}
      <SharedCard id="your-area-reports-card" className="mb-8">
        {!showEmptyState ? (
          <div>
            <h3 className="font-serif-brand font-bold text-lg text-[#161309] mb-2">
              {t.myArea.reportsHeading}
            </h3>

            {/* A short list (Shared List Row pattern), 2-4 items max, most recent first */}
            <div className="divide-y divide-[#e8dfcf]">
              <SharedListRow
                id="area-report-row-1"
                icon="pest_control"
                title={t.myArea.report1.issue}
                subtitle={t.myArea.report1.detail}
              />
              <SharedListRow
                id="area-report-row-2"
                icon="bug_report"
                title={t.myArea.report2.issue}
                subtitle={t.myArea.report2.detail}
              />
              <SharedListRow
                id="area-report-row-3"
                icon="water_drop"
                title={t.myArea.report3.issue}
                subtitle={t.myArea.report3.detail}
                isLast
              />
            </div>
          </div>
        ) : (
          /* Empty state: if there's nothing to show, replace the list with one reassuring line */
          <div
            id="area-empty-state"
            className="py-6 flex flex-col items-center justify-center text-center gap-4"
          >
            <span className="material-symbols-outlined text-[36px] text-[#2e7d32]">
              verified
            </span>
            <p className="font-sans-brand font-medium text-base text-[#161309]">
              {t.myArea.emptyState}
            </p>
          </div>
        )}
      </SharedCard>

      {/* One Primary Button at the bottom: "Check Your Crop" */}
      <div className="mt-8">
        <SharedPrimaryButton
          id="area-check-crop-bottom-btn"
          fullWidth
          onClick={() => onNavigate('check-crop')}
        >
          <span className="material-symbols-outlined text-[20px]">
            photo_camera
          </span>
          <span>{t.common.checkCropBtn}</span>
        </SharedPrimaryButton>
      </div>

      {/* Small font size Maharashtra Agriculture Ministry Helpline on Your Area page */}
      <div className="mt-8 pt-4 border-t border-white/10 text-center text-xs font-sans-brand text-on-surface-variant">
        <p className="flex items-center justify-center gap-1.5 flex-wrap">
          <span className="material-symbols-outlined text-[15px] text-secondary">support_agent</span>
          <span>
            {lang === 'mr'
              ? 'स्थानिक प्रादुर्भाव नोंद किंवा मदतीसाठी महाराष्ट्र कृषी मंत्रालय हेल्पलाइन:'
              : lang === 'hi'
              ? 'स्थानीय प्रकोप रिपोर्ट या सहायता हेतु महाराष्ट्र कृषि मंत्रालय हेल्पलाइन:'
              : 'Report local outbreaks or request assistance: Maharashtra Agriculture Ministry Helpline'}
          </span>
          <a
            id="your-area-helpline-link"
            href="tel:18002334000"
            className="font-mono font-bold text-secondary hover:underline"
          >
            1800-233-4000
          </a>
          <span className="text-white/40">({lang === 'mr' ? 'टोल-फ्री' : lang === 'hi' ? 'टोल-फ्री' : 'Toll-Free'})</span>
        </p>
      </div>
    </div>
  );
};
