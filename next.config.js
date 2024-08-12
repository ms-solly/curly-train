/** @type {import('next').NextConfig} */
// next.config.js
const UnoCSS = require('@unocss/webpack').default
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      UnoCSS(),
    )
    return config
  },

}
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.steamstatic.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
