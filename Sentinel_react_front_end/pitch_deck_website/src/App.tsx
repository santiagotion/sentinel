import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { ScrollIndicator } from './components/ScrollIndicator';
import { TitleSlide } from './sections/TitleSlide';
import { ExecutiveSummarySlide } from './sections/ExecutiveSummarySlide';
import { ProblemSlide } from './sections/ProblemSlide';
import { ThreatAssessmentSlide } from './sections/ThreatAssessmentSlide';
import { ComplexitySlide } from './sections/ComplexitySlide';
import { PublicOpinionSlide } from './sections/PublicOpinionSlide';
import { SolutionOverviewSlide } from './sections/SolutionOverviewSlide';
import { FeaturesSlide } from './sections/FeaturesSlide';
import { HowItWorksSlide } from './sections/HowItWorksSlide';
import { UseCasesSlide } from './sections/UseCasesSlide';
import { DemoSlide } from './sections/DemoSlide';
import { TeamSlide } from './sections/TeamSlide';
import { ImplementationSlide } from './sections/ImplementationSlide';
import { BenefitsSlide } from './sections/BenefitsSlide';
import { NextStepsSlide } from './sections/NextStepsSlide';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    <TitleSlide />,
    <ExecutiveSummarySlide />,
    <ProblemSlide />,
    <ThreatAssessmentSlide />,
    <ComplexitySlide />,
    <PublicOpinionSlide />,
    <SolutionOverviewSlide />,
    <FeaturesSlide />,
    <HowItWorksSlide />,
    <UseCasesSlide />,
    <DemoSlide />,
    <TeamSlide />,
    <ImplementationSlide />,
    <BenefitsSlide />,
    <NextStepsSlide />
  ];

  const slideNames = [
    "Titre",
    "Résumé Exécutif", 
    "Le Problème",
    "Analyse des Menaces",
    "L'Impossible Défi",
    "Le Pouls de la Nation",
    "La Solution SENTINEL",
    "Capacités Complètes",
    "SENTINEL en Action",
    "Cas d'Usage",
    "Démonstration",
    "L'Équipe",
    "Implémentation",
    "Bénéfices",
    "Prochaines Étapes"
  ];

  const totalSlides = slides.length;

  const resetScroll = () => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    }
  };

  // Keyboard navigation
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

  // Touch/swipe navigation for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        handleNext();
      }
      if (touchEndX > touchStartX + 50) {
        handlePrevious();
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 flex">
        {/* Left Sidebar */}
        <Sidebar 
          slides={slideNames}
          currentSlide={currentSlide}
          onNavigate={handleNavigate}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {/* Header */}
          <Header currentSlideTitle={slideNames[currentSlide]} />
          
          {/* Slide Content */}
          <main className="flex-1 overflow-y-auto pb-20">
            <div className="transition-all duration-500 ease-in-out">
              {slides[currentSlide]}
            </div>
          </main>
          
          {/* Scroll Indicator */}
          <ScrollIndicator currentSlide={currentSlide} />
          
          {/* Bottom Navigation - Floating */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
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