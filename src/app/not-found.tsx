import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background text-white flex items-center justify-center px-6">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-accent/5 blur-[220px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-30" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-accent tracking-[0.4em] text-[10px] md:text-xs font-bold uppercase mb-8">
          Error // Lost Signal
        </p>

        <h1 className="font-display font-black tracking-tighter leading-none text-[28vw] sm:text-[20vw] md:text-[14rem]">
          4<span className="italic text-accent">0</span>4
        </h1>

        <p className="mt-6 max-w-md text-white/60 text-sm md:text-base leading-relaxed">
          This page drifted out of sequence. The frame you&apos;re looking for doesn&apos;t exist
          &mdash; let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          className="btn-shine group mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-black shadow-[0_0_30px_var(--accent-muted)] transition-transform duration-300 hover:scale-[1.03]"
        >
          <span className="relative z-[2]">Return Home</span>
          <span className="relative z-[2] transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>
      </div>
    </main>
  );
}
