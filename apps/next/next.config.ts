import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["solito", "moti", "@editorial-ai/ui", "@editorial-ai/api"],
};

export default nextConfig;
