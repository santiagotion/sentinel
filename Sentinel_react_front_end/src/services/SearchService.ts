import { BaseService } from './BaseService';

export interface SearchResult {
  id: string;
  type: 'social_media' | 'news' | 'blog' | 'forum' | 'official';
  title: string;
  content: string;
  author: string;
  source: string;
  platform: string;
  timestamp: Date;
  url: string;
  metrics: {
    engagement: {
      likes: number;
      shares: number;
      comments: number;
    };
    reach: number;
    sentiment: number;
    credibility: number;
  };
  metadata: {
    location?: string;
    language: string;
    hashtags: string[];
    mentions: string[];
    verified: boolean;
  };
}

export interface SearchFilters {
  query?: string;
  type?: string[];
  platform?: string[];
  dateRange?: { start: Date; end: Date };
  sentiment?: { min: number; max: number };
  credibility?: { min: number; max: number };
  location?: string;
  language?: string;
  verified?: boolean;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: SearchFilters;
  createdAt: Date;
  lastUsed: Date;
  alertEnabled: boolean;
}

export class SearchService extends BaseService {
  constructor() {
    super('sentinel_search');
  }

  private generateMockSearchResults(): SearchResult[] {
    const platforms = ['Facebook', 'Twitter', 'Instagram', 'TikTok', 'WhatsApp', 'Telegram', 'News Sites', 'Blogs'];
    const authors = ['Jean Mukamba', 'Marie Kabila', 'Paul Tshisekedi', 'Grace Lukoji', 'David Mbombo', 'Sarah Nzuzi'];
    const locations = ['Kinshasa', 'Lubumbashi', 'Goma', 'Bukavu', 'Mbuji-Mayi', 'Kisangani'];
    
    return Array.from({ length: 50 }, (_, i) => ({
      id: `result-${i + 1}`,
      type: ['social_media', 'news', 'blog', 'forum', 'official'][Math.floor(Math.random() * 5)] as SearchResult['type'],
      title: [
        'Situation sécuritaire dans l\'Est du pays',
        'Réformes économiques annoncées par le gouvernement',
        'Campagne de vaccination contre le COVID-19',
        'Élections locales : préparatifs en cours',
        'Initiative de paix dans les territoires en conflit',
        'Développement des infrastructures rurales',
        'Lutte contre la corruption : nouvelles mesures',
        'Éducation : construction de nouvelles écoles'
      ][Math.floor(Math.random() * 8)],
      content: `Contenu détaillé du message ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
      author: authors[Math.floor(Math.random() * authors.length)],
      source: `Source ${i + 1}`,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      url: `https://example.com/post/${i + 1}`,
      metrics: {
        engagement: {
          likes: Math.floor(Math.random() * 1000),
          shares: Math.floor(Math.random() * 500),
          comments: Math.floor(Math.random() * 200)
        },
        reach: Math.floor(Math.random() * 50000),
        sentiment: (Math.random() - 0.5) * 2,
        credibility: Math.random()
      },
      metadata: {
        location: Math.random() > 0.3 ? locations[Math.floor(Math.random() * locations.length)] : undefined,
        language: 'fr',
        hashtags: [`#tag${i}`, `#sentinel`, `#rdc`].slice(0, Math.floor(Math.random() * 3) + 1),
        mentions: [`@user${i}`, `@government`].slice(0, Math.floor(Math.random() * 2)),
        verified: Math.random() > 0.7
      }
    }));
  }

  async search(filters: SearchFilters): Promise<SearchResult[]> {
    await this.simulateDelay(300);
    
    let results = this.generateMockSearchResults();
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(result => 
        result.title.toLowerCase().includes(query) ||
        result.content.toLowerCase().includes(query) ||
        result.author.toLowerCase().includes(query)
      );
    }
    
    if (filters.type?.length) {
      results = results.filter(result => filters.type!.includes(result.type));
    }
    
    if (filters.platform?.length) {
      results = results.filter(result => filters.platform!.includes(result.platform));
    }
    
