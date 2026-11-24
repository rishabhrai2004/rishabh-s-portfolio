'use client';

import { motion } from 'framer-motion';

const pmPillars = [
  {
    num: '01',
    label: 'PRODUCT SENSE & DISCOVERY',
    title: 'Customer Empathy & Funnel Truth',
    desc: 'Uncovering root friction through user research, narration analysis, and competitive teardowns before defining product requirements.',
  },
  {
    num: '02',
    label: '0-TO-1 PRD ARCHITECTURE',
    title: 'PRDs & Execution Rigor',
    desc: 'Authoring rigorous PRDs, API fallback logic, and RICE-prioritized roadmaps. Aligning Engineering and QA to ship resilient features.',
  },
  {
    num: '03',
    label: 'GTM & MONETIZATION',
    title: 'Go-To-Market & Growth Loops',
    desc: 'Modeling zero-CAC cross-sells, retention attach rates, and A/B tested conversion flows that maximize customer Lifetime Value.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 lg:px-12 bg-transparent text-white relative flex flex-col items-center border-t border-white/5">
      <div className="max-w-6xl mx-auto z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-accent tracking-[0.25em] text-[11px] md:text-sm font-bold uppercase">
              01 // The PM Approach &middot; Product Sense &middot; GTM
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl leading-[1.05] font-display tracking-tight mb-8 text-white">
            Turning product intuition into <span className="text-accent italic">measurable</span> business outcomes.
          </h2>

          <div className="font-body text-base md:text-lg text-white/80 tracking-wide leading-relaxed max-w-3xl mx-auto mb-16">
            <p className="mb-4">
              Across fintech, I turn customer and data insights into clear product requirements and resilient workflows. My current work spans payment categorisation at <span className="text-white font-medium">Fineye</span> and KYC/KYB verification at <span className="text-white font-medium">BeFiSc</span>.
            </p>
            <p className="text-white/60 text-sm md:text-base">
              From PRDs, API fallback systems, and RICE-prioritized roadmaps to CAC optimization and GTM attach-rate modeling, every decision is tied directly to user adoption and sustainable revenue.
            </p>
          </div>
        </motion.div>

        {/* 3 Glassmorphic Pillars with Hover Pop */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pmPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="glassmorph-box p-6 sm:p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />

              <div>
                <div className="mb-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-accent font-display font-black text-2xl">
                    {pillar.num}
                  </span>
                  <span className="text-[9px] leading-relaxed uppercase tracking-[0.12em] text-white/50 font-bold sm:text-[10px] sm:tracking-[0.2em]">
                    {pillar.label}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-white/70 leading-relaxed font-body">
                  {pillar.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Education Box with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glassmorph-box p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 cursor-pointer"
        >
          <div className="text-center sm:text-left">
            <span className="text-accent uppercase tracking-[0.25em] text-[11px] font-bold block mb-1">
              Education &middot; 2023 &ndash; 2027
            </span>
            <h4 className="text-lg sm:text-xl font-display font-bold text-white">
              Kalinga Institute of Industrial Technology (KIIT University)
            </h4>
            <p className="text-sm text-white/70 mt-0.5">
              Bachelor of Technology &ndash; Electronics and Computer Science
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-white/70 text-xs font-mono uppercase tracking-widest shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>Class of 2027</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
