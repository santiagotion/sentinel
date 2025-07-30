import { BaseService } from './BaseService';

export interface DashboardMetrics {
  overview: {
    totalMentions: number;
    activeSources: number;
    alertsToday: number;
    sentimentScore: number;
    trending: Array<{ term: string; growth: number }>;
  };
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    trend: number[];
  };
  sources: {
    breakdown: Array<{ source: string; percentage: number; color: string }>;
    credibility: Array<{ source: string; score: number }>;
  };
  geographic: {
    activity: Array<{ province: string; mentions: number; sentiment: number }>;
    hotspots: Array<{ location: string; lat: number; lng: number; intensity: number }>;
  };
  temporal: {
    hourlyActivity: Array<{ hour: number; mentions: number }>;
    weeklyTrends: Array<{ day: string; mentions: number; sentiment: number }>;
    monthlyComparison: Array<{ month: string; current: number; previous: number }>;
  };
}

export interface CustomReport {
  id: string;
  name: string;
  description: string;
  type: 'executive' | 'operational' | 'analytical' | 'custom';
  sections: ReportSection[];
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    recipients: string[];
  };
  createdAt: Date;
  lastGenerated?: Date;
}

export interface ReportSection {
  id: string;
  type: 'overview' | 'trends' | 'sentiment' | 'geographic' | 'alerts' | 'charts' | 'tables';
  title: string;
  configuration: Record<string, any>;
  order: number;
}

export interface AnalyticsQuery {
  metrics: string[];
  dimensions: string[];
  filters: Record<string, any>;
  dateRange: { start: Date; end: Date };
  aggregation: 'sum' | 'average' | 'count' | 'max' | 'min';
}

export class AnalyticsService extends BaseService {
  constructor() {
    super('sentinel_analytics');
  }

