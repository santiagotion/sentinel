#!/bin/bash

echo "🚀 Starting REAL YouTube Analysis Backend..."

cd backend

# Kill any existing process on port 3001
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

# Start the server
echo "✅ Backend ready with your API key"
echo "🔗 Health check: http://localhost:3001/api/health"
echo "📡 Search endpoint: http://localhost:3001/api/youtube/search"
echo ""
echo "Press Ctrl+C to stop"

node server.js