import type { InferPageType } from "fumadocs-core/source";
import { source } from "@/lib/source";

type SourcePage = InferPageType<typeof source>;

type StructuredData = {
  headings: {
    id: string;
    content: string;
  }[];
  contents: {
    heading: string | undefined;
    content: string;
  }[];
};

function normalizeText(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function loadStructuredData(page: SourcePage): Promise<StructuredData> {
  const data = page.data as {
    load?: () => Promise<{
      structuredData?: unknown;
    }>;
    structuredData?: unknown | (() => Promise<unknown>);
  };

  if (typeof data.structuredData === "function") {
    return data.structuredData() as Promise<StructuredData>;
  }

  if (data.structuredData) {
    return data.structuredData as StructuredData;
  }

  if (typeof data.load === "function") {
    const loaded = await data.load();

    if (loaded.structuredData) {
      return loaded.structuredData as StructuredData;
    }
  }

  throw new Error(`structuredData を取得できませんでした: ${page.url}`);
}

export function formatStructuredDataMarkdown(data: StructuredData) {
  const bodyByHeading = new Map<string, string[]>();
  const lead: string[] = [];

  for (const item of data.contents) {
    const content = normalizeText(item.content);

    if (!content) {
      continue;
    }

    if (!item.heading) {
      lead.push(content);
      continue;
    }

    const contents = bodyByHeading.get(item.heading) ?? [];
    contents.push(content);
    bodyByHeading.set(item.heading, contents);
  }

  const blocks: string[] = [];
  const pushed = new Set<string>();

  for (const item of lead) {
    if (pushed.has(item)) {
      continue;
    }

    pushed.add(item);
    blocks.push(item);
  }

  for (const heading of data.headings) {
    const title = normalizeText(heading.content);
    const contents = bodyByHeading.get(heading.id) ?? [];

    if (title) {
      blocks.push(`## ${title}`);
    }

    for (const content of contents) {
      if (pushed.has(content)) {
        continue;
      }

      pushed.add(content);
      blocks.push(content);
    }
  }

  return blocks.join("\n\n").trim();
}
