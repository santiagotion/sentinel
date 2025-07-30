import { ArrowRight, Shield, Target, Globe, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { VerticalLinePattern } from '../patterns/VerticalLinePattern';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

// Background color options
const backgroundColors = [
  // Dark variations - Different shades of black
  { name: 'Pure Black', light: 'bg-black', dark: 'bg-black' },
  { name: 'Void', light: 'bg-gray-950', dark: 'bg-gray-950' },
  { name: 'Midnight', light: 'bg-slate-950', dark: 'bg-slate-950' },
  { name: 'Obsidian', light: 'bg-zinc-950', dark: 'bg-zinc-950' },
  { name: 'Charcoal', light: 'bg-neutral-950', dark: 'bg-neutral-950' },
  { name: 'Onyx', light: 'bg-stone-950', dark: 'bg-stone-950' },
  
  // Near-black variations
  { name: 'Raven', light: 'bg-gray-900', dark: 'bg-gray-900' },
  { name: 'Shadow', light: 'bg-slate-900', dark: 'bg-slate-900' },
  { name: 'Graphite', light: 'bg-zinc-900', dark: 'bg-zinc-900' },
  { name: 'Carbon', light: 'bg-neutral-900', dark: 'bg-neutral-900' },
  { name: 'Soot', light: 'bg-stone-900', dark: 'bg-stone-900' },
  { name: 'Pitch', light: 'bg-gray-800', dark: 'bg-gray-800' },
  
  // Dark with color tints
  { name: 'Dark Navy', light: 'bg-blue-950', dark: 'bg-blue-950' },
  { name: 'Deep Ocean', light: 'bg-indigo-950', dark: 'bg-indigo-950' },
  { name: 'Dark Forest', light: 'bg-green-950', dark: 'bg-green-950' },
  { name: 'Deep Purple', light: 'bg-purple-950', dark: 'bg-purple-950' },
  { name: 'Burgundy', light: 'bg-red-950', dark: 'bg-red-950' },
  { name: 'Dark Teal', light: 'bg-teal-950', dark: 'bg-teal-950' },
  
  // Light variations (keeping some for contrast)
  { name: 'Pure White', light: 'bg-white', dark: 'bg-black' },
  { name: 'Snow', light: 'bg-gray-50', dark: 'bg-gray-950' },
  { name: 'Pearl', light: 'bg-slate-50', dark: 'bg-slate-950' },
  { name: 'Cream', light: 'bg-stone-50', dark: 'bg-stone-950' },
  { name: 'Ivory', light: 'bg-neutral-50', dark: 'bg-neutral-950' },
  { name: 'Chalk', light: 'bg-zinc-50', dark: 'bg-zinc-950' },
  
  // Blue family
  { name: 'Ice Blue', light: 'bg-blue-50', dark: 'bg-blue-950' },
  { name: 'Sky', light: 'bg-sky-50', dark: 'bg-sky-950' },
  { name: 'Ocean', light: 'bg-cyan-50', dark: 'bg-cyan-950' },
  { name: 'Navy', light: 'bg-indigo-50', dark: 'bg-indigo-950' },
  { name: 'Royal', light: 'bg-blue-100', dark: 'bg-blue-900' },
  { name: 'Azure', light: 'bg-sky-100', dark: 'bg-sky-900' },
  
  // Green family
  { name: 'Mint', light: 'bg-teal-50', dark: 'bg-teal-950' },
  { name: 'Jade', light: 'bg-emerald-50', dark: 'bg-emerald-950' },
  { name: 'Forest', light: 'bg-green-50', dark: 'bg-green-950' },
  { name: 'Lime', light: 'bg-lime-50', dark: 'bg-lime-950' },
  { name: 'Sage', light: 'bg-green-100', dark: 'bg-green-900' },
  { name: 'Olive', light: 'bg-lime-100', dark: 'bg-lime-900' },
  
  // Warm colors
  { name: 'Sunrise', light: 'bg-yellow-50', dark: 'bg-yellow-950' },
  { name: 'Gold', light: 'bg-amber-50', dark: 'bg-amber-950' },
  { name: 'Honey', light: 'bg-yellow-100', dark: 'bg-yellow-900' },
  { name: 'Sunset', light: 'bg-orange-50', dark: 'bg-orange-950' },
  { name: 'Peach', light: 'bg-orange-100', dark: 'bg-orange-900' },
  { name: 'Coral', light: 'bg-red-50', dark: 'bg-red-950' },
  
  // Pink/Purple family
  { name: 'Blush', light: 'bg-rose-50', dark: 'bg-rose-950' },
  { name: 'Rose', light: 'bg-pink-50', dark: 'bg-pink-950' },
  { name: 'Magenta', light: 'bg-fuchsia-50', dark: 'bg-fuchsia-950' },
  { name: 'Orchid', light: 'bg-purple-50', dark: 'bg-purple-950' },
  { name: 'Lavender', light: 'bg-violet-50', dark: 'bg-violet-950' },
  { name: 'Plum', light: 'bg-purple-100', dark: 'bg-purple-900' },
  
  // Special combinations
  { name: 'Mist', light: 'bg-gray-100', dark: 'bg-gray-900' },
  { name: 'Cloud', light: 'bg-slate-100', dark: 'bg-slate-900' },
  { name: 'Smoke', light: 'bg-zinc-100', dark: 'bg-zinc-900' },
  { name: 'Sand', light: 'bg-stone-100', dark: 'bg-stone-900' },
  { name: 'Dust', light: 'bg-neutral-100', dark: 'bg-neutral-900' },
  { name: 'Shadow', light: 'bg-gray-200', dark: 'bg-gray-800' },
];

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { theme } = useTheme();
  const selectedBg = 6; // Default to Raven
  const currentBg = backgroundColors[selectedBg];

  return (
    <section id="hero" className={`pt-16 min-h-screen ${theme === 'dark' ? currentBg.dark : currentBg.light} relative overflow-hidden`}>
      <VerticalLinePattern />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Main Content */}
        <div className="pt-20 pb-16 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 dark:text-white mb-8 leading-tight">
            La Guerre de l'Information
            <br />
            <span className="font-normal text-red-600 dark:text-red-400">menace la RDC</span>
          </h1>
          
          {/* SENTINEL Box - Modern glass effect */}
          <div className="relative mb-12 max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-15"></div>
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-10 shadow-md">
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
        <div className="mb-6">
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
        <div className="pb-16">
          <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">99.7%</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Précision</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mb-2">&lt;45s</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Détection</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent mb-2">15</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Langues</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent mb-2">26</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Provinces</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}