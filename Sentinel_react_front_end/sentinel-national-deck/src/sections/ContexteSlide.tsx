import { AlertTriangle, Globe, Users, Zap, TrendingUp, Eye, Shield, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export function ContexteSlide() {
  const threats = [
    {
      icon: AlertTriangle,
      title: "Menaces à la Stabilité",
      description: "Un seul tweet ou faux titre peut instanténement perturber les communautés, alimenter les conflits et éroder la confiance dans les institutions publiques.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Globe,
      title: "Défi de l'Information",
      description: "La protection de la vérité est devenue une question de sécurité nationale. La souveraineté sur l'espace informationnel doit rester fermement entre les mains du gouvernement congolais.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Responsabilité de l'État",
      description: "L'État demeure le garant ultime de la vérité pour ses citoyens, avec la responsabilité d'avoir des outils à la hauteur des défis de notre ère.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Zap,
      title: "Vitesse Critique",
      description: "La désinformation se propage en quelques minutes. La réponse doit être aussi rapide et coordonnée que les menaces elles-mêmes.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  // Threat Landscape Heat Map
  const ThreatLandscape = () => {
    const threatLevels = [
      { region: 'Kinshasa', level: 'High', intensity: 85, threats: ['Désinformation politique', 'Faux remèdes'], color: '#ef4444' },
      { region: 'Sud-Kivu', level: 'Critical', intensity: 95, threats: ['Conflits ethniques', 'Rumeurs sécuritaires'], color: '#dc2626' },
      { region: 'Nord-Kivu', level: 'Critical', intensity: 92, threats: ['Fausses alertes militaires', 'Tensions communautaires'], color: '#dc2626' },
      { region: 'Katanga', level: 'Medium', intensity: 65, threats: ['Désinformation économique', 'Rumeurs mines'], color: '#f59e0b' },
      { region: 'Kasai', level: 'Medium', intensity: 70, threats: ['Tensions politiques', 'Fausses nouvelles sociales'], color: '#f59e0b' },
      { region: 'Bandundu', level: 'Low', intensity: 45, threats: ['Rumeurs locales', 'Fausses infos santé'], color: '#10b981' },
      { region: 'Équateur', level: 'Low', intensity: 40, threats: ['Désinformation santé', 'Rumeurs économiques'], color: '#10b981' },
      { region: 'Orientale', level: 'High', intensity: 80, threats: ['Conflits intercommunautaires', 'Fausses alertes'], color: '#ef4444' },
    ];

    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Carte des Menaces Informationnelles RDC</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Heat map representation */}
          <div className="relative">
            <h5 className="font-semibold mb-4 text-center">Niveau de Risque par Région</h5>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 relative overflow-hidden" style={{ aspectRatio: '3/2' }}>
              {/* Congo-like map regions */}
              {threatLevels.map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="absolute rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg cursor-pointer"
                  style={{
                    backgroundColor: region.color,
                    left: `${10 + (index % 4) * 20}%`,
                    top: `${15 + Math.floor(index / 4) * 25}%`,
                    width: '15%',
                    height: '20%',
                  }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                >
                  <div className="text-center">
                    <div className="text-xs font-bold">{region.region}</div>
                    <div className="text-xs">{region.intensity}%</div>
                  </div>
                </motion.div>
              ))}
              
              {/* Connections showing information flow */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1={`${15 + (i % 3) * 25}%`}
                    y1={`${25 + Math.floor(i / 3) * 30}%`}
                    x2={`${35 + ((i + 1) % 3) * 25}%`}
                    y2={`${40 + Math.floor((i + 1) / 3) * 30}%`}
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ delay: 2 + i * 0.2, duration: 1 }}
                  />
                ))}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span className="text-xs">Critique (90%+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-xs">Élevé (70-89%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-xs">Moyen (50-69%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                <span className="text-xs">Faible (&lt;50%)</span>
              </div>
            </div>
          </div>

          {/* Threat details */}
          <div>
            <h5 className="font-semibold mb-4">Principales Menaces Identifiées</h5>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {threatLevels.map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{region.region}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold text-white`} style={{ backgroundColor: region.color }}>
                        {region.level}
                      </span>
                      <span className="text-sm font-bold">{region.intensity}%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {region.threats.map((threat, threatIndex) => (
                      <div key={threatIndex} className="flex items-center space-x-2">
                        <AlertTriangle className="w-3 h-3 text-orange-500 flex-shrink-0" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{threat}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Information Warfare Timeline
  const InfoWarTimeline = () => {
    const timeline = [
      { period: '2020', event: 'COVID-19 Infodémie', impact: 'Faux remèdes → 2000+ décès évitables', severity: 'critical' },
      { period: '2021', event: 'Tensions Électorales', impact: 'Rumeurs fraude → Violences post-électorales', severity: 'high' },
      { period: '2022', event: 'Crise Économique', impact: 'Panique bancaire → Instabilité financière', severity: 'high' },
      { period: '2023', event: 'Conflits M23', impact: 'Fausses alertes → Déplacements populations', severity: 'critical' },
      { period: '2024', event: 'Désinformation IA', impact: 'Deepfakes politiques → Érosion confiance', severity: 'emerging' }
    ];

    return (
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Chronologie des Crises Informationnelles</h4>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 dark:bg-gray-600"></div>
          
          {timeline.map((event, index) => (
            <motion.div
              key={event.period}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Event content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div className={`p-4 rounded-lg shadow-sm ${
                  event.severity === 'critical' ? 'bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800' :
                  event.severity === 'high' ? 'bg-orange-100 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800' :
                  event.severity === 'emerging' ? 'bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800' :
                  'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}>
                  <h6 className="font-bold text-lg mb-2">{event.event}</h6>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{event.impact}</p>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-bold text-white ${
                    event.severity === 'critical' ? 'bg-red-600' :
                    event.severity === 'high' ? 'bg-orange-600' :
                    event.severity === 'emerging' ? 'bg-purple-600' : 'bg-gray-600'
                  }`}>
                    {event.severity.toUpperCase()}
                  </div>
                </div>
              </div>
              
              {/* Timeline node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white dark:bg-gray-800 border-4 border-congo-blue rounded-full flex items-center justify-center z-10">
                <span className="text-sm font-bold text-congo-blue">{event.period}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-yellow-800 dark:text-yellow-200">Projection 2025</span>
          </div>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Sans SENTINEL : Les menaces IA sophistiquées (deepfakes, bots coordonnés) pourraient 
            déclencher une crise informationnelle majeure coûtant des centaines de millions de dollars.
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="h-full flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Contexte National :
            <span className="gradient-text block">Une Nouvelle Réalité</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Au XXIème siècle, les nations ne se défendent pas seulement par leurs frontières, 
            mais aussi par l'intégrité des narratifs qui les définissent.
          </p>
        </motion.div>

        <ThreatLandscape />
        <InfoWarTimeline />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {threats.map((threat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden card-shadow"
            >
              <div className={`h-2 bg-gradient-to-r ${threat.color}`}></div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${threat.color} rounded-xl flex items-center justify-center`}>
                    <threat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{threat.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {threat.description}
                </p>
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
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            <span className="text-congo-blue font-bold">SENTINEL</span> répond à cette nouvelle réalité :
            transformer l'espace informationnel d'un domaine d'incertitude en un domaine où{' '}
            <span className="text-congo-red font-bold">le gouvernement peut exercer sa souveraineté</span> avec clarté et détermination.
          </p>
        </motion.div>
      </div>
    </section>
  );
}