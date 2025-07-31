import { ArrowRight, Shield, Target, Globe, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <section id="hero" className="pt-16 min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-gray-900 dark:text-white" />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">SENTINEL</span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Main Content */}
        <div className="pt-20 pb-16 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 dark:text-white mb-8 leading-tight">
            La Guerre de l'Information
            <br />
            <span className="font-normal text-red-600 dark:text-red-400">menace la RDC</span>
          </h1>
          
          {/* SENTINEL Box - Highlighted with gradient */}
          <div className="relative mb-12 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl p-8 shadow-xl">
              <p className="text-xl md:text-2xl text-gray-900 dark:text-white font-medium leading-relaxed">
                <strong className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SENTINEL</strong> protège la souveraineté numérique congolaise grâce à l'intelligence artificielle
              </p>
            </div>
          </div>

          <button 
            onClick={() => scrollToSection('executive-summary')}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Découvrir la Solution
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Strategic Objectives Cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-light text-gray-900 dark:text-white text-center mb-12">
            Objectifs Stratégiques
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Protection Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Protection Nationale
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Défense proactive contre les campagnes de désinformation
                </p>
              </div>
            </div>

            {/* Sovereignty Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Souveraineté Numérique
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Contrôle autonome de l'espace informationnel congolais
                </p>
              </div>
            </div>

            {/* Reactivity Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Réactivité Stratégique
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Détection et neutralisation en temps réel
                </p>
              </div>
            </div>

            {/* Precision Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Précision Opérationnelle
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Intelligence artificielle adaptée au contexte local
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl"></div>
          <div className="relative border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">Haute</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Précision</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-2">Rapide</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Détection</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent mb-2">Multi</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Langues</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2">Toutes</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Provinces</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}