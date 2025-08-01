import { Monitor, AlertCircle, TrendingUp, Map, Search, Network, Bot, Shield, BarChart3, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export function DemoSlide() {
  const dashboardMetrics = [
    { value: "45M+", label: "Congolais protégés", color: "text-blue-600" },
    { value: "11", label: "Plateformes surveillées", color: "text-purple-600" },
    { value: "2.4s", label: "Détection menaces", color: "text-orange-600" },
    { value: "0", label: "Violences évitées", color: "text-emerald-600" }
  ];

  const interfaceFeatures = [
    { icon: Network, title: "Réseaux Invisibles Révélés", desc: "Détecte connexions cachées impossibles à voir manuellement" },
    { icon: Bot, title: "Acteurs Étrangers Exposés", desc: "96.3% précision identification manipulateurs" },
    { icon: AlertCircle, title: "Alertes Avant Violence", desc: "Prévient crises avant qu'elles n'éclatent" },
    { icon: TrendingUp, title: "Protection Économique", desc: "Stoppe désinformation sur nos ressources" },
    { icon: Map, title: "Vision Nationale Complète", desc: "26 provinces, toutes communautés en temps réel" },
    { icon: BarChart3, title: "Opinion Publique Claire", desc: "Gouvernance moderne basée sur données réelles" }
  ];

  const realExample = {
    title: "Démonstration Live: Attaque Multi-Plateforme Neutralisée",
    timeline: [
      { time: "0 sec", event: "Campagne massive détectée: 'Tensions ethniques' sur 5 plateformes", metric: "1,247 msg/minute" },
      { time: "2.4 sec", event: "Acteurs étrangers identifiés manipulant notre jeunesse", metric: "312 bots + 87 comptes coordonnés" },
      { time: "30 sec", event: "Réseaux cachés révélés: serveurs externes orchestrent division", metric: "Connexions invisibles mappées" },
      { time: "2 min", event: "Prédiction: Violence imminente dans 3 provinces si non stoppé", metric: "Alerte CRITIQUE" },
      { time: "5 min", event: "Contre-narratifs de paix diffusés + leaders communautaires alertés", metric: "11 plateformes activées" },
      { time: "15 min", event: "Tensions désamorcées, communautés unifiées, paix préservée", metric: "0 violence, 45M protégés" }
    ]
  };

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
            <span className="gradient-text font-bold">Démonstration</span> du Système
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Voyez comment SENTINEL transforme l'impossible défi manuel en protection automatisée 
            pour 45 millions de Congolais en temps réel
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {dashboardMetrics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center card-shadow">
              <div className={`text-3xl font-bold ${metric.color}`}>{metric.value}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{metric.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Interface Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">Interface de Contrôle SENTINEL</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interfaceFeatures.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 card-shadow">
                <feature.icon className="w-10 h-10 text-congo-blue mb-3" />
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Real Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">{realExample.title}</h3>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-24 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-orange-500 to-emerald-500"></div>
              
              {/* Timeline events */}
              <div className="space-y-6">
                {realExample.timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-6"
                  >
                    <div className="w-20 text-right font-mono text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {item.time}
                    </div>
                    <div className="w-4 h-4 bg-white border-2 border-congo-blue rounded-full z-10"></div>
                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-4 card-shadow">
                      <p className="font-medium mb-1">{item.event}</p>
                      <p className="text-sm text-congo-blue font-semibold">{item.metric}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <p className="text-emerald-800 dark:text-emerald-300 font-medium">
                  Résultat: Vies sauvées | Communautés unies | Économie protégée | Paix préservée
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}