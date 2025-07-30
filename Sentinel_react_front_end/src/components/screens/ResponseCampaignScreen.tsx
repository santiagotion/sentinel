import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Target, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  Eye,
  Share2,
  BarChart3,
  Settings,
  Plus,
  Filter,
  Search,
  Calendar,
  MapPin,
  Zap,
  FileText,
  Download,
  Upload
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

interface ResponseCampaign {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'counter-narrative' | 'fact-check' | 'awareness' | 'debunk' | 'prevention';
  targetThreat: {
    id: string;
    title: string;
    type: 'misinformation' | 'disinformation' | 'hate-speech' | 'manipulation';
    severity: number;
    reach: number;
  };
  timeline: {
    startDate: Date;
    endDate: Date;
    duration: number; // days
  };
  team: {
    lead: string;
    members: string[];
    roles: { [key: string]: string };
  };
  channels: string[];
  budget: {
    allocated: number;
    spent: number;
    currency: string;
  };
  content: {
    messages: Array<{
      id: string;
      type: 'text' | 'image' | 'video' | 'infographic';
      content: string;
      status: 'draft' | 'approved' | 'published';
      metrics: {
        reach: number;
        engagement: number;
        sentiment: number;
      };
    }>;
    assets: Array<{
      id: string;
      name: string;
      type: string;
      url: string;
      status: 'draft' | 'approved';
    }>;
  };
  metrics: {
    reach: number;
    engagement: number;
    effectiveness: number;
    sentimentChange: number;
    threatReduction: number;
  };
  geography: {
    regions: string[];
    languages: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

interface ResponseCampaignScreenProps {
  className?: string;
}

export const ResponseCampaignScreen: React.FC<ResponseCampaignScreenProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'campaigns' | 'threats' | 'analytics' | 'assets'>('overview');
  const [campaigns, setCampaigns] = useState<ResponseCampaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data initialization
  useEffect(() => {
    const mockCampaigns: ResponseCampaign[] = [
      {
        id: 'camp-001',
        title: 'Fact-Check: Élections 2024 Kinshasa',
        description: 'Campagne de vérification des faits et contre-narratif pour les élections présidentielles',
        status: 'active',
        priority: 'critical',
        type: 'fact-check',
        targetThreat: {
          id: 'threat-001',
          title: 'Désinformation électorale',
          type: 'disinformation',
          severity: 9.2,
          reach: 1250000
        },
        timeline: {
          startDate: new Date(2024, 5, 15),
          endDate: new Date(2024, 11, 30),
          duration: 198
        },
        team: {
          lead: 'Dr. Marie Kabila',
          members: ['Jean Mukamba', 'Paul Tshisekedi', 'Grace Lukoji', 'David Mbombo'],
          roles: {
            'Dr. Marie Kabila': 'Campaign Lead',
            'Jean Mukamba': 'Content Strategist',
            'Paul Tshisekedi': 'Media Coordinator',
            'Grace Lukoji': 'Analyst',
            'David Mbombo': 'Community Manager'
          }
        },
        channels: ['Facebook', 'Twitter', 'WhatsApp', 'Radio', 'TV', 'Community Leaders'],
        budget: {
          allocated: 50000,
          spent: 23450,
          currency: 'USD'
        },
        content: {
          messages: [
            {
              id: 'msg-001',
              type: 'infographic',
              content: 'Infographie: Comment identifier la désinformation électorale',
              status: 'published',
              metrics: {
                reach: 342000,
                engagement: 15.2,
                sentiment: 0.72
              }
            },
            {
              id: 'msg-002',
              type: 'video',
              content: 'Vidéo explicative: Processus de vote transparent',
              status: 'approved',
              metrics: {
                reach: 256000,
                engagement: 18.7,
                sentiment: 0.81
              }
            }
          ],
          assets: [
            {
              id: 'asset-001',
              name: 'Logo_Fact_Check_2024.png',
              type: 'image',
              url: '/assets/campaigns/fact-check-logo.png',
              status: 'approved'
            }
          ]
        },
        metrics: {
          reach: 1450000,
          engagement: 16.8,
          effectiveness: 78.3,
          sentimentChange: 0.24,
          threatReduction: 42.1
        },
        geography: {
          regions: ['Kinshasa', 'Lubumbashi', 'Goma', 'Bukavu'],
          languages: ['Français', 'Lingala', 'Swahili']
        },
        createdAt: new Date(2024, 5, 10),
        updatedAt: new Date(2024, 5, 27)
      },
      {
        id: 'camp-002',
        title: 'Prévention: Rumeurs Sanitaires',
        description: 'Campagne préventive contre la désinformation sur les politiques de santé publique',
        status: 'active',
        priority: 'high',
        type: 'prevention',
        targetThreat: {
          id: 'threat-002',
          title: 'Rumeurs anti-vaccination',
          type: 'misinformation',
          severity: 7.8,
          reach: 890000
        },
        timeline: {
          startDate: new Date(2024, 4, 1),
          endDate: new Date(2024, 8, 30),
          duration: 152
        },
        team: {
          lead: 'Dr. Joseph Mukendi',
          members: ['Nurse Sarah Kasongo', 'Dr. Albert Mwangi', 'Comm. Fatima Ilunga'],
          roles: {
            'Dr. Joseph Mukendi': 'Medical Lead',
            'Nurse Sarah Kasongo': 'Community Outreach',
            'Dr. Albert Mwangi': 'Scientific Advisor',
            'Comm. Fatima Ilunga': 'Communications'
          }
        },
        channels: ['Radio', 'Community Centers', 'WhatsApp', 'Facebook', 'Health Clinics'],
        budget: {
          allocated: 35000,
          spent: 18200,
          currency: 'USD'
        },
        content: {
          messages: [
            {
              id: 'msg-003',
              type: 'text',
              content: 'Messages WhatsApp: Informations correctes sur la vaccination',
              status: 'published',
              metrics: {
                reach: 156000,
                engagement: 12.4,
                sentiment: 0.65
              }
            }
          ],
          assets: []
        },
        metrics: {
          reach: 567000,
          engagement: 13.2,
          effectiveness: 65.7,
          sentimentChange: 0.18,
          threatReduction: 28.5
        },
        geography: {
          regions: ['Nord-Kivu', 'Sud-Kivu', 'Ituri'],
          languages: ['Français', 'Swahili', 'Kinyarwanda']
        },
        createdAt: new Date(2024, 3, 25),
        updatedAt: new Date(2024, 5, 27)
      },
      {
        id: 'camp-003',
        title: 'Counter-Narrative: Stabilité Économique',
        description: 'Contre-narratif face aux rumeurs de crise économique artificielle',
        status: 'draft',
        priority: 'medium',
        type: 'counter-narrative',
        targetThreat: {
          id: 'threat-003',
          title: 'Manipulation économique',
          type: 'manipulation',
          severity: 6.5,
          reach: 445000
        },
        timeline: {
          startDate: new Date(2024, 6, 1),
          endDate: new Date(2024, 7, 31),
          duration: 61
        },
        team: {
          lead: 'Économiste Rachel Mbala',
          members: ['Analyst Pierre Kalala', 'Journalist Anna Bakonga'],
          roles: {
            'Économiste Rachel Mbala': 'Economic Expert',
            'Analyst Pierre Kalala': 'Data Analyst',
            'Journalist Anna Bakonga': 'Media Relations'
          }
        },
        channels: ['TV', 'Newspapers', 'Twitter', 'LinkedIn'],
        budget: {
          allocated: 25000,
          spent: 0,
          currency: 'USD'
        },
        content: {
          messages: [],
          assets: []
        },
        metrics: {
          reach: 0,
          engagement: 0,
          effectiveness: 0,
          sentimentChange: 0,
          threatReduction: 0
        },
        geography: {
          regions: ['Kinshasa', 'Lubumbashi'],
          languages: ['Français']
        },
        createdAt: new Date(2024, 5, 20),
        updatedAt: new Date(2024, 5, 20)
      }
    ];

    setCampaigns(mockCampaigns);
  }, []);

  // Filter campaigns based on status and search
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Quick stats for overview
  const overviewStats = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    totalReach: campaigns.reduce((sum, c) => sum + c.metrics.reach, 0),
    averageEffectiveness: campaigns.reduce((sum, c) => sum + c.metrics.effectiveness, 0) / campaigns.length || 0,
    threatReduction: campaigns.reduce((sum, c) => sum + c.metrics.threatReduction, 0) / campaigns.length || 0
  };

