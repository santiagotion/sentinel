# YouTube Analysis Backend - REAL Implementation

## 🚀 Quick Setup

```bash
cd backend
npm run setup
cp .env.example .env
# Edit .env with your OpenAI API key
npm start
```

## 🎯 What This Does (NO MOCKING)

1. **REAL YouTube Search**: Uses Playwright with your exact selectors
2. **REAL Video Download**: Downloads actual videos using youtube-dl
3. **REAL Audio Extraction**: Extracts audio using FFmpeg
4. **REAL Transcription**: Uses OpenAI Whisper API for speech-to-text
5. **REAL AI Analysis**: Analyzes content with GPT-4 for Congolese context

## 📋 Requirements

- Node.js 16+
- FFmpeg installed on system
- OpenAI API key
- Internet connection

## 🔧 Installation

```bash
# Install dependencies and browsers
npm run setup

# Install FFmpeg (required for audio extraction)
# Ubuntu/Debian:
sudo apt install ffmpeg

# macOS:
brew install ffmpeg

# Windows:
# Download from https://ffmpeg.org/download.html
```

## ⚙️ Configuration

Create `.env` file:
```bash
OPENAI_API_KEY=sk-your-actual-openai-key
PORT=3001
```

## 🚀 Start Server

```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Search YouTube (REAL)
```bash
POST http://localhost:3001/api/youtube/search
{
  "query": "actualités RDC Kinshasa"
}
```

### Download & Process Video (REAL)
```bash
POST http://localhost:3001/api/video/download
{
  "videoId": "abc123",
  "url": "https://youtube.com/watch?v=abc123",
  "title": "Video Title",
  "channel": "Channel Name"
}
```

### Check Progress (REAL-TIME)
```bash
GET http://localhost:3001/api/video/progress/{downloadId}
```

### Get Analysis Results (REAL)
```bash
GET http://localhost:3001/api/video/analysis/{downloadId}
```

## 🔍 How It Works

1. **YouTube Search**: 
   - Opens real browser with Playwright
   - Uses your exact selectors
   - Applies filters: Today + 4-20 minutes
   - Extracts real video data

2. **Video Processing**:
   - Downloads actual video files
   - Extracts audio with FFmpeg
   - Transcribes with Whisper API
   - Analyzes with GPT-4

3. **Progress Tracking**:
   - Real-time progress updates
   - Phase tracking (download → process → analyze)
   - Error handling and recovery

## 🌍 Congolese Context

The AI analysis is specifically tuned for:
- **Languages**: French, Lingala, Swahili detection
- **Regional**: Kinshasa, Lubumbashi, Nord-Kivu references
- **Political**: DRC political figures and parties
- **Security**: Ethnic tensions, violence incitation
- **Economic**: Mining, development, franc congolais

## 🛡️ Security Features

- Hate speech detection
- Violence incitation flagging
- Misinformation scoring
- Credibility assessment
- Risk level classification

## 📊 No Mocking - Everything is Real!

✅ Real YouTube automation with Playwright
✅ Real video downloads with youtube-dl
✅ Real audio extraction with FFmpeg  
✅ Real transcription with Whisper API
✅ Real AI analysis with GPT-4
✅ Real progress tracking
✅ Real error handling

## 🚨 System Requirements

- **RAM**: 4GB minimum (video processing)
- **Storage**: 10GB free space (temporary files)
- **Network**: Stable internet for downloads
- **CPU**: Multi-core recommended

## 📝 Logs

The server provides detailed logs for all operations:
- YouTube search progress
- Download status and progress
- Processing steps
- AI analysis results
- Error tracking

Start the server and watch real automation in action!