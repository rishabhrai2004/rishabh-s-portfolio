'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    title: 'SWIGGY VS ETERNAL',
    subtitle: 'Product Strategy Teardown',
    description: 'Competitive analysis and user research on Swiggy and Eternal’s app architecture, building a product framework that maps each vertical to the right surface by usage frequency and funnel behaviour. Recommended a RICE-prioritized roadmap to thread ticketing into the core app, with defined success metrics and an A/B testing plan to recover conversion at the point of highest user intent.',
    tools: ['User Research', 'RICE', 'Funnel Analysis', 'A/B Testing'],
    link: 'https://drive.google.com/file/d/1S3vSbLIVDN3PNxiuweCpNhUjgekae3xy/view',
    type: 'External'
  },
  {
    id: 2,
    title: 'MAKEMYTRIP — AI TRAVEL SUITE',
    subtitle: 'Feature Discovery & PRD',
    description: 'Problem discovery and PRD specs for a 4-feature suite inside MMT’s checkout flow — eSIM Activation, AI Itinerary Engine, Crew Live Tracking, and SafeMode for Women — with user flows, wireframes, and a phased V1/V2 roadmap. Built market-sizing and business-impact models projecting ₹816 Cr GMV for eSIM, 4.1x session uplift, and 74% women rebook loyalty improvement.',
    tools: ['PRD', 'Market Sizing', 'User Flows', 'Roadmapping'],
    link: 'https://drive.google.com/file/d/1oPOc4cUbxgDcY809_bjOIktKGgjAopLb/view',
    type: 'External'
  },
  {
    id: 3,
    title: 'CRAFT TEA',
    subtitle: 'AI-Assisted Premium Commerce',
    description: 'Defined product vision, GTM strategy, and pricing architecture (₹299–₹4,999) for a premium consumer commerce brand. Rapidly prototyped and iterated using Claude Code and OpenAI Codex, grounded in user testing and structured experimentation.',
    tools: ['Product Vision', 'GTM Strategy', 'Pricing', 'Prototyping'],
    link: 'https://www.crafttea.page/',
    type: 'External'
  }
];

const builds = [
  {
    id: 4,
    title: 'CareerOS — AI Product Intelligence',
    subtitle: 'AI Product · Live App',
    description: 'Product-driven career intelligence platform — uses LLM APIs to forecast market demand, surface skill-gap opportunities, and generate personalized growth pathways. Designed with a product-first approach focused on user retention and engagement metrics.',
    tools: ['LLM APIs', 'Product Strategy', 'User Metrics', 'Full Stack'],
    link: 'https://career-voyage-ai-12.lovable.app/',
    type: 'External'
  },
  {
    id: 5,
    title: 'AI Startup Idea Validator',
    subtitle: 'AI Product · Live App',
    description: 'Product validation engine that automates market sizing, competitor benchmarking, and product-market fit analysis. Structured to help founders make data-informed go/no-go decisions on new product bets.',
    tools: ['LLMs', 'Market Analysis', 'PMF Framework', 'Data Pipelines'],
    link: 'https://notion-insight-ai.lovable.app/',
    type: 'External'
  },
  {
    id: 6,
    title: 'RETAIL PRODUCT ANALYTICS',
    subtitle: 'Analytics',
    description: 'End-to-end product analytics framework for retail — standardized cross-platform product datasets via Azure SQL and built Power BI dashboards that track pricing strategy impact, margin trends, and product performance KPIs.',
    tools: ['Azure SQL', 'Power BI', 'DAX', 'Product KPIs'],
    link: 'https://github.com/rishabhrai2004/rishabh-s-portfolio',
    type: 'Github'
  },
  {
    id: 7,
    title: 'AGRI-YIELD PREDICTION HUB',
    subtitle: 'Analytics',
    description: 'Product analytics pipeline for agricultural insights — processed environmental and telemetry datasets via Snowflake and AWS S3 to deliver geospatial productivity metrics and predictive yield forecasting for product decision-making.',
    tools: ['AWS S3', 'Snowflake', 'SQL', 'Predictive Analytics'],
    link: 'https://github.com/rishabhrai2004/rishabh-s-portfolio',
    type: 'Github'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-transparent text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-16 md:justify-end">
          <div className="h-px bg-white/10 flex-1 md:mr-8 hidden md:block" />
          <span className="text-accent tracking-[0.2em] text-xs md:text-sm font-bold uppercase">03 // Selected Case Studies</span>
        </div>

        <div className="mb-10 border-b border-white/10 pb-4">
          <h3 className="text-xl md:text-2xl font-serif italic text-white/50">Product Management &amp; Strategy</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 mb-24 md:mb-32">
          {caseStudies.map((p, idx) => (
            <ProjectCard key={p.id} project={p} idx={idx} />
          ))}
        </div>

        <div className="mb-10 border-b border-white/10 pb-4">
          <h3 className="text-xl md:text-2xl font-serif italic text-white/50">Product &amp; AI Builds</h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
          {builds.map((p, idx) => (
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
  subtitle?: string;
  description: string;
  tools: string[];
  link: string;
  type: string;
}

function ProjectCard({ project, idx }: { project: Project, idx: number }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.98, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glass-card p-6 md:p-10 lg:p-14 overflow-hidden flex flex-col justify-between min-h-[300px] md:min-h-[400px] hover:-translate-y-1.5 hover:border-white/10 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
    >
      {/* Growing top accent line */}
      <div className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-accent to-transparent transition-all duration-700 group-hover:w-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Oversized index numeral */}
      <span className="pointer-events-none absolute -top-2 right-4 md:right-8 font-display font-black text-[5rem] md:text-[8rem] leading-none text-white/[0.04] group-hover:text-accent/10 transition-colors duration-700 select-none">
        {String(project.id).padStart(2, '0')}
      </span>

      <div className="relative z-10">
        <div className="flex justify-between items-start gap-4 mb-6 md:mb-10">
          <div className="max-w-[80%]">
            {project.subtitle && (
              <p className="text-accent/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-3">
                {project.subtitle}
              </p>
            )}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black font-display uppercase tracking-tighter leading-tight text-white group-hover:text-accent transition-colors duration-500">
              {project.title}
            </h3>
          </div>
          <span className="shrink-0 p-3 rounded-full bg-white/5 text-white/80 group-hover:bg-accent group-hover:text-black transition-all duration-300">
            {project.type === 'Github' ? (
              <Github className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </span>
        </div>

        <p className="text-lg md:text-xl text-white/70 font-serif italic leading-relaxed mb-8">
          &quot;{project.description}&quot;
        </p>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tools.map((tool: string) => (
            <span
              key={tool}
              className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40 border border-white/10 px-3 py-1.5 rounded-full group-hover:border-accent/30 group-hover:text-white/60 transition-colors duration-500"
            >
              {tool}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-accent transition-colors duration-500">
          <span>{project.type === 'Github' ? 'View Repository' : 'View Project'}</span>
          <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10" />
        </div>
      </div>
    </motion.a>
  );
}
