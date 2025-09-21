import { Search, BarChart3, AlertTriangle, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export function CapacitesSlide() {
  const capacites = [
    {
      icon: Search,
      title: "Surveillance Multi-Sources",
      description: "Surveillance systématique de tout l'écosystème médiatique",
      features: [
        "Texte : Twitter, articles, blogs, commentaires",
        "Images : Mèmes, infographies, photos manipulées", 
        "Vidéos : Clips, livestreams, TikTok, YouTube",
        "Audio : Podcasts, discours, notes vocales"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Analyse et Intelligence",
      description: "Transformation des données en renseignement actionnable",
      features: [
        "Analyse de sentiment et détection de tendances",
        "Traçage de propagation et réseaux d'influence",
        "Modules d'IA prédictive et détection d'anomalies",
        "Recherche sémantique et découverte de patterns"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: AlertTriangle,
      title: "Alertes et Réponse",
      description: "Système d'alerte précoce et support décisionnel",
      features: [
        "Alertes automatisées pour événements critiques",
        "Module de contre-réponse et suivi d'efficacité",
        "Notifications ciblées aux décideurs clés",
        "Dashboards et visualisations en temps réel"
      ],
      color: "from-red-500 to-red-600"
    },
    {
      icon: Smartphone,
      title: "Application Mobile",
      description: "Canal direct entre le gouvernement et les citoyens",
      features: [
        "Vérification instantanée des faits",
        "Information officielle directe aux citoyens",
        "Communication d'urgence rapide",
        "Renforcement de la confiance publique"
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
            <span className="gradient-text">Capacités Principales</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Chaque capacité conçue comme un instrument stratégique au service
            de la souveraineté et de la stabilité de la RDC.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capacites.map((capacite, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow"
            >
              <div className={`h-3 bg-gradient-to-r ${capacite.color}`}></div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${capacite.color} rounded-xl flex items-center justify-center`}>
                    <capacite.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{capacite.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{capacite.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {capacite.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <span className="text-emerald-500 mt-1 text-sm">⬥</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 bg-gradient-to-r from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-8 text-center"
        >
          <p className="text-lg font-medium">
            Une vue unifiée qui permet aux autorités gouvernementales de passer de l'incertitude à la clarté,
            et de la réaction à <span className="text-congo-blue font-bold">l'anticipation stratégique</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}