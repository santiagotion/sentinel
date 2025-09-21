import { HandHeart, Flag, Shield, Star, Users, Globe, TrendingUp, Award, Target, Network } from 'lucide-react';
import { motion } from 'framer-motion';

export function EngagementSlide() {
  // Partnership Network Visualization
  const PartnershipNetwork = () => {
    const partners = [
      { name: 'RDC Government', type: 'primary', x: '50%', y: '50%', connections: [1, 2, 3, 4] },
      { name: 'Technical Team', type: 'internal', x: '25%', y: '25%', connections: [0] },
      { name: 'Cloud Infrastructure', type: 'technical', x: '75%', y: '25%', connections: [0] },
      { name: 'API Partners', type: 'external', x: '25%', y: '75%', connections: [0] },
      { name: 'Training Institutes', type: 'educational', x: '75%', y: '75%', connections: [0] },
    ];

    return (
      <div className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/10 dark:to-emerald-900/10 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Réseau de Partenariat SENTINEL</h4>
        
        <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 overflow-hidden" style={{ height: '300px' }}>
          {/* Network connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {partners[0].connections.map((connectionIndex, i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={partners[connectionIndex + 1].x}
                y2={partners[connectionIndex + 1].y}
                stroke="#0055a4"
                strokeWidth="3"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
              />
            ))}
            
            {/* Data flow animation */}
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                r="3"
                fill="#0055a4"
                initial={{ cx: '50%', cy: '50%', opacity: 0 }}
                animate={{ 
                  cx: partners[1 + (i % 4)].x, 
                  cy: partners[1 + (i % 4)].y, 
                  opacity: [0, 1, 0] 
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "linear"
                }}
              />
            ))}
          </svg>

          {/* Partner nodes */}
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                partner.type === 'primary' ? 'w-20 h-20 bg-gradient-to-r from-congo-blue to-congo-red' :
                partner.type === 'internal' ? 'w-16 h-16 bg-emerald-500' :
                partner.type === 'technical' ? 'w-16 h-16 bg-blue-500' :
                partner.type === 'external' ? 'w-16 h-16 bg-orange-500' :
                'w-16 h-16 bg-purple-500'
              } rounded-full flex items-center justify-center shadow-lg cursor-pointer`}
              style={{ left: partner.x, top: partner.y }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
            >
              {partner.type === 'primary' && <Shield className="w-8 h-8 text-white" />}
              {partner.type === 'internal' && <Users className="w-6 h-6 text-white" />}
              {partner.type === 'technical' && <Globe className="w-6 h-6 text-white" />}
              {partner.type === 'external' && <Network className="w-6 h-6 text-white" />}
              {partner.type === 'educational' && <Award className="w-6 h-6 text-white" />}
            </motion.div>
          ))}

          {/* Partner labels */}
          {partners.map((partner, index) => (
            <motion.div
              key={`label-${partner.name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="absolute text-xs font-medium text-center transform -translate-x-1/2"
              style={{ 
                left: partner.x, 
                top: `calc(${partner.y} + ${partner.type === 'primary' ? '50px' : '40px'})`,
                width: '80px'
              }}
            >
              {partner.name}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3 text-xs text-center">
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-congo-blue to-congo-red rounded-full mb-1"></div>
            <span>Gouvernement RDC</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-emerald-500 rounded-full mb-1"></div>
            <span>Équipe Technique</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mb-1"></div>
            <span>Infrastructure</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-orange-500 rounded-full mb-1"></div>
            <span>APIs Externes</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-4 h-4 bg-purple-500 rounded-full mb-1"></div>
            <span>Formation</span>
          </div>
        </div>
      </div>
    );
  };

  // Sovereignty Metrics Dashboard
  const SovereigntyMetrics = () => {
    const metrics = [
      { 
        category: 'Contrôle Technique',
        score: 95,
        indicators: ['Code source national', 'Infrastructure souveraine', 'Équipe locale'],
        color: 'congo-blue'
      },
      {
        category: 'Indépendance Opérationnelle', 
        score: 88,
        indicators: ['Formation complète', 'Documentation FR', 'Support autonome'],
        color: 'emerald'
      },
      {
        category: 'Sécurité Nationale',
        score: 92,
        indicators: ['Chiffrement local', 'Audit gouvernemental', 'Conformité GDPR'],
        color: 'congo-red'
      },
      {
        category: 'Capacité d\'Évolution',
        score: 85,
        indicators: ['Expertise locale', 'Budget de R&D', 'Partenariats tech'],
        color: 'purple'
      }
    ];

    return (
      <div className="bg-gradient-to-br from-emerald-50 to-congo-blue/10 dark:from-emerald-900/10 dark:to-congo-blue/20 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Indice de Souveraineté Numérique</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sovereignty radar chart */}
          <div className="flex flex-col items-center">
            <h5 className="font-semibold mb-4">Score Global de Souveraineté</h5>
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Background circles */}
                {[60, 120, 180].map((radius, index) => (
                  <circle
                    key={radius}
                    cx="100"
                    cy="100"
                    r={radius / 3}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}
                
                {/* Axis lines */}
                {[0, 90, 180, 270].map((angle) => (
                  <line
                    key={angle}
                    x1="100"
                    y1="100"
                    x2={100 + 60 * Math.cos((angle - 90) * Math.PI / 180)}
                    y2={100 + 60 * Math.sin((angle - 90) * Math.PI / 180)}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Data polygon */}
                <motion.polygon
                  points={metrics.map((metric, index) => {
                    const angle = (index * 90 - 90) * Math.PI / 180;
                    const radius = (metric.score / 100) * 60;
                    const x = 100 + radius * Math.cos(angle);
                    const y = 100 + radius * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="#0055a4"
                  fillOpacity="0.3"
                  stroke="#0055a4"
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                />
                
                {/* Score points */}
                {metrics.map((metric, index) => {
                  const angle = (index * 90 - 90) * Math.PI / 180;
                  const radius = (metric.score / 100) * 60;
                  const x = 100 + radius * Math.cos(angle);
                  const y = 100 + radius * Math.sin(angle);
                  
                  return (
                    <motion.circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#dc2626"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    />
                  );
                })}
                
                {/* Center score */}
                <circle cx="100" cy="100" r="20" fill="white" stroke="#0055a4" strokeWidth="2" />
                <text x="100" y="95" textAnchor="middle" className="text-lg font-bold fill-congo-blue">90</text>
                <text x="100" y="110" textAnchor="middle" className="text-xs fill-congo-blue">Score</text>
              </svg>
            </div>
            
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-congo-blue">90/100</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Souveraineté Élevée</div>
            </div>
          </div>

          {/* Detailed metrics */}
          <div className="space-y-4">
            <h5 className="font-semibold">Indicateurs Détaillés</h5>
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.category}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h6 className="font-medium">{metric.category}</h6>
                  <div className={`px-2 py-1 bg-${metric.color}-500 text-white rounded text-sm font-bold`}>
                    {metric.score}%
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.score}%` }}
                    transition={{ delay: 1.5 + index * 0.2, duration: 1 }}
                    className={`bg-${metric.color}-500 h-2 rounded-full`}
                  />
                </div>
                
                <div className="space-y-1">
                  {metric.indicators.map((indicator, indicatorIndex) => (
                    <div key={indicatorIndex} className="flex items-center space-x-2">
                      <Target className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{indicator}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Implementation Timeline
  const ImplementationTimeline = () => {
    return (
      <div className="bg-gradient-to-r from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-6">
        <h4 className="text-xl font-bold text-center mb-6">Échéancier de Mise en Œuvre</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { phase: 'Phase 1', duration: '0-3 mois', task: 'Signature & Démarrage', icon: HandHeart },
            { phase: 'Phase 2', duration: '3-9 mois', task: 'Développement MVP', icon: Users },
            { phase: 'Phase 3', duration: '9-12 mois', task: 'Tests & Formation', icon: Award },
            { phase: 'Phase 4', duration: '12+ mois', task: 'Déploiement National', icon: Flag }
          ].map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                className={`w-16 h-16 bg-gradient-to-r ${
                  index === 0 ? 'from-congo-blue to-blue-600' :
                  index === 1 ? 'from-emerald-500 to-emerald-600' :
                  index === 2 ? 'from-orange-500 to-orange-600' :
                  'from-congo-red to-red-600'
                } rounded-xl flex items-center justify-center mb-3 mx-auto shadow-lg`}
              >
                <phase.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h6 className="font-semibold">{phase.phase}</h6>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{phase.duration}</p>
              <p className="text-xs text-gray-500">{phase.task}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block bg-gradient-to-r from-congo-blue to-congo-red text-white px-8 py-4 rounded-lg font-bold text-lg"
          >
            Prêt à démarrer immédiatement
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <section className="h-full flex items-center justify-center bg-gradient-to-br from-congo-blue/5 to-congo-red/5">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-center items-center space-x-4 mb-8">
            <Flag className="w-16 h-16 text-congo-blue" />
            <Shield className="w-20 h-20 text-congo-red" />
            <Star className="w-16 h-16 text-congo-yellow fill-current" />
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-8"
          >
            <span className="gradient-text">Notre Engagement</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8"
          >
            <p className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
              Nous nous engageons à livrer à la République Démocratique du Congo 
              une capacité souveraine de{' '}
              <span className="text-congo-blue font-bold">protection de l'information</span>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="text-left">
                <h3 className="font-bold text-congo-blue mb-3">Développement National</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Équipe 100% congolaise</li>
                  <li>• Transfert complet de connaissances</li>
                  <li>• Formation continue du personnel</li>
                  <li>• Propriété intellectuelle nationale</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-congo-red mb-3">Souveraineté Garantie</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Contrôle total du système par la RDC</li>
                  <li>• Infrastructure sécurisée sur le continent</li>
                  <li>• Aucune dépendance extérieure</li>
                  <li>• Capacité d'évolution autonome</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <PartnershipNetwork />
        <SovereigntyMetrics />
        <ImplementationTimeline />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-gradient-to-r from-congo-blue to-congo-red rounded-xl p-8 text-white mb-8"
        >
          <HandHeart className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">
            Partenaires de la Souveraineté Congolaise
          </h3>
          <p className="text-lg opacity-90">
            SENTINEL partage pleinement la conviction que la protection de la vérité 
            est une question de sécurité nationale et que la souveraineté sur l'espace informationnel 
            doit demeurer fermement entre les mains du gouvernement congolais.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-congo-blue mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Support opérationnel continu
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-congo-red mb-2">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Transparent et responsable
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-emerald-600 mb-2">1</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Seule mission : la souveraineté RDC
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-12"
        >
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Prêt à commencer dès aujourd'hui pour un Congo plus fort et plus souverain demain.
          </p>
        </motion.div>
      </div>
    </section>
  );
}