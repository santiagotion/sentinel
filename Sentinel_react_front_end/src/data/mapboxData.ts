// Advanced Mapbox Intelligence Data
import { LatLngTuple } from '../types/mapbox';

// DRC Province boundaries with detailed data
export const drcProvinces = [
  {
    id: 'kinshasa',
    name: 'Kinshasa',
    center: [15.2663, -4.4419] as LatLngTuple,
    population: 14300000,
    area: 9965,
    capital: 'Kinshasa',
    riskLevel: 'medium',
    coordinates: [
      [15.1, -4.2], [15.4, -4.2], [15.4, -4.7], [15.1, -4.7], [15.1, -4.2]
    ]
  },
  {
    id: 'nord-kivu',
    name: 'Nord-Kivu',
    center: [29.2663, -1.4419] as LatLngTuple,
    population: 8147400,
    area: 59483,
    capital: 'Goma',
    riskLevel: 'high',
    coordinates: [
      [28.8, -0.8], [30.2, -0.8], [30.2, -2.3], [28.8, -2.3], [28.8, -0.8]
    ]
  },
  {
    id: 'sud-kivu',
    name: 'Sud-Kivu',
    center: [28.7663, -2.8419] as LatLngTuple,
    population: 5772000,
    area: 65070,
    capital: 'Bukavu',
    riskLevel: 'high',
    coordinates: [
      [27.8, -2.3], [29.5, -2.3], [29.5, -4.2], [27.8, -4.2], [27.8, -2.3]
    ]
  },
  {
    id: 'katanga',
    name: 'Katanga',
    center: [25.2663, -9.4419] as LatLngTuple,
    population: 5608683,
    area: 496965,
    capital: 'Lubumbashi',
    riskLevel: 'medium',
    coordinates: [
      [21.8, -5.8], [29.5, -5.8], [29.5, -13.2], [21.8, -13.2], [21.8, -5.8]
    ]
  }
];

// Security Incidents with detailed metadata
export const securityIncidents = Array.from({ length: 500 }, (_, i) => {
  const provinces = drcProvinces;
  const province = provinces[Math.floor(Math.random() * provinces.length)];
  const severityLevels = ['low', 'medium', 'high', 'critical'];
  const incidentTypes = ['armed_clash', 'civil_unrest', 'kidnapping', 'terrorism', 'robbery', 'protest'];
  const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
  
  return {
    id: `incident_${i}`,
    type: incidentTypes[Math.floor(Math.random() * incidentTypes.length)],
    severity,
    coordinates: [
      province.center[0] + (Math.random() - 0.5) * 2,
      province.center[1] + (Math.random() - 0.5) * 2
    ] as LatLngTuple,
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    casualties: Math.floor(Math.random() * 20),
    description: `${incidentTypes[Math.floor(Math.random() * incidentTypes.length)]} incident in ${province.name}`,
    province: province.name,
    verified: Math.random() > 0.3,
    sources: Math.floor(Math.random() * 5) + 1,
    confidence: Math.random() * 100
  };
});

// Social Media Intelligence Data
export const socialMediaPosts = Array.from({ length: 1000 }, (_, i) => {
  const provinces = drcProvinces;
  const province = provinces[Math.floor(Math.random() * provinces.length)];
  const sentiments = ['positive', 'neutral', 'negative'];
  const topics = ['politics', 'security', 'economy', 'social', 'health', 'education'];
  const platforms = ['twitter', 'facebook', 'whatsapp', 'telegram'];
  
  return {
    id: `post_${i}`,
    coordinates: [
      province.center[0] + (Math.random() - 0.5) * 3,
      province.center[1] + (Math.random() - 0.5) * 3
    ] as LatLngTuple,
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    sentimentScore: (Math.random() - 0.5) * 2, // -1 to 1
    topic: topics[Math.floor(Math.random() * topics.length)],
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    engagement: Math.floor(Math.random() * 10000),
    reach: Math.floor(Math.random() * 100000),
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    viralPotential: Math.random(),
    credibility: Math.random() * 100,
    province: province.name
  };
});

