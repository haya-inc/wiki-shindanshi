"use cache";

import type { ReactNode } from "react";
import { MessageCircleIcon } from "lucide-react";
import {
  AISearch,
  AISearchPanel,
  AISearchTrigger,
} from "@/components/ai/search";
import { buttonVariants } from "@/components/ui/button";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { cn } from "@/lib/cn";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{
        footer: (
          <a
            href="https://www.haya.company/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-fd-muted-foreground hover:text-fd-foreground transition-colors"
          >
            © haya株式会社
          </a>
        ),
      }}
    >
      <AISearch>
        {children}
        <AISearchPanel />
        <AISearchTrigger
          position="float"
          className={cn(
            buttonVariants({
              color: "secondary",
              size: "sm",
              className: "w-auto shadow-lg",
            }),
          )}
        >
          <MessageCircleIcon className="size-4.5" />
          AIに質問
        </AISearchTrigger>
      </AISearch>
    </DocsLayout>
  );
}
