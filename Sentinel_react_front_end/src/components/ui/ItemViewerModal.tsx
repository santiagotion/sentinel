import React, { useState } from 'react';
import { 
  User, MapPin, Calendar, Hash, Tag, Star, Shield, Eye, Share2, 
  Download, Flag, MessageSquare, Heart, ThumbsUp, ThumbsDown,
  ExternalLink, Clock, Activity, TrendingUp, Network, Globe
} from 'lucide-react';
import { Modal } from './Modal';

export type ItemType = 'alert' | 'person' | 'location' | 'event' | 'content' | 'organization' | 'network_node';

export interface BaseItem {
  id: string;
  type: ItemType;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, any>;
}

export interface AlertItem extends BaseItem {
  type: 'alert';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'investigating' | 'confirmed' | 'resolved';
  severity: number;
  location?: string;
  source: string;
  assignedTo?: { id: string; name: string; avatar?: string };
  tags?: string[];
  mentions?: number;
  verified?: boolean;
  evidence?: Array<{ type: string; url: string; description: string }>;
}

export interface PersonItem extends BaseItem {
  type: 'person';
  fullName: string;
  avatar?: string;
  role?: string;
  organization?: string;
  location?: string;
  verified?: boolean;
  influence?: number;
  connections?: number;
  socialProfiles?: Array<{ platform: string; handle: string; followers?: number }>;
  recentActivity?: Array<{ date: string; action: string; description: string }>;
}

export interface LocationItem extends BaseItem {
  type: 'location';
  coordinates?: [number, number];
  region?: string;
  country?: string;
  population?: number;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  incidents?: Array<{ date: string; type: string; description: string }>;
  demographics?: Record<string, any>;
}

export interface EventItem extends BaseItem {
  type: 'event';
  startDate?: string;
  endDate?: string;
  location?: string;
  participants?: number;
  eventType?: string;
  impact?: 'low' | 'medium' | 'high';
  relatedEvents?: Array<{ id: string; title: string; relation: string }>;
}

export interface ContentItem extends BaseItem {
  type: 'content';
  platform?: string;
  author?: { id: string; name: string; handle?: string };
  content: string;
  engagement?: { likes: number; shares: number; comments: number; views: number };
  sentiment?: 'positive' | 'negative' | 'neutral';
  language?: string;
  hashtags?: string[];
  mentions?: Array<{ id: string; name: string }>;
  media?: Array<{ type: 'image' | 'video' | 'audio'; url: string; thumbnail?: string }>;
}

export interface OrganizationItem extends BaseItem {
  type: 'organization';
  orgType?: 'government' | 'ngo' | 'business' | 'political' | 'media' | 'other';
  website?: string;
  headquarters?: string;
  founded?: string;
  size?: string;
  leadership?: Array<{ name: string; role: string; id?: string }>;
  activities?: Array<{ date: string; activity: string; description: string }>;
}

export interface NetworkNodeItem extends BaseItem {
  type: 'network_node';
  nodeType: 'person' | 'organization' | 'location' | 'event' | 'topic';
  influence: number;
  connections: number;
  sentiment: number;
  verified: boolean;
  clustering?: { clusterId: string; clusterName: string; centrality: number };
  relationships?: Array<{ targetId: string; targetName: string; relationshipType: string; strength: number }>;
}

export type ViewableItem = AlertItem | PersonItem | LocationItem | EventItem | ContentItem | OrganizationItem | NetworkNodeItem;

interface ItemViewerModalProps {
  item: ViewableItem | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (item: ViewableItem) => void;
  onDelete?: (item: ViewableItem) => void;
  onShare?: (item: ViewableItem) => void;
  onExport?: (item: ViewableItem) => void;
  onFlag?: (item: ViewableItem) => void;
}

