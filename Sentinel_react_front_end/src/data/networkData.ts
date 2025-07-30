import { NetworkNode, Community, ChartDataPoint } from '../types';

// Network Nodes Data
export const networkNodes: NetworkNode[] = [
  { 
    id: '1', 
    label: 'MinSécuritéRDC', 
    type: 'organization', 
    connections: 12, 
    influence: 95, 
    size: 95, 
    color: '#3B82F6' 
  },
  { 
    id: '2', 
    label: 'InfoCongo24', 
    type: 'organization', 
    connections: 8, 
    influence: 87, 
    size: 87, 
    color: '#8B5CF6' 
  },
  { 
    id: '3', 
    label: 'CitoyenEngagé', 
    type: 'person', 
    connections: 15, 
    influence: 72, 
    size: 72, 
    color: '#10B981' 
  },
  { 
    id: '4', 
    label: 'RDCNews', 
    type: 'organization', 
    connections: 6, 
    influence: 68, 
    size: 68, 
    color: '#F59E0B' 
  },
  { 
    id: '5', 
    label: 'ActivisteDRC', 
    type: 'person', 
    connections: 9, 
    influence: 55, 
    size: 55, 
    color: '#EF4444' 
  }
];

// Simplified network nodes for basic display
export const simpleNetworkNodes = [
  { id: 1, name: 'MinSécuritéRDC', type: 'official', influence: 95, connections: 12 },
  { id: 2, name: 'InfoCongo24', type: 'media', influence: 87, connections: 8 },
  { id: 3, name: 'CitoyenEngagé', type: 'influencer', influence: 72, connections: 15 },
  { id: 4, name: 'RDCNews', type: 'media', influence: 68, connections: 6 },
  { id: 5, name: 'ActivisteDRC', type: 'activist', influence: 55, connections: 9 }
];

// Information cascade timeline
export const cascadeData: ChartDataPoint[] = Array.from({ length: 24 }, (_, i) => ({
  name: i.toString(),
  time: `${i}:00`,
  original: i === 0 ? 100 : 0,
  firstGen: i > 0 && i < 4 ? 50 * (4 - i) : 0,
  secondGen: i > 2 && i < 8 ? 30 * (8 - i) : 0,
  thirdGen: i > 5 && i < 12 ? 20 * (12 - i) : 0,
  value: i === 0 ? 100 : (i > 0 && i < 4 ? 50 * (4 - i) : 0) + (i > 2 && i < 8 ? 30 * (8 - i) : 0) + (i > 5 && i < 12 ? 20 * (12 - i) : 0)
}));

// Community detection data
export const communities: Community[] = [
  { 
    id: 'gov', 
    name: 'Gouvernement', 
    members: 234, 
    activity: 85, 
    sentiment: 78, 
    topics: ['politique', 'sécurité', 'développement'], 
    growth: 15 
  },
  { 
    id: 'opp', 
    name: 'Opposition', 
    members: 189, 
    activity: 92, 
    sentiment: 45, 
    topics: ['réforme', 'élections', 'critique'], 
    growth: 8 
  },
  { 
    id: 'civil', 
    name: 'Société Civile', 
    members: 342, 
    activity: 78, 
    sentiment: 68, 
    topics: ['droits', 'justice', 'paix'], 
    growth: 23 
  },
  { 
    id: 'media', 
    name: 'Médias', 
    members: 156, 
    activity: 95, 
    sentiment: 72, 
    topics: ['information', 'actualité', 'investigation'], 
    growth: 31 
  }
];

// Simple community data for basic display
export const simpleCommunities = [
  { name: 'Gouvernement', members: 234, color: 'from-blue-500 to-blue-600', overlap: 15 },
  { name: 'Opposition', members: 189, color: 'from-red-500 to-red-600', overlap: 8 },
  { name: 'Société Civile', members: 342, color: 'from-green-500 to-green-600', overlap: 23 },
  { name: 'Médias', members: 156, color: 'from-purple-500 to-purple-600', overlap: 31 }
];

// Network influence metrics
export const influenceMetrics = {
  totalNodes: networkNodes.length,
  totalConnections: networkNodes.reduce((sum, node) => sum + node.connections, 0),
  averageInfluence: networkNodes.reduce((sum, node) => sum + node.influence, 0) / networkNodes.length,
  networkDensity: 0.72,
  clusteringCoefficient: 0.45
};

// Node type colors mapping
export const nodeTypeColors = {
  official: 'from-blue-400 to-blue-600',
  media: 'from-purple-400 to-purple-600',
  influencer: 'from-green-400 to-green-600',
  activist: 'from-orange-400 to-orange-600',
  organization: 'from-indigo-400 to-indigo-600',
  person: 'from-emerald-400 to-emerald-600',
  location: 'from-amber-400 to-amber-600',
  topic: 'from-rose-400 to-rose-600'
};