import { Calendar, CheckCircle, Users, Settings, Zap, Shield, Target, Clock } from 'lucide-react';
import { VerticalLinePattern } from '../patterns/VerticalLinePattern';

// Reusable card style from Couverture design
const CARD_STYLE = "bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 border border-gray-600 dark:border-gray-600 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300";

export function Implementation() {
  return (
    <section id="implementation" className="py-24 bg-gray-900 dark:bg-gray-900 relative overflow-hidden">
      <VerticalLinePattern />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Plan de Mise en Œuvre</h2>
          <p className="text-xl text-gray-300 dark:text-gray-300 max-w-4xl mx-auto">
            Déploiement stratégique et progressif du système SENTINEL sur 18 mois 
            avec formation des équipes et intégration complète.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-light bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-8 text-center">Chronologie de Déploiement</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-300 via-purple-300 to-amber-300 h-full"></div>
            
            <div className="space-y-12">
              {/* Phase 1 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-gray-900 dark:bg-gray-900 border border-gray-700 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-end space-x-2 mb-3">
                      <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">PHASE 1</span>
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-medium text-white dark:text-white mb-2">Infrastructure & Formation</h4>
                    <p className="text-gray-300 dark:text-gray-300 mb-3">
                      Déploiement de l'infrastructure technique et formation 
                      des équipes opérationnelles principales.
                    </p>
                    <div className="text-sm text-gray-400">
                      <div>• Installation serveurs Kinshasa</div>
                      <div>• Formation 25 analystes</div>
                      <div>• Tests systèmes</div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center z-10 shadow-lg shadow-blue-600/50">
                  <span className="text-white text-sm font-medium">1</span>
                </div>
                <div className="flex-1 pl-8">
                  <div className="text-sm text-gray-400">
                    <div className="font-medium">Mois 1-6</div>
                    <div>Durée: 6 mois</div>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="text-sm text-gray-400">
                    <div className="font-medium">Mois 7-12</div>
                    <div>Durée: 6 mois</div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center z-10 shadow-lg shadow-emerald-600/50">
                  <span className="text-white text-sm font-medium">2</span>
                </div>
                <div className="flex-1 pl-8">
                  <div className="bg-gray-900 dark:bg-gray-900 border border-gray-700 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">PHASE 2</span>
                    </div>
                    <h4 className="text-lg font-medium text-white dark:text-white mb-2">Déploiement Opérationnel</h4>
                    <p className="text-gray-300 dark:text-gray-300 mb-3">
                      Mise en service progressive avec surveillance de 4 plateformes 
                      et expansion géographique.
                    </p>
                    <div className="text-sm text-gray-400">
                      <div>• Surveillance Facebook, Twitter, WhatsApp, YouTube</div>
                      <div>• Couverture 13 provinces</div>
                      <div>• Centre opérationnel 24/7</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-gray-900 dark:bg-gray-900 border border-gray-700 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-end space-x-2 mb-3">
                      <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">PHASE 3</span>
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-medium text-white dark:text-white mb-2">Déploiement Complet</h4>
                    <p className="text-gray-300 dark:text-gray-300 mb-3">
                      Activation complète de toutes les fonctionnalités 
                      et couverture nationale intégrale.
                    </p>
                    <div className="text-sm text-gray-400">
                      <div>• 8 plateformes surveillées</div>
                      <div>• 26 provinces couvertes</div>
                      <div>• 15 langues supportées</div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center z-10 shadow-lg shadow-purple-600/50">
                  <span className="text-white text-sm font-medium">3</span>
                </div>
                <div className="flex-1 pl-8">
                  <div className="text-sm text-gray-400">
                    <div className="font-medium">Mois 13-18</div>
                    <div>Durée: 6 mois</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Équipes et Ressources</h3>
            <div className="space-y-4">
              <div className={CARD_STYLE}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-white dark:text-white">Équipe Technique</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400 dark:text-gray-400">Ingénieurs IA</div>
                    <div className="font-medium text-white dark:text-white">8 spécialistes</div>
                  </div>
                  <div>
                    <div className="text-gray-400 dark:text-gray-400">Analystes données</div>
                    <div className="font-medium text-white dark:text-white">12 experts</div>
                  </div>
                  <div>
                    <div className="text-gray-400 dark:text-gray-400">Admin. systèmes</div>
                    <div className="font-medium text-white dark:text-white">6 techniciens</div>
                  </div>
                  <div>
                    <div className="text-gray-400 dark:text-gray-400">Sécurité</div>
                    <div className="font-medium text-white dark:text-white">4 experts</div>
                  </div>
                </div>
              </div>

              <div className={CARD_STYLE}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-white dark:text-white">Équipe Opérationnelle</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400 dark:text-gray-400">Analystes info</div>
                    <div className="font-medium text-white dark:text-white">25 analystes</div>
                  </div>
                  <div>
                    <div className="text-gray-400 dark:text-gray-400">Superviseurs</div>
                    <div className="font-medium text-white dark:text-white">6 managers</div>
                  </div>
                  <div>
                    <div className="text-gray-400 dark:text-gray-400">Spéc. géopolitique</div>
                    <div className="font-medium text-white dark:text-white">4 experts</div>
                  </div>
                  <div>
                    <div className="text-gray-400 dark:text-gray-400">Linguistes</div>
                    <div className="font-medium text-white dark:text-white">15 traducteurs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-light bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-6">Infrastructure Technique</h3>
            <div className="space-y-4">
              <div className={CARD_STYLE}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-white dark:text-white">Centres de Données</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-400">Site principal</span>
                    <span className="font-medium text-white dark:text-white">Kinshasa</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-400">Site secondaire</span>
                    <span className="font-medium text-white dark:text-white">Lubumbashi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-400">Serveurs de calcul</span>
                    <span className="font-medium text-white dark:text-white">16 nodes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-400">Stockage</span>
                    <span className="font-medium text-white dark:text-white">500 TB</span>
                  </div>
                </div>
              </div>

              <div className={CARD_STYLE}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-white dark:text-white">Connectivité</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-400">Bande passante</span>
                    <span className="font-medium text-white dark:text-white">10 Gbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-400">Redondance</span>
                    <span className="font-medium text-white dark:text-white">Triple</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-400">APIs intégrées</span>
                    <span className="font-medium text-white dark:text-white">8 plateformes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 dark:text-gray-400">Sécurité</span>
                    <span className="font-medium text-white dark:text-white">AES-256</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 border border-gray-600 dark:border-gray-600 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-light bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 bg-clip-text text-transparent mb-8 text-center">Indicateurs de Réussite</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-white dark:text-white mb-2">&lt;45s</div>
              <div className="text-sm font-medium text-gray-300 dark:text-gray-300">Temps de Détection</div>
              <div className="text-xs text-gray-400 mt-1">Objectif opérationnel</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-white dark:text-white mb-2">99.5%</div>
              <div className="text-sm font-medium text-gray-300 dark:text-gray-300">Précision Minimale</div>
              <div className="text-xs text-gray-400 mt-1">Seuil de performance</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-white dark:text-white mb-2">80</div>
              <div className="text-sm font-medium text-gray-300 dark:text-gray-300">Personnel Formé</div>
              <div className="text-xs text-gray-400 mt-1">Équipes opérationnelles</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-white dark:text-white mb-2">100%</div>
              <div className="text-sm font-medium text-gray-300 dark:text-gray-300">Couverture Territoire</div>
              <div className="text-xs text-gray-400 mt-1">26 provinces</div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}