import React, { useState, useEffect, useCallback } from 'react';
import { 
  Map, Layers, Filter, Search, BarChart3, PieChart, Settings,
  Maximize2, Minimize2, Eye, EyeOff, Target, Zap, Activity,
  Shield, Users, Globe, AlertTriangle, TrendingUp, Info,
  Clock, Play, Pause, RefreshCw, MapPin, Crosshair,
  Radar, Network, Brain, Flame
} from 'lucide-react';
import { EnhancedMapView } from '../mapbox/EnhancedMapView';
import { SimpleMapDebug } from '../mapbox/SimpleMapDebug';
import { Province, MapLayer } from '../../types';

export function GeographicScreen() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [fullScreenMap, setFullScreenMap] = useState(false);
  const [activeWidget, setActiveWidget] = useState<'metrics' | 'layers' | 'filters' | 'analysis'>('layers');
  const [debugMode, setDebugMode] = useState(false);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<'hotspots' | 'patterns' | 'predictions' | 'networks'>('hotspots');

  // Get Mapbox token from environment
  const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

  // Key metrics data
  const keyMetrics = [
    { 
      icon: Shield, 
      label: 'Security Incidents', 
      value: '237', 
      change: '+12%', 
      trend: 'up',
      color: 'red',
      description: 'Last 24h'
    },
    { 
      icon: Users, 
      label: 'Social Mentions', 
      value: '12.4K', 
      change: '+8%', 
      trend: 'up',
      color: 'blue',
      description: 'Active discussions'
    },
    { 
      icon: Activity, 
      label: 'Alert Level', 
      value: 'Medium', 
      change: 'Stable', 
      trend: 'stable',
      color: 'yellow',
      description: 'National average'
    },
    { 
      icon: Globe, 
      label: 'Provinces Monitored', 
      value: '26', 
      change: '100%', 
      trend: 'stable',
      color: 'green',
      description: 'Full coverage'
    }
  ];

  const [mapLayers, setMapLayers] = useState([
    {
      id: 'security',
      name: 'Security Incidents',
      icon: Shield,
      color: '#dc2626',
      active: true,
      count: 237,
      sublayers: [
        { id: 'armed_clash', name: 'Armed Clashes', active: true, count: 45 },
        { id: 'civil_unrest', name: 'Civil Unrest', active: true, count: 78 },
        { id: 'terrorism', name: 'Terrorism', active: false, count: 12 },
        { id: 'kidnapping', name: 'Kidnapping', active: true, count: 23 }
      ]
    },
    {
      id: 'social',
      name: 'Social Intelligence',
      icon: Users,
      color: '#2563eb',
      active: true,
      count: 12400,
      sublayers: [
        { id: 'sentiment', name: 'Sentiment Analysis', active: true, count: 8900 },
        { id: 'viral_content', name: 'Viral Content', active: false, count: 156 },
        { id: 'influence_networks', name: 'Influence Networks', active: true, count: 89 }
      ]
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      icon: Zap,
      color: '#7c3aed',
      active: false,
      count: 1240,
      sublayers: [
        { id: 'power', name: 'Power Grid', active: false, count: 45 },
        { id: 'transport', name: 'Transport', active: false, count: 234 },
        { id: 'communications', name: 'Communications', active: false, count: 123 }
      ]
    },
    {
      id: 'population',
      name: 'Demographics',
      icon: Globe,
      color: '#059669',
      active: false,
      count: 890,
      sublayers: [
        { id: 'density', name: 'Population Density', active: false, count: 26 },
        { id: 'displacement', name: 'Displacement', active: false, count: 78 },
        { id: 'movements', name: 'Population Movements', active: false, count: 234 }
      ]
    }
  ]);

  const toggleLayer = (layerId: string) => {
    setMapLayers(layers => 
      layers.map(layer => 
        layer.id === layerId 
          ? { ...layer, active: !layer.active }
          : layer
      )
    );
  };

  const toggleSublayer = (layerId: string, sublayerId: string) => {
    setMapLayers(layers => 
      layers.map(layer => 
        layer.id === layerId 
          ? {
              ...layer,
              sublayers: layer.sublayers.map(sublayer =>
                sublayer.id === sublayerId
                  ? { ...sublayer, active: !sublayer.active }
                  : sublayer
              )
            }
          : layer
      )
    );
  };

  const quickFilters = [
    { id: 'last_24h', label: 'Last 24h', active: true },
    { id: 'last_week', label: 'Last Week', active: false },
    { id: 'high_severity', label: 'High Severity Only', active: false },
    { id: 'verified_only', label: 'Verified Only', active: true }
  ];

  // Real-time updates effect
  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(() => {
      // Simulate real-time updates by randomly updating metrics
      setMapLayers(prev => prev.map(layer => ({
        ...layer,
        count: layer.count + Math.floor(Math.random() * 3 - 1) // Random +/- 1
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  // Enhanced search functionality
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Mock search results - in real app, this would be an API call
    const mockResults = [
      {
        id: '1',
        type: 'location',
        title: 'Kinshasa',
        subtitle: 'Province - 11.5M inhabitants',
        coordinates: [15.2663, -4.4419],
        icon: MapPin
      },
      {
        id: '2',
        type: 'incident',
        title: 'Armed Clash in Goma',
        subtitle: 'Security incident - 2 hours ago',
        coordinates: [29.2348, -1.6792],
        icon: AlertTriangle
      },
      {
        id: '3',
        type: 'social',
        title: 'Viral Content in Lubumbashi',
        subtitle: 'Social media activity spike',
        coordinates: [27.4794, -11.6609],
        icon: TrendingUp
      }
    ].filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.subtitle.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(mockResults);
  }, []);

  // Analysis data for different modes
  const analysisData = {
    hotspots: [
      { name: 'Nord-Kivu', value: 95, color: '#dc2626', incidents: 45 },
      { name: 'Sud-Kivu', value: 78, color: '#ea580c', incidents: 32 },
      { name: 'Ituri', value: 65, color: '#ca8a04', incidents: 28 },
      { name: 'Kasaï', value: 42, color: '#16a34a', incidents: 18 }
    ],
    patterns: [
      { pattern: 'Evening surge', frequency: '85%', time: '18:00-22:00' },
      { pattern: 'Border clustering', frequency: '73%', location: 'Eastern provinces' },
      { pattern: 'Social correlation', frequency: '68%', type: 'Security + Social media' }
    ],
    predictions: [
      { metric: 'Next hotspot', prediction: 'Maniema Province', confidence: '76%' },
      { metric: 'Peak activity', prediction: 'Next 6 hours', confidence: '84%' },
      { metric: 'Spread direction', prediction: 'Northeast', confidence: '71%' }
    ],
    networks: [
      { cluster: 'Network A', nodes: 23, influence: 87, type: 'Political' },
      { cluster: 'Network B', nodes: 18, influence: 73, type: 'Social' },
      { cluster: 'Network C', nodes: 31, influence: 65, type: 'Economic' }
    ]
  };

  return (
    <div className="relative h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Intelligence Géographique Avancée
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analyse en temps réel • République Démocratique du Congo
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Enhanced Search */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher lieux, incidents..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.map((result) => {
                    const Icon = result.icon;
                    return (
                      <button
                        key={result.id}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => {
                          // In a real app, this would pan the map to the location
                          setSearchQuery(result.title);
                          setSearchResults([]);
                        }}
                      >
                        <Icon className="w-4 h-4 text-gray-400" />
                        <div className="text-left">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {result.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {result.subtitle}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Real-time Controls */}
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setRealTimeUpdates(!realTimeUpdates)}
                className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                  realTimeUpdates 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {realTimeUpdates ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                <span>{realTimeUpdates ? 'Live' : 'Paused'}</span>
              </button>
              
              <button className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>

            {/* Quick Status Indicators */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${realTimeUpdates ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {realTimeUpdates ? 'Live' : 'Static'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Info className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {mapLayers.find(l => l.active)?.count || 0} Active
                </span>
              </div>
            </div>

            {/* View Controls */}
            <button
              onClick={() => setFullScreenMap(!fullScreenMap)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={fullScreenMap ? 'Exit Fullscreen' : 'Fullscreen Map'}
            >
              {fullScreenMap ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setLeftPanelOpen(!leftPanelOpen)}
              className={`p-2 rounded-lg transition-colors ${
                leftPanelOpen 
                  ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Toggle Controls Panel"
            >
              <Layers className="w-4 h-4" />
            </button>

            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={`p-2 rounded-lg transition-colors ${
                rightPanelOpen 
                  ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Toggle Analysis Panel"
            >
              <BarChart3 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setDebugMode(!debugMode)}
              className={`p-2 rounded-lg transition-colors ${
                debugMode 
                  ? 'text-orange-600 bg-orange-100 dark:bg-orange-900/30' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Toggle Debug Mode"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className={`absolute inset-0 pt-16 transition-all duration-300 ${
        !fullScreenMap 
          ? `${leftPanelOpen ? 'left-80' : 'left-0'} ${rightPanelOpen ? 'right-80' : 'right-0'}`
          : ''
      }`}>
        {debugMode ? (
          <SimpleMapDebug mapboxToken={mapboxToken} />
        ) : (
          <EnhancedMapView 
            mapboxToken={mapboxToken} 
            activeLayers={mapLayers}
            onResize={leftPanelOpen || rightPanelOpen || fullScreenMap}
            realTimeUpdates={realTimeUpdates}
            showHeatmap={showHeatmap}
            selectedTimeRange={selectedTimeRange}
          />
        )}
      </div>

      {/* Left Control Panel */}
      <div className={`absolute left-0 top-16 bottom-0 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 z-20 ${
        leftPanelOpen && !fullScreenMap ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Panel Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={() => setActiveWidget('metrics')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  activeWidget === 'metrics' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Métriques
              </button>
              <button
                onClick={() => setActiveWidget('layers')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  activeWidget === 'layers' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Couches
              </button>
              <button
                onClick={() => setActiveWidget('filters')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  activeWidget === 'filters' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Filtres
              </button>
              <button
                onClick={() => setActiveWidget('analysis')}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  activeWidget === 'analysis' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Analyse
              </button>
            </div>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeWidget === 'metrics' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Métriques Clés
                </h3>
                {keyMetrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-4 h-4 text-${metric.color}-500`} />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {metric.label}
                          </span>
                        </div>
                        <TrendingUp className={`w-3 h-3 ${
                          metric.trend === 'up' ? 'text-green-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {metric.value}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          metric.trend === 'up' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {metric.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {activeWidget === 'layers' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Couches de Données
                </h3>
                {mapLayers.map((layer) => {
                  const Icon = layer.icon;
                  return (
                    <div key={layer.id} className="border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4" style={{ color: layer.color }} />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {layer.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              ({layer.count.toLocaleString()})
                            </span>
                          </div>
                          <button
                            onClick={() => toggleLayer(layer.id)}
                            className={`p-1 rounded ${
                              layer.active 
                                ? 'text-blue-600 dark:text-blue-400' 
                                : 'text-gray-400 dark:text-gray-500'
                            }`}
                          >
                            {layer.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                        </div>

                        {layer.active && (
                          <div className="space-y-1 mt-3 pl-6">
                            {layer.sublayers.map((sublayer) => (
                              <div key={sublayer.id} className="flex items-center justify-between py-1">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={sublayer.active}
                                    onChange={() => toggleSublayer(layer.id, sublayer.id)}
                                    className="w-3 h-3 rounded"
                                  />
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {sublayer.name}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                  {sublayer.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeWidget === 'filters' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Filtres Rapides
                </h3>
                <div className="space-y-2">
                  {quickFilters.map((filter) => (
                    <label key={filter.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                      <input
                        type="checkbox"
                        checked={filter.active}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {filter.label}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    Filtres Avancés
                  </h4>
                  
                  {/* Severity Filter */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                      Niveau de Sévérité
                    </label>
                    <div className="space-y-1">
                      {['Critique', 'Élevé', 'Moyen', 'Faible'].map((level, index) => (
                        <label key={level} className="flex items-center space-x-2">
                          <input type="checkbox" className="w-3 h-3 rounded" defaultChecked={index < 2} />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Time Range */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                      Période Temporelle
                    </label>
                    <div className="space-y-2">
                      <select 
                        value={selectedTimeRange}
                        onChange={(e) => setSelectedTimeRange(e.target.value)}
                        className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="1h">Dernière heure</option>
                        <option value="6h">Dernières 6h</option>
                        <option value="24h">Dernières 24h</option>
                        <option value="7d">Dernière semaine</option>
                        <option value="30d">Dernier mois</option>
                        <option value="custom">Personnalisé</option>
                      </select>
                      
                      {selectedTimeRange === 'custom' && (
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="datetime-local"
                            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs"
                          />
                          <input
                            type="datetime-local"
                            className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Heatmap Control */}
                  <div className="mb-4">
                    <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                      <input
                        type="checkbox"
                        checked={showHeatmap}
                        onChange={(e) => setShowHeatmap(e.target.checked)}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Affichage Heatmap
                      </span>
                    </label>
                  </div>

                  {/* Geographic Filter */}
                  <div className="mb-4">
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                      Provinces
                    </label>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {['Kinshasa', 'Nord-Kivu', 'Sud-Kivu', 'Katanga', 'Kasaï'].map((province) => (
                        <label key={province} className="flex items-center space-x-2">
                          <input type="checkbox" className="w-3 h-3 rounded" defaultChecked />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{province}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeWidget === 'analysis' && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Analyse Intelligente
                </h3>
                
                {/* Analysis Mode Selector */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => setSelectedAnalysis('hotspots')}
                    className={`flex items-center space-x-2 p-2 rounded text-xs transition-colors ${
                      selectedAnalysis === 'hotspots' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    <span>Hotspots</span>
                  </button>
                  <button
                    onClick={() => setSelectedAnalysis('patterns')}
                    className={`flex items-center space-x-2 p-2 rounded text-xs transition-colors ${
                      selectedAnalysis === 'patterns' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Radar className="w-3 h-3" />
                    <span>Patterns</span>
                  </button>
                  <button
                    onClick={() => setSelectedAnalysis('predictions')}
                    className={`flex items-center space-x-2 p-2 rounded text-xs transition-colors ${
                      selectedAnalysis === 'predictions' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Brain className="w-3 h-3" />
                    <span>IA</span>
                  </button>
                  <button
                    onClick={() => setSelectedAnalysis('networks')}
                    className={`flex items-center space-x-2 p-2 rounded text-xs transition-colors ${
                      selectedAnalysis === 'networks' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Network className="w-3 h-3" />
                    <span>Réseaux</span>
                  </button>
                </div>

                {/* Analysis Content */}
                <div className="space-y-3">
                  {selectedAnalysis === 'hotspots' && (
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Zones à Risque Élevé
                      </h4>
                      {analysisData.hotspots.map((hotspot) => (
                        <div key={hotspot.name} className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {hotspot.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {hotspot.incidents} incidents
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${hotspot.value}%`, 
                                backgroundColor: hotspot.color 
                              }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Niveau de risque: {hotspot.value}%
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedAnalysis === 'patterns' && (
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Modèles Détectés
                      </h4>
                      {analysisData.patterns.map((pattern, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-600 rounded p-3 mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {pattern.pattern}
                            </span>
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                              {pattern.frequency}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {pattern.time || pattern.location || pattern.type}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedAnalysis === 'predictions' && (
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Prédictions IA
                      </h4>
                      {analysisData.predictions.map((prediction, index) => (
                        <div key={index} className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded p-3 mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                              {prediction.metric}
                            </span>
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                              {prediction.confidence}
                            </span>
                          </div>
                          <div className="text-xs text-purple-700 dark:text-purple-300">
                            {prediction.prediction}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedAnalysis === 'networks' && (
                    <div>
                      <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Réseaux d'Influence
                      </h4>
                      {analysisData.networks.map((network, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-600 rounded p-3 mb-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {network.cluster}
                            </span>
                            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              {network.type}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Nœuds:</span>
                              <span className="font-medium text-gray-900 dark:text-white ml-1">
                                {network.nodes}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Influence:</span>
                              <span className="font-medium text-gray-900 dark:text-white ml-1">
                                {network.influence}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Analysis Panel */}
      <div className={`absolute right-0 top-16 bottom-0 w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 z-20 ${
        rightPanelOpen && !fullScreenMap ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Analyse en Temps Réel
            </h3>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${realTimeUpdates ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {realTimeUpdates ? 'Live' : 'Statique'}
              </span>
            </div>
          </div>

          {/* Advanced Analytics Summary */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-3 text-white">
              <div className="text-xl font-bold">237</div>
              <div className="text-xs opacity-90">Incidents Actifs</div>
              <div className="text-xs opacity-75">+12 depuis 1h</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 text-white">
              <div className="text-xl font-bold">89%</div>
              <div className="text-xs opacity-90">Précision IA</div>
              <div className="text-xs opacity-75">Modèle v2.1</div>
            </div>
          </div>
          
          {/* Enhanced Activity Feed */}
          <div className="flex-1 overflow-y-auto space-y-3">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-700 dark:text-red-300">
                  Incident Critique
                </span>
                <span className="text-xs text-red-500">Il y a 2 min</span>
              </div>
              <p className="text-xs text-red-600 dark:text-red-400 mb-2">
                Affrontements armés signalés près de Goma, Nord-Kivu. 
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-red-500">12 sources confirmées</span>
                <button className="text-red-600 hover:text-red-800 underline">
                  Voir détails
                </button>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Tendance Virale
                </span>
                <span className="text-xs text-blue-500">Il y a 5 min</span>
              </div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-2">
                #ElectionsRDC: +340% d'engagement en 2h
              </p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex space-x-2">
                  <span className="bg-green-100 text-green-700 px-1 rounded">67% Positif</span>
                  <span className="bg-gray-100 text-gray-700 px-1 rounded">23% Neutre</span>
                </div>
                <span className="text-blue-600">2.1M portée</span>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Brain className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                  Prédiction IA
                </span>
                <span className="text-xs text-purple-500">Il y a 8 min</span>
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400 mb-2">
                Probabilité élevée d'incident dans Maniema (76%)
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-500">Modèle: Sécurité v2.1</span>
                <span className="bg-purple-100 text-purple-700 px-1 rounded">6h fenêtre</span>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Network className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  Réseau Détecté
                </span>
                <span className="text-xs text-yellow-500">Il y a 12 min</span>
              </div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-2">
                Nouveau cluster d'influence (23 nœuds) - Kasaï Oriental
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-yellow-500">Type: Politique</span>
                <span className="bg-yellow-100 text-yellow-700 px-1 rounded">Influence: 73%</span>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Radar className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Pattern Identifié
                </span>
                <span className="text-xs text-green-500">Il y a 15 min</span>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400 mb-2">
                Corrélation activité social + incidents sécuritaires
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-green-500">Confiance: 85%</span>
                <span className="bg-green-100 text-green-700 px-1 rounded">Récurrent</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg text-xs hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                <BarChart3 className="w-3 h-3" />
                <span>Rapport</span>
              </button>
              <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg text-xs hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                <AlertTriangle className="w-3 h-3" />
                <span>Alerte</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Mini Widgets */}
      {!fullScreenMap && (
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
          <div className="flex justify-between items-end">
            {/* Quick Stats */}
            <div className="flex space-x-2 pointer-events-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Incidents Actifs</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">23</span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Sources Actives</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">156</span>
                </div>
              </div>
            </div>

            {/* Map Legend */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700 pointer-events-auto">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Légende</div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Sécurité</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Social</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Influence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}