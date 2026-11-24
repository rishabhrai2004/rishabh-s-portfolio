'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity, Workflow } from 'lucide-react';

const NAME_FIRST = 'RISHABH';
const NAME_LAST = 'RAI';

const PILLARS = [
  '0-TO-1 PRD ARCHITECTURE & ROADMAPS',
  'GTM STRATEGY & ATTACH-RATE RETENTION',
  '50M+ TRANSACTIONS & EMBEDDINGS',
  'MULTI-PROVIDER FALLBACK ENGINE',
  'BROWSE-REPEAT RETENTION FRAMEWORK',
  '4-FEATURE PRD SUITE // ₹816 CR GMV',
];

const TELEMETRY_STREAM = [
  'SYS_BOOT // INITIALIZING PRODUCT OS ENGINE...',
  'CALIBRATING 67 BANKS & 50,000,000 PAYMENT NARRATIONS...',
  'TRAINING ML EMBEDDINGS // CATEGORISATION (+28% ACCURACY GAIN)...',
  'BENCHMARKING REDIS CACHING LATENCY // -22% VENDOR COSTS SAVED...',
  'DEPLOYING MULTI-PROVIDER API FALLBACK [99.4% UPTIME ENGINE]...',
  'ARCHITECTING 0-TO-1 MERCHANT RISK & KYB UNDERWRITING PRD SUITE...',
  'RUNNING BOTTLENECK ANALYSIS ON 20,000+ PRODUCTION ENTRIES...',
  'EXECUTING AUTOMATED SQL AUDIT SUITE // 15 HRS/WEEK SAVED...',
  'SYNCHRONIZING SWIGGY VS ETERNAL BROWSE-REPEAT RETENTION FRAMEWORK...',
  'CALCULATING 4-FEATURE PRD SUITE // ₹816 CR GMV FINANCIAL MODEL...',
  'INSTRUMENTING COHORT RETENTION FUNNELS & A/B EXPERIMENTATION MATRIX...',
  'ALL PRODUCT TELEMETRY SYNCHRONIZED // PRODUCT_OS READY FOR LAUNCH',
];

const PRODUCT_SIGNALS = [
  'CUSTOMER SIGNALS MAPPED',
  'PRD SCOPE LOCKED',
  'GTM MODEL READY',
  'RETENTION LIFT +28%',
  'API COST DOWN 22%',
  '50M+ TRANSACTIONS ANALYZED',
];

const MILESTONES = [
  { label: 'DISCOVERY', shortLabel: 'DISCOVERY', threshold: 25 },
  { label: 'PRD SPEC', shortLabel: 'PRD SPEC', threshold: 50 },
  { label: 'GTM ENGINE', shortLabel: 'GTM', threshold: 75 },
  { label: 'LAUNCH READY', shortLabel: 'LAUNCH', threshold: 100 },
];

const TOP_TICKER_TEXT =
  'RISHABH RAI /// ASSOCIATE PRODUCT MANAGER /// 0-TO-1 PRD SPECIFICATION /// 50,000,000 NARRATIONS CATEGORISED /// 67 INTEGRATED BANKS /// GTM & FUNNEL RETENTION /// BROWSE-REPEAT FRAMEWORK /// MULTI-PROVIDER API FALLBACK /// ₹816 CR GMV SUITE /// ';

const BOTTOM_TICKER_TEXT =
  'PRODUCT SENSE /// METRICS-DRIVEN ROADMAP /// RICE PRIORITIZATION /// USER RESEARCH /// RETENTION COHORTS /// POWER BI /// SQL & PYTHON /// A/B EXPERIMENTATION /// KIIT ECS 2027 /// SYSTEM READY /// PRODUCT_OS ONLINE /// ';

const DURATION_MS = 5200;

interface ProductParticle {
  radius: number;
  angle: number;
  angularSpeed: number;
  size: number;
  alpha: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'node' | 'signal';
}

