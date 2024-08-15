/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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

module.exports = nextConfig;
