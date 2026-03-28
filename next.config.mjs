import { createMDX } from "fumadocs-mdx/next";

const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  async redirects() {
    return [
      {
        source: "/docs/first-stage",
        destination: "/docs",
        permanent: true,
      },
      {
        source: "/docs/first-stage/:path*",
        destination: "/docs/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/docs.mdx",
        destination: "/llms.mdx",
      },
      {
        source: "/docs/:path*.mdx",
        destination: "/llms.mdx/:path*",
      },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
