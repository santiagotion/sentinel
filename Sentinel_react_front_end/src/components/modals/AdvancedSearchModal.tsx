import React, { useState } from 'react';
import { XMarkIcon, MagnifyingGlassIcon, FunnelIcon, BookmarkIcon } from '@heroicons/react/24/outline';

interface AdvancedSearchFilters {
  query: {
    text: string;
    operator: 'AND' | 'OR' | 'NOT';
    exactPhrase: boolean;
    proximity: { enabled: boolean; distance: number };
  };
  content: {
    types: string[];
    platforms: string[];
    languages: string[];
  };
  temporal: {
    dateRange: { start: string; end: string };
    timeOfDay: { enabled: boolean; start: string; end: string };
    dayOfWeek: number[];
  };
  geographic: {
    enabled: boolean;
    locations: string[];
    radius: number;
  };
  sentiment: {
    enabled: boolean;
    range: { min: number; max: number };
  };
  engagement: {
    enabled: boolean;
    minLikes: number;
    minShares: number;
    minComments: number;
  };
  credibility: {
    enabled: boolean;
    minScore: number;
    verifiedOnly: boolean;
  };
  advanced: {
    excludeRetweets: boolean;
    includeDeleted: boolean;
    duplicateHandling: 'include' | 'first_only' | 'exclude';
  };
}

interface SavedSearch {
  id: string;
  name: string;
  description?: string;
  filters: AdvancedSearchFilters;
  createdAt: Date;
  lastUsed?: Date;
}

interface AdvancedSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: AdvancedSearchFilters) => void;
  onSaveSearch?: (search: { name: string; description?: string; filters: AdvancedSearchFilters }) => void;
  initialFilters?: Partial<AdvancedSearchFilters>;
}

