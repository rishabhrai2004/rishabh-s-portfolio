'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'FINEYE',
    role: 'PRODUCT INTERN',
    meta: 'October 2026 – Present · Payment Categorisation & Bank Statement Analysis',
    domain: 'Financial Data Intelligence Platform',
    desc: 'Analysed bank narration patterns across 5 crore payment narrations from 67 banks and mapped transaction categories and subcategories, improving transaction categorisation by 28%. Conducted product benchmarking, competitor analysis, and gap analysis to identify classification mismatches and improvement opportunities in banking data processing. Collaborated directly with Engineering and QA on categorisation logic, validation testing, and continuous taxonomy refinement.',
    skills: ['Payment Categorisation', 'Bank Statement Analysis', 'Gap Analysis', 'Benchmarking', 'Taxonomy Refinement', 'QA & UAT'],
  },
  {
    company: 'BEFISC',
    role: 'PRODUCT INTERN',
    meta: 'August 2026 – Present · Noida, India',
    domain: 'Fintech & RegTech · KYC / KYB Verification Platform',
    desc: 'Defined business logic and product requirements for a multi-provider API fallback system, collaborating with engineering to route requests during low-confidence scenarios, improving data accuracy by 23%. Identified vendor cost inefficiencies and prioritised an API optimisation initiative, implementing caching strategies that reduced API costs by 22% without impacting data freshness. Led the 0-to-1 product lifecycle, including PRD development, for a merchant risk and KYB verification report, consolidating GST, credit health, and cross-entity ownership checks into an automated underwriting flow.',
    skills: ['0-to-1 PRD Development', 'API Fallback Logic', 'Cost Optimisation', 'KYC/KYB Verification', 'Merchant Underwriting'],
  },
  {
    company: 'MKTEA',
    role: 'DATA & PRODUCT INTERN',
    meta: 'May 2025 – June 2025 · Doomdooma, Assam, India',
    domain: 'B2B Tea FMCG Manufacturing',
    desc: 'Analysed operational datasets covering 20,000+ entries and identified process bottlenecks that informed product requirement recommendations, driving 30% operational efficiency gains. Built Power BI KPI and OKR dashboards for leadership across 4 departments, and ran market and competitive analysis to prioritize backlog improvements.',
    skills: ['Bottleneck Analysis', 'Operational Efficiency', 'PRD Specs', 'Power BI OKR Dashboards', 'Backlog Prioritisation'],
  },
  {
    company: 'INDIAN OIL CORPORATION (IOCL)',
    role: 'DATA ANALYTICS INTERN',
    meta: 'June 2025 – July 2025 · Digboi Refinery, Assam, India',
    domain: 'Energy & Refining Operations',
    desc: 'Analysed operational datasets using SQL and Python (Pandas) to support 3 internal analytics tools — documenting requirements and conducting user research that improved reporting accuracy by 25% and reduced manual reconciliation by 15 hours weekly. Built automated Power BI dashboards tracking operational KPIs and joined sprint planning, stand-ups, and product reviews.',
    skills: ['SQL Data Modeling', 'Python (Pandas)', 'Power BI Dashboards', 'UAT Stakeholder Alignment', 'Sprint Planning'],
  },
  {
    company: 'KIIT ENTREPRENEURSHIP CELL',
    role: 'CHIEF MARKETING OFFICER',
    meta: '2024 – Present',
    domain: '10,000+ Student Startup Ecosystem',
    desc: 'Lead campaign experimentation, growth strategy, and startup mentorship across a 10,000+ student ecosystem — mentoring 25+ early-stage startups on customer discovery and GTM strategy, running A/B tests on digital campaigns and registration flows, and driving a 40% rise in event registrations across 12+ annual events.',
    skills: ['GTM Strategy', 'A/B Testing Funnels', 'Startup Mentorship', 'Growth Campaigns', 'Conversion Optimisation'],
  },
  {
    company: 'KIIT INTERNATIONAL MUN',
    role: 'DEPUTY DIRECTOR — OPERATIONS & STRATEGY',
    meta: '2024 – 2025',
    domain: 'International Youth Diplomacy Conference',
    desc: 'Directed end-to-end operations for one of Asia’s largest MUN conferences — coordinating 200+ volunteers across 8 functional teams and delivering seamless execution for 1,500+ delegates from around the world over 3 days.',
    skills: ['Cross-functional Alignment', 'Strategic Operations', 'Workforce Orchestration', 'Crisis Management'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-transparent text-white relative border-t border-white/5 flex flex-col items-center">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="flex items-center justify-center gap-4 mb-16 md:mb-20">
          <span className="text-accent tracking-[0.25em] text-[10px] md:text-sm font-bold uppercase">
            03 // Professional Work Experience &middot; Track Record
          </span>
        </div>

        <div className="space-y-8 md:space-y-10 max-w-4xl mx-auto">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glassmorph-box p-8 md:p-12 group cursor-pointer relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3">
                <h3 className="text-xl md:text-3xl font-display font-black uppercase tracking-tight leading-none text-accent">
                  {exp.company}
                </h3>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-white/50 whitespace-nowrap">
                  {exp.meta}
                </span>
              </div>

              <div className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-4">
                {exp.domain}
              </div>

              <h4 className="text-lg md:text-2xl font-body font-semibold text-white mb-6 border-b border-white/10 pb-5">
                {exp.role}
              </h4>

              <p className="text-base md:text-lg text-white/80 leading-relaxed font-body italic mb-6">
                &quot;{exp.desc}&quot;
              </p>

              {/* Skills deployed */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 mr-1">
                  Skills:
                </span>
                {exp.skills.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-white/70 border border-white/10 px-2.5 py-1 rounded-full group-hover:border-accent/30 group-hover:text-accent transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
