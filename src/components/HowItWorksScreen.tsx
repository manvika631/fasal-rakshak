import React, { useState } from 'react';
import { ActiveScreen } from '../types';

interface HowItWorksScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenSentinel?: () => void;
}

export const HowItWorksScreen: React.FC<HowItWorksScreenProps> = ({ onNavigate, onOpenSentinel }) => {
  const [interactiveTemp, setInteractiveTemp] = useState<number>(26);
  const [interactiveRH, setInteractiveRH] = useState<number>(90);
  const [interactiveLeafWetness, setInteractiveLeafWetness] = useState<number>(8);

  // Agronomic Spore Germination Risk Calculation Model (based on Campbell & Madden Plant Pathology)
  const calculateSimulatedRisk = () => {
    let score = 20;
    if (interactiveRH > 80) score += (interactiveRH - 80) * 3.5;
    if (interactiveLeafWetness > 4) score += (interactiveLeafWetness - 4) * 6;
    if (interactiveTemp >= 22 && interactiveTemp <= 29) score += 15;
    return Math.min(100, Math.round(score));
  };

  const simulatedScore = calculateSimulatedRisk();

  return (
    <div className="w-full bg-[#161309] text-on-surface py-[56px] md:py-[96px] px-margin-mobile md:px-margin">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-label-sm text-[11px] tracking-[0.2em] uppercase text-secondary font-semibold">
            AGRONOMIC EPIDEMIOLOGY ARCHITECTURE
          </span>
          <h1 className="font-fraunces text-4xl md:text-5xl font-black text-on-surface mt-2 mb-4 leading-tight">
            How Fasal Rakshak Predicts What The Human Eye Cannot Yet See.
          </h1>
          <p className="font-body-lg text-on-surface/80 text-base md:text-lg">
            Fungi and insects don't appear out of nowhere. They incubate in distinct micro-climatic windows. By capturing atmospheric telemetry at night, we warn farms 5 to 7 days before physical crop lesions appear.
          </p>
        </div>

        {/* The 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-[#1f1b11] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1B4332] text-primary flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[28px]">nights_stay</span>
              </div>
              <span className="text-[11px] font-mono uppercase text-secondary tracking-wider font-semibold">
                PHASE 01: TELEMETRY
              </span>
              <h3 className="text-xl font-headline-sm font-bold text-on-surface mt-1 mb-3">
                Nocturnal Agronomic Surveillance
              </h3>
              <p className="text-xs text-on-surface/80 leading-relaxed font-body-md">
                Most spore germination and insect oviposition happens during the coolest nocturnal hours. Our ground weather nodes and satellite IR canopy readings detect humidity stagnation and dew formation while the village sleeps.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-primary font-mono">
              Data: INSAT-3D IR + IoT Leaf Wetness Probes
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-[#1f1b11] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#da9600]/20 text-secondary flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[28px]">query_stats</span>
              </div>
              <span className="text-[11px] font-mono uppercase text-secondary tracking-wider font-semibold">
                PHASE 02: EPIDEMIOLOGY
              </span>
              <h3 className="text-xl font-headline-sm font-bold text-on-surface mt-1 mb-3">
                Degree-Day Biological Modeling
              </h3>
              <p className="text-xs text-on-surface/80 leading-relaxed font-body-md">
                Pest lifecycles are dictated by thermal degree-days (GDD). When temperature-humidity thresholds are satisfied for 72 continuous hours, the algorithm flags an inevitable incubation wave before a single square turns into a rosette flower.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-secondary font-mono">
              Model: Thermal Accumulation &amp; Spore Dispersal Cones
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-[#1f1b11] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#14291e] text-emerald-400 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-[28px]">shield_check</span>
              </div>
              <span className="text-[11px] font-mono uppercase text-secondary tracking-wider font-semibold">
                PHASE 03: PREVENTATIVE ACT
              </span>
              <h3 className="text-xl font-headline-sm font-bold text-on-surface mt-1 mb-3">
                Decentralized Community Shield
              </h3>
              <p className="text-xs text-on-surface/80 leading-relaxed font-body-md">
                One confirmed outbreak triggers a downwind perimeter bulletin via WhatsApp and SMS to all registered farmers in the drift corridor. Farmers deploy biological parasites (Trichogramma) and pheromones, ending the cycle cleanly.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-emerald-400 font-mono">
              Action: IPM Biological &amp; Organic Parasitoids
            </div>
          </div>
        </div>

        {/* Interactive Spore Germination Simulator */}
        <div className="p-8 rounded-3xl bg-[#1f1b11] border border-white/10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-secondary font-bold">
                INTERACTIVE LAB
              </span>
              <h2 className="text-2xl font-headline-sm font-bold text-on-surface mt-1">
                Fungal &amp; Borer Incubation Risk Simulator
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Adjust nocturnal micro-climate inputs to see how the early warning engine calculates outbreak probability.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-on-surface-variant block uppercase font-mono">Calculated Risk Index</span>
                <span className={`text-3xl font-black font-mono ${
                  simulatedScore > 75 ? 'text-red-400' : simulatedScore > 50 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {simulatedScore}%
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            {/* Input 1 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-on-surface">Nocturnal Canopy Temp</span>
                <span className="font-mono text-secondary">{interactiveTemp}°C</span>
              </div>
              <input
                type="range"
                min="18"
                max="36"
                value={interactiveTemp}
                onChange={e => setInteractiveTemp(Number(e.target.value))}
                className="w-full accent-secondary"
              />
              <span className="text-[10px] text-on-surface-variant block">Optimal fungal incubation: 23°C - 28°C</span>
            </div>

            {/* Input 2 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-on-surface">Nocturnal Relative Humidity</span>
                <span className="font-mono text-secondary">{interactiveRH}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={interactiveRH}
                onChange={e => setInteractiveRH(Number(e.target.value))}
                className="w-full accent-secondary"
              />
              <span className="text-[10px] text-on-surface-variant block">Above 85% RH triggers rapid sporulation</span>
            </div>

            {/* Input 3 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-on-surface">Leaf Wetness Duration</span>
                <span className="font-mono text-secondary">{interactiveLeafWetness} hrs</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={interactiveLeafWetness}
                onChange={e => setInteractiveLeafWetness(Number(e.target.value))}
                className="w-full accent-secondary"
              />
              <span className="text-[10px] text-on-surface-variant block">&gt; 6 consecutive hours allows germ tube penetration</span>
            </div>
          </div>

          {/* Result diagnosis banner */}
          <div className={`mt-6 p-4 rounded-xl border text-xs flex items-center justify-between gap-4 ${
            simulatedScore > 75
              ? 'bg-red-950/40 border-red-800/40 text-red-200'
              : simulatedScore > 50
              ? 'bg-amber-950/40 border-amber-800/40 text-amber-200'
              : 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200'
          }`}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px]">
                {simulatedScore > 75 ? 'error' : simulatedScore > 50 ? 'warning' : 'check_circle'}
              </span>
              <div>
                <strong className="block text-sm">
                  {simulatedScore > 75
                    ? 'CRITICAL ALERT: Spore Germination Imminent'
                    : simulatedScore > 50
                    ? 'MODERATE WARNING: Sub-canopy Humidity Building'
                    : 'SAFE CONDITIONS: Normal Vegetative Baseline'}
                </strong>
                <span>
                  {simulatedScore > 75
                    ? 'Recommended action: Deploy Trichogramma cards and 5% NSKE neem spray before rainfall event.'
                    : simulatedScore > 50
                    ? 'Recommended action: Increase pheromone trap density to 5/acre and monitor morning dew persistence.'
                    : 'Conditions safe. Routine visual scouting recommended every 7 days.'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (onOpenSentinel) {
                  onOpenSentinel();
                } else {
                  onNavigate('home');
                }
              }}
              className="whitespace-nowrap px-4 py-2 rounded-full bg-[#1B4332] hover:bg-[#245741] text-primary-fixed text-xs font-bold border border-primary/30 cursor-pointer"
            >
              Activate Field Sentinel &rarr;
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8">
          <button
            onClick={() => {
              if (onOpenSentinel) {
                onOpenSentinel();
              } else {
                onNavigate('home');
              }
            }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-r from-secondary-container via-secondary to-secondary text-[#161309] font-title-sm text-base font-bold shadow-xl hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <span>Register Your Field For Early Warning</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          {/* Small font size helpline note */}
          <p className="mt-6 text-xs text-on-surface-variant flex items-center justify-center gap-1.5 flex-wrap">
            <span className="material-symbols-outlined text-[15px] text-secondary">support_agent</span>
            <span>Government Agronomic Support: Maharashtra Agriculture Ministry Helpline</span>
            <a href="tel:18002334000" className="font-mono font-bold text-secondary hover:underline">
              1800-233-4000
            </a>
            <span className="text-white/40">(Toll-Free)</span>
          </p>
        </div>
      </div>
    </div>
  );
};
