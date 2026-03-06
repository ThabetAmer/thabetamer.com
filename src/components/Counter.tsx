import { useEffect, useRef } from 'react';

interface Props {
  value: string;
  label: string;
}

export default function Counter({ value, label }: Props) {
  const numericValue = parseInt(value);
  const hasPlusSign = value.endsWith('+');
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    let rafId: number;
    let current = 0;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    function update() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(numericValue * easeOut);

      element.textContent = current.toString();

      if (progress < 1) {
        rafId = requestAnimationFrame(update);
      } else {
        element.textContent = numericValue.toString();
      }
    }

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [numericValue]);

  return (
    <div className="counter-item text-center md:text-left">
      <div className="counter-value text-3xl md:text-4xl font-bold text-foreground mb-2">
        <span className="counter-number" ref={counterRef}>
          0
        </span>
        {hasPlusSign ? '+' : ''}
      </div>
      <p className="text-sm md:text-base text-muted-foreground">{label}</p>
    </div>
  );
}
