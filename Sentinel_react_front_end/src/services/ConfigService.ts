import { doc, getDoc, setDoc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface ScrapingConfig {
  useOfficialAPI: boolean;
  enableScraping: boolean;
  scrapingSources: {
    twitter: boolean;
    radioOkapi: boolean;
    voiceOfCongo: boolean;
    drcNews: boolean;
  };
  lastUpdated: Date;
}

export class ConfigService {
  private configCollection = 'config';
  private scrapingDocId = 'scraping';

  /**
   * Get current scraping configuration
   */
  async getScrapingConfig(): Promise<ScrapingConfig> {
    try {
      const configRef = doc(db, this.configCollection, this.scrapingDocId);
      const configSnap = await getDoc(configRef);
      
      if (configSnap.exists()) {
        const data = configSnap.data();
        return {
          useOfficialAPI: data.useOfficialAPI ?? true,
          enableScraping: data.enableScraping ?? false,
          scrapingSources: {
            twitter: data.scrapingSources?.twitter ?? true,
            radioOkapi: data.scrapingSources?.radioOkapi ?? true,
            voiceOfCongo: data.scrapingSources?.voiceOfCongo ?? true,
            drcNews: data.scrapingSources?.drcNews ?? true
          },
          lastUpdated: data.lastUpdated?.toDate() || new Date()
        };
      } else {
        // Return and save default configuration
        const defaultConfig: ScrapingConfig = {
          useOfficialAPI: true,
          enableScraping: false,
          scrapingSources: {
            twitter: true,
            radioOkapi: true,
            voiceOfCongo: true,
            drcNews: true
          },
          lastUpdated: new Date()
        };
        
        await this.updateScrapingConfig(defaultConfig);
        return defaultConfig;
      }
    } catch (error) {
      console.error('Error getting scraping config:', error);
      // Return safe defaults
      return {
        useOfficialAPI: true,
        enableScraping: false,
        scrapingSources: {
          twitter: true,
          radioOkapi: true,
          voiceOfCongo: true,
          drcNews: true
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
      const configRef = doc(db, this.configCollection, this.scrapingDocId);
      const updateData = {
        ...config,
        lastUpdated: Timestamp.now()
      };
      
      await setDoc(configRef, updateData, { merge: true });
      console.log('Scraping configuration updated:', config);
    } catch (error) {
      console.error('Error updating scraping config:', error);
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
      
      console.log(`Data source toggled to: ${useOfficialAPI ? 'Official API' : 'Scraping'}`);
    } catch (error) {
      console.error('Error toggling data source:', error);
      throw error;
    }
  }

  /**
   * Listen to configuration changes in real-time
   */
  onConfigChange(callback: (config: ScrapingConfig) => void): () => void {
    const configRef = doc(db, this.configCollection, this.scrapingDocId);
    
    return onSnapshot(configRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const config: ScrapingConfig = {
          useOfficialAPI: data.useOfficialAPI ?? true,
          enableScraping: data.enableScraping ?? false,
          scrapingSources: {
            twitter: data.scrapingSources?.twitter ?? true,
            radioOkapi: data.scrapingSources?.radioOkapi ?? true,
            voiceOfCongo: data.scrapingSources?.voiceOfCongo ?? true,
            drcNews: data.scrapingSources?.drcNews ?? true
          },
          lastUpdated: data.lastUpdated?.toDate() || new Date()
        };
        callback(config);
      }
    }, (error) => {
      console.error('Error listening to config changes:', error);
    });
  }

  /**
   * Check if official API is currently enabled
   */
  async isOfficialAPIEnabled(): Promise<boolean> {
    const config = await this.getScrapingConfig();
    return config.useOfficialAPI;
  }

  /**
   * Check if scraping is currently enabled
   */
  async isScrapingEnabled(): Promise<boolean> {
    const config = await this.getScrapingConfig();
    return config.enableScraping;
  }

  /**
   * Get list of enabled scraping sources
   */
  async getEnabledSources(): Promise<string[]> {
    const config = await this.getScrapingConfig();
    const enabledSources: string[] = [];
    
    if (config.scrapingSources.twitter) enabledSources.push('Twitter');
    if (config.scrapingSources.radioOkapi) enabledSources.push('Radio Okapi');
    if (config.scrapingSources.voiceOfCongo) enabledSources.push('Voice of Congo');
    if (config.scrapingSources.drcNews) enabledSources.push('DRC News');
    
    return enabledSources;
  }
}