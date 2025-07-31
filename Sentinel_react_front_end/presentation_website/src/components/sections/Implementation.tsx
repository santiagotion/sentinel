import { Calendar, CheckCircle, Users, Settings, Zap, Shield, Target, Clock, Crown } from 'lucide-react';

export function Implementation() {
  return (
    <section id="implementation" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Avantages Stratégiques</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Les bénéfices durables du système SENTINEL pour le gouvernement : 
            contrôle, sécurité et souveraineté numérique renforcés.
          </p>
        </div>

        {/* Strategic Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-light bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-8 text-center">Bénéfices Gouvernementaux</h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-300 via-purple-300 to-amber-300 h-full"></div>
            
            <div className="space-y-12">
              {/* Control */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-end space-x-2 mb-3">
                      <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">CONTRÔLE</span>
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Maîtrise de l'Information</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      Contrôle total sur le narratif national et la perception publique. 
                      Capacité d'identifier et de contrôler les flux d'information.
                    </p>
                    <div className="text-sm text-gray-600">
                      <div>• Surveillance en temps réel des opinions</div>
                      <div>• Détection des narratifs opposés</div>
                      <div>• Contrôle proactif des messages</div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center z-10 shadow-lg shadow-blue-600/50">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 pl-8">
                  <div className="text-sm text-gray-500">
                    <div className="font-medium">Impact Immédiat</div>
                    <div>Effet: Contrôle renforcé</div>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="text-sm text-gray-500">
                    <div className="font-medium">Sécurité Nationale</div>
                    <div>Effet: Stabilité accrue</div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center z-10 shadow-lg shadow-emerald-600/50">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 pl-8">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center space-x-2 mb-3">
                      <Target className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">SÉCURITÉ</span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Protection Nationale</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      Sécurité renforcée contre les influences extérieures et les menaces 
                      internes. Prévention des troubles sociaux.
                    </p>
                    <div className="text-sm text-gray-600">
                      <div>• Détection précoce des troubles</div>
                      <div>• Identification des acteurs hostiles</div>
                      <div>• Prévention des soulèvements</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sovereignty */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-end space-x-2 mb-3">
                      <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">SOUVERAINETÉ</span>
                      <Crown className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Indépendance Numérique</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      Souveraineté totale sur l'espace informationnel national. 
                      Indépendance vis-à-vis des plateformes étrangères.
                    </p>
                    <div className="text-sm text-gray-600">
                      <div>• Contrôle des données nationales</div>
                      <div>• Indépendance technologique</div>
                      <div>• Protection de la souveraineté</div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center z-10 shadow-lg shadow-purple-600/50">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 pl-8">
                  <div className="text-sm text-gray-500">
                    <div className="font-medium">Long Terme</div>
                    <div>Effet: Autonomie totale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Value */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Valeur Stratégique</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Autorité Renforcée</h4>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Contrôle de l'opinion publique</div>
                    <div className="font-medium text-gray-900 dark:text-white">Influence totale sur le narratif</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Gestion de la perception</div>
                    <div className="font-medium text-gray-900 dark:text-white">Maîtrise des messages clés</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Prévention des crises</div>
                    <div className="font-medium text-gray-900 dark:text-white">Anticipation et contrôle</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Sécurité Nationale</h4>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Protection contre l'extérieur</div>
                    <div className="font-medium text-gray-900 dark:text-white">Défense informationnelle</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Stabilité intérieure</div>
                    <div className="font-medium text-gray-900 dark:text-white">Prévention des troubles</div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400">Intelligence prédictive</div>
                    <div className="font-medium text-gray-900 dark:text-white">Anticipation des menaces</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-light bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent mb-6">Bénéfices Opérationnels</h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Efficacité Gouvernementale</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Prise de décision</span>
                    <span className="font-medium text-gray-900 dark:text-white">Améliorée</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Temps de réaction</span>
                    <span className="font-medium text-gray-900 dark:text-white">Réduit</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Couverture territoriale</span>
                    <span className="font-medium text-gray-900 dark:text-white">Complète</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Surveillance continue</span>
                    <span className="font-medium text-gray-900 dark:text-white">24/7</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Impact Populaire</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Satisfaction citoyenne</span>
                    <span className="font-medium text-gray-900 dark:text-white">Accrue</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Confiance publique</span>
                    <span className="font-medium text-gray-900 dark:text-white">Renforcée</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Unité nationale</span>
                    <span className="font-medium text-gray-900 dark:text-white">Consolidée</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Stabilité sociale</span>
                    <span className="font-medium text-gray-900 dark:text-white">Garantie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Government Benefits */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-light bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 bg-clip-text text-transparent mb-8 text-center">Résultats Attendus</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-gray-900 dark:text-white mb-2">Contrôle</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Total de l'Information</div>
              <div className="text-xs text-gray-600 mt-1">Maîtrise absolue</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-gray-900 dark:text-white mb-2">Sécurité</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Nationale Renforcée</div>
              <div className="text-xs text-gray-600 mt-1">Protection garantie</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-gray-900 dark:text-white mb-2">Bonheur</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Populaire Accru</div>
              <div className="text-xs text-gray-600 mt-1">Satisfaction citoyenne</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-light text-gray-900 dark:text-white mb-2">Puissance</div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Influence Régionale</div>
              <div className="text-xs text-gray-600 mt-1">Leadership confirmé</div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}