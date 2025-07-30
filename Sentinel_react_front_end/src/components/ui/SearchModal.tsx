import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X, Clock, Hash, MapPin, User, Calendar, Tag } from 'lucide-react';
import { Modal } from './Modal';

export interface SearchFilter {
  id: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'range';
  label: string;
  key: string;
  options?: Array<{ value: string; label: string; count?: number }>;
  value?: any;
  placeholder?: string;
}

export interface SearchResult {
  id: string;
  type: 'alert' | 'person' | 'location' | 'event' | 'content' | 'organization';
  title: string;
  description: string;
  metadata: Record<string, any>;
  relevance: number;
  highlighted?: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string, filters: Record<string, any>) => Promise<SearchResult[]>;
  placeholder?: string;
  filters?: SearchFilter[];
  recentSearches?: string[];
  onSaveSearch?: (query: string, filters: Record<string, any>, name: string) => void;
  savedSearches?: Array<{ name: string; query: string; filters: Record<string, any> }>;
}

export function SearchModal({
  isOpen,
  onClose,
  onSearch,
  placeholder = "Rechercher dans toutes les données...",
  filters = [],
  recentSearches = [],
  onSaveSearch,
  savedSearches = []
}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState('');

  // Initialize filters with default values
  useEffect(() => {
    const initialFilters: Record<string, any> = {};
    filters.forEach(filter => {
      if (filter.value !== undefined) {
        initialFilters[filter.key] = filter.value;
      }
    });
    setActiveFilters(initialFilters);
  }, [filters]);

  // Debounced search
  useEffect(() => {
    if (query.length >= 2) {
      const timeoutId = setTimeout(() => {
        performSearch();
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
    }
  }, [query, activeFilters]);

  const performSearch = async () => {
    if (query.length < 2) return;

    setIsSearching(true);
    try {
      const searchResults = await onSearch(query, activeFilters);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const updateFilter = (key: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({});
  };

  const handleSaveSearch = () => {
    if (onSaveSearch && saveSearchName.trim() && query.trim()) {
      onSaveSearch(query, activeFilters, saveSearchName.trim());
      setSaveSearchName('');
      setShowSaveDialog(false);
    }
  };

  const loadSavedSearch = (savedSearch: typeof savedSearches[0]) => {
    setQuery(savedSearch.query);
    setActiveFilters(savedSearch.filters);
  };

  const activeFilterCount = Object.values(activeFilters).filter(value => 
    value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true)
  ).length;

  const resultsByType = useMemo(() => {
    const grouped: Record<string, SearchResult[]> = {};
    results.forEach(result => {
      if (!grouped[result.type]) {
        grouped[result.type] = [];
      }
      grouped[result.type].push(result);
    });
    return grouped;
  }, [results]);

  const typeIcons = {
    alert: Clock,
    person: User,
    location: MapPin,
    event: Calendar,
    content: Hash,
    organization: Tag
  };

  const typeLabels = {
    alert: 'Alertes',
    person: 'Personnes',
    location: 'Lieux',
    event: 'Événements',
    content: 'Contenu',
    organization: 'Organisations'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Recherche Avancée" size="xl">
      <div className="flex flex-col h-[70vh]">
        {/* Search Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filtres</span>
              {activeFilterCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Save Search */}
            {onSaveSearch && query && (
              <button
                onClick={() => setShowSaveDialog(true)}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Sauvegarder
              </button>
            )}
          </div>

          {/* Recent and Saved Searches */}
          {(recentSearches.length > 0 || savedSearches.length > 0) && !query && (
            <div className="mt-4 space-y-3">
              {recentSearches.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recherches récentes</h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.slice(0, 5).map((recent, index) => (
                      <button
                        key={index}
                        onClick={() => setQuery(recent)}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {recent}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {savedSearches.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Recherches sauvegardées</h4>
                  <div className="flex flex-wrap gap-2">
                    {savedSearches.slice(0, 3).map((saved, index) => (
                      <button
                        key={index}
                        onClick={() => loadSavedSearch(saved)}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors"
                      >
                        {saved.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Filtres avancés</h4>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Effacer tout
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filters.map((filter) => (
                <div key={filter.id}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {filter.label}
                  </label>
                  
                  {filter.type === 'text' && (
                    <input
                      type="text"
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => updateFilter(filter.key, e.target.value)}
                      placeholder={filter.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  )}

                  {filter.type === 'select' && filter.options && (
                    <select
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => updateFilter(filter.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="">Tous</option>
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} {option.count ? `(${option.count})` : ''}
                        </option>
                      ))}
                    </select>
                  )}

                  {filter.type === 'date' && (
                    <input
                      type="date"
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => updateFilter(filter.key, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {query.length < 2 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Tapez au moins 2 caractères pour commencer la recherche</p>
            </div>
          ) : isSearching ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Recherche en cours...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              <X className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucun résultat trouvé pour "{query}"</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
              </div>

              {Object.entries(resultsByType).map(([type, typeResults]) => {
                const Icon = typeIcons[type as keyof typeof typeIcons];
                const label = typeLabels[type as keyof typeof typeLabels];

                return (
                  <div key={type}>
                    <div className="flex items-center space-x-2 mb-3">
                      {Icon && <Icon className="w-4 h-4 text-gray-400" />}
                      <h3 className="font-medium text-gray-900 dark:text-white">{label}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">({typeResults.length})</span>
                    </div>

                    <div className="space-y-2">
                      {typeResults.map((result) => (
                        <div
                          key={result.id}
                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                {result.highlighted ? (
                                  <span dangerouslySetInnerHTML={{ __html: result.title }} />
                                ) : (
                                  result.title
                                )}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {result.highlighted ? (
                                  <span dangerouslySetInnerHTML={{ __html: result.description }} />
                                ) : (
                                  result.description
                                )}
                              </p>
                              {Object.keys(result.metadata).length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {Object.entries(result.metadata).slice(0, 3).map(([key, value]) => (
                                    <span key={key} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                                      {key}: {String(value)}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-400 ml-4">
                              {(result.relevance * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Save Search Dialog */}
      {showSaveDialog && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sauvegarder la recherche</h3>
            <input
              type="text"
              value={saveSearchName}
              onChange={(e) => setSaveSearchName(e.target.value)}
              placeholder="Nom de la recherche..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
              autoFocus
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveSearch}
                disabled={!saveSearchName.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}