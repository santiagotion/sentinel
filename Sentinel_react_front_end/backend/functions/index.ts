import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';
import express from 'express';

// Initialize Firebase Admin
admin.initializeApp();

// Import services
import { TwitterService } from './services/twitterService';
import { FirestoreService } from './services/firestoreService';
import { SentimentService } from './services/sentimentService';
import { RateLimitManager } from './utils/rateLimitManager';
import { logger } from 'firebase-functions';
import { TwitterPost } from './models/types';
import { ScraperService } from './services/scraperService';
import { ConfigService } from './services/configService';
import { ParallelScraperService } from './services/parallelScraperService';

// Initialize services
const firestoreService = new FirestoreService();
const sentimentService = new SentimentService();
const rateLimitManager = new RateLimitManager();
const scraperService = new ScraperService();
const configService = new ConfigService();
const parallelScraperService = new ParallelScraperService();

// Express app for HTTP endpoints
const app = express();

// Configure CORS properly
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

/**
 * Scheduled function to scrape Twitter data every 30 minutes
 */
export const scrapeTwitterData = functions
  .runWith({
    timeoutSeconds: 540, // 9 minutes
    memory: '1GB'
  })
  .pubsub.schedule('every 2 hours')
  .timeZone('Africa/Kinshasa')
  .onRun(async (context) => {
    logger.info('Starting Twitter data scraping job');
    const startTime = Date.now();

    try {
      // Initialize Twitter service with bearer token
      const bearerToken = functions.config().twitter?.bearer_token || process.env.TWITTER_BEARER_TOKEN;
      if (!bearerToken) {
        throw new Error('Twitter bearer token not configured');
      }

      const twitterService = new TwitterService(bearerToken);

      // Get active keywords
      const keywords = await firestoreService.getActiveKeywords();
      logger.info(`Found ${keywords.length} active keywords to process`);

      // Process keywords based on priority
      const sortedKeywords = keywords.sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      let totalTweetsProcessed = 0;
      let totalApiCalls = 0;

      for (const keyword of sortedKeywords) {
        try {
          // Check rate limits
          if (!rateLimitManager.canMakeRequest('search', 1)) {
            logger.warn(`Rate limit reached, skipping keyword: ${keyword.term}`);
            continue;
          }

          logger.info(`Processing keyword: ${keyword.term}`);

          // Search tweets with conservative limit
          const tweets = await twitterService.searchTweets(keyword.term, 10);
          totalApiCalls++;
          rateLimitManager.recordRequest('search', 1);

          if (tweets.length === 0) {
            logger.info(`No tweets found for keyword: ${keyword.term}`);
            continue;
          }

          // Check for duplicates
          const tweetIds = tweets.map(t => t.tweetId);
          const existingTweetIds = await firestoreService.checkDuplicateTweets(tweetIds);
          
          // Filter out duplicates
          const newTweets = tweets.filter(t => !existingTweetIds.has(t.tweetId));
          logger.info(`Found ${newTweets.length} new tweets for keyword: ${keyword.term}`);

          if (newTweets.length > 0) {
            // Analyze sentiment for new tweets
            const tweetsWithSentiment = await Promise.all(
              newTweets.map(async (tweet) => {
                const sentimentResult = await sentimentService.analyzeSentiment(tweet.content);
                return {
                  ...tweet,
                  sentiment: sentimentResult.sentiment,
                  sentimentScore: sentimentResult.score
                };
              })
            );

            // Save tweets to Firestore
            await firestoreService.saveTweets(tweetsWithSentiment);
            totalTweetsProcessed += tweetsWithSentiment.length;

            // Update keyword analytics
            await firestoreService.updateKeywordAnalytics(keyword.id, tweetsWithSentiment);
          }

          // Update last scraped timestamp
          await firestoreService.updateKeywordLastScraped(keyword.id);

          // Log scraping activity
          await firestoreService.logScraping({
            keyword: keyword.term,
            timestamp: new Date(),
            status: 'success',
            tweetsFound: newTweets.length,
            apiCallsUsed: 1,
            duration: Date.now() - startTime
          });

        } catch (error) {
          logger.error(`Error processing keyword ${keyword.term}:`, error as Error);
          
          await firestoreService.logScraping({
            keyword: keyword.term,
            timestamp: new Date(),
            status: 'error',
            tweetsFound: 0,
            apiCallsUsed: totalApiCalls,
            error: (error as Error).message,
            duration: Date.now() - startTime
          });
        }
      }

      const duration = Date.now() - startTime;
      logger.info(`Scraping job completed. Processed ${totalTweetsProcessed} tweets in ${duration}ms`);

    } catch (error) {
      logger.error('Fatal error in scraping job:', error);
      throw error;
    }
  });

