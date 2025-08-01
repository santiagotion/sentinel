import { Smartphone, CheckCircle, Bell, Shield, Users, Globe, MessageSquare, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function FactCheckAppSlide() {
  const features = [
    {
      icon: CheckCircle,
      title: "Vérification Instantanée",
      description: "Chaque information vérifiée par SENTINEL avant publication"
    },
    {
      icon: Bell,
      title: "Alertes en Temps Réel",
      description: "Notifications immédiates lors de campagnes de désinformation"
    },
    {
      icon: Shield,
      title: "Contre-Narratifs Automatiques",
      description: "Réponses factuelles diffusées pour contrer les fausses informations"
    },
    {
      icon: Globe,
      title: "Multilingue et Local",
      description: "Disponible en français, lingala, swahili et langues locales"
    }
  ];

  const benefits = [
    "Citoyens informés = décisions éclairées",
    "Jeunesse protégée contre manipulation",
    "Confiance restaurée dans l'information",
    "Unité nationale renforcée"
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
            <span className="gradient-text font-bold">SENTINEL Citoyen</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            L'application mobile qui met le pouvoir de la vérité entre les mains de chaque Congolais
          </p>
        </motion.div>

        {/* App Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Phone Mockup */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative"
              >
                <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    {/* App Header */}
                    <div className="bg-gradient-to-r from-congo-blue to-congo-red p-4">
                      <h3 className="text-white font-bold text-lg text-center">SENTINEL Vérité</h3>
                      <p className="text-white/80 text-xs text-center">Information vérifiée pour tous</p>
                    </div>
                    
                    {/* App Content */}
                    <div className="p-4 space-y-3">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Information Vérifiée</p>
                            <p className="text-xs text-gray-600">Le gouvernement n'a pas annoncé de nouvelles taxes</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <Bell className="w-5 h-5 text-red-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Alerte Désinformation</p>
                            <p className="text-xs text-gray-600">Fausse vidéo en circulation - Restez vigilant</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Contre-Narratif</p>
                            <p className="text-xs text-gray-600">Voici les faits réels sur la situation...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Protection Pour Chaque Citoyen</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-congo-blue to-congo-blue/80 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">{feature.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 card-shadow mb-12"
        >
          <h3 className="text-xl font-semibold text-center mb-6">Comment Ça Fonctionne</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-purple-600">1</span>
              </div>
              <h4 className="font-medium mb-2">SENTINEL Détecte</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Une fausse information commence à circuler sur les réseaux
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-orange-600">2</span>
              </div>
              <h4 className="font-medium mb-2">App Alerte</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Notification instantanée envoyée à tous les utilisateurs concernés
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-emerald-600">3</span>
              </div>
              <h4 className="font-medium mb-2">Vérité Diffusée</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Information vérifiée et contre-narratif partagés massivement
              </p>
            </div>
          </div>
        </motion.div>

        {/* Impact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="bg-gradient-to-r from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-center mb-4">Impact National</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                <p className="text-sm font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}