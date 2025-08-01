import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

// Import screenshots
import screenshot1 from '../assets/Screenshot 2025-07-12 at 14.12.17.png';
import screenshot2 from '../assets/Screenshot 2025-07-12 at 14.12.36.png';
import screenshot3 from '../assets/Screenshot 2025-07-12 at 14.13.02.png';
import screenshot4 from '../assets/Screenshot 2025-07-12 at 14.13.52.png';
import screenshot5 from '../assets/Screenshot 2025-07-12 at 14.14.21.png';
import screenshot6 from '../assets/Screenshot 2025-07-12 at 14.17.24.png';
import screenshot7 from '../assets/Screenshot 2025-07-12 at 14.18.48.png';
import screenshot8 from '../assets/Screenshot 2025-07-12 at 14.19.36.png';
import screenshot9 from '../assets/Screenshot 2025-07-12 at 14.21.35.png';
import screenshot10 from '../assets/Screenshot 2025-07-12 at 14.22.03.png';
import screenshot11 from '../assets/Screenshot 2025-08-01 at 05.01.34.png';
import screenshot12 from '../assets/Screenshot 2025-08-01 at 05.02.22.png';

export function DemoSlide() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const screenshots = [
    {
      src: screenshot1,
      title: "Chronologie de Propagation",
      description: "Visualisation en temps réel de la propagation virale des fausses informations"
    },
    {
      src: screenshot2,
      title: "Sources de Désinformation",
      description: "Identification et analyse des sources diffusant des contenus manipulés"
    },
    {
      src: screenshot3,
      title: "Analyse Multi-Sources",
      description: "Dashboard d'analyse de propagation avec détection des tendances émergentes"
    },
    {
      src: screenshot4,
      title: "Centre d'Alertes",
      description: "Système d'alertes en temps réel pour les menaces critiques"
    },
    {
      src: screenshot5,
      title: "Actions de Contre-Attaque",
      description: "Interface de gestion des campagnes défensives automatisées"
    },
    {
      src: screenshot6,
      title: "Intelligence Géographique",
      description: "Cartographie avancée des zones d'impact et de propagation"
    },
    {
      src: screenshot8,
      title: "Analyses Avancées",
      description: "Métriques détaillées sur l'engagement et les sentiments"
    },
    {
      src: screenshot11,
      title: "Réseau de Propagation",
      description: "Visualisation interactive de la propagation des informations entre comptes et événements"
    },
    {
      src: screenshot12,
      title: "Centre de Commandement",
      description: "Analyse d'opinion en temps réel avec répartition par plateformes et régions"
    }
  ];

  const openFullscreen = (index: number) => {
    setSelectedImage(index);
    setCurrentImageIndex(index);
  };

  const closeFullscreen = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
    } else {
      setCurrentImageIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <section className="h-full flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            <span className="gradient-text font-bold">Interface SENTINEL</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Découvrez l'interface puissante qui permet de surveiller, analyser et neutraliser
            les menaces informationnelles en temps réel
          </p>
        </motion.div>

        {/* Screenshots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-full">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="relative group cursor-pointer"
              onClick={() => openFullscreen(index)}
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[16/10] shadow-xl">
                <img
                  src={screenshot.src}
                  alt={screenshot.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-semibold text-base mb-2">{screenshot.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">{screenshot.description}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fullscreen Viewer */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black flex items-center justify-center"
              onClick={closeFullscreen}
            >
              <button
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                onClick={closeFullscreen}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <div
                className="max-w-[90vw] max-h-[90vh] relative"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  src={screenshots[currentImageIndex].src}
                  alt={screenshots[currentImageIndex].title}
                  className="max-w-full max-h-[80vh] object-contain"
                />
                <div className="text-center mt-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    {screenshots[currentImageIndex].title}
                  </h3>
                  <p className="text-gray-300">
                    {screenshots[currentImageIndex].description}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {currentImageIndex + 1} / {screenshots.length}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}