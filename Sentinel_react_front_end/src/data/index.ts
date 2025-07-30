// Main mock data exports
export * from './mockData';
export * from './menuItems';
export * from './searchData';
export * from './analyticsData';
export * from './networkData';
export * from './intelligenceData';
export * from './alertsData';

// Re-export commonly used data for convenience
export { keywords, metrics, geoData, sourceDistribution, sentimentDistribution } from './mockData';
export { menuItems } from './menuItems';
export { alerts, provinces } from './alertsData';
export { networkNodes, communities } from './networkData';
export { riskMatrix, patterns } from './intelligenceData';