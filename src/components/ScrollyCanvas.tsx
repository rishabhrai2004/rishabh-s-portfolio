'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 120;
const BATCH_SIZE = 10; // Load 10 images at a time to avoid network flooding

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
  
  // Track scroll using framer-motion over the entire page
  const { scrollYProgress } = useScroll();
  
  // Map scroll progress (0 to 1) to frame index (0 to 119)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const drawFrame = useCallback((index: number) => {
    const img = imagesRef.current[index];
    if (!canvasRef.current || !img) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    const targetW = rect.width * dpr;
    const targetH = rect.height * dpr;
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;
    
    const canvasRatio = cw / ch;
    const imgRatio = iw / ih;
    
    let renderW, renderH, x, y;

    if (canvasRatio > imgRatio) {
      renderW = cw;
      renderH = cw / imgRatio;
      x = 0;
      y = (ch - renderH) / 2;
    } else {
      renderH = ch;
      renderW = ch * imgRatio;
      y = 0;
      x = (cw - renderW) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, renderW, renderH);
  }, []);

  // Preload strategy
  useEffect(() => {
    let isCancelled = false;

    const loadImg = (i: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current[i]) return resolve(imagesRef.current[i]!);
        const img = new Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
        img.onload = () => {
          if (isCancelled) return;
          imagesRef.current[i] = img;
          resolve(img);
        };
        img.onerror = reject;
      });
    };

    const loadSequentially = async () => {
      // 1. Load first frame as high priority
      try {
        await loadImg(0);
        if (isCancelled) return;
        setFirstFrameLoaded(true);
        drawFrame(0);
        
        // 2. Load the rest in small batches
        const remainingIndices = Array.from({ length: FRAME_COUNT - 1 }, (_, i) => i + 1);
        
        for (let i = 0; i < remainingIndices.length; i += BATCH_SIZE) {
          const batch = remainingIndices.slice(i, i + BATCH_SIZE);
          await Promise.all(batch.map(index => loadImg(index)));
          if (isCancelled) return;
        }
      } catch (err) {
        console.error("Failed to load sequence:", err);
      }
    };

    loadSequentially();

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.floor(latest);
    if (imagesRef.current[idx]) {
      drawFrame(idx);
    } else {
      // Fallback to closest loaded frame
      for (let i = idx - 1; i >= 0; i--) {
        if (imagesRef.current[i]) {
          drawFrame(i);
          break;
        }
      }
    }
  });

  useEffect(() => {
    const handleResize = () => {
      const idx = Math.floor(frameIndex.get());
      if (imagesRef.current[idx]) {
        drawFrame(idx);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [frameIndex, drawFrame]);

  return (
    <div className={`fixed inset-0 z-0 h-screen w-screen pointer-events-none transition-opacity duration-1000 ${firstFrameLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,7,18,0.8)_100%)]" />
    </div>
  );
}
