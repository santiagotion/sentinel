import React, { useState, useEffect } from 'react';
import { GaugeChart } from '../ui/GaugeChart';
import { 
  Activity, TrendingUp, AlertTriangle, Users, TrendingDown, Zap, Hash, 
  CheckCircle, Settings, Map, Info
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ComposedChart, Bar, Line, PieChart as RePieChart, Pie, Cell
} from 'recharts';
import { Keyword } from '../../types';

interface OverviewScreenProps {
  keywords: Keyword[];
}

// Overview Screen - Executive Dashboard
export function OverviewScreen({ keywords }: OverviewScreenProps) {
  const [timeRange, setTimeRange] = useState('24h');
  const [mapboxKey, setMapboxKey] = useState('');
  const [showMapboxInput, setShowMapboxInput] = useState(false);
  
  // Real-time metrics
  const metrics = [
    { 
      label: 'Mentions Totales', 
      value: 18934, 
      change: '+12.5%', 
      trend: 'up',
      icon: Activity,
      color: 'blue',
      sparkline: [45, 52, 38, 48, 58, 63, 71]
    },
    { 
      label: 'Sentiment Global', 
      value: 72, 
      change: '+5.2%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'green',
      sparkline: [65, 68, 70, 69, 71, 72, 72]
    },
    { 
      label: 'Alertes Critiques', 
      value: 23, 
      change: '+15%', 
      trend: 'up',
      icon: AlertTriangle,
      color: 'red',
      sparkline: [12, 15, 18, 16, 20, 22, 23]
    },
    { 
      label: 'Portée Estimée', 
      value: 2400000, 
      change: '+8.7%', 
      trend: 'up',
      icon: Users,
      color: 'purple',
      sparkline: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4]
    }
  ];

  // Activity Timeline Data
  const activityData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    facebook: Math.floor(Math.random() * 500) + 200,
    twitter: Math.floor(Math.random() * 400) + 150,
    news: Math.floor(Math.random() * 300) + 100,
    total: 0
  })).map(d => ({ ...d, total: d.facebook + d.twitter + d.news }));

  // Geographic Heat Map Data
  const geoData = [
    { province: 'Kinshasa', lat: -4.4419, lng: 15.2663, intensity: 85, mentions: 4567, sentiment: 72 },
    { province: 'Goma', lat: -1.6745, lng: 29.2336, intensity: 95, mentions: 3892, sentiment: 45 },
    { province: 'Lubumbashi', lat: -11.6876, lng: 27.4893, intensity: 72, mentions: 2934, sentiment: 68 },
    { province: 'Kisangani', lat: 0.5151, lng: 25.1889, intensity: 68, mentions: 2156, sentiment: 75 },
    { province: 'Bukavu', lat: -2.5083, lng: 28.8608, intensity: 78, mentions: 2789, sentiment: 52 }
  ];

  // Real-time Alerts
  const realtimeAlerts = [
    { id: 1, type: 'critical', message: 'Pic d\'activité détecté à Goma', time: '2 min', icon: Zap },
    { id: 2, type: 'warning', message: 'Sentiment négatif en hausse - Kinshasa', time: '5 min', icon: TrendingDown },
    { id: 3, type: 'info', message: 'Nouveau mot-clé tendance: "réforme"', time: '12 min', icon: Hash },
    { id: 4, type: 'success', message: 'Campagne positive détectée', time: '18 min', icon: CheckCircle }
  ];

  // Additional data for new charts
  const sourceDistribution = [
    { name: 'Facebook', value: 45, color: '#1877F2' },
    { name: 'Twitter', value: 30, color: '#1DA1F2' },
    { name: 'News', value: 15, color: '#FF6B6B' },
    { name: 'Forums', value: 7, color: '#4ECDC4' },
    { name: 'Autres', value: 3, color: '#95A5A6' }
  ];

  const sentimentDistribution = [
    { name: 'Positif', value: 72, color: '#10B981' },
    { name: 'Neutre', value: 20, color: '#6B7280' },
    { name: 'Négatif', value: 8, color: '#EF4444' }
  ];

  const engagementRate = 87;
  const responseTime = 12; // minutes
  const accuracyScore = 94.7;

  const weeklyTrend = [
    { day: 'Lun', mentions: 2345, engagement: 4.2 },
    { day: 'Mar', mentions: 2567, engagement: 4.5 },
    { day: 'Mer', mentions: 2890, engagement: 5.1 },
    { day: 'Jeu', mentions: 3123, engagement: 5.3 },
    { day: 'Ven', mentions: 3456, engagement: 5.8 },
    { day: 'Sam', mentions: 2987, engagement: 4.9 },
    { day: 'Dim', mentions: 2534, engagement: 4.3 }
  ];

  const topInfluencers = [
    { name: 'MinSécuritéRDC', followers: 125000, engagement: 8.5, verified: true },
    { name: 'InfoCongo24', followers: 89000, engagement: 6.2, verified: true },
    { name: 'CitoyenEngagé', followers: 56000, engagement: 7.8, verified: false },
    { name: 'RDCNews', followers: 45000, engagement: 5.9, verified: true }
  ];

  const getAlertColor = (type: string) => {
    switch(type) {
      case 'critical': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300';
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300';
      case 'info': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300';
      case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300';
      default: return '';
    }
  };

  // Mapbox initialization effect
  useEffect(() => {
    // Initialize Mapbox if key is provided and mapboxgl is available
    if (mapboxKey && (window as any).mapboxgl && geoData) {
      try {
        (window as any).mapboxgl.accessToken = mapboxKey;
        
        // Initialize map
        const map = new (window as any).mapboxgl.Map({
          container: 'mapbox-container',
          style: 'mapbox://styles/mapbox/dark-v11',
          center: [23.6560, -2.8839], // DRC center
          zoom: 5
        });

        // Add markers for provinces
        geoData.forEach(location => {
          const markerColor = location.intensity > 80 ? '#EF4444' : 
                             location.intensity > 60 ? '#F59E0B' : '#10B981';
          
          new (window as any).mapboxgl.Marker({ color: markerColor })
            .setLngLat([location.lng, location.lat])
            .setPopup(
              new (window as any).mapboxgl.Popup().setHTML(`
                <h3 class="font-bold">${location.province}</h3>
                <p>${location.mentions} mentions</p>
                <p>Intensité: ${location.intensity}%</p>
                <p>Sentiment: ${location.sentiment}%</p>
              `)
            )
            .addTo(map);
        });

        // Cleanup
        return () => map.remove();
      } catch (error) {
        console.error('Error initializing Mapbox:', error);
      }
    }
  }, [mapboxKey, geoData]);

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Tableau de Bord Exécutif</h3>
        <div className="flex items-center space-x-2">
          {['24h', '7j', '30j', '90j'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid with Gauge Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: 'from-blue-500 to-blue-600',
            green: 'from-green-500 to-green-600',
            red: 'from-red-500 to-red-600',
            purple: 'from-purple-500 to-purple-600'
          };
          
          const gaugeColors = {
            blue: '#3B82F6',
            green: '#10B981',
            red: '#EF4444',
            purple: '#8B5CF6'
          };
          
          return (
            <div key={metric.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[metric.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.label}</h4>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
                {metric.label === 'Portée Estimée' ? `${(metric.value / 1000000).toFixed(1)}M` : 
                 metric.label === 'Sentiment Global' ? `${metric.value}%` : 
                 metric.value.toLocaleString()}
              </p>
              
              {/* Mini Sparkline */}
              <div className="mt-4 h-8 flex items-end space-x-1">
                {metric.sparkline.map((value, index) => (
                  <div
                    key={index}
                    className={`flex-1 bg-gradient-to-t ${colorClasses[metric.color as keyof typeof colorClasses]} rounded-t opacity-60`}
                    style={{ height: `${(value / Math.max(...metric.sparkline)) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Advanced Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Engagement Gauge */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Taux d'Engagement</h4>
          <GaugeChart value={engagementRate} label="Global" color="#10B981" />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            <div>
              <div className="font-semibold text-blue-600">FB</div>
              <div className="text-gray-600 dark:text-gray-400">92%</div>
            </div>
            <div>
              <div className="font-semibold text-cyan-600">TW</div>
              <div className="text-gray-600 dark:text-gray-400">85%</div>
            </div>
            <div>
              <div className="font-semibold text-orange-600">News</div>
              <div className="text-gray-600 dark:text-gray-400">78%</div>
            </div>
          </div>
        </div>

        {/* Response Time Gauge */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Temps de Réponse</h4>
          <GaugeChart value={responseTime} max={60} label="Minutes" color="#F59E0B" />
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Moyenne</span>
              <span className="font-semibold">12 min</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Médiane</span>
              <span className="font-semibold">8 min</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Objectif</span>
              <span className="font-semibold text-green-600">&lt; 15 min</span>
            </div>
          </div>
        </div>

        {/* AI Accuracy Gauge */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Précision IA</h4>
          <GaugeChart value={accuracyScore} label="Score Global" color="#8B5CF6" />
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Sentiment</span>
              <span className="font-semibold">96.2%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Fake News</span>
              <span className="font-semibold">92.8%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Prédictions</span>
              <span className="font-semibold">89.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Visualization Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Timeline - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stacked Area Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Activité par Heure</h4>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Facebook</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Twitter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">News</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorTwitter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorNews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="facebook" stackId="1" stroke="#3B82F6" fillOpacity={1} fill="url(#colorFacebook)" />
                <Area type="monotone" dataKey="twitter" stackId="1" stroke="#06B6D4" fillOpacity={1} fill="url(#colorTwitter)" />
                <Area type="monotone" dataKey="news" stackId="1" stroke="#F97316" fillOpacity={1} fill="url(#colorNews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Trend with Engagement */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Tendance Hebdomadaire</h4>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#6B7280" />
                <YAxis yAxisId="left" stroke="#6B7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Bar yAxisId="left" dataKey="mentions" fill="#3B82F6" opacity={0.8} />
                <Line yAxisId="right" type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Real-time Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Alertes Temps Réel</h4>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <div className="space-y-3">
              {realtimeAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${getAlertColor(alert.type)} transition-all hover:shadow-sm`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="w-5 h-5 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs opacity-75 mt-1">il y a {alert.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
              Voir toutes les alertes →
            </button>
          </div>

          {/* Top Influencers */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Top Influenceurs</h4>
            <div className="space-y-3">
              {topInfluencers.map((influencer, index) => (
                <div key={influencer.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800 dark:text-white">{influencer.name}</span>
                        {influencer.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {(influencer.followers / 1000).toFixed(0)}K followers
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">{influencer.engagement}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">engagement</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Distribution Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Distribution Donut */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Distribution par Source</h4>
          <div className="flex items-center">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={250}>
                <RePieChart>
                  <Pie
                    data={sourceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sourceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="ml-6 space-y-2">
              {sourceDistribution.map((source) => (
                <div key={source.name} className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: source.color }} />
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">{source.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{source.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sentiment Distribution Donut */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Distribution du Sentiment</h4>
          <div className="flex items-center">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={250}>
                <RePieChart>
                  <Pie
                    data={sentimentDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="ml-6 space-y-2">
              {sentimentDistribution.map((sentiment) => (
                <div key={sentiment.name} className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: sentiment.color }} />
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">{sentiment.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{sentiment.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Distribution with Mapbox */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Distribution Géographique</h4>
          <div className="flex items-center space-x-4">
            {!mapboxKey && (
              <button
                onClick={() => setShowMapboxInput(!showMapboxInput)}
                className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Configurer Mapbox</span>
              </button>
            )}
            <button className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors">
              <Map className="w-4 h-4" />
              <span>Vue carte complète</span>
            </button>
          </div>
        </div>

        {/* Mapbox API Key Input */}
        {showMapboxInput && !mapboxKey && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  Pour afficher la carte interactive, veuillez entrer votre clé API Mapbox.
                </p>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="pk.eyJ1IjoiLi..."
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setMapboxKey(e.target.value)}
                  />
                  <button
                    onClick={() => setShowMapboxInput(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    Enregistrer
                  </button>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                  <a href="https://account.mapbox.com/auth/signup/" target="_blank" rel="noopener noreferrer" className="underline">
                    Obtenir une clé API gratuite →
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Map Container */}
        <div className="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg overflow-hidden">
          {mapboxKey ? (
            <div id="mapbox-container" className="w-full h-full">
              {/* Mapbox map would be initialized here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">Carte Mapbox (clé API configurée)</p>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <Map className="w-24 h-24 text-blue-200 dark:text-blue-800" />
              </div>
              
              {/* Province Activity Bubbles */}
              {geoData.map((location, index) => {
                const size = (location.intensity / 100) * 80;
                const positions = [
                  { top: '20%', left: '45%' },
                  { top: '35%', left: '70%' },
                  { top: '60%', left: '50%' },
                  { top: '45%', left: '25%' },
                  { top: '50%', left: '65%' }
                ];
                
                return (
                  <div
                    key={location.province}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={positions[index]}
                  >
                    <div
                      className={`relative rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                        location.intensity > 80 ? 'bg-red-500' : location.intensity > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        opacity: 0.3 + (location.intensity / 200)
                      }}
                    >
                      <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ animationDuration: '2s' }}></div>
                      <span className="text-white font-semibold text-xs z-10">{location.mentions}</span>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap">
                        <p className="font-semibold">{location.province}</p>
                        <p className="text-xs">{location.mentions} mentions</p>
                        <p className="text-xs">Intensité: {location.intensity}%</p>
                        <p className="text-xs">Sentiment: {location.sentiment}%</p>
                      </div>
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 absolute left-1/2 transform -translate-x-1/2"></div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        
        {/* Province Stats Grid */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          {geoData.map((location) => (
            <div key={location.province} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{location.province}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{location.mentions}</p>
              <div className="flex items-center justify-center space-x-2 mt-1">
                <span className={`text-xs ${location.intensity > 80 ? 'text-red-600' : location.intensity > 60 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {location.intensity}% activité
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className={`text-xs ${location.sentiment > 70 ? 'text-green-600' : location.sentiment > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {location.sentiment}% positif
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keywords Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Performance des Mots-clés</h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">{keywords.length} mots-clés actifs</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keywords.map((keyword) => (
            <div key={keyword.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-gray-800 dark:text-white">{keyword.term}</h5>
                <span className={`w-2 h-2 rounded-full ${
                  keyword.status === 'critical' ? 'bg-red-500' : 
                  keyword.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                }`}></span>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{keyword.mentions}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">mentions aujourd'hui</p>
              
              {/* Mini trend chart */}
              <div className="mt-3 h-8 flex items-end space-x-0.5">
                {keyword.trend.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-blue-500 rounded-t opacity-60 hover:opacity-100 transition-opacity"
                    style={{ height: `${(value / Math.max(...keyword.trend)) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}