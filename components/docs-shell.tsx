import type { ReactNode } from "react";
import { MessageCircleIcon } from "lucide-react";
import {
  AISearch,
  AISearchPanel,
  AISearchTrigger,
} from "@/components/ai/search";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { SidebarFooterLinks, baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{ footer: <SidebarFooterLinks /> }}
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
