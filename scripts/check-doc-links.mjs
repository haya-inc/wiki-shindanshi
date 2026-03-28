import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import GithubSlugger from "github-slugger";
import { printErrors, scanURLs, validateFiles } from "next-validate-link";

const root = process.cwd();
const docsRoot = path.join(root, "content", "docs");
const docFilePattern = /\.(md|mdx)$/u;
const routeGroupSegmentPattern = /^\(.+\)$/u;
const relativeMarkdownLinkPattern = /\]\(((?:\.\.?\/)[^)\s]+)\)/gu;
const relativeDoubleQuotedHrefPattern = /href="((?:\.\.?\/)[^"]+)"/gu;
const relativeSingleQuotedHrefPattern = /href='((?:\.\.?\/)[^']+)'/gu;

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

async function walkDocs(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkDocs(fullPath)));
      continue;
    }

    if (entry.isFile() && docFilePattern.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function toDocUrl(filePath) {
  const relativePath = toPosixPath(path.relative(docsRoot, filePath));
  return toDocUrlFromRelativePath(relativePath);
}

export function normalizeDocRoutePath(relativePath) {
  const normalizedPath = relativePath
    .split("/")
    .filter((segment) => !routeGroupSegmentPattern.test(segment))
    .join("/");
  const withoutExtension = normalizedPath.replace(docFilePattern, "");
  const withoutIndex = withoutExtension.replace(/\/index$/u, "");

  return withoutIndex === "index" || withoutIndex === "." ? "" : withoutIndex;
}

export function toDocUrlFromRelativePath(relativePath) {
  const normalizedRoutePath = normalizeDocRoutePath(relativePath);

  if (normalizedRoutePath === "") {
    return "/docs";
  }

  return `/docs/${normalizedRoutePath}`;
}

export function resolveRelativeDocHref(filePath, href) {
  const fileRelativePath = toPosixPath(path.relative(docsRoot, filePath));
  const dirRelativePath = path.posix.dirname(fileRelativePath);
  const [pathname, hash] = href.split("#", 2);
  const resolvedPath = path.posix.normalize(path.posix.join(dirRelativePath, pathname));
  const resolvedUrl = toDocUrlFromRelativePath(resolvedPath);

  return hash ? `${resolvedUrl}#${hash}` : resolvedUrl;
}

export function normalizeDocRelativeLinks(filePath, content) {
  // docs 内では相対リンクを許容しつつ、監査時は公開 URL に寄せて評価する。
  const resolveHref = (href) => resolveRelativeDocHref(filePath, href);

  return content
    .replace(relativeMarkdownLinkPattern, (_matched, href) => `](${resolveHref(href)})`)
    .replace(relativeDoubleQuotedHrefPattern, (_matched, href) => `href="${resolveHref(href)}"`)
    .replace(relativeSingleQuotedHrefPattern, (_matched, href) => `href='${resolveHref(href)}'`);
}

function stripMath(content) {
  return content
    .replace(/^\$\$[\s\S]*?^\$\$$/gmu, "")
    .replace(/\$\$[\s\S]*?\$\$/gu, "")
    .replace(/(?<!\$)\$[^$\n]+\$(?!\$)/gu, "");
}

function toPopulateValue(url) {
  const slug = url.replace(/^\/docs\/?/u, "");

  if (slug.length === 0) {
    return {
      slug: [],
    };
  }

  return {
    slug: slug.split("/"),
  };
}

export function extractHeadingHashes(content) {
  const slugger = new GithubSlugger();
  const hashes = [];
  let inCodeFence = false;

  for (const line of content.split("\n")) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const matched = /^(#{1,6})\s+(.+?)\s*$/u.exec(trimmed);

    if (!matched) {
      continue;
    }

    const heading = matched[2]
      .replace(/`([^`]*)`/gu, "$1")
      .replace(/\[(.*?)\]\(.*?\)/gu, "$1")
      .replace(/<[^>]+>/gu, "")
      .trim();

    if (heading.length === 0) {
      continue;
    }

    hashes.push(slugger.slug(heading));
  }

  return hashes;
}

export function createValidationContent(filePath, content) {
  return normalizeDocRelativeLinks(filePath, stripMath(content));
}

async function getFiles() {
  const docFiles = await walkDocs(docsRoot);

  return Promise.all(
    docFiles.map(async (filePath) => {
      const content = await fs.readFile(filePath, "utf8");
      const url = toDocUrl(filePath);

      return {
        path: filePath,
        content: createValidationContent(filePath, content),
        url,
        hashes: extractHeadingHashes(content),
      };
    }),
  );
}

export async function main() {
  const files = await getFiles();
  const scanned = await scanURLs({
    preset: "next",
    populate: {
      "docs/[[...slug]]": files.map((file) => ({
        value: toPopulateValue(file.url),
        hashes: file.hashes,
      })),
    },
  });

  const results = await validateFiles(
    files.map((file) => ({
      path: file.path,
      content: file.content,
      url: file.url,
    })),
    {
      scanned,
      markdown: {
        components: {
          Card: { attributes: ["href"] },
        },
      },
      checkRelativePaths: "as-url",
    },
  );

  printErrors(results, true);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
