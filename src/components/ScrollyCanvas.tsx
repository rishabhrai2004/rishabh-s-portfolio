'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 120;
const MAX_CONCURRENT_LOADS = 3;
const MOBILE_CACHE_SIZE = 8;
const DESKTOP_CACHE_SIZE = 18;
const HIGH_PERFORMANCE_CACHE_SIZE = 36;
const MAX_DPR = 1.5;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const bitmapsRef = useRef<(ImageBitmap | null)[]>(new Array(FRAME_COUNT).fill(null));
  const frameBlobsRef = useRef<(Blob | null)[]>(new Array(FRAME_COUNT).fill(null));
  const frameBlobPromisesRef = useRef<(Promise<Blob> | null)[]>(new Array(FRAME_COUNT).fill(null));
  const lastDrawnRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);
  const pendingRef = useRef<number>(0);
  const requestFramesRef = useRef<(index: number) => void>(() => {});
  const cacheUseRef = useRef<number[]>(new Array(FRAME_COUNT).fill(0));
  const cacheClockRef = useRef(0);
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const width = Math.round(rect.width * dpr);
    const height = Math.round(rect.height * dpr);
    if (sizedRef.current && canvas.width === width && canvas.height === height) return;

    canvas.width = width;
    canvas.height = height;
    sizedRef.current = true;
  }, []);

  const drawFrame = useCallback((index: number) => {
    const bitmap = bitmapsRef.current[index];
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !ctx || !bitmap) return;
    if (!bitmap.width || !bitmap.height) {
      bitmapsRef.current[index] = null;
      return;
    }

    cacheUseRef.current[index] = ++cacheClockRef.current;
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
      if (bitmapsRef.current[idx]) {
        drawFrame(idx);
      } else {
        let nearestIndex = -1;
        let nearestDistance = FRAME_COUNT;
        for (let i = 0; i < FRAME_COUNT; i++) {
          if (bitmapsRef.current[i] && Math.abs(i - idx) < nearestDistance) {
            nearestIndex = i;
            nearestDistance = Math.abs(i - idx);
          }
        }
        if (nearestIndex >= 0) drawFrame(nearestIndex);
        requestFramesRef.current(idx);
      }
    });
  }, [drawFrame]);

  // Keep only nearby decoded frames in memory; the original WebP files stay full quality.
  useEffect(() => {
    let cancelled = false;
    const currentBitmaps = bitmapsRef.current;
    const cacheUse = cacheUseRef.current;
    const inFlight = new Set<number>();
    const queued = new Set<number>();
    const queue: number[] = [];
    let activeLoads = 0;
    let desiredIndex = 0;
    let nextPrefetchIndex = 0;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const highPerformance =
      !device.connection?.saveData &&
      ((device.deviceMemory ?? 0) >= 8 ||
        (!isMobile && navigator.hardwareConcurrency >= 8));
    const cacheLimit = highPerformance
      ? HIGH_PERFORMANCE_CACHE_SIZE
      : isMobile
        ? MOBILE_CACHE_SIZE
        : DESKTOP_CACHE_SIZE;
    const maxConcurrentLoads = highPerformance
      ? 6
      : isMobile
        ? 2
        : MAX_CONCURRENT_LOADS;

    const trimCache = (protectedIndex: number) => {
      let cachedCount = currentBitmaps.reduce((count, bitmap) => count + (bitmap ? 1 : 0), 0);
      while (cachedCount > cacheLimit) {
        let oldestIndex = -1;
        let oldestUse = Number.POSITIVE_INFINITY;
        for (let i = 0; i < currentBitmaps.length; i++) {
          if (
            currentBitmaps[i] &&
            i !== protectedIndex &&
            i !== lastDrawnRef.current &&
            cacheUse[i] < oldestUse
          ) {
            oldestIndex = i;
            oldestUse = cacheUse[i];
          }
        }
        if (oldestIndex < 0) return;
        currentBitmaps[oldestIndex]?.close();
        currentBitmaps[oldestIndex] = null;
        cacheUse[oldestIndex] = 0;
        cachedCount--;
      }
    };

    const loadBitmap = async (index: number): Promise<void> => {
      const paddedIndex = index.toString().padStart(3, '0');
      const url = `/sequence/frame_${paddedIndex}_delay-0.066s.webp`;

      try {
        let blob = frameBlobsRef.current[index];
        if (!blob) {
          let blobPromise = frameBlobPromisesRef.current[index];
          if (!blobPromise) {
            blobPromise = fetch(url).then(async res => {
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const fetchedBlob = await res.blob();
              frameBlobsRef.current[index] = fetchedBlob;
              return fetchedBlob;
            });
            frameBlobPromisesRef.current[index] = blobPromise;
          }
          try {
            blob = await blobPromise;
          } finally {
            if (frameBlobPromisesRef.current[index] === blobPromise) {
              frameBlobPromisesRef.current[index] = null;
            }
          }
        }
        if (cancelled) return;

        const bitmap = await createImageBitmap(blob);
        if (cancelled) {
          bitmap.close();
          return;
        }
        currentBitmaps[index] = bitmap;
        cacheUse[index] = ++cacheClockRef.current;
        trimCache(desiredIndex);
        if (index === 0 && !cancelled) {
          setReady(true);
          drawFrame(0);
        }
        if (pendingRef.current === index) scheduleFrame(index);
      } catch (err) {
        console.error(`Frame ${index} failed to load:`, err);
      }
    };

    const pumpQueue = () => {
      while (!cancelled && activeLoads < maxConcurrentLoads && queue.length > 0) {
        const index = queue.shift();
        if (index === undefined) break;
        queued.delete(index);
        if (currentBitmaps[index] || inFlight.has(index)) continue;

        inFlight.add(index);
        activeLoads++;
        void loadBitmap(index).finally(() => {
          inFlight.delete(index);
          activeLoads--;
          if (highPerformance && queue.length === 0) {
            while (
              nextPrefetchIndex < FRAME_COUNT &&
              (currentBitmaps[nextPrefetchIndex] ||
                inFlight.has(nextPrefetchIndex) ||
                queued.has(nextPrefetchIndex))
            ) {
              nextPrefetchIndex++;
            }
            if (nextPrefetchIndex < FRAME_COUNT) {
              queue.push(nextPrefetchIndex);
              queued.add(nextPrefetchIndex);
              nextPrefetchIndex++;
            }
          }
          pumpQueue();
        });
      }
    };

    const requestAround = (index: number) => {
      desiredIndex = Math.max(0, Math.min(FRAME_COUNT - 1, index));
      const previousQueued = queue.splice(0);
      previousQueued.forEach(queuedIndex => queued.delete(queuedIndex));

      const direction = index >= lastDrawnRef.current ? 1 : -1;
      const priorities = [
        desiredIndex,
        desiredIndex + direction,
        desiredIndex + direction * 2,
        desiredIndex + direction * 3,
        desiredIndex + direction * 4,
        desiredIndex - direction,
        desiredIndex + direction * 5,
        desiredIndex - direction * 2,
        desiredIndex + direction * 6,
        desiredIndex - direction * 3,
      ];

      priorities.forEach(priorityIndex => {
        if (
          priorityIndex >= 0 &&
          priorityIndex < FRAME_COUNT &&
          !currentBitmaps[priorityIndex] &&
          !inFlight.has(priorityIndex) &&
          !queued.has(priorityIndex)
        ) {
          queue.push(priorityIndex);
          queued.add(priorityIndex);
        }
      });
      pumpQueue();
    };

    requestFramesRef.current = requestAround;
    requestAround(0);

    return () => {
      cancelled = true;
      requestFramesRef.current = () => {};
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Clean up bitmaps
      currentBitmaps.forEach((bitmap, index) => {
        bitmap?.close();
        currentBitmaps[index] = null;
        cacheUse[index] = 0;
      });
    };
  }, [drawFrame, frameIndex, scheduleFrame]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.floor(latest);
    requestFramesRef.current(index);
    scheduleFrame(index);
  });

  // Handle resize
  useEffect(() => {
    const onResize = () => {
      sizedRef.current = false; // force re-measure
      const idx = lastDrawnRef.current >= 0
        ? lastDrawnRef.current
        : Math.floor(frameIndex.get());
      if (bitmapsRef.current[idx]) drawFrame(idx);
    };
    const canvas = canvasRef.current;
    const observer = canvas?.parentElement
      ? new ResizeObserver(onResize)
      : null;
    if (canvas?.parentElement) observer?.observe(canvas.parentElement);
    window.addEventListener('resize', onResize);
    window.visualViewport?.addEventListener('resize', onResize);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
    };
  }, [frameIndex, drawFrame]);

  return (
    <div
      className={`fixed inset-0 z-0 h-screen w-full pointer-events-none transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
      style={{ contain: 'strict', height: '100dvh' }}
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ willChange: 'contents' }}
      />
      <div className="absolute inset-0 bg-black/80 sm:bg-black/60 md:bg-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.8)_100%)]" />
    </div>
  );
}
