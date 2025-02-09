/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector'],
  future: {
    hoverOnlyWhenSupported: true
  },
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}']
  // plugins: [require('tailwindcss-animate'), require('tailwind-gradient-mask-image')]
}
