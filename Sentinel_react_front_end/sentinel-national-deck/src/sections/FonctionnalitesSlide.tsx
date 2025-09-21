import { Database, Search, Bell, Smartphone, BarChart3, Shield, Users, Settings, Activity, Zap, Network, Clock } from 'lucide-react';
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

  // System Architecture Flow Diagram
  const SystemArchitecture = () => {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Architecture Système SENTINEL</h4>
        
        <div className="relative">
          {/* Flow stages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              { name: 'Ingestion', icon: Database, color: 'bg-blue-500', data: '6.7M/jour' },
              { name: 'Analyse IA', icon: Zap, color: 'bg-purple-500', data: '< 5 sec' },
              { name: 'Détection', icon: Search, color: 'bg-emerald-500', data: '99.2%' },
              { name: 'Alerte', icon: Bell, color: 'bg-red-500', data: '< 1 min' }
            ].map((stage, index) => (
              <motion.div
                key={stage.name}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  className={`w-16 h-16 ${stage.color} rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg`}
                >
                  <stage.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h5 className="font-semibold">{stage.name}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stage.data}</p>
              </motion.div>
            ))}
          </div>

          {/* Connection arrows */}
          <div className="hidden md:block absolute top-8 left-0 right-0">
            <svg className="w-full h-8">
              {[1, 2, 3].map((i) => (
                <motion.line
                  key={i}
                  x1={`${i * 22 + 3}%`}
                  y1="50%"
                  x2={`${i * 22 + 19}%`}
                  y2="50%"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1 + i * 0.3, duration: 1 }}
                />
              ))}
              
              {/* Data flow particles */}
              {[...Array(8)].map((_, i) => (
                <motion.circle
                  key={i}
                  r="3"
                  fill="#3b82f6"
                  initial={{ cx: '3%', cy: '50%', opacity: 0 }}
                  animate={{ cx: '97%', cy: '50%', opacity: [0, 1, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "linear"
                  }}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Data flow visualization */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4">
          <h5 className="font-semibold mb-3 text-center">Flux de Traitement en Temps Réel</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">2.3M</div>
              <div className="text-gray-600 dark:text-gray-400">Messages/jour collectés</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">4.8s</div>
              <div className="text-gray-600 dark:text-gray-400">Temps analyse moyen</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-600">156</div>
              <div className="text-gray-600 dark:text-gray-400">Menaces détectées</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">23s</div>
              <div className="text-gray-600 dark:text-gray-400">Temps d'alerte moyen</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Performance Dashboard
  const PerformanceDashboard = () => {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-800 dark:to-emerald-900/20 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Tableau de Bord Performances</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Real-time metrics */}
          <div className="space-y-4">
            <h5 className="font-semibold flex items-center">
              <Activity className="w-5 h-5 mr-2 text-emerald-500" />
              Métriques Temps Réel
            </h5>
            
            {[
              { label: 'Disponibilité système', value: 99.9, color: 'emerald' },
              { label: 'Précision IA', value: 94.2, color: 'blue' },
              { label: 'Vitesse traitement', value: 87.5, color: 'purple' }
            ].map((metric, index) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{metric.label}</span>
                  <span className={`font-bold text-${metric.color}-600`}>{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 1.5 }}
                    className={`bg-${metric.color}-500 h-2 rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Processing capacity chart */}
          <div className="text-center">
            <h5 className="font-semibold mb-4 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
              Capacité Traitement
            </h5>
            <div className="relative">
              <svg viewBox="0 0 200 120" className="w-full h-24">
                {/* Capacity bars */}
                {[
                  { label: 'Texte', capacity: 85, color: '#3b82f6' },
                  { label: 'Images', capacity: 70, color: '#10b981' },
                  { label: 'Vidéos', capacity: 55, color: '#f59e0b' },
                  { label: 'Audio', capacity: 40, color: '#8b5cf6' }
                ].map((item, index) => (
                  <g key={item.label}>
                    <motion.rect
                      x={20 + index * 40}
                      y={100 - item.capacity * 0.8}
                      width="25"
                      height="0"
                      fill={item.color}
                      initial={{ height: 0 }}
                      animate={{ height: item.capacity * 0.8 }}
                      transition={{ delay: 0.8 + index * 0.2, duration: 1 }}
                    />
                    <text
                      x={32 + index * 40}
                      y="115"
                      textAnchor="middle"
                      className="text-xs fill-gray-600 dark:fill-gray-400"
                    >
                      {item.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Capacité par type de média (%)</p>
          </div>

          {/* Network status */}
          <div>
            <h5 className="font-semibold mb-4 flex items-center">
              <Network className="w-5 h-5 mr-2 text-purple-500" />
              Statut Réseau
            </h5>
            <div className="space-y-3">
              {[
                { source: 'Twitter/X API', status: 'active', latency: '12ms' },
                { source: 'Google News', status: 'active', latency: '8ms' },
                { source: '7sur7.cd', status: 'active', latency: '15ms' },
                { source: 'Elasticsearch', status: 'active', latency: '3ms' }
              ].map((item, index) => (
                <motion.div
                  key={item.source}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>{item.source}</span>
                  </div>
                  <span className="text-xs text-gray-500">{item.latency}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Multi-language Processing Visualization
  const LanguageSupport = () => {
    return (
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/10 dark:to-yellow-900/10 rounded-xl p-6">
        <h4 className="text-xl font-bold text-center mb-6">Support Multi-langues et Dialectes</h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { lang: 'Français', coverage: '95%', color: 'blue' },
            { lang: 'Lingala', coverage: '88%', color: 'emerald' },
            { lang: 'Swahili', coverage: '92%', color: 'purple' },
            { lang: 'Kikongo', coverage: '85%', color: 'orange' }
          ].map((language, index) => (
            <motion.div
              key={language.lang}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <div className="relative w-16 h-16 mx-auto mb-3">
                <svg viewBox="0 0 64 64" className="w-full h-full transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="24"
                    stroke="#e5e7eb"
                    strokeWidth="6"
                    fill="none"
                  />
                  <motion.circle
                    cx="32"
                    cy="32"
                    r="24"
                    stroke={
                      language.color === 'blue' ? '#3b82f6' :
                      language.color === 'emerald' ? '#10b981' :
                      language.color === 'purple' ? '#8b5cf6' : '#f59e0b'
                    }
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 24}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 24 * (1 - parseInt(language.coverage) / 100) }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 1.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">{language.coverage}</span>
                </div>
              </div>
              <h6 className="font-semibold">{language.lang}</h6>
              <p className="text-xs text-gray-600 dark:text-gray-400">Précision IA</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">Intelligence contextuelle</span> : Reconnaissance des expressions locales, 
            argot urbain, et références culturelles spécifiques à la RDC
          </p>
        </div>
      </div>
    );
  };

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

        <SystemArchitecture />
        <PerformanceDashboard />
        <LanguageSupport />

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