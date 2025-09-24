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
  
  // Configure compiler options for React
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // Configure React to minimize HTML validation issues
  reactStrictMode: true,
};

export default nextConfig;
