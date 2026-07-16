import { useEffect } from "react";

/* Injects a page-scoped JSON-LD script tag on mount, removes it on unmount.
   Only visible to JS-executing crawlers (Googlebot/Bingbot) and real browsers —
   the site's core Organization/SoftwareApplication/FAQPage graph in index.html
   already covers non-JS AI crawlers. */
export function useJsonLd(data: object) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);
}
