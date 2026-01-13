/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vta: {
          dark: '#1A1A1A', // Dark background
          green: '#1E4620', // VTA Brand Green (from screenshots)
          gold: '#D4AF37', // Gold/Ranking color
          accent: '#FF4D00', // Orange accent
        }
      },
      fontFamily: {
        sans: ['PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
