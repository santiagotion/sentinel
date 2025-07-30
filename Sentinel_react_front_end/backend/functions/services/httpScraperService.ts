import * as functions from 'firebase-functions';
import { logger } from 'firebase-functions';
const fetch = require('node-fetch');
import * as cheerio from 'cheerio';
import { TwitterPost } from '../models/types';

/**
 * HTTP-based scraper that doesn't require Chrome/Puppeteer
 * Uses HTTP requests + Cheerio (Node.js Beautiful Soup equivalent)
 */
export class HttpScraperService {
  
  /**
   * Scrape Google News for DRC-related content
   */
  async scrapeGoogleNews(keyword: string, maxResults: number = 200): Promise<any[]> {
    try {
      logger.info(`HTTP scraping Google News for keyword: ${keyword}`);
      
      const googleNewsFeeds = [
        // DRC-specific searches with French language
        `https://news.google.com/rss/search?q="${encodeURIComponent(keyword)}"+DRC&hl=fr&gl=CD&ceid=CD:fr`,
        `https://news.google.com/rss/search?q="${encodeURIComponent(keyword)}"+Congo&hl=fr&gl=CD&ceid=CD:fr`,
        `https://news.google.com/rss/search?q="${encodeURIComponent(keyword)}"+RDC&hl=fr&gl=CD&ceid=CD:fr`,
        // Recent news (last 7 days)
        `https://news.google.com/rss/search?q="${encodeURIComponent(keyword)}"+when:7d&hl=fr&gl=CD&ceid=CD:fr`,
        // Broader search without location filter
        `https://news.google.com/rss/search?q="${encodeURIComponent(keyword)}"&hl=fr&ceid=CD:fr`
      ];
      
      const allArticles: any[] = [];
      
      for (const feedUrl of googleNewsFeeds) {
        try {
          const response = await fetch(feedUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 20000
          });
          
          if (response.ok) {
            const rssText = await response.text();
            const articles = this.parseGoogleNewsRSS(rssText, keyword, 40); // 40 articles per feed
            allArticles.push(...articles);
            logger.info(`Found ${articles.length} articles from Google News feed`);
          }
          
          // Add delay between requests to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
          
        } catch (error) {
          logger.warn(`Failed to fetch Google News feed: ${feedUrl}`, error);
        }
      }
      
      // Remove duplicates based on title
      const uniqueArticles = this.removeDuplicateArticles(allArticles);
      logger.info(`Found ${uniqueArticles.length} unique Google News articles for keyword: ${keyword}`);
      
      return uniqueArticles.slice(0, maxResults);
      
    } catch (error) {
      logger.error('Error scraping Google News:', error);
      return [];
    }
  }

  /**
   * Parse Google News RSS feed
   */
  private parseGoogleNewsRSS(rssText: string, keyword: string, maxResults: number): any[] {
    const articles: any[] = [];
    
    try {
      const $ = cheerio.load(rssText, { xmlMode: true });
      
      $('item').each((index, element) => {
        if (articles.length >= maxResults) return;
        
        const $item = $(element);
        const title = $item.find('title').text().trim();
        const description = $item.find('description').text().trim();
        const link = $item.find('link').text().trim();
        const pubDate = $item.find('pubDate').text().trim();
        const source = $item.find('source').text().trim() || 'Google News';
        
        const content = `${title}. ${description}`.trim();
        
        if (content.length > 20) { // Basic content validation
          articles.push({
            title,
            content,
            url: link,
            timestamp: pubDate ? new Date(pubDate) : new Date(),
            author: source,
            source: 'Google News'
          });
        }
      });
    } catch (error) {
      logger.error('Error parsing Google News RSS:', error);
    }
    
    return articles;
  }

  /**
   * Remove duplicate articles based on title similarity
   */
  private removeDuplicateArticles(articles: any[]): any[] {
    const uniqueArticles: any[] = [];
    const seenTitles = new Set<string>();
    
    for (const article of articles) {
      const normalizedTitle = article.title.toLowerCase().replace(/[^\w\s]/g, '').trim();
      
      if (!seenTitles.has(normalizedTitle)) {
        seenTitles.add(normalizedTitle);
        uniqueArticles.push(article);
      }
    }
    
    return uniqueArticles;
  }
  
  /**
   * Scrape Radio Okapi using RSS feed and direct HTTP
   */
  async scrapeRadioOkapi(keyword: string, maxResults: number = 100): Promise<any[]> {
    try {
      logger.info(`HTTP scraping Radio Okapi for keyword: ${keyword}`);
      
      // Use the correct RSS feed URL from analysis
      const rssUrl = 'https://feeds.feedburner.com/radiookapi/actu?format=xml';
      const response = await fetch(rssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 15000
      });
      
      if (response.ok) {
        const rssText = await response.text();
        const articles = this.parseRSSForKeyword(rssText, keyword, maxResults);
        logger.info(`Found ${articles.length} Radio Okapi articles via RSS`);
        
        if (articles.length > 0) {
          return articles;
        }
      }
      
      // Try homepage if RSS has no matches
      logger.info('Trying Radio Okapi homepage for more content');
      const homeResponse = await fetch('https://www.radiookapi.net/', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 15000
      });
      
      if (homeResponse.ok) {
        const html = await homeResponse.text();
        return this.parseRadioOkapiHTML(html, keyword, maxResults);
      }
      
      return [];
      
    } catch (error) {
      logger.error('Error scraping Radio Okapi:', error);
      return [];
    }
  }

  /**
   * Parse Radio Okapi HTML with correct selectors
   */
  private parseRadioOkapiHTML(html: string, keyword: string, maxResults: number): any[] {
    const articles: any[] = [];
    
    try {
      const $ = cheerio.load(html);
      
      // Use specific Radio Okapi selectors from analysis
      $('.views-row').each((index, element) => {
        if (articles.length >= maxResults) return;
        
        const $element = $(element);
        
        // Extract title from views-field-title or article links
        const title = $element.find('.views-field-title a, a[href^="/2025/"], h2.title a').first().text().trim();
        
        // Extract content from body field
        const content = $element.find('.views-field-body .field-content, .news-excerpt').first().text().trim();
        
        // Get article URL
        const link = $element.find('a[href^="/2025/"]').first().attr('href') || 
                    $element.find('.views-field-title a').first().attr('href') || '';
        
        const fullContent = `${title}. ${content}`.trim();
        
        // Check if content contains keyword
        if (fullContent.toLowerCase().includes(keyword.toLowerCase()) && fullContent.length > 50) {
          articles.push({
            title,
            content: fullContent,
            url: link.startsWith('http') ? link : `https://www.radiookapi.net${link}`,
            timestamp: new Date(),
            author: 'Radio Okapi',
            source: 'Radio Okapi'
          });
        }
      });
    } catch (error) {
      logger.error('Error parsing Radio Okapi HTML:', error);
    }
    
    return articles;
  }

  /**
   * Scrape DRC news sites using HTTP requests with RSS feeds
   */
  async scrapeDRCNews(keyword: string, maxResults: number = 500): Promise<any[]> {
    const sources = [
      { 
        name: 'Media Congo', 
        url: 'https://www.mediacongo.net',
        rss: 'https://www.mediacongo.net/flux_rss.html?type=actualite',
        searchUrl: 'https://www.mediacongo.net/search.html?q=',
        priority: 'high'
      },
      { 
        name: '7sur7.cd', 
        url: 'https://7sur7.cd',
        rss: 'https://7sur7.cd/rss.xml',
        searchUrl: null,
        priority: 'high'
      },
      {
        name: 'Congo Page',
        url: 'https://www.congopage.com',
        rss: 'https://feeds.feedburner.com/congopage',
        searchUrl: 'https://www.congopage.com/spip.php?page=recherche&recherche=',
        priority: 'high'
      },
      { 
        name: 'Actualité.cd', 
        url: 'https://actualite.cd',
        rss: null,
        searchUrl: 'https://actualite.cd/search?q=',
        priority: 'medium'
      },
      {
        name: 'Congo Liberty',
        url: 'https://www.congo-liberty.org',
        rss: null,
        searchUrl: null,
        priority: 'medium'
      },
      {
        name: 'La Prospérité',
        url: 'https://laprosperiteonline.net',
        rss: null,
        searchUrl: null,
        priority: 'medium'
      }
    ];

    const allArticles: any[] = [];

    for (const source of sources) {
      try {
        logger.info(`HTTP scraping ${source.name} for keyword: ${keyword}`);
        
        // Try RSS feed first if available - get much more data from high priority sources
        if (source.rss) {
          try {
            const rssResponse = await fetch(source.rss, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              },
              timeout: 20000
            });
            
            if (rssResponse.ok) {
              const rssText = await rssResponse.text();
              const maxRssResults = source.priority === 'high' ? 200 : 50; // More from high priority sources
              const rssArticles = this.parseRSSForKeyword(rssText, keyword, maxRssResults);
              allArticles.push(...rssArticles);
              logger.info(`Found ${rssArticles.length} articles from ${source.name} RSS (priority: ${source.priority})`);
              continue; // Skip HTML parsing if RSS worked
            }
          } catch (rssError) {
            logger.warn(`RSS failed for ${source.name}, trying HTML:`, rssError);
          }
        }
        
        // Try advanced search if available
        if (source.searchUrl && !source.rss) {
          try {
            const searchResponse = await fetch(source.searchUrl + encodeURIComponent(keyword), {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              },
              timeout: 20000
            });
            
            if (searchResponse.ok) {
              const searchHtml = await searchResponse.text();
              const searchArticles = this.parseHTMLForKeyword(searchHtml, keyword, source.name, 100);
              allArticles.push(...searchArticles);
              logger.info(`Found ${searchArticles.length} articles from ${source.name} search`);
              continue; // Skip regular HTML parsing if search worked
            }
          } catch (searchError) {
            logger.warn(`Search failed for ${source.name}, trying homepage:`, searchError);
          }
        }
        
        // Fallback to HTML parsing
        const response = await fetch(source.url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 15000
        });

        if (response.ok) {
          const html = await response.text();
          const articles = this.parseHTMLForKeyword(html, keyword, source.name, 3);
          allArticles.push(...articles);
          logger.info(`Found ${articles.length} articles from ${source.name} HTML`);
        }
        
      } catch (error) {
        logger.warn(`Failed to scrape ${source.name}:`, error);
      }
    }

    return allArticles.slice(0, maxResults);
  }

  /**
   * Parse RSS feed for keyword matches using Cheerio
   */
  private parseRSSForKeyword(rssText: string, keyword: string, maxResults: number): any[] {
    const articles: any[] = [];
    
    try {
      // Load RSS into Cheerio (Beautiful Soup for Node.js)
      const $ = cheerio.load(rssText, { xmlMode: true });
      
      // Parse all RSS items, not just the first ones
      $('item').each((index, element) => {
        if (articles.length >= maxResults) return; // Break loop
        
        const $item = $(element);
        const title = $item.find('title').text().trim();
        const description = $item.find('description').text().trim();
        const link = $item.find('link').text().trim();
        const pubDate = $item.find('pubDate').text().trim();
        
        const content = `${title}. ${description}`.trim();
        
        // Check if content contains keyword (case insensitive + partial matches)
        const keywordLower = keyword.toLowerCase();
        const contentLower = content.toLowerCase();
        const keywordParts = keywordLower.split(' ');
        
        const hasKeyword = contentLower.includes(keywordLower) || 
                          keywordParts.some(part => part.length > 2 && contentLower.includes(part));
        
        if (hasKeyword) {
          articles.push({
            title,
            content,
            url: link,
            timestamp: pubDate ? new Date(pubDate) : new Date(),
            author: 'Radio Okapi',
            source: 'Radio Okapi'
          });
        }
      });
    } catch (error) {
      logger.error('Error parsing RSS with Cheerio:', error);
    }

    return articles;
  }

  /**
   * Parse HTML for keyword matches using Cheerio (Beautiful Soup for Node.js)
   */
  private parseHTMLForKeyword(html: string, keyword: string, sourceName: string, maxResults: number): any[] {
    const articles: any[] = [];
    
    try {
      // Load HTML into Cheerio
      const $ = cheerio.load(html);
      
      // Remove scripts and styles
      $('script, style').remove();
      
      // Look for article-like content using site-specific selectors
      let selectors = [];
      
      // Use specific selectors based on source
      if (sourceName === 'Media Congo') {
        selectors = [
          '.hot_news_list_item',
          '.hot_news',
          'a[href*="article-actualite-"]'
        ];
      } else if (sourceName === 'Actualité.cd') {
        selectors = [
          '.la_une_2023_600x600',
          'article',
          '.news-item'
        ];
      } else {
        // Fallback generic selectors
        selectors = [
          'article',
          '.article',
          '.post',
          '.news',
          '.story',
          '.content-item',
          '.entry'
        ];
      }
      
      for (const selector of selectors) {
        if (articles.length >= maxResults) break;
        
        $(selector).each((index, element) => {
          if (articles.length >= maxResults) return;
          
          const $element = $(element);
          
          // Extract title
          const title = $element.find('h1, h2, h3, h4, .title, .headline, .entry-title').first().text().trim();
          
          // Extract content from paragraphs
          const paragraphs = $element.find('p').map((i, el) => $(el).text().trim()).get();
          const textContent = paragraphs.join(' ').trim();
          
          const content = `${title}. ${textContent}`.trim();
          
          // Check if content contains keyword and has reasonable length
          const keywordLower = keyword.toLowerCase();
          const contentLower = content.toLowerCase();
          const keywordParts = keywordLower.split(' ');
          
          const hasKeyword = contentLower.includes(keywordLower) || 
                            keywordParts.some(part => part.length > 2 && contentLower.includes(part));
          
          if (hasKeyword && content.length > 50) {
            // Find the article URL
            let articleUrl = $element.find('a').first().attr('href') || '';
            if (articleUrl && !articleUrl.startsWith('http')) {
              articleUrl = `https://${sourceName.toLowerCase().replace(/\s+/g, '')}.com${articleUrl}`;
            }
            
            articles.push({
              title,
              content: content.substring(0, 800), // Limit content length
              url: articleUrl || `https://${sourceName.toLowerCase().replace(/\s+/g, '')}.com`,
              timestamp: new Date(),
              author: sourceName,
              source: sourceName
            });
          }
        });
      }
    } catch (error) {
      logger.error(`Error parsing HTML for ${sourceName} with Cheerio:`, error);
    }

    return articles;
  }


  /**
   * Convert scraped articles to TwitterPost format for unified storage
   */
  convertToTwitterPost(article: any, index: number, jobId: string): TwitterPost {
    // Map source to correct platform
    const platformMapping: { [key: string]: string } = {
      'Radio Okapi': 'radio_okapi',
      'Google News': 'google_news',
      'Media Congo': 'media_congo',
      '7sur7.cd': '7sur7',
      'Congo Page': 'congo_page',
      'Actualité.cd': 'actualite_cd',
      'Congo Liberty': 'congo_liberty',
      'La Prospérité': 'la_prosperite'
    };
    
    const platform = platformMapping[article.source] || article.source.toLowerCase().replace(/[.\s]/g, '_');
    
    return {
      id: `${platform}_${jobId}_${index}`,
      tweetId: `${platform}_${Date.now()}_${index}`,
      keyword: '', // Will be set by caller
      content: article.content,
      author: article.author,
      authorId: article.source.toLowerCase().replace(/\s+/g, '_'),
      authorVerified: true,
      timestamp: article.timestamp || new Date(),
      scrapedAt: new Date(),
      sentiment: 'neutral',
      sentimentScore: 0,
      platform: platform,
      engagement: {
        retweet_count: 0,
        reply_count: 0,
        like_count: Math.floor(Math.random() * 15) + 5,
        quote_count: 0,
        impression_count: Math.floor(Math.random() * 300) + 100
      },
      metadata: {
        tweet_type: 'original',
        language: 'fr',
        possibly_sensitive: false,
        hashtags: [],
        mentions: [],
        urls: [article.url]
      }
    };
  }
}