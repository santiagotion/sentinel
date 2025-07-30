import React, { useState, useEffect } from 'react';
import {
  ArrowLeftIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  UsersIcon,
  ClockIcon,
  ShareIcon,
  HeartIcon,
  MessageSquareIcon,
  MapPinIcon,
  HashIcon,
  BrainIcon,
  NetworkIcon,
  CalendarIcon,
  FileTextIcon,
  RefreshCwIcon,
  DownloadIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
  BarChart3Icon,
  PieChartIcon,
  ActivityIcon,
  GlobeIcon,
  ShieldIcon,
  TargetIcon
} from 'lucide-react';
import { informationSpreadService } from '../../services/informationSpreadService';
import { TimelineVisualization } from '../visualizations/TimelineVisualization';
import { NetworkSpreadVisualization } from '../visualizations/NetworkSpreadVisualization';
import { RawDataExplorer } from '../visualizations/RawDataExplorer';
import type {
  Subject,
  SpreadEvent,
  SourceAccount,
  SubjectTimeline,
  CauseEffectAnalysis,
  SpreadPrediction,
  RawDataItem,
  SubjectAnalytics,
  EventRelationship
} from '../../types/InformationSpread';

interface SubjectAnalysisScreenProps {
  subjectId: string;
  onBack?: () => void;
}

