import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // frontend path
        destination: "https://api.nnadiluxurynative.com/api/v1/:path*", // backend API
      },
    ];
  },
};

export default nextConfig;