interface SignalWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [streamIndex, setStreamIndex] = useState(0);
  const [pillarIndex, setPillarIndex] = useState(0);
  const [signalIndex, setSignalIndex] = useState(0);
  const [phase, setPhase] = useState<'running' | 'blast' | 'done'>('running');
  const [isVisible, setIsVisible] = useState(true);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isCompact, setIsCompact] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highPerformance, setHighPerformance] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signalWavesRef = useRef<SignalWave[]>([]);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const displayedProgressRef = useRef(-1);

  const handleFinish = useCallback(() => {
    setPhase('blast');
    setTimeout(() => {
      onComplete();
      setIsVisible(false);
    }, 550);
  }, [onComplete]);

  useEffect(() => {
    const compactQuery = window.matchMedia('(max-width: 640px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreferences = () => {
      const device = navigator as Navigator & {
        deviceMemory?: number;
        connection?: { saveData?: boolean };
      };
      setIsCompact(compactQuery.matches);
      setReducedMotion(motionQuery.matches);
      setHighPerformance(
        !device.connection?.saveData &&
          ((device.deviceMemory ?? 0) >= 8 ||
            (!compactQuery.matches && navigator.hardwareConcurrency >= 8))
      );
    };

    syncPreferences();
    compactQuery.addEventListener('change', syncPreferences);
    motionQuery.addEventListener('change', syncPreferences);
    return () => {
      compactQuery.removeEventListener('change', syncPreferences);
      motionQuery.removeEventListener('change', syncPreferences);
    };
  }, []);

  // Keyboard shortcut: ESC or Space to skip instantly
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.code === 'Space') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleFinish]);

  // Mouse position drives the live telemetry and background signal field.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let lastStateUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      mousePosRef.current.targetX = e.clientX;
      mousePosRef.current.targetY = e.clientY;

      const now = performance.now();
      if (now - lastStateUpdate < 50) return;
      lastStateUpdate = now;
      setMouseCoords({
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
      });

      setMouseOffset({
        x: normX * 8,
        y: normY * 4,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Click to send a signal wave through the product telemetry field.
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    signalWavesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      radius: 8,
      maxRadius: 260,
      alpha: 1,
    });
  };

  // Main 8.8s progression counter
  useEffect(() => {
    const start = performance.now();
    const duration = reducedMotion
      ? 1600
      : highPerformance
        ? 3000
        : isCompact
          ? 4200
          : DURATION_MS;
    const progressDuration = duration - (duration < DURATION_MS ? 100 : 250);
    displayedProgressRef.current = -1;
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const rawPct = Math.min(elapsed / progressDuration, 1);

      // Progressive 8.8-second kinetic curve:
      let eased: number;
      if (rawPct < 0.6) {
        eased = (rawPct / 0.6) * 0.72;
      } else if (rawPct < 0.92) {
        eased = 0.72 + ((rawPct - 0.6) / 0.32) * 0.26;
      } else {
        eased = 0.98 + ((rawPct - 0.92) / 0.08) * 0.02;
      }

      const nextProgress = Math.min(Math.round(eased * 100), 100);
      if (nextProgress !== displayedProgressRef.current) {
        displayedProgressRef.current = nextProgress;
        setProgress(nextProgress);
      }

      const nextStream = Math.min(
        Math.floor(rawPct * TELEMETRY_STREAM.length),
        TELEMETRY_STREAM.length - 1
      );
      setStreamIndex(nextStream);

      if (elapsed >= duration) {
        handleFinish();
        return;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [handleFinish, highPerformance, isCompact, reducedMotion]);

  // Pillar word reel cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setPillarIndex((prev) => (prev + 1) % PILLARS.length);
    }, 1450);
    return () => clearInterval(interval);
  }, []);

  // Rotate through product signals.
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % PRODUCT_SIGNALS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Product data-point field with connected telemetry signals.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    mousePosRef.current.x = width / 2;
    mousePosRef.current.y = height / 2;
    mousePosRef.current.targetX = width / 2;
    mousePosRef.current.targetY = height / 2;

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const PARTICLE_COUNT = isCompact ? 28 : 90;
    const particles: ProductParticle[] = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      const radius = 120 + Math.random() * (Math.min(width, height) * 0.38);
      const types: ProductParticle['type'][] = ['node', 'signal', 'node'];
      return {
        radius: radius,
        angle: angle,
        angularSpeed: (Math.random() * 0.015 + 0.005) * (i % 2 === 0 ? 1 : -1),
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.35,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        type: types[i % 3],
      };
    });

    let animationId: number;
    let scanY = 0;

    const render = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse lerp
      mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.08;
      mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.08;

      const mX = mousePosRef.current.x;
      const mY = mousePosRef.current.y;
      const cX = width / 2;
      const cY = height / 2;

      // Mouse-reactive product signal glow
      const mouseGlow = ctx.createRadialGradient(mX, mY, 10, mX, mY, 320);
      mouseGlow.addColorStop(0, 'rgba(198, 255, 0, 0.11)');
      mouseGlow.addColorStop(0.4, 'rgba(0, 240, 255, 0.05)');
      mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = mouseGlow;
      ctx.fillRect(0, 0, width, height);

      // Center stage orbital glow
      const centerGlow = ctx.createRadialGradient(cX, cY, 20, cX, cY, 400);
      centerGlow.addColorStop(0, 'rgba(198, 255, 0, 0.07)');
      centerGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.025)');
      centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // Send click waves through the telemetry field.
      const signalWaves = signalWavesRef.current;
      for (let sIdx = signalWaves.length - 1; sIdx >= 0; sIdx--) {
        const wave = signalWaves[sIdx];
        wave.radius += 8;
        wave.alpha *= 0.94;

        // Expanding signal ring
        ctx.strokeStyle = `rgba(198, 255, 0, ${wave.alpha * 0.8})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary signal ring
        ctx.strokeStyle = `rgba(0, 240, 255, ${wave.alpha * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, Math.max(wave.radius - 12, 0), 0, Math.PI * 2);
        ctx.stroke();

        // Displace nearby data points along the expanding signal.
        particles.forEach((p) => {
          const sDx = p.x - wave.x;
          const sDy = p.y - wave.y;
          const sDist = Math.sqrt(sDx * sDx + sDy * sDy);
          if (Math.abs(sDist - wave.radius) < 40 && sDist > 0) {
            p.vx += (sDx / sDist) * 5.5 * wave.alpha;
            p.vy += (sDy / sDist) * 5.5 * wave.alpha;
          }
        });

        if (wave.radius > wave.maxRadius || wave.alpha < 0.02) {
          signalWaves.splice(sIdx, 1);
        }
      }

      // Horizontal tactical laser scan
      scanY = (scanY + 3.5) % height;
      ctx.strokeStyle = 'rgba(198, 255, 0, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();

      // Update and render connected product data points.
      particles.forEach((p, idx) => {
        p.angle += p.angularSpeed;

        const targetX = cX + Math.cos(p.angle) * p.radius;
        const targetY = cY + Math.sin(p.angle) * p.radius;

        const dx = targetX - mX;
        const dy = targetY - mY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          p.vx += (dx / dist) * force * 3;
          p.vy += (dy / dist) * force * 3;
        }

        p.vx += (targetX - p.x) * 0.05;
        p.vy += (targetY - p.y) * 0.05;
        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        ctx.save();
        ctx.translate(p.x, p.y);

        const color =
          idx % 2 === 0
            ? `rgba(0, 240, 255, ${p.alpha})`
            : `rgba(198, 255, 0, ${p.alpha})`;

        ctx.fillStyle = color;

        if (p.type === 'signal') {
          ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Connect nearby particles with luminous filaments
        for (let j = idx + 1; j < Math.min(idx + 5, particles.length); j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < 85) {
            ctx.strokeStyle = `rgba(198, 255, 0, ${0.15 * (1 - cdist / 85)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, [isCompact, reducedMotion]);

  if (!isVisible) return null;

  const displayCount = Math.min(Math.round(progress), 100);
  const TOTAL_SEGMENTS = 24;
  const activeSegments = Math.round((progress / 100) * TOTAL_SEGMENTS);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: phase === 'blast' ? 0 : 1,
          scale: phase === 'blast' ? 1.08 : 1,
          filter: phase === 'blast' ? 'brightness(2) blur(12px)' : 'brightness(1) blur(0px)',
          clipPath:
            phase === 'blast'
              ? 'inset(50% 0% 50% 0%)'
              : 'inset(0% 0% 0% 0%)',
        }}
        transition={{ duration: 0.55, ease: [0.87, 0, 0.13, 1] }}
        onClick={handleCanvasClick}
        className="fixed inset-0 z-[99999] overflow-hidden bg-black select-none pointer-events-auto cursor-default sm:cursor-crosshair"
      >
        {/* Generative Interactive Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Anime Speedline Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.14]"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, transparent 40%, rgba(198, 255, 0, 0.08) 100%), linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.85) 50%)',
            backgroundSize: '100% 100%, 100% 3px',
          }}
        />

        {/* Product analytics grid markers */}
        <div
          className="absolute top-10 left-10 w-24 h-24 pointer-events-none opacity-20 hidden md:block"
          style={{
            backgroundImage: 'radial-gradient(#C6FF00 1.5px, transparent 1.5px)',
            backgroundSize: '8px 8px',
          }}
        />
        <div
          className="absolute bottom-10 right-10 w-24 h-24 pointer-events-none opacity-20 hidden md:block"
          style={{
            backgroundImage: 'radial-gradient(#00f0ff 1.5px, transparent 1.5px)',
            backgroundSize: '8px 8px',
          }}
        />

        {/* ============================================================== */}
        {/* VERTICAL ARCHITECTURAL RULER SCALES                            */}
        {/* ============================================================== */}
        <div className="absolute left-2 inset-y-16 pointer-events-none z-20 hidden md:flex flex-col justify-between text-[9px] font-mono text-white/20 select-none">
          {['00%', '20%', '40%', '60%', '80%', '100%'].map((val, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="w-2 h-px bg-white/30" />
              <span>{val}</span>
            </div>
          ))}
        </div>

        <div className="absolute right-2 inset-y-16 pointer-events-none z-20 hidden md:flex flex-col justify-between text-[9px] font-mono text-white/20 select-none items-end">
          {['LVL.01', 'LVL.02', 'LVL.03', 'LVL.04', 'LVL.05', 'MAX'].map((val, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span>{val}</span>
              <span className="w-2 h-px bg-white/30" />
            </div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* TELETECH KINETIC MARQUEE TICKERS (TOP & BOTTOM)               */}
        {/* ============================================================== */}
        <div className="absolute top-0 left-0 right-0 z-20 overflow-hidden border-b border-white/10 bg-black/70 backdrop-blur-md py-1">
          <div className="animate-marquee-left whitespace-nowrap text-[10px] font-mono tracking-widest text-white/50 uppercase">
            <span>{TOP_TICKER_TEXT}</span>
            <span>{TOP_TICKER_TEXT}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/10 bg-black/70 backdrop-blur-md py-1">
          <div className="animate-marquee-right whitespace-nowrap text-[10px] font-mono tracking-widest text-accent/60 uppercase">
            <span>{BOTTOM_TICKER_TEXT}</span>
            <span>{BOTTOM_TICKER_TEXT}</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* HUD CROSSHAIR RETICLES                                         */}
        {/* ============================================================== */}
        <div className="absolute inset-0 pointer-events-none z-15 flex items-center justify-center">
          <div className="absolute w-36 h-px bg-white/10" />
          <div className="absolute h-36 w-px bg-white/10" />
          <div className="absolute -top-8 -left-8 h-2 w-2 rounded-full border border-accent/40" />
          <div className="absolute -top-8 -right-8 h-2 w-2 rounded-full border border-accent/40" />
          <div className="absolute -bottom-8 -left-8 h-2 w-2 rounded-full border border-accent/40" />
          <div className="absolute -bottom-8 -right-8 h-2 w-2 rounded-full border border-accent/40" />
        </div>

        {/* ============================================================== */}
        {/* MAIN HUD CONTENT LAYER                                         */}
        {/* ============================================================== */}
        <div className="relative z-25 h-full w-full flex flex-col justify-between p-4 sm:p-10 pt-12 pb-12 text-white">
          {/* TOP TACTICAL CORNER BRACKETS & TELEMETRY */}
          <div className="flex items-start justify-between w-full">
            {/* Top-Left: System Telemetry */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg border border-accent/40 bg-accent/10 flex items-center justify-center text-accent shadow-[0_0_15px_rgba(198,255,0,0.25)]">
                <Workflow className="w-4 h-4 text-accent" strokeWidth={1.7} />
              </div>
              <div className="flex flex-col font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  <span className="max-w-[52vw] truncate text-[10px] font-bold tracking-[0.1em] text-accent uppercase sm:max-w-none sm:text-xs sm:tracking-widest">
                    PRODUCT WORLD // INITIALIZING
                  </span>
                </div>
                <span className="hidden sm:block text-[10px] text-white/50 tracking-wider">
                  CANDIDATE: RISHABH RAI &middot; APM / PRODUCT SENSE
                </span>
                <span className="hidden sm:block text-[9px] text-accent/70 tracking-widest uppercase">
                  [ PRODUCT STRATEGY // EXECUTION ]
                </span>
              </div>
            </div>

            {/* Top-Right: Live Cursor Telemetry & Skip Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md text-[10px] font-mono text-white/60">
                <Activity className="w-3 h-3 text-accent animate-pulse" />
                <span>
                  X:{mouseCoords.x} Y:{mouseCoords.y}
                </span>
                <span className="text-white/30">&middot;</span>
                <span className="text-accent font-semibold">60 FPS</span>
              </div>

              <button
                onClick={handleFinish}
                className="px-4 py-1.5 rounded-full border border-accent bg-accent/15 hover:bg-accent text-accent hover:text-black text-xs font-bold font-mono tracking-widest uppercase transition-all duration-200 shadow-[0_0_20px_rgba(198,255,0,0.3)] hover:scale-105"
              >
                SKIP [ESC] &rarr;
              </button>
            </div>
          </div>

          {/* ============================================================== */}
          {/* PRODUCT WORLD SIGNAL MONITOR                                   */}
          {/* ============================================================== */}
          <div className="relative my-auto flex items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center text-center max-w-4xl px-2">
              <div className="relative mb-3 flex flex-col items-center">
                <motion.div
                  className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-black/60 px-3 py-1.5 font-mono text-[9px] font-bold tracking-[0.16em] text-accent shadow-[0_0_20px_rgba(198,255,0,0.08)] sm:text-[10px]"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  PRODUCT WORLD <span className="text-white/30">/</span> LIVE SIGNALS
                </motion.div>

                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative mb-2 flex h-[76px] w-[76px] items-center justify-center sm:h-[88px] sm:w-[88px]"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border border-accent/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  >
                    <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
                  </motion.div>
                  <motion.div
                    className="absolute inset-[7px] rounded-full border border-dashed border-cyan-300/25"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/30 bg-[#0b1110] text-accent shadow-[0_0_28px_rgba(198,255,0,0.16)] sm:h-12 sm:w-12">
                    <Workflow className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.6} />
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={signalIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[9px] font-semibold tracking-[0.14em] text-white/55 sm:text-[10px]"
                  >
                    {PRODUCT_SIGNALS[signalIndex]}
                  </motion.span>
                </AnimatePresence>

                <div className="mt-3 flex items-center gap-2 text-[8px] font-mono font-bold tracking-[0.14em] text-white/35 sm:text-[9px]">
                  <span className="rounded border border-white/10 bg-white/[0.03] px-2 py-1">DISCOVER</span>
                  <span className="h-px w-3 bg-accent/40" />
                  <span className="rounded border border-white/10 bg-white/[0.03] px-2 py-1">DEFINE</span>
                  <span className="h-px w-3 bg-accent/40" />
                  <span className="rounded border border-white/10 bg-white/[0.03] px-2 py-1">DELIVER</span>
                </div>
              </div>

              {/* Speedometer Ring & Percentage Counter */}
              <div className="relative mb-4">
                {/* Rotating Outer Azimuth Ring */}
                <motion.div
                  className="absolute -inset-2.5 rounded-full border border-dashed border-accent/20 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                />

                <svg className="w-28 h-28 sm:w-36 sm:h-36 -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="44%"
                    className="stroke-white/10"
                    strokeWidth="2.5"
                    fill="transparent"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="48%"
                    className="stroke-accent/20"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    fill="transparent"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="44%"
                    className="stroke-accent"
                    strokeWidth="3.5"
                    strokeDasharray="301"
                    strokeDashoffset={301 - (301 * progress) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(198,255,0,0.9))',
                      transition: 'stroke-dashoffset 0.04s linear',
                    }}
                  />
                </svg>

                {/* High-Velocity Monospace Counter */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="font-mono text-3xl sm:text-5xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                    {String(displayCount).padStart(3, '0')}
                  </span>
                  <span className="text-[9px] font-mono text-accent uppercase font-bold tracking-widest mt-0.5">
                    % READY
                  </span>
                </div>
              </div>

              {/* Tactical Eyebrow Category */}
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-8 bg-accent/60" />
                <span className="text-[11px] sm:text-xs font-mono tracking-[0.35em] uppercase text-accent font-bold">
                  PRODUCT MANAGEMENT &middot; PRODUCT SENSE &middot; GTM
                </span>
                <span className="h-px w-8 bg-accent/60" />
              </div>

              {/* Monumental Chromatic Aberration Typography */}
              <div className="relative select-none my-1">
                <h1
                  className="absolute inset-0 hidden font-display font-black text-7xl uppercase leading-none tracking-tighter text-accent opacity-20 blur-[1px] pointer-events-none transition-transform duration-75 sm:block md:text-8xl lg:text-9xl"
                  style={{
                    transform: `translate(${-mouseOffset.x - 3}px, ${-mouseOffset.y - 1}px)`,
                  }}
                >
                  {NAME_FIRST} {NAME_LAST}
                </h1>

                <h1
                  className="absolute inset-0 hidden font-display font-black text-7xl uppercase leading-none tracking-tighter text-cyan-300 opacity-15 blur-[1px] pointer-events-none transition-transform duration-75 sm:block md:text-8xl lg:text-9xl"
                  style={{
                    transform: `translate(${mouseOffset.x + 3}px, ${mouseOffset.y + 1}px)`,
                  }}
                >
                  {NAME_FIRST} {NAME_LAST}
                </h1>

                <h1 className="relative font-display font-black text-[clamp(1.8rem,9vw,3rem)] sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-none text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                  {NAME_FIRST}{' '}
                  <span className="text-accent italic drop-shadow-[0_0_40px_rgba(198,255,0,0.7)]">
                    {NAME_LAST}
                  </span>
                </h1>
              </div>

              {/* Multi-Stage Segmented Telemetry Bar */}
              <div className="w-full max-w-md mt-4 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 h-2 p-0.5 rounded-full bg-white/[0.05] border border-white/10">
                  {Array.from({ length: TOTAL_SEGMENTS }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 rounded-sm transition-all duration-150 ${
                        idx < activeSegments
                          ? 'bg-accent shadow-[0_0_6px_rgba(198,255,0,0.8)]'
                          : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>

                {/* Milestone Checkpoints */}
                <div className="w-full flex justify-between font-mono text-[8px] tracking-normal text-white/50 sm:text-[9px] sm:tracking-wider">
                  {MILESTONES.map((m, i) => (
                    <span
                      key={i}
                      className={`flex flex-col items-center gap-0.5 transition-colors duration-200 sm:block ${
                        progress >= m.threshold ? 'text-accent font-bold' : ''
                      }`}
                    >
                      <span className="sm:hidden">[{i + 1}]</span>
                      <span className="sm:hidden">{m.shortLabel}</span>
                      <span className="hidden sm:inline">
                        [{i + 1}] {m.label}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Kinetic Rotating Tactical Pillars */}
              <div className="h-9 mt-4 overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pillarIndex}
                    initial={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -24, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-white/90 font-bold">
                      {PILLARS[pillarIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BOTTOM TACTICAL CORNER BRACKETS & TELEMETRY STREAM             */}
          {/* ============================================================== */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 font-mono text-xs">
            {/* Live Data Telemetry Waveform + Stream */}
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex gap-1 items-end h-5 px-2 py-1 rounded bg-white/[0.03] border border-white/10">
                {[35, 75, 45, 100, 60, 85, 40, 95, 55, 70, 90, 50].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-1 bg-accent rounded-sm shadow-[0_0_6px_rgba(198,255,0,0.6)]"
                    animate={{
                      height: [`${h * 0.15}%`, `${h}%`, `${h * 0.35}%`],
                    }}
                    transition={{
                      duration: 0.45 + (i % 4) * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>

              <div className="flex min-w-0 flex-col">
                <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-widest">
                  <Terminal className="w-3 h-3 text-accent" />
                  <span>Real-time Telemetry Stream</span>
                </div>
                <span className="block max-w-[70vw] truncate text-accent text-[9px] sm:max-w-none sm:text-[11px] font-bold tracking-wider">
                  &gt; {TELEMETRY_STREAM[streamIndex]}
                </span>
              </div>
            </div>

            {/* Product framework and interaction hint */}
            <div className="hidden sm:block text-left sm:text-right text-[10px] text-white/40 tracking-wider font-mono">
              <div className="flex items-center sm:justify-end gap-1.5 text-white/60">
                <Activity className="w-3 h-3 text-accent" />
                <span>DISCOVERY &middot; PRODUCT STRATEGY &middot; GTM</span>
              </div>
              <span className="text-accent/80 font-bold">
                [ CUSTOMER SIGNALS // PRODUCT OUTCOMES ]
              </span>
              <br />
              <span className="text-white/40">CLICK TO TRACE A SIGNAL &middot; ESC TO ENTER</span>
            </div>
          </div>
        </div>

        {/* Anamorphic Horizontal Light Blast on Exit */}
        {phase === 'blast' && (
          <motion.div
            initial={{ opacity: 1, scaleY: 2.5, scaleX: 0.05 }}
            animate={{ opacity: 0, scaleY: 0, scaleX: 3.5 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 z-[60] bg-white mix-blend-screen pointer-events-none"
            style={{
              boxShadow:
                '0 0 120px 40px #C6FF00, 0 0 240px 80px #2997FF, 0 0 350px 120px #FFFFFF',
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
