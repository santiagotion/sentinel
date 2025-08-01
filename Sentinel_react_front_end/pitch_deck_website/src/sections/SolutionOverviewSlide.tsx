import { Brain, Shield, Clock, Bot, Globe, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function SolutionOverviewSlide() {
  const comparisons = [
    {
      without: "Détection après propagation virale",
      with: "Détection immédiate avec alertes",
      icon: Clock
    },
    {
      without: "Sources inconnues, acteurs invisibles",
      with: "Identification précise des bots",
      icon: Bot
    },
    {
      without: "Aucune compréhension des causes", 
      with: "Analyse causale profonde avec IA",
      icon: Brain
    },
    {
      without: "Réaction manuelle après dégâts",
      with: "Contre-actions automatiques ciblées",
      icon: Shield
    },
    {
      without: "Opinion publique reste un mystère",
      with: "Vision claire des sentiments citoyens",
      icon: TrendingUp
    }
  ];

  return (
    <section className="h-full flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="gradient-text font-bold">SENTINEL: Notre Bouclier National</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            La réponse technologique souveraine de la RDC à la guerre de l'information
          </p>
        </motion.div>

        {/* SENTINEL Definition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-10 mb-12 border border-emerald-200 dark:border-emerald-800"
        >
          <p className="text-xl text-center text-gray-800 dark:text-gray-200 mb-6 leading-relaxed px-4">
            SENTINEL est une <strong>solution technologique</strong> qui combine surveillance en temps réel, 
            analyse IA de pointe, et contre-mesures automatisées pour <strong>protéger la RDC</strong> contre la guerre informationnelle.
          </p>
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 leading-relaxed px-8">
            Développé spécifiquement pour le contexte congolais, SENTINEL offrira une capacité unique de détecter, 
            analyser et neutraliser les campagnes de désinformation avant qu'elles n'affectent la stabilité nationale,
            tout en fournissant une <strong>compréhension claire de l'opinion publique</strong> pour une gouvernance moderne.
          </p>
        </motion.div>

        {/* Core Pillars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
            <h3 className="font-bold text-lg mb-2">Protection Complète</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stoppe la désinformation avant qu'elle ne provoque violences ou pertes économiques
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
            <h3 className="font-bold text-lg mb-2">IA Multi-Plateforme</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analyse des millions de messages impossibles à traiter manuellement
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
            <h3 className="font-bold text-lg mb-2">Vision Nationale</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprend l'opinion publique à travers toutes provinces et communautés
            </p>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl card-shadow p-8"
        >
          <h3 className="text-2xl font-semibold text-center mb-8">Sans SENTINEL vs Avec SENTINEL</h3>
          
          <div className="space-y-6">
            {comparisons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 flex items-center space-x-3">
                  <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.without}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.with}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}