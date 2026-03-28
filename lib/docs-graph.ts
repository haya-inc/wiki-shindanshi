import { cache } from "react";
import type { InferPageType } from "fumadocs-core/source";
import { source } from "@/lib/source";

type ExtractedReference = {
  href: string;
};

type DocsPage = InferPageType<typeof source>;

type GraphPage = {
  description?: string;
  title: string;
  url: string;
};

export type RelatedGraphNode = GraphPage & {
  relation: "both" | "incoming" | "outgoing";
};

export type RelatedDocsGraph = {
  current: GraphPage;
  nodes: RelatedGraphNode[];
  counts: {
    incoming: number;
    outgoing: number;
    hidden: number;
  };
};

function extractReferences(page: DocsPage) {
  if (!Array.isArray(page.data.extractedReferences)) {
    return [];
  }

  return page.data.extractedReferences.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }

    const href = (item as ExtractedReference).href;
    return typeof href === "string" ? [href] : [];
  });
}

export function resolveDocReferenceUrls(page: DocsPage) {
  const urls = new Set<string>();

  for (const href of extractReferences(page)) {
    const resolved = source.getPageByHref(href, {
      dir: page.path,
    });

    if (!resolved || resolved.page.url === page.url) {
      continue;
    }

    urls.add(resolved.page.url);
  }

  return [...urls];
}

function comparePages(
  leftUrl: string,
  rightUrl: string,
  pagesByUrl: Map<string, GraphPage>,
) {
  const left = pagesByUrl.get(leftUrl);
  const right = pagesByUrl.get(rightUrl);

  return (left?.title ?? leftUrl).localeCompare(right?.title ?? rightUrl, "ja");
}

export const getDocsGraphData = cache(() => {
  const pages = source.getPages();
  const pagesByUrl = new Map(
    pages.map((page) => [
      page.url,
      {
        description: page.data.description,
        title: page.data.title,
        url: page.url,
      },
    ]),
  );

  const outgoing = new Map<string, string[]>();
  const incoming = new Map<string, string[]>();

  for (const page of pages) {
    incoming.set(page.url, []);
  }

  for (const page of pages) {
    const linked = resolveDocReferenceUrls(page)
      .filter((url) => pagesByUrl.has(url))
      .sort((left, right) => comparePages(left, right, pagesByUrl));
    outgoing.set(page.url, linked);

    for (const url of linked) {
      incoming.get(url)?.push(page.url);
    }
  }

  for (const [url, linked] of incoming) {
    incoming.set(
      url,
      [...new Set(linked)].sort((left, right) => comparePages(left, right, pagesByUrl)),
    );
  }

  return {
    incoming,
    outgoing,
    pagesByUrl,
  };
});

function take(urls: string[], limit: number) {
  return urls.slice(0, limit);
}

export function getRelatedDocsGraph(currentUrl: string): RelatedDocsGraph | null {
  const graph = getDocsGraphData();
  const current = graph.pagesByUrl.get(currentUrl);

  if (!current) {
    return null;
  }

  const outgoing = graph.outgoing.get(currentUrl) ?? [];
  const incoming = graph.incoming.get(currentUrl) ?? [];
  const outgoingSet = new Set(outgoing);
  const incomingSet = new Set(incoming);

  const shared = outgoing.filter((url) => incomingSet.has(url));
  const outgoingOnly = outgoing.filter((url) => !incomingSet.has(url));
  const incomingOnly = incoming.filter((url) => !outgoingSet.has(url));

  const nodes: RelatedGraphNode[] = [
    ...take(shared, 3).flatMap((url) => {
      const page = graph.pagesByUrl.get(url);
      return page ? [{ ...page, relation: "both" as const }] : [];
    }),
    ...take(outgoingOnly, 4).flatMap((url) => {
      const page = graph.pagesByUrl.get(url);
      return page ? [{ ...page, relation: "outgoing" as const }] : [];
    }),
    ...take(incomingOnly, 4).flatMap((url) => {
      const page = graph.pagesByUrl.get(url);
      return page ? [{ ...page, relation: "incoming" as const }] : [];
    }),
  ];

  if (nodes.length === 0) {
    return null;
  }

  return {
    current,
    counts: {
      incoming: incoming.length,
      outgoing: outgoing.length,
      hidden:
        shared.length -
          Math.min(shared.length, 3) +
        outgoingOnly.length -
          Math.min(outgoingOnly.length, 4) +
        incomingOnly.length -
          Math.min(incomingOnly.length, 4),
    },
    nodes,
  };
}
