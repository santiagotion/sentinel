import React, { useState } from 'react';
import {
  XIcon,
  PlusIcon,
  TargetIcon,
  Globe,
  CalendarIcon,
  DollarSignIcon,
  UsersIcon,
  HashIcon,
  CheckCircleIcon
} from 'lucide-react';
import type { CounterCampaign, CampaignType, Platform } from '../../types/CounterAction';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: Partial<CounterCampaign>) => void;
}

export const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'fact_check' as CampaignType,
    platforms: [] as Platform[],
    startDate: '',
    endDate: '',
    budget: 0,
    targetLocations: [] as string[],
    targetAgeGroups: [] as string[],
    keywords: [] as string[],
    newKeyword: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  if (!isOpen) return null;

  const handlePlatformToggle = (platform: Platform) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleLocationToggle = (location: string) => {
    setFormData(prev => ({
      ...prev,
      targetLocations: prev.targetLocations.includes(location)
        ? prev.targetLocations.filter(l => l !== location)
        : [...prev.targetLocations, location]
    }));
  };

  const handleAgeGroupToggle = (ageGroup: string) => {
    setFormData(prev => ({
      ...prev,
      targetAgeGroups: prev.targetAgeGroups.includes(ageGroup)
        ? prev.targetAgeGroups.filter(a => a !== ageGroup)
        : [...prev.targetAgeGroups, ageGroup]
    }));
  };

  const addKeyword = () => {
    if (formData.newKeyword.trim() && !formData.keywords.includes(formData.newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, prev.newKeyword.trim()],
        newKeyword: ''
      }));
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleSubmit = () => {
    const campaign: Partial<CounterCampaign> = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      platforms: formData.platforms,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: 'draft',
      creator: {
        id: 'current-user',
        name: 'Current User',
        role: 'Campaign Manager'
      },
      approval: {
        required: formData.budget > 10000
      },
      targeting: {
        demographics: {
          ageGroups: formData.targetAgeGroups,
          locations: formData.targetLocations,
          languages: ['fr']
        },
        behavioral: {
          engagedWithMisinformation: formData.type === 'fact_check',
          followsInfluencers: [],
          interests: ['politics', 'news']
        },
        reach: {
          estimated: Math.floor(formData.budget * 10),
          maxBudget: formData.budget
        }
      },
      content: {
        messages: [],
        media: [],
        hashtags: formData.keywords,
        mentions: [],
        factCheckSources: []
      },
      schedule: {
        type: 'scheduled',
        startTime: formData.startDate,
        endTime: formData.endDate,
        frequency: 'daily'
      }
    };

    onSubmit(campaign);
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      type: 'fact_check',
      platforms: [],
      startDate: '',
      endDate: '',
      budget: 0,
      targetLocations: [],
      targetAgeGroups: [],
      keywords: [],
      newKeyword: ''
    });
    setCurrentStep(1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.title.trim() && formData.description.trim();
      case 2:
        return formData.platforms.length > 0;
      case 3:
        return formData.targetLocations.length > 0;
      case 4:
        return formData.startDate && formData.budget > 0;
      default:
        return false;
    }
  };

  const platforms: { id: Platform; label: string; icon: string }[] = [
    { id: 'twitter', label: 'Twitter', icon: '🐦' },
    { id: 'facebook', label: 'Facebook', icon: '📘' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { id: 'telegram', label: 'Telegram', icon: '✈️' },
    { id: 'instagram', label: 'Instagram', icon: '📷' },
    { id: 'tiktok', label: 'TikTok', icon: '🎵' }
  ];

  const locations = ['Kinshasa', 'Lubumbashi', 'Goma', 'Kisangani', 'Kananga', 'Bukavu', 'Mbuji-Mayi'];
  const ageGroups = ['18-25', '26-35', '36-50', '51-65', '65+'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
              <PlusIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Nouvelle Campagne
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Étape {currentStep} sur {totalSteps}
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

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Informations de base
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Titre de la campagne
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Ex: Fact-check élections 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Décrivez l'objectif de la campagne..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type de campagne
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as CampaignType }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="fact_check">Fact-check</option>
                  <option value="educational">Éducation</option>
                  <option value="counter_narrative">Contre-narratif</option>
                  <option value="awareness">Sensibilisation</option>
                  <option value="community_engagement">Engagement communautaire</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Platforms */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Plateformes cibles
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Sélectionnez les plateformes où vous voulez diffuser votre campagne.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.platforms.includes(platform.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{platform.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {platform.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Targeting */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Ciblage démographique
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Zones géographiques
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => handleLocationToggle(location)}
                      className={`p-3 text-sm border rounded-lg transition-all ${
                        formData.targetLocations.includes(location)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Groupes d'âge
                </label>
                <div className="flex flex-wrap gap-2">
                  {ageGroups.map((ageGroup) => (
                    <button
                      key={ageGroup}
                      onClick={() => handleAgeGroupToggle(ageGroup)}
                      className={`px-3 py-2 text-sm border rounded-lg transition-all ${
                        formData.targetAgeGroups.includes(ageGroup)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {ageGroup} ans
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mots-clés de ciblage
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={formData.newKeyword}
                    onChange={(e) => setFormData(prev => ({ ...prev, newKeyword: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Ajouter un mot-clé..."
                  />
                  <button
                    onClick={addKeyword}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm flex items-center gap-2"
                    >
                      #{keyword}
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <XIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Schedule & Budget */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Planning et budget
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date de début
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date de fin
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget maximum (USD)
                </label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="1000"
                />
                {formData.budget > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Portée estimée: {(formData.budget * 10).toLocaleString()} personnes
                  </p>
                )}
              </div>

              {formData.budget > 10000 && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Approbation requise
                    </span>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                    Cette campagne nécessitera une approbation managériale en raison du budget élevé.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Annuler
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Créer la campagne
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};