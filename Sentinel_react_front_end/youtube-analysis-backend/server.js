require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { chromium } = require('playwright');
const youtubeDl = require('youtube-dl-exec');
const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
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

// Initialize Gemini
const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'your-gemini-key-here');

// Storage for downloads and progress
const activeDownloads = new Map();
const analysisResults = new Map();

// Ensure directories exist
const downloadDir = path.join(__dirname, 'downloads');
const audioDir = path.join(__dirname, 'audio');
const screenshotsDir = path.join(__dirname, 'screenshots');

[downloadDir, audioDir, screenshotsDir].forEach(dir => {
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

  async searchVideos(query, filtersEnabled = true) {
    console.log(`🔍 Starting REAL YouTube search for: "${query}" ${filtersEnabled ? 'with filters' : 'without filters'}`);
    
    const browser = await chromium.launch({ 
      headless: false, // Show real browser window
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    try {
      
      // Direct URL approach (most reliable)
      const directUrl = filtersEnabled 
        ? `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=${this.filterParams}`
        : `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
      console.log(`📍 Navigating to: ${directUrl}`);
      
      await page.goto(directUrl, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Accept cookies if dialog appears
      try {
        await page.click('button[aria-label="Accept all"], button:has-text("Accept"), button:has-text("I agree")', { timeout: 3000 });
        console.log('✅ Cookies accepted');
      } catch (e) {
        console.log('ℹ️ No cookie dialog found');
      }
      
      // Take screenshot after navigation
      const screenshotPath = path.join(__dirname, 'screenshots', `search-${Date.now()}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`📸 Browser screenshot saved: ${screenshotPath}`);
      
      // Wait for videos to load
      await page.waitForSelector(this.selectors.videoRenderer, { timeout: 15000 });
      console.log('✅ Videos loaded successfully');
      
      // Wait for thumbnails to load
      await page.waitForTimeout(3000);
      console.log('✅ Waiting for thumbnails to load');
      
      // Extract real video data
      const videos = await page.$$eval(this.selectors.videoRenderer, (elements, params) => {
        const { selectors, filtersEnabled } = params;
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
            // Only filter by duration if filters are enabled
            if (filtersEnabled && (durationSeconds < 240 || durationSeconds > 1200)) return null;
            
            return {
              id: videoId,
              title: titleEl.textContent?.trim() || '',
              channel: channelEl.textContent?.trim() || '',
              duration: duration,
              uploadDate: filtersEnabled ? 'Today' : 'Various',
              url: 'https://www.youtube.com' + href,
              thumbnailUrl: thumbnailEl?.getAttribute('src') || '',
              viewCount: viewsEl?.textContent?.trim() || ''
            };
          } catch (error) {
            console.error('Error extracting video data:', error);
            return null;
          }
        }).filter(Boolean);
      }, { selectors: this.selectors, filtersEnabled });
      
      console.log(`✅ Extracted ${videos.length} real videos`);
      
      // Return videos with screenshot URL
      const screenshotUrl = `http://localhost:${PORT}/screenshots/search-${Date.now()}.png`;
      return {
        videos: videos.slice(0, 10),
        screenshot: screenshotUrl
      };
      
    } catch (error) {
      console.error('❌ YouTube search error:', error);
      throw error;
    } finally {
      // Keep browser open for 30 seconds to show the process
      console.log('⏰ Keeping browser open for 30 seconds...');
      setTimeout(async () => {
        await browser.close();
        console.log('🔒 Browser closed');
      }, 30000);
    }
  }
}

