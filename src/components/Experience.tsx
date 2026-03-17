'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'INDIAN OIL CORPORATION',
    role: 'DATA ANALYTICS INTERN',
    desc: 'Analyzed massive refinery operational datasets deploying Python/SQL stacks to establish automated Power BI telemetry reporting frameworks.'
  },
  {
    company: 'MKTEA',
    role: 'HR DATA INTERN',
    desc: 'Synthesized deeply-nested HR pipeline telemetry for over 20,000 employees. Delivered executive recruitment retention insights reducing overhead variance.'
  },
  {
    company: 'KIIT ENTREPRENEURSHIP CELL',
    role: 'DIRECTOR',
    desc: 'Directed marketing strategy for a 10,000+ member entrepreneurship ecosystem, building a centralized campaign framework that scaled event outreach, improved registration funnels, and introduced data-driven performance tracking across entrepreneurship initiatives.'
  },
  {
    company: 'KIIT INTERNATIONAL MODEL UNITED NATIONS',
    role: 'DEPUTY DIRECTOR',
    desc: 'Led operational planning for one of Asia’s largest Model United Nations conferences, coordinating cross-functional volunteer teams and implementing structured systems for seamless large-scale conference execution.'
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 bg-transparent text-white relative border-t border-white/5 flex flex-col items-center">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="flex items-center justify-center gap-4 mb-24">
          <span className="text-accent tracking-[0.2em] text-sm font-bold uppercase">04 // Professional Timeline</span>
        </div>

        <div className="space-y-16 max-w-4xl mx-auto">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-12 bg-white/5 border border-white/10 hover:border-accent/30 transition-colors duration-500 rounded-xl"
            >
              <h3 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter leading-none mb-4 text-accent">
                {exp.company}
              </h3>
              <h4 className="text-xl md:text-2xl font-body text-white/80 mb-8 border-b border-white/10 pb-8">
                {exp.role}
              </h4>
              <p className="text-lg text-white/60 leading-relaxed font-body">
                {exp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
