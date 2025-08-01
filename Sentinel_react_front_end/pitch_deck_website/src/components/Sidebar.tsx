import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface SidebarProps {
  slides: string[];
  currentSlide: number;
  onNavigate: (index: number) => void;
}

export function Sidebar({ slides, currentSlide, onNavigate }: SidebarProps) {

  return (
    <>
      {/* Tablet Sidebar - Numbers Only */}
      <aside className="hidden md:block lg:hidden w-20 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-center mb-8">
            <Shield className="w-10 h-10 text-congo-blue" />
          </div>
          
          <nav className="space-y-2">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => onNavigate(index)}
                className={`w-full py-3 rounded-lg transition-all duration-200 ${
                  currentSlide === index
                    ? 'bg-congo-blue text-white font-bold shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
                whileHover={{ scale: currentSlide === index ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Desktop Sidebar - Full */}
      <aside className="hidden lg:block w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto">
        <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <Shield className="w-10 h-10 text-congo-blue" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">SENTINEL</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">Défendre la Vérité • Protéger la Nation</p>
          </div>
        </div>
        
        <nav className="space-y-1">
          {slides.map((name, index) => (
            <motion.button
              key={index}
              onClick={() => onNavigate(index)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                currentSlide === index
                  ? 'bg-congo-blue text-white font-semibold shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
              whileHover={{ x: currentSlide === index ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-3">
                  <span className={`text-sm ${currentSlide === index ? 'text-white/80' : 'text-gray-500'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{name}</span>
                </span>
                {currentSlide === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            </motion.button>
          ))}
        </nav>
      </div>
    </aside>
    </>
  );
}