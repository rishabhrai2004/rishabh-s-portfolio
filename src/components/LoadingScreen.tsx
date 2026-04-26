'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAME_TOP = 'RISHABH';
const NAME_BOTTOM = 'RAI';
const LOADING_DURATION = 3500; // 3.5 seconds

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'assembling' | 'holding' | 'exiting'>('assembling');
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Progress bar animation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / LOADING_DURATION, 1);
      // Eased progress for smoother feel
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p >= 1) clearInterval(interval);
    }, 16);

    // Phase transitions
    const holdTimer = setTimeout(() => setPhase('holding'), 2500);
    const exitTimer = setTimeout(() => setPhase('exiting'), LOADING_DURATION - 1500);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      handleComplete();
    }, LOADING_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [handleComplete]);

  // Random initial positions for each letter (falling from different spots)
  const getLetterEntrance = (index: number) => {
    const angles = [-35, 20, -15, 30, -25, 10, -20, 25];
    const offsets = [-200, 150, -100, 250, -180, 120, -220, 180];
    return {
      y: -800 - (index * 60),
      x: offsets[index % offsets.length],
      rotate: angles[index % angles.length],
      scale: 0.3,
      opacity: 0,
    };
  };

  const letterLanded = {
    y: 0,
    x: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
  };

  const getLetterExit = (index: number) => {
    const directions = [
      { x: -400, y: -300, rotate: -45 },
      { x: 300, y: -500, rotate: 30 },
      { x: -200, y: 400, rotate: -60 },
      { x: 500, y: -200, rotate: 50 },
      { x: -350, y: 300, rotate: -35 },
      { x: 250, y: 500, rotate: 40 },
      { x: -500, y: -100, rotate: -55 },
      { x: 400, y: 350, rotate: 65 },
    ];
    const dir = directions[index % directions.length];
    return {
      ...dir,
      scale: 0,
      opacity: 0,
    };
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--background)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--accent-muted) 0%, transparent 70%)' }}
          />

          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: i % 3 === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
                left: `${10 + (i * 4.2) % 80}%`,
                top: `${5 + (i * 7.3) % 90}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2.5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.25,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Main name container */}
          <div className="relative flex flex-col items-center gap-0 select-none">
            {/* RISHABH - top line */}
            <div className="flex items-end gap-[2px] sm:gap-1" style={{ perspective: '1000px' }}>
              {NAME_TOP.split('').map((letter, i) => (
                <motion.span
                  key={`top-${i}`}
                  className="font-display font-black text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] leading-none tracking-tighter"
                  style={{ 
                    color: 'var(--foreground)',
                    textShadow: phase === 'holding' ? '0 0 40px var(--accent-muted)' : 'none',
                    display: 'inline-block',
                  }}
                  initial={getLetterEntrance(i)}
                  animate={
                    phase === 'exiting'
                      ? getLetterExit(i)
                      : letterLanded
                  }
                  transition={
                    phase === 'exiting'
                      ? {
                          duration: 0.8,
                          delay: i * 0.05,
                          ease: [0.55, 0, 1, 0.45],
                        }
                      : {
                          type: 'spring',
                          stiffness: 120,
                          damping: 12,
                          mass: 1.2,
                          delay: i * 0.12,
                        }
                  }
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* RAI - bottom line */}
            <div className="flex items-start gap-[2px] sm:gap-1 -mt-2 sm:-mt-4" style={{ perspective: '1000px' }}>
              {NAME_BOTTOM.split('').map((letter, i) => (
                <motion.span
                  key={`bottom-${i}`}
                  className="font-display italic font-black text-5xl sm:text-7xl md:text-[8rem] lg:text-[10rem] leading-none tracking-tighter"
                  style={{ 
                    color: 'var(--accent)',
                    display: 'inline-block',
                  }}
                  initial={getLetterEntrance(i + NAME_TOP.length)}
                  animate={
                    phase === 'exiting'
                      ? getLetterExit(i + NAME_TOP.length)
                      : letterLanded
                  }
                  transition={
                    phase === 'exiting'
                      ? {
                          duration: 0.8,
                          delay: (i + NAME_TOP.length) * 0.05,
                          ease: [0.55, 0, 1, 0.45],
                        }
                      : {
                          type: 'spring',
                          stiffness: 120,
                          damping: 12,
                          mass: 1.2,
                          delay: (i + NAME_TOP.length) * 0.12 + 0.1,
                        }
                  }
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Accent underline that draws itself */}
            <motion.div
              className="h-[2px] mt-4 sm:mt-6 rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                phase === 'exiting'
                  ? { scaleX: 0, opacity: 0 }
                  : { scaleX: 1, opacity: 1 }
              }
              transition={
                phase === 'exiting'
                  ? { duration: 0.4 }
                  : { duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }
              }
              style={{ background: 'var(--accent)', originX: 0, width: '100%' }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold mt-8 sm:mt-12"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={
              phase === 'exiting'
                ? { opacity: 0, y: -20 }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.8, delay: phase === 'exiting' ? 0 : 2.2 }}
          >
            Product &amp; Data Analyst
          </motion.p>

          {/* Progress bar */}
          <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 w-48 sm:w-64 flex flex-col items-center gap-4">
            <div className="w-full h-[1px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'var(--accent)',
                  width: `${progress * 100}%`,
                  boxShadow: '0 0 20px var(--accent-muted)',
                }}
              />
            </div>
            <motion.span
              className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-bold tabular-nums"
              style={{ color: 'rgba(255,255,255,0.2)' }}
              initial={{ opacity: 0 }}
              animate={
                phase === 'exiting'
                  ? { opacity: 0 }
                  : { opacity: 1 }
              }
              transition={{ delay: 0.5 }}
            >
              {Math.round(progress * 100)}%
            </motion.span>
          </div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-6 left-6 sm:top-10 sm:left-10 w-8 h-8 sm:w-12 sm:h-12 border-l border-t"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-8 h-8 sm:w-12 sm:h-12 border-r border-b"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
