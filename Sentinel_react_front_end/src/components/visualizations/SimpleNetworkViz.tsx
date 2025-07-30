import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NetworkNode, NetworkEdge } from '../../services/NetworkService';

interface SimpleNetworkVizProps {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  width: number;
  height: number;
}

export function SimpleNetworkViz({ nodes, edges, width, height }: SimpleNetworkVizProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    console.log('Rendering network:', nodes.length, 'nodes,', edges.length, 'edges');

    // Clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    
    // Create container
    const g = svg.append('g');
    
    // Clone nodes to avoid mutation
    const nodeData = nodes.map(d => ({ ...d }));
    
    // Clone edges and ensure source/target are strings
    const edgeData = edges.map(edge => ({
      ...edge,
      source: typeof edge.source === 'string' ? edge.source : edge.source.id,
      target: typeof edge.target === 'string' ? edge.target : edge.target.id
    }));
    
    console.log('Data prepared. Sample edge:', edgeData[0]);
    
    // Create simulation
    const simulation = d3.forceSimulation(nodeData as any)
      .force('link', d3.forceLink(edgeData as any)
        .id((d: any) => d.id)
        .distance(150)
        .strength(0.8))
      .force('charge', d3.forceManyBody().strength(-600))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(edgeData)
      .join('line')
      .attr('stroke', d => {
        switch (d.type) {
          case 'collaboration': return '#10B981';
          case 'opposition': return '#EF4444';
          case 'mention': return '#3B82F6';
          case 'friendship': return '#8B5CF6';
          default: return '#6B7280';
        }
      })
      .attr('stroke-opacity', 0.7)
      .attr('stroke-width', d => Math.max(1, Math.min(4, d.weight)));

    // Create node groups
    const node = g.append('g')
      .selectAll('g')
      .data(nodeData)
      .join('g')
      .style('cursor', 'pointer');

    // Add circles
    node.append('circle')
      .attr('r', d => Math.max(15, Math.min(d.size, 45)))
      .attr('fill', d => d.color || '#3B82F6')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Add labels
    node.append('text')
      .text(d => d.label)
      .attr('x', 0)
      .attr('y', d => Math.max(15, Math.min(d.size, 45)) + 18)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .attr('fill', '#374151')
      .style('pointer-events', 'none');

    // Add interactions
    node
      .on('click', (event, d) => {
        event.stopPropagation();
        setSelectedNode(selectedNode === d.id ? null : d.id);
        console.log('Node clicked:', d.label);
      })
      .on('mouseenter', (event, d) => {
        setHoveredNode(d.id);
        d3.select(event.currentTarget).select('circle')
          .transition()
          .duration(200)
          .attr('r', Math.max(15, Math.min(d.size, 45)) * 1.2);
      })
      .on('mouseleave', (event, d) => {
        setHoveredNode(null);
        d3.select(event.currentTarget).select('circle')
          .transition()
          .duration(200)
          .attr('r', Math.max(15, Math.min(d.size, 45)));
      });

    // Add drag behavior
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
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

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

    // Background click to deselect
    svg.on('click', () => setSelectedNode(null));

    // Start simulation
    simulation.alpha(1).restart();
    console.log('Simulation started');

    return () => simulation.stop();
  }, [nodes, edges, width, height]);

  const selectedNodeData = selectedNode ? nodes.find(n => n.id === selectedNode) : null;
  const hoveredNodeData = hoveredNode ? nodes.find(n => n.id === hoveredNode) : null;

  return (
    <div className="relative w-full">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="border border-gray-300 rounded bg-gray-50 w-full"
      />
      
      {/* Hover tooltip */}
      {hoveredNodeData && !selectedNode && (
        <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-lg border max-w-xs z-10">
          <div className="font-semibold text-gray-900">{hoveredNodeData.label}</div>
          <div className="text-sm text-gray-600">Type: {hoveredNodeData.type}</div>
          <div className="text-sm text-gray-600">Influence: {hoveredNodeData.influence}</div>
        </div>
      )}
      
      {/* Selected node details */}
      {selectedNodeData && (
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm z-10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900">{selectedNodeData.label}</h3>
            <button 
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-gray-600 text-lg"
            >
              ×
            </button>
          </div>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-gray-500">Type:</span> <span className="capitalize">{selectedNodeData.type}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Influence:</span> {selectedNodeData.influence}
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Connections:</span> {edges.filter(e => e.source === selectedNodeData.id || e.target === selectedNodeData.id).length}
            </div>
            {selectedNodeData.metadata.description && (
              <div className="text-sm text-gray-600 mt-2 pt-2 border-t border-gray-200">
                {selectedNodeData.metadata.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}