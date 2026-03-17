'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      <header 
        className={`fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'py-4' : 'py-8'
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
                    className="text-white/60 hover:text-white text-[13px] uppercase tracking-[0.2em] font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
              <a 
                href="/Rishabh_Rai_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 border border-white/20 text-white text-[13px] uppercase tracking-[0.15em] font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105 duration-300"
              >
                Resume
              </a>
              <a 
                href="#projects" 
                className="px-8 py-3.5 bg-accent text-black text-[13px] uppercase tracking-[0.15em] font-bold rounded-full hover:bg-white transition-all hover:scale-105 duration-300 shadow-[0_0_20px_rgba(198,255,0,0.2)]"
              >
                View Work
              </a>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white z-50 p-2"
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
            className="fixed inset-0 z-40 bg-[#0D1117] flex flex-col justify-center items-center"
          >
            <ul className="flex flex-col items-center gap-10">
              {links.map((link, idx) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx + 0.3 }}
                >
                  <a 
                    href={link.href} 
                    onClick={closeMenu} 
                    className="text-white hover:text-accent font-display italic text-5xl transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex flex-col items-center gap-6"
              >
                <a 
                  href="/Rishabh_Rai_Resume.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="px-10 py-4 border border-white/20 text-white text-sm uppercase tracking-[0.2em] font-bold rounded-full"
                >
                  Download Resume
                </a>
                <a 
                  href="#projects" 
                  onClick={closeMenu}
                  className="px-10 py-4 bg-accent text-black text-sm uppercase tracking-[0.2em] font-bold rounded-full"
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
