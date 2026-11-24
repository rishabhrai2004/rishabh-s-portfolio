/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#F5F5F7",
        accent: "#C6FF00",
        secondary: "#1D1D1F",
        apple: {
          black: "#000000",
          dark: "#0b0b0d",
          card: "#161617",
          border: "rgba(255, 255, 255, 0.08)",
          blue: "#2997FF",
          blueHover: "#147CE5",
          gray: "#86868B",
          subtext: "#A1A1A6",
          light: "#F5F5F7",
          titanium: "#E3E4E6",
        },
      },
      fontFamily: {
        sans: ["inherit"],
        body: ["inherit"],
        display: ["inherit"],
        serif: ["var(--font-playfair, Georgia)", "serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(198,255,0,0.18)",
        "glow-lg": "0 0 60px rgba(198,255,0,0.28)",
        "apple-card": "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
        "apple-pill": "0 4px 14px rgba(41, 151, 255, 0.35)",
        "apple-glow": "0 0 50px rgba(41, 151, 255, 0.2)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
