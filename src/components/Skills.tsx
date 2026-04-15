'use client';

import { motion } from 'framer-motion';
import { Database, Code2, LineChart, Cloud, Target, BarChart3 } from 'lucide-react';

const categories = [
  {
    title: 'PRODUCT ANALYTICS',
    icon: <Target className="w-8 h-8 text-accent" />,
    skills: ['A/B Testing', 'Funnel Analysis', 'KPI Frameworks', 'PRDs & Specs']
  },
  {
    title: 'DATA & PROGRAMMING',
    icon: <Code2 className="w-8 h-8 text-accent" />,
    skills: ['Python', 'SQL', 'Pandas', 'NumPy']
  },
  {
    title: 'VISUALIZATION',
    icon: <LineChart className="w-8 h-8 text-accent" />,
    skills: ['Power BI', 'Mixpanel', 'Amplitude', 'Dashboard Design']
  },
  {
    title: 'METRICS & REPORTING',
    icon: <BarChart3 className="w-8 h-8 text-accent" />,
    skills: ['Cohort Analysis', 'Retention Metrics', 'Growth Modeling', 'Executive Reporting']
  },
  {
    title: 'CLOUD & INFRA',
    icon: <Cloud className="w-8 h-8 text-accent" />,
    skills: ['AWS S3', 'Snowflake', 'Azure SQL']
  },
  {
    title: 'STRATEGY & TOOLS',
    icon: <Database className="w-8 h-8 text-accent" />,
    skills: ['Jira', 'Notion', 'Figma', 'Competitive Analysis']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-transparent text-white overflow-hidden relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 blur-[250px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex items-center gap-4 mb-16 md:mb-24">
          <span className="text-accent tracking-[0.2em] text-xs md:text-sm font-bold uppercase">02 // Core Competencies</span>
          <div className="h-px bg-white/10 flex-1 ml-8" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative glass-card p-8 md:p-10"
            >
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="mb-10 inline-flex p-4 bg-white/5 rounded-xl border border-white/5 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {cat.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-display italic font-bold mb-6 tracking-tight text-white/90">
                {cat.title}
              </h3>

              <ul className="space-y-4">
                {cat.skills.map((skill) => (
                  <li key={skill} className="text-sm md:text-base text-white/50 font-body tracking-wide flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