    if (filters.dateRange) {
      results = results.filter(result => 
        result.timestamp >= filters.dateRange!.start && 
        result.timestamp <= filters.dateRange!.end
      );
    }
    
    if (filters.sentiment) {
      results = results.filter(result => 
        result.metrics.sentiment >= filters.sentiment!.min && 
        result.metrics.sentiment <= filters.sentiment!.max
      );
    }
    
    if (filters.credibility) {
      results = results.filter(result => 
        result.metrics.credibility >= filters.credibility!.min && 
        result.metrics.credibility <= filters.credibility!.max
      );
    }
    
    if (filters.location) {
      results = results.filter(result => 
        result.metadata.location?.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.language) {
      results = results.filter(result => result.metadata.language === filters.language);
    }
    
    if (filters.verified !== undefined) {
      results = results.filter(result => result.metadata.verified === filters.verified);
    }
    
    return results.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getSearchSuggestions(query: string): Promise<string[]> {
    await this.simulateDelay(100);
    
    const suggestions = [
      'élections 2024',
      'sécurité Kivu',
      'réformes économiques',
      'vaccination COVID',
      'infrastructure routes',
      'corruption gouvernement',
      'éducation écoles',
      'santé hôpitaux',
      'agriculture développement',
      'paix réconciliation'
    ];
    
    return suggestions
      .filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }

  async saveSearch(name: string, query: string, filters: SearchFilters): Promise<SavedSearch> {
    await this.simulateDelay(200);
    
    const savedSearches = this.loadFromStorage<SavedSearch[]>() || [];
    const savedSearch: SavedSearch = {
      id: this.generateId(),
      name,
      query,
      filters,
      createdAt: new Date(),
      lastUsed: new Date(),
      alertEnabled: false
    };
    
    savedSearches.push(savedSearch);
    this.saveToStorage(savedSearches);
    
    return savedSearch;
  }

  async getSavedSearches(): Promise<SavedSearch[]> {
    await this.simulateDelay(100);
    return this.loadFromStorage<SavedSearch[]>() || [];
  }

  async deleteSavedSearch(id: string): Promise<void> {
    await this.simulateDelay(100);
    
    const savedSearches = this.loadFromStorage<SavedSearch[]>() || [];
    const filtered = savedSearches.filter(search => search.id !== id);
    this.saveToStorage(filtered);
  }

  async updateSavedSearch(id: string, updates: Partial<SavedSearch>): Promise<SavedSearch> {
    await this.simulateDelay(150);
    
    const savedSearches = this.loadFromStorage<SavedSearch[]>() || [];
    const searchIndex = savedSearches.findIndex(search => search.id === id);
    
    if (searchIndex === -1) {
      throw new Error('Saved search not found');
    }
    
    savedSearches[searchIndex] = { ...savedSearches[searchIndex], ...updates };
    this.saveToStorage(savedSearches);
    
    return savedSearches[searchIndex];
  }

  async getSearchAnalytics(): Promise<{
    totalSearches: number;
    recentSearches: string[];
    topPlatforms: { name: string; count: number }[];
    sentimentDistribution: { positive: number; neutral: number; negative: number };
  }> {
    await this.simulateDelay(200);
    
    const results = this.generateMockSearchResults();
    
    return {
      totalSearches: results.length,
      recentSearches: [
        'élections 2024',
        'sécurité Nord-Kivu',
        'réformes économiques',
        'vaccination COVID',
        'infrastructure'
      ],
      topPlatforms: [
        { name: 'Facebook', count: 15 },
        { name: 'Twitter', count: 12 },
        { name: 'WhatsApp', count: 8 },
        { name: 'News Sites', count: 7 },
        { name: 'Telegram', count: 5 }
      ],
      sentimentDistribution: {
        positive: Math.floor(results.filter(r => r.metrics.sentiment > 0.1).length),
        neutral: Math.floor(results.filter(r => Math.abs(r.metrics.sentiment) <= 0.1).length),
        negative: Math.floor(results.filter(r => r.metrics.sentiment < -0.1).length)
      }
    };
  }
}