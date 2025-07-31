import { AlertTriangle, TrendingUp, Users, Globe } from 'lucide-react';

export function ThreatAssessment() {
  return (
    <section id="threat-assessment" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent mb-4">
            Évaluation des Menaces
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Analyse stratégique des menaces informationnelles ciblant la République Démocratique du Congo 
            et identification des vecteurs d'attaque prioritaires.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-light bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-8">Typologie des Menaces</h3>
            
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Désinformation Géopolitique</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                      Campagnes orchestrées visant à déstabiliser la perception internationale 
                      de la RDC et influencer les décisions politiques nationales.
                    </p>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Impact:</strong> Gouvernance, Relations diplomatiques, Investissements
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Manipulation de l'Opinion</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                      Opérations d'influence ciblant la cohésion sociale et la confiance 
                      des citoyens envers les institutions démocratiques.
                    </p>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Impact:</strong> Stabilité sociale, Processus électoraux, Unité nationale
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Guerre Économique</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                      Narratifs hostiles ciblant les secteurs stratégiques miniers et 
                      économiques pour influencer les marchés et partenariats.
                    </p>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Impact:</strong> Secteur minier, Commerce international, Croissance économique
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-light bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent mb-8">Analyse des Vecteurs</h3>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6 shadow-lg">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Plateformes à Risque Élevé</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800 dark:text-gray-200">Facebook/Meta</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-red-600 to-red-700 h-2 rounded-full transform transition-all duration-500 hover:scale-105" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Élevé</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800 dark:text-gray-200">WhatsApp</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transform transition-all duration-500 hover:scale-105" style={{width: '78%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Élevé</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800 dark:text-gray-200">Twitter/X</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transform transition-all duration-500 hover:scale-105" style={{width: '65%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Modéré</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800 dark:text-gray-200">TikTok</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transform transition-all duration-500 hover:scale-105" style={{width: '58%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Croissant</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tendances Menaces</h4>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-md">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-gray-800 dark:text-gray-200">Évolution des menaces</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent font-semibold text-lg">Croissance</div>
                  <div className="text-gray-600 dark:text-gray-400">Campagnes détectées</div>
                </div>
                <div>
                  <div className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent font-semibold text-lg">Hausse</div>
                  <div className="text-gray-600 dark:text-gray-400">Comptes suspects</div>
                </div>
                <div>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent font-semibold text-lg">Forte hausse</div>
                  <div className="text-gray-600 dark:text-gray-400">Contenus synthétiques</div>
                </div>
                <div>
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent font-semibold text-lg">Expansion</div>
                  <div className="text-gray-600 dark:text-gray-400">Réseaux coordonnés</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-light bg-gradient-to-r from-red-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-8 text-center">Impact Stratégique Estimé</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-medium bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-2">Critique</div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Sécurité Nationale</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Déstabilisation institutionnelle</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-medium bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-2">Élevé</div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Cohésion Sociale</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Polarisation communautaire</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-medium bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent mb-2">Modéré</div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Économie</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Confiance des investisseurs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-medium bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">Surveillé</div>
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Relations Internationales</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Image diplomatique</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}