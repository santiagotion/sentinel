import { Shield, Globe, TrendingUp, Users, Zap, Heart, DollarSign, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export function BenefitsSlide() {
  const benefits = [
    {
      icon: Heart,
      title: "Vies Sauvées et Paix Préservée",
      points: [
        "Zéro vie perdue à cause de fausses informations provoquées",
        "Tensions communautaires détectées et désamorcées en 2.4 secondes",
        "Campagnes de division orchestrées neutralisées avant impact",
        "45 millions de Congolais protégés quotidiennement"
      ]
    },
    {
      icon: DollarSign,
      title: "Économie Protégée et Renforcée",
      points: [
        "Investisseurs rassurés par information vérifiée en temps réel",
        "Réputation internationale restaurée et défendue 24/7",
        "Secteurs stratégiques protégés contre guerre économique",
        "$45M+ de pertes déjà évitées, milliards à venir"
      ]
    },
    {
      icon: Shield,
      title: "Souveraineté Face aux Acteurs Étrangers",
      points: [
        "96.3% des manipulateurs étrangers identifiés et neutralisés",
        "Jeunesse protégée contre manipulation sur réseaux sociaux",
        "Réseaux cachés et connexions invisibles révélés",
        "Indépendance informationnelle totale de la RDC"
      ]
    },
    {
      icon: Brain,
      title: "Gouvernance Moderne et Réactive",
      points: [
        "Opinion publique réelle capturée à travers 26 provinces",
        "Politiques ajustées selon besoins citoyens = 73% satisfaction",
        "Signaux faibles des préoccupations émergentes détectés",
        "Décisions basées sur données, pas suppositions"
      ]
    },
    {
      icon: Globe,
      title: "Leadership Continental et Mondial",
      points: [
        "RDC devient modèle africain de défense contre désinformation",
        "Technologie exportable vers autres nations africaines",
        "50+ experts congolais formés deviennent leaders régionaux",
        "Transformation de vulnérabilité en avantage compétitif"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.slice(0, 3).map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.slice(3).map((benefit, index) => (
            <motion.div
              key={index + 3}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 card-shadow"
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
            <br />Plus de vies perdues. Plus d'économie affaiblie. Plus de nation divisée.
            <br /><strong className="text-congo-blue">Une nation unie, prospère et souveraine.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}