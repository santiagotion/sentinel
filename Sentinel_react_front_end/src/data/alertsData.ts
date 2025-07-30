import { Alert } from '../types';

// Main alerts data
export const alerts: Alert[] = [
  {
    id: 1,
    type: 'security',
    title: 'Pic d\'activité anormal détecté',
    description: 'Augmentation de 300% des mentions négatives concernant la sécurité dans la province du Nord-Kivu',
    timestamp: new Date(Date.now() - 120000).toISOString(),
    priority: 'high',
    source: 'AI Detection System',
    status: 'new'
  },
  {
    id: 2,
    type: 'political',
    title: 'Campagne de désinformation identifiée',
    description: 'Propagation coordonnée de fausses informations sur les réseaux sociaux concernant les élections',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    priority: 'high',
    source: 'Social Media Monitor',
    status: 'acknowledged'
  },
  {
    id: 3,
    type: 'social',
    title: 'Tension intercommunautaire émergente',
    description: 'Augmentation des discours de haine entre communautés dans la région de Kasaï',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    priority: 'medium',
    source: 'Community Reports',
    status: 'new'
  },
  {
    id: 4,
    type: 'economic',
    title: 'Flambée des prix alimentaires',
    description: 'Augmentation de 45% du prix des denrées de base dans les marchés de Kinshasa',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    priority: 'medium',
    source: 'Market Intelligence',
    status: 'resolved'
  }
];

// Detailed alerts with additional metadata
export const detailedAlerts = [
  {
    id: 1,
    type: 'critical',
    category: 'security',
    title: 'Pic d\'activité anormal détecté',
    description: 'Augmentation de 300% des mentions négatives concernant la sécurité dans la province du Nord-Kivu',
    location: 'Nord-Kivu',
    time: new Date(Date.now() - 120000),
    status: 'active',
    assignedTo: null,
    metrics: {
      mentions: 892,
      sentiment: -0.73,
      reach: 234000,
      sources: ['Facebook', 'Twitter']
    }
  },
  {
    id: 2,
    type: 'warning',
    category: 'political',
    title: 'Campagne de désinformation identifiée',
    description: 'Propagation coordonnée de fausses informations sur les réseaux sociaux concernant les élections',
    location: 'Multi-provinces',
    time: new Date(Date.now() - 900000),
    status: 'investigating',
    assignedTo: 'Équipe Désinformation',
    metrics: {
      mentions: 1547,
      sentiment: -0.85,
      reach: 456000,
      sources: ['Facebook', 'WhatsApp', 'Telegram']
    }
  },
  {
    id: 3,
    type: 'info',
    category: 'social',
    title: 'Mobilisation citoyenne positive',
    description: 'Initiative de paix lancée par des organisations de la société civile à Lubumbashi',
    location: 'Haut-Katanga',
    time: new Date(Date.now() - 1800000),
    status: 'monitoring',
    assignedTo: 'Équipe Social',
    metrics: {
      mentions: 334,
      sentiment: 0.82,
      reach: 89000,
      sources: ['Twitter', 'News', 'Radio']
    }
  }
];

// Provinces data with alert information
export const provinces = [
  { name: 'Kinshasa', lat: -4.4419, lng: 15.2663, activity: 95, sentiment: 72, alerts: 12, population: '14.3M' },
  { name: 'Nord-Kivu', lat: -0.7, lng: 29.2, activity: 87, sentiment: 45, alerts: 28, population: '8.1M' },
  { name: 'Sud-Kivu', lat: -3.5, lng: 28.5, activity: 78, sentiment: 52, alerts: 19, population: '6.3M' },
  { name: 'Haut-Katanga', lat: -11.6, lng: 27.4, activity: 72, sentiment: 68, alerts: 8, population: '5.7M' },
  { name: 'Équateur', lat: 0.0, lng: 18.3, activity: 65, sentiment: 75, alerts: 5, population: '1.6M' },
  { name: 'Kasaï', lat: -5.0, lng: 22.5, activity: 68, sentiment: 58, alerts: 15, population: '3.2M' },
  { name: 'Ituri', lat: 2.5, lng: 29.5, activity: 82, sentiment: 38, alerts: 35, population: '5.6M' },
  { name: 'Tanganyika', lat: -6.5, lng: 27.9, activity: 45, sentiment: 62, alerts: 7, population: '3.3M' },
  { name: 'Tshopo', lat: 0.5, lng: 25.2, activity: 52, sentiment: 70, alerts: 4, population: '2.6M' },
  { name: 'Maniema', lat: -2.5, lng: 26.0, activity: 38, sentiment: 65, alerts: 3, population: '2.3M' }
];

// Alert statistics
export const alertStats = {
  total: alerts.length,
  active: alerts.filter(a => a.status === 'new' || a.status === 'acknowledged').length,
  critical: alerts.filter(a => a.priority === 'high').length,
  resolved: alerts.filter(a => a.status === 'resolved').length,
  byType: {
    security: alerts.filter(a => a.type === 'security').length,
    political: alerts.filter(a => a.type === 'political').length,
    social: alerts.filter(a => a.type === 'social').length,
    economic: alerts.filter(a => a.type === 'economic').length
  }
};

// Alert trends data
export const alertTrends = Array.from({ length: 7 }, (_, i) => ({
  day: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i],
  critical: Math.floor(Math.random() * 5) + 1,
  warning: Math.floor(Math.random() * 8) + 2,
  info: Math.floor(Math.random() * 12) + 3,
  total: 0
})).map(d => ({ ...d, total: d.critical + d.warning + d.info }));

// Alert response times (in minutes)
export const responseMetrics = {
  averageResponseTime: 15,
  criticalResponseTime: 5,
  resolutionRate: 87,
  falsePositiveRate: 12,
  escalationRate: 8
};