/**
 * High-priority keywords scraping (every 15 minutes)
 */
export const scrapeHighPriorityKeywords = functions
  .runWith({
    timeoutSeconds: 300,
    memory: '512MB'
  })
  .pubsub.schedule('every 4 hours')
  .onRun(async (context) => {
    logger.info('Starting high-priority keywords scraping');

    try {
      const bearerToken = functions.config().twitter?.bearer_token || process.env.TWITTER_BEARER_TOKEN;
      if (!bearerToken) {
        throw new Error('Twitter bearer token not configured');
      }

      const twitterService = new TwitterService(bearerToken);

      // Get only critical priority keywords
      const keywords = await firestoreService.getActiveKeywords();
      const criticalKeywords = keywords.filter(k => k.priority === 'critical').slice(0, 5);

      logger.info(`Processing ${criticalKeywords.length} critical keywords`);

      for (const keyword of criticalKeywords) {
        try {
          const tweets = await twitterService.searchTweets(keyword.term, 5);
          
          if (tweets.length > 0) {
            // Quick sentiment analysis
            const tweetsWithSentiment = await Promise.all(
              tweets.map(async (tweet) => {
                const sentimentResult = await sentimentService.analyzeSentiment(tweet.content);
                return {
                  ...tweet,
                  sentiment: sentimentResult.sentiment,
                  sentimentScore: sentimentResult.score
                };
              })
            );

            await firestoreService.saveTweets(tweetsWithSentiment);
            await firestoreService.updateKeywordLastScraped(keyword.id);
          }
        } catch (error) {
          logger.error(`Error processing critical keyword ${keyword.term}:`, error);
        }
      }

    } catch (error) {
      logger.error('Error in high-priority scraping:', error);
    }
  });

/**
 * HTTP API Endpoints
 */

