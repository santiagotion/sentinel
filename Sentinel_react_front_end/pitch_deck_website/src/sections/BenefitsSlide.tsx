import { Shield, Globe, TrendingUp, Users, Zap, Heart, DollarSign, Brain, Eye, Database, Bot, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export function BenefitsSlide() {
  const benefits = [
    {
      icon: Heart,
      title: "Paix Préservée",
      points: [
        "Tensions communautaires détectées et désamorcées rapidement",
        "Campagnes de division orchestrées neutralisées avant impact",
        "Tous les Congolais protégés quotidiennement"
      ]
    },
    {
      icon: DollarSign,
      title: "Économie Protégée et Renforcée",
      points: [
        "Investisseurs rassurés par information vérifiée en temps réel",
        "Réputation internationale restaurée et défendue en permanence",
        "Secteurs stratégiques protégés contre guerre économique",
        "Pertes économiques majeures évitées"
      ]
    },
    {
      icon: Shield,
      title: "Souveraineté Face aux Acteurs Étrangers",
      points: [
        "Manipulateurs étrangers identifiés et neutralisés efficacement",
        "Jeunesse protégée contre manipulation sur réseaux sociaux",
        "Réseaux cachés et connexions invisibles révélés",
        "Indépendance informationnelle totale de la RDC"
      ]
    },
    {
      icon: Brain,
      title: "Gouvernance Moderne et Réactive",
      points: [
        "Opinion publique réelle capturée à travers toutes les provinces",
        "Politiques ajustées selon besoins citoyens pour meilleure satisfaction",
        "Signaux faibles des préoccupations émergentes détectés",
        "Décisions basées sur données, pas suppositions"
      ]
    },
    {
      icon: Eye,
      title: "Transparence et Confiance",
      points: [
        "Information gouvernementale vérifiée atteint tous les citoyens",
        "Communication directe sans distorsion médiatique",
        "Renforcement de la confiance entre gouvernement et population",
        "Décisions publiques mieux comprises et acceptées"
      ]
    },
    {
      icon: Bot,
      title: "Efficacité Opérationnelle",
      points: [
        "Surveillance continue avec supervision humaine stratégique",
        "Traitement rapide de volumes impossibles manuellement",
        "Libère les experts pour décisions critiques",
        "Fonctionnement stable en toutes circonstances"
      ]
    },
    {
      icon: Database,
      title: "Mémoire Historique Nationale",
      points: [
        "Archives complètes de toutes les campagnes de désinformation",
        "Données précieuses pour comprendre l'évolution sociale",
        "Base de connaissances pour les générations futures",
        "Apprentissage continu pour améliorer la protection"
      ]
    },
    {
      icon: Lock,
      title: "Sécurité Nationale Renforcée",
      points: [
        "Prévention des manipulations électorales externes",
        "Protection contre les campagnes de déstabilisation",
        "Identification rapide des menaces émergentes",
        "Coordination améliorée entre services de sécurité"
      ]
    }
  ];

  return (
    <section className="h-full flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="gradient-text font-bold">Bénéfices Stratégiques</span> pour la Nation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            De la vulnérabilité à la puissance: comment SENTINEL transforme chaque menace 
            en opportunité de renforcement national
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 card-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-congo-blue to-congo-blue/80 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
              <ul className="space-y-2">
                {benefit.points.map((point, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                    <span className="text-congo-blue mr-2">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Summary Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 bg-gradient-to-r from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-8 text-center"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Avec SENTINEL, la RDC passe de <span className="text-congo-red font-bold">victime</span> à <span className="text-emerald-600 font-bold">leader</span>:
            <br />Plus d'économie affaiblie. Plus de nation divisée.
            <br /><strong className="text-congo-blue">Une nation unie, prospère et souveraine.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}