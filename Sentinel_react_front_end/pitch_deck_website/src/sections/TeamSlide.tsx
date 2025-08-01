import { Code, Brain, Globe, GraduationCap, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

// Import company logos
import uberLogo from '../assets/uber logo.png';
import microsoftLogo from '../assets/microsoft logo.png';
import gsLogo from '../assets/GS_logo.png';
import btLogo from '../assets/bt logo.png';
import amazonLogo from '../assets/amazon logo.png';

export function TeamSlide() {
  const expertise = [
    { icon: Brain, label: "Experts IA capables de traiter des millions de messages/minute" },
    { icon: Code, label: "Ingénieurs ex-Google/Meta maîtrisant les systèmes complexes" },
    { icon: Globe, label: "Comprennent nos langues locales et réalités culturelles" },
    { icon: GraduationCap, label: "Transfèrent leur expertise aux talents congolais" }
  ];

  const companyLogos = [
    { src: uberLogo, alt: "Uber", name: "Uber" },
    { src: microsoftLogo, alt: "Microsoft", name: "Microsoft" },
    { src: gsLogo, alt: "Goldman Sachs", name: "Goldman Sachs" },
    { src: btLogo, alt: "British Telecom", name: "British Telecom" },
    { src: amazonLogo, alt: "Amazon", name: "Amazon" }
  ];

  const teamMembers = [
    {
      name: "Santi Ribeiro",
      role: "Software Engineer",
      linkedin: "https://www.linkedin.com/in/santirib/"
    },
    {
      name: "Nicolas Nkiere",
      role: "Software Engineer",
      linkedin: "https://www.linkedin.com/in/nicolasnkiere/"
    },
    {
      name: "Elie Masanka",
      role: "Software Engineer",
      linkedin: "https://www.linkedin.com/in/eliemasanka/"
    },
    {
      name: "Nathan Tuala",
      role: "Software Engineer",
      linkedin: "https://www.linkedin.com/in/nathan-tuala-6817791a8/"
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
            <span className="gradient-text font-bold">L'Équipe</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            L'équipe qui comprend la complexité du défi et possède l'expertise 
            pour transformer l'impossible en réalité
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-congo-blue/10 to-congo-red/10 dark:from-congo-blue/20 dark:to-congo-red/20 rounded-xl p-8 mb-12"
        >
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 leading-relaxed">
            Notre <strong>origine congolaise</strong> nous fait comprendre l'urgence de protéger nos citoyens.
            Notre <strong>expertise mondiale</strong> acquise chez <strong>Uber</strong>, <strong>Microsoft</strong>, 
            {' '}<strong>Goldman Sachs</strong>, <strong>British Telecom</strong> et bien d'autres, nous donne les moyens 
            de créer une solution capable de <strong>neutraliser des menaces complexes</strong> que les méthodes 
            manuelles ne peuvent pas gérer.
          </p>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center items-center gap-6">
            {companyLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto object-contain filter brightness-0 dark:brightness-100 dark:invert opacity-80"
                  title={logo.name}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-semibold text-center mb-8">Notre Équipe</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.a
                key={index}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center hover:shadow-lg transition-shadow group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-congo-blue to-congo-red rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{member.role}</p>
                <div className="flex items-center justify-center gap-2 text-congo-blue mb-2">
                  <Linkedin className="w-5 h-5" />
                  <span className="text-xs font-medium">LinkedIn</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
                  {member.linkedin.replace('https://www.', '')}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}