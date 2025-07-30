#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🛡️  SENTINEL - Setup Validation');
console.log('=================================\n');

const checks = [
  {
    name: 'Package.json exists',
    check: () => fs.existsSync('package.json'),
    fix: 'Run the setup script to create package.json'
  },
  {
    name: 'Node modules installed',
    check: () => fs.existsSync('node_modules'),
    fix: 'Run: npm install'
  },
  {
    name: 'TypeScript config exists',
    check: () => fs.existsSync('tsconfig.json'),
    fix: 'TypeScript config should be auto-generated'
  },
  {
    name: 'Vite config exists',
    check: () => fs.existsSync('vite.config.ts'),
    fix: 'Vite config should be auto-generated'
  },
  {
    name: 'Tailwind config exists',
    check: () => fs.existsSync('tailwind.config.js'),
    fix: 'Tailwind config should be auto-generated'
  },
  {
    name: 'Main App component exists',
    check: () => fs.existsSync('src/App.tsx'),
    fix: 'Main App component should be auto-generated'
  },
  {
    name: 'All screen components exist',
    check: () => {
      const screens = [
        'OverviewScreen.tsx',
        'SearchScreen.tsx',
        'KeywordsScreen.tsx',
        'AnalyticsScreen.tsx',
        'NetworkScreen.tsx',
        'GeographicScreen.tsx',
        'IntelligenceScreen.tsx',
        'SourcesScreen.tsx',
        'AlertsScreen.tsx'
      ];
      return screens.every(screen => 
        fs.existsSync(path.join('src/components/screens', screen))
      );
    },
    fix: 'Run the component extraction script'
  },
  {
    name: 'Types and data files exist',
    check: () => {
      return fs.existsSync('src/types/index.ts') && 
             fs.existsSync('src/data/index.ts') && 
             fs.existsSync('src/utils/index.ts');
    },
    fix: 'Types, data, and utils should be auto-generated'
  },
  {
    name: 'UI components exist',
    check: () => fs.existsSync('src/components/ui/GaugeChart.tsx'),
    fix: 'UI components should be auto-generated'
  },
  {
    name: 'Build files exist',
    check: () => fs.existsSync('dist/index.html'),
    fix: 'Run: npm run build'
  }
];

let passed = 0;
let total = checks.length;

checks.forEach((check, index) => {
  const result = check.check();
  const status = result ? '✅' : '❌';
  const message = result ? 'PASS' : 'FAIL';
  
  console.log(`${status} ${check.name}: ${message}`);
  
  if (!result) {
    console.log(`   💡 Fix: ${check.fix}`);
  }
  
  if (result) passed++;
});

console.log(`\n📊 Validation Results: ${passed}/${total} checks passed`);

if (passed === total) {
  console.log('🎉 All checks passed! Your SENTINEL setup is ready.');
  console.log('\n🚀 To start the application:');
  console.log('   npm run dev');
  console.log('\n🌐 The app will be available at: http://localhost:3000');
} else {
  console.log('⚠️  Some checks failed. Please fix the issues above.');
}

console.log('\n📁 Project Structure:');
console.log('src/');
console.log('├── components/');
console.log('│   ├── screens/     # 9 dashboard screens');
console.log('│   ├── layout/      # Sidebar component');
console.log('│   └── ui/          # Reusable UI components');
console.log('├── data/            # Mock data and constants');
console.log('├── types/           # TypeScript definitions');
console.log('├── utils/           # Utility functions');
console.log('└── styles/          # Custom CSS and animations');