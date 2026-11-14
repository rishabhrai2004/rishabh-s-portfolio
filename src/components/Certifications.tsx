'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const certifications = [
  { id: 1, title: 'IBM AI PRODUCT MANAGER', issuer: 'IBM' },
  { id: 2, title: 'INTRODUCTION TO GENERATIVE AI', issuer: 'Google Cloud' },
  { id: 3, title: 'DATA SCIENCE CERTIFICATE', issuer: 'Cisco Networking Academy' },
  { id: 4, title: 'DATA ANALYST BOOTCAMP', issuer: 'Udemy' },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-32 bg-transparent text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="flex items-center justify-center gap-4 mb-16 md:mb-20">
          <div className="h-px bg-white/10 flex-1 hidden md:block" />
          <span className="text-accent tracking-[0.2em] text-[10px] md:text-sm font-bold uppercase">
            05 // Validated Expertise &middot; Certifications
          </span>
          <div className="h-px bg-white/10 flex-1 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glassmorph-box p-6 md:p-8 flex flex-col justify-between min-h-[190px] group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <Award className="w-7 h-7 text-accent/90 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-display uppercase tracking-tight text-white group-hover:text-accent transition-colors font-bold mb-1.5">
                  {c.title}
                </h4>
                <p className="text-xs text-white/50 uppercase tracking-widest font-semibold">{c.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
