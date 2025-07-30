import { BaseService } from './BaseService';
import type {
  CounterCampaign,
  AutoResponse,
  RapidResponse,
  CommunityEngagement,
  CampaignType,
  CampaignStatus,
  Platform,
  ResponseType
} from '../types/CounterAction';

// Import mock data
import {
  mockCounterCampaigns,
  mockAutoResponses,
  mockRapidResponses,
  mockCommunityEngagements
} from '../data/mockCounterAction';

export interface CounterActionFilters {
  type?: CampaignType;
  status?: CampaignStatus;
  platform?: Platform;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  search?: string;
}

export class CounterActionService extends BaseService {
  constructor() {
    super('counter-action-data');
  }

  // Counter Campaigns
  async getCounterCampaigns(filters?: CounterActionFilters): Promise<CounterCampaign[]> {
    await this.simulateDelay(300);
    
    let campaigns = [...mockCounterCampaigns];
    
    if (filters) {
      if (filters.type) {
        campaigns = campaigns.filter(c => c.type === filters.type);
      }
      
      if (filters.status) {
        campaigns = campaigns.filter(c => c.status === filters.status);
      }
      
      if (filters.platform) {
        campaigns = campaigns.filter(c => 
          c.platforms.includes(filters.platform!) || c.platforms.includes('all')
        );
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        campaigns = campaigns.filter(c => 
          c.title.toLowerCase().includes(searchLower) ||
          c.description.toLowerCase().includes(searchLower)
        );
      }
    }
    
    return campaigns;
  }

  async getCampaignById(id: string): Promise<CounterCampaign | null> {
    await this.simulateDelay(200);
    return mockCounterCampaigns.find(c => c.id === id) || null;
  }

  async createCampaign(campaign: Omit<CounterCampaign, 'id' | 'createdAt' | 'metrics'>): Promise<CounterCampaign> {
    await this.simulateDelay(500);
    
    const newCampaign: CounterCampaign = {
      ...campaign,
      id: `campaign-${Date.now()}`,
      createdAt: new Date().toISOString(),
      metrics: {
        reach: 0,
        impressions: 0,
        engagement: {
          likes: 0,
          shares: 0,
          comments: 0,
          clicks: 0
        },
        effectiveness: {
          misinformationReduced: 0,
          factChecksDelivered: 0,
          narrativeShift: 0,
          communityEngagement: 0
        },
        costs: {
          budget: campaign.targeting?.reach?.maxBudget || 0,
          spent: 0,
          costPerReach: 0
        }
      }
    };
    
    mockCounterCampaigns.unshift(newCampaign);
    return newCampaign;
  }

  async updateCampaign(id: string, updates: Partial<CounterCampaign>): Promise<CounterCampaign> {
    await this.simulateDelay(400);
    
    const index = mockCounterCampaigns.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Campaign not found');
    }
    
