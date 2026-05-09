import { useState } from "react";
import { useFadeUp } from "@/hooks/useFadeUp";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import PitchCanvas from "@/components/PitchCanvas";
import logoClubis from "@/assets/logo-clubis.png";
import logoDmscout from "@/assets/logo-dmscout.png";
import shotDashboard from "@/assets/dmscout-dashboard.png";
import shotDatabase from "@/assets/dmscout-database.png";
import shotScheda from "@/assets/dmscout-scheda.png";
import shotRadar from "@/assets/dmscout-radar.png";
import shotConfronto from "@/assets/dmscout-confronto.png";
import shotAggiungi from "@/assets/dmscout-aggiungi.png";
import shotMappa from "@/assets/dmscout-mappa.png";
import {
  ArrowRight, Check, Crown, ClipboardList, Target, FolderOpen, Search, Trophy,
  ClipboardCheck, Users, Stethoscope, Newspaper, Wrench, ChevronDown,
} from "lucide-react";

/* ───────────── helpers ───────────── */
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="tag">{children}</span>
);

const SectionTitle = ({
  tag, title, sub, align = "left",
}: { tag: string; title: React.ReactNode; sub?: string; align?: "left" | "center" }) => (
  <div className={align === "center" ? "text-center" : ""}>
    <div className="fade-up"><Tag>{tag}</Tag></div>
    <h2
      className="fade-up font-display font-black text-cis-white uppercase mt-5"
      data-delay="80"
      style={{ fontSize: "clamp(40px, 6vw, 5.5rem)", lineHeight: 0.92, letterSpacing: "-0.01em" }}
    >
      {title}
    </h2>
    {sub && (
      <p className={`fade-up font-body text-cis-muted mt-5 max-w-2xl text-[1.05rem] ${align === "center" ? "mx-auto" : ""}`} data-delay="160">
        {sub}
      </p>
    )}
  </div>
);

/* ───────────── 11 RUOLI con FUNZIONI ───────────── */
type Role = { icon: any; name: string; desc: string; functions: string[] };

const ROLES: Role[] = [
  {
    icon: Crown, name: "Presidente",
    desc: "Visione strategica, budget, obiettivi.",
    functions: [
      "Cruscotto economico-finanziario in tempo reale",
      "Budget stagionale vs consuntivo",
      "Report mensile esecutivo automatizzato",
      "Approvazione spese sopra-soglia",
      "KPI sportivi: punti, posizione, trend rosa",
      "Visione consolidata di tutti i ruoli del club",
    ],
  },
  {
    icon: ClipboardList, name: "Team Manager",
    desc: "Logistica trasferte, convocazioni, calendario.",
    functions: [
      "Gestione convocazioni e distinte gara",
      "Trasferte: pullman, hotel, pasti, rimborsi",
      "Calendario allenamenti e partite condiviso",
      "Comunicazioni verso giocatori e staff",
      "Check-list pre-partita personalizzabili",
      "Storico trasferte e costi associati",
    ],
  },
  {
    icon: Target, name: "Direttore Sportivo",
    desc: "Mercato, scouting, rose, trattative.",
    functions: [
      "Dashboard DS completa con rosa e contratti",
      "Pipeline trattative in entrata/uscita",
      "Scouting nativo con export PDF",
      "Integrazione DM Scout per importare schede",
      "Analisi automatica del C.U. FIGC",
      "Gestione valori di mercato e clausole",
      "Schema tattico interattivo",
    ],
  },
  {
    icon: FolderOpen, name: "Segretario",
    desc: "Documenti, tesseramenti, scadenze federali.",
    functions: [
      "Tesseramenti e cartellini centralizzati",
      "Scadenze FIGC con alert automatici",
      "Quote iscrizione e piani rateali",
      "Rimborsi SEPA in batch",
      "Prima nota e rendiconto",
      "Registro IVA sincronizzato",
      "Archivio documentale per giocatore",
    ],
  },
  {
    icon: Search, name: "Osservatore",
    desc: "Report giocatori, valutazioni, shortlist.",
    functions: [
      "Schede osservazione strutturate",
      "Shortlist personali e condivise",
      "Tag tattici e potenziale",
      "Calendario partite da osservare",
      "Sincronizzazione con DM Scout",
      "Export report PDF brandizzato",
    ],
  },
  {
    icon: Trophy, name: "Giocatore",
    desc: "Performance personali, calendario allenamenti.",
    functions: [
      "Calendario allenamenti e partite",
      "Performance individuali stagionali",
      "Comunicazioni dirette con staff",
      "Stato fisico e valutazioni mediche",
      "Storico minutaggio e gol",
      "Conferma presenza allenamenti",
    ],
  },
  {
    icon: ClipboardCheck, name: "Allenatore",
    desc: "Sessioni, tattiche, statistiche squadra.",
    functions: [
      "Pianificazione sessioni di allenamento",
      "Schema tattico interattivo per ruoli e moduli",
      "Statistiche squadra e individuali",
      "Convocazioni e gestione presenze",
      "Note giocatore (riservate)",
      "Confronto rendimento partita per partita",
    ],
  },
  {
    icon: Users, name: "Famiglie",
    desc: "Comunicazioni, calendario, rimborsi.",
    functions: [
      "Calendario partite e allenamenti del giocatore",
      "Comunicazioni ufficiali del club",
      "Quote, pagamenti e ricevute",
      "Stato certificato medico",
      "Autorizzazioni trasferte",
      "Contatti diretti con segretario e medico",
    ],
  },
  {
    icon: Stethoscope, name: "Medico",
    desc: "Cartelle sanitarie, infortuni, idoneità.",
    functions: [
      "Cartelle sanitarie digitali per giocatore",
      "Certificati medici con avvisi automatici di scadenza",
      "Registro infortuni e tempi di recupero",
      "Idoneità sportive: stato e rinnovi",
      "Calendario visite mediche",
      "Comunicazione diretta a staff e famiglie",
    ],
  },
  {
    icon: Newspaper, name: "Ufficio Stampa",
    desc: "Comunicati, social, gestione media.",
    functions: [
      "Editor comunicati stampa",
      "Pianificazione contenuti social",
      "Gestione richieste media",
      "Archivio foto e video di partita",
      "Statistiche da pubblicare in tempo reale",
      "Storico pubblicazioni e clipping",
    ],
  },
  {
    icon: Wrench, name: "Custode",
    desc: "Strutture, impianti, manutenzione.",
    functions: [
      "Calendario utilizzo impianti",
      "Ticket manutenzione",
      "Inventario materiali e attrezzature",
      "Check-list pulizie e sicurezza",
      "Gestione accessi e chiavi",
      "Storico interventi",
    ],
  },
];

