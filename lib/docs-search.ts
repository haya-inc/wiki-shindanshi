import { createTokenizer } from "@orama/tokenizers/japanese";
import { createFromSource } from "fumadocs-core/search/server";
import { loadStructuredData } from "@/lib/docs-structured-data";
import { source } from "@/lib/source";

export const docsSearch = createFromSource(source, {
  buildIndex: async (page) => ({
    description: page.data.description,
    id: page.url,
    structuredData: await loadStructuredData(page),
    title: page.data.title,
    url: page.url,
  }),
  tokenizer: createTokenizer(),
});

export const docsPagesByUrl = new Map(source.getPages().map((page) => [page.url, page]));
