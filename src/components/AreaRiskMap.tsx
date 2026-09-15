import React, { useState } from 'react';
import { Language, SimpleRiskLevel } from '../types';
import { TRANSLATIONS } from '../translations';
import { SharedCard, SharedRiskBadge, SharedListRow } from './common/SharedPatterns';

// Warm, calm palette taken straight from the existing design system.
const RISK_FILL: Record<SimpleRiskLevel, { fill: string; stroke: string }> = {
  low: { fill: '#e8f5e9', stroke: '#a5d6a7' },
  medium: { fill: '#fff8e1', stroke: '#ffe082' },
  high: { fill: '#ffebee', stroke: '#ffcdd2' },
};
// Unaffected / no-data districts keep a warm cream-olive tone, not grey.
const NEUTRAL_FILL = '#efe8d4';
const NEUTRAL_STROKE = '#d8cdb2';
const SELECTED_STROKE = '#1B4332';

interface DistrictDef {
  id: string;
  name: string;
  d: string;
  label?: { x: number; y: number };
  risk: SimpleRiskLevel | null;
}

// Simplified outline of Maharashtra districts. Shapes are stylised but keep the
// real relative positions (west coast strip, northern bulb around Nagpur,
// Marathwada south of Akola, and the Solapur/Kolhapur southern edge).
const DISTRICTS: DistrictDef[] = [
  // --- North band ---
  { id: 'Nandurbar', name: 'Nandurbar', d: 'M78,13 L116,12 L118,48 L80,48 L74,30 Z', risk: null },
  { id: 'Dhule', name: 'Dhule', d: 'M112,12 L152,14 L154,50 L116,50 Z', risk: null },
  { id: 'Jalgaon', name: 'Jalgaon', d: 'M150,13 L200,14 L202,52 L153,50 Z', risk: null },
  { id: 'Amravati', name: 'Amravati', d: 'M196,14 L242,16 L244,52 L201,52 Z', risk: 'low', label: { x: 218, y: 32 } },
  { id: 'Nagpur', name: 'Nagpur', d: 'M240,16 L326,18 L328,52 L300,54 L243,52 Z', risk: 'low', label: { x: 282, y: 34 } },
  { id: 'Bhandara', name: 'Bhandara', d: 'M324,18 L362,20 L364,54 L327,52 Z', risk: null },
  { id: 'Gondia', name: 'Gondia', d: 'M360,20 L402,22 L404,56 L363,54 Z', risk: null },
  // --- Second band ---
  { id: 'Nashik', name: 'Nashik', d: 'M52,50 L118,48 L164,52 L167,90 L120,92 L64,92 L50,80 Z', risk: null, label: { x: 96, y: 70 } },
  { id: 'Aurangabad', name: 'Aurangabad', d: 'M118,48 L166,50 L168,94 L120,92 Z', risk: null, label: { x: 140, y: 70 } },
  { id: 'Buldhana', name: 'Buldhana', d: 'M201,52 L236,54 L238,84 L204,88 Z', risk: 'low' },
  { id: 'Akola', name: 'Akola', d: 'M234,54 L264,56 L266,86 L237,84 Z', risk: 'low', label: { x: 248, y: 72 } },
  { id: 'Wardha', name: 'Wardha', d: 'M264,54 L302,54 L306,92 L302,114 L264,114 L266,86 Z', risk: 'low', label: { x: 282, y: 86 } },
  // --- Third band ---
  { id: 'Jalna', name: 'Jalna', d: 'M166,50 L203,52 L205,90 L168,94 Z', risk: null },
  { id: 'Washim', name: 'Washim', d: 'M203,90 L242,88 L244,120 L206,122 Z', risk: 'medium', label: { x: 222, y: 104 } },
  { id: 'Chandrapur', name: 'Chandrapur', d: 'M305,90 L404,88 L406,122 L322,120 L307,118 Z', risk: null, label: { x: 352, y: 105 } },
  { id: 'Yavatmal', name: 'Yavatmal', d: 'M262,114 L316,116 L318,154 L300,158 L262,156 Z', risk: 'medium', label: { x: 288, y: 135 } },
  // --- Fourth band ---
  { id: 'Ahmednagar', name: 'Ahmednagar', d: 'M116,94 L170,94 L174,150 L140,150 L120,146 Z', risk: null },
  { id: 'Hingoli', name: 'Hingoli', d: 'M204,122 L246,120 L248,154 L208,156 Z', risk: 'medium', label: { x: 226, y: 138 } },
  { id: 'Gadchiroli', name: 'Gadchiroli', d: 'M322,122 L406,120 L408,196 L326,194 Z', risk: null },
  { id: 'Pune', name: 'Pune', d: 'M54,90 L122,90 L126,130 L108,134 L56,128 Z', risk: null, label: { x: 88, y: 110 } },
  { id: 'Beed', name: 'Beed', d: 'M122,146 L176,148 L180,190 L160,192 L120,188 Z', risk: null },
  { id: 'Parbhani', name: 'Parbhani', d: 'M208,156 L248,154 L250,188 L210,190 Z', risk: 'medium', label: { x: 228, y: 172 } },
  { id: 'Nanded', name: 'Nanded', d: 'M262,156 L320,154 L324,196 L262,198 Z', risk: 'high', label: { x: 290, y: 176 } },
  // --- South ---
  { id: 'Satara', name: 'Satara', d: 'M54,130 L128,130 L132,162 L64,164 L52,146 Z', risk: null },
  { id: 'Osmanabad', name: 'Osmanabad', d: 'M176,188 L214,190 L218,224 L188,226 L174,206 Z', risk: null },
  { id: 'Latur', name: 'Latur', d: 'M206,188 L252,190 L256,226 L216,224 Z', risk: null, label: { x: 230, y: 208 } },
  { id: 'Sangli', name: 'Sangli', d: 'M52,164 L134,164 L138,198 L66,200 L50,178 Z', risk: null },
  { id: 'Solapur', name: 'Solapur', d: 'M146,206 L206,206 L220,238 L170,244 L142,230 Z', risk: null, label: { x: 176, y: 224 } },
  { id: 'Ratnagiri', name: 'Ratnagiri', d: 'M22,204 L58,202 L54,244 L18,246 Z', risk: null },
  { id: 'Kolhapur', name: 'Kolhapur', d: 'M54,198 L140,198 L144,234 L66,236 Z', risk: null, label: { x: 98, y: 218 } },
  // --- Coastal strip (Konkan) ---
  { id: 'Palghar', name: 'Palghar', d: 'M34,52 L54,52 L56,94 L40,96 L32,64 Z', risk: null },
  { id: 'Thane', name: 'Thane', d: 'M34,94 L58,94 L60,150 L40,152 L32,112 Z', risk: null },
  { id: 'Raigad', name: 'Raigad', d: 'M28,150 L62,150 L58,206 L26,204 Z', risk: null },
  { id: 'Sindhudurg', name: 'Sindhudurg', d: 'M14,246 L56,244 L58,266 L12,268 Z', risk: null },
];

