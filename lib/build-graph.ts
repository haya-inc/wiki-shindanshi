import type { Graph } from "@/components/graph-view";
import { getDocsGraphData } from "@/lib/docs-graph";

export function buildGraph(): Graph {
  const docsGraph = getDocsGraphData();
  const graph: Graph = {
    links: [],
    nodes: [],
  };
  const linkIds = new Set<string>();

  for (const page of docsGraph.pagesByUrl.values()) {
    graph.nodes.push({
      description: page.description,
      id: page.url,
      text: page.title,
      url: page.url,
    });

    for (const url of docsGraph.outgoing.get(page.url) ?? []) {
      const linkId = `${page.url}->${url}`;

      if (linkIds.has(linkId)) {
        continue;
      }

      linkIds.add(linkId);
      graph.links.push({
        source: page.url,
        target: url,
      });
    }
  }

  return graph;
}
