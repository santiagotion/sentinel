import { Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export function RoadmapSlide() {
  const roadmap = [
    {
      year: "Année 1",
      budget: "4,5M $",
      title: "Capacité Nationale de Base",
      deliverables: [
        "Surveillance principale et analyse de sentiment",
        "Détection de viralité et tableaux de bord", 
        "Système d'alerte et contrôles d'accès sécurisés",
        "Formation des analystes gouvernementaux"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      year: "Année 2",
      budget: "2,5M $",
      title: "Expansion des Capacités",
      deliverables: [
        "Couverture multimédia : images, vidéo, audio",
        "Tableaux de bord avancés et cartographie de propagation",
        "Capacité de calcul et stockage augmentés",
        "Spécialisation de l'équipe congolaise"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      year: "Année 3",
      budget: "3,0M $",
      title: "Déploiement Suite Complète",
      deliverables: [
        "IA prédictive et détection d'anomalies",
        "Application mobile pour communication citoyenne",
        "Outils de contre-réponse et workflows",
        "Institution permanente et modèle régional"
      ],
      color: "from-emerald-500 to-emerald-600"
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
            Feuille de Route
            <span className="gradient-text block">Programme Triennal - 10M $</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Une approche par phases pour établir SENTINEL comme institution permanente 
            et modèle continental de souveraineté numérique.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
          
          {roadmap.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow">
                  <div className={`h-2 bg-gradient-to-r ${phase.color} rounded-t-xl -mx-6 -mt-6 mb-4`}></div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{phase.year}</h3>
                    <div className="text-right">
                      <div className="text-xl font-bold text-congo-blue">{phase.budget}</div>
                      <div className="text-sm text-gray-500">Budget</div>
                    </div>
                  </div>
                  
                  <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                    {phase.title}
                  </h4>
                  
                  <ul className="space-y-2">
                    {phase.deliverables.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-2">
                        <span className="text-emerald-500 mt-1 text-sm">✓</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white dark:bg-gray-800 border-4 border-congo-blue rounded-full flex items-center justify-center z-10">
                <div className="w-3 h-3 bg-congo-blue rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-16 bg-gradient-to-r from-congo-blue to-congo-red rounded-xl p-8 text-center text-white"
        >
          <Rocket className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            Année 1 n'est pas un pilote - c'est la fondation
          </h3>
          <p className="text-lg opacity-90 max-w-4xl mx-auto">
            Dès la première année, SENTINEL devient une capacité nationale opérationnelle 
            qui évoluera vers un programme national à long terme de 10 millions de dollars sur trois ans.
          </p>
        </motion.div>
      </div>
    </section>
  );
}