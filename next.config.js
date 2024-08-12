/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: async (config) => {
    const UnoCSS = (await import('@unocss/webpack')).default;
    config.plugins.push(UnoCSS());
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.steamstatic.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
