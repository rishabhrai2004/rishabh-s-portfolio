'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 120;
const BATCH_SIZE = 15;
const MAX_DPR = 1.5; // Cap pixel ratio to prevent huge canvas on HiDPI

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const bitmapsRef = useRef<(ImageBitmap | null)[]>(new Array(FRAME_COUNT).fill(null));
  const lastDrawnRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);
  const pendingRef = useRef<number>(0);
  const sizedRef = useRef(false);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll();
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Setup canvas context once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctxRef.current = canvas.getContext('2d', {
      alpha: false,
      desynchronized: true,
    });
  }, []);

  // Size canvas once (not every frame)
  const ensureSize = useCallback(() => {
    if (sizedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    sizedRef.current = true;
  }, []);

  const drawFrame = useCallback((index: number) => {
    const bitmap = bitmapsRef.current[index];
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !ctx || !bitmap) return;

    ensureSize();

    const cw = canvas.width;
    const ch = canvas.height;
    const bw = bitmap.width;
    const bh = bitmap.height;

    const canvasRatio = cw / ch;
    const imgRatio = bw / bh;

    let dw, dh, dx, dy;
    if (canvasRatio > imgRatio) {
      dw = cw;
      dh = cw / imgRatio;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      dh = ch;
      dw = ch * imgRatio;
      dy = 0;
      dx = (cw - dw) / 2;
    }

    ctx.drawImage(bitmap, dx, dy, dw, dh);
    lastDrawnRef.current = index;
  }, [ensureSize]);

  const scheduleFrame = useCallback((index: number) => {
    pendingRef.current = index;
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const idx = pendingRef.current;
      if (idx === lastDrawnRef.current) return;

      if (bitmapsRef.current[idx]) {
        drawFrame(idx);
      } else {
        for (let i = idx - 1; i >= 0; i--) {
          if (bitmapsRef.current[i]) {
            drawFrame(i);
            break;
          }
        }
      }
    });
  }, [drawFrame]);

  // Load images and convert to ImageBitmap for GPU-accelerated drawing
  useEffect(() => {
    let cancelled = false;

    const loadBitmap = async (i: number): Promise<void> => {
      if (bitmapsRef.current[i]) return;

      const paddedIndex = i.toString().padStart(3, '0');
      const url = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;

      try {
        const res = await fetch(url);
        const blob = await res.blob();
        if (cancelled) return;

        const bitmap = await createImageBitmap(blob);
        if (cancelled) {
          bitmap.close();
          return;
        }
        bitmapsRef.current[i] = bitmap;
      } catch (err) {
        console.error(`Frame ${i} failed:`, err);
      }
    };

    const loadAll = async () => {
      // First frame priority
      await loadBitmap(0);
      if (cancelled) return;
      setReady(true);
      drawFrame(0);

      // Rest in batches
      for (let start = 1; start < FRAME_COUNT; start += BATCH_SIZE) {
        const end = Math.min(start + BATCH_SIZE, FRAME_COUNT);
        const batch = [];
        for (let i = start; i < end; i++) batch.push(loadBitmap(i));
        await Promise.all(batch);
        if (cancelled) return;
      }
    };

    loadAll();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Clean up bitmaps
      bitmapsRef.current.forEach(b => b?.close());
    };
  }, [drawFrame]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    scheduleFrame(Math.floor(latest));
  });

  // Handle resize
  useEffect(() => {
    const onResize = () => {
      sizedRef.current = false; // force re-measure
      const idx = Math.floor(frameIndex.get());
      if (bitmapsRef.current[idx]) drawFrame(idx);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [frameIndex, drawFrame]);

  return (
    <div
      className={`fixed inset-0 z-0 h-screen w-screen pointer-events-none transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
      style={{ contain: 'strict' }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ willChange: 'contents' }}
      />
      <div className="absolute inset-0 bg-black/60 md:bg-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.8)_100%)]" />
    </div>
  );
}
