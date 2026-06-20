import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';
export const ogAlt = `${SITE.name} — ${SITE.role}`;

/**
 * Branded share card rendered at request time. No external fonts so it never
 * fails to build; design carries on color, scale, and the accent system used
 * across the site.
 */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#030712',
          backgroundImage:
            'radial-gradient(circle at 82% 12%, rgba(198,255,0,0.18), rgba(3,7,18,0) 42%), radial-gradient(circle at 6% 96%, rgba(80,110,255,0.14), rgba(3,7,18,0) 45%)',
          color: '#F9FAFB',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 56, height: 4, backgroundColor: '#C6FF00' }} />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: '#C6FF00',
              fontWeight: 700,
            }}
          >
            {SITE.role}
          </div>
        </div>

        {/* Name */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 150,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            RISHABH
          </div>
          <div
            style={{
              fontSize: 150,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -4,
              fontStyle: 'italic',
              color: '#C6FF00',
            }}
          >
            RAI
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              color: 'rgba(249,250,251,0.65)',
              maxWidth: 760,
            }}
          >
            Bridging product intuition with data-driven precision.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            RR<span style={{ color: '#C6FF00' }}>.</span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
