'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const analyticsProjects = [
  {
    id: 1,
    title: 'RETAIL PRODUCT ANALYTICS',
    description: 'End-to-end product analytics framework for retail — standardized cross-platform product datasets via Azure SQL and built Power BI dashboards that track pricing strategy impact, margin trends, and product performance KPIs.',
    tools: ['Azure SQL', 'Power BI', 'DAX', 'Product KPIs'],
    link: 'https://github.com/rishabhrai2004/rishabh-s-portfolio',
    type: 'Github'
  },
  {
    id: 2,
    title: 'AGRI-YIELD PREDICTION HUB',
    description: 'Product analytics pipeline for agricultural insights — processed environmental and telemetry datasets via Snowflake and AWS S3 to deliver geospatial productivity metrics and predictive yield forecasting for product decision-making.',
    tools: ['AWS S3', 'Snowflake', 'SQL', 'Predictive Analytics'],
    link: 'https://github.com/rishabhrai2004/rishabh-s-portfolio',
    type: 'Github'
  }
];

const aiProjects = [
  {
    id: 3,
    title: 'CareerOS — AI Product Intelligence',
    description: 'Product-driven career intelligence platform — uses LLM APIs to forecast market demand, surface skill-gap opportunities, and generate personalized growth pathways. Designed with a product-first approach focused on user retention and engagement metrics.',
    tools: ['LLM APIs', 'Product Strategy', 'User Metrics', 'Full Stack'],
    link: 'https://career-voyage-ai-12.lovable.app/',
    type: 'External'
  },
  {
    id: 4,
    title: 'AI Startup Idea Validator',
    description: 'Product validation engine that automates market sizing, competitor benchmarking, and product-market fit analysis. Structured to help founders make data-informed go/no-go decisions on new product bets.',
    tools: ['LLMs', 'Market Analysis', 'PMF Framework', 'Data Pipelines'],
    link: 'https://notion-insight-ai.lovable.app/',
    type: 'External'
  },
  {
    id: 5,
    title: 'Craft Tea - Premium D2C Commerce',
    description: 'Built a premium tea brand system around ritual, storytelling, and trust, leading end-to-end positioning, pricing architecture, product experience, and conversion strategy. Designed a conversion-led commerce journey with a INR 299-INR 4,999 pricing funnel, using pricing psychology and trust-first UX to shape perceived value before purchase.',
    tools: ['Brand Positioning', 'Pricing Strategy', 'Conversion UX', 'D2C Commerce'],
    link: 'https://www.crafttea.page/',
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
          <h3 className="text-xl md:text-2xl font-serif italic text-white/50">Product & Data Analytics</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-24 md:mb-32">
          {analyticsProjects.map((p, idx) => (
            <ProjectCard key={p.id} project={p} idx={idx} />
          ))}
        </div>

        <div className="mb-10 border-b border-white/10 pb-4">
          <h3 className="text-xl md:text-2xl font-serif italic text-white/50">Product Strategy &amp; AI</h3>
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
