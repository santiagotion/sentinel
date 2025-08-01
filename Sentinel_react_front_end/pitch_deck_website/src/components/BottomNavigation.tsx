import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function BottomNavigation({ currentSlide, totalSlides, onPrevious, onNext }: BottomNavigationProps) {
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="h-20 bg-congo-blue/90 backdrop-blur-md border-t border-congo-blue/20 shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.3)] pb-safe">
      <div className="h-full px-4 md:px-8 flex items-center justify-between">
        <motion.button
          onClick={onPrevious}
          disabled={currentSlide === 0}
          className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${
            currentSlide === 0
              ? 'bg-white/10 text-white/50 cursor-not-allowed'
              : 'bg-white text-congo-blue hover:bg-white/90 shadow-lg'
          }`}
          whileHover={currentSlide !== 0 ? { scale: 1.05 } : {}}
          whileTap={currentSlide !== 0 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Précédent</span>
          <span className="sm:hidden">Préc</span>
        </motion.button>

        <div className="flex-1 mx-2 md:mx-12">
          <div className="flex items-center justify-center space-x-2 md:space-x-4 text-white">
            <span className="text-xs md:text-sm font-medium">
              {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>
            <div className="hidden sm:flex flex-1 max-w-md">
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>
            <span className="hidden sm:inline text-xs md:text-sm font-medium">{Math.round(progress)}%</span>
          </div>
        </div>

        <motion.button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${
            currentSlide === totalSlides - 1
              ? 'bg-white/10 text-white/50 cursor-not-allowed'
              : 'bg-white text-congo-blue hover:bg-white/90 shadow-lg'
          }`}
          whileHover={currentSlide !== totalSlides - 1 ? { scale: 1.05 } : {}}
          whileTap={currentSlide !== totalSlides - 1 ? { scale: 0.95 } : {}}
        >
          <span className="hidden sm:inline">Suivant</span>
          <span className="sm:hidden">Suiv</span>
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </motion.button>
      </div>
    </div>
  );
}