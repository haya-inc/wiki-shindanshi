import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { remarkFeedbackBlock } from "fumadocs-core/mdx-plugins/remark-feedback-block";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      extractLinkReferences: true,
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => [rehypeKatex, ...plugins],
    remarkPlugins: (plugins) => [
      remarkMath,
      [remarkFeedbackBlock, { generateBody: true }],
      ...plugins,
    ],
  },
  plugins: [lastModified()],
});
