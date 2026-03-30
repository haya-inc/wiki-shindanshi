import Link from "next/link";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex flex-col gap-0.5 leading-none">
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-fd-muted-foreground">
            shindanshi
          </span>
          <span className="text-sm font-semibold tracking-tight text-fd-foreground">
            中小企業診断士 wiki
          </span>
        </span>
      ),
      url: "/",
      transparentMode: "top",
    },
    githubUrl: "https://github.com/haya-inc/wiki-shindanshi",
  };
}

export function SidebarFooterLinks() {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-xs text-fd-muted-foreground">
      <a
        href="https://www.haya.company/"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-fd-foreground"
      >
        © haya株式会社
      </a>
      <span aria-hidden="true" className="text-fd-muted-foreground/60">
        /
      </span>
      <Link
        href="/privacy"
        className="transition-colors hover:text-fd-foreground"
      >
        プライバシーポリシー
      </Link>
    </div>
  );
}
