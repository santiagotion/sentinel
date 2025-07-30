// Navigation component
import { Shield, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

export function Navigation({ 
  activeSection, 
  showMobileMenu, 
  setShowMobileMenu, 
  scrollToSection 
}: NavigationProps) {
  const navigationItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'executive-summary', label: 'Résumé Exécutif' },
    { id: 'threat-assessment', label: 'Évaluation des Menaces' },
    { id: 'solution-overview', label: 'Solution SENTINEL' },
    { id: 'technical-capabilities', label: 'Capacités Techniques' },
    { id: 'ui-showcases', label: 'Interface Utilisateur' },
    { id: 'operational-dashboard', label: 'Centre Opérationnel' },
    { id: 'strategic-benefits', label: 'Avantages Stratégiques' },
    { id: 'implementation', label: 'Mise en Œuvre' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SENTINEL
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 block">
                Système d'Intelligence Numérique
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}