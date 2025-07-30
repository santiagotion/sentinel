import { Brain, Cpu, Database, Network, Shield, Zap } from 'lucide-react';
import { VerticalLinePattern } from '../patterns/VerticalLinePattern';

export function TechnicalCapabilities() {
  return (
    <section id="technical-capabilities" className="py-24 bg-gray-900 dark:bg-gray-900 relative overflow-hidden">
      <VerticalLinePattern />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Capacités Techniques</h2>
          <p className="text-xl text-gray-300 dark:text-gray-300 max-w-4xl mx-auto">
            Infrastructure technologique souveraine combinant intelligence artificielle avancée 
            et architecture haute performance pour une protection informationnelle optimale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 dark:bg-gray-800 rounded-xl border border-gray-600 dark:border-gray-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white dark:text-white mb-3">IA Multilingue</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-4">
              Modèles d'apprentissage profond entraînés sur 15 langues congolaises 
              avec compréhension contextuelle avancée.
            </p>
            <div className="text-sm text-gray-400">
              <div>• Français, Lingala, Swahili</div>
              <div>• Kikongo, Tshiluba, Bemba</div>
              <div>• + 9 langues régionales</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 border border-gray-600 dark:border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white dark:text-white mb-3">Performance Temps Réel</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-4">
              Architecture distribuée capable de traiter 100,000 messages par seconde 
              avec latence inférieure à 45ms.
            </p>
            <div className="text-sm text-gray-400">
              <div>• 100K msg/sec</div>
              <div>• Latence &lt; 45ms</div>
              <div>• 99.9% uptime</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 border border-gray-600 dark:border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white dark:text-white mb-3">Stockage Souverain</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-4">
              Infrastructure de données entièrement localisée sur le territoire 
              congolais avec chiffrement militaire AES-256.
            </p>
            <div className="text-sm text-gray-400">
              <div>• Chiffrement AES-256</div>
              <div>• Réplication nationale</div>
              <div>• Conformité RGPD</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 border border-gray-600 dark:border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Network className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white dark:text-white mb-3">Intégration API</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-4">
              Connecteurs natifs avec les principales plateformes sociales 
              pour une collecte exhaustive et continue.
            </p>
            <div className="text-sm text-gray-400">
              <div>• 8 plateformes intégrées</div>
              <div>• Collecte temps réel</div>
              <div>• APIs RESTful sécurisées</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 border border-gray-600 dark:border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white dark:text-white mb-3">Sécurité Avancée</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-4">
              Protocoles de sécurité multicouches avec authentification forte 
              et audit complet des accès système.
            </p>
            <div className="text-sm text-gray-400">
              <div>• Authentification 2FA</div>
              <div>• Audit trails complets</div>
              <div>• Isolation réseau</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 border border-gray-600 dark:border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-medium text-white dark:text-white mb-3">Alertes Intelligentes</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-4">
              Système de notification adaptatif avec escalade automatique 
              selon la criticité des menaces détectées.
            </p>
            <div className="text-sm text-gray-400">
              <div>• Notifications push</div>
              <div>• Escalade automatique</div>
              <div>• Dashboard temps réel</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-900 border border-gray-600 dark:border-gray-600 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center">Spécifications Techniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-6">Infrastructure</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300 dark:text-gray-300">Serveurs de calcul</span>
                  <span className="font-medium text-white dark:text-white">16 nodes haute performance</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 dark:text-gray-300">Stockage total</span>
                  <span className="font-medium text-white dark:text-white">500 TB SSD NVMe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 dark:text-gray-300">Bande passante</span>
                  <span className="font-medium text-white dark:text-white">10 Gbps redondant</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 dark:text-gray-300">Localisation</span>
                  <span className="font-medium text-white dark:text-white">Kinshasa, Lubumbashi</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-6">Performance</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300 dark:text-gray-300">Débit de traitement</span>
                  <span className="font-medium text-white dark:text-white">100,000 msg/sec</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 dark:text-gray-300">Temps de réponse</span>
                  <span className="font-medium text-white dark:text-white">&lt; 45 millisecondes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 dark:text-gray-300">Disponibilité</span>
                  <span className="font-medium text-white dark:text-white">99.99% SLA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300 dark:text-gray-300">Rétention données</span>
                  <span className="font-medium text-white dark:text-white">7 ans archivage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}