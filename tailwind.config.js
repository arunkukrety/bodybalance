/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981', // Green shade for bg-primary
      },
      animation: {
        glow: 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)' },
          '100%': { boxShadow: '0 0 25px rgba(16, 185, 129, 0.7)' },
        },
      },
    },
  },
  plugins: [],
}