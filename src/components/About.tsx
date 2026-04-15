'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 lg:px-12 bg-transparent text-white relative flex flex-col items-center border-t border-white/5">
      <div className="max-w-4xl mx-auto z-10 w-full text-center">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
            <span className="text-accent tracking-[0.2em] text-[10px] md:text-sm font-bold uppercase">01 // The Approach</span>
          </div>

          <h2 className="text-3xl md:text-6xl leading-tight font-display tracking-tight mb-12 md:mb-16 text-white">
            Turning product questions into <span className="text-accent">measurable</span> outcomes.
            <br className="hidden md:block" />
            Combining <span className="text-white/60">product thinking</span> with deep analytical rigor.
          </h2>
          
          <div className="font-body text-base md:text-lg text-white/80 tracking-wide leading-relaxed max-w-3xl mx-auto">
            <p className="mb-6">
              Rishabh Rai operates at the intersection of product strategy and data analytics. He translates ambiguous product questions into structured experiments, actionable metrics, and growth frameworks &mdash; enabling teams to ship with confidence and iterate with clarity.
            </p>
            <p>
              His portfolio spans end-to-end product analytics &mdash; from defining KPIs and building dashboards to running A/B test analyses, user funnel diagnostics, and executive-level reporting that shapes roadmap priorities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
