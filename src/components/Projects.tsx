'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    title: 'SWIGGY VS ETERNAL',
    subtitle: 'Product Strategy Teardown & GTM',
    tag: 'Browse-Repeat Framework & District GTM',
    description:
      'Conducted competitive analysis and user research on Swiggy and Eternal’s app architecture, building the Browse-Repeat framework to map each vertical to the right surface by usage frequency and funnel behaviour. Recommended threading District ticketing into Zomato’s 100M+ user base using RICE prioritisation, projecting District user growth at low CAC by removing the install wall at peak intent, with success metrics and an A/B testing plan.',
    tools: ['User Research', 'RICE', 'Browse-Repeat Framework', 'A/B Testing', 'GTM Strategy'],
    link: 'https://drive.google.com/file/d/1S3vSbLIVDN3PNxiuweCpNhUjgekae3xy/view',
    type: 'External',
  },
  {
    id: 2,
    title: 'MAKEMYTRIP — AI TRAVEL SUITE',
    subtitle: 'Feature Discovery & PRD Spec',
    tag: '4-Feature Checkout Flow & Financial Model',
    description:
      'Wrote PRD specs, user flows, wireframes, and a phased V1/V2 roadmap for a 4-feature suite inside MMT’s checkout flow: eSIM Activation, AI Itinerary Engine, Crew Live Tracking, and SafeMode for Women. Modelled revenue growth from existing customers at zero acquisition cost: eSIM cross-sell projecting Rs 816 Cr GMV at a 15% attach rate, and women’s safety features lifting repeat bookings from 31% to 44%.',
    tools: ['PRD Development', 'Market Sizing', 'User Flows', 'Attach Rate Modeling', 'Revenue Growth'],
    link: 'https://drive.google.com/file/d/1oPOc4cUbxgDcY809_bjOIktKGgjAopLb/view',
    type: 'External',
  },
  {
    id: 3,
    title: 'CRAFT TEA',
    subtitle: 'AI-Assisted Premium Commerce',
    tag: 'Product Vision, Pricing & Prototyping',
    description:
      'Defined product vision, GTM strategy, and pricing architecture (₹299–₹4,999) for a premium consumer commerce brand. Rapidly prototyped and iterated using Claude Code and OpenAI Codex, grounded in user testing and structured experimentation.',
    tools: ['Product Vision', 'GTM Strategy', 'Pricing Architecture', 'Claude Code', 'Codex'],
    link: 'https://www.crafttea.page/',
    type: 'External',
  },
];

const builds = [
  {
    id: 4,
    title: 'AI STARTUP IDEA VALIDATOR',
    subtitle: 'AI Product · Live Application',
    tag: 'Automated PMF & Competitor Benchmarking',
    description:
      'Product validation engine that automates market sizing, competitor benchmarking, and product-market fit analysis. Structured to help founders make data-informed go/no-go decisions on new product bets.',
    tools: ['LLM APIs', 'Market Analysis', 'PMF Framework', 'Lovable'],
    link: 'https://notion-insight-ai.lovable.app/',
    type: 'External',
  },
  {
    id: 5,
    title: 'RETAIL PRODUCT ANALYTICS',
    subtitle: 'Product Telemetry & Margin Health',
    tag: 'Pricing Elasticity & Margin Telemetry',
    description:
      'End-to-end product analytics framework for retail — standardized cross-platform product datasets via Azure SQL and built Power BI dashboards that track pricing strategy impact, margin trends, and product performance KPIs.',
    tools: ['Azure SQL', 'Power BI', 'DAX', 'Product KPIs', 'Data Modeling'],
    link: 'https://github.com/rishabhrai2004/rishabh-s-portfolio',
    type: 'Github',
  },
  {
    id: 6,
    title: 'AGRI-YIELD PREDICTION HUB',
    subtitle: 'Predictive Telemetry & Geospatial Ops',
    tag: 'Cloud Telemetry Pipeline',
    description:
      'Product analytics pipeline for agricultural insights — processed environmental and telemetry datasets via Snowflake and AWS S3 to deliver geospatial productivity metrics and predictive yield forecasting for product decision-making.',
    tools: ['AWS S3', 'Snowflake', 'SQL', 'Predictive Modeling', 'Python'],
    link: 'https://github.com/rishabhrai2004/rishabh-s-portfolio',
    type: 'Github',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-transparent text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-16 md:justify-end">
          <div className="h-px bg-white/10 flex-1 md:mr-8 hidden md:block" />
          <span className="text-accent tracking-[0.2em] text-xs md:text-sm font-bold uppercase">
            02 // Product Strategy &middot; PRDs &middot; Builds
          </span>
        </div>

        {/* Section 1: PM Strategy & PRDs */}
        <div className="mb-10 border-b border-white/10 pb-4">
          <h3 className="text-xl md:text-3xl font-serif italic text-white/70">
            Product Management &amp; Strategy Teardowns
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-20 md:mb-28">
          {caseStudies.map((p, idx) => (
            <ProjectCard key={p.id} project={p} idx={idx} />
          ))}
        </div>

        {/* Section 2: AI & Analytics Builds */}
        <div className="mb-10 border-b border-white/10 pb-4">
          <h3 className="text-xl md:text-3xl font-serif italic text-white/70">
            Product &amp; AI Builds &middot; Analytics Telemetry
          </h3>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
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
  tag?: string;
  description: string;
  tools: string[];
  link: string;
  type: string;
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative glassmorph-box p-7 md:p-11 lg:p-12 overflow-hidden flex flex-col justify-between min-h-[340px] md:min-h-[420px] cursor-pointer"
    >
      {/* Growing top accent line */}
      <div className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-accent to-transparent transition-all duration-700 group-hover:w-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Oversized index numeral */}
      <span className="pointer-events-none absolute -top-2 right-4 md:right-8 font-display font-black text-[5rem] md:text-[8rem] leading-none text-white/[0.04] group-hover:text-accent/10 transition-colors duration-700 select-none">
        {String(project.id).padStart(2, '0')}
      </span>

      <div className="relative z-10">
        <div className="flex justify-between items-start gap-4 mb-6 md:mb-8">
          <div className="max-w-[85%]">
            {project.subtitle && (
              <p className="text-accent/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-2.5">
                {project.subtitle}
              </p>
            )}
            <h3 className="text-2xl md:text-3xl font-black font-display uppercase tracking-tight leading-tight text-white group-hover:text-accent transition-colors duration-400">
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

        <p className="text-base md:text-lg text-white/75 font-serif italic leading-relaxed mb-8">
          &quot;{project.description}&quot;
        </p>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tools.map((tool: string) => (
            <span
              key={tool}
              className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 border border-white/10 px-3 py-1.5 rounded-full group-hover:border-accent/40 group-hover:text-white/80 transition-colors duration-400"
            >
              {tool}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 group-hover:text-accent transition-colors duration-400">
          <span>{project.type === 'Github' ? 'View Source Code' : 'Read Full Strategy Spec'}</span>
          <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-12" />
        </div>
      </div>
    </motion.a>
  );
}
