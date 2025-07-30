#!/bin/bash

echo "🛡️  SENTINEL - Congo Monitoring System"
echo "======================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🏗️  Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🚀 Starting development server..."
    echo "   Access the application at: http://localhost:3000"
    echo ""
    echo "📊 Available screens:"
    echo "   • Overview - Executive dashboard"
    echo "   • Search - Advanced search and filtering"
    echo "   • Keywords - Keyword monitoring"
    echo "   • Analytics - Deep analytics and reporting"
    echo "   • Network - Social network analysis"
    echo "   • Geographic - Province-level mapping"
    echo "   • Intelligence - AI-powered insights"
    echo "   • Sources - Source credibility tracking"
    echo "   • Alerts - Real-time alert management"
    echo ""
    echo "🗺️  To enable Mapbox features:"
    echo "   1. Get a free API key from: https://account.mapbox.com/auth/signup/"
    echo "   2. Copy .env.example to .env"
    echo "   3. Add your API key to VITE_MAPBOX_ACCESS_TOKEN"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    npm run dev
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi