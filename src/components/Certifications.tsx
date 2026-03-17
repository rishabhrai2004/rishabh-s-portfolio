'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const certifications = [
  { id: 1, title: 'Cisco Data Science Certificate' },
  { id: 2, title: 'Google Introduction to Generative AI' },
  { id: 3, title: 'Data Analyst Bootcamp' }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-8 md:px-24 bg-black text-white relative">
      <div className="max-w-6xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight inline-flex items-center gap-4">
            <Award className="w-8 h-8 text-[#FFC107]" />
            Certifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gradient-to-br from-[#0A192F] to-black border border-white/10 rounded-2xl p-8 hover:border-[#FFC107]/50 transition-colors duration-300 text-center flex flex-col items-center justify-center min-h-[200px]"
            >
              <Award className="w-12 h-12 text-[#FFC107]/20 mb-4" />
              <h3 className="text-xl font-bold">{cert.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
