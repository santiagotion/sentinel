import { Shield, Brain, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function ExecutiveSummarySlide() {

  return (
    <section className="h-full flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Chaque jour, des <span className="text-congo-red font-bold">millions de Congolais</span> sont bombardés de 
            fausses informations conçues pour <span className="text-congo-red font-bold">déstabiliser notre nation</span>.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-10 mb-12 border border-red-200 dark:border-red-800"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-red-800 dark:text-red-200">
            La Menace Est Réelle
          </h3>
          <div className="space-y-6 text-lg text-gray-800 dark:text-gray-200">
            <p className="flex items-start">
              <span className="text-red-600 mr-3 text-2xl">→</span>
              <span>Des <strong>campagnes orchestrées</strong> détruisent la confiance entre nos communautés</span>
            </p>
            <p className="flex items-start">
              <span className="text-red-600 mr-3 text-2xl">→</span>
              <span>Des <strong>acteurs étrangers</strong> manipulent notre jeunesse sur les réseaux sociaux</span>
            </p>
            <p className="flex items-start">
              <span className="text-red-600 mr-3 text-2xl">→</span>
              <span>Notre <strong>économie souffre</strong> quand de fausses informations éloignent les investisseurs</span>
            </p>
            <p className="flex items-start">
              <span className="text-red-600 mr-3 text-2xl">→</span>
              <span>Des <strong>vies sont perdues</strong> quand la désinformation provoque des violences</span>
            </p>
          </div>
        </motion.div>
        
        {/* The Urgency */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-10 mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Nous Sommes en Guerre - Une Guerre Invisible
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">📱</div>
              <h4 className="font-bold text-lg mb-2">Chaque Téléphone</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Est un champ de bataille où la vérité affronte le mensonge</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="font-bold text-lg mb-2">Chaque Citoyen</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Est une cible potentielle de manipulation</p>
            </div>
            <div>
              <div className="text-4xl mb-4">⏰</div>
              <h4 className="font-bold text-lg mb-2">Chaque Jour</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sans protection augmente notre vulnérabilité</p>
            </div>
          </div>
        </motion.div>
        
        {/* The Cost of Inaction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-center bg-red-50 dark:bg-red-900/20 rounded-xl p-8 border border-red-200 dark:border-red-800"
        >
          <p className="text-xl font-semibold text-red-800 dark:text-red-300 mb-4">
            Le coût de l'inaction:
          </p>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Des vies perdues. Une économie affaiblie. Une nation divisée.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-6">
            Pendant que nous hésitons, <span className="font-bold text-red-600">l'ennemi agit</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}