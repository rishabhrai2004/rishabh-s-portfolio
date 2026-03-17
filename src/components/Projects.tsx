'use client';

import { motion } from 'framer-motion';

import { ExternalLink } from 'lucide-react';

const analyticsProjects = [
  {
    id: 1,
    title: 'RETAIL ANALYTICS PIPELINE',
    description: 'Cloud-based retail analytics framework deploying Azure SQL to standardize cross-platform product datasets. Enables dynamic Power BI dashboards that surface actionable margin and pricing insights.',
    tools: ['Azure SQL', 'Power BI', 'DAX']
  },
  {
    id: 2,
    title: 'AGRI-YIELD PREDICTION HUB',
    description: 'High-throughput agricultural analytics pipeline using Snowflake and AWS S3 to process environmental and telemetry datasets. Produces geospatial productivity insights and predictive crop yield metrics.',
    tools: ['AWS S3', 'Snowflake', 'SQL', 'Power BI']
  }
];

const aiProjects = [
  {
    id: 3,
    title: 'CareerOS — AI Career Intelligence',
    description: 'AI-powered career intelligence platform built with LLM APIs to forecast job market demand, analyze skill gaps, and generate personalized learning and salary growth pathways.',
    tools: ['LLM APIs', 'AI Intelligence', 'Full Stack'],
    link: 'https://career-voyage-ai-12.lovable.app/'
  },
  {
    id: 4,
    title: 'AI Startup Idea Validator',
    description: 'AI platform that automates startup validation through market analysis, competitor benchmarking, and product-market fit evaluation using structured intelligence pipelines.',
    tools: ['LLMs', 'Market Analysis', 'Data Pipelines'],
    link: 'https://notion-insight-ai.lovable.app/'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 bg-transparent text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex items-center gap-4 mb-16 justify-end">
          <div className="h-px bg-white/10 flex-1 mr-8" />
          <span className="text-accent tracking-[0.2em] text-sm font-bold uppercase">03 // Selected Works</span>
        </div>

        <div className="mb-12 border-b border-white/10 pb-6">
          <h3 className="text-2xl font-serif italic text-white/50">Data Analytics</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          {analyticsProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#1F2937]/20 border border-white/5 p-12 lg:p-24 overflow-hidden backdrop-blur-xl hover:bg-[#1F2937]/40 transition-colors duration-700 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
              
              <div className="relative z-10 grid gap-8 h-full content-between">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tighter leading-[0.9] mb-8 text-white group-hover:text-accent transition-colors duration-500">
                    {p.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-8">
                    {p.tools.map(tool => (
                      <span key={tool} className="text-xs font-bold uppercase tracking-widest text-white/50 border border-white/10 px-4 py-2 rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xl md:text-2xl text-white/60 font-serif italic leading-relaxed h-full">
                    &quot;{p.description}&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-12 border-b border-white/10 pb-6">
          <h3 className="text-2xl font-serif italic text-white/50">AI &amp; Product Engineering</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {aiProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.98, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#1F2937]/20 border border-white/5 p-12 lg:p-24 overflow-hidden backdrop-blur-xl hover:bg-[#1F2937]/40 transition-colors duration-700 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
              
              <div className="relative z-10 grid gap-8 h-full content-between">
                <div>
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 group/link">
                      <h3 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tighter leading-[0.9] text-white group-hover:text-accent transition-colors duration-500">
                        {p.title}
                      </h3>
                      <ExternalLink className="w-8 h-8 text-white/30 group-hover:text-accent group-hover/link:scale-110 transition-all duration-300" />
                    </a>
                  ) : (
                    <h3 className="text-3xl md:text-4xl font-black font-display uppercase tracking-tighter leading-[0.9] text-white group-hover:text-accent transition-colors duration-500">
                      {p.title}
                    </h3>
                  )}
                  <div className="flex flex-wrap gap-3 mt-8">
                    {p.tools.map(tool => (
                      <span key={tool} className="text-xs font-bold uppercase tracking-widest text-white/50 border border-white/10 px-4 py-2 rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xl md:text-2xl text-white/60 font-serif italic leading-relaxed h-full">
                    &quot;{p.description}&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
