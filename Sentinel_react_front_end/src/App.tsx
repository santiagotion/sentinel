import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GaugeChart } from './components/ui/GaugeChart';
import { EnhancedOverviewScreen } from './components/screens/EnhancedOverviewScreen';
import { KeywordsScreen } from './components/screens/KeywordsScreen';
import { SearchScreen } from './components/screens/SearchScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { NetworkScreen } from './components/screens/NetworkScreen';
import { GeographicScreen } from './components/screens/GeographicScreen';
import { IntelligenceScreen } from './components/screens/IntelligenceScreen';
import { SourcesScreen } from './components/screens/SourcesScreen';
import { AlertsScreen } from './components/screens/AlertsScreen';
import { InformationSpreadScreen } from './components/screens/InformationSpreadScreen';
import { SubjectAnalysisScreen } from './components/screens/SubjectAnalysisScreen';
import { CounterActionScreen } from './components/screens/CounterActionScreen';
import { GovernmentPresentation } from './pages/GovernmentPresentation';
import { 
  Search, Shield, AlertTriangle, Activity, TrendingUp, Globe, Users, 
  Brain, Map, Database, Eye, Zap, Radio, ChevronRight, BarChart3, PieChart, Network, 
  MapPin, Gauge, TrendingDown, Clock, Filter, X, Bell, Settings, LogOut, Home,
  Download, RefreshCw, Maximize2, ChevronLeft, Info, CheckCircle, XCircle, Layers,
  FileText, MessageSquare, Share2, Bookmark, Hash, Calendar, Target, Cpu, Award,
  Moon, Sun, ShareIcon
} from 'lucide-react';

// Main Dashboard Component
function Dashboard() {
  const [activeScreen, setActiveScreen] = useState('overview');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [keywords, setKeywords] = useState([
    { 
      id: 1, 
      term: 'sécurité', 
      mentions: 234, 
      trend: [12, 15, 23, 31, 28, 35, 47], 
      status: 'active' as const,
      createdAt: new Date(),
      sentiment: { positive: 65, negative: 15, neutral: 20 }
    },
    { 
      id: 2, 
      term: 'gouvernement', 
      mentions: 189, 
      trend: [45, 42, 38, 41, 44, 48, 52], 
      status: 'active' as const,
      createdAt: new Date(),
      sentiment: { positive: 40, negative: 35, neutral: 25 }
    },
    { 
      id: 3, 
      term: 'élections', 
      mentions: 567, 
      trend: [89, 92, 98, 112, 134, 156, 178], 
      status: 'critical' as const,
      createdAt: new Date(),
      sentiment: { positive: 30, negative: 50, neutral: 20 }
    },
    { 
      id: 4, 
      term: 'manifestation', 
      mentions: 89, 
      trend: [23, 25, 24, 28, 31, 29, 32], 
      status: 'warning' as const,
      createdAt: new Date(),
      sentiment: { positive: 25, negative: 45, neutral: 30 }
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const menuItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: Home, badge: null },
    { id: 'search', label: 'Recherche', icon: Search, badge: null },
    { id: 'keywords', label: 'Mots-clés', icon: Hash, badge: keywords.length },
    { id: 'analytics', label: 'Analytique', icon: BarChart3, badge: null },
    { id: 'network', label: 'Réseau', icon: Network, badge: null },
    { id: 'geographic', label: 'Géographie', icon: Map, badge: null },
    { id: 'intelligence', label: 'Intelligence IA', icon: Brain, badge: 'AI' },
    { id: 'spread', label: 'Propagation', icon: ShareIcon, badge: null },
    { id: 'counter-action', label: 'Contre-Attaque', icon: Shield, badge: null },
    { id: 'sources', label: 'Sources', icon: Database, badge: null },
    { id: 'alerts', label: 'Alertes', icon: Bell, badge: notifications }
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">SENTINEL</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">RDC Intelligence</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 text-gray-500 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Quick Stats (only when expanded) */}
        {!sidebarCollapsed && (
          <div className="px-4 py-4 space-y-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Mentions/h</span>
              <span className="font-semibold text-gray-800 dark:text-white">1,247</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Sentiment</span>
              <span className="font-semibold text-green-600">72%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Alertes</span>
              <span className="font-semibold text-red-600">{notifications}</span>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>
                {!sidebarCollapsed && item.badge !== null && (
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    item.badge === 'AI' 
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      : item.id === 'alerts' && typeof item.badge === 'number' && item.badge > 0
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">AD</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Niveau 5</p>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <div className="mt-4 flex items-center justify-between">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <LogOut className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {menuItems.find(item => item.id === activeScreen)?.label}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dernière mise à jour: {lastRefresh.toLocaleTimeString('fr-FR')}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button 
                onClick={() => setLastRefresh(new Date())}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Maximize2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="p-6">
            {activeScreen === 'overview' && <EnhancedOverviewScreen keywords={keywords} />}
            {activeScreen === 'search' && <SearchScreen />}
            {activeScreen === 'keywords' && <KeywordsScreen keywords={keywords} setKeywords={setKeywords} />}
            {activeScreen === 'analytics' && <AnalyticsScreen />}
            {activeScreen === 'network' && <NetworkScreen />}
            {activeScreen === 'geographic' && <GeographicScreen />}
            {activeScreen === 'intelligence' && <IntelligenceScreen />}
            {activeScreen === 'spread' && !selectedSubjectId && (
              <InformationSpreadScreen 
                onViewSubject={(id) => setSelectedSubjectId(id)}
              />
            )}
            {activeScreen === 'spread' && selectedSubjectId && (
              <SubjectAnalysisScreen 
                subjectId={selectedSubjectId}
                onBack={() => setSelectedSubjectId(null)}
              />
            )}
            {activeScreen === 'counter-action' && <CounterActionScreen />}
            {activeScreen === 'sources' && <SourcesScreen />}
            {activeScreen === 'alerts' && <AlertsScreen />}
          </div>
        </main>
      </div>
    </div>
  );
}

// Main App Component with Router
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/presentation" element={<GovernmentPresentation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}