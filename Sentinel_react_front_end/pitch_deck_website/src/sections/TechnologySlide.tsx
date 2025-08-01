import { Shield, Globe, TrendingUp, Users, Zap, Heart, DollarSign, Brain, BarChart3, AlertTriangle, Languages, Network, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function TechnologySlide() {
  return (
    <section className="h-full flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="gradient-text font-bold">La Technologie Derrière SENTINEL</span>
          </h2>
        </motion.div>

        {/* Technology Description */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 mb-12"
        >
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
            Le système travaille <span className="font-semibold">24 heures sur 24</span> pour surveiller 
            automatiquement les conversations sur toutes les plateformes majeures. Nos bots collectent, vérifient et analysent des 
            millions de messages en croisant les données de <span className="font-semibold">sources multiples</span> pour 
            détecter les campagnes coordonnées invisibles à l'œil humain.
          </p>
        </motion.div>

        {/* Key Capabilities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
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
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 card-shadow"
        >
          <h3 className="text-2xl font-semibold text-center mb-8">Comment SENTINEL Protège la RDC</h3>
          
          <div className="relative w-full">
            <svg className="w-full h-64" viewBox="0 0 1400 250">
              {/* Background pulse effect */}
              <defs>
                <radialGradient id="pulseGradient">
                  <stop offset="0%" stopColor="#DC2626" stopOpacity="0.2">
                    <animate attributeName="stop-opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Step 1: Data Sources */}
              <g>
                <motion.text 
                  x="100" y="20" 
                  textAnchor="middle" 
                  fill="#1E40AF" 
                  fontSize="16" 
                  fontWeight="700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  ÉTAPE 1
                </motion.text>
                <motion.text 
                  x="100" y="40" 
                  textAnchor="middle" 
                  fill="#1E40AF" 
                  fontSize="14" 
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Sources
                </motion.text>
                
                <motion.rect 
                  x="40" y="60" width="140" height="40" rx="8" 
                  fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                />
                <motion.rect 
                  x="40" y="60" width="140" height="40" rx="8" 
                  fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.5"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                <text x="110" y="85" textAnchor="middle" fill="#1E40AF" fontSize="14" fontWeight="600">Réseaux Sociaux</text>
                
                <motion.rect 
                  x="40" y="110" width="140" height="40" rx="8" 
                  fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                />
                <motion.rect 
                  x="40" y="110" width="140" height="40" rx="8" 
                  fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.5"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                />
                <text x="110" y="135" textAnchor="middle" fill="#6B21A8" fontSize="14" fontWeight="600">Sites Web</text>
                
                <motion.rect 
                  x="40" y="160" width="140" height="40" rx="8" 
                  fill="#D1FAE5" stroke="#10B981" strokeWidth="2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                />
                <motion.rect 
                  x="40" y="160" width="140" height="40" rx="8" 
                  fill="none" stroke="#10B981" strokeWidth="2" opacity="0.5"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                />
                <text x="110" y="185" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="600">Messageries</text>
              </g>

              {/* Step 2: SENTINEL Core */}
              <g>
                <motion.text 
                  x="350" y="20" 
                  textAnchor="middle" 
                  fill="#991B1B" 
                  fontSize="16" 
                  fontWeight="700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  ÉTAPE 2
                </motion.text>
                <motion.text 
                  x="350" y="40" 
                  textAnchor="middle" 
                  fill="#991B1B" 
                  fontSize="14" 
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Traitement IA
                </motion.text>
                
                {/* Pulse background */}
                <motion.circle
                  cx="350" cy="125" r="60"
                  fill="url(#pulseGradient)"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1.2 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                
                <motion.circle
                  cx="350" cy="125" r="50"
                  fill="#FEE2E2"
                  stroke="#DC2626"
                  strokeWidth="3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                />
                
                {/* Rotating outer ring */}
                <motion.circle
                  cx="350" cy="125" r="55"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="1"
                  strokeDasharray="5,10"
                  opacity="0.5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "350px 125px" }}
                />
                
                <text x="350" y="120" textAnchor="middle" fill="#991B1B" fontSize="18" fontWeight="bold">SENTINEL</text>
                <text x="350" y="140" textAnchor="middle" fill="#991B1B" fontSize="14" fontWeight="600">Analyse 24/7</text>
              </g>

              {/* Step 3: Analysis */}
              <g>
                <motion.text 
                  x="600" y="20" 
                  textAnchor="middle" 
                  fill="#B45309" 
                  fontSize="16" 
                  fontWeight="700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  ÉTAPE 3
                </motion.text>
                <motion.text 
                  x="600" y="40" 
                  textAnchor="middle" 
                  fill="#B45309" 
                  fontSize="14" 
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Analyse
                </motion.text>
                
                <motion.g
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3, type: "spring" }}
                >
                  <rect x="540" y="60" width="140" height="35" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
                  <motion.rect 
                    x="540" y="60" width="0" height="35" rx="8" 
                    fill="#F59E0B" opacity="0.3"
                    animate={{ width: 140 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                  />
                  <text x="610" y="83" textAnchor="middle" fill="#92400E" fontSize="14" fontWeight="600">Détecte menaces</text>
                </motion.g>
                
                <motion.g
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, type: "spring" }}
                >
                  <rect x="540" y="105" width="140" height="35" rx="8" fill="#FCE7F3" stroke="#EC4899" strokeWidth="2"/>
                  <motion.rect 
                    x="540" y="105" width="0" height="35" rx="8" 
                    fill="#EC4899" opacity="0.3"
                    animate={{ width: 140 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  />
                  <text x="610" y="128" textAnchor="middle" fill="#9F1239" fontSize="14" fontWeight="600">Identifie sources</text>
                </motion.g>
                
                <motion.g
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, type: "spring" }}
                >
                  <rect x="540" y="150" width="140" height="35" rx="8" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2"/>
                  <motion.rect 
                    x="540" y="150" width="0" height="35" rx="8" 
                    fill="#6366F1" opacity="0.3"
                    animate={{ width: 140 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                  />
                  <text x="610" y="173" textAnchor="middle" fill="#4338CA" fontSize="14" fontWeight="600">Mesure opinion</text>
                </motion.g>
              </g>

              {/* Step 4: Actions */}
              <g>
                <motion.text 
                  x="950" y="20" 
                  textAnchor="middle" 
                  fill="#047857" 
                  fontSize="16" 
                  fontWeight="700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 }}
                >
                  ÉTAPE 4
                </motion.text>
                <motion.text 
                  x="950" y="40" 
                  textAnchor="middle" 
                  fill="#047857" 
                  fontSize="14" 
                  fontWeight="600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  Protection
                </motion.text>
                
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9, type: "spring", stiffness: 200 }}
                >
                  <rect x="890" y="80" width="140" height="40" rx="8" fill="#D1FAE5" stroke="#059669" strokeWidth="2"/>
                  <motion.rect 
                    x="890" y="80" width="140" height="40" rx="8" 
                    fill="none" stroke="#059669" strokeWidth="3" opacity="0"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
                  />
                  <text x="960" y="105" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="600">Alerte Autorités</text>
                </motion.g>
                
                <motion.g
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, type: "spring", stiffness: 200 }}
                >
                  <rect x="890" y="140" width="140" height="40" rx="8" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2"/>
                  <motion.rect 
                    x="890" y="140" width="140" height="40" rx="8" 
                    fill="none" stroke="#DC2626" strokeWidth="3" opacity="0"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ delay: 2.7, duration: 2, repeat: Infinity }}
                  />
                  <text x="960" y="165" textAnchor="middle" fill="#991B1B" fontSize="14" fontWeight="600">Neutralise Menace</text>
                </motion.g>
              </g>

              {/* Simple arrows with more space */}
              <motion.path
                d="M 190 125 L 290 125"
                stroke="#9CA3AF"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
              <motion.path
                d="M 410 125 L 530 125"
                stroke="#9CA3AF"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              />
              <motion.path
                d="M 690 125 L 880 125"
                stroke="#9CA3AF"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              />

              {/* Arrow marker */}
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
                </marker>
              </defs>

              {/* Multiple animated dots showing data flow */}
              <motion.circle
                r="4"
                fill="#3B82F6"
                animate={{
                  cx: [180, 350, 600, 950],
                  cy: [125, 125, 125, 125]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              <motion.circle
                r="4"
                fill="#8B5CF6"
                animate={{
                  cx: [180, 350, 600, 950],
                  cy: [125, 125, 125, 125]
                }}
                transition={{
                  duration: 4,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              <motion.circle
                r="4"
                fill="#10B981"
                animate={{
                  cx: [180, 350, 600, 950],
                  cy: [125, 125, 125, 125]
                }}
                transition={{
                  duration: 4,
                  delay: 1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
              
              {/* Small particles floating around */}
              <motion.circle
                r="2"
                fill="#DC2626"
                opacity="0.3"
                animate={{
                  cx: [330, 370, 330],
                  cy: [105, 145, 105]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.circle
                r="2"
                fill="#DC2626"
                opacity="0.3"
                animate={{
                  cx: [370, 330, 370],
                  cy: [105, 145, 105]
                }}
                transition={{
                  duration: 3,
                  delay: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Collecte</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Données en temps réel</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Traitement</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">IA analyse tout</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Compréhension</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Contexte et impact</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Action</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Protection immédiate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}