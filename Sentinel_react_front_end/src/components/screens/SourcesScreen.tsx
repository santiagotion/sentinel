import React, { useState } from 'react';
import { X } from 'lucide-react';
import { 
  PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip
} from 'recharts';
import { Source, PlatformMetrics, ContentTypeDistribution } from '../../types';
import { getSourceIconByType, getStatusColor } from '../../utils/sourceUtils';

export function SourcesScreen() {
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [timeRange, setTimeRange] = useState('7d');

  // Source data
  const sources: Source[] = [
    {
      id: 1,
      name: 'Radio Okapi',
      type: 'news',
      credibility: 92,
      volume: 450,
      influence: 85,
      reach: 1250000,
      avgEngagement: 3.2,
      status: 'active',
      lastActive: '5 min'
    },
    {
      id: 2,
      name: 'Congo News Agency',
      type: 'news',
      credibility: 88,
      volume: 380,
      influence: 75,
      reach: 980000,
      avgEngagement: 2.8,
      status: 'active',
      lastActive: '12 min'
    },
    {
      id: 3,
      name: 'Facebook Pages',
      type: 'social',
      credibility: 45,
      volume: 1200,
      influence: 65,
      reach: 3450000,
      avgEngagement: 5.6,
      status: 'active',
      lastActive: '1 min'
    },
    {
      id: 4,
      name: 'Twitter Accounts',
      type: 'social',
      credibility: 52,
      volume: 890,
      influence: 55,
      reach: 2100000,
      avgEngagement: 4.2,
      status: 'active',
      lastActive: '2 min'
    },
    {
      id: 5,
      name: 'WhatsApp Groups',
      type: 'social',
      credibility: 30,
      volume: 2000,
      influence: 45,
      reach: 890000,
      avgEngagement: 8.9,
      status: 'monitoring',
      lastActive: '8 min'
    },
    {
      id: 6,
      name: 'Blogs Indépendants',
      type: 'blog',
      credibility: 65,
      volume: 320,
      influence: 40,
      reach: 450000,
      avgEngagement: 1.8,
      status: 'active',
      lastActive: '45 min'
    }
  ];

  // Platform comparison data
  const platformData: PlatformMetrics[] = [
    { platform: 'Facebook', speed: 95, reach: 92, accuracy: 45, engagement: 88 },
    { platform: 'Twitter', speed: 85, reach: 78, accuracy: 52, engagement: 72 },
    { platform: 'News', speed: 60, reach: 85, accuracy: 88, engagement: 65 },
    { platform: 'Forums', speed: 40, reach: 45, accuracy: 70, engagement: 82 }
  ];

  // Content type distribution
  const contentTypes: ContentTypeDistribution = {
    Facebook: [
      { name: 'Texte', value: 40, color: '#3B82F6' },
      { name: 'Image', value: 35, color: '#10B981' },
      { name: 'Vidéo', value: 20, color: '#F59E0B' },
      { name: 'Lien', value: 5, color: '#EF4444' }
    ],
    Twitter: [
      { name: 'Texte', value: 60, color: '#3B82F6' },
      { name: 'Image', value: 25, color: '#10B981' },
      { name: 'Vidéo', value: 10, color: '#F59E0B' },
      { name: 'Lien', value: 5, color: '#EF4444' }
    ]
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Analyse des Sources</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Performance et fiabilité des sources d'information
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="24h">24 heures</option>
          <option value="7d">7 jours</option>
          <option value="30d">30 jours</option>
        </select>
      </div>

      {/* Source Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((source) => {
          const Icon = getSourceIconByType(source.type);
          
          return (
            <div
              key={source.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer"
              onClick={() => setSelectedSource(source)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">{source.name}</h4>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(source.status)}`}>
                      {source.status === 'active' ? 'Actif' : 'Surveillance'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Crédibilité</span>
                    <span className={`font-medium ${
                      source.credibility >= 70 ? 'text-green-600' :
                      source.credibility >= 50 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {source.credibility}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        source.credibility >= 70 ? 'bg-green-500' :
                        source.credibility >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${source.credibility}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Volume</span>
                    <p className="font-semibold text-gray-800 dark:text-white">{source.volume}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Influence</span>
                    <p className="font-semibold text-gray-800 dark:text-white">{source.influence}%</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Portée</span>
                    <p className="font-semibold text-gray-800 dark:text-white">{(source.reach / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Engagement</span>
                    <p className="font-semibold text-gray-800 dark:text-white">{source.avgEngagement}%</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                  Dernière activité: {source.lastActive}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Platform Comparison */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Comparaison des Plateformes</h4>
        <div className="space-y-6">
          {platformData.map((platform) => (
            <div key={platform.platform} className="space-y-4">
              <h5 className="font-medium text-gray-800 dark:text-white">{platform.platform}</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(platform).filter(([key]) => key !== 'platform').map(([metric, value]) => (
                  <div key={metric} className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 capitalize">{metric}</div>
                    <div className="relative">
                      <svg className="w-20 h-20 mx-auto">
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          className="text-gray-200 dark:text-gray-700"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="35"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${value * 2.2} 220`}
                          strokeDashoffset="0"
                          className="text-blue-500 transform -rotate-90 origin-center transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-800 dark:text-white">{value}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(contentTypes).map(([platform, types]) => (
          <div key={platform} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
              Distribution de Contenu - {platform}
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={types}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {types.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {types.map((type) => (
                <div key={type.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: type.color }} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {type.name} ({type.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Source Modal */}
      {selectedSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedSource.name}</h3>
              <button
                onClick={() => setSelectedSource(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Detailed metrics */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Performance Globale</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Crédibilité</span>
                      <span className="font-medium">{selectedSource.credibility}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Volume quotidien</span>
                      <span className="font-medium">{selectedSource.volume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Score d'influence</span>
                      <span className="font-medium">{selectedSource.influence}%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Engagement</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Portée totale</span>
                      <span className="font-medium">{(selectedSource.reach / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Taux moyen</span>
                      <span className="font-medium">{selectedSource.avgEngagement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Croissance</span>
                      <span className="font-medium text-green-600">+12.5%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Configurer alertes
                </button>
                <button className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  Voir historique
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}