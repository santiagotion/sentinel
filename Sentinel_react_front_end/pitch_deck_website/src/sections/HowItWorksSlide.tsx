import { AlertTriangle, Users, TrendingUp, Target, Clock, Bot, Share2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function HowItWorksSlide() {
  const examples = [
    {
      title: "Cas 1: Prévention de Violence Communautaire",
      timeline: [
        {
          time: "0 min",
          event: "Fausse vidéo accusant une ethnie d'attaquer une autre commence à circuler massivement",
          action: "SENTINEL détecte pic anormal + sentiment haineux",
          icon: AlertTriangle,
          color: "text-red-600"
        },
        {
          time: "2.4 sec",
          event: "Acteurs étrangers identifiés orchestrant la campagne via multiples comptes bots",
          action: "Alerte URGENTE aux autorités",
          icon: Bot,
          color: "text-orange-600"
        },
        {
          time: "3 min",
          event: "Vidéo identifiée comme manipulation et fausse information",
          action: "Preuves compilées automatiquement",
          icon: Share2,
          color: "text-purple-600"
        },
        {
          time: "10 min",
          event: "Leaders communautaires alertés, messages de paix diffusés, tension désamorcée",
          action: "VIES SAUVÉES",
          icon: CheckCircle2,
          color: "text-emerald-600"
        }
      ]
    },
    {
      title: "Cas 2: Protection de l'Économie Nationale",
      timeline: [
        {
          time: "0 min",
          event: "Campagne massive: 'La RDC interdit tout investissement minier!' sur 11 plateformes",
          action: "Volume inhabituel détecté simultanément",
          icon: TrendingUp,
          color: "text-red-600"
        },
        {
          time: "1 min",
          event: "Prédiction: Impact économique majeur si non stoppé",
          action: "Analyse d'impact lancée",
          icon: Clock,
          color: "text-orange-600"
        },
        {
          time: "5 min",
          event: "Réseau coordonné de milliers de comptes tracé, majorité hors RDC",
          action: "Carte des attaquants générée",
          icon: Users,
          color: "text-purple-600"
        },
        {
          time: "15 min",
          event: "Communiqué officiel + fact-check viral, investisseurs rassurés, marchés stabilisés",
          action: "ÉCONOMIE PROTÉGÉE",
          icon: Target,
          color: "text-emerald-600"
        }
      ]
    },
    {
      title: "Cas 3: Capture de l'Opinion Publique Réelle",
      timeline: [
        {
          time: "Continue",
          event: "Gouvernement planifie nouvelle politique de santé rurale",
          action: "SENTINEL surveille réactions",
          icon: Users,
          color: "text-blue-600"
        },
        {
          time: "24h",
          event: "Milliers de mentions analysées: préoccupations sur accessibilité dans plusieurs provinces",
          action: "Insights extraits automatiquement",
          icon: TrendingUp,
          color: "text-purple-600"
        },
        {
          time: "48h",
          event: "Signaux faibles détectés: besoin de personnel parlant dialectes locaux",
          action: "Recommandations générées",
          icon: AlertTriangle,
          color: "text-orange-600"
        },
        {
          time: "72h",
          event: "Politique ajustée selon feedback, satisfaction citoyenne significativement améliorée",
          action: "GOUVERNANCE MODERNE",
          icon: CheckCircle2,
          color: "text-emerald-600"
        }
      ]
    },
    {
      title: "Cas 4: Attaque Nocturne de Désinformation",
      timeline: [
        {
          time: "3:00 AM",
          event: "Faux décret présidentiel publié: 'Nouveau taxes sur transferts d'argent mobile'",
          action: "SENTINEL détecte activité anormale nocturne",
          icon: Clock,
          color: "text-red-600"
        },
        {
          time: "3:02 AM",
          event: "Propagation virale pendant que la population dort, panique anticipée au réveil",
          action: "Équipe d'urgence alertée automatiquement",
          icon: AlertTriangle,
          color: "text-orange-600"
        },
        {
          time: "3:15 AM",
          event: "Document analysé et confirmé comme falsification, sources malveillantes identifiées",
          action: "Contre-narrative préparée",
          icon: Share2,
          color: "text-purple-600"
        },
        {
          time: "6:00 AM",
          event: "Démenti officiel déjà viral au réveil, panique évitée, confiance maintenue",
          action: "CHAOS ÉCONOMIQUE ÉVITÉ",
          icon: CheckCircle2,
          color: "text-emerald-600"
        }
      ]
    }
  ];

  return (
    <section className="h-full flex items-center justify-center p-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="gradient-text font-bold">Scénarios de Protection Nationale</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Découvrez comment SENTINEL transforme des situations critiques en victoires 
            pour la paix, l'économie et l'unité nationale
          </p>
        </motion.div>

        <div className="space-y-12">
          {examples.map((example, exampleIndex) => (
            <motion.div
              key={exampleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + exampleIndex * 0.3, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 card-shadow"
            >
              <h3 className="text-2xl font-semibold mb-8 text-center text-congo-blue">
                {example.title}
              </h3>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-orange-500 to-emerald-500"></div>
                
                {/* Timeline events */}
                <div className="space-y-8">
                  {example.timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + exampleIndex * 0.3 + index * 0.1, duration: 0.5 }}
                      className="flex items-start space-x-6"
                    >
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-full bg-white dark:bg-gray-700 border-4 border-gray-100 dark:border-gray-600 flex items-center justify-center z-10`}>
                        <item.icon className={`w-8 h-8 ${item.color}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-baseline space-x-4 mb-2">
                          <span className="text-sm font-bold text-gray-500">{item.time}</span>
                          <span className={`text-sm font-semibold ${item.color}`}>{item.action}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {item.event}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}