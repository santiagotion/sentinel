#!/bin/bash

# Setup script for Sentinel Backend
set -e

echo "🔧 Setting up Sentinel Backend"

# Check Node.js version
NODE_VERSION=$(node --version)
echo "📍 Node.js version: $NODE_VERSION"

if [[ ! "$NODE_VERSION" =~ ^v18 ]]; then
    echo "⚠️  Warning: Node.js 18.x is recommended for Firebase Functions"
fi

# Install Firebase CLI if not installed
if ! command -v firebase &> /dev/null; then
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
else
    echo "✅ Firebase CLI already installed"
fi

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Check if user is logged in to Firebase
echo "🔐 Checking Firebase authentication..."
if ! firebase projects:list &> /dev/null; then
    echo "❌ Not logged in to Firebase. Please run:"
    echo "firebase login"
    echo ""
    echo "After logging in, run this setup script again."
    exit 1
fi

# Initialize Firebase project if needed
if [ ! -f ".firebaserc" ]; then
    echo "🚀 Initializing Firebase project..."
    firebase init
else
    echo "✅ Firebase project already initialized"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env and add your Twitter API credentials:"
    echo "   - TWITTER_BEARER_TOKEN"
    echo "   - TWITTER_API_KEY"
    echo "   - TWITTER_API_SECRET"
    echo "   - TWITTER_ACCESS_TOKEN"
    echo "   - TWITTER_ACCESS_SECRET"
    echo ""
    echo "You can get these from: https://developer.twitter.com/en/portal/dashboard"
else
    echo "✅ .env file already exists"
fi

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Test Firebase emulators
echo "🧪 Testing Firebase emulators..."
echo "Starting emulators in the background..."
npm run serve &
EMULATOR_PID=$!

# Wait a moment for emulators to start
sleep 5

# Kill emulators
kill $EMULATOR_PID 2>/dev/null || true

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your Twitter API credentials"
echo "2. Test locally: npm run serve"
echo "3. Deploy: ./scripts/deploy.sh"
echo ""
echo "📚 Useful commands:"
echo "   npm run serve    - Start local emulators"
echo "   npm run build    - Build TypeScript"
echo "   npm run deploy   - Deploy to Firebase"
echo "   npm run logs     - View function logs"