import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { ScrollIndicator } from './components/ScrollIndicator';
import { ThemeToggle } from './components/ThemeToggle';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { TitleSlide } from './sections/TitleSlide';
import { ContexteSlide } from './sections/ContexteSlide';
import { DefisSlide } from './sections/DefisSlide';
import { SolutionSlide } from './sections/SolutionSlide';
import { CapacitesSlide } from './sections/CapacitesSlide';
import { FonctionnalitesSlide } from './sections/FonctionnalitesSlide';
import { ArchitectureSlide } from './sections/ArchitectureSlide';
import { InvestissementSlide } from './sections/InvestissementSlide';
import { BeneficesSlide } from './sections/BeneficesSlide';
import { EquipeSlide } from './sections/EquipeSlide';
import { RoadmapSlide } from './sections/RoadmapSlide';
import { EngagementSlide } from './sections/EngagementSlide';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const slides = [
    <TitleSlide />,
    <ContexteSlide />,
    <DefisSlide />,
    <SolutionSlide />,
    <CapacitesSlide />,
    <FonctionnalitesSlide />,
    <ArchitectureSlide />,
    <InvestissementSlide />,
    <BeneficesSlide />,
    <EquipeSlide />,
    <RoadmapSlide />,
    <EngagementSlide />
  ];

  const slideNames = [
    "SENTINEL",
    "Contexte National",
    "Défis Actuels",
    "Notre Solution",
    "Capacités Principales", 
    "Fonctionnalités Système",
    "Architecture Technique",
    "Investissement Requis",
    "Bénéfices Nationaux",
    "Notre Équipe",
    "Feuille de Route",
    "Engagement"
  ];

  const totalSlides = slides.length;

  const resetScroll = () => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      resetScroll();
    }
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
      resetScroll();
    }
  };

  const handleNavigate = (slide: number) => {
    if (slide >= 0 && slide < totalSlides) {
      setCurrentSlide(slide);
      resetScroll();
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    resetScroll();
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'Escape') {
        setCurrentSlide(0);
        resetScroll();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 flex overflow-x-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block flex-shrink-0">
          <Sidebar 
            slides={slideNames}
            currentSlide={currentSlide}
            onNavigate={handleNavigate}
          />
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="md:hidden fixed left-0 top-0 h-full w-80 bg-gray-50 dark:bg-gray-900 z-50 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-10 h-10 text-congo-blue" />
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">SENTINEL</h2>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Présentation Nationale</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <nav className="space-y-1">
                    {slideNames.map((name, index) => (
                      <button
                        key={index}
                        onClick={() => handleNavigate(index)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          currentSlide === index
                            ? 'bg-congo-blue text-white font-semibold shadow-lg'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`text-sm ${currentSlide === index ? 'text-white/80' : 'text-gray-500'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span>{name}</span>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {/* Mobile Header */}
          <header className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-congo-blue" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">SENTINEL</span>
              </div>
              <ThemeToggle />
            </div>
            <h1 className="text-center text-base font-bold text-gray-900 dark:text-white">
              {slideNames[currentSlide]}
            </h1>
          </header>
          
          {/* Desktop Header */}
          <div className="hidden md:block">
            <Header currentSlideTitle={slideNames[currentSlide]} />
          </div>
          
          {/* Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden pb-24">
            <div className="transition-all duration-500 ease-in-out w-full overflow-x-hidden">
              {slides[currentSlide]}
            </div>
          </main>
          
          {/* Scroll Indicator */}
          <ScrollIndicator currentSlide={currentSlide} />
          
          {/* Navigation */}
          <div className="fixed bottom-0 left-0 right-0 z-10 safe-area-inset-bottom">
            <BottomNavigation
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;