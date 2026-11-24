/**
 * Single source of truth for site-wide identity + URLs.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const SITE = {
  name: 'Rishabh Rai',
  role: 'Product Manager',
  title: 'Rishabh Rai — Product Management, Product Sense & GTM',
  description:
    'Product management across fintech, payment categorisation, KYC/KYB verification, discovery, analytics, and AI-enabled workflows.',
  url: SITE_URL,
  email: 'rishabhraittt@gmail.com',
  phone: '+91 6000032216',
  linkedin: 'https://www.linkedin.com/in/rishabh-rai-961937280/',
  github: 'https://github.com/rishabhrai2004',
  university: 'Kalinga Institute of Industrial Technology (KIIT University)',
  degree: 'Bachelor of Technology – Electronics and Computer Science (2023–2027)',
} as const;
