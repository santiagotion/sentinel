import React, { useEffect, useRef, useState } from 'react';
import { Network, Search, Filter, Download, Maximize2, Settings, Info, Zap, Users, Shield, Building, Globe } from 'lucide-react';

interface NetworkNode {
  id: string;
  name: string;
  type: 'person' | 'organization' | 'location' | 'event' | 'keyword';
  importance: number;
  connections: string[];
  properties: Record<string, any>;
}

interface NetworkGraphProps {
  nodes?: NetworkNode[];
  onNodeClick?: (node: NetworkNode) => void;
  height?: number;
}

export function NetworkGraph({ nodes = [], onNodeClick, height = 600 }: NetworkGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Mock data if no nodes provided
  const mockNodes: NetworkNode[] = [
    {
      id: '1',
      name: 'Président Tshisekedi',
      type: 'person',
      importance: 100,
      connections: ['2', '3', '5'],
      properties: { position: 'Président', influence: 95, location: 'Kinshasa' }
    },
    {
      id: '2',
      name: 'Gouvernement RDC',
      type: 'organization',
      importance: 90,
      connections: ['1', '3', '4', '6'],
      properties: { type: 'Gouvernement', members: 48, budget: '12.5B USD' }
    },
    {
      id: '3',
      name: 'Opposition Politique',
      type: 'organization',
      importance: 75,
      connections: ['1', '2', '7'],
      properties: { type: 'Coalition', members: 23, support: '34%' }
    },
    {
      id: '4',
      name: 'FARDC',
      type: 'organization',
      importance: 85,
      connections: ['2', '5', '8'],
      properties: { type: 'Forces Armées', personnel: '134K', budget: '450M USD' }
    },
    {
      id: '5',
      name: 'Nord-Kivu',
      type: 'location',
      importance: 80,
      connections: ['1', '4', '8', '9'],
      properties: { population: '8.1M', riskLevel: 'Élevé', resources: 'Cobalt, Or' }
    },
    {
      id: '6',
      name: 'Élections 2023',
      type: 'event',
      importance: 95,
      connections: ['2', '3', '7'],
      properties: { date: '2023-12-20', turnout: '68%', controversy: 'Modérée' }
    },
    {
      id: '7',
      name: 'Manifestations',
      type: 'keyword',
      importance: 60,
      connections: ['3', '6', '10'],
      properties: { frequency: 'Hebdomadaire', intensity: 'Moyenne', sentiment: 'Négatif' }
    },
    {
      id: '8',
      name: 'Groupes Armés',
      type: 'organization',
      importance: 70,
      connections: ['4', '5', '9'],
      properties: { count: '120+', members: '15K', activity: 'Élevée' }
    },
    {
      id: '9',
      name: 'Ressources Minières',
      type: 'keyword',
      importance: 85,
      connections: ['5', '8', '10'],
      properties: { value: '24B USD', extraction: '2.3M tonnes', conflicts: 'Fréquents' }
    },
    {
      id: '10',
      name: 'Société Civile',
      type: 'organization',
      importance: 65,
      connections: ['7', '9'],
      properties: { organizations: '450+', members: '2.3M', influence: 'Modérée' }
    }
  ];

  const dataNodes = nodes.length > 0 ? nodes : mockNodes;

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'person': return '#3B82F6';
      case 'organization': return '#EF4444';
      case 'location': return '#10B981';
      case 'event': return '#F59E0B';
      case 'keyword': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'person': return Users;
      case 'organization': return Building;
      case 'location': return Globe;
      case 'event': return Zap;
      case 'keyword': return Search;
      default: return Info;
    }
  };

  const filteredNodes = dataNodes.filter(node => {
    const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || node.type === filterType;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Clear previous content
    svg.innerHTML = '';

    const width = svg.clientWidth;
    const svgHeight = height;

    // Create simulation layout (simplified force-directed)
    const positions = new Map();
    const centerX = width / 2;
    const centerY = svgHeight / 2;
    const radius = Math.min(width, svgHeight) * 0.35;

    filteredNodes.forEach((node, index) => {
      const angle = (index / filteredNodes.length) * 2 * Math.PI;
      const distance = radius * (0.6 + (node.importance / 100) * 0.4);
      positions.set(node.id, {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance
      });
    });

    // Draw connections
    const connectionsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    connectionsGroup.setAttribute('class', 'connections');
    svg.appendChild(connectionsGroup);

    filteredNodes.forEach(node => {
      const nodePos = positions.get(node.id);
      if (!nodePos) return;

      node.connections.forEach(connectionId => {
        const connectedNode = filteredNodes.find(n => n.id === connectionId);
        if (!connectedNode) return;

        const connectedPos = positions.get(connectionId);
        if (!connectedPos) return;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', nodePos.x.toString());
        line.setAttribute('y1', nodePos.y.toString());
        line.setAttribute('x2', connectedPos.x.toString());
        line.setAttribute('y2', connectedPos.y.toString());
        line.setAttribute('stroke', '#E5E7EB');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('opacity', '0.6');
        connectionsGroup.appendChild(line);
      });
    });

    // Draw nodes
    const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    nodesGroup.setAttribute('class', 'nodes');
    svg.appendChild(nodesGroup);

    filteredNodes.forEach(node => {
      const nodePos = positions.get(node.id);
      if (!nodePos) return;

      const nodeSize = 8 + (node.importance / 100) * 12;

      // Node circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', nodePos.x.toString());
      circle.setAttribute('cy', nodePos.y.toString());
      circle.setAttribute('r', nodeSize.toString());
      circle.setAttribute('fill', getNodeColor(node.type));
      circle.setAttribute('stroke', '#FFFFFF');
      circle.setAttribute('stroke-width', '3');
      circle.setAttribute('cursor', 'pointer');
      circle.setAttribute('class', 'hover:opacity-80 transition-opacity');

      circle.addEventListener('click', () => {
        setSelectedNode(node);
        onNodeClick?.(node);
      });

      nodesGroup.appendChild(circle);

      // Node label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', nodePos.x.toString());
      text.setAttribute('y', (nodePos.y + nodeSize + 16).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-weight', '600');
      text.setAttribute('fill', '#374151');
      text.textContent = node.name.length > 15 ? node.name.substring(0, 15) + '...' : node.name;
      nodesGroup.appendChild(text);
    });

  }, [filteredNodes, height, searchTerm, filterType]);

  const nodeTypes = ['all', 'person', 'organization', 'location', 'event', 'keyword'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Network className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Graphe de Relations
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher des entités..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {nodeTypes.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'Tous les types' :
               type === 'person' ? 'Personnes' :
               type === 'organization' ? 'Organisations' :
               type === 'location' ? 'Lieux' :
               type === 'event' ? 'Événements' : 'Mots-clés'}
            </option>
          ))}
        </select>
      </div>

      {/* Graph Container */}
      <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <svg
          ref={svgRef}
          width="100%"
          height={height}
          className="bg-gray-50 dark:bg-gray-900"
        />
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">
            Types d'entités
          </h4>
          <div className="space-y-2">
            {[
              { type: 'person', label: 'Personnes', color: '#3B82F6' },
              { type: 'organization', label: 'Organisations', color: '#EF4444' },
              { type: 'location', label: 'Lieux', color: '#10B981' },
              { type: 'event', label: 'Événements', color: '#F59E0B' },
              { type: 'keyword', label: 'Mots-clés', color: '#8B5CF6' }
            ].map(item => (
              <div key={item.type} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-bold text-gray-800 dark:text-gray-200">
              {selectedNode.name}
            </h4>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Type</p>
              <p className="text-gray-800 dark:text-gray-200 capitalize">{selectedNode.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Importance</p>
              <p className="text-gray-800 dark:text-gray-200">{selectedNode.importance}%</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Connexions</p>
              <p className="text-gray-800 dark:text-gray-200">{selectedNode.connections.length}</p>
            </div>
          </div>
          
          {/* Additional Properties */}
          {Object.keys(selectedNode.properties).length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Détails</h5>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(selectedNode.properties).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {typeof value === 'object' ? JSON.stringify(value) : value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {filteredNodes.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Entités</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {filteredNodes.reduce((sum, node) => sum + node.connections.length, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Connexions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {Math.round(filteredNodes.reduce((sum, node) => sum + node.importance, 0) / filteredNodes.length)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Importance Moy.</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {new Set(filteredNodes.map(n => n.type)).size}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Types</div>
        </div>
      </div>
    </div>
  );
}