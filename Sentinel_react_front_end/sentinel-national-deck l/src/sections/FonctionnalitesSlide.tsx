import { Database, Search, Bell, Smartphone, BarChart3, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export function FonctionnalitesSlide() {
  const features = [
    {
      icon: Database,
      title: "Surveillance Multi-Sources",
      description: "Ingestion systématique de l'écosystème médiatique complet",
      details: [
        "Twitter/X, Google News, 7sur7.cd pour le MVP",
        "Extension future : Facebook, TikTok, WhatsApp",
        "Traitement texte, images, vidéos, audio",
        "Capacité : millions de messages par jour"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Analyse de Données",
      description: "Intelligence artificielle pour détecter patterns et sentiment",
      details: [
        "Détection de sentiment en temps réel",
        "Reconnaissance d'entités et thèmes récurrents",
        "Distinction discussion normale vs. campagnes coordonnées",
        "Support Lingala, Swahili, Kikongo, dialectes locaux"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Search,
      title: "Propagation & Influence",
      description: "Traçage des réseaux et mesure d'impact",
      details: [
        "Cartographie des réseaux de diffusion",
        "Identification des amplificateurs clés",
        "Détection de viralité précoce",
        "Révélation de campagnes coordonnées cachées"
      ],
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Bell,
      title: "Alertes Critiques",
      description: "Système d'alerte précoce automatisé",
      details: [
        "Notifications immédiates aux décideurs",
        "Escalade basée sur la sévérité",
        "Alertes spécialisées (santé, élections, sécurité)",
        "Interface mobile pour urgences"
      ],
      color: "from-red-500 to-red-600"
    },
    {
      icon: Shield,
      title: "Module Contre-Réponse",
      description: "Capacité de réponse gouvernementale organisée",
      details: [
        "Suivi d'efficacité des messages correctifs",
        "Workflows de validation rapide",
        "Coordination inter-agences",
        "Mesure d'impact des contre-narratifs"
      ],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Smartphone,
      title: "Application Mobile",
      description: "Canal direct gouvernement-citoyens",
      details: [
        "Vérification instantanée des faits",
        "Diffusion d'informations officielles",
        "Alertes d'urgence nationales",
        "Interface citoyenne simplifiée"
      ],
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: BarChart3,
      title: "Visualisation de Données",
      description: "Tableaux de bord pour décideurs",
      details: [
        "Vue temps réel de l'espace informationnel",
        "Cartes géographiques de propagation",
        "Graphiques de tendances et évolutions",
        "Rapports automatisés personnalisés"
      ],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Users,
      title: "Gestion des Accès",
      description: "Sécurité et permissions par rôles",
      details: [
        "Contrôle d'accès basé sur les rôles",
        "Audit complet des actions utilisateurs",
        "Chiffrement des données sensibles",
        "Conformité aux standards gouvernementaux"
      ],
      color: "from-gray-500 to-gray-600"
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
            <span className="gradient-text">Fonctionnalités Système</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Suite complète d'outils conçus pour transformer l'impossible défi manuel 
            en protection automatisée pour tous les Congolais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden card-shadow"
            >
              <div className={`h-1 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2">
                      <span className="text-emerald-500 mt-1 text-xs">▪</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{detail}</span>
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
          className="mt-12 bg-gradient-to-r from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-6 text-center"
        >
          <p className="text-lg font-medium">
            Chaque fonctionnalité répond aux défis spécifiques de la RDC : 
            <span className="text-congo-blue font-bold"> volume écrasant</span>, 
            <span className="text-congo-red font-bold"> vitesse virale</span>, 
            <span className="text-emerald-600 font-bold"> acteurs cachés</span>, et 
            <span className="text-orange-600 font-bold"> impacts dévastateurs</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}