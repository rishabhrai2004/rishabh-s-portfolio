'use client';

import { motion } from 'framer-motion';
import { Target, Search, FlaskConical, BarChart3, Sparkles, Workflow } from 'lucide-react';

const marqueeItems = [
  'Product Roadmap', 'PRDs', 'User Research', 'RICE', 'A/B Testing', 'Funnel Analysis',
  'KPI Design', 'GTM Strategy', 'SQL', 'Python', 'Power BI', 'Amplitude',
  'LLM APIs', 'Generative AI', 'JIRA', 'Notion',
];

const categories = [
  {
    title: 'PRODUCT STRATEGY',
    icon: <Target className="w-8 h-8 text-accent" />,
    skills: ['Product Roadmap', 'PRDs & User Stories', 'Feature Prioritization', 'GTM Strategy']
  },
  {
    title: 'DISCOVERY & RESEARCH',
    icon: <Search className="w-8 h-8 text-accent" />,
    skills: ['User Research', 'Problem Discovery', 'Competitive Analysis', 'Market Sizing']
  },
  {
    title: 'EXPERIMENTATION & METRICS',
    icon: <FlaskConical className="w-8 h-8 text-accent" />,
    skills: ['A/B Testing', 'Funnel Analysis', 'KPI Design', 'RICE Prioritization']
  },
  {
    title: 'ANALYTICS',
    icon: <BarChart3 className="w-8 h-8 text-accent" />,
    skills: ['SQL', 'Python (Pandas)', 'Power BI', 'Amplitude']
  },
  {
    title: 'AI & PROTOTYPING',
    icon: <Sparkles className="w-8 h-8 text-accent" />,
    skills: ['LLM APIs', 'Generative AI', 'Lovable', 'Claude Code']
  },
  {
    title: 'EXECUTION',
    icon: <Workflow className="w-8 h-8 text-accent" />,
    skills: ['Agile & Scrum', 'UAT', 'JIRA', 'Notion']
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
          A product toolkit spanning discovery to delivery: from user research, PRDs, and prioritization to experimentation, analytics, and AI-assisted prototyping that turns ideas into shippable, measurable product decisions.
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

      {/* Infinite tool marquee */}
      <div className="relative mt-20 md:mt-28 w-full overflow-hidden border-y border-white/5 py-6 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 pr-12">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-12 whitespace-nowrap font-display italic text-2xl md:text-4xl font-medium text-white/25"
            >
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
