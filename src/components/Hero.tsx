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
    <section ref={containerRef} className="relative h-[120vh] w-full bg-transparent overflow-hidden flex items-center justify-center">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-[#C6FF00]/5 blur-[200px] rounded-full pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-[#1F2937]/30 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_100%,#000_20%,transparent_100%)] opacity-30" />
      </div>

      {/* Massive Background Typography */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 pointer-events-none select-none w-full"
      >
        <h1 className="font-display text-white/5 text-[80px] md:text-[140px] leading-[0.9] whitespace-nowrap text-center font-bold tracking-tighter w-full overflow-hidden">
          RISHABH RAI
        </h1>
        <h1 className="font-display text-white/5 text-[80px] md:text-[140px] leading-[0.9] whitespace-nowrap text-center font-bold tracking-tighter w-full overflow-hidden ml-[5vw]">
          REDEFINING DATA
        </h1>
        <h1 className="font-display text-white/5 text-[80px] md:text-[140px] leading-[0.9] whitespace-nowrap text-center font-bold tracking-tighter w-full overflow-hidden -ml-[5vw]">
          DRIVEN DECISIONS
        </h1>
      </motion.div>



      {/* Foreground Animated F1-Style Neon Signature / Accent Line */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center mix-blend-screen">
        <svg 
          viewBox="0 0 1000 400" 
          className="w-full max-w-7xl px-4 stroke-accent drop-shadow-[0_0_15px_rgba(198,255,0,0.6)]"
          fill="none" 
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M 100,200 C 200,100 300,300 400,200 S 500,-50 600,250 C 700,500 800,100 900,150"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Hero Overlay Text */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute bottom-16 md:bottom-24 left-8 md:left-24 z-40 max-w-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-0.5 bg-accent" />
          <span className="text-accent tracking-[0.3em] text-xs font-bold uppercase">Analytics Engineer</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display italic font-medium leading-tight text-white mb-6">
          Architecting data flows that define the modern business tier.
        </h2>
      </motion.div>
    </section>
  );
}
