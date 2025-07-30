import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  BarChart3, 
  CheckCircle,
  Database,
  Play,
  PlayCircle,
  Settings,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Keyword } from '../../types';
import { ConfirmationModal } from '../ui/ConfirmationModal';
import { RawDataExplorer } from '../visualizations/RawDataExplorer';
import { KeywordDetailModal } from '../modals/KeywordDetailModal';
import { FirebaseKeywordsService } from '../../services/FirebaseKeywordsService';
import { FirebaseDataService, RawDataItem } from '../../services/FirebaseDataService';
import { ConfigService, ScrapingConfig } from '../../services/ConfigService';
import { SourceBreakdownWidget } from '../widgets/SourceBreakdownWidget';

interface KeywordsScreenProps {
  keywords: Keyword[];
  setKeywords: (keywords: Keyword[]) => void;
}

export function KeywordsScreen({ keywords, setKeywords }: KeywordsScreenProps) {
  const [newKeyword, setNewKeyword] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [activeTab, setActiveTab] = useState<'keywords' | 'rawdata'>('keywords');
  const [selectedKeywordForDetail, setSelectedKeywordForDetail] = useState<Keyword | null>(null);
  const [rawData, setRawData] = useState<RawDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [scrapingKeywordId, setScrapingKeywordId] = useState<number | null>(null);
  const [config, setConfig] = useState<ScrapingConfig | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Initialize Firebase services
  const keywordsService = new FirebaseKeywordsService();
  const dataService = new FirebaseDataService();
  const configService = new ConfigService();

  // Load real-time data when component mounts
  useEffect(() => {
    // Set up real-time keyword listener
    const unsubscribeKeywords = keywordsService.onKeywordsChange((updatedKeywords) => {
      setKeywords(updatedKeywords);
    });

    // Set up real-time config listener
    const unsubscribeConfig = configService.onConfigChange((updatedConfig) => {
      setConfig(updatedConfig);
    });

    // Load initial raw data
    loadRawData();

    return () => {
      unsubscribeKeywords();
      unsubscribeConfig();
    };
  }, []);

  const loadRawData = async () => {
    setLoading(true);
    try {
      // Load ALL raw data without pagination limit
      const { data } = await dataService.getRawData(10000);
      console.log(`Loading raw data: found ${data.length} total items`);
      setRawData(data);
    } catch (error) {
      console.error('Error loading raw data:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerScrapingAll = async () => {
    setScraping(true);
    try {
      const result = await keywordsService.triggerAllKeywordsScraping();
      if (result.success) {
        // Reload data after a short delay
        setTimeout(() => {
          loadRawData();
        }, 3000);
      }
      console.log(result.message);
    } catch (error) {
      console.error('Error triggering scraping:', error);
    } finally {
      setScraping(false);
    }
  };

  const triggerScrapingKeyword = async (keywordId: number) => {
    setScrapingKeywordId(keywordId);
    try {
      const result = await keywordsService.triggerKeywordScraping(keywordId);
      if (result.success) {
        // Reload data after a short delay
        setTimeout(() => {
          loadRawData();
        }, 3000);
      }
      console.log(result.message);
    } catch (error) {
      console.error('Error triggering keyword scraping:', error);
    } finally {
      setScrapingKeywordId(null);
    }
  };

  const addKeyword = async () => {
    if (newKeyword.trim() && keywords.length < 20) {
      setIsAdding(true);
      try {
        await keywordsService.addKeyword(newKeyword.trim());
        setNewKeyword('');
      } catch (error) {
        console.error('Error adding keyword:', error);
        // Fallback to local state update if Firebase fails
        const keyword: Keyword = {
          id: Date.now(),
          term: newKeyword.trim(),
          mentions: 0,
          trend: [0, 0, 0, 0, 0, 0, 0],
          status: 'active',
          createdAt: new Date(),
          sentiment: { positive: 0, negative: 0, neutral: 100 }
        };
        setKeywords([...keywords, keyword]);
        setNewKeyword('');
      } finally {
        setIsAdding(false);
      }
    }
  };

  const [deleteConfirm, setDeleteConfirm] = useState<{id: number, term: string} | null>(null);

  const deleteKeyword = (id: number) => {
    const keyword = keywords.find(k => k.id === id);
    if (keyword) {
      setDeleteConfirm({ id, term: keyword.term });
    }
  };

  const confirmDelete = async () => {
    if (deleteConfirm) {
      try {
        await keywordsService.deleteKeyword(deleteConfirm.id);
      } catch (error) {
        console.error('Error deleting keyword:', error);
        // Fallback to local state update if Firebase fails
        setKeywords(keywords.filter(k => k.id !== deleteConfirm.id));
      } finally {
        setDeleteConfirm(null);
      }
    }
  };

  const toggleKeywordSelection = (id: number) => {
    setSelectedKeywords(prev =>
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: Keyword['status']) => {
    switch (status) {
      case 'critical': return 'from-red-500 to-red-600';
      case 'warning': return 'from-yellow-500 to-yellow-600';
      default: return 'from-green-500 to-green-600';
    }
  };

  const getStatusBadge = (status: Keyword['status']) => {
    switch (status) {
      case 'critical': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      default: return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    }
  };

  const toggleDataSource = async () => {
    if (!config) return;
    
    try {
      await configService.toggleDataSource(!config.useOfficialAPI);
      console.log(`Switched to ${!config.useOfficialAPI ? 'Official API' : 'Scraping'} mode`);
    } catch (error) {
      console.error('Error toggling data source:', error);
    }
  };


  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Surveillance des Mots-clés</h3>
          <div className="flex items-center space-x-4 mt-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {keywords.length} mots-clés actifs • Collecte automatique lors de l'ajout
            </p>
            {config && (
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                config.useOfficialAPI 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              }`}>
                {config.useOfficialAPI ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                <span>{config.useOfficialAPI ? 'API Twitter' : 'Scraping Multi-Sources'}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {selectedKeywords.length > 0 && (
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Trash2 className="w-4 h-4" />
              <span>Supprimer ({selectedKeywords.length})</span>
            </button>
          )}
          
          {/* Data Source Toggle */}
          {config && (
            <button
              onClick={toggleDataSource}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                config.useOfficialAPI
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {config.useOfficialAPI ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span>{config.useOfficialAPI ? 'Passer au Scraping' : 'Passer à l\'API'}</span>
            </button>
          )}
          
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytique</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('keywords')}
          className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'keywords'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <BarChart3 className="w-4 h-4 inline mr-2" />
          Mots-clés
        </button>
        <button
          onClick={() => setActiveTab('rawdata')}
          className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'rawdata'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          <Database className="w-4 h-4 inline mr-2" />
          Données Brutes
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'keywords' && (
        <>
          {/* Add Keyword */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Ajouter un mot-clé</h4>
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              placeholder="Entrez un mot-clé à surveiller..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {newKeyword && (
              <div className="absolute right-3 top-3 text-sm text-gray-500">
                {newKeyword.length}/50
              </div>
            )}
          </div>
          <button
            onClick={addKeyword}
            disabled={!newKeyword.trim() || isAdding || keywords.length >= 20}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{isAdding ? 'Ajout...' : 'Ajouter'}</span>
          </button>
        </div>
        {keywords.length >= 20 && (
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
            Limite de 20 mots-clés atteinte
          </p>
        )}
      </div>

      {/* Analytics Overview (when enabled) */}
      {showAnalytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total des mentions</h5>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {keywords.reduce((sum, k) => sum + k.mentions, 0).toLocaleString()}
            </p>
            <p className="text-sm text-green-600 mt-1">+15% depuis hier</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Mot-clé le plus actif</h5>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {keywords.reduce((max, k) => k.mentions > max.mentions ? k : max, keywords[0])?.term || '-'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {keywords.reduce((max, k) => k.mentions > max.mentions ? k : max, keywords[0])?.mentions || 0} mentions
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Alertes actives</h5>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">
              {keywords.filter(k => k.status === 'critical' || k.status === 'warning').length}
            </p>
            <p className="text-sm text-red-600 mt-1">Nécessite attention</p>
          </div>
        </div>
      )}

      {/* Keywords Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {keywords.map((keyword) => {
          const isSelected = selectedKeywords.includes(keyword.id);
          const maxTrend = Math.max(...keyword.trend, 1);
          
          return (
            <div
              key={keyword.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all p-6 border-2 cursor-pointer ${
                isSelected ? 'border-blue-500' : 'border-transparent'
              }`}
              onClick={() => setSelectedKeywordForDetail(keyword)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{keyword.term}</h4>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusBadge(keyword.status)}`}>
                    {keyword.status === 'critical' ? 'Critique' : keyword.status === 'warning' ? 'Attention' : 'Normal'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleKeywordSelection(keyword.id);
                    }}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <div className={`w-5 h-5 border-2 rounded ${
                      isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteKeyword(keyword.id);
                    }}
                    className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors group"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                  </button>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Mentions</span>
                    <span className="text-2xl font-bold text-gray-800 dark:text-white">{keyword.mentions}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">aujourd'hui</div>
                </div>

                {/* Trend Chart */}
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Tendance 7 jours</div>
                  <div className="h-12 flex items-end space-x-1">
                    {keyword.trend.map((value, index) => (
                      <div
                        key={index}
                        className={`flex-1 bg-gradient-to-t ${getStatusColor(keyword.status)} rounded-t transition-all duration-300 hover:opacity-80`}
                        style={{ height: `${(value / maxTrend) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sentiment Breakdown */}
                {keyword.sentiment && (
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Sentiment</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full flex">
                          <div className="bg-green-500" style={{ width: `${keyword.sentiment.positive}%` }} />
                          <div className="bg-gray-400" style={{ width: `${keyword.sentiment.neutral}%` }} />
                          <div className="bg-red-500" style={{ width: `${keyword.sentiment.negative}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedKeywordForDetail(keyword);
                    }}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg transition-colors"
                  >
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        </>
      )}

      {/* Raw Data Tab */}
      {activeTab === 'rawdata' && (
        <div className="space-y-6">
          {/* Source Breakdown Widget */}
          <SourceBreakdownWidget />
          
          {/* Raw Data Explorer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            {loading ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">Chargement des données...</span>
              </div>
            ) : (
              <RawDataExplorer data={rawData} />
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={confirmDelete}
        title="Supprimer le mot-clé"
        message={`Êtes-vous sûr de vouloir supprimer le mot-clé "${deleteConfirm?.term}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        type="danger"
      />

      {/* Keyword Detail Modal */}
      <KeywordDetailModal
        keyword={selectedKeywordForDetail}
        isOpen={selectedKeywordForDetail !== null}
        onClose={() => setSelectedKeywordForDetail(null)}
      />
    </div>
  );
}