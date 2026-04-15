'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'INDIAN OIL CORPORATION',
    role: 'PRODUCT & DATA ANALYTICS INTERN',
    desc: 'Analyzed refinery operational datasets using Python and SQL to identify process bottlenecks and optimization opportunities. Built automated Power BI dashboards tracking key operational KPIs, enabling data-backed product and process improvement decisions.'
  },
  {
    company: 'MKTEA',
    role: 'HR ANALYTICS INTERN',
    desc: 'Synthesized workforce data for 20,000+ employees to surface recruitment funnel inefficiencies and retention patterns. Delivered executive-level insights that informed product-level changes in the HR pipeline, reducing overhead variance.'
  },
  {
    company: 'KIIT ENTREPRENEURSHIP CELL',
    role: 'DIRECTOR — GROWTH & ANALYTICS',
    desc: 'Led growth strategy for a 10,000+ member ecosystem. Built a data-driven campaign framework that optimized registration funnels, tracked user engagement metrics across events, and introduced A/B-tested outreach strategies that scaled participation by 35%.'
  },
  {
    company: 'KIIT INTERNATIONAL MODEL UNITED NATIONS',
    role: 'DEPUTY DIRECTOR',
    desc: 'Led operational planning for one of Asia\'s largest MUN conferences. Implemented structured cross-functional coordination systems, defined success metrics for event operations, and drove process improvements for large-scale execution.'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-transparent text-white relative border-t border-white/5 flex flex-col items-center">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="flex items-center justify-center gap-4 mb-16 md:mb-24">
          <span className="text-accent tracking-[0.2em] text-[10px] md:text-sm font-bold uppercase">04 // Professional Timeline</span>
        </div>

        <div className="space-y-8 md:space-y-12 max-w-4xl mx-auto">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group glass-card p-8 md:p-12"
            >
              <h3 className="text-xl md:text-3xl font-display font-black uppercase tracking-tighter leading-none mb-4 text-accent">
                {exp.company}
              </h3>
              <h4 className="text-lg md:text-2xl font-body text-white mb-6 md:mb-8 border-b border-white/10 pb-6 md:pb-8">
                {exp.role}
              </h4>
              <p className="text-base md:text-lg text-white/80 leading-relaxed font-body italic">
                {exp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