// Infrastructure Data
export const infrastructure = {
  powerPlants: [
    { id: 'inga1', name: 'Inga I', coordinates: [-5.5167, 13.6167] as LatLngTuple, capacity: 351, status: 'operational', type: 'hydro' },
    { id: 'inga2', name: 'Inga II', coordinates: [-5.5267, 13.6267] as LatLngTuple, capacity: 1424, status: 'operational', type: 'hydro' },
    { id: 'katende', name: 'Katende', coordinates: [-11.6167, 27.4833] as LatLngTuple, capacity: 60, status: 'maintenance', type: 'thermal' }
  ],
  airports: [
    { id: 'fih', name: 'N\'djili Airport', coordinates: [-4.3857, 15.4446] as LatLngTuple, type: 'international', status: 'operational' },
    { id: 'gom', name: 'Goma Airport', coordinates: [-1.6708, 29.2384] as LatLngTuple, type: 'regional', status: 'operational' },
    { id: 'lub', name: 'Lubumbashi Airport', coordinates: [-11.5913, 27.5309] as LatLngTuple, type: 'international', status: 'operational' }
  ],
  miningsites: Array.from({ length: 50 }, (_, i) => ({
    id: `mine_${i}`,
    name: `Mining Site ${i + 1}`,
    coordinates: [
      21 + Math.random() * 8,
      -13 + Math.random() * 8
    ] as LatLngTuple,
    resource: ['copper', 'cobalt', 'gold', 'diamond', 'coltan'][Math.floor(Math.random() * 5)],
    production: Math.floor(Math.random() * 1000),
    securityLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
    workers: Math.floor(Math.random() * 500) + 50
  }))
};

// Network Influence Data
export const influenceNetworks = Array.from({ length: 100 }, (_, i) => {
  const provinces = drcProvinces;
  const province = provinces[Math.floor(Math.random() * provinces.length)];
  const influenceTypes = ['political', 'media', 'religious', 'business', 'activist'];
  
  return {
    id: `influencer_${i}`,
    name: `Influencer ${i + 1}`,
    coordinates: [
      province.center[0] + (Math.random() - 0.5) * 2,
      province.center[1] + (Math.random() - 0.5) * 2
    ] as LatLngTuple,
    type: influenceTypes[Math.floor(Math.random() * influenceTypes.length)],
    followers: Math.floor(Math.random() * 1000000),
    influence: Math.random() * 100,
    reach: Math.floor(Math.random() * 50) + 10, // km radius
    activity: Math.random() * 100,
    credibility: Math.random() * 100,
    connections: Array.from({ length: Math.floor(Math.random() * 10) }, () => `influencer_${Math.floor(Math.random() * 100)}`)
  };
});

// Population Density Data (for choropleth)
export const populationDensity = drcProvinces.map(province => ({
  id: province.id,
  name: province.name,
  density: province.population / province.area,
  population: province.population,
  area: province.area,
  growthRate: (Math.random() - 0.5) * 6, // -3% to +3%
  urbanization: Math.random() * 60 + 20 // 20-80%
}));

// Displacement Data
export const displacementData = Array.from({ length: 80 }, (_, i) => {
  const provinces = drcProvinces;
  const province = provinces[Math.floor(Math.random() * provinces.length)];
  
  return {
    id: `displacement_${i}`,
    type: ['refugee_camp', 'idp_site', 'transit_center'][Math.floor(Math.random() * 3)],
    coordinates: [
      province.center[0] + (Math.random() - 0.5) * 3,
      province.center[1] + (Math.random() - 0.5) * 3
    ] as LatLngTuple,
    population: Math.floor(Math.random() * 50000) + 1000,
    origin: province.name,
    established: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    conditions: ['poor', 'fair', 'good'][Math.floor(Math.random() * 3)],
    assistance: Math.random() > 0.4
  };
});

// Economic Activity Data
export const economicActivity = Array.from({ length: 200 }, (_, i) => {
  const provinces = drcProvinces;
  const province = provinces[Math.floor(Math.random() * provinces.length)];
  const activityTypes = ['market', 'factory', 'bank', 'port', 'border_crossing'];
  
  return {
    id: `economic_${i}`,
    type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
    coordinates: [
      province.center[0] + (Math.random() - 0.5) * 2.5,
      province.center[1] + (Math.random() - 0.5) * 2.5
    ] as LatLngTuple,
    value: Math.floor(Math.random() * 10000000), // USD
    employees: Math.floor(Math.random() * 1000),
    activity: Math.random() * 100,
    importance: Math.random() * 100
  };
});