    mockCounterCampaigns[index] = { ...mockCounterCampaigns[index], ...updates };
    return mockCounterCampaigns[index];
  }

  async deleteCampaign(id: string): Promise<void> {
    await this.simulateDelay(300);
    
    const index = mockCounterCampaigns.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Campaign not found');
    }
    
    mockCounterCampaigns.splice(index, 1);
  }

  // Auto Responses
  async getAutoResponses(filters?: { platform?: Platform; active?: boolean }): Promise<AutoResponse[]> {
    await this.simulateDelay(250);
    
    let responses = [...mockAutoResponses];
    
    if (filters) {
      if (filters.platform) {
        responses = responses.filter(r => 
          r.platforms.includes(filters.platform!) || r.platforms.includes('all')
        );
      }
      
      if (filters.active !== undefined) {
        responses = responses.filter(r => r.active === filters.active);
      }
    }
    
    return responses;
  }

  async getAutoResponseById(id: string): Promise<AutoResponse | null> {
    await this.simulateDelay(200);
    return mockAutoResponses.find(r => r.id === id) || null;
  }

  async createAutoResponse(response: Omit<AutoResponse, 'id' | 'createdAt' | 'metrics'>): Promise<AutoResponse> {
    await this.simulateDelay(400);
    
    const newResponse: AutoResponse = {
      ...response,
      id: `response-${Date.now()}`,
      createdAt: new Date().toISOString(),
      metrics: {
        triggered: 0,
        sent: 0,
        effectiveness: 0
      }
    };
    
    mockAutoResponses.unshift(newResponse);
    return newResponse;
  }

  async updateAutoResponse(id: string, updates: Partial<AutoResponse>): Promise<AutoResponse> {
    await this.simulateDelay(350);
    
    const index = mockAutoResponses.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Auto response not found');
    }
    
    mockAutoResponses[index] = { ...mockAutoResponses[index], ...updates };
    return mockAutoResponses[index];
  }

  async toggleAutoResponse(id: string): Promise<AutoResponse> {
    const response = await this.getAutoResponseById(id);
    if (!response) {
      throw new Error('Auto response not found');
    }
    
    return this.updateAutoResponse(id, { active: !response.active });
  }

  // Rapid Response
  async getRapidResponses(filters?: { urgency?: 'low' | 'medium' | 'high' | 'critical'; status?: string }): Promise<RapidResponse[]> {
    await this.simulateDelay(300);
    
    let responses = [...mockRapidResponses];
    
    if (filters) {
      if (filters.urgency) {
        responses = responses.filter(r => r.urgency === filters.urgency);
      }
      
      if (filters.status) {
        responses = responses.filter(r => r.status === filters.status);
      }
    }
    
    return responses;
  }

  async getRapidResponseById(id: string): Promise<RapidResponse | null> {
    await this.simulateDelay(200);
    return mockRapidResponses.find(r => r.id === id) || null;
  }

  async createRapidResponse(response: Omit<RapidResponse, 'id' | 'metrics'>): Promise<RapidResponse> {
    await this.simulateDelay(500);
    
    const newResponse: RapidResponse = {
      ...response,
      id: `rapid-${Date.now()}`,
      metrics: {
        responseTime: 0,
        reach: 0,
        effectiveness: 0
      }
    };
    
    mockRapidResponses.unshift(newResponse);
    return newResponse;
  }

  async deployRapidResponse(id: string): Promise<RapidResponse> {
    return this.updateRapidResponse(id, { 
      status: 'deploying',
      timeline: [
        ...mockRapidResponses.find(r => r.id === id)?.timeline || [],
        {
          id: `timeline-${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: 'Déploiement initié',
          actor: 'Système',
          result: 'En cours'
        }
      ]
    });
  }

  async updateRapidResponse(id: string, updates: Partial<RapidResponse>): Promise<RapidResponse> {
    await this.simulateDelay(400);
    
    const index = mockRapidResponses.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Rapid response not found');
    }
    
    mockRapidResponses[index] = { ...mockRapidResponses[index], ...updates };
    return mockRapidResponses[index];
  }

  // Community Engagement
  async getCommunityEngagements(filters?: { type?: string; status?: string }): Promise<CommunityEngagement[]> {
    await this.simulateDelay(250);
    
    let engagements = [...mockCommunityEngagements];
    
    if (filters) {
      if (filters.type) {
        engagements = engagements.filter(e => e.type === filters.type);
      }
      
      if (filters.status) {
        engagements = engagements.filter(e => e.status === filters.status);
      }
    }
    
    return engagements;
  }

  async getCommunityEngagementById(id: string): Promise<CommunityEngagement | null> {
    await this.simulateDelay(200);
    return mockCommunityEngagements.find(e => e.id === id) || null;
  }

  // Analytics and Insights
  async getCounterActionMetrics(): Promise<{
    totalCampaigns: number;
    activeCampaigns: number;
    totalReach: number;
    misinformationCountered: number;
    responseTime: number;
    effectiveness: number;
    topPerformingCampaigns: CounterCampaign[];
    recentActivity: Array<{
      id: string;
      type: 'campaign' | 'auto_response' | 'rapid_response' | 'community';
      action: string;
      timestamp: string;
      impact?: number;
    }>;
  }> {
    await this.simulateDelay(400);
    
    const campaigns = mockCounterCampaigns;
    const activeCampaigns = campaigns.filter(c => c.status === 'active');
    const totalReach = campaigns.reduce((sum, c) => sum + c.metrics.reach, 0);
    const misinformationCountered = campaigns.reduce((sum, c) => sum + c.metrics.effectiveness.misinformationReduced, 0);
    
    return {
      totalCampaigns: campaigns.length,
      activeCampaigns: activeCampaigns.length,
      totalReach,
      misinformationCountered,
      responseTime: 15, // minutes average
      effectiveness: 0.78, // 78% effectiveness rate
      topPerformingCampaigns: campaigns
        .sort((a, b) => b.metrics.effectiveness.misinformationReduced - a.metrics.effectiveness.misinformationReduced)
        .slice(0, 5),
      recentActivity: [
        {
          id: '1',
          type: 'campaign',
          action: 'Campagne "Fact-check Elections" lancée',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          impact: 15000
        },
        {
          id: '2',
          type: 'auto_response',
          action: 'Réponse automatique déclenchée sur Twitter',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          impact: 3200
        },
        {
          id: '3',
          type: 'rapid_response',
          action: 'Réponse rapide activée pour désinformation virale',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          impact: 25000
        }
      ]
    };
  }

  async simulateRealTimeUpdate(): Promise<{
    campaigns: CounterCampaign[];
    autoResponses: AutoResponse[];
  }> {
    await this.simulateDelay(200);
    
    // Simulate metric updates for active campaigns
    const updatedCampaigns = mockCounterCampaigns.map(campaign => {
      if (campaign.status === 'active') {
        return {
          ...campaign,
          metrics: {
            ...campaign.metrics,
            reach: campaign.metrics.reach + Math.floor(Math.random() * 1000),
            impressions: campaign.metrics.impressions + Math.floor(Math.random() * 5000),
            engagement: {
              ...campaign.metrics.engagement,
              likes: campaign.metrics.engagement.likes + Math.floor(Math.random() * 100),
              shares: campaign.metrics.engagement.shares + Math.floor(Math.random() * 50),
              comments: campaign.metrics.engagement.comments + Math.floor(Math.random() * 30)
            }
          }
        };
      }
      return campaign;
    });
    
    // Simulate auto-response triggers
    const updatedAutoResponses = mockAutoResponses.map(response => {
      if (response.active && Math.random() > 0.7) {
        return {
          ...response,
          metrics: {
            ...response.metrics,
            triggered: response.metrics.triggered + 1,
            sent: response.metrics.sent + Math.floor(Math.random() * 3)
          },
          lastTriggered: new Date().toISOString()
        };
      }
      return response;
    });
    
    return {
      campaigns: updatedCampaigns,
      autoResponses: updatedAutoResponses
    };
  }
}

export const counterActionService = new CounterActionService();