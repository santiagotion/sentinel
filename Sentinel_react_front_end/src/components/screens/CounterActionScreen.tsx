import React, { useState, useEffect } from 'react';
import {
  ShieldIcon,
  PlusIcon,
  PlayIcon,
  PauseIcon,
  AlertTriangleIcon,
  UsersIcon,
  TrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  BarChart3Icon,
  ActivityIcon,
  ZapIcon,
  BotIcon,
  BrainIcon,
  TargetIcon,
  MessageSquareIcon,
  RefreshCwIcon,
  SettingsIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  FilterIcon,
  SearchIcon,
  CalendarIcon,
  MapPinIcon,
  HashIcon,
  GlobalIcon
} from 'lucide-react';
import { counterActionService } from '../../services/counterActionService';
import { CreateCampaignModal } from '../modals/CreateCampaignModal';
import { CreateAutoResponseModal } from '../modals/CreateAutoResponseModal';
import type {
  CounterCampaign,
  AutoResponse,
  RapidResponse,
  CommunityEngagement,
  CampaignStatus,
  CampaignType,
  Platform
} from '../../types/CounterAction';

interface CounterActionScreenProps {
  // No external props needed - all functionality is internal
}

interface MetricsData {
  totalCampaigns: number;
  activeCampaigns: number;
  totalReach: number;
  misinformationCountered: number;
  responseTime: number;
  effectiveness: number;
  topPerformingCampaigns: CounterCampaign[];
  recentActivity: Array<{
    id: string;
    type: 'campaign' | 'auto_response' | 'rapid_response' | 'community';
    action: string;
    timestamp: string;
    impact?: number;
  }>;
}

