import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Youtube, Brain, Clock, Calendar, AlertCircle, Shield, Monitor, FileVideo, Filter } from 'lucide-react';
import { YouTubeVideo } from '../../services/youtubeService';
import { AnalysisResult } from '../../services/aiAnalysisService';
import { BrowserViewer } from '../ui/BrowserViewer';
import { VideoStatusTracker, VideoStatus } from '../ui/VideoStatusTracker';

export function YouTubeAnalysisScreen() {
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
  const [browserScreenshot, setBrowserScreenshot] = useState<string | null>(null);
  const [analysisMethod, setAnalysisMethod] = useState<'openai' | 'gemini'>('gemini');
  const [showStatusTracker, setShowStatusTracker] = useState(false);
  const [filtersEnabled, setFiltersEnabled] = useState(true);


  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setVideos([]);
    setSelectedVideos([]);
    setAnalysisResults([]);
    setVideoStatuses([]);
    
    try {
      console.log('🔍 Calling REAL backend API...');
      
      // Call REAL backend API
      const response = await fetch('http://localhost:3002/api/youtube/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          filtersEnabled: filtersEnabled
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const searchResults = await response.json();
      console.log('✅ Received REAL search results:', searchResults);
      
      // Handle new response format with videos and screenshot
      if (searchResults.videos) {
        setVideos(searchResults.videos);
        setBrowserScreenshot(searchResults.screenshot);
      } else {
        // Fallback for old format
        setVideos(searchResults);
      }
    } catch (error) {
      console.error('❌ Search error:', error);
      alert('Erreur: Assurez-vous que le serveur backend est démarré sur le port 3002');
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
    
    // Initialize video statuses based on analysis method
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
      console.log(`🚀 Starting Gemini video processing...`);
      
      // Gemini direct analysis - no download needed
      const analysisPromises = selectedVideos.map(async (video) => {
        try {
          // Update status: analyzing
          setVideoStatuses(prev => prev.map(status => 
            status.id === video.id ? { 
              ...status, 
              phase: 'analyzing', 
              processingStep: 'Analyse avec Gemini AI...' 
            } : status
          ));
          
          const analysis = await analyzeWithGemini(video);
          
          // Update status: completed
          setVideoStatuses(prev => prev.map(status => 
            status.id === video.id ? { 
              ...status, 
              phase: 'completed', 
              processingStep: 'Analyse terminée'
            } : status
          ));
          
          return analysis;
        } catch (error) {
          console.error(`❌ Gemini analysis failed for ${video.id}:`, error);
          setVideoStatuses(prev => prev.map(status => 
            status.id === video.id ? { 
              ...status, 
              phase: 'error', 
              error: 'Erreur d\'analyse' 
            } : status
          ));
          return null;
        }
      });
      
      // Wait for all Gemini analyses to complete
      const completedAnalyses = await Promise.all(analysisPromises);
      const validAnalyses = completedAnalyses.filter((result): result is AnalysisResult => result !== null);
      setAnalysisResults(validAnalyses);
      
      console.log(`🎉 All analyses completed!`);
      
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
          const progressResponse = await fetch(`http://localhost:3002/api/video/progress/${downloadId}`);
          
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
              const analysisResponse = await fetch(`http://localhost:3002/api/video/analysis/${downloadId}`);
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

  // Gemini analysis function (direct YouTube URL)
  const analyzeWithGemini = async (video: YouTubeVideo): Promise<AnalysisResult | null> => {
    try {
      console.log(`🤖 Starting Gemini analysis for: ${video.title}`);
      
      const response = await fetch('http://localhost:3002/api/video/gemini-analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoUrl: video.url,
          title: video.title,
          channel: video.channel
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`✅ Gemini analysis completed for ${video.id}:`, result);
      
      return result.analysis;
    } catch (error) {
      console.error('Error with Gemini analysis:', error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Youtube className="w-12 h-12 text-congo-blue" />
            <Brain className="w-12 h-12 text-congo-blue" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            YouTube Content Analysis
          </h1>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN - Video Search */}
          <div className="space-y-6">
            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Search YouTube Content
              </h2>
              <div className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher du contenu..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-congo-blue focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <motion.button
                  onClick={handleSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  className="px-6 py-3 bg-congo-blue text-white rounded-lg font-semibold hover:bg-congo-blue-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSearching ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>{isSearching ? 'Recherche...' : 'Rechercher'}</span>
                </motion.button>
              </div>
              
              <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                {filtersEnabled ? (
                  <>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>4-20 min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Today only</span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-1 text-orange-600">
                    <Filter className="w-4 h-4" />
                    <span>All videos</span>
                  </div>
                )}
                <button
                  onClick={() => setFiltersEnabled(!filtersEnabled)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                    filtersEnabled 
                      ? 'text-congo-blue hover:bg-congo-blue/10' 
                      : 'text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/20'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span>{filtersEnabled ? 'Disable Filters' : 'Enable Filters'}</span>
                </button>
                <button
                  onClick={() => setShowBrowserViewer(!showBrowserViewer)}
                  className="flex items-center space-x-1 text-congo-blue hover:text-congo-blue-dark"
                >
                  <Monitor className="w-4 h-4" />
                  <span>Browser</span>
                </button>
                <button
                  onClick={() => setShowStatusTracker(!showStatusTracker)}
                  className={`flex items-center space-x-1 ${showStatusTracker ? 'text-congo-blue' : 'text-gray-500 hover:text-congo-blue'}`}
                >
                  <FileVideo className="w-4 h-4" />
                  <span>Logs</span>
                </button>
              </div>
            </motion.div>

            {/* Search Results */}
            {videos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Search Results ({videos.length})
                </h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
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
                        <div className="w-20 h-14 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center flex-shrink-0">
                          {video.thumbnailUrl ? (
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <Youtube className="w-5 h-5 text-gray-500" style={{display: video.thumbnailUrl ? 'none' : 'block'}} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2">
                            {video.title}
                          </h4>
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
          </div>

          {/* RIGHT COLUMN - Analysis Workspace */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Analysis Workspace
            </h3>

            {/* Analysis Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              {/* Analyze Button */}
              <motion.button
                onClick={handleAnalyze}
                disabled={isAnalyzing || selectedVideos.length === 0}
                className="w-full px-6 py-3 bg-congo-blue text-white rounded-lg font-semibold hover:bg-congo-blue-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    <span>Analyzing ({selectedVideos.length} videos)...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    <span>Analyze {selectedVideos.length} Video{selectedVideos.length !== 1 ? 's' : ''}</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Selected Videos Queue */}
            {selectedVideos.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Selected Videos ({selectedVideos.length}/2)
                  </h4>
                </div>
                <div className="p-2 space-y-2 max-h-40 overflow-y-auto">
                  {selectedVideos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-8 bg-gray-200 dark:bg-gray-600 rounded overflow-hidden flex items-center justify-center flex-shrink-0">
                          {video.thumbnailUrl ? (
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Youtube className="w-3 h-3 text-gray-500" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                            {video.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {video.channel} • {video.duration}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveVideo(video.id)}
                        className="text-red-500 hover:text-red-700 p-1 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analysis Results Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 min-h-[400px]">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Analysis Results
                </h4>
              </div>
              
              <div className="p-4">
                {analysisResults.length === 0 ? (
                  <div className="text-center py-12">
                    <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {selectedVideos.length === 0 
                        ? "Select videos from the left to analyze them"
                        : "Click 'Analyze' to start the analysis"
                      }
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 max-h-[600px] overflow-y-auto">
                    {analysisResults.map((result, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-congo-blue bg-congo-blue/5 rounded-lg p-4"
                      >
                        {/* Video Header */}
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
                            {selectedVideos[index]?.thumbnailUrl ? (
                              <img 
                                src={selectedVideos[index].thumbnailUrl} 
                                alt={selectedVideos[index]?.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Youtube className="w-4 h-4 text-gray-500 m-auto" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                              {selectedVideos[index]?.title || `Video ${index + 1}`}
                            </h5>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {selectedVideos[index]?.channel} • {selectedVideos[index]?.duration}
                            </p>
                          </div>
                        </div>

                        {/* Quick Status */}
                        <div className="flex items-center justify-between mb-4 p-3 bg-white dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              result.riskLevel === 'high' ? 'bg-red-500' :
                              result.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              Risk: {result.riskLevel.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Credibility:</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              {result.credibilityScore}%
                            </span>
                          </div>
                        </div>

                        {/* Summary */}
                        <div className="mb-4">
                          <h6 className="font-medium text-gray-900 dark:text-white text-sm mb-2">Summary</h6>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {result.summary}
                          </p>
                        </div>

                        {/* Key Points */}
                        <div className="mb-4">
                          <h6 className="font-medium text-gray-900 dark:text-white text-sm mb-2">Key Points</h6>
                          <ul className="space-y-1">
                            {result.keyPoints.map((point, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-congo-blue rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700 dark:text-gray-300 text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Topics & Flags */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-2">
                            {result.topics.slice(0, 3).map((topic, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-congo-blue/20 text-congo-blue rounded-full text-xs"
                              >
                                {topic}
                              </span>
                            ))}
                            {result.hasHateSpeech && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                Hate Speech
                              </span>
                            )}
                            {result.hasViolenceIncitation && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                                Violence
                              </span>
                            )}
                            {result.hasInappropriateContent && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                Contenu Inapproprié
                              </span>
                            )}
                            {result.moralContentAnalysis?.attacksOnModesty && (
                              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                Atteinte Pudeur
                              </span>
                            )}
                            {result.moralContentAnalysis?.hiddenSexualReferences && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                                Références Cachées
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => setSelectedVideoForDetails(selectedVideos[index]?.id || `video-${index}`)}
                            className="px-3 py-1 bg-congo-blue text-white rounded-full text-xs hover:bg-congo-blue-dark transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Browser Viewer (Floating) */}
        <BrowserViewer
          isActive={showBrowserViewer}
          searchQuery={searchQuery}
          screenshot={browserScreenshot}
          onVideoOpen={handleVideoOpen}
        />

        {/* Video Status Tracker (Floating) */}
        {showStatusTracker && (
          <VideoStatusTracker
            videos={videoStatuses}
            onShowDetails={handleShowDetails}
          />
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

                          {/* Moral Content Analysis */}
                          {analysis.moralContentAnalysis && (
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Analyse Morale du Contenu</h4>
                              <div className="space-y-3">
                                {analysis.moralContentAnalysis.hasImmoralContent && (
                                  <div className="flex items-center space-x-2 text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm">Contenu immoral détecté</span>
                                  </div>
                                )}

                                {analysis.moralContentAnalysis.attacksOnModesty && (
                                  <div className="flex items-center space-x-2 text-red-600">
                                    <Shield className="w-4 h-4" />
                                    <span className="text-sm">Atteinte à la pudeur détectée</span>
                                  </div>
                                )}

                                {analysis.moralContentAnalysis.hiddenSexualReferences && (
                                  <div className="flex items-center space-x-2 text-orange-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm">Références sexuelles cachées</span>
                                  </div>
                                )}

                                {analysis.moralContentAnalysis.sexualizedDancing && (
                                  <div className="flex items-center space-x-2 text-orange-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm">Danses sexualisées détectées</span>
                                  </div>
                                )}

                                {analysis.moralContentAnalysis.explicitLanguage && (
                                  <div className="flex items-center space-x-2 text-red-600">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-sm">Langage explicite détecté</span>
                                  </div>
                                )}

                                {analysis.moralContentAnalysis.moralDepravation && (
                                  <div className="flex items-center space-x-2 text-red-600">
                                    <Shield className="w-4 h-4" />
                                    <span className="text-sm">Dépravation morale détectée</span>
                                  </div>
                                )}

                                {/* Visual indicators for moral issues */}
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {analysis.moralContentAnalysis.sexualInappropriateness && (
                                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                      Contenu Sexuel Inapproprié
                                    </span>
                                  )}
                                  {analysis.moralContentAnalysis.inappropriateVisuals && (
                                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                      Visuels Inappropriés
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

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