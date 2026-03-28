import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { FeedbackBlock as DocsFeedbackBlock } from "@/components/feedback/client";

export function getMDXComponents(components?: MDXComponents) {
  return {
    Accordion,
    Accordions,
    FeedbackBlock: DocsFeedbackBlock,
    Step,
    Steps,
    Tab,
    Tabs,
    TypeTable,
    ...defaultMdxComponents,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
