import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGithubActions ? "/suphonpha" : (process.env.NEXT_PUBLIC_BASE_PATH || ""),
};

export default nextConfig;
