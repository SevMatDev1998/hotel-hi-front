/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        "mobile": { raw: "(max-width: 768px)" },
        "tablet": { raw: "(min-width: 768px) and (max-width: 1200px)" },
        '1100px': '1100px',
        'lg': { raw: "(min-width: 1200px) and (max-width: 1440px)" },
        'xl':{ raw: "(min-width: 1440px) and (max-width: 1920px)" },
        '2xl': { raw: "(min-width: 1920)" },
      }
    },
  },
  plugins: [],
};
