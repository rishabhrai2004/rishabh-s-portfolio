'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[100svh] min-h-[100svh] w-full bg-transparent overflow-hidden flex items-center justify-center">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[16%] left-[20%] w-[52vw] h-[52vw] bg-accent/10 blur-[190px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[16%] right-[14%] w-[34vw] h-[34vw] bg-white/10 blur-[150px] rounded-full pointer-events-none" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_68%_70%_at_50%_100%,#000_28%,transparent_100%)] opacity-20" />
      </div>

      {/* Massive Background Typography */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-x-0 bottom-[5vh] sm:bottom-[6vh] md:bottom-[9vh] flex items-center justify-center text-center z-10 pointer-events-none select-none w-full"
      >
        <h1
          className="font-display text-white/10 sm:text-white/12 md:text-white/10 text-[clamp(34px,9vw,150px)] leading-none text-center font-semibold tracking-[-0.03em] w-full"
          style={{
            textShadow: '0 10px 40px rgba(0,0,0,0.5)',
            WebkitTextStroke: '1px rgba(255,255,255,0.06)',
            maskImage: 'linear-gradient(to top, black 65%, transparent 100%)'
          }}
        >
          RISHABH RAI
        </h1>
      </motion.div>

      {/* Foreground Animated Accent Line */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center mix-blend-screen">
        <svg 
          viewBox="0 0 1000 400" 
          className="w-full max-w-7xl px-4 stroke-accent opacity-60 md:opacity-95 drop-shadow-[0_0_20px_var(--accent-muted)]"
          fill="none" 
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M 100,200 C 200,100 300,300 400,200 S 500,-50 600,250 C 700,500 800,100 900,150"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Hero Overlay Text */}
      <div 
        className="absolute left-5 sm:left-12 md:left-24 top-[56%] sm:top-[58%] md:top-[57%] -translate-y-1/2 z-50 max-w-[92vw] sm:max-w-xl"
      >
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 mb-4 sm:mb-5 border border-[color:var(--border)] rounded-full bg-black/35 backdrop-blur-md">
          <div className="w-6 md:w-8 h-px bg-accent" />
          <span className="text-accent tracking-[0.16em] sm:tracking-[0.24em] md:tracking-[0.3em] text-[10px] md:text-xs font-semibold uppercase">Product &amp; Data Analyst</span>
        </div>
        <h2 className="text-[clamp(1.9rem,8.7vw,4.4rem)] font-display italic font-medium leading-[0.96] sm:leading-[0.94] text-white mb-4 sm:mb-5 drop-shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
          Bridging product intuition with data-driven precision.
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-lg leading-relaxed mb-5 sm:mb-6 tracking-[0.01em] sm:tracking-[0.02em]">
          I design product decisions that are elegant in strategy and rigorous in evidence.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-accent text-black text-[11px] uppercase tracking-[0.22em] font-semibold shadow-[0_0_30px_var(--accent-muted)]"
          >
            Explore Work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-[color:var(--border)] text-white/85 text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.24em] font-semibold bg-black/30 backdrop-blur-sm hover:text-accent transition-colors"
          >
            Start a Conversation
          </a>
        </div>
      </div>
    </section>
  );
}
