'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 20, suffix: 'K+', label: 'Operational entries analyzed' },
  { value: 30, suffix: '%', label: 'Operational efficiency gained' },
  { value: 40, suffix: '%', label: 'Rise in event registrations' },
  { value: 10, suffix: 'K+', label: 'Student ecosystem led' },
];

function CountUp({ value, prefix = '', suffix, active }: { value: number; prefix?: string; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    const duration = 1600;
    const start = performance.now();

    let raf = 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo for a confident, settling count
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <span className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative border-t border-white/5 bg-transparent py-16 md:py-24">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/[0.015] backdrop-blur-xl">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col gap-3 p-7 md:p-10 transition-colors duration-500 hover:bg-white/[0.025]"
            >
              <div className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-700 group-hover:w-full" />
              <span className="font-display text-4xl md:text-6xl font-bold leading-none text-gradient">
                <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} active={inView} />
              </span>
              <span className="text-[11px] md:text-xs uppercase tracking-[0.16em] text-white/45 leading-relaxed max-w-[18ch]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
