import { RiskMatrix } from '../types';

// Risk Matrix Data
export const riskMatrix: RiskMatrix[] = [
  { category: 'Sécurité', probability: 80, impact: 90, level: 'critical' },
  { category: 'Économie', probability: 60, impact: 70, level: 'high' },
  { category: 'Santé', probability: 40, impact: 60, level: 'medium' },
  { category: 'Éducation', probability: 30, impact: 50, level: 'low' },
  { category: 'Transport', probability: 50, impact: 40, level: 'medium' },
  { category: 'Politique', probability: 70, impact: 85, level: 'high' }
];

// Pattern Recognition Data
export const patterns = [
  { pattern: 'Escalade tensions', occurrences: 23, accuracy: 87, trend: 'increasing' },
  { pattern: 'Campagne désinformation', occurrences: 15, accuracy: 92, trend: 'stable' },
  { pattern: 'Mobilisation positive', occurrences: 31, accuracy: 78, trend: 'increasing' },
  { pattern: 'Crise émergente', occurrences: 8, accuracy: 95, trend: 'decreasing' }
];

// AI Predictions and Insights
export const aiInsights = [
  {
    id: 1,
    type: 'prediction',
    title: 'Escalade probable dans les 48h',
    description: 'Analyse des patterns de communication suggère une escalade des tensions dans la région de Nord-Kivu',
    confidence: 87,
    timeframe: '48h',
    category: 'security',
    factors: ['Augmentation mentions négatives', 'Mobilisation réseaux sociaux', 'Historique conflits']
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'Fenêtre de dialogue ouverte',
    description: 'Sentiment positif émergent autour des initiatives de paix offre une opportunité de médiation',
    confidence: 73,
    timeframe: '7 jours',
    category: 'diplomatic',
    factors: ['Mentions positives médiation', 'Engagement leaders', 'Support population']
  },
  {
    id: 3,
    type: 'risk',
    title: 'Propagation désinformation détectée',
    description: 'Campagne coordonnée de désinformation identifiée avec propagation rapide sur réseaux sociaux',
    confidence: 95,
    timeframe: '24h',
    category: 'information',
    factors: ['Comptes suspects', 'Messages similaires', 'Propagation anormale']
  }
];

// Threat Assessment Matrix
export const threatAssessment = [
  {
    threat: 'Conflit armé',
    likelihood: 'High',
    impact: 'Critical',
    indicators: ['Mobilisation groupes armés', 'Tensions intercommunautaires', 'Accès aux armes'],
    mitigation: 'Déploiement forces de maintien de la paix'
  },
  {
    threat: 'Crise économique',
    likelihood: 'Medium',
    impact: 'High',
    indicators: ['Inflation galopante', 'Chômage élevé', 'Instabilité monétaire'],
    mitigation: 'Politique économique d\'urgence'
  },
  {
    threat: 'Épidémie sanitaire',
    likelihood: 'Medium',
    impact: 'High',
    indicators: ['Cas suspects', 'Système santé fragile', 'Mobilité population'],
    mitigation: 'Renforcement surveillance sanitaire'
  },
  {
    threat: 'Désinformation massive',
    likelihood: 'High',
    impact: 'Medium',
    indicators: ['Campagnes coordonnées', 'Polarisation opinion', 'Faible media literacy'],
    mitigation: 'Fact-checking et éducation médiatique'
  }
];

// Early Warning Indicators
export const earlyWarningIndicators = [
  {
    indicator: 'Pic mentions violences',
    value: 78,
    threshold: 70,
    status: 'warning',
    trend: 'increasing',
    lastUpdated: new Date()
  },
  {
    indicator: 'Sentiment négatif',
    value: 45,
    threshold: 40,
    status: 'critical',
    trend: 'increasing',
    lastUpdated: new Date()
  },
  {
    indicator: 'Polarisation discours',
    value: 62,
    threshold: 60,
    status: 'warning',
    trend: 'stable',
    lastUpdated: new Date()
  },
  {
    indicator: 'Désinformation détectée',
    value: 23,
    threshold: 30,
    status: 'normal',
    trend: 'decreasing',
    lastUpdated: new Date()
  }
];

// Scenario Planning Data
export const scenarios = [
  {
    id: 'scenario_1',
    name: 'Escalade Sécuritaire',
    probability: 35,
    impact: 'Critique',
    description: 'Dégradation rapide situation sécuritaire avec déplacement populations',
    triggers: ['Incident armé majeur', 'Polarisation ethnique', 'Défaillance institutions'],
    timeline: '2-4 semaines',
    responses: ['Intervention forces de paix', 'Aide humanitaire d\'urgence', 'Médiation internationale']
  },
  {
    id: 'scenario_2',
    name: 'Stabilisation Progressive',
    probability: 45,
    impact: 'Positif',
    description: 'Amélioration graduelle avec renforcement institutions démocratiques',
    triggers: ['Accord de paix', 'Réformes institutionnelles', 'Croissance économique'],
    timeline: '3-6 mois',
    responses: ['Soutien réformes', 'Investissement développement', 'Renforcement capacités']
  },
  {
    id: 'scenario_3',
    name: 'Status Quo Fragile',
    probability: 20,
    impact: 'Neutre',
    description: 'Maintien situation actuelle avec tensions latentes persistantes',
    triggers: ['Équilibre précaire', 'Absence leadership', 'Pressions externes'],
    timeline: '6-12 mois',
    responses: ['Surveillance continue', 'Dialogue préventif', 'Préparation contingences']
  }
];

// Intelligence Sources Performance
export const sourceReliability = [
  { source: 'OSINT', reliability: 85, coverage: 92, latency: 'Temps réel' },
  { source: 'Médias traditionnels', reliability: 78, coverage: 67, latency: '1-2 heures' },
  { source: 'Réseaux sociaux', reliability: 65, coverage: 95, latency: 'Temps réel' },
  { source: 'Rapports gouvernementaux', reliability: 90, coverage: 45, latency: '24-48 heures' },
  { source: 'ONG locales', reliability: 82, coverage: 78, latency: '2-6 heures' }
];