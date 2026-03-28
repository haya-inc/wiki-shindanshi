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
      url: "/docs",
      transparentMode: "top",
    },
  };
}
