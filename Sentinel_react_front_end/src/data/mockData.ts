import { Activity, TrendingUp, AlertTriangle, Users, Zap, TrendingDown, Hash, CheckCircle } from 'lucide-react';
import { Keyword, MetricData, GeographicData, ChartDataPoint } from '../types';

// Keywords data
export const keywords: Keyword[] = [
  { 
    id: 1, 
    term: 'sécurité', 
    mentions: 234, 
    trend: [12, 15, 23, 31, 28, 35, 47], 
    status: 'active',
    createdAt: new Date(),
    sentiment: { positive: 65, negative: 15, neutral: 20 }
  },
  { 
    id: 2, 
    term: 'gouvernement', 
    mentions: 189, 
    trend: [45, 42, 38, 41, 44, 48, 52], 
    status: 'active',
    createdAt: new Date(),
    sentiment: { positive: 40, negative: 35, neutral: 25 }
  },
  { 
    id: 3, 
    term: 'élections', 
    mentions: 567, 
    trend: [89, 92, 98, 112, 134, 156, 178], 
    status: 'critical',
    createdAt: new Date(),
    sentiment: { positive: 30, negative: 50, neutral: 20 }
  },
  { 
    id: 4, 
    term: 'manifestation', 
    mentions: 89, 
    trend: [23, 25, 24, 28, 31, 29, 32], 
    status: 'warning',
    createdAt: new Date(),
    sentiment: { positive: 25, negative: 45, neutral: 30 }
  }
];

// Metrics data for overview
export const metrics = [
  { 
    label: 'Mentions Totales', 
    value: 18934, 
    change: '+12.5%', 
    trend: 'up',
    icon: Activity,
    color: 'blue',
    sparkline: [45, 52, 38, 48, 58, 63, 71]
  },
  { 
    label: 'Sentiment Global', 
    value: 72, 
    change: '+5.2%', 
    trend: 'up',
    icon: TrendingUp,
    color: 'green',
    sparkline: [65, 68, 70, 69, 71, 72, 72]
  },
  { 
    label: 'Alertes Critiques', 
    value: 23, 
    change: '+15%', 
    trend: 'up',
    icon: AlertTriangle,
    color: 'red',
    sparkline: [12, 15, 18, 16, 20, 22, 23]
  },
  { 
    label: 'Portée Estimée', 
    value: 2400000, 
    change: '+8.7%', 
    trend: 'up',
    icon: Users,
    color: 'purple',
    sparkline: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4]
  }
];

// Activity Timeline Data
export const activityData = Array.from({ length: 24 }, (_, i) => ({
  name: `${i}:00`,
  time: `${i}:00`,
  facebook: Math.floor(Math.random() * 500) + 200,
  twitter: Math.floor(Math.random() * 400) + 150,
  news: Math.floor(Math.random() * 300) + 100,
  total: 0,
  value: 0
})).map(d => ({ ...d, total: d.facebook + d.twitter + d.news, value: d.facebook + d.twitter + d.news }));

// Geographic Heat Map Data
export const geoData: GeographicData[] = [
  { province: 'Kinshasa', mentions: 4567, sentiment: 72, color: '#3B82F6' },
  { province: 'Goma', mentions: 3892, sentiment: 45, color: '#EF4444' },
  { province: 'Lubumbashi', mentions: 2934, sentiment: 68, color: '#10B981' },
  { province: 'Kisangani', mentions: 2156, sentiment: 75, color: '#22C55E' },
  { province: 'Bukavu', mentions: 2789, sentiment: 52, color: '#F59E0B' }
];

export const geoDataDetailed = [
  { province: 'Kinshasa', lat: -4.4419, lng: 15.2663, intensity: 85, mentions: 4567, sentiment: 72 },
  { province: 'Goma', lat: -1.6745, lng: 29.2336, intensity: 95, mentions: 3892, sentiment: 45 },
  { province: 'Lubumbashi', lat: -11.6876, lng: 27.4893, intensity: 72, mentions: 2934, sentiment: 68 },
  { province: 'Kisangani', lat: 0.5151, lng: 25.1889, intensity: 68, mentions: 2156, sentiment: 75 },
  { province: 'Bukavu', lat: -2.5083, lng: 28.8608, intensity: 78, mentions: 2789, sentiment: 52 }
];

// Real-time Alerts
export const realtimeAlerts = [
  { id: 1, type: 'critical', message: 'Pic d\'activité détecté à Goma', time: '2 min', icon: Zap },
  { id: 2, type: 'warning', message: 'Sentiment négatif en hausse - Kinshasa', time: '5 min', icon: TrendingDown },
  { id: 3, type: 'info', message: 'Nouveau mot-clé tendance: "réforme"', time: '12 min', icon: Hash },
  { id: 4, type: 'success', message: 'Campagne positive détectée', time: '18 min', icon: CheckCircle }
];

// Source Distribution
export const sourceDistribution = [
  { name: 'Facebook', value: 45, color: '#1877F2' },
  { name: 'Twitter', value: 30, color: '#1DA1F2' },
  { name: 'News', value: 15, color: '#FF6B6B' },
  { name: 'Forums', value: 7, color: '#4ECDC4' },
  { name: 'Autres', value: 3, color: '#95A5A6' }
];

// Sentiment Distribution
export const sentimentDistribution = [
  { name: 'Positif', value: 72, color: '#10B981' },
  { name: 'Neutre', value: 20, color: '#6B7280' },
  { name: 'Négatif', value: 8, color: '#EF4444' }
];

// Weekly Trend
export const weeklyTrend = [
  { day: 'Lun', mentions: 2345, engagement: 4.2 },
  { day: 'Mar', mentions: 2567, engagement: 4.5 },
  { day: 'Mer', mentions: 2890, engagement: 5.1 },
  { day: 'Jeu', mentions: 3123, engagement: 5.3 },
  { day: 'Ven', mentions: 3456, engagement: 5.8 },
  { day: 'Sam', mentions: 2987, engagement: 4.9 },
  { day: 'Dim', mentions: 2534, engagement: 4.3 }
];

// Top Influencers
export const topInfluencers = [
  { name: 'MinSécuritéRDC', followers: 125000, engagement: 8.5, verified: true },
  { name: 'InfoCongo24', followers: 89000, engagement: 6.2, verified: true },
  { name: 'CitoyenEngagé', followers: 56000, engagement: 7.8, verified: false },
  { name: 'RDCNews', followers: 45000, engagement: 5.9, verified: true }
];