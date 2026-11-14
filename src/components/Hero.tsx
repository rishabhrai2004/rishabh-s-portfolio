'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const heroMetrics = [
  {
    num: '5 Cr+',
    label: 'Payment Narrations',
    sub: 'Fineye · +28% Categorisation',
  },
  {
    num: '+23%',
    label: 'Data Accuracy Lift',
    sub: 'BeFiSc · API Fallback',
  },
  {
    num: '-22%',
    label: 'API Cost Reduced',
    sub: 'BeFiSc · Caching Optimisation',
  },
  {
    num: '₹816 Cr',
    label: 'Projected GMV Model',
    sub: 'MMT · 15% Attach Rate',
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full bg-transparent overflow-hidden flex flex-col justify-between pt-24 pb-12 sm:pb-16"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[16%] left-[20%] w-[52vw] h-[52vw] bg-accent/10 blur-[190px] rounded-full" />
        <div className="absolute bottom-[16%] right-[14%] w-[34vw] h-[34vw] bg-white/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_68%_70%_at_50%_100%,#000_28%,transparent_100%)] opacity-20" />
      </div>

      {/* Massive Background Typography */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-x-0 bottom-[14vh] sm:bottom-[16vh] md:bottom-[20vh] flex items-center justify-center text-center z-10 pointer-events-none select-none w-full"
      >
        <h1
          className="font-display text-white/10 sm:text-white/12 md:text-white/10 text-[clamp(40px,10vw,160px)] leading-none text-center font-semibold tracking-[-0.03em] w-full"
          style={{
            textShadow: '0 10px 40px rgba(0,0,0,0.5)',
            WebkitTextStroke: '1px rgba(255,255,255,0.06)',
            maskImage: 'linear-gradient(to top, black 65%, transparent 100%)',
          }}
        >
          RISHABH RAI
        </h1>
      </motion.div>

      {/* Foreground Animated Accent Line */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center mix-blend-screen">
        <svg
          viewBox="0 0 1000 400"
          className="w-full max-w-7xl px-4 stroke-accent opacity-60 md:opacity-90 drop-shadow-[0_0_20px_var(--accent-muted)]"
          fill="none"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M 100,200 C 200,100 300,300 400,200 S 500,-50 600,250 C 700,500 800,100 900,150"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }}
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-30 my-auto pt-12 sm:pt-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 mb-5 border border-white/10 rounded-full bg-black/40 backdrop-blur-xl shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-accent tracking-[0.2em] sm:tracking-[0.28em] text-[10px] md:text-xs font-semibold uppercase">
              Product Management &middot; Product Sense &middot; GTM
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-[clamp(2.1rem,6.8vw,4.8rem)] font-display italic font-medium leading-[0.98] sm:leading-[0.94] text-white mb-5 drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            Bridging product intuition with data-driven precision.
          </h2>

          {/* User's Exact Summary */}
          <p className="text-sm sm:text-base text-white/80 max-w-xl leading-relaxed mb-8 tracking-[0.01em]">
            Product enthusiast working on payment categorisation at <span className="text-accent font-medium">Fineye</span> and KYC/KYB verification at <span className="text-white font-semibold">BeFiSc</span>, with experience in product discovery, user research, and analytics-led decision making. Built AI-enabled workflows using LLM APIs.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5">
            <a
              href="#projects"
              className="btn-shine group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-black text-[11px] uppercase tracking-[0.22em] font-bold shadow-[0_0_30px_var(--accent-muted)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-[2]">Explore Strategy Teardowns</span>
              <ArrowUpRight className="relative z-[2] w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#experience"
              className="px-7 py-3.5 rounded-full border border-white/10 text-white/85 text-[11px] uppercase tracking-[0.2em] font-semibold bg-white/[0.03] backdrop-blur-md hover:text-accent hover:border-accent/40 transition-colors"
            >
              PM Work Experience
            </a>
          </div>
        </div>
      </div>

      {/* Glassmorphic Metrics Ribbon That Pops on Hover */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full z-30 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {heroMetrics.map((metric) => (
            <div
              key={metric.label}
              className="glassmorph-box p-4 sm:p-5 flex flex-col justify-between group cursor-pointer"
            >
              <span className="font-display text-2xl sm:text-3xl font-bold leading-none text-white group-hover:text-accent transition-colors">
                {metric.num}
              </span>
              <div className="mt-2">
                <p className="text-xs sm:text-sm font-medium text-white/90">
                  {metric.label}
                </p>
                <p className="text-[10px] sm:text-[11px] text-white/50 tracking-wide mt-0.5">
                  {metric.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
