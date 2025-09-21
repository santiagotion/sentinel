import { Eye, Brain, Shield, Zap, AlertTriangle, CheckCircle, Activity, Network } from 'lucide-react';
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

  // Before/After transformation visualization
  const TransformationVisualization = () => {
    return (
      <div className="bg-gradient-to-r from-red-50 via-white to-emerald-50 dark:from-red-900/10 dark:via-gray-800 dark:to-emerald-900/10 rounded-2xl p-8 mb-8">
        <h4 className="text-xl font-bold text-center mb-8">Transformation : Avant vs Après SENTINEL</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Before State */}
          <div className="text-center">
            <h5 className="text-lg font-semibold text-red-600 mb-4">AVANT</h5>
            <div className="relative">
              {/* Chaos visualization */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, Math.random() * 40 - 20, 0],
                    y: [0, Math.random() * 40 - 20, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute w-2 h-2 bg-red-400 rounded-full"
                  style={{
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`
                  }}
                />
              ))}
              
              <div className="w-full h-32 border-2 border-dashed border-red-300 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <p className="text-sm text-red-600 mt-4">
              Chaos informationnel<br/>
              Réaction tardive<br/>
              Aucune visibilité
            </p>
          </div>

          {/* Transformation Arrow */}
          <div className="flex justify-center">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <Shield className="w-16 h-16 text-congo-blue mb-2" />
              <span className="text-2xl">→</span>
              <span className="text-sm font-medium text-congo-blue">SENTINEL</span>
            </motion.div>
          </div>

          {/* After State */}
          <div className="text-center">
            <h5 className="text-lg font-semibold text-emerald-600 mb-4">APRÈS</h5>
            <div className="relative">
              {/* Organized grid visualization */}
              <div className="grid grid-cols-4 gap-2 p-4">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="w-4 h-4 bg-emerald-400 rounded-sm"
                  />
                ))}
              </div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm text-emerald-600 mt-4">
              Vue claire organisée<br/>
              Anticipation proactive<br/>
              Contrôle souverain
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Real-time monitoring visualization
  const MonitoringVisualization = () => {
    return (
      <div className="bg-gray-900 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-semibold">Centre de Commande SENTINEL</h5>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm">EN TEMPS RÉEL</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-800/50 rounded-lg p-4 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl font-bold text-blue-300"
            >
              2.3M
            </motion.div>
            <p className="text-xs text-blue-200">Messages analysés</p>
          </div>
          
          <div className="bg-red-800/50 rounded-lg p-4 text-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-2xl font-bold text-red-300"
            >
              12
            </motion.div>
            <p className="text-xs text-red-200">Alertes critiques</p>
          </div>
          
          <div className="bg-emerald-800/50 rounded-lg p-4 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-2xl font-bold text-emerald-300"
            >
              98%
            </motion.div>
            <p className="text-xs text-emerald-200">Précision IA</p>
          </div>
        </div>
        
        {/* Network visualization */}
        <div className="mt-4 h-16 relative overflow-hidden">
          <svg className="w-full h-full">
            {/* Network connections */}
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={i}
                x1={`${10 + i * 12}%`}
                y1="50%"
                x2={`${15 + i * 12}%`}
                y2="50%"
                stroke="#10b981"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.2, duration: 1, repeat: Infinity }}
              />
            ))}
          </svg>
        </div>
      </div>
    );
  };

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

        <TransformationVisualization />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <MonitoringVisualization />
        </div>

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