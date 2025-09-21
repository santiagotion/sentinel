import { Shield, Users, TrendingUp, Award, DollarSign, MapPin, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export function BeneficesSlide() {
  const benefits = [
    {
      icon: Shield,
      title: "Sécurité Nationale et Souveraineté",
      items: [
        "Prévention des manipulations électorales",
        "Prévention des conflits alimentés par de faux narratifs", 
        "Prévention des catastrophes sanitaires causées par de faux remèdes",
        "Souveraineté indépendante dans le domaine informationnel"
      ],
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Users,
      title: "Confiance Citoyenne et Communication",
      items: [
        "Canal direct entre l'État et les citoyens",
        "Communication claire, rapide et véridique",
        "Renforcement de la confiance institutionnelle",
        "Stabilité sociale grâce à la communication transparente"
      ],
      color: "from-emerald-600 to-emerald-700",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      icon: TrendingUp,
      title: "Impact Économique et Capacités",
      items: [
        "Création de 70+ emplois qualifiés sur 3 ans",
        "Formation en IA, science des données et sécurité informatique",
        "Maintien de l'expertise technique au niveau national", 
        "Préparation pour l'avenir numérique"
      ],
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: Award,
      title: "Leadership Régional",
      items: [
        "Modèle continental de souveraineté numérique",
        "Leadership africain en sécurité informationnelle",
        "Soutien aux pays voisins et politique régionale",
        "Position de leader plutôt que de suiveur"
      ],
      color: "from-orange-600 to-orange-700",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    }
  ];

  // ROI Impact Visualization
  const ROIVisualization = () => {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Retour sur Investissement Stratégique</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Investment vs Savings Bar Chart */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-center">Coûts Évités vs Investissement</h5>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Investissement SENTINEL</span>
                <span className="text-sm text-congo-blue font-bold">4,5M $</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '9%' }}
                  transition={{ delay: 0.5, duration: 1.5 }}
                  className="bg-congo-blue h-3 rounded-full"
                />
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm font-medium">Une seule crise évitée</span>
                <span className="text-sm text-emerald-600 font-bold">50M+ $</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1.5 }}
                  className="bg-emerald-500 h-3 rounded-full"
                />
              </div>
              
              <div className="text-center mt-4 p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  ROI: 1000%+ en prévention d'une seule crise majeure
                </p>
              </div>
            </div>
          </div>

          {/* Employment Growth Chart */}
          <div className="text-center">
            <h5 className="text-lg font-semibold mb-4">Croissance de l'Emploi Qualifié</h5>
            <div className="relative">
              <svg viewBox="0 0 200 150" className="w-full h-32">
                {/* Employment bars for 3 years */}
                {[20, 45, 70].map((value, index) => (
                  <motion.rect
                    key={index}
                    x={20 + index * 50}
                    y={150 - value}
                    width="30"
                    height="0"
                    fill={`url(#gradient-${index})`}
                    initial={{ height: 0 }}
                    animate={{ height: value }}
                    transition={{ delay: 1.5 + index * 0.3, duration: 1 }}
                  />
                ))}
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="gradient-0" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                  <linearGradient id="gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
                
                {/* Year labels */}
                <text x="35" y="145" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">An 1</text>
                <text x="85" y="145" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">An 2</text>
                <text x="135" y="145" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">An 3</text>
              </svg>
              
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-center">
                <div>
                  <div className="font-bold text-blue-600">20</div>
                  <div className="text-gray-600 dark:text-gray-400">emplois</div>
                </div>
                <div>
                  <div className="font-bold text-emerald-600">45</div>
                  <div className="text-gray-600 dark:text-gray-400">emplois</div>
                </div>
                <div>
                  <div className="font-bold text-orange-600">70</div>
                  <div className="text-gray-600 dark:text-gray-400">emplois</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Regional Leadership Map
  const RegionalLeadershipMap = () => {
    return (
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Leadership Continental</h4>
        
        <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl p-8 overflow-hidden">
          {/* Africa-style map representation */}
          <div className="relative">
            {/* Central DRC position */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-congo-blue to-congo-red rounded-lg flex items-center justify-center shadow-lg z-10"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Influence rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: ring, opacity: 0.2 - ring * 0.05 }}
                transition={{ delay: 1 + ring * 0.3, duration: 1.5 }}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-congo-blue rounded-full"
              />
            ))}
            
            {/* Surrounding countries */}
            {[
              { name: 'Cameroun', x: '30%', y: '20%' },
              { name: 'Angola', x: '25%', y: '75%' },
              { name: 'Tanzanie', x: '75%', y: '60%' },
              { name: 'Rwanda', x: '70%', y: '30%' },
              { name: 'Zambie', x: '60%', y: '85%' },
            ].map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
                className="absolute w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center"
                style={{ left: country.x, top: country.y }}
              >
                <MapPin className="w-4 h-4 text-white" />
              </motion.div>
            ))}
            
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {[
                { x1: '50%', y1: '50%', x2: '30%', y2: '20%' },
                { x1: '50%', y1: '50%', x2: '75%', y2: '60%' },
                { x1: '50%', y1: '50%', x2: '70%', y2: '30%' },
              ].map((line, index) => (
                <motion.line
                  key={index}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#0055a4"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ delay: 2 + index * 0.3, duration: 1 }}
                />
              ))}
            </svg>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-bold text-congo-blue">RDC</span> : Premier pays africain avec souveraineté numérique complète
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                <div className="font-bold text-congo-blue">Leader</div>
                <div className="text-gray-600 dark:text-gray-400">Technologie IA</div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                <div className="font-bold text-emerald-600">Modèle</div>
                <div className="text-gray-600 dark:text-gray-400">Autres pays</div>
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
            <span className="gradient-text">Bénéfices Nationaux</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            SENTINEL n'est pas simplement un projet numérique, c'est un pilier de la sécurité nationale 
            et de la gouvernance moderne pour la République Démocratique du Congo.
          </p>
        </motion.div>

        <ROIVisualization />
        <RegionalLeadershipMap />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className={`${benefit.bgColor} border-2 border-transparent rounded-xl p-6`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-14 h-14 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {benefit.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {benefit.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <span className="text-congo-blue mt-1 text-lg">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-r from-congo-blue to-congo-red rounded-xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            Investir dans SENTINEL = Investir dans l'Avenir de la RDC
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="text-3xl font-bold mb-2">4,5M $</div>
              <div className="text-sm opacity-90">Investissement MVP</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">70+</div>
              <div className="text-sm opacity-90">Emplois qualifiés créés</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100M+</div>
              <div className="text-sm opacity-90">Coûts de crises évités</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}