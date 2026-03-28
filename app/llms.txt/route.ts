import { docsLLM } from "@/lib/source";

export function GET() {
  return new Response(docsLLM.index(), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
    },
  });
}
