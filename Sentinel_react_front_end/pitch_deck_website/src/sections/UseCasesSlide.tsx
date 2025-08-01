import { Vote, Shield, TrendingUp, AlertTriangle, CheckCircle2, XCircle, Users, Globe, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export function UseCasesSlide() {
  const useCases = [
    {
      icon: Shield,
      title: "Prévention de Violences",
      scenario: "Quand des vies sont en jeu",
      problem: {
        title: "Sans SENTINEL",
        points: [
          "Des vies perdues quand la désinformation provoque des violences",
          "Tensions mineures transformées en conflits majeurs",
          "Campagnes orchestrées détruisent la confiance entre communautés",
          "Réaction tardive après propagation virale"
        ]
      },
      solution: {
        title: "Avec SENTINEL",
        points: [
          "Détection rapide avant que les tensions n'éclatent",
          "Identification des acteurs étrangers manipulateurs",
          "Alertes précoces aux leaders communautaires et autorités",
          "Contre-narratifs de paix diffusés instantanément"
        ]
      },
      color: "from-red-500 to-red-600"
    },
    {
      icon: TrendingUp,
      title: "Défense de l'Économie",
      scenario: "Protection des secteurs stratégiques",
      problem: {
        title: "Sans SENTINEL",
        points: [
          "L'économie souffre quand les fausses infos éloignent les investisseurs",
          "Désinformation sur nos ressources naturelles non détectée",
          "Image internationale ternie dans les médias étrangers",
          "Guerre économique contre nos secteurs vitaux"
        ]
      },
      solution: {
        title: "Avec SENTINEL",
        points: [
          "Protection active de notre réputation économique 24/7",
          "Neutralisation des campagnes avant impact sur les marchés",
          "Données factuelles fournies aux investisseurs en temps réel",
          "Pertes économiques majeures évitées"
        ]
      },
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Users,
      title: "Protection des Citoyens",
      scenario: "Contre la manipulation quotidienne",
      problem: {
        title: "Sans SENTINEL",
        points: [
          "Millions de Congolais bombardés de fausses infos chaque jour",
          "Jeunesse manipulée par des acteurs étrangers sur réseaux sociaux",
          "Chaque téléphone est un champ de bataille non protégé",
          "Volume écrasant impossible à analyser manuellement"
        ]
      },
      solution: {
        title: "Avec SENTINEL",
        points: [
          "Tous les Congolais protégés par surveillance multi-plateforme",
          "Toutes les plateformes majeures surveillées, millions de messages analysés",
          "Réseaux cachés et connexions invisibles révélés instantanément",
          "Chaque citoyen reçoit l'info vérifiée, pas la manipulation"
        ]
      },
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Brain,
      title: "Gouvernance Moderne",
      scenario: "Comprendre le pouls de la nation",
      problem: {
        title: "Sans SENTINEL",
        points: [
          "Opinion publique réelle noyée dans le bruit numérique",
          "Signaux faibles des préoccupations émergentes manqués",
          "Politiques déconnectées des besoins réels des citoyens",
          "Opportunités de transformation manquées"
        ]
      },
      solution: {
        title: "Avec SENTINEL",
        points: [
          "Vision claire de l'opinion à travers toutes les provinces en temps réel",
          "Préoccupations citoyennes capturées dans toutes les langues locales",
          "Politiques ajustées selon feedback = satisfaction citoyenne améliorée",
          "Gouvernance basée sur données, pas sur suppositions"
        ]
      },
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="h-full flex items-center justify-center p-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="gradient-text font-bold">Cas d'Usage</span> Concrets
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            SENTINEL résout chaque problème identifié: des millions bombardés quotidiennement, 
            violences provoquées, économie affaiblie, et communautés divisées
          </p>
        </motion.div>

        <div className="space-y-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.5 }}
            >
              {/* Use Case Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-r ${useCase.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <useCase.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">{useCase.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{useCase.scenario}</p>
                </div>
              </div>

              {/* Before/After Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Without SENTINEL */}
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <h4 className="font-semibold text-red-800 dark:text-red-300">{useCase.problem.title}</h4>
                  </div>
                  <ul className="space-y-3">
                    {useCase.problem.points.map((point, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* With SENTINEL */}
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">{useCase.solution.title}</h4>
                  </div>
                  <ul className="space-y-3">
                    {useCase.solution.points.map((point, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 bg-gradient-to-r from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-6 text-center"
        >
          <p className="text-lg font-medium">
            SENTINEL transforme chaque <span className="text-congo-red font-bold">vulnérabilité</span> en <span className="text-emerald-600 font-bold">force</span>, 
            chaque <span className="text-congo-red font-bold">menace</span> en <span className="text-emerald-600 font-bold">opportunité</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}