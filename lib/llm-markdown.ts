import { readFile } from "node:fs/promises";
import path from "node:path";
import type { InferPageType } from "fumadocs-core/source";
import { source } from "@/lib/source";

type SourcePage = InferPageType<typeof source>;

const DOCS_DIR = path.join(process.cwd(), "content/docs");

function stripFrontmatter(value: string) {
  if (!value.startsWith("---\n")) {
    return value;
  }

  const end = value.indexOf("\n---\n", 4);

  if (end === -1) {
    return value;
  }

  return value.slice(end + 5);
}

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function dedentText(value: string) {
  const lines = value.replace(/\r\n/g, "\n").split("\n");
  const indents = lines
    .filter((line) => line.trim().length > 0)
    .map((line) => line.match(/^[ \t]*/)?.[0].length ?? 0);
  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;

  if (minIndent === 0) {
    return lines.join("\n");
  }

  return lines
    .map((line) => {
      if (line.trim().length === 0) {
        return "";
      }

      return line.slice(minIndent);
    })
    .join("\n");
}

function normalizeText(value: string) {
  return decodeEntities(dedentText(value))
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeInlineText(value: string) {
  return normalizeText(value)
    .replace(/\n+/g, " ")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function getAttribute(attributes: string, name: string) {
  return attributes.match(new RegExp(`${name}="([^"]+)"`))?.[1];
}

function cleanupInlineMdx(value: string) {
  return normalizeInlineText(
    value
      .replace(/<code>([\s\S]*?)<\/code>/g, (_, code: string) => `\`${normalizeInlineText(code)}\``)
      .replace(/<>|<\/>/g, "")
      .replace(/<br\s*\/?>/g, "\n"),
  );
}

function cleanupBlockMdx(value: string) {
  return normalizeText(
    value
      .replace(/<code>([\s\S]*?)<\/code>/g, (_, code: string) => `\`${normalizeInlineText(code)}\``)
      .replace(/<>|<\/>/g, "")
      .replace(/^<div\b[^>]*\/>\s*$/gm, "")
      .replace(/^<\/?[A-Z][A-Za-z0-9]*(?:\s+[^>]*)?>\s*$/gm, ""),
  );
}

function renderTitledBlock(title: string | undefined, body: string, href?: string) {
  const cleanTitle = title?.trim();
  const cleanBody = cleanupBlockMdx(body);
  const heading = cleanTitle ? (href ? `[${cleanTitle}](${href})` : cleanTitle) : undefined;

  if (heading && cleanBody) {
    return `### ${heading}\n\n${cleanBody}`;
  }

  if (heading) {
    return `### ${heading}`;
  }

  return cleanBody;
}

function convertTypeTables(value: string) {
  return value.replace(/<TypeTable\b[^>]*type=\{\{([\s\S]*?)\}\}[^>]*\/>/g, (_, body: string) => {
    const rows = Array.from(body.matchAll(/^\s*([^:\n]+):\s*\{([\s\S]*?)^\s*\},?$/gm));

    if (rows.length === 0) {
      return "";
    }

    const lines = [
      "| 項目 | 種別 | 説明 | 必須 |",
      "| --- | --- | --- | --- |",
    ];

    for (const [, key, fields] of rows) {
      const type = fields.match(/type:\s*([\s\S]*?),\s*description:/)?.[1];
      const description = fields.match(/description:\s*([\s\S]*?),\s*required:/)?.[1];
      const required = fields.match(/required:\s*(true|false)/)?.[1];

      lines.push(
        `| ${cleanupInlineMdx(key)} | ${cleanupInlineMdx(type ?? "")} | ${cleanupInlineMdx(description ?? "")} | ${required === "true" ? "はい" : "いいえ"} |`,
      );
    }

    return lines.join("\n");
  });
}

export function sanitizeMdxForLlm(value: string) {
  let text = normalizeText(stripFrontmatter(value));

  text = convertTypeTables(text);
  text = text.replace(/^[ \t]*<Callout\b([^>]*)>([\s\S]*?)<\/Callout>[ \t]*$/gm, (_, attributes: string, body: string) => {
    const title = getAttribute(attributes, "title");
    const cleanBody = cleanupBlockMdx(body);

    if (!title) {
      return cleanBody;
    }

    if (!cleanBody) {
      return `**${title}**`;
    }

    return `**${title}**\n\n${cleanBody}`;
  });
  text = text.replace(/^[ \t]*<Accordion\b([^>]*)>([\s\S]*?)<\/Accordion>[ \t]*$/gm, (_, attributes: string, body: string) =>
    renderTitledBlock(getAttribute(attributes, "title"), body),
  );
  text = text.replace(/^[ \t]*<Tab\b([^>]*)>([\s\S]*?)<\/Tab>[ \t]*$/gm, (_, attributes: string, body: string) =>
    renderTitledBlock(getAttribute(attributes, "title") ?? getAttribute(attributes, "value"), body),
  );
  text = text.replace(/^[ \t]*<Card\b([^>]*)>([\s\S]*?)<\/Card>[ \t]*$/gm, (_, attributes: string, body: string) =>
    renderTitledBlock(getAttribute(attributes, "title"), body, getAttribute(attributes, "href")),
  );
  text = text.replace(/^[ \t]*<Step\b[^>]*>([\s\S]*?)<\/Step>[ \t]*$/gm, (_, body: string) => cleanupBlockMdx(body));
  text = text
    .replace(/<\/?(Cards|Steps|Tabs|Accordions)\b[^>]*>/g, "")
    .replace(/^<div\b[^>]*\/>\s*$/gm, "")
    .replace(/^\s*<([A-Z][A-Za-z0-9]*)\b[^>]*\/>\s*$/gm, "");

  return cleanupBlockMdx(text);
}

function getDocSourceCandidates(page: SourcePage) {
  const candidates: string[] = [];
  const pathname = page.url.replace(/^\/docs\/?/, "").replace(/\/$/, "");

  if (page.path) {
    candidates.push(path.join(DOCS_DIR, page.path));
  }

  if (pathname.length > 0) {
    candidates.push(path.join(DOCS_DIR, `${pathname}.mdx`));
    candidates.push(path.join(DOCS_DIR, pathname, "index.mdx"));
  } else {
    candidates.push(path.join(DOCS_DIR, "index.mdx"));
  }

  return [...new Set(candidates)];
}

export async function loadDocSourceMarkdown(page: SourcePage) {
  for (const candidate of getDocSourceCandidates(page)) {
    try {
      const source = await readFile(candidate, "utf8");
      return sanitizeMdxForLlm(source);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }

  return null;
}
