import { useFadeUp } from "@/hooks/useFadeUp";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import { ArrowRight } from "lucide-react";
import { ARTICLES } from "@/data/articles";

const TITLE = "Risorse — Guide per Società di Calcio Strutturate | ClubIS";
const DESCRIPTION =
  "Guide pratiche su Financial Fair Play, Comunicati Ufficiali FIGC e tesseramenti per segretari, presidenti e direttori sportivi di società di calcio strutturate.";
const CANONICAL = "https://dmfootballservices.it/risorse";

const Resources = () => {
  useFadeUp();
  useDocumentMeta({ title: TITLE, description: DESCRIPTION, canonical: CANONICAL });

  return (
    <div id="top" className="relative">
      <Nav />

      <section className="relative pt-[60px] border-b border-cis-line" style={{ background: "#0c0c0c" }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-28">
          <div className="fade-up"><span className="tag">Risorse</span></div>
          <h1
            className="fade-up font-display font-black uppercase text-cis-white mt-5"
            data-delay="80"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", lineHeight: 0.95, letterSpacing: "-0.01em" }}
          >
            Guide per società e squadre di calcio strutturate.
          </h1>
          <p className="fade-up mt-6 font-body text-cis-muted text-[1.05rem] max-w-2xl" data-delay="160">
            Approfondimenti pratici su Financial Fair Play, burocrazia FIGC e gestione tesseramenti — scritti per chi
            gestisce davvero un club, non per addetti ai lavori.
          </p>
        </div>
      </section>

      <section className="relative py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {ARTICLES.map((a) => (
              <a
                key={a.slug}
                href={`/risorse/${a.slug}`}
                className="card-cis fade-up p-7 block hover:border-cis-green transition-colors"
              >
                <div className="font-display font-bold uppercase text-cis-muted text-[11px]" style={{ letterSpacing: "0.14em" }}>
                  {a.readingMinutes} min di lettura
                </div>
                <h2 className="font-display font-bold text-cis-white text-lg mt-3 leading-snug">{a.title}</h2>
                <p className="font-body text-[13.5px] text-cis-muted mt-3 leading-relaxed">{a.description}</p>
                <div className="mt-5 font-display font-bold uppercase text-cis-green text-[12px] flex items-center gap-2" style={{ letterSpacing: "0.1em" }}>
                  Leggi la guida <ArrowRight size={14} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative pt-14 pb-10 border-t border-cis-line" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <a href="/"><Logo /></a>
            <div className="flex flex-wrap items-center gap-7">
              <a href="/clubis" className="nav-link">ClubIS</a>
              <a href="/dmscout" className="nav-link">DM Scout</a>
              <a href="/risorse" className="nav-link active">Risorse</a>
              <a href="/#prezzi" className="nav-link">Prezzi</a>
              <a href="/#contatti" className="nav-link">Contatti</a>
            </div>
          </div>
          <div className="my-9 h-px bg-cis-line" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-cis-muted">
            <div className="flex flex-wrap gap-5 font-display font-bold text-[11px] uppercase" style={{ letterSpacing: "0.16em" }}>
              <a href="/privacy" className="hover:text-cis-white">Privacy Policy</a>
              <a href="/termini" className="hover:text-cis-white">Termini di Servizio</a>
              <a href="/cookie" className="hover:text-cis-white">Cookie Policy</a>
            </div>
            <div className="font-body text-xs">
              © 2026 DM Football Services — Tutti i diritti riservati.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Resources;
