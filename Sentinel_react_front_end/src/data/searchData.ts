import { SearchResult } from '../types';

export const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Nouvelles mesures de sécurité annoncées',
    content: 'Nouvelles mesures de sécurité annoncées pour renforcer la protection dans les provinces orientales. Un plan d\'action coordonné avec les forces de l\'ordre est en cours de déploiement.',
    source: 'MinSécuritéRDC',
    timestamp: new Date(Date.now() - 300000).toISOString(),
    sentiment: 'positive',
    credibility: 94,
    mentions: 1247
  },
  {
    id: '2',
    title: 'Situation sécuritaire préoccupante',
    content: 'URGENT!!! Des RÉVÉLATIONS CHOQUANTES sur la situation sécuritaire!!! Le gouvernement CACHE LA VÉRITÉ! PARTAGEZ AVANT SUPPRESSION!!!',
    source: 'InfoCongoActu',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    sentiment: 'negative',
    credibility: 12,
    mentions: 2341
  },
  {
    id: '3',
    title: 'Analyse approfondie de la sécurité nationale',
    content: 'Analyse approfondie: Les experts en sécurité nationale soulignent l\'importance d\'une approche intégrée combinant technologie moderne et engagement communautaire pour garantir la paix.',
    source: 'Radio Okapi',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    sentiment: 'neutral',
    credibility: 89,
    mentions: 892
  }
];

export const searchResultsDetailed = [
  {
    id: 1,
    source: 'twitter',
    author: 'MinSécuritéRDC',
    verified: true,
    content: 'Nouvelles mesures de sécurité annoncées pour renforcer la protection dans les provinces orientales. Un plan d\'action coordonné avec les forces de l\'ordre est en cours de déploiement.',
    timestamp: new Date(Date.now() - 300000),
    sentiment: { score: 0.85, label: 'positive' },
    credibility: 94,
    engagement: { likes: 1247, shares: 523, comments: 89 },
    location: 'Kinshasa',
    topics: ['sécurité', 'gouvernement', 'provinces'],
    reach: 125000
  },
  {
    id: 2,
    source: 'facebook',
    author: 'InfoCongoActu',
    verified: false,
    content: 'URGENT!!! Des RÉVÉLATIONS CHOQUANTES sur la situation sécuritaire!!! Le gouvernement CACHE LA VÉRITÉ! PARTAGEZ AVANT SUPPRESSION!!!',
    timestamp: new Date(Date.now() - 900000),
    sentiment: { score: -0.92, label: 'negative' },
    credibility: 12,
    engagement: { likes: 45, shares: 2341, comments: 167 },
    alerts: ['Propagation suspecte', 'Langage sensationnaliste', 'Source non vérifiée'],
    location: 'Goma',
    topics: ['désinformation', 'sécurité'],
    reach: 45000
  },
  {
    id: 3,
    source: 'news',
    author: 'Radio Okapi',
    verified: true,
    content: 'Analyse approfondie: Les experts en sécurité nationale soulignent l\'importance d\'une approche intégrée combinant technologie moderne et engagement communautaire pour garantir la paix.',
    timestamp: new Date(Date.now() - 3600000),
    sentiment: { score: 0.15, label: 'neutral' },
    credibility: 89,
    engagement: { likes: 892, shares: 234, comments: 56 },
    location: 'Lubumbashi',
    topics: ['analyse', 'sécurité', 'technologie'],
    reach: 89000
  }
];