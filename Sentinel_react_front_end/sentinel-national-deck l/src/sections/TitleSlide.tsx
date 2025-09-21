import { Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function TitleSlide() {
  return (
    <section className="h-full flex items-center justify-center bg-gradient-to-br from-congo-blue/5 to-congo-red/5">
      <div className="text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Shield className="w-24 h-24 text-congo-blue" />
              <div className="absolute -top-2 -right-2">
                <Star className="w-8 h-8 text-congo-yellow fill-current" />
              </div>
            </div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold mb-6"
          >
            <span className="text-congo-blue">SENTINEL</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-2xl md:text-3xl font-light text-gray-700 dark:text-gray-300 mb-8"
          >
            Système National de Protection de l'Information
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-4xl mx-auto"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Une capacité stratégique pour défendre la souveraineté numérique
            </p>
            <h3 className="text-xl font-semibold text-congo-red mb-2">
              République Démocratique du Congo
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Présentation au Gouvernement - {new Date().getFullYear()}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}