  private generateMockDashboardData(): DashboardMetrics {
    const provinces = ['Kinshasa', 'Nord-Kivu', 'Sud-Kivu', 'Haut-Katanga', 'Kasaï', 'Équateur'];
    const sources = ['Facebook', 'Twitter', 'WhatsApp', 'News Sites', 'Blogs', 'Forums'];
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    
    return {
      overview: {
        totalMentions: Math.floor(Math.random() * 50000) + 10000,
        activeSources: Math.floor(Math.random() * 50) + 20,
        alertsToday: Math.floor(Math.random() * 20) + 5,
        sentimentScore: (Math.random() - 0.5) * 0.8,
        trending: [
          { term: 'élections 2024', growth: 45 },
          { term: 'sécurité Kivu', growth: 32 },
          { term: 'réformes économiques', growth: 28 },
          { term: 'vaccination', growth: 15 },
          { term: 'infrastructure', growth: 12 }
        ]
      },
      sentiment: {
        positive: Math.floor(Math.random() * 30) + 25,
        neutral: Math.floor(Math.random() * 20) + 40,
        negative: Math.floor(Math.random() * 30) + 15,
        trend: Array.from({ length: 7 }, () => Math.random() * 2 - 1)
      },
      sources: {
        breakdown: sources.map((source, i) => ({
          source,
          percentage: Math.floor(Math.random() * 20) + 5,
          color: colors[i]
        })),
        credibility: sources.map(source => ({
          source,
          score: Math.random() * 0.4 + 0.6
        }))
      },
      geographic: {
        activity: provinces.map(province => ({
          province,
          mentions: Math.floor(Math.random() * 5000) + 500,
          sentiment: (Math.random() - 0.5) * 1.6
        })),
        hotspots: [
          { location: 'Kinshasa', lat: -4.4419, lng: 15.2663, intensity: Math.random() },
          { location: 'Goma', lat: -1.6792, lng: 29.2228, intensity: Math.random() },
          { location: 'Lubumbashi', lat: -11.6204, lng: 27.4794, intensity: Math.random() },
          { location: 'Bukavu', lat: -2.5007, lng: 28.8562, intensity: Math.random() }
        ]
      },
      temporal: {
        hourlyActivity: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          mentions: Math.floor(Math.random() * 1000) + 100
        })),
        weeklyTrends: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => ({
          day,
          mentions: Math.floor(Math.random() * 3000) + 500,
          sentiment: (Math.random() - 0.5) * 1.2
        })),
        monthlyComparison: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'].map(month => ({
          month,
          current: Math.floor(Math.random() * 10000) + 2000,
          previous: Math.floor(Math.random() * 10000) + 2000
        }))
      }
    };
  }

  async getDashboardMetrics(dateRange?: { start: Date; end: Date }): Promise<DashboardMetrics> {
    await this.simulateDelay(300);
    
    // In a real implementation, this would filter data by date range
    return this.generateMockDashboardData();
  }

  async getTrendAnalysis(metric: string, period: 'hour' | 'day' | 'week' | 'month'): Promise<Array<{ timestamp: Date; value: number }>> {
    await this.simulateDelay(200);
    
    const intervals = {
      hour: 24,
      day: 30,
      week: 12,
      month: 12
    };
    
    const count = intervals[period];
    const now = new Date();
    
    return Array.from({ length: count }, (_, i) => {
      const timestamp = new Date(now);
      
      switch (period) {
        case 'hour':
          timestamp.setHours(timestamp.getHours() - i);
          break;
        case 'day':
          timestamp.setDate(timestamp.getDate() - i);
          break;
        case 'week':
          timestamp.setDate(timestamp.getDate() - (i * 7));
          break;
        case 'month':
          timestamp.setMonth(timestamp.getMonth() - i);
          break;
      }
      
      return {
        timestamp,
        value: Math.floor(Math.random() * 1000) + 100
      };
    }).reverse();
  }

  async getSentimentAnalysis(groupBy: 'time' | 'location' | 'source'): Promise<Array<{ label: string; positive: number; neutral: number; negative: number }>> {
    await this.simulateDelay(250);
    
    const labels = {
      time: ['00h', '04h', '08h', '12h', '16h', '20h'],
      location: ['Kinshasa', 'Goma', 'Lubumbashi', 'Bukavu', 'Mbuji-Mayi'],
      source: ['Facebook', 'Twitter', 'WhatsApp', 'News', 'Blogs']
    };
    
    return labels[groupBy].map(label => ({
      label,
      positive: Math.floor(Math.random() * 50) + 20,
      neutral: Math.floor(Math.random() * 40) + 30,
      negative: Math.floor(Math.random() * 30) + 10
    }));
  }

  async getTopKeywords(limit: number = 10, timeframe: 'day' | 'week' | 'month' = 'day'): Promise<Array<{ keyword: string; mentions: number; sentiment: number; growth: number }>> {
    await this.simulateDelay(150);
    
    const keywords = [
      'élections', 'sécurité', 'gouvernement', 'paix', 'développement',
      'santé', 'éducation', 'économie', 'infrastructure', 'agriculture',
      'justice', 'corruption', 'réformes', 'démocratie', 'réconciliation'
    ];
    
    return keywords.slice(0, limit).map(keyword => ({
      keyword,
      mentions: Math.floor(Math.random() * 2000) + 100,
      sentiment: (Math.random() - 0.5) * 2,
      growth: (Math.random() - 0.5) * 100
    }));
  }

  async getCustomAnalytics(query: AnalyticsQuery): Promise<Array<Record<string, any>>> {
    await this.simulateDelay(400);
    
    // Mock implementation - in reality, this would process the query against real data
    const result = Array.from({ length: 20 }, (_, i) => {
      const row: Record<string, any> = {};
      
      query.dimensions.forEach(dimension => {
        switch (dimension) {
          case 'time':
            row[dimension] = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
            break;
          case 'location':
            row[dimension] = ['Kinshasa', 'Goma', 'Lubumbashi'][i % 3];
            break;
          case 'source':
            row[dimension] = ['Facebook', 'Twitter', 'WhatsApp'][i % 3];
            break;
          default:
            row[dimension] = `Value ${i}`;
        }
      });
      
      query.metrics.forEach(metric => {
        switch (query.aggregation) {
          case 'count':
            row[metric] = Math.floor(Math.random() * 1000);
            break;
          case 'sum':
            row[metric] = Math.floor(Math.random() * 5000);
            break;
          case 'average':
            row[metric] = Math.random() * 100;
            break;
          default:
            row[metric] = Math.random() * 1000;
        }
      });
      
      return row;
    });
    
    return result;
  }

  async createCustomReport(report: Omit<CustomReport, 'id' | 'createdAt'>): Promise<CustomReport> {
    await this.simulateDelay(300);
    
    const reports = this.loadFromStorage<CustomReport[]>() || [];
    const newReport: CustomReport = {
      ...report,
      id: this.generateId(),
      createdAt: new Date()
    };
    
    reports.push(newReport);
    this.saveToStorage(reports);
    
    return newReport;
  }

  async getCustomReports(): Promise<CustomReport[]> {
    await this.simulateDelay(100);
    return this.loadFromStorage<CustomReport[]>() || [];
  }

  async generateReport(reportId: string): Promise<{ content: string; format: string }> {
    await this.simulateDelay(800);
    
    const reports = this.loadFromStorage<CustomReport[]>() || [];
    const report = reports.find(r => r.id === reportId);
    
    if (!report) {
      throw new Error('Report not found');
    }
    
    // Mock report generation
    const content = `
# ${report.name}

## Résumé Exécutif
Ce rapport présente une analyse détaillée des données de surveillance pour la période sélectionnée.

## Métriques Principales
- Total des mentions: ${Math.floor(Math.random() * 50000)}
- Score de sentiment: ${((Math.random() - 0.5) * 2).toFixed(2)}
- Alertes générées: ${Math.floor(Math.random() * 100)}

## Tendances Identifiées
1. Augmentation de l'activité sur les réseaux sociaux
2. Évolution positive du sentiment général
3. Émergence de nouveaux sujets de discussion

## Recommandations
- Maintenir la surveillance des zones sensibles
- Renforcer la communication sur les sujets tendance
- Préparer des réponses pour les alertes critiques
`;
    
    // Update last generated timestamp
    const reportIndex = reports.findIndex(r => r.id === reportId);
    if (reportIndex !== -1) {
      reports[reportIndex].lastGenerated = new Date();
      this.saveToStorage(reports);
    }
    
    return { content, format: 'markdown' };
  }

  async getPerformanceMetrics(): Promise<{
    processingSpeed: number;
    accuracy: number;
    uptime: number;
    dataLatency: number;
    errorRate: number;
  }> {
    await this.simulateDelay(200);
    
    return {
      processingSpeed: Math.random() * 1000 + 500, // messages per second
      accuracy: Math.random() * 0.1 + 0.9, // 90-100%
      uptime: Math.random() * 0.05 + 0.95, // 95-100%
      dataLatency: Math.random() * 10 + 2, // 2-12 seconds
      errorRate: Math.random() * 0.02 // 0-2%
    };
  }
}