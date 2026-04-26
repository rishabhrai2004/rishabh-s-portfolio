'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const certifications = [
  { id: 1, title: 'CISCO DATA SCIENCE' },
  { id: 2, title: 'GOOGLE GENERATIVE AI' },
  { id: 3, title: 'PRODUCT & DATA ANALYTICS' }
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group glass-card p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[220px]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Award className="w-10 h-10 md:w-12 md:h-12 text-accent/20 group-hover:text-accent transition-colors duration-500 mb-6" />
              <h3 className="text-lg md:text-xl font-display font-black tracking-tight leading-tight text-white/80 group-hover:text-white transition-colors duration-500">
                {cert.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
