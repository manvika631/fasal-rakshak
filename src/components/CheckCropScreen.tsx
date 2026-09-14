import React, { useState, useRef } from 'react';
import { Language, ActiveScreen } from '../types';
import { TRANSLATIONS } from '../translations';
import { detectCropDisease, CropDiseasePrediction } from '../lib/checkCropApi';
import {
  SharedCard,
  SharedRiskBadge,
  SharedPrimaryButton,
  SharedSecondaryButton,
  SharedSectionHeader,
  SharedLoadingState
} from './common/SharedPatterns';

interface CheckCropScreenProps {
  lang: Language;
  onNavigate: (screen: ActiveScreen) => void;
}

type CropInspectionState = 'upload' | 'analyzing' | 'result-issue' | 'result-healthy';

export const CheckCropScreen: React.FC<CheckCropScreenProps> = ({ lang, onNavigate }) => {
  const [currentState, setCurrentState] = useState<CropInspectionState>('upload');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState<boolean>(false);
  const [hasWarnedFarmers, setHasWarnedFarmers] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<CropDiseasePrediction | null>(null);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[lang];

  // Default sample images for quick testing
  const SAMPLE_INFESTED = 'https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?auto=format&fit=crop&w=600&q=80';
  const SAMPLE_HEALTHY = 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80';

  const processImage = async (image: File | string, imgPreviewUrl: string, isHealthy = false) => {
    setPhotoUrl(imgPreviewUrl);
    setCurrentState('analyzing');
    setShowTechnicalDetails(false);
    setHasWarnedFarmers(false);
    setPrediction(null);
    setUsingFallback(false);

    try {
      const result = await detectCropDisease(image);
      setPrediction(result);
      const healthy =
        isHealthy ||
        /healthy/i.test(result.disease_key) ||
        /healthy/i.test(result.disease_name);
      setTimeout(() => {
        setCurrentState(healthy ? 'result-healthy' : 'result-issue');
      }, 400);
    } catch (err) {
      console.error('Crop detection API failed:', err);
      setUsingFallback(true);
      // Graceful fallback keeps the site usable even when the AI backend is down.
      setTimeout(() => {
        setCurrentState(isHealthy ? 'result-healthy' : 'result-issue');
      }, 1800);
    }
  };

  const triggerAnalysis = (imgUrl: string, isHealthy: boolean = false) => {
    void processImage(imgUrl, imgUrl, isHealthy);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      void processImage(file, url);
    }
  };

  const handleReset = () => {
    setCurrentState('upload');
    setPhotoUrl(null);
    setShowTechnicalDetails(false);
    setHasWarnedFarmers(false);
    setPrediction(null);
    setUsingFallback(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const confidencePct = prediction
    ? Math.round(prediction.confidence * 100)
    : 0;

  return (
    <div className="w-full py-[40px] md:py-[64px] px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto flex flex-col justify-start">
      {/* SECTION HEADER: page title in heavy serif, one short plain-sans subtitle beneath it */}
      <SharedSectionHeader
        id="check-crop-header"
        title={t.checkCrop.title}
        subtitle={t.checkCrop.subtitle}
      />

      {/* Hidden file input supporting camera & gallery */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* STATE 1: UPLOAD (Default View) */}
      {currentState === 'upload' && (
        <div className="flex flex-col items-center justify-center mt-8">
          {/* One large, centered button — camera/upload icon + label "Take or Upload Photo" */}
          <button
            id="take-or-upload-photo-btn"
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-md py-10 px-8 rounded-full bg-[#1B4332] text-[#FBF3E4] hover:bg-[#245741] transition-all duration-300 shadow-xl border border-primary/20 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:scale-[1.02]"
          >
            <div className="w-16 h-16 rounded-full bg-[#245741] group-hover:bg-[#2e6d51] flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[36px] text-secondary">
                photo_camera
              </span>
            </div>
            <span className="font-serif-brand font-bold text-xl sm:text-2xl text-center leading-snug">
              {t.common.takeOrUploadPhoto}
            </span>
          </button>

          {/* Quick sample photo selector for easy evaluation without a live camera */}
          <div className="mt-8 text-center">
            <p className="font-sans-brand text-xs text-on-surface-variant mb-3">
              {t.common.samplePhotoPrompt}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => triggerAnalysis(SAMPLE_INFESTED)}
                className="text-xs font-sans-brand font-medium text-secondary hover:underline cursor-pointer bg-surface-container-high px-4 py-2 rounded-full border border-white/5"
              >
                {t.common.testInfested}
              </button>
              <button
                onClick={() => triggerAnalysis(SAMPLE_HEALTHY, true)}
                className="text-xs font-sans-brand font-medium text-secondary hover:underline cursor-pointer bg-surface-container-high px-4 py-2 rounded-full border border-white/5"
              >
                {t.common.testHealthy}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATE 2: ANALYZING */}
      {currentState === 'analyzing' && (
        <SharedLoadingState
          id="crop-analyzing-state"
          message={t.checkCrop.analyzing}
        />
      )}

      {/* STATE 3a: RESULT — ISSUE DETECTED */}
      {currentState === 'result-issue' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Small thumbnail of the uploaded photo at top */}
          {photoUrl && (
            <div className="flex items-center gap-4 bg-surface-container-high/60 p-3 rounded-2xl border border-white/10 w-fit">
              <img
                src={photoUrl}
                alt="Uploaded crop leaf thumbnail"
                className="w-14 h-14 rounded-xl object-cover border border-white/10"
              />
              <div className="pr-4">
                <span className="text-xs text-on-surface-variant font-sans-brand block">
                  Analyzed Photo
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-secondary hover:underline font-medium cursor-pointer"
                >
                  {t.common.reset}
                </button>
              </div>
            </div>
          )}

          {usingFallback ? (
            /* FALLBACK: simulated result shown when the AI backend is unreachable */
            <SharedCard id="crop-issue-result-card" className="space-y-6">
              {/* Demo mode chip */}
              <div className="flex items-center justify-between gap-3 border-b border-[#e8dfcf] pb-4">
                <h2 className="font-serif-brand font-bold text-2xl sm:text-3xl text-[#161309]">
                  {t.checkCrop.issueDetected.name}
                </h2>
                <SharedRiskBadge level="high" lang={lang} id="result-risk-badge" />
              </div>
              <p className="font-sans-brand font-bold text-base sm:text-lg text-[#161309]">
                {t.checkCrop.symptomsVisiblePrefix}{' '}
                <span className="text-[#b71c1c] underline decoration-[#ffcdd2] underline-offset-4">
                  {t.checkCrop.symptomsVisibleDays}
                </span>
              </p>
              <div className="space-y-3 py-1">
                <p className="font-sans-brand text-sm sm:text-base text-[#2d2a1e] leading-relaxed">
                  {t.checkCrop.issueDetected.step1}
                </p>
                <p className="font-sans-brand text-sm sm:text-base text-[#2d2a1e] leading-relaxed">
                  {t.checkCrop.issueDetected.step2}
                </p>
                <p className="font-sans-brand text-sm sm:text-base text-[#2d2a1e] leading-relaxed">
                  {t.checkCrop.issueDetected.step3}
                </p>
              </div>
              <div className="pt-2 border-t border-[#e8dfcf]">
                <button
                  type="button"
                  onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                  className="text-xs sm:text-sm font-sans-brand font-semibold text-[#1B4332] hover:text-[#245741] underline cursor-pointer flex items-center gap-2"
                >
                  <span>
                    {showTechnicalDetails
                      ? t.checkCrop.hideTechnicalDetails
                      : t.checkCrop.showTechnicalDetails}
                  </span>
                  <span className="material-symbols-outlined text-[16px]">
                    {showTechnicalDetails ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {showTechnicalDetails && (
                  <div className="mt-4 p-4 rounded-xl bg-[#f4ece0] text-xs space-y-2 border border-[#ded5c5]">
                    <p className="font-sans-brand text-[#393529] leading-relaxed font-mono">
                      {t.checkCrop.issueDetected.techDosage}
                    </p>
                    <p className="font-sans-brand text-[#575246] leading-relaxed">
                      {t.checkCrop.issueDetected.techWeather}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-xs font-sans-brand text-[#615c52] text-center pt-1">
                Demo mode — AI analysis server is not connected.
              </p>
            </SharedCard>
          ) : prediction ? (
            /* REAL AI RESULT from the FastAPI backend */
            <SharedCard id="crop-issue-result-card" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8dfcf] pb-4">
                <div>
                  <h2 className="font-serif-brand font-bold text-2xl sm:text-3xl text-[#161309]">
                    {prediction.disease_name}
                  </h2>
                  <p className="font-sans-brand text-xs text-[#615c52] mt-1">
                    Detection method:{' '}
                    {prediction.method === 'trained_classifier'
                      ? 'Trained neural network'
                      : 'Visual matching (few-shot)'}
                  </p>
                </div>
                <SharedRiskBadge level="high" lang={lang} id="result-risk-badge" />
              </div>

              {/* AI confidence */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-sans-brand text-xs font-semibold text-[#615c52]">
                    AI Confidence
                  </span>
                  <span className="font-sans-brand text-sm font-bold text-[#1B4332]">
                    {confidencePct}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#f3ebd8] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#da9600] via-[#ffba42] to-[#da9600]"
                    style={{ width: `${confidencePct}%` }}
                  />
                </div>
              </div>

              {prediction.low_confidence && (
                <p className="font-sans-brand text-xs text-[#b71c1c] bg-[#ffebee] border border-[#ffcdd2] rounded-xl px-3.5 py-2.5 leading-relaxed">
                  Low confidence — try uploading a clearer, closer photo in good lighting for a more reliable result.
                </p>
              )}

              <div className="space-y-4 py-1">
                <div>
                  <h3 className="font-sans-brand font-bold text-sm text-[#1B4332] mb-1">
                    Cause
                  </h3>
                  <p className="font-sans-brand text-sm text-[#2d2a1e] leading-relaxed">
                    {prediction.info.cause}
                  </p>
                </div>
                <div>
                  <h3 className="font-sans-brand font-bold text-sm text-[#1B4332] mb-1">
                    Symptoms
                  </h3>
                  <p className="font-sans-brand text-sm text-[#2d2a1e] leading-relaxed">
                    {prediction.info.symptoms}
                  </p>
                </div>
                <div>
                  <h3 className="font-sans-brand font-bold text-sm text-[#1B4332] mb-1">
                    Recommended Action
                  </h3>
                  <p className="font-sans-brand text-sm text-[#2d2a1e] leading-relaxed">
                    {prediction.info.treatment}
                  </p>
                </div>
              </div>

              {/* Technical details */}
              <div className="pt-2 border-t border-[#e8dfcf]">
                <button
                  type="button"
                  onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                  className="text-xs sm:text-sm font-sans-brand font-semibold text-[#1B4332] hover:text-[#245741] underline cursor-pointer flex items-center gap-2"
                >
                  <span>
                    {showTechnicalDetails
                      ? t.checkCrop.hideTechnicalDetails
                      : t.checkCrop.showTechnicalDetails}
                  </span>
                  <span className="material-symbols-outlined text-[16px]">
                    {showTechnicalDetails ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {showTechnicalDetails && (
                  <div className="mt-4 p-4 rounded-xl bg-[#f4ece0] text-xs space-y-2 border border-[#ded5c5]">
                    <p className="font-sans-brand text-[#393529] leading-relaxed font-mono">
                      Class: {prediction.disease_key}
                    </p>
                    <p className="font-sans-brand text-[#575246] leading-relaxed">
                      Method: {prediction.method === 'trained_classifier'
                        ? 'trained_classifier'
                        : 'few_shot (MobileNetV2 visual embeddings + cosine similarity)'}
                    </p>
                    {prediction.similarities && (
                      <p className="font-sans-brand text-[#575246] leading-relaxed">
                        Similarity: {Object.entries(prediction.similarities)
                          .slice(0, 3)
                          .map(([cls, s]) => `${cls} ${(s * 100).toFixed(0)}%`)
                          .join(' · ')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </SharedCard>
          ) : (
            /* Safety net — should not normally render */
            <SharedCard id="crop-issue-result-card">
              <p className="font-sans-brand text-sm text-[#2d2a1e]">
                Analysis could not be completed. Please try again.
              </p>
              <div className="pt-4">
                <SharedSecondaryButton id="retry-btn" fullWidth onClick={handleReset}>
                  {t.common.reset}
                </SharedSecondaryButton>
              </div>
            </SharedCard>
          )}

          {/* Below the card, one Secondary Button, full width: "Warn Nearby Farmers" */}
          <div className="pt-4">
            {!hasWarnedFarmers ? (
              <SharedSecondaryButton
                id="warn-nearby-farmers-btn"
                fullWidth
                onClick={() => setHasWarnedFarmers(true)}
              >
                <span className="material-symbols-outlined text-[20px]">
                  campaign
                </span>
                <span>{t.checkCrop.warnNearbyBtn}</span>
              </SharedSecondaryButton>
            ) : (
              <div
                id="warn-nearby-farmers-confirmed"
                className="w-full py-4 px-6 rounded-full bg-[#1B4332]/20 border border-primary/30 text-primary-fixed text-center font-sans-brand font-bold text-sm sm:text-base flex items-center justify-center gap-2 animate-fadeIn"
              >
                <span className="material-symbols-outlined text-[20px] text-secondary">
                  check_circle
                </span>
                <span>{t.checkCrop.farmersNotified}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STATE 3b: RESULT — LOOKS HEALTHY */}
      {currentState === 'result-healthy' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Small thumbnail */}
          {photoUrl && (
            <div className="flex items-center gap-4 bg-surface-container-high/60 p-3 rounded-2xl border border-white/10 w-fit">
              <img
                src={photoUrl}
                alt="Uploaded crop leaf thumbnail"
                className="w-14 h-14 rounded-xl object-cover border border-white/10"
              />
              <div className="pr-4">
                <span className="text-xs text-on-surface-variant font-sans-brand block">
                  Analyzed Photo
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-secondary hover:underline font-medium cursor-pointer"
                >
                  {t.common.reset}
                </button>
              </div>
            </div>
          )}

          {/* One Card */}
          <SharedCard id="crop-healthy-result-card" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8dfcf] pb-4">
              <h2 className="font-serif-brand font-bold text-xl sm:text-2xl text-[#161309] leading-snug">
                {t.checkCrop.healthyHeading}
              </h2>
              <SharedRiskBadge level="low" lang={lang} id="healthy-risk-badge" />
            </div>

            <p className="font-sans-brand text-sm sm:text-base text-[#4a463e] leading-relaxed">
              {prediction
                ? `${prediction.disease_name}. ${prediction.info.treatment}`
                : t.checkCrop.healthyReason}
            </p>

            {prediction && (
              <div className="flex items-center justify-between">
                <span className="font-sans-brand text-xs font-semibold text-[#615c52]">
                  AI Confidence
                </span>
                <span className="font-sans-brand text-sm font-bold text-[#1B4332]">
                  {confidencePct}%
                </span>
              </div>
            )}
          </SharedCard>

          {/* Below card: One Primary Button: "Check Your Area" */}
          <div className="pt-4">
            <SharedPrimaryButton
              id="healthy-check-area-btn"
              fullWidth
              onClick={() => onNavigate('my-area')}
            >
              <span>{t.common.checkAreaBtn}</span>
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </SharedPrimaryButton>
          </div>
        </div>
      )}

      {/* Small font size Maharashtra Agriculture Ministry Helpline on Check Crop page */}
      <div className="mt-8 pt-4 border-t border-white/10 text-center text-xs font-sans-brand text-on-surface-variant">
        <p className="flex items-center justify-center gap-1.5 flex-wrap">
          <span className="material-symbols-outlined text-[15px] text-secondary">support_agent</span>
          <span>
            {lang === 'mr'
              ? 'शासकीय मदतीसाठी महाराष्ट्र कृषी मंत्रालय हेल्पलाइन:'
              : lang === 'hi'
              ? 'सरकारी सहायता हेतु महाराष्ट्र कृषि मंत्रालय हेल्पलाइन:'
              : 'For expert agronomist guidance: Maharashtra Agriculture Ministry Helpline'}
          </span>
          <a
            id="check-crop-helpline-link"
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