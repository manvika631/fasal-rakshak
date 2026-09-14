import React, { useState } from 'react';
import { Language } from '../types';

export const HowItWorksSection: React.FC<{ lang?: Language }> = ({ lang = 'en' }) => {
  const [activeDetail, setActiveDetail] = useState<'predict' | 'protect' | 'act' | null>(null);

  const toggleDetail = (key: 'predict' | 'protect' | 'act') => {
    setActiveDetail(prev => (prev === key ? null : key));
  };

  const steps = [
    {
      key: 'predict' as const,
      icon: 'radar',
      title: lang === 'hi' ? 'पूर्वानुमान (Predict)' : lang === 'mr' ? 'अंदाज (Predict)' : 'Predict',
      sub:
        lang === 'hi'
          ? 'लक्षण दिखने से पहले, मौसम आधारित जोखिम का पूर्वानुमान।'
          : lang === 'mr'
          ? 'लक्षणे दिसण्याआधी, हवामानावर आधारित धोक्याचा अंदाज.'
          : 'Weather-based risk, before symptoms show.',
      detailTitle: 'Micro-Climate Telemetry Engine',
      detailDesc:
        lang === 'hi'
          ? 'मौसम और पत्तियों की नमी का विश्लेषण कर बीमारी आने से 5 से 7 दिन पहले ही अलर्ट जारी किया जाता है।'
          : lang === 'mr'
          ? 'हवामान आणि पानांमधील दमटपणा तपासून कीड येण्यापूर्वी ५ ते ७ दिवस आधीच धोक्याचा इशारा दिला जातो.'
          : 'Algorithms track 8-hour consecutive humidity spikes above 85% and nocturnal leaf-wetness duration to forecast fungal germination 5 to 7 days before macroscopic lesions appear.'
    },
    {
      key: 'protect' as const,
      icon: 'shield_with_heart',
      title: lang === 'hi' ? 'सुरक्षा (Protect)' : lang === 'mr' ? 'संरक्षण (Protect)' : 'Protect',
      sub:
        lang === 'hi'
          ? 'एक खेत में पुष्टि होते ही आसपास के सभी किसानों को चेतावनी।'
          : lang === 'mr'
          ? 'एका शेतात कीड आढळल्यास परिसरातील सर्व शेतकऱ्यांना सावध केले जाते.'
          : 'One confirmed case warns everyone nearby.',
      detailTitle: 'Decentralized Warning Perimeter',
      detailDesc:
        lang === 'hi'
          ? 'जैसे ही किसी खेत में कीट की पुष्टि होती है, 15 किमी के दायरे में सभी किसानों को तुरंत अलर्ट पहुंचता है।'
          : lang === 'mr'
          ? 'एका शेतात प्रादुर्भाव दिसताच १५ किमी परिसरातील शेतकऱ्यांना तत्काळ एसएमएस आणि व्हॉट्सॲप अलर्ट पोहोचतो.'
          : 'When a scout or farmer confirms a pest trap spike, wind trajectory calculations project spore drift cones to dispatch automatic SMS & WhatsApp warnings to all fields within 15 km.'
    },
    {
      key: 'act' as const,
      icon: 'psychiatry',
      title: lang === 'hi' ? 'उपाय (Act)' : lang === 'mr' ? 'उपाययोजना (Act)' : 'Act',
      sub:
        lang === 'hi'
          ? 'सटीक, जैविक और सुरक्षित समाधान की सलाह।'
          : lang === 'mr'
          ? 'सटीक, जैविक आणि सुरक्षित उपाययोजनांचे मार्गदर्शन.'
          : 'Safe, grounded treatment guidance.',
      detailTitle: 'Grounded Biological IPM',
      detailDesc:
        lang === 'hi'
          ? 'हानिकारक रसायनों के अंधाधुंध छिड़काव के बजाय सटीक जैविक और सुरक्षित उपचार की जानकारी मिलती है।'
          : lang === 'mr'
          ? 'अनावश्यक घातक औषधे फवारण्याऐवजी योग्य जैविक व सुरक्षित उपायांची अचूक माहिती मिळते.'
          : 'Rather than dumping toxic synthetic cocktails, receive precise non-chemical interventions (parasitic wasps, neem kernel extracts, pheromone lures) that protect beneficial insects.'
    }
  ];

  return (
    <section
      id="how-it-works"
      className="relative w-full bg-[#FBF3E4] text-[#161309] py-[56px] md:py-[96px] px-margin-mobile md:px-margin"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Minimalist Overline Header */}
        <span className="font-label-md text-label-md uppercase tracking-[0.25em] text-[#3d4b37] font-bold mb-8 md:mb-12 text-center">
          {lang === 'hi' ? 'यह कैसे काम करता है' : lang === 'mr' ? 'हे कसे कार्य करते' : 'HOW IT WORKS'}
        </span>

        {/* 3 Steps: Cardless, Elevated, Breathable Whitespace */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-x-12 lg:gap-x-16">
          {steps.map(step => (
            <div
              key={step.key}
              onClick={() => toggleDetail(step.key)}
              className="flex flex-col items-start group cursor-pointer transition-transform hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-[#2d2a1e]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[32px] text-[#121f0e]">
                  {step.icon}
                </span>
              </div>
              <h3 className="font-serif-brand text-2xl text-[#121f0e] font-bold mb-2 flex items-center gap-2">
                <span>{step.title}</span>
                <span className="text-xs font-normal text-[#3d4b37] opacity-60">
                  {activeDetail === step.key ? '▲' : '▼'}
                </span>
              </h3>
              <p className="font-sans-brand text-base text-[#3d4b37]/90 leading-relaxed">
                {step.sub}
              </p>

              {activeDetail === step.key && (
                <div className="mt-4 p-4 rounded-xl bg-white/80 border border-[#3d4b37]/20 text-xs text-[#121f0e] leading-relaxed animate-fadeIn">
                  <p className="font-bold text-[#1F3D2B] mb-1 font-sans-brand">{step.detailTitle}</p>
                  <p className="font-sans-brand">{step.detailDesc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Organic Divider into Section 4 */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-12 md:h-16 text-[#1F3D2B]"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M0,60 C250,10 500,90 750,30 C950,-20 1100,50 1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
