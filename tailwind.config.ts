import type { Config } from "tailwindcss";
import { Poppins, Inter } from "next/font/google";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-blue-I": "#4c8f9d",
        "mid-blue-I": "#2f8290",
        "dark-blue-I": "#21626d",

        "light-gray-I": "#d8d8d8",
        "mid-gray-I": "#c6c6c6",
        "dark-gray-I": "#b5b5b5",

        "light-red-I": "#ab291b",
        "mid-red-I": "#922013",
        "dark-red-I": "#712013",

        "light-beige-I": "#ab783a",
        "mid-beige-I": "#ab6735",
        "dark-beige-I": "#89552b",

        "light-brown-I": "#783b1e",
        "mid-brown-I": "#59321b",
        "dark-brown-I": "#3f1d13",

        "light-green-I": "#127124",
        "mid-green-I": "#126720",
        "dark-green-I": "#0e4726",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
