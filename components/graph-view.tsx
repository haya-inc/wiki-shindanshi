'use client';

import { lazy, type RefObject, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import type {
  ForceGraphMethods,
  ForceGraphProps,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d';
import { forceCenter, forceCollide, forceLink, forceManyBody } from 'd3-force';
import { useRouter } from 'fumadocs-core/framework';
import { cardSurfaceClass, popoverSurfaceClass } from '@/components/ui/surface';
import { cn } from '@/lib/cn';

export interface Graph {
  links: Link[];
  nodes: Node[];
}

export type Node = NodeObject<NodeType>;
export type Link = LinkObject<NodeType, LinkType>;

export interface NodeType {
  text: string;
  description?: string;
  neighbors?: string[];
  url: string;
}

export type LinkType = Record<string, unknown>;

export interface GraphViewProps {
  graph: Graph;
  className?: string;
}

type GraphPalette = {
  label: string;
  linkActive: string;
  linkIdle: string;
  nodeActive: string;
  nodeIdle: string;
};

const defaultGraphPalette: GraphPalette = {
  label: "#111827",
  linkActive: "#2563eb",
  linkIdle: "#999",
  nodeActive: "#2563eb",
  nodeIdle: "#999",
};

const ForceGraph2D = lazy(
  () => import('react-force-graph-2d'),
) as typeof import('react-force-graph-2d').default;

function readGraphPalette(container: HTMLDivElement | null): GraphPalette {
  if (!container) {
    return defaultGraphPalette;
  }

  const style = getComputedStyle(container);
  const primary = style.getPropertyValue("--color-fd-primary").trim() || defaultGraphPalette.nodeActive;
  const muted = style.getPropertyValue("--color-fd-muted-foreground").trim() || defaultGraphPalette.nodeIdle;
  const foreground = style.getPropertyValue("--color-fd-foreground").trim() || defaultGraphPalette.label;

  return {
    label: foreground,
    linkActive: primary,
    linkIdle: `color-mix(in oklab, ${muted} 45%, transparent)`,
    nodeActive: primary,
    nodeIdle: `color-mix(in oklab, ${muted} 55%, transparent)`,
  };
}

function getLinkEndpointId(endpoint: Link["source"] | Link["target"]) {
  if (typeof endpoint === "object") {
    return endpoint.id?.toString();
  }

  return endpoint?.toString();
}

export function GraphView({ graph, className }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-[640px] overflow-hidden rounded-3xl [&_canvas]:size-full',
        cardSurfaceClass,
        className,
      )}
    >
      {mounted ? <ClientGraph graph={graph} containerRef={containerRef} /> : null}
    </div>
  );
}

function ClientGraph({
  graph,
  containerRef,
}: { graph: Graph; containerRef: RefObject<HTMLDivElement | null> }) {
  const graphRef = useRef<ForceGraphMethods<Node, Link> | undefined>(undefined);
  const hoveredRef = useRef<Node | null>(null);
  const router = useRouter();
  const [palette, setPalette] = useState<GraphPalette>(defaultGraphPalette);
  const [viewport, setViewport] = useState({ height: 0, width: 0 });
  const [tooltip, setTooltip] = useState<{
    content: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    setPalette(readGraphPalette(containerRef.current));
  }, [containerRef]);

  function fitGraphToViewport(durationMs = 0) {
    const graphInstance = graphRef.current;

    if (!graphInstance) {
      return;
    }

    const bbox = graphInstance.getGraphBbox();

    if (!bbox) {
      return;
    }

    const centerX = (bbox.x[0] + bbox.x[1]) / 2;
    const centerY = (bbox.y[0] + bbox.y[1]) / 2;

    graphInstance.centerAt(centerX, centerY, durationMs);
    graphInstance.zoomToFit(durationMs, 40);
  }

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    let timer = 0;
    const observer = new ResizeObserver(() => {
      const width = Math.round(container.clientWidth);
      const height = Math.round(container.clientHeight);

      setViewport((current) =>
        current.width === width && current.height === height ? current : { width, height },
      );

      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        fitGraphToViewport(0);
      }, 120);
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [containerRef, graph]);

  const graphData = useMemo(() => {
    const clone = structuredClone(graph);
    const neighborsById = new Map<string, string[]>();

    for (const node of clone.nodes) {
      const nodeId = node.id?.toString();

      if (nodeId) {
        neighborsById.set(nodeId, []);
      }
    }

    for (const link of clone.links) {
      const sourceId = getLinkEndpointId(link.source);
      const targetId = getLinkEndpointId(link.target);

      if (!sourceId || !targetId) {
        continue;
      }

      neighborsById.get(sourceId)?.push(targetId);
      neighborsById.get(targetId)?.push(sourceId);
    }

    for (const node of clone.nodes) {
      const nodeId = node.id?.toString();
      node.neighbors = nodeId ? neighborsById.get(nodeId) ?? [] : [];
    }

    return clone;
  }, [graph]);

  const nodeCanvasObject: ForceGraphProps<NodeType, LinkType>["nodeCanvasObject"] = (node, ctx) => {
    const hoveredNode = hoveredRef.current;
    const isActive =
      hoveredNode?.id === node.id || hoveredNode?.neighbors?.includes(node.id as string);
    const radius = isActive ? 7 : 5;

    ctx.beginPath();
    ctx.arc(node.x!, node.y!, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = isActive ? palette.nodeActive : palette.nodeIdle;
    ctx.fill();

    ctx.font = "13px var(--font-body)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = palette.label;
    ctx.fillText(node.text, node.x!, node.y! + radius + 13);
  };

  const linkColor = (link: Link) => {
    const hoveredNode = hoveredRef.current;

    if (
      hoveredNode &&
      typeof link.source === "object" &&
      typeof link.target === "object" &&
      (hoveredNode.id === link.source.id || hoveredNode.id === link.target.id)
    ) {
      return palette.linkActive;
    }

    return palette.linkIdle;
  };

  function handleNodeHover(node: Node | null) {
    hoveredRef.current = node;

    if (!node || !graphRef.current) {
      setTooltip(null);
      return;
    }

    const coords = graphRef.current.graph2ScreenCoords(node.x!, node.y!);
    setTooltip({
      x: coords.x + 8,
      y: coords.y + 8,
      content: node.description ?? node.text,
    });
  }

  return (
    <>
      {viewport.width > 0 && viewport.height > 0 ? (
        <ForceGraph2D<NodeType, LinkType>
          ref={{
            get current() {
              return graphRef.current;
            },
            set current(instance) {
              graphRef.current = instance;

              if (!instance) {
                return;
              }

              instance.d3Force("center", forceCenter(0, 0));
              instance.d3Force("link", forceLink().distance(150));
              instance.d3Force("charge", forceManyBody().strength(-140));
              instance.d3Force("collision", forceCollide(28));
            },
          }}
          width={viewport.width}
          height={viewport.height}
          graphData={graphData}
          nodeCanvasObject={nodeCanvasObject}
          linkColor={linkColor}
          linkWidth={1.5}
          warmupTicks={40}
          cooldownTicks={90}
          onEngineStop={() => fitGraphToViewport(0)}
          onNodeHover={handleNodeHover}
          onNodeClick={(node) => router.push(node.url)}
          enableNodeDrag
          enableZoomInteraction
        />
      ) : null}

      {tooltip ? (
        <div
          className={cn(
            'pointer-events-none absolute max-w-xs rounded-2xl px-3 py-2 text-sm shadow-xl',
            popoverSurfaceClass,
          )}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      ) : null}
    </>
  );
}
