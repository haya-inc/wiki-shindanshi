import { createMDX } from "fumadocs-mdx/next";

const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
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
