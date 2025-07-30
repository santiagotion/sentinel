import * as admin from 'firebase-admin';
import { logger } from 'firebase-functions';

export interface ScrapingConfig {
  useOfficialAPI: boolean;
  enableScraping: boolean;
  scrapingSources: {
    twitter: boolean;
    radioOkapi: boolean;
    voiceOfCongo: boolean;
    drcNews: boolean;
    googleNews: boolean;
  };
  lastUpdated: Date;
}

export class ConfigService {
  private db = admin.firestore();
  private configCollection = this.db.collection('config');

  /**
   * Get scraping configuration
   */
  async getScrapingConfig(): Promise<ScrapingConfig> {
    try {
      const configDoc = await this.configCollection.doc('scraping').get();
      
      if (configDoc.exists) {
        const data = configDoc.data();
        return {
          useOfficialAPI: data?.useOfficialAPI ?? true,
          enableScraping: data?.enableScraping ?? false,
          scrapingSources: {
            twitter: data?.scrapingSources?.twitter ?? true,
            radioOkapi: data?.scrapingSources?.radioOkapi ?? true,
            voiceOfCongo: data?.scrapingSources?.voiceOfCongo ?? true,
            drcNews: data?.scrapingSources?.drcNews ?? true,
            googleNews: data?.scrapingSources?.googleNews ?? true
          },
          lastUpdated: data?.lastUpdated?.toDate() || new Date()
        };
      } else {
        // Return default configuration - FORCE API MODE until Chrome is fixed
        const defaultConfig: ScrapingConfig = {
          useOfficialAPI: true,
          enableScraping: false,
          scrapingSources: {
            twitter: true,
            radioOkapi: true,
            voiceOfCongo: true,
            drcNews: true,
            googleNews: true
          },
          lastUpdated: new Date()
        };
        
        // Save default config
        await this.updateScrapingConfig(defaultConfig);
        return defaultConfig;
      }
    } catch (error) {
      logger.error('Error getting scraping config:', error);
      // Return safe defaults
      return {
        useOfficialAPI: true,
        enableScraping: false,
        scrapingSources: {
          twitter: true,
          radioOkapi: true,
          voiceOfCongo: true,
          drcNews: true,
          googleNews: true
        },
        lastUpdated: new Date()
      };
    }
  }

  /**
   * Update scraping configuration
   */
  async updateScrapingConfig(config: Partial<ScrapingConfig>): Promise<void> {
    try {
      const updateData = {
        ...config,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp()
      };
      
      await this.configCollection.doc('scraping').set(updateData, { merge: true });
      logger.info('Scraping configuration updated:', config);
    } catch (error) {
      logger.error('Error updating scraping config:', error);
      throw error;
    }
  }

  /**
   * Toggle between API and Scraping mode
   */
  async toggleDataSource(useOfficialAPI: boolean): Promise<void> {
    try {
      await this.updateScrapingConfig({
        useOfficialAPI,
        enableScraping: !useOfficialAPI
      });
      
      logger.info(`Data source toggled to: ${useOfficialAPI ? 'Official API' : 'Scraping'}`);
    } catch (error) {
      logger.error('Error toggling data source:', error);
      throw error;
    }
  }

  /**
   * Check if we should use official API or scraping
   */
  async shouldUseOfficialAPI(): Promise<boolean> {
    const config = await this.getScrapingConfig();
    return config.useOfficialAPI;
  }

  /**
   * Check if scraping is enabled
   */
  async isScrapingEnabled(): Promise<boolean> {
    const config = await this.getScrapingConfig();
    return config.enableScraping;
  }

  /**
   * Get enabled scraping sources
   */
  async getEnabledSources(): Promise<string[]> {
    const config = await this.getScrapingConfig();
    const enabledSources: string[] = [];
    
    if (config.scrapingSources.twitter) enabledSources.push('twitter');
    if (config.scrapingSources.radioOkapi) enabledSources.push('radioOkapi');
    if (config.scrapingSources.voiceOfCongo) enabledSources.push('voiceOfCongo');
    if (config.scrapingSources.drcNews) enabledSources.push('drcNews');
    if (config.scrapingSources.googleNews) enabledSources.push('googlenews');
    
    return enabledSources;
  }
}