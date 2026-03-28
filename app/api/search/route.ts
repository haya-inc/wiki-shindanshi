import { docsSearch } from "@/lib/docs-search";

export async function GET(request: Request) {
  return docsSearch.GET(request);
}
