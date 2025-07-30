import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { TwitterPost } from '../models/types';
import { logger } from 'firebase-functions';

// Use stealth plugin to avoid detection
puppeteer.use(StealthPlugin());

export interface ScrapedPost {
  id: string;
  platform: string;
  content: string;
  author: string;
  timestamp: Date;
  url: string;
  engagement?: {
    likes?: number;
    shares?: number;
    comments?: number;
  };
  metadata: {
    source: string;
    language: string;
    hashtags: string[];
    mentions: string[];
  };
}

export class ScraperService {
  private browser: any = null;
  
  async initBrowser() {
    if (!this.browser) {
      try {
        // For Cloud Functions, use system Chrome path or Puppeteer's downloaded Chrome
        const launchOptions: any = {
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
            '--disable-features=VizDisplayCompositor'
          ]
        };

        // In Cloud Functions, try to use Puppeteer's bundled Chrome
        if (process.env.FUNCTION_NAME) {
          // Running in Cloud Functions
          launchOptions.executablePath = puppeteer.executablePath();
        }

        this.browser = await puppeteer.launch(launchOptions);
      } catch (error) {
        logger.error('Failed to launch browser with Puppeteer:', error);
        throw new Error('Browser initialization failed: ' + (error instanceof Error ? error.message : String(error)));
      }
    }
    return this.browser;
  }

  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Scrape Twitter public data for a keyword
   */
  async scrapeTwitter(keyword: string, maxResults: number = 10): Promise<TwitterPost[]> {
    const browser = await this.initBrowser();
    const page = await browser.newPage();
    
    try {
      logger.info(`Scraping Twitter for keyword: ${keyword}`);
      
      // Set user agent and other headers to appear more human
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      // Navigate to Twitter search
      const searchUrl = `https://twitter.com/search?q=${encodeURIComponent(keyword)}&src=typed_query&f=live`;
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });
      
      // Wait for tweets to load
      await page.waitForSelector('[data-testid="tweet"]', { timeout: 10000 });
      
      // Extract tweet data
      const tweets = await page.evaluate((keyword: string) => {
        const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
        const extractedTweets = [];
        
        for (let i = 0; i < Math.min(tweetElements.length, 10); i++) {
          const tweet = tweetElements[i];
          
          try {
            // Extract text content
            const textElement = tweet.querySelector('[data-testid="tweetText"]');
            const content = textElement ? textElement.textContent?.trim() || '' : '';
            
            // Extract author
            const authorElement = tweet.querySelector('[data-testid="User-Name"] span');
            const author = authorElement ? authorElement.textContent?.trim() || 'unknown' : 'unknown';
            
            // Extract timestamp
            const timeElement = tweet.querySelector('time');
            const timestamp = timeElement ? timeElement.getAttribute('datetime') || new Date().toISOString() : new Date().toISOString();
            
            // Extract engagement metrics
            const likeElement = tweet.querySelector('[data-testid="like"]');
            const retweetElement = tweet.querySelector('[data-testid="retweet"]');
            const replyElement = tweet.querySelector('[data-testid="reply"]');
            
            const likes = likeElement ? parseInt(likeElement.textContent || '0') || 0 : 0;
            const retweets = retweetElement ? parseInt(retweetElement.textContent || '0') || 0 : 0;
            const replies = replyElement ? parseInt(replyElement.textContent || '0') || 0 : 0;
            
            // Extract hashtags and mentions
            const hashtags: string[] = [];
            const mentions: string[] = [];
            const hashtagElements = textElement?.querySelectorAll('a[href*="/hashtag/"]') || [];
            const mentionElements = textElement?.querySelectorAll('a[href^="/"]') || [];
            
            hashtagElements.forEach((el: any) => {
              const hashtag = el.textContent?.replace('#', '') || '';
              if (hashtag) hashtags.push(hashtag);
            });
            
            mentionElements.forEach((el: any) => {
              const mention = el.textContent?.replace('@', '') || '';
              if (mention && !mention.includes('/')) mentions.push(mention);
            });
            
            if (content) {
              extractedTweets.push({
                content,
                author,
                timestamp,
                likes,
                retweets,
                replies,
                hashtags,
                mentions
              });
            }
          } catch (error) {
            console.log('Error extracting tweet:', error);
          }
        }
        
        return extractedTweets;
      }, keyword);
      
      // Convert to TwitterPost format
      const twitterPosts: TwitterPost[] = tweets.map((tweet: any, index: number) => ({
        id: `scraped_twitter_${Date.now()}_${index}`,
        tweetId: `scraped_${Math.random().toString(36).substr(2, 9)}`,
        keyword: keyword,
        content: tweet.content,
        author: tweet.author,
        authorId: `scraped_${tweet.author}`,
        authorVerified: false,
        timestamp: new Date(tweet.timestamp),
        scrapedAt: new Date(),
        sentiment: 'neutral', // Will be analyzed separately
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
      
      logger.info(`Scraped ${twitterPosts.length} tweets for keyword: ${keyword}`);
      return twitterPosts;
      
    } catch (error) {
      logger.error(`Error scraping Twitter for keyword ${keyword}:`, error);
      throw error;
    } finally {
      await page.close();
    }
  }

  /**
   * Scrape Radio Okapi news
   */
  async scrapeRadioOkapi(keyword: string, maxResults: number = 5): Promise<ScrapedPost[]> {
    const browser = await this.initBrowser();
    const page = await browser.newPage();
    
    try {
      logger.info(`Scraping Radio Okapi for keyword: ${keyword}`);
      
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      // Navigate to Radio Okapi search
      const searchUrl = `https://www.radiookapi.net/recherche?q=${encodeURIComponent(keyword)}`;
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });
      
      // Wait for articles to load
      await page.waitForSelector('.article-item, .news-item', { timeout: 10000 });
      
      const articles = await page.evaluate((keyword: string) => {
        const articleElements = document.querySelectorAll('.article-item, .news-item, .post-item');
        const extractedArticles = [];
        
        for (let i = 0; i < Math.min(articleElements.length, 5); i++) {
          const article = articleElements[i];
          
          try {
            const titleElement = article.querySelector('h2, h3, .title, .headline');
            const title = titleElement ? titleElement.textContent?.trim() || '' : '';
            
            const contentElement = article.querySelector('.excerpt, .summary, .description, p');
            const content = contentElement ? contentElement.textContent?.trim() || '' : '';
            
            const linkElement = article.querySelector('a[href]');
            const url = linkElement ? linkElement.getAttribute('href') || '' : '';
            
            const timeElement = article.querySelector('.date, .time, time');
            const timestamp = timeElement ? timeElement.textContent?.trim() || new Date().toISOString() : new Date().toISOString();
            
            if (title || content) {
              extractedArticles.push({
                title,
                content: `${title}. ${content}`.trim(),
                url: url.startsWith('http') ? url : `https://www.radiookapi.net${url}`,
                timestamp
              });
            }
          } catch (error) {
            console.log('Error extracting article:', error);
          }
        }
        
        return extractedArticles;
      }, keyword);
      
      const posts: ScrapedPost[] = articles.map((article: any, index: number) => ({
        id: `radio_okapi_${Date.now()}_${index}`,
        platform: 'radio_okapi',
        content: article.content,
        author: 'Radio Okapi',
        timestamp: new Date(article.timestamp),
        url: article.url,
        metadata: {
          source: 'Radio Okapi',
          language: 'fr',
          hashtags: [],
          mentions: []
        }
      }));
      
      logger.info(`Scraped ${posts.length} articles from Radio Okapi for keyword: ${keyword}`);
      return posts;
      
    } catch (error) {
      logger.error(`Error scraping Radio Okapi for keyword ${keyword}:`, error);
      return [];
    } finally {
      await page.close();
    }
  }

  /**
   * Scrape Voice of Congo news
   */
  async scrapeVoiceOfCongo(keyword: string, maxResults: number = 5): Promise<ScrapedPost[]> {
    const browser = await this.initBrowser();
    const page = await browser.newPage();
    
    try {
      logger.info(`Scraping Voice of Congo for keyword: ${keyword}`);
      
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      // Navigate to Voice of Congo
      await page.goto('https://voiceofcongo.net/', { waitUntil: 'networkidle2' });
      
      // Search for keyword in page content
      const articles = await page.evaluate((keyword: string) => {
        const allText = document.body.textContent || '';
        const articleElements = document.querySelectorAll('article, .post, .news-item, .content-item');
        const extractedArticles = [];
        
        for (let i = 0; i < Math.min(articleElements.length, 5); i++) {
          const article = articleElements[i];
          const text = article.textContent || '';
          
          if (text.toLowerCase().includes(keyword.toLowerCase())) {
            try {
              const titleElement = article.querySelector('h1, h2, h3, .title');
              const title = titleElement ? titleElement.textContent?.trim() || '' : '';
              
              const contentElement = article.querySelector('p, .content, .excerpt');
              const content = contentElement ? contentElement.textContent?.trim() || '' : '';
              
              const linkElement = article.querySelector('a[href]');
              const url = linkElement ? linkElement.getAttribute('href') || '' : '';
              
              if (title || content) {
                extractedArticles.push({
                  title,
                  content: `${title}. ${content}`.trim(),
                  url: url.startsWith('http') ? url : `https://voiceofcongo.net${url}`
                });
              }
            } catch (error) {
              console.log('Error extracting article:', error);
            }
          }
        }
        
        return extractedArticles;
      }, keyword);
      
      const posts: ScrapedPost[] = articles.map((article: any, index: number) => ({
        id: `voice_congo_${Date.now()}_${index}`,
        platform: 'voice_of_congo',
        content: article.content,
        author: 'Voice of Congo',
        timestamp: new Date(),
        url: article.url,
        metadata: {
          source: 'Voice of Congo',
          language: 'fr',
          hashtags: [],
          mentions: []
        }
      }));
      
      logger.info(`Scraped ${posts.length} articles from Voice of Congo for keyword: ${keyword}`);
      return posts;
      
    } catch (error) {
      logger.error(`Error scraping Voice of Congo for keyword ${keyword}:`, error);
      return [];
    } finally {
      await page.close();
    }
  }

  /**
   * Scrape DRC news blogs and newsletters
   */
  async scrapeDRCNews(keyword: string, maxResults: number = 5): Promise<ScrapedPost[]> {
    const sources = [
      'https://actualite.cd/',
      'https://www.congo-liberty.org/',
      'https://www.mediacongo.net/',
      'https://www.congopage.com/'
    ];
    
    const allPosts: ScrapedPost[] = [];
    
    for (const sourceUrl of sources) {
      try {
        const posts = await this.scrapeGenericNews(sourceUrl, keyword, Math.ceil(maxResults / sources.length));
        allPosts.push(...posts);
      } catch (error) {
        logger.error(`Error scraping ${sourceUrl}:`, error);
      }
    }
    
    return allPosts.slice(0, maxResults);
  }

  /**
   * Generic news scraper for DRC websites
   */
  private async scrapeGenericNews(baseUrl: string, keyword: string, maxResults: number): Promise<ScrapedPost[]> {
    const browser = await this.initBrowser();
    const page = await browser.newPage();
    
    try {
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      await page.goto(baseUrl, { waitUntil: 'networkidle2' });
      
      const articles = await page.evaluate((keyword: string, baseUrl: string, maxResults: number) => {
        const articleElements = document.querySelectorAll('article, .post, .news-item, .content-item, .article');
        const extractedArticles = [];
        
        for (let i = 0; i < Math.min(articleElements.length, maxResults); i++) {
          const article = articleElements[i];
          const text = article.textContent || '';
          
          if (text.toLowerCase().includes(keyword.toLowerCase())) {
            try {
              const titleElement = article.querySelector('h1, h2, h3, .title, .headline');
              const title = titleElement ? titleElement.textContent?.trim() || '' : '';
              
              const contentElement = article.querySelector('p, .content, .excerpt, .summary');
              const content = contentElement ? contentElement.textContent?.trim() || '' : '';
              
              const linkElement = article.querySelector('a[href]');
              const url = linkElement ? linkElement.getAttribute('href') || '' : '';
              
              if (title || content) {
                extractedArticles.push({
                  title,
                  content: `${title}. ${content}`.trim(),
                  url: url.startsWith('http') ? url : `${baseUrl}${url}`,
                  source: new URL(baseUrl).hostname
                });
              }
            } catch (error) {
              console.log('Error extracting article:', error);
            }
          }
        }
        
        return extractedArticles;
      }, keyword, baseUrl, maxResults);
      
      const posts: ScrapedPost[] = articles.map((article: any, index: number) => ({
        id: `${article.source}_${Date.now()}_${index}`,
        platform: 'drc_news',
        content: article.content,
        author: article.source,
        timestamp: new Date(),
        url: article.url,
        metadata: {
          source: article.source,
          language: 'fr',
          hashtags: [],
          mentions: []
        }
      }));
      
      return posts;
      
    } catch (error) {
      logger.error(`Error scraping ${baseUrl}:`, error);
      return [];
    } finally {
      await page.close();
    }
  }

  /**
   * Scrape all sources for a keyword
   */
  async scrapeAllSources(keyword: string): Promise<{ twitter: TwitterPost[], news: ScrapedPost[] }> {
    try {
      logger.info(`Starting comprehensive scraping for keyword: ${keyword}`);
      
      const [twitterPosts, radioOkapiPosts, voiceCongoPosts, drcNewsPosts] = await Promise.allSettled([
        this.scrapeTwitter(keyword, 10),
        this.scrapeRadioOkapi(keyword, 5),
        this.scrapeVoiceOfCongo(keyword, 5),
        this.scrapeDRCNews(keyword, 10)
      ]);
      
      const twitter = twitterPosts.status === 'fulfilled' ? twitterPosts.value : [];
      const news = [
        ...(radioOkapiPosts.status === 'fulfilled' ? radioOkapiPosts.value : []),
        ...(voiceCongoPosts.status === 'fulfilled' ? voiceCongoPosts.value : []),
        ...(drcNewsPosts.status === 'fulfilled' ? drcNewsPosts.value : [])
      ];
      
      logger.info(`Scraping completed: ${twitter.length} tweets, ${news.length} news articles`);
      
      return { twitter, news };
      
    } finally {
      await this.closeBrowser();
    }
  }
}