interface ScrollIndicatorProps {
  currentSlide: number;
}

export function ScrollIndicator({ currentSlide }: ScrollIndicatorProps) {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
      <div className="bg-white dark:bg-gray-800 rounded-full px-3 py-2 shadow-lg border border-gray-200 dark:border-gray-700">
        <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}