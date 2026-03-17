'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 120;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // Track scroll using framer-motion over the entire page
  const { scrollYProgress } = useScroll();
  
  // Map scroll progress (0 to 1) to frame index (0 to 119)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // Preload all images
    const preloadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits like 000, 001, etc.
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(preloadedImages);
          // Draw first frame immediately
          drawFrame(0, preloadedImages);
        }
      };
      
      preloadedImages.push(img);
    }
  }, []);

  const drawFrame = (index: number, imgArray: HTMLImageElement[]) => {
    if (!canvasRef.current || !imgArray[index]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match display size exactly for sharpness
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const img = imgArray[index];
    
    // Calculate aspect ratio covering the canvas (like object-fit: cover)
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
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length === FRAME_COUNT) {
      drawFrame(Math.floor(latest), images);
    }
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (images.length === FRAME_COUNT) {
        drawFrame(Math.floor(frameIndex.get()), images);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, frameIndex]);

  return (
    <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(13,17,23,0.8)_100%)]" />
    </div>
  );
}
