/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Skip ESLint errors during `next build`
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Skip TypeScript type errors during `next build`
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
