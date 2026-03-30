"use cache";

import type { ReactNode } from "react";
import { DocsShell } from "@/components/docs-shell";

export default async function Layout({ children }: { children: ReactNode }) {
  return <DocsShell>{children}</DocsShell>;
}
