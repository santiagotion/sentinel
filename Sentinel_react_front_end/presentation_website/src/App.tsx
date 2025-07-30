import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/sections/HeroSection';
import { ExecutiveSummary } from './components/sections/ExecutiveSummary';
import { ThreatAssessment } from './components/sections/ThreatAssessment';
import { SolutionOverview } from './components/sections/SolutionOverview';
import { TechnicalCapabilities } from './components/sections/TechnicalCapabilities';
import { UIShowcases } from './components/sections/UIShowcases';
import { OperationalDashboard } from './components/sections/OperationalDashboard';
import { StrategicBenefits } from './components/sections/StrategicBenefits';
import { Implementation } from './components/sections/Implementation';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'executive-summary', 'threat-assessment', 'solution-overview', 'technical-capabilities', 'ui-showcases', 'operational-dashboard', 'strategic-benefits', 'implementation'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 dark:bg-gray-900">
        <Navigation 
          activeSection={activeSection}
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
          scrollToSection={scrollToSection}
        />
        
        <HeroSection scrollToSection={scrollToSection} />
        <ExecutiveSummary />
        <ThreatAssessment />
        <SolutionOverview />
        <TechnicalCapabilities />
        <UIShowcases />
        <OperationalDashboard />
        <StrategicBenefits />
        <Implementation />

        {/* Footer */}
        <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5"></div>
          <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                © 2024 <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SENTINEL</span> - Système de Défense de l'Information Nationale
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}