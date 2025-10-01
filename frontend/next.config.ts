import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // force Turbopack à prendre frontend/ comme root
  },
};

export default nextConfig;
