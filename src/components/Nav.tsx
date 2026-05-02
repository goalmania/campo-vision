import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#prodotti", label: "Prodotti" },
  { href: "#clubis", label: "ClubIS" },
  { href: "#dmscout", label: "DM Scout" },
  { href: "#contatti", label: "Contatti" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "0.5px solid var(--c-border)" : "0.5px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top"><Logo /></a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-display font-semibold uppercase text-[11px] text-white/80 hover:text-lime transition-colors"
              style={{ letterSpacing: "2px" }}
            >
              {l.label}
            </a>
          ))}
          <a href="#contatti" className="btn-lime !py-2.5 !px-5 !text-[11px]">Richiedi Demo</a>
        </div>
        <a href="#contatti" className="md:hidden btn-lime !py-2 !px-4 !text-[10px]">Demo</a>
      </div>
    </nav>
  );
}
