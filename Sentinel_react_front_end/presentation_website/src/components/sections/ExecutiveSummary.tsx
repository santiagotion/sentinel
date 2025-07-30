import { Clock, Users, DollarSign, Shield } from 'lucide-react';
import { VerticalLinePattern } from '../patterns/VerticalLinePattern';

export function ExecutiveSummary() {
  return (
    <section id="executive-summary" className="py-24 bg-gray-900 dark:bg-gray-900 relative overflow-hidden">
      <VerticalLinePattern />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Résumé Exécutif
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-300 max-w-3xl mx-auto">
            Analyse stratégique et recommandations pour la protection de l'espace informationnel congolais
          </p>
        </div>

        {/* Comparison */}
        <div className="bg-gray-900 dark:bg-gray-900 rounded-xl border border-gray-700 dark:border-gray-700 p-8 mb-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-light bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent mb-12 text-center">
            Situation Actuelle vs SENTINEL
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Current State */}
            <div>
              <h4 className="text-lg font-medium bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-8">SANS SENTINEL</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 border border-red-200 dark:border-red-700 rounded-xl bg-red-50 dark:bg-red-900/20 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 dark:text-gray-300">Détection: 24-48 heures</span>
                </div>
                <div className="flex items-center space-x-4 p-4 border border-red-200 dark:border-red-700 rounded-xl bg-red-50 dark:bg-red-900/20 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 dark:text-gray-300">Équipe: Surveillance manuelle</span>
                </div>
                <div className="flex items-center space-x-4 p-4 border border-red-200 dark:border-red-700 rounded-xl bg-red-50 dark:bg-red-900/20 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 dark:text-gray-300">Coût: Crises non prévenues</span>
                </div>
                <div className="flex items-center space-x-4 p-4 border border-red-200 dark:border-red-700 rounded-xl bg-red-50 dark:bg-red-900/20 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 dark:text-gray-300">Réaction: Après propagation</span>
                </div>
              </div>
            </div>

            {/* With SENTINEL */}
            <div>
              <h4 className="text-lg font-medium bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-8">AVEC SENTINEL</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 border border-emerald-200 dark:border-emerald-700 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 dark:text-gray-300">Détection: 15 minutes</span>
                </div>
                <div className="flex items-center space-x-4 p-4 border border-emerald-200 dark:border-emerald-700 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 dark:text-gray-300">Équipe: IA + Analystes experts</span>
                </div>
                <div className="flex items-center space-x-4 p-4 border border-emerald-200 dark:border-emerald-700 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 dark:text-gray-300">ROI: +127% en 3 ans</span>
                </div>
                <div className="flex items-center space-x-4 p-4 border border-emerald-200 dark:border-emerald-700 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300 dark:text-gray-300">Prévention: Avant propagation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-900 dark:bg-gray-900 rounded-xl border border-gray-700 dark:border-gray-700 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-12 text-center">
            Recommandations Stratégiques
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-700 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-lg font-medium text-white">1</span>
              </div>
              <h4 className="font-medium text-white dark:text-white mb-3">Déploiement Immédiat</h4>
              <p className="text-sm text-gray-400 dark:text-gray-300 leading-relaxed">
                Mise en œuvre urgente pour protéger les prochaines échéances électorales
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-700 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700 group">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-lg font-medium text-white">2</span>
              </div>
              <h4 className="font-medium text-white dark:text-white mb-3">Formation Équipes</h4>
              <p className="text-sm text-gray-400 dark:text-gray-300 leading-relaxed">
                80 analystes formés en 6 mois pour une couverture nationale complète
              </p>
            </div>
            
            <div className="text-center p-6 border border-gray-700 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-lg font-medium text-white">3</span>
              </div>
              <h4 className="font-medium text-white dark:text-white mb-3">Centre National</h4>
              <p className="text-sm text-gray-400 dark:text-gray-300 leading-relaxed">
                Établissement du Centre National de Veille Informationnelle à Kinshasa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}