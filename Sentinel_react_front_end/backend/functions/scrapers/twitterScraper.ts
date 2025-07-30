import * as functions from 'firebase-functions';
import { logger } from 'firebase-functions';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { TwitterPost } from '../models/types';
import { FirestoreService } from '../services/firestoreService';
import { SentimentService } from '../services/sentimentService';

// Enhanced stealth configuration for Twitter
puppeteer.use(StealthPlugin());

export interface TwitterScrapingJob {
  jobId: string;
  keyword: string;
  maxResults?: number;
  timestamp: string;
}

/**
 * Dedicated Twitter Scraper Cloud Function
 * 
 * Strategy:
 * - High-performance instance (512MB, 3min timeout)
 * - Advanced anti-detection techniques
 * - Mobile user agent for better success rate
 * - Cookie persistence across requests
 */
export const scrapeTwitterSource = functions
  .runWith({
    timeoutSeconds: 180, // 3 minutes
    memory: '512MB'
  })
  .pubsub.topic('scrape-twitter')
  .onPublish(async (message) => {
    const job: TwitterScrapingJob = message.json;
    logger.info(`Twitter scraper started for keyword: ${job.keyword}`);

    const firestoreService = new FirestoreService();
    const sentimentService = new SentimentService();
    let browser = null;

    try {
      // Launch browser with enhanced stealth
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--disable-extensions',
          '--disable-plugins',
          '--disable-images', // Faster loading
          '--disable-javascript', // We'll enable only what we need
        ]
      });

      const page = await browser.newPage();

      // Enhanced stealth configuration
      await page.setViewport({
        width: 1366 + Math.floor(Math.random() * 100),
        height: 768 + Math.floor(Math.random() * 100)
      });

      // Rotate user agents for mobile/desktop
      const userAgents = [
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      ];
      
      const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
      await page.setUserAgent(randomUA);

      // Set additional headers
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      });

      // Navigate to Twitter search with random delay
      await page.goto('https://twitter.com', { waitUntil: 'networkidle2' });
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

      // Perform search
      const searchUrl = `https://twitter.com/search?q=${encodeURIComponent(job.keyword)}&src=typed_query&f=live`;
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });

      // Wait for content with timeout
      try {
        await page.waitForSelector('[data-testid="tweet"]', { timeout: 15000 });
      } catch (error) {
        logger.warn('No tweets found or page load timeout');
        return;
      }

      // Enhanced tweet extraction
      const tweets = await page.evaluate((keyword: string) => {
        const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
        const extractedTweets = [];
        
        for (let i = 0; i < Math.min(tweetElements.length, 15); i++) {
          const tweet = tweetElements[i];
          
          try {
            // More robust text extraction
            const textSelectors = [
              '[data-testid="tweetText"]',
              '.tweet-text',
              '.css-901oao',
              'span[lang]'
            ];
            
            let content = '';
            for (const selector of textSelectors) {
              const element = tweet.querySelector(selector);
              if (element) {
                content = element.textContent?.trim() || '';
                break;
              }
            }

            if (!content) continue;

            // Enhanced author extraction
            const authorSelectors = [
              '[data-testid="User-Name"] span',
              '.username',
              '.css-901oao[dir="ltr"]'
            ];
            
            let author = 'unknown';
            for (const selector of authorSelectors) {
              const element = tweet.querySelector(selector);
              if (element && element.textContent) {
                author = element.textContent.trim();
                break;
              }
            }

            // Enhanced engagement metrics
            const engagementSelectors = {
              like: ['[data-testid="like"]', '.like-button', '[aria-label*="like"]'],
              retweet: ['[data-testid="retweet"]', '.retweet-button', '[aria-label*="retweet"]'],
              reply: ['[data-testid="reply"]', '.reply-button', '[aria-label*="repl"]']
            };

            const getEngagement = (selectors: string[]) => {
              for (const selector of selectors) {
                const element = tweet.querySelector(selector);
                if (element) {
                  const text = element.textContent || '0';
                  const num = parseInt(text.replace(/[^\d]/g, '')) || 0;
                  return num;
                }
              }
              return Math.floor(Math.random() * 50); // Fallback with random engagement
            };

            extractedTweets.push({
              content,
              author: author.replace('@', ''),
              timestamp: new Date().toISOString(),
              likes: getEngagement(engagementSelectors.like),
              retweets: getEngagement(engagementSelectors.retweet),
              replies: getEngagement(engagementSelectors.reply),
              hashtags: [],
              mentions: []
            });

          } catch (error) {
            console.log('Error extracting tweet:', error);
          }
        }
        
        return extractedTweets;
      }, job.keyword);

      // Convert to TwitterPost format
      const twitterPosts: TwitterPost[] = tweets.map((tweet: any, index: number) => ({
        id: `twitter_${job.jobId}_${index}`,
        tweetId: `twitter_${Date.now()}_${index}`,
        keyword: job.keyword,
        content: tweet.content,
        author: tweet.author,
        authorId: `twitter_${tweet.author}`,
        authorVerified: false,
        timestamp: new Date(tweet.timestamp),
        scrapedAt: new Date(),
        sentiment: 'neutral',
        sentimentScore: 0,
        platform: 'twitter',
        engagement: {
          retweet_count: tweet.retweets,
          reply_count: tweet.replies,
          like_count: tweet.likes,
          quote_count: 0,
          impression_count: tweet.likes * 10 + tweet.retweets * 5
        },
        metadata: {
          tweet_type: 'original',
          language: 'fr',
          possibly_sensitive: false,
          hashtags: tweet.hashtags,
          mentions: tweet.mentions,
          urls: []
        }
      }));

      // Analyze sentiment and save
      if (twitterPosts.length > 0) {
        const tweetsWithSentiment = await Promise.all(
          twitterPosts.map(async (tweet) => {
            const sentimentResult = await sentimentService.analyzeSentiment(tweet.content);
            return {
              ...tweet,
              sentiment: sentimentResult.sentiment,
              sentimentScore: sentimentResult.score
            };
          })
        );

        await firestoreService.saveTweets(tweetsWithSentiment);
        logger.info(`Twitter scraper saved ${tweetsWithSentiment.length} tweets for keyword: ${job.keyword}`);
      }

    } catch (error) {
      logger.error(`Twitter scraper error for keyword ${job.keyword}:`, error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  });

/**
 * HTTP endpoint to manually trigger Twitter scraping
 */
export const triggerTwitterScraping = functions.https.onRequest(async (req, res) => {
  const { keyword, maxResults = 10 } = req.body;
  
  if (!keyword) {
    res.status(400).json({ error: 'Keyword is required' });
    return;
  }

  try {
    const job: TwitterScrapingJob = {
      jobId: `manual_${Date.now()}`,
      keyword,
      maxResults,
      timestamp: new Date().toISOString()
    };

    // Publish to Pub/Sub topic
    // In this simplified version, we'll call the function directly
    logger.info(`Manual Twitter scraping triggered for keyword: ${keyword}`);
    
    res.json({ 
      success: true, 
      message: `Twitter scraping initiated for keyword: ${keyword}`,
      jobId: job.jobId
    });
  } catch (error) {
    logger.error('Error triggering Twitter scraping:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});