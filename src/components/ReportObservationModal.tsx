import React, { useState } from 'react';
import { FieldObservation, CropType } from '../types';
import { DISTRICTS_RISK_DATA } from '../data/mockData';

interface ReportObservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitObservation: (obs: FieldObservation) => void;
}

export const ReportObservationModal: React.FC<ReportObservationModalProps> = ({
  isOpen,
  onClose,
  onSubmitObservation
}) => {
  const [farmerName, setFarmerName] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState(DISTRICTS_RISK_DATA[0].name);
  const [crop, setCrop] = useState<CropType>('Cotton');
  const [acreage, setAcreage] = useState<number>(5);
  const [symptoms, setSymptoms] = useState('');
  const [trapCount, setTrapCount] = useState<number>(8);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newObs: FieldObservation = {
      id: `obs-${Date.now()}`,
      farmerName: farmerName.trim() || 'Anonymous Scout',
      village: village.trim() || 'Local Farm',
      district,
      crop,
      acreage,
      symptoms,
      trapCount,
      reportedAt: 'Just now',
      status: 'Triangulated'
    };

    onSubmitObservation(newObs);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#1f1b11] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#2d2a1e] hover:bg-[#393529] text-on-surface flex items-center justify-center cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-secondary text-[#161309] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">bug_report</span>
          </div>
          <div>
            <h2 className="text-xl font-headline-sm font-bold text-on-surface">
              Log Field Observation
            </h2>
            <p className="text-xs text-on-surface-variant">
              Your ground-truth sighting triangulates with local satellite &amp; weather radar.
            </p>
          </div>
        </div>

        {submittedSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#1B4332] text-primary mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">check</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface">Observation Triangulated!</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
              Warning perimeter calculated. Surrounding farms within 15 km have been alerted to verify their pheromone traps.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-on-surface-variant font-semibold mb-1">
                  Your Name / Scout ID
                </label>
                <input
                  type="text"
                  required
                  value={farmerName}
                  onChange={e => setFarmerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
                  placeholder="e.g. Vikas Jadhav"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant font-semibold mb-1">
                  Village / Tehsil
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={e => setVillage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
                  placeholder="e.g. Ralegaon"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-on-surface-variant font-semibold mb-1">
                  District
                </label>
                <select
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
                >
                  {DISTRICTS_RISK_DATA.map(d => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-on-surface-variant font-semibold mb-1">
                  Crop Type
                </label>
                <select
                  value={crop}
                  onChange={e => setCrop(e.target.value as CropType)}
                  className="w-full px-3 py-2 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
                >
                  <option value="Cotton">Cotton</option>
                  <option value="Soybean">Soybean</option>
                  <option value="Chilli">Chilli</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Sugarcane">Sugarcane</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-on-surface-variant font-semibold mb-1">
                  Acreage Observed
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={acreage}
                  onChange={e => setAcreage(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-on-surface-variant font-semibold mb-1">
                  Pheromone / Sticky Trap Count
                </label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={trapCount}
                  onChange={e => setTrapCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-on-surface-variant font-semibold mb-1">
                Visible Symptoms or Larval Activity
              </label>
              <textarea
                required
                rows={3}
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#161309] border border-white/10 text-on-surface focus:border-secondary focus:outline-none"
                placeholder="Describe leaf curling, rosette flowers, brown spots, or adult insect swarming..."
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#2d2a1e] text-on-surface hover:bg-[#393529] font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-secondary hover:bg-secondary/90 text-[#161309] font-bold shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                Submit Ground Observation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
