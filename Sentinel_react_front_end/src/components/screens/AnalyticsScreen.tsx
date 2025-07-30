import React, { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  Target,
  TrendingUp,
  Users,
  Zap,
  Download,
  Filter,
  RefreshCw,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  Share2,
  Maximize2,
  Grid,
  Plus
} from 'lucide-react';
import {
  AreaChart,
  Area,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  SentimentDataPoint,
  SourcePerformanceData,
  TopicData,
  EngagementFunnelStage,
  HeatMapDayData,
  HeatMapHourData
} from '../../types';

// Component-specific interfaces
interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  change: string;
  changeColor: string;
  gradientFrom: string;
  gradientTo: string;
}

interface AnalyticsScreenProps {
  className?: string;
}

// Metric Card Component
const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  title,
  value,
  change,
  changeColor,
  gradientFrom,
  gradientTo
}) => (
  <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl p-6 text-white`}>
    <div className="flex items-center justify-between mb-2">
      <Icon className="w-8 h-8 opacity-80" />
      <span className={`text-sm font-medium bg-white/20 px-2 py-1 rounded ${changeColor}`}>
        {change}
      </span>
    </div>
    <p className="text-sm opacity-90">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

// Enhanced interfaces for interactive features
interface DrillDownData {
  type: 'source' | 'topic' | 'sentiment' | 'time';
  value: string;
  data: any[];
}

interface ChartConfig {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'heatmap';
  position: { x: number; y: number; w: number; h: number };
  visible: boolean;
}

// Main AnalyticsScreen Component
export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ className }) => {
  const [dateRange, setDateRange] = useState<string>('7d');
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('all');
  const [drillDown, setDrillDown] = useState<DrillDownData | null>(null);
  const [customTimeRange, setCustomTimeRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });
  const [dashboardConfig, setDashboardConfig] = useState<ChartConfig[]>([
    { id: 'sentiment', title: 'Évolution du Sentiment', type: 'area', position: { x: 0, y: 0, w: 6, h: 4 }, visible: true },
    { id: 'sources', title: 'Performance des Sources', type: 'bar', position: { x: 6, y: 0, w: 6, h: 4 }, visible: true },
    { id: 'topics', title: 'Distribution des Sujets', type: 'pie', position: { x: 0, y: 4, w: 6, h: 4 }, visible: true },
    { id: 'engagement', title: 'Entonnoir d\'Engagement', type: 'bar', position: { x: 6, y: 4, w: 6, h: 4 }, visible: true }
  ]);
  const [dashboardMode, setDashboardMode] = useState<'view' | 'edit'>('view');
  const [exportFormat, setExportFormat] = useState<'png' | 'pdf' | 'csv' | 'json'>('png');

  // Sentiment Evolution Data
  const sentimentData: SentimentDataPoint[] = [
    { date: '01/11', positive: 245, negative: 89, neutral: 156 },
    { date: '02/11', positive: 289, negative: 112, neutral: 189 },
    { date: '03/11', positive: 312, negative: 98, neutral: 201 },
    { date: '04/11', positive: 367, negative: 134, neutral: 223 },
    { date: '05/11', positive: 398, negative: 156, neutral: 245 },
    { date: '06/11', positive: 423, negative: 189, neutral: 267 },
    { date: '07/11', positive: 445, negative: 201, neutral: 289 }
  ];

  // Source Performance Data
  const sourcePerformance: SourcePerformanceData[] = [
    { source: 'Facebook', mentions: 4567, engagement: 89234, sentiment: 72, growth: 15.3 },
    { source: 'Twitter', mentions: 3892, engagement: 67123, sentiment: 68, growth: -5.2 },
    { source: 'News', mentions: 2341, engagement: 45678, sentiment: 81, growth: 8.7 },
    { source: 'Forums', mentions: 1234, engagement: 23456, sentiment: 54, growth: 12.1 }
  ];

  // Topic Distribution Data
  const topicData: TopicData[] = [
    { name: 'Sécurité', value: 3938, percentage: 28.5 },
    { name: 'Politique', value: 3122, percentage: 22.6 },
    { name: 'Économie', value: 2714, percentage: 19.6 },
    { name: 'Social', value: 2145, percentage: 15.5 },
    { name: 'Santé', value: 1345, percentage: 9.7 },
    { name: 'Autres', value: 567, percentage: 4.1 }
  ];

  // Engagement Funnel Data
  const engagementFunnel: EngagementFunnelStage[] = [
    { name: 'Impressions', value: 145000, fill: '#3B82F6' },
    { name: 'Engagements', value: 23450, fill: '#8B5CF6' },
    { name: 'Partages', value: 8920, fill: '#EC4899' },
    { name: 'Actions', value: 2340, fill: '#F59E0B' }
  ];

  // Pie chart colors
  const pieChartColors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#6B7280'];

  // Source indicator colors
  const getSourceColor = (source: string): string => {
    switch (source) {
      case 'Facebook': return 'bg-blue-500';
      case 'Twitter': return 'bg-gray-900';
      case 'News': return 'bg-orange-500';
      default: return 'bg-purple-500';
    }
  };

  // Sentiment badge styling
  const getSentimentBadgeStyle = (sentiment: number): string => {
    if (sentiment >= 70) {
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    } else if (sentiment >= 50) {
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
    } else {
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
    }
  };

  // Generate heat map data
  const generateHeatMapData = (): HeatMapDayData[] => {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return days.map((day) => ({
      day,
      hours: hours.map((hour): HeatMapHourData => ({
        hour,
        intensity: Math.random(),
        mentions: Math.floor(Math.random() * 100)
      }))
    }));
  };

  const heatMapData = generateHeatMapData();

  // Interactive functionality
  const refreshData = useCallback(async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const handleChartClick = useCallback((data: any, chartType: string) => {
    let drillDownData: DrillDownData | null = null;
    
    switch (chartType) {
      case 'source':
        drillDownData = {
          type: 'source',
          value: data.source,
          data: [
            { platform: 'Posts', count: 234, engagement: 12.3 },
            { platform: 'Comments', count: 567, engagement: 8.7 },
            { platform: 'Shares', count: 89, engagement: 24.1 }
          ]
        };
        break;
      case 'topic':
        drillDownData = {
          type: 'topic',
          value: data.name,
          data: [
            { subtopic: 'Elections', mentions: 1234, sentiment: 0.6 },
            { subtopic: 'Corruption', mentions: 567, sentiment: -0.3 },
            { subtopic: 'Réformes', mentions: 890, sentiment: 0.2 }
          ]
        };
        break;
      case 'sentiment':
        drillDownData = {
          type: 'sentiment',
          value: data.date,
          data: [
            { hour: '00:00', positive: 12, negative: 5, neutral: 8 },
            { hour: '06:00', positive: 23, negative: 12, neutral: 15 },
            { hour: '12:00', positive: 45, negative: 18, neutral: 32 },
            { hour: '18:00', positive: 38, negative: 25, neutral: 28 }
          ]
        };
        break;
    }
    
    setDrillDown(drillDownData);
  }, []);

  const exportChart = useCallback((chartId: string, format: string) => {
    // Mock export functionality
    const filename = `analytics-${chartId}-${new Date().toISOString().split('T')[0]}.${format}`;
    
    if (format === 'csv' || format === 'json') {
      const data = chartId === 'sentiment' ? sentimentData : 
                   chartId === 'sources' ? sourcePerformance :
                   chartId === 'topics' ? topicData : engagementFunnel;
      
      const content = format === 'csv' ? 
        convertToCSV(data) : 
        JSON.stringify(data, null, 2);
      
      const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // For PNG/PDF, show export modal
      alert(`Export ${format.toUpperCase()} pour ${chartId} - Fonctionnalité en développement`);
    }
  }, [sentimentData, sourcePerformance, topicData, engagementFunnel]);

  const convertToCSV = (data: any[]): string => {
    if (!data.length) return '';
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    
    return [headers, ...rows].join('\n');
  };

  // Generate dynamic data based on date range
  const getDataForRange = useCallback((range: string) => {
    const multiplier = range === '24h' ? 0.5 : 
                      range === '7d' ? 1 : 
                      range === '30d' ? 2.1 : 
                      range === '90d' ? 3.2 : 1;
    
    return {
      sentimentData: sentimentData.map(item => ({
        ...item,
        positive: Math.floor(item.positive * multiplier * (0.8 + Math.random() * 0.4)),
        negative: Math.floor(item.negative * multiplier * (0.8 + Math.random() * 0.4)),
        neutral: Math.floor(item.neutral * multiplier * (0.8 + Math.random() * 0.4))
      })),
      sourcePerformance: sourcePerformance.map(item => ({
        ...item,
        mentions: Math.floor(item.mentions * multiplier * (0.8 + Math.random() * 0.4)),
        engagement: Math.floor(item.engagement * multiplier * (0.8 + Math.random() * 0.4))
      }))
    };
  }, [sentimentData, sourcePerformance]);

  // Auto-refresh data
  useEffect(() => {
    const interval = setInterval(() => {
      if (dateRange !== 'custom') {
        // Auto-refresh for real-time data
        refreshData();
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [dateRange, refreshData]);

  const currentData = getDataForRange(dateRange);

  const getHeatMapColor = (intensity: number): string => {
    if (intensity > 0.8) return 'bg-red-500';
    if (intensity > 0.6) return 'bg-orange-500';
    if (intensity > 0.4) return 'bg-yellow-500';
    if (intensity > 0.2) return 'bg-green-500';
    return 'bg-gray-300 dark:bg-gray-600';
  };

  // Render drill-down modal
  const renderDrillDownModal = () => {
    if (!drillDown) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setDrillDown(null)} />
          
          <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
            <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Analyse Détaillée - {drillDown.value}
                </h3>
                <button
                  onClick={() => setDrillDown(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="px-6 py-6">
              <div className="space-y-4">
                {drillDown.data.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {Object.values(item)[0] as string}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {Object.entries(item).slice(1).map(([key, value]) => 
                          `${key}: ${value}`
                        ).join(' • ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={() => exportChart(drillDown.type, 'csv')}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500"
              >
                Exporter CSV
              </button>
              <button
                onClick={() => setDrillDown(null)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced chart component with interactions
  const renderInteractiveChart = (config: ChartConfig, data: any) => {
    const chartProps = {
      onClick: (data: any) => handleChartClick(data, config.id),
      style: { cursor: 'pointer' }
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {config.title}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => exportChart(config.id, exportFormat)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              title="Exporter"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleChartClick(data, config.id)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              title="Voir détails"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          {config.type === 'area' ? (
            <AreaChart data={currentData.sentimentData} {...chartProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="positive" stackId="1" stroke="#10B981" fill="#10B981" />
              <Area type="monotone" dataKey="neutral" stackId="1" stroke="#6B7280" fill="#6B7280" />
              <Area type="monotone" dataKey="negative" stackId="1" stroke="#EF4444" fill="#EF4444" />
            </AreaChart>
          ) : (
            <RePieChart {...chartProps}>
              <Pie
                data={topicData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percentage }) => `${name} ${percentage}%`}
              >
                {topicData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          )}
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      {/* Enhanced Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
                Analyses Avancées
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Tableaux de bord interactifs et analyses en temps réel
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  isRefreshing 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Actualisation...' : 'Actualiser'}</span>
              </button>
              
              <button
                onClick={() => setDashboardMode(dashboardMode === 'edit' ? 'view' : 'edit')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  dashboardMode === 'edit' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>{dashboardMode === 'edit' ? 'Terminer' : 'Personnaliser'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Controls Bar */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="24h">Dernières 24h</option>
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">3 derniers mois</option>
                  <option value="custom">Période personnalisée</option>
                </select>
              </div>

              {dateRange === 'custom' && (
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    value={customTimeRange.start}
                    onChange={(e) => setCustomTimeRange(prev => ({ ...prev, start: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                  <span className="text-gray-400">à</span>
                  <input
                    type="date"
                    value={customTimeRange.end}
                    onChange={(e) => setCustomTimeRange(prev => ({ ...prev, end: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">Toutes les métriques</option>
                  <option value="sentiment">Sentiment uniquement</option>
                  <option value="engagement">Engagement uniquement</option>
                  <option value="reach">Portée uniquement</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Export:</span>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="png">PNG</option>
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>

              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  compareMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Comparaison</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Target}
            title="Total Mentions"
            value="124.5K"
            change="+23%"
            changeColor=""
            gradientFrom="from-blue-500"
            gradientTo="to-blue-600"
          />
          <MetricCard
            icon={TrendingUp}
            title="Taux d'Engagement"
            value="18.7%"
            change="+5.2%"
            changeColor=""
            gradientFrom="from-green-500"
            gradientTo="to-green-600"
          />
          <MetricCard
            icon={Users}
            title="Portée Unique"
            value="2.1M"
            change="+12%"
            changeColor=""
            gradientFrom="from-purple-500"
            gradientTo="to-purple-600"
          />
          <MetricCard
            icon={Zap}
            title="Score Sentiment"
            value="72.3"
            change="+8.1%"
            changeColor=""
            gradientFrom="from-orange-500"
            gradientTo="to-orange-600"
          />
        </div>

        {/* Interactive Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {dashboardConfig.filter(config => config.visible).map((config) => (
            <div key={config.id} className="relative">
              {renderInteractiveChart(config, config.id === 'sentiment' ? currentData.sentimentData : 
                config.id === 'sources' ? currentData.sourcePerformance :
                config.id === 'topics' ? topicData : engagementFunnel)}
              
              {dashboardMode === 'edit' && (
                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg border border-gray-200 dark:border-gray-600">
                  <button
                    onClick={() => setDashboardConfig(prev => 
                      prev.map(c => c.id === config.id ? { ...c, visible: false } : c)
                    )}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Masquer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Chart Button in Edit Mode */}
        {dashboardMode === 'edit' && (
          <div className="mb-8">
            <button className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Plus className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <span className="text-gray-600 dark:text-gray-400">Ajouter un graphique</span>
            </button>
          </div>
        )}

        {/* Detailed Analytics Section */}
        <div className="space-y-6">
          {/* Source Performance Detailed */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Performance Détaillée des Sources
              </h3>
              <button
                onClick={() => exportChart('sources-detailed', exportFormat)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Share2 className="w-4 h-4" />
                <span>Partager</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {currentData.sourcePerformance.map((source, index) => (
                <div 
                  key={source.source}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                  onClick={() => handleChartClick(source, 'source')}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${getSourceColor(source.source)}`} />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{source.source}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {source.mentions.toLocaleString()} mentions • {source.engagement.toLocaleString()} engagements
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentBadgeStyle(source.sentiment)}`}>
                      {source.sentiment}% sentiment
                    </span>
                    <span className={`text-sm font-medium ${
                      source.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {source.growth >= 0 ? '+' : ''}{source.growth.toFixed(1)}%
                    </span>
                    <Eye className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Carte de Chaleur - Activité par Heure
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Faible</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="w-3 h-3 bg-green-300 rounded" />
                  <div className="w-3 h-3 bg-yellow-400 rounded" />
                  <div className="w-3 h-3 bg-orange-500 rounded" />
                  <div className="w-3 h-3 bg-red-500 rounded" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Élevé</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {heatMapData.map((dayData) => (
                <div key={dayData.day} className="flex items-center space-x-2">
                  <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                    {dayData.day}
                  </div>
                  <div className="flex space-x-1">
                    {dayData.hours.map((hourData) => (
                      <div
                        key={hourData.hour}
                        className={`w-4 h-4 rounded-sm ${getHeatMapColor(hourData.intensity)} cursor-pointer`}
                        title={`${dayData.day} ${hourData.hour}:00 - ${hourData.mentions} mentions`}
                        onClick={() => handleChartClick({ day: dayData.day, hour: hourData.hour, mentions: hourData.mentions }, 'heatmap')}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-8 mt-4 text-xs text-gray-500 dark:text-gray-400">
              <span>00h</span>
              <span>06h</span>
              <span>12h</span>
              <span>18h</span>
              <span>24h</span>
            </div>
          </div>
        </div>

        {/* Drill-down Modal */}
        {renderDrillDownModal()}
      </div>
    </div>
  );
};