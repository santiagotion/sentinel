import React, { useState, useEffect } from 'react';
import { X, Users, GitBranch, Eye, BarChart3, ExternalLink, Share2, Download, Filter } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { AdvancedNetworkViz } from '../visualizations/AdvancedNetworkViz';
import { NetworkService, NetworkNode as ServiceNetworkNode, NetworkEdge } from '../../services/NetworkService';

// TypeScript interfaces
interface NetworkNode {
  id: number;
  name: string;
  type: 'official' | 'media' | 'influencer' | 'activist';
  influence: number;
  connections: number;
}

interface CascadeDataPoint {
  time: string;
  original: number;
  firstGen: number;
  secondGen: number;
  thirdGen: number;
}

interface Community {
  name: string;
  members: number;
  color: string;
  overlap: number;
}

type NetworkView = 'influence' | 'cascade' | 'communities';

export function NetworkScreen() {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [networkView, setNetworkView] = useState<NetworkView>('influence');
  const [networkData, setNetworkData] = useState<{ nodes: ServiceNetworkNode[]; edges: NetworkEdge[] }>({ nodes: [], edges: [] });
  const [layoutType, setLayoutType] = useState<'force' | 'hierarchical' | 'circular' | 'grid'>('force');
  const [colorScheme, setColorScheme] = useState<'default' | 'sentiment' | 'influence' | 'type'>('type');
  const [showLabels, setShowLabels] = useState(true);
  const [containerDimensions, setContainerDimensions] = useState({ width: 1200, height: 800 });
  const networkService = new NetworkService();

  // Network nodes data
  const networkNodes: NetworkNode[] = [
    { id: 1, name: 'MinSécuritéRDC', type: 'official', influence: 95, connections: 12 },
    { id: 2, name: 'InfoCongo24', type: 'media', influence: 87, connections: 8 },
    { id: 3, name: 'CitoyenEngagé', type: 'influencer', influence: 72, connections: 15 },
    { id: 4, name: 'RDCNews', type: 'media', influence: 68, connections: 6 },
    { id: 5, name: 'ActivisteDRC', type: 'activist', influence: 55, connections: 9 }
  ];

  // Information cascade timeline
  const cascadeData: CascadeDataPoint[] = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    original: i === 0 ? 100 : 0,
    firstGen: i > 0 && i < 4 ? 50 * (4 - i) : 0,
    secondGen: i > 2 && i < 8 ? 30 * (8 - i) : 0,
    thirdGen: i > 5 && i < 12 ? 20 * (12 - i) : 0
  }));

  // Community detection data
  const communities: Community[] = [
    { name: 'Gouvernement', members: 234, color: 'from-blue-500 to-blue-600', overlap: 15 },
    { name: 'Opposition', members: 189, color: 'from-red-500 to-red-600', overlap: 8 },
    { name: 'Société Civile', members: 342, color: 'from-green-500 to-green-600', overlap: 23 },
    { name: 'Médias', members: 156, color: 'from-purple-500 to-purple-600', overlap: 31 }
  ];

  // Load network data
  useEffect(() => {
    const loadNetworkData = async () => {
      try {
        const data = await networkService.getNetworkData();
        console.log('Network data loaded:', data.nodes.length, 'nodes,', data.edges.length, 'edges');
        setNetworkData(data);
      } catch (error) {
        console.error('Failed to load network data:', error);
      }
    };
    
    loadNetworkData();
    
    // Refresh data periodically
    const interval = setInterval(loadNetworkData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Handle responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector('.network-visualization-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        setContainerDimensions({
          width: Math.max(800, rect.width - 64), // Account for padding
          height: 800
        });
      } else {
        setContainerDimensions({
          width: Math.max(800, window.innerWidth - 120),
          height: 800
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleNodeClick = (node: ServiceNetworkNode) => {
    // Could open a detailed view or perform actions
    console.log('Node clicked:', node.label);
  };

  const handleEdgeClick = (edge: NetworkEdge) => {
    // Could show edge details
    console.log('Edge clicked:', edge.type);
  };

  const getNodeColor = (type: NetworkNode['type']): string => {
    switch (type) {
      case 'official': return 'from-blue-400 to-blue-600';
      case 'media': return 'from-purple-400 to-purple-600';
      case 'influencer': return 'from-green-400 to-green-600';
      case 'activist': return 'from-orange-400 to-orange-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Intelligence Réseau</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Analyse des connexions et influences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {(['influence', 'cascade', 'communities'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setNetworkView(view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                networkView === view
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {view === 'influence' && 'Carte d\'Influence'}
              {view === 'cascade' && 'Cascade d\'Information'}
              {view === 'communities' && 'Communautés'}
            </button>
          ))}
        </div>
      </div>

      {/* Network View */}
      {networkView === 'influence' && (
        <>
          {/* Professional D3.js Network Graph */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <div className="mb-4">
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Analyse du Réseau d'Influence</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {networkData.nodes.length} nœuds • {networkData.edges.length} connexions • Layout: {layoutType}
                </p>
              </div>

              {/* Network Controls */}
              <div className="flex flex-wrap gap-4 justify-center mb-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">Layout:</label>
                  <select 
                    value={layoutType} 
                    onChange={(e) => setLayoutType(e.target.value as any)}
                    className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="force">Force</option>
                    <option value="hierarchical">Hiérarchique</option>
                    <option value="circular">Circulaire</option>
                    <option value="grid">Grille</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">Couleurs:</label>
                  <select 
                    value={colorScheme} 
                    onChange={(e) => setColorScheme(e.target.value as any)}
                    className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="type">Par Type</option>
                    <option value="influence">Par Influence</option>
                    <option value="sentiment">Par Sentiment</option>
                    <option value="default">Défaut</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    <input 
                      type="checkbox" 
                      checked={showLabels} 
                      onChange={(e) => setShowLabels(e.target.checked)}
                      className="mr-1"
                    />
                    Afficher labels
                  </label>
                </div>
              </div>
            </div>
            
            {networkData.nodes.length > 0 ? (
              <div className="relative w-full network-visualization-container">
                <AdvancedNetworkViz
                  nodes={networkData.nodes}
                  edges={networkData.edges}
                  width={containerDimensions.width}
                  height={containerDimensions.height}
                />
              </div>
            ) : (
              <div className="h-[500px] flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Chargement des données réseau...</p>
                </div>
              </div>
            )}
          </div>

          {/* Network Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Nœuds Actifs</h5>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">127</p>
              <p className="text-sm text-green-600 mt-1">+15 cette semaine</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Connexions</h5>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">892</p>
              <p className="text-sm text-blue-600 mt-1">Densité: 0.72</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Vitesse Propagation</h5>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">2.4h</p>
              <p className="text-sm text-yellow-600 mt-1">Temps moyen</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Portée Max</h5>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">450K</p>
              <p className="text-sm text-purple-600 mt-1">Par propagation</p>
            </div>
          </div>
        </>
      )}

      {networkView === 'cascade' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Cascade d'Information</h4>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={cascadeData}>
              <defs>
                <linearGradient id="originalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="firstGenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="secondGenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="thirdGenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="original" stackId="1" stroke="#3B82F6" fillOpacity={1} fill="url(#originalGrad)" name="Source originale" />
              <Area type="monotone" dataKey="firstGen" stackId="1" stroke="#8B5CF6" fillOpacity={1} fill="url(#firstGenGrad)" name="1ère génération" />
              <Area type="monotone" dataKey="secondGen" stackId="1" stroke="#EC4899" fillOpacity={1} fill="url(#secondGenGrad)" name="2ème génération" />
              <Area type="monotone" dataKey="thirdGen" stackId="1" stroke="#F59E0B" fillOpacity={1} fill="url(#thirdGenGrad)" name="3ème génération" />
            </AreaChart>
          </ResponsiveContainer>

          {/* Cascade Metrics */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Vitesse de Propagation</h5>
              <div className="flex items-end space-x-2">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">3.2x</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">facteur viral</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Profondeur Max</h5>
              <div className="flex items-end space-x-2">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">7</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">générations</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Saturation</h5>
              <div className="flex items-end space-x-2">
                <p className="text-2xl font-bold text-gray-800 dark:text-white">12h</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">temps moyen</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {networkView === 'communities' && (
        <div className="space-y-6">
          {/* Community Bubbles */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Détection de Communautés</h4>
            <div className="relative h-96">
              {communities.map((community, index) => {
                const positions = [
                  { left: '25%', top: '30%' },
                  { left: '65%', top: '25%' },
                  { left: '30%', top: '65%' },
                  { left: '70%', top: '60%' }
                ];
                const size = 100 + (community.members / 3);
                
                return (
                  <div
                    key={community.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={positions[index]}
                  >
                    <div
                      className={`rounded-full bg-gradient-to-br ${community.color} opacity-30 absolute`}
                      style={{
                        width: `${size * 1.2}px`,
                        height: `${size * 1.2}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                    <div
                      className={`rounded-full bg-gradient-to-br ${community.color} opacity-50 absolute`}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                    <div
                      className={`rounded-full bg-gradient-to-br ${community.color} flex flex-col items-center justify-center text-white relative`}
                      style={{
                        width: `${size * 0.8}px`,
                        height: `${size * 0.8}px`
                      }}
                    >
                      <p className="font-semibold text-lg">{community.members}</p>
                      <p className="text-sm opacity-90">{community.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Community Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communities.map((community) => (
              <div key={community.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${community.color} rounded-xl mb-4`} />
                <h5 className="font-semibold text-gray-800 dark:text-white mb-2">{community.name}</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Membres:</span>
                    <span className="font-medium">{community.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Chevauchement:</span>
                    <span className="font-medium">{community.overlap}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Croissance:</span>
                    <span className="font-medium text-green-600">+12%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}