import React, { useState } from 'react';
import { XMarkIcon, ClipboardDocumentListIcon, UserIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface InvestigationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
  assignee?: string;
  completedAt?: Date;
  notes?: string;
  evidence?: Array<{
    id: string;
    type: 'document' | 'screenshot' | 'link' | 'testimony';
    title: string;
    url?: string;
    description?: string;
    uploadedAt: Date;
  }>;
}

interface InvestigationData {
  id: string;
  alertId: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'suspended';
  investigator: string;
  startedAt: Date;
  deadline?: Date;
  steps: InvestigationStep[];
  timeline: Array<{
    id: string;
    action: string;
    description: string;
    author: string;
    timestamp: Date;
  }>;
  findings: string;
  conclusion: string;
  recommendations: string[];
}

interface InvestigationWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  alertId: number;
  alertTitle: string;
  onSave: (investigation: Partial<InvestigationData>) => void;
  existingInvestigation?: InvestigationData;
}

export function InvestigationWorkflowModal({
  isOpen,
  onClose,
  alertId,
  alertTitle,
  onSave,
  existingInvestigation
}: InvestigationWorkflowModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'evidence' | 'findings'>('overview');
  
  const [investigation, setInvestigation] = useState<InvestigationData>(
    existingInvestigation || {
      id: Date.now().toString(),
      alertId,
      title: `Investigation: ${alertTitle}`,
      description: '',
      priority: 'medium',
      status: 'pending',
      investigator: '',
      startedAt: new Date(),
      steps: [
        {
          id: 'initial-assessment',
          title: 'Évaluation initiale',
          description: 'Analyser la nature et la gravité de l\'alerte',
          completed: false,
          required: true
        },
        {
          id: 'data-collection',
          title: 'Collecte de données',
          description: 'Rassembler toutes les informations pertinentes',
          completed: false,
          required: true
        },
        {
          id: 'source-verification',
          title: 'Vérification des sources',
          description: 'Valider la crédibilité des sources d\'information',
          completed: false,
          required: true
        },
        {
          id: 'stakeholder-contact',
          title: 'Contact des parties prenantes',
          description: 'Contacter les personnes ou organisations concernées',
          completed: false,
          required: false
        },
        {
          id: 'cross-reference',
          title: 'Recoupement d\'informations',
          description: 'Croiser les informations avec d\'autres sources',
          completed: false,
          required: true
        },
        {
          id: 'impact-assessment',
          title: 'Évaluation de l\'impact',
          description: 'Analyser l\'impact potentiel ou réel',
          completed: false,
          required: true
        },
        {
          id: 'documentation',
          title: 'Documentation',
          description: 'Documenter tous les findings et preuves',
          completed: false,
          required: true
        },
        {
          id: 'final-report',
          title: 'Rapport final',
          description: 'Rédiger le rapport d\'investigation complet',
          completed: false,
          required: true
        }
      ],
      timeline: [
        {
          id: '1',
          action: 'created',
          description: 'Investigation créée',
          author: 'System',
          timestamp: new Date()
        }
      ],
      findings: '',
      conclusion: '',
      recommendations: []
    }
  );

  const [newNote, setNewNote] = useState('');
  const [newEvidence, setNewEvidence] = useState<{
    type: 'document' | 'screenshot' | 'link' | 'testimony';
    title: string;
    url: string;
    description: string;
  }>({
    type: 'document',
    title: '',
    url: '',
    description: ''
  });
  const [newRecommendation, setNewRecommendation] = useState('');

  if (!isOpen) return null;

  const updateStep = (stepId: string, updates: Partial<InvestigationStep>) => {
    setInvestigation(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    }));
  };

  const addEvidence = (stepId: string) => {
    if (!newEvidence.title.trim()) return;

    const evidence = {
      id: Date.now().toString(),
      ...newEvidence,
      uploadedAt: new Date()
    };

    updateStep(stepId, {
      evidence: [...(investigation.steps.find(s => s.id === stepId)?.evidence || []), evidence]
    });

    setNewEvidence({
      type: 'document',
      title: '',
      url: '',
      description: ''
    });
  };

  const toggleStepCompletion = (stepId: string) => {
    const step = investigation.steps.find(s => s.id === stepId);
    if (!step) return;

    updateStep(stepId, {
      completed: !step.completed,
      completedAt: !step.completed ? new Date() : undefined
    });

    // Add timeline entry
    setInvestigation(prev => ({
      ...prev,
      timeline: [...prev.timeline, {
        id: Date.now().toString(),
        action: !step.completed ? 'step_completed' : 'step_reopened',
        description: `Étape "${step.title}" ${!step.completed ? 'terminée' : 'rouverte'}`,
        author: 'Current User',
        timestamp: new Date()
      }]
    }));
  };

  const addRecommendation = () => {
    if (!newRecommendation.trim()) return;

    setInvestigation(prev => ({
      ...prev,
      recommendations: [...prev.recommendations, newRecommendation.trim()]
    }));
    setNewRecommendation('');
  };

  const completedSteps = investigation.steps.filter(step => step.completed).length;
  const totalSteps = investigation.steps.length;
  const progress = (completedSteps / totalSteps) * 100;

  const handleSave = () => {
    onSave(investigation);
    onClose();
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: ClipboardDocumentListIcon },
    { id: 'steps', label: 'Étapes', icon: ClockIcon },
    { id: 'evidence', label: 'Preuves', icon: DocumentTextIcon },
    { id: 'findings', label: 'Conclusions', icon: UserIcon }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Workflow d'Investigation
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Alerte #{alertId} - {alertTitle}
                </p>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {completedSteps}/{totalSteps} étapes
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    investigation.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    investigation.status === 'in_progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    investigation.status === 'suspended' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {investigation.status}
                  </span>
                </div>
              </div>
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
          <div className="px-6 py-6 max-h-[600px] overflow-y-auto">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Titre de l'investigation
                    </label>
                    <input
                      type="text"
                      value={investigation.title}
                      onChange={(e) => setInvestigation(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Investigateur principal
                    </label>
                    <input
                      type="text"
                      value={investigation.investigator}
                      onChange={(e) => setInvestigation(prev => ({ ...prev, investigator: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Nom de l'investigateur"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={investigation.description}
                    onChange={(e) => setInvestigation(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Décrivez les objectifs et le contexte de cette investigation..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priorité
                    </label>
                    <select
                      value={investigation.priority}
                      onChange={(e) => setInvestigation(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                      <option value="critical">Critique</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Statut
                    </label>
                    <select
                      value={investigation.status}
                      onChange={(e) => setInvestigation(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="pending">En attente</option>
                      <option value="in_progress">En cours</option>
                      <option value="completed">Terminée</option>
                      <option value="suspended">Suspendue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date limite
                    </label>
                    <input
                      type="date"
                      value={investigation.deadline?.toISOString().split('T')[0] || ''}
                      onChange={(e) => setInvestigation(prev => ({ 
                        ...prev, 
                        deadline: e.target.value ? new Date(e.target.value) : undefined 
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timeline</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {investigation.timeline.map((entry) => (
                      <div key={entry.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {entry.description}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {entry.author} • {entry.timestamp.toLocaleString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Steps Tab */}
            {activeTab === 'steps' && (
              <div className="space-y-4">
                {investigation.steps.map((step, index) => (
                  <div key={step.id} className={`border-2 rounded-lg p-4 transition-colors ${
                    step.completed 
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                      : 'border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleStepCompletion(step.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            step.completed 
                              ? 'bg-green-600 border-green-600' 
                              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                          }`}
                        >
                          {step.completed && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h5 className={`font-medium ${
                              step.completed 
                                ? 'text-green-900 dark:text-green-100' 
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {index + 1}. {step.title}
                              {step.required && <span className="text-red-500 ml-1">*</span>}
                            </h5>
                          </div>
                          <p className={`text-sm mt-1 ${
                            step.completed 
                              ? 'text-green-700 dark:text-green-300' 
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {step.description}
                          </p>
                          {step.completedAt && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                              Terminé le {step.completedAt.toLocaleString('fr-FR')}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {step.assignee && (
                          <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                            {step.assignee}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Step Notes */}
                    <div className="mt-4 pl-8">
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Notes
                          </label>
                          <textarea
                            value={step.notes || ''}
                            onChange={(e) => updateStep(step.id, { notes: e.target.value })}
                            rows={2}
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Ajouter des notes sur cette étape..."
                          />
                        </div>

                        {/* Evidence for this step */}
                        {step.evidence && step.evidence.length > 0 && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Preuves associées
                            </label>
                            <div className="space-y-1">
                              {step.evidence.map((evidence) => (
                                <div key={evidence.id} className="flex items-center justify-between text-sm bg-gray-100 dark:bg-gray-600 p-2 rounded">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium">{evidence.title}</span>
                                    <span className="text-gray-500 dark:text-gray-400">({evidence.type})</span>
                                  </div>
                                  {evidence.url && (
                                    <a
                                      href={evidence.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                      Voir
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Add evidence form */}
                        <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <select
                              value={newEvidence.type}
                              onChange={(e) => setNewEvidence(prev => ({ ...prev, type: e.target.value as any }))}
                              className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                              <option value="document">Document</option>
                              <option value="screenshot">Capture d'écran</option>
                              <option value="link">Lien</option>
                              <option value="testimony">Témoignage</option>
                            </select>
                            <input
                              type="text"
                              value={newEvidence.title}
                              onChange={(e) => setNewEvidence(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Titre de la preuve"
                              className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <button
                              onClick={() => addEvidence(step.id)}
                              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Ajouter
                            </button>
                          </div>
                          {newEvidence.type === 'link' && (
                            <input
                              type="url"
                              value={newEvidence.url}
                              onChange={(e) => setNewEvidence(prev => ({ ...prev, url: e.target.value }))}
                              placeholder="URL de la preuve"
                              className="w-full mt-2 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Evidence Tab */}
            {activeTab === 'evidence' && (
              <div className="space-y-4">
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Preuves centralisées</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Toutes les preuves sont associées aux étapes correspondantes dans l'onglet "Étapes"
                  </p>
                </div>
              </div>
            )}

            {/* Findings Tab */}
            {activeTab === 'findings' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Résultats de l'investigation
                  </label>
                  <textarea
                    value={investigation.findings}
                    onChange={(e) => setInvestigation(prev => ({ ...prev, findings: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Décrivez les principales découvertes de l'investigation..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Conclusion
                  </label>
                  <textarea
                    value={investigation.conclusion}
                    onChange={(e) => setInvestigation(prev => ({ ...prev, conclusion: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Conclusion générale de l'investigation..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Recommandations
                  </label>
                  <div className="space-y-2">
                    {investigation.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded">
                        <span className="text-gray-900 dark:text-white">{rec}</span>
                        <button
                          onClick={() => setInvestigation(prev => ({
                            ...prev,
                            recommendations: prev.recommendations.filter((_, i) => i !== index)
                          }))}
                          className="text-red-600 hover:text-red-800"
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <input
                      type="text"
                      value={newRecommendation}
                      onChange={(e) => setNewRecommendation(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addRecommendation()}
                      placeholder="Ajouter une recommandation..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={addRecommendation}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Progression: {completedSteps}/{totalSteps} étapes • 
              Statut: {investigation.status}
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
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}