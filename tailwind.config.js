/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Tailwind scans files in the pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // Tailwind scans files in the components directory
  ],
  theme: {
    extend: {}, // Use this section to customize the default Tailwind theme
  },
  plugins: [], // Add Tailwind plugins here (optional)
};
