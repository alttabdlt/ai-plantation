import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/ai-plantation" : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "api.mapbox.com" },
    ],
  },
};

export default nextConfig;
