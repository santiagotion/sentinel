import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, TrendingUp, TrendingDown, BarChart3, PieChart, MapPin, 
  Calendar, Filter, Download, RefreshCw, ThumbsUp, ThumbsDown, 
  Minus, Users, MessageSquare, Eye, Clock, Tag, Hash, Globe,
  Star, ArrowUp, ArrowDown, Activity, Zap, Brain, Target,
  ChevronDown, ChevronRight, Maximize2, Share2, Settings,
  AlertTriangle, Info, CheckCircle, ExternalLink, Bookmark, Plus, X
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { exportOpinionAnalysis } from '../../utils/exportUtils';
import { ConfirmationModal } from '../ui/Modal';

interface OpinionData {
  keyword: string;
  mentions: number;
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
  trend: 'up' | 'down' | 'stable';
  change: number;
  sources: {
    platform: string;
    count: number;
    sentiment: number;
  }[];
  geographicData: {
    region: string;
    sentiment: number;
    volume: number;
  }[];
  timelineData: {
    timestamp: Date;
    sentiment: number;
    volume: number;
  }[];
  influentialVoices: {
    username: string;
    platform: string;
    influence: number;
    sentiment: number;
    verified: boolean;
  }[];
}

interface OpinionAnalysisDashboardProps {
  initialKeyword?: string;
}

