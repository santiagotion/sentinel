import { Network, Clock, Users, TrendingUp, AlertTriangle, Shuffle, Link, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export function ComplexitySlide() {
  // Network structure - shows how disinformation spreads
  const nodes = [
    // Original source
    { id: 'source', x: 50, y: 10, type: 'source', color: '#ef4444', size: 30 },
    
    // First level - direct shares
    { id: 'bot1', x: 20, y: 30, type: 'bot', color: '#8b5cf6', size: 20 },
    { id: 'influencer1', x: 50, y: 30, type: 'influencer', color: '#f59e0b', size: 25 },
    { id: 'bot2', x: 80, y: 30, type: 'bot', color: '#8b5cf6', size: 20 },
    
    // Second level - amplification
    { id: 'group1', x: 10, y: 50, type: 'group', color: '#10b981', size: 22 },
    { id: 'group2', x: 30, y: 50, type: 'group', color: '#10b981', size: 22 },
    { id: 'user1', x: 50, y: 50, type: 'user', color: '#6b7280', size: 15 },
    { id: 'group3', x: 70, y: 50, type: 'group', color: '#10b981', size: 22 },
    { id: 'user2', x: 90, y: 50, type: 'user', color: '#6b7280', size: 15 },
    
    // Third level - mass spread
    { id: 'mass1', x: 15, y: 70, type: 'mass', color: '#3b82f6', size: 18 },
    { id: 'mass2', x: 35, y: 70, type: 'mass', color: '#3b82f6', size: 18 },
    { id: 'mass3', x: 55, y: 70, type: 'mass', color: '#3b82f6', size: 18 },
    { id: 'mass4', x: 75, y: 70, type: 'mass', color: '#3b82f6', size: 18 },
    
    // Final level - millions affected
    { id: 'final', x: 50, y: 90, type: 'final', color: '#dc2626', size: 35 },
  ];

  // Connections between nodes
  const edges = [
    // Source to first level
    { from: 'source', to: 'bot1', animated: true },
    { from: 'source', to: 'influencer1', animated: true },
    { from: 'source', to: 'bot2', animated: true },
    
    // First to second level
    { from: 'bot1', to: 'group1' },
    { from: 'bot1', to: 'group2' },
    { from: 'influencer1', to: 'user1' },
    { from: 'influencer1', to: 'group3' },
    { from: 'bot2', to: 'group3' },
    { from: 'bot2', to: 'user2' },
    
    // Second to third level
    { from: 'group1', to: 'mass1' },
    { from: 'group2', to: 'mass2' },
    { from: 'user1', to: 'mass3' },
    { from: 'group3', to: 'mass3' },
    { from: 'group3', to: 'mass4' },
    { from: 'user2', to: 'mass4' },
    
    // Third to final
    { from: 'mass1', to: 'final' },
    { from: 'mass2', to: 'final' },
    { from: 'mass3', to: 'final' },
    { from: 'mass4', to: 'final' },
  ];

  const challenges = [
    {
      icon: Clock,
      title: "Vitesse Écrasante",
      description: "Une fausse info devient virale en minutes, pas en heures"
    },
    {
      icon: Shuffle,
      title: "Sources Multiples",
      description: "Des milliers de comptes, groupes, et plateformes simultanément"
    },
    {
      icon: Link,
      title: "Connexions Cachées",
      description: "Les réseaux coordonnés sont invisibles à l'œil nu"
    },
    {
      icon: Search,
      title: "Analyse Impossible",
      description: "Aucun humain ne peut traiter ce volume d'information"
    }
  ];

  return (
    <section className="h-full flex items-center justify-center p-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-congo-red font-bold">L'Impossible Défi</span> du Travail Manuel
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Face à la complexité exponentielle de l'information numérique, 
            les méthodes traditionnelles sont <span className="font-semibold">totalement dépassées</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Network Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative h-96 bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-700"
          >
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                {/* Animated gradient for special edges */}
                <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0">
                    <animate attributeName="stop-opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="50%" stopColor="#ef4444" stopOpacity="1">
                    <animate attributeName="stop-opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0">
                    <animate attributeName="stop-opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
                
                {/* Moving gradient for all edges */}
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    from="-1 0"
                    to="1 0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
              </defs>
              
              {/* Draw edges */}
              {edges.map((edge, index) => {
                const fromNode = nodes.find(n => n.id === edge.from);
                const toNode = nodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;
                
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <motion.line
                      x1={`${fromNode.x}%`}
                      y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`}
                      y2={`${toNode.y}%`}
                      stroke={edge.animated ? "url(#animatedGradient)" : "rgba(255, 255, 255, 0.2)"}
                      strokeWidth={edge.animated ? "2" : "1"}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                    />
                    {/* Additional flowing effect on top */}
                    <motion.line
                      x1={`${fromNode.x}%`}
                      y1={`${fromNode.y}%`}
                      x2={`${toNode.x}%`}
                      y2={`${toNode.y}%`}
                      stroke="url(#flowGradient)"
                      strokeWidth="3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                    />
                  </g>
                );
              })}
              
              {/* Draw nodes */}
              {nodes.map((node, index) => (
                <motion.g
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  {/* Node circle with animation */}
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r={node.size}
                    fill={node.color}
                    opacity="0.8"
                  >
                    {/* Pulsing animation for all nodes */}
                    <animate
                      attributeName="opacity"
                      values="0.8;1;0.8"
                      dur={`${2 + Math.random()}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  {/* Node glow with enhanced animation */}
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r={node.size + 5}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1"
                    opacity="0.3"
                  >
                    <animate
                      attributeName="r"
                      values={`${node.size + 5};${node.size + 15};${node.size + 5}`}
                      dur={node.type === 'source' ? "2s" : `${3 + Math.random()}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.3;0.6;0.3"
                      dur={`${2.5 + Math.random()}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  
                  {/* Inner glow for depth */}
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r={node.size * 0.7}
                    fill={node.color}
                    opacity="0.4"
                  >
                    <animate
                      attributeName="r"
                      values={`${node.size * 0.7};${node.size * 0.5};${node.size * 0.7}`}
                      dur={`${1.5 + Math.random()}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </motion.g>
              ))}
            </svg>
            
          </motion.div>

          {/* Challenges */}
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 card-shadow flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <challenge.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{challenge.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{challenge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">Écrasant</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Volume de messages</p>
            </div>
            <div>
              <Users className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">Innombrables</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Comptes coordonnés</p>
            </div>
            <div>
              <Network className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">Complexité</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Réseaux interconnectés</p>
            </div>
            <div>
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">Impossible</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Suivi manuel efficace</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}