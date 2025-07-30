import type { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`}>
      {/* Square Pattern Overlay */}
      <div className="absolute inset-0 opacity-40 dark:opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%236b7280' stroke-width='1'%3E%3Crect x='0' y='0' width='40' height='40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}