'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const certifications = [
  { id: 1, title: 'AI PRODUCT MANAGER', issuer: 'IBM' },
  { id: 2, title: 'INTRODUCTION TO GENERATIVE AI', issuer: 'Google Cloud' },
  { id: 3, title: 'DATA SCIENCE', issuer: 'Cisco Networking Academy' },
  { id: 4, title: 'DATA ANALYST BOOTCAMP', issuer: 'Udemy' }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-32 bg-transparent text-white relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="flex items-center justify-center gap-4 mb-16 md:mb-24">
          <div className="h-px bg-white/10 flex-1 hidden md:block" />
          <span className="text-accent tracking-[0.2em] text-[10px] md:text-sm font-bold uppercase">05 // Validated Expertise</span>
          <div className="h-px bg-white/10 flex-1 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative glass-card p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[220px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Award className="w-10 h-10 md:w-12 md:h-12 text-accent/20 group-hover:text-accent transition-colors duration-500 mb-6" />
              <h3 className="text-base md:text-lg font-display font-black tracking-tight leading-tight text-white/80 group-hover:text-white transition-colors duration-500">
                {cert.title}
              </h3>
              <p className="mt-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                {cert.issuer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