export const CounterActionScreen: React.FC<CounterActionScreenProps> = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'auto-responses' | 'rapid-response' | 'community'>('overview');
  const [campaigns, setCampaigns] = useState<CounterCampaign[]>([]);
  const [autoResponses, setAutoResponses] = useState<AutoResponse[]>([]);
  const [rapidResponses, setRapidResponses] = useState<RapidResponse[]>([]);
  const [communityEngagements, setCommunityEngagements] = useState<CommunityEngagement[]>([]);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [realTimeEnabled, setRealTimeEnabled] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    platform: 'all',
    search: ''
  });
  
  // Modal states
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
  const [showCreateAutoResponseModal, setShowCreateAutoResponseModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (realTimeEnabled) {
      interval = setInterval(async () => {
        try {
          const updates = await counterActionService.simulateRealTimeUpdate();
          setCampaigns(updates.campaigns);
          setAutoResponses(updates.autoResponses);
        } catch (error) {
          console.error('Real-time update failed:', error);
        }
      }, 10000); // Update every 10 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [realTimeEnabled]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [
        campaignsData,
        autoResponsesData,
        rapidResponsesData,
        communityData,
        metricsData
      ] = await Promise.all([
        counterActionService.getCounterCampaigns(),
        counterActionService.getAutoResponses(),
        counterActionService.getRapidResponses(),
        counterActionService.getCommunityEngagements(),
        counterActionService.getCounterActionMetrics()
      ]);


      setCampaigns(campaignsData);
      setAutoResponses(autoResponsesData);
      setRapidResponses(rapidResponsesData);
      setCommunityEngagements(communityData);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Error loading counter-action data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAutoResponse = async (id: string) => {
    try {
      const updated = await counterActionService.toggleAutoResponse(id);
      setAutoResponses(prev => prev.map(ar => ar.id === id ? updated : ar));
    } catch (error) {
      console.error('Error toggling auto response:', error);
    }
  };

  const handleCreateCampaign = async (campaignData: Partial<CounterCampaign>) => {
    try {
      const newCampaign = await counterActionService.createCampaign(campaignData as any);
      setCampaigns(prev => [newCampaign, ...prev]);
      // Reload metrics to update counts
      const updatedMetrics = await counterActionService.getCounterActionMetrics();
      setMetrics(updatedMetrics);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleCreateAutoResponse = async (autoResponseData: Partial<AutoResponse>) => {
    try {
      const newAutoResponse = await counterActionService.createAutoResponse(autoResponseData as any);
      setAutoResponses(prev => [newAutoResponse, ...prev]);
      // Reload metrics to update counts
      const updatedMetrics = await counterActionService.getCounterActionMetrics();
      setMetrics(updatedMetrics);
    } catch (error) {
      console.error('Error creating auto response:', error);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getStatusColor = (status: CampaignStatus | string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100';
      case 'paused': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100';
      case 'completed': return 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100';
      case 'draft': return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100';
      case 'deploying': return 'bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-100';
      case 'critical': return 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100';
      case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-100';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-100';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case 'twitter': return '🐦';
      case 'facebook': return '📘';
      case 'whatsapp': return '📱';
      case 'telegram': return '✈️';
      case 'instagram': return '📷';
      case 'tiktok': return '🎵';
      case 'all': return '🌐';
      default: return '📡';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <RefreshCwIcon className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">Chargement des données de contre-attaque...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3Icon },
    { id: 'campaigns', label: 'Campagnes', icon: TargetIcon, badge: campaigns.filter(c => c.status === 'active').length },
    { id: 'auto-responses', label: 'Réponses Auto', icon: BotIcon, badge: autoResponses.filter(ar => ar.active).length },
    { id: 'rapid-response', label: 'Réponse Rapide', icon: ZapIcon, badge: rapidResponses.filter(rr => rr.status === 'active').length },
    { id: 'community', label: 'Communauté', icon: UsersIcon, badge: communityEngagements.filter(ce => ce.status === 'active').length }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 dark:bg-red-800 rounded-lg">
            <ShieldIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Actions de Contre-Attaque</h1>
            <p className="text-gray-600 dark:text-gray-400">Gestion des campagnes défensives et réponses automatisées</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRealTimeEnabled(!realTimeEnabled)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              realTimeEnabled
                ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <ActivityIcon className={`w-4 h-4 ${realTimeEnabled ? 'animate-pulse' : ''}`} />
            Temps réel
          </button>
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCwIcon className="w-4 h-4" />
            Actualiser
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Campagnes Actives</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metrics.activeCampaigns}/{metrics.totalCampaigns}</p>
              </div>
              <TargetIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 dark:text-green-400">+12% ce mois</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Portée Totale</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatNumber(metrics.totalReach)}</p>
              </div>
              <UsersIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 dark:text-green-400">+8% cette semaine</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Désinformation Contrée</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metrics.misinformationCountered}</p>
              </div>
              <CheckCircleIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 dark:text-green-400">+25% ce mois</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Temps de Réponse</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metrics.responseTime}min</p>
              </div>
              <ClockIcon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Efficacité: {(metrics.effectiveness * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Actions Rapides</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowCreateCampaignModal(true)}
                className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
              >
                <PlusIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Nouvelle Campagne</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Créer une campagne de contre-attaque</p>
                </div>
              </button>

              <button
                onClick={() => setShowCreateAutoResponseModal(true)}
                className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
              >
                <BotIcon className="w-6 h-6 text-gray-400 group-hover:text-green-500" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Réponse Automatique</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Configurer des réponses auto</p>
                </div>
              </button>

              <button
                onClick={() => alert('Fonctionnalité de réponse rapide en développement')}
                className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
              >
                <ZapIcon className="w-6 h-6 text-gray-400 group-hover:text-red-500" />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Réponse d'Urgence</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Activer une réponse rapide</p>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          {metrics && metrics.recentActivity && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Activité Récente</h3>
              <div className="space-y-3">
                {metrics.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'campaign' ? 'bg-blue-100 dark:bg-blue-800' :
                        activity.type === 'auto_response' ? 'bg-green-100 dark:bg-green-800' :
                        activity.type === 'rapid_response' ? 'bg-red-100 dark:bg-red-800' :
                        'bg-purple-100 dark:bg-purple-800'
                      }`}>
                        {activity.type === 'campaign' && <TargetIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                        {activity.type === 'auto_response' && <BotIcon className="w-4 h-4 text-green-600 dark:text-green-400" />}
                        {activity.type === 'rapid_response' && <ZapIcon className="w-4 h-4 text-red-600 dark:text-red-400" />}
                        {activity.type === 'community' && <UsersIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{activity.action}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(activity.timestamp).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    {activity.impact && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          +{formatNumber(activity.impact)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">portée</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher des campagnes..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              </div>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="paused">En pause</option>
                <option value="completed">Terminé</option>
                <option value="draft">Brouillon</option>
              </select>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="all">Tous les types</option>
                <option value="fact_check">Fact-check</option>
                <option value="educational">Éducation</option>
                <option value="counter_narrative">Contre-narratif</option>
                <option value="awareness">Sensibilisation</option>
              </select>
            </div>
          </div>


          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {(() => {
              if (campaigns.length === 0) {
                return (
                  <div className="col-span-2 text-center py-12">
                    <div className="text-gray-400 dark:text-gray-500 mb-4">
                      <TargetIcon className="w-12 h-12 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Aucune campagne disponible</h3>
                      <p className="text-sm">Les données de campagne sont en cours de chargement...</p>
                    </div>
                  </div>
                );
              }

              const filteredCampaigns = campaigns.filter(campaign => {
                if (filters.status !== 'all' && campaign.status !== filters.status) return false;
                if (filters.type !== 'all' && campaign.type !== filters.type) return false;
                if (filters.search && !campaign.title.toLowerCase().includes(filters.search.toLowerCase()) && 
                    !campaign.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
                return true;
              });

              if (filteredCampaigns.length === 0) {
                return (
                  <div className="col-span-2 text-center py-12">
                    <div className="text-gray-400 dark:text-gray-500 mb-4">
                      <FilterIcon className="w-12 h-12 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Aucun résultat</h3>
                      <p className="text-sm">Aucune campagne ne correspond aux filtres sélectionnés.</p>
                    </div>
                  </div>
                );
              }

              return filteredCampaigns
              .map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{campaign.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{campaign.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <TargetIcon className="w-4 h-4" />
                          <span>{campaign.type.replace('_', '-')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UsersIcon className="w-4 h-4" />
                          <span>{formatNumber(campaign.metrics.reach)} portée</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircleIcon className="w-4 h-4" />
                          <span>{campaign.metrics.effectiveness.misinformationReduced} contrées</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <EditIcon className="w-4 h-4" />
                      </button>
                      {campaign.status === 'active' ? (
                        <button className="p-2 text-orange-500 hover:text-orange-600">
                          <PauseIcon className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="p-2 text-green-500 hover:text-green-600">
                          <PlayIcon className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Platforms */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Plateformes:</span>
                    <div className="flex gap-1">
                      {campaign.platforms.map((platform) => (
                        <span key={platform} className="text-sm">
                          {getPlatformIcon(platform)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {formatNumber(campaign.metrics.engagement.likes + campaign.metrics.engagement.shares)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Engagement</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {(campaign.metrics.effectiveness.narrativeShift * 100).toFixed(0)}%
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Impact</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        ${campaign.metrics.costs.spent.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Dépensé</p>
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      )}

      {activeTab === 'auto-responses' && (
        <div className="space-y-6">
          {/* Auto Responses List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Réponses Automatiques</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gestion des réponses automatisées aux contenus détectés</p>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {autoResponses.map((response) => (
                <div key={response.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{response.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          response.active ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100'
                        }`}>
                          {response.active ? 'Actif' : 'Inactif'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Plateformes</p>
                          <div className="flex gap-1 mt-1">
                            {response.platforms.map((platform) => (
                              <span key={platform}>{getPlatformIcon(platform)}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Déclenchements</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{response.metrics.triggered}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Efficacité</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {(response.metrics.effectiveness * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleAutoResponse(response.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          response.active
                            ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-800 dark:text-orange-100'
                            : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:text-green-100'
                        }`}
                      >
                        {response.active ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
                        {response.active ? 'Pause' : 'Activer'}
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <SettingsIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {response.lastTriggered && (
                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      Dernier déclenchement: {new Date(response.lastTriggered).toLocaleString('fr-FR')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rapid-response' && (
        <div className="space-y-6">
          {/* Rapid Responses */}
          <div className="grid grid-cols-1 gap-6">
            {rapidResponses.map((response) => (
              <div
                key={response.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{response.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(response.urgency)}`}>
                        {response.urgency}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(response.status)}`}>
                        {response.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {response.triggerEvent.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>Temps de réponse: {response.metrics.responseTime}min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-4 h-4" />
                        <span>Portée: {formatNumber(response.metrics.reach)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TargetIcon className="w-4 h-4" />
                        <span>Efficacité: {(response.metrics.effectiveness * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Progress */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Actions ({response.actions.filter(a => a.status === 'completed').length}/{response.actions.length})</h4>
                  {response.actions.map((action) => (
                    <div key={action.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        action.status === 'completed' ? 'bg-green-500' :
                        action.status === 'in_progress' ? 'bg-blue-500' :
                        action.status === 'failed' ? 'bg-red-500' :
                        'bg-gray-400'
                      }`}>
                        {action.status === 'completed' && <CheckCircleIcon className="w-3 h-3 text-white" />}
                        {action.status === 'failed' && <XCircleIcon className="w-3 h-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{action.type.replace('_', ' ')}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{action.content}</p>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {action.completedAt ? new Date(action.completedAt).toLocaleTimeString('fr-FR') : 
                         new Date(action.scheduledFor).toLocaleTimeString('fr-FR')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'community' && (
        <div className="space-y-6">
          {/* Community Engagements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {communityEngagements.map((engagement) => (
              <div
                key={engagement.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{engagement.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(engagement.status)}`}>
                      {engagement.status}
                    </span>
                  </div>
                  <UsersIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Participants</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{engagement.participants.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Portée</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {formatNumber(engagement.impact.peopleReached)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {engagement.impact.misinformationCorrected}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Corrigées</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {engagement.impact.trustedSourcesShared}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Sources partagées</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {(engagement.impact.communityGrowth * 100).toFixed(0)}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Croissance</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateCampaignModal
        isOpen={showCreateCampaignModal}
        onClose={() => setShowCreateCampaignModal(false)}
        onSubmit={handleCreateCampaign}
      />
      
      <CreateAutoResponseModal
        isOpen={showCreateAutoResponseModal}
        onClose={() => setShowCreateAutoResponseModal(false)}
        onSubmit={handleCreateAutoResponse}
      />
    </div>
  );
};