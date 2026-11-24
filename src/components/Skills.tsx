'use client';

import { motion } from 'framer-motion';

const marqueeItems = [
  'Product Lifecycle Management',
  'GTM Strategy',
  'PRD Development',
  'User Stories',
  'Product Roadmap',
  'User Research',
  'Feature Prioritization',
  'A/B Testing',
  'Funnel Analysis',
  'KPI Design',
  'API Integration',
  'Customer Retention',
  'CAC Optimisation',
  'Revenue Growth',
  'Payment Categorisation',
  'Product Analytics',
  'SQL',
  'Python (Pandas)',
  'Power BI',
  'Amplitude',
  'Competitive Analysis',
  'Gap Analysis',
  'LLM APIs',
  'Generative AI',
  'Lovable',
  'Claude Code',
  'JIRA & Scrum',
  'Notion',
];

const categories = [
  {
    title: 'PRODUCT STRATEGY & LIFECYCLE',
    subtitle: 'From 0-to-1 spec to scalable roadmaps',
    skills: [
      'Product Lifecycle Management',
      'PRD Development & User Stories',
      'Product Roadmap Strategy',
      'Stakeholder Management',
      'Feature Prioritization (RICE)',
      'Agile & Scrum Sprints',
      'User Acceptance Testing (UAT)',
    ],
  },
  {
    title: 'PRODUCT SENSE & DISCOVERY',
    subtitle: 'User psychology, gaps & friction mapping',
    skills: [
      'User Research & Interviews',
      'Problem Discovery & Journey Mapping',
      'Competitive Analysis',
      'Gap Analysis',
      'Payment Categorisation Logic',
      'Customer Empathy Architecture',
    ],
  },
  {
    title: 'GTM STRATEGY & GROWTH',
    subtitle: 'Distribution, monetization & retention',
    skills: [
      'GTM Strategy Formulation',
      'CAC Optimisation',
      'Customer Retention Loops',
      'Revenue Growth Modeling',
      'A/B Testing & Split Experiments',
      'Funnel Drop-off Analysis',
      'North Star & KPI Design',
    ],
  },
  {
    title: 'ANALYTICS & EXPERIMENTATION',
    subtitle: 'Extracting product truth from telemetry',
    skills: [
      'Product Analytics',
      'SQL Query Optimization',
      'Python (Pandas Analytics)',
      'Power BI Dashboarding',
      'Amplitude Event Tracking',
      'API Integration & Logic Routing',
    ],
  },
  {
    title: 'AI PRODUCT WORKFLOWS',
    subtitle: 'Rapid functional discovery & prototyping',
    skills: [
      'LLM APIs Integration',
      'Generative AI Workflows',
      'Claude Code & OpenAI Codex',
      'Lovable Prototyping',
      'Prompt Architecture',
      'AI Fallback Logic',
    ],
  },
  {
    title: 'EXECUTION & PRODUCT OPS',
    subtitle: 'Cross-functional delivery & governance',
    skills: [
      'JIRA Sprint Management',
      'Notion Knowledge Hubs',
      'QA & UAT Coordination',
      'Cross-Team Engineering Alignment',
      'Vendor Cost Optimisation',
      'Operational Efficiency',
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-transparent text-white overflow-hidden relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 blur-[100px] md:blur-[250px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="text-accent tracking-[0.2em] text-xs md:text-sm font-bold uppercase">
            04 // PM Core Competencies &middot; Technical Stack
          </span>
          <div className="h-px bg-white/10 flex-1 ml-8" />
        </div>

        <p className="max-w-3xl text-white/70 text-base md:text-lg leading-relaxed mb-12 md:mb-16">
          A product toolkit engineered for discovery to GTM: from qualitative user research, PRD development, and RICE prioritization to SQL telemetry, API caching, and AI-assisted prototyping.
        </p>

        {/* 6 Glassmorph Cards That Pop on Hover */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glassmorph-box p-8 md:p-10 group relative overflow-hidden cursor-pointer flex flex-col justify-between"
            >
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent/15 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div>
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-accent/80 font-bold block mb-1">
                    Discipline 0{idx + 1}
                  </span>
                  <h3 className="text-xl md:text-2xl font-display italic font-bold tracking-tight text-white group-hover:text-accent transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-1 mb-6">
                    {cat.subtitle}
                  </p>
                </div>

                <ul className="space-y-3">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-white/70 font-body tracking-wide flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 group-hover:scale-125 transition-transform" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-accent transition-colors">
                Verified PM Application
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infinite Tool Marquee Strip */}
      <div className="relative mt-20 md:mt-28 w-full overflow-hidden border-y border-white/5 py-6 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 pr-12">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex items-center gap-12 whitespace-nowrap font-display italic text-xl md:text-3xl font-medium text-white/30 hover:text-white transition-colors"
            >
              <span>{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70 shadow-[0_0_8px_var(--accent)]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
