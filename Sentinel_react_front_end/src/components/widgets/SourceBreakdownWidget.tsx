import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Globe, 
  Radio, 
  Newspaper, 
  MessageSquare, 
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { FirebaseDataService, RawDataItem } from '../../services/FirebaseDataService';

interface SourceBreakdown {
  source: string;
  platform: string;
  count: number;
  percentage: number;
  latestTimestamp: string;
  avgEngagement: number;
  icon: React.ReactNode;
  color: string;
}

interface SourceBreakdownWidgetProps {
  keyword?: string;
  className?: string;
}

export function SourceBreakdownWidget({ keyword, className = '' }: SourceBreakdownWidgetProps) {
  const [breakdown, setBreakdown] = useState<SourceBreakdown[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const dataService = new FirebaseDataService();

  useEffect(() => {
    loadSourceBreakdown();
  }, [keyword]);

  const loadSourceBreakdown = async () => {
    setLoading(true);
    try {
      const { data } = await dataService.getRawData(1000); // Get more data for accurate breakdown
      
      // Filter by keyword if specified
      const filteredData = keyword 
        ? data.filter(item => 
            item.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase())) ||
            item.content.toLowerCase().includes(keyword.toLowerCase())
          )
        : data;

      // Group by source
      const sourceMap = new Map<string, RawDataItem[]>();
      
      filteredData.forEach(item => {
        const key = `${item.source}|${item.platform}`;
        if (!sourceMap.has(key)) {
          sourceMap.set(key, []);
        }
        sourceMap.get(key)!.push(item);
      });

      // Calculate breakdown
      const total = filteredData.length;
      const sourceBreakdown: SourceBreakdown[] = Array.from(sourceMap.entries()).map(([key, items]) => {
        const [source, platform] = key.split('|');
        const avgEngagement = items.reduce((sum, item) => sum + item.engagement, 0) / items.length;
        const latestItem = items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
        
        return {
          source,
          platform,
          count: items.length,
          percentage: (items.length / total) * 100,
          latestTimestamp: latestItem?.timestamp || '',
          avgEngagement: Math.round(avgEngagement),
          icon: getSourceIcon(source),
          color: getSourceColor(source)
        };
      });

      // Sort by count descending
      sourceBreakdown.sort((a, b) => b.count - a.count);

      setBreakdown(sourceBreakdown);
      setTotalCount(total);
    } catch (error) {
      console.error('Error loading source breakdown:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSourceIcon = (source: string): React.ReactNode => {
    switch (source) {
      case 'Twitter':
        return <MessageSquare className="w-4 h-4" />;
      case 'Radio Okapi':
        return <Radio className="w-4 h-4" />;
      case 'Voice of Congo':
      case 'Actualité.cd':
      case 'Media Congo':
      case 'Congo Page':
      case 'Congo Liberty':
      case 'DRC News':
        return <Newspaper className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getSourceColor = (source: string): string => {
    switch (source) {
      case 'Twitter':
        return 'bg-blue-500';
      case 'Radio Okapi':
        return 'bg-green-500';
      case 'Voice of Congo':
        return 'bg-purple-500';
      case 'Actualité.cd':
        return 'bg-orange-500';
      case 'Media Congo':
        return 'bg-red-500';
      case 'Congo Page':
        return 'bg-indigo-500';
      case 'Congo Liberty':
        return 'bg-yellow-500';
      case 'DRC News':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `il y a ${diffDays}j`;
    } else if (diffHours > 0) {
      return `il y a ${diffHours}h`;
    } else {
      return 'à l\'instant';
    }
  };

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 ${className}`}>
        <div className="flex items-center space-x-2 mb-4">
          <Database className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Sources de Données</h3>
        </div>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Sources de Données</h3>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {totalCount} éléments
        </div>
      </div>

      {breakdown.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Aucune donnée disponible</p>
          {keyword && (
            <p className="text-sm">pour le mot-clé "{keyword}"</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {breakdown.map((source, index) => (
            <div key={`${source.source}-${source.platform}`} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
              
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                {source.icon}
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-gray-800 dark:text-white truncate">
                    {source.source}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {source.platform}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold text-gray-800 dark:text-white">
                  {source.count}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {source.percentage.toFixed(1)}%
                </div>
              </div>

              <div className="text-right min-w-0">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {source.avgEngagement}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  eng. moy.
                </div>
              </div>

              {source.latestTimestamp && (
                <div className="text-right min-w-0">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(source.latestTimestamp)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      {breakdown.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">
                {breakdown.length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Sources actives
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">
                {Math.round(breakdown.reduce((sum, s) => sum + s.avgEngagement, 0) / breakdown.length)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Engagement moyen
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">
                {breakdown.filter(s => s.latestTimestamp && 
                  new Date().getTime() - new Date(s.latestTimestamp).getTime() < 24 * 60 * 60 * 1000
                ).length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Actives (24h)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}