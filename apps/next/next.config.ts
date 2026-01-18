import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "solito",
    "moti",
    "react-native-reanimated",
    "react-native-gesture-handler",
    "@editorial-ai/ui",
    "@editorial-ai/api",
  ],
  webpack: (config: any) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];
    return config;
  },
} as any;

export default nextConfig;
