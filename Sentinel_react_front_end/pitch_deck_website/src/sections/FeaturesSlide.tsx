import { Search, Brain, Map, Bell, Users, BarChart3, Shield, FileText, Globe, Bot, TrendingUp, Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function FeaturesSlide() {
  const features = [
    {
      category: "Protection des Citoyens",
      icon: Shield,
      color: "from-blue-500 to-blue-600",
      items: [
        "Stoppe la désinformation avant qu'elle ne provoque des violences",
        "Protège des millions de Congolais des manipulations quotidiennes",
        "Détecte les campagnes de division communautaire en 2.4 secondes",
        "Alertes précoces pour prévenir les crises sécuritaires"
      ]
    },
    {
      category: "Défense Économique",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      items: [
        "Protège notre réputation internationale et attire les investisseurs",
        "Neutralise les fausses infos sur nos ressources naturelles",
        "Défend nos secteurs stratégiques contre la guerre économique",
        "Mesure l'impact financier des campagnes de désinformation"
      ]
    },
    {
      category: "Intelligence Multi-Sources",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      items: [
        "Analyse des millions de messages impossibles à traiter manuellement",
        "Détecte 96.3% des bots et acteurs étrangers malveillants",
        "Révèle les réseaux coordonnés invisibles à l'œil nu",
        "Comprend Lingala, Swahili, Kikongo et dialectes locaux"
      ]
    },
    {
      category: "Vision Nationale Claire",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      items: [
        "Capture l'opinion publique réelle à travers toutes les provinces",
        "Identifie les préoccupations émergentes noyées dans le bruit",
        "Permet une gouvernance moderne basée sur des données réelles",
        "Transforme le feedback citoyen en politiques efficaces"
      ]
    }
  ];

  const technicalSpecs = [
    { icon: Globe, label: "Couverture Nationale", detail: "26 provinces, toutes communautés" },
    { icon: Zap, label: "Vitesse Écrasante", detail: "Analyse millions msg/minute" },
    { icon: Bot, label: "Détection Avancée", detail: "Bots, deepfakes, réseaux cachés" },
    { icon: Shield, label: "Action Immédiate", detail: "Neutralisation automatique" }
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
            <span className="gradient-text font-bold">Capacités Complètes</span> du Système
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Chaque fonctionnalité conçue pour résoudre les défis spécifiques de la RDC: 
            volume écrasant, vitesse virale, acteurs cachés, et impacts dévastateurs
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.category}</h3>
                </div>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 mb-12"
        >
          <h3 className="text-2xl font-semibold text-center mb-6">Tableau de Bord Exécutif</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">45M+</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Congolais protégés</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold">2.4s</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Détection menaces</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
              <Globe className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">11</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Plateformes surveillées</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <div className="text-2xl font-bold">96.3%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Précision détection</p>
            </div>
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-center mb-6">Solutions aux Défis Critiques</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center card-shadow">
                <spec.icon className="w-8 h-8 mx-auto mb-2 text-congo-blue" />
                <h4 className="font-medium mb-1">{spec.label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{spec.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 bg-gradient-to-r from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-6 text-center"
        >
          <p className="text-lg font-medium">
            SENTINEL transforme l'<span className="text-congo-red font-bold">impossible défi manuel</span> en une 
            <span className="text-emerald-600 font-bold">protection automatisée</span> pour <span className="text-congo-blue font-bold">45 millions de Congolais</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}