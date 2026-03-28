import type { InferPageType } from "fumadocs-core/source";
import { formatStructuredDataMarkdown, loadStructuredData } from "@/lib/docs-structured-data";
import { loadDocSourceMarkdown, sanitizeMdxForLlm } from "@/lib/llm-markdown";
import { source } from "@/lib/source";

type SourcePage = InferPageType<typeof source>;

async function loadSourceMarkdownContent(page: SourcePage) {
  try {
    return (await loadDocSourceMarkdown(page)) ?? "";
  } catch {
    return "";
  }
}

async function loadStructuredDataContent(page: SourcePage) {
  try {
    const structuredData = await loadStructuredData(page);
    return formatStructuredDataMarkdown(structuredData);
  } catch {
    return "";
  }
}

async function loadProcessedContent(page: SourcePage) {
  const processed = await page.data.getText("processed");
  return sanitizeMdxForLlm(processed);
}

async function resolveLLMContent(page: SourcePage) {
  // source MDX -> structuredData -> processed text の順で試すと、
  // UI 由来の装飾を減らしつつ、本文を最も安定して再利用できます。
  const loaders = [
    loadSourceMarkdownContent,
    loadStructuredDataContent,
    loadProcessedContent,
  ] satisfies Array<(page: SourcePage) => Promise<string>>;

  for (const load of loaders) {
    const content = await load(page);

    if (content) {
      return content;
    }
  }

  return "";
}

export async function getLLMText(page: SourcePage) {
  const description = page.data.description?.trim();
  const content = await resolveLLMContent(page);

  return [
    `# ${page.data.title} (${page.url})`,
    description,
    content,
  ]
    .filter((value) => value && value.length > 0)
    .join("\n\n");
}
