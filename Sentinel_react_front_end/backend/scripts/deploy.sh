#!/bin/bash

# Deployment script for Sentinel Backend
set -e

echo "🚀 Starting Sentinel Backend Deployment"

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not logged in to Firebase. Please run:"
    echo "firebase login"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please create one based on .env.example"
    echo "Make sure to set your Twitter API credentials!"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building TypeScript..."
npm run build

echo "🔧 Setting Firebase config..."
# Set Twitter API configuration (replace with your actual values)
if [ -f ".env" ]; then
    source .env
    firebase functions:config:set \
        twitter.bearer_token="$TWITTER_BEARER_TOKEN" \
        twitter.api_key="$TWITTER_API_KEY" \
        twitter.api_secret="$TWITTER_API_SECRET" \
        twitter.access_token="$TWITTER_ACCESS_TOKEN" \
        twitter.access_secret="$TWITTER_ACCESS_SECRET"
fi

echo "🚀 Deploying to Firebase..."
firebase deploy --only functions,firestore

echo "✅ Deployment completed successfully!"
echo ""
echo "📍 Your functions are available at:"
echo "   Main API: https://us-central1-sentinel-monitoring-dev.cloudfunctions.net/api"
echo ""
echo "🔄 Scheduled functions:"
echo "   - scrapeTwitterData: every 30 minutes"
echo "   - scrapeHighPriorityKeywords: every 15 minutes"
echo "   - dailyAnalyticsAggregation: daily at 6:00 AM"
echo ""
echo "📊 Monitor your functions at:"
echo "   https://console.firebase.google.com/project/sentinel-monitoring-dev/functions"