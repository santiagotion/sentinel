import { 
  collection, 
  doc, 
  getDoc,
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  Timestamp,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../config/firebase';
import { Keyword } from '../types';

export interface FirebaseKeyword {
  id: string;
  term: string;
  isActive: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastScrapedAt?: Timestamp;
  analytics?: {
    totalMentions: number;
    totalEngagement: number;
    averageSentiment: number;
    sentimentBreakdown: {
      positive: number;
      neutral: number;
      negative: number;
    };
    engagementRate: number;
    viralityScore: number;
    lastUpdated: Timestamp;
  };
}

export interface TwitterPost {
  id: string;
  tweetId: string;
  keyword: string;
  content: string;
  author: string;
  authorId: string;
  authorVerified: boolean;
  timestamp: Timestamp;
  scrapedAt: Timestamp;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  platform: string;
  engagement: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
    impression_count: number;
    bookmark_count?: number;
  };
  metadata: {
    tweet_type: 'original' | 'retweet' | 'quote' | 'reply';
    language: string;
    possibly_sensitive: boolean;
    hashtags?: string[];
    mentions?: string[];
    urls?: string[];
  };
}

export class FirebaseKeywordsService {
  private keywordsCollection = collection(db, 'keywords');
  private postsCollection = collection(db, 'twitter_posts');

  // Convert Firebase keyword to UI keyword format
  private convertFirebaseKeyword(firebaseKeyword: FirebaseKeyword): Keyword {
    // Debug logging to see what analytics data we have
    console.log(`Converting keyword ${firebaseKeyword.term}:`, {
      hasAnalytics: !!firebaseKeyword.analytics,
      analytics: firebaseKeyword.analytics,
      totalMentions: firebaseKeyword.analytics?.totalMentions
    });

    return {
      id: parseInt(firebaseKeyword.id) || Date.now(),
      term: firebaseKeyword.term,
      mentions: firebaseKeyword.analytics?.totalMentions || 0,
      trend: this.generateTrendData(firebaseKeyword.analytics?.totalMentions || 0),
      status: this.mapPriorityToStatus(firebaseKeyword.priority),
      createdAt: firebaseKeyword.createdAt.toDate(),
      sentiment: {
        positive: firebaseKeyword.analytics?.sentimentBreakdown?.positive || 0,
        neutral: firebaseKeyword.analytics?.sentimentBreakdown?.neutral || 0,
        negative: firebaseKeyword.analytics?.sentimentBreakdown?.negative || 0
      }
    };
  }

  private mapPriorityToStatus(priority: string): Keyword['status'] {
    switch (priority) {
      case 'critical': return 'critical';
      case 'high': return 'warning';
      default: return 'active';
    }
  }

  private generateTrendData(mentions: number): number[] {
    // Return empty trend data until we have real data
    return [0, 0, 0, 0, 0, 0, 0];
  }

