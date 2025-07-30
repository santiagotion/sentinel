import { ChartDataPoint, SourceData, SentimentData } from '../types';

// Sentiment Data over time
export const sentimentData: ChartDataPoint[] = [
  { name: '01/11', date: '01/11', positive: 245, negative: 89, neutral: 156, value: 245 },
  { name: '02/11', date: '02/11', positive: 289, negative: 112, neutral: 189, value: 289 },
  { name: '03/11', date: '03/11', positive: 312, negative: 98, neutral: 201, value: 312 },
  { name: '04/11', date: '04/11', positive: 367, negative: 134, neutral: 223, value: 367 },
  { name: '05/11', date: '05/11', positive: 398, negative: 156, neutral: 245, value: 398 },
  { name: '06/11', date: '06/11', positive: 423, negative: 189, neutral: 267, value: 423 },
  { name: '07/11', date: '07/11', positive: 445, negative: 201, neutral: 289, value: 445 }
];

// Source Performance Data
export const sourcePerformance = [
  { source: 'Facebook', mentions: 4567, engagement: 89234, sentiment: 72, growth: 15.3 },
  { source: 'Twitter', mentions: 3892, engagement: 67123, sentiment: 68, growth: -5.2 },
  { source: 'News', mentions: 2341, engagement: 45678, sentiment: 81, growth: 8.7 },
  { source: 'Forums', mentions: 1234, engagement: 23456, sentiment: 54, growth: 12.1 }
];

// Topic Distribution Data
export const topicData: ChartDataPoint[] = [
  { name: 'Sécurité', value: 3938, percentage: 28.5 },
  { name: 'Politique', value: 3122, percentage: 22.6 },
  { name: 'Économie', value: 2714, percentage: 19.6 },
  { name: 'Social', value: 2145, percentage: 15.5 },
  { name: 'Santé', value: 1345, percentage: 9.7 },
  { name: 'Autres', value: 567, percentage: 4.1 }
];

// Engagement Funnel Data
export const engagementFunnel: ChartDataPoint[] = [
  { name: 'Impressions', value: 145000, fill: '#3B82F6' },
  { name: 'Engagements', value: 23450, fill: '#8B5CF6' },
  { name: 'Partages', value: 8920, fill: '#EC4899' },
  { name: 'Actions', value: 2340, fill: '#F59E0B' }
];

// Comprehensive sentiment analysis data
export const sentimentAnalysis: SentimentData = {
  positive: 72,
  neutral: 20,
  negative: 8
};

// Source distribution with detailed metrics
export const sourceDistributionDetailed: SourceData[] = [
  { source: 'Facebook', percentage: 45, color: '#1877F2' },
  { source: 'Twitter', percentage: 30, color: '#1DA1F2' },
  { source: 'News', percentage: 15, color: '#FF6B6B' },
  { source: 'Forums', percentage: 7, color: '#4ECDC4' },
  { source: 'Autres', percentage: 3, color: '#95A5A6' }
];

// Time-based analytics data for trends
export const timeAnalytics = {
  hourly: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    mentions: Math.floor(Math.random() * 200) + 50,
    sentiment: Math.random() * 2 - 1, // -1 to 1
    engagement: Math.floor(Math.random() * 1000) + 100
  })),
  
  daily: Array.from({ length: 7 }, (_, i) => ({
    day: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i],
    mentions: Math.floor(Math.random() * 3000) + 1000,
    sentiment: Math.random() * 0.8 + 0.1, // 0.1 to 0.9
    engagement: Math.floor(Math.random() * 5000) + 2000
  })),
  
  weekly: Array.from({ length: 4 }, (_, i) => ({
    week: `Semaine ${i + 1}`,
    mentions: Math.floor(Math.random() * 15000) + 5000,
    sentiment: Math.random() * 0.6 + 0.2, // 0.2 to 0.8
    engagement: Math.floor(Math.random() * 25000) + 10000
  }))
};