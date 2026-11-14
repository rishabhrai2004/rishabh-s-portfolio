'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  context: string;
};

const stats: Stat[] = [
  {
    value: 5,
    suffix: ' Cr+',
    label: 'Payment narrations mapped & analyzed',
    context: 'Fineye · 67 Banks',
  },
  {
    value: 28,
    suffix: '%',
    prefix: '+',
    label: 'Categorisation accuracy improvement',
    context: 'Fineye Platform',
  },
  {
    value: 23,
    suffix: '%',
    prefix: '+',
    label: 'Data accuracy lift via API fallback',
    context: 'BeFiSc · KYC/KYB',
  },
  {
    value: 22,
    suffix: '%',
    prefix: '-',
    label: 'API cost reduction via caching',
    context: 'BeFiSc Platform',
  },
  {
    value: 816,
    suffix: ' Cr',
    prefix: '₹',
    label: 'Projected cross-sell GMV model',
    context: 'MakeMyTrip PRD',
  },
  {
    value: 30,
    suffix: '%',
    label: 'Operational efficiency gained',
    context: 'MKTea B2B FMCG',
  },
];

function CountUp({
  value,
  prefix = '',
  suffix,
  active,
}: {
  value: number;
  prefix?: string;
  suffix: string;
  active: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    const duration = 1500;
    const start = performance.now();

    let raf = 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <span className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative border-t border-white/5 bg-transparent py-20 md:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <span className="text-accent tracking-[0.25em] text-xs font-bold uppercase block mb-1">
              Quantitative Telemetry
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Validated Product Outcomes &middot; Measurable Lift
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-white/50 max-w-md">
            Every product decision is validated through quantitative metrics, economic modeling, and user telemetry.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glassmorph-box group relative flex flex-col justify-between p-5 sm:p-6 cursor-pointer"
            >
              <div className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-700 group-hover:w-full" />

              <div>
                <span className="text-[10px] uppercase tracking-wider text-accent/80 font-bold block mb-2">
                  {stat.context}
                </span>

                <span className="font-display text-3xl sm:text-4xl font-bold leading-none text-white group-hover:text-accent transition-colors block mb-2">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    active={inView}
                  />
                </span>
              </div>

              <span className="text-[11px] uppercase tracking-[0.14em] text-white/60 leading-snug">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
