#!/bin/bash

echo "🚀 Starting YouTube Analysis Backend..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "⚠️  FFmpeg is not installed. Installing FFmpeg is required for audio extraction."
    echo "   - macOS: brew install ffmpeg"
    echo "   - Ubuntu: sudo apt install ffmpeg"
    echo "   - Windows: Download from https://ffmpeg.org/"
    echo ""
    read -p "Continue without FFmpeg? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Navigate to backend directory
cd backend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Backend not found. Make sure you're in the correct directory."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm run setup
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo ""
    echo "🔑 IMPORTANT: Edit backend/.env and add your OpenAI API key:"
    echo "   OPENAI_API_KEY=sk-your-key-here"
    echo ""
    read -p "Press Enter after you've added your OpenAI API key..."
fi

# Start the server
echo ""
echo "🎯 Starting REAL YouTube Analysis Backend on port 3001..."
echo "   - Real YouTube automation with Playwright"
echo "   - Real video downloads with youtube-dl"  
echo "   - Real audio extraction with FFmpeg"
echo "   - Real transcription with Whisper API"
echo "   - Real AI analysis with GPT-4"
echo ""
echo "Backend will be available at: http://localhost:3001"
echo "Health check: http://localhost:3001/api/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start