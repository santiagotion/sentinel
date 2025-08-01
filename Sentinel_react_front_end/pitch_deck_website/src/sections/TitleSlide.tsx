import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function TitleSlide() {
  return (
    <section className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 dark:text-white mb-6 leading-tight">
            La Guerre de l'Information
            <br />
            <span className="font-normal text-red-600 dark:text-red-400">menace la RDC</span>
          </h1>
        </motion.div>
        
        {/* SENTINEL Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-congo-blue" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-congo-blue mb-6">
            SENTINEL
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            protège la souveraineté numérique congolaise grâce à l'intelligence artificielle
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-sm text-gray-500 dark:text-gray-600"
        >
          Présentation Confidentielle - Gouvernement RDC
        </motion.div>
        
      </div>
    </section>
  );
}