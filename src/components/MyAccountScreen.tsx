import React, { useMemo } from 'react';
import { ActiveScreen, CommunityPost, FarmerUser, Language, RegisteredField } from '../types';
import { TRANSLATIONS } from '../translations';
import { INITIAL_COMMUNITY_POSTS } from '../data/communityData';
import {
  SharedCard,
  SharedPrimaryButton,
  SharedSecondaryButton,
  SharedSectionHeader,
  SharedListRow
} from './common/SharedPatterns';

interface MyAccountScreenProps {
  lang: Language;
  currentUser: FarmerUser | null;
  registeredField: RegisteredField | null;
  onOpenAuth: () => void;
  onOpenSentinel: () => void;
  onSignOut: () => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const MyAccountScreen: React.FC<MyAccountScreenProps> = ({
  lang,
  currentUser,
  registeredField,
  onOpenAuth,
  onOpenSentinel,
  onSignOut,
  onNavigate,
}) => {
  const t = TRANSLATIONS[lang].myAccount;

  const myCommunityActivity = useMemo(() => {
    if (!currentUser) return { posts: 0, replies: 0, upvotes: 0 };
    const saved = localStorage.getItem('fasal_rakshak_community_posts');
    let posts: CommunityPost[] = INITIAL_COMMUNITY_POSTS;
    if (saved) {
      try {
        posts = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved community posts', e);
      }
    }
    const mine = posts.filter(
      (p) => p.authorId === currentUser.id || p.authorName === currentUser.name
    );
    const replyCount = mine.reduce((acc, p) => acc + p.replies.length, 0);
    const upvoteCount = mine.reduce((acc, p) => acc + p.upvotes, 0);
    return { posts: mine.length, replies: replyCount, upvotes: upvoteCount };
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="w-full py-[40px] md:py-[64px] px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto flex flex-col justify-start">
        <SharedSectionHeader
          id="my-account-header"
          title={lang === 'mr' ? 'माझे खाते' : lang === 'hi' ? 'मेरा खाता' : 'My Account'}
          subtitle={t.signInPromptBody}
        />
        <SharedCard id="my-account-signin-card">
          <div className="py-6 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1B4332] flex items-center justify-center text-secondary border border-secondary/30">
              <span className="material-symbols-outlined text-[32px]">account_circle</span>
            </div>
            <h3 className="font-serif-brand font-bold text-xl text-[#161309]">
              {t.signInPromptTitle}
            </h3>
            <p className="font-sans-brand text-sm text-[#615c52] leading-relaxed max-w-md">
              {t.signInPromptBody}
            </p>
            <SharedPrimaryButton id="my-account-signin-btn" onClick={onOpenAuth}>
              <span className="material-symbols-outlined text-[20px]">login</span>
              <span>{t.signInBtn}</span>
            </SharedPrimaryButton>
          </div>
        </SharedCard>
      </div>
    );
  }

  return (
    <div className="w-full py-[40px] md:py-[64px] px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto flex flex-col justify-start">
      <SharedSectionHeader
        id="my-account-header"
        title={lang === 'mr' ? 'माझे खाते' : lang === 'hi' ? 'मेरा खाता' : 'My Account'}
        subtitle={`${t.signedInAs} ${currentUser.name}`}
      />

      {/* PROFILE CARD */}
      <SharedCard id="my-account-profile-card" className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#1B4332] flex items-center justify-center text-3xl border border-white/20 shrink-0">
            {currentUser.avatar || '👨‍🌾'}
          </div>
          <div className="min-w-0">
            <h3 className="font-serif-brand font-bold text-xl text-[#161309] flex items-center gap-2">
              {currentUser.name}
              {currentUser.isVerifiedFarmer && (
                <span className="material-symbols-outlined text-[18px] text-[#1B4332]">
                  verified
                </span>
              )}
            </h3>
            <p className="font-sans-brand text-sm text-[#615c52] mt-0.5">
              {currentUser.district}
              {currentUser.taluka ? `, ${currentUser.taluka}` : ''}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#e8dfcf] space-y-0">
          <SharedListRow
            id="my-account-profile-phone"
            icon="call"
            title={currentUser.phone}
            subtitle={lang === 'mr' ? 'मोबाईल क्रमांक' : lang === 'hi' ? 'मोबाइल नंबर' : 'Mobile Number'}
          />
          <SharedListRow
            id="my-account-profile-crop"
            icon="eco"
            title={currentUser.primaryCrop}
            subtitle={lang === 'mr' ? 'प्रमुख पीक' : lang === 'hi' ? 'मुख्य फसल' : 'Primary Crop'}
          />
          <SharedListRow
            id="my-account-profile-verified"
            icon={currentUser.isVerifiedFarmer ? 'badge' : 'hourglass_empty'}
            title={
              currentUser.isVerifiedFarmer
                ? lang === 'mr'
                  ? 'पडताळणी केलेला शेतकरी'
                  : lang === 'hi'
                  ? 'सत्यापित किसान'
                  : 'Verified Farmer'
                : lang === 'mr'
                ? 'पडताळणी प्रलंबित'
                : lang === 'hi'
                ? 'सत्यापन लंबित'
                : 'Verification Pending'
            }
            subtitle={
              lang === 'mr'
                ? 'महाराष्ट्र कृषी मंत्रालय सत्यापन'
                : lang === 'hi'
                ? 'महाराष्ट्र कृषि मंत्रालय सत्यापन'
                : 'Maharashtra Agriculture Ministry attestation'
            }
            isLast
          />
        </div>
      </SharedCard>

      {/* REGISTERED FIELD / SENTINEL CARD */}
      <SharedCard id="my-account-sentinel-card" className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[22px] text-[#1B4332]">
            satellite_alt
          </span>
          <h3 className="font-serif-brand font-bold text-lg text-[#161309]">
            {t.myFieldHeading}
          </h3>
        </div>

        {registeredField ? (
          <div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#f3ebd8] p-3.5">
                <span className="block text-[10px] text-[#615c52] font-sans-brand uppercase tracking-wider">
                  {t.fieldCrop}
                </span>
                <strong className="font-sans-brand font-bold text-sm text-[#161309]">
                  {registeredField.crop} ({registeredField.acres} ac)
                </strong>
              </div>
              <div className="rounded-xl bg-[#f3ebd8] p-3.5">
                <span className="block text-[10px] text-[#615c52] font-sans-brand uppercase tracking-wider">
                  {t.fieldDistrict}
                </span>
                <strong className="font-sans-brand font-bold text-sm text-[#161309]">
                  {registeredField.district}
                </strong>
              </div>
              <div className="rounded-xl bg-[#f3ebd8] p-3.5">
                <span className="block text-[10px] text-[#615c52] font-sans-brand uppercase tracking-wider">
                  {t.fieldAlerts}
                </span>
                <strong className="font-sans-brand font-bold text-sm text-[#161309]">
                  SMS {registeredField.smsAlerts ? '✓' : '–'} • WA{' '}
                  {registeredField.whatsappAlerts ? '✓' : '–'}
                </strong>
              </div>
              <div className="rounded-xl bg-[#f3ebd8] p-3.5">
                <span className="block text-[10px] text-[#615c52] font-sans-brand uppercase tracking-wider">
                  {t.statusNode}
                </span>
                <strong className="font-sans-brand font-bold text-sm text-[#1B4332] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {t.nodeSynced}
                </strong>
              </div>
            </div>
            <div className="mt-4">
              <SharedSecondaryButton id="my-account-open-sentinel-btn" fullWidth onClick={onOpenSentinel}>
                <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
                <span>{t.myFieldHeading}</span>
              </SharedSecondaryButton>
            </div>
          </div>
        ) : (
          <div className="py-2 flex flex-col gap-4">
            <p className="font-sans-brand text-sm text-[#615c52] leading-relaxed">
              {t.noFieldRegistered}
            </p>
            <SharedPrimaryButton id="my-account-activate-sentinel-btn" fullWidth onClick={onOpenSentinel}>
              <span className="material-symbols-outlined text-[20px]">radar</span>
              <span>{lang === 'mr' ? 'फील्ड सेंटिनल सुरू करा' : lang === 'hi' ? 'फील्ड सेंटिनल सक्रिय करें' : 'Activate Field Sentinel'}</span>
            </SharedPrimaryButton>
          </div>
        )}
      </SharedCard>

      {/* COMMUNITY ACTIVITY */}
      <SharedCard id="my-account-community-card" className="mb-8">
        <h3 className="font-serif-brand font-bold text-lg text-[#161309] mb-4">
          {lang === 'mr' ? 'समुदायातील माझी हालचाल' : lang === 'hi' ? 'समुदाय में मेरी गतिविधि' : 'My Community Activity'}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-[#1B4332] text-[#FBF3E4] p-4 text-center">
            <span className="block text-2xl font-bold font-sans-brand">
              {myCommunityActivity.posts}
            </span>
            <span className="block text-[11px] text-[#cfe3d6] mt-0.5 font-sans-brand">
              {lang === 'mr' ? 'प्रश्न' : lang === 'hi' ? 'प्रश्न' : 'Questions'}
            </span>
          </div>
          <div className="rounded-xl bg-[#1B4332] text-[#FBF3E4] p-4 text-center">
            <span className="block text-2xl font-bold font-sans-brand">
              {myCommunityActivity.replies}
            </span>
            <span className="block text-[11px] text-[#cfe3d6] mt-0.5 font-sans-brand">
              {lang === 'mr' ? 'उत्तरे' : lang === 'hi' ? 'उत्तर' : 'Replies'}
            </span>
          </div>
          <div className="rounded-xl bg-[#1B4332] text-[#FBF3E4] p-4 text-center">
            <span className="block text-2xl font-bold font-sans-brand">
              {myCommunityActivity.upvotes}
            </span>
            <span className="block text-[11px] text-[#cfe3d6] mt-0.5 font-sans-brand">
              {lang === 'mr' ? 'मान्यता' : lang === 'hi' ? 'अपवोट' : 'Upvotes'}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <SharedSecondaryButton id="my-account-open-community-btn" fullWidth onClick={() => onNavigate('community')}>
            <span className="material-symbols-outlined text-[18px]">forum</span>
            <span>{lang === 'mr' ? 'समुदाय उघडा' : lang === 'hi' ? 'समुदाय खोलें' : 'Open Farmer Community'}</span>
          </SharedSecondaryButton>
        </div>
      </SharedCard>

      {/* ACCOUNT ACTIONS */}
      <SharedCard id="my-account-actions-card">
        <div className="flex flex-col sm:flex-row gap-3">
          <SharedSecondaryButton id="my-account-signout-btn" fullWidth onClick={onSignOut}>
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>{t.signOut}</span>
          </SharedSecondaryButton>
          <SharedPrimaryButton id="my-account-helpline-btn" fullWidth onClick={() => onNavigate('my-area')}>
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span>{t.myAreaRef}</span>
          </SharedPrimaryButton>
        </div>
        <div className="mt-6 pt-4 border-t border-[#e8dfcf] text-center text-xs font-sans-brand text-[#615c52]">
          <p className="flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-[#1B4332]">support_agent</span>
            <span className="text-[#161309] font-semibold">1800-233-4000</span>
            <span>
              {lang === 'mr'
                ? 'महाराष्ट्र कृषी मंत्रालय हेल्पलाइन'
                : lang === 'hi'
                ? 'महाराष्ट्र कृषि मंत्रालय हेल्पलाइन'
                : 'Maharashtra Agriculture Ministry Helpline'}
            </span>
          </p>
        </div>
      </SharedCard>
    </div>
  );
};