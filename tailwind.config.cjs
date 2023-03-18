/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",

    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: "#051923",
        teal: "#0582CA",
        grey: "#00A6FB",
        black: "#222831",
        "dark-blue": "#006494",
        "grey-dark": "#003554",
      },
    },
  },

  plugins: [require("flowbite/plugin")],
};

module.exports = config;