/* ───────────── DM Scout screenshots ───────────── */
const DMSHOTS = [
  { src: shotDashboard, label: "Dashboard", desc: "Cruscotto scouting con KPI in tempo reale: giocatori totali, verdetti BUY, high potential, campionati monitorati." },
  { src: shotDatabase,  label: "Database",  desc: "Database giocatori filtrabile per ruolo, piede, età, tag, verdetto, ruolo tattico, campionato. Vista grid, list o mapping." },
  { src: shotScheda,    label: "Scheda Giocatore", desc: "Scheda completa: anagrafica, posizione in campo, ruoli tattici con Fit Score % per modulo." },
  { src: shotRadar,     label: "Radar & Skills", desc: "Radar a 6 assi (Tecnica, Tattica, Fisico, Mentalità, Decisioni, Potenziale) e valutazione a stelle." },
  { src: shotConfronto, label: "Confronto", desc: "Confronto fino a 6 giocatori sulle 100+ skills, evidenziando il vincitore di ogni metrica." },
  { src: shotAggiungi,  label: "AI Report", desc: "Carica un PDF / DOCX / TXT: l'AI genera la scheda completa e la salva nel database. Zero inserimento manuale." },
  { src: shotMappa,     label: "Mappa",     desc: "Mappa interattiva Italia o Mondo con clustering automatico dei giocatori e filtri rapidi." },
];

