'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-px origin-left z-[60]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, rgba(198,255,0,0.15) 0%, var(--accent) 48%, rgba(198,255,0,0.2) 100%)',
          boxShadow: '0 0 18px var(--accent-muted)',
        }}
      />

      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'py-4 glass bg-black/40' : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group z-50">
            <span className="text-2xl font-display italic font-bold tracking-tighter text-white transition-opacity group-hover:opacity-70">
              RR<span className="text-accent not-italic">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-10">
              {links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-white/80 hover:text-accent text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 ml-4">
              <a 
                href="#projects" 
                className="px-6 py-3 bg-accent text-black text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white transition-all hover:scale-105 duration-300 shadow-[0_0_20px_var(--accent-muted)]"
              >
                View Work
              </a>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white z-50 p-2 hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#030712] flex flex-col justify-center items-center p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
            
            <ul className="flex flex-col items-center gap-8 relative z-10 w-full max-w-xs">
              {links.map((link, idx) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx + 0.3 }}
                  className="w-full text-center"
                >
                  <a 
                    href={link.href} 
                    onClick={closeMenu} 
                    className="block text-white hover:text-accent font-display italic text-5xl md:text-6xl transition-all duration-500 hover:tracking-widest"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex flex-col items-center gap-4 w-full"
              >
                <a 
                  href="#projects" 
                  onClick={closeMenu}
                  className="w-full py-4 text-center bg-accent text-black text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white transition-all shadow-[0_0_30px_var(--accent-muted)]"
                >
                  View Work
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
