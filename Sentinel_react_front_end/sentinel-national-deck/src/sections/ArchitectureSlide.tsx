import { Cloud, Database, Shield, Zap, Globe, Lock, Users, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export function ArchitectureSlide() {
  const architectureLayers = [
    {
      layer: "Sources de Données",
      icon: Globe,
      components: [
        "Twitter/X API Enterprise",
        "Google News API",
        "Médias locaux (7sur7.cd)",
        "Plateformes sociales futures"
      ],
      color: "from-blue-500 to-blue-600",
      position: "top"
    },
    {
      layer: "Ingestion & Traitement",
      icon: Zap,
      components: [
        "Pipeline temps réel",
        "Analyse IA/ML (Gemini)",
        "Détection de sentiment",
        "Classification automatique"
      ],
      color: "from-purple-500 to-purple-600",
      position: "middle-top"
    },
    {
      layer: "Stockage & Index",
      icon: Database,
      components: [
        "Elasticsearch distribué",
        "Stockage pétaoctets",
        "Index sémantique",
        "Historique complet"
      ],
      color: "from-emerald-500 to-emerald-600",
      position: "middle"
    },
    {
      layer: "Analyse & Intelligence",
      icon: BarChart3,
      components: [
        "Moteurs de corrélation",
        "Détection d'anomalies",
        "Cartographie de réseaux",
        "Prédiction de tendances"
      ],
      color: "from-orange-500 to-orange-600",
      position: "middle-bottom"
    },
    {
      layer: "Interface & Sécurité",
      icon: Shield,
      components: [
        "Tableau de bord gouvernemental",
        "Contrôle d'accès RBAC",
        "Chiffrement bout en bout",
        "Audit complet"
      ],
      color: "from-red-500 to-red-600",
      position: "bottom"
    }
  ];

  const infrastructure = [
    {
      title: "Cloud Souverain",
      icon: Cloud,
      details: [
        "Google Cloud Platform - Région Afrique",
        "Conformité GDPR et standards gouvernementaux",
        "Redondance multi-zones",
        "Sauvegarde automatisée"
      ]
    },
    {
      title: "Sécurité Renforcée", 
      icon: Lock,
      details: [
        "Chiffrement AES-256 en repos et en transit",
        "Authentification multi-facteurs",
        "Séparation réseau complète",
        "Monitoring de sécurité 24/7"
      ]
    },
    {
      title: "Équipe Technique",
      icon: Users,
      details: [
        "Ingénieurs congolais certifiés",
        "Formation continue internationale",
        "Support technique dédié",
        "Transfert de connaissances complet"
      ]
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
            <span className="gradient-text">Architecture Technique</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Infrastructure souveraine conçue pour traiter des pétaoctets de données
            en temps réel avec sécurité gouvernementale.
          </p>
        </motion.div>

        {/* Architecture Flow with Visual Data Processing */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Flux de Données SENTINEL</h3>
          
          {/* Visual data flow representation */}
          <div className="relative bg-gradient-to-b from-blue-50 to-gray-50 dark:from-blue-900/10 dark:to-gray-800/20 rounded-2xl p-8 mb-8">
            {/* Data sources visualization */}
            <div className="flex justify-around items-start mb-8">
              <div className="text-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-2"
                >
                  <Globe className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Twitter/X</p>
              </div>
              <div className="text-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-2"
                >
                  <Globe className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Google News</p>
              </div>
              <div className="text-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mb-2"
                >
                  <Globe className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-xs text-gray-600 dark:text-gray-400">7sur7.cd</p>
              </div>
            </div>
            
            {/* Data flow streams */}
            <div className="relative h-32 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 140, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "linear"
                  }}
                  className="absolute w-2 h-8 bg-blue-400 rounded-full opacity-60"
                  style={{ left: `${10 + (i % 5) * 20}%` }}
                />
              ))}
              
              {/* Processing center */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 border-4 border-congo-blue rounded-full flex items-center justify-center bg-white dark:bg-gray-800"
                >
                  <Zap className="w-8 h-8 text-congo-blue" />
                </motion.div>
              </div>
            </div>
            
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Ingestion en temps réel : Millions de messages analysés par seconde
            </p>
          </div>
          
          <div className="space-y-6">
            {architectureLayers.map((layer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow relative"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${layer.color} rounded-t-xl`}></div>
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${layer.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <layer.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-3">{layer.layer}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {layer.components.map((component, compIndex) => (
                        <motion.div 
                          key={compIndex} 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + compIndex * 0.1 }}
                          className="text-sm bg-gray-50 dark:bg-gray-700 rounded px-3 py-2 border border-gray-200 dark:border-gray-600"
                        >
                          {component}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Flow arrows between layers */}
                {index < architectureLayers.length - 1 && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-congo-blue"
                    >
                      ↓
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Infrastructure Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infrastructure.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow text-center"
            >
              <item.icon className="w-16 h-16 text-congo-blue mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-4">{item.title}</h4>
              <ul className="space-y-2 text-left">
                {item.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start space-x-2">
                    <span className="text-emerald-500 mt-1 text-sm">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12 bg-gradient-to-r from-congo-blue to-congo-red rounded-xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            Infrastructure Souveraine et Scalable
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="text-3xl font-bold mb-2">Pétaoctets</div>
              <div className="text-sm opacity-90">Capacité de stockage</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Monitoring et support</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Contrôle congolais</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}