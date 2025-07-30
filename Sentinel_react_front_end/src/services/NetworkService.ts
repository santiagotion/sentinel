import { BaseService } from './BaseService';

export interface NetworkNode {
  id: string;
  label: string;
  type: 'person' | 'organization' | 'location' | 'hashtag' | 'topic';
  size: number;
  influence: number;
  color: string;
  metadata: {
    verified?: boolean;
    followerCount?: number;
    postCount?: number;
    sentiment?: number;
    credibility?: number;
    category?: string;
    description?: string;
  };
  position?: { x: number; y: number };
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  weight: number;
  type: 'friendship' | 'mention' | 'retweet' | 'collaboration' | 'opposition' | 'family';
  timestamp: Date;
  metadata: {
    frequency?: number;
    strength?: number;
    sentiment?: number;
  };
}

export interface NetworkAnalysis {
  communityDetection: {
    communities: Array<{
      id: string;
      nodes: string[];
      size: number;
      influence: number;
      sentiment: number;
    }>;
  };
  influencers: NetworkNode[];
  centralityMetrics: {
    betweenness: Record<string, number>;
    closeness: Record<string, number>;
    eigenvector: Record<string, number>;
  };
  pathAnalysis: {
    shortestPaths: Array<{
      from: string;
      to: string;
      path: string[];
      length: number;
    }>;
  };
}

export interface NetworkFilters {
  nodeTypes?: string[];
  edgeTypes?: string[];
  minInfluence?: number;
  minWeight?: number;
  community?: string;
  dateRange?: { start: Date; end: Date };
}

export class NetworkService extends BaseService {
  constructor() {
    super('sentinel_network');
  }

  private generateMockNetworkData(): { nodes: NetworkNode[]; edges: NetworkEdge[] } {
    // Define realistic intelligence network nodes with proper hierarchy
    const nodes: NetworkNode[] = [
      // High-influence political figures
      {
        id: 'president',
        label: 'Félix Tshisekedi',
        type: 'person',
        size: 45,
        influence: 95,
        color: '#1E40AF',
        metadata: {
          verified: true,
          followerCount: 2500000,
          postCount: 1200,
          sentiment: 0.3,
          credibility: 0.9,
          category: 'Politique',
          description: 'Président de la République Démocratique du Congo'
        }
      },
      {
        id: 'pm',
        label: 'Judith Suminwa',
        type: 'person',
        size: 35,
        influence: 78,
        color: '#1E40AF',
        metadata: {
          verified: true,
          followerCount: 850000,
          postCount: 800,
          sentiment: 0.2,
          credibility: 0.85,
          category: 'Politique',
          description: 'Première Ministre de la RDC'
        }
      },
      
      // Opposition leaders
      {
        id: 'opposition1',
        label: 'Martin Fayulu',
        type: 'person',
        size: 30,
        influence: 65,
        color: '#DC2626',
        metadata: {
          verified: true,
          followerCount: 1200000,
          postCount: 2400,
          sentiment: -0.4,
          credibility: 0.7,
          category: 'Opposition',
          description: 'Leader de l\'opposition politique'
        }
      },
      
      // Media organizations
      {
        id: 'media-radio-okapi',
        label: 'Radio Okapi',
        type: 'organization',
        size: 32,
        influence: 72,
        color: '#7C3AED',
        metadata: {
          verified: true,
          followerCount: 950000,
          postCount: 15000,
          sentiment: 0.1,
          credibility: 0.95,
          category: 'Médias',
          description: 'Radio officielle des Nations Unies en RDC'
        }
      },
      {
        id: 'media-actualite-cd',
        label: 'Actualité.cd',
        type: 'organization',
        size: 28,
        influence: 58,
        color: '#7C3AED',
        metadata: {
          verified: true,
          followerCount: 420000,
          postCount: 8500,
          sentiment: 0.0,
          credibility: 0.8,
          category: 'Médias',
          description: 'Site d\'information congolais'
        }
      },
      
      // International organizations
      {
        id: 'un-monusco',
        label: 'MONUSCO',
        type: 'organization',
        size: 38,
        influence: 82,
        color: '#059669',
        metadata: {
          verified: true,
          followerCount: 300000,
          postCount: 2800,
          sentiment: -0.2,
          credibility: 0.9,
          category: 'International',
          description: 'Mission de l\'ONU en RDC'
        }
      },
      
      // Civil society
      {
        id: 'civil-lucha',
        label: 'LUCHA',
        type: 'organization',
        size: 25,
        influence: 55,
        color: '#EA580C',
        metadata: {
          verified: false,
          followerCount: 180000,
          postCount: 3200,
          sentiment: -0.6,
          credibility: 0.75,
          category: 'Société Civile',
          description: 'Mouvement citoyen de jeunes'
        }
      },
      
      // Geographic locations (conflict zones)
      {
        id: 'location-goma',
        label: 'Goma',
        type: 'location',
        size: 28,
        influence: 60,
        color: '#DC2626',
        metadata: {
          verified: false,
          followerCount: 0,
          postCount: 0,
          sentiment: -0.8,
          credibility: 1.0,
          category: 'Zone de conflit',
          description: 'Capitale du Nord-Kivu, zone de tensions'
        }
      },
      {
        id: 'location-kinshasa',
        label: 'Kinshasa',
        type: 'location',
        size: 40,
        influence: 85,
        color: '#1E40AF',
        metadata: {
          verified: false,
          followerCount: 0,
          postCount: 0,
          sentiment: 0.2,
          credibility: 1.0,
          category: 'Capitale',
          description: 'Capitale politique de la RDC'
        }
      },
      
      // Important hashtags/topics
      {
        id: 'hashtag-elections',
        label: '#Elections2024',
        type: 'hashtag',
        size: 35,
        influence: 70,
        color: '#059669',
        metadata: {
          verified: false,
          followerCount: 0,
          postCount: 25000,
          sentiment: 0.1,
          credibility: 0.6,
          category: 'Politique',
          description: 'Hashtag des élections présidentielles'
        }
      },
      {
        id: 'hashtag-paix',
        label: '#PaixRDC',
        type: 'hashtag',
        size: 22,
        influence: 45,
        color: '#059669',
        metadata: {
          verified: false,
          followerCount: 0,
          postCount: 12000,
          sentiment: 0.6,
          credibility: 0.7,
          category: 'Paix',
          description: 'Campagne pour la paix en RDC'
        }
      },
      {
        id: 'hashtag-m23',
        label: '#M23',
        type: 'hashtag',
        size: 30,
        influence: 65,
        color: '#DC2626',
        metadata: {
          verified: false,
          followerCount: 0,
          postCount: 18000,
          sentiment: -0.9,
          credibility: 0.5,
          category: 'Conflit',
          description: 'Groupe armé dans l\'Est de la RDC'
        }
      },
      
      // Key topics
      {
        id: 'topic-mining',
        label: 'Exploitation Minière',
        type: 'topic',
        size: 26,
        influence: 52,
        color: '#D97706',
        metadata: {
          verified: false,
          followerCount: 0,
          postCount: 0,
          sentiment: -0.3,
          credibility: 0.8,
          category: 'Économie',
          description: 'Secteur minier et ressources naturelles'
        }
      }
    ];

    // Create meaningful connections based on real-world relationships
    const edges: NetworkEdge[] = [
      // Government hierarchy
      {
        id: 'president-pm',
        source: 'president',
        target: 'pm',
        weight: 9,
        type: 'collaboration',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 45,
          strength: 0.9,
          sentiment: 0.3
        }
      },
      
      // Opposition relationships
      {
        id: 'president-opposition',
        source: 'president',
        target: 'opposition1',
        weight: 6,
        type: 'opposition',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 25,
          strength: 0.7,
          sentiment: -0.6
        }
      },
      
