import { BaseService } from './BaseService';
import type {
  Subject,
  SpreadEvent,
  SourceAccount,
  EventRelationship,
  SubjectTimeline,
  SpreadPrediction,
  CauseEffectAnalysis,
  RawDataItem,
  SubjectAnalytics
} from '../types/InformationSpread';
import {
  mockSubjects,
  mockSpreadEvents,
  mockSourceAccounts,
  mockEventRelationships,
  mockCauseEffectAnalysis,
  mockSubjectAnalytics,
  getMockSubjectTimeline,
  getMockRawDataForSubject,
  getMockPredictionsForSubject
} from '../data/mockInformationSpread';

export class InformationSpreadService extends BaseService {
  private subjects = [...mockSubjects];
  private events = [...mockSpreadEvents];
  private accounts = [...mockSourceAccounts];
  private relationships = [...mockEventRelationships];

  async getSubjects(filters?: {
    category?: string;
    status?: string;
    sentiment?: string;
    search?: string;
  }): Promise<Subject[]> {
    await this.simulateDelay();
    
    let filteredSubjects = [...this.subjects];
    
    if (filters) {
      if (filters.category) {
        filteredSubjects = filteredSubjects.filter(s => s.category === filters.category);
      }
      if (filters.status) {
        filteredSubjects = filteredSubjects.filter(s => s.status === filters.status);
      }
      if (filters.sentiment) {
        filteredSubjects = filteredSubjects.filter(s => s.sentiment === filters.sentiment);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredSubjects = filteredSubjects.filter(s => 
          s.title.toLowerCase().includes(searchLower) ||
          s.description.toLowerCase().includes(searchLower) ||
          s.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
    }
    
    return filteredSubjects.sort((a, b) => 
      new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime()
    );
  }

  async getSubjectById(id: string): Promise<Subject | null> {
    await this.simulateDelay();
    return this.subjects.find(s => s.id === id) || null;
  }

  async getSubjectTimeline(subjectId: string): Promise<SubjectTimeline> {
    await this.simulateDelay();
    return getMockSubjectTimeline(subjectId);
  }

  async getSpreadEvents(subjectId: string): Promise<SpreadEvent[]> {
    await this.simulateDelay();
    return this.events
      .filter(e => e.subjectId === subjectId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  async getEventRelationships(subjectId: string): Promise<EventRelationship[]> {
    await this.simulateDelay();
    const subjectEventIds = this.events
      .filter(e => e.subjectId === subjectId)
      .map(e => e.id);
    
    return this.relationships.filter(r => 
      subjectEventIds.includes(r.fromEventId) || 
      subjectEventIds.includes(r.toEventId)
    );
  }

  async getCauseEffectAnalysis(subjectId: string): Promise<CauseEffectAnalysis> {
    await this.simulateDelay();
    // Return mock data with the requested subject ID
    return {
      ...mockCauseEffectAnalysis,
      subjectId
    };
  }

  async getPredictions(subjectId: string): Promise<SpreadPrediction[]> {
    await this.simulateDelay();
    return getMockPredictionsForSubject(subjectId);
  }

  async getRawData(subjectId: string, limit = 50): Promise<RawDataItem[]> {
    await this.simulateDelay();
    const rawData = getMockRawDataForSubject(subjectId);
    return rawData.slice(0, limit);
  }

  async getSubjectAnalytics(subjectId: string): Promise<SubjectAnalytics> {
    await this.simulateDelay();
    return {
      ...mockSubjectAnalytics,
      subjectId
    };
  }

  async getSourceAccounts(subjectId: string): Promise<SourceAccount[]> {
    await this.simulateDelay();
    const eventSources = this.events
      .filter(e => e.subjectId === subjectId)
      .map(e => e.source);
    
    // Remove duplicates
    const uniqueAccounts = Array.from(
      new Map(eventSources.map(acc => [acc.id, acc])).values()
    );
    
    return uniqueAccounts;
  }

  async getCategories(): Promise<string[]> {
    await this.simulateDelay();
    const categories = [...new Set(this.subjects.map(s => s.category))];
    return categories.sort();
  }

  // Real-time simulation methods
  simulateNewEvent(subjectId: string): SpreadEvent | null {
    const subject = this.subjects.find(s => s.id === subjectId);
    if (!subject) return null;

    const randomAccount = this.accounts[Math.floor(Math.random() * this.accounts.length)];
    const eventTypes: SpreadEvent['type'][] = ['amplification', 'mutation', 'debunk'];
    const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

    const newEvent: SpreadEvent = {
      id: `evt_${Date.now()}`,
      subjectId,
      timestamp: new Date().toISOString(),
      source: randomAccount,
      content: `Nouvelle information concernant: ${subject.title}`,
      type: randomType,
      reach: Math.floor(Math.random() * 50000) + 1000,
      engagement: {
        likes: Math.floor(Math.random() * 5000),
        shares: Math.floor(Math.random() * 3000),
        comments: Math.floor(Math.random() * 1000)
      },
      sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)],
      location: {
        country: 'RDC',
        city: ['Kinshasa', 'Lubumbashi', 'Goma', 'Kisangani'][Math.floor(Math.random() * 4)]
      }
    };

    this.events.push(newEvent);
    
    // Update subject metrics
    subject.lastActivityAt = new Date().toISOString();
    subject.totalReach += newEvent.reach;
    subject.spreadVelocity = Math.min(100, subject.spreadVelocity + Math.random() * 5);

    return newEvent;
  }

  updateSubjectStatus(subjectId: string): void {
    const subject = this.subjects.find(s => s.id === subjectId);
    if (!subject) return;

    // Simulate status changes based on velocity
    if (subject.spreadVelocity > 80 && subject.status !== 'viral') {
      subject.status = 'viral';
    } else if (subject.spreadVelocity < 20 && subject.status !== 'declining') {
      subject.status = 'declining';
    }
  }
}

export const informationSpreadService = new InformationSpreadService();