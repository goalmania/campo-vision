import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#clubis", label: "ClubIS", id: "clubis" },
  { href: "#dmscout", label: "DM Scout", id: "dmscout" },
  { href: "#prezzi", label: "Prezzi", id: "prezzi" },
  { href: "#contatti", label: "Contatti", id: "contatti" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = links.map((l) => l.id);
    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[999] h-[60px]"
      style={{
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid #2a2a2a",
      }}
    >
      <div className="max-w-7xl mx-auto h-full px-5 md:px-8 flex items-center justify-between">
        <a href="#home" onClick={() => setOpen(false)}><Logo /></a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              className={`nav-link ${active === l.id ? "active" : ""}`}
            >
              {l.label}
            </a>
          ))}
          <a href="#contatti" className="btn-primary !py-2.5 !px-4 !text-[12px]">
            Inizia Gratis <ArrowRight size={14} />
          </a>
        </div>

        <button
          aria-label="Menu"
          aria-expanded={open}
          className="md:hidden text-cis-white flex items-center justify-center -mr-2"
          style={{ width: 48, height: 48 }}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-[60px] left-0 right-0 bg-cis-black border-b border-cis-line">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`nav-link text-base ${active === l.id ? "active" : ""}`}
              >
                {l.label}
              </a>
            ))}
            <a href="#contatti" onClick={() => setOpen(false)} className="btn-primary self-start">
              Inizia Gratis <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
