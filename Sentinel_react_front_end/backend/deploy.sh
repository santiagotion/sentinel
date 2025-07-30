#!/bin/bash

echo "🚀 Deploying Sentinel Backend to Firebase..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Please login to Firebase first:"
    firebase login
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building TypeScript..."
npm run build

# Deploy to Firebase
echo "🚀 Deploying to Firebase..."
firebase deploy --only functions,firestore:rules

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up Twitter API credentials:"
echo "   firebase functions:config:set twitter.bearer_token=\"YOUR_TWITTER_BEARER_TOKEN\""
echo ""
echo "2. Add some test keywords in your frontend"
echo ""
echo "3. Check Firebase Console for data:"
echo "   https://console.firebase.google.com/project/sentinel-rdc/firestore"