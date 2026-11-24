'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[145] h-dvh overflow-y-auto bg-[#030712]"
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_75%_30%,rgba(198,255,0,0.09),transparent_38%),linear-gradient(155deg,#07100e_0%,#030712_58%,#070915_100%)]" />
            <div className="absolute inset-0 pointer-events-none opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />

            <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center px-7 pb-24 pt-24 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
                className="mb-5 flex items-center justify-between border-b border-white/10 pb-4"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  Navigate
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/35">
                  INDEX&nbsp; / &nbsp;01—05
                </span>
              </motion.div>

              <ul className="relative w-full">
                {links.map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + idx * 0.055, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-white/[0.08]"
                >
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex min-h-[66px] items-center gap-5 py-3 text-white transition-colors duration-300 hover:text-accent focus-visible:text-accent"
                  >
                    <span className="w-7 shrink-0 font-mono text-[10px] tracking-wider text-white/35 transition-colors group-hover:text-accent/70">
                      0{idx + 1}
                    </span>
                    <span className="flex-1 font-display text-[clamp(1.75rem,7vw,2.6rem)] font-medium tracking-tight">
                      {link.name}
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 -translate-x-1 translate-y-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </a>
                </motion.li>
              ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.42 }}
                className="mt-7 flex items-center justify-between gap-4"
              >
                <a
                  href="#projects"
                  onClick={closeMenu}
                  className="btn-shine inline-flex min-h-12 flex-1 items-center justify-between rounded-full border border-accent/60 bg-accent px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-black shadow-[0_0_32px_var(--accent-muted)] transition-all hover:scale-[1.02] hover:bg-white sm:flex-none sm:gap-8"
                >
                  <span className="relative z-[2]">Explore selected work</span>
                  <ArrowUpRight className="relative z-[2] h-4 w-4" />
                </a>
                <span className="hidden text-right text-[9px] font-semibold uppercase leading-relaxed tracking-[0.16em] text-white/35 sm:block">
                  Product sense<br />&amp; strategy
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-7 text-[9px] font-mono uppercase tracking-[0.2em] text-white/30"
              >
                Rishabh Rai <span className="px-1.5 text-accent/70">/</span> Product management · GTM
              </motion.p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
