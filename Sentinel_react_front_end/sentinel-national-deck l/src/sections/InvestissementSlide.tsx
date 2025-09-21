import { Users, Server, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export function InvestissementSlide() {
  const investment = [
    {
      icon: Users,
      category: "Ingénierie & Opérations",
      amount: "2,0M $",
      percentage: 44,
      description: "Développement logiciel, intégration, DevOps, ingénierie IA/ML par des ingénieurs congolais",
      highlight: "Formation d'expertise congolaise",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Server,
      category: "APIs et Accès Données", 
      amount: "1,2M $",
      percentage: 27,
      description: "Accès entreprise à Twitter/X, Meta, Google News, YouTube, Gemini AI",
      highlight: "Visibilité sur plateformes étrangères",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Server,
      category: "Infrastructure & Cloud",
      amount: "1,0M $",
      percentage: 22,
      description: "Déploiement sécurisé sur Google Cloud Platform (région Afrique)",
      highlight: "Capacité pétaoctets sécurisée",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Wrench,
      category: "Intégration & Support",
      amount: "0,3M $",
      percentage: 7,
      description: "Déploiement sécurisé, audits de conformité, support opérationnel 24/7",
      highlight: "Résilience dès le jour 1",
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
            Investissement Stratégique
            <span className="gradient-text block">4,5M $ - MVP</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Un investissement dans la souveraineté, la stabilité et la sécurité nationale.
            Près de la moitié du budget directement consacrée aux ingénieurs congolais.
          </p>
        </motion.div>

        {/* Investment Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {investment.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow"
            >
              <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.category}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-congo-blue">{item.amount}</span>
                        <span className="text-sm text-gray-500">({item.percentage}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {item.description}
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm font-medium text-congo-red">
                    ★ {item.highlight}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-3">
              Coût de l'Inaction
            </h3>
            <ul className="space-y-2 text-red-700 dark:text-red-300">
              <li>• Une seule campagne de désinformation : 100M+ $</li>
              <li>• Instabilité électorale : Coûts incalculables</li>
              <li>• Crises sanitaires par fausses infos : Vies humaines</li>
              <li>• Perte de confiance institutionnelle : Irréversible</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-3">
              Retour sur Investissement
            </h3>
            <ul className="space-y-2 text-emerald-700 dark:text-emerald-300">
              <li>• 70+ emplois qualifiés créés sur 3 ans</li>
              <li>• Expertise IA/sécurité maintenue au pays</li>
              <li>• Prévention de crises : Milliards économisés</li>
              <li>• Leadership régional en souveraineté numérique</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-12 bg-gradient-to-r from-congo-blue to-congo-red rounded-xl p-8 text-center text-white"
        >
          <p className="text-xl font-bold mb-2">
            4,5M $ : Une assurance modeste contre des menaces qui coûtent des centaines de millions
          </p>
          <p className="text-lg opacity-90">
            Un investissement stratégique dans la souveraineté numérique congolaise
          </p>
        </motion.div>
      </div>
    </section>
  );
}