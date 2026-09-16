export type ActiveScreen = 'home' | 'check-crop' | 'my-area' | 'how-it-works' | 'community' | 'my-account';

export type Language = 'en' | 'hi' | 'mr';

export type SimpleRiskLevel = 'low' | 'medium' | 'high';

export interface FarmerUser {
  id: string;
  name: string;
  phone: string;
  district: string;
  taluka?: string;
  primaryCrop: CropType;
  isVerifiedFarmer?: boolean;
  avatar?: string;
}

export interface CommunityReply {
  id: string;
  authorName: string;
  authorRole: 'farmer' | 'ministry_officer' | 'agronomist';
  authorDistrict?: string;
  designation?: string; // e.g. "Taluka Agriculture Officer, Krishi Vibhag Maharashtra"
  badgeText?: string; // e.g. "Maharashtra Ministry of Agriculture Verified"
  content: string;
  createdAt: string;
  likes: number;
  hasLiked?: boolean;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorDistrict: string;
  crop: CropType | 'General' | 'Pigeon Pea' | 'Soybean' | 'Cotton' | 'Onion';
  category: 'Pest Alert' | 'Disease & Blight' | 'Weather & Sowing' | 'Govt Schemes' | 'Organic Farming';
  imageUrl?: string;
  createdAt: string;
  upvotes: number;
  hasUpvoted?: boolean;
  hasMinistryAnswer: boolean;
  replies: CommunityReply[];
}

export interface AreaReportItem {
  id: string;
  issue: string;
  crop: string;
  distance: string;
  timeAgo: string;
  iconName: string;
}

export type CropType = 'Cotton' | 'Chilli' | 'Wheat' | 'Groundnut' | 'Soybean' | 'Sugarcane';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'GUARDED';

export type PestCategory = 'Lepidopteran Borer' | 'Piercing & Sucking' | 'Fungal Blight' | 'Bacterial Wilt';

export interface DistrictRiskData {
  id: string;
  name: string;
  state: string;
  belt: string;
  lat: number;
  lng: number;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  primaryCrop: CropType;
  secondaryCrop?: CropType;
  activePest: string;
  scientificName: string;
  category: PestCategory;
  sporeGerminationProb: number; // percentage
  spreadVector: string; // e.g. "Southwest wind 14 km/h"
  temperature: number; // °C
  relativeHumidity: number; // %
  dewHours: number;
  rainfallNext48h: number; // mm
  alertHeadline: string;
  earlyActionWindow: string; // e.g. "Next 36 hours before rain"
  trapCounts: number; // avg per trap
  confirmedReportsNearby: number;
  recommendedAction: string;
  organicProtocol: string;
}

export interface AdvisoryItem {
  id: string;
  code: string;
  date: string;
  title: string;
  crop: CropType;
  district: string;
  state: string;
  threat: string;
  scientificName?: string;
  riskLevel: RiskLevel;
  etThreshold: string;
  weatherTrigger: string;
  biologicalMeasure: string;
  culturalMeasure: string;
  chemicalEmergencyMeasure: string;
  audioDuration: string;
  validUntil: string;
}

export interface FieldObservation {
  id: string;
  farmerName: string;
  village: string;
  district: string;
  crop: CropType;
  acreage: number;
  symptoms: string;
  trapCount?: number;
  reportedAt: string;
  status: 'Verifying' | 'Triangulated' | 'Confirmed';
}

export interface RegisteredField {
  farmerName: string;
  phone: string;
  state: string;
  district: string;
  crop: CropType;
  acres: number;
  sowingDate: string;
  smsAlerts: boolean;
  whatsappAlerts: boolean;
}
