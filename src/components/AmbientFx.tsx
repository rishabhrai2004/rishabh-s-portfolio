'use client';

export default function AmbientFx() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      <div className="absolute inset-0 grain-overlay opacity-[0.14]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_40%,rgba(0,0,0,0.38)_100%)]" />
    </div>
  );
}
