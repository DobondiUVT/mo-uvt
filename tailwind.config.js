/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'uvt-blue': '#3471B8',
        'uvt-dark-blue': '#084371',
        'uvt-yellow': '#FBB900',
      },
    },
  },
  plugins: [],
}