  // Get all keywords
  async getKeywords(): Promise<Keyword[]> {
    try {
      // First try with the compound query
      try {
        const q = query(
          this.keywordsCollection,
          where('isActive', '==', true),
          orderBy('createdAt', 'desc')
        );
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => {
          const data = doc.data() as Omit<FirebaseKeyword, 'id'>;
          return this.convertFirebaseKeyword({ id: doc.id, ...data });
        });
      } catch (indexError) {
        // If index doesn't exist, just get all keywords
        console.log('Index not created, fetching all keywords');
        const snapshot = await getDocs(this.keywordsCollection);
        return snapshot.docs.map(doc => {
          const data = doc.data() as Omit<FirebaseKeyword, 'id'>;
          return this.convertFirebaseKeyword({ id: doc.id, ...data });
        });
      }
    } catch (error) {
      console.error('Error fetching keywords:', error);
      // Return fallback data if Firebase fails
      return this.getFallbackKeywords();
    }
  }

  // Real-time keyword listener
  onKeywordsChange(callback: (keywords: Keyword[]) => void): () => void {
    // Just listen to all keywords without complex query
    return onSnapshot(this.keywordsCollection, (snapshot) => {
      const keywords = snapshot.docs.map(doc => {
        const data = doc.data() as Omit<FirebaseKeyword, 'id'>;
        console.log('Raw keyword data from Firestore:', { id: doc.id, ...data });
        return this.convertFirebaseKeyword({ id: doc.id, ...data });
      });
      console.log('Converted keywords:', keywords);
      callback(keywords);
    }, (error) => {
      console.error('Error in keywords listener:', error);
      // Fallback to cached data
      callback(this.getFallbackKeywords());
    });
  }

  // Add new keyword
  async addKeyword(term: string): Promise<Keyword> {
    try {
      const newKeywordData = {
        term: term.trim(),
        isActive: true,
        priority: 'medium' as const,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(this.keywordsCollection, newKeywordData);
      
      return this.convertFirebaseKeyword({
        id: docRef.id,
        ...newKeywordData
      });
    } catch (error) {
      console.error('Error adding keyword:', error);
      throw new Error('Failed to add keyword');
    }
  }

  // Update keyword
  async updateKeyword(id: number, updates: Partial<Keyword>): Promise<Keyword> {
    try {
      const docRef = doc(this.keywordsCollection, id.toString());
      const updateData: any = {
        updatedAt: Timestamp.now()
      };

      if (updates.term) updateData.term = updates.term;
      
      await updateDoc(docRef, updateData);
      
      // Return updated keyword (in real implementation, refetch from Firestore)
      const keywords = await this.getKeywords();
      const updated = keywords.find(k => k.id === id);
      if (!updated) throw new Error('Keyword not found after update');
      
      return updated;
    } catch (error) {
      console.error('Error updating keyword:', error);
      throw new Error('Failed to update keyword');
    }
  }

  // Delete keyword
  async deleteKeyword(id: number): Promise<void> {
    try {
      const docRef = doc(this.keywordsCollection, id.toString());
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting keyword:', error);
      throw new Error('Failed to delete keyword');
    }
  }

  // Get tweets for a keyword
  async getKeywordTweets(keywordTerm: string, maxResults: number = 100): Promise<any[]> {
    try {
      console.log(`DEBUG: Getting tweets for keyword "${keywordTerm}" with limit ${maxResults}`);
      
      // First check if there are ANY tweets for this keyword
      const checkQuery = query(
        this.postsCollection,
        where('keyword', '==', keywordTerm),
        limit(1)
      );
      const checkSnapshot = await getDocs(checkQuery);
      console.log(`DEBUG: Found ${checkSnapshot.docs.length} document(s) for keyword "${keywordTerm}"`);
      
      if (checkSnapshot.docs.length > 0) {
        console.log(`DEBUG: Sample document for "${keywordTerm}":`, checkSnapshot.docs[0].data());
      }
      
      const q = query(
        this.postsCollection,
        where('keyword', '==', keywordTerm),
        limit(maxResults) // Remove orderBy temporarily to test
      );

      const snapshot = await getDocs(q);
      console.log(`DEBUG: getKeywordTweets for "${keywordTerm}" returned ${snapshot.docs.length} documents`);
      
      return snapshot.docs.map(doc => {
        const data = doc.data() as TwitterPost;
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp.toDate().toISOString(),
          scrapedAt: data.scrapedAt.toDate().toISOString()
        };
      });
    } catch (error) {
      console.error('Error fetching tweets:', error);
      return [];
    }
  }

  // Trigger manual scraping for a specific keyword
  async triggerKeywordScraping(keywordId: number): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`https://us-central1-sentinel-rdc.cloudfunctions.net/api/keywords/${keywordId}/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        return {
          success: true,
          message: 'Scraping initiated successfully'
        };
      } else {
        return {
          success: false,
          message: 'Failed to trigger scraping'
        };
      }
    } catch (error) {
      console.error('Error triggering scraping:', error);
      return {
        success: false,
        message: 'Failed to trigger scraping'
      };
    }
  }

  // Trigger manual scraping for all active keywords
  async triggerAllKeywordsScraping(): Promise<{ success: boolean; message: string }> {
    try {
      const triggerScrape = httpsCallable(functions, 'scrapeTwitterData');
      const result = await triggerScrape();
      
      return {
        success: true,
        message: 'Scraping initiated for all keywords'
      };
    } catch (error) {
      console.error('Error triggering all keywords scraping:', error);
      return {
        success: false,
        message: 'Failed to trigger scraping'
      };
    }
  }

  // Get analytics for a keyword
  async getKeywordAnalytics(keywordId: string): Promise<any> {
    try {
      // First try to get analytics from the keyword document
      const docRef = doc(this.keywordsCollection, keywordId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const keywordData = docSnap.data() as Keyword;
        
        // If analytics exist in the document, return them
        if (keywordData.analytics) {
          console.log('Found analytics in keyword document:', keywordData.analytics);
          return keywordData.analytics;
        }
        
        // If no analytics in document, calculate from posts
        console.log('No analytics in document, calculating from posts for keyword:', keywordData.term);
        const calculatedAnalytics = await this.calculateKeywordAnalyticsFromPosts(keywordData.term);
        
        if (calculatedAnalytics && calculatedAnalytics.totalMentions > 0) {
          // Save calculated analytics back to the keyword document
          await updateDoc(docRef, { analytics: calculatedAnalytics });
          return calculatedAnalytics;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return null;
    }
  }

  // Debug function to manually check keyword analytics
  async debugKeywordAnalytics(keywordId: string): Promise<void> {
    try {
      const docRef = doc(this.keywordsCollection, keywordId);
      const docSnap = await getDocs(query(this.keywordsCollection, where('__name__', '==', keywordId)));
      
      if (!docSnap.empty) {
        const keywordDoc = docSnap.docs[0];
        const data = keywordDoc.data();
        console.log('DEBUG - Raw keyword document:', data);
        console.log('DEBUG - Analytics field:', data.analytics);
        console.log('DEBUG - Document ID:', keywordDoc.id);
      } else {
        console.log('DEBUG - No keyword found with ID:', keywordId);
      }
    } catch (error) {
      console.error('DEBUG - Error fetching keyword:', error);
    }
  }

  // Manual analytics calculation from posts (fallback)
  async calculateKeywordAnalyticsFromPosts(keywordTerm: string): Promise<any> {
    try {
      const posts = await this.getKeywordTweets(keywordTerm, 10000); // Get ALL posts, not just 100
      console.log(`Found ${posts.length} posts for keyword "${keywordTerm}"`);
      
      if (posts.length === 0) {
        return {
          totalMentions: 0,
          totalEngagement: 0,
          averageEngagement: 0,
          sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
          sourceBreakdown: {},
          lastUpdated: new Date()
        };
      }

      const sentimentCounts = posts.reduce((acc, post) => {
        acc[post.sentiment || 'neutral']++;
        return acc;
      }, { positive: 0, neutral: 0, negative: 0 });

      const totalEngagement = posts.reduce((sum, post) => {
        return sum + (post.engagement?.like_count || 0) + 
                    (post.engagement?.retweet_count || 0) + 
                    (post.engagement?.reply_count || 0);
      }, 0);

      // Calculate source breakdown
      const sourceBreakdown = posts.reduce((acc: any, post) => {
        const source = post.author || 'Unknown';
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {});

      return {
        totalMentions: posts.length,
        totalEngagement,
        averageEngagement: Math.round(totalEngagement / posts.length),
        sentimentBreakdown: {
          positive: Math.round((sentimentCounts.positive / posts.length) * 100),
          neutral: Math.round((sentimentCounts.neutral / posts.length) * 100),
          negative: Math.round((sentimentCounts.negative / posts.length) * 100)
        },
        sourceBreakdown,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('Error calculating analytics from posts:', error);
      return null;
    }
  }

  // No fallback keywords - start with empty state
  private getFallbackKeywords(): Keyword[] {
    return [];
  }
}