export function AdvancedSearchModal({
  isOpen,
  onClose,
  onSearch,
  onSaveSearch,
  initialFilters
}: AdvancedSearchModalProps) {
  const [activeTab, setActiveTab] = useState<'query' | 'content' | 'temporal' | 'location' | 'metrics' | 'advanced'>('query');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saveDescription, setSaveDescription] = useState('');

  const [filters, setFilters] = useState<AdvancedSearchFilters>({
    query: {
      text: '',
      operator: 'AND',
      exactPhrase: false,
      proximity: { enabled: false, distance: 5 }
    },
    content: {
      types: [],
      platforms: [],
      languages: ['fr']
    },
    temporal: {
      dateRange: {
        start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      },
      timeOfDay: { enabled: false, start: '09:00', end: '17:00' },
      dayOfWeek: [1, 2, 3, 4, 5] // Monday to Friday
    },
    geographic: {
      enabled: false,
      locations: [],
      radius: 50
    },
    sentiment: {
      enabled: false,
      range: { min: -1, max: 1 }
    },
    engagement: {
      enabled: false,
      minLikes: 0,
      minShares: 0,
      minComments: 0
    },
    credibility: {
      enabled: false,
      minScore: 0.5,
      verifiedOnly: false
    },
    advanced: {
      excludeRetweets: false,
      includeDeleted: false,
      duplicateHandling: 'include'
    },
    ...initialFilters
  });

  if (!isOpen) return null;

  const handleSearch = () => {
    onSearch(filters);
    onClose();
  };

  const handleSaveSearch = () => {
    if (onSaveSearch && saveName.trim()) {
      onSaveSearch({
        name: saveName.trim(),
        description: saveDescription.trim() || undefined,
        filters
      });
      setShowSaveDialog(false);
      setSaveName('');
      setSaveDescription('');
    }
  };

  const tabs = [
    { id: 'query', label: 'Requête', icon: MagnifyingGlassIcon },
    { id: 'content', label: 'Contenu', icon: FunnelIcon },
    { id: 'temporal', label: 'Temporel', icon: BookmarkIcon },
    { id: 'location', label: 'Localisation', icon: BookmarkIcon },
    { id: 'metrics', label: 'Métriques', icon: BookmarkIcon },
    { id: 'advanced', label: 'Avancé', icon: BookmarkIcon }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Recherche Avancée
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="mt-4">
              <nav className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {/* Query Tab */}
            {activeTab === 'query' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Texte de recherche
                  </label>
                  <textarea
                    value={filters.query.text}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      query: { ...prev.query, text: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Entrez vos mots-clés, phrases ou expressions..."
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Utilisez des guillemets pour les phrases exactes, + pour obligatoire, - pour exclure
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Opérateur logique
                    </label>
                    <select
                      value={filters.query.operator}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        query: { ...prev.query, operator: e.target.value as any }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="AND">ET (tous les mots)</option>
                      <option value="OR">OU (n'importe quel mot)</option>
                      <option value="NOT">SAUF (exclure)</option>
                    </select>
                  </div>

                  <div className="space-y-3 pt-6">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="exactPhrase"
                        checked={filters.query.exactPhrase}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          query: { ...prev.query, exactPhrase: e.target.checked }
                        }))}
                        className="mr-2"
                      />
                      <label htmlFor="exactPhrase" className="text-sm text-gray-700 dark:text-gray-300">
                        Phrase exacte uniquement
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Recherche de proximité
                    </label>
                    <button
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        query: {
                          ...prev.query,
                          proximity: { ...prev.query.proximity, enabled: !prev.query.proximity.enabled }
                        }
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        filters.query.proximity.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        filters.query.proximity.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {filters.query.proximity.enabled && (
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Distance maximale entre les mots
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={filters.query.proximity.distance}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          query: {
                            ...prev.query,
                            proximity: { ...prev.query.proximity, distance: parseInt(e.target.value) }
                          }
                        }))}
                        className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">mots</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Types de contenu
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'social_media', label: 'Réseaux sociaux' },
                      { value: 'news', label: 'Articles de presse' },
                      { value: 'blog', label: 'Blogs' },
                      { value: 'forum', label: 'Forums' },
                      { value: 'official', label: 'Sources officielles' },
                      { value: 'video', label: 'Vidéos' },
                      { value: 'audio', label: 'Audio' },
                      { value: 'image', label: 'Images' }
                    ].map((type) => (
                      <div key={type.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`type-${type.value}`}
                          checked={filters.content.types.includes(type.value)}
                          onChange={(e) => {
                            const types = e.target.checked
                              ? [...filters.content.types, type.value]
                              : filters.content.types.filter(t => t !== type.value);
                            setFilters(prev => ({
                              ...prev,
                              content: { ...prev.content, types }
                            }));
                          }}
                          className="mr-2"
                        />
                        <label htmlFor={`type-${type.value}`} className="text-sm text-gray-700 dark:text-gray-300">
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Plateformes
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Facebook', 'Twitter', 'Instagram', 'TikTok', 'WhatsApp', 'Telegram', 'YouTube', 'LinkedIn'
                    ].map((platform) => (
                      <div key={platform} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`platform-${platform}`}
                          checked={filters.content.platforms.includes(platform)}
                          onChange={(e) => {
                            const platforms = e.target.checked
                              ? [...filters.content.platforms, platform]
                              : filters.content.platforms.filter(p => p !== platform);
                            setFilters(prev => ({
                              ...prev,
                              content: { ...prev.content, platforms }
                            }));
                          }}
                          className="mr-2"
                        />
                        <label htmlFor={`platform-${platform}`} className="text-sm text-gray-700 dark:text-gray-300">
                          {platform}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Langues
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { code: 'fr', name: 'Français' },
                      { code: 'en', name: 'Anglais' },
                      { code: 'sw', name: 'Swahili' },
                      { code: 'ln', name: 'Lingala' },
                      { code: 'ar', name: 'Arabe' },
                      { code: 'es', name: 'Espagnol' }
                    ].map((lang) => (
                      <div key={lang.code} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`lang-${lang.code}`}
                          checked={filters.content.languages.includes(lang.code)}
                          onChange={(e) => {
                            const languages = e.target.checked
                              ? [...filters.content.languages, lang.code]
                              : filters.content.languages.filter(l => l !== lang.code);
                            setFilters(prev => ({
                              ...prev,
                              content: { ...prev.content, languages }
                            }));
                          }}
                          className="mr-2"
                        />
                        <label htmlFor={`lang-${lang.code}`} className="text-sm text-gray-700 dark:text-gray-300">
                          {lang.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Temporal Tab */}
            {activeTab === 'temporal' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Plage de dates
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Date de début</label>
                      <input
                        type="date"
                        value={filters.temporal.dateRange.start}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          temporal: {
                            ...prev.temporal,
                            dateRange: { ...prev.temporal.dateRange, start: e.target.value }
                          }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Date de fin</label>
                      <input
                        type="date"
                        value={filters.temporal.dateRange.end}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          temporal: {
                            ...prev.temporal,
                            dateRange: { ...prev.temporal.dateRange, end: e.target.value }
                          }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Filtrer par heure de la journée
                    </label>
                    <button
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        temporal: {
                          ...prev.temporal,
                          timeOfDay: { ...prev.temporal.timeOfDay, enabled: !prev.temporal.timeOfDay.enabled }
                        }
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        filters.temporal.timeOfDay.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        filters.temporal.timeOfDay.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {filters.temporal.timeOfDay.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Heure de début</label>
                        <input
                          type="time"
                          value={filters.temporal.timeOfDay.start}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            temporal: {
                              ...prev.temporal,
                              timeOfDay: { ...prev.temporal.timeOfDay, start: e.target.value }
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Heure de fin</label>
                        <input
                          type="time"
                          value={filters.temporal.timeOfDay.end}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            temporal: {
                              ...prev.temporal,
                              timeOfDay: { ...prev.temporal.timeOfDay, end: e.target.value }
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Jours de la semaine
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 1, label: 'Lun' },
                      { value: 2, label: 'Mar' },
                      { value: 3, label: 'Mer' },
                      { value: 4, label: 'Jeu' },
                      { value: 5, label: 'Ven' },
                      { value: 6, label: 'Sam' },
                      { value: 0, label: 'Dim' }
                    ].map((day) => (
                      <button
                        key={day.value}
                        onClick={() => {
                          const dayOfWeek = filters.temporal.dayOfWeek.includes(day.value)
                            ? filters.temporal.dayOfWeek.filter(d => d !== day.value)
                            : [...filters.temporal.dayOfWeek, day.value];
                          setFilters(prev => ({
                            ...prev,
                            temporal: { ...prev.temporal, dayOfWeek }
                          }));
                        }}
                        className={`px-3 py-2 text-sm rounded transition-colors ${
                          filters.temporal.dayOfWeek.includes(day.value)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filtrage géographique
                  </label>
                  <button
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      geographic: { ...prev.geographic, enabled: !prev.geographic.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      filters.geographic.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      filters.geographic.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {filters.geographic.enabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Localisations
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          'Kinshasa', 'Lubumbashi', 'Goma', 'Bukavu', 'Mbuji-Mayi', 'Kisangani',
                          'Nord-Kivu', 'Sud-Kivu', 'Haut-Katanga', 'Kasaï', 'Équateur', 'Ituri'
                        ].map((location) => (
                          <div key={location} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`location-${location}`}
                              checked={filters.geographic.locations.includes(location)}
                              onChange={(e) => {
                                const locations = e.target.checked
                                  ? [...filters.geographic.locations, location]
                                  : filters.geographic.locations.filter(l => l !== location);
                                setFilters(prev => ({
                                  ...prev,
                                  geographic: { ...prev.geographic, locations }
                                }));
                              }}
                              className="mr-2"
                            />
                            <label htmlFor={`location-${location}`} className="text-sm text-gray-700 dark:text-gray-300">
                              {location}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rayon de recherche (km)
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="500"
                        value={filters.geographic.radius}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          geographic: { ...prev.geographic, radius: parseInt(e.target.value) }
                        }))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>1 km</span>
                        <span>{filters.geographic.radius} km</span>
                        <span>500 km</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Metrics Tab */}
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Filtrage par sentiment
                    </label>
                    <button
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        sentiment: { ...prev.sentiment, enabled: !prev.sentiment.enabled }
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        filters.sentiment.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        filters.sentiment.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {filters.sentiment.enabled && (
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Plage de sentiment ({filters.sentiment.range.min.toFixed(1)} à {filters.sentiment.range.max.toFixed(1)})
                      </label>
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-500">Minimum</label>
                          <input
                            type="range"
                            min="-1"
                            max="1"
                            step="0.1"
                            value={filters.sentiment.range.min}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              sentiment: {
                                ...prev.sentiment,
                                range: { ...prev.sentiment.range, min: parseFloat(e.target.value) }
                              }
                            }))}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">Maximum</label>
                          <input
                            type="range"
                            min="-1"
                            max="1"
                            step="0.1"
                            value={filters.sentiment.range.max}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              sentiment: {
                                ...prev.sentiment,
                                range: { ...prev.sentiment.range, max: parseFloat(e.target.value) }
                              }
                            }))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Filtrage par engagement
                    </label>
                    <button
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        engagement: { ...prev.engagement, enabled: !prev.engagement.enabled }
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        filters.engagement.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        filters.engagement.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {filters.engagement.enabled && (
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Likes minimum</label>
                        <input
                          type="number"
                          min="0"
                          value={filters.engagement.minLikes}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            engagement: { ...prev.engagement, minLikes: parseInt(e.target.value) || 0 }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Partages minimum</label>
                        <input
                          type="number"
                          min="0"
                          value={filters.engagement.minShares}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            engagement: { ...prev.engagement, minShares: parseInt(e.target.value) || 0 }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Commentaires minimum</label>
                        <input
                          type="number"
                          min="0"
                          value={filters.engagement.minComments}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            engagement: { ...prev.engagement, minComments: parseInt(e.target.value) || 0 }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Filtrage par crédibilité
                    </label>
                    <button
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        credibility: { ...prev.credibility, enabled: !prev.credibility.enabled }
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        filters.credibility.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        filters.credibility.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {filters.credibility.enabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Score de crédibilité minimum ({filters.credibility.minScore.toFixed(1)})
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={filters.credibility.minScore}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            credibility: { ...prev.credibility, minScore: parseFloat(e.target.value) }
                          }))}
                          className="w-full"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="verifiedOnly"
                          checked={filters.credibility.verifiedOnly}
                          onChange={(e) => setFilters(prev => ({
                            ...prev,
                            credibility: { ...prev.credibility, verifiedOnly: e.target.checked }
                          }))}
                          className="mr-2"
                        />
                        <label htmlFor="verifiedOnly" className="text-sm text-gray-700 dark:text-gray-300">
                          Sources vérifiées uniquement
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Exclure les retweets/partages
                    </label>
                    <button
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, excludeRetweets: !prev.advanced.excludeRetweets }
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        filters.advanced.excludeRetweets ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        filters.advanced.excludeRetweets ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Inclure le contenu supprimé
                    </label>
                    <button
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        advanced: { ...prev.advanced, includeDeleted: !prev.advanced.includeDeleted }
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        filters.advanced.includeDeleted ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        filters.advanced.includeDeleted ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Gestion des doublons
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'include', label: 'Inclure tous les doublons', description: 'Afficher toutes les occurrences' },
                      { value: 'first_only', label: 'Premier uniquement', description: 'Ne garder que la première occurrence' },
                      { value: 'exclude', label: 'Exclure les doublons', description: 'Ignorer complètement les doublons' }
                    ].map((option) => (
                      <div key={option.value} className="flex items-start">
                        <input
                          type="radio"
                          id={`duplicate-${option.value}`}
                          name="duplicateHandling"
                          checked={filters.advanced.duplicateHandling === option.value}
                          onChange={() => setFilters(prev => ({
                            ...prev,
                            advanced: { ...prev.advanced, duplicateHandling: option.value as any }
                          }))}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <label htmlFor={`duplicate-${option.value}`} className="font-medium text-gray-900 dark:text-white">
                            {option.label}
                          </label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{option.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {Object.values(filters).filter(section => 
                typeof section === 'object' && section !== null && 'enabled' in section && section.enabled
              ).length} filtres actifs
            </div>
            <div className="flex space-x-3">
              {onSaveSearch && (
                <button
                  onClick={() => setShowSaveDialog(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500"
                >
                  Sauvegarder
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500"
              >
                Annuler
              </button>
              <button
                onClick={handleSearch}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Search Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-60 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setShowSaveDialog(false)} />
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Sauvegarder la recherche
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ma recherche personnalisée"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={saveDescription}
                    onChange={(e) => setSaveDescription(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Description optionnelle..."
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowSaveDialog(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveSearch}
                  disabled={!saveName.trim()}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}