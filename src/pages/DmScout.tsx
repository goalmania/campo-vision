import { useFadeUp } from "@/hooks/useFadeUp";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useJsonLd } from "@/hooks/useJsonLd";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import logoDmscout from "@/assets/logo-dmscout.webp";
import { ArrowRight, Check } from "lucide-react";
import { Tag, SectionTitle, DMSHOTS, DM_FEATURES, ScreenshotGallery } from "./Index";

const TITLE = "DM Scout — Software di Scouting Calcistico con AI";
const DESCRIPTION =
  "DM Scout è la piattaforma di scouting calcistico professionale con AI per scout, agenti FIFA e direttori sportivi. Carica un PDF e ottieni la scheda giocatore completa in secondi: radar 6 assi, confronto multi-giocatore, Fit Score tattico.";
const CANONICAL = "https://dmfootballservices.it/dmscout";

const HIGHLIGHTS = [
  "AI Report da PDF/DOCX/TXT in pochi secondi",
  "Radar a 6 assi con 100+ skills mappate",
  "Confronto fino a 6 giocatori con highlight automatico",
  "Fit Score tattico per 60+ ruoli e moduli",
  "Mappa interattiva Italia e Mondo",
  "Compatibile con Wyscout, InStat, FBref",
];

const DmScout = () => {
  useFadeUp();
  useDocumentMeta({ title: TITLE, description: DESCRIPTION, canonical: CANONICAL });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dmfootballservices.it/" },
      { "@type": "ListItem", position: 2, name: "DM Scout", item: CANONICAL },
    ],
  });

  return (
    <div id="top" className="relative">
      <Nav />

      {/* HEADER */}
      <section className="relative pt-[60px] border-b border-cis-line" style={{ background: "#0c0c0c" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="fade-up flex items-center gap-4 mb-6">
            <img src={logoDmscout} alt="DM Scout" style={{ height: 56, width: "auto" }} className="select-none" draggable={false} />
            <span className="badge-gold">Per agenzie & scout</span>
          </div>
          <h1
            className="fade-up font-display font-black uppercase text-cis-white"
            data-delay="80"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.2rem)", lineHeight: 0.95, letterSpacing: "-0.01em" }}
          >
            Lo scouting moderno, con l'AI.
          </h1>
          <p className="fade-up mt-7 font-body text-cis-muted text-[1.1rem] max-w-2xl" data-delay="160">
            DM Scout è la piattaforma di scouting calcistico professionale con intelligenza artificiale per scout,
            agenti FIFA, direttori sportivi e responsabili del settore giovanile. Carica un report in PDF, DOCX o
            TXT e l'AI genera automaticamente la scheda giocatore completa in pochi secondi, senza template specifici.
          </p>
          <ul className="fade-up mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-2.5 max-w-2xl" data-delay="220">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <Check size={14} className="text-cis-gold mt-1 flex-shrink-0" strokeWidth={2.4} />
                <span className="font-body text-[13.5px] text-cis-white/85 leading-snug">{h}</span>
              </li>
            ))}
          </ul>
          <div className="fade-up mt-10 flex flex-wrap gap-3" data-delay="280">
            <a href="https://dmscout.it" target="_blank" rel="noopener noreferrer" className="btn-gold">
              Prova DM Scout — 7 giorni gratis <ArrowRight size={15} />
            </a>
            <a href="/#prezzi" className="btn-outline">Vedi il prezzo</a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-24 md:py-32 border-b border-cis-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionTitle
            tag="Cosa puoi fare"
            title={<span>Ogni funzione, per il flusso reale dello scout.</span>}
            sub="Niente rumore, solo decisioni: dal report al verdetto in pochi click."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DM_FEATURES.map((f, i) => (
              <div key={f.title} className="card-cis gold fade-up p-6" data-delay={String((i % 3) * 60)}>
                <f.icon size={22} className="text-cis-gold" strokeWidth={1.6} />
                <div className="font-display font-bold uppercase text-cis-white text-[15px] mt-4" style={{ letterSpacing: "0.08em" }}>
                  {f.title}
                </div>
                <p className="font-body text-[13.5px] text-cis-muted mt-2 leading-relaxed">{f.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check size={12} className="text-cis-gold mt-1 flex-shrink-0" strokeWidth={2.6} />
                      <span className="font-body text-[12.5px] text-cis-white/80 leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section className="relative py-24 md:py-32 border-b border-cis-line" style={{ background: "#0c0c0c" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionTitle
            tag="Schermate reali"
            title={<span>Com'è fatto DM Scout.</span>}
          />
          <div className="mt-14 fade-up">
            <ScreenshotGallery shots={DMSHOTS} accent="gold" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-36 border-b border-cis-line overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,179,0,0.08), transparent 70%)" }}
        />
        <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center">
          <div className="fade-up"><Tag>Pronti?</Tag></div>
          <h2
            className="fade-up font-display font-black text-cis-white uppercase mt-6"
            data-delay="80"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", lineHeight: 0.95 }}
          >
            Digitalizza il tuo scouting oggi.
          </h2>
          <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3" data-delay="180">
            <a href="https://dmscout.it" target="_blank" rel="noopener noreferrer" className="btn-gold">
              Prova DM Scout — 7 giorni <ArrowRight size={15} />
            </a>
            <a href="/" className="btn-outline">Torna alla home</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative pt-14 pb-10" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <a href="/"><Logo /></a>
            <div className="flex flex-wrap items-center gap-7">
              <a href="/clubis" className="nav-link">ClubIS</a>
              <a href="/dmscout" className="nav-link active">DM Scout</a>
              <a href="/risorse" className="nav-link">Risorse</a>
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

export default DmScout;
