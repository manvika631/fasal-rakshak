import React, { useState } from 'react';
import { FarmerUser, Language, CropType } from '../types';
import { DEMO_FARMER_ACCOUNTS } from '../data/communityData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: FarmerUser) => void;
  lang: Language;
}

const MAHARASHTRA_DISTRICTS = [
  'Yavatmal',
  'Akola',
  'Amravati',
  'Washim',
  'Buldhana',
  'Wardha',
  'Nagpur',
  'Chandrapur',
  'Nashik',
  'Jalgaon',
  'Dhule',
  'Pune',
  'Solapur',
  'Ahmednagar',
  'Satara',
  'Sangli',
  'Kolhapur',
  'Chhatrapati Sambhajinagar',
  'Jalna',
  'Beed',
  'Parbhani',
  'Nanded',
  'Latur',
  'Osmanabad (Dharashiv)',
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'custom'>('quick');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Yavatmal');
  const [taluka, setTaluka] = useState('');
  const [crop, setCrop] = useState<CropType>('Cotton');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const newUser: FarmerUser = {
      id: 'farmer-custom-' + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      district,
      taluka: taluka.trim() || undefined,
      primaryCrop: crop,
      isVerifiedFarmer: true,
      avatar: '👨‍🌾',
    };

    onLogin(newUser);
    onClose();
  };

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="auth-modal-dialog"
        className="relative w-full max-w-lg rounded-2xl bg-[#1B180E] border border-white/15 p-6 sm:p-8 text-on-surface shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          id="auth-modal-close-btn"
          className="absolute top-4 right-4 text-on-surface-variant hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#1B4332] text-secondary flex items-center justify-center mx-auto mb-3 border border-secondary/30">
            <span className="material-symbols-outlined text-[24px]">person_check</span>
          </div>
          <h2 className="font-serif-brand font-bold text-2xl text-on-surface">
            {lang === 'mr'
              ? 'शेतकरी समुदाय प्रवेश'
              : lang === 'hi'
              ? 'किसान समुदाय में प्रवेश'
              : 'Farmer Community Sign In'}
          </h2>
          <p className="font-sans-brand text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
            {lang === 'mr'
              ? 'प्रश्न विचारण्यासाठी आणि महाराष्ट्र कृषी मंत्रालयाकडून अधिकृत उत्तरे मिळवण्यासाठी साइन इन करा.'
              : lang === 'hi'
              ? 'प्रश्न पूछने और महाराष्ट्र कृषि मंत्रालय से अधिकृत उत्तर प्राप्त करने हेतु साइन इन करें।'
              : 'Sign in to ask questions, reply to fellow farmers, and get verified answers from Maharashtra Agriculture Ministry.'}
          </p>
        </div>

        {/* Tabs: Quick 1-Click vs Custom Profile */}
        <div className="flex rounded-xl bg-[#252014] p-1 mb-6 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-2 text-xs font-sans-brand font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'quick'
                ? 'bg-[#1B4332] text-white shadow-sm'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            {lang === 'mr' ? 'झटपट प्रवेश (Quick Demo)' : lang === 'hi' ? 'त्वरित प्रवेश (Quick Demo)' : '1-Click Farmer Profiles'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-2 text-xs font-sans-brand font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'custom'
                ? 'bg-[#1B4332] text-white shadow-sm'
                : 'text-on-surface-variant hover:text-white'
            }`}
          >
            {lang === 'mr' ? 'नवीन शेतकरी नोंदणी' : lang === 'hi' ? 'नया किसान खाता' : 'New Farmer Sign In'}
          </button>
        </div>

        {/* TAB 1: 1-Click Demo Profiles */}
        {activeTab === 'quick' && (
          <div className="space-y-3">
            <p className="font-sans-brand text-xs text-on-surface-variant mb-2">
              {lang === 'mr'
                ? 'चाचणीसाठी खालीलपैकी कोणत्याही शेतकरी प्रोफाइलवर क्लिक करा:'
                : lang === 'hi'
                ? 'परीक्षण हेतु नीचे दिए गए किसी भी किसान प्रोफाइल पर क्लिक करें:'
                : 'Select an active Maharashtra farmer profile to sign in instantly:'}
            </p>
            {DEMO_FARMER_ACCOUNTS.map((farmer) => (
              <button
                key={farmer.id}
                id={`sign-in-as-${farmer.id}`}
                onClick={() => {
                  onLogin(farmer);
                  onClose();
                }}
                className="w-full text-left p-3.5 rounded-xl bg-[#262013] hover:bg-[#322b1c] border border-white/10 hover:border-secondary/50 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B4332] flex items-center justify-center text-lg border border-white/10">
                    {farmer.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans-brand font-bold text-sm text-white group-hover:text-secondary transition-colors">
                        {farmer.name}
                      </span>
                      <span className="material-symbols-outlined text-[14px] text-secondary">
                        verified
                      </span>
                    </div>
                    <span className="font-sans-brand text-xs text-on-surface-variant block">
                      {farmer.district}, {farmer.taluka} • {farmer.primaryCrop}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-sans-brand font-bold text-secondary group-hover:underline flex items-center gap-1">
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </button>
            ))}
          </div>
        )}

        {/* TAB 2: Custom Profile Form */}
        {activeTab === 'custom' && (
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-sans-brand font-semibold text-on-surface-variant mb-1">
                {lang === 'mr' ? 'शेतकऱ्याचे नाव' : lang === 'hi' ? 'किसान का नाम' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tukaram Patil"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#262013] border border-white/15 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-secondary font-sans-brand"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-sans-brand font-semibold text-on-surface-variant mb-1">
                  {lang === 'mr' ? 'मोबाईल नंबर' : lang === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98230 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#262013] border border-white/15 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-secondary font-sans-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-brand font-semibold text-on-surface-variant mb-1">
                  {lang === 'mr' ? 'जिल्हा (महाराष्ट्र)' : lang === 'hi' ? 'जिला (महाराष्ट्र)' : 'District (Maharashtra)'}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#262013] border border-white/15 text-sm text-white focus:outline-none focus:border-secondary font-sans-brand"
                >
                  {MAHARASHTRA_DISTRICTS.map((d) => (
                    <option key={d} value={d} className="bg-[#1B180E] text-white">
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-sans-brand font-semibold text-on-surface-variant mb-1">
                  {lang === 'mr' ? 'तालुका / गाव' : lang === 'hi' ? 'तहसील / गांव' : 'Taluka / Village'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ralegaon"
                  value={taluka}
                  onChange={(e) => setTaluka(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#262013] border border-white/15 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-secondary font-sans-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-sans-brand font-semibold text-on-surface-variant mb-1">
                  {lang === 'mr' ? 'प्रमुख पीक' : lang === 'hi' ? 'मुख्य फसल' : 'Primary Crop'}
                </label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value as CropType)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#262013] border border-white/15 text-sm text-white focus:outline-none focus:border-secondary font-sans-brand"
                >
                  <option value="Cotton" className="bg-[#1B180E]">Cotton (कापूस)</option>
                  <option value="Soybean" className="bg-[#1B180E]">Soybean (सोयाबीन)</option>
                  <option value="Sugarcane" className="bg-[#1B180E]">Sugarcane (ऊस)</option>
                  <option value="Wheat" className="bg-[#1B180E]">Wheat (गहू)</option>
                  <option value="Groundnut" className="bg-[#1B180E]">Groundnut (भुईमूग)</option>
                  <option value="Chilli" className="bg-[#1B180E]">Chilli (मिरची)</option>
                </select>
              </div>
            </div>

            <button
              id="auth-submit-custom-btn"
              type="submit"
              className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-secondary-container via-secondary to-secondary text-[#161309] font-title-sm font-bold shadow-lg hover:scale-[1.01] transition-transform cursor-pointer"
            >
              {lang === 'mr' ? 'समुदायात सामील व्हा' : lang === 'hi' ? 'समुदाय में शामिल हों' : 'Join Farmer Community'}
            </button>
          </form>
        )}

        {/* Ministry Helpline Assurance */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] text-on-surface-variant font-sans-brand flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-secondary">support_agent</span>
            <span>
              Maharashtra Agriculture Ministry Helpline: <a href="tel:18002334000" className="text-secondary font-bold hover:underline">1800-233-4000</a> (Toll-Free)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
