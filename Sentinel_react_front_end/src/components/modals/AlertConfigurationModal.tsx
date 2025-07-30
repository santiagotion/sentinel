import React, { useState } from 'react';
import { XMarkIcon, ExclamationTriangleIcon, ClockIcon, UserIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface AlertConfiguration {
  name: string;
  description: string;
  type: 'keyword' | 'geographic' | 'sentiment' | 'network' | 'volume';
  priority: 'low' | 'medium' | 'high' | 'critical';
  triggerConditions: {
    keywords: string[];
    sentiment: { threshold: number; operator: 'above' | 'below' };
    volume: { threshold: number; timeframe: number; operator: 'increase' | 'decrease' };
    geographic: string[];
    sources: string[];
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    webhook?: string;
    recipients: string[];
  };
  automation: {
    autoAssign: boolean;
    assignee?: string;
    autoEscalate: boolean;
    escalationTime?: number; // minutes
    autoResolve: boolean;
    resolveConditions?: string;
  };
  advanced: {
    scheduling: {
      enabled: boolean;
      activeHours?: { start: string; end: string };
      activeDays?: number[]; // 0-6, Sunday-Saturday
    };
    throttling: {
      enabled: boolean;
      maxAlertsPerHour?: number;
    };
    customFilters: string;
  };
}

interface AlertConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: AlertConfiguration) => void;
  existingConfig?: AlertConfiguration;
  alertType?: AlertConfiguration['type'];
}

