import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { DocsRelatedGraph } from "@/components/docs-related-graph";
import { DocsPageActions } from "@/components/docs-page-actions";
import { Feedback } from "@/components/feedback/client";
import { GraphView } from "@/components/graph-view";
import { getMDXComponents } from "@/components/mdx";
import { buildGraph } from "@/lib/build-graph";
import { getRelatedDocsGraph } from "@/lib/docs-graph";
import { isReferenceToolPage } from "@/lib/reference-tool-pages";
import { source } from "@/lib/source";

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = source.getPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug = [] } = await params;
  return renderCachedPage(slug);
}

async function renderCachedPage(slug: string[]) {
  'use cache';

  const page = source.getPage(slug);
  const isHomePage = slug.length === 0;

  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;
  const isReferenceTool = isReferenceToolPage(page.url);
  const markdownUrl = `${page.url}.mdx`;
  const githubUrl = `https://github.com/haya-inc/shindanshi/blob/main/content/docs/${page.path}`;
  const relatedGraph = isHomePage || isReferenceTool ? null : getRelatedDocsGraph(page.url);
  const siteGraph = isHomePage ? buildGraph() : null;
  const HomeKnowledgeGraph = siteGraph
    ? function HomeKnowledgeGraph() {
        return (
          <section className="wiki-home-graph-card">
            <div className="wiki-home-graph-copy">
              <div className="space-y-1">
                <p className="wiki-home-card-kicker">Knowledge Graph</p>
                <h2 className="wiki-home-section-title">知識のつながりが一目でわかる全体図</h2>
                <p className="wiki-home-section-copy">
                  ページ同士の参照関係を俯瞰しながら、今どこから読み始めるかを選べます。
                </p>
              </div>
              <div className="wiki-home-graph-meta">
                <span className="wiki-home-graph-chip">ページ {siteGraph.nodes.length} 件</span>
                <span className="wiki-home-graph-chip">参照 {siteGraph.links.length} 本</span>
              </div>
            </div>
            <GraphView graph={siteGraph} className="h-[22rem] md:h-[30rem]" />
          </section>
        );
      }
    : undefined;
  const mdxComponents = getMDXComponents({
    a: createRelativeLink(source, page),
    ...(HomeKnowledgeGraph ? { HomeKnowledgeGraph } : {}),
  });

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full ?? isHomePage}
      lastUpdate={page.data.lastModified}
      className={isHomePage ? "wiki-home-page" : "wiki-docs-page"}
      breadcrumb={{ enabled: !isHomePage }}
      footer={{ enabled: !isHomePage }}
      tableOfContent={{ enabled: !isHomePage }}
      tableOfContentPopover={{ enabled: !isHomePage }}
    >
      {isHomePage ? null : (
        <DocsTitle className="wiki-page-title">{page.data.title}</DocsTitle>
      )}
      {!isHomePage && page.data.description ? (
        <DocsDescription className="wiki-page-description">
          {page.data.description}
        </DocsDescription>
      ) : null}
      {isHomePage ? null : (
        <DocsPageActions markdownUrl={markdownUrl} githubUrl={githubUrl} />
      )}
      <DocsBody className={isHomePage ? "wiki-home-body" : "wiki-docs-body"}>
        <MDXContent components={mdxComponents} />
      </DocsBody>
      {relatedGraph ? <DocsRelatedGraph graph={relatedGraph} /> : null}
      {isReferenceTool ? null : (
        <Feedback
          pageUrl={page.url}
          pageTitle={page.data.title}
          pagePath={page.path}
        />
      )}
    </DocsPage>
  );
}
