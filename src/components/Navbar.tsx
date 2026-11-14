'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'Approach', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[160]"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, rgba(198,255,0,0.15) 0%, var(--accent) 50%, rgba(198,255,0,0.2) 100%)',
          boxShadow: '0 0 16px var(--accent-muted)',
        }}
      />

      <header
        className={`fixed top-0 w-full z-[150] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'py-4 glass bg-black/60' : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group z-50">
            <span className="text-2xl font-display italic font-bold tracking-tighter text-white transition-opacity group-hover:opacity-75">
              RR<span className="text-accent not-italic">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-9">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="link-underline text-white/80 hover:text-accent text-[11px] uppercase tracking-[0.25em] font-bold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3.5 ml-4">
              <a
                href="#projects"
                className="btn-shine px-6 py-2.5 bg-accent text-black text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white transition-all hover:scale-105 duration-300 shadow-[0_0_20px_var(--accent-muted)]"
              >
                <span className="relative z-[2]">Explore Work</span>
              </a>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white z-[160] p-2 hover:text-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
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
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[145] bg-[#030712] flex flex-col justify-center items-center p-6"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

            <ul className="flex flex-col items-center gap-7 relative z-10 w-full max-w-xs">
              {links.map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * idx + 0.2 }}
                  className="w-full text-center"
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block text-white hover:text-accent font-display italic text-4xl sm:text-5xl transition-all duration-400 hover:tracking-wider"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-8 flex flex-col items-center gap-3.5 w-full"
              >
                <a
                  href="#projects"
                  onClick={closeMenu}
                  className="w-full py-3.5 text-center bg-accent text-black text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white transition-all shadow-[0_0_30px_var(--accent-muted)]"
                >
                  Explore Work
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
