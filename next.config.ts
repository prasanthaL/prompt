import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // Allow all quality levels used across the app
    qualities: [75, 90, 95, 100],
    // Larger breakpoints for high-DPI / retina screens
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Finer steps for fill/thumbnail images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
