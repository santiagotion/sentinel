import { useState } from 'react';
import { 
  MessageSquare, 
  BarChart3, 
  Eye, 
  CheckCircle, 
  XCircle, 
  MinusCircle,
  Activity,
  TrendingUp,
  Hash,
  Share2,
  Filter,
  Search,
  MapPin,
  Globe,
  Target,
  Zap
} from 'lucide-react';

export function UIShowcases() {
  const [activeTab, setActiveTab] = useState('message-analysis');

  const tabs = [
    { id: 'message-analysis', label: 'Analyse des Messages', icon: MessageSquare },
    { id: 'opinion-tracking', label: 'Suivi d\'Opinion', icon: TrendingUp },
    { id: 'network-analysis', label: 'Analyse de Réseaux', icon: Activity },
    { id: 'geographic-intelligence', label: 'Intelligence Géographique', icon: MapPin },
    { id: 'ai-insights', label: 'Intelligence Artificielle', icon: Zap }
  ];

  return (
    <section id="ui-showcases" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-gray-900 dark:text-white mb-6">
            Découvrez les Interfaces Avancées
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Explorez les capacités du système SENTINEL à travers ses interfaces utilisateur 
            conçues pour une analyse stratégique approfondie.
          </p>
        </div>

        {/* Sticky Tab Navigation */}
        <div className="sticky top-20 z-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg mb-8">
          <div className="flex flex-wrap justify-center p-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* UI Content */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          {activeTab === 'message-analysis' && (
            <div className="p-8">
              <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6">Analyse des Messages en Temps Réel</h3>
              
              {/* Mock Message Analysis Interface */}
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Rechercher des messages, mots-clés ou sources..."
                      className="bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 outline-none flex-1"
                      value="conflit minier Kivu"
                      readOnly
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Filtres: 3 actifs</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-medium text-gray-900 dark:text-white mb-1">1,247</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Messages analysés</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Dernières 24h</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-medium text-red-600 dark:text-red-400 mb-1">89</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Menaces détectées</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Niveau critique: 12</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                    <div className="text-2xl font-medium text-gray-900 dark:text-white mb-1">97.3%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Précision</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Score de confiance</div>
                  </div>
                </div>

                {/* Message List */}
                <div className="space-y-3">
                  <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <span className="text-sm font-medium text-red-800 dark:text-red-300">MENACE CRITIQUE</span>
                        <span className="text-xs bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2 py-1 rounded">Facebook</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Il y a 23 minutes</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      "Les conflits miniers au Kivu sont orchestrés par le gouvernement pour détourner l'attention..."
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Score de désinformation: 94.7%</span>
                      <span className="text-gray-500 dark:text-gray-400">Portée estimée: 15,000 vues</span>
                    </div>
                  </div>

                  <div className="border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <MinusCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">SUSPECT</span>
                        <span className="text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">Twitter</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Il y a 1 heure</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      "La situation sécuritaire à l'Est nécessite une intervention internationale immédiate..."
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Score de manipulation: 67.2%</span>
                      <span className="text-gray-500 dark:text-gray-400">Portée estimée: 3,200 vues</span>
                    </div>
                  </div>

                  <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-300">FIABLE</span>
                        <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded">WhatsApp</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Il y a 2 heures</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      "Le gouvernement annonce des mesures de sécurité renforcées dans la région du Kivu..."
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Score de fiabilité: 91.8%</span>
                      <span className="text-gray-500 dark:text-gray-400">Source officielle vérifiée</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'opinion-tracking' && (
            <div className="p-8">
              <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6">Suivi d'Opinion et Sentiment</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Analyse de Sentiment</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">Politique Gouvernementale</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">2,340 mentions</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div className="bg-green-500 dark:bg-green-400 h-3 rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">45% positif</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Positif: 45%</span>
                        <span>Neutre: 30%</span>
                        <span>Négatif: 25%</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">Situation Sécuritaire</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">1,890 mentions</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div className="bg-red-500 dark:bg-red-400 h-3 rounded-full" style={{width: '65%'}}></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">65% négatif</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Positif: 15%</span>
                        <span>Neutre: 20%</span>
                        <span>Négatif: 65%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tendances Temporelles</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">Graphique d'évolution des sentiments</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Données des 30 derniers jours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Mots-clés Tendances</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { word: 'sécurité', count: 1240, sentiment: 'negative' },
                    { word: 'développement', count: 890, sentiment: 'positive' },
                    { word: 'élections', count: 760, sentiment: 'neutral' },
                    { word: 'corruption', count: 650, sentiment: 'negative' },
                    { word: 'économie', count: 540, sentiment: 'positive' },
                    { word: 'paix', count: 480, sentiment: 'positive' }
                  ].map((keyword, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                        keyword.sentiment === 'positive' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300' :
                        keyword.sentiment === 'negative' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300' :
                        'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <Hash className="w-4 h-4" />
                      <span className="font-medium">{keyword.word}</span>
                      <span className="text-xs opacity-75">({keyword.count})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'network-analysis' && (
            <div className="p-8">
              <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6">Analyse de Réseaux et Propagation</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Réseau de Propagation</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <Activity className="w-20 h-20 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">Visualisation du réseau de propagation</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Analyse des connexions entre comptes</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Comptes Influents</h4>
                  <div className="space-y-3">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-red-600 dark:bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          A
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">@account_suspect_1</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Score de risque: 89%</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <div>Portée: 45,000 followers</div>
                        <div>Messages suspects: 23</div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-yellow-600 dark:bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          B
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">@influencer_2</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Score de risque: 67%</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <div>Portée: 12,300 followers</div>
                        <div>Messages suspects: 8</div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          C
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-gray-200">@media_outlet</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Score de risque: 34%</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <div>Portée: 78,900 followers</div>
                        <div>Messages suspects: 3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-medium text-gray-900 dark:text-white mb-1">156</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Comptes analysés</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Réseau principal</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-medium text-red-600 dark:text-red-400 mb-1">23</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Comptes suspects</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Comportement coordonné</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-medium text-orange-600 dark:text-orange-400 mb-1">7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bots détectés</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Activité automatisée</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-medium text-blue-600 dark:text-blue-400 mb-1">89%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Confiance</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Score d'analyse</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'geographic-intelligence' && (
            <div className="p-8">
              <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6">Intelligence Géographique</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Carte de Propagation - RDC</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 h-96 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-24 h-24 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">Carte interactive de la RDC</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Visualisation des foyers de désinformation</p>
                      <div className="mt-4 flex justify-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">Zones à risque élevé</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">Zones surveillées</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">Zones sécurisées</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Alertes par Province</h4>
                  <div className="space-y-3">
                    {[
                      { province: 'Nord-Kivu', alerts: 45, risk: 'high' },
                      { province: 'Sud-Kivu', alerts: 32, risk: 'high' },
                      { province: 'Kinshasa', alerts: 28, risk: 'medium' },
                      { province: 'Haut-Katanga', alerts: 15, risk: 'medium' },
                      { province: 'Kasaï Central', alerts: 8, risk: 'low' },
                      { province: 'Équateur', alerts: 3, risk: 'low' }
                    ].map((item, index) => (
                      <div key={index} className={`border rounded-lg p-3 ${
                        item.risk === 'high' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                        item.risk === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
                        'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800 dark:text-gray-200">{item.province}</span>
                          <span className={`text-sm font-semibold ${
                            item.risk === 'high' ? 'text-red-600 dark:text-red-400' :
                            item.risk === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-green-600 dark:text-green-400'
                          }`}>
                            {item.alerts} alertes
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Dernière mise à jour: il y a {Math.floor(Math.random() * 60)} min
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-medium text-gray-900 dark:text-white mb-1">26</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Provinces</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Couverture totale</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-medium text-red-600 dark:text-red-400 mb-1">2</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Zones critiques</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Intervention requise</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-medium text-yellow-600 dark:text-yellow-400 mb-1">8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Zones surveillées</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Monitoring renforcé</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-medium text-green-600 dark:text-green-400 mb-1">16</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Zones stables</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Situation normale</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-medium text-blue-600 dark:text-blue-400 mb-1">131</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Alertes totales</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Dernières 24h</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai-insights' && (
            <div className="p-8">
              <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6">Intelligence Artificielle et Prédictions</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Modèles de Prédiction</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        <h5 className="font-medium text-gray-900 dark:text-white">Prédiction de Propagation</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600 dark:text-gray-400">Probabilité de viralité</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">73.2%</div>
                        </div>
                        <div>
                          <div className="text-gray-600 dark:text-gray-400">Portée estimée</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">50K+</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        <h5 className="font-medium text-gray-900 dark:text-white">Détection Précoce</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600 dark:text-gray-400">Nouvelles campagnes</div>
                          <div className="text-lg font-semibold text-red-600 dark:text-red-400">3 détectées</div>
                        </div>
                        <div>
                          <div className="text-gray-600 dark:text-gray-400">Temps d'anticipation</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">2.3h</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance des Modèles</h4>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">Classification de Sentiment</span>
                        <span className="text-green-600 dark:text-green-400 font-semibold">97.8%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 dark:bg-green-400 h-2 rounded-full" style={{width: '97.8%'}}></div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">Détection de Désinformation</span>
                        <span className="text-green-600 dark:text-green-400 font-semibold">94.1%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 dark:bg-green-400 h-2 rounded-full" style={{width: '94.1%'}}></div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">Analyse de Réseaux</span>
                        <span className="text-green-600 dark:text-green-400 font-semibold">91.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 dark:bg-green-400 h-2 rounded-full" style={{width: '91.5%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Insights Automatiques</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <TrendingUp className="w-5 h-5 text-red-500 dark:text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">Augmentation des mentions "conflit minier"</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">+127% par rapport à la semaine dernière. Corrélation détectée avec événements géopolitiques.</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <Eye className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">Nouveau réseau de comptes coordonnés</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">15 comptes créés simultanément, partageant des contenus similaires sur la sécurité.</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <Share2 className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">Pattern de propagation inhabituel</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Diffusion rapide d'un narratif spécifique à travers 5 provinces en moins de 3 heures.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </section>
  );
}