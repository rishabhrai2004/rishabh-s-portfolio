'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'INDIAN OIL CORPORATION (IOCL)',
    role: 'DATA ANALYTICS INTERN',
    meta: 'Digboi Refinery, Assam · Jun–Jul 2025',
    desc: 'Analysed operational datasets using SQL and Python (Pandas) to support 3 internal analytics tools — documenting requirements and conducting user research that improved reporting accuracy by 25% and reduced manual effort by 15 hours weekly. Built Power BI dashboards tracking operational KPIs, coordinated UAT with QA stakeholders, and joined sprint planning, stand-ups, and product reviews to drive data-driven iteration.'
  },
  {
    company: 'MKTEA',
    role: 'DATA & PRODUCT INTERN',
    meta: 'Doomdooma, Assam · B2B Tea FMCG · May–Jun 2025',
    desc: 'Analysed operational datasets covering 20,000+ entries and identified process bottlenecks that informed product requirement recommendations, driving 30% operational efficiency gains. Built Power BI dashboards tracking KPI and OKR metrics for leadership, and ran market and competitive analysis to prioritise backlog improvements across 4 departments.'
  },
  {
    company: 'KIIT ENTREPRENEURSHIP CELL',
    role: 'CHIEF MARKETING OFFICER',
    meta: '2024 – Present',
    desc: 'Lead campaign experimentation, growth strategy, and startup mentorship for a 10,000+ student ecosystem — mentoring 25+ early-stage startups, running A/B tests on digital campaigns and registration flows, and driving a 40% rise in event registrations across 12+ annual events.'
  },
  {
    company: 'KIIT INTERNATIONAL MUN',
    role: 'DEPUTY DIRECTOR — OPERATIONS & STRATEGY',
    meta: '2024 – 2025',
    desc: 'Directed end-to-end operations for one of Asia\'s largest MUN conferences — coordinating 200+ volunteers across 8 teams and delivering seamless execution for 1,500+ delegates from around the world over 3 days.'
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
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
                <h3 className="text-xl md:text-3xl font-display font-black uppercase tracking-tighter leading-none text-accent">
                  {exp.company}
                </h3>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-white/40 whitespace-nowrap">
                  {exp.meta}
                </span>
              </div>
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
