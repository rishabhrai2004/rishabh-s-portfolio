'use client';

import { motion } from 'framer-motion';
import { Database, Code2, LineChart, Target, BarChart3, BriefcaseBusiness } from 'lucide-react';

const categories = [
  {
    title: 'PRODUCT & STRATEGY',
    icon: <Target className="w-8 h-8 text-accent" />,
    skills: ['Strategic Research & Analysis', 'Market Intelligence', 'Project Management', 'Stakeholder Communication']
  },
  {
    title: 'FOUNDERS OFFICE EXECUTION',
    icon: <BriefcaseBusiness className="w-8 h-8 text-accent" />,
    skills: ['Executive Reporting', 'Cross-functional Alignment', 'Decision Support', 'Strategic Planning']
  },
  {
    title: 'DATA ANALYSIS & MODELING',
    icon: <Code2 className="w-8 h-8 text-accent" />,
    skills: ['Data Analysis & Modeling', 'Python (Pandas)', 'SQL', 'Microsoft Excel']
  },
  {
    title: 'DASHBOARDS & VISUAL STORYTELLING',
    icon: <LineChart className="w-8 h-8 text-accent" />,
    skills: ['Power BI', 'Dashboard Development', 'Presentation Design', 'Business Narratives']
  },
  {
    title: 'METRICS & REPORTING',
    icon: <BarChart3 className="w-8 h-8 text-accent" />,
    skills: ['KPI Design', 'Operating Metrics', 'Performance Reviews', 'Executive Reporting']
  },
  {
    title: 'CORE TOOLKIT',
    icon: <Database className="w-8 h-8 text-accent" />,
    skills: ['Microsoft Excel', 'Python (Pandas)', 'SQL', 'Power BI']
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

        <p className="max-w-3xl text-white/60 text-sm md:text-base leading-relaxed mb-12 md:mb-16">
          Skill stack tailored for Product, Strategy, and Founder&apos;s Office roles: from strategic market analysis and executive communication to hands-on data modeling and dashboard-led decision systems.
        </p>

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
