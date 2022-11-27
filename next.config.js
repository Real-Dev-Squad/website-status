/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  env: {
    webpack5: true,
  },
  images: {
    domains: ["raw.githubusercontent.com", "res.cloudinary.com"],
  },
}

module.exports = nextConfig

