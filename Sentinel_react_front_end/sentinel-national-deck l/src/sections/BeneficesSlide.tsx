import { Shield, Users, TrendingUp, Award } from 'lucide-react';
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