import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BottomNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function BottomNavigation({ 
  currentSlide, 
  totalSlides, 
  onPrevious, 
  onNext 
}: BottomNavigationProps) {
  return (
    <nav className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={currentSlide === 0}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Précédent</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {currentSlide + 1} / {totalSlides}
          </span>
          <div className="flex space-x-1">
            {Array.from({ length: totalSlides }, (_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide 
                    ? 'w-8 bg-congo-blue' 
                    : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
        
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-congo-blue hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <span>Suivant</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}