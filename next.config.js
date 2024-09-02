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
      {
        protocol: 'https',
        hostname: 'api.opendota.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
      },
       {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
