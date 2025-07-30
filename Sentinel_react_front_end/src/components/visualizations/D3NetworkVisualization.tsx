import React, { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { NetworkNode, NetworkEdge } from '../../services/NetworkService';

interface D3NetworkVisualizationProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  width: number;
  height: number;
  onNodeClick?: (node: NetworkNode) => void;
  onEdgeClick?: (edge: NetworkEdge) => void;
  layoutType?: 'force' | 'hierarchical' | 'circular' | 'grid';
  showLabels?: boolean;
  enableZoom?: boolean;
  enableDrag?: boolean;
  colorScheme?: 'default' | 'sentiment' | 'influence' | 'type';
}

export function D3NetworkVisualization({ 
  nodes, 
  edges, 
  width, 
  height, 
  onNodeClick,
  onEdgeClick,
  layoutType = 'force',
  showLabels = true,
  enableZoom = true,
  enableDrag = true,
  colorScheme = 'default'
}: D3NetworkVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Color scales based on different schemes
  const colorScales = useMemo(() => ({
    default: d3.scaleOrdinal(d3.schemeCategory10),
    sentiment: d3.scaleSequential(d3.interpolateRdYlGn).domain([-1, 1]),
    influence: d3.scaleSequential(d3.interpolateBlues).domain([0, 100]),
    type: d3.scaleOrdinal()
      .domain(['person', 'organization', 'location', 'hashtag', 'topic'])
      .range(['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'])
  }), []);

  const getNodeColor = (node: NetworkNode): string => {
    let color: string;
    switch (colorScheme) {
      case 'sentiment':
        color = colorScales.sentiment(node.metadata.sentiment || 0);
        break;
      case 'influence':
        color = colorScales.influence(node.influence);
        break;
      case 'type':
        color = node.color || (colorScales.type(node.type) as string);
        break;
      default:
        color = node.color || colorScales.default(node.type);
        break;
    }
    
    // Ensure we always have a visible color
    if (!color || color === 'transparent' || color === '#000000') {
      const fallbackColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8E8', '#F7DC6F'];
      color = fallbackColors[Math.abs(node.id.charCodeAt(0)) % fallbackColors.length];
    }
    
    return color;
  };

  const getNodeSize = (node: NetworkNode): number => {
    const dataSize = node.size || 20;
    const finalSize = Math.max(15, Math.min(dataSize, 50));
    return finalSize;
  };

  useEffect(() => {
    console.log('D3NetworkVisualization rendering', {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      svgRef: !!svgRef.current
    });

    if (!svgRef.current || nodes.length === 0) {
      console.warn('Early return: no SVG ref or no nodes');
      return;
    }

    // Clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create container
    const g = svg.append('g');

    // Setup zoom
    if (enableZoom) {
      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 10])
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });
      svg.call(zoom);
    }

    // Prepare nodes with positions
    const simulationNodes = nodes.map((node, i) => ({
      ...node,
      x: width / 2 + (Math.random() - 0.5) * 200,
      y: height / 2 + (Math.random() - 0.5) * 200,
      vx: 0,
      vy: 0
    }));

    // Create force simulation
    const simulation = d3.forceSimulation(simulationNodes as any)
      .force('link', d3.forceLink(edges as any)
        .id((d: any) => d.id)
        .distance(100)
        .strength(0.5))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius((d: any) => getNodeSize(d) + 5));

    // Apply layout if not force
    if (layoutType !== 'force') {
      switch (layoutType) {
        case 'circular':
          const radius = Math.min(width, height) / 3;
          simulationNodes.forEach((node, i) => {
            const angle = (i / nodes.length) * 2 * Math.PI;
            (node as any).fx = width / 2 + radius * Math.cos(angle);
            (node as any).fy = height / 2 + radius * Math.sin(angle);
          });
          break;
        case 'grid':
          const cols = Math.ceil(Math.sqrt(nodes.length));
          const cellWidth = width / (cols + 1);
          const cellHeight = height / (Math.ceil(nodes.length / cols) + 1);
          simulationNodes.forEach((node, i) => {
            (node as any).fx = cellWidth + (i % cols) * cellWidth;
            (node as any).fy = cellHeight + Math.floor(i / cols) * cellHeight;
          });
          break;
        case 'hierarchical':
          const levels = 5;
          const nodesPerLevel = Math.ceil(nodes.length / levels);
          simulationNodes.sort((a, b) => b.influence - a.influence).forEach((node, i) => {
            const level = Math.floor(i / nodesPerLevel);
            const posInLevel = i % nodesPerLevel;
            (node as any).fx = 50 + (posInLevel * (width - 100)) / Math.max(nodesPerLevel - 1, 1);
            (node as any).fy = 50 + level * ((height - 100) / levels);
          });
          break;
      }
    }

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke', (d) => {
        switch (d.type) {
          case 'collaboration': return '#10B981';
          case 'opposition': return '#EF4444';
          case 'mention': return '#3B82F6';
          case 'friendship': return '#8B5CF6';
          default: return '#6B7280';
        }
      })
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d) => Math.max(1, Math.min(4, d.weight / 2)));

    // Create node container
    const node = g.append('g')
      .selectAll('g')
      .data(simulationNodes)
      .enter()
      .append('g')
      .style('cursor', 'pointer');

    // Add circles
    node.append('circle')
      .attr('r', d => getNodeSize(d))
      .attr('fill', d => getNodeColor(d))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', getNodeSize(d) * 1.2);
        setHoveredNode(d.id);
      })
      .on('mouseleave', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', getNodeSize(d));
        setHoveredNode(null);
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(d.id === selectedNode ? null : d.id);
        onNodeClick?.(d);
      });

    // Add labels
    if (showLabels) {
      node.append('text')
        .text(d => d.label)
        .attr('x', 0)
        .attr('y', d => getNodeSize(d) + 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-family', 'Arial, sans-serif')
        .attr('fill', '#374151')
        .attr('pointer-events', 'none');
    }

    // Add drag behavior
    if (enableDrag) {
      const drag = d3.drag<SVGGElement, any>()
        .on('start', (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          if (layoutType === 'force') {
            d.fx = null;
            d.fy = null;
          }
        });
      
      node.call(drag);
    }

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Deselect on background click
    svg.on('click', () => {
      setSelectedNode(null);
    });

    // Force initial render
    simulation.alpha(1).restart();

    return () => {
      simulation.stop();
    };
  }, [nodes, edges, width, height, layoutType, colorScheme, showLabels, enableDrag, enableZoom, onNodeClick, selectedNode]);

  return (
    <div className="relative">
      <svg 
        ref={svgRef} 
        width={width} 
        height={height}
        className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
      />
      
      {/* Node info tooltip */}
      {hoveredNode && (
        <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          {(() => {
            const node = nodes.find(n => n.id === hoveredNode);
            if (!node) return null;
            
            return (
              <div className="space-y-1">
                <div className="font-semibold text-gray-900 dark:text-white">{node.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Type: {node.type}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Influence: {node.influence.toFixed(1)}
                </div>
                {node.metadata.sentiment !== undefined && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Sentiment: {node.metadata.sentiment > 0 ? '+' : ''}{node.metadata.sentiment.toFixed(2)}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
      
      {/* Selected node details */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-sm z-10">
          {(() => {
            const node = nodes.find(n => n.id === selectedNode);
            if (!node) return null;
            
            const connections = edges.filter(e => e.source === node.id || e.target === node.id);
            
            return (
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{node.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{node.type}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Influence:</span>
                    <span className="ml-1 font-medium">{node.influence.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Connections:</span>
                    <span className="ml-1 font-medium">{connections.length}</span>
                  </div>
                  {node.metadata.sentiment !== undefined && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Sentiment:</span>
                      <span className={`ml-1 font-medium ${
                        node.metadata.sentiment > 0 ? 'text-green-600' : 
                        node.metadata.sentiment < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {node.metadata.sentiment > 0 ? '+' : ''}{node.metadata.sentiment.toFixed(2)}
                      </span>
                    </div>
                  )}
                  {node.metadata.verified !== undefined && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Verified:</span>
                      <span className={`ml-1 font-medium ${node.metadata.verified ? 'text-green-600' : 'text-gray-600'}`}>
                        {node.metadata.verified ? 'Yes' : 'No'}
                      </span>
                    </div>
                  )}
                </div>
                
                {node.metadata.description && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{node.metadata.description}</p>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}