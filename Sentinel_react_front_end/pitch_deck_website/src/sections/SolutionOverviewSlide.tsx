import { Brain, Shield, Clock, Bot, CheckCircle, XCircle, BarChart3, AlertTriangle, Globe, TrendingUp, Users, Languages, Zap, Network } from 'lucide-react';
import { motion } from 'framer-motion';

export function SolutionOverviewSlide() {
  const comparisons = [
    {
      without: "Détection après propagation virale",
      with: "Détection en 2.4 secondes avec alertes",
      icon: Clock
    },
    {
      without: "Sources inconnues, acteurs invisibles",
      with: "Identification des bots (96.3% précision)",
      icon: Bot
    },
    {
      without: "Aucune compréhension des causes", 
      with: "Analyse causale profonde avec IA",
      icon: Brain
    },
    {
      without: "Réaction manuelle après dégâts",
      with: "Contre-actions automatiques ciblées",
      icon: Shield
    },
    {
      without: "Opinion publique reste un mystère",
      with: "Vision claire des sentiments citoyens",
      icon: TrendingUp
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
            <span className="gradient-text font-bold">SENTINEL: Notre Bouclier National</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            La réponse technologique souveraine de la RDC à la guerre de l'information
          </p>
        </motion.div>

        {/* SENTINEL Definition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-10 mb-12 border border-emerald-200 dark:border-emerald-800"
        >
          <p className="text-xl text-center text-gray-800 dark:text-gray-200 mb-6 leading-relaxed px-4">
            SENTINEL est une <strong>solution technologique</strong> qui combine surveillance en temps réel, 
            analyse IA de pointe, et contre-mesures automatisées pour <strong>protéger la RDC</strong> contre la guerre informationnelle.
          </p>
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 leading-relaxed px-8">
            Développé spécifiquement pour le contexte congolais, SENTINEL offrira une capacité unique de détecter, 
            analyser et neutraliser les campagnes de désinformation avant qu'elles n'affectent la stabilité nationale,
            tout en fournissant une <strong>compréhension claire de l'opinion publique</strong> pour une gouvernance moderne.
          </p>
        </motion.div>

        {/* Core Pillars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
            <h3 className="font-bold text-lg mb-2">Protection Complète</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stoppe la désinformation avant qu'elle ne provoque violences ou pertes économiques
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow text-center">
            <Brain className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
            <h3 className="font-bold text-lg mb-2">IA Multi-Plateforme</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Analyse des millions de messages impossibles à traiter manuellement
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
            <h3 className="font-bold text-lg mb-2">Vision Nationale</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Comprend l'opinion publique à travers toutes provinces et communautés
            </p>
          </div>
        </motion.div>

        {/* How SENTINEL Works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 mb-12"
        >
          <h3 className="text-2xl font-semibold text-center mb-6">La Technologie Derrière SENTINEL</h3>
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Nos agents intelligents travaillent <span className="font-semibold">24 heures sur 24</span> pour surveiller 
            automatiquement les conversations sur toutes les plateformes majeures. Ils collectent, vérifient et analysent des 
            millions de messages en croisant les données de <span className="font-semibold">sources multiples</span> pour 
            détecter les campagnes coordonnées invisibles à l'œil humain.
          </p>
        </motion.div>

        {/* Key Capabilities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-5 border border-blue-200 dark:border-blue-700">
            <BarChart3 className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <h4 className="font-medium text-sm mb-1">SURVEILLE</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Toutes les plateformes<br />Millions de messages
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-5 border border-purple-200 dark:border-purple-700">
            <AlertTriangle className="w-8 h-8 mx-auto text-purple-600 mb-2" />
            <h4 className="font-medium text-sm mb-1">DÉTECTE</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Menaces en temps réel<br />Réseaux coordonnés
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-5 border border-orange-200 dark:border-orange-700">
            <Brain className="w-8 h-8 mx-auto text-orange-600 mb-2" />
            <h4 className="font-medium text-sm mb-1">ANALYSE</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Comprend le contexte<br />Prédit les impacts
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg p-5 border border-emerald-200 dark:border-emerald-700">
            <Shield className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
            <h4 className="font-medium text-sm mb-1">NEUTRALISE</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Actions automatiques<br />Protection continue
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-lg p-5 border border-red-200 dark:border-red-700">
            <Users className="w-8 h-8 mx-auto text-red-600 mb-2" />
            <h4 className="font-medium text-sm mb-1">OPINION PUBLIQUE</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Sentiment citoyen<br />Tendances émergentes
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-lg p-5 border border-indigo-200 dark:border-indigo-700">
            <Languages className="w-8 h-8 mx-auto text-indigo-600 mb-2" />
            <h4 className="font-medium text-sm mb-1">MULTILINGUE</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Langues locales<br />Dialectes régionaux
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-5 border border-yellow-200 dark:border-yellow-700">
            <Zap className="w-8 h-8 mx-auto text-yellow-600 mb-2" />
            <h4 className="font-medium text-sm mb-1">RAPIDITÉ</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Alertes instantanées<br />Réponse immédiate
            </p>
          </div>
          <div className="text-center bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-lg p-5 border border-teal-200 dark:border-teal-700">
            <Network className="w-8 h-8 mx-auto text-teal-600 mb-2" />
            <h4 className="font-medium text-sm mb-1">CONNEXIONS</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Réseaux cachés<br />Acteurs liés
            </p>
          </div>
        </motion.div>

        {/* System Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 card-shadow overflow-hidden relative"
        >
          {/* Background grid effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px),
                               repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)`
            }}></div>
          </div>
          
          <h3 className="text-2xl font-semibold text-center mb-8 text-white relative z-10">Architecture du Système</h3>
          
          <div className="relative max-w-4xl mx-auto z-10">
            <svg className="w-full h-80" viewBox="0 0 800 300">
              {/* Gradient definitions */}
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C084FC" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FCA5A5" />
                  <stop offset="50%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#DC2626" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Background effects */}
              <motion.circle
                cx="320" cy="150" r="150"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
                initial={{ r: 0 }}
                animate={{ r: 150 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.circle
                cx="320" cy="150" r="100"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
                initial={{ r: 0 }}
                animate={{ r: 100 }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
              />

              {/* Input Sources with glow effect */}
              <g filter="url(#glow)">
                <motion.rect
                  x="20" y="30" width="120" height="50" rx="10"
                  fill="url(#blueGradient)"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                />
                <text x="80" y="60" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Facebook</text>
                
                <motion.rect
                  x="20" y="100" width="120" height="50" rx="10"
                  fill="url(#purpleGradient)"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                />
                <text x="80" y="130" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">WhatsApp</text>
                
                <motion.rect
                  x="20" y="170" width="120" height="50" rx="10"
                  fill="url(#greenGradient)"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                />
                <text x="80" y="200" textAnchor="middle" fill="white" fontSize="14" fontWeight="600">Twitter/X</text>
                
                <text x="80" y="250" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12">+ autres</text>
              </g>

              {/* Arrows from sources to SENTINEL */}
              <motion.path
                d="M 140 45 Q 200 45 240 125"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1 }}
              />
              <motion.path
                d="M 140 115 L 240 125"
                stroke="#8B5CF6"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.1, duration: 1 }}
              />
              <motion.path
                d="M 140 185 Q 200 185 240 125"
                stroke="#10B981"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              />

              {/* SENTINEL Core */}
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <circle cx="320" cy="125" r="60" fill="#DC2626" opacity="0.9"/>
                <text x="320" y="120" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">SENTINEL</text>
                <text x="320" y="140" textAnchor="middle" fill="white" fontSize="12">IA Engine</text>
              </motion.g>

              {/* Processing Components */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <rect x="450" y="20" width="100" height="40" rx="6" fill="#F59E0B" opacity="0.8"/>
                <text x="500" y="45" textAnchor="middle" fill="white" fontSize="12">Détection</text>
                
                <rect x="450" y="80" width="100" height="40" rx="6" fill="#EC4899" opacity="0.8"/>
                <text x="500" y="105" textAnchor="middle" fill="white" fontSize="12">Analyse</text>
                
                <rect x="450" y="140" width="100" height="40" rx="6" fill="#6366F1" opacity="0.8"/>
                <text x="500" y="165" textAnchor="middle" fill="white" fontSize="12">Opinion</text>
                
                <rect x="450" y="200" width="100" height="40" rx="6" fill="#14B8A6" opacity="0.8"/>
                <text x="500" y="225" textAnchor="middle" fill="white" fontSize="12">Action</text>
              </motion.g>

              {/* Arrows from SENTINEL to processing */}
              <motion.path
                d="M 380 125 L 450 40"
                stroke="#F59E0B"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              />
              <motion.path
                d="M 380 125 L 450 100"
                stroke="#EC4899"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.9, duration: 0.5 }}
              />
              <motion.path
                d="M 380 125 L 450 160"
                stroke="#6366F1"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              />
              <motion.path
                d="M 380 125 L 450 220"
                stroke="#14B8A6"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2.1, duration: 0.5 }}
              />

              {/* Output Actions */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
              >
                <rect x="620" y="60" width="140" height="50" rx="8" fill="#059669" opacity="0.9"/>
                <text x="690" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">Alertes</text>
                <text x="690" y="95" textAnchor="middle" fill="white" fontSize="12">Gouvernement</text>
                
                <rect x="620" y="140" width="140" height="50" rx="8" fill="#DC2626" opacity="0.9"/>
                <text x="690" y="160" textAnchor="middle" fill="white" fontSize="14" fontWeight="500">Contre-mesures</text>
                <text x="690" y="175" textAnchor="middle" fill="white" fontSize="12">Automatiques</text>
              </motion.g>

              {/* Final arrows */}
              <motion.path
                d="M 550 60 L 620 85"
                stroke="#059669"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2.8, duration: 0.5 }}
              />
              <motion.path
                d="M 550 180 L 620 165"
                stroke="#DC2626"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2.9, duration: 0.5 }}
              />

              {/* Animated particles */}
              <motion.circle
                r="3"
                fill="#3B82F6"
                animate={{
                  x: [140, 240, 320],
                  y: [45, 85, 125]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              <motion.circle
                r="3"
                fill="#8B5CF6"
                animate={{
                  x: [140, 240, 320],
                  y: [115, 120, 125]
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </svg>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Flux de données en temps réel avec traitement IA instantané
          </div>
        </motion.div>
      </div>
    </section>
  );
}