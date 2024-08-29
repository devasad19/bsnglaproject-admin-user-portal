/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#006A4E",
      },
      fontSize: {
        10: "0.625em",
        12: "0.75em",
        13: "0.8125em",
        14: "0.875em",
        15: "0.9375em",
        16: "1em",
        18: "1.125em",
        20: "1.25em",
        24: "1.5em",
        26: "1.625em",
        32: "2em",
        36: "2.25em",
        40: "2.5em",
        48: "3em",
      },
      screens: {
        "2xl": "1440px",
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
};
