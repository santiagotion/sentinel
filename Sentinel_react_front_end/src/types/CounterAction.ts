export type CampaignType = 'fact_check' | 'educational' | 'counter_narrative' | 'awareness' | 'community_engagement';
export type CampaignStatus = 'draft' | 'pending_approval' | 'active' | 'paused' | 'completed' | 'cancelled';
export type ResponseType = 'automated' | 'manual' | 'hybrid';
export type Platform = 'twitter' | 'facebook' | 'whatsapp' | 'telegram' | 'instagram' | 'tiktok' | 'all';

export interface CounterCampaign {
  id: string;
  title: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  targetSubjectId?: string; // Reference to misinformation subject
  platforms: Platform[];
  createdAt: string;
  startDate: string;
  endDate?: string;
  creator: {
    id: string;
    name: string;
    role: string;
  };
  approval: {
    required: boolean;
    approvedBy?: string;
    approvedAt?: string;
    comments?: string;
  };
  metrics: CampaignMetrics;
  content: CampaignContent;
  targeting: CampaignTargeting;
  schedule: CampaignSchedule;
}

export interface CampaignContent {
  messages: CampaignMessage[];
  media: MediaAsset[];
  hashtags: string[];
  mentions: string[];
  factCheckSources: FactCheckSource[];
}

export interface CampaignMessage {
  id: string;
  platform: Platform;
  content: string;
  language: string;
  tone: 'formal' | 'friendly' | 'educational' | 'urgent';
  variables: Record<string, string>; // For personalization
}

export interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'infographic' | 'document';
  url: string;
  title: string;
  description: string;
  verified: boolean;
}

export interface FactCheckSource {
  id: string;
  organization: string;
  url: string;
  title: string;
  summary: string;
  credibilityScore: number;
  publishedAt: string;
}

export interface CampaignTargeting {
  demographics: {
    ageGroups: string[];
    locations: string[];
    languages: string[];
  };
  behavioral: {
    engagedWithMisinformation: boolean;
    followsInfluencers: string[];
    interests: string[];
  };
  reach: {
    estimated: number;
    maxBudget?: number;
  };
}

export interface CampaignSchedule {
  type: 'immediate' | 'scheduled' | 'triggered';
  startTime?: string;
  endTime?: string;
  frequency?: 'once' | 'daily' | 'weekly' | 'on_detection';
  triggers?: CampaignTrigger[];
}

export interface CampaignTrigger {
  id: string;
  type: 'misinformation_detected' | 'viral_threshold' | 'sentiment_drop' | 'manual';
  conditions: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface CampaignMetrics {
  reach: number;
  impressions: number;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
  effectiveness: {
    misinformationReduced: number;
    factChecksDelivered: number;
    narrativeShift: number;
    communityEngagement: number;
  };
  costs: {
    budget: number;
    spent: number;
    costPerReach: number;
  };
}

export interface AutoResponse {
  id: string;
  name: string;
  active: boolean;
  platforms: Platform[];
  triggers: ResponseTrigger[];
  responses: ResponseTemplate[];
  approval: {
    required: boolean;
    approver?: string;
  };
  metrics: {
    triggered: number;
    sent: number;
    effectiveness: number;
  };
  createdAt: string;
  lastTriggered?: string;
}

export interface ResponseTrigger {
  id: string;
  type: 'keyword' | 'hashtag' | 'mention' | 'sentiment' | 'misinformation_detected';
  patterns: string[];
  conditions: {
    confidence?: number;
    engagement?: number;
    reach?: number;
  };
  cooldown: number; // Minutes between responses
}

export interface ResponseTemplate {
  id: string;
  platform: Platform;
  content: string;
  language: string;
  includeFactCheck: boolean;
  includeSources: boolean;
  personalized: boolean;
  tone: 'professional' | 'educational' | 'empathetic' | 'corrective';
}

export interface RapidResponse {
  id: string;
  title: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'draft' | 'deploying' | 'active' | 'completed';
  triggerEvent: {
    type: 'viral_misinformation' | 'crisis_event' | 'coordinated_attack' | 'other';
    description: string;
    detectedAt: string;
  };
  actions: RapidResponseAction[];
  timeline: RapidResponseTimeline[];
  team: ResponseTeamMember[];
  metrics: {
    responseTime: number; // Minutes
    reach: number;
    effectiveness: number;
  };
}

export interface RapidResponseAction {
  id: string;
  type: 'social_media_post' | 'press_release' | 'influencer_outreach' | 'community_alert' | 'fact_check';
  platform?: Platform;
  content: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedTo: string;
  scheduledFor: string;
  completedAt?: string;
}

export interface RapidResponseTimeline {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  result?: string;
  impact?: number;
}

export interface ResponseTeamMember {
  id: string;
  name: string;
  role: 'coordinator' | 'content_creator' | 'fact_checker' | 'community_manager' | 'analyst';
  contact: string;
  available: boolean;
}

export interface CommunityEngagement {
  id: string;
  title: string;
  type: 'ambassador_program' | 'fact_checker_network' | 'educational_workshop' | 'awareness_drive';
  status: 'planning' | 'recruiting' | 'active' | 'completed';
  participants: CommunityParticipant[];
  activities: CommunityActivity[];
  impact: {
    peopleReached: number;
    misinformationCorrected: number;
    trustedSourcesShared: number;
    communityGrowth: number;
  };
  createdAt: string;
}

export interface CommunityParticipant {
  id: string;
  name: string;
  role: 'ambassador' | 'fact_checker' | 'educator' | 'volunteer';
  location: string;
  platforms: Platform[];
  reach: number;
  credibilityScore: number;
  contributionLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface CommunityActivity {
  id: string;
  type: 'training' | 'fact_check' | 'content_creation' | 'outreach' | 'monitoring';
  title: string;
  description: string;
  participants: string[];
  scheduledFor: string;
  completedAt?: string;
  impact: {
    reach: number;
    engagement: number;
    factChecks: number;
  };
}