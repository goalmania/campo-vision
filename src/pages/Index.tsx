import { useFadeUp } from "@/hooks/useFadeUp";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import {
  ArrowRight, Check, Crown, ClipboardList, Target, FolderOpen, Search, Trophy,
  ClipboardCheck, Users, Stethoscope, Newspaper, Wrench, Sparkles, FileText,
  Layers, GitCompareArrows, Globe, Map, Bell, MessageCircle, Briefcase,
  Calendar, BarChart3,
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
      <p className="fade-up font-body text-cis-muted mt-5 max-w-2xl text-[1.05rem]" data-delay="160">
        {sub}
      </p>
    )}
  </div>
);

/* ───────────── 11 ROLES ───────────── */
const ROLES = [
  { icon: Crown, name: "Presidente", desc: "Visione strategica, budget, obiettivi club" },
  { icon: ClipboardList, name: "Team Manager", desc: "Logistica trasferte, convocazioni, calendario" },
  { icon: Target, name: "Direttore Sportivo", desc: "Mercato, scouting, rose, trattative" },
  { icon: FolderOpen, name: "Segretario", desc: "Documenti, tesseramenti, scadenze federali" },
  { icon: Search, name: "Osservatore", desc: "Report giocatori, valutazioni, shortlist" },
  { icon: Trophy, name: "Giocatore", desc: "Performance personali, calendario allenamenti" },
  { icon: ClipboardCheck, name: "Allenatore", desc: "Sessioni, tattiche, statistiche squadra" },
  { icon: Users, name: "Famiglie", desc: "Comunicazioni club, calendario partite, rimborsi" },
  { icon: Stethoscope, name: "Medico", desc: "Cartelle sanitarie, infortuni, idoneità" },
  { icon: Newspaper, name: "Ufficio Stampa", desc: "Comunicati, social, gestione media" },
  { icon: Wrench, name: "Custode", desc: "Strutture, impianti, manutenzione" },
];

const CLUBIS_FEATURES = [
  { badge: "Innovazione Chiave", title: "Gestione Multiruolo Intelligente", body: "Ogni utente vede solo ciò che gli serve. 11 dashboard personalizzate per ruolo con permessi granulari. Il presidente vede il budget. L'allenatore vede le tattiche. Il medico vede le idoneità. Nessuna sovrapposizione, nessun caos.", icon: Users },
  { badge: "Compliance", title: "Documenti & Scadenze Federali", body: "Tesseramenti, cartellini, scadenze FIGC — tutto centralizzato e con alert automatici prima delle scadenze critiche. Dì addio ai foglietti Excel e alle email perse.", icon: Bell },
  { badge: "Operativo", title: "Comunicazione Interna Strutturata", body: "Dal presidente al custode — un unico canale di comunicazione organizzato per ruolo e per urgenza. Convocazioni, comunicati interni, avvisi medici: tutto tracciato e storicizzato.", icon: MessageCircle },
  { badge: "DS / Scouting", title: "Gestione Rosa e Mercato", body: "Tieni traccia dell'intera rosa, dei contratti in scadenza, delle trattative in corso e delle valutazioni di mercato. Integrazione diretta con DM Scout per importare schede giocatori.", icon: Briefcase },
  { badge: "Logistica", title: "Calendario Operativo Integrato", body: "Partite, allenamenti, visite mediche, riunioni di staff — un calendario condiviso che ogni ruolo vede filtrato per le proprie responsabilità.", icon: Calendar },
  { badge: "Decisionale", title: "Reportistica & Analytics Club", body: "KPI in tempo reale: performance squadra, utilizzo rosa, costi operativi, confronto stagionale. Dati per decidere, non per riempire fogli.", icon: BarChart3 },
];