// Real video processor class
class VideoProcessor {
  async downloadVideo(videoUrl, videoId, onProgress) {
    console.log(`📥 Starting REAL download for: ${videoId}`);
    
    const outputPath = path.join(downloadDir, `${videoId}.%(ext)s`);
    
    try {
      console.log(`📍 Downloading from: ${videoUrl}`);
      console.log(`📁 Output pattern: ${outputPath}`);
      
      // Use async/await instead of callbacks to avoid path issues
      const result = await youtubeDl(videoUrl, {
        output: outputPath,
        format: 'best[height<=720]',
        extractAudio: false,
        writeInfoJson: true,
        cwd: downloadDir // Set working directory to avoid path issues
      });
      
      console.log(`📊 Download result:`, result);
      console.log(`✅ Download completed: ${videoId}`);
      
      // List all files in downloads directory
      const allFiles = fs.readdirSync(downloadDir);
      console.log(`📂 All files in downloads:`, allFiles);
      
      // Find the actual downloaded file (youtube-dl replaces %(ext)s with actual extension)
      const files = allFiles.filter(file => file.startsWith(videoId));
      console.log(`🔍 Files matching ${videoId}:`, files);
      
      if (files.length === 0) {
        throw new Error(`Downloaded file not found for ${videoId}. Available files: ${allFiles.join(', ')}`);
      }
      
      const actualPath = path.join(downloadDir, files[0]);
      console.log(`📁 Actual file path: ${actualPath}`);
      return actualPath;
      
    } catch (error) {
      console.error(`❌ Download failed for ${videoId}:`, error);
      throw error;
    }
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

// Real Gemini analyzer class for direct YouTube URL analysis
class GeminiAnalyzer {
  async analyzeYouTubeURL(videoUrl, title, channel) {
    console.log(`🤖 Starting REAL Gemini analysis for: ${title}`);
    
    const prompt = `
Analysez le contenu vidéo suivant pour un contexte sécuritaire congolais (République Démocratique du Congo). Portez une attention particulière aux langues locales, références culturelles, préoccupations sécuritaires régionales, ET SPÉCIALEMENT LA DÉPRAVATION DES MŒURS dans le contenu musical:

**URL de la vidéo**: ${videoUrl}
**Titre**: ${title}
**Chaîne**: ${channel}

Analysez cette vidéo YouTube et fournissez une analyse complète en JSON avec le format exact suivant:

{
  "summary": "Résumé détaillé du contenu en français",
  "keyPoints": [
    "Point clé 1",
    "Point clé 2", 
    "Point clé 3"
  ],
  "sentiment": "positive|negative|neutral",
  "topics": [
    "Sujet 1",
    "Sujet 2"
  ],
  "risks": [
    "Risque identifié 1",
    "Risque identifié 2"
  ],
  "credibilityScore": 75,
  "misinformationFlags": [
    "Signal de désinformation si applicable"
  ],
  "contentType": "Type de contenu (musique, politique, actualités, etc.)",
  "detectedLanguages": ["français", "lingala", "swahili"],
  "hasHateSpeech": false,
  "hasViolenceIncitation": false,
  "hasInappropriateContent": false,
  "riskLevel": "low|medium|high",
  "congoleseContext": {
    "politicalContent": true,
    "tribalReferences": false,
    "economicConcerns": true,
    "securityThreats": false,
    "regionalReferences": ["Kinshasa", "Lubumbashi"]
  },
  "linguisticAnalysis": {
    "lingalaContent": true,
    "frenchContent": true,
    "swahiliContent": false,
    "mixedLanguageUse": true
  },
  "moralContentAnalysis": {
    "hasImmoralContent": false,
    "sexualInappropriateness": false,
    "hiddenSexualReferences": false,
    "attacksOnModesty": false,
    "moralDepravation": false,
    "inappropriateVisuals": false,
    "sexualizedDancing": false,
    "explicitLanguage": false
  }
}

ANALYSEZ SPÉCIFIQUEMENT POUR:

**CONTENU POLITIQUE ET SÉCURITAIRE:**
- Discours de haine ou incitation à la violence
- Références ethniques, tribales ou régionales sensibles
- Préoccupations économiques ou politiques
- Menaces sécuritaires et désinformation

**DÉPRAVATION DES MŒURS (TRÈS IMPORTANT POUR LA MUSIQUE CONGOLAISE):**
- **Attente à la pudeur**: Contenu qui offense la décence publique
- **Références sexuelles cachées**: Messages à double sens, métaphores sexuelles
- **Dépravation morale**: Promotion de comportements immoraux
- **Contenu sexualisé**: Danses provocantes, positions suggestives
- **Langage explicite**: Expressions vulgaires ou sexuellement explicites
- **Messages sublimininaux**: Incitations cachées à des comportements inappropriés
- **Objectification**: Réduction des personnes à des objets sexuels

**POUR LA MUSIQUE CONGOLAISE, ATTENTION À:**
- Les paroles en Lingala/Swahili avec des références sexuelles déguisées
- Les danses et chorégraphies inappropriées
- Les messages qui corrompent la jeunesse
- Le contenu qui va contre les valeurs morales traditionnelles
- Les références à la prostitution, l'adultère, la promiscuité

**ÉVALUATION DE RISQUE:**
- HIGH: Contenu explicitement immoral, références sexuelles directes, dépravation évidente
- MEDIUM: Messages à double sens, danses suggestives, contenu questionnable
- LOW: Contenu approprié, respectueux des valeurs morales

Retournez UNIQUEMENT le JSON, sans texte supplémentaire.`;

    try {
      const model = genai.getGenerativeModel({ model: 'gemini-2.5-pro' });
      
      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [
            { text: prompt },
            { 
              fileData: {
                mimeType: 'video/*',
                fileUri: videoUrl
              }
            }
          ]
        }]
      });

      const response = result.response.text();
      console.log(`🔍 Gemini AI response:`, response);

      // Parse JSON response - handle both plain JSON and markdown wrapped JSON
      let jsonString = response;
      
      // Remove markdown code blocks if present
      if (response.includes('```json')) {
        const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
          jsonString = jsonMatch[1];
        }
      } else {
        // Try to extract JSON object
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonString = jsonMatch[0];
        }
      }
      
      try {
        return JSON.parse(jsonString.trim());
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError);
        throw new Error('Failed to parse Gemini response');
      }
      
    } catch (error) {
      console.error(`❌ Gemini analysis failed:`, error);
      throw error;
    }
  }
}

// Initialize services
const youtubeService = new YouTubeAutomation();
const videoProcessor = new VideoProcessor();
const aiAnalyzer = new AIAnalyzer();
const geminiAnalyzer = new GeminiAnalyzer();

// API Routes
app.post('/api/youtube/search', async (req, res) => {
  try {
    const { query, filtersEnabled = true } = req.body;
    console.log(`🔍 Search request: ${query} (filters: ${filtersEnabled ? 'ON' : 'OFF'})`);
    
    const result = await youtubeService.searchVideos(query, filtersEnabled);
    res.json(result);
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

// Serve screenshots
app.use('/screenshots', express.static(path.join(__dirname, 'screenshots')));

// Gemini analysis endpoint (direct YouTube URL)
app.post('/api/video/gemini-analyze', async (req, res) => {
  try {
    const { videoUrl, title, channel } = req.body;
    console.log(`🤖 Gemini analysis request for: ${title}`);
    
    const analysis = await geminiAnalyzer.analyzeYouTubeURL(videoUrl, title, channel);
    
    res.json({
      status: 'completed',
      analysis: analysis,
      method: 'gemini'
    });
  } catch (error) {
    console.error('Gemini analysis API error:', error);
    res.status(500).json({ 
      status: 'error',
      error: error.message,
      method: 'gemini'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 REAL Backend server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;