// Get tweets for a keyword
app.get('/api/keywords/:keywordId/tweets', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { keywordId } = req.params;
    const limit = parseInt(req.query.limit as string) || 100;
    
    const keyword = await firestoreService.getKeywordById(keywordId);
    if (!keyword) {
      res.status(404).json({ error: 'Keyword not found' });
      return;
    }

    const tweets = await firestoreService.getTweetsByKeyword(keyword.term, limit);
    
    res.json({
      keyword: keyword.term,
      tweets,
      count: tweets.length
    });

  } catch (error) {
    logger.error('Error fetching tweets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get keyword analytics
app.get('/api/keywords/:keywordId/analytics', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { keywordId } = req.params;
    
    const keyword = await firestoreService.getKeywordById(keywordId);
    if (!keyword) {
      res.status(404).json({ error: 'Keyword not found' });
      return;
    }

    res.json({
      keyword: keyword.term,
      analytics: keyword.analytics || null
    });

  } catch (error) {
    logger.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Manual trigger for immediate scraping
app.post('/api/keywords/:keywordId/scrape', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { keywordId } = req.params;
    
    const keyword = await firestoreService.getKeywordById(keywordId);
    if (!keyword) {
      res.status(404).json({ error: 'Keyword not found' });
      return;
    }

    // Check rate limits
    if (!rateLimitManager.canMakeRequest('search', 1)) {
      res.status(429).json({ error: 'Rate limit exceeded' });
      return;
    }

    const bearerToken = functions.config().twitter?.bearer_token || process.env.TWITTER_BEARER_TOKEN;
    if (!bearerToken) {
      res.status(500).json({ error: 'Twitter API not configured' });
      return;
    }

    const twitterService = new TwitterService(bearerToken);
    const tweets = await twitterService.searchTweets(keyword.term, 20);

    if (tweets.length > 0) {
      const tweetsWithSentiment = await Promise.all(
        tweets.map(async (tweet) => {
          const sentimentResult = await sentimentService.analyzeSentiment(tweet.content);
          return {
            ...tweet,
            sentiment: sentimentResult.sentiment,
            sentimentScore: sentimentResult.score
          };
        })
      );

      await firestoreService.saveTweets(tweetsWithSentiment);
      await firestoreService.updateKeywordAnalytics(keyword.id, tweetsWithSentiment);
    }

    res.json({
      message: 'Scraping completed',
      tweetsFound: tweets.length
    });

  } catch (error) {
    logger.error('Error in manual scraping:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Configuration endpoints
app.get('/api/config/scraping', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const config = await configService.getScrapingConfig();
    res.json(config);
  } catch (error) {
    logger.error('Error getting scraping config:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/config/scraping', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { useOfficialAPI, enableScraping, scrapingSources } = req.body;
    
    await configService.updateScrapingConfig({
      useOfficialAPI,
      enableScraping,
      scrapingSources
    });
    
    res.json({ success: true, message: 'Configuration updated successfully' });
  } catch (error) {
    logger.error('Error updating scraping config:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/config/toggle-source', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { useOfficialAPI } = req.body;
    
    await configService.toggleDataSource(useOfficialAPI);
    
    res.json({ 
      success: true, 
      message: `Switched to ${useOfficialAPI ? 'Official Twitter API' : 'Scraping mode'}` 
    });
  } catch (error) {
    logger.error('Error toggling data source:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export Express app as Cloud Function
export const api = functions.https.onRequest(app);

// Export individual scraper functions
export { scrapeTwitterSource, triggerTwitterScraping } from './scrapers/twitterScraper';
export { scrapeRadioOkapiSource, scrapeDRCNewsSource } from './scrapers/newsScraper';

/**
 * Daily analytics aggregation
 */
export const dailyAnalyticsAggregation = functions
  .pubsub.schedule('0 6 * * *')
  .timeZone('Africa/Kinshasa')
  .onRun(async (context) => {
    logger.info('Starting daily analytics aggregation');
    
    try {
      // This function would aggregate daily statistics
      // Implementation depends on specific analytics requirements
      
      logger.info('Daily analytics aggregation completed');
    } catch (error) {
      logger.error('Error in daily aggregation:', error);
    }
  });

/**
 * Trigger scraping when a new keyword is created
 */
export const onKeywordCreated = functions.firestore
  .document('keywords/{keywordId}')
  .onCreate(async (snapshot, context) => {
    const keyword = snapshot.data();
    const keywordId = context.params.keywordId;
    
    logger.info(`New keyword created: ${keyword.term} (${keywordId})`);
    
    // Initialize Twitter service
    const bearerToken = functions.config().twitter?.bearer_token || process.env.TWITTER_BEARER_TOKEN;
    if (!bearerToken) {
      logger.error('Twitter bearer token not configured');
      return;
    }

    const twitterService = new TwitterService(bearerToken);
    
    try {
      // Check configuration to decide between API and scraping
      const useOfficialAPI = await configService.shouldUseOfficialAPI();
      let tweets: TwitterPost[] = [];
      
      if (useOfficialAPI) {
        // Use Twitter API
        if (!rateLimitManager.canMakeRequest('search', 1)) {
          logger.warn(`Rate limit exceeded, skipping immediate scraping for keyword: ${keyword.term}`);
          logger.info(`Will be picked up by scheduled scraper later`);
          return;
        }
        
        logger.info(`Using Twitter API for keyword: ${keyword.term}`);
        tweets = await twitterService.searchTweets(keyword.term, 10);
      } else {
        // Use parallel scraping system
        logger.info(`Using parallel scraper for keyword: ${keyword.term}`);
        
        // Distribute scraping job to multiple instances
        await parallelScraperService.distributeScrapingJob(keyword.term, undefined, keywordId);
        
        // The parallel scrapers will save data directly to Firestore
        // No need to wait for results here as they run asynchronously
        logger.info(`Parallel scraping jobs distributed for keyword: ${keyword.term}`);
        return; // Exit early as scraping happens asynchronously
      }
      
      if (tweets.length > 0) {
        // Analyze sentiment
        const tweetsWithSentiment = await Promise.all(
          tweets.map(async (tweet) => {
            const sentimentResult = await sentimentService.analyzeSentiment(tweet.content);
            return {
              ...tweet,
              sentiment: sentimentResult.sentiment,
              sentimentScore: sentimentResult.score
            };
          })
        );

        // Save tweets
        await firestoreService.saveTweets(tweetsWithSentiment);
        
        // Update keyword analytics
        await firestoreService.updateKeywordAnalytics(keywordId, tweetsWithSentiment);
        
        logger.info(`Scraped ${tweets.length} tweets for new keyword: ${keyword.term}`);
      }
    } catch (error) {
      logger.error(`Error scraping new keyword ${keyword.term}:`, error);
    }
  });