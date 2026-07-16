import { useEffect } from "react";

export function useFadeUp() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".fade-up");

    // Respect reduced-motion preference: show everything immediately, no transition.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    els.forEach((el) => {
      const delay = el.dataset.delay;
      if (delay) el.style.transitionDelay = `${delay}ms`;
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));

    // Safety net: never leave content permanently invisible if the observer
    // misses an element (JS hiccup, a tool/crawler that never scrolls, a very
    // fast layout change) — force-reveal anything still hidden after 4s.
    const fallback = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".fade-up:not(.in)").forEach((el) => {
        el.classList.add("in");
      });
    }, 4000);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
}
