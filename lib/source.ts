import { icons } from "lucide-react";
import { createElement } from "react";
import { docs } from "collections/server";
import { llms, loader } from "fumadocs-core/source";

export const source = loader({
  baseUrl: "/docs",
  icon(icon) {
    if (!icon || !(icon in icons)) {
      return;
    }

    return createElement(icons[icon as keyof typeof icons]);
  },
  source: docs.toFumadocsSource(),
});

export const docsLLM = llms(source);
