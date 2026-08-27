import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Kept under Vercel's ~4.5MB serverless function body limit.
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
