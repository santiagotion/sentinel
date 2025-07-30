import * as admin from 'firebase-admin';
import { 
  Keyword, 
  TwitterPost, 
  KeywordAnalytics, 
  ScrapingLog 
} from '../models/types';
import { logger } from 'firebase-functions';

export class FirestoreService {
  private db: admin.firestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp();
    }
    this.db = admin.firestore();
  }

  /**
   * Keywords Management
   */
  async getActiveKeywords(): Promise<Keyword[]> {
    try {
      const snapshot = await this.db.collection('keywords')
        .where('isActive', '==', true)
        .orderBy('priority', 'desc')
        .get();
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Keyword));
    } catch (error) {
      logger.error('Error fetching active keywords:', error);
      return [];
    }
  }

  async getKeywordById(keywordId: string): Promise<Keyword | null> {
    try {
      const doc = await this.db.collection('keywords').doc(keywordId).get();
      if (!doc.exists) return null;
      
      return {
        id: doc.id,
        ...doc.data()
      } as Keyword;
    } catch (error) {
      logger.error(`Error fetching keyword ${keywordId}:`, error);
      return null;
    }
  }

  async updateKeywordLastScraped(keywordId: string): Promise<void> {
    try {
      await this.db.collection('keywords').doc(keywordId).update({
        lastScrapedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      logger.error(`Error updating keyword ${keywordId}:`, error);
    }
  }

  /**
   * Twitter Posts Management
   */
  async saveTweets(tweets: TwitterPost[]): Promise<void> {
    if (tweets.length === 0) return;

    const batch = this.db.batch();
    
    tweets.forEach(tweet => {
      const docRef = this.db.collection('twitter_posts').doc(tweet.id);
      batch.set(docRef, {
        ...tweet,
        timestamp: admin.firestore.Timestamp.fromDate(tweet.timestamp),
        scrapedAt: admin.firestore.Timestamp.fromDate(tweet.scrapedAt)
      });
    });

    try {
      await batch.commit();
      logger.info(`Saved ${tweets.length} tweets to Firestore`);
    } catch (error) {
      logger.error('Error saving tweets:', error);
      throw error;
    }
  }

  async getTweetsByKeyword(
    keyword: string, 
    limit: number = 100,
    startAfter?: Date
  ): Promise<TwitterPost[]> {
    try {
      let query = this.db.collection('twitter_posts')
        .where('keyword', '==', keyword)
        .orderBy('timestamp', 'desc')
        .limit(limit);
      
      if (startAfter) {
        query = query.startAfter(admin.firestore.Timestamp.fromDate(startAfter));
      }
      
      const snapshot = await query.get();
      
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          timestamp: data.timestamp.toDate(),
          scrapedAt: data.scrapedAt.toDate()
        } as TwitterPost;
      });
    } catch (error) {
      logger.error(`Error fetching tweets for keyword ${keyword}:`, error);
      return [];
    }
  }

  /**
   * Analytics Management
   */
  async updateKeywordAnalytics(keywordId: string, tweets: TwitterPost[]): Promise<void> {
    if (tweets.length === 0) return;

    try {
      // Calculate analytics
      const analytics = this.calculateAnalytics(tweets);
      
      // Update in Firestore
      await this.db.collection('keywords').doc(keywordId).update({
        analytics: {
          ...analytics,
          lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      // Also save to analytics collection for historical tracking
      await this.db.collection('analytics').add({
        keywordId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        ...analytics
      });

    } catch (error) {
      logger.error(`Error updating analytics for keyword ${keywordId}:`, error);
    }
  }

  private calculateAnalytics(tweets: TwitterPost[]): Omit<KeywordAnalytics, 'lastUpdated'> {
    const totalEngagement = tweets.reduce((sum, tweet) => 
      sum + tweet.engagement.like_count + 
      tweet.engagement.retweet_count + 
      tweet.engagement.reply_count + 
      tweet.engagement.quote_count, 0
    );

    const sentimentCounts = tweets.reduce((acc, tweet) => {
      acc[tweet.sentiment]++;
      return acc;
    }, { positive: 0, neutral: 0, negative: 0 });

    const averageSentiment = tweets.reduce((sum, tweet) => 
      sum + tweet.sentimentScore, 0
    ) / tweets.length;

    const totalImpressions = tweets.reduce((sum, tweet) => 
      sum + (tweet.engagement.impression_count || 0), 0
    );

    const engagementRate = totalImpressions > 0 ? 
      (totalEngagement / totalImpressions) * 100 : 0;

    const viralityScore = tweets.reduce((sum, tweet) => 
      sum + (tweet.engagement.retweet_count + tweet.engagement.quote_count), 0
    );

    return {
      totalMentions: tweets.length,
      totalEngagement,
      averageSentiment,
      sentimentBreakdown: {
        positive: (sentimentCounts.positive / tweets.length) * 100,
        neutral: (sentimentCounts.neutral / tweets.length) * 100,
        negative: (sentimentCounts.negative / tweets.length) * 100
      },
      engagementRate,
      viralityScore,
      trendData: [] // This would be populated from historical data
    };
  }

  /**
   * Logging
   */
  async logScraping(log: Omit<ScrapingLog, 'id'>): Promise<void> {
    try {
      await this.db.collection('scraping_logs').add({
        ...log,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      logger.error('Error logging scraping activity:', error);
    }
  }

  /**
   * Check for duplicate tweets
   */
  async checkDuplicateTweets(tweetIds: string[]): Promise<Set<string>> {
    const duplicates = new Set<string>();
    
    // Firestore 'in' query limit is 10
    const chunks = [];
    for (let i = 0; i < tweetIds.length; i += 10) {
      chunks.push(tweetIds.slice(i, i + 10));
    }

    for (const chunk of chunks) {
      const snapshot = await this.db.collection('twitter_posts')
        .where('tweetId', 'in', chunk)
        .get();
      
      snapshot.docs.forEach(doc => {
        duplicates.add(doc.data().tweetId);
      });
    }

    return duplicates;
  }
}