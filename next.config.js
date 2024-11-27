const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/<adrian-9559.github.io>' : '',
  assetPrefix: isProd ? '/<adrian-9559.github.io>/' : '',
};