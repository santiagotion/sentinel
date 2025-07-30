import { BaseService } from './BaseService';
import { Keyword } from '../types';

export interface KeywordAnalytics {
  keyword: string;
  totalMentions: number;
  sentimentBreakdown: { positive: number; neutral: number; negative: number };
  sourceDistribution: Array<{ source: string; count: number; percentage: number }>;
  geographicDistribution: Array<{ location: string; count: number; sentiment: number }>;
  temporalTrends: Array<{ date: Date; mentions: number; sentiment: number }>;
  relatedKeywords: Array<{ keyword: string; correlation: number; mentions: number }>;
  influentialPosts: Array<{
    id: string;
    content: string;
    author: string;
    platform: string;
    engagement: number;
    sentiment: number;
  }>;
}

export interface KeywordAlert {
  id: string;
  keywordId: number;
  type: 'volume_spike' | 'sentiment_drop' | 'new_source' | 'geographic_spread';
  threshold: number;
  currentValue: number;
  triggeredAt: Date;
  isActive: boolean;
}

export interface KeywordConfiguration {
  alertThresholds: {
    volumeSpike: number; // percentage increase
    sentimentDrop: number; // sentiment score threshold
    newSourceAlert: boolean;
    geographicSpread: number; // number of new locations
  };
  monitoring: {
    includeVariations: boolean;
    languages: string[];
    excludeKeywords: string[];
    platforms: string[];
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    webhook?: string;
  };
}

export class KeywordsService extends BaseService {
  constructor() {
    super('sentinel_keywords');
  }

  private generateInitialKeywords(): Keyword[] {
    const terms = [
      'élections 2024', 'sécurité Nord-Kivu', 'gouvernement RDC', 'paix et réconciliation',
      'développement économique', 'infrastructure', 'santé publique', 'éducation',
      'agriculture', 'mines et ressources', 'justice', 'corruption', 'démocratie',
      'droits humains', 'femmes et développement'
    ];

    return terms.map((term, index) => ({
      id: index + 1,
      term,
      mentions: Math.floor(Math.random() * 1000) + 50,
      trend: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
      status: ['active', 'critical', 'warning'][Math.floor(Math.random() * 3)] as Keyword['status'],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      sentiment: {
        positive: Math.floor(Math.random() * 50) + 10,
        neutral: Math.floor(Math.random() * 40) + 30,
        negative: Math.floor(Math.random() * 30) + 10
      }
    }));
  }

  async getKeywords(): Promise<Keyword[]> {
    await this.simulateDelay(150);
    return this.loadFromStorage<Keyword[]>() || this.generateInitialKeywords();
  }

  async addKeyword(term: string): Promise<Keyword> {
    await this.simulateDelay(200);
    
    const keywords = await this.getKeywords();
    
    // Check if keyword already exists
    if (keywords.some(k => k.term.toLowerCase() === term.toLowerCase())) {
      throw new Error('Ce mot-clé existe déjà');
    }
    
    const newKeyword: Keyword = {
      id: Math.max(...keywords.map(k => k.id), 0) + 1,
      term: term.trim(),
      mentions: 0,
      trend: [0, 0, 0, 0, 0, 0, 0],
      status: 'active',
      createdAt: new Date(),
      sentiment: { positive: 0, neutral: 100, negative: 0 }
    };
    
    keywords.push(newKeyword);
    this.saveToStorage(keywords);
    
    return newKeyword;
  }

  async updateKeyword(id: number, updates: Partial<Keyword>): Promise<Keyword> {
    await this.simulateDelay(100);
    
    const keywords = await this.getKeywords();
    const keywordIndex = keywords.findIndex(k => k.id === id);
    
    if (keywordIndex === -1) {
      throw new Error('Mot-clé non trouvé');
    }
    
    keywords[keywordIndex] = { ...keywords[keywordIndex], ...updates };
    this.saveToStorage(keywords);
    
    return keywords[keywordIndex];
  }

  async deleteKeyword(id: number): Promise<void> {
    await this.simulateDelay(100);
    
    const keywords = await this.getKeywords();
    const filteredKeywords = keywords.filter(k => k.id !== id);
    
    this.saveToStorage(filteredKeywords);
  }

  async bulkDeleteKeywords(ids: number[]): Promise<void> {
    await this.simulateDelay(200);
    
    const keywords = await this.getKeywords();
    const filteredKeywords = keywords.filter(k => !ids.includes(k.id));
    
    this.saveToStorage(filteredKeywords);
  }

