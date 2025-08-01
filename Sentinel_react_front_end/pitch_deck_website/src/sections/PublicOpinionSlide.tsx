import { MessageSquare, TrendingUp, AlertTriangle, Users, HelpCircle, BarChart, Eye, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export function PublicOpinionSlide() {
  const challenges = [
    {
      icon: MessageSquare,
      title: "Volume d'Information",
      description: "Des millions de conversations quotidiennes impossibles à analyser manuellement",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Vitesse de Propagation",
      description: "Les sentiments publics évoluent plus vite que les méthodes traditionnelles de sondage",
      color: "from-green-500 to-green-600"
    },
    {
      icon: AlertTriangle,
      title: "Signaux Faibles",
      description: "Les préoccupations émergentes sont noyées dans le bruit numérique",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Users,
      title: "Diversité des Voix",
      description: "Capturer la richesse des opinions à travers toutes les provinces et communautés",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const opportunities = [
    {
      icon: BarChart,
      question: "Réactions aux nouvelles politiques",
      benefit: "Ajustements rapides basés sur le feedback citoyen"
    },
    {
      icon: Eye,
      question: "Impact des communications officielles",
      benefit: "Messages mieux adaptés aux préoccupations réelles"
    },
    {
      icon: Brain,
      question: "Priorités émergentes de la population",
      benefit: "Politiques proactives alignées avec les besoins"
    }
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
            <span className="text-congo-red font-bold">Le Pouls de la Nation</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Comprendre l'opinion publique: un défi critique pour une gouvernance efficace
          </p>
        </motion.div>

        {/* The Current Reality */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 mb-12 text-center"
        >
          <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          <h3 className="text-2xl font-semibold mb-4">L'Opportunité d'Amélioration</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Les plateformes numériques contiennent une <span className="font-semibold">richesse d'informations</span> sur 
            les préoccupations et aspirations des citoyens. Cette ressource précieuse pourrait 
            <span className="text-congo-blue font-semibold"> transformer la gouvernance</span> si elle était accessible.
          </p>
        </motion.div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow"
            >
              <div className={`h-2 bg-gradient-to-r ${challenge.color}`}></div>
              <div className="p-6 flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${challenge.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <challenge.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">{challenge.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold text-center mb-8">Opportunités d'Excellence</h3>
          <div className="space-y-4">
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <opportunity.icon className="w-10 h-10 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-lg">{opportunity.question}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {opportunity.benefit}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* The Vision */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-8 text-center border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4">
            Vision d'une Gouvernance Moderne
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Imaginez un gouvernement qui comprend les aspirations de son peuple en temps réel.
            <br />
            <span className="font-semibold text-blue-600">
              La technologie moderne rend cette vision possible.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}