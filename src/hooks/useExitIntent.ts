import { useEffect, useRef } from "react";

const SUPPRESS_KEY = "cis-exit-intent-suppressed-until";
const SUPPRESS_DAYS = 7;

function isSuppressed(): boolean {
  const until = localStorage.getItem(SUPPRESS_KEY);
  return !!until && Date.now() < Number(until);
}

/** Prevents the popup from reappearing for `SUPPRESS_DAYS` after it was shown or dismissed. */
export function suppressExitIntent() {
  localStorage.setItem(SUPPRESS_KEY, String(Date.now() + SUPPRESS_DAYS * 24 * 60 * 60 * 1000));
}

/**
 * Fires `onTrigger` once per eligible session: on desktop, when the mouse
 * leaves toward the browser chrome (classic exit-intent); on touch devices,
 * where mouseleave doesn't exist, as a scroll-depth + dwell-time proxy once
 * the visitor has read most of the page without converting.
 */
export function useExitIntent(onTrigger: () => void, enabled: boolean) {
  const firedRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!enabled || isSuppressed()) return;

    const fire = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      onTrigger();
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const onScroll = () => {
      if (firedRef.current) return;
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        const depth = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (depth > 0.6) fire();
      }, 4000);
    };

    document.addEventListener("mouseleave", onMouseLeave);
    if (isCoarsePointer) window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      if (isCoarsePointer) window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimerRef.current);
    };
  }, [enabled, onTrigger]);
}
