import { HandHeart, Flag, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function EngagementSlide() {
  return (
    <section className="h-full flex items-center justify-center bg-gradient-to-br from-congo-blue/5 to-congo-red/5">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-center items-center space-x-4 mb-8">
            <Flag className="w-16 h-16 text-congo-blue" />
            <Shield className="w-20 h-20 text-congo-red" />
            <Star className="w-16 h-16 text-congo-yellow fill-current" />
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-8"
          >
            <span className="gradient-text">Notre Engagement</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8"
          >
            <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
              Nous nous engageons à livrer à la République Démocratique du Congo 
              une capacité souveraine de{' '}
              <span className="text-congo-blue font-bold">protection de l'information</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="text-left">
                <h3 className="font-bold text-congo-blue mb-3">Développement National</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Équipe 100% congolaise</li>
                  <li>• Transfert complet de connaissances</li>
                  <li>• Formation continue du personnel</li>
                  <li>• Propriété intellectuelle nationale</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-congo-red mb-3">Souveraineté Garantie</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Contrôle total du système par la RDC</li>
                  <li>• Infrastructure sécurisée sur le continent</li>
                  <li>• Aucune dépendance extérieure</li>
                  <li>• Capacité d'évolution autonome</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-gradient-to-r from-congo-blue to-congo-red rounded-xl p-8 text-white mb-8"
        >
          <HandHeart className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            Partenaires de la Souveraineté Congolaise
          </h3>
          <p className="text-lg opacity-90">
            SENTINEL partage pleinement la conviction que la protection de la vérité 
            est une question de sécurité nationale et que la souveraineté sur l'espace informationnel 
            doit demeurer fermement entre les mains du gouvernement congolais.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-congo-blue mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Support opérationnel continu
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-congo-red mb-2">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Transparent et responsable
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-emerald-600 mb-2">1</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Seule mission : la souveraineté RDC
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-12"
        >
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Prêt à commencer dès aujourd'hui pour un Congo plus fort et plus souverain demain.
          </p>
        </motion.div>
      </div>
    </section>
  );
}