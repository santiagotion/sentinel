import React, { useState } from 'react';
import {
  XIcon,
  PlusIcon,
  BotIcon,
  KeyIcon,
  HashIcon,
  ClockIcon,
  MessageSquareIcon,
  AlertTriangleIcon
} from 'lucide-react';
import type { AutoResponse, Platform, ResponseTrigger, ResponseTemplate } from '../../types/CounterAction';

interface CreateAutoResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (autoResponse: Partial<AutoResponse>) => void;
}

export const CreateAutoResponseModal: React.FC<CreateAutoResponseModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    platforms: [] as Platform[],
    triggers: [] as ResponseTrigger[],
    responses: [] as ResponseTemplate[],
    approvalRequired: false,
    active: true,
    newTriggerType: 'keyword' as ResponseTrigger['type'],
    newTriggerPattern: '',
    newTriggerConfidence: 0.8,
    newTriggerCooldown: 60,
    newResponsePlatform: 'twitter' as Platform,
    newResponseContent: '',
    newResponseTone: 'professional' as ResponseTemplate['tone']
  });

  if (!isOpen) return null;

  const platforms: { id: Platform; label: string; icon: string }[] = [
    { id: 'twitter', label: 'Twitter', icon: '🐦' },
    { id: 'facebook', label: 'Facebook', icon: '📘' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { id: 'telegram', label: 'Telegram', icon: '✈️' },
    { id: 'instagram', label: 'Instagram', icon: '📷' },
    { id: 'all', label: 'Toutes les plateformes', icon: '🌐' }
  ];

  const triggerTypes = [
    { id: 'keyword', label: 'Mot-clé', icon: KeyIcon },
    { id: 'hashtag', label: 'Hashtag', icon: HashIcon },
    { id: 'sentiment', label: 'Sentiment', icon: MessageSquareIcon },
    { id: 'misinformation_detected', label: 'Désinformation détectée', icon: AlertTriangleIcon }
  ];

  const tones = [
    { id: 'professional', label: 'Professionnel' },
    { id: 'educational', label: 'Éducatif' },
    { id: 'empathetic', label: 'Empathique' },
    { id: 'corrective', label: 'Correctif' }
  ];

  const handlePlatformToggle = (platform: Platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const addTrigger = () => {
    if (!formData.newTriggerPattern.trim()) return;

    const newTrigger: ResponseTrigger = {
      id: `trigger-${Date.now()}`,
      type: formData.newTriggerType,
      patterns: [formData.newTriggerPattern.trim()],
      conditions: {
        confidence: formData.newTriggerConfidence,
        reach: 1000
      },
      cooldown: formData.newTriggerCooldown
    };

    setFormData(prev => ({
      ...prev,
      triggers: [...prev.triggers, newTrigger],
      newTriggerPattern: ''
    }));
  };

  const removeTrigger = (id: string) => {
    setFormData(prev => ({
      ...prev,
      triggers: prev.triggers.filter(t => t.id !== id)
    }));
  };

  const addResponse = () => {
    if (!formData.newResponseContent.trim()) return;

    const newResponse: ResponseTemplate = {
      id: `response-${Date.now()}`,
      platform: formData.newResponsePlatform,
      content: formData.newResponseContent.trim(),
      language: 'fr',
      includeFactCheck: true,
      includeSources: true,
      personalized: false,
      tone: formData.newResponseTone
    };

    setFormData(prev => ({
      ...prev,
      responses: [...prev.responses, newResponse],
      newResponseContent: ''
    }));
  };

  const removeResponse = (id: string) => {
    setFormData(prev => ({
      ...prev,
      responses: prev.responses.filter(r => r.id !== id)
    }));
  };

  const handleSubmit = () => {
    const autoResponse: Partial<AutoResponse> = {
      name: formData.name,
      active: formData.active,
      platforms: formData.platforms,
      triggers: formData.triggers,
      responses: formData.responses,
      approval: {
        required: formData.approvalRequired,
        approver: formData.approvalRequired ? 'supervisor' : undefined
      }
    };

    onSubmit(autoResponse);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      platforms: [],
      triggers: [],
      responses: [],
      approvalRequired: false,
      active: true,
      newTriggerType: 'keyword',
      newTriggerPattern: '',
      newTriggerConfidence: 0.8,
      newTriggerCooldown: 60,
      newResponsePlatform: 'twitter',
      newResponseContent: '',
      newResponseTone: 'professional'
    });
  };

  const canSubmit = formData.name.trim() && formData.platforms.length > 0 && 
                   formData.triggers.length > 0 && formData.responses.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
              <BotIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Nouvelle Réponse Automatique
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Configurez une réponse automatisée aux contenus détectés
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Informations de base
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom de la réponse automatique
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Ex: Détection rumeurs électorales"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Activer immédiatement</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.approvalRequired}
                  onChange={(e) => setFormData(prev => ({ ...prev, approvalRequired: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Approbation requise</span>
              </label>
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Plateformes surveillées
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`p-3 border-2 rounded-lg transition-all ${
                    formData.platforms.includes(platform.id)
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{platform.icon}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {platform.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Triggers */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Déclencheurs
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type de déclencheur
                </label>
                <select
                  value={formData.newTriggerType}
                  onChange={(e) => setFormData(prev => ({ ...prev, newTriggerType: e.target.value as ResponseTrigger['type'] }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  {triggerTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pattern de détection
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.newTriggerPattern}
                    onChange={(e) => setFormData(prev => ({ ...prev, newTriggerPattern: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && addTrigger()}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder={formData.newTriggerType === 'hashtag' ? '#FraudeElections' : 'fraude électorale'}
                  />
                  <button
                    onClick={addTrigger}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Seuil de confiance: {(formData.newTriggerConfidence * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.1"
                  value={formData.newTriggerConfidence}
                  onChange={(e) => setFormData(prev => ({ ...prev, newTriggerConfidence: parseFloat(e.target.value) }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Délai entre réponses (minutes)
                </label>
                <input
                  type="number"
                  value={formData.newTriggerCooldown}
                  onChange={(e) => setFormData(prev => ({ ...prev, newTriggerCooldown: parseInt(e.target.value) || 60 }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  min="1"
                />
              </div>
            </div>

            {/* Trigger List */}
            {formData.triggers.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Déclencheurs configurés:</h4>
                {formData.triggers.map((trigger) => (
                  <div key={trigger.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                        {trigger.type}
                      </span>
                      <span className="text-gray-900 dark:text-gray-100">
                        {trigger.patterns.join(', ')}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({(trigger.conditions.confidence! * 100).toFixed(0)}% confidence, {trigger.cooldown}min cooldown)
                      </span>
                    </div>
                    <button
                      onClick={() => removeTrigger(trigger.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Response Templates */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Modèles de réponse
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Plateforme
                </label>
                <select
                  value={formData.newResponsePlatform}
                  onChange={(e) => setFormData(prev => ({ ...prev, newResponsePlatform: e.target.value as Platform }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  {platforms.filter(p => p.id !== 'all').map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ton de la réponse
                </label>
                <select
                  value={formData.newResponseTone}
                  onChange={(e) => setFormData(prev => ({ ...prev, newResponseTone: e.target.value as ResponseTemplate['tone'] }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  {tones.map((tone) => (
                    <option key={tone.id} value={tone.id}>
                      {tone.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contenu de la réponse
              </label>
              <div className="flex gap-2">
                <textarea
                  value={formData.newResponseContent}
                  onChange={(e) => setFormData(prev => ({ ...prev, newResponseContent: e.target.value }))}
                  rows={3}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Rédigez le message de réponse automatique..."
                />
                <button
                  onClick={addResponse}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors self-start"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Response List */}
            {formData.responses.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Réponses configurées:</h4>
                {formData.responses.map((response) => (
                  <div key={response.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded text-xs font-medium">
                            {response.platform}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs">
                            {response.tone}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-gray-100">
                          {response.content}
                        </p>
                      </div>
                      <button
                        onClick={() => removeResponse(response.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {formData.triggers.length} déclencheur(s), {formData.responses.length} réponse(s)
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Créer la réponse automatique
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};