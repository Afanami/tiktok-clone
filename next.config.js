/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["static.thenounproject.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
