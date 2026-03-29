import { connection } from "next/server";
import { docsLLM } from "@/lib/source";

export async function GET() {
  await connection();

  return new Response(docsLLM.index(), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
    },
  });
}
