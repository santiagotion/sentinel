import React, { useState } from 'react';
import { 
  Search, AlertTriangle, Activity, TrendingUp, TrendingDown, Globe, 
  CheckCircle, MapPin, Download, Layers, Database, MessageSquare, Share2
} from 'lucide-react';
import { DetailedSearchResult, SearchScreenFilters } from '../../types';
import { searchResultsDetailed } from '../../data/searchData';
import { getSourceIcon, getCredibilityBadge } from '../../utils/sourceUtils';
import { getSentimentIcon } from '../../utils/sentimentUtils';
import '../../styles/animations.css';

interface SearchScreenProps {
  // Add any props if needed when integrating with parent component
}

export function SearchScreen({}: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchScreenFilters>({
    source: 'all',
    sentiment: 'all',
    timeRange: '24h',
    credibility: 'all'
  });
  const [results, setResults] = useState<DetailedSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [view, setView] = useState<'list' | 'grid'>('list');

  const handleSearch = () => {
    if (query.length < 2) return;
    
    setIsSearching(true);
    setTimeout(() => {
      // Use the imported search results data
      setResults(searchResultsDetailed);
      setIsSearching(false);
    }, 1500);
  };

  const getSentimentIconComponent = (sentiment: string) => {
    const sentimentData = getSentimentIcon(sentiment);
    return sentimentData;
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Rechercher des personnes, sujets, événements..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-5 w-5 h-5 text-gray-400" />
            <button
              onClick={handleSearch}
              disabled={query.length < 2 || isSearching}
              className="absolute right-2 top-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSearching ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Recherche...</span>
                </div>
              ) : (
                'Rechercher'
              )}
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filters.source}
              onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes sources</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="news">Actualités</option>
            </select>

            <select
              value={filters.sentiment}
              onChange={(e) => setFilters({ ...filters, sentiment: e.target.value })}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tout sentiment</option>
              <option value="positive">Positif</option>
              <option value="neutral">Neutre</option>
              <option value="negative">Négatif</option>
            </select>

            <select
              value={filters.timeRange}
              onChange={(e) => setFilters({ ...filters, timeRange: e.target.value })}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1h">Dernière heure</option>
              <option value="24h">24 heures</option>
              <option value="7d">7 jours</option>
              <option value="30d">30 jours</option>
            </select>

            <select
              value={filters.credibility}
              onChange={(e) => setFilters({ ...filters, credibility: e.target.value })}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toute crédibilité</option>
              <option value="high">Haute (80%+)</option>
              <option value="medium">Moyenne (50-80%)</option>
              <option value="low">Faible (-50%)</option>
            </select>

            <div className="ml-auto flex items-center space-x-2">
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <Layers className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <Database className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      {results.length > 0 && !isSearching && (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {results.length} résultats trouvés
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Recherche effectuée en 1.2 secondes • IA activée
            </p>
          </div>
          <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>
      )}

      {/* Results */}
      <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
        {results.map((result, index) => {
          const sourceData = getSourceIcon(result.source);
          const credibility = getCredibilityBadge(result.credibility);
          const sentimentData = getSentimentIconComponent(result.sentiment.label);
          const SentimentIcon = sentimentData.icon;

          return (
            <div
              key={result.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all p-6 animate-fadeInUp`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                    {typeof sourceData?.icon === 'string' ? (
                      <span className={`text-2xl font-bold ${sourceData.color}`}>{sourceData.icon}</span>
                    ) : sourceData?.icon ? (
                      <sourceData.icon className={`w-6 h-6 ${sourceData.color}`} />
                    ) : (
                      <Globe className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{result.author}</h4>
                      {result.verified && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                      <span>{new Date(result.timestamp).toLocaleString('fr-FR')}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{result.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Credibility Badge */}
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${credibility.color}`}>
                  {result.credibility}% {credibility.label}
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{result.content}</p>

              {/* Alerts */}
              {result.alerts && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-center space-x-2 text-red-700 dark:text-red-300 font-medium mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Alertes détectées</span>
                  </div>
                  <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                    {result.alerts.map((alert, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        <span>{alert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                {/* Engagement Metrics */}
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Activity className="w-4 h-4" />
                    <span className="text-sm font-medium">{result.engagement.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm font-medium">{result.engagement.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm font-medium">{result.engagement.shares}</span>
                  </button>
                </div>

                {/* Sentiment & Topics */}
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-1 ${sentimentData.color}`}>
                    <SentimentIcon className="w-4 h-4" />
                    <span className="text-sm font-medium capitalize">{result.sentiment.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {result.topics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs font-medium text-gray-600 dark:text-gray-400"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reach Indicator */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Portée estimée</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {result.reach.toLocaleString()} personnes
                  </span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                    style={{ width: `${Math.min((result.reach / 200000) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}