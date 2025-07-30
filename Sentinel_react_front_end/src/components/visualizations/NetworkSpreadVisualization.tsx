import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { SpreadEvent, SourceAccount, EventRelationship } from '../../types/InformationSpread';
import {
  ZoomInIcon,
  ZoomOutIcon,
  RotateCcwIcon,
  PauseIcon,
  PlayIcon,
  XCircleIcon,
  CheckCircleIcon,
  UserIcon,
  ShareIcon,
  NetworkIcon
} from 'lucide-react';

interface NetworkNode {
  id: string;
  type: 'account' | 'event';
  data: SourceAccount | SpreadEvent;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface NetworkLink {
  source: string | NetworkNode;
  target: string | NetworkNode;
  type: EventRelationship['type'];
  strength: number;
}

interface NetworkSpreadVisualizationProps {
  events: SpreadEvent[];
  accounts: SourceAccount[];
  relationships: EventRelationship[];
  height?: number;
}

export const NetworkSpreadVisualization: React.FC<NetworkSpreadVisualizationProps> = ({
  events,
  accounts,
  relationships,
  height = 600
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const simulationRef = useRef<d3.Simulation<NetworkNode, NetworkLink> | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || events.length === 0 || accounts.length === 0) return;

    try {
      const container = containerRef.current;
      const width = container.clientWidth;

    // Prepare nodes
    const accountNodes: NetworkNode[] = accounts.map(account => ({
      id: `account-${account.id}`,
      type: 'account' as const,
      data: account
    }));

    const eventNodes: NetworkNode[] = events.map(event => ({
      id: `event-${event.id}`,
      type: 'event' as const,
      data: event
    }));

    const nodes = [...accountNodes, ...eventNodes];

    // Prepare links - only create links for events and accounts that actually exist
    const eventIds = new Set(events.map(e => e.id));
    const accountIds = new Set(accounts.map(a => a.id));

    const accountEventLinks: NetworkLink[] = events
      .filter(event => accountIds.has(event.source.id))
      .map(event => ({
        source: `account-${event.source.id}`,
        target: `event-${event.id}`,
        type: 'amplifies' as const,
        strength: 0.5
      }));

    const relationshipLinks: NetworkLink[] = relationships
      .filter(rel => eventIds.has(rel.fromEventId) && eventIds.has(rel.toEventId))
      .map(rel => ({
        source: `event-${rel.fromEventId}`,
        target: `event-${rel.toEventId}`,
        type: rel.type,
        strength: rel.strength
      }));

    const links = [...accountEventLinks, ...relationshipLinks];

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Add gradients
    const defs = svg.append('defs');

    // Arrow markers for directed links
    const markerTypes = ['causes', 'influences', 'contradicts', 'supports', 'debunks', 'amplifies'];
    markerTypes.forEach(type => {
      defs.append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 20)
        .attr('refY', 0)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', getLinkColor(type as EventRelationship['type']));
    });

    // Create container for zoom
    const g = svg.append('g');

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create force simulation
    const simulation = d3.forceSimulation<NetworkNode>(nodes)
      .force('link', d3.forceLink<NetworkNode, NetworkLink>(links)
        .id(d => d.id)
        .distance(d => 100 / d.strength))
      .force('charge', d3.forceManyBody()
        .strength(d => d.type === 'account' ? -800 : -400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide()
        .radius(d => d.type === 'account' ? 40 : 30));

    simulationRef.current = simulation;

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', d => getLinkColor(d.type))
      .attr('stroke-opacity', d => 0.3 + d.strength * 0.4)
      .attr('stroke-width', d => 1 + d.strength * 3)
      .attr('marker-end', d => `url(#arrow-${d.type})`);

    // Create node groups
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(d3.drag<SVGGElement, NetworkNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles for nodes
    node.append('circle')
      .attr('r', d => {
        if (d.type === 'account') {
          const account = d.data as SourceAccount;
          return Math.sqrt(account.followerCount) / 100 + 20;
        } else {
          const event = d.data as SpreadEvent;
          return Math.sqrt(event.reach) / 200 + 15;
        }
      })
      .attr('fill', d => {
        if (d.type === 'account') {
          const account = d.data as SourceAccount;
          return account.verified ? '#3b82f6' : '#6b7280';
        } else {
          const event = d.data as SpreadEvent;
          return getEventColor(event.type);
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', 4);
        
        setSelectedNode(d);

        // Highlight connected links
        link
          .attr('stroke-opacity', l => {
            const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
            const targetId = typeof l.target === 'string' ? l.target : l.target.id;
            return sourceId === d.id || targetId === d.id ? 0.8 : 0.1;
          })
          .attr('stroke-width', l => {
            const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
            const targetId = typeof l.target === 'string' ? l.target : l.target.id;
            return sourceId === d.id || targetId === d.id ? 3 : 1;
          });
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', 2);

        // Reset links
        link
          .attr('stroke-opacity', d => 0.3 + d.strength * 0.4)
          .attr('stroke-width', d => 1 + d.strength * 3);
      });

    // Add icons or images
    node.each(function(d) {
      const group = d3.select(this);
      
      if (d.type === 'account') {
        const account = d.data as SourceAccount;
        if (account.profileImageUrl) {
          const size = 30;
          group.append('clipPath')
            .attr('id', `clip-${d.id}`)
            .append('circle')
            .attr('r', size / 2);

          group.append('image')
            .attr('xlink:href', account.profileImageUrl)
            .attr('x', -size / 2)
            .attr('y', -size / 2)
            .attr('width', size)
            .attr('height', size)
            .attr('clip-path', `url(#clip-${d.id})`);
        } else {
          group.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .attr('fill', 'white')
            .text(account.username.substring(0, 2).toUpperCase());
        }
      } else {
        const event = d.data as SpreadEvent;
        const iconPath = getEventIconPath(event.type);
        if (iconPath) {
          group.append('path')
            .attr('d', iconPath)
            .attr('fill', 'white')
            .attr('transform', 'translate(-12, -12) scale(0.05)');
        }
      }
    });

    // Add labels
    node.append('text')
      .attr('dy', d => {
        if (d.type === 'account') {
          const account = d.data as SourceAccount;
          return Math.sqrt(account.followerCount) / 100 + 30;
        } else {
          return 30;
        }
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', d => d.type === 'account' ? 'bold' : 'normal')
      .text(d => {
        if (d.type === 'account') {
          const account = d.data as SourceAccount;
          return `@${account.username}`;
        } else {
          const event = d.data as SpreadEvent;
          return new Date(event.timestamp).toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
        }
      });

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as NetworkNode).x!)
        .attr('y1', d => (d.source as NetworkNode).y!)
        .attr('x2', d => (d.target as NetworkNode).x!)
        .attr('y2', d => (d.target as NetworkNode).y!);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Store reset function
    (window as any).resetNetworkZoom = () => {
      svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    };

    return () => {
      simulation.stop();
    };
    } catch (error) {
      console.error('Error in NetworkSpreadVisualization:', error);
    }
  }, [events, accounts, relationships, height]);

  function getLinkColor(type: EventRelationship['type']): string {
    switch (type) {
      case 'causes': return '#ef4444';
      case 'influences': return '#f59e0b';
      case 'contradicts': return '#dc2626';
      case 'supports': return '#10b981';
      case 'debunks': return '#06b6d4';
      case 'amplifies': return '#8b5cf6';
      default: return '#6b7280';
    }
  }

  function getEventColor(type: SpreadEvent['type']): string {
    switch (type) {
      case 'origin': return '#f59e0b';
      case 'amplification': return '#ef4444';
      case 'debunk': return '#10b981';
      case 'fact_check': return '#3b82f6';
      case 'mutation': return '#8b5cf6';
      default: return '#6b7280';
    }
  }

  function getEventIconPath(type: SpreadEvent['type']): string {
    const paths = {
      origin: 'M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z',
      amplification: 'M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168z',
      debunk: 'M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 337L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1z',
      fact_check: 'M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z',
      mutation: 'M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z'
    };
    return paths[type] || '';
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  if (events.length === 0 || accounts.length === 0) {
    return (
      <div className="relative flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-700 rounded-lg" ref={containerRef}>
        <div className="text-center">
          <NetworkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Aucune donnée de réseau disponible</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Les données d'événements et de comptes sont nécessaires pour générer le réseau.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={() => {
            if (simulationRef.current) {
              if (isPaused) {
                simulationRef.current.restart();
              } else {
                simulationRef.current.stop();
              }
              setIsPaused(!isPaused);
            }
          }}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          title={isPaused ? 'Reprendre' : 'Pause'}
        >
          {isPaused ? (
            <PlayIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <PauseIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>
        <button
          onClick={() => {
            const svg = d3.select(svgRef.current);
            const zoom = d3.zoom<SVGSVGElement, unknown>()
              .scaleExtent([0.1, 4]);
            svg.transition().duration(300).call(zoom.scaleBy, 1.2);
          }}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          title="Zoom avant"
        >
          <ZoomInIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={() => {
            const svg = d3.select(svgRef.current);
            const zoom = d3.zoom<SVGSVGElement, unknown>()
              .scaleExtent([0.1, 4]);
            svg.transition().duration(300).call(zoom.scaleBy, 0.8);
          }}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          title="Zoom arrière"
        >
          <ZoomOutIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={() => {
            if ((window as any).resetNetworkZoom) {
              (window as any).resetNetworkZoom();
            }
          }}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          title="Réinitialiser"
        >
          <RotateCcwIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <svg ref={svgRef} className="w-full"></svg>

      {selectedNode && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md z-20">
          {selectedNode.type === 'account' ? (
            <div>
              <div className="flex items-center gap-3 mb-3">
                {(selectedNode.data as SourceAccount).profileImageUrl ? (
                  <img
                    src={(selectedNode.data as SourceAccount).profileImageUrl}
                    alt={(selectedNode.data as SourceAccount).displayName}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-gray-600" />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {(selectedNode.data as SourceAccount).displayName}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{(selectedNode.data as SourceAccount).username}
                  </p>
                </div>
                {(selectedNode.data as SourceAccount).verified && (
                  <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Abonnés</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatNumber((selectedNode.data as SourceAccount).followerCount)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Crédibilité</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {((selectedNode.data as SourceAccount).credibilityScore * 100).toFixed(0)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Bot prob.</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {((selectedNode.data as SourceAccount).botProbability * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  {(selectedNode.data as SpreadEvent).source.displayName}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  (selectedNode.data as SpreadEvent).type === 'origin' ? 'bg-yellow-100 text-yellow-700' :
                  (selectedNode.data as SpreadEvent).type === 'amplification' ? 'bg-red-100 text-red-700' :
                  (selectedNode.data as SpreadEvent).type === 'debunk' ? 'bg-green-100 text-green-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {(selectedNode.data as SpreadEvent).type}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                {(selectedNode.data as SpreadEvent).content}
              </p>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatNumber((selectedNode.data as SpreadEvent).reach)}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Portée</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatNumber((selectedNode.data as SpreadEvent).engagement.likes)}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">J'aime</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatNumber((selectedNode.data as SpreadEvent).engagement.shares)}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Partages</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatNumber((selectedNode.data as SpreadEvent).engagement.comments)}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Comm.</p>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <XCircleIcon className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="font-semibold text-gray-700 dark:text-gray-300">Légende:</div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Compte vérifié</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Compte non-vérifié</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-red-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Cause</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-yellow-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Influence</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-purple-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Amplifie</span>
        </div>
      </div>
    </div>
  );
};