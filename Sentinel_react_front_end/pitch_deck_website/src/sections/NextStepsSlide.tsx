import { CheckCircle, ArrowRight, AlertTriangle, Clock, Shield, TrendingUp, MessageCircle, Presentation, Calendar, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function NextStepsSlide() {
  const contactOptions = [
    {
      title: "Questions & Clarifications",
      icon: MessageCircle,
      description: "Nous sommes ouverts à toutes vos questions",
      points: [
        "Approfondissement technique de la solution",
        "Clarifications sur l'approche proposée",
        "Discussion sur l'adaptation à vos besoins spécifiques"
      ]
    },
    {
      title: "Présentation Live",
      icon: Presentation,
      description: "Démonstration complète de SENTINEL",
      points: [
        "Présentation détaillée avec votre équipe",
        "Démonstration en temps réel du système",
        "Session de questions-réponses interactive"
      ]
    },
    {
      title: "Planification & Stratégie",
      icon: Calendar,
      description: "Définir ensemble la feuille de route",
      points: [
        "Calendrier de déploiement personnalisé",
        "Identification des priorités nationales",
        "Plan d'action adapté à vos objectifs"
      ]
    },
    {
      title: "Contact Direct",
      icon: Mail,
      description: "Nous restons à votre disposition",
      points: [
        "Disponibles pour un appel vidéo",
        "Rencontre en personne si nécessaire",
        "Réponse rapide à toutes vos demandes"
      ]
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
            <span className="gradient-text font-bold">Prochaines Étapes</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Nous sommes à votre entière disposition pour répondre à vos questions 
            et adapter notre solution à vos besoins spécifiques
          </p>
        </motion.div>

        {/* Contact Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow hover:shadow-lg transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-congo-blue to-congo-blue/80 rounded-xl flex items-center justify-center flex-shrink-0">
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{option.description}</p>
                  <ul className="space-y-2">
                    {option.points.map((point, i) => (
                      <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <ArrowRight className="w-4 h-4 text-congo-blue mr-2 mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engagement Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-gradient-to-br from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-8 card-shadow text-center"
        >
          <h3 className="text-xl font-semibold mb-4">Notre Engagement</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Nous sommes prêts à travailler main dans la main avec votre équipe pour 
            assurer le succès de cette initiative nationale cruciale.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-sm font-medium">Transparence Totale</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-sm font-medium">Sécurité Garantie</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-sm font-medium">Résultats Mesurables</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-congo-blue to-congo-red p-1 rounded-xl inline-block">
            <div className="bg-white dark:bg-gray-900 rounded-lg px-8 py-6">
              <p className="text-xl font-semibold gradient-text mb-3">
                Ensemble, Protégeons la RDC
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Nous attendons avec impatience l'opportunité de discuter avec vous
                <br />et de contribuer à la sécurité informationnelle de notre nation.
              </p>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-gray-500 dark:text-gray-600">
            Ce document est confidentiel et destiné uniquement aux autorités gouvernementales 
            de la République Démocratique du Congo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}