import React, { useState, useEffect } from 'react';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  SearchIcon,
  FilterIcon,
  RefreshCwIcon,
  ChevronRightIcon,
  ShareIcon,
  MessageSquareIcon,
  HeartIcon,
  ClockIcon,
  HashIcon,
  UsersIcon,
  BarChart3Icon
} from 'lucide-react';
import { informationSpreadService } from '../../services/informationSpreadService';
import type { Subject } from '../../types/InformationSpread';

interface InformationSpreadScreenProps {
  onViewSubject?: (subjectId: string) => void;
}

export const InformationSpreadScreen: React.FC<InformationSpreadScreenProps> = ({ onViewSubject }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadData();
  }, [selectedCategory, selectedStatus, selectedSentiment, searchQuery]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [subjectsData, categoriesData] = await Promise.all([
        informationSpreadService.getSubjects({
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          status: selectedStatus !== 'all' ? selectedStatus : undefined,
          sentiment: selectedSentiment !== 'all' ? selectedSentiment : undefined,
          search: searchQuery || undefined
        }),
        informationSpreadService.getCategories()
      ]);
      
      setSubjects(subjectsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading information spread data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: Subject['status']) => {
    switch (status) {
      case 'viral':
        return <TrendingUpIcon className="w-5 h-5 text-red-500" />;
      case 'spreading':
        return <TrendingUpIcon className="w-5 h-5 text-orange-500" />;
      case 'emerging':
        return <AlertTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'declining':
        return <TrendingDownIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment: Subject['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'negative':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'mixed':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getStatusLabel = (status: Subject['status']) => {
    const labels = {
      viral: 'Viral',
      spreading: 'En propagation',
      emerging: 'Émergent',
      declining: 'En déclin',
      dormant: 'Dormant'
    };
    return labels[status] || status;
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Il y a moins d\'une heure';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Hier';
    return `Il y a ${diffDays} jours`;
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Analyse de Propagation d'Information
            </h1>
            <button
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCwIcon className="w-4 h-4" />
              Actualiser
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un sujet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">Tous les statuts</option>
              <option value="viral">Viral</option>
              <option value="spreading">En propagation</option>
              <option value="emerging">Émergent</option>
              <option value="declining">En déclin</option>
              <option value="dormant">Dormant</option>
            </select>

            {/* Sentiment Filter */}
            <select
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="all">Tous les sentiments</option>
              <option value="positive">Positif</option>
              <option value="negative">Négatif</option>
              <option value="neutral">Neutre</option>
              <option value="mixed">Mixte</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : subjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Aucun sujet trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onViewSubject?.(subject.id)}
              >
                {/* Subject Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(subject.status)}
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {getStatusLabel(subject.status)}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSentimentColor(subject.sentiment)}`}>
                      {subject.sentiment === 'positive' ? 'Positif' : 
                       subject.sentiment === 'negative' ? 'Négatif' :
                       subject.sentiment === 'mixed' ? 'Mixte' : 'Neutre'}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                    {subject.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {subject.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {subject.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs"
                      >
                        <HashIcon className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                    {subject.tags.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{subject.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
                        <UsersIcon className="w-4 h-4" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {formatNumber(subject.totalReach)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Portée</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
                        <TrendingUpIcon className="w-4 h-4" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {subject.spreadVelocity.toFixed(1)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Vélocité</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
                        <BarChart3Icon className="w-4 h-4" />
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {(subject.engagementRate * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Engagement</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <ClockIcon className="w-3 h-3" />
                      {formatTimeAgo(subject.lastActivityAt)}
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <span className="text-sm font-medium">Voir détails</span>
                      <ChevronRightIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};