const DMSCOUT_FEATURES = [
  { badge: "AI — Esclusiva", title: "Carica Report, l'AI fa il resto", body: "Carica un PDF, un DOCX o un file di testo con le tue note. L'AI legge, estrae e compila automaticamente la scheda completa: anagrafica, ratings, statistiche, valore di mercato e verdetto finale. Zero inserimento manuale.", icon: Sparkles },
  { badge: "AI", title: "Generatore Report da Testo Libero", body: "Scrivi le tue osservazioni come preferisci — in italiano, in gergo tecnico, in appunti disordinati. L'AI le trasforma in una scheda strutturata con radar a 6 assi, skills 0-100, verdetto BUY/MONITOR/PASS.", icon: FileText },
  { badge: "Professionale", title: "Scheda Giocatore Completa", body: "Radar a 6 assi (Tecnica, Tattica, Fisico, Mentalità, Decisioni, Potenziale), 10 abilità tecniche 0-100, ruoli tattici con Fit Score % per modulo e duty, heatmap posizionale, valore di mercato min/max, timeline osservazioni nel tempo.", icon: Layers },
  { badge: "Decisionale", title: "Confronto fino a 6 Giocatori", body: "Metti fino a 6 giocatori fianco a fianco: radar sovrapposto, tabelle comparative per ratings e abilità, confronto statistiche stagionali e ultima partita con evidenza del 'winner' per ogni metrica. Esporta in PDF o CSV.", icon: GitCompareArrows },
  { badge: "Network", title: "Marketplace Cross-Scout", body: "Tutti i giocatori inseriti da tutti gli scout sulla piattaforma sono visibili (solo dati anagrafici). Puoi richiedere accesso al report completo al proprietario. Sistema di approvazione manuale. Il tuo network di scouting, digitalizzato.", icon: Globe },
  { badge: "Visualizzazione", title: "Mappa Geografica Interattiva", body: "Visualizza i tuoi giocatori su mappa Italia o Mondo con clustering automatico. Filtra per verdetto, ruolo, campionato, nazionalità. Clicca un marker per accedere direttamente alla scheda.", icon: Map },
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
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 18%, rgba(0,200,83,0.10), transparent 70%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 w-full">
          <div className="fade-up"><Tag>Tecnologia per il calcio che conta</Tag></div>
          <h1
            className="font-display font-black uppercase mt-7 fade-up"
            data-delay="80"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.015em",
            }}
          >
            <span className="block text-cis-white">Il sistema di gestione</span>
            <span className="block text-outline">che il calcio italiano</span>
            <span className="block text-cis-green">aspettava.</span>
          </h1>
          <p className="fade-up mt-8 font-body text-cis-muted text-[1.1rem] max-w-[560px]" data-delay="160">
            Due prodotti. Un ecosistema. Dalla gestione del club allo scouting avanzato — tutto in un'unica piattaforma progettata per il calcio semiprofessionistico italiano.
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
          <SectionTitle
            tag="Gestionale per Club"
            title={<><span>ClubIS</span></>}
            sub="La piattaforma operativa completa per club di Serie D ed Eccellenza."
          />

          {/* 2A Roles */}
          <div className="mt-24">
            <div className="fade-up"><Tag>Dashboard per ruolo</Tag></div>
            <h3 className="fade-up font-display font-black text-cis-white uppercase mt-5 text-3xl md:text-4xl" data-delay="80" style={{ letterSpacing: "-0.005em" }}>
              11 dashboard. Una per ogni ruolo del club.
            </h3>
            <p className="fade-up font-body text-cis-muted mt-4 max-w-2xl" data-delay="160">
              Ogni membro dello staff accede a una dashboard personalizzata per il proprio ruolo. Zero confusione, zero sprechi di tempo.
            </p>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {ROLES.map((r, i) => (
                <div key={r.name} className="card-cis p-5 fade-up" data-delay={String((i % 4) * 60)}>
                  <r.icon size={24} className="text-cis-green" strokeWidth={1.6} />
                  <div className="font-display font-bold uppercase text-cis-white text-[15px] mt-4" style={{ letterSpacing: "0.08em" }}>
                    {r.name}
                  </div>
                  <div className="font-body text-[13px] text-cis-muted mt-2 leading-snug">
                    {r.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2B Features */}
          <div className="mt-32">
            <div className="fade-up"><Tag>Funzionalità principali</Tag></div>
            <h3 className="fade-up font-display font-black text-cis-white uppercase mt-5 text-3xl md:text-4xl" data-delay="80">
              Cosa rende ClubIS diverso.
            </h3>

            <div className="mt-12 grid md:grid-cols-2 gap-5">
              {CLUBIS_FEATURES.map((f, i) => (
                <div key={f.title} className="card-cis p-7 fade-up" data-delay={String((i % 2) * 80)}>
                  <div className="flex items-start justify-between mb-5">
                    <f.icon size={22} className="text-cis-green" strokeWidth={1.6} />
                    <span className="badge-green">{f.badge}</span>
                  </div>
                  <h4 className="font-display font-black uppercase text-cis-white text-xl md:text-2xl" style={{ letterSpacing: "-0.005em" }}>
                    {f.title}
                  </h4>
                  <p className="font-body text-cis-muted text-[14.5px] mt-3 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2C Mockup */}
          <div className="mt-28 fade-up">
            <ClubISMockup />
          </div>
        </div>
      </section>

      {/* ═══════════════ DM SCOUT ═══════════════ */}
      <section id="dmscout" className="relative py-28 md:py-36 border-t border-cis-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionTitle
            tag="Piattaforma Scouting"
            title="DM Scout"
            sub="Il software di scouting che gli scout professionisti usano davvero."
          />

          <div className="mt-20">
            <div className="fade-up"><Tag>Funzionalità AI & Differenzianti</Tag></div>
            <h3 className="fade-up font-display font-black text-cis-white uppercase mt-5 text-3xl md:text-4xl" data-delay="80">
              Sei strumenti che cambiano il modo di osservare.
            </h3>

            <div className="mt-12 grid md:grid-cols-2 gap-5">
              {DMSCOUT_FEATURES.map((f, i) => {
                const isAi = f.badge.startsWith("AI");
                return (
                  <div key={f.title} className="card-cis p-7 fade-up" data-delay={String((i % 2) * 80)}>
                    <div className="flex items-start justify-between mb-5">
                      <f.icon size={22} className={isAi ? "text-cis-gold" : "text-cis-green"} strokeWidth={1.6} />
                      <span className={isAi ? "badge-gold" : "badge-green"}>{f.badge}</span>
                    </div>
                    <h4 className="font-display font-black uppercase text-cis-white text-xl md:text-2xl">
                      {f.title}
                    </h4>
                    <p className="font-body text-cis-muted text-[14.5px] mt-3 leading-relaxed">{f.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Player card mockup */}
          <div className="mt-28 fade-up">
            <PlayerCardMockup />
          </div>
        </div>
      </section>

      {/* ═══════════════ PREZZI ═══════════════ */}
      <section id="prezzi" className="relative py-28 md:py-36 border-t border-cis-line" style={{ background: "#0c0c0c" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionTitle
            tag="Prezzi"
            title="Piani semplici, senza sorprese."
            sub="Nessun costo di attivazione. Cancellazione in qualsiasi momento. Prova gratuita di 14 giorni."
            align="center"
          />

          <div className="mt-20 grid lg:grid-cols-2 gap-10">
            {/* CLUBIS column */}
            <div>
              <div className="fade-up flex items-center gap-3 mb-6">
                <span className="font-display font-black text-cis-white text-2xl uppercase" style={{ letterSpacing: "0.08em" }}>ClubIS</span>
                <span className="font-display font-bold text-cis-muted text-xs uppercase" style={{ letterSpacing: "0.18em" }}>— Piani</span>
              </div>

              <div className="grid gap-5">
                <PlanCard
                  name="Starter"
                  price="79"
                  blurb="Per club che iniziano la digitalizzazione."
                  features={[
                    "Fino a 5 utenti attivi",
                    "Dashboard per tutti gli 11 ruoli",
                    "Gestione rosa fino a 30 giocatori",
                    "Calendario e comunicazioni interne",
                    "Supporto email",
                  ]}
                  cta="Inizia Gratis"
                  variant="default"
                />
                <PlanCard
                  name="Pro"
                  price="149"
                  blurb="Per club che vogliono il controllo totale."
                  ribbon="Più scelto"
                  features={[
                    "Utenti illimitati",
                    "Dashboard per tutti gli 11 ruoli",
                    "Gestione rosa illimitata",
                    "Documenti e scadenze federali",
                    "Analytics e KPI avanzati",
                    "Integrazione con DM Scout",
                    "Supporto prioritario",
                  ]}
                  cta="Attiva Pro"
                  variant="featured"
                />
              </div>
            </div>

            {/* DM SCOUT column */}
            <div>
              <div className="fade-up flex items-center gap-3 mb-6">
                <span className="font-display font-black text-cis-white text-2xl uppercase" style={{ letterSpacing: "0.08em" }}>DM Scout</span>
                <span className="font-display font-bold text-cis-muted text-xs uppercase" style={{ letterSpacing: "0.18em" }}>— Piano</span>
              </div>

              <PlanCard
                name="Scout Pro"
                price="49"
                blurb="Per scout e agenti che vogliono lavorare come i professionisti."
                ribbon="Tutto incluso"
                features={[
                  "Report giocatori illimitati",
                  "Caricamento AI da PDF / DOCX / TXT",
                  "Generatore report da testo libero",
                  "Scheda completa con radar, heatmap, fit tattico",
                  "Confronto fino a 6 giocatori simultanei",
                  "Mappa geografica Italia e Mondo",
                  "Marketplace cross-scout con sistema accessi",
                  "Condivisione link pubblico schede",
                  "Export PDF, CSV, JSON",
                  "Squad Builder e Match Planner",
                  "100+ campi statistici (InStat, Wyscout, FBref)",
                  "Sincronizzazione real-time multi-device",
                ]}
                cta="Inizia con DM Scout"
                variant="gold"
              />
            </div>
          </div>

          <p className="fade-up text-center font-body text-cis-muted text-sm mt-12">
            Tutti i prezzi sono IVA esclusa. Nessun costo di attivazione. Cancellazione in qualsiasi momento. Prova gratuita 14 giorni.
          </p>
        </div>
      </section>

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
            Inizia con 14 giorni gratuiti. Nessuna carta di credito richiesta.
          </p>
          <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3" data-delay="240">
            <a href="mailto:info@cis-sport.it?subject=Prova%20ClubIS" className="btn-primary">
              Prova ClubIS Gratis <ArrowRight size={15} />
            </a>
            <a href="mailto:info@cis-sport.it?subject=Prova%20DM%20Scout" className="btn-gold">
              Prova DM Scout Gratis <ArrowRight size={15} />
            </a>
          </div>
          <p className="fade-up font-body text-cis-muted text-sm mt-8" data-delay="320">
            Hai domande? Scrivici a{" "}
            <a href="mailto:info@cis-sport.it" className="text-cis-white hover:text-cis-green underline underline-offset-4">
              info@cis-sport.it
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
              © 2025 CIS Sport Srl — P.IVA IT12345678901 — Tutti i diritti riservati.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ───────────── Plan Card ───────────── */
function PlanCard({
  name, price, blurb, features, cta, variant, ribbon,
}: {
  name: string; price: string; blurb: string; features: string[]; cta: string;
  variant: "default" | "featured" | "gold"; ribbon?: string;
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
    <div className={`card-cis ${isGold ? "gold" : ""} p-7 md:p-8 fade-up relative`} style={ringStyle}>
      {ribbon && (
        <span
          className={`absolute -top-3 left-7 ${isGold ? "badge-gold" : "badge-green"}`}
          style={{ background: isGold ? "#FFB300" : "#00C853", color: "#0a0a0a" }}
        >
          {ribbon}
        </span>
      )}
      <div className="font-display font-black uppercase text-cis-white text-2xl" style={{ letterSpacing: "0.08em" }}>
        {name}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className={`font-display font-black ${accent} text-5xl leading-none`}>€ {price}</span>
        <span className="font-body text-cis-muted text-sm">/ mese</span>
      </div>
      <p className="font-body text-cis-muted text-[14.5px] mt-4 leading-relaxed">{blurb}</p>
      <ul className="mt-6 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check size={15} className={`${accent} mt-1 flex-shrink-0`} strokeWidth={2.4} />
            <span className="font-body text-cis-white/90 text-[14.5px]">{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="#contatti"
        className={`${isGold ? "btn-gold" : "btn-primary"} mt-7 w-full justify-center`}
      >
        {cta} <ArrowRight size={15} />
      </a>
    </div>
  );
}

/* ───────────── ClubIS Mockup ───────────── */
function ClubISMockup() {
  return (
    <div className="card-cis overflow-hidden">
      {/* Window header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-cis-line" style={{ background: "#101010" }}>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="font-display font-bold text-cis-muted text-[11px] uppercase" style={{ letterSpacing: "0.16em" }}>
          ClubIS — Dashboard Direttore Sportivo
        </div>
      </div>

      {/* Metric row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cis-line">
        {[
          { l: "Giocatori in rosa", v: "24" },
          { l: "Contratti in scadenza", v: "3" },
          { l: "Partite rimanenti", v: "12" },
          { l: "Valore rosa est.", v: "€480k" },
        ].map((m) => (
          <div key={m.l} className="bg-cis-card p-5">
            <div className="font-display font-bold text-cis-muted text-[10px] uppercase" style={{ letterSpacing: "0.18em" }}>{m.l}</div>
            <div className="font-display font-black text-cis-green text-3xl mt-2 leading-none">{m.v}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="p-5 md:p-6">
        <div className="font-display font-bold uppercase text-cis-white text-sm mb-4" style={{ letterSpacing: "0.12em" }}>
          Rosa attiva
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-body">
            <thead>
              <tr className="text-cis-muted border-b border-cis-line">
                {["#", "Nome", "Ruolo", "Età", "Contratto", "Stato"].map((h) => (
                  <th key={h} className="py-3 pr-4 font-display font-bold text-[11px] uppercase" style={{ letterSpacing: "0.14em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-cis-white/90">
              {[
                ["1", "Rossi M.", "Centrocampista", "24", "Giu 2025", { t: "Idoneo", c: "text-cis-green", i: "✓" }],
                ["2", "Bianchi L.", "Attaccante", "21", "Dic 2024", { t: "In scadenza", c: "text-cis-gold", i: "!" }],
                ["3", "Esposito G.", "Difensore", "27", "Giu 2026", { t: "Idoneo", c: "text-cis-green", i: "✓" }],
                ["4", "Ferraro A.", "Portiere", "29", "Giu 2025", { t: "Infortunato", c: "text-cis-red", i: "●" }],
                ["5", "Lombardi R.", "Ala", "19", "Giu 2026", { t: "Idoneo", c: "text-cis-green", i: "✓" }],
              ].map((row, i) => {
                const status = row[5] as { t: string; c: string; i: string };
                return (
                  <tr key={i} className="border-b border-cis-line/60 last:border-0">
                    <td className="py-3 pr-4 text-cis-muted">{row[0] as string}</td>
                    <td className="py-3 pr-4 font-medium">{row[1] as string}</td>
                    <td className="py-3 pr-4">{row[2] as string}</td>
                    <td className="py-3 pr-4">{row[3] as string}</td>
                    <td className="py-3 pr-4 text-cis-muted">{row[4] as string}</td>
                    <td className={`py-3 pr-4 ${status.c} font-display font-bold uppercase text-[12px]`} style={{ letterSpacing: "0.1em" }}>
                      <span className="mr-1.5">{status.i}</span>{status.t}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Player Card Mockup ───────────── */
function PlayerCardMockup() {
  const radar = [
    { k: "Tecnica", v: 80 },
    { k: "Tattica", v: 72 },
    { k: "Fisico", v: 65 },
    { k: "Mentalità", v: 87 },
    { k: "Decisioni", v: 78 },
    { k: "Potenziale", v: 90 },
  ];
  return (
    <div className="card-cis overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-cis-line" style={{ background: "#101010" }}>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="font-display font-bold text-cis-muted text-[11px] uppercase" style={{ letterSpacing: "0.16em" }}>
          DM Scout — Scheda Giocatore #042
        </div>
      </div>

      <div className="p-6 md:p-8 grid lg:grid-cols-3 gap-8">
        {/* Left: identity */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cis-line flex items-center justify-center font-display font-black text-cis-muted text-xl">
              MF
            </div>
            <div>
              <div className="font-display font-black text-cis-white text-2xl uppercase" style={{ letterSpacing: "0.04em" }}>
                Marco Ferretti
              </div>
              <div className="font-body text-cis-muted text-sm">23 anni · Centrocampista</div>
            </div>
          </div>
          <ul className="mt-6 space-y-2 font-body text-sm text-cis-white/80">
            <li><span className="text-cis-muted">Piede:</span> Destro</li>
            <li><span className="text-cis-muted">Nazionalità:</span> 🇮🇹 Italia</li>
            <li><span className="text-cis-muted">Club:</span> FC Bari 1908</li>
            <li><span className="text-cis-muted">Campionato:</span> Serie D</li>
          </ul>

          <div className="mt-7 p-5 rounded-lg border border-cis-line" style={{ background: "#101010" }}>
            <div className="font-display font-bold text-cis-muted text-[10px] uppercase" style={{ letterSpacing: "0.18em" }}>Overall</div>
            <div className="flex items-end gap-2 mt-1">
              <span className="font-display font-black text-cis-white text-5xl leading-none">7.8</span>
              <span className="font-body text-cis-muted mb-1">/ 10</span>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded verdict-buy font-display font-black text-[12px]" style={{ letterSpacing: "0.18em" }}>
              ● BUY
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="badge-green">High Potential</span>
            <span className="badge-green">Under 23</span>
            <span className="badge-muted">Versatile</span>
          </div>
        </div>

        {/* Right: radar bars */}
        <div className="lg:col-span-2">
          <div className="font-display font-bold uppercase text-cis-white text-sm mb-5" style={{ letterSpacing: "0.12em" }}>
            Radar — 6 assi
          </div>
          <div className="space-y-4">
            {radar.map((r) => (
              <div key={r.k}>
                <div className="flex items-center justify-between mb-1.5 font-body text-sm">
                  <span className="text-cis-white/85">{r.k}</span>
                  <span className="font-display font-black text-cis-green">{r.v}</span>
                </div>
                <div className="h-2 rounded-full bg-cis-line overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: `${r.v}%`,
                      background: "linear-gradient(90deg, #00C853, #00C853)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Last match stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-cis-line rounded-lg overflow-hidden border border-cis-line">
            {[
              { l: "Passaggi", v: "94%" },
              { l: "Tiri in porta", v: "3" },
              { l: "Duelli vinti", v: "68%" },
              { l: "xG creato", v: "0.42" },
            ].map((s) => (
              <div key={s.l} className="bg-cis-card p-4">
                <div className="font-display font-bold text-cis-muted text-[10px] uppercase" style={{ letterSpacing: "0.18em" }}>{s.l}</div>
                <div className="font-display font-black text-cis-white text-xl mt-1.5">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
