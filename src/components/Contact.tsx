'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-28 bg-transparent text-white overflow-hidden relative border-t border-white/5 flex flex-col justify-center min-h-[60vh]">
      <div className="absolute inset-0 w-full h-full bg-accent mix-blend-overlay opacity-5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center justify-center text-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-accent tracking-[0.3em] text-sm font-bold uppercase mb-8">
            05 // Initiate Sequence
          </p>
          
          <a 
            href="https://linkedin.com/in/rishabh-rai-961937280/" 
            target="_blank"
            rel="noopener noreferrer"
            className="block text-4xl sm:text-6xl md:text-[8rem] font-display font-black tracking-tighter uppercase leading-[0.85] text-accent hover:opacity-80 transition hover:scale-105 transform inline-block"
          >
            LET&apos;S TALK
            <br />
            <span className="text-white/20">DATA</span>
          </a>
        </motion.div>
      </div>

      <footer className="absolute bottom-8 w-full px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center text-sm font-medium tracking-[0.2em] font-body uppercase text-white/40 z-20 gap-6">
        <p>© 2026 Rishabh Rai</p>
        <div className="flex gap-8">
          <a href="https://linkedin.com/in/rishabh-rai-961937280/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
          <a href="https://github.com/rishabhrai2004" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GitHub</a>
        </div>
      </footer>
    </section>
  );
}
