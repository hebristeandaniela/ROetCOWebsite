import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // Disable ESLint during build
  },
  images: {
    domains: ['i.postimg.cc'], // Ensure the domain is correctly listed here!
  },
};

export default nextConfig;
