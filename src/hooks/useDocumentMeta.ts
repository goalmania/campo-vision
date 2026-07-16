import { useEffect } from "react";

type MetaOptions = {
  title: string;
  description: string;
  canonical: string;
};

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/* Per-route document title/description/canonical for the client-side router.
   This only helps JS-executing crawlers (Googlebot, Bingbot) and real users —
   non-JS AI crawlers (GPTBot, ClaudeBot, PerplexityBot) still only see the
   static tags baked into index.html, same as before. */
export function useDocumentMeta({ title, description, canonical }: MetaOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonical, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = link?.getAttribute("href") ?? null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    return () => {
      document.title = prevTitle;
      if (link && prevCanonical) link.setAttribute("href", prevCanonical);
    };
  }, [title, description, canonical]);
}
