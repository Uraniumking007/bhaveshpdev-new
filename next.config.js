const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'example.com',
      //   port: '',
      //   pathname: '/account123/**',
      // },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/attachments/**/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**/**",
      },
    ],
  },
};

// const millionConfig = {
//   auto: true
// }

module.exports = nextConfig;
