import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dusty-teal": "#589A8F",
        "deep-teal": "#428277",
        "aqua-sky": "#40C7E6",
        "ice-blue": "#EBF9FC",
        "cloud-gray": "#EAEAEA",
        "ash-gray": "#D5D5D5",
        "charcoal-gray": "#545454",
        "brick-red": "#CD5555",
        "snow": "#FFFFFF",
      },
      backgroundImage: {
        "blue-gradient": "linear-gradient(to right, #95D0EA, #74B9D8)",
      },
      
      fontSize: {
        14: '14px',
      },
      lineHeight:{
        1.5:"24px",
      }
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
      armenian: ["Noto Sans Armenian", "sans-serif"],
    },

    
    screens: {
      "mobile": { raw: "(max-width: 768px)" },
      "tablet": { raw: "(min-width: 768px) and (max-width: 1200px)" },
      '1100px': '1100px',
      'lg': { raw: "(min-width: 1200px) and (max-width: 1440px)" },
      'xl':{ raw: "(min-width: 1440px) and (max-width: 1920px)" },
      '2xl': { raw: "(min-width: 1920)" },
    }
  },
  plugins: [],
} satisfies Config;
