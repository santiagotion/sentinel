import { AlertCircle, Clock, Users2, Globe2 } from 'lucide-react';
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
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
                      <p className="font-medium text-gray-500 text-xs mb-1">EXEMPLE</p>
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
          transition={{ delay: 0.8, duration: 0.5 }}
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