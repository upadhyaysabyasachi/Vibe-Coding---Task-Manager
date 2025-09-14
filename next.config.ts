import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  //eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  //},
  //typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    //ignoreBuildErrors: true,
  //},
  //basePath: '/your-repo-name', // Add this line
};

module.exports = nextConfig;
//export default nextConfig;
