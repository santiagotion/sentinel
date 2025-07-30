import { TwitterApi, TweetV2, UserV2 } from 'twitter-api-v2';
import { TwitterPost } from '../models/types';
import { logger } from 'firebase-functions';

export class TwitterService {
  private client: TwitterApi;
  private rateLimitManager: Map<string, { remaining: number; reset: Date }>;

  constructor(bearerToken: string) {
    this.client = new TwitterApi(bearerToken);
    this.rateLimitManager = new Map();
  }

  /**
   * Search tweets for a keyword with full engagement metrics
   */
  async searchTweets(keyword: string, maxResults: number = 100): Promise<TwitterPost[]> {
    try {
      logger.info(`Searching tweets for keyword: ${keyword}`);
      
      // Check rate limits before making request
      if (!this.canMakeRequest('search')) {
        throw new Error('Rate limit exceeded for search endpoint');
      }

      // Simplified query to reduce rate limit impact
      const tweets = await this.client.v2.search(keyword, {
        'tweet.fields': 'public_metrics,created_at,author_id,lang',
        'user.fields': 'verified,username',
        'expansions': 'author_id',
        max_results: Math.min(maxResults, 10), // Much smaller requests
        sort_order: 'recency'
      });

      // Update rate limits from response headers
      this.updateRateLimits('search', tweets.rateLimit);

      // Process tweets
      const processedTweets: TwitterPost[] = [];
      
      for await (const tweet of tweets) {
        const author = tweets.includes?.users?.find(u => u.id === tweet.author_id);
        const place = tweet.geo?.place_id ? 
          tweets.includes?.places?.find(p => p.id === tweet.geo?.place_id) : 
          undefined;

        const processedTweet = this.processTweet(tweet, author, place, keyword);
        processedTweets.push(processedTweet);
      }

      logger.info(`Found ${processedTweets.length} tweets for keyword: ${keyword}`);
      return processedTweets;

    } catch (error) {
      logger.error(`Error searching tweets for keyword ${keyword}:`, error);
      throw error;
    }
  }

  /**
   * Get tweet by ID with full metrics
   */
  async getTweet(tweetId: string): Promise<TwitterPost | null> {
    try {
      const tweet = await this.client.v2.singleTweet(tweetId, {
        'tweet.fields': [
          'public_metrics',
          'created_at',
          'author_id',
          'lang',
          'possibly_sensitive',
          'referenced_tweets',
          'entities'
        ].join(','),
        'user.fields': ['verified', 'public_metrics'].join(','),
        'expansions': ['author_id'].join(',')
      });

      if (!tweet.data) return null;

      const author = tweet.includes?.users?.[0];
      return this.processTweet(tweet.data, author, undefined, '');

    } catch (error) {
      logger.error(`Error fetching tweet ${tweetId}:`, error);
      return null;
    }
  }

  /**
   * Process raw tweet data into our format
   */
  private processTweet(
    tweet: TweetV2,
    author?: UserV2,
    place?: any,
    keyword?: string
  ): TwitterPost {
    const tweetType = this.determineTweetType(tweet);
    
    const tweetData: any = {
      id: `twitter_${tweet.id}_${Date.now()}`,
      tweetId: tweet.id,
      keyword: keyword || '',
      content: tweet.text,
      author: author?.username || 'unknown',
      authorId: tweet.author_id || '',
      authorVerified: author?.verified || false,
      timestamp: new Date(tweet.created_at || Date.now()),
      scrapedAt: new Date(),
      sentiment: 'neutral', // Will be analyzed separately
      sentimentScore: 0,
      platform: 'twitter',
      
      engagement: {
        retweet_count: tweet.public_metrics?.retweet_count || 0,
        reply_count: tweet.public_metrics?.reply_count || 0,
        like_count: tweet.public_metrics?.like_count || 0,
        quote_count: tweet.public_metrics?.quote_count || 0,
        impression_count: tweet.public_metrics?.impression_count || 0,
        ...(tweet.public_metrics?.bookmark_count !== undefined && { bookmark_count: tweet.public_metrics.bookmark_count })
      },
      
      metadata: {
        tweet_type: tweetType,
        language: tweet.lang || 'unknown',
        possibly_sensitive: false, // Simplified - not requesting this field
        hashtags: [],
        mentions: [],
        urls: []
      }
    };

    // Only add geo if we have place data (which we don't in simplified version)
    // if (place) {
    //   tweetData.geo = { ... };
    // }

    return tweetData;
  }

  /**
   * Determine tweet type based on referenced tweets
   */
  private determineTweetType(tweet: TweetV2): TwitterPost['metadata']['tweet_type'] {
    // Simplified - just return 'original' for now since we're not requesting referenced_tweets
    return 'original';
  }

  /**
   * Check if we can make a request based on rate limits
   */
  private canMakeRequest(endpoint: string): boolean {
    const limit = this.rateLimitManager.get(endpoint);
    if (!limit) return true; // No limit info, assume we can proceed
    
    if (limit.remaining <= 0 && new Date() < limit.reset) {
      return false;
    }
    
    return true;
  }

  /**
   * Update rate limit information
   */
  private updateRateLimits(endpoint: string, rateLimit: any) {
    if (rateLimit) {
      this.rateLimitManager.set(endpoint, {
        remaining: rateLimit.remaining,
        reset: new Date(rateLimit.reset * 1000)
      });
    }
  }

  /**
   * Get current rate limit status
   */
  getRateLimitStatus(): Map<string, { remaining: number; reset: Date }> {
    return this.rateLimitManager;
  }
}