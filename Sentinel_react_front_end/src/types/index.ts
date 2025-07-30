export interface Keyword {
  id: number;
  term: string;
  mentions: number;
  trend: number[];
  status: 'active' | 'critical' | 'warning';
  createdAt: Date;
  sentiment: SentimentData;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
  badge: string | number | null;
}

export interface Alert {
  id: number;
  type: 'security' | 'political' | 'social' | 'economic';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  source: string;
  status: 'new' | 'acknowledged' | 'resolved';
}

export interface MetricData {
  label: string;
  value: number;
  change: number;
  trend: number[];
  color: string;
}

export interface SourceData {
  source: string;
  percentage: number;
  color: string;
}

export interface GeographicData {
  province: string;
  mentions: number;
  sentiment: number;
  color: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'person' | 'organization' | 'location' | 'topic';
  connections: number;
  influence: number;
  size: number;
  color: string;
}

export interface Community {
  id: string;
  name: string;
  members: number;
  activity: number;
  sentiment: number;
  topics: string[];
  growth: number;
}

export interface RiskMatrix {
  category: string;
  probability: number;
  impact: number;
  level: 'low' | 'medium' | 'high' | 'critical';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
}

export interface SearchResult {
  id: string;
  title: string;
  content: string;
  source: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  credibility: number;
  mentions: number;
}

export interface DetailedSearchResult {
  id: number;
  source: string;
  author: string;
  verified: boolean;
  content: string;
  timestamp: Date;
  sentiment: { score: number; label: string };
  credibility: number;
  engagement: { likes: number; shares: number; comments: number };
  location: string;
  topics: string[];
  reach: number;
  alerts?: string[];
}

export interface SearchScreenFilters {
  source: string;
  sentiment: string;
  timeRange: string;
  credibility: string;
}

export interface SearchFilters {
  timeRange: string;
  sources: string[];
  sentiment: string[];
  credibility: number[];
  keywords: string[];
}

export type ScreenType = 'overview' | 'search' | 'keywords' | 'analytics' | 'network' | 'geographic' | 'intelligence' | 'sources' | 'alerts';

// Re-export Mapbox types for easier access
export * from './mapbox';

// Analytics-specific interfaces
export interface SentimentDataPoint {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
}

export interface SourcePerformanceData {
  source: string;
  mentions: number;
  engagement: number;
  sentiment: number;
  growth: number;
}

export interface TopicData {
  name: string;
  value: number;
  percentage: number;
}

export interface EngagementFunnelStage {
  name: string;
  value: number;
  fill: string;
}

export interface MetricCardData {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  change: string;
  changeColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface HeatMapHourData {
  hour: number;
  intensity: number;
  mentions: number;
}

export interface HeatMapDayData {
  day: string;
  hours: HeatMapHourData[];
}

// Geographic Screen interfaces
export interface Province {
  name: string;
  lat: number;
  lng: number;
  activity: number;
  sentiment: number;
  alerts: number;
  population: string;
}

export type MapLayer = 'activity' | 'sentiment' | 'alerts';

// Sources Screen interfaces
export interface Source {
  id: number;
  name: string;
  type: 'news' | 'social' | 'blog';
  credibility: number;
  volume: number;
  influence: number;
  reach: number;
  avgEngagement: number;
  status: 'active' | 'monitoring';
  lastActive: string;
}

export interface PlatformMetrics {
  platform: string;
  speed: number;
  reach: number;
  accuracy: number;
  engagement: number;
}

export interface ContentType {
  name: string;
  value: number;
  color: string;
}

export interface ContentTypeDistribution {
  [platform: string]: ContentType[];
}