import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net", // Official Pokémon site images
      },
    ],
  },
};

export default nextConfig;
