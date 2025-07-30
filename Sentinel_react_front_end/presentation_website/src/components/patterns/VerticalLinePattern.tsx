export function VerticalLinePattern() {
  return (
    <div className="absolute inset-0 opacity-40 dark:opacity-30 pointer-events-none">
      {/* 6 Vertical dotted lines */}
      <div className="absolute inset-0 flex justify-between px-[8.33%]">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-px h-full"
            style={{
              backgroundImage: `linear-gradient(to bottom, transparent, #4b5563 10%, #4b5563 90%, transparent)`,
              backgroundSize: '1px 8px',
              backgroundRepeat: 'repeat-y',
              backgroundPosition: 'center',
              opacity: 0.6,
            }}
          />
        ))}
      </div>
    </div>
  );
}