/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        WantedSansRegular: ['WantedSansRegular', 'sans-serif'],
        WantedSansBlack: ['WantedSansRegular', 'sans-serif'],
        WantedSansBold: ['WantedSansRegular', 'sans-serif'],
        WantedSansExtraBlack: ['WantedSansRegular', 'sans-serif'],
        WantedSansExtraBold: ['WantedSansRegular', 'sans-serif'],
        WantedSansMedium: ['WantedSansRegular', 'sans-serif'],
        WantedSansSemiBold: ['WantedSansRegular', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
