/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        WantedSansRegular: ['WantedSansRegular', 'sans-serif'],
        WantedSansBlack: ['WantedSansBlack', 'sans-serif'],
        WantedSansBold: ['WantedSansBold', 'sans-serif'],
        WantedSansExtraBlack: ['WantedSansExtraBlack', 'sans-serif'],
        WantedSansExtraBold: ['WantedSansExtraBold', 'sans-serif'],
        WantedSansMedium: ['WantedSansMedium', 'sans-serif'],
        WantedSansSemiBold: ['WantedSansSemiBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
