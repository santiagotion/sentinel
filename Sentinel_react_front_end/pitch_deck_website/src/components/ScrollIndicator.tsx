import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  currentSlide?: number;
}

export function ScrollIndicator({ currentSlide }: ScrollIndicatorProps) {
  const [showIndicator, setShowIndicator] = useState(false);

  const handleScrollDown = () => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;
    
    const currentScroll = mainElement.scrollTop;
    const scrollAmount = mainElement.clientHeight * 0.5; // Scroll 50% of viewport height
    
    mainElement.scrollTo({
      top: currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = mainElement;
      const hasMoreContent = scrollHeight - scrollTop - clientHeight > 10;
      setShowIndicator(hasMoreContent);
    };

    // Check initially
    checkScroll();

    // Check on scroll
    mainElement.addEventListener('scroll', checkScroll);
    // Check on resize
    window.addEventListener('resize', checkScroll);

    return () => {
      mainElement.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [currentSlide]);

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.button
            onClick={handleScrollDown}
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll down"
          >
            <ChevronDown className="w-6 h-6 text-congo-blue" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}