import React, { useState } from 'react';
import { RegisteredField, CropType } from '../types';
import { DISTRICTS_RISK_DATA } from '../data/mockData';

interface FieldSentinelModalProps {
  isOpen: boolean;
  onClose: () => void;
  registeredField: RegisteredField | null;
  onSaveField: (field: RegisteredField) => void;
}

export const FieldSentinelModal: React.FC<FieldSentinelModalProps> = ({
  isOpen,
  onClose,
  registeredField,
  onSaveField
}) => {
  const [farmerName, setFarmerName] = useState(registeredField?.farmerName || 'Anand Patil');
  const [phone, setPhone] = useState(registeredField?.phone || '+91 98234 56789');
  const [district, setDistrict] = useState(registeredField?.district || 'Yavatmal');
  const [crop, setCrop] = useState<CropType>(registeredField?.crop || 'Cotton');
  const [acres, setAcres] = useState<number>(registeredField?.acres || 12);
  const [sowingDate, setSowingDate] = useState(registeredField?.sowingDate || '2026-06-20');
  const [smsAlerts, setSmsAlerts] = useState(registeredField?.smsAlerts ?? true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(registeredField?.whatsappAlerts ?? true);
  const [simulatedAlertReceived, setSimulatedAlertReceived] = useState<string | null>(null);

  if (!isOpen) return null;

  const matchedDistrict = DISTRICTS_RISK_DATA.find(d => d.name.toLowerCase() === district.toLowerCase()) || DISTRICTS_RISK_DATA[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveField({
      farmerName,
      phone,
      state: matchedDistrict.state,
      district,
      crop,
      acres,
      sowingDate,
      smsAlerts,
      whatsappAlerts
    });
  };

  const handleTestAlert = () => {
    setSimulatedAlertReceived(
      `⚠️ [FASAL RAKSHAK TELEMETRY]: Field Alert for ${farmerName} (${district}) - 72h Spore Germination index has reached 88%. Night humidity > 90% expected tonight. Recommended: Install 5 Gossyplure traps per acre before tomorrow evening to prevent pink bollworm oviposition.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#1f1b11] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#2d2a1e] hover:bg-[#393529] text-on-surface flex items-center justify-center cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">satellite_alt</span>
          </div>
          <div>
            <h2 className="text-xl font-headline-sm font-bold text-on-surface">
              {registeredField ? 'Field Sentinel Dashboard' : 'Activate Field Sentinel Early Warning'}
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Connect your specific land holding to our regional micro-climate surveillance mesh.
            </p>
          </div>
        </div>

        {/* Active Field Live Status Banner (if registered) */}
        {registeredField && (
          <div className="mb-6 p-4 rounded-2xl bg-[#14291e] border border-emerald-800/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-bold text-primary-fixed uppercase tracking-wider">
                  Telemetry Active for {registeredField.farmerName}'s Field
                </span>
              </div>
              <span className="text-xs font-mono text-secondary font-bold">
                {matchedDistrict.riskScore}% Vulnerability Index
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-emerald-900/40 text-xs">
              <div>
                <span className="text-on-surface-variant text-[10px] block">Location</span>
                <strong className="text-on-surface">{registeredField.district}</strong>
              </div>
              <div>
                <span className="text-on-surface-variant text-[10px] block">Crop &amp; Size</span>
                <strong className="text-on-surface">{registeredField.crop} ({registeredField.acres} Ac)</strong>
              </div>
              <div>
                <span className="text-on-surface-variant text-[10px] block">Weather State</span>
                <strong className="text-secondary">{matchedDistrict.relativeHumidity}% RH</strong>
              </div>
              <div>
                <span className="text-on-surface-variant text-[10px] block">Active Threat</span>
                <strong className="text-red-300 truncate block">{matchedDistrict.activePest}</strong>
              </div>
            </div>

            {/* Test alert trigger */}
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleTestAlert}
                className="px-3 py-1.5 rounded-lg bg-[#245741] hover:bg-[#2e6d52] text-primary-fixed text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                <span>Dispatch Test Sentinel Alert</span>
              </button>
              <span className="text-[11px] text-on-surface-variant">Free satellite early warning service</span>
            </div>

            {simulatedAlertReceived && (
              <div className="mt-3 p-3 rounded-xl bg-[#161309] border border-secondary/40 text-xs text-secondary animate-fadeIn">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary shrink-0">mark_chat_unread</span>
                  <p className="leading-relaxed text-on-surface">{simulatedAlertReceived}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-on-surface-variant font-semibold mb-1">
                Farmer / Agronomist Name
              </label>
              <input
                type="text"
                required
                value={farmerName}
                onChange={e => setFarmerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
                placeholder="e.g. Anand Patil"
              />
            </div>

            <div>
              <label className="block text-on-surface-variant font-semibold mb-1">
                Mobile Number (for SMS &amp; WhatsApp Alert)
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
                placeholder="+91 98234 56789"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-on-surface-variant font-semibold mb-1">
                Select District
              </label>
              <select
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
              >
                {DISTRICTS_RISK_DATA.map(d => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.state})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-on-surface-variant font-semibold mb-1">
                Primary Crop
              </label>
              <select
                value={crop}
                onChange={e => setCrop(e.target.value as CropType)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
              >
                <option value="Cotton">Bt Cotton</option>
                <option value="Soybean">Soybean</option>
                <option value="Chilli">Chilli</option>
                <option value="Groundnut">Groundnut</option>
                <option value="Wheat">Wheat</option>
                <option value="Sugarcane">Sugarcane</option>
              </select>
            </div>

            <div>
              <label className="block text-on-surface-variant font-semibold mb-1">
                Total Acreage
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={acres}
                onChange={e => setAcres(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 py-2">
            <label className="flex items-center gap-2 cursor-pointer text-on-surface">
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={e => setSmsAlerts(e.target.checked)}
                className="accent-secondary rounded"
              />
              <span>Receive High-Priority SMS</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-on-surface">
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={e => setWhatsappAlerts(e.target.checked)}
                className="accent-secondary rounded"
              />
              <span>Receive WhatsApp Voice Bulletins</span>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#2d2a1e] text-on-surface hover:bg-[#393529] font-medium cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary/90 text-[#161309] font-bold shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              {registeredField ? 'Update Sentinel Settings' : 'Lock In Free Sentinel Protection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
