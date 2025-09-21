import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Globe, ExternalLink, Eye, EyeOff } from 'lucide-react';

interface BrowserAction {
  id: string;
  type: 'navigate' | 'search' | 'filter' | 'extract' | 'open_tab';
  description: string;
  url?: string;
  timestamp: Date;
  status: 'pending' | 'executing' | 'completed' | 'error';
}

interface BrowserViewerProps {
  isActive: boolean;
  searchQuery: string;
  onVideoOpen?: (videoId: string, url: string) => void;
}

export function BrowserViewer({ isActive, searchQuery, onVideoOpen }: BrowserViewerProps) {
  const [actions, setActions] = useState<BrowserAction[]>([]);
  const [currentUrl, setCurrentUrl] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [openTabs, setOpenTabs] = useState<Array<{ id: string; title: string; url: string }>>([]);

  useEffect(() => {
    if (isActive && searchQuery) {
      simulateBrowserAutomation(searchQuery);
    }
  }, [isActive, searchQuery]);

  const simulateBrowserAutomation = async (query: string) => {
    const automationSteps: Omit<BrowserAction, 'id' | 'timestamp' | 'status'>[] = [
      {
        type: 'navigate',
        description: 'Navigation vers YouTube...',
        url: 'https://www.youtube.com'
      },
      {
        type: 'search',
        description: 'Clic sur la barre de recherche',
        url: 'input[name="search_query"]'
      },
      {
        type: 'search',
        description: `Saisie: "${query}"`,
        url: `Texte: ${query}`
      },
      {
        type: 'search',
        description: 'Clic sur le bouton de recherche',
        url: 'button[aria-label="Search"]'
      },
      {
        type: 'filter',
        description: 'Attente du chargement des résultats...',
      },
      {
        type: 'filter',
        description: 'Clic sur le bouton Filtres',
        url: 'button[aria-label*="filter"]'
      },
      {
        type: 'filter',
        description: 'Sélection du filtre "Aujourd\'hui"',
        url: 'a[href*="EgYIAh"]'
      },
      {
        type: 'filter',
        description: 'Sélection du filtre "4-20 minutes"',
        url: 'a[href*="GAM"]'
      },
      {
        type: 'extract',
        description: 'Attente des résultats filtrés...',
      },
      {
        type: 'extract',
        description: 'Extraction des données vidéo',
        url: 'ytd-video-renderer'
      },
      {
        type: 'open_tab',
        description: 'Ouverture des vidéos sélectionnées...',
      }
    ];

    for (let i = 0; i < automationSteps.length; i++) {
      const step = automationSteps[i];
      const actionId = `action_${Date.now()}_${i}`;
      
      // Add pending action
      const pendingAction: BrowserAction = {
        ...step,
        id: actionId,
        timestamp: new Date(),
        status: 'pending'
      };
      
      setActions(prev => [...prev, pendingAction]);
      
      // Wait a bit then mark as executing
      await new Promise(resolve => setTimeout(resolve, 500));
      setActions(prev => prev.map(a => 
        a.id === actionId ? { ...a, status: 'executing' } : a
      ));
      
      // Update current URL if applicable
      if (step.url) {
        setCurrentUrl(step.url);
      }
      
      // Simulate action execution time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      // Mark as completed
      setActions(prev => prev.map(a => 
        a.id === actionId ? { ...a, status: 'completed' } : a
      ));
      
      // Special handling for opening tabs
      if (step.type === 'open_tab') {
        const mockVideos = [
          { id: 'video1', title: `${query} - Video 1`, url: 'https://youtube.com/watch?v=mock1' },
          { id: 'video2', title: `${query} - Video 2`, url: 'https://youtube.com/watch?v=mock2' }
        ];
        
        for (const video of mockVideos) {
          setOpenTabs(prev => [...prev, video]);
          onVideoOpen?.(video.id, video.url);
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      }
    }
  };

  const getStatusIcon = (status: BrowserAction['status']) => {
    switch (status) {
      case 'pending':
        return <div className="w-3 h-3 rounded-full bg-gray-400" />;
      case 'executing':
        return <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />;
      case 'completed':
        return <div className="w-3 h-3 rounded-full bg-green-500" />;
      case 'error':
        return <div className="w-3 h-3 rounded-full bg-red-500" />;
    }
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed right-6 top-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 ${
        isMinimized ? 'w-80' : 'w-96 h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Monitor className="w-5 h-5 text-congo-blue" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Browser Automation</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {isMinimized ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Browser Address Bar */}
          <div className="p-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-md px-3 py-2 border">
              <Globe className="w-4 h-4 text-gray-500" />
              <div className="flex-1 text-sm text-gray-600 dark:text-gray-400 truncate">
                {currentUrl || 'about:blank'}
              </div>
            </div>
          </div>

          {/* Open Tabs */}
          {openTabs.length > 0 && (
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Open Tabs</h4>
              <div className="space-y-1">
                {openTabs.map(tab => (
                  <div
                    key={tab.id}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded px-2 py-1"
                  >
                    <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {tab.title}
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions Log */}
          <div className="flex-1 overflow-y-auto p-3">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Automation Log</h4>
            <div className="space-y-3">
              {actions.map(action => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start space-x-3"
                >
                  {getStatusIcon(action.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {action.description}
                    </p>
                    {action.url && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                        {action.url}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {action.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}