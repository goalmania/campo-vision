import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let scale = 1;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px) scale(${scale})`;
      const t = e.target as HTMLElement;
      const interactive = t.closest("a,button,input,select,textarea,[role=button]");
      scale = interactive ? 1.4 : 1;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        left: 0, top: 0,
        width: 12, height: 12,
        pointerEvents: "none",
        zIndex: 9999,
        transition: "transform 0.08s ease-out",
        mixBlendMode: "difference",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12">
        <line x1="6" y1="0" x2="6" y2="12" stroke="#c8f000" strokeWidth="1" />
        <line x1="0" y1="6" x2="12" y2="6" stroke="#c8f000" strokeWidth="1" />
      </svg>
    </div>
  );
}