// The three markers mirror the exact entries shown in the "Nearby Reports" list —
// they generalise the same data into the Yavatmal area (Ralegaon).
const NEAR_YAVATMAL = [
  { x: 277, y: 124 },
  { x: 295, y: 132 },
  { x: 284, y: 142 },
];

type Selection =
  | { kind: 'district'; id: string }
  | { kind: 'marker'; index: number }
  | null;

interface AreaRiskMapProps {
  lang: Language;
  isEmpty?: boolean;
}

export const AreaRiskMap: React.FC<AreaRiskMapProps> = ({ lang, isEmpty = false }) => {
  const t = TRANSLATIONS[lang];
  const [selected, setSelected] = useState<Selection>(null);

  const reports = [
    { key: 'report1', icon: 'pest_control', issue: t.myArea.report1.issue, detail: t.myArea.report1.detail },
    { key: 'report2', icon: 'bug_report', issue: t.myArea.report2.issue, detail: t.myArea.report2.detail },
    { key: 'report3', icon: 'water_drop', issue: t.myArea.report3.issue, detail: t.myArea.report3.detail },
  ];

  const toggle = (next: Selection) =>
    setSelected((cur) => {
      if (cur?.kind === 'district' && next?.kind === 'district' && cur.id === next.id) return null;
      if (cur?.kind === 'marker' && next?.kind === 'marker' && cur.index === next.index) return null;
      return next;
    });

  const renderDistrictPopup = (id: string) => {
    if (!isEmpty && id === 'Yavatmal') {
      return reports.map((r) => (
        <SharedListRow key={r.key} icon={r.icon} title={r.issue} subtitle={r.detail} />
      ));
    }
    const district = DISTRICTS.find((d) => d.id === id)!;
    return (
      <SharedListRow
        icon="location_on"
        title={district.name}
        subtitle={t.myArea.emptyState}
        isLast
      />
    );
  };

  const popup = (() => {
    if (!selected) return null;
    if (selected.kind === 'marker') {
      const r = reports[selected.index];
      return (
        <SharedListRow icon={r.icon} title={r.issue} subtitle={r.detail} isLast />
      );
    }
    return renderDistrictPopup(selected.id);
  })();

  const headline = (
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-serif-brand font-bold text-lg text-[#161309]">
        {t.myArea.mapHead}
      </h3>
      <span className="material-symbols-outlined text-[20px] text-secondary">
        map
      </span>
    </div>
  );

  return (
    <SharedCard id="area-map-card" className="mb-8">
      {headline}
      <div className="relative">
        <svg
          viewBox="0 0 410 268"
          role="img"
          aria-label={t.myArea.mapHead}
          className="w-full h-auto select-none"
        >
          {/* Neutral backdrop so the district mosaic reads as one contiguous state */}
          <rect x="0" y="0" width="410" height="268" rx="10" fill={NEUTRAL_FILL} />

          {/* Districts */}
          {DISTRICTS.map((d) => {
            const isSelected = selected?.kind === 'district' && selected.id === d.id;
            const activeRisk = isEmpty ? null : d.risk;
            const color = activeRisk ? RISK_FILL[activeRisk] : null;
            return (
              <path
                key={d.id}
                d={d.d}
                fill={color ? color.fill : NEUTRAL_FILL}
                stroke={isSelected ? SELECTED_STROKE : color ? color.stroke : NEUTRAL_STROKE}
                strokeWidth={isSelected ? 2.5 : 1.2}
                opacity={isSelected ? 1 : 0.92}
                className="cursor-pointer transition-opacity"
                onClick={() => toggle({ kind: 'district', id: d.id })}
              >
                <title>{d.name}</title>
              </path>
            );
          })}

          {/* District labels */}
          {DISTRICTS.filter((d) => d.label && !isEmpty).map((d) => (
            <text
              key={`label-${d.id}`}
              x={d.label!.x}
              y={d.label!.y}
              textAnchor="middle"
              fontSize="7"
              fill="#615c52"
              className="pointer-events-none select-none"
            >
              {d.name}
            </text>
          ))}

          {/* Markers (only when reports exist) */}
          {!isEmpty &&
            NEAR_YAVATMAL.map((m, i) => {
              const isSelected = selected?.kind === 'marker' && selected.index === i;
              return (
                <g
                  key={`marker-${i}`}
                  onClick={() => toggle({ kind: 'marker', index: i })}
                  className="cursor-pointer"
                >
                  <title>{reports[i].issue}</title>
                  <circle cx={m.x} cy={m.y} r="3.2" fill="#1B4332" stroke="#FDF8EE" strokeWidth="1" />
                  <circle
                    cx={m.x}
                    cy={m.y}
                    r="6.5"
                    fill="none"
                    stroke="#ffba42"
                    strokeWidth={isSelected ? 2 : 1}
                  />
                </g>
              );
            })}
        </svg>

        {/* Popup: reuses the List Row exactly (same fields as the nearby list) */}
        {popup && (
          <div
            className="absolute inset-x-3 bottom-2 bg-[#FDF8EE] rounded-[16px] border border-[#e8dfcf] shadow-md p-3 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute top-2 right-2 text-[#615c52] hover:text-[#161309] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            {popup}
          </div>
        )}
      </div>

      {/* Legend: same Risk Badge component, one icon + color + word per level */}
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <SharedRiskBadge level="low" lang={lang} />
          <SharedRiskBadge level="medium" lang={lang} />
          <SharedRiskBadge level="high" lang={lang} />
        </div>
        <p className="font-sans-brand text-xs text-[#615c52] mt-3">
          {t.myArea.mapHint}
        </p>
      </div>
    </SharedCard>
  );
};