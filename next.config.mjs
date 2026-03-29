import { createMDX } from "fumadocs-mdx/next";

const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Vercel build の OOM を避けるため、本番 build の source map を抑える。
  productionBrowserSourceMaps: false,
  enablePrerenderSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/",
        permanent: true,
      },
      {
        source: "/docs/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/first-stage",
        destination: "/",
        permanent: true,
      },
      {
        source: "/first-stage/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
