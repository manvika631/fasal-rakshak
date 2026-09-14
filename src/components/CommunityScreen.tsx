import React, { useState } from 'react';
import {
  ActiveScreen,
  CommunityPost,
  CommunityReply,
  FarmerUser,
  Language,
} from '../types';
import { INITIAL_COMMUNITY_POSTS } from '../data/communityData';
import { AskQuestionModal } from './AskQuestionModal';

interface CommunityScreenProps {
  currentUser: FarmerUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onNavigate: (screen: ActiveScreen) => void;
  lang: Language;
}

export const CommunityScreen: React.FC<CommunityScreenProps> = ({
  currentUser,
  onOpenAuth,
  onLogout,
  onNavigate,
  lang,
}) => {
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('fasal_rakshak_community_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved community posts', e);
      }
    }
    return INITIAL_COMMUNITY_POSTS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyMinistryAnswered, setOnlyMinistryAnswered] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>('post-1');
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // Sync posts to localStorage
  const updatePosts = (newPosts: CommunityPost[]) => {
    setPosts(newPosts);
    localStorage.setItem('fasal_rakshak_community_posts', JSON.stringify(newPosts));
  };

  const handleAddPost = (newPost: CommunityPost) => {
    const updated = [newPost, ...posts];
    updatePosts(updated);
    setExpandedPostId(newPost.id);
  };

  const handleUpvote = (postId: string) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    const updated = posts.map((p) => {
      if (p.id === postId) {
        const nextLiked = !p.hasUpvoted;
        return {
          ...p,
          hasUpvoted: nextLiked,
          upvotes: nextLiked ? p.upvotes + 1 : p.upvotes - 1,
        };
      }
      return p;
    });
    updatePosts(updated);
  };

  const handleAddReply = (postId: string) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    const text = (replyTextMap[postId] || '').trim();
    if (!text) return;

    const newReply: CommunityReply = {
      id: 'reply-' + Date.now(),
      authorName: currentUser.name,
      authorRole: 'farmer',
      authorDistrict: `${currentUser.district} (${currentUser.taluka || 'Maharashtra'})`,
      content: text,
      createdAt: 'Just now',
      likes: 0,
      hasLiked: false,
    };

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [...p.replies, newReply],
        };
      }
      return p;
    });

    updatePosts(updated);
    setReplyTextMap((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleLikeReply = (postId: string, replyId: string) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          replies: p.replies.map((r) => {
            if (r.id === replyId) {
              const nextLiked = !r.hasLiked;
              return {
                ...r,
                hasLiked: nextLiked,
                likes: nextLiked ? r.likes + 1 : r.likes - 1,
              };
            }
            return r;
          }),
        };
      }
      return p;
    });
    updatePosts(updated);
  };

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    if (onlyMinistryAnswered && !p.hasMinistryAnswer) return false;
    if (activeCategory !== 'All' && p.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchContent = p.content.toLowerCase().includes(q);
      const matchCrop = p.crop.toLowerCase().includes(q);
      const matchDistrict = p.authorDistrict.toLowerCase().includes(q);
      return matchTitle || matchContent || matchCrop || matchDistrict;
    }
    return true;
  });

  return (
    <div id="community-page" className="w-full bg-[#161309] text-on-surface py-8 md:py-12 px-margin-mobile md:px-margin min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header & Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-secondary font-bold">
                {lang === 'mr' ? 'महाराष्ट्र शेतकरी समुदाय' : lang === 'hi' ? 'महाराष्ट्र किसान समुदाय' : 'Maharashtra Farmer Community'}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-xs text-on-surface-variant font-mono">
                Krishi Vibhag Verified
              </span>
            </div>

            <h1 className="font-serif-brand font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
              {lang === 'mr'
                ? 'शेतकरी संवाद व शासकीय सल्ला मंच'
                : lang === 'hi'
                ? 'किसान संवाद एवं सरकारी सलाह मंच'
                : 'Farmer Network & Ministry Agronomist Forum'}
            </h1>
            <p className="font-sans-brand text-sm sm:text-base text-on-surface-variant leading-relaxed">
              {lang === 'mr'
                ? 'शेतकऱ्यांचे थेट प्रश्न, अनुभव आणि महाराष्ट्र कृषी मंत्रालयाचे (कृषी विभाग) अधिकृत शास्त्रोक्त उपाय.'
                : lang === 'hi'
                ? 'किसानों के सीधे सवाल, अनुभव एवं महाराष्ट्र कृषि मंत्रालय के अधिकृत वैज्ञानिक उपाय।'
                : 'Direct peer knowledge exchange for Maharashtra growers with verified responses from state agricultural officers.'}
            </p>
          </div>

          {/* Action: Ask Question Button */}
          <div className="flex items-center gap-3">
            <button
              id="community-ask-question-btn"
              onClick={() => {
                if (!currentUser) {
                  onOpenAuth();
                } else {
                  setIsAskModalOpen(true);
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-secondary-container via-secondary to-secondary text-[#161309] font-title-sm font-bold shadow-lg hover:scale-[1.02] transition-transform cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[20px]">add_comment</span>
              <span>{lang === 'mr' ? 'प्रश्न विचारा' : lang === 'hi' ? 'प्रश्न पूछें' : 'Ask Question'}</span>
            </button>
          </div>
        </div>

        {/* AUTH STATUS BAR */}
        <div
          id="community-auth-bar"
          className="p-4 rounded-2xl bg-[#1B180E] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          {currentUser ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-lg border border-secondary/40 font-bold">
                {currentUser.avatar || '👨‍🌾'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-sans-brand font-bold text-sm text-white">
                    {currentUser.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#1B4332] text-secondary text-[10px] font-mono font-bold">
                    Signed In
                  </span>
                </div>
                <span className="font-sans-brand text-xs text-on-surface-variant">
                  {currentUser.district}, {currentUser.taluka || 'Maharashtra'} • {currentUser.primaryCrop} farmer
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <div className="text-xs font-sans-brand text-on-surface-variant">
                <span className="font-semibold text-white block">
                  {lang === 'mr' ? 'अतिथी मोड (Guest Preview)' : lang === 'hi' ? 'अतिथि मोड (Guest Preview)' : 'Browsing as Guest'}
                </span>
                <span>
                  {lang === 'mr'
                    ? 'प्रश्न विचारण्यासाठी किंवा उत्तर देण्यासाठी कृपया साइन इन करा.'
                    : lang === 'hi'
                    ? 'प्रश्न पूछने या टिप्पणी करने के लिए कृपया साइन इन करें।'
                    : 'You can read all discussions. Sign in to ask questions or reply to farmers.'}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {currentUser ? (
              <button
                id="community-sign-out-btn"
                onClick={onLogout}
                className="text-xs font-sans-brand text-on-surface-variant hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                {lang === 'mr' ? 'बाहेर पडा (Sign Out)' : lang === 'hi' ? 'लॉगआउट' : 'Sign Out'}
              </button>
            ) : (
              <button
                id="community-sign-in-btn"
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B4332] hover:bg-[#245741] text-secondary text-xs font-sans-brand font-bold transition-colors cursor-pointer border border-secondary/30"
              >
                <span className="material-symbols-outlined text-[16px]">login</span>
                <span>{lang === 'mr' ? 'शेतकरी प्रवेश (Sign In)' : lang === 'hi' ? 'किसान साइन इन' : 'Farmer Sign In'}</span>
              </button>
            )}
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics (e.g. bollworm, soybean, insurance, Yavatmal)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1B180E] border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-secondary font-sans-brand"
              />
            </div>

            {/* Ministry Filter Toggle */}
            <button
              onClick={() => setOnlyMinistryAnswered(!onlyMinistryAnswered)}
              className={`px-4 py-2.5 rounded-xl text-xs font-sans-brand font-bold transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                onlyMinistryAnswered
                  ? 'bg-[#1B4332] text-secondary border-secondary shadow-md'
                  : 'bg-[#1B180E] text-on-surface-variant border-white/10 hover:border-white/20'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>
                {lang === 'mr'
                  ? 'फक्त अधिकृत उत्तरे (Ministry Answered)'
                  : lang === 'hi'
                  ? 'केवल अधिकृत उत्तर'
                  : 'Ministry Answered Only'}
              </span>
            </button>
          </div>

          {/* Topic Channels / Category Chips (Discord / Reddit style) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'All', label: 'All Topics (सर्व)' },
              { id: 'Pest Alert', label: '🐛 Pest Alert' },
              { id: 'Disease & Blight', label: '🍃 Disease & Blight' },
              { id: 'Weather & Sowing', label: '🌧️ Weather & Sowing' },
              { id: 'Govt Schemes', label: '🏛️ Govt Schemes (योजना)' },
              { id: 'Organic Farming', label: '🌱 Organic Farming' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans-brand whitespace-nowrap transition-all cursor-pointer font-medium ${
                  activeCategory === cat.id
                    ? 'bg-[#1B4332] text-secondary font-bold shadow-sm border border-secondary/40'
                    : 'bg-[#1B180E] text-on-surface-variant hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* POSTS LIST */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#1B180E] border border-white/10 space-y-3">
              <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
                forum
              </span>
              <p className="font-sans-brand text-sm text-on-surface-variant">
                No discussions found matching your filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setOnlyMinistryAnswered(false);
                }}
                className="text-xs font-bold text-secondary underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isExpanded = expandedPostId === post.id;

              return (
                <article
                  key={post.id}
                  id={`post-${post.id}`}
                  className="rounded-2xl bg-[#1B180E] border border-white/10 hover:border-white/20 transition-all overflow-hidden"
                >
                  {/* Post Card Header */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Meta Row: Author, Location, Badges, Time */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#262013] text-sm flex items-center justify-center border border-white/10 font-bold">
                          👨‍🌾
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-sans-brand font-bold text-xs sm:text-sm text-white">
                              {post.authorName}
                            </span>
                            <span className="text-white/30 text-xs">•</span>
                            <span className="font-sans-brand text-xs text-on-surface-variant">
                              {post.authorDistrict}
                            </span>
                          </div>
                          <span className="text-[11px] text-on-surface-variant font-mono">
                            {post.createdAt}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#262013] text-[11px] font-sans-brand text-[#ffd276] border border-white/10">
                          {post.crop}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#262013] text-[11px] font-sans-brand text-on-surface-variant border border-white/10">
                          {post.category}
                        </span>
                        {post.hasMinistryAnswer && (
                          <span className="px-2.5 py-0.5 rounded-full bg-[#143225] text-secondary text-[11px] font-sans-brand font-bold border border-secondary/40 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">verified</span>
                            <span>Ministry Answered</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Post Title & Content */}
                    <div className="space-y-2">
                      <h2
                        onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                        className="font-serif-brand font-bold text-lg sm:text-xl text-white hover:text-secondary transition-colors cursor-pointer"
                      >
                        {post.title}
                      </h2>
                      <p className="font-sans-brand text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {post.content}
                      </p>
                    </div>

                    {/* Image Attachment (if present) */}
                    {post.imageUrl && (
                      <div className="pt-2">
                        <div className="relative max-w-sm rounded-xl overflow-hidden border border-white/10 bg-[#262013]">
                          <img
                            src={post.imageUrl}
                            alt="Crop leaf observation"
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white/90">
                            Attached field sample
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Post Footer Actions: Upvote, Comments toggle */}
                    <div className="pt-3 flex items-center justify-between border-t border-white/5">
                      <div className="flex items-center gap-4">
                        <button
                          id={`upvote-btn-${post.id}`}
                          onClick={() => handleUpvote(post.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans-brand font-semibold transition-all cursor-pointer ${
                            post.hasUpvoted
                              ? 'bg-secondary text-[#161309] font-bold shadow'
                              : 'bg-[#262013] text-on-surface-variant hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            thumb_up
                          </span>
                          <span>Helpful ({post.upvotes})</span>
                        </button>

                        <button
                          onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#262013] hover:bg-white/10 text-xs font-sans-brand text-on-surface-variant hover:text-white transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            chat_bubble
                          </span>
                          <span>{post.replies.length} Replies</span>
                        </button>
                      </div>

                      <button
                        onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                        className="text-xs font-sans-brand text-secondary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Collapse Discussion' : 'View Discussion'}</span>
                        <span className="material-symbols-outlined text-[14px]">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* EXPANDED THREAD / REPLIES SECTION */}
                  {isExpanded && (
                    <div className="bg-[#141108] border-t border-white/10 p-5 sm:p-6 space-y-6">
                      <h3 className="font-sans-brand font-bold text-xs uppercase tracking-wider text-secondary flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">forum</span>
                        <span>Official Ministry Advisories & Farmer Discussion</span>
                      </h3>

                      {/* Reply list */}
                      <div className="space-y-4">
                        {post.replies.map((reply) => {
                          const isMinistry = reply.authorRole === 'ministry_officer' || reply.authorRole === 'agronomist';

                          return (
                            <div
                              key={reply.id}
                              className={`p-4 sm:p-5 rounded-xl transition-all ${
                                isMinistry
                                  ? 'bg-[#132c20] border border-[#2b6b4e]/80 shadow-md'
                                  : 'bg-[#1E1A11] border border-white/5'
                              }`}
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                      isMinistry
                                        ? 'bg-secondary text-[#161309]'
                                        : 'bg-[#2b2518] text-on-surface-variant'
                                    }`}
                                  >
                                    {isMinistry ? '🏛️' : '👨‍🌾'}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`font-sans-brand font-bold text-xs sm:text-sm ${
                                          isMinistry ? 'text-white' : 'text-white/90'
                                        }`}
                                      >
                                        {reply.authorName}
                                      </span>
                                      {isMinistry && (
                                        <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[10px] font-mono font-bold border border-secondary/40 flex items-center gap-1">
                                          <span className="material-symbols-outlined text-[12px]">
                                            verified
                                          </span>
                                          <span>{reply.badgeText || 'Maharashtra Krishi Vibhag'}</span>
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-[11px] text-on-surface-variant font-sans-brand block">
                                      {reply.designation || reply.authorDistrict} • {reply.createdAt}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  onClick={() => handleLikeReply(post.id, reply.id)}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-sans-brand cursor-pointer ${
                                    reply.hasLiked
                                      ? 'bg-secondary/30 text-secondary font-bold'
                                      : 'text-on-surface-variant hover:text-white'
                                  }`}
                                >
                                  <span className="material-symbols-outlined text-[14px]">
                                    thumb_up
                                  </span>
                                  <span>{reply.likes}</span>
                                </button>
                              </div>

                              <p className="font-sans-brand text-xs sm:text-sm text-white/90 leading-relaxed whitespace-pre-line pl-9">
                                {reply.content}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add Reply Form / Auth Gateway */}
                      <div className="pt-4 border-t border-white/5">
                        {currentUser ? (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-sans-brand text-on-surface-variant">
                              <span className="material-symbols-outlined text-[16px] text-secondary">
                                edit_note
                              </span>
                              <span>
                                Replying as <strong className="text-white">{currentUser.name}</strong> ({currentUser.district})
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <textarea
                                rows={2}
                                value={replyTextMap[post.id] || ''}
                                onChange={(e) =>
                                  setReplyTextMap({
                                    ...replyTextMap,
                                    [post.id]: e.target.value,
                                  })
                                }
                                placeholder="Share field experience, dosages, or advice with this farmer..."
                                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1B180E] border border-white/15 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-secondary font-sans-brand leading-relaxed"
                              />
                              <button
                                onClick={() => handleAddReply(post.id)}
                                className="px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#245741] text-secondary font-sans-brand font-bold text-xs transition-colors self-end sm:self-auto cursor-pointer border border-secondary/30"
                              >
                                Send Reply
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 rounded-xl bg-[#1B180E] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                            <div className="flex items-center gap-2.5 text-xs text-on-surface-variant font-sans-brand">
                              <span className="material-symbols-outlined text-[18px] text-secondary">
                                lock_person
                              </span>
                              <span>
                                {lang === 'mr'
                                  ? 'या चर्चेत उत्तर देण्यासाठी कृपया शेतकरी साइन इन करा.'
                                  : lang === 'hi'
                                  ? 'इस चर्चा में उत्तर देने के लिए कृपया किसान साइन इन करें।'
                                  : 'Sign in to answer this question or share your field experience.'}
                              </span>
                            </div>
                            <button
                              onClick={onOpenAuth}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-secondary-container via-secondary to-secondary text-[#161309] font-title-sm font-bold text-xs shadow hover:scale-[1.02] transition-transform cursor-pointer whitespace-nowrap"
                            >
                              Sign In to Message
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>

        {/* Small Font Maharashtra Agriculture Ministry Helpline Notice on Community page */}
        <div className="pt-6 border-t border-white/10 text-center text-xs font-sans-brand text-on-surface-variant">
          <p className="flex items-center justify-center gap-1.5 flex-wrap">
            <span className="material-symbols-outlined text-[15px] text-secondary">support_agent</span>
            <span>
              {lang === 'mr'
                ? 'अधिकृत शेती सल्ला व तक्रारींसाठी महाराष्ट्र कृषी मंत्रालय टोल-फ्री हेल्पलाइन:'
                : lang === 'hi'
                ? 'अधिकृत कृषि सलाह एवं शिकायतों हेतु महाराष्ट्र कृषि मंत्रालय टोल-फ्री हेल्पलाइन:'
                : 'For official agronomic counsel & complaints: Maharashtra Agriculture Ministry Toll-Free Helpline'}
            </span>
            <a
              id="community-bottom-helpline-link"
              href="tel:18002334000"
              className="font-mono font-bold text-secondary hover:underline"
            >
              1800-233-4000
            </a>
            <span className="text-white/40">(Toll-Free, 6 AM – 10 PM)</span>
          </p>
        </div>
      </div>

      {/* Ask Question Modal */}
      {currentUser && (
        <AskQuestionModal
          isOpen={isAskModalOpen}
          onClose={() => setIsAskModalOpen(false)}
          currentUser={currentUser}
          onAddPost={handleAddPost}
          lang={lang}
        />
      )}
    </div>
  );
};
