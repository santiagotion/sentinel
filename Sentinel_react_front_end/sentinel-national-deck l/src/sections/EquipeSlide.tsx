import { GraduationCap, Award, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export function EquipeSlide() {
  return (
    <section className="h-full flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Notre Équipe</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Des ingénieurs congolais formés et testés dans les institutions mondiales les plus prestigieuses,
            mais engagés à renforcer leur patrie.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center card-shadow"
          >
            <GraduationCap className="w-16 h-16 text-congo-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Formation Internationale</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Ingénieurs formés dans les universités et entreprises technologiques 
              de classe mondiale, avec une expertise éprouvée.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center card-shadow"
          >
            <Award className="w-16 h-16 text-congo-red mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Expertise Prouvée</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Expérience dans l'IA, l'analyse de données à grande échelle, 
              et la sécurité informatique au niveau international.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center card-shadow"
          >
            <Briefcase className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Engagement National</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Professionnels congolais dédiés au développement technologique 
              et au renforcement des capacités nationales.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-gradient-to-r from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-8 text-center"
        >
          <p className="text-lg font-medium mb-4">
            À la différence des contrats logiciels étrangers, SENTINEL maintient la majorité 
            des investissements dans le pays. Près de la moitié du coût MVP - et la majorité 
            du programme à long terme de 10 millions de dollars - est dirigée vers les 
            ingénieurs et professionnels congolais.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-congo-blue mb-2">70+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Emplois hautement qualifiés créés sur 3 ans
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-congo-red mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Propriété et contrôle congolais du système
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}