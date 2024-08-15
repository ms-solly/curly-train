/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.steamstatic.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'steamusercontent-a.akamaihd.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'steamcdn-a.akamaihd.net', // Add this entry
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
