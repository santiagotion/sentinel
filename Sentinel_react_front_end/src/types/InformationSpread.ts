export type SentimentType = 'positive' | 'negative' | 'neutral' | 'mixed';
export type SpreadStatus = 'emerging' | 'spreading' | 'viral' | 'declining' | 'dormant';
export type SourceType = 'social_media' | 'news' | 'blog' | 'forum' | 'messaging_app' | 'other';
export type PredictionConfidence = 'high' | 'medium' | 'low';

export interface Subject {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: SpreadStatus;
  sentiment: SentimentType;
  createdAt: string;
  firstSeenAt: string;
  lastActivityAt: string;
  totalReach: number;
  spreadVelocity: number;
  engagementRate: number;
  thumbnailUrl?: string;
}

export interface SpreadEvent {
  id: string;
  subjectId: string;
  timestamp: string;
  source: SourceAccount;
  content: string;
  type: 'origin' | 'amplification' | 'mutation' | 'debunk' | 'fact_check';
  reach: number;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    views?: number;
  };
  sentiment: SentimentType;
  location?: {
    country?: string;
    region?: string;
    city?: string;
    coordinates?: [number, number];
  };
  metadata?: Record<string, any>;
}

export interface SourceAccount {
  id: string;
  platform: SourceType;
  username: string;
  displayName: string;
  profileUrl: string;
  profileImageUrl?: string;
  verified: boolean;
  followerCount: number;
  credibilityScore: number;
  botProbability: number;
  accountCreatedAt?: string;
  previousActivity?: {
    subjects: string[];
    narratives: string[];
  };
}

export interface EventRelationship {
  id: string;
  fromEventId: string;
  toEventId: string;
  type: 'causes' | 'influences' | 'contradicts' | 'supports' | 'debunks' | 'amplifies';
  strength: number; // 0-1
  confidence: number; // 0-1
  evidence?: string[];
}

export interface SubjectTimeline {
  subjectId: string;
  events: SpreadEvent[];
  milestones: TimelineMilestone[];
  phases: SpreadPhase[];
}

export interface TimelineMilestone {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  significance: 'critical' | 'major' | 'minor';
  eventIds: string[];
}

export interface SpreadPhase {
  id: string;
  name: string;
  startTime: string;
  endTime?: string;
  characteristics: {
    velocity: number;
    sentiment: SentimentType;
    dominantPlatforms: SourceType[];
    keyNarratives: string[];
  };
}

export interface SpreadPrediction {
  id: string;
  subjectId: string;
  createdAt: string;
  timeHorizon: '24h' | '7d' | '30d';
  predictions: {
    reachEstimate: {
      min: number;
      max: number;
      expected: number;
    };
    sentimentShift?: {
      direction: 'improving' | 'worsening' | 'stable';
      magnitude: number;
    };
    viralProbability: number;
    peakTime?: string;
    declineTime?: string;
  };
  confidence: PredictionConfidence;
  factors: string[];
  recommendations?: string[];
}

export interface CauseEffectAnalysis {
  subjectId: string;
  rootCauses: CauseNode[];
  effects: EffectNode[];
  chains: CausalChain[];
}

export interface CauseNode {
  id: string;
  type: 'event' | 'narrative' | 'actor' | 'external_factor';
  description: string;
  timestamp?: string;
  evidence: string[];
  confidence: number;
}

export interface EffectNode {
  id: string;
  type: 'behavioral' | 'sentiment' | 'action' | 'policy' | 'economic';
  description: string;
  measuredImpact?: {
    metric: string;
    value: number;
    change: number;
  };
  affectedGroups?: string[];
}

export interface CausalChain {
  id: string;
  causes: string[]; // IDs of CauseNodes
  effects: string[]; // IDs of EffectNodes
  strength: number;
  timeDelay?: number; // in hours
}

export interface RawDataItem {
  id: string;
  subjectId: string;
  source: SourceAccount;
  timestamp: string;
  rawContent: string;
  processedContent?: string;
  language: string;
  hasMedia: boolean;
  mediaUrls?: string[];
  isOriginal: boolean;
  parentId?: string; // for replies/shares
  metadata: Record<string, any>;
}

export interface SubjectAnalytics {
  subjectId: string;
  period: 'hourly' | 'daily' | 'weekly';
  metrics: {
    reach: TimeSeriesData[];
    engagement: TimeSeriesData[];
    sentiment: TimeSeriesData[];
    velocity: TimeSeriesData[];
    platforms: PlatformDistribution[];
  };
  topInfluencers: SourceAccount[];
  viralMoments: ViralMoment[];
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  label?: string;
}

export interface PlatformDistribution {
  platform: SourceType;
  percentage: number;
  count: number;
}

export interface ViralMoment {
  id: string;
  timestamp: string;
  triggerEventId: string;
  peakReach: number;
  duration: number;
  amplificationFactor: number;
}