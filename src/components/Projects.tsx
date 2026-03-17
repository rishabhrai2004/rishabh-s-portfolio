'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const analyticsProjects = [
  {
    id: 1,
    title: 'RETAIL ANALYTICS PIPELINE',
    description: 'Cloud-based retail analytics framework deploying Azure SQL to standardize cross-platform product datasets. Enables dynamic Power BI dashboards that surface actionable margin and pricing insights.',
    tools: ['Azure SQL', 'Power BI', 'DAX'],
    link: 'https://github.com/rishabhrai2004/rishabh-s-portfolio',
    type: 'Github'
  },
  {
    id: 2,
    title: 'AGRI-YIELD PREDICTION HUB',
    description: 'High-throughput agricultural analytics pipeline using Snowflake and AWS S3 to process environmental and telemetry datasets. Produces geospatial productivity insights and predictive crop yield metrics.',
    tools: ['AWS S3', 'Snowflake', 'SQL', 'Power BI'],
    link: 'https://github.com/rishabhrai2004/rishabh-s-portfolio',
    type: 'Github'
  }
];

const aiProjects = [
  {
    id: 3,
    title: 'CareerOS — AI Career Intelligence',
    description: 'AI-powered career intelligence platform built with LLM APIs to forecast job market demand, analyze skill gaps, and generate personalized learning and salary growth pathways.',
    tools: ['LLM APIs', 'AI Intelligence', 'Full Stack'],
    link: 'https://career-voyage-ai-12.lovable.app/',
    type: 'External'
  },
  {
    id: 4,
    title: 'AI Startup Idea Validator',
    description: 'AI platform that automates startup validation through market analysis, competitor benchmarking, and product-market fit evaluation using structured intelligence pipelines.',
    tools: ['LLMs', 'Market Analysis', 'Data Pipelines'],
    link: 'https://notion-insight-ai.lovable.app/',
    type: 'External'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-transparent text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-16 md:justify-end">
          <div className="h-px bg-white/10 flex-1 md:mr-8 hidden md:block" />
          <span className="text-accent tracking-[0.2em] text-xs md:text-sm font-bold uppercase">03 // Selected Works</span>
        </div>

        <div className="mb-10 border-b border-white/10 pb-4">
          <h3 className="text-xl md:text-2xl font-serif italic text-white/50">Data Analytics</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-24 md:mb-32">
          {analyticsProjects.map((p, idx) => (
            <ProjectCard key={p.id} project={p} idx={idx} />
          ))}
        </div>

        <div className="mb-10 border-b border-white/10 pb-4">
          <h3 className="text-xl md:text-2xl font-serif italic text-white/50">AI &amp; Product Engineering</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
          {aiProjects.map((p, idx) => (
            <ProjectCard key={p.id} project={p} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Project {
  id: number;
  title: string;
  description: string;
  tools: string[];
  link: string;
  type: string;
}

function ProjectCard({ project, idx }: { project: Project, idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-card p-6 md:p-10 lg:p-16 overflow-hidden flex flex-col justify-between min-h-[400px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start gap-4 mb-6 md:mb-10">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-black font-display uppercase tracking-tighter leading-tight text-white group-hover:text-accent transition-colors duration-500">
            {project.title}
          </h3>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-full bg-white/5 hover:bg-accent hover:text-black transition-all duration-300 group/link"
          >
            {project.type === 'Github' ? (
              <Github className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </a>
        </div>

        <p className="text-lg md:text-xl text-white/70 font-serif italic leading-relaxed mb-8">
          &quot;{project.description}&quot;
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
        {project.tools.map((tool: string) => (
          <span 
            key={tool} 
            className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1.5 rounded-full group-hover:border-accent/30 group-hover:text-white/60 transition-colors duration-500"
          >
            {tool}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
