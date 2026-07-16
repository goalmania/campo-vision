import { useFadeUp } from "@/hooks/useFadeUp";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useJsonLd } from "@/hooks/useJsonLd";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import logoClubis from "@/assets/logo-clubis.webp";
import { ArrowRight, Check } from "lucide-react";
import {
  Tag, SectionTitle, ROLES, CLUBSHOTS, RoleCard, ScreenshotGallery,
} from "./Index";

const TITLE = "ClubIS — Gestionale per Squadre e Società di Calcio Strutturate";
const DESCRIPTION =
  "ClubIS è il gestionale per squadre e società di calcio strutturate: 11 dashboard per ruolo, automazione FIGC/LND, Financial Fair Play, distinte gara e rimborsi SEPA. Per club di Eccellenza, Promozione e Serie D.";
const CANONICAL = "https://dmfootballservices.it/clubis";

const HIGHLIGHTS = [
  "11 dashboard role-based, una per ogni ruolo del club",
  "Analisi automatica Comunicati Ufficiali FIGC/LND in 60 secondi",
  "Distinte gara con controllo squalifiche automatico",
  "Rimborsi SEPA in batch: file XML pronto per la banca",
  "Financial Fair Play in tempo reale",
  "Settore giovanile multi-squadra nella stessa piattaforma",
];

const ClubIS = () => {
  useFadeUp();
  useDocumentMeta({ title: TITLE, description: DESCRIPTION, canonical: CANONICAL });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dmfootballservices.it/" },
      { "@type": "ListItem", position: 2, name: "ClubIS", item: CANONICAL },
    ],
  });

  return (
    <div id="top" className="relative">
      <Nav />

      {/* HEADER */}
      <section className="relative pt-[60px] border-b border-cis-line" style={{ background: "#0c0c0c" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="fade-up flex items-center gap-4 mb-6">
            <img src={logoClubis} alt="ClubIS" style={{ height: 46, width: "auto" }} className="select-none" draggable={false} />
            <span className="badge-green">Per società strutturate</span>
          </div>
          <h1
            className="fade-up font-display font-black uppercase text-cis-white"
            data-delay="80"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.2rem)", lineHeight: 0.95, letterSpacing: "-0.01em" }}
          >
            Il gestionale per squadre e società di calcio strutturate.
          </h1>
          <p className="fade-up mt-7 font-body text-cis-muted text-[1.1rem] max-w-2xl" data-delay="160">
            ClubIS sostituisce fogli Excel, chat WhatsApp e PDF sparsi con un'unica piattaforma condivisa tra
            presidenza, segreteria, area tecnica, mercato, staff medico e famiglie. Costruito nativamente per il
            calcio italiano di Eccellenza, Promozione e Serie D, con automazione diretta dei processi FIGC e LND.
          </p>
          <ul className="fade-up mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-2.5 max-w-2xl" data-delay="220">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <Check size={14} className="text-cis-green mt-1 flex-shrink-0" strokeWidth={2.4} />
                <span className="font-body text-[13.5px] text-cis-white/85 leading-snug">{h}</span>
              </li>
            ))}
          </ul>
          <div className="fade-up mt-10 flex flex-wrap gap-3" data-delay="280">
            <a href="https://clubis.it/registrati?piano=pro" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Prova ClubIS — 7 giorni gratis <ArrowRight size={15} />
            </a>
            <a href="/#prezzi" className="btn-outline">Vedi i piani e i prezzi</a>
          </div>
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section className="relative py-24 md:py-32 border-b border-cis-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionTitle
            tag="Schermate reali"
            title={<span>Com'è fatto ClubIS.</span>}
            sub="Ogni schermata è presa dal prodotto in uso, non un mockup."
          />
          <div className="mt-16 fade-up">
            <ScreenshotGallery shots={CLUBSHOTS} accent="green" />
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="relative py-24 md:py-32 border-b border-cis-line" style={{ background: "#0c0c0c" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionTitle
            tag="Dashboard per ruolo"
            title={<span>11 ruoli. Una dashboard ciascuno.</span>}
            sub="Ogni ruolo vede solo le funzioni che gli servono. Apri ogni card per i dettagli."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {ROLES.map((r, i) => (
              <RoleCard role={r} key={r.name} delay={(i % 3) * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 md:py-36 border-b border-cis-line overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200,240,0,0.08), transparent 70%)" }}
        />
        <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center">
          <div className="fade-up"><Tag>Pronti?</Tag></div>
          <h2
            className="fade-up font-display font-black text-cis-white uppercase mt-6"
            data-delay="80"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", lineHeight: 0.95 }}
          >
            Porta la tua società al livello successivo.
          </h2>
          <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3" data-delay="180">
            <a href="https://clubis.it/registrati?piano=pro" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Prova ClubIS — 7 giorni <ArrowRight size={15} />
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
              <a href="/clubis" className="nav-link active">ClubIS</a>
              <a href="/dmscout" className="nav-link">DM Scout</a>
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

export default ClubIS;
