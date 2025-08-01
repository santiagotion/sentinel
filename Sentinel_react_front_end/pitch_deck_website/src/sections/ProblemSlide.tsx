import { Bomb, TrendingDown, Users, Globe, AlertOctagon, Newspaper, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProblemSlide() {
  const impacts = [
    {
      icon: Bomb,
      title: "Crises sécuritaires amplifiées",
      example: "Les fausses informations transforment des tensions mineures en conflits majeurs",
      color: "from-red-500 to-red-600"
    },
    {
      icon: TrendingDown,
      title: "Dommages économiques",
      example: "La désinformation sur les ressources naturelles affecte les investissements",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Division sociale orchestrée",
      example: "Les campagnes de manipulation créent des tensions entre communautés",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Globe,
      title: "Image internationale ternie",
      example: "La RDC est souvent présentée négativement dans les médias internationaux",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Radio,
      title: "Médias traditionnels dépassés",
      example: "Les journalistes locaux ne peuvent pas rivaliser avec la vitesse des fausses nouvelles virales",
      color: "from-indigo-500 to-indigo-600"
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
            <span className="text-congo-red font-bold">Une Nation Sans Défense Numérique</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Chaque jour, des acteurs malveillants utilisent la désinformation comme 
            <span className="font-semibold text-congo-red"> arme de destruction massive</span> contre la RDC
          </p>
        </motion.div>

        {/* The Current Reality */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <AlertOctagon className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-2xl font-semibold text-center mb-4 text-red-800 dark:text-red-200">
            La Réalité Actuelle
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">AUCUN</div>
              <p className="text-gray-700 dark:text-gray-300">Système de détection</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">TARDIVE</div>
              <p className="text-gray-700 dark:text-gray-300">Réaction aux menaces</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">GRAVES</div>
              <p className="text-gray-700 dark:text-gray-300">Conséquences subies</p>
            </div>
          </div>
        </motion.div>

        {/* Real Impacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow"
            >
              <div className={`h-2 bg-gradient-to-r ${impact.color}`}></div>
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${impact.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <impact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{impact.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {impact.example}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Vicious Cycle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 text-center"
        >
          <Newspaper className="w-12 h-12 mx-auto mb-4 text-gray-600 dark:text-gray-400" />
          <h3 className="text-xl font-semibold mb-4">Le Cycle Vicieux</h3>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
            <span className="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow">
              Fausse info publiée
            </span>
            <span className="text-2xl">→</span>
            <span className="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow">
              Propagation virale
            </span>
            <span className="text-2xl">→</span>
            <span className="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow">
              Réactions négatives
            </span>
            <span className="text-2xl">→</span>
            <span className="bg-red-100 dark:bg-red-900/50 px-4 py-2 rounded-lg shadow font-semibold text-red-700 dark:text-red-300">
              Dégâts irréversibles
            </span>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-800 dark:text-gray-200">
            Sans SENTINEL, ce cycle se répète <span className="text-congo-red font-bold">continuellement</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}