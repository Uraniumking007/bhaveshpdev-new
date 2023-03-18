/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite/**/*.js',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0px 0px 15px rgb(0, 203, 251, 0.3)',
        '4xl': '0px 0px 15px rgb(22, 62, 102, 0.3)',
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
    themes: ['light', 'dark', 'night', 'business'],
  },
};