      // Media covering government
      {
        id: 'president-radio-okapi',
        source: 'president',
        target: 'media-radio-okapi',
        weight: 8,
        type: 'mention',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 120,
          strength: 0.8,
          sentiment: 0.2
        }
      },
      {
        id: 'pm-actualite',
        source: 'pm',
        target: 'media-actualite-cd',
        weight: 6,
        type: 'mention',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 85,
          strength: 0.6,
          sentiment: 0.1
        }
      },
      {
        id: 'opposition-actualite',
        source: 'opposition1',
        target: 'media-actualite-cd',
        weight: 7,
        type: 'mention',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 95,
          strength: 0.7,
          sentiment: -0.3
        }
      },
      
      // International relations
      {
        id: 'president-monusco',
        source: 'president',
        target: 'un-monusco',
        weight: 7,
        type: 'collaboration',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 35,
          strength: 0.6,
          sentiment: -0.1
        }
      },
      {
        id: 'monusco-goma',
        source: 'un-monusco',
        target: 'location-goma',
        weight: 8,
        type: 'mention',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 180,
          strength: 0.9,
          sentiment: -0.7
        }
      },
      
      // Civil society and conflict
      {
        id: 'lucha-opposition',
        source: 'civil-lucha',
        target: 'opposition1',
        weight: 5,
        type: 'collaboration',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 22,
          strength: 0.5,
          sentiment: -0.2
        }
      },
      {
        id: 'lucha-kinshasa',
        source: 'civil-lucha',
        target: 'location-kinshasa',
        weight: 6,
        type: 'mention',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 65,
          strength: 0.7,
          sentiment: -0.4
        }
      },
      
      // Geographic connections
      {
        id: 'president-kinshasa',
        source: 'president',
        target: 'location-kinshasa',
        weight: 9,
        type: 'mention',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 200,
          strength: 0.95,
          sentiment: 0.4
        }
      },
      
      // Hashtag relationships
      {
        id: 'president-elections',
        source: 'president',
        target: 'hashtag-elections',
        weight: 8,
        type: 'mention',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 150,
          strength: 0.8,
          sentiment: 0.5
        }
      },
      {
        id: 'opposition-elections',
        source: 'opposition1',
        target: 'hashtag-elections',
        weight: 7,
        type: 'mention',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 120,
          strength: 0.7,
          sentiment: -0.3
        }
      },
      {
        id: 'goma-m23',
        source: 'location-goma',
        target: 'hashtag-m23',
        weight: 9,
        type: 'mention',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 300,
          strength: 0.95,
          sentiment: -0.9
        }
      },
      {
        id: 'monusco-m23',
        source: 'un-monusco',
        target: 'hashtag-m23',
        weight: 8,
        type: 'mention',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 145,
          strength: 0.8,
          sentiment: -0.8
        }
      },
      
      // Peace initiatives
      {
        id: 'president-paix',
        source: 'president',
        target: 'hashtag-paix',
        weight: 6,
        type: 'mention',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 85,
          strength: 0.7,
          sentiment: 0.8
        }
      },
      {
        id: 'radio-okapi-paix',
        source: 'media-radio-okapi',
        target: 'hashtag-paix',
        weight: 5,
        type: 'mention',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 95,
          strength: 0.6,
          sentiment: 0.7
        }
      },
      
      // Economic relationships
      {
        id: 'president-mining',
        source: 'president',
        target: 'topic-mining',
        weight: 7,
        type: 'mention',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 45,
          strength: 0.7,
          sentiment: 0.2
        }
      },
      {
        id: 'goma-mining',
        source: 'location-goma',
        target: 'topic-mining',
        weight: 6,
        type: 'mention',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        metadata: {
          frequency: 75,
          strength: 0.8,
          sentiment: -0.5
        }
      }
    ];

    return { nodes, edges };
  }

  async getNetworkData(filters?: NetworkFilters): Promise<{ nodes: NetworkNode[]; edges: NetworkEdge[] }> {
    await this.simulateDelay(400);
    
    let { nodes, edges } = this.loadFromStorage<{ nodes: NetworkNode[]; edges: NetworkEdge[] }>() || this.generateMockNetworkData();
    
    console.log('NetworkService: Generated data', { 
      nodeCount: nodes.length, 
      edgeCount: edges.length,
      sampleNode: nodes[0],
      sampleEdge: edges[0]
    });
    
    if (filters) {
      if (filters.nodeTypes?.length) {
        const allowedNodeIds = new Set(
          nodes.filter(node => filters.nodeTypes!.includes(node.type)).map(node => node.id)
        );
        nodes = nodes.filter(node => allowedNodeIds.has(node.id));
        edges = edges.filter(edge => allowedNodeIds.has(edge.source) && allowedNodeIds.has(edge.target));
      }
      
      if (filters.edgeTypes?.length) {
        edges = edges.filter(edge => filters.edgeTypes!.includes(edge.type));
      }
      
      if (filters.minInfluence !== undefined) {
        const allowedNodeIds = new Set(
          nodes.filter(node => node.influence >= filters.minInfluence!).map(node => node.id)
        );
        nodes = nodes.filter(node => allowedNodeIds.has(node.id));
        edges = edges.filter(edge => allowedNodeIds.has(edge.source) && allowedNodeIds.has(edge.target));
      }
      
      if (filters.minWeight !== undefined) {
        edges = edges.filter(edge => edge.weight >= filters.minWeight!);
      }
      
      if (filters.dateRange) {
        edges = edges.filter(edge => 
          edge.timestamp >= filters.dateRange!.start && 
          edge.timestamp <= filters.dateRange!.end
        );
      }
    }
    
    return { nodes, edges };
  }

  async getNodeDetails(nodeId: string): Promise<NetworkNode & { connections: NetworkEdge[] }> {
    await this.simulateDelay(200);
    
    const { nodes, edges } = await this.getNetworkData();
    const node = nodes.find(n => n.id === nodeId);
    
    if (!node) {
      throw new Error('Node not found');
    }
    
    const connections = edges.filter(edge => edge.source === nodeId || edge.target === nodeId);
    
    return { ...node, connections };
  }

  async performNetworkAnalysis(filters?: NetworkFilters): Promise<NetworkAnalysis> {
    await this.simulateDelay(800);
    
    const { nodes, edges } = await this.getNetworkData(filters);
    
    // Mock community detection
    const communities = Array.from({ length: 4 }, (_, i) => {
      const communityNodes = nodes.filter((_, index) => index % 4 === i);
      return {
        id: `community-${i + 1}`,
        nodes: communityNodes.map(n => n.id),
        size: communityNodes.length,
        influence: communityNodes.reduce((sum, n) => sum + n.influence, 0) / communityNodes.length,
        sentiment: communityNodes.reduce((sum, n) => sum + (n.metadata.sentiment || 0), 0) / communityNodes.length
      };
    });
    
    // Mock influencers (top 5 by influence)
    const influencers = nodes
      .sort((a, b) => b.influence - a.influence)
      .slice(0, 5);
    
    // Mock centrality metrics
    const centralityMetrics = {
      betweenness: nodes.reduce((acc, node) => {
        acc[node.id] = Math.random();
        return acc;
      }, {} as Record<string, number>),
      closeness: nodes.reduce((acc, node) => {
        acc[node.id] = Math.random();
        return acc;
      }, {} as Record<string, number>),
      eigenvector: nodes.reduce((acc, node) => {
        acc[node.id] = Math.random();
        return acc;
      }, {} as Record<string, number>)
    };
    
    // Mock shortest paths
    const shortestPaths = Array.from({ length: 5 }, (_, i) => {
      const from = nodes[Math.floor(Math.random() * nodes.length)];
      const to = nodes[Math.floor(Math.random() * nodes.length)];
      const pathLength = Math.floor(Math.random() * 4) + 2;
      const path = [from.id];
      
      for (let j = 1; j < pathLength - 1; j++) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        path.push(randomNode.id);
      }
      path.push(to.id);
      
      return {
        from: from.id,
        to: to.id,
        path,
        length: pathLength
      };
    });
    
    return {
      communityDetection: { communities },
      influencers,
      centralityMetrics,
      pathAnalysis: { shortestPaths }
    };
  }

  async detectCommunities(): Promise<Array<{ id: string; nodes: string[]; size: number; influence: number }>> {
    await this.simulateDelay(600);
    
    const analysis = await this.performNetworkAnalysis();
    return analysis.communityDetection.communities;
  }

  async findShortestPath(fromNodeId: string, toNodeId: string): Promise<{ path: string[]; length: number } | null> {
    await this.simulateDelay(300);
    
    // Mock shortest path algorithm
    const { nodes } = await this.getNetworkData();
    const fromNode = nodes.find(n => n.id === fromNodeId);
    const toNode = nodes.find(n => n.id === toNodeId);
    
    if (!fromNode || !toNode) {
      return null;
    }
    
    // Generate a mock path
    const pathLength = Math.floor(Math.random() * 4) + 2;
    const path = [fromNodeId];
    
    for (let i = 1; i < pathLength - 1; i++) {
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      path.push(randomNode.id);
    }
    path.push(toNodeId);
    
    return { path, length: pathLength };
  }

  async getNetworkMetrics(): Promise<{
    totalNodes: number;
    totalEdges: number;
    density: number;
    avgClustering: number;
    avgPathLength: number;
    diameter: number;
  }> {
    await this.simulateDelay(200);
    
    const { nodes, edges } = await this.getNetworkData();
    
    return {
      totalNodes: nodes.length,
      totalEdges: edges.length,
      density: edges.length / (nodes.length * (nodes.length - 1) / 2),
      avgClustering: Math.random() * 0.5 + 0.2,
      avgPathLength: Math.random() * 3 + 2,
      diameter: Math.floor(Math.random() * 6) + 4
    };
  }

  async exportNetworkData(format: 'json' | 'csv' | 'graphml'): Promise<string> {
    await this.simulateDelay(500);
    
    const { nodes, edges } = await this.getNetworkData();
    
    switch (format) {
      case 'json':
        return JSON.stringify({ nodes, edges }, null, 2);
      
      case 'csv':
        const nodesCsv = 'id,label,type,influence\n' + 
          nodes.map(n => `${n.id},${n.label},${n.type},${n.influence}`).join('\n');
        const edgesCsv = 'source,target,weight,type\n' + 
          edges.map(e => `${e.source},${e.target},${e.weight},${e.type}`).join('\n');
        return `NODES:\n${nodesCsv}\n\nEDGES:\n${edgesCsv}`;
      
      case 'graphml':
        // Simplified GraphML format
        return `<?xml version="1.0" encoding="UTF-8"?>
<graphml xmlns="http://graphml.graphdrawing.org/xmlns">
  <graph id="G" edgedefault="undirected">
    ${nodes.map(n => `<node id="${n.id}"><data key="label">${n.label}</data></node>`).join('\n    ')}
    ${edges.map(e => `<edge source="${e.source}" target="${e.target}"><data key="weight">${e.weight}</data></edge>`).join('\n    ')}
  </graph>
</graphml>`;
      
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }
}