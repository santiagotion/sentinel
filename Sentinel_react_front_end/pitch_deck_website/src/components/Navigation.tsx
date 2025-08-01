import { Shield, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (slide: number) => void;
}

export function Navigation({ currentSlide, totalSlides, onNavigate }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    'Introduction',
    'Résumé',
    'Problème',
    'Menaces',
    'Solution',
    'Cas d\'Usage',
    'Démonstration',
    'Équipe',
    'Mise en Œuvre',
    'Bénéfices',
    'Prochaines Étapes'
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 no-print">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-congo-blue" />
            <span className="text-xl font-semibold">SENTINEL</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              {[...Array(totalSlides)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide 
                      ? 'bg-congo-blue dark:bg-congo-yellow w-6' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`Aller à la slide ${i + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Changer de thème"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-6 py-4 space-y-2">
            {sections.map((section, i) => (
              <button
                key={i}
                onClick={() => {
                  onNavigate(i);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  i === currentSlide
                    ? 'bg-congo-blue text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {section}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{theme === 'dark' ? 'Mode clair' : 'Mode sombre'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}