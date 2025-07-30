// Data Models for Sentinel Backend

export interface Keyword {
  id: string;
  term: string;
  isActive: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  updatedAt: Date;
  lastScrapedAt?: Date;
  analytics?: KeywordAnalytics;
}

export interface TwitterPost {
  id: string;
  tweetId: string;
  keyword: string;
  content: string;
  author: string;
  authorId: string;
  authorVerified: boolean;
  timestamp: Date;
  scrapedAt: Date;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  platform: 'twitter';
  
  // Engagement metrics from public_metrics
  engagement: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
    impression_count: number;
    bookmark_count?: number;
  };
  
  // Additional metadata
  metadata: {
    tweet_type: 'original' | 'retweet' | 'quote' | 'reply';
    language: string;
    possibly_sensitive: boolean;
    in_reply_to_user_id?: string;
    referenced_tweets?: Array<{
      type: 'retweeted' | 'quoted' | 'replied_to';
      id: string;
    }>;
    hashtags?: string[];
    mentions?: string[];
    urls?: string[];
  };
  
  // Location data if available
  geo?: {
    place_id?: string;
    full_name?: string;
    country?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export interface KeywordAnalytics {
  totalMentions: number;
  totalEngagement: number;
  averageSentiment: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  engagementRate: number;
  viralityScore: number;
  lastUpdated: Date;
  trendData: Array<{
    date: Date;
    mentions: number;
    sentiment: number;
    engagement: number;
  }>;
}

export interface ScrapingLog {
  id: string;
  keyword: string;
  timestamp: Date;
  status: 'success' | 'error' | 'partial';
  tweetsFound: number;
  apiCallsUsed: number;
  error?: string;
  duration: number;
}

export interface RateLimitStatus {
  endpoint: string;
  remaining: number;
  reset: Date;
  limit: number;
}