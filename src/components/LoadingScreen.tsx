'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAME_TOP = 'RISHABH';
const NAME_BOTTOM = 'RAI';
const LOADING_DURATION = 12000;
const HOLD_START = 4600;
const EXIT_START = 9700;
const HOLD_DURATION = (EXIT_START - HOLD_START) / 1000;

function mapTimelineProgress(elapsed: number) {
  if (elapsed <= HOLD_START) {
    const t = elapsed / HOLD_START;
    const eased = 1 - Math.pow(1 - t, 1.7);
    return eased * 0.45;
  }

  if (elapsed <= EXIT_START) {
    const t = (elapsed - HOLD_START) / (EXIT_START - HOLD_START);
    const eased = t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;
    return 0.45 + eased * 0.37;
  }

  const t = (elapsed - EXIT_START) / (LOADING_DURATION - EXIT_START);
  const eased = 1 - Math.pow(1 - t, 2.1);
  return Math.min(0.82 + eased * 0.18, 1);
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'assembling' | 'holding' | 'exiting'>('assembling');
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const bounded = Math.min(elapsed, LOADING_DURATION);
      setProgress(mapTimelineProgress(bounded));
      if (elapsed >= LOADING_DURATION) clearInterval(interval);
    }, 16);

    const holdTimer = setTimeout(() => setPhase('holding'), HOLD_START);
    const exitTimer = setTimeout(() => setPhase('exiting'), EXIT_START);
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
      y: -700 - (index * 55),
      x: offsets[index % offsets.length],
      rotate: angles[index % angles.length],
      scale: 0.2,
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
      scale: 0.25,
      opacity: 0,
    };
  };

  const getLetterHover = (index: number) => ({
    y: [0, -4 - (index % 4), -9 - (index % 3), -3, -7, 0],
    rotate: [0, index % 2 === 0 ? 0.4 : -0.4, 0, index % 2 === 0 ? -0.6 : 0.6, 0.2, 0],
    textShadow: [
      '0 0 14px rgba(198,255,0,0.08)',
      '0 0 30px rgba(198,255,0,0.24)',
      '0 0 24px rgba(198,255,0,0.16)',
      '0 0 34px rgba(198,255,0,0.3)',
      '0 0 18px rgba(198,255,0,0.14)',
      '0 0 12px rgba(198,255,0,0.08)'
    ],
  });

  const isActTwo = progress >= 0.45 && phase === 'holding';
  const stageLabel =
    progress < 0.45
      ? 'SCANNING SIGNAL'
      : progress < 0.75
        ? 'SYNTHESIZING SYSTEM'
        : progress < 0.92
          ? 'CALIBRATING OUTPUT'
          : 'LAUNCHING';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--background)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            animate={
              phase === 'exiting'
                ? { opacity: [0.85, 0.3], scale: [1, 1.07] }
                : phase === 'holding'
                  ? { opacity: [0.56, 0.78, 0.62, 0.88, 0.7], scale: [1, 1.04, 1.02, 1.07, 1.03] }
                  : { opacity: [0.35, 0.54, 0.5], scale: [0.95, 1.01, 1] }
            }
            transition={
              phase === 'exiting'
                ? { duration: 1.2, ease: 'easeInOut' }
                : phase === 'holding'
                  ? { duration: HOLD_DURATION, ease: [0.2, 0.8, 0.2, 1], times: [0, 0.2, 0.45, 0.75, 1] }
                  : { duration: HOLD_START / 1000, ease: [0.22, 1, 0.36, 1] }
            }
            style={{
              background:
                'radial-gradient(circle at 50% 42%, rgba(198,255,0,0.19) 0%, rgba(198,255,0,0.05) 24%, rgba(3,7,18,0.95) 68%)',
            }}
          />

          <motion.div
            className="absolute h-[110vmin] w-[110vmin] rounded-full border pointer-events-none"
            style={{ borderColor: 'rgba(198,255,0,0.22)' }}
            animate={
              phase === 'exiting'
                ? { scale: [1, 1.35], opacity: [0.35, 0] }
                : phase === 'holding'
                  ? { rotate: [24, 150, 278, 410], scale: [1, 1.02, 1.05, 1.01], opacity: [0.28, 0.42, 0.35, 0.24] }
                  : { rotate: [0, 24], opacity: [0.08, 0.26] }
            }
            transition={
              phase === 'exiting'
                ? { duration: 1.3, ease: [0.32, 0.72, 0, 1] }
                : phase === 'holding'
                  ? { duration: HOLD_DURATION, ease: [0.2, 0.8, 0.2, 1], times: [0, 0.32, 0.7, 1] }
                  : { duration: HOLD_START / 1000, ease: [0.22, 1, 0.36, 1] }
            }
          />

          <motion.div
            className="absolute h-[84vmin] w-[84vmin] rounded-full border pointer-events-none"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            animate={
              phase === 'exiting'
                ? { scale: [1, 1.25], opacity: [0.3, 0] }
                : phase === 'holding'
                  ? { rotate: [338, 270, 146, 38], scale: [1, 0.98, 1.03, 1], opacity: [0.14, 0.3, 0.22, 0.12] }
                  : { rotate: [360, 338], opacity: [0.04, 0.14] }
            }
            transition={
              phase === 'exiting'
                ? { duration: 1.1, ease: [0.32, 0.72, 0, 1], delay: 0.08 }
                : phase === 'holding'
                  ? { duration: HOLD_DURATION, ease: [0.2, 0.8, 0.2, 1], times: [0, 0.28, 0.67, 1] }
                  : { duration: HOLD_START / 1000, ease: [0.22, 1, 0.36, 1] }
            }
          />

          <motion.div
            className="absolute left-[-15%] right-[-15%] h-px pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(198,255,0,0.05) 30%, rgba(198,255,0,0.45) 50%, rgba(198,255,0,0.05) 70%, transparent 100%)',
            }}
            animate={
              phase === 'exiting'
                ? { opacity: [0.55, 0], y: ['48%', '18%'] }
                : phase === 'holding'
                  ? { opacity: [0.1, 0.72, 0.2, 0.64, 0.08], y: ['76%', '60%', '38%', '54%', '26%'] }
                  : { opacity: [0, 0.25], y: ['84%', '76%'] }
            }
            transition={
              phase === 'exiting'
                ? { duration: 1, ease: 'easeOut' }
                : phase === 'holding'
                  ? { duration: HOLD_DURATION - 0.2, ease: [0.21, 0.88, 0.23, 1], times: [0, 0.23, 0.5, 0.78, 1], delay: 0.1 }
                  : { duration: HOLD_START / 1000, ease: [0.22, 1, 0.36, 1] }
            }
          />

          <motion.div
            className="absolute left-[-20%] right-[-20%] h-px rotate-[13deg] pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(198,255,0,0.03) 25%, rgba(198,255,0,0.35) 52%, rgba(198,255,0,0.03) 75%, transparent 100%)',
            }}
            animate={
              phase === 'exiting'
                ? { opacity: [0.4, 0], y: ['42%', '10%'] }
                : isActTwo
                  ? { opacity: [0.05, 0.5, 0.18], y: ['72%', '44%', '58%'] }
                  : { opacity: 0, y: '76%' }
            }
            transition={
              phase === 'exiting'
                ? { duration: 0.9, ease: 'easeOut' }
                : isActTwo
                  ? { duration: HOLD_DURATION * 0.72, ease: [0.23, 0.9, 0.25, 1], times: [0, 0.62, 1] }
                  : { duration: 0.4 }
            }
          />

          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: i % 4 === 0 ? 3 : 2,
                height: i % 4 === 0 ? 3 : 2,
                background: i % 3 === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
                left: `${10 + (i * 4.2) % 80}%`,
                top: `${5 + (i * 7.3) % 90}%`,
              }}
              animate={{
                y: phase === 'exiting' ? [0, -60 - (i % 5) * 10] : [0, -36, 0],
                x: phase === 'exiting'
                  ? [0, (i % 2 === 0 ? -45 : 45)]
                  : isActTwo
                    ? [0, i % 2 === 0 ? 14 : -14, i % 2 === 0 ? -8 : 8, 0]
                    : [0, i % 2 === 0 ? 6 : -6, 0],
                opacity: phase === 'exiting' ? [0.7, 0] : isActTwo ? [0, 0.75, 0.12, 0] : [0, 0.6, 0],
                scale: phase === 'exiting' ? [1, 0] : isActTwo ? [0, 1.65, 0.8, 0] : [0, 1.5, 0],
              }}
              transition={{
                duration:
                  phase === 'exiting'
                    ? 0.9
                    : phase === 'holding'
                      ? isActTwo
                        ? HOLD_DURATION * 0.62 + (i % 5) * 0.06
                        : HOLD_DURATION - 0.55 + (i % 5) * 0.08
                      : 2.5 + (i % 3) * 0.12,
                delay:
                  phase === 'exiting'
                    ? i * 0.012
                    : phase === 'holding'
                      ? isActTwo
                        ? i * 0.022
                        : i * 0.035
                      : i * 0.12,
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
                    textShadow: phase === 'holding' ? '0 0 46px rgba(198,255,0,0.3)' : '0 0 0 rgba(198,255,0,0)',
                    display: 'inline-block',
                  }}
                  initial={getLetterEntrance(i)}
                  animate={
                    phase === 'exiting'
                      ? getLetterExit(i)
                      : phase === 'holding'
                        ? getLetterHover(i)
                        : letterLanded
                  }
                  transition={
                    phase === 'exiting'
                      ? {
                          duration: 0.95,
                          delay: i * 0.04,
                          ease: [0.55, 0, 1, 0.45],
                        }
                      : phase === 'holding'
                        ? {
                            duration: HOLD_DURATION,
                            ease: [0.18, 0.88, 0.22, 1],
                            times: [0, 0.18, 0.38, 0.58, 0.8, 1],
                            delay: i * 0.03,
                          }
                      : {
                          type: 'spring',
                          stiffness: 110,
                          damping: 11,
                          mass: 1.15,
                          delay: i * 0.1,
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
                    textShadow: phase === 'holding' ? '0 0 34px rgba(198,255,0,0.45)' : '0 0 0 rgba(198,255,0,0)',
                    display: 'inline-block',
                  }}
                  initial={getLetterEntrance(i + NAME_TOP.length)}
                  animate={
                    phase === 'exiting'
                      ? getLetterExit(i + NAME_TOP.length)
                      : phase === 'holding'
                        ? getLetterHover(i + NAME_TOP.length)
                        : letterLanded
                  }
                  transition={
                    phase === 'exiting'
                      ? {
                          duration: 0.95,
                          delay: (i + NAME_TOP.length) * 0.04,
                          ease: [0.55, 0, 1, 0.45],
                        }
                      : phase === 'holding'
                        ? {
                            duration: HOLD_DURATION,
                            ease: [0.18, 0.88, 0.22, 1],
                            times: [0, 0.18, 0.38, 0.58, 0.8, 1],
                            delay: (i + NAME_TOP.length) * 0.03,
                          }
                      : {
                          type: 'spring',
                          stiffness: 110,
                          damping: 11,
                          mass: 1.15,
                          delay: (i + NAME_TOP.length) * 0.1 + 0.08,
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
                  ? { scaleX: 0, opacity: 0, y: -14 }
                  : phase === 'holding'
                    ? { scaleX: [1, 1.06, 0.92, 1.08, 1], opacity: [0.58, 0.9, 0.62, 1, 0.72] }
                    : { scaleX: 1, opacity: 1 }
              }
              transition={
                phase === 'exiting'
                  ? { duration: 0.55 }
                  : phase === 'holding'
                    ? { duration: HOLD_DURATION, ease: [0.22, 0.86, 0.2, 1], times: [0, 0.24, 0.49, 0.76, 1] }
                    : { duration: 1.35, delay: 1.2, ease: [0.16, 1, 0.3, 1] }
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
                ? { opacity: 0, y: -20, letterSpacing: '0.55em' }
                : phase === 'holding'
                  ? { opacity: [0.35, 0.85, 0.5, 0.92, 0.4], y: [0, -2, 0, -1, 0], letterSpacing: ['0.34em', '0.42em', '0.37em', '0.45em', '0.36em'] }
                  : { opacity: 1, y: 0, letterSpacing: '0.36em' }
            }
            transition={
              phase === 'holding'
                ? { duration: HOLD_DURATION, ease: [0.21, 0.88, 0.22, 1], times: [0, 0.25, 0.5, 0.76, 1] }
                : { duration: 0.8, delay: phase === 'exiting' ? 0 : 1.9 }
            }
          >
            Product &amp; Data Analyst
          </motion.p>

          <motion.p
            className="text-[9px] sm:text-[10px] tracking-[0.36em] uppercase font-bold mt-3 tabular-nums"
            style={{ color: 'rgba(198,255,0,0.62)' }}
            initial={{ opacity: 0, y: 8 }}
            animate={
              phase === 'exiting'
                ? { opacity: 0, y: -8 }
                : { opacity: [0.4, 0.9, 0.6], y: [0, -1, 0] }
            }
            transition={
              phase === 'exiting'
                ? { duration: 0.4 }
                : { duration: 1.8, ease: 'easeInOut' }
            }
          >
            {stageLabel}
          </motion.p>

          {/* Progress bar */}
          <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 w-48 sm:w-64 flex flex-col items-center gap-4">
            <div className="w-full h-[1px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'var(--accent)',
                  width: `${progress * 100}%`,
                  boxShadow: phase === 'holding' ? '0 0 28px var(--accent-muted)' : '0 0 16px var(--accent-muted)',
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
