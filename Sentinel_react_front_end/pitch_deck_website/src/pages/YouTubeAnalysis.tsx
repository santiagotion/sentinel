import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Youtube, Brain, Clock, Calendar, AlertCircle, Shield, Monitor } from 'lucide-react';
import { YouTubeVideo } from '../services/youtubeService';
import { AnalysisResult } from '../services/aiAnalysisService';
import { BrowserViewer } from '../components/BrowserViewer';
import { VideoStatusTracker, VideoStatus } from '../components/VideoStatusTracker';

export function YouTubeAnalysis() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<YouTubeVideo[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  // API key is now handled by backend
  
  // New state for enhanced features
  const [showBrowserViewer, setShowBrowserViewer] = useState(false);
  const [videoStatuses, setVideoStatuses] = useState<VideoStatus[]>([]);
  const [selectedVideoForDetails, setSelectedVideoForDetails] = useState<string | null>(null);


  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setVideos([]);
    setSelectedVideos([]);
    setAnalysisResults([]);
    setVideoStatuses([]);
    setShowBrowserViewer(true);
    
    try {
      console.log('🔍 Calling REAL backend API...');
      
      // Call REAL backend API
      const response = await fetch('http://localhost:3001/api/youtube/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const searchResults = await response.json();
      console.log('✅ Received REAL search results:', searchResults);
      
      setVideos(searchResults);
    } catch (error) {
      console.error('❌ Search error:', error);
      alert('Erreur: Assurez-vous que le serveur backend est démarré sur le port 3001');
      setVideos([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleVideoSelect = (video: YouTubeVideo) => {
    if (selectedVideos.length < 2 && !selectedVideos.find(v => v.id === video.id)) {
      setSelectedVideos([...selectedVideos, video]);
    }
  };

  const handleRemoveVideo = (videoId: string) => {
    setSelectedVideos(selectedVideos.filter(v => v.id !== videoId));
  };

  const handleAnalyze = async () => {
    if (selectedVideos.length === 0) return;
    
    setIsAnalyzing(true);
    
    // Initialize video statuses
    const initialStatuses: VideoStatus[] = selectedVideos.map(video => ({
      id: video.id,
      title: video.title,
      channel: video.channel,
      url: video.url,
      phase: 'waiting',
      downloadProgress: 0,
      processingStep: 'En attente de traitement...'
    }));
    setVideoStatuses(initialStatuses);
    
    try {
      console.log('🚀 Starting REAL video processing...');
      
      // Process each video through REAL backend
      const downloadPromises = selectedVideos.map(async (video) => {
        try {
          console.log(`📥 Starting download for: ${video.title}`);
          
          // Start REAL download and processing
          const response = await fetch('http://localhost:3001/api/video/download', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              videoId: video.id,
              url: video.url,
              title: video.title,
              channel: video.channel
            })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const { downloadId } = await response.json();
          console.log(`✅ Download started: ${downloadId}`);
          
          // Poll for progress updates
          return pollProgress(downloadId, video.id);
          
        } catch (error) {
          console.error(`❌ Error processing video ${video.id}:`, error);
          
          // Update status: error
          setVideoStatuses(prev => prev.map(status => 
            status.id === video.id ? { 
              ...status, 
              phase: 'error', 
              error: 'Erreur de connexion backend' 
            } : status
          ));
          
          return null;
        }
      });

      // Wait for all videos to complete
      const completedAnalyses = await Promise.all(downloadPromises);
      
      // Filter out failed analyses and set results
      const validAnalyses = completedAnalyses.filter(Boolean);
      setAnalysisResults(validAnalyses);
      
      console.log('🎉 All REAL analyses completed!');
      
    } catch (error) {
      console.error('❌ Analysis error:', error);
      alert('Erreur: Problème de connexion avec le backend');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Poll progress function for REAL backend
  const pollProgress = async (downloadId: string, videoId: string): Promise<AnalysisResult | null> => {
    return new Promise((resolve) => {
      const interval = setInterval(async () => {
        try {
          // Get progress from REAL backend
          const progressResponse = await fetch(`http://localhost:3001/api/video/progress/${downloadId}`);
          
          if (!progressResponse.ok) {
            clearInterval(interval);
            resolve(null);
            return;
          }

          const progressData = await progressResponse.json();
          console.log(`📊 Progress for ${videoId}:`, progressData);
          
          // Update UI with REAL progress
          setVideoStatuses(prev => prev.map(status => 
            status.id === videoId ? {
              ...status,
              phase: progressData.phase || progressData.status,
              downloadProgress: progressData.progress || 0,
              processingStep: progressData.processingStep || 'En traitement...',
              quickSummary: progressData.quickSummary,
              error: progressData.error
            } : status
          ));

          // Check if completed
          if (progressData.status === 'completed') {
            clearInterval(interval);
            
            // Get REAL analysis results
            try {
              const analysisResponse = await fetch(`http://localhost:3001/api/video/analysis/${downloadId}`);
              if (analysisResponse.ok) {
                const analysisData = await analysisResponse.json();
                console.log(`✅ Analysis completed for ${videoId}:`, analysisData);
                resolve(analysisData);
              } else {
                resolve(null);
              }
            } catch (error) {
              console.error('Error getting analysis:', error);
              resolve(null);
            }
          }
          
          // Check if failed
          if (progressData.status === 'error') {
            clearInterval(interval);
            console.error(`❌ Processing failed for ${videoId}:`, progressData.error);
            resolve(null);
          }
          
        } catch (error) {
          console.error('Error polling progress:', error);
          clearInterval(interval);
          resolve(null);
        }
      }, 2000); // Poll every 2 seconds
      
      // Timeout after 10 minutes
      setTimeout(() => {
        clearInterval(interval);
        console.log('⏰ Timeout for video processing');
        resolve(null);
      }, 600000);
    });
  };

  const handleVideoOpen = (videoId: string, url: string) => {
    // Open video in new tab (simulated)
    console.log(`Opening video ${videoId} in new tab: ${url}`);
    // In real implementation: window.open(url, '_blank');
  };

  const handleShowDetails = (videoId: string) => {
    setSelectedVideoForDetails(videoId);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Youtube className="w-12 h-12 text-congo-blue" />
            <Brain className="w-12 h-12 text-congo-blue" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            YouTube Content Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Search, analyze, and understand YouTube content to protect against misinformation and monitor trends
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Search YouTube Content
          </h2>
          <div className="flex space-x-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher du contenu (ex: politique RDC, actualités Kinshasa)..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-congo-blue focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <motion.button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="px-8 py-3 bg-congo-blue text-white rounded-lg font-semibold hover:bg-congo-blue-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span>{isSearching ? 'Recherche...' : 'Rechercher'}</span>
            </motion.button>
            <motion.button
              onClick={() => setShowBrowserViewer(!showBrowserViewer)}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Monitor className="w-5 h-5" />
              <span>Browser</span>
            </motion.button>
          </div>
          
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Duration: 4-20 minutes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Upload: Today only</span>
            </div>
          </div>
        </motion.div>

        {/* Backend Status Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-green-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-2">
                Système d'Analyse RÉEL
              </h3>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Utilise Playwright pour l'automatisation YouTube réelle, télécharge les vidéos avec youtube-dl, 
                extrait l'audio avec FFmpeg, transcrit avec Whisper API, et analyse avec GPT-4. 
                Aucun contenu simulé - tout est authentique.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Browser Viewer */}
        <BrowserViewer
          isActive={showBrowserViewer && isSearching}
          searchQuery={searchQuery}
          onVideoOpen={handleVideoOpen}
        />

        {/* Video Status Tracker */}
        <VideoStatusTracker
          videos={videoStatuses}
          onShowDetails={handleShowDetails}
        />

        {/* Search Results */}
        {videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Search Results
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-4 border-2 cursor-pointer transition-all ${
                    selectedVideos.find(v => v.id === video.id)
                      ? 'border-congo-blue bg-congo-blue/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-congo-blue/50'
                  }`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <Youtube className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {video.channel}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">{video.duration}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{video.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Selected Videos */}
        {selectedVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Selected Videos ({selectedVideos.length}/2)
              </h2>
              <motion.button
                onClick={handleAnalyze}
                disabled={isAnalyzing || selectedVideos.length === 0}
                className="px-6 py-2 bg-congo-blue text-white rounded-lg font-semibold hover:bg-congo-blue-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAnalyzing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <Brain className="w-4 h-4" />
                )}
                <span>{isAnalyzing ? 'Analyzing...' : 'Analyze'}</span>
              </motion.button>
            </div>
            
            <div className="space-y-3">
              {selectedVideos.map((video) => (
                <div
                  key={video.id}
                  className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-3"
                >
                  <div className="flex items-center space-x-3">
                    <Youtube className="w-5 h-5 text-congo-blue" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {video.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {video.channel} • {video.duration}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveVideo(video.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analysis Results */}
        {analysisResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Analysis Results
            </h2>
            
            {analysisResults.map((result, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Youtube className="w-5 h-5 text-congo-blue" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Video {index + 1}: {selectedVideos[index]?.title}
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Summary</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{result.summary}</p>
                    
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Points</h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      {result.keyPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Credibility Score</h4>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              result.credibilityScore >= 70 ? 'bg-green-500' :
                              result.credibilityScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${result.credibilityScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {result.credibilityScore}/100
                        </span>
                      </div>
                    </div>

                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Topics</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-congo-blue/20 text-congo-blue rounded-full text-sm"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Risk Assessment</h4>
                    <div className="space-y-2 mb-4">
                      {result.risks.map((risk, i) => (
                        <div key={i} className="flex items-start space-x-2 text-amber-600">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{risk}</span>
                        </div>
                      ))}
                    </div>

                    {result.misinformationFlags.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Misinformation Flags</h4>
                        <div className="space-y-2">
                          {result.misinformationFlags.map((flag, i) => (
                            <div key={i} className="flex items-start space-x-2 text-red-600">
                              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{flag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Enhanced Detailed Analysis Modal */}
        <AnimatePresence>
          {selectedVideoForDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedVideoForDetails(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {(() => {
                  const analysisIndex = selectedVideos.findIndex(v => v.id === selectedVideoForDetails);
                  const analysis = analysisResults[analysisIndex];
                  const video = selectedVideos[analysisIndex];
                  
                  if (!analysis || !video) return null;
                  
                  return (
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Analyse Détaillée
                        </h2>
                        <button
                          onClick={() => setSelectedVideoForDetails(null)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          ×
                        </button>
                      </div>

                      {/* Video Info */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {video.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Chaîne: {video.channel} • Durée: {video.duration}
                        </p>
                      </div>

                      {/* Enhanced Analysis Grid */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                          {/* Summary */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Résumé</h4>
                            <p className="text-gray-600 dark:text-gray-400">{analysis.summary}</p>
                          </div>

                          {/* Key Points */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Points Clés</h4>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                              {analysis.keyPoints.map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Linguistic Analysis */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Analyse Linguistique</h4>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                <strong>Langues détectées:</strong> {analysis.detectedLanguages.join(', ')}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {analysis.linguisticAnalysis.frenchContent && (
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Français</span>
                                )}
                                {analysis.linguisticAnalysis.lingalaContent && (
                                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Lingala</span>
                                )}
                                {analysis.linguisticAnalysis.swahiliContent && (
                                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Swahili</span>
                                )}
                                {analysis.linguisticAnalysis.mixedLanguageUse && (
                                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Usage Mixte</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          {/* Risk Assessment */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Évaluation des Risques</h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Niveau de Risque:</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  analysis.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                                  analysis.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {analysis.riskLevel.toUpperCase()}
                                </span>
                              </div>

                              {analysis.hasHateSpeech && (
                                <div className="flex items-center space-x-2 text-red-600">
                                  <AlertCircle className="w-4 h-4" />
                                  <span className="text-sm">Discours de haine détecté</span>
                                </div>
                              )}

                              {analysis.hasViolenceIncitation && (
                                <div className="flex items-center space-x-2 text-red-600">
                                  <Shield className="w-4 h-4" />
                                  <span className="text-sm">Incitation à la violence détectée</span>
                                </div>
                              )}

                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Risques identifiés:</h5>
                                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                                  {analysis.risks.map((risk, i) => (
                                    <li key={i}>{risk}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Congolese Context */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Contexte Congolais</h4>
                            <div className="space-y-2">
                              {analysis.congoleseContext.politicalContent && (
                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-2 mb-1">
                                  Contenu Politique
                                </span>
                              )}
                              {analysis.congoleseContext.economicConcerns && (
                                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs mr-2 mb-1">
                                  Préoccupations Économiques
                                </span>
                              )}
                              {analysis.congoleseContext.tribalReferences && (
                                <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs mr-2 mb-1">
                                  Références Tribales
                                </span>
                              )}
                              {analysis.congoleseContext.securityThreats && (
                                <span className="inline-block px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs mr-2 mb-1">
                                  Menaces Sécuritaires
                                </span>
                              )}
                              
                              {analysis.congoleseContext.regionalReferences.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    <strong>Références régionales:</strong>
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {analysis.congoleseContext.regionalReferences.map((region, i) => (
                                      <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs">
                                        {region}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Credibility Score */}
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Score de Crédibilité</h4>
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div 
                                  className={`h-3 rounded-full ${
                                    analysis.credibilityScore >= 70 ? 'bg-green-500' :
                                    analysis.credibilityScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${analysis.credibilityScore}%` }}
                                />
                              </div>
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {analysis.credibilityScore}/100
                              </span>
                            </div>
                            
                            {analysis.misinformationFlags.length > 0 && (
                              <div className="mt-3">
                                <h5 className="font-medium text-gray-900 dark:text-white mb-2">Signalements de désinformation:</h5>
                                <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                                  {analysis.misinformationFlags.map((flag, i) => (
                                    <li key={i}>{flag}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}