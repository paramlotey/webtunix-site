import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
   eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src', 'pages', 'components', 'app','redux'], // Only lint these specific directories
  },
};

export default nextConfig;
