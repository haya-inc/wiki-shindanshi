import { getLLMText } from "@/lib/get-llm-text";
import { source } from "@/lib/source";

export async function GET() {
  const pages = source
    .getPages()
    .slice()
    .sort((left, right) => left.url.localeCompare(right.url, "ja"));
  const scanned = await Promise.all(pages.map(getLLMText));

  return new Response(scanned.join("\n\n---\n\n"), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
    },
  });
}
