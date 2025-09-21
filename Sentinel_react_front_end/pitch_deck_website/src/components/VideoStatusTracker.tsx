import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileVideo, Brain, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

export interface VideoStatus {
  id: string;
  title: string;
  channel: string;
  url: string;
  phase: 'waiting' | 'downloading' | 'processing' | 'analyzing' | 'completed' | 'error';
  downloadProgress: number;
  processingStep: string;
  quickSummary?: QuickSummary;
  error?: string;
}

export interface QuickSummary {
  contentType: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  language: string[];
  hasHateSpeech: boolean;
  hasViolenceIncitation: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  briefSummary: string;
}

interface VideoStatusTrackerProps {
  videos: VideoStatus[];
  onShowDetails: (videoId: string) => void;
}

export function VideoStatusTracker({ videos, onShowDetails }: VideoStatusTrackerProps) {
  const getPhaseIcon = (phase: VideoStatus['phase']) => {
    switch (phase) {
      case 'waiting':
        return <div className="w-4 h-4 rounded-full bg-gray-400" />;
      case 'downloading':
        return <Download className="w-4 h-4 text-blue-500 animate-bounce" />;
      case 'processing':
        return <FileVideo className="w-4 h-4 text-yellow-500 animate-pulse" />;
      case 'analyzing':
        return <Brain className="w-4 h-4 text-purple-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getPhaseLabel = (phase: VideoStatus['phase']) => {
    switch (phase) {
      case 'waiting': return 'En attente';
      case 'downloading': return 'Téléchargement';
      case 'processing': return 'Traitement';
      case 'analyzing': return 'Analyse IA';
      case 'completed': return 'Terminé';
      case 'error': return 'Erreur';
    }
  };

  const getRiskBadgeColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  if (videos.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
        <FileVideo className="w-6 h-6 text-congo-blue" />
        <span>Statut des Vidéos</span>
      </h2>

      <div className="space-y-4">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
          >
            {/* Video Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {video.channel}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-3">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                >
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </a>
              </div>
            </div>

            {/* Status and Progress */}
            <div className="flex items-center space-x-3 mb-3">
              {getPhaseIcon(video.phase)}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {getPhaseLabel(video.phase)}
              </span>
              {video.phase === 'downloading' && (
                <div className="flex-1 max-w-xs">
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${video.downloadProgress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {video.downloadProgress}%
                  </span>
                </div>
              )}
            </div>

            {/* Processing Step */}
            {video.processingStep && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 italic">
                {video.processingStep}
              </p>
            )}

            {/* Quick Summary */}
            <AnimatePresence>
              {video.quickSummary && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-gray-200 dark:border-gray-600 pt-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    {/* Content Type and Language */}
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Type de Contenu</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {video.quickSummary.contentType}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Langues: {video.quickSummary.language.join(', ')}
                      </p>
                    </div>

                    {/* Risk Level */}
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Niveau de Risque</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border ${getRiskBadgeColor(video.quickSummary.riskLevel)}`}>
                        {video.quickSummary.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Sentiment and Flags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      video.quickSummary.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                      video.quickSummary.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {video.quickSummary.sentiment === 'positive' ? 'Positif' :
                       video.quickSummary.sentiment === 'negative' ? 'Négatif' : 'Neutre'}
                    </span>

                    {video.quickSummary.hasHateSpeech && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        ⚠️ Discours de Haine
                      </span>
                    )}

                    {video.quickSummary.hasViolenceIncitation && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        ⚠️ Incitation Violence
                      </span>
                    )}
                  </div>

                  {/* Brief Summary */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {video.quickSummary.briefSummary}
                  </p>

                  {/* Show Details Button */}
                  <button
                    onClick={() => onShowDetails(video.id)}
                    className="w-full bg-congo-blue text-white px-4 py-2 rounded-lg hover:bg-congo-blue-dark transition-colors text-sm font-medium"
                  >
                    Voir l'Analyse Complète
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            {video.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mt-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {video.error}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}