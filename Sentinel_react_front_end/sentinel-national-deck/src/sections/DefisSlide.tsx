import { AlertCircle, Clock, Users2, Globe2, Zap, TrendingUp, Eye, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function DefisSlide() {
  const challenges = [
    {
      icon: Clock,
      title: "Vitesse Virale",
      problem: "Les fausses informations se propagent en quelques minutes",
      impact: "Peuvent provoquer des émeutes ou la panique avant toute vérification",
      example: "Fausses rumeurs de fermeture de bureaux de vote pendant les élections"
    },
    {
      icon: Users2,
      title: "Volume Écrasant",
      problem: "Des millions de messages impossibles à traiter manuellement",
      impact: "Menaces noyées dans le bruit, détection tardive",
      example: "Surveillance manuelle de centaines de groupes WhatsApp et réseaux"
    },
    {
      icon: Globe2,
      title: "Acteurs Cachés",
      problem: "Bots et acteurs étrangers malveillants difficiles à identifier",
      impact: "Manipulation extérieure de l'opinion publique congolaise",
      example: "Campagnes coordonnées pour déstabiliser la confiance institutionnelle"
    },
    {
      icon: AlertCircle,
      title: "Impacts Dévastateurs",
      problem: "Une seule fausse information peut coûter des vies et des millions",
      impact: "Violences communautaires, panique sanitaire, instabilité électorale",
      example: "Faux remèdes COVID ou rumeurs de fraude électorale"
    }
  ];

  // Visual representation of information spread
  const ViralSpreadVisualization = () => {
    return (
      <div className="relative w-full h-64 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Central source */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center z-10"
          >
            <AlertCircle className="w-4 h-4 text-white" />
          </motion.div>
          
          {/* Spreading circles - representing viral spread */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: [0, 3, 6], opacity: [0.8, 0.3, 0] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.5,
                ease: "easeOut"
              }}
              className="absolute w-8 h-8 border-2 border-red-400 rounded-full"
            />
          ))}
          
          {/* Network nodes representing people/devices */}
          {[
            { x: '20%', y: '30%' }, { x: '80%', y: '25%' }, { x: '15%', y: '70%' },
            { x: '85%', y: '75%' }, { x: '30%', y: '15%' }, { x: '70%', y: '85%' },
            { x: '60%', y: '20%' }, { x: '40%', y: '80%' }
          ].map((pos, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, backgroundColor: '#10b981' }}
              animate={{ 
                scale: [0, 1],
                backgroundColor: ['#10b981', '#ef4444']
              }}
              transition={{ 
                duration: 0.8, 
                delay: 1 + i * 0.3,
                backgroundColor: { delay: 1.5 + i * 0.3 }
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{ left: pos.x, top: pos.y }}
            />
          ))}
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>0 min: Source</span>
            <span>5 min: 1000 personnes</span>
            <span>15 min: 100k personnes</span>
            <span>1 heure: Millions</span>
          </div>
        </div>
      </div>
    );
  };

  // Data overflow visualization
  const DataOverflowVisualization = () => {
    return (
      <div className="relative w-full h-40 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/20 rounded-xl overflow-hidden">
        {/* Data streams */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 200, opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "linear"
            }}
            className="absolute w-1 h-12 bg-blue-400 rounded-full"
            style={{ left: `${8 + i * 7}%` }}
          />
        ))}
        
        {/* Funnel representing human capacity */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-8 bg-gray-400 opacity-50" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 60% 100%, 40% 100%)' }} />
        </div>
        
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Capacité Humaine: 100 messages/jour
          </div>
        </div>
        
        <div className="absolute top-2 left-4 text-xs text-blue-600 dark:text-blue-400 font-semibold">
          Millions de messages/jour
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
            Défis Actuels :
            <span className="gradient-text block">Un Combat Inégal</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Sans outils adaptés, la RDC est aveugle dans le champ de bataille informationnel,
            dépendant d'entreprises étrangères pour décider ce que voient les Congolais.
          </p>
        </motion.div>

        {/* Visual demonstrations of the challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-bold">Propagation Virale en Temps Réel</h3>
            </div>
            <ViralSpreadVisualization />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Une fausse information se propage de 1 source à des millions de personnes en moins d'une heure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Users2 className="w-8 h-8 text-blue-500" />
              <h3 className="text-xl font-bold">Saturation des Capacités Humaines</h3>
            </div>
            <DataOverflowVisualization />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Le volume quotidien de messages dépasse totalement les capacités de surveillance manuelle.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <challenge.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-red-600 dark:text-red-400 text-sm mb-1">PROBLÈME</p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{challenge.problem}</p>
                    </div>
                    <div>
                      <p className="font-medium text-orange-600 dark:text-orange-400 text-sm mb-1">IMPACT</p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{challenge.impact}</p>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="font-medium text-gray-500 text-xs mb-1">EXEMPLE RDC</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                        {challenge.example}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-12 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-red-800 dark:text-red-200">
            <span className="font-bold">Le coût de l'inaction</span> dépasse largement le coût de SENTINEL.
            Une seule campagne de désinformation peut coûter des centaines de millions de dollars
            en instabilité économique et sociale.
          </p>
        </motion.div>
      </div>
    </section>
  );
}