/* ───────────── Page ───────────── */
const Index = () => {
  useFadeUp();

  return (
    <div id="top" className="relative">
      <Nav />

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-[60px] overflow-hidden"
      >
        {/* 3D Pitch background */}
        <div className="absolute inset-0">
          <PitchCanvas />
        </div>
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 25%, rgba(0,200,83,0.10), transparent 70%), linear-gradient(to bottom, rgba(10,10,10,0.55), rgba(10,10,10,0.85))",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 w-full">
          <div className="fade-up"><Tag>DM Football Services</Tag></div>
          <h1
            className="font-display font-black uppercase mt-7 fade-up"
            data-delay="80"
            style={{
              fontSize: "clamp(2.6rem, 8.5vw, 6.8rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.015em",
            }}
          >
            <span className="block text-cis-white">Tecnologia per il calcio</span>
            <span className="block text-outline">che capisce</span>
            <span className="block text-cis-green">il tuo lavoro.</span>
          </h1>
          <p className="fade-up mt-8 font-body text-cis-muted text-[1.1rem] max-w-[600px]" data-delay="160">
            Due prodotti. Un ecosistema. <span className="text-cis-white">ClubIS</span> per la gestione completa del club, <span className="text-cis-white">DM Scout</span> per lo scouting professionale. Nati nel calcio italiano, fatti per chi lo vive davvero.
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-3" data-delay="240">
            <a href="#clubis" className="btn-primary">Scopri ClubIS <ArrowRight size={15} /></a>
            <a href="#dmscout" className="btn-outline">Scopri DM Scout <ArrowRight size={15} /></a>
          </div>

          {/* Stats */}
          <div className="mt-20 fade-up grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 border-t border-cis-line pt-10" data-delay="320">
            {[
              { v: "11", l: "Ruoli Dashboard" },
              { v: "100+", l: "Funzionalità" },
              { v: "2", l: "Prodotti Integrati" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display font-black text-cis-green text-[2.6rem] leading-none">{s.v}</div>
                <div className="font-display font-bold uppercase text-cis-muted text-[11px] mt-2" style={{ letterSpacing: "0.18em" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CLUBIS ═══════════════ */}
      <section id="clubis" className="relative py-28 md:py-36 border-t border-cis-line" style={{ background: "#0c0c0c" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="fade-up flex items-center gap-4 mb-6">
            <img src={logoClubis} alt="ClubIS" style={{ height: 46, width: "auto" }} className="select-none" draggable={false} />
            <span className="badge-green">Per i Club</span>
          </div>
          <SectionTitle
            tag="Gestionale per Club"
            title={<><span>Gestisci tutto il club.</span></>}
            sub="La piattaforma operativa completa per club di Eccellenza, Promozione, Serie D e settore giovanile multi-squadra."
          />

          {/* Roles — click to expand */}
          <div className="mt-24">
            <div className="fade-up"><Tag>Dashboard per ruolo</Tag></div>
            <h3 className="fade-up font-display font-black text-cis-white uppercase mt-5 text-3xl md:text-4xl" data-delay="80" style={{ letterSpacing: "-0.005em" }}>
              11 ruoli. Clicca per scoprire le funzioni.
            </h3>
            <p className="fade-up font-body text-cis-muted mt-4 max-w-2xl" data-delay="160">
              Ogni ruolo ha la sua dashboard con permessi e funzioni dedicate. Apri ogni card per vedere cosa può fare.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ROLES.map((r, i) => (
                <RoleCard role={r} key={r.name} delay={(i % 3) * 60} />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 fade-up flex flex-wrap gap-3">
            <a href="#prezzi" className="btn-primary">Scopri ClubIS <ArrowRight size={15} /></a>
            <a href="#contatti" className="btn-outline">Richiedi una demo <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      {/* ═══════════════ DM SCOUT ═══════════════ */}
      <section id="dmscout" className="relative py-28 md:py-36 border-t border-cis-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="fade-up flex items-center gap-4 mb-6">
            <img src={logoDmscout} alt="DM Scout" style={{ height: 56, width: "auto" }} className="select-none" draggable={false} />
            <span className="badge-gold">Per agenzie & scout</span>
          </div>
          <SectionTitle
            tag="Piattaforma Scouting"
            title="DM Scout"
            sub="Il software di scouting che gli scout professionisti usano davvero. AI, radar, confronto fino a 6 giocatori, mappa interattiva."
          />

          {/* Screenshot gallery */}
          <div className="mt-20 fade-up">
            <ScreenshotGallery shots={DMSHOTS} />
          </div>

          <div className="mt-16 fade-up flex flex-wrap gap-3">
            <a href="#prezzi" className="btn-gold">Scopri DM Scout <ArrowRight size={15} /></a>
            <a href="#contatti" className="btn-outline">Richiedi una demo <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      {/* ═══════════════ PREZZI ═══════════════ */}
      <Pricing />

      {/* ═══════════════ CTA FINALE ═══════════════ */}
      <section id="contatti" className="relative py-32 md:py-40 border-t border-cis-line overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0,200,83,0.08), transparent 70%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-6 md:px-10 text-center">
          <div className="fade-up"><Tag>Pronti?</Tag></div>
          <h2
            className="fade-up font-display font-black text-cis-white uppercase mt-6"
            data-delay="80"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 0.92, letterSpacing: "-0.01em" }}
          >
            <span className="block">Pronto a portare</span>
            <span className="block">il tuo club</span>
            <span className="block text-cis-green">al livello successivo?</span>
          </h2>
          <p className="fade-up font-body text-cis-muted mt-7 max-w-xl mx-auto text-[1.05rem]" data-delay="160">
            Inizia con 7 giorni di prova gratuita. Nessuna carta di credito richiesta.
          </p>
          <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3" data-delay="240">
            <a href="mailto:info@dmfootballservices.it?subject=Prova%20ClubIS" className="btn-primary">
              Prova ClubIS — 7 giorni <ArrowRight size={15} />
            </a>
            <a href="mailto:info@dmfootballservices.it?subject=Prova%20DM%20Scout" className="btn-gold">
              Prova DM Scout — 7 giorni <ArrowRight size={15} />
            </a>
          </div>
          <p className="fade-up font-body text-cis-muted text-sm mt-8" data-delay="320">
            Hai domande? Scrivici a{" "}
            <a href="mailto:info@dmfootballservices.it" className="text-cis-white hover:text-cis-green underline underline-offset-4">
              info@dmfootballservices.it
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative pt-14 pb-10 border-t border-cis-line" style={{ background: "#111111" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <Logo />
            <div className="flex flex-wrap items-center gap-7">
              <a href="#clubis" className="nav-link">ClubIS</a>
              <a href="#dmscout" className="nav-link">DM Scout</a>
              <a href="#prezzi" className="nav-link">Prezzi</a>
              <a href="#contatti" className="nav-link">Contatti</a>
            </div>
          </div>
          <div className="my-9 h-px bg-cis-line" />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-cis-muted">
            <div className="flex flex-wrap gap-5 font-display font-bold text-[11px] uppercase" style={{ letterSpacing: "0.16em" }}>
              <a href="#" className="hover:text-cis-white">Privacy Policy</a>
              <a href="#" className="hover:text-cis-white">Termini di Servizio</a>
              <a href="#" className="hover:text-cis-white">Cookie Policy</a>
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

/* ───────────── Role Card (expandable) ───────────── */
function RoleCard({ role, delay }: { role: Role; delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="card-cis fade-up overflow-hidden"
      data-delay={String(delay)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left p-5 flex items-start gap-4 group"
        aria-expanded={open}
      >
        <role.icon size={24} className="text-cis-green mt-0.5 flex-shrink-0" strokeWidth={1.6} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="font-display font-bold uppercase text-cis-white text-[15px]" style={{ letterSpacing: "0.08em" }}>
              {role.name}
            </div>
            <ChevronDown
              size={18}
              className={`text-cis-muted group-hover:text-cis-green transition-transform duration-200 ${open ? "rotate-180 text-cis-green" : ""}`}
            />
          </div>
          <div className="font-body text-[13px] text-cis-muted mt-1.5 leading-snug">
            {role.desc}
          </div>
        </div>
      </button>
      <div
        style={{
          maxHeight: open ? 600 : 0,
          transition: "max-height 0.35s ease",
        }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 pt-1 border-t border-cis-line/70">
          <div className="font-display font-bold uppercase text-cis-green text-[10px] mt-3 mb-2.5" style={{ letterSpacing: "0.18em" }}>
            Funzioni incluse
          </div>
          <ul className="space-y-2">
            {role.functions.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check size={13} className="text-cis-green mt-1 flex-shrink-0" strokeWidth={2.4} />
                <span className="font-body text-[13.5px] text-cis-white/85 leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Screenshot Gallery (DM Scout) ───────────── */
function ScreenshotGallery({ shots }: { shots: { src: string; label: string; desc: string }[] }) {
  const [idx, setIdx] = useState(0);
  const cur = shots[idx];
  return (
    <div className="card-cis overflow-hidden">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-cis-line bg-[#101010]">
        {shots.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setIdx(i)}
            className={`font-display font-bold uppercase text-[11px] px-3 py-2 rounded-md transition-colors ${
              i === idx
                ? "bg-cis-green text-cis-black"
                : "text-cis-muted hover:text-cis-white"
            }`}
            style={{ letterSpacing: "0.14em" }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="p-3 sm:p-5 bg-[#0a0a0a]">
        <div className="rounded-lg overflow-hidden border border-cis-line">
          <img
            src={cur.src}
            alt={`DM Scout — ${cur.label}`}
            className="w-full h-auto block"
            loading="lazy"
          />
        </div>
        <p className="font-body text-cis-muted text-sm mt-4 px-1">{cur.desc}</p>
      </div>
    </div>
  );
}

/* ───────────── Pricing ───────────── */
function Pricing() {
  const [annual, setAnnual] = useState(false);
  const discount = 0.85; // 15% off
  const fmt = (m: number) => {
    const monthly = annual ? Math.round(m * discount) : m;
    return monthly;
  };

  return (
    <section id="prezzi" className="relative py-28 md:py-36 border-t border-cis-line" style={{ background: "#0c0c0c" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionTitle
          tag="Prezzi"
          title="Piani semplici, senza sorprese."
          sub="Nessun costo di attivazione. Cancellazione in qualsiasi momento. 7 giorni di prova gratuita su entrambi i prodotti."
          align="center"
        />

        {/* Billing toggle */}
        <div className="mt-12 flex justify-center fade-up">
          <div className="inline-flex items-center gap-2 p-1 rounded-full border border-cis-line bg-cis-card">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full font-display font-bold uppercase text-[11px] transition-colors ${
                !annual ? "bg-cis-green text-cis-black" : "text-cis-muted hover:text-cis-white"
              }`}
              style={{ letterSpacing: "0.14em" }}
            >
              Mensile
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full font-display font-bold uppercase text-[11px] transition-colors flex items-center gap-2 ${
                annual ? "bg-cis-green text-cis-black" : "text-cis-muted hover:text-cis-white"
              }`}
              style={{ letterSpacing: "0.14em" }}
            >
              Annuale
              <span
                className="px-1.5 py-0.5 rounded text-[9px]"
                style={{
                  background: annual ? "rgba(10,10,10,0.18)" : "rgba(0,200,83,0.18)",
                  color: annual ? "#0a0a0a" : "#00C853",
                }}
              >
                -15%
              </span>
            </button>
          </div>
        </div>

        {/* ClubIS plans */}
        <div className="mt-16">
          <div className="fade-up flex items-center gap-3 mb-8">
            <img src={logoClubis} alt="ClubIS" style={{ height: 36, width: "auto" }} draggable={false} />
            <span className="font-display font-bold text-cis-muted text-xs uppercase" style={{ letterSpacing: "0.18em" }}>— Piani per i Club</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            <PlanCard
              name="Starter"
              tagline="Per Eccellenza / Promozione"
              price={fmt(59)}
              annual={annual}
              variant="default"
              cta="Inizia Prova Gratuita"
              features={[
                "Gestione rosa e tesseramenti",
                "Certificati medici con avvisi automatici",
                "Quote iscrizione e piani rateali",
                "Calendario e distinte gara",
                "Prima nota e rendiconto",
                "11 dashboard role-based (presidente, team manager, DS, segretario, osservatore, giocatore, allenatore, famiglie, medico, ufficio stampa, custode)",
                "Settore giovanile multi-squadra",
                "Supporto email entro 48h",
              ]}
            />
            <PlanCard
              name="Pro"
              tagline="Per Serie D e semiprofessionismo"
              price={fmt(99)}
              annual={annual}
              variant="featured"
              ribbon="Most Popular"
              cta="Inizia Prova Gratuita"
              features={[
                "Tutto Starter, più:",
                "Dashboard DS completa",
                "Analisi automatica C.U. FIGC",
                "Scouting nativo con export PDF",
                "Schema tattico interattivo",
                "Rimborsi SEPA batch",
                "Registro IVA sincronizzato",
                "Supporto email 24h + onboarding call 1h",
              ]}
            />
            <PlanCard
              name="Elite"
              tagline="Per club strutturati"
              price={fmt(179)}
              annual={annual}
              variant="default"
              cta="Inizia Prova Gratuita"
              features={[
                "Tutto Pro, più:",
                "DM Scout integrato completo",
                "Utenti illimitati",
                "Onboarding dedicato 2 sessioni",
                "Supporto prioritario 4h (WhatsApp diretto)",
                "Report mensile esecutivo automatizzato",
                "Early access nuove funzioni",
              ]}
            />
          </div>
        </div>

        {/* DM Scout plan */}
        <div className="mt-20">
          <div className="fade-up flex items-center gap-3 mb-8">
            <img src={logoDmscout} alt="DM Scout" style={{ height: 44, width: "auto" }} draggable={false} />
            <span className="font-display font-bold text-cis-muted text-xs uppercase" style={{ letterSpacing: "0.18em" }}>— Piano per agenzie & scout</span>
          </div>

          <div className="max-w-xl">
            <PlanCard
              name="DM Scout"
              tagline="Tutto incluso, un unico piano."
              price={fmt(49)}
              annual={annual}
              variant="gold"
              ribbon="Tutto incluso"
              cta="Inizia Prova Gratuita"
              features={[
                "Report giocatori illimitati",
                "Caricamento AI da PDF / DOCX / TXT",
                "Generatore report da testo libero",
                "Scheda completa con radar 6 assi e fit tattico",
                "Confronto fino a 6 giocatori simultanei",
                "Mappa geografica Italia e Mondo",
                "Marketplace cross-scout con sistema accessi",
                "Squad Builder e Match Planner",
                "100+ campi statistici (InStat, Wyscout, FBref)",
                "Export PDF, CSV, JSON",
                "Sincronizzazione real-time multi-device",
              ]}
            />
          </div>
        </div>

        <p className="fade-up text-center font-body text-cis-muted text-sm mt-14">
          Tutti i prezzi sono IVA esclusa. Nessun costo di attivazione. 7 giorni di prova gratuita. Cancellazione in qualsiasi momento.
          {annual && <span className="text-cis-green"> · Stai risparmiando il 15% con il pagamento annuale.</span>}
        </p>
      </div>
    </section>
  );
}

/* ───────────── Plan Card ───────────── */
function PlanCard({
  name, tagline, price, annual, features, cta, variant, ribbon,
}: {
  name: string;
  tagline: string;
  price: number;
  annual: boolean;
  features: string[];
  cta: string;
  variant: "default" | "featured" | "gold";
  ribbon?: string;
}) {
  const isFeatured = variant === "featured";
  const isGold = variant === "gold";
  const accent = isGold ? "text-cis-gold" : "text-cis-green";
  const ringStyle: React.CSSProperties = isFeatured
    ? { borderColor: "#00C853" }
    : isGold
    ? { borderColor: "#FFB300" }
    : {};

  return (
    <div className={`card-cis ${isGold ? "gold" : ""} p-7 md:p-8 fade-up relative rounded-xl`} style={ringStyle}>
      {ribbon && (
        <span
          className="absolute -top-3 left-7 font-display font-black uppercase text-[10px] px-2.5 py-1 rounded"
          style={{
            background: isGold ? "#FFB300" : "#00C853",
            color: "#0a0a0a",
            letterSpacing: "0.18em",
          }}
        >
          {ribbon}
        </span>
      )}
      <div className="font-display font-black uppercase text-cis-white text-2xl" style={{ letterSpacing: "0.08em" }}>
        {name}
      </div>
      <div className="font-display font-bold uppercase text-cis-muted text-[10px] mt-1.5" style={{ letterSpacing: "0.18em" }}>
        {tagline}
      </div>
      <div className="mt-5 flex items-baseline gap-2">
        <span className={`font-display font-black ${accent} text-5xl leading-none`}>€{price}</span>
        <span className="font-body text-cis-muted text-sm">/ mese</span>
      </div>
      <div className="font-body text-[12px] text-cis-muted mt-1.5">
        {annual ? "fatturato annualmente — 15% di sconto applicato" : "fatturato mensilmente"}
      </div>

      <ul className="mt-6 space-y-2.5">
        {features.map((f, i) => {
          const isPrefix = i === 0 && f.startsWith("Tutto");
          return (
            <li key={f} className="flex items-start gap-3">
              {isPrefix ? (
                <span className={`${accent} mt-0.5 flex-shrink-0 font-display font-black text-sm`}>+</span>
              ) : (
                <Check size={15} className={`${accent} mt-1 flex-shrink-0`} strokeWidth={2.4} />
              )}
              <span className={`font-body text-[14px] leading-snug ${isPrefix ? "text-cis-white font-semibold" : "text-cis-white/85"}`}>
                {f}
              </span>
            </li>
          );
        })}
      </ul>
      <a
        href="#contatti"
        className={`${isGold ? "btn-gold" : "btn-primary"} mt-7 w-full justify-center rounded-lg`}
      >
        {cta} <ArrowRight size={15} />
      </a>
      <div className="text-center font-body text-cis-muted text-[12px] mt-3">
        7 giorni gratis · nessuna carta richiesta
      </div>
    </div>
  );
}

export default Index;
