import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, AlertTriangle, Shield, Users, Globe, 
  Network, Database, Eye, Filter, Download, RefreshCw, Calendar,
  Target, Zap, Activity, Brain, Search, Hash, Clock, Layers,
  PieChart, LineChart, MapPin, Bell, Settings, Info, CheckCircle,
  XCircle, ArrowUp, ArrowDown, Minus, Play, Pause, SkipForward,
  Maximize2, Share2, FileText, MessageSquare, ThumbsUp, ThumbsDown,
  Heart, Star, Bookmark, Tag, Link, ExternalLink, TreePine, Home,
  Monitor, Gauge, AlertCircle, ChevronRight, Plus, X
} from 'lucide-react';
import { RawDataExplorer } from '../visualizations/RawDataExplorer';
import { OpinionAnalysisDashboard } from '../visualizations/OpinionAnalysisDashboard';
import { TimelineAndTrends } from '../visualizations/TimelineAndTrends';
import { AdvancedNetworkVisualization } from '../visualizations/AdvancedNetworkVisualization';
import { AlertsScreen } from './AlertsScreen';
import { useNotifications } from '../../contexts/NotificationContext';
import { useDashboardSettings } from '../../contexts/SettingsContext';
import { useRealTimeData } from '../../hooks/useRealTimeData';
import { SettingsModal } from '../ui/SettingsModal';
import { SearchModal } from '../ui/SearchModal';

interface OverviewProps {
  keywords: any[];
}

