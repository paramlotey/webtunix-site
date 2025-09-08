import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { optimizeCss: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["src", "pages", "components", "app", "redux"],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
};

export default nextConfig;
