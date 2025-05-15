import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  /* other config options here */

  webpack: (config: Configuration) => {
    // disable the "canvas" alias fallback
    if (config.resolve?.alias) {
      // @ts-ignore
      config.resolve.alias.canvas = false;
    }
    return config;
  },
};

export default nextConfig;
