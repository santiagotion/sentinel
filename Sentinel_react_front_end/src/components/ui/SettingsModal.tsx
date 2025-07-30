import React, { useState } from 'react';
import { 
  Settings, Monitor, Bell, Map, Database, Shield, Sliders, 
  Download, Upload, RotateCcw, Save, Check, X, Info,
  Sun, Moon, Globe, Volume2, VolumeX, Eye, EyeOff
} from 'lucide-react';
import { Modal } from './Modal';
import { useSettings, UserSettings } from '../../contexts/SettingsContext';
import { useNotifications } from '../../contexts/NotificationContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSettings, resetSettings, exportSettings, importSettings } = useSettings();
  const { success, error } = useNotifications();
  const [activeTab, setActiveTab] = useState<keyof UserSettings>('dashboard');
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'dashboard' as const, label: 'Tableau de Bord', icon: Monitor },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'map' as const, label: 'Carte', icon: Map },
    { id: 'data' as const, label: 'Données', icon: Database },
    { id: 'privacy' as const, label: 'Confidentialité', icon: Shield },
    { id: 'advanced' as const, label: 'Avancé', icon: Sliders }
  ];

  const handleSettingUpdate = <K extends keyof UserSettings>(
    category: K,
    updates: Partial<UserSettings[K]>
  ) => {
    updateSettings(category, updates);
    setHasChanges(true);
  };

  const handleExport = () => {
    try {
      const settingsJson = exportSettings();
      const blob = new Blob([settingsJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sentinel_settings_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      success('Paramètres exportés', 'Les paramètres ont été exportés avec succès');
    } catch (err) {
      error('Erreur d\'exportation', 'Impossible d\'exporter les paramètres');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settingsJson = e.target?.result as string;
        const imported = importSettings(settingsJson);
        if (imported) {
          success('Paramètres importés', 'Les paramètres ont été importés avec succès');
          setHasChanges(false);
        } else {
          error('Erreur d\'importation', 'Le fichier de paramètres n\'est pas valide');
        }
      } catch (err) {
        error('Erreur d\'importation', 'Impossible de lire le fichier de paramètres');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      resetSettings();
      setHasChanges(false);
      success('Paramètres réinitialisés', 'Tous les paramètres ont été remis aux valeurs par défaut');
    }
  };

  const handleSave = () => {
    setHasChanges(false);
    success('Paramètres sauvegardés', 'Vos modifications ont été sauvegardées');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Paramètres" size="xl">
      <div className="flex h-[70vh]">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <div className="flex space-x-2">
              <button
                onClick={handleExport}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
              <label className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Importer</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-800/30 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Dashboard Settings */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Tableau de Bord
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Auto Refresh */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Actualisation automatique
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Actualiser les données automatiquement
                        </p>
                      </div>
                      <button
                        onClick={() => handleSettingUpdate('dashboard', { 
                          autoRefresh: !settings.dashboard.autoRefresh 
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.dashboard.autoRefresh ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.dashboard.autoRefresh ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Refresh Interval */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Intervalle d'actualisation (secondes)
                      </label>
                      <select
                        value={settings.dashboard.refreshInterval}
                        onChange={(e) => handleSettingUpdate('dashboard', { 
                          refreshInterval: Number(e.target.value) 
                        })}
                        disabled={!settings.dashboard.autoRefresh}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50"
                      >
                        <option value={30}>30 secondes</option>
                        <option value={60}>1 minute</option>
                        <option value={300}>5 minutes</option>
                        <option value={600}>10 minutes</option>
                        <option value={1800}>30 minutes</option>
                      </select>
                    </div>

                    {/* Default View */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Vue par défaut
                      </label>
                      <select
                        value={settings.dashboard.defaultView}
                        onChange={(e) => handleSettingUpdate('dashboard', { 
                          defaultView: e.target.value as any 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="strategic">Tableau Stratégique</option>
                        <option value="analytics">Analyse Intelligence</option>
                        <option value="opinion">Analyse d'Opinion</option>
                        <option value="timeline">Timeline & Tendances</option>
                        <option value="network">Analyse Réseau</option>
                        <option value="rawdata">Données Brutes</option>
                        <option value="alerts">Centre d'Alertes</option>
                      </select>
                    </div>

                    {/* Compact Mode */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Mode compact
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Interface plus condensée
                        </p>
                      </div>
                      <button
                        onClick={() => handleSettingUpdate('dashboard', { 
                          compactMode: !settings.dashboard.compactMode 
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.dashboard.compactMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.dashboard.compactMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Show Metrics */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Afficher les métriques
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Afficher les indicateurs de performance
                        </p>
                      </div>
                      <button
                        onClick={() => handleSettingUpdate('dashboard', { 
                          showMetrics: !settings.dashboard.showMetrics 
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.dashboard.showMetrics ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.dashboard.showMetrics ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Notifications
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Enable Notifications */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Activer les notifications
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Recevoir des notifications système
                        </p>
                      </div>
                      <button
                        onClick={() => handleSettingUpdate('notifications', { 
                          enabled: !settings.notifications.enabled 
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.notifications.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.notifications.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Sound */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {settings.notifications.sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                        <div>
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Sons de notification
                          </label>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Émettre un son pour les notifications
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSettingUpdate('notifications', { 
                          sound: !settings.notifications.sound 
                        })}
                        disabled={!settings.notifications.enabled}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${
                          settings.notifications.sound ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.notifications.sound ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Desktop Notifications */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Notifications bureau
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Afficher les notifications système
                        </p>
                      </div>
                      <button
                        onClick={() => handleSettingUpdate('notifications', { 
                          desktop: !settings.notifications.desktop 
                        })}
                        disabled={!settings.notifications.enabled}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${
                          settings.notifications.desktop ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.notifications.desktop ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Severity Levels */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Niveaux de sévérité
                      </label>
                      <div className="space-y-2">
                        {['critical', 'high', 'medium', 'low'].map((level) => (
                          <label key={level} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={settings.notifications.severity.includes(level as any)}
                              onChange={(e) => {
                                const newSeverity = e.target.checked
                                  ? [...settings.notifications.severity, level as any]
                                  : settings.notifications.severity.filter(s => s !== level);
                                handleSettingUpdate('notifications', { severity: newSeverity });
                              }}
                              disabled={!settings.notifications.enabled}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                              {level === 'critical' ? 'Critique' :
                               level === 'high' ? 'Élevé' :
                               level === 'medium' ? 'Moyen' : 'Faible'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Map Settings */}
            {activeTab === 'map' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Paramètres de la Carte
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Map Style */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Style de carte
                      </label>
                      <select
                        value={settings.map?.basemap || 'satellite'}
                        onChange={(e) => handleSettingUpdate('map', { 
                          basemap: e.target.value as any 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="satellite">Satellite</option>
                        <option value="streets">Rues</option>
                        <option value="light">Clair</option>
                        <option value="dark">Sombre</option>
                        <option value="outdoors">Extérieur</option>
                      </select>
                    </div>

                    {/* Default Center */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Centre par défaut
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Latitude</label>
                          <input
                            type="number"
                            step="0.000001"
                            value={settings.map?.defaultCenter?.[0] || -4.0383}
                            onChange={(e) => handleSettingUpdate('map', { 
                              defaultCenter: [
                                parseFloat(e.target.value) || -4.0383,
                                settings.map?.defaultCenter?.[1] || 21.7587
                              ]
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="-4.0383"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Longitude</label>
                          <input
                            type="number"
                            step="0.000001"
                            value={settings.map?.defaultCenter?.[1] || 21.7587}
                            onChange={(e) => handleSettingUpdate('map', { 
                              defaultCenter: [
                                settings.map?.defaultCenter?.[0] || -4.0383,
                                parseFloat(e.target.value) || 21.7587
                              ]
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="21.7587"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Coordonnées par défaut: Kinshasa, RDC
                      </p>
                    </div>

                    {/* Default Zoom */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Zoom par défaut: {settings.map?.defaultZoom || 6}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="18"
                        value={settings.map?.defaultZoom || 6}
                        onChange={(e) => handleSettingUpdate('map', { 
                          defaultZoom: parseInt(e.target.value) 
                        })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>Pays</span>
                        <span>Région</span>
                        <span>Ville</span>
                        <span>Quartier</span>
                      </div>
                    </div>

                    {/* Show Clusters */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Regroupement des marqueurs
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Grouper les marqueurs proches automatiquement
                        </p>
                      </div>
                      <button
                        onClick={() => handleSettingUpdate('map', { 
                          clusterMarkers: !settings.map?.clusterMarkers 
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.map?.clusterMarkers ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.map?.clusterMarkers ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Heatmap */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Carte de chaleur
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Afficher la densité d'activité par zones
                        </p>
                      </div>
                      <button
                        onClick={() => handleSettingUpdate('map', { 
                          showLabels: !settings.map?.showLabels 
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.map?.showLabels ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.map?.showLabels ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Real-time Updates */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Mises à jour temps réel
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Actualiser la carte automatiquement
                        </p>
                      </div>
                      <button
                        onClick={() => handleSettingUpdate('dashboard', { 
                          autoRefresh: !settings.dashboard?.autoRefresh 
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.dashboard?.autoRefresh ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.dashboard?.autoRefresh ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Settings */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Gestion des Données
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Data Retention */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Rétention des données
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Durée de conservation des alertes
                          </label>
                          <select
                            value={settings.data?.retentionPeriod || 365}
                            onChange={(e) => handleSettingUpdate('data', { 
                              retentionPeriod: parseInt(e.target.value)
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value={30}>30 jours</option>
                            <option value={90}>3 mois</option>
                            <option value={180}>6 mois</option>
                            <option value={365}>1 an</option>
                            <option value={730}>2 ans</option>
                            <option value={-1}>Illimitée</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Durée de conservation des données brutes
                          </label>
                          <select
                            value={settings.data?.retentionPeriod || 90}
                            onChange={(e) => handleSettingUpdate('data', { 
                              retentionPeriod: parseInt(e.target.value)
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value={7}>7 jours</option>
                            <option value={30}>30 jours</option>
                            <option value={90}>3 mois</option>
                            <option value={180}>6 mois</option>
                            <option value={365}>1 an</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Durée de conservation des logs
                          </label>
                          <select
                            value={settings.data?.retentionPeriod || 30}
                            onChange={(e) => handleSettingUpdate('data', { 
                              retentionPeriod: parseInt(e.target.value)
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value={7}>7 jours</option>
                            <option value={30}>30 jours</option>
                            <option value={90}>3 mois</option>
                            <option value={180}>6 mois</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Auto Cleanup */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Nettoyage automatique
                        </label>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Supprimer automatiquement les anciennes données
                        </p>
                      </div>
                      <button
                        onClick={() => handleSettingUpdate('data', { 
                          autoExportEnabled: !settings.data?.autoExportEnabled 
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.data?.autoExportEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.data?.autoExportEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Export Settings */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Paramètres d'exportation
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Format d'export par défaut
                          </label>
                          <select
                            value={settings.data?.exportFormat || 'csv'}
                            onChange={(e) => handleSettingUpdate('data', { 
                              exportFormat: e.target.value as any 
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="csv">CSV</option>
                            <option value="json">JSON</option>
                            <option value="xlsx">Excel</option>
                            <option value="pdf">PDF</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Inclure les métadonnées
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Ajouter timestamp et info système aux exports
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('data', { 
                              includeMetadata: !settings.data?.includeMetadata 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.data?.includeMetadata ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.data?.includeMetadata ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Compression automatique
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Compresser les gros fichiers d'export
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('data', { 
                              compression: !settings.data?.compression 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.data?.compression ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.data?.compression ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Cache Settings */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Cache et performance
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Durée de cache: {settings.data?.cacheTimeout || 300}s
                          </label>
                          <input
                            type="range"
                            min="60"
                            max="3600"
                            step="60"
                            value={settings.data?.cacheTimeout || 300}
                            onChange={(e) => handleSettingUpdate('data', { 
                              cacheTimeout: parseInt(e.target.value) 
                            })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>1min</span>
                            <span>30min</span>
                            <span>1h</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Préchargement des données
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Charger les données en arrière-plan
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('data', { 
                              preloading: !settings.data?.preloading 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.data?.preloading ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.data?.preloading ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Confidentialité et Sécurité
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Data Anonymization */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Anonymisation des données
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Anonymiser les données personnelles
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Masquer automatiquement les informations sensibles
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('privacy', { 
                              anonymizePersonalData: !settings.privacy?.anonymizePersonalData 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.privacy?.anonymizePersonalData ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.privacy?.anonymizePersonalData ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Masquer les localisation précises
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Arrondir les coordonnées géographiques
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('privacy', { 
                              obfuscateLocations: !settings.privacy?.obfuscateLocations 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.privacy?.obfuscateLocations ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.privacy?.obfuscateLocations ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Chiffrement des exports
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Chiffrer automatiquement les fichiers exportés
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('privacy', { 
                              encryptExports: !settings.privacy?.encryptExports 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.privacy?.encryptExports ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.privacy?.encryptExports ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Access Control */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Contrôle d'accès
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Authentification à deux facteurs
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Activer 2FA pour plus de sécurité
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('privacy', { 
                              twoFactorAuth: !settings.privacy?.twoFactorAuth 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.privacy?.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.privacy?.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Durée de session (minutes)
                          </label>
                          <select
                            value={settings.privacy?.sessionTimeout || 480}
                            onChange={(e) => handleSettingUpdate('privacy', { 
                              sessionTimeout: parseInt(e.target.value) 
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value={60}>1 heure</option>
                            <option value={240}>4 heures</option>
                            <option value={480}>8 heures</option>
                            <option value={720}>12 heures</option>
                            <option value={1440}>24 heures</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Connexions simultanées multiples
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Autoriser plusieurs sessions actives
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('privacy', { 
                              allowMultipleSessions: !settings.privacy?.allowMultipleSessions 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.privacy?.allowMultipleSessions ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.privacy?.allowMultipleSessions ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Audit & Logging */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Audit et traçabilité
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Journal d'audit détaillé
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Enregistrer toutes les actions utilisateur
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('privacy', { 
                              detailedAuditLog: !settings.privacy?.detailedAuditLog 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.privacy?.detailedAuditLog ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.privacy?.detailedAuditLog ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Alertes de sécurité
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Notifier les activités suspectes
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('privacy', { 
                              securityAlerts: !settings.privacy?.securityAlerts 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.privacy?.securityAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.privacy?.securityAlerts ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Advanced Settings */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Paramètres Avancés
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Performance */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Performance et optimisation
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Limite de résultats par page
                          </label>
                          <select
                            value={settings.advanced?.pageSize || 50}
                            onChange={(e) => handleSettingUpdate('advanced', { 
                              pageSize: parseInt(e.target.value) 
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={200}>200</option>
                            <option value={500}>500</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Rendu différé
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Optimiser l'affichage des grandes listes
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('advanced', { 
                              lazyLoading: !settings.advanced?.lazyLoading 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.advanced?.lazyLoading ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.advanced?.lazyLoading ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Mise en cache agressive
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Cache plus long pour de meilleures performances
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('advanced', { 
                              aggressiveCaching: !settings.advanced?.aggressiveCaching 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.advanced?.aggressiveCaching ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.advanced?.aggressiveCaching ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Developer */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Options développeur
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Mode debug
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Afficher les logs détaillés dans la console
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('advanced', { 
                              debugMode: !settings.advanced?.debugMode 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.advanced?.debugMode ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.advanced?.debugMode ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              API de développement
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Activer l'accès aux endpoints de dev
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('advanced', { 
                              developerAPI: !settings.advanced?.developerAPI 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.advanced?.developerAPI ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.advanced?.developerAPI ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Fonctionnalités expérimentales
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Activer les nouvelles fonctionnalités en test
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('advanced', { 
                              experimentalFeatures: !settings.advanced?.experimentalFeatures 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.advanced?.experimentalFeatures ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.advanced?.experimentalFeatures ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* API Configuration */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Configuration API
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Timeout des requêtes (secondes)
                          </label>
                          <input
                            type="number"
                            min="5"
                            max="300"
                            value={settings.advanced?.apiTimeout || 30}
                            onChange={(e) => handleSettingUpdate('advanced', { 
                              apiTimeout: parseInt(e.target.value) 
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nombre de tentatives max
                          </label>
                          <select
                            value={settings.advanced?.maxRetries || 3}
                            onChange={(e) => handleSettingUpdate('advanced', { 
                              maxRetries: parseInt(e.target.value) 
                            })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Compression des réponses
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Activer la compression GZIP/Brotli
                            </p>
                          </div>
                          <button
                            onClick={() => handleSettingUpdate('advanced', { 
                              compressionEnabled: !settings.advanced?.compressionEnabled 
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.advanced?.compressionEnabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.advanced?.compressionEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Custom Configuration */}
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                        Configuration personnalisée
                      </h4>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Configuration JSON personnalisée
                        </label>
                        <textarea
                          value={settings.advanced?.customConfig || '{}'}
                          onChange={(e) => handleSettingUpdate('advanced', { 
                            customConfig: e.target.value 
                          })}
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                          placeholder='{\n  "customSetting": "value",\n  "anotherSetting": true\n}'
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Configuration JSON pour des paramètres avancés spécifiques
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      {hasChanges && (
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <Info className="w-4 h-4" />
              <span className="text-sm">Vous avez des modifications non sauvegardées</span>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Sauvegarder</span>
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}