import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";

const { rewrite: rewriteLLM } = rewritePath("/*path", "/llms.mdx/*path");

export function proxy(request: NextRequest) {
  if (isMarkdownPreferred(request)) {
    const rewrittenPath = rewriteLLM(request.nextUrl.pathname);

    if (rewrittenPath) {
      return NextResponse.rewrite(new URL(rewrittenPath, request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|llms|_next/static|_next/image|favicon\\.ico|apple-icon\\.png).*)"],
};
