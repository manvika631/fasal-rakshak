import React, { useState } from 'react';
import { CommunityPost, CropType, FarmerUser, Language } from '../types';

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: FarmerUser;
  onAddPost: (newPost: CommunityPost) => void;
  lang: Language;
}

const SAMPLE_LEAF_IMAGES = [
  {
    label: 'Rosette Cotton Flower',
    url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Soybean Leaf Mosaic',
    url: 'https://images.unsplash.com/photo-1599827552599-eadf5e0a0d9b?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Onion Seedling Tip Blight',
    url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
  },
];

export const AskQuestionModal: React.FC<AskQuestionModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAddPost,
  lang,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CommunityPost['category']>('Pest Alert');
  const [crop, setCrop] = useState<CropType | 'Pigeon Pea' | 'Soybean' | 'Cotton' | 'Onion'>('Cotton');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [requestMinistryReview, setRequestMinistryReview] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost: CommunityPost = {
      id: 'post-' + Date.now(),
      title: title.trim(),
      content: content.trim(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorDistrict: `${currentUser.district} (${currentUser.taluka || 'Maharashtra'})`,
      crop,
      category,
      imageUrl: selectedImage || undefined,
      createdAt: 'Just now',
      upvotes: 1,
      hasUpvoted: true,
      hasMinistryAnswer: requestMinistryReview,
      replies: requestMinistryReview
        ? [
            {
              id: 'reply-gov-' + Date.now(),
              authorName: 'Dr. Suresh Gaikwad',
              authorRole: 'ministry_officer',
              designation: 'Agricultural Officer, Pest Vigilance Cell, Krishi Vibhag Maharashtra',
              badgeText: 'Maharashtra Ministry of Agriculture Verified',
              content: `शेतकरी बांधव ${currentUser.name} यांच्या प्रश्नाचे अधिकृत उत्तर (Official Krishi Vibhag Advisory):\n\n१. आपण नोंदवलेल्या लक्षणांवरून हे हवामानातील वाढत्या आर्द्रतेमुळे उद्भवलेले संक्रमण दिसते.\n२. शेतातील प्रादुर्भावग्रस्त भागाची पाहणी करून तातडीने निंबोळी अर्क ५% किंवा स्थानिक कृषी सहाय्यकांच्या मार्गदर्शनानुसार प्रतिबंधात्मक फवारणी करावी.\n३. अधिक तातडीच्या मार्गदर्शनासाठी व शेतभेटीसाठी महाराष्ट्र कृषी मंत्रालय हेल्पलाइन १८००-२३३-४००० (टोल-फ्री) वर संपर्क साधा.`,
              createdAt: 'Just now',
              likes: 4,
              hasLiked: false,
            },
          ]
        : [],
    };

    onAddPost(newPost);
    setTitle('');
    setContent('');
    setSelectedImage('');
    onClose();
  };

  return (
    <div
      id="ask-question-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="ask-question-modal-dialog"
        className="relative w-full max-w-xl rounded-2xl bg-[#1B180E] border border-white/15 p-6 sm:p-8 text-on-surface shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-secondary flex items-center justify-center border border-secondary/30">
            <span className="material-symbols-outlined text-[22px]">contact_support</span>
          </div>
          <div>
            <h2 className="font-serif-brand font-bold text-xl text-on-surface">
              {lang === 'mr' ? 'नवीन शेती प्रश्न विचारा' : lang === 'hi' ? 'नया प्रश्न पूछें' : 'Ask Community & Ministry'}
            </h2>
            <p className="font-sans-brand text-xs text-on-surface-variant">
              Posting as <span className="text-secondary font-semibold">{currentUser.name}</span> ({currentUser.district})
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sans-brand font-semibold text-on-surface-variant mb-1">
              {lang === 'mr' ? 'प्रश्नाचे शीर्षक' : lang === 'hi' ? 'प्रश्न का शीर्षक' : 'Question Headline *'}
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Pink bollworm symptoms noticed after 3 nights of rain in cotton"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#262013] border border-white/15 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-secondary font-sans-brand"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-sans-brand font-semibold text-on-surface-variant mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CommunityPost['category'])}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#262013] border border-white/15 text-sm text-white focus:outline-none focus:border-secondary font-sans-brand"
              >
                <option value="Pest Alert">Pest Alert (कीड प्रादुर्भाव)</option>
                <option value="Disease & Blight">Disease & Blight (रोग व करपा)</option>
                <option value="Weather & Sowing">Weather & Sowing (हवामान व पेरणी)</option>
                <option value="Govt Schemes">Govt Schemes (शासकीय योजना)</option>
                <option value="Organic Farming">Organic Farming (सेंद्रिय उपाय)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-sans-brand font-semibold text-on-surface-variant mb-1">
                Crop
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#262013] border border-white/15 text-sm text-white focus:outline-none focus:border-secondary font-sans-brand"
              >
                <option value="Cotton">Cotton (कापूस)</option>
                <option value="Soybean">Soybean (सोयाबीन)</option>
                <option value="Sugarcane">Sugarcane (ऊस)</option>
                <option value="Pigeon Pea">Pigeon Pea / Tur (तूर)</option>
                <option value="Onion">Onion (कांदा)</option>
                <option value="Wheat">Wheat (गहू)</option>
                <option value="Chilli">Chilli (मिरची)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-sans-brand font-semibold text-on-surface-variant mb-1">
              {lang === 'mr' ? 'तपशीलवार माहिती' : lang === 'hi' ? 'विस्तृत विवरण' : 'Detailed Description *'}
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe symptoms, acre size, weather in your area, and what help you need..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#262013] border border-white/15 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-secondary font-sans-brand leading-relaxed"
            />
          </div>

          {/* Sample Photo Attachment */}
          <div>
            <label className="block text-xs font-sans-brand font-semibold text-on-surface-variant mb-1.5">
              Attach Leaf / Crop Photo (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_LEAF_IMAGES.map((img) => (
                <button
                  type="button"
                  key={img.label}
                  onClick={() => setSelectedImage(selectedImage === img.url ? '' : img.url)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans-brand transition-all flex items-center gap-1.5 border cursor-pointer ${
                    selectedImage === img.url
                      ? 'bg-[#1B4332] text-secondary border-secondary'
                      : 'bg-[#262013] text-white/70 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {selectedImage === img.url ? 'check_box' : 'add_photo_alternate'}
                  </span>
                  <span>{img.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Request Ministry Agronomist Review */}
          <div className="p-3.5 rounded-xl bg-[#143225] border border-secondary/30 flex items-start gap-3">
            <input
              type="checkbox"
              id="request-ministry"
              checked={requestMinistryReview}
              onChange={(e) => setRequestMinistryReview(e.target.checked)}
              className="mt-1 h-4 w-4 rounded accent-[#1B4332] text-secondary cursor-pointer"
            />
            <label htmlFor="request-ministry" className="text-xs font-sans-brand text-on-surface cursor-pointer">
              <span className="font-bold text-secondary block">
                Request Official Maharashtra Agriculture Ministry Review
              </span>
              <span className="text-on-surface-variant block mt-0.5">
                Routes your question to the Krishi Vibhag plant protection team for a verified advisory note.
              </span>
            </label>
          </div>

          <button
            type="submit"
            id="submit-question-btn"
            className="w-full mt-4 py-3.5 rounded-full bg-gradient-to-r from-secondary-container via-secondary to-secondary text-[#161309] font-title-sm font-bold shadow-lg hover:scale-[1.01] transition-transform cursor-pointer"
          >
            {lang === 'mr' ? 'समुदायात प्रश्न पाठवा' : lang === 'hi' ? 'समुदाय में प्रश्न पोस्ट करें' : 'Post Question to Community'}
          </button>
        </form>
      </div>
    </div>
  );
};
