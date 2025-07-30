import React, { useState } from 'react';
import { XMarkIcon, DocumentArrowDownIcon, CalendarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface ExportOptions {
  format: 'csv' | 'json' | 'xlsx' | 'pdf';
  dateRange: {
    start: string;
    end: string;
    preset?: 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
  };
  fields: {
    selected: string[];
    available: { key: string; label: string; required?: boolean }[];
  };
  filters: {
    includeResolved: boolean;
    minPriority: 'low' | 'medium' | 'high' | 'critical';
    sources: string[];
    categories: string[];
  };
  formatting: {
    includeHeaders: boolean;
    dateFormat: string;
    encoding: 'utf-8' | 'iso-8859-1';
    delimiter: ',' | ';' | '\t';
  };
  delivery: {
    method: 'download' | 'email' | 'webhook';
    email?: string;
    webhook?: string;
    schedule?: {
      enabled: boolean;
      frequency: 'daily' | 'weekly' | 'monthly';
      time: string;
    };
  };
}

interface ExportOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
  dataType: 'alerts' | 'search' | 'analytics' | 'keywords' | 'network' | 'geographic';
  title?: string;
}

export function ExportOptionsModal({
  isOpen,
  onClose,
  onExport,
  dataType,
  title = 'Options d\'exportation'
}: ExportOptionsModalProps) {
  const [activeTab, setActiveTab] = useState<'format' | 'data' | 'filters' | 'delivery'>('format');
  
  const getDefaultFields = () => {
    const fieldMappings = {
      alerts: [
        { key: 'id', label: 'ID', required: true },
        { key: 'title', label: 'Titre', required: true },
        { key: 'type', label: 'Type' },
        { key: 'priority', label: 'Priorité' },
        { key: 'status', label: 'Statut' },
        { key: 'location', label: 'Localisation' },
        { key: 'timestamp', label: 'Date/Heure' },
        { key: 'assignedTo', label: 'Assigné à' },
        { key: 'description', label: 'Description' },
        { key: 'metrics.mentions', label: 'Mentions' },
        { key: 'metrics.sentiment', label: 'Sentiment' },
        { key: 'metrics.reach', label: 'Portée' }
      ],
      search: [
        { key: 'id', label: 'ID', required: true },
        { key: 'title', label: 'Titre', required: true },
        { key: 'content', label: 'Contenu' },
        { key: 'author', label: 'Auteur' },
        { key: 'platform', label: 'Plateforme' },
        { key: 'timestamp', label: 'Date/Heure' },
        { key: 'metrics.sentiment', label: 'Sentiment' },
        { key: 'metrics.engagement.likes', label: 'Likes' },
        { key: 'metrics.engagement.shares', label: 'Partages' },
        { key: 'metrics.reach', label: 'Portée' },
        { key: 'metadata.location', label: 'Localisation' },
        { key: 'metadata.verified', label: 'Vérifié' }
      ],
      keywords: [
        { key: 'id', label: 'ID', required: true },
        { key: 'term', label: 'Terme', required: true },
        { key: 'mentions', label: 'Mentions' },
        { key: 'status', label: 'Statut' },
        { key: 'sentiment.positive', label: 'Sentiment Positif' },
        { key: 'sentiment.neutral', label: 'Sentiment Neutre' },
        { key: 'sentiment.negative', label: 'Sentiment Négatif' },
        { key: 'trend', label: 'Tendance 7j' },
        { key: 'createdAt', label: 'Date de création' }
      ],
      analytics: [
        { key: 'date', label: 'Date', required: true },
        { key: 'mentions', label: 'Mentions' },
        { key: 'sentiment', label: 'Sentiment' },
        { key: 'reach', label: 'Portée' },
        { key: 'engagement', label: 'Engagement' },
        { key: 'sources', label: 'Sources actives' },
        { key: 'alerts', label: 'Alertes générées' }
      ],
      network: [
        { key: 'node_id', label: 'ID Nœud', required: true },
        { key: 'label', label: 'Libellé', required: true },
        { key: 'type', label: 'Type' },
        { key: 'influence', label: 'Influence' },
        { key: 'connections', label: 'Connexions' },
        { key: 'sentiment', label: 'Sentiment' },
        { key: 'verified', label: 'Vérifié' }
      ],
      geographic: [
        { key: 'province', label: 'Province', required: true },
        { key: 'latitude', label: 'Latitude' },
        { key: 'longitude', label: 'Longitude' },
        { key: 'activity', label: 'Activité' },
        { key: 'sentiment', label: 'Sentiment' },
        { key: 'alerts', label: 'Alertes' },
        { key: 'population', label: 'Population' }
      ]
    };
    
    return fieldMappings[dataType] || [];
  };

  const [options, setOptions] = useState<ExportOptions>({
    format: 'csv',
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
      preset: 'week'
    },
    fields: {
      selected: getDefaultFields().filter(f => f.required).map(f => f.key),
      available: getDefaultFields()
    },
    filters: {
      includeResolved: true,
      minPriority: 'low',
      sources: [],
      categories: []
    },
    formatting: {
      includeHeaders: true,
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
      encoding: 'utf-8',
      delimiter: ','
    },
    delivery: {
      method: 'download'
    }
  });

  if (!isOpen) return null;

  const handlePresetChange = (preset: string) => {
    const now = new Date();
    let start = new Date();
    
    switch (preset) {
      case 'today':
        start = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'quarter':
        start = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        break;
      case 'year':
        start = new Date(now.getFullYear(), 0, 1);
        break;
    }
    
    setOptions(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        preset: preset as any,
        start: start.toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      }
    }));
  };

  const toggleField = (fieldKey: string) => {
    const field = options.fields.available.find(f => f.key === fieldKey);
    if (field?.required) return; // Can't deselect required fields
    
    setOptions(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        selected: prev.fields.selected.includes(fieldKey)
          ? prev.fields.selected.filter(k => k !== fieldKey)
          : [...prev.fields.selected, fieldKey]
      }
    }));
  };

  const handleExport = () => {
    onExport(options);
    onClose();
  };

  const tabs = [
    { id: 'format', label: 'Format & Période', icon: DocumentArrowDownIcon },
    { id: 'data', label: 'Données', icon: Cog6ToothIcon },
    { id: 'filters', label: 'Filtres', icon: DocumentArrowDownIcon },
    { id: 'delivery', label: 'Livraison', icon: CalendarIcon }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                {title}
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
              <nav className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
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
            {/* Format & Period */}
            {activeTab === 'format' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Format d'export
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { value: 'csv', label: 'CSV', description: 'Comma-separated values' },
                      { value: 'json', label: 'JSON', description: 'JavaScript Object Notation' },
                      { value: 'xlsx', label: 'Excel', description: 'Microsoft Excel format' },
                      { value: 'pdf', label: 'PDF', description: 'Portable Document Format' }
                    ].map((format) => (
                      <button
                        key={format.value}
                        onClick={() => setOptions(prev => ({ ...prev, format: format.value as any }))}
                        className={`p-3 border-2 rounded-lg text-center transition-colors ${
                          options.format === format.value
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="font-medium">{format.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{format.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Période
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4">
                    {[
                      { value: 'today', label: 'Aujourd\'hui' },
                      { value: 'week', label: '7 jours' },
                      { value: 'month', label: '1 mois' },
                      { value: 'quarter', label: '3 mois' },
                      { value: 'year', label: '1 an' },
                      { value: 'custom', label: 'Personnalisé' }
                    ].map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => handlePresetChange(preset.value)}
                        className={`px-3 py-2 text-sm rounded transition-colors ${
                          options.dateRange.preset === preset.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Date de début</label>
                      <input
                        type="date"
                        value={options.dateRange.start}
                        onChange={(e) => setOptions(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, start: e.target.value, preset: 'custom' }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Date de fin</label>
                      <input
                        type="date"
                        value={options.dateRange.end}
                        onChange={(e) => setOptions(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, end: e.target.value, preset: 'custom' }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {options.format === 'csv' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Options de formatage CSV
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Délimiteur</label>
                        <select
                          value={options.formatting.delimiter}
                          onChange={(e) => setOptions(prev => ({
                            ...prev,
                            formatting: { ...prev.formatting, delimiter: e.target.value as any }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value=",">,Virgule</option>
                          <option value=";">Point-virgule</option>
                          <option value="\t">Tabulation</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Encodage</label>
                        <select
                          value={options.formatting.encoding}
                          onChange={(e) => setOptions(prev => ({
                            ...prev,
                            formatting: { ...prev.formatting, encoding: e.target.value as any }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="utf-8">UTF-8</option>
                          <option value="iso-8859-1">ISO-8859-1</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="includeHeaders"
                          checked={options.formatting.includeHeaders}
                          onChange={(e) => setOptions(prev => ({
                            ...prev,
                            formatting: { ...prev.formatting, includeHeaders: e.target.checked }
                          }))}
                          className="mr-2"
                        />
                        <label htmlFor="includeHeaders" className="text-sm text-gray-700 dark:text-gray-300">
                          Inclure les en-têtes
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Data Selection */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Champs à exporter
                  </label>
                  <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <div className="space-y-2">
                      {options.fields.available.map((field) => (
                        <div key={field.key} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`field-${field.key}`}
                              checked={options.fields.selected.includes(field.key)}
                              onChange={() => toggleField(field.key)}
                              disabled={field.required}
                              className="mr-3"
                            />
                            <label
                              htmlFor={`field-${field.key}`}
                              className={`text-sm ${
                                field.required
                                  ? 'font-medium text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            {field.key}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {options.fields.selected.length} champs sélectionnés
                  </p>
                </div>
              </div>
            )}

            {/* Filters */}
            {activeTab === 'filters' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Inclure les éléments résolus
                  </label>
                  <button
                    onClick={() => setOptions(prev => ({
                      ...prev,
                      filters: { ...prev.filters, includeResolved: !prev.filters.includeResolved }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      options.filters.includeResolved ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      options.filters.includeResolved ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priorité minimale
                  </label>
                  <select
                    value={options.filters.minPriority}
                    onChange={(e) => setOptions(prev => ({
                      ...prev,
                      filters: { ...prev.filters, minPriority: e.target.value as any }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                    <option value="critical">Critique</option>
                  </select>
                </div>
              </div>
            )}

            {/* Delivery */}
            {activeTab === 'delivery' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Méthode de livraison
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'download', label: 'Téléchargement direct', description: 'Télécharger immédiatement' },
                      { value: 'email', label: 'Email', description: 'Envoyer par email' },
                      { value: 'webhook', label: 'Webhook', description: 'Envoyer à une URL' }
                    ].map((method) => (
                      <div key={method.value} className="flex items-start">
                        <input
                          type="radio"
                          id={`delivery-${method.value}`}
                          name="delivery"
                          checked={options.delivery.method === method.value}
                          onChange={() => setOptions(prev => ({
                            ...prev,
                            delivery: { ...prev.delivery, method: method.value as any }
                          }))}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <label htmlFor={`delivery-${method.value}`} className="font-medium text-gray-900 dark:text-white">
                            {method.label}
                          </label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {options.delivery.method === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      value={options.delivery.email || ''}
                      onChange={(e) => setOptions(prev => ({
                        ...prev,
                        delivery: { ...prev.delivery, email: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="email@example.com"
                    />
                  </div>
                )}

                {options.delivery.method === 'webhook' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      URL du webhook
                    </label>
                    <input
                      type="url"
                      value={options.delivery.webhook || ''}
                      onChange={(e) => setOptions(prev => ({
                        ...prev,
                        delivery: { ...prev.delivery, webhook: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="https://api.example.com/webhook"
                    />
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Export planifié
                    </label>
                    <button
                      onClick={() => setOptions(prev => ({
                        ...prev,
                        delivery: {
                          ...prev.delivery,
                          schedule: {
                            enabled: !prev.delivery.schedule?.enabled,
                            frequency: 'daily',
                            time: '09:00'
                          }
                        }
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        options.delivery.schedule?.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        options.delivery.schedule?.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {options.delivery.schedule?.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Fréquence</label>
                        <select
                          value={options.delivery.schedule.frequency}
                          onChange={(e) => setOptions(prev => ({
                            ...prev,
                            delivery: {
                              ...prev.delivery,
                              schedule: { ...prev.delivery.schedule!, frequency: e.target.value as any }
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="daily">Quotidien</option>
                          <option value="weekly">Hebdomadaire</option>
                          <option value="monthly">Mensuel</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Heure</label>
                        <input
                          type="time"
                          value={options.delivery.schedule.time}
                          onChange={(e) => setOptions(prev => ({
                            ...prev,
                            delivery: {
                              ...prev.delivery,
                              schedule: { ...prev.delivery.schedule!, time: e.target.value }
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Format: {options.format.toUpperCase()} • {options.fields.selected.length} champs • {options.delivery.method}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500"
              >
                Annuler
              </button>
              <button
                onClick={handleExport}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                {options.delivery.method === 'download' ? 'Télécharger' : 'Exporter'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}