  async getKeywordAnalytics(keywordId: number): Promise<KeywordAnalytics> {
    await this.simulateDelay(400);
    
    const keywords = await this.getKeywords();
    const keyword = keywords.find(k => k.id === keywordId);
    
    if (!keyword) {
      throw new Error('Mot-clé non trouvé');
    }

    // Generate mock analytics data
    const sources = ['Facebook', 'Twitter', 'WhatsApp', 'News Sites', 'Blogs', 'Forums'];
    const locations = ['Kinshasa', 'Lubumbashi', 'Goma', 'Bukavu', 'Mbuji-Mayi', 'Kisangani'];
    const relatedTerms = ['développement', 'gouvernement', 'société', 'politique', 'économie', 'social'];

    return {
      keyword: keyword.term,
      totalMentions: keyword.mentions,
      sentimentBreakdown: keyword.sentiment,
      sourceDistribution: sources.map(source => {
        const count = Math.floor(Math.random() * keyword.mentions * 0.3);
        return {
          source,
          count,
          percentage: Math.round((count / keyword.mentions) * 100)
        };
      }),
      geographicDistribution: locations.map(location => ({
        location,
        count: Math.floor(Math.random() * keyword.mentions * 0.2),
        sentiment: (Math.random() - 0.5) * 2
      })),
      temporalTrends: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
        mentions: Math.floor(Math.random() * 100) + 10,
        sentiment: (Math.random() - 0.5) * 2
      })),
      relatedKeywords: relatedTerms.map(term => ({
        keyword: term,
        correlation: Math.random(),
        mentions: Math.floor(Math.random() * 500) + 50
      })),
      influentialPosts: Array.from({ length: 5 }, (_, i) => ({
        id: `post-${i + 1}`,
        content: `Post influent mentionnant "${keyword.term}" avec un fort engagement...`,
        author: `Utilisateur ${i + 1}`,
        platform: sources[Math.floor(Math.random() * sources.length)],
        engagement: Math.floor(Math.random() * 1000) + 100,
        sentiment: (Math.random() - 0.5) * 2
      }))
    };
  }

  async getKeywordConfiguration(keywordId: number): Promise<KeywordConfiguration> {
    await this.simulateDelay(100);
    
    const configKey = `keyword_config_${keywordId}`;
    const config = this.loadFromStorage<KeywordConfiguration>();
    
    if (config) {
      return config;
    }

    // Default configuration
    const defaultConfig: KeywordConfiguration = {
      alertThresholds: {
        volumeSpike: 200, // 200% increase
        sentimentDrop: -0.5,
        newSourceAlert: true,
        geographicSpread: 3
      },
      monitoring: {
        includeVariations: true,
        languages: ['fr', 'ln', 'sw'],
        excludeKeywords: [],
        platforms: ['Facebook', 'Twitter', 'WhatsApp', 'News Sites']
      },
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    };

    return defaultConfig;
  }

  async updateKeywordConfiguration(keywordId: number, config: Partial<KeywordConfiguration>): Promise<KeywordConfiguration> {
    await this.simulateDelay(150);
    
    const currentConfig = await this.getKeywordConfiguration(keywordId);
    const updatedConfig = { ...currentConfig, ...config };
    
    const configKey = `keyword_config_${keywordId}`;
    localStorage.setItem(configKey, JSON.stringify(updatedConfig));
    
    return updatedConfig;
  }

  async getKeywordAlerts(): Promise<KeywordAlert[]> {
    await this.simulateDelay(200);
    
    const alerts = this.loadFromStorage<KeywordAlert[]>() || [];
    
    // Generate some mock alerts if none exist
    if (alerts.length === 0) {
      const keywords = await this.getKeywords();
      const mockAlerts: KeywordAlert[] = keywords.slice(0, 3).map((keyword, i) => ({
        id: this.generateId(),
        keywordId: keyword.id,
        type: ['volume_spike', 'sentiment_drop', 'new_source'][i] as KeywordAlert['type'],
        threshold: [200, -0.5, 1][i],
        currentValue: [350, -0.7, 2][i],
        triggeredAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        isActive: Math.random() > 0.3
      }));
      
      this.saveToStorage(mockAlerts);
      return mockAlerts;
    }
    
    return alerts;
  }

  async exportKeywords(format: 'csv' | 'json' | 'xlsx'): Promise<string> {
    await this.simulateDelay(300);
    
    const keywords = await this.getKeywords();
    
    switch (format) {
      case 'csv':
        const csvHeader = 'ID,Terme,Mentions,Statut,Date de création,Sentiment positif,Sentiment neutre,Sentiment négatif\n';
        const csvRows = keywords.map(k => 
          `${k.id},"${k.term}",${k.mentions},${k.status},${k.createdAt.toISOString()},${k.sentiment.positive},${k.sentiment.neutral},${k.sentiment.negative}`
        ).join('\n');
        return csvHeader + csvRows;
      
      case 'json':
        return JSON.stringify(keywords, null, 2);
      
      case 'xlsx':
        // Mock Excel data - in reality, you'd use a library like xlsx
        return 'Excel data would be generated here using a proper library';
      
      default:
        throw new Error(`Format non supporté: ${format}`);
    }
  }

  async importKeywords(data: string, format: 'csv' | 'json'): Promise<{ imported: number; errors: string[] }> {
    await this.simulateDelay(400);
    
    const errors: string[] = [];
    let newKeywords: Keyword[] = [];
    
    try {
      if (format === 'json') {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          newKeywords = parsed.filter(item => {
            if (!item.term || typeof item.term !== 'string') {
              errors.push(`Terme manquant ou invalide: ${JSON.stringify(item)}`);
              return false;
            }
            return true;
          }).map((item, index) => ({
            id: Date.now() + index,
            term: item.term,
            mentions: item.mentions || 0,
            trend: item.trend || [0, 0, 0, 0, 0, 0, 0],
            status: item.status || 'active',
            createdAt: new Date(),
            sentiment: item.sentiment || { positive: 0, neutral: 100, negative: 0 }
          }));
        }
      } else if (format === 'csv') {
        const lines = data.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
          const termIndex = headers.indexOf('Terme') >= 0 ? headers.indexOf('Terme') : 0;
          
          if (values[termIndex]) {
            newKeywords.push({
              id: Date.now() + i,
              term: values[termIndex],
              mentions: 0,
              trend: [0, 0, 0, 0, 0, 0, 0],
              status: 'active',
              createdAt: new Date(),
              sentiment: { positive: 0, neutral: 100, negative: 0 }
            });
          } else {
            errors.push(`Ligne ${i + 1}: terme manquant`);
          }
        }
      }
      
      if (newKeywords.length > 0) {
        const existingKeywords = await this.getKeywords();
        const allKeywords = [...existingKeywords, ...newKeywords];
        this.saveToStorage(allKeywords);
      }
      
      return { imported: newKeywords.length, errors };
      
    } catch (error) {
      return { imported: 0, errors: [`Erreur de parsing: ${error}`] };
    }
  }

  async getKeywordSuggestions(query: string): Promise<string[]> {
    await this.simulateDelay(100);
    
    const commonTerms = [
      'gouvernement', 'élections', 'sécurité', 'paix', 'développement',
      'économie', 'santé', 'éducation', 'infrastructure', 'agriculture',
      'mines', 'justice', 'corruption', 'démocratie', 'droits humains',
      'femmes', 'jeunesse', 'emploi', 'transport', 'energie'
    ];
    
    return commonTerms
      .filter(term => term.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 8);
  }

  async getKeywordStats(): Promise<{
    totalKeywords: number;
    activeKeywords: number;
    criticalKeywords: number;
    totalMentions: number;
    averageSentiment: number;
    topPerforming: Array<{ term: string; mentions: number }>;
  }> {
    await this.simulateDelay(100);
    
    const keywords = await this.getKeywords();
    
    return {
      totalKeywords: keywords.length,
      activeKeywords: keywords.filter(k => k.status === 'active').length,
      criticalKeywords: keywords.filter(k => k.status === 'critical').length,
      totalMentions: keywords.reduce((sum, k) => sum + k.mentions, 0),
      averageSentiment: keywords.reduce((sum, k) => {
        const sentiment = (k.sentiment.positive - k.sentiment.negative) / 100;
        return sum + sentiment;
      }, 0) / keywords.length,
      topPerforming: keywords
        .sort((a, b) => b.mentions - a.mentions)
        .slice(0, 5)
        .map(k => ({ term: k.term, mentions: k.mentions }))
    };
  }
}