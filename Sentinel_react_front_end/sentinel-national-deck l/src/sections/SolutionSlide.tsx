import { Eye, Brain, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function SolutionSlide() {
  const capabilities = [
    {
      icon: Eye,
      title: "Surveillance Compréhensive",
      description: "Observation systématique et continue des canaux par lesquels l'information circule : médias traditionnels, plateformes numériques et espaces de réseaux sociaux.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Brain,
      title: "Analyse Structurée",
      description: "Transformation des données brutes en insights structurés révélant les acteurs, narratifs et impacts potentiels derrière les informations circulantes.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Alerte Précoce",
      description: "Détection des narratifs dangereux avant qu'ils ne prennent de l'ampleur, permettant une intervention proactive plutôt que réactive.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Zap,
      title: "Support Décisionnel",
      description: "Visualisations claires et alertes structurées qui transforment un environnement informationnel complexe en renseignement opérationnel.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="h-full flex items-center justify-center p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">SENTINEL</span> :
            <span className="block text-gray-800 dark:text-gray-200">Notre Solution Stratégique</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-5xl mx-auto leading-relaxed">
            Non seulement une plateforme technologique, mais une capacité stratégique alignée 
            sur le mandat du gouvernement pour sauvegarder notre discours et protéger notre peuple.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow"
            >
              <div className={`h-2 bg-gradient-to-r ${capability.color}`}></div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${capability.color} rounded-xl flex items-center justify-center`}>
                    <capability.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold flex-1">{capability.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-r from-congo-blue to-congo-red rounded-xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            De la Réaction à l'Anticipation
          </h3>
          <p className="text-lg opacity-90 max-w-4xl mx-auto">
            SENTINEL permet aux décideurs de ne plus réagir après que les dommages aient été faits, 
            mais d'être positionnés pour agir de manière décisive et par anticipation.
            Cette transformation renforce la résilience de l'État et sa souveraineté dans le domaine informationnel.
          </p>
        </motion.div>
      </div>
    </section>
  );
}