export function AlertConfigurationModal({
  isOpen,
  onClose,
  onSave,
  existingConfig,
  alertType = 'keyword'
}: AlertConfigurationModalProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'conditions' | 'notifications' | 'automation' | 'advanced'>('basic');
  const [config, setConfig] = useState<AlertConfiguration>(
    existingConfig || {
      name: '',
      description: '',
      type: alertType,
      priority: 'medium',
      triggerConditions: {
        keywords: [],
        sentiment: { threshold: -0.5, operator: 'below' },
        volume: { threshold: 200, timeframe: 60, operator: 'increase' },
        geographic: [],
        sources: []
      },
      notifications: {
        email: true,
        sms: false,
        push: true,
        recipients: []
      },
      automation: {
        autoAssign: false,
        autoEscalate: false,
        autoResolve: false
      },
      advanced: {
        scheduling: { enabled: false },
        throttling: { enabled: false },
        customFilters: ''
      }
    }
  );

  const [newKeyword, setNewKeyword] = useState('');
  const [newRecipient, setNewRecipient] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!config.name.trim()) {
      alert('Le nom de l\'alerte est requis');
      return;
    }

    onSave(config);
    onClose();
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !config.triggerConditions.keywords.includes(newKeyword.trim())) {
      setConfig(prev => ({
        ...prev,
        triggerConditions: {
          ...prev.triggerConditions,
          keywords: [...prev.triggerConditions.keywords, newKeyword.trim()]
        }
      }));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setConfig(prev => ({
      ...prev,
      triggerConditions: {
        ...prev.triggerConditions,
        keywords: prev.triggerConditions.keywords.filter(k => k !== keyword)
      }
    }));
  };

  const addRecipient = () => {
    if (newRecipient.trim() && !config.notifications.recipients.includes(newRecipient.trim())) {
      setConfig(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          recipients: [...prev.notifications.recipients, newRecipient.trim()]
        }
      }));
      setNewRecipient('');
    }
  };

  const removeRecipient = (recipient: string) => {
    setConfig(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        recipients: prev.notifications.recipients.filter(r => r !== recipient)
      }
    }));
  };

  const tabs = [
    { id: 'basic', label: 'Informations de base', icon: ExclamationTriangleIcon },
    { id: 'conditions', label: 'Conditions de déclenchement', icon: ClockIcon },
    { id: 'notifications', label: 'Notifications', icon: UserIcon },
    { id: 'automation', label: 'Automatisation', icon: ClockIcon },
    { id: 'advanced', label: 'Avancé', icon: MapPinIcon }
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
                Configuration d'Alerte
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
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-96 overflow-y-auto">
            {/* Basic Information */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom de l'alerte *
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Surveillance sécurité Nord-Kivu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={config.description}
                    onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Décrivez l'objectif de cette alerte..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type d'alerte
                    </label>
                    <select
                      value={config.type}
                      onChange={(e) => setConfig(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="keyword">Mot-clé</option>
                      <option value="geographic">Géographique</option>
                      <option value="sentiment">Sentiment</option>
                      <option value="network">Réseau</option>
                      <option value="volume">Volume</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priorité
                    </label>
                    <select
                      value={config.priority}
                      onChange={(e) => setConfig(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                      <option value="critical">Critique</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Trigger Conditions */}
            {activeTab === 'conditions' && (
              <div className="space-y-6">
                {/* Keywords */}
                {(config.type === 'keyword' || config.type === 'sentiment') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mots-clés surveillés
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Ajouter un mot-clé..."
                      />
                      <button
                        onClick={addKeyword}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Ajouter
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {config.triggerConditions.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                        >
                          {keyword}
                          <button
                            onClick={() => removeKeyword(keyword)}
                            className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sentiment Threshold */}
                {config.type === 'sentiment' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Seuil de sentiment
                    </label>
                    <div className="flex items-center space-x-4">
                      <select
                        value={config.triggerConditions.sentiment.operator}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          triggerConditions: {
                            ...prev.triggerConditions,
                            sentiment: { ...prev.triggerConditions.sentiment, operator: e.target.value as any }
                          }
                        }))}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="below">En dessous de</option>
                        <option value="above">Au dessus de</option>
                      </select>
                      <input
                        type="number"
                        min="-1"
                        max="1"
                        step="0.1"
                        value={config.triggerConditions.sentiment.threshold}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          triggerConditions: {
                            ...prev.triggerConditions,
                            sentiment: { ...prev.triggerConditions.sentiment, threshold: parseFloat(e.target.value) }
                          }
                        }))}
                        className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">(-1 = très négatif, +1 = très positif)</span>
                    </div>
                  </div>
                )}

                {/* Volume Threshold */}
                {config.type === 'volume' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Seuil de volume
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <select
                          value={config.triggerConditions.volume.operator}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            triggerConditions: {
                              ...prev.triggerConditions,
                              volume: { ...prev.triggerConditions.volume, operator: e.target.value as any }
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="increase">Augmentation de</option>
                          <option value="decrease">Diminution de</option>
                        </select>
                      </div>
                      <div>
                        <input
                          type="number"
                          min="0"
                          value={config.triggerConditions.volume.threshold}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            triggerConditions: {
                              ...prev.triggerConditions,
                              volume: { ...prev.triggerConditions.volume, threshold: parseInt(e.target.value) }
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="200"
                        />
                        <span className="text-xs text-gray-500">%</span>
                      </div>
                      <div>
                        <input
                          type="number"
                          min="1"
                          value={config.triggerConditions.volume.timeframe}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            triggerConditions: {
                              ...prev.triggerConditions,
                              volume: { ...prev.triggerConditions.volume, timeframe: parseInt(e.target.value) }
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="60"
                        />
                        <span className="text-xs text-gray-500">minutes</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Canaux de notification
                  </label>
                  <div className="space-y-3">
                    {[
                      { key: 'email', label: 'Email', description: 'Notification par email' },
                      { key: 'sms', label: 'SMS', description: 'Notification par SMS (si configuré)' },
                      { key: 'push', label: 'Push', description: 'Notification push dans l\'application' }
                    ].map((channel) => (
                      <div key={channel.key} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{channel.label}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{channel.description}</div>
                        </div>
                        <button
                          onClick={() => setConfig(prev => ({
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              [channel.key]: !prev.notifications[channel.key as keyof typeof prev.notifications]
                            }
                          }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            config.notifications[channel.key as keyof typeof config.notifications] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            config.notifications[channel.key as keyof typeof config.notifications] ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Destinataires
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="email"
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="email@example.com"
                    />
                    <button
                      onClick={addRecipient}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Ajouter
                    </button>
                  </div>
                  <div className="space-y-2">
                    {config.notifications.recipients.map((recipient) => (
                      <div key={recipient} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded">
                        <span className="text-sm">{recipient}</span>
                        <button
                          onClick={() => removeRecipient(recipient)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Webhook (optionnel)
                  </label>
                  <input
                    type="url"
                    value={config.notifications.webhook || ''}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, webhook: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="https://api.example.com/webhook"
                  />
                </div>
              </div>
            )}

            {/* Automation */}
            {activeTab === 'automation' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Attribution automatique</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Assigner automatiquement l'alerte à un utilisateur</div>
                  </div>
                  <button
                    onClick={() => setConfig(prev => ({
                      ...prev,
                      automation: { ...prev.automation, autoAssign: !prev.automation.autoAssign }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      config.automation.autoAssign ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.automation.autoAssign ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {config.automation.autoAssign && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Assigné à
                    </label>
                    <select
                      value={config.automation.assignee || ''}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        automation: { ...prev.automation, assignee: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Sélectionner un utilisateur</option>
                      <option value="team-security">Équipe Sécurité</option>
                      <option value="team-analysis">Équipe Analyse</option>
                      <option value="team-communication">Équipe Communication</option>
                      <option value="coordinator">Coordinateur</option>
                    </select>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Escalade automatique</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Escalader si non traitée dans un délai</div>
                  </div>
                  <button
                    onClick={() => setConfig(prev => ({
                      ...prev,
                      automation: { ...prev.automation, autoEscalate: !prev.automation.autoEscalate }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      config.automation.autoEscalate ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.automation.autoEscalate ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {config.automation.autoEscalate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Délai d'escalade (minutes)
                    </label>
                    <input
                      type="number"
                      min="5"
                      value={config.automation.escalationTime || 60}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        automation: { ...prev.automation, escalationTime: parseInt(e.target.value) }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Advanced */}
            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Planification</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Limiter l'alerte à certaines heures/jours</div>
                    </div>
                    <button
                      onClick={() => setConfig(prev => ({
                        ...prev,
                        advanced: {
                          ...prev.advanced,
                          scheduling: { ...prev.advanced.scheduling, enabled: !prev.advanced.scheduling.enabled }
                        }
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        config.advanced.scheduling.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        config.advanced.scheduling.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {config.advanced.scheduling.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Heure de début
                        </label>
                        <input
                          type="time"
                          value={config.advanced.scheduling.activeHours?.start || '09:00'}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            advanced: {
                              ...prev.advanced,
                              scheduling: {
                                ...prev.advanced.scheduling,
                                activeHours: {
                                  ...prev.advanced.scheduling.activeHours,
                                  start: e.target.value,
                                  end: prev.advanced.scheduling.activeHours?.end || '17:00'
                                }
                              }
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Heure de fin
                        </label>
                        <input
                          type="time"
                          value={config.advanced.scheduling.activeHours?.end || '17:00'}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            advanced: {
                              ...prev.advanced,
                              scheduling: {
                                ...prev.advanced.scheduling,
                                activeHours: {
                                  start: prev.advanced.scheduling.activeHours?.start || '09:00',
                                  end: e.target.value
                                }
                              }
                            }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Limitation</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Limiter le nombre d'alertes par heure</div>
                    </div>
                    <button
                      onClick={() => setConfig(prev => ({
                        ...prev,
                        advanced: {
                          ...prev.advanced,
                          throttling: { ...prev.advanced.throttling, enabled: !prev.advanced.throttling.enabled }
                        }
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        config.advanced.throttling.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        config.advanced.throttling.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>

                  {config.advanced.throttling.enabled && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Maximum d'alertes par heure
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={config.advanced.throttling.maxAlertsPerHour || 10}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          advanced: {
                            ...prev.advanced,
                            throttling: { ...prev.advanced.throttling, maxAlertsPerHour: parseInt(e.target.value) }
                          }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Filtres personnalisés (JSON)
                  </label>
                  <textarea
                    value={config.advanced.customFilters}
                    onChange={(e) => setConfig(prev => ({
                      ...prev,
                      advanced: { ...prev.advanced, customFilters: e.target.value }
                    }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                    placeholder='{"source": ["facebook", "twitter"], "verified": true}'
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Configuration JSON avancée pour filtres personnalisés
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              * Champs obligatoires
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                {existingConfig ? 'Mettre à jour' : 'Créer l\'alerte'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}