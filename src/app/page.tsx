import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import ScrollyCanvas from '@/components/ScrollyCanvas';

export default function Home() {
  return (
    <main className="min-h-screen bg-background w-full overflow-x-hidden selection:bg-accent selection:text-black">
      <ScrollyCanvas />
      
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
  );
}
