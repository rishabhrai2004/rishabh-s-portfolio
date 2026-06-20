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
            Turning user research into <span className="text-accent">measurable</span> product outcomes.
            <br className="hidden md:block" />
            Pairing <span className="text-white/60">product thinking</span> with analytical rigor.
          </h2>

          <div className="font-body text-base md:text-lg text-white/80 tracking-wide leading-relaxed max-w-3xl mx-auto">
            <p className="mb-6">
              Rishabh Rai is a Product Management candidate at KIIT University, with experience across product discovery, user research, and analytics-led decision making through internships and AI product projects. He builds and validates AI-enabled workflows using LLM APIs and rapid prototyping tools.
            </p>
            <p>
              From PRDs and RICE-prioritized roadmaps to A/B test plans, funnel analysis, and dashboards, he ships product decisions designed for measurable user and business impact.
            </p>
          </div>

          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm">
            <span className="text-white/40 uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold">Education</span>
            <div className="hidden sm:block w-px h-8 bg-white/10" />
            <div className="text-center sm:text-left">
              <p className="text-white/90 font-medium">B.Tech, Electronics &amp; Computer Science</p>
              <p className="text-white/50 text-xs md:text-sm">Kalinga Institute of Industrial Technology (KIIT University) &middot; 2023&ndash;2027</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
