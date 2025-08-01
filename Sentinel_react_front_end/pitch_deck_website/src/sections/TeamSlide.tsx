import { Code, Brain, Globe, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export function TeamSlide() {
  const expertise = [
    { icon: Brain, label: "Experts IA capables de traiter des millions de messages/minute" },
    { icon: Code, label: "Ingénieurs ex-Google/Meta maîtrisant les systèmes complexes" },
    { icon: Globe, label: "Comprennent nos langues locales et réalités culturelles" },
    { icon: GraduationCap, label: "Transfèrent leur expertise aux talents congolais" }
  ];

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
            <span className="gradient-text font-bold">L'Équipe</span> et l'Expertise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            L'équipe qui comprend la complexité du défi et possède l'expertise 
            pour transformer l'impossible en réalité
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-8 mb-12"
        >
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 leading-relaxed">
            Notre <strong>origine congolaise</strong> nous fait comprendre l'urgence de protéger nos citoyens.
            Notre <strong>expertise mondiale</strong> nous donne les moyens de créer une solution 
            capable de <strong>neutraliser des menaces complexes</strong> que les méthodes manuelles ne peuvent pas gérer.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow flex items-center space-x-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-congo-blue to-congo-blue/80 rounded-xl flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Knowledge Transfer Program */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 card-shadow"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Souveraineté Technologique Garantie</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-congo-red mb-2">100%</div>
              <p className="text-gray-600 dark:text-gray-400">Contrôle congolais sur les données</p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-congo-blue mb-2">50+</div>
              <p className="text-gray-600 dark:text-gray-400">Experts congolais formés en 2 ans</p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
              <p className="text-gray-600 dark:text-gray-400">Support technique local assuré</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <p className="text-center text-emerald-800 dark:text-emerald-300">
              <strong>Vision:</strong> La RDC devient leader africain en défense contre la désinformation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}