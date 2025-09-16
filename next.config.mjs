/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix the workspace lockfile warning
  outputFileTracingRoot: process.cwd(),
  
  // Image optimization - let Vercel handle this
  images: {
    unoptimized: false,
  },
  
  // Enable compression for better performance
  compress: true,
};

export default nextConfig;
