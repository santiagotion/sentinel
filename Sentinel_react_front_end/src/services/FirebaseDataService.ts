import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  DocumentSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { TwitterPost } from './FirebaseKeywordsService';

export interface RawDataItem {
  id: string;
  timestamp: string;
  source: string;
  platform: string;
  content: string;
  author: string;
  location: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  engagement: number;
  reach: number;
  verified: boolean;
  language: string;
  keywords: string[];
  category: string;
  priority: 'low' | 'medium' | 'high';
  metadata: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export class FirebaseDataService {
  private postsCollection = collection(db, 'twitter_posts');

  // Convert Firebase TwitterPost to RawDataItem
  private convertToRawDataItem(post: any, docId: string): RawDataItem {
    try {
      // Determine actual source from author or content  
      const actualSource = this.determineActualSource(post);
      const actualPlatform = this.determineActualPlatform(post);
      
      // Handle engagement data safely
      const engagement = post.engagement || {};
      const totalEngagement = this.calculateTotalEngagement(engagement);
      
      return {
        id: docId,
        timestamp: this.extractTimestamp(post.timestamp),
        source: actualSource,
        platform: actualPlatform,
        content: post.content || '',
        author: post.author || 'Unknown',
        location: this.determineLocation(post),
        sentiment: post.sentiment || 'neutral',
        engagement: totalEngagement,
        reach: engagement.impression_count || 0,
        verified: post.authorVerified || false,
        language: post.metadata?.language || 'fr',
        keywords: post.keyword ? [post.keyword] : [],
        category: actualPlatform === 'Twitter' ? 'Social Media' : 'News',
        priority: this.mapEngagementToPriority(totalEngagement),
        metadata: {
          likes: engagement.like_count || 0,
          shares: engagement.retweet_count || 0,
          comments: engagement.reply_count || 0
        }
      };
    } catch (error) {
      console.error('Error converting post to RawDataItem:', error, post);
      // Return a basic item to prevent crashes
      return {
        id: docId,
        timestamp: new Date().toISOString(),
        source: 'Unknown',
        platform: 'Unknown',
        content: post.content || 'Error loading content',
        author: post.author || 'Unknown',
        location: 'RDC',
        sentiment: 'neutral',
        engagement: 0,
        reach: 0,
        verified: false,
        language: 'fr',
        keywords: [],
        category: 'Unknown',
        priority: 'low',
        metadata: { likes: 0, shares: 0, comments: 0 }
      };
    }
  }

  // Determine actual source from post data
  private determineActualSource(post: any): string {
    // First check the platform field directly
    if (post.platform) {
      const platformMapping: { [key: string]: string } = {
        'radio_okapi': 'Radio Okapi',
        'google_news': 'Google News',
        'media_congo': 'Media Congo',
        '7sur7': '7sur7.cd',
        'congo_page': 'Congo Page',
        'actualite_cd': 'Actualité.cd',
        'congo_liberty': 'Congo Liberty',
        'la_prosperite': 'La Prospérité',
        'twitter': 'Twitter'
      };
      
      const mappedSource = platformMapping[post.platform];
      if (mappedSource) return mappedSource;
    }
    
    // Check author to determine source
    if (post.author === 'Radio Okapi') return 'Radio Okapi';
    if (post.author === 'Google News') return 'Google News';
    if (post.author === 'Media Congo') return 'Media Congo';
    if (post.author === '7sur7.cd') return '7sur7.cd';
    if (post.author === 'Congo Page') return 'Congo Page';
    if (post.author === 'Actualité.cd') return 'Actualité.cd';
    if (post.author === 'Congo Liberty') return 'Congo Liberty';
    if (post.author === 'La Prospérité') return 'La Prospérité';
    if (post.author === 'Voice of Congo') return 'Voice of Congo';
    
    // Check ID patterns
    if (post.id?.includes('radio_okapi_')) return 'Radio Okapi';
    if (post.id?.includes('google_news_')) return 'Google News';
    if (post.id?.includes('media_congo_')) return 'Media Congo';
    if (post.id?.includes('7sur7_')) return '7sur7.cd';
    if (post.id?.includes('congo_page_')) return 'Congo Page';
    if (post.id?.includes('actualite_cd_')) return 'Actualité.cd';
    if (post.id?.includes('congo_liberty_')) return 'Congo Liberty';
    if (post.id?.includes('la_prosperite_')) return 'La Prospérité';
    if (post.id?.includes('voice_congo_')) return 'Voice of Congo';
    
    // Check URL patterns
    if (post.metadata?.urls?.some((url: string) => url.includes('radiookapi.net'))) return 'Radio Okapi';
    if (post.metadata?.urls?.some((url: string) => url.includes('news.google.com'))) return 'Google News';
    if (post.metadata?.urls?.some((url: string) => url.includes('mediacongo.net'))) return 'Media Congo';
    if (post.metadata?.urls?.some((url: string) => url.includes('7sur7.cd'))) return '7sur7.cd';
    if (post.metadata?.urls?.some((url: string) => url.includes('congopage.com'))) return 'Congo Page';
    if (post.metadata?.urls?.some((url: string) => url.includes('actualite.cd'))) return 'Actualité.cd';
    if (post.metadata?.urls?.some((url: string) => url.includes('congo-liberty.org'))) return 'Congo Liberty';
    if (post.metadata?.urls?.some((url: string) => url.includes('laprosperiteonline.net'))) return 'La Prospérité';
    
    // Default to Twitter for actual tweets
    return 'Twitter';
  }

  // Determine actual platform
  private determineActualPlatform(post: TwitterPost): string {
    const source = this.determineActualSource(post);
    
    // Map sources to platforms
    switch (source) {
      case 'Twitter':
        return 'Twitter';
      case 'Google News':
        return 'Google News';
      case 'Radio Okapi':
      case 'Voice of Congo':
      case 'Actualité.cd':
      case 'Media Congo':
      case '7sur7.cd':
      case 'Congo Page':
      case 'Congo Liberty':
      case 'La Prospérité':
      case 'DRC News':
        return 'News Website';
      default:
        return 'Unknown';
    }
  }

  // Determine location based on source
  private determineLocation(post: TwitterPost): string {
    const source = this.determineActualSource(post);
    
    // Most DRC sources are Kinshasa-based
    switch (source) {
      case 'Radio Okapi':
      case 'Voice of Congo':
      case 'Actualité.cd':
      case 'Media Congo':
      case '7sur7.cd':
      case 'Congo Page':
      case 'Congo Liberty':
      case 'La Prospérité':
      case 'DRC News':
        return 'Kinshasa, RDC';
      case 'Google News':
        return 'Global/RDC';
      case 'Twitter':
        // Try to extract from geo data if available
        return post.geo?.full_name || 'RDC';
      default:
        return 'RDC';
    }
  }

  // Calculate total engagement
  private calculateTotalEngagement(engagement: any): number {
    return (engagement?.like_count || 0) + 
           (engagement?.retweet_count || 0) + 
           (engagement?.reply_count || 0) + 
           (engagement?.quote_count || 0);
  }

  // Extract timestamp safely from Firestore data
  private extractTimestamp(timestamp: any): string {
    try {
      // Handle Firestore Timestamp object
      if (timestamp?.toDate) {
        return timestamp.toDate().toISOString();
      }
      // Handle timestamp object with seconds/nanoseconds
      if (timestamp?.seconds) {
        return new Date(timestamp.seconds * 1000).toISOString();
      }
      // Handle string timestamp
      if (typeof timestamp === 'string') {
        return new Date(timestamp).toISOString();
      }
      // Handle Date object
      if (timestamp instanceof Date) {
        return timestamp.toISOString();
      }
      // Fallback
      return new Date().toISOString();
    } catch (error) {
      console.error('Error extracting timestamp:', error, timestamp);
      return new Date().toISOString();
    }
  }

  private mapEngagementToPriority(engagement: number): 'low' | 'medium' | 'high' {
    if (engagement > 100) return 'high';
    if (engagement > 20) return 'medium';
    return 'low';
  }

  // Get all raw data with pagination
  async getRawData(
    pageSize: number = 10000, // Increased from 100 to get all data
    lastDoc?: DocumentSnapshot
  ): Promise<{ data: RawDataItem[]; hasMore: boolean; lastDoc?: DocumentSnapshot }> {
    try {
      console.log(`DEBUG: Getting raw data from collection 'twitter_posts' with limit ${pageSize}`);
      
      // First, let's check if there are ANY documents in the collection
      const totalCountQuery = query(this.postsCollection, limit(1));
      const totalCountSnapshot = await getDocs(totalCountQuery);
      console.log(`DEBUG: Collection 'twitter_posts' has at least ${totalCountSnapshot.docs.length} documents`);
      
      // Try without orderBy first to see if that's the issue
      let q = query(
        this.postsCollection,
        limit(pageSize)
      );
      
      console.log(`DEBUG: Trying query without orderBy first...`);

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      console.log(`DEBUG: Firestore query returned ${snapshot.docs.length} documents`);
      
      const data = snapshot.docs.map(doc => {
        const postData = doc.data();
        console.log('Raw Firestore data for doc', doc.id, ':', postData); // Debug log
        
        return this.convertToRawDataItem(postData as TwitterPost, doc.id);
      });

      return {
        data,
        hasMore: false, // Disable pagination - show all data
        lastDoc: snapshot.docs[snapshot.docs.length - 1]
      };
    } catch (error) {
      console.error('Error fetching raw data:', error);
      return {
        data: [],
        hasMore: false
      };
    }
  }

  // Get raw data filtered by keyword
  async getRawDataByKeyword(
    keyword: string,
    pageSize: number = 10000
  ): Promise<RawDataItem[]> {
    try {
      const q = query(
        this.postsCollection,
        where('keyword', '==', keyword),
        orderBy('timestamp', 'desc'),
        limit(pageSize)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const postData = doc.data() as TwitterPost;
        return this.convertToRawDataItem(postData, doc.id);
      });
    } catch (error) {
      console.error('Error fetching raw data by keyword:', error);
      return [];
    }
  }

