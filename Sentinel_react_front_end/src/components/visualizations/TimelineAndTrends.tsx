import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  TrendingUp, TrendingDown, Calendar, Clock, Activity, BarChart3, 
  LineChart, PieChart, ArrowUp, ArrowDown, Minus, Zap, Target, 
  Filter, Download, RefreshCw, Play, Pause, SkipForward, SkipBack,
  Maximize2, Settings, Eye, AlertTriangle, Info, CheckCircle,
  Users, MessageSquare, Globe, MapPin, Hash, Star, Bookmark,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Search,
  Brain, Network, Shield, Bell, Database, ExternalLink, X, Plus
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { exportData } from '../../utils/exportUtils';
import { ConfirmationModal } from '../ui/Modal';

interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: 'alert' | 'trend' | 'incident' | 'achievement' | 'milestone';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  location?: string;
  metrics?: {
    mentions?: number;
    sentiment?: number;
    reach?: number;
  };
}

interface TrendData {
  metric: string;
  values: {
    timestamp: Date;
    value: number;
    change?: number;
  }[];
  color: string;
  unit: string;
}

interface TimelineAndTrendsProps {
  initialTimeRange?: string;
}

export function TimelineAndTrends({ initialTimeRange = '7d' }: TimelineAndTrendsProps) {
  const [timeRange, setTimeRange] = useState(initialTimeRange);
  const [viewMode, setViewMode] = useState<'timeline' | 'trends' | 'combined'>('combined');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['mentions', 'sentiment', 'alerts']);
  const [playbackSpeed, setPlaybackSpeed] = useState<'1x' | '2x' | '4x'>('1x');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filteredCategories, setFilteredCategories] = useState<string[]>(['all']);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);
  
  const playbackRef = useRef<NodeJS.Timeout | null>(null);
  const { success, error, info } = useNotifications();
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  // Enhanced playback controls
  const playbackSpeeds = {
    '1x': 1000,
    '2x': 500,
    '4x': 250
  };

  // Playback control functions
  const startPlayback = useCallback(() => {
    if (playbackRef.current) clearInterval(playbackRef.current);
    
    setIsPlaying(true);
    playbackRef.current = setInterval(() => {
      setCurrentTime(prev => {
        const next = new Date(prev.getTime() + (timeRange === '24h' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000));
        if (next > new Date()) {
          setIsPlaying(false);
          return new Date();
        }
        return next;
      });
    }, playbackSpeeds[playbackSpeed]);
  }, [playbackSpeed, timeRange]);

  const stopPlayback = useCallback(() => {
    if (playbackRef.current) {
      clearInterval(playbackRef.current);
      playbackRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const resetPlayback = useCallback(() => {
    stopPlayback();
    const timeRangeDays = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    setCurrentTime(new Date(Date.now() - timeRangeDays * 24 * 60 * 60 * 1000));
  }, [timeRange, stopPlayback]);

  const stepForward = useCallback(() => {
    setCurrentTime(prev => new Date(prev.getTime() + (timeRange === '24h' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000)));
  }, [timeRange]);

  const stepBackward = useCallback(() => {
    setCurrentTime(prev => new Date(prev.getTime() - (timeRange === '24h' ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000)));
  }, [timeRange]);

  // Export functionality
  const handleExport = async () => {
    try {
      const eventsData = timelineEvents.map(event => ({
        id: event.id,
        timestamp: event.timestamp.toISOString(),
        type: event.type,
        title: event.title,
        description: event.description,
        severity: event.severity,
        category: event.category,
        location: event.location || '',
        mentions: event.metrics?.mentions || 0,
        sentiment: event.metrics?.sentiment || 0,
        reach: event.metrics?.reach || 0
      }));

      await exportData(eventsData, exportFormat, {
        filename: `timeline_trends_${timeRange}_${new Date().toISOString().slice(0, 10)}`,
        includeHeaders: true,
        includeMetadata: true
      });

      success('Export réussi', `Timeline exportée au format ${exportFormat.toUpperCase()}`);
      setShowExportModal(false);
    } catch (err) {
      error('Erreur d\'export', 'Impossible d\'exporter la timeline');
    }
  };

  // Toggle metric visibility
  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  // Toggle category filter
  const toggleCategory = (category: string) => {
    if (category === 'all') {
      setFilteredCategories(['all']);
    } else {
      setFilteredCategories(prev => {
        const filtered = prev.filter(c => c !== 'all');
        if (filtered.includes(category)) {
          const newCategories = filtered.filter(c => c !== category);
          return newCategories.length === 0 ? ['all'] : newCategories;
        } else {
          return [...filtered, category];
        }
      });
    }
  };

  // Bookmark event
  const toggleBookmark = (eventId: string) => {
    setBookmarkedEvents(prev => 
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
    
    const event = timelineEvents.find(e => e.id === eventId);
    if (event) {
      info(
        bookmarkedEvents.includes(eventId) ? 'Marque-page supprimé' : 'Marque-page ajouté',
        `Événement "${event.title}" ${bookmarkedEvents.includes(eventId) ? 'retiré des' : 'ajouté aux'} marque-pages`
      );
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && !isPlaying) {
      startPlayback();
    } else if (!autoPlay && isPlaying) {
      stopPlayback();
    }
  }, [autoPlay, isPlaying, startPlayback, stopPlayback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playbackRef.current) {
        clearInterval(playbackRef.current);
      }
    };
  }, []);

  // Generate mock timeline events
  const generateTimelineEvents = (): TimelineEvent[] => {
    const events: TimelineEvent[] = [];
    const categories = ['Sécurité', 'Politique', 'Social', 'Économie', 'Santé'];
    const locations = ['Kinshasa', 'Nord-Kivu', 'Sud-Kivu', 'Katanga', 'Kasaï'];
    const types: TimelineEvent['type'][] = ['alert', 'trend', 'incident', 'achievement', 'milestone'];
    const severities: TimelineEvent['severity'][] = ['low', 'medium', 'high', 'critical'];

    const dayInMs = 24 * 60 * 60 * 1000;
    const timeRangeDays = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    
    for (let i = 0; i < Math.min(50, timeRangeDays * 3); i++) {
      const randomTimestamp = new Date(Date.now() - Math.random() * timeRangeDays * dayInMs);
      const type = types[Math.floor(Math.random() * types.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      
      events.push({
        id: `event_${i}`,
        timestamp: randomTimestamp,
        type,
        title: `${type === 'alert' ? 'Alerte' : 
                 type === 'trend' ? 'Tendance' : 
                 type === 'incident' ? 'Incident' : 
                 type === 'achievement' ? 'Réussite' : 'Étape'} ${category}`,
        description: `Description détaillée de l'événement ${category.toLowerCase()} survenu à ${randomTimestamp.toLocaleTimeString('fr-FR')}`,
        severity: severities[Math.floor(Math.random() * severities.length)],
        category,
        location: Math.random() > 0.3 ? locations[Math.floor(Math.random() * locations.length)] : undefined,
        metrics: {
          mentions: Math.floor(Math.random() * 5000) + 100,
          sentiment: (Math.random() - 0.5) * 2,
          reach: Math.floor(Math.random() * 50000) + 1000
        }
      });
    }

    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  // Generate mock trend data
  const generateTrendData = (): TrendData[] => {
    const timeRangeDays = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const dataPoints = timeRangeDays === 1 ? 24 : timeRangeDays;
    const interval = timeRangeDays === 1 ? 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // hourly or daily

    const trends: TrendData[] = [
      {
        metric: 'mentions',
        color: 'blue',
        unit: 'mentions',
        values: []
      },
      {
        metric: 'sentiment',
        color: 'green',
        unit: 'score',
        values: []
      },
      {
        metric: 'alerts',
        color: 'red',
        unit: 'alertes',
        values: []
      },
      {
        metric: 'reach',
        color: 'purple',
        unit: 'personnes',
        values: []
      }
    ];

    trends.forEach(trend => {
      let baseValue = trend.metric === 'mentions' ? 1000 : 
                      trend.metric === 'sentiment' ? 0 : 
                      trend.metric === 'alerts' ? 10 : 25000;

      for (let i = 0; i < dataPoints; i++) {
        const timestamp = new Date(Date.now() - (dataPoints - 1 - i) * interval);
        const randomFactor = 1 + (Math.random() - 0.5) * 0.4; // ±20% variation
        const value = Math.round(baseValue * randomFactor);
        const previousValue = trend.values[i - 1]?.value || value;
        const change = i > 0 ? ((value - previousValue) / previousValue) * 100 : 0;

        trend.values.push({
          timestamp,
          value,
          change: Math.round(change * 100) / 100
        });

        // Add some trend
        if (trend.metric === 'sentiment') {
          baseValue = Math.max(-1, Math.min(1, baseValue + (Math.random() - 0.5) * 0.1));
        } else {
          baseValue = Math.max(0, baseValue + (Math.random() - 0.5) * baseValue * 0.1);
        }
      }
    });

    return trends;
  };

  const [timelineEvents] = useState<TimelineEvent[]>(generateTimelineEvents());
  const [trendData] = useState<TrendData[]>(generateTrendData());

  const getSeverityColor = (severity: TimelineEvent['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 border-red-600';
      case 'high': return 'bg-orange-500 border-orange-600';
      case 'medium': return 'bg-yellow-500 border-yellow-600';
      default: return 'bg-green-500 border-green-600';
    }
  };

  const getTypeIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'alert': return AlertTriangle;
      case 'trend': return TrendingUp;
      case 'incident': return Shield;
      case 'achievement': return CheckCircle;
      default: return Info;
    }
  };

  const filteredEvents = timelineEvents.filter(event => 
    filteredCategories.includes('all') || filteredCategories.includes(event.category)
  );

  const selectedTrendData = trendData.filter(trend => 
    selectedMetrics.includes(trend.metric)
  );

  // Playback controls
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => new Date(prev.getTime() + 1000 * 60 * (playbackSpeed === '4x' ? 4 : playbackSpeed === '2x' ? 2 : 1)));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, playbackSpeed]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Clock className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Timeline & Analyse de Tendances
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Visualisation temporelle et tendances des événements
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="24h">Dernières 24h</option>
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">3 derniers mois</option>
          </select>
          
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Clock className="w-4 h-4 mr-1 inline" />
              Timeline
            </button>
            <button
              onClick={() => setViewMode('trends')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'trends'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-1 inline" />
              Tendances
            </button>
            <button
              onClick={() => setViewMode('combined')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'combined'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-1 inline" />
              Combiné
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="flex items-center space-x-4">
          {/* Playback Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentTime(new Date(currentTime.getTime() - 60 * 60 * 1000))}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded ${
                isPlaying 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setCurrentTime(new Date(currentTime.getTime() + 60 * 60 * 1000))}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(e.target.value as any)}
              className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            >
              <option value="1x">1x</option>
              <option value="2x">2x</option>
              <option value="4x">4x</option>
            </select>
          </div>

          {/* Current Time Display */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-1 inline" />
            {currentTime.toLocaleString('fr-FR')}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
            <Download className="w-4 h-4 mr-1 inline" />
            Exporter
          </button>
          <button className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-sm">
            <Settings className="w-4 h-4 mr-1 inline" />
            Options
          </button>
        </div>
      </div>

      {/* Trends View */}
      {(viewMode === 'trends' || viewMode === 'combined') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Analyse des Tendances
            </h4>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Métriques:</span>
              {['mentions', 'sentiment', 'alerts', 'reach'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => {
                    setSelectedMetrics(prev => 
                      prev.includes(metric) 
                        ? prev.filter(m => m !== metric)
                        : [...prev, metric]
                    );
                  }}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    selectedMetrics.includes(metric)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>

          {/* Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedTrendData.map((trend, index) => (
              <div key={trend.metric} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200 capitalize">
                    {trend.metric}
                  </h5>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full bg-${trend.color}-500`}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {trend.values[trend.values.length - 1]?.value} {trend.unit}
                    </span>
                  </div>
                </div>
                
                {/* Mock chart area */}
                <div className={`h-32 bg-gradient-to-r from-${trend.color}-100 to-${trend.color}-200 dark:from-${trend.color}-900/30 dark:to-${trend.color}-800/30 rounded flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-end justify-between p-2 space-x-1">
                    {trend.values.slice(-20).map((point, i) => (
                      <div
                        key={i}
                        className={`bg-${trend.color}-500 rounded-t opacity-70`}
                        style={{
                          height: `${Math.max(5, (Math.abs(point.value) / Math.max(...trend.values.map(v => Math.abs(v.value)))) * 100)}%`,
                          width: '3px'
                        }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 z-10 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                    Graphique {trend.metric}
                  </span>
                </div>

                {/* Trend Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {trend.values[trend.values.length - 1]?.change?.toFixed(1) || 0}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Variation</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {Math.max(...trend.values.map(v => v.value)).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Maximum</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {Math.round(trend.values.reduce((sum, v) => sum + v.value, 0) / trend.values.length).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Moyenne</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline View */}
      {(viewMode === 'timeline' || viewMode === 'combined') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Timeline des Événements
            </h4>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filteredCategories[0] || 'all'}
                onChange={(e) => setFilteredCategories([e.target.value])}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="all">Toutes catégories</option>
                <option value="Sécurité">Sécurité</option>
                <option value="Politique">Politique</option>
                <option value="Social">Social</option>
                <option value="Économie">Économie</option>
                <option value="Santé">Santé</option>
              </select>
            </div>
          </div>

          {/* Timeline Events */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600"></div>
            
            <div className="space-y-4">
              {filteredEvents.slice(0, 20).map((event, index) => {
                const Icon = getTypeIcon(event.type);
                const isExpanded = expandedEvent === event.id;
                
                return (
                  <div key={event.id} className="relative flex items-start space-x-4">
                    {/* Timeline Marker */}
                    <div className={`relative z-10 w-12 h-12 rounded-full border-2 ${getSeverityColor(event.severity)} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    
                    {/* Event Content */}
                    <div className="flex-1 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <div 
                        className="cursor-pointer"
                        onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h5 className="font-semibold text-gray-900 dark:text-white">
                              {event.title}
                            </h5>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              event.severity === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              event.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                              event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              {event.severity}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {event.timestamp.toLocaleString('fr-FR')}
                            </span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {event.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Hash className="w-3 h-3" />
                            <span>{event.category}</span>
                          </span>
                          {event.location && (
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </span>
                          )}
                          {event.metrics && (
                            <span className="flex items-center space-x-1">
                              <MessageSquare className="w-3 h-3" />
                              <span>{event.metrics.mentions} mentions</span>
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Expanded Content */}
                      {isExpanded && event.metrics && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {event.metrics.mentions?.toLocaleString()}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Mentions</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-lg font-bold ${
                                (event.metrics.sentiment || 0) > 0 ? 'text-green-600' : 
                                (event.metrics.sentiment || 0) < 0 ? 'text-red-600' : 'text-gray-600'
                              }`}>
                                {((event.metrics.sentiment || 0) * 100).toFixed(0)}%
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Sentiment</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {((event.metrics.reach || 0) / 1000).toFixed(0)}K
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">Portée</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}