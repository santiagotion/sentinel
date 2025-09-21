# 🎯 REAL YouTube Analysis Setup - NO MOCKING!

## 🚀 Quick Start (3 Steps)

### 1. Install System Requirements

**macOS:**
```bash
# Install FFmpeg for audio extraction
brew install ffmpeg

# Install Node.js if not already installed
brew install node
```

**Ubuntu/Debian:**
```bash
# Install FFmpeg and Node.js
sudo apt update
sudo apt install ffmpeg nodejs npm
```

**Windows:**
- Download FFmpeg from https://ffmpeg.org/download.html
- Add FFmpeg to PATH
- Install Node.js from https://nodejs.org

### 2. Setup Backend

```bash
# Run the setup script
./start-backend.sh
```

**OR manually:**
```bash
cd backend
npm run setup
cp .env.example .env
# Edit .env and add your OpenAI API key
npm start
```

### 3. Start Frontend

```bash
# In another terminal
npm run dev
```

## 🔑 Required API Key

You need an OpenAI API key for the AI analysis:
1. Get your key from: https://platform.openai.com/api-keys
2. Add it to `backend/.env`:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

## ✅ What Works (NO MOCKING)

### 🔍 Real YouTube Search
- ✅ Uses Playwright with your exact selectors
- ✅ Applies filters: Today + 4-20 minutes  
- ✅ Extracts real video data from YouTube
- ✅ Live browser automation viewer

### 📥 Real Video Processing
- ✅ Downloads actual video files with youtube-dl
- ✅ Extracts audio with FFmpeg
- ✅ Real-time progress tracking
- ✅ Error handling and recovery

### 🎙️ Real Audio Transcription
- ✅ Uses OpenAI Whisper API
- ✅ Supports French, Lingala, Swahili
- ✅ High-quality transcription

### 🤖 Real AI Analysis
- ✅ GPT-4 analysis for Congolese context
- ✅ Detects hate speech and violence incitation
- ✅ Identifies regional references (Kinshasa, Lubumbashi, etc.)
- ✅ Multi-language content analysis
- ✅ Political and security threat assessment

### 📊 Real-Time Features
- ✅ Live progress updates per video
- ✅ Phase tracking (download → process → analyze)
- ✅ Quick summaries with risk assessment
- ✅ Detailed analysis with credibility scores

## 🌐 System Architecture

```
Frontend (React) ←→ Backend (Node.js) ←→ External Services
     ↓                    ↓                    ↓
✅ Search UI          ✅ Playwright        ✅ YouTube
✅ Progress Tracking  ✅ youtube-dl        ✅ OpenAI Whisper  
✅ Results Display    ✅ FFmpeg            ✅ OpenAI GPT-4
✅ Browser Viewer     ✅ Real Processing   ✅ File System
```

## 🔧 Troubleshooting

### Backend Won't Start
```bash
# Check Node.js version (need 16+)
node --version

# Install dependencies
cd backend && npm install

# Check for missing FFmpeg
ffmpeg -version
```

### Frontend Connection Error
- Make sure backend is running on port 3001
- Check browser console for CORS errors
- Verify `http://localhost:3001/api/health` returns OK

### Video Processing Fails
- Check OpenAI API key is valid
- Ensure sufficient disk space (10GB+)
- Verify FFmpeg is installed and in PATH

### YouTube Search Fails
- Check internet connection
- YouTube might be rate limiting - wait and retry
- Try different search terms

## 📝 Usage Flow

1. **Search**: Enter terms like "actualités RDC" or "politique Kinshasa"
2. **Browse**: View REAL search results from YouTube
3. **Select**: Choose up to 2 videos (4-20 minutes)
4. **Analyze**: Click "Analyser" - watch REAL processing
5. **Review**: Get comprehensive security analysis

## 🛡️ Security Analysis Features

- **Hate Speech Detection**: Identifies discriminatory language
- **Violence Incitation**: Flags content promoting violence  
- **Political Manipulation**: Detects propaganda and false claims
- **Regional Context**: Understands DRC provinces and cities
- **Linguistic Analysis**: Handles French, Lingala, Swahili
- **Credibility Scoring**: 0-100 score based on content quality
- **Risk Assessment**: Low/Medium/High risk classification

## 📊 Performance Notes

- **Processing Time**: 2-5 minutes per video
- **Concurrent Videos**: Processes multiple videos in parallel
- **Storage**: Temporary files cleaned up after 1 hour
- **Memory Usage**: 4GB RAM recommended for video processing

## 🎯 This is 100% REAL - No Mocking!

Every component performs actual operations:
- ✅ Real browser automation
- ✅ Real video downloads  
- ✅ Real audio processing
- ✅ Real AI transcription
- ✅ Real security analysis
- ✅ Real progress tracking

Ready to protect against misinformation with REAL YouTube analysis! 🚀