'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Bespoke desktop cursor: an exact dot plus a smoothly-lagging ring that
 * expands over interactive elements. Activates only on fine-pointer devices
 * and bows out for users who prefer reduced motion, so the native cursor
 * stays untouched everywhere it should.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let visible = false;

    const interactiveSelector = 'a, button, input, textarea, [role="button"], .cursor-target';

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      const target = e.target as Element | null;
      const isInteractive = !!target?.closest?.(interactiveSelector);
      ring.dataset.active = isInteractive ? 'true' : 'false';
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onDown = () => { ring.dataset.press = 'true'; };
    const onUp = () => { ring.dataset.press = 'false'; };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-1.5 w-1.5 rounded-full bg-accent opacity-0 mix-blend-difference"
        style={{ transition: 'opacity 0.3s ease' }}
      />
      <div
        ref={ringRef}
        data-active="false"
        data-press="false"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[10000] h-9 w-9 rounded-full border border-white/50 opacity-0 mix-blend-difference"
        style={{ transition: 'opacity 0.3s ease, width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease' }}
      />
    </>
  );
}
