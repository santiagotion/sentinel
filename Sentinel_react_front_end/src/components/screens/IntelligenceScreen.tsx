import React, { useState } from 'react';
import {
  TrendingUp, AlertTriangle, Cpu, Zap, Brain, Award, Target, Clock,
  TrendingDown, Activity, MapPin
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ComposedChart
} from 'recharts';

// TypeScript interfaces
interface PredictionData {
  time: string;
  actual: number | null;
  predicted: number;
  confidence: number;
}

interface RiskData {
  topic: string;
  probability: number;
  impact: number;
  mitigation: string;
}

interface PatternData {
  pattern: string;
  occurrences: number;
  accuracy: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface AnomalyData {
  id: number;
  type: string;
  severity: 'high' | 'medium' | 'low';
  time: string;
  location: string;
  description: string;
}

interface AIModel {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  accuracy: number;
}

type ModelType = 'prediction' | 'risk' | 'pattern' | 'anomaly';

export function IntelligenceScreen() {
  const [activeModel, setActiveModel] = useState<ModelType>('prediction');
  
  // Prediction data
  const predictionData: PredictionData[] = [
    { time: 'Maintenant', actual: 100, predicted: 100, confidence: 95 },
    { time: '+1h', actual: null, predicted: 112, confidence: 92 },
    { time: '+2h', actual: null, predicted: 125, confidence: 88 },
    { time: '+3h', actual: null, predicted: 118, confidence: 85 },
    { time: '+4h', actual: null, predicted: 132, confidence: 82 },
    { time: '+5h', actual: null, predicted: 145, confidence: 78 },
    { time: '+6h', actual: null, predicted: 139, confidence: 75 }
  ];

  // Risk Matrix Data
  const riskMatrix: RiskData[] = [
    { topic: 'Sécurité', probability: 80, impact: 90, mitigation: 'Renforcer surveillance' },
    { topic: 'Économie', probability: 60, impact: 70, mitigation: 'Communication proactive' },
    { topic: 'Santé', probability: 40, impact: 60, mitigation: 'Préparation ressources' },
    { topic: 'Éducation', probability: 30, impact: 50, mitigation: 'Dialogue continu' },
    { topic: 'Transport', probability: 50, impact: 40, mitigation: 'Plans alternatifs' },
    { topic: 'Politique', probability: 70, impact: 85, mitigation: 'Médiation active' }
  ];

  // Pattern Recognition Data
  const patterns: PatternData[] = [
    { pattern: 'Escalade tensions', occurrences: 23, accuracy: 87, trend: 'increasing' },
    { pattern: 'Campagne désinformation', occurrences: 15, accuracy: 92, trend: 'stable' },
    { pattern: 'Mobilisation positive', occurrences: 31, accuracy: 78, trend: 'increasing' },
    { pattern: 'Crise émergente', occurrences: 8, accuracy: 95, trend: 'decreasing' }
  ];

  // Anomaly Detection Data
  const anomalies: AnomalyData[] = [
    { id: 1, type: 'Volume spike', severity: 'high', time: '14:23', location: 'Goma', description: 'Augmentation 300% mentions' },
    { id: 2, type: 'Sentiment shift', severity: 'medium', time: '15:45', location: 'Kinshasa', description: 'Baisse sentiment 45%' },
    { id: 3, type: 'New actor', severity: 'low', time: '16:12', location: 'Lubumbashi', description: 'Nouvel influenceur détecté' }
  ];

  const models: AIModel[] = [
    { id: 'prediction', name: 'Prédiction', icon: TrendingUp, accuracy: 94.7 },
    { id: 'risk', name: 'Analyse Risques', icon: AlertTriangle, accuracy: 89.2 },
    { id: 'pattern', name: 'Reconnaissance', icon: Cpu, accuracy: 91.5 },
    { id: 'anomaly', name: 'Anomalies', icon: Zap, accuracy: 96.3 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Intelligence Artificielle</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Modèles prédictifs et analyse avancée
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-lg">
          <Brain className="w-5 h-5" />
          <span className="font-medium">4 modèles actifs</span>
        </div>
      </div>

      {/* Model Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {models.map((model) => {
          const Icon = model.icon;
          const isActive = activeModel === model.id;
          
          return (
            <button
              key={model.id}
              onClick={() => setActiveModel(model.id as ModelType)}
              className={`p-6 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 hover:shadow-md'
              }`}
            >
              <Icon className={`w-8 h-8 mb-3 ${isActive ? 'text-white' : 'text-purple-600'}`} />
              <h4 className={`font-semibold mb-1 ${isActive ? 'text-white' : 'text-gray-800 dark:text-white'}`}>
                {model.name}
              </h4>
              <p className={`text-sm ${isActive ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'}`}>
                Précision: {model.accuracy}%
              </p>
            </button>
          );
        })}
      </div>

      {/* Model Content */}
      {activeModel === 'prediction' && (
        <div className="space-y-6">
          {/* Prediction Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Prédictions Temporelles</h4>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={predictionData}>
                <defs>
                  <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="time" stroke="#6B7280" />
                <YAxis yAxisId="left" stroke="#6B7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#8B5CF6" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="confidence"
                  stroke="#8B5CF6"
                  fill="url(#confidenceGradient)"
                  name="Confiance %"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="actual"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', r: 6 }}
                  name="Réel"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="predicted"
                  stroke="#EC4899"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: '#EC4899', r: 6 }}
                  name="Prédit"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Prediction Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-green-600" />
                <span className="text-2xl font-bold text-green-600">94.7%</span>
              </div>
              <h5 className="font-semibold text-gray-800 dark:text-white">Précision Modèle</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sur 1000 prédictions</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">87.3%</span>
              </div>
              <h5 className="font-semibold text-gray-800 dark:text-white">Confiance Moyenne</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Prochaines 6 heures</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">2.4s</span>
              </div>
              <h5 className="font-semibold text-gray-800 dark:text-white">Temps Calcul</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Moyenne par prédiction</p>
            </div>
          </div>
        </div>
      )}

      {activeModel === 'risk' && (
        <div className="space-y-6">
          {/* Risk Matrix Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Matrice des Risques</h4>
            
            <div className="relative">
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 25 }, (_, i) => {
                  const row = Math.floor(i / 5);
                  const col = i % 5;
                  const intensity = (row + col) / 8;
                  
                  const bgColor = intensity > 0.7 ? 'bg-gradient-to-br from-red-500 to-red-600' :
                                 intensity > 0.5 ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                                 'bg-gradient-to-br from-green-500 to-green-600';
                  
                  const risk = riskMatrix.find(r => {
                    const probIndex = Math.floor(r.probability / 20);
                    const impactIndex = Math.floor(r.impact / 20);
                    return probIndex === (4 - row) && impactIndex === col;
                  });
                  
                  return (
                    <div
                      key={i}
                      className={`h-24 ${bgColor} rounded-lg flex items-center justify-center text-white font-medium text-sm cursor-pointer hover:opacity-80 transition-opacity`}
                    >
                      {risk && risk.topic}
                    </div>
                  );
                })}
              </div>
              
              {/* Axis Labels */}
              <div className="absolute -left-20 top-0 bottom-0 flex flex-col justify-around text-sm text-gray-500 dark:text-gray-400">
                <span>Très élevé</span>
                <span>Élevé</span>
                <span>Moyen</span>
                <span>Faible</span>
                <span>Très faible</span>
              </div>
              <div className="mt-4 flex justify-around text-sm text-gray-500 dark:text-gray-400">
                <span>Très faible</span>
                <span>Faible</span>
                <span>Moyen</span>
                <span>Élevé</span>
                <span>Très élevé</span>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Impact →</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 transform -rotate-90 absolute left-0 top-1/2">← Probabilité</p>
            </div>
          </div>

          {/* Risk Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Détails des Risques</h4>
            <div className="space-y-4">
              {riskMatrix.map((risk) => {
                const riskLevel = (risk.probability * risk.impact) / 100;
                const riskColor = riskLevel > 60 ? 'red' : riskLevel > 30 ? 'yellow' : 'green';
                
                return (
                  <div key={risk.topic} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-gray-800 dark:text-white">{risk.topic}</h5>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        riskColor === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                        riskColor === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                        'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      }`}>
                        Risque {riskLevel > 60 ? 'Élevé' : riskLevel > 30 ? 'Moyen' : 'Faible'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Probabilité</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${
                                risk.probability > 70 ? 'from-red-500 to-red-600' :
                                risk.probability > 40 ? 'from-yellow-500 to-yellow-600' :
                                'from-green-500 to-green-600'
                              }`}
                              style={{ width: `${risk.probability}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{risk.probability}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Impact</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${
                                risk.impact > 70 ? 'from-red-500 to-red-600' :
                                risk.impact > 40 ? 'from-yellow-500 to-yellow-600' :
                                'from-green-500 to-green-600'
                              }`}
                              style={{ width: `${risk.impact}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{risk.impact}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Mitigation:</span> {risk.mitigation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeModel === 'pattern' && (
        <div className="space-y-6">
          {/* Pattern Recognition */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Modèles Détectés</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patterns.map((pattern) => (
                <div key={pattern.pattern} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-white">{pattern.pattern}</h5>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {pattern.occurrences} occurrences détectées
                      </p>
                    </div>
                    <div className={`p-2 rounded-lg ${
                      pattern.trend === 'increasing' ? 'bg-red-100 dark:bg-red-900/30' :
                      pattern.trend === 'decreasing' ? 'bg-green-100 dark:bg-green-900/30' :
                      'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      {pattern.trend === 'increasing' ? (
                        <TrendingUp className="w-5 h-5 text-red-600" />
                      ) : pattern.trend === 'decreasing' ? (
                        <TrendingDown className="w-5 h-5 text-green-600" />
                      ) : (
                        <Activity className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Précision de détection</span>
                        <span className="font-medium">{pattern.accuracy}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600"
                          style={{ width: `${pattern.accuracy}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Dernière détection il y a {Math.floor(Math.random() * 60)} minutes
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pattern Timeline */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Chronologie des Modèles</h4>
            <div className="space-y-4">
              {patterns.map((pattern, index) => (
                <div key={pattern.pattern} className="relative">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 dark:text-white">{pattern.pattern}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Détecté {pattern.occurrences} fois avec {pattern.accuracy}% de précision
                        </p>
                      </div>
                    </div>
                  </div>
                  {index < patterns.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeModel === 'anomaly' && (
        <div className="space-y-6">
          {/* Real-time Anomaly Detection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Détection d'Anomalies</h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Analyse en temps réel</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {anomalies.map((anomaly) => {
                const severityColor = {
                  high: 'from-red-500 to-red-600',
                  medium: 'from-yellow-500 to-yellow-600',
                  low: 'from-blue-500 to-blue-600'
                };
                
                const severityBg = {
                  high: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
                  medium: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
                  low: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                };
                
                return (
                  <div
                    key={anomaly.id}
                    className={`border rounded-lg p-4 ${severityBg[anomaly.severity]}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${severityColor[anomaly.severity]} flex items-center justify-center`}>
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800 dark:text-white">{anomaly.type}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{anomaly.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{anomaly.time}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{anomaly.location}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1 rounded-lg transition-colors text-sm">
                        Analyser
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Anomaly Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Distribution par Type</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Volume spike</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sentiment shift</span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">New actor</span>
                  <span className="font-medium">25%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Taux de Détection</h5>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">96.3%</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Précision globale</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h5 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Temps de Réponse</h5>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">0.8s</div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Moyenne détection</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}