import { CheckCircle, ArrowRight, AlertTriangle, Clock, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function NextStepsSlide() {
  const actions = [
    {
      title: "Validation Immédiate (7 jours)",
      icon: Shield,
      urgent: true,
      tasks: [
        "Décision du Conseil des Ministres pour stopper les menaces",
        "Approbation du budget de protection nationale",
        "Mandat présidentiel pour défense informationnelle"
      ]
    },
    {
      title: "Mobilisation Rapide (14 jours)",
      icon: Clock,
      urgent: true,
      tasks: [
        "Activation équipe d'urgence SENTINEL",
        "Sélection sites prioritaires (zones à risque)",
        "Début protection immédiate des citoyens vulnérables"
      ]
    },
    {
      title: "Déploiement National (30 jours)",
      icon: TrendingUp,
      tasks: [
        "Couverture complète 11 plateformes principales",
        "Protection active 45 millions de Congolais",
        "Neutralisation acteurs étrangers malveillants"
      ]
    },
    {
      title: "Excellence Opérationnelle (90 jours)",
      icon: CheckCircle,
      tasks: [
        "Formation complète experts congolais",
        "Gouvernance moderne basée sur opinion publique",
        "RDC leader africain contre désinformation"
      ]
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
            <span className="gradient-text font-bold">Prochaines Étapes</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Chaque jour de retard = Plus de vies en danger, plus de pertes économiques, 
            plus de citoyens manipulés. Agissons maintenant.
          </p>
        </motion.div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <div className={`w-8 h-8 ${action.urgent ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-congo-blue to-congo-blue/80'} rounded-lg flex items-center justify-center mr-3`}>
                  {action.icon ? <action.icon className="w-4 h-4 text-white" /> : <span className="text-white font-medium">{index + 1}</span>}
                </div>
                {action.title}
              </h3>
              <ul className="space-y-2">
                {action.tasks.map((task, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {task}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Urgency Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-8 card-shadow text-center border border-red-200 dark:border-red-800"
        >
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4 text-red-800 dark:text-red-200">Le Coût de l'Inaction Augmente Chaque Jour</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">24h</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">= Plus de vies en danger</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">7 jours</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">= Millions perdus en économie</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">30 jours</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">= Divisions irréversibles</p>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-2 text-emerald-700 dark:text-emerald-300 font-medium">
            <span>La protection commence dès votre décision</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-congo-blue to-congo-red p-1 rounded-xl inline-block">
            <div className="bg-white dark:bg-gray-900 rounded-lg px-8 py-6">
              <p className="text-xl font-semibold gradient-text mb-3">
                Le Choix Est Clair: Agir ou Subir
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Protégeons nos citoyens. Sauvons des vies. Défendons notre économie.
                <br />Unifions notre nation. <span className="text-emerald-600">Le moment est MAINTENANT.</span>
              </p>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-600">
            Ce document est confidentiel et destiné uniquement aux autorités gouvernementales 
            de la République Démocratique du Congo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}