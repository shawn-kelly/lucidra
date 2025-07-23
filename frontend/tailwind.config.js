/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lucid-teal': '#1FE0C4',
        'eclipse-slate': '#1C1F26',
        'insight-indigo': '#6C75F8',
        'pulse-coral': '#FF6B6B',
        'chart-green': '#10B981',
        'warning-amber': '#F59E0B',
      },
    },
  },
  plugins: [],
}