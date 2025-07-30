import * as functions from 'firebase-functions';
import { logger } from 'firebase-functions';
import { ScraperService } from './scraperService';
import { HttpScraperService } from './httpScraperService';
import { ConfigService } from './configService';
import { FirestoreService } from './firestoreService';
import { SentimentService } from './sentimentService';

export interface ScrapingJob {
  id: string;
  keyword: string;
  sources: string[];
  priority: 'high' | 'medium' | 'low';
  maxResults: number;
  createdAt: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export class ParallelScraperService {
  private configService = new ConfigService();
  private firestoreService = new FirestoreService();
  private sentimentService = new SentimentService();
  private httpScraperService = new HttpScraperService();

  /**
   * Scraping Strategy:
   * 1. Create separate Cloud Functions for each source
   * 2. Use Pub/Sub to distribute scraping jobs
   * 3. Each function handles one source type
   * 4. Parallel execution with different browser instances
   * 5. Results aggregated in Firestore
   */

  /**
   * Distribute scraping job to multiple instances
   */
  async distributeScrapingJob(keyword: string, sources?: string[], keywordId?: string): Promise<void> {
    const enabledSources = sources || await this.configService.getEnabledSources();
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    logger.info(`Distributing scraping job ${jobId} for keyword: ${keyword}`);
    logger.info(`Enabled sources: ${enabledSources.join(', ')}`);

    // Create separate jobs for each source
    const jobs = enabledSources.map(source => ({
      jobId,
      keyword,
      keywordId,
      source,
      timestamp: new Date().toISOString()
    }));

    // Add Google News as a high-priority source
    const googleNewsJob = {
      jobId,
      keyword,
      keywordId,
      source: 'googlenews',
      timestamp: new Date().toISOString()
    };
    jobs.push(googleNewsJob);

    // Send each job to its specific Pub/Sub topic
    const promises = jobs.map(job => this.sendJobToTopic(job));
    
    await Promise.allSettled(promises);
    logger.info(`Distributed ${jobs.length} scraping jobs for keyword: ${keyword}`);
  }

  /**
   * Send job to specific Pub/Sub topic based on source
   */
  private async sendJobToTopic(job: any): Promise<void> {
    try {
      const topicName = `scrape-${job.source.toLowerCase().replace(/\s+/g, '-')}`;
      
      // In a real implementation, you'd use Pub/Sub here
      // For now, we'll call the functions directly
      switch (job.source.toLowerCase()) {
        case 'twitter':
          await this.triggerTwitterScraper(job);
          break;
        case 'radiookapi':
          await this.triggerRadioOkapiScraper(job);
          break;
        case 'voiceofcongo':
          await this.triggerVoiceCongScraper(job);
          break;
        case 'drcnews':
          await this.triggerDRCNewsScraper(job);
          break;
        case 'googlenews':
          await this.triggerGoogleNewsScraper(job);
          break;
        default:
          logger.warn(`Unknown source: ${job.source}`);
      }
    } catch (error) {
      logger.error(`Error sending job to topic for source ${job.source}:`, error);
    }
  }

  /**
   * Trigger Twitter scraper instance (HTTP fallback when Chrome fails)
   */
  private async triggerTwitterScraper(job: any): Promise<void> {
    logger.info(`Triggering Twitter scraper for keyword: ${job.keyword}`);
    
    // Skip Chrome-based Twitter scraping since we have API mode
    // Focus on HTTP-based scraping for news sources
    logger.info(`Skipping Chrome-based Twitter scraping for keyword: ${job.keyword} - use API mode instead`);
    return;
  }

  /**
   * Trigger Radio Okapi scraper instance
   */
  private async triggerRadioOkapiScraper(job: any): Promise<void> {
    logger.info(`Triggering Radio Okapi scraper for keyword: ${job.keyword}`);
    
    // Try HTTP scraping first (no Chrome needed)
    try {
      const articles = await this.httpScraperService.scrapeRadioOkapi(job.keyword, 100);
      
      if (articles.length > 0) {
        const posts = articles.map((article, index) => {
          const post = this.httpScraperService.convertToTwitterPost(article, index, job.jobId);
          post.keyword = job.keyword;
          return post;
        });
        
        const postsWithSentiment = await Promise.all(
          posts.map(async (post) => {
            const sentimentResult = await this.sentimentService.analyzeSentiment(post.content);
            return {
              ...post,
              sentiment: sentimentResult.sentiment,
              sentimentScore: sentimentResult.score
            };
          })
        );
        
        await this.firestoreService.saveTweets(postsWithSentiment);
        
        // Update keyword analytics
        const keywordId = job.keywordId || job.keyword; // Fallback to keyword term if ID not available
        await this.firestoreService.updateKeywordAnalytics(keywordId, postsWithSentiment);
        
        logger.info(`Radio Okapi scraper saved ${postsWithSentiment.length} articles for keyword: ${job.keyword}`);
      }
    } catch (error) {
      logger.error(`Radio Okapi scraper error:`, error);
    }
  }

  /**
   * Trigger Voice of Congo scraper instance (Skip Chrome-based for now)
   */
  private async triggerVoiceCongScraper(job: any): Promise<void> {
    logger.info(`Triggering Voice of Congo scraper for keyword: ${job.keyword}`);
    
    // Skip Chrome-based Voice of Congo scraping 
    logger.info(`Skipping Chrome-based Voice of Congo scraping for keyword: ${job.keyword}`);
    return;
  }

  /**
   * Trigger DRC News scraper instance
   */
  private async triggerDRCNewsScraper(job: any): Promise<void> {
    logger.info(`Triggering DRC News scraper for keyword: ${job.keyword}`);
    
    // Try HTTP scraping first (no Chrome needed)
    try {
      const articles = await this.httpScraperService.scrapeDRCNews(job.keyword, 500);
      
      if (articles.length > 0) {
        const posts = articles.map((article, index) => {
          const post = this.httpScraperService.convertToTwitterPost(article, index, job.jobId);
          post.keyword = job.keyword;
          return post;
        });
        
        const postsWithSentiment = await Promise.all(
          posts.map(async (post) => {
            const sentimentResult = await this.sentimentService.analyzeSentiment(post.content);
            return {
              ...post,
              sentiment: sentimentResult.sentiment,
              sentimentScore: sentimentResult.score
            };
          })
        );
        
        await this.firestoreService.saveTweets(postsWithSentiment);
        
        // Update keyword analytics
        const keywordId = job.keywordId || job.keyword; // Fallback to keyword term if ID not available
        await this.firestoreService.updateKeywordAnalytics(keywordId, postsWithSentiment);
        
        logger.info(`DRC News scraper saved ${postsWithSentiment.length} articles for keyword: ${job.keyword}`);
      }
    } catch (error) {
      logger.error(`DRC News scraper error:`, error);
    }
  }

  /**
   * Trigger Google News scraper instance
   */
  private async triggerGoogleNewsScraper(job: any): Promise<void> {
    logger.info(`Triggering Google News scraper for keyword: ${job.keyword}`);
    
    try {
      const articles = await this.httpScraperService.scrapeGoogleNews(job.keyword, 200);
      
      if (articles.length > 0) {
        const posts = articles.map((article, index) => {
          const post = this.httpScraperService.convertToTwitterPost(article, index, job.jobId);
          post.keyword = job.keyword;
          return post;
        });
        
        const postsWithSentiment = await Promise.all(
          posts.map(async (post) => {
            const sentimentResult = await this.sentimentService.analyzeSentiment(post.content);
            return {
              ...post,
              sentiment: sentimentResult.sentiment,
              sentimentScore: sentimentResult.score
            };
          })
        );
        
        await this.firestoreService.saveTweets(postsWithSentiment);
        
        // Update keyword analytics
        const keywordId = job.keywordId || job.keyword;
        await this.firestoreService.updateKeywordAnalytics(keywordId, postsWithSentiment);
        
        logger.info(`Google News scraper saved ${postsWithSentiment.length} articles for keyword: ${job.keyword}`);
      }
    } catch (error) {
      logger.error(`Google News scraper error:`, error);
    }
  }
}

/**
 * Scraping Strategy Implementation:
 * 
 * 1. PARALLEL EXECUTION
 *    - Each source runs in separate Cloud Function
 *    - Independent browser instances
 *    - No shared state or blocking
 * 
 * 2. FAULT TOLERANCE
 *    - If one source fails, others continue
 *    - Retry mechanism for failed sources
 *    - Graceful degradation
 * 
 * 3. RESOURCE OPTIMIZATION
 *    - Different memory/timeout per source
 *    - Twitter: 512MB, 2min (fast but rate limited)
 *    - News sites: 1GB, 5min (slower but comprehensive)
 * 
 * 4. RATE LIMIT STRATEGY
 *    - Each source uses different IP (Cloud Function instances)
 *    - Randomized delays between requests
 *    - User-agent rotation
 *    - Geographic distribution of function regions
 * 
 * 5. STEALTH TECHNIQUES
 *    - Puppeteer stealth plugin
 *    - Random viewport sizes
 *    - Human-like mouse movements
 *    - Realistic typing speeds
 *    - Cookie persistence
 * 
 * 6. DATA AGGREGATION
 *    - Results stored in Firestore with source tags
 *    - Duplicate detection across sources
 *    - Unified sentiment analysis
 *    - Source reliability scoring
 */