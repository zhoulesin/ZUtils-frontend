/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        raycast: {
          bg: '#07080a',
          surface: '#101111',
          elevated: '#1b1c1e',
          text: '#f9f9f9',
          muted: '#9c9c9d',
          dim: '#6a6b6c',
          red: '#FF6363',
          blue: '#55b3ff',
          green: '#5fc992',
          amber: '#ffbc33',
          'cta-bg': 'hsla(0,0%,100%,0.815)',
          'cta-text': '#18191a',
          border: 'rgba(255,255,255,0.06)',
          'border-solid': '#252829',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
    },
  },
  plugins: [],
}
