'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAME_TOP = 'RISHABH';
const NAME_BOTTOM = 'RAI';

// Timeline (ms)
const REVEAL_AT = 6400;       // counter/words hand off to the name reveal
const EXIT_AT = 9000;         // curtain begins lifting; counter hits 100
const CURTAIN_MS = 1200;
const LOADING_DURATION = EXIT_AT + CURTAIN_MS; // loader fully gone

const SOUNDTRACK_PATH = '/sequence/loading-cinematic.wav';
const WORDS = ['PRODUCT', 'STRATEGY', 'RESEARCH', 'ANALYTICS', 'EXPERIENCE'];

type Phase = 'count' | 'reveal' | 'exit';

// easeInOutCubic — counter climbs with weight, settling into 100 at EXIT_AT.
function timelineProgress(elapsed: number) {
  const t = Math.min(elapsed / EXIT_AT, 1);
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const RISE = [0.16, 1, 0.3, 1] as const;
const SWAP = [0.76, 0, 0.24, 1] as const;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>('count');
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const soundtrackRef = useRef<HTMLAudioElement | null>(null);
  const hasPlayedAudioRef = useRef(false);
  const loadingStartedAtRef = useRef(0);
  const lastAudioSyncRef = useRef(0);
  const timersRef = useRef<{
    interval?: ReturnType<typeof setInterval>;
    reveal?: ReturnType<typeof setTimeout>;
    exit?: ReturnType<typeof setTimeout>;
    hide?: ReturnType<typeof setTimeout>;
  }>({});

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  const getElapsedSeconds = useCallback(() => {
    if (!loadingStartedAtRef.current) return 0;
    const elapsedMs = Date.now() - loadingStartedAtRef.current;
    const boundedMs = Math.min(Math.max(elapsedMs, 0), LOADING_DURATION);
    return boundedMs / 1000;
  }, []);

  const syncSoundtrackToTimeline = useCallback((soundtrack: HTMLAudioElement) => {
    const elapsedSeconds = getElapsedSeconds();

    // Keep soundtrack aligned to the visual timeline.
    if (Number.isFinite(soundtrack.duration) && soundtrack.duration > 0) {
      const targetRate = soundtrack.duration / (LOADING_DURATION / 1000);
      soundtrack.playbackRate = Math.min(Math.max(targetRate, 0.9), 1.15);
      soundtrack.currentTime = Math.min(elapsedSeconds, Math.max(soundtrack.duration - 0.08, 0));
      return;
    }

    soundtrack.currentTime = elapsedSeconds;
  }, [getElapsedSeconds]);

  const playCinematicStartup = useCallback(async () => {
    if (hasPlayedAudioRef.current) return;

    try {
      if (!soundtrackRef.current) {
        const soundtrack = new Audio(SOUNDTRACK_PATH);
        soundtrack.preload = 'auto';
        soundtrack.volume = 0.68;
        soundtrack.currentTime = 0;
        soundtrack.addEventListener('loadedmetadata', () => {
          syncSoundtrackToTimeline(soundtrack);
        }, { once: true });
        soundtrackRef.current = soundtrack;
      }

      const soundtrack = soundtrackRef.current;
      syncSoundtrackToTimeline(soundtrack);
      await soundtrack.play();
      hasPlayedAudioRef.current = true;
      setShowAudioPrompt(false);
    } catch {
      setShowAudioPrompt(true);
    }
  }, [syncSoundtrackToTimeline]);

  // Master timeline
  useEffect(() => {
    loadingStartedAtRef.current = Date.now();
    void playCinematicStartup();

    const unlockAudio = () => { void playCinematicStartup(); };
    window.addEventListener('pointerdown', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress(timelineProgress(elapsed));

      if (
        soundtrackRef.current &&
        !soundtrackRef.current.paused &&
        elapsed - lastAudioSyncRef.current >= 500
      ) {
        const target = Math.min(elapsed, LOADING_DURATION) / 1000;
        const drift = Math.abs(soundtrackRef.current.currentTime - target);
        if (drift > 0.22) syncSoundtrackToTimeline(soundtrackRef.current);
        lastAudioSyncRef.current = elapsed;
      }

      if (elapsed >= LOADING_DURATION) clearInterval(interval);
    }, 16);

    const revealTimer = setTimeout(() => setPhase('reveal'), REVEAL_AT);
    const exitTimer = setTimeout(() => {
      setPhase('exit');
      handleComplete(); // reveal the site beneath as the curtain lifts
    }, EXIT_AT);
    const hideTimer = setTimeout(() => setIsVisible(false), LOADING_DURATION);

    timersRef.current = { interval, reveal: revealTimer, exit: exitTimer, hide: hideTimer };

    return () => {
      clearInterval(interval);
      clearTimeout(revealTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      if (soundtrackRef.current) {
        soundtrackRef.current.pause();
        soundtrackRef.current.currentTime = 0;
        soundtrackRef.current = null;
      }
      loadingStartedAtRef.current = 0;
      lastAudioSyncRef.current = 0;
    };
  }, [handleComplete, playCinematicStartup, syncSoundtrackToTimeline]);

  // Kinetic word cycling, only while counting
  useEffect(() => {
    if (phase !== 'count') return;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 1150);
    return () => clearInterval(id);
  }, [phase]);

  const pct = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ background: 'var(--background)' }}
          initial={false}
          animate={{ y: phase === 'exit' ? '-100%' : 0 }}
          transition={{ duration: phase === 'exit' ? CURTAIN_MS / 1000 : 0, ease: SWAP }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {/* Breathing accent glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 44%, rgba(198,255,0,0.16) 0%, rgba(198,255,0,0.03) 30%, transparent 60%)' }}
            animate={{ opacity: [0.5, 0.9, 0.6], scale: [1, 1.06, 1.01] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Fine grid + vignette + grain for depth */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,#000_20%,transparent_85%)] opacity-40" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 45%, transparent 35%, rgba(3,7,18,0.85) 100%)' }} />
          <div className="absolute inset-0 grain-overlay opacity-[0.12] pointer-events-none" />

          {/* Slowly drifting motes */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                width: i % 3 === 0 ? 3 : 2,
                height: i % 3 === 0 ? 3 : 2,
                left: `${8 + (i * 9.1) % 84}%`,
                top: `${12 + (i * 13.7) % 72}%`,
                background: i % 2 === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
              }}
              animate={{ y: [0, -26, 0], opacity: [0, 0.55, 0], scale: [0.6, 1.2, 0.6] }}
              transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            />
          ))}

          {/* Brand — top left */}
          <motion.div
            className="absolute top-[max(1.4rem,env(safe-area-inset-top))] left-[max(1.4rem,5vw)] flex items-center gap-3 z-20"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="font-display font-bold text-lg tracking-tight text-white">
              RR<span className="text-accent">.</span>
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-[10px] tracking-[0.32em] uppercase text-white/40 font-bold">Portfolio &apos;26</span>
          </motion.div>

          {/* Audio prompt — top right */}
          <AnimatePresence>
            {showAudioPrompt && phase !== 'exit' && (
              <motion.button
                type="button"
                onClick={() => void playCinematicStartup()}
                className="absolute top-[max(1.2rem,env(safe-area-inset-top))] right-[max(1.2rem,5vw)] z-30 rounded-full border px-4 py-2 text-[10px] tracking-[0.18em] font-bold uppercase"
                style={{ borderColor: 'rgba(198,255,0,0.4)', color: 'rgba(229,255,160,0.95)', background: 'rgba(5,12,16,0.6)' }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Enable Sound
              </motion.button>
            )}
          </AnimatePresence>

          {/* Center stage — kinetic words give way to the name */}
          <div className="absolute inset-0 flex items-center justify-center px-6 z-10">
            <AnimatePresence mode="wait">
              {phase === 'count' ? (
                <motion.div
                  key="words"
                  className="text-center select-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.96, transition: { duration: 0.45 } }}
                >
                  <div className="mb-6 flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-accent/60" />
                    <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-accent/80 font-bold">Loading Experience</span>
                    <span className="h-px w-8 bg-accent/60" />
                  </div>
                  <div className="relative mx-auto overflow-hidden h-[1.05em] text-[12vw] md:text-[8vw] leading-none" style={{ width: 'min(88vw, 1000px)' }}>
                    <AnimatePresence initial={false}>
                      <motion.span
                        key={wordIndex}
                        initial={{ y: '105%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '-105%' }}
                        transition={{ duration: 0.6, ease: SWAP }}
                        className="absolute inset-0 flex items-center justify-center font-display italic font-medium text-white/90"
                      >
                        {WORDS[wordIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="name" className="text-center select-none" initial={{ opacity: 1 }}>
                  <div className="overflow-hidden">
                    <motion.h1
                      initial={{ y: '115%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.95, ease: RISE }}
                      className="font-display font-black text-[15vw] md:text-[11vw] leading-[0.86] tracking-tighter text-white"
                      style={{ textShadow: '0 0 60px rgba(198,255,0,0.18)' }}
                    >
                      {NAME_TOP}
                    </motion.h1>
                  </div>
                  <div className="overflow-hidden pr-[0.06em]">
                    <motion.h1
                      initial={{ y: '115%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.95, delay: 0.09, ease: RISE }}
                      className="font-display italic font-black text-[15vw] md:text-[11vw] leading-[0.86] tracking-tighter text-accent"
                      style={{ textShadow: '0 0 50px rgba(198,255,0,0.4)' }}
                    >
                      {NAME_BOTTOM}
                    </motion.h1>
                  </div>
                  <motion.p
                    className="mt-6 text-[10px] md:text-xs tracking-[0.42em] uppercase text-white/45 font-bold"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  >
                    Product Manager
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Counter — bottom left */}
          <motion.div
            className="absolute bottom-[max(1.6rem,7vh)] left-[max(1.4rem,5vw)] flex items-end gap-1.5 z-20"
            animate={{ opacity: phase === 'exit' ? 0 : 1, y: phase === 'exit' ? 12 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-body font-black tabular-nums leading-[0.8] text-4xl md:text-6xl text-white">
              {String(pct).padStart(3, '0')}
            </span>
            <span className="mb-1 text-accent text-sm md:text-lg font-black">%</span>
          </motion.div>

          {/* Status — bottom right */}
          <div className="absolute bottom-[max(1.6rem,7vh)] right-[max(1.4rem,5vw)] z-20">
            <motion.span
              className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40 font-bold tabular-nums"
              animate={{ opacity: phase === 'exit' ? 0 : 1 }}
            >
              {phase === 'count' ? 'Initializing' : phase === 'reveal' ? 'Rendering' : 'Ready'}
            </motion.span>
          </div>

          {/* Progress line — bottom edge, becomes the leading edge of the curtain lift */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/8 z-20">
            <div
              className="h-full bg-accent"
              style={{
                width: `${Math.max(progress, phase === 'exit' ? 1 : 0) * 100}%`,
                boxShadow: '0 0 20px var(--accent), 0 0 6px var(--accent)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
