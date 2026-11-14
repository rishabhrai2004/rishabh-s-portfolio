'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import AmbientFx from '@/components/AmbientFx';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Chatbot isLoading={isLoading} />
      
      <main
        className="relative min-h-screen bg-background w-full overflow-x-hidden selection:bg-accent selection:text-black transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: isLoading ? 0.2 : 1,
          transform: isLoading ? 'scale(0.98)' : 'scale(1)',
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
      >
        {/* Scrolly sequence renders smoothly in background */}
        <ScrollyCanvas />
        <AmbientFx />
        
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Stats />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Contact />
        </div>
      </main>
    </>
  );
}
