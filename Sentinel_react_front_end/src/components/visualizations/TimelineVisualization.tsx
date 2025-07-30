import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { SpreadEvent, TimelineMilestone, SpreadPhase } from '../../types/InformationSpread';
import { 
  TrendingUpIcon, 
  AlertTriangleIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  RefreshCwIcon,
  ZoomInIcon,
  ZoomOutIcon,
  RotateCcwIcon
} from 'lucide-react';

interface TimelineVisualizationProps {
  events: SpreadEvent[];
  milestones: TimelineMilestone[];
  phases: SpreadPhase[];
  height?: number;
}

export const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({
  events,
  milestones,
  phases,
  height = 400
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<SpreadEvent | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create main group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Time scale
    const timeExtent = d3.extent([...events, ...milestones], d => new Date(d.timestamp)) as [Date, Date];
    const xScale = d3.scaleTime()
      .domain(timeExtent)
      .range([0, innerWidth]);

    // Y scale for event positioning
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(events, d => d.reach) || 1])
      .range([innerHeight, 0]);

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .translateExtent([[-100, -100], [width + 100, height + 100]])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);

    // Add gradient definitions
    const defs = svg.append('defs');
    
    // Create gradients for phases
    phases.forEach((phase, i) => {
      const gradient = defs.append('linearGradient')
        .attr('id', `phase-gradient-${i}`)
        .attr('x1', '0%')
        .attr('x2', '0%')
        .attr('y1', '0%')
        .attr('y2', '100%');

      const color = phase.characteristics.sentiment === 'positive' ? '#10b981' :
                   phase.characteristics.sentiment === 'negative' ? '#ef4444' : '#6b7280';

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', color)
        .attr('stop-opacity', 0.2);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', color)
        .attr('stop-opacity', 0.05);
    });

    // Draw phases as background
    phases.forEach((phase, i) => {
      const startX = xScale(new Date(phase.startTime));
      const endX = phase.endTime ? xScale(new Date(phase.endTime)) : innerWidth;
      
      g.append('rect')
        .attr('x', startX)
        .attr('y', 0)
        .attr('width', endX - startX)
        .attr('height', innerHeight)
        .attr('fill', `url(#phase-gradient-${i})`)
        .attr('stroke', 'none');

      // Phase labels
      g.append('text')
        .attr('x', startX + (endX - startX) / 2)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .attr('fill', '#6b7280')
        .text(phase.name);
    });

    // X axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat('%d/%m %H:%M'));

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text('Temps');

    // Y axis
    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d => {
        const num = d as number;
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num.toString();
      });

    g.append('g')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -innerHeight / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'currentColor')
      .text('Portée');

    // Create line generator
    const line = d3.line<SpreadEvent>()
      .x(d => xScale(new Date(d.timestamp)))
      .y(d => yScale(d.reach))
      .curve(d3.curveMonotoneX);

    // Draw the spread line
    g.append('path')
      .datum(events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()))
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Draw milestones
    milestones.forEach(milestone => {
      const x = xScale(new Date(milestone.timestamp));
      
      // Milestone line
      g.append('line')
        .attr('x1', x)
        .attr('x2', x)
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', milestone.significance === 'critical' ? '#ef4444' : '#f59e0b')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');

      // Milestone marker
      g.append('circle')
        .attr('cx', x)
        .attr('cy', innerHeight / 2)
        .attr('r', 8)
        .attr('fill', milestone.significance === 'critical' ? '#ef4444' : '#f59e0b')
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

      // Milestone label
      g.append('text')
        .attr('x', x)
        .attr('y', innerHeight / 2 - 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('fill', '#374151')
        .text(milestone.title)
        .call(wrap, 100);
    });

    // Draw events as circles
    const eventGroups = g.selectAll('.event')
      .data(events)
      .enter()
      .append('g')
      .attr('class', 'event')
      .attr('transform', d => `translate(${xScale(new Date(d.timestamp))},${yScale(d.reach)})`);

    // Event circles
    eventGroups.append('circle')
      .attr('r', d => Math.sqrt(d.engagement.shares) / 10 + 5)
      .attr('fill', d => {
        switch (d.type) {
          case 'origin': return '#f59e0b';
          case 'amplification': return '#ef4444';
          case 'debunk': return '#10b981';
          case 'fact_check': return '#3b82f6';
          case 'mutation': return '#8b5cf6';
          default: return '#6b7280';
        }
      })
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .attr('opacity', 0.8)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', (Math.sqrt(d.engagement.shares) / 10 + 5) * 1.2);
        
        setSelectedEvent(d);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', Math.sqrt(d.engagement.shares) / 10 + 5);
      });

    // Add icons to events
    eventGroups.each(function(d) {
      const group = d3.select(this);
      const iconSize = 12;
      
      // Add white background for icon
      group.append('rect')
        .attr('x', -iconSize / 2)
        .attr('y', -iconSize / 2)
        .attr('width', iconSize)
        .attr('height', iconSize)
        .attr('fill', 'white')
        .attr('rx', 2);
      
      // Add icon based on event type
      const iconPath = getIconPath(d.type);
      if (iconPath) {
        group.append('path')
          .attr('d', iconPath)
          .attr('fill', '#374151')
          .attr('transform', `translate(${-iconSize / 2}, ${-iconSize / 2}) scale(0.5)`);
      }
    });

    // Zoom controls
    const resetZoom = () => {
      svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    };

    // Store reset function for external use
    (window as any).resetTimelineZoom = resetZoom;

  }, [events, milestones, phases, height]);

  // Helper function to wrap text
  function wrap(text: d3.Selection<SVGTextElement, any, any, any>, width: number) {
    text.each(function() {
      const text = d3.select(this);
      const words = text.text().split(/\s+/).reverse();
      let word;
      let line: string[] = [];
      let lineNumber = 0;
      const lineHeight = 1.1;
      const y = text.attr('y');
      const dy = parseFloat(text.attr('dy') || '0');
      let tspan = text.text(null).append('tspan').attr('x', text.attr('x')).attr('y', y).attr('dy', dy + 'em');
      
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(' '));
        if ((tspan.node()?.getComputedTextLength() || 0) > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text.append('tspan')
            .attr('x', text.attr('x'))
            .attr('y', y)
            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
            .text(word);
        }
      }
    });
  }

  // Helper function to get icon path
  function getIconPath(type: string): string | null {
    switch (type) {
      case 'origin':
        return 'M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z';
      case 'amplification':
        return 'M7 17l9-5-9-5v10z';
      case 'debunk':
        return 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z';
      case 'fact_check':
        return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z';
      case 'mutation':
        return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z';
      default:
        return null;
    }
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <button
          onClick={() => {
            const svg = d3.select(svgRef.current);
            const zoom = d3.zoom<SVGSVGElement, unknown>()
              .scaleExtent([0.5, 5]);
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
              .scaleExtent([0.5, 5]);
            svg.transition().duration(300).call(zoom.scaleBy, 0.8);
          }}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          title="Zoom arrière"
        >
          <ZoomOutIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
        <button
          onClick={() => {
            if ((window as any).resetTimelineZoom) {
              (window as any).resetTimelineZoom();
            }
          }}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          title="Réinitialiser"
        >
          <RotateCcwIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <svg ref={svgRef} className="w-full"></svg>

      {selectedEvent && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm z-20">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              {selectedEvent.source.displayName}
            </h4>
            <button
              onClick={() => setSelectedEvent(null)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <XCircleIcon className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            @{selectedEvent.source.username}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            {selectedEvent.content}
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {formatNumber(selectedEvent.reach)}
              </p>
              <p className="text-gray-500 dark:text-gray-400">Portée</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {formatNumber(selectedEvent.engagement.shares)}
              </p>
              <p className="text-gray-500 dark:text-gray-400">Partages</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {formatNumber(selectedEvent.engagement.likes)}
              </p>
              <p className="text-gray-500 dark:text-gray-400">J'aime</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Origine</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Amplification</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Démenti</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Vérification</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span className="text-gray-600 dark:text-gray-400">Mutation</span>
        </div>
      </div>
    </div>
  );
};