import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentSlideTitle: string;
}

export function Header({ currentSlideTitle }: HeaderProps) {
  return (
    <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-500">Slide Actuelle</p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentSlideTitle}</h2>
      </div>
      <ThemeToggle />
    </header>
  );
}