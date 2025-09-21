import { GraduationCap, Award, Briefcase, Users, Code, Database, Shield, Globe, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function EquipeSlide() {
  // Team Structure Organizational Chart
  const TeamStructure = () => {
    const teamLayers = [
      {
        level: 'Direction Stratégique',
        roles: ['Directeur Technique', 'Responsable Sécurité'],
        color: 'from-congo-blue to-blue-600',
        count: 2
      },
      {
        level: 'Équipe Technique Senior',
        roles: ['Architecte IA/ML', 'DevOps Lead', 'Responsable Données', 'Expert Cybersécurité'],
        color: 'from-purple-500 to-purple-600',
        count: 4
      },
      {
        level: 'Développement & Analyse',
        roles: ['Développeurs Full-Stack', 'Analystes IA', 'Spécialistes UI/UX', 'Analystes Données'],
        color: 'from-emerald-500 to-emerald-600',
        count: 12
      },
      {
        level: 'Support & Formation',
        roles: ['Support Technique', 'Formation Utilisateurs', 'Documentation', 'QA/Testing'],
        color: 'from-orange-500 to-orange-600',
        count: 8
      }
    ];

    return (
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Structure Organisationnelle</h4>
        
        <div className="space-y-6">
          {teamLayers.map((layer, index) => (
            <motion.div
              key={layer.level}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              className="relative"
            >
              {/* Connection lines to next level */}
              {index < teamLayers.length - 1 && (
                <div className="absolute left-1/2 -bottom-3 w-px h-6 bg-gray-300 dark:bg-gray-600 z-0"></div>
              )}
              
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-lg">{layer.level}</h5>
                  <div className={`px-3 py-1 bg-gradient-to-r ${layer.color} rounded-full text-white text-sm font-bold`}>
                    {layer.count} personnes
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {layer.roles.map((role, roleIndex) => (
                    <motion.div
                      key={role}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.3 + roleIndex * 0.1, duration: 0.4 }}
                      className={`text-center p-3 bg-gradient-to-r ${layer.color} bg-opacity-10 rounded-lg border border-opacity-20`}
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r ${layer.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-xs font-medium">{role}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl font-bold text-congo-blue">26</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Total Équipe An 1</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl font-bold text-emerald-600">100%</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Congolais</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
            <div className="text-xl font-bold text-purple-600">3 ans</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Formation Continue</div>
          </div>
        </div>
      </div>
    );
  };

  // Skills Matrix Visualization
  const SkillsMatrix = () => {
    const skillCategories = [
      {
        category: 'Intelligence Artificielle',
        icon: Code,
        skills: [
          { skill: 'Machine Learning', level: 95 },
          { skill: 'Traitement Langage Naturel', level: 88 },
          { skill: 'Vision par Ordinateur', level: 82 },
          { skill: 'Deep Learning', level: 90 }
        ],
        color: 'blue'
      },
      {
        category: 'Infrastructure & Données',
        icon: Database,
        skills: [
          { skill: 'Cloud Architecture', level: 93 },
          { skill: 'Big Data Processing', level: 87 },
          { skill: 'Elasticsearch', level: 89 },
          { skill: 'Scalabilité Système', level: 85 }
        ],
        color: 'emerald'
      },
      {
        category: 'Sécurité & Gouvernance',
        icon: Shield,
        skills: [
          { skill: 'Cybersécurité', level: 91 },
          { skill: 'Conformité GDPR', level: 86 },
          { skill: 'Audit Systèmes', level: 88 },
          { skill: 'Cryptographie', level: 84 }
        ],
        color: 'red'
      },
      {
        category: 'Expérience Utilisateur',
        icon: Users,
        skills: [
          { skill: 'Interface Gouvernementale', level: 92 },
          { skill: 'Visualisation Données', level: 90 },
          { skill: 'Applications Mobile', level: 87 },
          { skill: 'Formation Utilisateurs', level: 94 }
        ],
        color: 'purple'
      }
    ];

    return (
      <div className="bg-gradient-to-br from-emerald-50 to-orange-50 dark:from-emerald-900/10 dark:to-orange-900/10 rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-center mb-6">Matrice de Compétences Techniques</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 bg-${category.color}-500 rounded-lg flex items-center justify-center`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h5 className="font-semibold">{category.category}</h5>
              </div>
              
              <div className="space-y-3">
                {category.skills.map((skillItem, skillIndex) => (
                  <div key={skillItem.skill}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skillItem.skill}</span>
                      <span className={`font-bold text-${category.color}-600`}>{skillItem.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skillItem.level}%` }}
                        transition={{ 
                          delay: 0.8 + categoryIndex * 0.2 + skillIndex * 0.1, 
                          duration: 1.2 
                        }}
                        className={`bg-${category.color}-500 h-2 rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // International Investment Flow
  const InvestmentFlow = () => {
    return (
      <div className="bg-gradient-to-r from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-6">
        <h4 className="text-xl font-bold text-center mb-6">Flux d'Investissement : Local vs International</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Typical foreign project */}
          <div className="text-center">
            <h5 className="font-semibold mb-4 text-red-600">Projet Logiciel Étranger Typique</h5>
            <div className="space-y-3">
              <div className="relative">
                <div className="h-8 bg-red-200 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-red-800 dark:text-red-200">85% Expertise Étrangère</span>
                </div>
                <Globe className="absolute right-2 top-1 w-6 h-6 text-red-600" />
              </div>
              <div className="h-8 bg-orange-200 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-orange-800 dark:text-orange-200">15% Emploi Local</span>
              </div>
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <p className="text-xs text-red-700 dark:text-red-300">
                  Dépendance permanente • Expertise exportée • Contrôle externe
                </p>
              </div>
            </div>
          </div>

          {/* SENTINEL approach */}
          <div className="text-center">
            <h5 className="font-semibold mb-4 text-emerald-600">Approche SENTINEL</h5>
            <div className="space-y-3">
              <div className="relative">
                <div className="h-8 bg-emerald-200 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">70% Emploi Congolais</span>
                </div>
                <Users className="absolute right-2 top-1 w-6 h-6 text-emerald-600" />
              </div>
              <div className="h-8 bg-blue-200 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">30% APIs & Infrastructure</span>
              </div>
              <div className="mt-4 p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Souveraineté complète • Expertise nationale • Contrôle congolais
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block bg-gradient-to-r from-congo-blue to-congo-red text-white px-6 py-3 rounded-lg font-bold"
          >
            Impact: 70+ emplois hautement qualifiés créés localement
          </motion.div>
        </div>
      </div>
    );
  };

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
            <span className="gradient-text">Notre Équipe</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Des ingénieurs congolais formés et testés dans les institutions mondiales les plus prestigieuses,
            mais engagés à renforcer leur patrie.
          </p>
        </motion.div>

        <TeamStructure />
        <SkillsMatrix />
        <InvestmentFlow />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center card-shadow"
          >
            <GraduationCap className="w-16 h-16 text-congo-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Formation Internationale</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Ingénieurs formés dans les universités et entreprises technologiques 
              de classe mondiale, avec une expertise éprouvée.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center card-shadow"
          >
            <Award className="w-16 h-16 text-congo-red mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Expertise Prouvée</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Expérience dans l'IA, l'analyse de données à grande échelle, 
              et la sécurité informatique au niveau international.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center card-shadow"
          >
            <Briefcase className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Engagement National</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Professionnels congolais dédiés au développement technologique 
              et au renforcement des capacités nationales.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-gradient-to-r from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-8 text-center"
        >
          <p className="text-lg font-medium mb-4">
            À la différence des contrats logiciels étrangers, SENTINEL maintient la majorité 
            des investissements dans le pays. Près de la moitié du coût MVP - et la majorité 
            du programme à long terme de 10 millions de dollars - est dirigée vers les 
            ingénieurs et professionnels congolais.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-congo-blue mb-2">70+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Emplois hautement qualifiés créés sur 3 ans
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-congo-red mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Propriété et contrôle congolais du système
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}