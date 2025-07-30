// Mapbox-specific TypeScript interfaces

export type LatLngTuple = [number, number]; // [lng, lat]

export interface MapboxLayer {
  id: string;
  name: string;
  type: 'heatmap' | 'choropleth' | 'cluster' | 'symbol' | 'fill' | 'line' | 'circle' | 'fill-extrusion';
  visible: boolean;
  opacity: number;
  data: any[];
  color?: string;
  interactive?: boolean;
}

export interface SecurityIncident {
  id: string;
  type: 'armed_clash' | 'civil_unrest' | 'kidnapping' | 'terrorism' | 'robbery' | 'protest';
  severity: 'low' | 'medium' | 'high' | 'critical';
  coordinates: LatLngTuple;
  timestamp: string;
  casualties: number;
  description: string;
  province: string;
  verified: boolean;
  sources: number;
  confidence: number;
}

export interface SocialMediaPost {
  id: string;
  coordinates: LatLngTuple;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  topic: string;
  platform: string;
  engagement: number;
  reach: number;
  timestamp: string;
  viralPotential: number;
  credibility: number;
  province: string;
}

export interface InfluenceNetwork {
  id: string;
  name: string;
  coordinates: LatLngTuple;
  type: 'political' | 'media' | 'religious' | 'business' | 'activist';
  followers: number;
  influence: number;
  reach: number;
  activity: number;
  credibility: number;
  connections: string[];
}

export interface Infrastructure {
  id: string;
  name: string;
  coordinates: LatLngTuple;
  type: string;
  status: 'operational' | 'maintenance' | 'offline';
  capacity?: number;
  importance: number;
}

export interface RiskAssessment {
  province: string;
  coordinates: LatLngTuple;
  riskFactors: {
    security: number;
    political: number;
    economic: number;
    social: number;
    environmental: number;
  };
  overallRisk: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  trend: 'increasing' | 'decreasing';
  lastUpdate: string;
}

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
}

export interface LayerControl {
  security: {
    incidents: boolean;
    riskZones: boolean;
    checkpoints: boolean;
  };
  social: {
    sentiment: boolean;
    viral: boolean;
    influence: boolean;
  };
  infrastructure: {
    power: boolean;
    transport: boolean;
    mining: boolean;
  };
  demographic: {
    population: boolean;
    displacement: boolean;
  };
  economic: {
    activity: boolean;
    trade: boolean;
  };
}

export interface SearchFilter {
  timeRange: {
    start: Date;
    end: Date;
  };
  severity: string[];
  provinces: string[];
  types: string[];
  verified: boolean | null;
  sentiment: string[];
}

export interface ViralSpread {
  id: string;
  contentId: string;
  topic: string;
  origin: LatLngTuple;
  spreadPattern: {
    hour: number;
    intensity: number;
    reach: number;
    coordinates: LatLngTuple;
  }[];
  totalReach: number;
  sentiment: number;
}

export interface TimeSeriesPoint {
  date: string;
  incidents: number;
  socialActivity: number;
  sentiment: number;
  economicActivity: number;
}

export interface MapboxStyle {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface ClusterData {
  id: string;
  coordinates: LatLngTuple;
  count: number;
  severity?: string;
  type: string;
  data: any[];
}

export interface HeatmapConfig {
  intensity: number;
  radius: number;
  blur: number;
  opacity: number;
  colorScale: string[];
}

export interface Animation {
  id: string;
  type: 'temporal' | 'flow' | 'pulse' | 'spread';
  duration: number;
  speed: number;
  playing: boolean;
  currentTime: number;
}

export interface MapAnnotation {
  id: string;
  coordinates: LatLngTuple;
  title: string;
  description: string;
  type: 'note' | 'alert' | 'bookmark';
  author: string;
  timestamp: string;
  visible: boolean;
}