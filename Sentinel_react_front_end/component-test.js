// Quick component import test
import React from 'react';

// Test all component imports
console.log('Testing component imports...');

try {
  // Main App
  import('./src/App.tsx').then(() => console.log('✅ App component imported'));
  
  // UI Components
  import('./src/components/ui/GaugeChart.tsx').then(() => console.log('✅ GaugeChart component imported'));
  
  // Layout Components
  import('./src/components/layout/Sidebar.tsx').then(() => console.log('✅ Sidebar component imported'));
  
  // Screen Components
  import('./src/components/screens/OverviewScreen.tsx').then(() => console.log('✅ OverviewScreen component imported'));
  import('./src/components/screens/SearchScreen.tsx').then(() => console.log('✅ SearchScreen component imported'));
  import('./src/components/screens/KeywordsScreen.tsx').then(() => console.log('✅ KeywordsScreen component imported'));
  import('./src/components/screens/AnalyticsScreen.tsx').then(() => console.log('✅ AnalyticsScreen component imported'));
  import('./src/components/screens/NetworkScreen.tsx').then(() => console.log('✅ NetworkScreen component imported'));
  import('./src/components/screens/GeographicScreen.tsx').then(() => console.log('✅ GeographicScreen component imported'));
  import('./src/components/screens/IntelligenceScreen.tsx').then(() => console.log('✅ IntelligenceScreen component imported'));
  import('./src/components/screens/SourcesScreen.tsx').then(() => console.log('✅ SourcesScreen component imported'));
  import('./src/components/screens/AlertsScreen.tsx').then(() => console.log('✅ AlertsScreen component imported'));
  
  // Data imports
  import('./src/data/index.ts').then(() => console.log('✅ Data modules imported'));
  
  // Types
  import('./src/types/index.ts').then(() => console.log('✅ Types imported'));
  
  // Utils
  import('./src/utils/index.ts').then(() => console.log('✅ Utils imported'));
  
  console.log('🎉 All components ready!');
} catch (error) {
  console.error('❌ Component import error:', error);
}