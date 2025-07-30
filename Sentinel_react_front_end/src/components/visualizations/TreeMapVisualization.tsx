import React, { useState, useEffect, useRef } from 'react';
import { TreePine, Search, Filter, Download, Maximize2, ChevronDown, ChevronRight, BarChart3, PieChart } from 'lucide-react';

interface TreeMapData {
  id: string;
  name: string;
  value: number;
  children?: TreeMapData[];
  category?: string;
  metadata?: Record<string, any>;
  color?: string;
}

interface TreeMapProps {
  data?: TreeMapData[];
  height?: number;
  onNodeClick?: (node: TreeMapData) => void;
}

export function TreeMapVisualization({ data, height = 500, onNodeClick }: TreeMapProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNode, setSelectedNode] = useState<TreeMapData | null>(null);
  const [viewMode, setViewMode] = useState<'treemap' | 'hierarchy'>('treemap');
  const [searchTerm, setSearchTerm] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);

  // Mock data for Congo intelligence analysis
  const mockData: TreeMapData[] = [
    {
      id: 'security',
      name: 'Sécurité',
      value: 1000,
      color: '#EF4444',
      children: [
        {
          id: 'armed_conflicts',
          name: 'Conflits Armés',
          value: 450,
          color: '#DC2626',
          metadata: { incidents: 127, casualties: 456, provinces: ['Nord-Kivu', 'Sud-Kivu'] },
          children: [
            { id: 'militia_groups', name: 'Groupes Miliciens', value: 280, color: '#B91C1C' },
            { id: 'banditry', name: 'Banditisme', value: 170, color: '#991B1B' }
          ]
        },
        {
          id: 'civil_unrest',
          name: 'Troubles Civils',
          value: 350,
          color: '#F87171',
          metadata: { protests: 89, arrests: 234, cities: ['Kinshasa', 'Lubumbashi'] },
          children: [
            { id: 'political_protests', name: 'Manifestations Politiques', value: 200, color: '#FCA5A5' },
            { id: 'student_movements', name: 'Mouvements Étudiants', value: 150, color: '#FED7D7' }
          ]
        },
        {
          id: 'terrorism',
          name: 'Terrorisme',
          value: 200,
          color: '#7F1D1D',
          metadata: { threats: 23, investigations: 45, international: true }
        }
      ]
    },
    {
      id: 'political',
      name: 'Politique',
      value: 800,
      color: '#3B82F6',
      children: [
        {
          id: 'elections',
          name: 'Élections',
          value: 400,
          color: '#2563EB',
          metadata: { candidates: 23, turnout: '68%', disputes: 34 },
          children: [
            { id: 'presidential', name: 'Présidentielle', value: 250, color: '#1D4ED8' },
            { id: 'legislative', name: 'Législatives', value: 150, color: '#1E40AF' }
          ]
        },
        {
          id: 'governance',
          name: 'Gouvernance',
          value: 250,
          color: '#60A5FA',
          metadata: { reforms: 12, laws: 45, efficiency: '67%' }
        },
        {
          id: 'corruption',
          name: 'Corruption',
          value: 150,
          color: '#1E3A8A',
          metadata: { cases: 67, investigations: 23, recovered: '12M USD' }
        }
      ]
    },
    {
      id: 'economic',
      name: 'Économie',
      value: 700,
      color: '#10B981',
      children: [
        {
          id: 'mining',
          name: 'Mines',
          value: 350,
          color: '#059669',
          metadata: { production: '2.3M tonnes', revenue: '24B USD', conflicts: 156 },
          children: [
            { id: 'cobalt', name: 'Cobalt', value: 180, color: '#047857' },
            { id: 'gold', name: 'Or', value: 120, color: '#065F46' },
            { id: 'copper', name: 'Cuivre', value: 50, color: '#064E3B' }
          ]
        },
        {
          id: 'agriculture',
          name: 'Agriculture',
          value: 200,
          color: '#34D399',
          metadata: { farmers: '45M', production: '67%', exports: '234M USD' }
        },
        {
          id: 'infrastructure',
          name: 'Infrastructure',
          value: 150,
          color: '#6EE7B7',
          metadata: { projects: 45, investment: '12B USD', completion: '34%' }
        }
      ]
    },
    {
      id: 'social',
      name: 'Social',
      value: 600,
      color: '#8B5CF6',
      children: [
        {
          id: 'education',
          name: 'Éducation',
          value: 250,
          color: '#7C3AED',
          metadata: { schools: 23456, students: '12M', literacy: '67%' }
        },
        {
          id: 'health',
          name: 'Santé',
          value: 200,
          color: '#A78BFA',
          metadata: { hospitals: 1234, coverage: '45%', diseases: ['Malaria', 'Ebola'] }
        },
        {
          id: 'displacement',
          name: 'Déplacements',
          value: 150,
          color: '#C4B5FD',
          metadata: { refugees: '1.2M', camps: 89, assistance: '67%' }
        }
      ]
    }
  ];

  const currentData = data || mockData;

  const calculateLayout = (nodes: TreeMapData[], x: number, y: number, width: number, height: number) => {
    if (nodes.length === 0) return [];

    const totalValue = nodes.reduce((sum, node) => sum + node.value, 0);
    let currentX = x;
    let currentY = y;
    const layouts: Array<TreeMapData & { x: number; y: number; width: number; height: number }> = [];

    // Simple row-based layout
    const rowHeight = height / Math.ceil(Math.sqrt(nodes.length));
    let currentRowWidth = 0;
    let currentRowNodes = 0;
    const maxNodesPerRow = Math.ceil(Math.sqrt(nodes.length));

    nodes.forEach((node, index) => {
      const nodeWidth = (node.value / totalValue) * width;
      
      if (currentRowNodes >= maxNodesPerRow || currentX + nodeWidth > x + width) {
        currentX = x;
        currentY += rowHeight;
        currentRowWidth = 0;
        currentRowNodes = 0;
      }

      layouts.push({
        ...node,
        x: currentX,
        y: currentY,
        width: Math.max(nodeWidth, 50), // Minimum width
        height: rowHeight
      });

      currentX += nodeWidth;
      currentRowWidth += nodeWidth;
      currentRowNodes++;
    });

    return layouts;
  };

  const renderTreeMap = () => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.innerHTML = '';
    const width = svg.clientWidth;
    const svgHeight = height;

    const filteredData = currentData.filter(node => 
      node.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const layouts = calculateLayout(filteredData, 0, 0, width, svgHeight);

    layouts.forEach(layout => {
      // Main rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', layout.x.toString());
      rect.setAttribute('y', layout.y.toString());
      rect.setAttribute('width', layout.width.toString());
      rect.setAttribute('height', layout.height.toString());
      rect.setAttribute('fill', layout.color || '#6B7280');
      rect.setAttribute('stroke', '#FFFFFF');
      rect.setAttribute('stroke-width', '2');
      rect.setAttribute('cursor', 'pointer');
      rect.setAttribute('class', 'hover:opacity-80 transition-opacity');

      rect.addEventListener('click', () => {
        setSelectedNode(layout);
        onNodeClick?.(layout);
      });

      svg.appendChild(rect);

      // Label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (layout.x + layout.width / 2).toString());
      text.setAttribute('y', (layout.y + layout.height / 2 - 5).toString());
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '14');
      text.setAttribute('font-weight', '600');
      text.setAttribute('fill', '#FFFFFF');
      text.textContent = layout.name;
      svg.appendChild(text);

      // Value
      const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      valueText.setAttribute('x', (layout.x + layout.width / 2).toString());
      valueText.setAttribute('y', (layout.y + layout.height / 2 + 15).toString());
      valueText.setAttribute('text-anchor', 'middle');
      valueText.setAttribute('font-size', '12');
      valueText.setAttribute('fill', '#FFFFFF');
      valueText.setAttribute('opacity', '0.9');
      valueText.textContent = layout.value.toString();
      svg.appendChild(valueText);
    });
  };

  const renderHierarchy = () => {
    const renderNode = (node: TreeMapData, level: number = 0): JSX.Element => {
      const isExpanded = expandedNodes.has(node.id);
      const hasChildren = node.children && node.children.length > 0;

      return (
        <div key={node.id} className="space-y-2">
          <div 
            className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
              level > 0 ? 'ml-6' : ''
            }`}
            style={{ marginLeft: level * 24 }}
            onClick={() => {
              if (hasChildren) {
                const newExpanded = new Set(expandedNodes);
                if (isExpanded) {
                  newExpanded.delete(node.id);
                } else {
                  newExpanded.add(node.id);
                }
                setExpandedNodes(newExpanded);
              }
              setSelectedNode(node);
              onNodeClick?.(node);
            }}
          >
            {hasChildren && (
              <button className="p-1">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </button>
            )}
            
            <div 
              className="w-4 h-4 rounded"
              style={{ backgroundColor: node.color || '#6B7280' }}
            ></div>
            
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {node.name}
            </span>
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({node.value})
            </span>
            
            {node.metadata && (
              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                {Object.keys(node.metadata).length} métadonnées
              </span>
            )}
          </div>
          
          {hasChildren && isExpanded && (
            <div className="space-y-1">
              {node.children!.map(child => renderNode(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="max-h-96 overflow-y-auto">
        {currentData
          .filter(node => node.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(node => renderNode(node))
        }
      </div>
    );
  };

  useEffect(() => {
    if (viewMode === 'treemap') {
      renderTreeMap();
    }
  }, [currentData, searchTerm, viewMode, height]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TreePine className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Analyse Hiérarchique
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('treemap')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'treemap'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-1 inline" />
              TreeMap
            </button>
            <button
              onClick={() => setViewMode('hierarchy')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'hierarchy'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <PieChart className="w-4 h-4 mr-1 inline" />
              Hiérarchie
            </button>
          </div>
          
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher dans la hiérarchie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Content */}
      {viewMode === 'treemap' ? (
        <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <svg
            ref={svgRef}
            width="100%"
            height={height}
            className="bg-gray-50 dark:bg-gray-900"
          />
        </div>
      ) : (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          {renderHierarchy()}
        </div>
      )}

      {/* Selected Node Details */}
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
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Valeur</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{selectedNode.value}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Catégorie</p>
              <p className="text-gray-800 dark:text-gray-200">{selectedNode.category || 'Non définie'}</p>
            </div>
            {selectedNode.children && (
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Sous-éléments</p>
                <p className="text-gray-800 dark:text-gray-200">{selectedNode.children.length}</p>
              </div>
            )}
          </div>
          
          {/* Metadata */}
          {selectedNode.metadata && Object.keys(selectedNode.metadata).length > 0 && (
            <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
              <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Métadonnées</h5>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(selectedNode.metadata).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {Array.isArray(value) ? value.join(', ') : value?.toString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {currentData.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Catégories</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {currentData.reduce((sum, node) => sum + (node.children?.length || 0), 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Sous-éléments</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            {currentData.reduce((sum, node) => sum + node.value, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
        </div>
      </div>
    </div>
  );
}