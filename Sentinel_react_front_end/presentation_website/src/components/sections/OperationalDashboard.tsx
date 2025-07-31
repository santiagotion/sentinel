import { 
  Activity, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  BarChart3, 
  TrendingUp,
  Globe,
  Zap,
  Target,
  Eye
} from 'lucide-react';

export function OperationalDashboard() {
  return (
    <section id="operational-dashboard" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Centre Opérationnel SENTINEL
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Dashboard de surveillance en temps réel pour le monitoring stratégique 
            de l'espace informationnel congolais.
          </p>
        </div>

        {/* Real-time Status Bar */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">État du Système</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
              <span className="text-sm text-gray-600">Opérationnel - Mise à jour automatique</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-medium bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-1">Actif</div>
              <div className="text-sm text-gray-600">Collecte de données</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-medium bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">8/8</div>
              <div className="text-sm text-gray-600">Plateformes connectées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-medium text-gray-900 dark:text-white mb-1">2.3s</div>
              <div className="text-sm text-gray-600">Latence moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-medium text-gray-900 dark:text-white mb-1">99.97%</div>
              <div className="text-sm text-gray-600">Disponibilité</div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Threat Monitoring */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-light bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent mb-6">Surveillance des Menaces</h3>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
              {/* Alert Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-700 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-medium bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-1">12</div>
                  <div className="text-sm text-gray-700">Alertes Critiques</div>
                  <div className="text-xs text-gray-500 mt-1">Dernières 24h</div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-medium bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent mb-1">47</div>
                  <div className="text-sm text-gray-700">En Surveillance</div>
                  <div className="text-xs text-gray-500 mt-1">Analyse en cours</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-medium bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-1">234</div>
                  <div className="text-sm text-gray-700">Résolues</div>
                  <div className="text-xs text-gray-500 mt-1">Cette semaine</div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Alertes Récentes</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white border border-red-200 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">Campagne de désinformation - Secteur minier</div>
                        <div className="text-xs text-gray-500">Nord-Kivu • il y a 15 min</div>
                      </div>
                    </div>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">CRITIQUE</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">Réseau de comptes coordonnés détecté</div>
                        <div className="text-xs text-gray-500">Kinshasa • il y a 32 min</div>
                      </div>
                    </div>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">MOYEN</span>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">Pic d'activité anormal - Élections locales</div>
                        <div className="text-xs text-gray-500">Haut-Katanga • il y a 1h</div>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">INFO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="text-xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Métriques de Performance</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Traitement</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Messages/seconde</span>
                    <span className="font-medium text-gray-900 dark:text-white">1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Files d'attente</span>
                    <span className="font-medium text-gray-900 dark:text-white">0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Charge CPU</span>
                    <span className="font-medium text-gray-900 dark:text-white">23%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Précision</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Détection</span>
                    <span className="font-medium bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">99.7%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Faux positifs</span>
                    <span className="font-medium text-gray-900 dark:text-white">0.3%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Confiance moy.</span>
                    <span className="font-medium text-gray-900 dark:text-white">94.2%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Couverture</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Provinces</span>
                    <span className="font-medium text-gray-900 dark:text-white">26/26</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Langues</span>
                    <span className="font-medium text-gray-900 dark:text-white">15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Plateformes</span>
                    <span className="font-medium text-gray-900 dark:text-white">8/8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-light bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-6">Analyse de Tendances</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Mentions "sécurité"</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-red-500 drop-shadow-sm" />
                  <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent font-medium">+127%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Sentiment négatif</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-orange-500 drop-shadow-sm" />
                  <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent font-medium">+67%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Comptes suspects</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-yellow-500 drop-shadow-sm" />
                  <span className="bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent font-medium">+34%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Interventions réussies</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500 drop-shadow-sm" />
                  <span className="bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent font-medium">+12%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-light bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">Équipes Opérationnelles</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Analystes en ligne</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">12/15</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Spécialistes sécurité</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">4/4</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Superviseurs</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">2/2</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700">Équipe d'intervention</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Standby</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Actions Rapides</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 group">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-medium text-gray-800">Rapport Détaillé</div>
            </button>
            <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 group">
              <div className="w-14 h-14 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-medium text-gray-800">Créer Alerte</div>
            </button>
            <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 group">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-medium text-gray-800">Assigner Équipe</div>
            </button>
            <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 group">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm font-medium text-gray-800">Vue Géographique</div>
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
}