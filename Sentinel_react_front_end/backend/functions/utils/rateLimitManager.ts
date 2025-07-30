import { logger } from 'firebase-functions';

interface RateLimitBucket {
  count: number;
  resetAt: Date;
  limit: number;
}

export class RateLimitManager {
  private buckets: Map<string, RateLimitBucket>;
  
  // Twitter API v2 rate limits
  private readonly limits = {
    search: { requests: 450, window: 15 * 60 * 1000 }, // 450 per 15 minutes
    tweets: { requests: 300, window: 15 * 60 * 1000 }, // 300 per 15 minutes
    users: { requests: 900, window: 15 * 60 * 1000 },  // 900 per 15 minutes
  };

  constructor() {
    this.buckets = new Map();
    this.initializeBuckets();
  }

  private initializeBuckets(): void {
    Object.entries(this.limits).forEach(([endpoint, limit]) => {
      this.buckets.set(endpoint, {
        count: 0,
        resetAt: new Date(Date.now() + limit.window),
        limit: limit.requests
      });
    });
  }

  /**
   * Check if we can make a request
   */
  canMakeRequest(endpoint: string, count: number = 1): boolean {
    const bucket = this.buckets.get(endpoint);
    if (!bucket) {
      logger.warn(`Unknown endpoint: ${endpoint}`);
      return true; // Allow unknown endpoints
    }

    // Reset bucket if time window has passed
    if (Date.now() > bucket.resetAt.getTime()) {
      this.resetBucket(endpoint);
      return true;
    }

    // Check if we have capacity
    return bucket.count + count <= bucket.limit - 10; // Keep 10 request buffer
  }

  /**
   * Record that requests were made
   */
  recordRequest(endpoint: string, count: number = 1): void {
    const bucket = this.buckets.get(endpoint);
    if (!bucket) return;

    bucket.count += count;
    logger.info(`Rate limit ${endpoint}: ${bucket.count}/${bucket.limit} used`);
  }

  /**
   * Reset a bucket
   */
  private resetBucket(endpoint: string): void {
    const limit = this.limits[endpoint as keyof typeof this.limits];
    if (!limit) return;

    this.buckets.set(endpoint, {
      count: 0,
      resetAt: new Date(Date.now() + limit.window),
      limit: limit.requests
    });
  }

  /**
   * Get current status of all buckets
   */
  getStatus(): Record<string, { used: number; limit: number; resetIn: number }> {
    const status: Record<string, any> = {};
    
    this.buckets.forEach((bucket, endpoint) => {
      const resetIn = Math.max(0, bucket.resetAt.getTime() - Date.now());
      status[endpoint] = {
        used: bucket.count,
        limit: bucket.limit,
        resetIn: Math.ceil(resetIn / 1000) // seconds
      };
    });

    return status;
  }

  /**
   * Wait until rate limit resets
   */
  async waitForReset(endpoint: string): Promise<void> {
    const bucket = this.buckets.get(endpoint);
    if (!bucket) return;

    const waitTime = bucket.resetAt.getTime() - Date.now();
    if (waitTime > 0) {
      logger.info(`Waiting ${waitTime}ms for ${endpoint} rate limit reset`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.resetBucket(endpoint);
    }
  }

  /**
   * Get time until reset for an endpoint
   */
  getTimeUntilReset(endpoint: string): number {
    const bucket = this.buckets.get(endpoint);
    if (!bucket) return 0;

    return Math.max(0, bucket.resetAt.getTime() - Date.now());
  }

  /**
   * Adaptive rate limiting based on usage patterns
   */
  getSuggestedDelay(endpoint: string): number {
    const bucket = this.buckets.get(endpoint);
    if (!bucket) return 0;

    const usagePercentage = bucket.count / bucket.limit;
    const timeRemaining = bucket.resetAt.getTime() - Date.now();
    
    // If we're using requests too quickly, add delay
    if (usagePercentage > 0.8 && timeRemaining > 60000) {
      // High usage with time remaining - slow down
      return 5000; // 5 second delay
    } else if (usagePercentage > 0.5) {
      // Moderate usage - small delay
      return 2000; // 2 second delay
    }
    
    return 0; // No delay needed
  }
}