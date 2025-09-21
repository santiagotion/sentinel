import { Shield } from 'lucide-react';

interface SidebarProps {
  slides: string[];
  currentSlide: number;
  onNavigate: (slide: number) => void;
}

export function Sidebar({ slides, currentSlide, onNavigate }: SidebarProps) {
  return (
    <aside className="w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <Shield className="w-10 h-10 text-congo-blue" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">SENTINEL</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Présentation Gouvernementale</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {slides.map((name, index) => (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                currentSlide === index
                  ? 'bg-congo-blue text-white font-semibold shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-mono ${
                  currentSlide === index ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm">{name}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}