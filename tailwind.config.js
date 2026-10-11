/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--da-primary)',
          'primary-hover': 'var(--da-primary-hover)',
        },
        da: {
          bg: 'var(--da-bg)',
          surface: 'var(--da-surface)',
          text: 'var(--da-text)',
          muted: 'var(--da-text-secondary)',
          border: 'var(--da-border)',
          card: 'var(--da-card)',
          'card-hover': 'var(--da-card-hover)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
