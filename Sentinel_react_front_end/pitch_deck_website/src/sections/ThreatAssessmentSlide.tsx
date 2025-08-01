import { AlertTriangle, TrendingUp, Users, Globe, Shield, Brain, Zap, MessageSquare, Chrome, Camera, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThreatAssessmentSlide() {
  const stats = [
    { value: "Majorité", label: "des informations virales non vérifiées" },
    { value: "Fréquentes", label: "campagnes de déstabilisation détectées" },
    { value: "Millions", label: "d'utilisateurs congolais exposés quotidiennement" }
  ];

  const threatTypes = [
    {
      icon: Globe,
      title: "Désinformation Géopolitique",
      description: "Campagnes visant à déstabiliser la perception internationale",
      color: "from-red-500 to-red-600",
      examples: ["Fausses crises", "Conflits inventés", "Statistiques manipulées"]
    },
    {
      icon: Users,
      title: "Manipulation de l'Opinion",
      description: "Ciblage de la cohésion sociale et de la confiance citoyenne",
      color: "from-purple-500 to-purple-600",
      examples: ["Division ethnique", "Méfiance institutionnelle", "Polarisation"]
    },
    {
      icon: TrendingUp,
      title: "Guerre Économique",
      description: "Narratifs hostiles contre les secteurs stratégiques",
      color: "from-orange-500 to-orange-600",
      examples: ["Attaques sur les mines", "Dévaluation monétaire", "Fuite des investisseurs"]
    }
  ];

  const attackVectors = [
    { 
      icon: MessageSquare,
      category: "Réseaux Sociaux", 
      description: "Plateformes de partage massif et viral",
      examples: ["Facebook", "WhatsApp", "Twitter/X", "TikTok"],
      color: "bg-blue-500"
    },
    { 
      icon: Chrome,
      category: "Sites Web Frauduleux", 
      description: "Blogs et sites d'information contrefaits",
      examples: ["Faux sites de presse", "Blogs anonymes", "Sites clonés"],
      color: "bg-red-500"
    },
    { 
      icon: Shield,
      category: "Messageries Privées", 
      description: "Canaux de diffusion ciblée et fermée",
      examples: ["Groupes WhatsApp", "Canaux Telegram", "Messages directs"],
      color: "bg-purple-500"
    },
    { 
      icon: Camera,
      category: "Médias Manipulés", 
      description: "Contenus visuels et audio falsifiés",
      examples: ["Deepfakes", "Images truquées", "Audio modifiés"],
      color: "bg-green-500"
    }
  ];

  return (
    <section className="h-full flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-congo-red font-semibold">La Menace:</span> État des Lieux
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-congo-red mb-2">{stat.value}</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Threat Types Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold mb-8 text-center flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-congo-red mr-2" />
            Types de Menaces
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {threatTypes.map((threat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl card-shadow"
              >
                <div className={`h-2 bg-gradient-to-r ${threat.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${threat.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <threat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg mb-2">{threat.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{threat.description}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {threat.examples.map((example, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Attack Vectors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center flex items-center justify-center">
            <Target className="w-6 h-6 text-orange-600 mr-2" />
            Vecteurs d'Attaque
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {attackVectors.map((vector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className={`w-10 h-10 ${vector.color} rounded-lg flex items-center justify-center mb-3`}>
                  <vector.icon className="w-5 h-5 text-white" />
                </div>
                <h5 className="font-semibold text-base mb-2">{vector.category}</h5>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{vector.description}</p>
                <div className="space-y-1">
                  {vector.examples.map((example, idx) => (
                    <div key={idx} className="text-xs bg-gray-100 dark:bg-gray-700/50 px-2 py-1 rounded">
                      {example}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}