import React, { useState, useEffect } from 'react';
import { XMarkIcon, ChartBarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Keyword } from '../../types';
import { FirebaseKeywordsService } from '../../services/FirebaseKeywordsService';
import { RawDataExplorer } from '../visualizations/RawDataExplorer';

interface KeywordAnalytics {
  keyword: string;
  totalMentions: number;
  sentimentBreakdown: { positive: number; neutral: number; negative: number };
  sourceDistribution: Array<{ source: string; count: number; percentage: number }>;
  geographicDistribution: Array<{ location: string; count: number; sentiment: number }>;
  temporalTrends: Array<{ date: string; mentions: number; sentiment: number }>;
  relatedKeywords: Array<{ keyword: string; correlation: number; mentions: number }>;
  influentialPosts: Array<{
    id: string;
    content: string;
    author: string;
    platform: string;
    engagement: number;
    sentiment: number;
  }>;
  performance: {
    avgDailyMentions: number;
    peakDay: { date: string; mentions: number };
    sentimentTrend: number;
    velocityChange: number;
  };
}

interface KeywordDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  keyword: Keyword | null;
}

export function KeywordDetailModal({
  isOpen,
  onClose,
  keyword
}: KeywordDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'rawdata'>('analytics');
  const [analytics, setAnalytics] = useState<KeywordAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [rawData, setRawData] = useState<any[]>([]);
  const keywordsService = new FirebaseKeywordsService();

  useEffect(() => {
    if (isOpen && keyword) {
      loadAnalytics();
      loadRawData();
    }
  }, [isOpen, keyword]);

  const loadRawData = async () => {
    if (!keyword) return;
    try {
      // Load ALL tweets for this keyword (up to 10,000)
      const tweets = await keywordsService.getKeywordTweets(keyword.term, 10000);
      console.log(`Loading raw data for ${keyword.term}: found ${tweets.length} tweets`);
      
      setRawData(tweets.map(tweet => {
        // Determine actual source/platform from tweet data
        const actualSource = tweet.author || 'Unknown';
        const actualPlatform = tweet.platform || 'Unknown';
        
        // Map platform to user-friendly source name
        const sourceMapping: { [key: string]: string } = {
          'radio_okapi': 'Radio Okapi',
          'google_news': 'Google News',
          'media_congo': 'Media Congo',
          '7sur7': '7sur7.cd',
          'congo_page': 'Congo Page',
          'actualite_cd': 'Actualité.cd',
          'congo_liberty': 'Congo Liberty',
          'la_prosperite': 'La Prospérité',
          'twitter': 'Twitter'
        };
        
        const displaySource = sourceMapping[actualPlatform] || actualSource;
        const displayPlatform = actualPlatform === 'twitter' ? 'Twitter' : 
                              actualPlatform.includes('google') ? 'Google News' :
                              'News Website';
        
        return {
          id: tweet.id,
          timestamp: tweet.timestamp,
          source: displaySource,
          platform: displayPlatform,
          content: tweet.content,
          author: tweet.author,
          location: tweet.geo?.full_name || 'RDC',
          sentiment: tweet.sentiment,
          engagement: (tweet.engagement?.like_count || 0) + (tweet.engagement?.retweet_count || 0) + (tweet.engagement?.reply_count || 0),
          reach: tweet.engagement?.impression_count || 0,
          verified: tweet.authorVerified || false,
          language: tweet.metadata?.language || 'fr',
          keywords: [keyword.term],
          category: displayPlatform === 'Twitter' ? 'Social Media' : 'News',
          priority: 'medium' as const,
          metadata: {
            likes: tweet.engagement?.like_count || 0,
            shares: tweet.engagement?.retweet_count || 0,
            comments: tweet.engagement?.reply_count || 0
          }
        };
      }));
    } catch (error) {
      console.error('Error loading raw data:', error);
    }
  };

  const loadAnalytics = async () => {
    if (!keyword) return;
    setLoading(true);
    try {
      const firebaseAnalytics = await keywordsService.getKeywordAnalytics(keyword.id);
      if (firebaseAnalytics) {
        setAnalytics(firebaseAnalytics);
      } else {
        // No analytics available - show empty state
        setAnalytics(null);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
      // No analytics available - show empty state
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };


  if (!isOpen) return null;

  const tabs = [
    { id: 'analytics', label: 'Analytique', icon: ChartBarIcon },
    { id: 'rawdata', label: 'Données Brutes', icon: GlobeAltIcon }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />
        
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Analyse détaillée: "{keyword?.term || ''}"
                </h3>
                {analytics && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {analytics.totalMentions.toLocaleString()} mentions totales
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="mt-4">
              <nav className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">Chargement des données...</span>
              </div>
            ) : (
              <>
                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                  analytics ? (
                  <div className="space-y-6">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {analytics.totalMentions.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total mentions</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {analytics.performance.avgDailyMentions.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Mentions/jour</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {analytics.sentimentBreakdown.positive}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Sentiment positif</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {analytics.performance.velocityChange > 0 ? '+' : ''}{analytics.performance.velocityChange.toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Évolution</div>
                      </div>
                    </div>

                    {/* Sentiment Breakdown Chart */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Répartition du sentiment</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Positif', value: analytics.sentimentBreakdown.positive, color: '#10B981' },
                                { name: 'Neutre', value: analytics.sentimentBreakdown.neutral, color: '#6B7280' },
                                { name: 'Négatif', value: analytics.sentimentBreakdown.negative, color: '#EF4444' }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {[0, 1, 2].map((index) => (
                                <Cell key={`cell-${index}`} fill={['#10B981', '#6B7280', '#EF4444'][index]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Temporal Trends */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Évolution temporelle</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={analytics.temporalTrends}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="mentions" stroke="#3B82F6" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                      <ChartBarIcon className="h-16 w-16 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Aucune donnée disponible</h3>
                      <p className="text-sm text-center">Les données d'analyse apparaîtront ici une fois que le scraping commencera.</p>
                    </div>
                  )
                )}

                {/* Raw Data Tab */}
                {activeTab === 'rawdata' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Données brutes pour "{keyword?.term}"
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {rawData.length} éléments
                      </span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                      <RawDataExplorer data={rawData} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}