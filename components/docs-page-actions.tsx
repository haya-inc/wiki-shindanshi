import { MarkdownCopyButton, ViewOptionsPopover } from "fumadocs-ui/layouts/docs/page";

type DocsPageActionsProps = {
  markdownUrl: string;
  githubUrl: string;
};

export function DocsPageActions({ markdownUrl, githubUrl }: DocsPageActionsProps) {
  return (
    <div className="wiki-page-actions not-prose flex flex-wrap items-center gap-2">
      <MarkdownCopyButton markdownUrl={markdownUrl} />
      <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={githubUrl} />
    </div>
  );
}
