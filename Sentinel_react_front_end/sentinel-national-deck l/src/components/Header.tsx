import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentSlideTitle: string;
}

export function Header({ currentSlideTitle }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {currentSlideTitle}
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}