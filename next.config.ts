import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Static HTML Export for Cloudflare Pages
  images: {
    unoptimized: true,  // Required for static export
  },
  // Disable image optimization for static export
  experimental: {
    // Enable if needed for better performance
  },
};

export default nextConfig;
