/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // Desabilita o Turbopack
      enabled: false,
    },
  },
}

module.exports = nextConfig
