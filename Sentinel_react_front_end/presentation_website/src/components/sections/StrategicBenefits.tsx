import { Shield, Globe, TrendingUp, Users, Zap, Eye, Target, Brain } from 'lucide-react';
import { VerticalLinePattern } from '../patterns/VerticalLinePattern';

export function StrategicBenefits() {
  return (
    <section id="strategic-benefits" className="py-24 bg-gray-900 dark:bg-gray-900 relative overflow-hidden">
      <VerticalLinePattern />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Avantages Stratégiques</h2>
          <p className="text-xl text-gray-300 dark:text-gray-300 max-w-4xl mx-auto">
            SENTINEL transforme la capacité de défense informationnelle de la RDC, 
            offrant des avantages stratégiques décisifs pour la souveraineté nationale.
          </p>
        </div>

        {/* Primary Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 dark:bg-gray-800 rounded-xl border border-gray-600 dark:border-gray-600 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 group">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white dark:text-white mb-4">Sécurité Nationale Renforcée</h3>
            <p className="text-gray-300 mb-4">
              Protection proactive contre les campagnes de désinformation 
              visant à déstabiliser les institutions démocratiques.
            </p>
            <div className="text-sm text-gray-400">
              <div>• Détection précoce des menaces</div>
              <div>• Neutralisation rapide des campagnes</div>
              <div>• Protection de l'image nationale</div>
            </div>
          </div>

          <div className="bg-gray-800 dark:bg-gray-800 border border-gray-600 dark:border-gray-600 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:border-emerald-300 dark:hover:border-emerald-700 group">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white dark:text-white mb-4">Souveraineté Numérique</h3>
            <p className="text-gray-300 mb-4">
              Contrôle autonome de l'espace informationnel congolais 
              sans dépendance technologique extérieure.
            </p>
            <div className="text-sm text-gray-400">
              <div>• Infrastructure nationale</div>
              <div>• Données stockées localement</div>
              <div>• Indépendance technologique</div>
            </div>
          </div>

          <div className="bg-gray-800 dark:bg-gray-800 border border-gray-600 dark:border-gray-600 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700 group">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white dark:text-white mb-4">Avantage Compétitif</h3>
            <p className="text-gray-300 mb-4">
              Positionnement de la RDC comme leader africain 
              en matière de défense informationnelle avancée.
            </p>
            <div className="text-sm text-gray-400">
              <div>• Leadership technologique régional</div>
              <div>• Expertise nationale développée</div>
              <div>• Rayonnement international</div>
            </div>
          </div>
        </div>

        {/* Economic Benefits */}
        <div className="bg-gray-800 dark:bg-gray-800 border border-gray-600 dark:border-gray-600 rounded-xl p-8 mb-16 shadow-lg">
          <h3 className="text-2xl font-light bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center">Impact Économique</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-lg font-medium bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-6">Bénéfices Directs</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-white dark:text-white">Économies Budgétaires</h5>
                    <p className="text-sm text-gray-400">
                      Réduction de 60% des coûts de gestion de crise informationnelle 
                      grâce à la détection précoce automatisée.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-white dark:text-white">Création d'Emplois</h5>
                    <p className="text-sm text-gray-400">
                      Formation de 200+ spécialistes en cybersécurité et 
                      intelligence artificielle au niveau national.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-white dark:text-white">Transfert Technologique</h5>
                    <p className="text-sm text-gray-400">
                      Développement d'une expertise nationale en IA 
                      applicable à d'autres secteurs stratégiques.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent mb-6">Bénéfices Indirects</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-white dark:text-white">Confiance Investisseurs</h5>
                    <p className="text-sm text-gray-400">
                      Amélioration de la perception de stabilité politique, 
                      favorisant les investissements étrangers directs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-white dark:text-white">Réputation Internationale</h5>
                    <p className="text-sm text-gray-400">
                      Renforcement de la crédibilité diplomatique et 
                      des partenariats stratégiques internationaux.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-white dark:text-white">Stabilité Sociale</h5>
                    <p className="text-sm text-gray-400">
                      Préservation de la cohésion nationale face aux 
                      tentatives de manipulation externe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-800 dark:bg-gray-800 border border-gray-600 dark:border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-light bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-6">Retour sur Investissement</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Investissement initial</span>
                <span className="font-semibold text-white dark:text-white">$12M USD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Coûts opérationnels annuels</span>
                <span className="font-semibold text-white dark:text-white">$2.4M USD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Économies estimées/an</span>
                <span className="font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">$8.7M USD</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-gray-300 font-medium">ROI sur 3 ans</span>
                <span className="font-medium bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent text-xl">+127%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 dark:bg-gray-800 border border-gray-600 dark:border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Métriques de Succès</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Réduction des crises info</span>
                <span className="font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">-75%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Temps de réponse</span>
                <span className="font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">-89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Précision de détection</span>
                <span className="font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">99.7%</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-gray-300 font-medium">Satisfaction utilisateurs</span>
                <span className="font-medium bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent text-xl">94%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Competitive Advantages */}
        <div className="bg-gray-800 dark:bg-gray-800 border border-gray-600 dark:border-gray-600 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-light bg-gradient-to-r from-purple-600 via-blue-600 to-amber-600 bg-clip-text text-transparent mb-8 text-center">Avantages Concurrentiels</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-white dark:text-white mb-2">Vitesse</h4>
              <p className="text-sm text-gray-400">
                Détection et réponse en moins de 45 secondes, 
                surpassant les standards internationaux.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-white dark:text-white mb-2">Précision</h4>
              <p className="text-sm text-gray-400">
                Taux de précision de 99.7% grâce à l'adaptation 
                aux contextes linguistiques locaux.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-white dark:text-white mb-2">Couverture</h4>
              <p className="text-sm text-gray-400">
                Surveillance complète de 8 plateformes en 15 langues 
                couvrant tout le territoire national.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium text-white dark:text-white mb-2">Sécurité</h4>
              <p className="text-sm text-gray-400">
                Infrastructure souveraine avec chiffrement militaire 
                et conformité aux standards internationaux.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}