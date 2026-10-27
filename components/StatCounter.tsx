"use client";

import { useEffect, useRef, useState } from "react";

export function StatCounter({
  value,
  suffix = "",
  label,
  grouping = true,
}: {
  value: number;
  suffix?: string;
  label: string;
  grouping?: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        if (reduce) {
          setDisplay(value);
          return;
        }
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / 1200, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="stat">
      <strong>
        {grouping ? display.toLocaleString("en-US") : display.toLocaleString("en-US", { useGrouping: false })}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}
