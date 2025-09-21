import { Search, BarChart3, AlertTriangle, Smartphone, Database, Globe, Zap, TrendingUp } from 'lucide-react';
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

  // Multi-source Data Ingestion Funnel
  const DataIngestionFunnel = () => {
    const sources = [
      { name: 'Twitter/X', count: '2.3M', color: '#1DA1F2', icon: Globe },
      { name: 'Facebook', count: '1.8M', color: '#4267B2', icon: Globe },
      { name: 'Médias Locaux', count: '450K', color: '#10b981', icon: Globe },
      { name: 'YouTube', count: '890K', color: '#FF0000', icon: Globe },
      { name: 'WhatsApp', count: '1.2M', color: '#25D366', icon: Smartphone }
    ];

    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Ingestion Multi-Sources en Temps Réel</h4>
        
        <div className="relative">
          {/* Sources */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            {sources.map((source, index) => (
              <motion.div
                key={source.name}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-2 mx-auto shadow-lg"
                  style={{ backgroundColor: source.color }}
                >
                  <source.icon className="w-6 h-6 text-white" />
                </motion.div>
                <p className="text-xs font-medium">{source.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{source.count}/jour</p>
              </motion.div>
            ))}
          </div>

          {/* Funnel visualization */}
          <div className="relative h-32 mb-4">
            <svg viewBox="0 0 400 120" className="w-full h-full">
              {/* Funnel shape */}
              <motion.path
                d="M 50 20 L 350 20 L 300 60 L 100 60 L 80 100 L 320 100 Z"
                fill="url(#funnelGradient)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ delay: 1, duration: 2 }}
              />
              
              {/* Data flow particles */}
              {[...Array(15)].map((_, i) => (
                <motion.circle
                  key={i}
                  r="2"
                  fill="#3b82f6"
                  initial={{ cx: 50 + i * 20, cy: 20, opacity: 0 }}
                  animate={{ cx: 200, cy: 100, opacity: [0, 1, 0] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.2,
                    ease: "linear" 
                  }}
                />
              ))}
              
              <defs>
                <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Processing center */}
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-2"
            >
              <Database className="w-8 h-8 text-white" />
            </motion.div>
            <p className="text-sm font-medium">Centre de Traitement IA</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">6.7M messages traités/jour</p>
          </div>
        </div>
      </div>
    );
  };

  // Real-time Sentiment Analysis Meter
  const SentimentMeter = () => {
    const sentimentData = [
      { label: 'Positif', value: 45, color: '#10b981' },
      { label: 'Neutre', value: 35, color: '#6b7280' },
      { label: 'Négatif', value: 20, color: '#ef4444' }
    ];

    return (
      <div className="bg-gradient-to-br from-emerald-50 to-red-50 dark:from-emerald-900/10 dark:to-red-900/10 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Analyse de Sentiment en Temps Réel</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sentiment gauge */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 mb-4">
              <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                
                {/* Sentiment arcs */}
                {sentimentData.map((sentiment, index) => {
                  const offset = sentimentData.slice(0, index).reduce((sum, item) => sum + item.value, 0);
                  const circumference = 2 * Math.PI * 60;
                  const strokeDasharray = `${(sentiment.value / 100) * circumference} ${circumference}`;
                  const strokeDashoffset = -((offset / 100) * circumference);

                  return (
                    <motion.circle
                      key={sentiment.label}
                      cx="80"
                      cy="80"
                      r="60"
                      stroke={sentiment.color}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      initial={{ strokeDasharray: `0 ${circumference}` }}
                      animate={{ strokeDasharray, strokeDashoffset }}
                      transition={{ delay: 0.5 + index * 0.3, duration: 1.5 }}
                    />
                  );
                })}
              </svg>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">Stable</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Climat social</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              {sentimentData.map((sentiment) => (
                <div key={sentiment.label} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: sentiment.color }}
                  />
                  <span className="text-sm">{sentiment.label}: {sentiment.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trending topics */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Sujets Tendance (24h)</h5>
            <div className="space-y-3">
              {[
                { topic: '#ElectionsCongo2024', trend: '+127%', sentiment: 'positive' },
                { topic: 'Économie nationale', trend: '+45%', sentiment: 'neutral' },
                { topic: 'Sécurité routière', trend: '+23%', sentiment: 'negative' },
                { topic: 'Éducation numérique', trend: '+89%', sentiment: 'positive' },
              ].map((item, index) => (
                <motion.div
                  key={item.topic}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.2 }}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-medium text-sm">{item.topic}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Tendance {item.trend}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    item.sentiment === 'positive' ? 'bg-emerald-500' :
                    item.sentiment === 'neutral' ? 'bg-gray-500' : 'bg-red-500'
                  }`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Network Influence Mapping
  const NetworkMapping = () => {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6">
        <h4 className="text-xl font-bold text-center mb-6">Cartographie d'Influence et Réseaux</h4>
        
        <div className="relative h-64 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
          {/* Network nodes */}
          {[
            { x: '50%', y: '30%', size: 'large', type: 'source', label: 'Source Primaire' },
            { x: '25%', y: '60%', size: 'medium', type: 'influencer', label: 'Influenceur' },
            { x: '75%', y: '60%', size: 'medium', type: 'influencer', label: 'Influenceur' },
            { x: '15%', y: '85%', size: 'small', type: 'user', label: 'Utilisateurs' },
            { x: '35%', y: '85%', size: 'small', type: 'user', label: 'Utilisateurs' },
            { x: '65%', y: '85%', size: 'small', type: 'user', label: 'Utilisateurs' },
            { x: '85%', y: '85%', size: 'small', type: 'user', label: 'Utilisateurs' },
          ].map((node, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center ${
                node.size === 'large' ? 'w-12 h-12 bg-red-500' :
                node.size === 'medium' ? 'w-8 h-8 bg-orange-500' :
                'w-4 h-4 bg-blue-500'
              }`}
              style={{ left: node.x, top: node.y }}
            >
              {node.size === 'large' && <AlertTriangle className="w-6 h-6 text-white" />}
              {node.size === 'medium' && <TrendingUp className="w-4 h-4 text-white" />}
            </motion.div>
          ))}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {[
              { x1: '50%', y1: '30%', x2: '25%', y2: '60%' },
              { x1: '50%', y1: '30%', x2: '75%', y2: '60%' },
              { x1: '25%', y1: '60%', x2: '15%', y2: '85%' },
              { x1: '25%', y1: '60%', x2: '35%', y2: '85%' },
              { x1: '75%', y1: '60%', x2: '65%', y2: '85%' },
              { x1: '75%', y1: '60%', x2: '85%', y2: '85%' },
            ].map((line, index) => (
              <motion.line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#6b7280"
                strokeWidth="2"
                strokeDasharray="3,3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ delay: 1 + index * 0.1, duration: 1 }}
              />
            ))}
            
            {/* Information flow animation */}
            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={i}
                r="2"
                fill="#ef4444"
                initial={{ cx: '50%', cy: '30%', opacity: 0 }}
                animate={{ 
                  cx: i % 2 === 0 ? '25%' : '75%', 
                  cy: '60%', 
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: i * 0.3,
                  ease: "linear"
                }}
              />
            ))}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-2 left-2 right-2 bg-white dark:bg-gray-800 bg-opacity-90 rounded p-2">
            <div className="flex items-center justify-around text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Source</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Relayeurs</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Audience</span>
              </div>
            </div>
          </div>
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
            <span className="gradient-text">Capacités Principales</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Chaque capacité conçue comme un instrument stratégique au service
            de la souveraineté et de la stabilité de la RDC.
          </p>
        </motion.div>

        <DataIngestionFunnel />
        <SentimentMeter />
        <NetworkMapping />

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