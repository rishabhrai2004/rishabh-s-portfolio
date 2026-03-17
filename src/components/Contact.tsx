'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-transparent text-white overflow-hidden relative border-t border-white/5 flex flex-col justify-center min-h-[70vh]">
      <div className="absolute inset-0 w-full h-full bg-accent mix-blend-overlay opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/5 blur-[250px] rounded-full pointer-events-none mix-blend-screen" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center justify-center text-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <p className="text-accent tracking-[0.3em] text-[10px] md:text-sm font-bold uppercase mb-8 md:mb-12">
            06 // Initiate Sequence
          </p>
          
          <a 
            href="https://linkedin.com/in/rishabh-rai-961937280/" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] font-display font-black tracking-tighter uppercase leading-[0.8] text-white hover:text-accent transition-all duration-700 hover:scale-105 transform inline-block"
          >
            LET&apos;S TALK
            <br />
            <span className="text-white/10 group-hover:text-white/20 transition-colors duration-700">DATA</span>
            <div className="absolute -inset-4 md:-inset-8 border border-accent/0 group-hover:border-accent/20 transition-all duration-700 rounded-full scale-110 group-hover:scale-100 opacity-0 group-hover:opacity-100 pointer-events-none" />
          </a>
        </motion.div>
      </div>

      <footer className="mt-auto w-full px-6 lg:px-12 py-12 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-bold tracking-[0.3em] font-body uppercase text-white/30 z-20 gap-8">
        <p className="hover:text-white transition-colors cursor-default">© 2026 Rishabh Rai // RR.</p>
        <div className="flex gap-10">
          <a href="https://linkedin.com/in/rishabh-rai-961937280/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all duration-300 hover:tracking-[0.4em]">LinkedIn</a>
          <a href="https://github.com/rishabhrai2004" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-all duration-300 hover:tracking-[0.4em]">GitHub</a>
        </div>
      </footer>
    </section>
  );
}
