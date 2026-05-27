import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/korea-travel-itinerary",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