export function EnhancedOverviewScreen({ keywords }: OverviewProps) {
  const [activeTab, setActiveTab] = useState('strategic');
  const [timeRange, setTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quickActions, setQuickActions] = useState<string[]>([]);
  
  const { success, error, info } = useNotifications();
  const { settings, updateSettings } = useDashboardSettings();
  const realTimeData = useRealTimeData('all', { enabled: autoRefresh });

  // Tab configuration
  const tabs = [
    { 
      id: 'strategic', 
      label: 'Tableau Stratégique', 
      icon: Target, 
      description: 'Vue exécutive et KPIs critiques' 
    },
    { 
      id: 'analytics', 
      label: 'Analyse Intelligence', 
      icon: Brain, 
      description: 'Analyses approfondies et insights' 
    },
    { 
      id: 'opinion', 
      label: 'Analyse d\'Opinion', 
      icon: MessageSquare, 
      description: 'Analyse d\'opinion par mots-clés' 
    },
    { 
      id: 'timeline', 
      label: 'Timeline & Tendances', 
      icon: Clock, 
      description: 'Visualisation temporelle et tendances' 
    },
    { 
      id: 'network', 
      label: 'Analyse Réseau', 
      icon: Network, 
      description: 'Relations et connections d\'entités' 
    },
    { 
      id: 'rawdata', 
      label: 'Données Brutes', 
      icon: Database, 
      description: 'Exploration des données collectées' 
    },
    { 
      id: 'alerts', 
      label: 'Centre d\'Alertes', 
      icon: Bell, 
      description: 'Gestion et workflows des alertes' 
    }
  ];

  // Enhanced refresh data function
  const refreshData = async () => {
    try {
      setLastUpdate(new Date());
      info('Actualisation', 'Mise à jour des données en cours...');
      
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      success('Données actualisées', 'Toutes les données ont été mises à jour avec succès');
    } catch (err) {
      error('Erreur d\'actualisation', 'Impossible de mettre à jour les données');
    }
  };

  // Enhanced export functionality
  const exportDashboard = async () => {
    try {
      const dashboardData = {
        exportDate: new Date().toISOString(),
        activeTab,
        timeRange,
        settings,
        realTimeStats: {
          totalUpdates: realTimeData.updateCount,
          lastUpdate: realTimeData.lastUpdateTime,
          connectionHealth: realTimeData.connectionHealth
        },
        summary: {
          criticalAlerts: realTimeData.criticalUpdates.length,
          newUpdates: realTimeData.newUpdatesCount,
          systemHealth: realTimeData.isHealthy
        }
      };

      const jsonString = JSON.stringify(dashboardData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sentinel_dashboard_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      success('Export réussi', 'Dashboard exporté avec succès');
    } catch (err) {
      error('Erreur d\'export', 'Impossible d\'exporter le dashboard');
    }
  };

  // Search functionality
  const handleSearch = async (query: string, filters: Record<string, any>) => {
    // Mock search implementation
    const mockResults = [
      {
        id: '1',
        type: 'alert' as const,
        title: `Résultat pour "${query}"`,
        description: 'Description du résultat de recherche',
        metadata: { source: 'system', timestamp: new Date().toISOString() },
        relevance: 0.95
      }
    ];
    
    return mockResults;
  };

  // Quick actions
  const executeQuickAction = (action: string) => {
    switch (action) {
      case 'refresh':
        refreshData();
        break;
      case 'export':
        exportDashboard();
        break;
      case 'search':
        setShowSearch(true);
        break;
      case 'settings':
        setShowSettings(true);
        break;
      case 'fullscreen':
        setIsFullscreen(!isFullscreen);
        break;
      default:
        info('Action', `Action "${action}" exécutée`);
    }
  };

  // Auto-refresh mechanism with enhanced settings
  useEffect(() => {
    if (autoRefresh && settings.autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        realTimeData.refresh();
      }, settings.refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, settings.autoRefresh, settings.refreshInterval, realTimeData]);

  // Real-time updates effect
  useEffect(() => {
    if (realTimeData.hasRecentUpdates) {
      setLastUpdate(new Date());
    }
  }, [realTimeData.hasRecentUpdates]);

  // Strategic KPIs data
  const strategicKPIs = [
    {
      title: 'Score Sécurité Nationale',
      value: 73,
      change: -2,
      trend: 'down',
      critical: true,
      description: 'Indice composite de sécurité (0-100)'
    },
    {
      title: 'Volume Intelligence',
      value: '127.3K',
      change: 15,
      trend: 'up',
      critical: false,
      description: 'Sources analysées (24h)'
    },
    {
      title: 'Alertes Critiques',
      value: 23,
      change: 8,
      trend: 'up',
      critical: true,
      description: 'Nécessitent une action immédiate'
    },
    {
      title: 'Couverture Territoriale',
      value: '94%',
      change: 0,
      trend: 'stable',
      critical: false,
      description: 'Provinces sous surveillance'
    }
  ];

  // Network analysis data
  const networkEntities = [
    { id: 1, name: 'Gouvernement RDC', type: 'institution', connections: 156, influence: 95 },
    { id: 2, name: 'Opposition Politique', type: 'political', connections: 89, influence: 72 },
    { id: 3, name: 'Société Civile', type: 'civil', connections: 234, influence: 68 },
    { id: 4, name: 'Groupes Armés', type: 'security', connections: 67, influence: 45 },
    { id: 5, name: 'Médias Nationaux', type: 'media', connections: 178, influence: 83 }
  ];

  // Raw data samples
  const rawDataSamples = [
    {
      id: 1,
      timestamp: '2024-01-15 14:23:15',
      source: 'Twitter',
      content: 'Manifestation pacifique prévue demain à Kinshasa pour demander la transparence électorale...',
      sentiment: 'neutral',
      location: 'Kinshasa',
      engagement: 1247,
      verified: true
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:18:42',
      source: 'Facebook',
      content: 'Les forces de sécurité renforcent leur présence dans le Nord-Kivu suite aux récents incidents...',
      sentiment: 'negative',
      location: 'Nord-Kivu',
      engagement: 892,
      verified: false
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:15:33',
      source: 'WhatsApp',
      content: 'Nouveau projet d\'infrastructure routière annoncé pour connecter les provinces orientales...',
      sentiment: 'positive',
      location: 'Katanga',
      engagement: 567,
      verified: true
    }
  ];

  const renderStrategicTab = () => (
    <div className="space-y-6">
      {/* Strategic KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {strategicKPIs.map((kpi, index) => (
          <div key={index} className={`bg-white dark:bg-gray-800 rounded-xl p-6 border-l-4 ${
            kpi.critical ? 'border-red-500' : 'border-blue-500'
          } shadow-lg hover:shadow-xl transition-shadow`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-white text-sm">{kpi.title}</h3>
              <div className={`p-2 rounded-lg ${
                kpi.critical ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
              }`}>
                {kpi.critical ? (
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {kpi.value}
                </div>
                <div className={`flex items-center text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' :
                  kpi.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {kpi.trend === 'up' && <ArrowUp className="w-4 h-4 mr-1" />}
                  {kpi.trend === 'down' && <ArrowDown className="w-4 h-4 mr-1" />}
                  {kpi.trend === 'stable' && <Minus className="w-4 h-4 mr-1" />}
                  {kpi.change !== 0 ? `${kpi.change > 0 ? '+' : ''}${kpi.change}%` : 'Stable'}
                </div>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 border-t pt-2">
              {kpi.description}
            </p>
          </div>
        ))}
      </div>

      {/* Real-time Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Flux d'Activité Temps Réel
            </h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">En direct</span>
            </div>
          </div>
          
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i % 3 === 0 ? 'bg-red-100 dark:bg-red-900/30' :
                  i % 3 === 1 ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-green-100 dark:bg-green-900/30'
                }`}>
                  {i % 3 === 0 ? <Shield className="w-4 h-4 text-red-600 dark:text-red-400" /> :
                   i % 3 === 1 ? <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" /> :
                   <Globe className="w-4 h-4 text-green-600 dark:text-green-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {i % 3 === 0 ? 'Incident sécuritaire détecté dans le Nord-Kivu' :
                     i % 3 === 1 ? 'Pic d\'activité sur les réseaux sociaux (élections)' :
                     'Nouvelle source d\'intelligence activée (Katanga)'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Il y a {Math.floor(Math.random() * 30) + 1} minutes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Level Map */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Niveau de Menace par Province
            </h3>
            <button 
              onClick={() => setActiveTab('network')}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Voir carte complète
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { province: 'Nord-Kivu', level: 'critical', score: 89 },
              { province: 'Sud-Kivu', level: 'high', score: 76 },
              { province: 'Kinshasa', level: 'medium', score: 54 },
              { province: 'Katanga', level: 'medium', score: 48 },
              { province: 'Kasaï', level: 'low', score: 32 }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.level === 'critical' ? 'bg-red-500' :
                    item.level === 'high' ? 'bg-orange-500' :
                    item.level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item.province}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.level === 'critical' ? 'bg-red-500' :
                        item.level === 'high' ? 'bg-orange-500' :
                        item.level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {item.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Analyse de Sentiment
          </h3>
          <div className="space-y-4">
            {[
              { sentiment: 'Positif', value: 34, color: 'green' },
              { sentiment: 'Neutre', value: 48, color: 'gray' },
              { sentiment: 'Négatif', value: 18, color: 'red' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.sentiment}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-${item.color}-500`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 dark:text-white w-8">
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Keywords */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Mots-clés Tendances
          </h3>
          <div className="space-y-3">
            {keywords.slice(0, 5).map((keyword, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {keyword.term}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {keyword.mentions}
                  </span>
                  <div className={`px-2 py-1 rounded text-xs ${
                    keyword.status === 'critical' ? 'bg-red-100 text-red-800' :
                    keyword.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {keyword.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Distribution des Sources
          </h3>
          <div className="space-y-3">
            {[
              { source: 'Twitter', count: 45623, percentage: 42 },
              { source: 'Facebook', count: 31245, percentage: 29 },
              { source: 'WhatsApp', count: 18967, percentage: 18 },
              { source: 'Telegram', count: 7834, percentage: 7 },
              { source: 'Autres', count: 4231, percentage: 4 }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.source}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.count.toLocaleString()}
                  </span>
                  <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 dark:text-white w-8">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNetworkTab = () => (
    <div className="space-y-6">
      <AdvancedNetworkVisualization />
    </div>
  );

  const renderOpinionTab = () => (
    <div className="space-y-6">
      <OpinionAnalysisDashboard />
    </div>
  );

  const renderTimelineTab = () => (
    <div className="space-y-6">
      <TimelineAndTrends />
    </div>
  );

  const renderRawDataTab = () => (
    <div className="space-y-6">
      <RawDataExplorer />
    </div>
  );

  const renderAlertsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Statistiques d'Alertes
          </h3>
          <div className="space-y-4">
            {[
              { level: 'Critique', count: 23, color: 'red' },
              { level: 'Élevé', count: 67, color: 'orange' },
              { level: 'Moyen', count: 134, color: 'yellow' },
              { level: 'Faible', count: 289, color: 'green' }
            ].map((alert, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-${alert.color}-500`}></div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {alert.level}
                  </span>
                </div>
                <span className="font-bold text-gray-800 dark:text-white">
                  {alert.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Alertes Récentes
            </h3>
            <button 
              onClick={() => {
                // Navigate to alerts screen or show more alerts
                console.log('Navigate to alerts screen');
                // TODO: Navigate to alerts screen - functionality will be implemented
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Voir toutes
            </button>
          </div>
          
          <div className="space-y-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i % 4 === 0 ? 'bg-red-100 dark:bg-red-900/30' :
                  i % 4 === 1 ? 'bg-orange-100 dark:bg-orange-900/30' :
                  i % 4 === 2 ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                  'bg-green-100 dark:bg-green-900/30'
                }`}>
                  <AlertTriangle className={`w-4 h-4 ${
                    i % 4 === 0 ? 'text-red-600 dark:text-red-400' :
                    i % 4 === 1 ? 'text-orange-600 dark:text-orange-400' :
                    i % 4 === 2 ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-green-600 dark:text-green-400'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      {i % 4 === 0 ? 'Incident sécuritaire majeur' :
                       i % 4 === 1 ? 'Tensions politiques élevées' :
                       i % 4 === 2 ? 'Surveillance renforcée' :
                       'Activité normale détectée'}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Il y a {Math.floor(Math.random() * 120) + 5} min
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {i % 4 === 0 ? 'Affrontements armés signalés dans le Nord-Kivu avec plusieurs victimes civiles.' :
                     i % 4 === 1 ? 'Montée des tensions entre groupes politiques rivaux dans la capitale.' :
                     i % 4 === 2 ? 'Augmentation significative de l\'activité sur les réseaux sociaux.' :
                     'Rapport de routine confirmant la stabilité de la région.'}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Analyzing alert ${i + 1}`);
                        // TODO: Open analysis modal for alert
                      }}
                      className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      Analyser
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Archiving alert ${i + 1}`);
                        // TODO: Open archive confirmation modal
                      }}
                      className="text-xs border border-gray-300 dark:border-gray-600 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Archiver
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Escalating alert ${i + 1}`);
                        // TODO: Open escalation modal
                      }}
                      className="text-xs text-red-600 dark:text-red-400 hover:underline"
                    >
                      Escalader
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Centre de Commandement Intelligence
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Surveillance stratégique et analyse en temps réel
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Real-time status indicator */}
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className={`w-2 h-2 rounded-full ${
              realTimeData.isHealthy ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`}></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {realTimeData.isHealthy ? 'En ligne' : 'Hors ligne'}
            </span>
            {realTimeData.newUpdatesCount > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {realTimeData.newUpdatesCount}
              </span>
            )}
          </div>

          {/* Search button */}
          <button
            onClick={() => executeQuickAction('search')}
            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Recherche globale"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Export button */}
          <button
            onClick={() => executeQuickAction('export')}
            className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors"
            title="Exporter le dashboard"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Settings button */}
          <button
            onClick={() => executeQuickAction('settings')}
            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Paramètres"
          >
            <Settings className="w-4 h-4" />
          </button>
          
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="1h">Dernière heure</option>
            <option value="24h">Dernières 24h</option>
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
          </select>
          
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
              autoRefresh 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            title={autoRefresh ? 'Désactiver l\'actualisation automatique' : 'Activer l\'actualisation automatique'}
          >
            {autoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-sm hidden sm:inline">
              {autoRefresh ? 'Pause' : 'Auto'}
            </span>
          </button>

          <button
            onClick={() => executeQuickAction('refresh')}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            title="Actualiser maintenant"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => {
              setLastUpdate(new Date());
              // In a real app, this would trigger data refresh
              console.log('Refreshing data...');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Actualiser
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'strategic' && renderStrategicTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}
        {activeTab === 'opinion' && <OpinionAnalysisDashboard />}
        {activeTab === 'timeline' && <TimelineAndTrends />}
        {activeTab === 'network' && <AdvancedNetworkVisualization />}
        {activeTab === 'rawdata' && <RawDataExplorer />}
        {activeTab === 'alerts' && <AlertsScreen />}
      </div>

      {/* Modals */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      <SearchModal
        isOpen={showSearch}
        onClose={() => setShowSearch(false)}
        onSearch={handleSearch}
        placeholder="Rechercher dans toutes les données du dashboard..."
        filters={[
          {
            id: 'type',
            type: 'select',
            label: 'Type',
            key: 'type',
            options: [
              { value: 'alert', label: 'Alertes' },
              { value: 'event', label: 'Événements' },
              { value: 'content', label: 'Contenu' },
              { value: 'person', label: 'Personnes' }
            ]
          },
          {
            id: 'timeRange',
            type: 'select',
            label: 'Période',
            key: 'timeRange',
            options: [
              { value: '1h', label: 'Dernière heure' },
              { value: '24h', label: 'Dernières 24h' },
              { value: '7d', label: '7 derniers jours' },
              { value: '30d', label: '30 derniers jours' }
            ]
          }
        ]}
        recentSearches={['sécurité', 'élections', 'gouvernement']}
      />
    </div>
  );
}