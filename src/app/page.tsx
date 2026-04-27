'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
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
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      <Chatbot isLoading={isLoading} />
      
      <main
        className="relative min-h-screen bg-background w-full overflow-x-hidden selection:bg-accent selection:text-black"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out',
          pointerEvents: isLoading ? 'none' : 'auto',
        }}
      >
        {!isLoading && <ScrollyCanvas />}
        {!isLoading && <AmbientFx />}
        
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
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
