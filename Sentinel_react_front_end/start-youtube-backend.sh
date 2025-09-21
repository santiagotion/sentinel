#!/bin/bash

echo "🚀 Starting YouTube Analysis Backend for Sentinel..."

cd youtube-analysis-backend

# Kill any existing process on port 3002
lsof -ti:3002 | xargs kill -9 2>/dev/null || true

# Start the server
echo "✅ Backend ready with OpenAI API key on port 3002"
echo "🔗 Health check: http://localhost:3002/api/health"
echo "📡 Search endpoint: http://localhost:3002/api/youtube/search"
echo ""
echo "Frontend running on: http://localhost:3001"
echo "Press Ctrl+C to stop"

node server.js