import { Brain, Shield, Zap, Network, Eye, Database } from 'lucide-react';

export function SolutionOverview() {
  return (
    <section id="solution-overview" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Solution SENTINEL
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Une architecture d'intelligence artificielle souveraine conçue pour détecter, analyser 
            et neutraliser les menaces informationnelles en temps réel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Intelligence Artificielle</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Algorithmes d'apprentissage profond entraînés spécifiquement sur les contextes 
              linguistiques et culturels congolais.
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• Traitement du langage naturel multilingue</div>
              <div>• Détection de patterns comportementaux</div>
              <div>• Classification automatique des menaces</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700 group">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Protection Proactive</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Système de défense multicouche capable d'identifier et de neutraliser 
              les campagnes de désinformation avant leur propagation massive.
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• Détection précoce des campagnes</div>
              <div>• Analyse prédictive des tendances</div>
              <div>• Réponse automatisée aux menaces</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-700 group">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Réactivité Instantanée</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Architecture haute performance garantissant une réponse rapide 
              à toute tentative de manipulation informationnelle.
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <div>• Traitement en temps réel</div>
              <div>• Alertes automatiques prioritaires</div>
              <div>• Escalade intelligente des incidents</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mb-16 shadow-lg">
          <h3 className="text-2xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">Architecture Technique</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-6">Couche de Collecte</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Network className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">Connecteurs API</h5>
                    <p className="text-sm text-gray-600">
                      Intégration native avec les principales plateformes sociales pour 
                      une collecte exhaustive en temps réel.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">Surveillance Continue</h5>
                    <p className="text-sm text-gray-600">
                      Monitoring 24/7 des flux d'information avec filtrage intelligent 
                      par mots-clés et géolocalisation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">Stockage Sécurisé</h5>
                    <p className="text-sm text-gray-600">
                      Infrastructure souveraine avec chiffrement AES-256 et 
                      réplication géographique nationale.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-6">Couche d'Analyse</h4>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Analyse Sémantique</h5>
                  <p className="text-sm text-gray-600">
                    Compréhension contextuelle des messages dans les langues locales 
                    avec détection d'intentions malveillantes.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Détection de Patterns</h5>
                  <p className="text-sm text-gray-600">
                    Identification de comportements coordonnés et de réseaux 
                    de propagation artificielle.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Scoring de Crédibilité</h5>
                  <p className="text-sm text-gray-600">
                    Attribution automatique d'un score de fiabilité basé sur 
                    de multiples critères d'évaluation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 group">
            <div className="text-3xl font-light bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">Haute</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Précision</div>
            <div className="text-xs text-gray-600 mt-1">Détection fiable</div>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700 group">
            <div className="text-3xl font-light bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">Minimum</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Faux Positifs</div>
            <div className="text-xs text-gray-600 mt-1">Erreurs réduites</div>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700 group">
            <div className="text-3xl font-light bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">Multiple</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Critères</div>
            <div className="text-xs text-gray-600 mt-1">Analyse complète</div>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 hover:border-amber-300 dark:hover:border-amber-700 group">
            <div className="text-3xl font-light bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">Multi</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Langues</div>
            <div className="text-xs text-gray-600 mt-1">Support local</div>
          </div>
        </div>
      </div>
      
    </section>
  );
}