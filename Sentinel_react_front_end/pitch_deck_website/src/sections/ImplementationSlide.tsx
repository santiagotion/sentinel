import { Users, Settings, Shield, Lock, Clock, Target, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function ImplementationSlide() {
  return (
    <section className="h-full flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="gradient-text font-bold">Mise en Œuvre</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Déploiement rapide pour stopper les pertes de vies, protéger l'économie, 
            et unifier la nation face à la menace croissante
          </p>
        </motion.div>

        {/* Key Principles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 mb-12 card-shadow"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Déploiement Stratégique en 3 Phases</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-medium mb-2">Phase 1: Urgence (30 jours)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Stopper immédiatement les violences et désinformation critique
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-medium mb-2">Phase 2: Expansion (90 jours)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Couverture complète des 26 provinces et secteurs économiques
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-medium mb-2">Phase 3: Excellence (180 jours)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Gouvernance moderne basée sur l'opinion publique réelle
              </p>
            </div>
          </div>
        </motion.div>

        {/* Governance Structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 card-shadow"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Impact Mesurable à Chaque Phase</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-4 flex items-center">
                <Clock className="w-5 h-5 text-red-600 mr-2" />
                Résultats Immédiats (30 jours)
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Zéro vie perdue par désinformation
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Acteurs étrangers malveillants neutralisés
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Tensions communautaires désamorcées
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Économie protégée des attaques
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 flex items-center">
                <Shield className="w-5 h-5 text-emerald-600 mr-2" />
                Transformation Complète (180 jours)
              </h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  45M Congolais protégés quotidiennement
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Opinion publique claire pour gouvernance
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Réputation internationale restaurée
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">✓</span>
                  Souveraineté informationnelle totale
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-center text-red-800 dark:text-red-300 font-medium">
              <strong>Chaque jour de retard</strong> = Plus de vies en danger, plus de pertes économiques, plus de divisions
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}