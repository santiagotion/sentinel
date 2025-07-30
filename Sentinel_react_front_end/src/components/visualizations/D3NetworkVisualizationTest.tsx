import React from 'react';
import { D3NetworkVisualization } from './D3NetworkVisualization';
import { NetworkNode, NetworkEdge } from '../../services/NetworkService';

// Test component to validate the D3NetworkVisualization fixes
export function D3NetworkVisualizationTest() {
  // Create test data with known coordinates
  const testNodes: NetworkNode[] = [
    {
      id: 'test-1',
      label: 'Test Node 1',
      type: 'person',
      size: 20,
      influence: 50,
      color: '#FF0000', // Bright red
      metadata: {
        sentiment: 0.5,
        verified: true,
        description: 'Test node 1'
      }
    },
    {
      id: 'test-2', 
      label: 'Test Node 2',
      type: 'organization',
      size: 25,
      influence: 75,
      color: '#00FF00', // Bright green
      metadata: {
        sentiment: -0.2,
        verified: false,
        description: 'Test node 2'
      }
    },
    {
      id: 'test-3',
      label: 'Test Node 3', 
      type: 'location',
      size: 15,
      influence: 30,
      color: '#0000FF', // Bright blue
      metadata: {
        sentiment: 0.8,
        verified: true,
        description: 'Test node 3'
      }
    }
  ];

  const testEdges: NetworkEdge[] = [
    {
      id: 'edge-1-2',
      source: 'test-1',
      target: 'test-2',
      weight: 5,
      type: 'friendship',
      timestamp: new Date(),
      metadata: {
        frequency: 10,
        strength: 0.7
      }
    },
    {
      id: 'edge-2-3',
      source: 'test-2', 
      target: 'test-3',
      weight: 3,
      type: 'mention',
      timestamp: new Date(),
      metadata: {
        frequency: 5,
        strength: 0.4
      }
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">D3 Network Visualization Test</h2>
      <p className="mb-4 text-sm text-gray-600">
        This test component should show 3 bright colored nodes with connections.
        Check the browser console for debugging information.
      </p>
      
      <div className="border-2 border-dashed border-gray-300 p-2">
        <D3NetworkVisualization
          nodes={testNodes}
          edges={testEdges}
          width={600}
          height={400}
          layoutType="force"
          showLabels={true}
          enableZoom={true}
          enableDrag={true}
          colorScheme="default"
          onNodeClick={(node) => {
            console.log('Node clicked:', node);
            alert(`Clicked node: ${node.label}`);
          }}
          onEdgeClick={(edge) => {
            console.log('Edge clicked:', edge);
            alert(`Clicked edge: ${edge.id}`);
          }}
        />
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Expected behavior:</p>
        <ul className="list-disc list-inside">
          <li>3 circular nodes with bright colors (red, green, blue)</li>
          <li>2 connecting lines between the nodes</li>
          <li>Node labels visible below each node</li>
          <li>Nodes should be draggable and clickable</li>
          <li>Hover effects should work</li>
          <li>Console should show debugging information</li>
        </ul>
      </div>
    </div>
  );
}