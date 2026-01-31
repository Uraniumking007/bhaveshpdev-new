import type { ReactNode } from 'react';

interface MotionWrapperProps {
  children: ReactNode;
  disabled?: boolean;
}

export function MotionWrapper({ children, disabled = false }: MotionWrapperProps) {
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  return (
    <>
      {disabled || prefersReduced ? (
        children
      ) : (
        <div className="motion-enabled">
          {children}
        </div>
      )}
    </>
  );
}
