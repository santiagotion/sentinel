import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function SlideControls({ currentSlide, totalSlides, onPrevious, onNext }: SlideControlsProps) {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-40 no-print">
      <button
        onClick={onPrevious}
        disabled={currentSlide === 0}
        className={`p-3 rounded-full transition-all duration-200 ${
          currentSlide === 0
            ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg'
        }`}
        aria-label="Slide précédente"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
        {currentSlide + 1} / {totalSlides}
      </span>
      
      <button
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className={`p-3 rounded-full transition-all duration-200 ${
          currentSlide === totalSlides - 1
            ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg'
        }`}
        aria-label="Slide suivante"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}