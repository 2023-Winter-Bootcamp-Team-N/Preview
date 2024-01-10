/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/index.html'],
  theme: {
    extend: {
      fontFamily: {
        notoSans: ['notoSans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