export function OpinionAnalysisDashboard({ initialKeyword = "" }: OpinionAnalysisDashboardProps) {
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'comparison'>('overview');
  const [selectedSources, setSelectedSources] = useState<string[]>(['all']);
  const [opinionData, setOpinionData] = useState<OpinionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [savedKeywords, setSavedKeywords] = useState<string[]>([
    'élections', 'sécurité', 'gouvernement', 'économie', 'santé'
  ]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [newKeyword, setNewKeyword] = useState('');
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  const { success, error, info } = useNotifications();

  // Mock data generator
  const generateOpinionData = (keyword: string): OpinionData => {
    const platforms = ['Twitter', 'Facebook', 'WhatsApp', 'Telegram', 'Instagram', 'YouTube'];
    const regions = ['Kinshasa', 'Nord-Kivu', 'Sud-Kivu', 'Katanga', 'Kasaï', 'Bandundu'];
    
    const sentimentScore = (Math.random() - 0.5) * 2; // -1 to 1
    const positive = Math.max(0, sentimentScore * 50 + 30 + Math.random() * 20);
    const negative = Math.max(0, -sentimentScore * 50 + 30 + Math.random() * 20);
    const neutral = 100 - positive - negative;

    return {
      keyword,
      mentions: Math.floor(Math.random() * 50000) + 5000,
      sentiment: {
        positive: Math.round(positive),
        negative: Math.round(negative),
        neutral: Math.round(neutral)
      },
      trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable',
      change: Math.floor(Math.random() * 40) - 20,
      sources: platforms.map(platform => ({
        platform,
        count: Math.floor(Math.random() * 10000) + 500,
        sentiment: (Math.random() - 0.5) * 2
      })),
      geographicData: regions.map(region => ({
        region,
        sentiment: (Math.random() - 0.5) * 2,
        volume: Math.floor(Math.random() * 5000) + 500
      })),
      timelineData: Array.from({ length: 30 }, (_, i) => ({
        timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
        sentiment: (Math.random() - 0.5) * 2,
        volume: Math.floor(Math.random() * 2000) + 100
      })),
      influentialVoices: Array.from({ length: 8 }, (_, i) => ({
        username: `@influencer_${i + 1}`,
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        influence: Math.floor(Math.random() * 100) + 1,
        sentiment: (Math.random() - 0.5) * 2,
        verified: Math.random() > 0.6
      }))
    };
  };

  // Real-time refresh effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh && activeKeyword) {
      interval = setInterval(() => {
        handleSearch(activeKeyword, false);
      }, 30000); // Refresh every 30 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, activeKeyword]);

  // Auto-search when initialKeyword changes
  useEffect(() => {
    if (initialKeyword && initialKeyword !== activeKeyword) {
      handleSearch(initialKeyword);
    }
  }, [initialKeyword]);

  // Enhanced search function
  const handleSearch = async (keyword: string, showLoading = true) => {
    if (!keyword.trim()) {
      error('Erreur de recherche', 'Veuillez entrer un mot-clé valide');
      return;
    }

    if (showLoading) setLoading(true);
    setActiveKeyword(keyword);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const data = generateOpinionData(keyword);
      setOpinionData(data);
      
      success('Analyse terminée', `Analyse d'opinion pour "${keyword}" terminée avec succès`);
      
      // Add to saved keywords if not already present
      if (!savedKeywords.includes(keyword)) {
        setSavedKeywords(prev => [keyword, ...prev].slice(0, 10)); // Keep max 10
      }
    } catch (err) {
      error('Erreur d\'analyse', 'Impossible de récupérer les données d\'opinion');
    } finally {
      setLoading(false);
    }
  };

  // Add new keyword
  const handleAddKeyword = () => {
    if (newKeyword.trim() && !savedKeywords.includes(newKeyword.trim())) {
      setSavedKeywords(prev => [newKeyword.trim(), ...prev]);
      setNewKeyword('');
      setShowAddKeyword(false);
      success('Mot-clé ajouté', `"${newKeyword.trim()}" ajouté aux mots-clés sauvegardés`);
    } else {
      error('Erreur', 'Ce mot-clé existe déjà ou est vide');
    }
  };

  // Remove keyword
  const handleRemoveKeyword = (keyword: string) => {
    setSavedKeywords(prev => prev.filter(k => k !== keyword));
    if (activeKeyword === keyword) {
      setActiveKeyword(null);
      setOpinionData(null);
    }
    info('Mot-clé supprimé', `"${keyword}" supprimé des mots-clés sauvegardés`);
  };

  // Export functionality
  const handleExport = async () => {
    if (!opinionData) {
      error('Erreur d\'exportation', 'Aucune donnée à exporter');
      return;
    }

    try {
      await exportOpinionAnalysis({
        summary: {
          keyword: opinionData.keyword,
          totalMentions: opinionData.mentions,
          sentiment: opinionData.sentiment,
          trend: opinionData.trend,
          change: opinionData.change
        },
        keywords: [{
          keyword: opinionData.keyword,
          mentions: opinionData.mentions,
          sentiment: opinionData.sentiment,
          trend: opinionData.trend
        }],
        geographic: opinionData.geographicData.map(geo => ({
          location: geo.region,
          mentions: geo.volume,
          averageSentiment: geo.sentiment
        })),
        platforms: opinionData.sources.map(src => ({
          name: src.platform,
          mentions: src.count,
          engagement: src.count * Math.random()
        }))
      }, exportFormat);
      
      success('Exportation réussie', `Données exportées au format ${exportFormat.toUpperCase()}`);
      setShowExportModal(false);
    } catch (err) {
      error('Erreur d\'exportation', 'Impossible d\'exporter les données');
    }
  };

  // Toggle source filter
  const toggleSource = (source: string) => {
    if (source === 'all') {
      setSelectedSources(['all']);
    } else {
      setSelectedSources(prev => {
        const filtered = prev.filter(s => s !== 'all');
        if (filtered.includes(source)) {
          const newSources = filtered.filter(s => s !== source);
          return newSources.length === 0 ? ['all'] : newSources;
        } else {
          return [...filtered, source];
        }
      });
    }
  };

  // Filtered opinion data based on current filters
  const filteredOpinionData = useMemo(() => {
    if (!opinionData) return null;

    let filtered = { ...opinionData };

    // Apply sentiment filter
    if (sentimentFilter !== 'all') {
      const sentimentThreshold = 0.3;
      filtered.sources = filtered.sources.filter(source => {
        if (sentimentFilter === 'positive') return source.sentiment > sentimentThreshold;
        if (sentimentFilter === 'negative') return source.sentiment < -sentimentThreshold;
        if (sentimentFilter === 'neutral') return Math.abs(source.sentiment) <= sentimentThreshold;
        return true;
      });
    }

    // Apply source filter
    if (!selectedSources.includes('all')) {
      filtered.sources = filtered.sources.filter(source => 
        selectedSources.includes(source.platform)
      );
    }

    return filtered;
  }, [opinionData, sentimentFilter, selectedSources]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (!filteredOpinionData) return null;

    const totalMentions = filteredOpinionData.sources.reduce((sum, src) => sum + src.count, 0);
    const avgSentiment = filteredOpinionData.sources.reduce((sum, src) => sum + src.sentiment, 0) / filteredOpinionData.sources.length;
    const mostActiveSource = filteredOpinionData.sources.reduce((max, src) => 
      src.count > max.count ? src : max, filteredOpinionData.sources[0]
    );

    return {
      totalMentions,
      avgSentiment,
      mostActiveSource,
      sourceCount: filteredOpinionData.sources.length
    };
  }, [filteredOpinionData]);

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.2) return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    if (sentiment < -0.2) return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
    return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
  };

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 0.2) return ThumbsUp;
    if (sentiment < -0.2) return ThumbsDown;
    return Minus;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      default: return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400';
      case 'down': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Removed duplicate function

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Analyse d'Opinion par Mot-clé
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Analysez l'opinion publique sur des sujets spécifiques
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Auto Refresh Toggle */}
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`p-2 rounded-lg transition-colors ${
              autoRefresh 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            title={autoRefresh ? 'Désactiver l\'actualisation automatique' : 'Activer l\'actualisation automatique'}
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
          </button>

          {/* Export Button */}
          {opinionData && (
            <button
              onClick={() => setShowExportModal(true)}
              className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors"
              title="Exporter les données"
            >
              <Download className="w-4 h-4" />
            </button>
          )}

          {/* Add Keyword Button */}
          <button
            onClick={() => setShowAddKeyword(true)}
            className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/30 transition-colors"
            title="Ajouter un mot-clé"
          >
            <Plus className="w-4 h-4" />
          </button>
          
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
              onClick={() => setViewMode('overview')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'overview'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'detailed'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Détaillé
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'comparison'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Comparaison
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un mot-clé ou sujet (ex: élections, sécurité, santé...)"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <button
            onClick={() => handleSearch(searchKeyword)}
            disabled={loading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              'Analyser'
            )}
          </button>
        </div>

        {/* Saved Keywords */}
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="text-sm text-gray-500 dark:text-gray-400">Mots-clés sauvegardés:</span>
          {savedKeywords.map((keyword) => (
            <div key={keyword} className="flex items-center group">
              <button
                onClick={() => {
                  setSearchKeyword(keyword);
                  handleSearch(keyword);
                }}
                className={`px-3 py-1 rounded-l-full text-sm transition-colors ${
                  activeKeyword === keyword
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                #{keyword}
              </button>
              <button
                onClick={() => handleRemoveKeyword(keyword)}
                className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200 dark:hover:bg-red-800/30"
                title={`Supprimer "${keyword}"`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Results Section */}
      {opinionData && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div className={`flex items-center space-x-1 ${getTrendColor(opinionData.trend)}`}>
                  {React.createElement(getTrendIcon(opinionData.trend), { className: "w-4 h-4" })}
                  <span className="text-sm font-medium">
                    {opinionData.change > 0 ? '+' : ''}{opinionData.change}%
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {opinionData.mentions.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Mentions totales
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <ThumbsUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {opinionData.sentiment.positive}%
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Positif
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Sentiment général
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <ThumbsDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {opinionData.sentiment.negative}%
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Négatif
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Sentiment critique
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Minus className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {opinionData.sentiment.neutral}%
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Neutre
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Sans opinion claire
              </div>
            </div>
          </div>

          {viewMode === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sources Distribution */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Distribution par Plateforme
                </h4>
                <div className="space-y-3">
                  {opinionData.sources.map((source, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          source.sentiment > 0.2 ? 'bg-green-500' :
                          source.sentiment < -0.2 ? 'bg-red-500' : 'bg-gray-400'
                        }`}></div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {source.platform}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 dark:text-white">
                          {source.count.toLocaleString()}
                        </div>
                        <div className={`text-xs ${
                          source.sentiment > 0.2 ? 'text-green-600' :
                          source.sentiment < -0.2 ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {(source.sentiment * 100).toFixed(0)}% sentiment
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Répartition Géographique
                </h4>
                <div className="space-y-3">
                  {opinionData.geographicData.map((region, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {region.region}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900 dark:text-white">
                          {region.volume.toLocaleString()}
                        </div>
                        <div className={`text-xs ${
                          region.sentiment > 0.2 ? 'text-green-600' :
                          region.sentiment < -0.2 ? 'text-red-600' : 'text-gray-500'
                        }`}>
                          {(region.sentiment * 100).toFixed(0)}% sentiment
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {viewMode === 'detailed' && (
            <div className="space-y-6">
              {/* Timeline Chart */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Évolution Temporelle du Sentiment
                </h4>
                <div className="h-64 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-800/30 rounded flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400">Graphique temporel interactif</span>
                </div>
              </div>

              {/* Influential Voices */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Voix Influentes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {opinionData.influentialVoices.map((voice, i) => (
                    <div key={i} className="bg-white dark:bg-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {voice.username}
                          </span>
                          {voice.verified && (
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {voice.platform}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Influence: {voice.influence}%
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${getSentimentColor(voice.sentiment)}`}>
                            {voice.sentiment > 0.2 ? 'Positif' : 
                             voice.sentiment < -0.2 ? 'Négatif' : 'Neutre'}
                          </span>
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setSavedKeywords(prev => 
                  prev.includes(activeKeyword!) ? prev : [...prev, activeKeyword!]
                )}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Bookmark className="w-4 h-4 mr-2 inline" />
                Sauvegarder
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4 mr-2 inline" />
                Exporter
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <AlertTriangle className="w-4 h-4 mr-2 inline" />
                Créer Alerte
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Share2 className="w-4 h-4 mr-2 inline" />
                Partager
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!opinionData && !loading && (
        <div className="text-center py-12">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Analysez l'Opinion Publique
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Recherchez un mot-clé ou un sujet pour voir ce que les gens en pensent
          </p>
          <div className="flex justify-center space-x-2">
            {['élections', 'sécurité', 'économie'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setSearchKeyword(suggestion);
                  handleSearch(suggestion);
                }}
                className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
              >
                Essayer "{suggestion}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Analyse en cours...
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Collecte et analyse des données pour "{activeKeyword}"
          </p>
        </div>
      )}

      {/* Export Modal */}
      <ConfirmationModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={handleExport}
        title="Exporter l'analyse d'opinion"
        message={
          <div className="space-y-4">
            <p>Sélectionnez le format d'exportation pour l'analyse de "{activeKeyword}":</p>
            <div className="space-y-2">
              {(['csv', 'json', 'pdf'] as const).map(format => (
                <label key={format} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={format}
                    checked={exportFormat === format}
                    onChange={(e) => setExportFormat(e.target.value as any)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="capitalize">{format.toUpperCase()}</span>
                </label>
              ))}
            </div>
            {opinionData && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Données: {opinionData.mentions.toLocaleString()} mentions, {opinionData.sources.length} sources
              </div>
            )}
          </div>
        }
        confirmText="Exporter"
        cancelText="Annuler"
        type="success"
      />

      {/* Add Keyword Modal */}
      <ConfirmationModal
        isOpen={showAddKeyword}
        onClose={() => {
          setShowAddKeyword(false);
          setNewKeyword('');
        }}
        onConfirm={handleAddKeyword}
        title="Ajouter un mot-clé"
        message={
          <div className="space-y-4">
            <p>Entrez un nouveau mot-clé à surveiller:</p>
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
              placeholder="Ex: éducation, infrastructure, covid..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              autoFocus
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Ce mot-clé sera ajouté à votre liste de mots-clés sauvegardés
            </div>
          </div>
        }
        confirmText="Ajouter"
        cancelText="Annuler"
        type="success"
      />
    </div>
  );
}