  // Sample effectiveness data for charts
  const effectivenessData = [
    { date: '01/06', effectiveness: 45, reach: 120000, threats: 8 },
    { date: '08/06', effectiveness: 52, reach: 185000, threats: 6 },
    { date: '15/06', effectiveness: 67, reach: 290000, threats: 4 },
    { date: '22/06', effectiveness: 71, reach: 412000, threats: 3 },
    { date: '29/06', effectiveness: 78, reach: 567000, threats: 2 }
  ];

  const threatTypeData = [
    { name: 'Désinformation', value: 42, color: '#EF4444' },
    { name: 'Mésinformation', value: 28, color: '#F97316' },
    { name: 'Manipulation', value: 18, color: '#EAB308' },
    { name: 'Discours de haine', value: 12, color: '#DC2626' }
  ];

  const campaignTypeData = [
    { type: 'Fact-check', count: 12, effectiveness: 78 },
    { type: 'Prévention', count: 8, effectiveness: 65 },
    { type: 'Counter-narrative', count: 6, effectiveness: 72 },
    { type: 'Debunk', count: 4, effectiveness: 81 },
    { type: 'Sensibilisation', count: 3, effectiveness: 59 }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <Shield className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Campagnes Totales</p>
          <p className="text-2xl font-bold">{overviewStats.totalCampaigns}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
          <Target className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Campagnes Actives</p>
          <p className="text-2xl font-bold">{overviewStats.activeCampaigns}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <Eye className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Portée Totale</p>
          <p className="text-2xl font-bold">{(overviewStats.totalReach / 1000000).toFixed(1)}M</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <BarChart3 className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Efficacité Moy.</p>
          <p className="text-2xl font-bold">{overviewStats.averageEffectiveness.toFixed(1)}%</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white">
          <Zap className="w-8 h-8 mb-2 opacity-80" />
          <p className="text-sm opacity-90">Réduction Menaces</p>
          <p className="text-2xl font-bold">{overviewStats.threatReduction.toFixed(1)}%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Effectiveness Over Time */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Évolution de l'Efficacité
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={effectivenessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="effectiveness" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Types Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Types de Menaces Combattues
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={threatTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {threatTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Campaign Performance by Type */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance par Type de Campagne
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignTypeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="effectiveness" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Reach and Threat Reduction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Portée vs Réduction des Menaces
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={effectivenessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="reach" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="threats" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Activité Récente
        </h3>
        <div className="space-y-3">
          {campaigns.slice(0, 5).map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  campaign.status === 'active' ? 'bg-green-500' :
                  campaign.status === 'draft' ? 'bg-yellow-500' :
                  campaign.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{campaign.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Efficacité: {campaign.metrics.effectiveness.toFixed(1)}% • 
                    Portée: {(campaign.metrics.reach / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  campaign.priority === 'critical' ? 'bg-red-100 text-red-800' :
                  campaign.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  campaign.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.priority}
                </span>
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCampaignsTab = () => (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Gestion des Campagnes
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Créez et gérez vos campagnes de contre-communication
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Campagne</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher des campagnes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actives</option>
          <option value="draft">Brouillons</option>
          <option value="completed">Terminées</option>
        </select>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedCampaign(campaign.id)}
          >
            {/* Campaign Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {campaign.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {campaign.description}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <span className={`w-3 h-3 rounded-full ${
                  campaign.status === 'active' ? 'bg-green-500' :
                  campaign.status === 'draft' ? 'bg-yellow-500' :
                  campaign.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                }`} />
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  campaign.priority === 'critical' ? 'bg-red-100 text-red-800' :
                  campaign.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  campaign.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.priority}
                </span>
              </div>
            </div>

            {/* Campaign Type and Target */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  campaign.type === 'fact-check' ? 'bg-blue-100 text-blue-800' :
                  campaign.type === 'counter-narrative' ? 'bg-purple-100 text-purple-800' :
                  campaign.type === 'prevention' ? 'bg-green-100 text-green-800' :
                  campaign.type === 'debunk' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.type}
                </span>
                <span className="text-xs text-gray-500">
                  vs {campaign.targetThreat.title}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Menace:</strong> {campaign.targetThreat.type} (Sévérité: {campaign.targetThreat.severity}/10)
              </div>
            </div>

            {/* Progress and Metrics */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Efficacité</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {campaign.metrics.effectiveness.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${campaign.metrics.effectiveness}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Portée</span>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {(campaign.metrics.reach / 1000).toFixed(0)}K
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Engagement</span>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {campaign.metrics.engagement.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Team and Timeline */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {campaign.team.lead}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {campaign.timeline.duration}j
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button className="flex-1 text-center py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                Voir détails
              </button>
              <button className="flex-1 text-center py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <Shield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucune campagne trouvée</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Commencez par créer votre première campagne de contre-communication.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Campagne
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'campaigns', label: 'Campagnes', icon: Shield },
    { id: 'threats', label: 'Menaces', icon: AlertTriangle },
    { id: 'analytics', label: 'Analyses', icon: TrendingUp },
    { id: 'assets', label: 'Ressources', icon: FileText }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Shield className="w-8 h-8 mr-3 text-blue-600" />
                Campagnes de Riposte
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Combattez la désinformation et coordonnez vos contre-narratifs
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <Settings className="w-4 h-4" />
                <span>Paramètres</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'campaigns' && renderCampaignsTab()}
        {activeTab === 'threats' && (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Analyse des Menaces</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Module d'analyse des menaces en cours de développement.
            </p>
          </div>
        )}
        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Analyses Avancées</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tableaux de bord d'analyse en cours de développement.
            </p>
          </div>
        )}
        {activeTab === 'assets' && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Bibliothèque de Ressources</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gestionnaire de ressources créatives en cours de développement.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};