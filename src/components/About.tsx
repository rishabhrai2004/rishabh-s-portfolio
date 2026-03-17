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
            Turning raw datasets into <span className="text-accent">meaningful</span> business intelligence.
            <br className="hidden md:block" />
            Building <span className="text-white/60">analytics pipelines</span> that power data-driven organizations.
          </h2>
          
          <div className="font-body text-base md:text-lg text-white/80 tracking-wide leading-relaxed max-w-3xl mx-auto">
            <p className="mb-6">
              Rishabh Rai is a native data architect focusing on modern business intelligence layer deployment. At the intersection of deep analytical theory and robust data engineering, he standardizes enterprise data integration.
            </p>
            <p>
              His current portfolio highlights significant performance throughput on predictive modelling, cloud-storage optimization, and executive-level Power BI reporting frameworks.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
