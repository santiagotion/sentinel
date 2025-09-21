import { AlertTriangle, Globe, Users, Zap } from 'lucide-react';
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