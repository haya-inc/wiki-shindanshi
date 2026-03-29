import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getLLMText } from "@/lib/get-llm-text";
import { source } from "@/lib/source";

type RouteProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  await connection();

  const { slug = [] } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  return new Response(await getLLMText(page), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
    },
  });
}
