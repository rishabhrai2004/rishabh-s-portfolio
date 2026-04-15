import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Rishabh Rai | Product & Data Analyst',
  description: 'Product Analyst & Data Analyst portfolio — bridging product strategy with data-driven decision making.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-background text-white selection:bg-accent selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
