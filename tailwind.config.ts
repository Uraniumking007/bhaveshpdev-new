/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
    extend: {
      dropShadow: {
        "3xl": "0px 0px 15px rgb(0, 203, 251, 0.3)",
        "4xl": "0px 0px 15px rgb(22, 62, 102, 0.5)",
        "4sk": "0px 0px 10px rgb(56, 189, 248, 0.5)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
    themes: ["light", "dark", "night", "business", "synthwave    "],
  },
});