export function ItemViewerModal({ 
  item, 
  isOpen, 
  onClose,
  onEdit,
  onDelete,
  onShare,
  onExport,
  onFlag
}: ItemViewerModalProps) {
  const [activeTab, setActiveTab] = useState('details');

  if (!item) return null;

  const getItemIcon = (type: ItemType) => {
    switch (type) {
      case 'alert': return Flag;
      case 'person': return User;
      case 'location': return MapPin;
      case 'event': return Calendar;
      case 'content': return MessageSquare;
      case 'organization': return Tag;
      case 'network_node': return Network;
      default: return Hash;
    }
  };

  const getItemColor = (type: ItemType) => {
    switch (type) {
      case 'alert': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'person': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'location': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'event': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'content': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'organization': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30';
      case 'network_node': return 'text-pink-600 bg-pink-100 dark:bg-pink-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const Icon = getItemIcon(item.type);
  const colorClasses = getItemColor(item.type);

  const tabs = ['details', 'metadata', 'related'];
  if (item.type === 'content') tabs.push('engagement');
  if (item.type === 'network_node') tabs.push('network');

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const renderDetailContent = () => {
    switch (item.type) {
      case 'alert':
        const alertItem = item as AlertItem;
        return (
          <div className="space-y-6">
            {/* Priority and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Priorité</label>
                <div className={`mt-1 inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  alertItem.priority === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  alertItem.priority === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                  alertItem.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {alertItem.priority === 'critical' ? 'Critique' :
                   alertItem.priority === 'high' ? 'Élevée' :
                   alertItem.priority === 'medium' ? 'Moyenne' : 'Faible'}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Statut</label>
                <div className={`mt-1 inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  alertItem.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  alertItem.status === 'confirmed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                  alertItem.status === 'investigating' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                }`}>
                  {alertItem.status === 'resolved' ? 'Résolu' :
                   alertItem.status === 'confirmed' ? 'Confirmé' :
                   alertItem.status === 'investigating' ? 'En cours' : 'Nouveau'}
                </div>
              </div>
            </div>

            {/* Location and Source */}
            <div className="grid grid-cols-2 gap-4">
              {alertItem.location && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Localisation</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{alertItem.location}</span>
                  </div>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Source</label>
                <div className="mt-1 text-gray-900 dark:text-white">{alertItem.source}</div>
              </div>
            </div>

            {/* Severity */}
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">
                Sévérité ({alertItem.severity}/10)
              </label>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    alertItem.severity >= 8 ? 'bg-red-500' :
                    alertItem.severity >= 6 ? 'bg-orange-500' :
                    alertItem.severity >= 4 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${alertItem.severity * 10}%` }}
                />
              </div>
            </div>

            {/* Assigned To */}
            {alertItem.assignedTo && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Assigné à</label>
                <div className="mt-1 flex items-center space-x-3">
                  {alertItem.assignedTo.avatar ? (
                    <img 
                      src={alertItem.assignedTo.avatar} 
                      alt={alertItem.assignedTo.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                  )}
                  <span className="text-gray-900 dark:text-white">{alertItem.assignedTo.name}</span>
                </div>
              </div>
            )}

            {/* Tags */}
            {alertItem.tags && alertItem.tags.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {alertItem.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Evidence */}
            {alertItem.evidence && alertItem.evidence.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Preuves</label>
                <div className="space-y-2">
                  {alertItem.evidence.map((evidence, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{evidence.type}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{evidence.description}</div>
                      </div>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'person':
        const personItem = item as PersonItem;
        return (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="flex items-center space-x-4">
              {personItem.avatar ? (
                <img 
                  src={personItem.avatar} 
                  alt={personItem.fullName}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                  <span>{personItem.fullName}</span>
                  {personItem.verified && <Star className="w-5 h-5 text-yellow-500" />}
                </h3>
                {personItem.role && (
                  <p className="text-gray-600 dark:text-gray-400">{personItem.role}</p>
                )}
                {personItem.organization && (
                  <p className="text-sm text-gray-500 dark:text-gray-500">{personItem.organization}</p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {personItem.influence !== undefined && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Influence</label>
                  <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {personItem.influence}/100
                  </div>
                </div>
              )}
              {personItem.connections !== undefined && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Connexions</label>
                  <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {personItem.connections.toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            {/* Social Profiles */}
            {personItem.socialProfiles && personItem.socialProfiles.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Profils sociaux</label>
                <div className="space-y-2">
                  {personItem.socialProfiles.map((profile, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{profile.platform}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">@{profile.handle}</div>
                      </div>
                      {profile.followers && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {profile.followers.toLocaleString()} followers
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity */}
            {personItem.recentActivity && personItem.recentActivity.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Activité récente</label>
                <div className="space-y-2">
                  {personItem.recentActivity.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <Activity className="w-4 h-4 text-gray-400 mt-1" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{activity.action}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</div>
                        <div className="text-xs text-gray-400 mt-1">{formatDate(activity.date)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'content':
        const contentItem = item as ContentItem;
        return (
          <div className="space-y-6">
            {/* Content */}
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Contenu</label>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{contentItem.content}</p>
              </div>
            </div>

            {/* Author and Platform */}
            <div className="grid grid-cols-2 gap-4">
              {contentItem.author && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Auteur</label>
                  <div className="mt-1 text-gray-900 dark:text-white">
                    {contentItem.author.name}
                    {contentItem.author.handle && (
                      <span className="text-gray-500 dark:text-gray-400 ml-2">@{contentItem.author.handle}</span>
                    )}
                  </div>
                </div>
              )}
              {contentItem.platform && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Plateforme</label>
                  <div className="mt-1 text-gray-900 dark:text-white">{contentItem.platform}</div>
                </div>
              )}
            </div>

            {/* Sentiment */}
            {contentItem.sentiment && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Sentiment</label>
                <div className={`mt-1 inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  contentItem.sentiment === 'positive' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  contentItem.sentiment === 'negative' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                }`}>
                  {contentItem.sentiment === 'positive' ? 'Positif' :
                   contentItem.sentiment === 'negative' ? 'Négatif' : 'Neutre'}
                </div>
              </div>
            )}

            {/* Hashtags */}
            {contentItem.hashtags && contentItem.hashtags.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Hashtags</label>
                <div className="flex flex-wrap gap-2">
                  {contentItem.hashtags.map((hashtag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm"
                    >
                      #{hashtag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Media */}
            {contentItem.media && contentItem.media.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Médias</label>
                <div className="grid grid-cols-2 gap-2">
                  {contentItem.media.map((media, index) => (
                    <div key={index} className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      {media.thumbnail ? (
                        <img src={media.thumbnail} alt="Media" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="text-gray-400 text-sm">{media.type}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
              <div className="mt-1 text-gray-900 dark:text-white">
                {item.description || 'Aucune description disponible'}
              </div>
            </div>
          </div>
        );
    }
  };

  const renderEngagementTab = () => {
    if (item.type !== 'content') return null;
    const contentItem = item as ContentItem;
    
    if (!contentItem.engagement) return (
      <div className="text-gray-500 dark:text-gray-400">Aucune donnée d'engagement disponible</div>
    );

    const { likes, shares, comments, views } = contentItem.engagement;
    const total = likes + shares + comments;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{likes.toLocaleString()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>J'aime</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{shares.toLocaleString()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-1">
              <Share2 className="w-4 h-4" />
              <span>Partages</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{comments.toLocaleString()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>Commentaires</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{views.toLocaleString()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>Vues</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Répartition de l'engagement</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>J'aime</span>
                <span>{((likes / total) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(likes / total) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Partages</span>
                <span>{((shares / total) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(shares / total) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Commentaires</span>
                <span>{((comments / total) * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(comments / total) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${colorClasses}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                {item.createdAt && ` • ${formatDate(item.createdAt)}`}
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {onShare && (
              <button
                onClick={() => onShare(item)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
            {onExport && (
              <button
                onClick={() => onExport(item)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
            {onFlag && (
              <button
                onClick={() => onFlag(item)}
                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <Flag className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            {item.description}
          </p>
        )}

        {/* Tabs */}
        <div className="flex space-x-1 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab === 'details' ? 'Détails' :
               tab === 'metadata' ? 'Métadonnées' :
               tab === 'related' ? 'Connexes' :
               tab === 'engagement' ? 'Engagement' :
               tab === 'network' ? 'Réseau' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-h-[60vh] overflow-y-auto">
        {activeTab === 'details' && renderDetailContent()}
        
        {activeTab === 'metadata' && (
          <div className="space-y-4">
            {item.metadata && Object.keys(item.metadata).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(item.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{key}</span>
                    <span className="text-sm text-gray-900 dark:text-white">{JSON.stringify(value)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400">Aucune métadonnée disponible</div>
            )}
          </div>
        )}
        
        {activeTab === 'related' && (
          <div className="text-gray-500 dark:text-gray-400">
            Éléments connexes à implémenter...
          </div>
        )}
        
        {activeTab === 'engagement' && renderEngagementTab()}
        
        {activeTab === 'network' && (
          <div className="text-gray-500 dark:text-gray-400">
            Analyse réseau à implémenter...
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            ID: {item.id}
            {item.updatedAt && ` • Modifié: ${formatDate(item.updatedAt)}`}
          </div>
          <div className="flex space-x-3">
            {onEdit && (
              <button
                onClick={() => onEdit(item)}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Modifier
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(item)}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}