import React, { useState, useEffect, useMemo } from 'react';
import { 
  Database, Search, Filter, Download, Maximize2, Eye, ExternalLink,
  Calendar, MapPin, User, MessageSquare, ThumbsUp, ThumbsDown, 
  CheckCircle, XCircle, Star, Flag, Share2, Clock, Tag, Layers,
  TrendingUp, BarChart3, PieChart, Activity, AlertTriangle, Info, RefreshCw,
  SortAsc, SortDesc, Grid, List, Settings, Bookmark, X, Plus
} from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { exportRawData } from '../../utils/exportUtils';
import { ConfirmationModal } from '../ui/Modal';
import { SearchModal } from '../ui/SearchModal';
import { ItemViewerModal } from '../ui/ItemViewerModal';

interface RawDataItem {
  id: string;
  timestamp: string;
  source: string;
  platform: string;
  content: string;
  author?: string;
  location?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  engagement: number;
  reach: number;
  verified: boolean;
  language: string;
  keywords: string[];
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  metadata: Record<string, any>;
}

interface RawDataExplorerProps {
  data?: RawDataItem[];
  onItemSelect?: (item: RawDataItem) => void;
}

export function RawDataExplorer({ data, onItemSelect }: RawDataExplorerProps) {
  const [filteredData, setFilteredData] = useState<RawDataItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<RawDataItem | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards' | 'timeline'>('table');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    source: 'all',
    sentiment: 'all',
    priority: 'all',
    verified: 'all',
    timeRange: 'all',
    category: 'all',
    language: 'all'
  });
  const [sortBy, setSortBy] = useState<'timestamp' | 'engagement' | 'reach'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showItemViewer, setShowItemViewer] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'xlsx'>('csv');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['timestamp', 'source', 'content', 'sentiment', 'priority']);
  const [savedSearches, setSavedSearches] = useState<Array<{name: string, filters: any, search: string}>>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([]);
  
  const { success, error, info } = useNotifications();

  // Mock data for demonstration - memoized to prevent infinite re-renders
  const mockData = useMemo<RawDataItem[]>(() => Array.from({ length: 500 }, (_, i) => {
    const sources = ['Twitter', 'Facebook', 'WhatsApp', 'Telegram', 'Instagram', 'TikTok', 'Reddit', 'YouTube'];
    const authors = ['@user123', '@activist_rdc', '@journalist_ksh', '@citizen_voice', '@political_watch', '@news_drc'];
    const locations = ['Kinshasa', 'Nord-Kivu', 'Sud-Kivu', 'Katanga', 'Kasaï', 'Bandundu', 'Équateur'];
    const sentiments: ('positive' | 'negative' | 'neutral')[] = ['positive', 'negative', 'neutral'];
    const priorities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];
    const categories = ['Politique', 'Sécurité', 'Économie', 'Social', 'Santé', 'Éducation', 'Infrastructure'];
    const languages = ['fr', 'ln', 'sw', 'en'];
    
    const keywordSets = [
      ['élections', 'vote', 'démocratie'],
      ['sécurité', 'police', 'armée'],
      ['économie', 'emploi', 'business'],
      ['santé', 'hôpital', 'médecin'],
      ['éducation', 'école', 'université'],
      ['infrastructure', 'route', 'électricité']
    ];

    const contents = [
      'Les préparatifs électoraux continuent dans la capitale avec une forte mobilisation des électeurs...',
      'Incident sécuritaire rapporté dans l\'est du pays, les forces de l\'ordre interviennent...',
      'Nouvelle initiative économique lancée pour soutenir les petites entreprises locales...',
      'Campagne de vaccination étendue dans plusieurs provinces avec le soutien international...',
      'Projet d\'infrastructure routière approuvé pour améliorer la connectivité régionale...',
      'Manifestation pacifique organisée par la société civile pour demander plus de transparence...',
      'Découverte de nouveaux gisements miniers dans la région orientale du pays...',
      'Programme d\'éducation numérique lancé dans les écoles urbaines et rurales...'
    ];

    const source = sources[Math.floor(Math.random() * sources.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const keywordSet = keywordSets[Math.floor(Math.random() * keywordSets.length)];
    
    return {
      id: `item_${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      source,
      platform: source,
      content: contents[Math.floor(Math.random() * contents.length)],
      author: Math.random() > 0.3 ? authors[Math.floor(Math.random() * authors.length)] : undefined,
      location: locations[Math.floor(Math.random() * locations.length)],
      sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
      engagement: Math.floor(Math.random() * 10000),
      reach: Math.floor(Math.random() * 100000),
      verified: Math.random() > 0.6,
      language: languages[Math.floor(Math.random() * languages.length)],
      keywords: keywordSet,
      category,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      metadata: {
        shares: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 500),
        likes: Math.floor(Math.random() * 5000),
        confidence: Math.round(Math.random() * 100),
        aiAnalyzed: Math.random() > 0.5,
        flagged: Math.random() > 0.9
      }
    };
  }), []); // Empty dependency array to ensure it only runs once

  const currentData = data || mockData;

  // Apply filters and search
  useEffect(() => {
    let filtered = currentData.filter(item => {
      const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSource = filters.source === 'all' || item.source === filters.source;
      const matchesSentiment = filters.sentiment === 'all' || item.sentiment === filters.sentiment;
      const matchesPriority = filters.priority === 'all' || item.priority === filters.priority;
      const matchesVerified = filters.verified === 'all' || 
                             (filters.verified === 'verified' && item.verified) ||
                             (filters.verified === 'unverified' && !item.verified);
      const matchesCategory = filters.category === 'all' || item.category === filters.category;
      const matchesLanguage = filters.language === 'all' || item.language === filters.language;

      // Time range filter
      const now = new Date();
      const itemDate = new Date(item.timestamp);
      let matchesTimeRange = true;
      
      switch (filters.timeRange) {
        case '1h':
          matchesTimeRange = now.getTime() - itemDate.getTime() <= 60 * 60 * 1000;
          break;
        case '24h':
          matchesTimeRange = now.getTime() - itemDate.getTime() <= 24 * 60 * 60 * 1000;
          break;
        case '7d':
          matchesTimeRange = now.getTime() - itemDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
          break;
        case '30d':
          matchesTimeRange = now.getTime() - itemDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
          break;
        case 'all':
          matchesTimeRange = true;
          break;
      }

      return matchesSearch && matchesSource && matchesSentiment && matchesPriority && 
             matchesVerified && matchesTimeRange && matchesCategory && matchesLanguage;
    });

    // Sort the filtered data
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'timestamp':
          comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case 'engagement':
          comparison = a.engagement - b.engagement;
          break;
        case 'reach':
          comparison = a.reach - b.reach;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
    setLoading(false);
  }, [currentData, searchTerm, filters, sortBy, sortOrder]);

  // Enhanced functionality functions
  const handleExport = async () => {
    try {
      const selectedData = selectedItems.length > 0 
        ? filteredData.filter(item => selectedItems.includes(item.id))
        : filteredData;

      await exportRawData(selectedData, exportFormat);
      success('Export réussi', `${selectedData.length} éléments exportés au format ${exportFormat.toUpperCase()}`);
      setShowExportModal(false);
      setSelectedItems([]);
    } catch (err) {
      error('Erreur d\'export', 'Impossible d\'exporter les données');
    }
  };

  const handleAdvancedSearch = async (query: string, searchFilters: Record<string, any>) => {
    const mockResults = filteredData.filter(item => 
      item.content.toLowerCase().includes(query.toLowerCase()) ||
      item.source.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 20).map(item => ({
      id: item.id,
      type: 'content' as const,
      title: `${item.source} - ${item.sentiment}`,
      description: item.content,
      metadata: {
        timestamp: item.timestamp,
        platform: item.platform,
        location: item.location,
        priority: item.priority
      },
      relevance: Math.random()
    }));

    return mockResults;
  };

  const handleItemView = (item: RawDataItem) => {
    const viewableItem = {
      id: item.id,
      type: 'content' as const,
      title: `${item.source} - ${new Date(item.timestamp).toLocaleDateString()}`,
      description: item.content,
      createdAt: item.timestamp,
      metadata: {
        platform: item.platform,
        author: item.author,
        location: item.location,
        sentiment: item.sentiment,
        engagement: item.engagement,
        reach: item.reach,
        verified: item.verified,
        language: item.language,
        keywords: item.keywords,
        category: item.category,
        priority: item.priority
      },
      platform: item.platform,
      author: item.author ? { id: 'unknown', name: item.author } : undefined,
      content: item.content,
      engagement: {
        likes: Math.floor(item.engagement * 0.6),
        shares: Math.floor(item.engagement * 0.3),
        comments: Math.floor(item.engagement * 0.1),
        views: item.reach
      },
      sentiment: item.sentiment,
      language: item.language,
      hashtags: item.keywords,
      mentions: []
    };
    
    setSelectedItem(viewableItem as any);
    setShowItemViewer(true);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    const pageItems = paginatedData.map(item => item.id);
    setSelectedItems(prev => 
      pageItems.every(id => prev.includes(id))
        ? prev.filter(id => !pageItems.includes(id))
        : [...new Set([...prev, ...pageItems])]
    );
  };

  const toggleBookmark = (itemId: string) => {
    setBookmarkedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
    
    const item = filteredData.find(i => i.id === itemId);
    info(
      bookmarkedItems.includes(itemId) ? 'Marque-page supprimé' : 'Marque-page ajouté',
      item ? `Élément "${item.content.slice(0, 50)}..." ${bookmarkedItems.includes(itemId) ? 'retiré des' : 'ajouté aux'} marque-pages` : ''
    );
  };

  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns(prev => 
      prev.includes(column)
        ? prev.filter(col => col !== column)
        : [...prev, column]
    );
  };

  const saveCurrentSearch = () => {
    const searchName = prompt('Nom de la recherche:');
    if (searchName) {
      setSavedSearches(prev => [{
        name: searchName,
        filters: { ...filters },
        search: searchTerm
      }, ...prev].slice(0, 10));
      success('Recherche sauvegardée', `"${searchName}" ajouté aux recherches sauvegardées`);
    }
  };

  const loadSavedSearch = (savedSearch: any) => {
    setFilters(savedSearch.filters);
    setSearchTerm(savedSearch.search);
    info('Recherche chargée', `Recherche "${savedSearch.name}" appliquée`);
  };

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
      case 'negative': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">
              <button 
                onClick={() => {
                  setSortBy('timestamp');
                  setSortOrder(sortBy === 'timestamp' && sortOrder === 'desc' ? 'asc' : 'desc');
                }}
                className="flex items-center space-x-1 hover:text-blue-600"
              >
                <Clock className="w-4 h-4" />
                <span>Timestamp</span>
              </button>
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">Source</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">Contenu</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">Sentiment</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">
              <button 
                onClick={() => {
                  setSortBy('engagement');
                  setSortOrder(sortBy === 'engagement' && sortOrder === 'desc' ? 'asc' : 'desc');
                }}
                className="flex items-center space-x-1 hover:text-blue-600"
              >
                <Activity className="w-4 h-4" />
                <span>Engagement</span>
              </button>
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">Priorité</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, i) => (
            <tr 
              key={item.id} 
              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                {new Date(item.timestamp).toLocaleString('fr-FR')}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                    {item.source}
                  </span>
                  {item.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                  {item.metadata.flagged && <Flag className="w-4 h-4 text-red-500" />}
                </div>
              </td>
              <td className="py-3 px-4 max-w-md">
                <p className="truncate text-gray-800 dark:text-gray-200">
                  {item.content}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  {item.keywords.slice(0, 3).map(keyword => (
                    <span key={keyword} className="px-1 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded text-xs ${getSentimentColor(item.sentiment)}`}>
                  {item.sentiment}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="text-gray-600 dark:text-gray-400">
                  <div className="font-medium">{item.engagement.toLocaleString()}</div>
                  <div className="text-xs">Portée: {item.reach.toLocaleString()}</div>
                </div>
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-green-600 dark:text-green-400 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button className="text-orange-600 dark:text-orange-400 hover:underline">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCardsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {paginatedData.map(item => (
        <div 
          key={item.id}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setSelectedItem(item)}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
              {item.source}
            </span>
            <div className="flex items-center space-x-1">
              {item.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
              {item.metadata.flagged && <Flag className="w-4 h-4 text-red-500" />}
            </div>
          </div>
          
          <p className="text-gray-800 dark:text-gray-200 text-sm mb-3 line-clamp-3">
            {item.content}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span>{new Date(item.timestamp).toLocaleTimeString('fr-FR')}</span>
            <span>{item.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded text-xs ${getSentimentColor(item.sentiment)}`}>
              {item.sentiment}
            </span>
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{item.engagement}</span>
              <Activity className="w-3 h-3" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {item.keywords.slice(0, 4).map(keyword => (
              <span key={keyword} className="px-1 py-0.5 text-xs bg-gray-200 dark:bg-gray-600 rounded">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTimelineView = () => (
    <div className="space-y-4">
      {paginatedData.map((item, index) => (
        <div key={item.id} className="flex items-start space-x-4">
          <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full ${
              item.priority === 'critical' ? 'bg-red-500' :
              item.priority === 'high' ? 'bg-orange-500' :
              item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            }`}></div>
            {index < paginatedData.length - 1 && (
              <div className="w-0.5 h-16 bg-gray-200 dark:bg-gray-600 mt-2"></div>
            )}
          </div>
          
          <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 rounded text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                  {item.source}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(item.timestamp).toLocaleString('fr-FR')}
                </span>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(item.priority)}`}>
                {item.priority}
              </span>
            </div>
            
            <p className="text-gray-800 dark:text-gray-200 mb-2">{item.content}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded text-xs ${getSentimentColor(item.sentiment)}`}>
                  {item.sentiment}
                </span>
                <span className="text-gray-500 dark:text-gray-400">{item.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <Activity className="w-4 h-4" />
                <span>{item.engagement.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Explorateur de Données Brutes
          </h3>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-sm">
            {filteredData.length.toLocaleString()} éléments
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-1 inline" />
              Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Layers className="w-4 h-4 mr-1 inline" />
              Cartes
            </button>
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
          </div>
          
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Download className="w-4 h-4 mr-2 inline" />
            Exporter
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher dans le contenu, auteurs, mots-clés..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <select
          value={filters.source}
          onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="all">Toutes les sources</option>
          <option value="Twitter">Twitter</option>
          <option value="Facebook">Facebook</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Telegram">Telegram</option>
          <option value="Instagram">Instagram</option>
        </select>
        
        <select
          value={filters.timeRange}
          onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value }))}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="1h">Dernière heure</option>
          <option value="24h">Dernières 24h</option>
          <option value="7d">7 derniers jours</option>
          <option value="30d">30 derniers jours</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <select
          value={filters.sentiment}
          onChange={(e) => setFilters(prev => ({ ...prev, sentiment: e.target.value }))}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="all">Tous sentiments</option>
          <option value="positive">Positif</option>
          <option value="negative">Négatif</option>
          <option value="neutral">Neutre</option>
        </select>
        
        <select
          value={filters.priority}
          onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="all">Toutes priorités</option>
          <option value="critical">Critique</option>
          <option value="high">Élevée</option>
          <option value="medium">Moyenne</option>
          <option value="low">Faible</option>
        </select>
        
        <select
          value={filters.verified}
          onChange={(e) => setFilters(prev => ({ ...prev, verified: e.target.value }))}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="all">Tous statuts</option>
          <option value="verified">Vérifiés</option>
          <option value="unverified">Non vérifiés</option>
        </select>
        
        <select
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="all">Toutes catégories</option>
          <option value="Politique">Politique</option>
          <option value="Sécurité">Sécurité</option>
          <option value="Économie">Économie</option>
          <option value="Social">Social</option>
        </select>
        
        <select
          value={filters.language}
          onChange={(e) => setFilters(prev => ({ ...prev, language: e.target.value }))}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="all">Toutes langues</option>
          <option value="fr">Français</option>
          <option value="ln">Lingala</option>
          <option value="sw">Swahili</option>
          <option value="en">Anglais</option>
        </select>
        
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value={10}>10 par page</option>
          <option value={25}>25 par page</option>
          <option value={50}>50 par page</option>
          <option value={100}>100 par page</option>
        </select>
      </div>

      {/* Data View */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-blue-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600 dark:text-gray-400">Chargement des données...</p>
            </div>
          </div>
        ) : (
          <>
            {viewMode === 'table' && renderTableView()}
            {viewMode === 'cards' && <div className="p-4">{renderCardsView()}</div>}
            {viewMode === 'timeline' && <div className="p-4">{renderTimelineView()}</div>}
          </>
        )}
      </div>

      {/* Pagination */}
      {!loading && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredData.length)} sur {filteredData.length} éléments
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            
            <span className="px-3 py-2 text-sm">
              Page {currentPage} sur {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
      )}

      {/* Selected Item Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Détails de l'élément
              </h3>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Contenu</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedItem.content}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Source:</span>
                    <span className="text-gray-800 dark:text-gray-200">{selectedItem.source}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Auteur:</span>
                    <span className="text-gray-800 dark:text-gray-200">{selectedItem.author || 'Anonyme'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Localisation:</span>
                    <span className="text-gray-800 dark:text-gray-200">{selectedItem.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Langue:</span>
                    <span className="text-gray-800 dark:text-gray-200">{selectedItem.language.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Métadonnées</h4>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sentiment:</span>
                    <span className={`px-2 py-1 rounded text-xs ${getSentimentColor(selectedItem.sentiment)}`}>
                      {selectedItem.sentiment}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Priorité:</span>
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(selectedItem.priority)}`}>
                      {selectedItem.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Engagement:</span>
                    <span className="text-gray-800 dark:text-gray-200">{selectedItem.engagement.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Portée:</span>
                    <span className="text-gray-800 dark:text-gray-200">{selectedItem.reach.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Vérifié:</span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {selectedItem.verified ? '✓ Oui' : '✗ Non'}
                    </span>
                  </div>
                </div>
                
                <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Mots-clés</h5>
                <div className="flex flex-wrap gap-1 mb-4">
                  {selectedItem.keywords.map(keyword => (
                    <span key={keyword} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
                
                <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Données supplémentaires</h5>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedItem.metadata).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium text-gray-600 dark:text-gray-400 capitalize">
                        {key}:
                      </span>
                      <span className="text-gray-800 dark:text-gray-200 ml-1">
                        {typeof value === 'boolean' ? (value ? 'Oui' : 'Non') : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}