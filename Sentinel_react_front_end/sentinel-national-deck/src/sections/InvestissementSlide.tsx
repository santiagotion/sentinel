import { DollarSign, Users, Server, Wrench, TrendingUp, PieChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function InvestissementSlide() {
  const investment = [
    {
      icon: Users,
      category: "Ingénierie & Opérations",
      amount: "2,0M $",
      percentage: 44,
      description: "Développement logiciel, intégration, DevOps, ingénierie IA/ML par des ingénieurs congolais",
      highlight: "Formation d'expertise congolaise",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Server,
      category: "APIs et Accès Données", 
      amount: "1,2M $",
      percentage: 27,
      description: "Accès entreprise à Twitter/X, Meta, Google News, YouTube, Gemini AI",
      highlight: "Visibilité sur plateformes étrangères",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Server,
      category: "Infrastructure & Cloud",
      amount: "1,0M $",
      percentage: 22,
      description: "Déploiement sécurisé sur Google Cloud Platform (région Afrique)",
      highlight: "Capacité pétaoctets sécurisée",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Wrench,
      category: "Intégration & Support",
      amount: "0,3M $",
      percentage: 7,
      description: "Déploiement sécurisé, audits de conformité, support opérationnel 24/7",
      highlight: "Résilience dès le jour 1",
      color: "from-orange-500 to-orange-600"
    }
  ];

  // Animated pie chart component
  const PieChart = () => {
    const center = 120;
    const radius = 80;
    let currentAngle = 0;

    return (
      <div className="relative">
        <svg width="240" height="240" className="transform -rotate-90">
          {investment.map((item, index) => {
            const angle = (item.percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArc = angle > 180 ? 1 : 0;
            const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
            
            currentAngle += angle;
            
            const colors = {
              'from-emerald-500 to-emerald-600': '#10b981',
              'from-blue-500 to-blue-600': '#3b82f6',
              'from-purple-500 to-purple-600': '#8b5cf6',
              'from-orange-500 to-orange-600': '#f97316'
            };
            
            return (
              <motion.path
                key={index}
                d={pathData}
                fill={colors[item.color] || '#3b82f6'}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ delay: index * 0.2, duration: 1, ease: "easeOut" }}
                whileHover={{ opacity: 1, scale: 1.02 }}
                style={{ transformOrigin: `${center}px ${center}px` }}
              />
            );
          })}
        </svg>
        
        {/* Center circle with total */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-congo-blue">4.5M</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">USD</span>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <section className="h-full flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(0, 85, 164, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2 className="text-4xl md:text-6xl font-bold mb-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Investissement Stratégique
            </motion.span>
            <motion.div 
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              transition={{ delay: 0.6, duration: 1, type: "spring", bounce: 0.4 }}
              className="gradient-text text-5xl md:text-7xl font-black"
            >
              4,5M $ - MVP
            </motion.div>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto"
          >
            Un investissement dans la souveraineté, la stabilité et la sécurité nationale.
            <span className="block mt-2 font-semibold text-congo-blue">
              Près de la moitié du budget directement consacrée aux ingénieurs congolais.
            </span>
          </motion.p>
        </motion.div>

        {/* Visual Investment Breakdown with Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12 items-start">
          {/* Animated Pie Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex justify-center"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-center mb-6">Répartition Budget</h3>
              <PieChart />
            </div>
          </motion.div>

          {/* Investment Details */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {investment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateX: 45 }}
                animate={{ opacity: 1, x: 0, rotateX: 0 }}
                transition={{ 
                  delay: 1.4 + index * 0.2, 
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.3
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden card-shadow border border-white/20"
              >
                <motion.div 
                  className={`h-2 bg-gradient-to-r ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.6 + index * 0.2, duration: 1 }}
                />
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`w-14 h-14 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <item.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{item.category}</h3>
                      <div className="flex items-center space-x-3 mb-2">
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 + index * 0.2 }}
                          className="text-3xl font-black text-congo-blue"
                        >
                          {item.amount}
                        </motion.span>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 2.2 + index * 0.2 }}
                          className="bg-congo-blue text-white px-2 py-1 rounded-full text-xs font-bold"
                        >
                          {item.percentage}%
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4 + index * 0.2 }}
                    className="bg-gradient-to-r from-congo-red/10 to-congo-blue/10 rounded-lg p-3"
                  >
                    <p className="text-sm font-bold text-congo-red flex items-center">
                      <span className="mr-2">⭐</span>
                      {item.highlight}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: -45 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 2.6, duration: 1 }}
            whileHover={{ scale: 1.02, rotateY: -2 }}
            className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-8 relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-16 h-16 border-2 border-red-300 rounded-full opacity-20"
            />
            <h3 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-6 flex items-center">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mr-3 text-3xl"
              >
                ⚠️
              </motion.span>
              Coût de l'Inaction
            </h3>
            <motion.ul className="space-y-4 text-red-700 dark:text-red-300">
              {[
                "Une seule campagne de désinformation : 100M+ $",
                "Instabilité électorale : Coûts incalculables", 
                "Crises sanitaires par fausses infos : Vies humaines",
                "Perte de confiance institutionnelle : Irréversible"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3 + index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="mr-3 text-red-500 font-bold">•</span>
                  <span className="font-medium">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 45 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 2.8, duration: 1 }}
            whileHover={{ scale: 1.02, rotateY: 2 }}
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 relative overflow-hidden"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-300 rounded-full opacity-20"
            />
            <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-6 flex items-center">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mr-3 text-3xl"
              >
                💎
              </motion.span>
              Retour sur Investissement
            </h3>
            <motion.ul className="space-y-4 text-emerald-700 dark:text-emerald-300">
              {[
                "70+ emplois qualifiés créés sur 3 ans",
                "Expertise IA/sécurité maintenue au pays",
                "Prévention de crises : Milliards économisés",
                "Leadership régional en souveraineté numérique"
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.2 + index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="mr-3 text-emerald-500 font-bold">•</span>
                  <span className="font-medium">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Final CTA with spectacular animation */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 3.6, duration: 1.2, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.02, rotateX: 5 }}
          className="relative bg-gradient-to-r from-congo-blue via-congo-blue to-congo-red rounded-2xl p-8 text-center text-white shadow-2xl overflow-hidden"
        >
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              backgroundSize: '200% 100%',
            }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-4 left-4 w-6 h-6 border border-white/20 rounded-full"
          />
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 0.8 }}
            className="text-2xl md:text-3xl font-bold mb-4 relative z-10"
          >
            4,5M $ : Une assurance modeste contre des menaces qui coûtent des centaines de millions
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.3, duration: 0.8 }}
            className="text-lg md:text-xl opacity-90 relative z-10"
          >
            Un investissement stratégique dans la souveraineté numérique congolaise
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}