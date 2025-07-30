import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as d3 from 'd3';
import { NetworkNode, NetworkEdge } from '../../services/NetworkService';

interface AdvancedNetworkVizProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  width: number;
  height: number;
}

interface SimulationNode extends NetworkNode {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
  index?: number;
  centrality?: number;
  clustering?: number;
  pathLength?: number;
}

interface SimulationEdge extends NetworkEdge {
  source: SimulationNode | string;
  target: SimulationNode | string;
  causality?: 'cause' | 'effect' | 'correlation';
  strength?: number;
  temporal?: 'past' | 'present' | 'future';
}

export function AdvancedNetworkViz({ nodes, edges, width, height }: AdvancedNetworkVizProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [layoutMode, setLayoutMode] = useState<'force' | 'hierarchical' | 'temporal' | 'influence'>('force');
  const [analysisMode, setAnalysisMode] = useState<'network' | 'causality' | 'influence' | 'temporal'>('network');
  const [showCentrality, setShowCentrality] = useState(false);
  const [showInfluencePaths, setShowInfluencePaths] = useState(false);
  const [temporalFilter, setTemporalFilter] = useState<'all' | 'past' | 'present' | 'future'>('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const simulationRef = useRef<d3.Simulation<SimulationNode, SimulationEdge> | null>(null);

  // Enhanced data processing with causality analysis
  const processedData = useMemo(() => {
    // Calculate network metrics
    const nodeMetrics = new Map<string, any>();
    
    nodes.forEach(node => {
      const connections = edges.filter(e => 
        (typeof e.source === 'string' ? e.source : e.source.id) === node.id ||
        (typeof e.target === 'string' ? e.target : e.target.id) === node.id
      );
      
      // Calculate centrality measures
      const betweennessCentrality = connections.length / nodes.length;
      const degree = connections.length;
      const influence = node.influence;
      
      // Determine causality role
      const outgoing = edges.filter(e => (typeof e.source === 'string' ? e.source : e.source.id) === node.id);
      const incoming = edges.filter(e => (typeof e.target === 'string' ? e.target : e.target.id) === node.id);
      
      const causalityRole = outgoing.length > incoming.length ? 'cause' : 
                           incoming.length > outgoing.length ? 'effect' : 'mediator';
      
      nodeMetrics.set(node.id, {
        ...node,
        centrality: betweennessCentrality,
        degree,
        influence,
        causalityRole,
        outgoingConnections: outgoing.length,
        incomingConnections: incoming.length,
        clustering: degree > 1 ? 2 / (degree * (degree - 1)) : 0
      });
    });

    // Enhanced edge analysis with causality
    const enhancedEdges = edges.map(edge => {
      const sourceId = typeof edge.source === 'string' ? edge.source : edge.source.id;
      const targetId = typeof edge.target === 'string' ? edge.target : edge.target.id;
      
      const sourceNode = nodeMetrics.get(sourceId);
      const targetNode = nodeMetrics.get(targetId);
      
      // Determine causality direction based on influence and edge type
      let causality: 'cause' | 'effect' | 'correlation' = 'correlation';
      let temporal: 'past' | 'present' | 'future' = 'present';
      
      if (sourceNode && targetNode) {
        if (edge.type === 'collaboration' || edge.type === 'mention') {
          causality = sourceNode.influence > targetNode.influence ? 'cause' : 'effect';
        } else if (edge.type === 'opposition') {
          causality = 'correlation';
          temporal = 'present';
        }
        
        // Temporal analysis based on edge metadata
        const timeDiff = edge.timestamp ? Date.now() - edge.timestamp.getTime() : 0;
        temporal = timeDiff > 30 * 24 * 60 * 60 * 1000 ? 'past' : 
                  timeDiff > 7 * 24 * 60 * 60 * 1000 ? 'present' : 'future';
      }
      
      return {
        ...edge,
        causality,
        temporal,
        strength: edge.weight / 10,
        source: sourceId,
        target: targetId
      };
    });

    return {
      nodes: Array.from(nodeMetrics.values()),
      edges: enhancedEdges
    };
  }, [nodes, edges]);

  // Advanced filtering
  const filteredData = useMemo(() => {
    let filteredNodes = processedData.nodes;
    let filteredEdges = processedData.edges;

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredNodes = filteredNodes.filter(node => 
        node.label.toLowerCase().includes(searchLower) ||
        node.type.toLowerCase().includes(searchLower) ||
        node.metadata.description?.toLowerCase().includes(searchLower) ||
        node.causalityRole?.toLowerCase().includes(searchLower)
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filteredNodes = filteredNodes.filter(node => node.type === filterType);
    }

    // Temporal filter
    if (temporalFilter !== 'all') {
      filteredEdges = filteredEdges.filter(edge => edge.temporal === temporalFilter);
    }

    // Filter edges for valid nodes
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    filteredEdges = filteredEdges.filter(edge => 
      nodeIds.has(edge.source as string) && nodeIds.has(edge.target as string)
    );

    return { nodes: filteredNodes, edges: filteredEdges };
  }, [processedData, searchTerm, filterType, temporalFilter]);

  const nodeTypes = useMemo(() => {
    const types = new Set(nodes.map(n => n.type));
    return Array.from(types);
  }, [nodes]);

  // Enhanced color schemes
  const colorSchemes = useMemo(() => ({
    nodeType: {
      person: '#3B82F6',
      organization: '#10B981', 
      location: '#F59E0B',
      hashtag: '#8B5CF6',
      topic: '#EF4444'
    },
    causality: {
      cause: '#DC2626',
      effect: '#059669',
      mediator: '#7C3AED',
      correlation: '#6B7280'
    },
    temporal: {
      past: '#6B7280',
      present: '#3B82F6',
      future: '#10B981'
    },
    influence: d3.scaleSequential(d3.interpolateViridis).domain([0, 100])
  }), []);

  const edgeColorSchemes = useMemo(() => ({
    relationship: {
      collaboration: '#10B981',
      opposition: '#EF4444',
      mention: '#3B82F6',
      friendship: '#8B5CF6',
      retweet: '#06B6D4',
      family: '#F97316'
    },
    causality: {
      cause: '#DC2626',
      effect: '#059669',
      correlation: '#6B7280'
    },
    temporal: {
      past: '#9CA3AF',
      present: '#3B82F6',
      future: '#10B981'
    }
  }), []);

  // Stable hover handlers to prevent state reset
  const handleNodeMouseEnter = useCallback((nodeId: string) => {
    setHoveredNode(nodeId);
  }, []);

  const handleNodeMouseLeave = useCallback(() => {
    setHoveredNode(null);
  }, []);

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNode(prev => prev === nodeId ? null : nodeId);
  }, []);

  // Utility function to ensure valid coordinates
  const ensureValidCoordinate = useCallback((value: number, fallback: number): number => {
    return isNaN(value) || !isFinite(value) ? fallback : value;
  }, []);

  const createVisualization = useCallback(() => {
    if (!svgRef.current || filteredData.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create comprehensive defs
    const defs = svg.append('defs');
    
    // Advanced arrow markers for different causality types
    Object.entries(edgeColorSchemes.causality).forEach(([type, color]) => {
      const marker = defs.append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 15)
        .attr('refY', 0)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto');
      
      if (type === 'cause') {
        marker.append('path')
          .attr('d', 'M0,-5L10,0L0,5L2,0Z')
          .attr('fill', color)
          .attr('stroke', color);
      } else if (type === 'effect') {
        marker.append('circle')
          .attr('cx', 5)
          .attr('cy', 0)
          .attr('r', 3)
          .attr('fill', color);
      } else {
        marker.append('path')
          .attr('d', 'M0,-3L6,0L0,3L0,0Z')
          .attr('fill', color)
          .attr('opacity', 0.7);
      }
    });

    // Radial gradients with enhanced effects
    Object.entries(colorSchemes.nodeType).forEach(([type, color]) => {
      const gradient = defs.append('radialGradient')
        .attr('id', `gradient-${type}`)
        .attr('cx', '30%')
        .attr('cy', '30%');
      
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', d3.color(color)?.brighter(1.2)?.toString() || color);
      
      gradient.append('stop')
        .attr('offset', '70%')
        .attr('stop-color', color);
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d3.color(color)?.darker(0.5)?.toString() || color);
    });

    // Glow filters for important nodes
    const glowFilter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    
    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');
    
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Create zoom container
    const container = svg.append('g').attr('class', 'main-container');
    
    // Enhanced zoom with momentum
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 20])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);

    // Prepare simulation data with safe coordinate initialization
    const nodeData: SimulationNode[] = filteredData.nodes.map(d => ({ 
      ...d,
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100,
      vx: 0,
      vy: 0
    }));
    const edgeData: SimulationEdge[] = filteredData.edges.map(edge => ({
      ...edge,
      source: edge.source,
      target: edge.target
    }));

    // Advanced layout algorithms
    let simulation: d3.Simulation<SimulationNode, SimulationEdge>;
    
    if (layoutMode === 'force') {
      simulation = d3.forceSimulation(nodeData)
        .force('link', d3.forceLink(edgeData)
          .id((d: any) => d.id)
          .distance(d => 100 + (d as SimulationEdge).weight * 15)
          .strength(d => (d as SimulationEdge).strength || 0.8))
        .force('charge', d3.forceManyBody()
          .strength(d => -300 - (d as SimulationNode).influence * 8))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide()
          .radius(d => Math.max(20, Math.min((d as SimulationNode).size, 50)) + 10))
        .alphaDecay(0.01)
        .velocityDecay(0.6);
    } else if (layoutMode === 'hierarchical') {
      // Hierarchical layout based on causality and influence
      const levels = new Map<string, number>();
      const maxInfluence = Math.max(...nodeData.map(n => n.influence));
      
      nodeData.forEach(node => {
        const level = Math.floor((node.influence / maxInfluence) * 5);
        levels.set(node.id, level);
      });

      simulation = d3.forceSimulation(nodeData)
        .force('link', d3.forceLink(edgeData)
          .id((d: any) => d.id)
          .distance(80)
          .strength(0.5))
        .force('charge', d3.forceManyBody().strength(-200))
        .force('y', d3.forceY(d => {
          const level = levels.get(d.id) || 0;
          return height - (level * (height / 6)) - 50;
        }).strength(0.8))
        .force('x', d3.forceX(width / 2).strength(0.1))
        .force('collision', d3.forceCollide().radius(30));
    } else if (layoutMode === 'temporal') {
      // Temporal layout based on edge timestamps
      const timeExtent = d3.extent(edgeData, d => d.timestamp?.getTime() || Date.now()) as [number, number];
      const timeScale = d3.scaleLinear()
        .domain(timeExtent)
        .range([100, width - 100]);

      simulation = d3.forceSimulation(nodeData)
        .force('link', d3.forceLink(edgeData)
          .id((d: any) => d.id)
          .distance(60)
          .strength(0.3))
        .force('charge', d3.forceManyBody().strength(-150))
        .force('x', d3.forceX(d => {
          const avgTime = edgeData
            .filter(e => e.source === d.id || e.target === d.id)
            .reduce((sum, e) => sum + (e.timestamp?.getTime() || Date.now()), 0) / 
            edgeData.filter(e => e.source === d.id || e.target === d.id).length;
          return timeScale(avgTime);
        }).strength(0.7))
        .force('y', d3.forceY(height / 2).strength(0.1))
        .force('collision', d3.forceCollide().radius(25));
    } else { // influence
      // Influence-based radial layout
      const maxInfluence = Math.max(...nodeData.map(n => n.influence));
      
      simulation = d3.forceSimulation(nodeData)
        .force('link', d3.forceLink(edgeData)
          .id((d: any) => d.id)
          .distance(50)
          .strength(0.2))
        .force('charge', d3.forceManyBody().strength(-100))
        .force('radial', d3.forceRadial(
          d => (1 - d.influence / maxInfluence) * Math.min(width, height) * 0.4,
          width / 2,
          height / 2
        ).strength(0.8))
        .force('collision', d3.forceCollide().radius(25));
    }

    simulationRef.current = simulation;

    // Create enhanced edge groups with causality visualization
    const linkGroup = container.append('g').attr('class', 'links');
    const links = linkGroup.selectAll('g')
      .data(edgeData)
      .join('g')
      .attr('class', 'link-group');

    // Main edge paths with enhanced styling
    const edgePaths = links.append('path')
      .attr('class', 'edge')
      .attr('stroke', d => {
        if (analysisMode === 'causality') {
          return edgeColorSchemes.causality[d.causality || 'correlation'];
        } else if (analysisMode === 'temporal') {
          return edgeColorSchemes.temporal[d.temporal || 'present'];
        } else {
          return edgeColorSchemes.relationship[d.type as keyof typeof edgeColorSchemes.relationship] || '#6B7280';
        }
      })
      .attr('stroke-width', d => Math.max(1, Math.min(8, d.weight * 1.5)))
      .attr('stroke-opacity', d => 0.3 + (d.strength || 0.5) * 0.5)
      .attr('fill', 'none')
      .attr('marker-end', d => `url(#arrow-${d.causality || 'correlation'})`)
      .style('cursor', 'pointer')
      .style('stroke-dasharray', d => d.temporal === 'future' ? '5,5' : 
                                    d.temporal === 'past' ? '2,3' : 'none');

    // Influence flow indicators for high-impact connections
    links.filter(d => d.weight > 7)
      .append('circle')
      .attr('class', 'flow-indicator')
      .attr('r', 3)
      .attr('fill', '#3B82F6')
      .attr('opacity', 0.8)
      .style('pointer-events', 'none');

    // Enhanced node groups
    const nodeGroup = container.append('g').attr('class', 'nodes');
    const nodeGroups = nodeGroup.selectAll('g')
      .data(nodeData)
      .join('g')
      .attr('class', 'node-group')
      .style('cursor', 'pointer');

    // Main node circles with dynamic styling
    const nodeCircles = nodeGroups.append('circle')
      .attr('class', 'node-circle')
      .attr('r', d => Math.max(20, Math.min(d.size, 50)))
      .attr('fill', d => {
        if (analysisMode === 'causality') {
          return colorSchemes.causality[d.causalityRole || 'mediator'];
        } else if (analysisMode === 'influence') {
          return colorSchemes.influence(d.influence);
        } else {
          return `url(#gradient-${d.type})`;
        }
      })
      .attr('stroke', d => selectedNode === d.id ? '#000' : '#fff')
      .attr('stroke-width', d => selectedNode === d.id ? 4 : 2)
      .attr('filter', d => d.influence > 80 ? 'url(#glow)' : 'none');

    // Centrality indicators
    if (showCentrality) {
      nodeGroups.filter(d => d.centrality && d.centrality > 0.1)
        .append('circle')
        .attr('class', 'centrality-ring')
        .attr('r', d => Math.max(20, Math.min(d.size, 50)) + (d.centrality || 0) * 50)
        .attr('fill', 'none')
        .attr('stroke', '#F59E0B')
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.6)
        .attr('stroke-dasharray', '4,4');
    }

    // Causality role indicators
    if (analysisMode === 'causality') {
      nodeGroups.append('text')
        .attr('class', 'causality-indicator')
        .attr('x', d => Math.max(20, Math.min(d.size, 50)) + 5)
        .attr('y', d => -Math.max(20, Math.min(d.size, 50)) + 5)
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', d => colorSchemes.causality[d.causalityRole || 'mediator'])
        .text(d => d.causalityRole === 'cause' ? '→' : 
                   d.causalityRole === 'effect' ? '←' : '↔');
    }

    // Enhanced labels with collision detection
    const nodeLabels = nodeGroups.append('text')
      .attr('class', 'node-label')
      .attr('y', d => Math.max(20, Math.min(d.size, 50)) + 25)
      .attr('text-anchor', 'middle')
      .attr('font-size', d => Math.max(10, Math.min(16, 12 + d.influence / 30)))
      .attr('font-weight', '600')
      .attr('fill', '#1F2937')
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('paint-order', 'stroke')
      .text(d => d.label.length > 20 ? d.label.substring(0, 17) + '...' : d.label)
      .style('pointer-events', 'none');

    // Verification and status indicators
    nodeGroups.filter(d => d.metadata.verified)
      .append('path')
      .attr('class', 'verification-badge')
      .attr('d', d => {
        const r = Math.max(20, Math.min(d.size, 50));
        const x = r * 0.7;
        const y = -r * 0.7;
        return `M${x-6},${y}L${x-2},${y+4}L${x+6},${y-4}`;
      })
      .attr('stroke', '#10B981')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // Enhanced interactions with stable event handling
    nodeGroups
      .on('click', function(event, d) {
        event.stopPropagation();
        handleNodeClick(d.id);
      })
      .on('mouseenter', function(event, d) {
        handleNodeMouseEnter(d.id);
        
        // Enhanced connection highlighting
        const connectedNodes = new Set<string>();
        const connectedEdges = new Set<string>();
        
        edgeData.forEach(edge => {
          const sourceId = typeof edge.source === 'string' ? edge.source : edge.source.id;
          const targetId = typeof edge.target === 'string' ? edge.target : edge.target.id;
          
          if (sourceId === d.id) {
            connectedNodes.add(targetId);
            connectedEdges.add(edge.id);
          }
          if (targetId === d.id) {
            connectedNodes.add(sourceId);
            connectedEdges.add(edge.id);
          }
        });

        // Highlight with enhanced effects
        nodeCircles
          .transition()
          .duration(200)
          .attr('opacity', node => node.id === d.id || connectedNodes.has(node.id) ? 1 : 0.2)
          .attr('r', node => {
            const baseR = Math.max(20, Math.min(node.size, 50));
            return node.id === d.id ? baseR * 1.3 : baseR;
          });
        
        edgePaths
          .transition()
          .duration(200)
          .attr('opacity', edge => connectedEdges.has(edge.id) ? 0.9 : 0.1)
          .attr('stroke-width', edge => connectedEdges.has(edge.id) ? 
            Math.max(2, Math.min(10, edge.weight * 2)) : 
            Math.max(1, Math.min(8, edge.weight * 1.5)));
      })
      .on('mouseleave', function(event, d) {
        handleNodeMouseLeave();
        
        // Reset all visual states smoothly
        nodeCircles
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('r', node => Math.max(20, Math.min(node.size, 50)));
        
        edgePaths
          .transition()
          .duration(300)
          .attr('opacity', edge => 0.3 + (edge.strength || 0.5) * 0.5)
          .attr('stroke-width', edge => Math.max(1, Math.min(8, edge.weight * 1.5)));
      });

    // Enhanced drag with momentum
    const drag = d3.drag<SVGGElement, SimulationNode>()
      .on('start', (event, d) => {
        if (!event.active && simulationRef.current) {
          simulationRef.current.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active && simulationRef.current) {
          simulationRef.current.alphaTarget(0);
        }
        if (layoutMode === 'force') {
          d.fx = null;
          d.fy = null;
        }
      });

    nodeGroups.call(drag);

    // Advanced tick function with safe coordinate handling
    simulation.on('tick', () => {
      // Update edge paths with enhanced curves and NaN protection
      edgePaths.attr('d', (d: any) => {
        const sourceX = ensureValidCoordinate(d.source.x, width / 2);
        const sourceY = ensureValidCoordinate(d.source.y, height / 2);
        const targetX = ensureValidCoordinate(d.target.x, width / 2);
        const targetY = ensureValidCoordinate(d.target.y, height / 2);
        
        const dx = targetX - sourceX;
        const dy = targetY - sourceY;
        const dr = Math.sqrt(dx * dx + dy * dy) * 0.4;
        
        // Different curve styles based on relationship type
        if (d.causality === 'cause') {
          return `M${sourceX},${sourceY}Q${sourceX + dx/2 + dr},${sourceY + dy/2} ${targetX},${targetY}`;
        } else if (d.causality === 'effect') {
          return `M${sourceX},${sourceY}Q${sourceX + dx/2 - dr},${sourceY + dy/2} ${targetX},${targetY}`;
        } else {
          return `M${sourceX},${sourceY}L${targetX},${targetY}`;
        }
      });

      // Animate flow indicators with NaN protection
      links.selectAll('.flow-indicator')
        .attr('cx', (d: any) => {
          const sourceX = ensureValidCoordinate(d.source.x, width / 2);
          const targetX = ensureValidCoordinate(d.target.x, width / 2);
          return (sourceX + targetX) / 2;
        })
        .attr('cy', (d: any) => {
          const sourceY = ensureValidCoordinate(d.source.y, height / 2);
          const targetY = ensureValidCoordinate(d.target.y, height / 2);
          return (sourceY + targetY) / 2;
        });

      // Update node positions with NaN protection
      nodeGroups.attr('transform', d => {
        const x = ensureValidCoordinate(d.x, width / 2);
        const y = ensureValidCoordinate(d.y, height / 2);
        
        // Update the node's coordinates to prevent future NaN propagation
        d.x = x;
        d.y = y;
        
        return `translate(${x},${y})`;
      });
    });

    // Background interaction
    svg.on('click', (event) => {
      if (event.target === svg.node()) {
        setSelectedNode(null);
      }
    });

    // Start simulation
    simulation.alpha(1).restart();

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [filteredData, width, height, layoutMode, analysisMode, showCentrality, selectedNode, hoveredNode, colorSchemes, edgeColorSchemes, handleNodeClick, handleNodeMouseEnter, handleNodeMouseLeave, ensureValidCoordinate]);

  useEffect(() => {
    createVisualization();
  }, [createVisualization]);

  const selectedNodeData = selectedNode ? nodes.find(n => n.id === selectedNode) : null;
  const hoveredNodeData = hoveredNode ? nodes.find(n => n.id === hoveredNode) : null;

  return (
    <div ref={containerRef} className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
      {/* Advanced Control Panel */}
      <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-5 space-y-4 max-w-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-gray-900 text-base">Intelligence Analysis</h4>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search entities, roles, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Analysis Mode */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Analysis Mode</label>
          <div className="grid grid-cols-2 gap-1">
            {(['network', 'causality', 'influence', 'temporal'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setAnalysisMode(mode)}
                className={`px-2 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 capitalize ${
                  analysisMode === mode 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Layout Algorithm */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-2">Layout Algorithm</label>
          <div className="grid grid-cols-2 gap-1">
            {(['force', 'hierarchical', 'temporal', 'influence'] as const).map(layout => (
              <button
                key={layout}
                onClick={() => setLayoutMode(layout)}
                className={`px-2 py-1.5 text-xs rounded-lg font-medium transition-all duration-200 capitalize ${
                  layoutMode === layout 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {layout}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Entity Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="all">All Types</option>
              {nodeTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Temporal Filter</label>
            <select
              value={temporalFilter}
              onChange={(e) => setTemporalFilter(e.target.value as any)}
              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <option value="all">All Time</option>
              <option value="past">Historical</option>
              <option value="present">Current</option>
              <option value="future">Projected</option>
            </select>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-2 pt-3 border-t border-gray-200">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showCentrality}
              onChange={(e) => setShowCentrality(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Show Centrality Measures</span>
          </label>
          
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={showInfluencePaths}
              onChange={(e) => setShowInfluencePaths(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Highlight Influence Paths</span>
          </label>
        </div>

        {/* Stats */}
        <div className="text-xs text-gray-600 pt-3 border-t border-gray-200 space-y-1">
          <div className="flex justify-between">
            <span>Entities:</span>
            <span className="font-medium">{filteredData.nodes.length}/{nodes.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Relationships:</span>
            <span className="font-medium">{filteredData.edges.length}/{edges.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Zoom Level:</span>
            <span className="font-medium">{(zoomLevel * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Main Visualization */}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-full"
      />

      {/* Dynamic Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-gray-200">
        <h5 className="font-bold text-sm text-gray-900 mb-3">Legend - {analysisMode.charAt(0).toUpperCase() + analysisMode.slice(1)} Analysis</h5>
        
        <div className="space-y-3 text-xs">
          {analysisMode === 'causality' && (
            <div>
              <div className="font-semibold text-gray-700 mb-2">Causality Roles:</div>
              {Object.entries(colorSchemes.causality).map(([role, color]) => (
                <div key={role} className="flex items-center space-x-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                  <span className="capitalize">{role}</span>
                  <span className="text-gray-500">
                    {role === 'cause' ? '→' : role === 'effect' ? '←' : '↔'}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {analysisMode === 'temporal' && (
            <div>
              <div className="font-semibold text-gray-700 mb-2">Temporal Relationships:</div>
              {Object.entries(edgeColorSchemes.temporal).map(([time, color]) => (
                <div key={time} className="flex items-center space-x-2 mb-1">
                  <div className="w-4 h-0.5" style={{ backgroundColor: color }}></div>
                  <span className="capitalize">{time}</span>
                </div>
              ))}
            </div>
          )}
          
          {(analysisMode === 'network' || analysisMode === 'influence') && (
            <div>
              <div className="font-semibold text-gray-700 mb-2">Entity Types:</div>
              {Object.entries(colorSchemes.nodeType).map(([type, color]) => (
                <div key={type} className="flex items-center space-x-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                  <span className="capitalize">{type}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="pt-2 border-t border-gray-200">
            <div className="font-semibold text-gray-700 mb-1">Visual Indicators:</div>
            <div className="space-y-1 text-gray-600">
              <div>• Size = Influence Level</div>
              <div>• Glow = High Impact (80+)</div>
              <div>• ✓ = Verified Source</div>
              {showCentrality && <div>• Dotted Ring = High Centrality</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hover Tooltip */}
      {hoveredNodeData && !selectedNode && (
        <div className="fixed z-40 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 max-w-sm pointer-events-none"
             style={{ 
               left: '50%', 
               top: '20%',
               transform: 'translateX(-50%)'
             }}>
          <div className="font-bold text-gray-900 text-lg">{hoveredNodeData.label}</div>
          <div className="text-sm text-gray-600 mt-2 space-y-1">
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="capitalize font-medium">{hoveredNodeData.type}</span>
            </div>
            <div className="flex justify-between">
              <span>Influence:</span>
              <span className="font-medium">{hoveredNodeData.influence}</span>
            </div>
            {processedData.nodes.find(n => n.id === hoveredNodeData.id)?.causalityRole && (
              <div className="flex justify-between">
                <span>Role:</span>
                <span className="capitalize font-medium">
                  {processedData.nodes.find(n => n.id === hoveredNodeData.id)?.causalityRole}
                </span>
              </div>
            )}
            {hoveredNodeData.metadata.sentiment !== undefined && (
              <div className="flex justify-between">
                <span>Sentiment:</span>
                <span className={`font-medium ${
                  hoveredNodeData.metadata.sentiment > 0 ? 'text-green-600' : 
                  hoveredNodeData.metadata.sentiment < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {hoveredNodeData.metadata.sentiment > 0 ? '+' : ''}{hoveredNodeData.metadata.sentiment.toFixed(2)}
                </span>
              </div>
            )}
            {hoveredNodeData.metadata.verified && (
              <div className="text-green-600 text-sm">✓ Verified Source</div>
            )}
          </div>
        </div>
      )}

      {/* Comprehensive Selected Node Panel */}
      {selectedNodeData && (
        <div className="absolute top-4 right-4 z-30 bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-md max-h-[calc(100vh-2rem)] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-xl text-gray-900">{selectedNodeData.label}</h3>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors duration-200"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Core Metrics */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-gray-500 block">Type</span>
                <div className="font-bold capitalize text-lg">{selectedNodeData.type}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <span className="text-gray-500 block">Influence</span>
                <div className="font-bold text-lg">{selectedNodeData.influence}</div>
              </div>
            </div>

            {/* Network Analysis */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Network Analysis</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Connections:</span>
                  <span className="font-medium">
                    {edges.filter(e => 
                      (typeof e.source === 'string' ? e.source : e.source.id) === selectedNodeData.id ||
                      (typeof e.target === 'string' ? e.target : e.target.id) === selectedNodeData.id
                    ).length}
                  </span>
                </div>
                
                {(() => {
                  const nodeMetrics = processedData.nodes.find(n => n.id === selectedNodeData.id);
                  if (!nodeMetrics) return null;
                  
                  return (
                    <>
                      <div className="flex justify-between">
                        <span>Outgoing:</span>
                        <span className="font-medium">{nodeMetrics.outgoingConnections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Incoming:</span>
                        <span className="font-medium">{nodeMetrics.incomingConnections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Causality Role:</span>
                        <span className="font-medium capitalize">{nodeMetrics.causalityRole}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Centrality:</span>
                        <span className="font-medium">{(nodeMetrics.centrality * 100).toFixed(1)}%</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Sentiment Analysis */}
            {selectedNodeData.metadata.sentiment !== undefined && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Sentiment Analysis</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sentiment Score:</span>
                    <span className={`font-bold ${
                      selectedNodeData.metadata.sentiment > 0 ? 'text-green-600' : 
                      selectedNodeData.metadata.sentiment < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {selectedNodeData.metadata.sentiment > 0 ? '+' : ''}{selectedNodeData.metadata.sentiment.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        selectedNodeData.metadata.sentiment > 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ 
                        width: `${Math.abs(selectedNodeData.metadata.sentiment) * 50 + 50}%`,
                        marginLeft: selectedNodeData.metadata.sentiment < 0 ? 'auto' : '0'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Metadata */}
            <div className="space-y-2 text-sm">
              {selectedNodeData.metadata.verified && (
                <div className="flex items-center space-x-2 text-green-600">
                  <span className="font-bold">✓</span>
                  <span>Verified Source</span>
                </div>
              )}
              
              {selectedNodeData.metadata.followerCount && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Followers:</span>
                  <span className="font-medium">{selectedNodeData.metadata.followerCount.toLocaleString()}</span>
                </div>
              )}
              
              {selectedNodeData.metadata.credibility && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Credibility:</span>
                  <span className="font-medium">{(selectedNodeData.metadata.credibility * 100).toFixed(0)}%</span>
                </div>
              )}
            </div>

            {/* Description */}
            {selectedNodeData.metadata.description && (
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedNodeData.metadata.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}