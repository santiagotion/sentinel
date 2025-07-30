# Sentinel Backend - Twitter Monitoring System

Complete backend implementation for the Sentinel Twitter monitoring system using Firebase Cloud Functions and Twitter API v2.

## 🚀 Features

- **Twitter API v2 Integration**: Full engagement metrics collection (likes, retweets, replies, quotes, impressions)
- **Smart Rate Limiting**: Automatic management of Twitter API limits (450 requests/15 minutes)
- **Scheduled Data Collection**: Every 30 minutes for regular keywords, 15 minutes for critical ones
- **Sentiment Analysis**: Built-in sentiment analysis for French and English
- **Real-time Analytics**: Automatic calculation of engagement rates, virality scores, and trends
- **Firestore Database**: Scalable NoSQL database with optimized indexes
- **RESTful API**: HTTP endpoints for frontend integration

## 📁 Project Structure

```
backend/
├── functions/
│   ├── models/
│   │   └── types.ts              # TypeScript interfaces
│   ├── services/
│   │   ├── twitterService.ts     # Twitter API v2 client
│   │   ├── firestoreService.ts   # Database operations
│   │   └── sentimentService.ts   # Sentiment analysis
│   ├── utils/
│   │   └── rateLimitManager.ts   # Rate limiting logic
│   └── index.ts                  # Main Cloud Functions
├── scripts/
│   ├── setup.sh                  # Initial setup script
│   ├── deploy.sh                 # Deployment script
│   └── seed-data.ts              # Sample data seeding
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── firebase.json                 # Firebase configuration
└── firestore.rules               # Security rules
```

## 🛠️ Setup Instructions

### 1. Prerequisites

- Node.js 18.x or later
- Firebase CLI
- Twitter Developer Account

### 2. Initial Setup

```bash
cd backend
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 3. Configure Twitter API

1. Get Twitter API credentials from [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Edit `.env` file with your credentials:

```bash
TWITTER_BEARER_TOKEN=your_bearer_token_here
TWITTER_API_KEY=your_api_key_here
TWITTER_API_SECRET=your_api_secret_here
TWITTER_ACCESS_TOKEN=your_access_token_here
TWITTER_ACCESS_SECRET=your_access_secret_here
```

### 4. Test Locally

```bash
npm run serve
```

This starts the Firebase emulators on:
- Functions: http://localhost:5001
- Firestore: http://localhost:8080
- UI: http://localhost:4000

### 5. Deploy to Production

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## 📊 API Endpoints

### Keywords API

```bash
# Get tweets for a keyword
GET /api/keywords/{keywordId}/tweets?limit=100

# Get keyword analytics
GET /api/keywords/{keywordId}/analytics

# Trigger manual scraping
POST /api/keywords/{keywordId}/scrape
```

### Example Response

```json
{
  "keyword": "élections RDC 2024",
  "tweets": [
    {
      "id": "twitter_123456_1703123456789",
      "tweetId": "123456",
      "content": "Les préparatifs électoraux continuent...",
      "author": "journalist_rdc",
      "timestamp": "2024-01-15T10:30:00Z",
      "sentiment": "neutral",
      "engagement": {
        "like_count": 45,
        "retweet_count": 12,
        "reply_count": 8,
        "quote_count": 3,
        "impression_count": 1250
      }
    }
  ]
}
```

## ⚙️ Scheduled Functions

| Function | Schedule | Purpose |
|----------|----------|---------|
| `scrapeTwitterData` | Every 30 minutes | Regular data collection |
| `scrapeHighPriorityKeywords` | Every 15 minutes | Critical keywords monitoring |
| `dailyAnalyticsAggregation` | Daily at 6:00 AM | Generate daily reports |

## 🔄 Data Flow

1. **Scheduled Trigger**: Cloud Function runs on schedule
2. **Keyword Fetch**: Get active keywords from Firestore
3. **Twitter API Call**: Search tweets using Twitter API v2
4. **Rate Limit Check**: Ensure we don't exceed API limits
5. **Sentiment Analysis**: Analyze tweet sentiment
6. **Data Storage**: Save tweets and analytics to Firestore
7. **Frontend Update**: Real-time updates via Firestore listeners

## 📈 Twitter API Usage

### Rate Limits (Twitter API v2)
- **Search**: 450 requests per 15 minutes
- **Tweets**: 300 requests per 15 minutes
- **Users**: 900 requests per 15 minutes

### Cost Optimization
- **Free Tier**: 500 posts/month (perfect for testing)
- **Basic Tier**: $200/month for 50k posts
- **Smart Rotation**: Priority-based keyword processing

## 🗄️ Database Schema

### Keywords Collection
```typescript
{
  id: string;
  term: string;
  isActive: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  analytics?: KeywordAnalytics;
}
```

### Twitter Posts Collection
```typescript
{
  id: string;
  tweetId: string;
  keyword: string;
  content: string;
  author: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  engagement: {
    like_count: number;
    retweet_count: number;
    reply_count: number;
    quote_count: number;
    impression_count: number;
  };
  timestamp: Date;
}
```

## 🛡️ Security

- **Firestore Rules**: Read-only access for frontend
- **Function Auth**: Secure API endpoints
- **Environment Variables**: Encrypted credential storage
- **Rate Limiting**: Prevent API abuse

## 📚 Development Commands

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Watch for changes
npm run watch

# Start emulators
npm run serve

# Deploy functions
npm run deploy

# View logs
npm run logs

# Run tests
npm test
```

## 🔧 Troubleshooting

### Common Issues

1. **Twitter API Rate Limits**
   - Check rate limit status in function logs
   - Reduce keyword count or frequency

2. **Function Timeout**
   - Increase timeout in function configuration
   - Optimize batch processing

3. **Missing Environment Variables**
   - Verify `.env` file exists
   - Check Firebase config: `firebase functions:config:get`

### Monitoring

- **Firebase Console**: https://console.firebase.google.com
- **Function Logs**: `npm run logs`
- **Firestore Data**: Firebase Console > Firestore

## 🚀 Deployment Checklist

- [ ] Twitter API credentials configured
- [ ] Firebase project created
- [ ] Functions deployed successfully
- [ ] Firestore rules updated
- [ ] Sample keywords seeded
- [ ] Monitoring enabled

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add tests
4. Submit pull request

For questions or support, contact the development team.