import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize heavy icon packages — reduces bundle parse time
  experimental: {
    optimizePackageImports: [
      "@hugeicons/react",
      "@phosphor-icons/react",
      "lucide-react",
      "motion",
    ],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "*.convex.site",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  turbopack: {},
};

export default nextConfig;
