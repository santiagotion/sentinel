import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Network, Users, Globe, Target, Zap, Activity, Brain, 
  Search, Filter, Download, RefreshCw, Maximize2, Settings,
  Eye, EyeOff, Play, Pause, SkipForward, SkipBack, Sliders,
  ChevronDown, ChevronRight, Share2, Bookmark, Info, AlertTriangle,
  MapPin, Clock, Hash, Star, Link, ExternalLink, Plus, Minus,
  RotateCcw, RotateCw, ZoomIn, ZoomOut, Layers, PieChart
} from 'lucide-react';

interface NetworkNode {
  id: string;
  label: string;
  type: 'person' | 'organization' | 'location' | 'event' | 'topic';
  size: number;
  influence: number;
  sentiment: number;
  connections: number;
  verified: boolean;
  metadata: {
    description?: string;
    location?: string;
    category?: string;
    lastActivity?: Date;
    platform?: string;
  };
}

interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
  type: 'communication' | 'influence' | 'collaboration' | 'conflict' | 'mention';
  strength: number;
  bidirectional: boolean;
}

interface AdvancedNetworkVisualizationProps {
  initialData?: {
    nodes: NetworkNode[];
    edges: NetworkEdge[];
  };
}

export function AdvancedNetworkVisualization({ initialData }: AdvancedNetworkVisualizationProps) {
  const [networkData, setNetworkData] = useState<{nodes: NetworkNode[], edges: NetworkEdge[]} | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<NetworkEdge | null>(null);
  const [viewMode, setViewMode] = useState<'network' | 'hierarchy' | 'clusters' | 'timeline'>('network');
  const [filterSettings, setFilterSettings] = useState({
    minInfluence: 0,
    nodeTypes: ['all'],
    edgeTypes: ['all'],
    sentimentFilter: 'all',
    verified: 'all',
    timeRange: '7d'
  });
  const [layoutSettings, setLayoutSettings] = useState({
    algorithm: 'force-directed',
    spacing: 50,
    gravity: 0.1,
    repulsion: 100,
    attraction: 0.1
  });
  const [visualization, setVisualization] = useState({
    zoom: 1,
    pan: { x: 0, y: 0 },
    showLabels: true,
    showEdgeLabels: false,
    colorBy: 'type',
    sizeBy: 'influence',
    animationSpeed: 1
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [expandedPanels, setExpandedPanels] = useState({
    filters: true,
    layout: false,
    analysis: true,
    selection: true
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [analysisType, setAnalysisType] = useState<'centrality' | 'clustering' | 'community'>('centrality');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [layoutDirection, setLayoutDirection] = useState<'horizontal' | 'vertical' | 'radial'>('radial');
  const [autoLayout, setAutoLayout] = useState(true);
  const [selectedNodes, setSelectedNodes] = useState<NetworkNode[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<NetworkEdge[]>([]);
  const [communityGroups, setCommunityGroups] = useState<{[key: string]: string[]}>({});
  const [clusteringCoefficient, setClusteringCoefficient] = useState<number>(0);
  const [networkDensity, setNetworkDensity] = useState<number>(0);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'gexf'>('json');

  // Generate mock network data - memoized to prevent re-generation
  const generateNetworkData = useMemo(() => () => {
    const nodeTypes: NetworkNode['type'][] = ['person', 'organization', 'location', 'event', 'topic'];
    const edgeTypes: NetworkEdge['type'][] = ['communication', 'influence', 'collaboration', 'conflict', 'mention'];
    const locations = ['Kinshasa', 'Nord-Kivu', 'Sud-Kivu', 'Katanga', 'Kasaï'];
    const categories = ['Politique', 'Sécurité', 'Social', 'Économie', 'Média'];

    // Generate nodes
    const nodes: NetworkNode[] = Array.from({ length: 50 }, (_, i) => {
      const type = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
      const influence = Math.floor(Math.random() * 100) + 1;
      
      return {
        id: `node_${i}`,
        label: type === 'person' ? `Personne ${i + 1}` :
               type === 'organization' ? `Organisation ${i + 1}` :
               type === 'location' ? locations[Math.floor(Math.random() * locations.length)] :
               type === 'event' ? `Événement ${i + 1}` :
               `Sujet ${i + 1}`,
        type,
        size: Math.floor(influence / 10) + 5,
        influence,
        sentiment: (Math.random() - 0.5) * 2,
        connections: Math.floor(Math.random() * 20) + 1,
        verified: Math.random() > 0.7,
        metadata: {
          description: `Description détaillée du nœud ${i + 1}`,
          location: Math.random() > 0.5 ? locations[Math.floor(Math.random() * locations.length)] : undefined,
          category: categories[Math.floor(Math.random() * categories.length)],
          lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          platform: Math.random() > 0.5 ? ['Twitter', 'Facebook', 'WhatsApp'][Math.floor(Math.random() * 3)] : undefined
        }
      };
    });

    // Generate edges
    const edges: NetworkEdge[] = [];
    for (let i = 0; i < 80; i++) {
      const source = nodes[Math.floor(Math.random() * nodes.length)];
      const target = nodes[Math.floor(Math.random() * nodes.length)];
      
      if (source.id !== target.id && !edges.find(e => 
        (e.source === source.id && e.target === target.id) || 
        (e.source === target.id && e.target === source.id)
      )) {
        const type = edgeTypes[Math.floor(Math.random() * edgeTypes.length)];
        const weight = Math.random();
        
        edges.push({
          id: `edge_${i}`,
          source: source.id,
          target: target.id,
          weight,
          type,
          strength: weight * 100,
          bidirectional: Math.random() > 0.6
        });
      }
    }

    return { nodes, edges };
  }, []);

  useEffect(() => {
    if (initialData) {
      setNetworkData(initialData);
    } else {
      setNetworkData(generateNetworkData);
    }
  }, [initialData, generateNetworkData]);

  const getNodeColor = (node: NetworkNode) => {
    switch (visualization.colorBy) {
      case 'type':
        return node.type === 'person' ? '#3B82F6' :
               node.type === 'organization' ? '#EF4444' :
               node.type === 'location' ? '#10B981' :
               node.type === 'event' ? '#F59E0B' : '#8B5CF6';
      case 'influence':
        return `hsl(${Math.round((1 - node.influence / 100) * 120)}, 70%, 50%)`;
      case 'sentiment':
        return node.sentiment > 0.2 ? '#10B981' :
               node.sentiment < -0.2 ? '#EF4444' : '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getNodeSize = (node: NetworkNode) => {
    switch (visualization.sizeBy) {
      case 'influence':
        return Math.max(5, node.influence / 5);
      case 'connections':
        return Math.max(5, node.connections * 2);
      default:
        return node.size;
    }
  };

  const filteredData = networkData ? {
    nodes: networkData.nodes.filter(node => {
      if (node.influence < filterSettings.minInfluence) return false;
      if (!filterSettings.nodeTypes.includes('all') && !filterSettings.nodeTypes.includes(node.type)) return false;
      if (filterSettings.verified !== 'all' && 
          ((filterSettings.verified === 'verified' && !node.verified) ||
           (filterSettings.verified === 'unverified' && node.verified))) return false;
      if (filterSettings.sentimentFilter !== 'all' &&
          ((filterSettings.sentimentFilter === 'positive' && node.sentiment <= 0.2) ||
           (filterSettings.sentimentFilter === 'negative' && node.sentiment >= -0.2) ||
           (filterSettings.sentimentFilter === 'neutral' && Math.abs(node.sentiment) > 0.2))) return false;
      return true;
    }),
    edges: networkData.edges.filter(edge => {
      if (!filterSettings.edgeTypes.includes('all') && !filterSettings.edgeTypes.includes(edge.type)) return false;
      return true;
    })
  } : { nodes: [], edges: [] };

  const togglePanel = (panel: string) => {
    setExpandedPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
  };

  const handleNodeClick = (nodeId: string) => {
    const node = filteredData.nodes.find(n => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
      setSelectedEdge(null);
    }
  };

  const handleEdgeClick = (edgeId: string) => {
    const edge = filteredData.edges.find(e => e.id === edgeId);
    if (edge) {
      setSelectedEdge(edge);
      setSelectedNode(null);
    }
  };

  const exportNetwork = async () => {
    try {
      const { exportNetworkData } = await import('../../utils/exportUtils');
      await exportNetworkData({
        nodes: filteredData.nodes,
        edges: filteredData.edges
      }, 'json');
      
      // Also create a notification if available
      if (typeof success === 'function') {
        success('Export réussi', 'Données réseau exportées avec succès');
      }
    } catch (err) {
      console.error('Export failed:', err);
      if (typeof error === 'function') {
        error('Erreur d\'export', 'Impossible d\'exporter les données réseau');
      } else {
        alert('Erreur lors de l\'exportation des données réseau');
      }
    }
  };

  // Enhanced node analysis
  const analyzeNode = (nodeId: string) => {
    const node = filteredData.nodes.find(n => n.id === nodeId);
    if (!node) return;

    const connections = filteredData.edges.filter(e => e.source === nodeId || e.target === nodeId);
    const neighbors = connections.map(e => e.source === nodeId ? e.target : e.source)
      .map(id => filteredData.nodes.find(n => n.id === id))
      .filter(Boolean);

    const analysis = {
      centrality: connections.length / (filteredData.nodes.length - 1),
      influence: node.influence,
      clusteringCoefficient: calculateClusteringCoefficient(nodeId),
      neighborTypes: neighbors.reduce((acc, neighbor) => {
        acc[neighbor!.type] = (acc[neighbor!.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };

    if (typeof info === 'function') {
      info('Analyse de nœud', `${node.label}: Centralité ${(analysis.centrality * 100).toFixed(1)}%, Influence ${node.influence}`);
    }
    
    return analysis;
  };

  const calculateClusteringCoefficient = (nodeId: string) => {
    const neighbors = filteredData.edges
      .filter(e => e.source === nodeId || e.target === nodeId)
      .map(e => e.source === nodeId ? e.target : e.source);
    
    if (neighbors.length < 2) return 0;
    
    let connections = 0;
    for (let i = 0; i < neighbors.length; i++) {
      for (let j = i + 1; j < neighbors.length; j++) {
        if (filteredData.edges.some(e => 
          (e.source === neighbors[i] && e.target === neighbors[j]) ||
          (e.source === neighbors[j] && e.target === neighbors[i])
        )) {
          connections++;
        }
      }
    }
    
    return connections / ((neighbors.length * (neighbors.length - 1)) / 2);
  };

  // Enhanced view switching with notifications
  const switchViewMode = (mode: typeof viewMode) => {
    setViewMode(mode);
    if (typeof info === 'function') {
      info('Vue changée', `Passage en mode ${mode}`);
    }
  };

  // Node clustering analysis
  const detectCommunities = () => {
    // Simple community detection based on connections
    const communities: Record<string, string[]> = {};
    const visited = new Set<string>();
    
    filteredData.nodes.forEach(node => {
      if (!visited.has(node.id)) {
        const community = [node.id];
        const queue = [node.id];
        visited.add(node.id);
        
        while (queue.length > 0) {
          const currentId = queue.shift()!;
          const neighbors = filteredData.edges
            .filter(e => e.source === currentId || e.target === currentId)
            .map(e => e.source === currentId ? e.target : e.source)
            .filter(id => !visited.has(id));
          
          neighbors.forEach(neighborId => {
            if (!visited.has(neighborId)) {
              community.push(neighborId);
              queue.push(neighborId);
              visited.add(neighborId);
            }
          });
        }
        
        communities[`community_${Object.keys(communities).length + 1}`] = community;
      }
    });
    
    if (typeof success === 'function') {
      success('Communautés détectées', `${Object.keys(communities).length} communautés identifiées`);
    }
    
    return communities;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Network className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Analyse Réseau Avancée
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredData.nodes.length} nœuds, {filteredData.edges.length} connexions
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {['network', 'hierarchy', 'clusters', 'timeline'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors capitalize ${
                  viewMode === mode
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <button
            onClick={exportNetwork}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2 inline" />
            Exporter
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar - Controls */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 overflow-y-auto max-h-[600px]">
          {/* Filters Panel */}
          <div className="p-4">
            <button
              onClick={() => togglePanel('filters')}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-800 dark:text-white mb-3"
            >
              <span className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filtres</span>
              </span>
              {expandedPanels.filters ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            
            {expandedPanels.filters && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Influence minimale: {filterSettings.minInfluence}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filterSettings.minInfluence}
                    onChange={(e) => setFilterSettings(prev => ({ ...prev, minInfluence: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Types de nœuds
                  </label>
                  <div className="space-y-1">
                    {['all', 'person', 'organization', 'location', 'event', 'topic'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filterSettings.nodeTypes.includes(type)}
                          onChange={(e) => {
                            if (type === 'all') {
                              setFilterSettings(prev => ({
                                ...prev,
                                nodeTypes: e.target.checked ? ['all'] : []
                              }));
                            } else {
                              setFilterSettings(prev => ({
                                ...prev,
                                nodeTypes: prev.nodeTypes.includes('all') 
                                  ? [type]
                                  : e.target.checked 
                                    ? [...prev.nodeTypes.filter(t => t !== 'all'), type]
                                    : prev.nodeTypes.filter(t => t !== type)
                              }));
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm capitalize">{type === 'all' ? 'Tous' : type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sentiment
                  </label>
                  <select
                    value={filterSettings.sentimentFilter}
                    onChange={(e) => setFilterSettings(prev => ({ ...prev, sentimentFilter: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="all">Tous</option>
                    <option value="positive">Positif</option>
                    <option value="negative">Négatif</option>
                    <option value="neutral">Neutre</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Visualization Settings Panel */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={() => togglePanel('layout')}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-800 dark:text-white mb-3"
            >
              <span className="flex items-center space-x-2">
                <Sliders className="w-4 h-4" />
                <span>Visualisation</span>
              </span>
              {expandedPanels.layout ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            
            {expandedPanels.layout && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Colorer par
                  </label>
                  <select
                    value={visualization.colorBy}
                    onChange={(e) => setVisualization(prev => ({ ...prev, colorBy: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="type">Type</option>
                    <option value="influence">Influence</option>
                    <option value="sentiment">Sentiment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Taille par
                  </label>
                  <select
                    value={visualization.sizeBy}
                    onChange={(e) => setVisualization(prev => ({ ...prev, sizeBy: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="influence">Influence</option>
                    <option value="connections">Connexions</option>
                    <option value="default">Par défaut</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Libellés</span>
                  <button
                    onClick={() => setVisualization(prev => ({ ...prev, showLabels: !prev.showLabels }))}
                    className={`p-1 rounded ${visualization.showLabels ? 'text-blue-600' : 'text-gray-400'}`}
                  >
                    {visualization.showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Panel */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={() => togglePanel('analysis')}
              className="flex items-center justify-between w-full text-left font-semibold text-gray-800 dark:text-white mb-3"
            >
              <span className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Analyse</span>
              </span>
              {expandedPanels.analysis ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            
            {expandedPanels.analysis && (
              <div className="space-y-3">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Densité du réseau</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {((filteredData.edges.length / (filteredData.nodes.length * (filteredData.nodes.length - 1) / 2)) * 100).toFixed(1)}%
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Diamètre</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {Math.ceil(Math.log(filteredData.nodes.length) / Math.log(2))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Centralité moyenne</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {(filteredData.nodes.reduce((sum, node) => sum + node.connections, 0) / filteredData.nodes.length).toFixed(1)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Visualization Area */}
        <div className="flex-1 relative">
          {/* Visualization Canvas */}
          <div className="relative h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Mock Network Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full overflow-hidden">
                {/* Render simplified network visualization */}
                <svg className="w-full h-full" style={{ backgroundColor: 'transparent' }}>
                  {/* Render edges */}
                  {filteredData.edges.slice(0, 25).map((edge, i) => {
                    // Create more distributed edge positions
                    const sourceIndex = filteredData.nodes.findIndex(n => n.id === edge.source);
                    const targetIndex = filteredData.nodes.findIndex(n => n.id === edge.target);
                    
                    if (sourceIndex === -1 || targetIndex === -1) return null;
                    
                    // Use circular distribution for better spacing
                    const centerX = 400;
                    const centerY = 280;
                    const radius = 180;
                    
                    const sourceAngle = (sourceIndex / Math.max(1, filteredData.nodes.length)) * 2 * Math.PI;
                    const targetAngle = (targetIndex / Math.max(1, filteredData.nodes.length)) * 2 * Math.PI;
                    
                    // Use edge ID for consistent offset
                    const edgeHash = edge.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    const offsetX1 = ((edgeHash % 80) - 40) * 0.5;
                    const offsetY1 = (((edgeHash * 3) % 80) - 40) * 0.5;
                    const offsetX2 = (((edgeHash * 5) % 80) - 40) * 0.5;
                    const offsetY2 = (((edgeHash * 7) % 80) - 40) * 0.5;
                    
                    const x1 = centerX + Math.cos(sourceAngle) * radius + offsetX1;
                    const y1 = centerY + Math.sin(sourceAngle) * radius + offsetY1;
                    const x2 = centerX + Math.cos(targetAngle) * radius + offsetX2;
                    const y2 = centerY + Math.sin(targetAngle) * radius + offsetY2;
                    
                    return (
                      <line
                        key={edge.id}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={edge.type === 'communication' ? '#3B82F6' :
                                edge.type === 'influence' ? '#EF4444' :
                                edge.type === 'collaboration' ? '#10B981' :
                                edge.type === 'conflict' ? '#F59E0B' : '#8B5CF6'}
                        strokeWidth={Math.max(1, edge.strength / 25)}
                        opacity={0.4}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleEdgeClick(edge.id)}
                      />
                    );
                  })}
                  
                  {/* Render nodes */}
                  {filteredData.nodes.slice(0, 25).map((node, i) => {
                    // Distribute nodes in a more natural circular pattern
                    const centerX = 400;
                    const centerY = 280;
                    const baseRadius = 120 + (i % 3) * 60; // Multiple rings
                    const angle = (i / Math.max(1, filteredData.nodes.slice(0, 25).length)) * 2 * Math.PI;
                    
                    // Use node ID hash for consistent positioning
                    const hash = node.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    const offsetX = ((hash % 100) - 50) * 0.8; // -40 to +40
                    const offsetY = (((hash * 7) % 100) - 50) * 0.8; // Different seed for Y
                    
                    const x = centerX + Math.cos(angle) * baseRadius + offsetX;
                    const y = centerY + Math.sin(angle) * baseRadius + offsetY;
                    
                    // Ensure nodes stay within bounds
                    const boundedX = Math.max(50, Math.min(750, x));
                    const boundedY = Math.max(50, Math.min(520, y));
                    
                    const size = Math.max(8, Math.min(20, getNodeSize(node)));
                    const color = getNodeColor(node);
                    
                    return (
                      <g key={node.id} className="cursor-pointer hover:opacity-90 transition-opacity" onClick={() => handleNodeClick(node.id)}>
                        <circle
                          cx={boundedX}
                          cy={boundedY}
                          r={size}
                          fill={color}
                          stroke={selectedNode?.id === node.id ? '#FFD700' : 'white'}
                          strokeWidth={selectedNode?.id === node.id ? 3 : 2}
                          className="drop-shadow-sm"
                        />
                        {visualization.showLabels && (
                          <text
                            x={boundedX}
                            y={boundedY + size + 16}
                            textAnchor="middle"
                            fontSize="11"
                            fill="currentColor"
                            className="font-medium text-gray-700 dark:text-gray-300 pointer-events-none"
                          >
                            {node.label.length > 12 ? node.label.substring(0, 12) + '...' : node.label}
                          </text>
                        )}
                        {node.verified && (
                          <circle
                            cx={boundedX + size - 4}
                            cy={boundedY - size + 4}
                            r="4"
                            fill="#10B981"
                            stroke="white"
                            strokeWidth="1"
                          />
                        )}
                        {/* Node influence indicator */}
                        <circle
                          cx={boundedX}
                          cy={boundedY}
                          r={size + 2}
                          fill="none"
                          stroke={color}
                          strokeWidth="1"
                          opacity={node.influence / 200}
                        />
                      </g>
                    );
                  })}
                </svg>
                
                {/* Overlay message */}
                <div className="absolute top-4 left-4 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-2 rounded-lg text-sm">
                  Visualisation interactive - Vue simplifiée
                </div>
              </div>
            </div>
            
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button
                onClick={() => setVisualization(prev => ({ ...prev, zoom: Math.min(prev.zoom * 1.2, 5) }))}
                className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded shadow hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setVisualization(prev => ({ ...prev, zoom: Math.max(prev.zoom / 1.2, 0.2) }))}
                className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded shadow hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={() => setVisualization(prev => ({ ...prev, zoom: 1, pan: { x: 0, y: 0 } }))}
                className="p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded shadow hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Target className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Selection Details */}
        {(selectedNode || selectedEdge) && (
          <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4 overflow-y-auto max-h-[600px]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-800 dark:text-white">
                {selectedNode ? 'Détails du Nœud' : 'Détails de la Connexion'}
              </h4>
              <button
                onClick={() => {
                  setSelectedNode(null);
                  setSelectedEdge(null);
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
            
            {selectedNode && (
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: getNodeColor(selectedNode) }}
                    ></div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-white">{selectedNode.label}</h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">{selectedNode.type}</span>
                    </div>
                    {selectedNode.verified && (
                      <Star className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Influence:</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">{selectedNode.influence}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Connexions:</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">{selectedNode.connections}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Sentiment:</span>
                      <span className={`text-sm font-medium ${
                        selectedNode.sentiment > 0.2 ? 'text-green-600' :
                        selectedNode.sentiment < -0.2 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {(selectedNode.sentiment * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedNode.metadata && (
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                    <h6 className="font-medium text-gray-800 dark:text-white mb-2">Métadonnées</h6>
                    <div className="space-y-2">
                      {selectedNode.metadata.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{selectedNode.metadata.location}</span>
                        </div>
                      )}
                      {selectedNode.metadata.category && (
                        <div className="flex items-center space-x-2">
                          <Hash className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{selectedNode.metadata.category}</span>
                        </div>
                      )}
                      {selectedNode.metadata.lastActivity && (
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedNode.metadata.lastActivity.toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                    Analyser en détail
                  </button>
                  <button className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-sm">
                    Voir connexions
                  </button>
                </div>
              </div>
            )}
            
            {selectedEdge && (
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 dark:text-white mb-3">
                    Connexion {selectedEdge.type}
                  </h5>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Force:</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">{selectedEdge.strength.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Bidirectionnelle:</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {selectedEdge.bidirectional ? 'Oui' : 'Non'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Poids:</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {(selectedEdge.weight * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}