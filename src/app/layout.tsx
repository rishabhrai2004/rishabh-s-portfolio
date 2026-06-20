import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/app/globals.css';
import { SITE, SITE_URL } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: `${SITE.name} Portfolio`,
  authors: [{ name: SITE.name, url: SITE.linkedin }],
  creator: SITE.name,
  keywords: [
    'Rishabh Rai',
    'Product Manager',
    'Product Management',
    'Associate Product Manager',
    'Product Strategy',
    'User Research',
    'Power BI',
    'SQL',
    'Python',
    'A/B Testing',
    'RICE Prioritization',
    'KIIT',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: `${SITE.name} — Portfolio`,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    creator: '@rishabhrai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'portfolio',
};

export const viewport: Viewport = {
  themeColor: '#030712',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  jobTitle: SITE.role,
  description: SITE.description,
  url: SITE_URL,
  email: `mailto:${SITE.email}`,
  sameAs: [SITE.linkedin, SITE.github],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Kalinga Institute of Industrial Technology (KIIT University)',
  },
  knowsAbout: [
    'Product Management',
    'Product Strategy',
    'User Research',
    'Feature Prioritization',
    'A/B Testing',
    'Funnel Analysis',
    'Power BI',
    'SQL',
    'Python',
    'Generative AI',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-background text-white selection:bg-accent selection:text-black`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
