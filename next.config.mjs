/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  devIndicators: false,
};

export default nextConfig;