  // Get raw data filtered by sentiment
  async getRawDataBySentiment(
    sentiment: 'positive' | 'negative' | 'neutral',
    pageSize: number = 10000
  ): Promise<RawDataItem[]> {
    try {
      const q = query(
        this.postsCollection,
        where('sentiment', '==', sentiment),
        orderBy('timestamp', 'desc'),
        limit(pageSize)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const postData = doc.data() as TwitterPost;
        return this.convertToRawDataItem(postData, doc.id);
      });
    } catch (error) {
      console.error('Error fetching raw data by sentiment:', error);
      return [];
    }
  }

  // Get raw data within date range
  async getRawDataByDateRange(
    startDate: Date,
    endDate: Date,
    pageSize: number = 10000
  ): Promise<RawDataItem[]> {
    try {
      const q = query(
        this.postsCollection,
        where('timestamp', '>=', Timestamp.fromDate(startDate)),
        where('timestamp', '<=', Timestamp.fromDate(endDate)),
        orderBy('timestamp', 'desc'),
        limit(pageSize)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const postData = doc.data() as TwitterPost;
        return this.convertToRawDataItem(postData, doc.id);
      });
    } catch (error) {
      console.error('Error fetching raw data by date range:', error);
      return [];
    }
  }

  // Search raw data by content
  async searchRawData(
    searchTerm: string,
    pageSize: number = 10000
  ): Promise<RawDataItem[]> {
    try {
      // Firestore doesn't support full-text search, so we'll get all recent data
      // and filter on the client side. In production, you'd use Algolia or similar.
      const q = query(
        this.postsCollection,
        orderBy('timestamp', 'desc'),
        limit(pageSize * 2) // Get more to account for filtering
      );

      const snapshot = await getDocs(q);
      const allData = snapshot.docs.map(doc => {
        const postData = doc.data() as TwitterPost;
        return this.convertToRawDataItem(postData, doc.id);
      });

      // Client-side filtering
      return allData.filter(item =>
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, pageSize);
    } catch (error) {
      console.error('Error searching raw data:', error);
      return [];
    }
  }

}