import Link from "next/link";
import type { RelatedDocsGraph, RelatedGraphNode } from "@/lib/docs-graph";

type DocsRelatedGraphProps = {
  graph: RelatedDocsGraph;
};

type PositionedNode = RelatedGraphNode & {
  x: number;
  y: number;
};

type GroupedNodes = {
  both: RelatedGraphNode[];
  incoming: RelatedGraphNode[];
  outgoing: RelatedGraphNode[];
};

function toRadians(degree: number) {
  return (degree * Math.PI) / 180;
}

function positionGroup(
  nodes: RelatedGraphNode[],
  startDegree: number,
  endDegree: number,
  radius: number,
) {
  if (nodes.length === 0) {
    return [];
  }

  return nodes.map((node, index) => {
    const degree =
      nodes.length === 1
        ? (startDegree + endDegree) / 2
        : startDegree + ((endDegree - startDegree) / (nodes.length - 1)) * index;
    const radians = toRadians(degree);

    return {
      ...node,
      x: 50 + Math.cos(radians) * radius,
      y: 50 + Math.sin(radians) * radius,
    };
  });
}

function groupNodes(nodes: RelatedGraphNode[]): GroupedNodes {
  const grouped: GroupedNodes = {
    both: [],
    incoming: [],
    outgoing: [],
  };

  for (const node of nodes) {
    grouped[node.relation].push(node);
  }

  return grouped;
}

function positionNodes(nodes: GroupedNodes) {
  return new Map(
    [
      ...positionGroup(nodes.both, -150, -30, 30),
      ...positionGroup(nodes.outgoing, 135, 225, 34),
      ...positionGroup(nodes.incoming, -45, 45, 34),
    ].map((node) => [node.url, node] as const),
  );
}

function relationLabel(node: RelatedGraphNode) {
  switch (node.relation) {
    case "both":
      return "相互参照";
    case "incoming":
      return "被リンク";
    case "outgoing":
      return "参照先";
  }
}

function GroupList({
  nodes,
  title,
}: {
  nodes: RelatedGraphNode[];
  title: string;
}) {
  if (nodes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fd-muted-foreground">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {nodes.map((node) => (
          <Link key={node.url} href={node.url} className="wiki-related-map-chip">
            <span>{node.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function GraphNode({
  node,
  positioned,
}: {
  node: RelatedGraphNode;
  positioned: PositionedNode;
}) {
  return (
    <Link
      href={node.url}
      className={`wiki-related-map-node wiki-related-map-node--${node.relation}`}
      style={{
        left: `${positioned.x}%`,
        top: `${positioned.y}%`,
      }}
    >
      <span className="wiki-related-map-node-title">{node.title}</span>
      <span className="wiki-related-map-node-relation">{relationLabel(node)}</span>
    </Link>
  );
}

export function DocsRelatedGraph({ graph }: DocsRelatedGraphProps) {
  const groupedNodes = groupNodes(graph.nodes);
  const positionedNodes = positionNodes(groupedNodes);

  return (
    <section className="wiki-related-map not-prose">
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="wiki-related-map-kicker">Related Map</p>
          <h2 className="text-xl font-semibold tracking-tight text-fd-foreground">関連マップ</h2>
          <p className="text-sm leading-7 text-fd-muted-foreground">
            このページから参照しているページと、このページを参照しているページをまとめています。
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-fd-muted-foreground">
          <span className="wiki-related-map-meta">参照先 {graph.counts.outgoing} 件</span>
          <span className="wiki-related-map-meta">被リンク {graph.counts.incoming} 件</span>
          {graph.counts.hidden > 0 ? (
            <span className="wiki-related-map-meta">主要 {graph.nodes.length} 件を表示</span>
          ) : null}
        </div>
      </div>

      <div className="mt-6 space-y-5 md:hidden">
        <GroupList nodes={groupedNodes.both} title="相互参照" />
        <GroupList nodes={groupedNodes.outgoing} title="参照先" />
        <GroupList nodes={groupedNodes.incoming} title="被リンク" />
      </div>

      <div className="wiki-related-map-graph hidden md:block">
        <svg className="wiki-related-map-lines" viewBox="0 0 100 100" aria-hidden="true">
          {graph.nodes.map((node) => {
            const positioned = positionedNodes.get(node.url);

            if (!positioned) {
              return null;
            }

            return (
              <line
                key={node.url}
                className={`wiki-related-map-line wiki-related-map-line--${node.relation}`}
                x1="50"
                x2={positioned.x}
                y1="50"
                y2={positioned.y}
              />
            );
          })}
        </svg>

        <div className="wiki-related-map-center">
          <span className="wiki-related-map-center-title">{graph.current.title}</span>
          <span className="wiki-related-map-node-relation">現在のページ</span>
        </div>

        {graph.nodes.map((node) => {
          const positioned = positionedNodes.get(node.url);

          if (!positioned) {
            return null;
          }

          return <GraphNode key={node.url} node={node} positioned={positioned} />;
        })}
      </div>
    </section>
  );
}
