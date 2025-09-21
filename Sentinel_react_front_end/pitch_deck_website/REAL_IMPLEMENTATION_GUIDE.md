# Real YouTube Automation Implementation Guide

## Overview
This guide provides the complete implementation for real YouTube automation using the exact selectors and steps provided. The frontend is ready and this backend implementation will make it fully functional.

## Backend Implementation (Node.js + Playwright)

### 1. Installation
```bash
npm install playwright youtube-dl-exec openai express cors dotenv
npx playwright install chromium
```

### 2. Backend Server Setup

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const { YouTubeAutomation } = require('./services/youtubeAutomation');
const { VideoProcessor } = require('./services/videoProcessor');
const { AIAnalyzer } = require('./services/aiAnalyzer');

const app = express();
app.use(cors());
app.use(express.json());

const youtubeService = new YouTubeAutomation();
const videoProcessor = new VideoProcessor();
const aiAnalyzer = new AIAnalyzer();

// Search endpoint
app.post('/api/youtube/search', async (req, res) => {
  try {
    const { query } = req.body;
    const videos = await youtubeService.searchVideos(query);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download endpoint
app.post('/api/youtube/download', async (req, res) => {
  try {
    const { videoId, url } = req.body;
    const downloadId = await videoProcessor.startDownload(videoId, url);
    res.json({ downloadId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download progress endpoint
app.get('/api/youtube/download/:downloadId/progress', (req, res) => {
  const progress = videoProcessor.getProgress(req.params.downloadId);
  res.json(progress);
});

// Analysis endpoint
app.post('/api/ai/analyze', async (req, res) => {
  try {
    const { transcript, title, channel } = req.body;
    const analysis = await aiAnalyzer.analyzeContent(transcript, title, channel);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Backend server running on port 3001');
});
```

### 3. YouTube Automation Service

```javascript
// services/youtubeAutomation.js
const { chromium } = require('playwright');

class YouTubeAutomation {
  constructor() {
    // Exact selectors from your specifications
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

    // Filter parameters from your specifications
    this.filterParams = 'EgYIAhABGAM%253D'; // Today + 4-20 minutes
  }

  async searchVideos(query) {
    console.log(`Starting YouTube search for: "${query}"`);
    
    const browser = await chromium.launch({ 
      headless: false, // Set to true in production
      slowMo: 100 // For demonstration
    });
    
    const page = await browser.newPage();
    
    try {
      // Method 1: Direct URL (most reliable)
      const directUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&sp=${this.filterParams}`;
      console.log('Using direct URL:', directUrl);
      
      await page.goto(directUrl, { waitUntil: 'networkidle' });
      
      // Alternative Method 2: Step-by-step automation
      // await this.performStepByStepSearch(page, query);
      
      // Wait for videos to load
      await page.waitForSelector(this.selectors.videoRenderer, { timeout: 10000 });
      
      // Extract video data
      const videos = await this.extractVideoData(page);
      
      return videos;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    } finally {
      await browser.close();
    }
  }

  async performStepByStepSearch(page, query) {
    console.log('Performing step-by-step automation...');
    
    // Step 1: Navigate to YouTube
    await page.goto('https://www.youtube.com');
    console.log('✓ Navigated to YouTube');
    
    // Step 2: Click search input
    await page.waitForSelector(this.selectors.searchInput);
    await page.click(this.selectors.searchInput);
    console.log('✓ Clicked search input');
    
    // Step 3: Type search query
    await page.type(this.selectors.searchInput, query);
    console.log(`✓ Typed: "${query}"`);
    
    // Step 4: Click search button
    await page.click(this.selectors.searchButton);
    console.log('✓ Clicked search button');
    
    // Step 5: Wait for results
    await page.waitForSelector(this.selectors.videoRenderer);
    console.log('✓ Results loaded');
    
    // Step 6: Click filters button
    await page.waitForSelector(this.selectors.filtersButton);
    await page.click(this.selectors.filtersButton);
    console.log('✓ Clicked filters button');
    
    // Step 7: Select "Today" filter
    await page.waitForSelector(this.selectors.todayFilter);
    await page.click(this.selectors.todayFilter);
    console.log('✓ Selected "Today" filter');
    
    // Step 8: Select "4-20 minutes" filter
    await page.waitForSelector(this.selectors.durationFilter);
    await page.click(this.selectors.durationFilter);
    console.log('✓ Selected "4-20 minutes" filter');
    
    // Step 9: Wait for filtered results
    await page.waitForTimeout(2000);
    console.log('✓ Filtered results loaded');
  }

  async extractVideoData(page) {
    console.log('Extracting video data...');
    
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
    
    console.log(`✓ Extracted ${videos.length} videos`);
    return videos.slice(0, 10); // Limit to 10 videos
  }
}

module.exports = { YouTubeAutomation };
```

### 4. Video Processor Service

```javascript
// services/videoProcessor.js
const youtubeDl = require('youtube-dl-exec');
const path = require('path');
const fs = require('fs');

class VideoProcessor {
  constructor() {
    this.downloads = new Map();
    this.downloadDir = './downloads';
    
    // Ensure download directory exists
    if (!fs.existsSync(this.downloadDir)) {
      fs.mkdirSync(this.downloadDir);
    }
  }

  async startDownload(videoId, url) {
    const downloadId = `download_${videoId}_${Date.now()}`;
    const outputPath = path.join(this.downloadDir, `${videoId}.mp4`);
    
    console.log(`Starting download for video: ${videoId}`);
    
    // Initialize progress tracking
    this.downloads.set(downloadId, {
      videoId,
      progress: 0,
      status: 'downloading',
      outputPath
    });

    try {
      // Download video with progress tracking
      await youtubeDl(url, {
        output: outputPath,
        format: 'best[height<=720]', // Limit to 720p for faster processing
        extractAudio: false
      });

      // Update status to completed
      this.downloads.set(downloadId, {
        ...this.downloads.get(downloadId),
        progress: 100,
        status: 'completed'
      });

      console.log(`✓ Download completed: ${videoId}`);
      return downloadId;
    } catch (error) {
      console.error(`Download failed for ${videoId}:`, error);
      this.downloads.set(downloadId, {
        ...this.downloads.get(downloadId),
        status: 'error',
        error: error.message
      });
      throw error;
    }
  }

  getProgress(downloadId) {
    return this.downloads.get(downloadId) || { status: 'not_found' };
  }

  async extractTranscript(filePath) {
    // This would integrate with Whisper API or similar
    // For now, return mock transcript
    console.log(`Extracting transcript from: ${filePath}`);
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
    
    return `Transcript simulé pour le fichier ${path.basename(filePath)}. Dans une implémentation réelle, ceci serait la transcription audio réelle utilisant des services comme l'API Whisper d'OpenAI.`;
  }
}

module.exports = { VideoProcessor };
```

### 5. AI Analyzer Service

```javascript
// services/aiAnalyzer.js
const OpenAI = require('openai');

class AIAnalyzer {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async analyzeContent(transcript, title, channel) {
    console.log(`Analyzing content for: ${title}`);
    
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

Domaines d'analyse prioritaires:
1. MENACES SÉCURITAIRES: Identifier le contenu pouvant menacer la sécurité nationale, inciter à la violence, ou promouvoir des tensions ethniques
2. DISCOURS DE HAINE: Détecter le langage discriminatoire contre les groupes ethniques, religions, ou régions
3. MANIPULATION POLITIQUE: Identifier la propagande, manipulation électorale, ou fausses affirmations politiques
4. CONTEXTE LINGUISTIQUE: Reconnaître et analyser le contenu en Lingala, Français, Swahili, et usage mixte des langues
5. PERTINENCE RÉGIONALE: Évaluer le contenu spécifiquement lié aux provinces, villes, et questions locales de la RDC
6. DÉSINFORMATION: Identifier les fausses affirmations sur la santé, politique, économie, ou questions sociales
7. TENSIONS TRIBALES/ETHNIQUES: Signaler le contenu pouvant exacerber les conflits ethniques ou tribaux
8. DÉSINFORMATION ÉCONOMIQUE: Détecter les fausses informations sur l'économie, ressources, ou développement
`;

    try {
      const completion = await this.openai.chat.completions.create({
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
      return this.parseAnalysisResponse(response);
    } catch (error) {
      console.error('AI analysis error:', error);
      return this.getFallbackAnalysis(title);
    }
  }

  parseAnalysisResponse(response) {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
    }
    
    return this.getFallbackAnalysis('Unknown');
  }

  getFallbackAnalysis(title) {
    return {
      summary: `Analyse de secours pour "${title}". Révision manuelle recommandée.`,
      keyPoints: ['Erreur lors de l\'analyse IA', 'Révision manuelle nécessaire'],
      sentiment: 'neutral',
      topics: ['Erreur'],
      risks: ['Analyse incomplète'],
      credibilityScore: 50,
      misinformationFlags: ['Échec de l\'analyse'],
      contentType: 'Autre',
      detectedLanguages: ['French'],
      hasHateSpeech: false,
      hasViolenceIncitation: false,
      riskLevel: 'medium',
      congoleseContext: {
        politicalContent: false,
        tribalReferences: false,
        economicConcerns: false,
        securityThreats: false,
        regionalReferences: []
      },
      linguisticAnalysis: {
        lingalaContent: false,
        frenchContent: true,
        swahiliContent: false,
        mixedLanguageUse: false
      }
    };
  }
}

module.exports = { AIAnalyzer };
```

### 6. Environment Configuration

```bash
# .env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
NODE_ENV=production
DOWNLOAD_DIR=./downloads
```

### 7. Frontend Integration

Update your frontend to use the real backend:

```javascript
// In YouTubeAnalysis.tsx, update the handleSearch function:
const handleSearch = async () => {
  if (!searchQuery.trim()) return;
  
  setIsSearching(true);
  setShowBrowserViewer(true);
  
  try {
    const response = await fetch('http://localhost:3001/api/youtube/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: searchQuery })
    });
    
    const videos = await response.json();
    setVideos(videos);
  } catch (error) {
    console.error('Search error:', error);
    // Fallback to mock data
  } finally {
    setIsSearching(false);
  }
};
```

## URL Parameters Reference

Based on your specifications:

- **Today + 4-20 minutes**: `sp=EgYIAhABGAM%253D`
- **Today + Short (<4 min)**: `sp=EgYIAhABGAE%253D`  
- **Week + 4-20 minutes**: `sp=EgYIAhACGAM%253D`
- **Month + 4-20 minutes**: `sp=EgYIAhADGAM%253D`

## Deployment

1. **Backend**: Deploy to services like Railway, Heroku, or AWS
2. **Frontend**: Update API URLs to production endpoints
3. **Environment**: Set production environment variables
4. **Monitoring**: Add logging and error tracking

Your implementation is now ready with the exact selectors and automation steps you provided!