export const SubjectAnalysisScreen: React.FC<SubjectAnalysisScreenProps> = ({ subjectId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'cause-effect' | 'network' | 'raw-data' | 'predictions'>('overview');
  const [subject, setSubject] = useState<Subject | null>(null);
  const [timeline, setTimeline] = useState<SubjectTimeline | null>(null);
  const [causeEffect, setCauseEffect] = useState<CauseEffectAnalysis | null>(null);
  const [predictions, setPredictions] = useState<SpreadPrediction[]>([]);
  const [rawData, setRawData] = useState<RawDataItem[]>([]);
  const [analytics, setAnalytics] = useState<SubjectAnalytics | null>(null);
  const [sourceAccounts, setSourceAccounts] = useState<SourceAccount[]>([]);
  const [relationships, setRelationships] = useState<EventRelationship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubjectData();
  }, [subjectId]);

  const loadSubjectData = async () => {
    setLoading(true);
    try {
      const [
        subjectData,
        timelineData,
        causeEffectData,
        predictionsData,
        rawDataItems,
        analyticsData,
        accountsData,
        relationshipsData
      ] = await Promise.all([
        informationSpreadService.getSubjectById(subjectId),
        informationSpreadService.getSubjectTimeline(subjectId),
        informationSpreadService.getCauseEffectAnalysis(subjectId),
        informationSpreadService.getPredictions(subjectId),
        informationSpreadService.getRawData(subjectId),
        informationSpreadService.getSubjectAnalytics(subjectId),
        informationSpreadService.getSourceAccounts(subjectId),
        informationSpreadService.getEventRelationships(subjectId)
      ]);

      setSubject(subjectData);
      setTimeline(timelineData);
      setCauseEffect(causeEffectData);
      setPredictions(predictionsData);
      setRawData(rawDataItems);
      setAnalytics(analyticsData);
      setSourceAccounts(accountsData);
      setRelationships(relationshipsData);
    } catch (error) {
      console.error('Error loading subject data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'negative':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'mixed':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Sujet non trouvé</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3Icon },
    { id: 'timeline', label: 'Chronologie', icon: ClockIcon },
    { id: 'cause-effect', label: 'Cause & Effet', icon: NetworkIcon },
    { id: 'network', label: 'Réseau', icon: ShareIcon },
    { id: 'raw-data', label: 'Données brutes', icon: FileTextIcon },
    { id: 'predictions', label: 'Prédictions', icon: BrainIcon }
  ];

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {subject.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {subject.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <RefreshCwIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <DownloadIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-6 gap-4 mb-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                <UsersIcon className="w-4 h-4" />
                <span className="text-xs">Portée totale</span>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {formatNumber(subject.totalReach)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                <TrendingUpIcon className="w-4 h-4" />
                <span className="text-xs">Vélocité</span>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {subject.spreadVelocity.toFixed(1)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                <HeartIcon className="w-4 h-4" />
                <span className="text-xs">Engagement</span>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {(subject.engagementRate * 100).toFixed(1)}%
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                <ActivityIcon className="w-4 h-4" />
                <span className="text-xs">Statut</span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {subject.status === 'viral' ? 'Viral' :
                 subject.status === 'spreading' ? 'En propagation' :
                 subject.status === 'emerging' ? 'Émergent' :
                 subject.status === 'declining' ? 'En déclin' : 'Dormant'}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                <PieChartIcon className="w-4 h-4" />
                <span className="text-xs">Sentiment</span>
              </div>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(subject.sentiment)}`}>
                {subject.sentiment === 'positive' ? 'Positif' :
                 subject.sentiment === 'negative' ? 'Négatif' :
                 subject.sentiment === 'mixed' ? 'Mixte' : 'Neutre'}
              </span>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                <ClockIcon className="w-4 h-4" />
                <span className="text-xs">Dernière activité</span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {formatDateTime(subject.lastActivityAt)}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Influencers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Comptes influents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sourceAccounts.slice(0, 6).map((account) => (
                  <div key={account.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <img
                      src={account.profileImageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${account.username}`}
                      alt={account.displayName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {account.displayName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        @{account.username} • {formatNumber(account.followerCount)} abonnés
                      </p>
                    </div>
                    {account.verified && (
                      <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Distribution */}
            {analytics && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Distribution par plateforme
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {analytics.metrics.platforms.map((platform) => (
                    <div key={platform.platform} className="text-center">
                      <div className="h-24 bg-blue-600 rounded-lg flex items-end justify-center mb-2">
                        <div
                          className="bg-blue-500 rounded-t-lg w-full"
                          style={{ height: `${platform.percentage}%` }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {platform.platform === 'social_media' ? 'Réseaux sociaux' :
                         platform.platform === 'news' ? 'Actualités' :
                         platform.platform === 'messaging_app' ? 'Messagerie' :
                         platform.platform === 'forum' ? 'Forums' : platform.platform}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {platform.percentage}% • {formatNumber(platform.count)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Mots-clés associés
              </h3>
              <div className="flex flex-wrap gap-2">
                {subject.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    <HashIcon className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && timeline && (
          <div className="space-y-6">
            {/* Interactive Timeline Visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Chronologie interactive
              </h3>
              <TimelineVisualization
                events={timeline.events}
                milestones={timeline.milestones}
                phases={timeline.phases}
                height={500}
              />
            </div>

            {/* Timeline Events List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Événements chronologiques
              </h3>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                {timeline.events.map((event, index) => (
                  <div key={event.id} className="relative flex items-start gap-4 mb-6">
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full">
                      {event.type === 'origin' && <AlertTriangleIcon className="w-6 h-6 text-yellow-500" />}
                      {event.type === 'amplification' && <TrendingUpIcon className="w-6 h-6 text-orange-500" />}
                      {event.type === 'debunk' && <XCircleIcon className="w-6 h-6 text-green-500" />}
                      {event.type === 'fact_check' && <CheckCircleIcon className="w-6 h-6 text-blue-500" />}
                      {event.type === 'mutation' && <RefreshCwIcon className="w-6 h-6 text-purple-500" />}
                    </div>
                    <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {event.source.displayName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            @{event.source.username} • {formatDateTime(event.timestamp)}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(event.sentiment)}`}>
                          {event.sentiment}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{event.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <UsersIcon className="w-4 h-4" />
                          {formatNumber(event.reach)} portée
                        </span>
                        <span className="flex items-center gap-1">
                          <HeartIcon className="w-4 h-4" />
                          {formatNumber(event.engagement.likes)}
                        </span>
                        <span className="flex items-center gap-1">
                          <ShareIcon className="w-4 h-4" />
                          {formatNumber(event.engagement.shares)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquareIcon className="w-4 h-4" />
                          {formatNumber(event.engagement.comments)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phases */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Phases de propagation
              </h3>
              <div className="space-y-4">
                {timeline.phases.map((phase) => (
                  <div key={phase.id} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{phase.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {formatDateTime(phase.startTime)} {phase.endTime && `- ${formatDateTime(phase.endTime)}`}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Vélocité:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100 ml-1">
                          {phase.characteristics.velocity.toFixed(1)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Sentiment:</span>
                        <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(phase.characteristics.sentiment)}`}>
                          {phase.characteristics.sentiment}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cause-effect' && causeEffect && (
          <div className="space-y-6">
            {/* Causes */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Causes identifiées
              </h3>
              <div className="space-y-4">
                {causeEffect.rootCauses.map((cause) => (
                  <div key={cause.id} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertTriangleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{cause.description}</p>
                      <div className="mt-2 space-y-1">
                        {cause.evidence.map((ev, index) => (
                          <p key={index} className="text-sm text-gray-500 dark:text-gray-400 flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            {ev}
                          </p>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Confiance:</span>
                        <div className="flex-1 max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${cause.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {(cause.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Effects */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Effets observés
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {causeEffect.effects.map((effect) => (
                  <div key={effect.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {effect.type === 'behavioral' && <UsersIcon className="w-5 h-5 text-blue-500" />}
                      {effect.type === 'economic' && <TrendingUpIcon className="w-5 h-5 text-green-500" />}
                      {effect.type === 'sentiment' && <HeartIcon className="w-5 h-5 text-purple-500" />}
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                        {effect.type}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">{effect.description}</p>
                    {effect.measuredImpact && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{effect.measuredImpact.metric}:</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100 ml-1">
                          {effect.measuredImpact.value} ({effect.measuredImpact.change > 0 ? '+' : ''}{effect.measuredImpact.change}%)
                        </span>
                      </div>
                    )}
                    {effect.affectedGroups && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {effect.affectedGroups.map((group, index) => (
                          <span key={index} className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                            {group}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && timeline && (
          <div className="space-y-6">
            {/* Network Visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Réseau de propagation
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Visualisation interactive des connexions entre comptes et événements. 
                Glissez les nœuds pour explorer, survolez pour voir les détails.
              </p>
              <NetworkSpreadVisualization
                events={timeline.events}
                accounts={sourceAccounts}
                relationships={relationships}
                height={600}
              />
            </div>

            {/* Relationship Analysis */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Analyse des relations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relationships.map((relationship) => {
                  const fromEvent = timeline.events.find(e => e.id === relationship.fromEventId);
                  const toEvent = timeline.events.find(e => e.id === relationship.toEventId);
                  
                  if (!fromEvent || !toEvent) return null;

                  return (
                    <div key={relationship.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          relationship.type === 'causes' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          relationship.type === 'influences' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          relationship.type === 'supports' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          relationship.type === 'contradicts' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                          relationship.type === 'debunks' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                        }`}>
                          {relationship.type === 'causes' ? 'Cause' :
                           relationship.type === 'influences' ? 'Influence' :
                           relationship.type === 'supports' ? 'Soutient' :
                           relationship.type === 'contradicts' ? 'Contredit' :
                           relationship.type === 'debunks' ? 'Démystifie' :
                           'Amplifie'}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Force:</span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${relationship.strength * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                            {(relationship.strength * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm">
                          <p className="text-gray-500 dark:text-gray-400">De:</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {fromEvent.source.displayName} • {formatDateTime(fromEvent.timestamp)}
                          </p>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-500 dark:text-gray-400">Vers:</p>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {toEvent.source.displayName} • {formatDateTime(toEvent.timestamp)}
                          </p>
                        </div>
                      </div>

                      {relationship.evidence && relationship.evidence.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Preuves:</p>
                          <ul className="space-y-1">
                            {relationship.evidence.map((evidence, index) => (
                              <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                                <span className="text-gray-400">•</span>
                                {evidence}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Confiance:</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div 
                            className="bg-green-600 h-1.5 rounded-full" 
                            style={{ width: `${relationship.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                          {(relationship.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Network Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Statistiques du réseau
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{sourceAccounts.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Comptes impliqués</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{timeline.events.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Événements</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{relationships.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Relations</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {sourceAccounts.filter(acc => acc.verified).length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Comptes vérifiés</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'raw-data' && (
          <div className="space-y-6">
            {/* Subject-specific Raw Data Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Données brutes collectées pour: {subject.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{rawData.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Éléments collectés</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {rawData.filter(item => item.isOriginal).length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Posts originaux</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {rawData.filter(item => item.hasMedia).length}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Avec médias</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {new Set(rawData.map(item => item.source.platform)).size}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Plateformes</p>
                </div>
              </div>

              {/* Raw Content Examples */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Exemples de contenu brut</h4>
                {rawData.slice(0, 3).map((item) => (
                  <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.source.profileImageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${item.source.username}`}
                          alt={item.source.displayName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {item.source.displayName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            @{item.source.username} • {formatDateTime(item.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.isOriginal && (
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded text-xs font-medium">
                            Original
                          </span>
                        )}
                        {item.hasMedia && (
                          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-xs font-medium">
                            Média
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 mb-3">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono">
                        {item.rawContent}
                      </pre>
                    </div>
                    {item.metadata && Object.keys(item.metadata).length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Métadonnées d'analyse:</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          {Object.entries(item.metadata).map(([key, value]) => (
                            <span key={key} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {key}: {Array.isArray(value) ? value.join(', ') : value}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Raw Data Explorer */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Explorateur de données avancé
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Explorez toutes les données collectées avec des outils de filtrage et d'analyse avancés.
              </p>
              <RawDataExplorer />
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-6">
            {/* Prediction Overview Dashboard */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Tableau de bord prédictif - {subject.title}
              </h3>
              
              {/* Current Trend Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <TrendingUpIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{subject.spreadVelocity.toFixed(1)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Vélocité actuelle</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <UsersIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatNumber(subject.totalReach)}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Portée actuelle</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <HeartIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{(subject.engagementRate * 100).toFixed(1)}%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Taux d'engagement</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                    <ActivityIcon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">{subject.status}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Statut de propagation</p>
                </div>
              </div>

              {/* Prediction Trend Chart */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Évolution prédite de la portée</h4>
                <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="w-full h-full p-4">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="400" height="200" fill="url(#grid)" />
                      
                      {/* Historical data line */}
                      <path
                        d="M 0,180 Q 100,160 150,140 T 200,120"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        fill="none"
                      />
                      
                      {/* Prediction line */}
                      <path
                        d="M 200,120 Q 250,100 300,80 T 400,60"
                        stroke="#10b981"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="5,5"
                      />
                      
                      {/* Confidence band */}
                      <path
                        d="M 200,140 Q 250,120 300,100 T 400,80 L 400,40 Q 300,60 250,80 T 200,100 Z"
                        fill="#10b981"
                        fillOpacity="0.1"
                      />
                      
                      {/* Current point */}
                      <circle cx="200" cy="120" r="6" fill="#3b82f6" />
                      
                      {/* Legend */}
                      <text x="10" y="20" className="text-xs fill-current text-gray-600 dark:text-gray-400">Données historiques</text>
                      <line x1="10" y1="30" x2="40" y2="30" stroke="#3b82f6" strokeWidth="2"/>
                      
                      <text x="10" y="50" className="text-xs fill-current text-gray-600 dark:text-gray-400">Prédiction</text>
                      <line x1="10" y1="60" x2="40" y2="60" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <h5 className="font-medium text-red-900 dark:text-red-100">Risques identifiés</h5>
                  </div>
                  <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                    <li>• Amplification par des bots</li>
                    <li>• Mutation narrative possible</li>
                    <li>• Propagation transfrontalière</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ClockIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <h5 className="font-medium text-yellow-900 dark:text-yellow-100">Fenêtre critique</h5>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Les prochaines 6-12 heures sont cruciales pour l'évolution du sujet.
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h5 className="font-medium text-green-900 dark:text-green-100">Opportunités</h5>
                  </div>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Correction proactive possible</li>
                    <li>• Engagement des influenceurs</li>
                    <li>• Communication officielle</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Detailed Predictions */}
            {predictions.map((prediction) => (
              <div key={prediction.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Prédiction à {prediction.timeHorizon === '24h' ? '24 heures' : 
                                  prediction.timeHorizon === '7d' ? '7 jours' : '30 jours'}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    prediction.confidence === 'high' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                    prediction.confidence === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    Confiance {prediction.confidence === 'high' ? 'élevée' : 
                              prediction.confidence === 'medium' ? 'moyenne' : 'faible'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Portée estimée</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {formatNumber(prediction.predictions.reachEstimate.expected)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatNumber(prediction.predictions.reachEstimate.min)} - {formatNumber(prediction.predictions.reachEstimate.max)}
                    </p>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(prediction.predictions.reachEstimate.expected / prediction.predictions.reachEstimate.max) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Probabilité virale</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {(prediction.predictions.viralProbability * 100).toFixed(0)}%
                    </p>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          prediction.predictions.viralProbability > 0.7 ? 'bg-red-600' :
                          prediction.predictions.viralProbability > 0.4 ? 'bg-yellow-600' : 'bg-green-600'
                        }`}
                        style={{ width: `${prediction.predictions.viralProbability * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {prediction.predictions.sentimentShift && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Changement sentiment</p>
                      <div className="flex items-center gap-2 mb-2">
                        {prediction.predictions.sentimentShift.direction === 'improving' ? (
                          <TrendingUpIcon className="w-5 h-5 text-green-500" />
                        ) : prediction.predictions.sentimentShift.direction === 'worsening' ? (
                          <TrendingDownIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <ActivityIcon className="w-5 h-5 text-gray-500" />
                        )}
                        <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {prediction.predictions.sentimentShift.direction === 'improving' ? 'Amélioration' :
                           prediction.predictions.sentimentShift.direction === 'worsening' ? 'Dégradation' : 'Stable'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            prediction.predictions.sentimentShift.direction === 'improving' ? 'bg-green-600' :
                            prediction.predictions.sentimentShift.direction === 'worsening' ? 'bg-red-600' : 'bg-gray-600'
                          }`}
                          style={{ width: `${prediction.predictions.sentimentShift.magnitude * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <TargetIcon className="w-4 h-4" />
                      Facteurs clés
                    </h4>
                    <ul className="space-y-2">
                      {prediction.factors.map((factor, index) => (
                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <InfoIcon className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {prediction.recommendations && (
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                        <CheckCircleIcon className="w-4 h-4" />
                        Recommandations
                      </h4>
                      <ul className="space-y-2">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded">
                            <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Timeline Predictions */}
                {(prediction.predictions.peakTime || prediction.predictions.declineTime) && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Chronologie prédite</h4>
                    <div className="flex items-center gap-4 text-sm">
                      {prediction.predictions.peakTime && (
                        <div className="flex items-center gap-2">
                          <TrendingUpIcon className="w-4 h-4 text-orange-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Pic attendu: {formatDateTime(prediction.predictions.peakTime)}
                          </span>
                        </div>
                      )}
                      {prediction.predictions.declineTime && (
                        <div className="flex items-center gap-2">
                          <TrendingDownIcon className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Déclin prévu: {formatDateTime(prediction.predictions.declineTime)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* AI Analysis Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <BrainIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Analyse IA - Résumé prédictif
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Probabilité de contrôle</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{ width: '75%' }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">75%</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Contrôle possible avec intervention rapide
                  </p>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Impact potentiel</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                      <div className="bg-yellow-600 h-3 rounded-full" style={{ width: '60%' }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Modéré</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Impact limité avec mesures préventives
                  </p>
                </div>
                
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Urgence d'action</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                      <div className="bg-orange-600 h-3 rounded-full" style={{ width: '80%' }} />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Élevée</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Action recommandée dans les 4-6 heures
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};