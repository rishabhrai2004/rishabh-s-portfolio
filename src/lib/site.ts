/**
 * Single source of truth for site-wide identity + URLs.
 * Set NEXT_PUBLIC_SITE_URL in the deploy environment so canonical/OG/sitemap
 * URLs resolve to the real domain instead of localhost.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const SITE = {
  name: 'Rishabh Rai',
  role: 'Product Manager',
  title: 'Rishabh Rai — Product Manager',
  description:
    'Product Management candidate at KIIT — product discovery, user research, and analytics-led decisions, with AI-enabled product builds using LLM APIs and rapid prototyping. Building technology products with measurable user and business impact.',
  url: SITE_URL,
  email: 'rishabhraittt@gmail.com',
  phone: '+91 6000032216',
  linkedin: 'https://www.linkedin.com/in/rishabh-rai-961937280/',
  github: 'https://github.com/rishabhrai2004',
} as const;