// Viral Content Spread Animation Data
export const viralSpreadData = Array.from({ length: 20 }, (_, i) => {
  const startProvince = drcProvinces[Math.floor(Math.random() * drcProvinces.length)];
  const spreadPattern = Array.from({ length: 24 }, (_, hour) => {
    const intensity = Math.sin((hour / 24) * Math.PI * 2) * 50 + 50;
    return {
      hour,
      intensity,
      reach: hour * 10 + Math.random() * 50,
      coordinates: [
        startProvince.center[0] + (Math.random() - 0.5) * (hour * 0.1),
        startProvince.center[1] + (Math.random() - 0.5) * (hour * 0.1)
      ] as LatLngTuple
    };
  });
  
  return {
    id: `viral_${i}`,
    contentId: `content_${i}`,
    topic: ['election', 'security', 'economy', 'health'][Math.floor(Math.random() * 4)],
    origin: startProvince.center,
    spreadPattern,
    totalReach: Math.floor(Math.random() * 1000000),
    sentiment: (Math.random() - 0.5) * 2
  };
});

// Transportation Network
export const transportationNetwork = {
  roads: [
    { id: 'n1', name: 'Route Nationale 1', coordinates: [[-4.4, 15.3], [-11.6, 27.5]] as LatLngTuple[], condition: 'good', traffic: 'heavy' },
    { id: 'n2', name: 'Route Nationale 2', coordinates: [[-4.4, 15.3], [-1.7, 29.2]] as LatLngTuple[], condition: 'fair', traffic: 'medium' },
    { id: 'n3', name: 'Route Nationale 3', coordinates: [[-1.7, 29.2], [-2.8, 28.8]] as LatLngTuple[], condition: 'poor', traffic: 'light' }
  ],
  rivers: [
    { id: 'congo', name: 'Congo River', coordinates: [[-4.4, 15.3], [-5.0, 16.0], [-6.0, 18.0]] as LatLngTuple[], navigable: true },
    { id: 'kasai', name: 'Kasai River', coordinates: [[-6.0, 16.5], [-8.0, 19.0], [-9.0, 20.5]] as LatLngTuple[], navigable: true }
  ]
};

// Risk Assessment Data
export const riskAssessment = drcProvinces.map(province => {
  const riskFactors = {
    security: Math.random() * 100,
    political: Math.random() * 100,
    economic: Math.random() * 100,
    social: Math.random() * 100,
    environmental: Math.random() * 100
  };
  
  const overallRisk = Object.values(riskFactors).reduce((a, b) => a + b, 0) / 5;
  
  return {
    province: province.name,
    coordinates: province.center,
    riskFactors,
    overallRisk,
    riskLevel: overallRisk > 75 ? 'critical' : overallRisk > 50 ? 'high' : overallRisk > 25 ? 'medium' : 'low',
    trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
    lastUpdate: new Date().toISOString()
  };
});

// Time-series data for animations
export const timeSeriesData = Array.from({ length: 30 }, (_, day) => ({
  date: new Date(Date.now() - (29 - day) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  incidents: Math.floor(Math.random() * 50) + 10,
  socialActivity: Math.floor(Math.random() * 1000) + 200,
  sentiment: (Math.random() - 0.5) * 2,
  economicActivity: Math.floor(Math.random() * 100) + 50
}));

export const mapboxLayers = {
  drcProvinces: drcProvinces,
  security: {
    incidents: securityIncidents,
    riskAssessment
  },
  social: {
    posts: socialMediaPosts,
    viralSpread: viralSpreadData,
    influence: influenceNetworks
  },
  infrastructure: infrastructure,
  demographic: {
    population: populationDensity,
    displacement: displacementData
  },
  economic: {
    activity: economicActivity,
    transportation: transportationNetwork
  },
  temporal: timeSeriesData
};