const express = require('express');
const cors = require('cors');
const { chromium } = require('playwright');
const youtubeDl = require('youtube-dl-exec');
const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const app = express();
app.use(cors());
app.use(express.json());

const execAsync = promisify(exec);
const PORT = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here'
});

// Storage for downloads and progress
const activeDownloads = new Map();
const analysisResults = new Map();

// Ensure directories exist
const downloadDir = path.join(__dirname, 'downloads');
const audioDir = path.join(__dirname, 'audio');

[downloadDir, audioDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Real YouTube automation class
class YouTubeAutomation {
  constructor() {
    this.selectors = {
      searchInput: 'input[name="search_query"], #search-input input',
      searchButton: 'button#search-icon-legacy, button[aria-label="Search"]',
      filtersButton: 'button[aria-label*="filter"], ytd-toggle-button-renderer button',
      todayFilter: 'a[href*="EgYIAh"]',
      durationFilter: 'a[href*="GAM"]',
      videoRenderer: 'ytd-video-renderer',
      videoTitle: '#video-title',
      channelName: '#text a, #channel-info #text a',
      videoDuration: '.ytd-thumbnail-overlay-time-status-renderer span',
      videoThumbnail: 'img',
      videoViews: '#metadata-line span:first-child'
    };
    this.filterParams = 'EgYIAhABGAM%253D'; // Today + 4-20 minutes
  }

  async searchVideos(query) {
    console.log(`🔍 Starting REAL YouTube search for: "${query}"`);
    
    const browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    try {
      // Set user agent to avoid detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      // Direct URL approach (most reliable)
      const directUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=${this.filterParams}`;
      console.log(`📍 Navigating to: ${directUrl}`);
      
      await page.goto(directUrl, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait for videos to load
      await page.waitForSelector(this.selectors.videoRenderer, { timeout: 15000 });
      console.log('✅ Videos loaded successfully');
      
      // Extract real video data
      const videos = await page.$$eval(this.selectors.videoRenderer, (elements, selectors) => {
        return elements.map(element => {
          try {
            const titleEl = element.querySelector(selectors.videoTitle);
            const channelEl = element.querySelector(selectors.channelName);
            const durationEl = element.querySelector(selectors.videoDuration);
            const thumbnailEl = element.querySelector(selectors.videoThumbnail);
            const viewsEl = element.querySelector(selectors.videoViews);
            
            if (!titleEl || !channelEl || !durationEl) return null;
            
            const href = titleEl.getAttribute('href') || '';
            const videoId = href.match(/\/watch\?v=([^&]+)/)?.[1] || '';
            const duration = durationEl.textContent?.trim() || '';
            
            // Parse duration to check if it's in 4-20 minute range
            const parseDuration = (dur) => {
              const parts = dur.split(':').map(p => parseInt(p));
              if (parts.length === 2) return parts[0] * 60 + parts[1];
              if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
              return 0;
            };
            
            const durationSeconds = parseDuration(duration);
            if (durationSeconds < 240 || durationSeconds > 1200) return null;
            
            return {
              id: videoId,
              title: titleEl.textContent?.trim() || '',
              channel: channelEl.textContent?.trim() || '',
              duration: duration,
              uploadDate: 'Today',
              url: 'https://www.youtube.com' + href,
              thumbnailUrl: thumbnailEl?.getAttribute('src') || '',
              viewCount: viewsEl?.textContent?.trim() || ''
            };
          } catch (error) {
            console.error('Error extracting video data:', error);
            return null;
          }
        }).filter(Boolean);
      }, this.selectors);
      
      console.log(`✅ Extracted ${videos.length} real videos`);
      return videos.slice(0, 10);
      
    } catch (error) {
      console.error('❌ YouTube search error:', error);
      throw error;
    } finally {
      await browser.close();
    }
  }
}

// Real video processor class
class VideoProcessor {
  async downloadVideo(videoUrl, videoId, onProgress) {
    console.log(`📥 Starting REAL download for: ${videoId}`);
    
    const outputPath = path.join(downloadDir, `${videoId}.%(ext)s`);
    
    return new Promise((resolve, reject) => {
      const ytdl = youtubeDl.exec(videoUrl, {
        output: outputPath,
        format: 'best[height<=720]',
        extractAudio: false,
        writeInfoJson: true
      });
      
      ytdl.on('progress', (progress) => {
        const percent = parseFloat(progress.percent) || 0;
        console.log(`📊 Download progress: ${percent}%`);
        if (onProgress) onProgress(percent);
      });
      
      ytdl.on('error', (error) => {
        console.error(`❌ Download failed for ${videoId}:`, error);
        reject(error);
      });
      
      ytdl.on('close', () => {
        console.log(`✅ Download completed: ${videoId}`);
        resolve(outputPath);
      });
    });
  }

  async extractAudio(videoPath, videoId) {
    console.log(`🎵 Extracting audio from: ${videoId}`);
    
    const audioPath = path.join(audioDir, `${videoId}.wav`);
    
    try {
      await execAsync(`ffmpeg -i "${videoPath}" -ar 16000 -ac 1 "${audioPath}"`);
      console.log(`✅ Audio extracted: ${audioPath}`);
      return audioPath;
    } catch (error) {
      console.error(`❌ Audio extraction failed:`, error);
      throw error;
    }
  }

  async transcribeAudio(audioPath) {
    console.log(`📝 Transcribing audio: ${audioPath}`);
    
    try {
      const audioFile = fs.readFileSync(audioPath);
      
      const response = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
        language: 'fr', // French for Congolese content
        response_format: 'text'
      });
      
      console.log(`✅ Transcription completed`);
      return response;
    } catch (error) {
      console.error(`❌ Transcription failed:`, error);
      throw error;
    }
  }
}

// Real AI analyzer class
class AIAnalyzer {
  async analyzeContent(transcript, title, channel) {
    console.log(`🤖 Starting REAL AI analysis for: ${title}`);
    
    const prompt = `
Analysez le contenu vidéo suivant pour un contexte sécuritaire congolais (République Démocratique du Congo). Portez une attention particulière aux langues locales, références culturelles, et préoccupations sécuritaires régionales:

Titre: ${title}
Chaîne: ${channel}
Transcription: ${transcript}

Fournissez une analyse complète au format JSON suivant:
{
  "summary": "Résumé en français (2-3 phrases)",
  "keyPoints": ["Point clé 1", "Point clé 2", "Point clé 3"],
  "sentiment": "positive|negative|neutral",
  "topics": ["sujet1", "sujet2", "sujet3"],
  "risks": ["risque1", "risque2"],
  "credibilityScore": 0-100,
  "misinformationFlags": ["signalement1", "signalement2"],
  "contentType": "Actualités|Politique|Divertissement|Éducation|Opinion|Autre",
  "detectedLanguages": ["French", "Lingala", "Swahili", "English"],
  "hasHateSpeech": true|false,
  "hasViolenceIncitation": true|false,
  "riskLevel": "low|medium|high",
  "congoleseContext": {
    "politicalContent": true|false,
    "tribalReferences": true|false,
    "economicConcerns": true|false,
    "securityThreats": true|false,
    "regionalReferences": ["Kinshasa", "Lubumbashi", "Nord-Kivu", etc.]
  },
  "linguisticAnalysis": {
    "lingalaContent": true|false,
    "frenchContent": true|false,
    "swahiliContent": true|false,
    "mixedLanguageUse": true|false
  }
}

Analysez spécifiquement pour:
1. Menaces sécuritaires et incitation à la violence
2. Discours de haine contre groupes ethniques/régionaux
3. Désinformation politique ou économique
4. Contenu en langues congolaises (Lingala, Swahili)
5. Références aux provinces et villes de la RDC
`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Vous êtes un expert en analyse de contenu spécialisé dans la détection de désinformation et l'évaluation de contenu pour le contexte sécuritaire congolais."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const response = completion.choices[0]?.message?.content;
      console.log(`✅ AI analysis completed`);
      
      return this.parseResponse(response);
    } catch (error) {
      console.error(`❌ AI analysis failed:`, error);
      throw error;
    }
  }

  parseResponse(response) {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
    }
    
    throw new Error('Failed to parse AI response');
  }
}

// Initialize services
const youtubeService = new YouTubeAutomation();
const videoProcessor = new VideoProcessor();
const aiAnalyzer = new AIAnalyzer();

// API Routes
app.post('/api/youtube/search', async (req, res) => {
  try {
    const { query } = req.body;
    console.log(`🔍 Search request: ${query}`);
    
    const videos = await youtubeService.searchVideos(query);
    res.json(videos);
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/video/download', async (req, res) => {
  try {
    const { videoId, url, title, channel } = req.body;
    console.log(`📥 Download request: ${videoId}`);
    
    const downloadId = `download_${videoId}_${Date.now()}`;
    
    // Initialize progress tracking
    activeDownloads.set(downloadId, {
      videoId,
      title,
      channel,
      progress: 0,
      status: 'downloading',
      phase: 'downloading'
    });
    
    // Start download process asynchronously
    processVideo(downloadId, url, videoId, title, channel);
    
    res.json({ downloadId, status: 'started' });
  } catch (error) {
    console.error('Download API error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/video/progress/:downloadId', (req, res) => {
  const { downloadId } = req.params;
  const progress = activeDownloads.get(downloadId);
  
  if (!progress) {
    return res.status(404).json({ error: 'Download not found' });
  }
  
  res.json(progress);
});

app.get('/api/video/analysis/:downloadId', (req, res) => {
  const { downloadId } = req.params;
  const analysis = analysisResults.get(downloadId);
  
  if (!analysis) {
    return res.status(404).json({ error: 'Analysis not found' });
  }
  
  res.json(analysis);
});

// Process video function
async function processVideo(downloadId, url, videoId, title, channel) {
  try {
    // Download video
    console.log(`📥 Processing: ${videoId}`);
    
    const videoPath = await videoProcessor.downloadVideo(url, videoId, (progress) => {
      activeDownloads.set(downloadId, {
        ...activeDownloads.get(downloadId),
        progress: Math.round(progress * 0.4), // Download is 40% of total
        status: 'downloading'
      });
    });
    
    // Extract audio
    activeDownloads.set(downloadId, {
      ...activeDownloads.get(downloadId),
      progress: 40,
      status: 'processing',
      phase: 'processing',
      processingStep: 'Extraction de l\'audio...'
    });
    
    const audioPath = await videoProcessor.extractAudio(videoPath, videoId);
    
    // Transcribe audio
    activeDownloads.set(downloadId, {
      ...activeDownloads.get(downloadId),
      progress: 60,
      processingStep: 'Transcription audio...'
    });
    
    const transcript = await videoProcessor.transcribeAudio(audioPath);
    
    // Analyze with AI
    activeDownloads.set(downloadId, {
      ...activeDownloads.get(downloadId),
      progress: 80,
      status: 'analyzing',
      phase: 'analyzing',
      processingStep: 'Analyse IA en cours...'
    });
    
    const analysis = await aiAnalyzer.analyzeContent(transcript, title, channel);
    
    // Store results
    analysisResults.set(downloadId, {
      ...analysis,
      transcript,
      videoId,
      title,
      channel
    });
    
    // Mark as completed
    activeDownloads.set(downloadId, {
      ...activeDownloads.get(downloadId),
      progress: 100,
      status: 'completed',
      phase: 'completed',
      processingStep: 'Analyse terminée',
      quickSummary: {
        contentType: analysis.contentType,
        sentiment: analysis.sentiment,
        language: analysis.detectedLanguages,
        hasHateSpeech: analysis.hasHateSpeech,
        hasViolenceIncitation: analysis.hasViolenceIncitation,
        riskLevel: analysis.riskLevel,
        briefSummary: analysis.summary
      }
    });
    
    console.log(`✅ Processing completed: ${videoId}`);
    
    // Cleanup files
    setTimeout(() => {
      try {
        if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
        if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    }, 3600000); // Clean up after 1 hour
    
  } catch (error) {
    console.error(`❌ Processing failed for ${videoId}:`, error);
    
    activeDownloads.set(downloadId, {
      ...activeDownloads.get(downloadId),
      status: 'error',
      phase: 'error',
      error: error.message
    });
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 REAL Backend server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;