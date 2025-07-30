import React, { useState } from 'react';
import { 
  Search, Filter, Calendar, MapPin, AlertTriangle, 
  Users, Shield, X, Clock, Target
} from 'lucide-react';
import { SearchFilter } from '../../types/mapbox';

interface MapSearchProps {
  onSearch: (query: string, filters: SearchFilter) => void;
  onClearSearch: () => void;
  isSearching: boolean;
  resultCount: number;
}

export function MapSearch({ onSearch, onClearSearch, isSearching, resultCount }: MapSearchProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilter>({
    timeRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      end: new Date()
    },
    severity: [],
    provinces: [],
    types: [],
    verified: null,
    sentiment: []
  });

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, filters);
    }
  };

  const handleFilterChange = (key: keyof SearchFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'severity' | 'provinces' | 'types' | 'sentiment', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      timeRange: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        end: new Date()
      },
      severity: [],
      provinces: [],
      types: [],
      verified: null,
      sentiment: []
    });
  };

  const getActiveFilterCount = () => {
    return filters.severity.length + 
           filters.provinces.length + 
           filters.types.length + 
           filters.sentiment.length +
           (filters.verified !== null ? 1 : 0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {/* Search Bar */}
      <div className="p-4">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search locations, incidents, keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-2 rounded-lg border transition-colors relative ${
              showFilters 
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <Filter className="w-4 h-4" />
            {getActiveFilterCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
          
          <button
            onClick={handleSearch}
            disabled={!query.trim() || isSearching}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Search Results Summary */}
        {resultCount > 0 && (
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Found {resultCount} results
            </span>
            <button
              onClick={onClearSearch}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Clear results
            </button>
          </div>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="border-t border-gray-200 dark:border-gray-600 p-4 space-y-4">
          {/* Time Range */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Range</label>
            </div>
            <div className="flex space-x-2">
              <input
                type="date"
                value={filters.timeRange.start.toISOString().split('T')[0]}
                onChange={(e) => handleFilterChange('timeRange', {
                  ...filters.timeRange,
                  start: new Date(e.target.value)
                })}
                className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
              <span className="text-gray-500 dark:text-gray-400 text-sm py-1">to</span>
              <input
                type="date"
                value={filters.timeRange.end.toISOString().split('T')[0]}
                onChange={(e) => handleFilterChange('timeRange', {
                  ...filters.timeRange,
                  end: new Date(e.target.value)
                })}
                className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Severity Filter */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Severity</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {['low', 'medium', 'high', 'critical'].map((severity) => (
                <button
                  key={severity}
                  onClick={() => toggleArrayFilter('severity', severity)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filters.severity.includes(severity)
                      ? 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-600 text-red-700 dark:text-red-300'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {severity.charAt(0).toUpperCase() + severity.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Provinces Filter */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Provinces</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Kinshasa', 'Nord-Kivu', 'Sud-Kivu', 'Katanga'].map((province) => (
                <button
                  key={province}
                  onClick={() => toggleArrayFilter('provinces', province)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filters.provinces.includes(province)
                      ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {province}
                </button>
              ))}
            </div>
          </div>

          {/* Incident Types */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Incident Types</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {['armed_clash', 'civil_unrest', 'kidnapping', 'terrorism', 'robbery', 'protest'].map((type) => (
                <button
                  key={type}
                  onClick={() => toggleArrayFilter('types', type)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filters.types.includes(type)
                      ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-600 text-green-700 dark:text-green-300'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {/* Sentiment Filter */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sentiment</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {['positive', 'neutral', 'negative'].map((sentiment) => (
                <button
                  key={sentiment}
                  onClick={() => toggleArrayFilter('sentiment', sentiment)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filters.sentiment.includes(sentiment)
                      ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Verification Status */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-gray-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Verification Status</label>
            </div>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="verified"
                  checked={filters.verified === true}
                  onChange={() => handleFilterChange('verified', true)}
                  className="text-green-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Verified only</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="verified"
                  checked={filters.verified === false}
                  onChange={() => handleFilterChange('verified', false)}
                  className="text-red-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Unverified only</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="verified"
                  checked={filters.verified === null}
                  onChange={() => handleFilterChange('verified', null)}
                  className="text-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">All</span>
              </label>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between pt-2">
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Clear all filters
            </button>
            <button
              onClick={() => {
                handleSearch();
                setShowFilters(false);
              }}
              className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}