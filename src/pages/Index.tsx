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
import clubPresidenza from "@/assets/clubis-presidenza.png";
import clubSegreteria from "@/assets/clubis-segreteria.png";
import clubKpi from "@/assets/clubis-kpi.png";
import clubAzioni from "@/assets/clubis-azioni.png";
import clubTeamManager from "@/assets/clubis-teammanager-new.png";
import clubDisponibilita from "@/assets/clubis-disponibilita.png";
import clubRosa from "@/assets/clubis-rosa.png";
import clubMercato from "@/assets/clubis-mercato.png";
import clubTracker from "@/assets/clubis-tracker.png";
import clubBudget from "@/assets/clubis-budget.png";
import clubComunicati from "@/assets/clubis-comunicati.png";
import clubDocumenti from "@/assets/clubis-documenti.png";
import {
  ArrowRight, Check, Crown, ClipboardList, Target, FolderOpen, Search, Trophy,
  ClipboardCheck, Users, Stethoscope, Newspaper, Wrench, ChevronDown,
  Database, Radar, GitCompare, FileText, MapPin, Brain, Filter, Star, Download, Tag as TagIcon,
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
    desc: "Visione esecutiva: KPI, budget, conformità.",
    functions: [
      "Dashboard esecutiva con KPI sportivi e finanziari",
      "Budget annuale e Financial Fair Play in tempo reale",
      "Avvisi automatici: certificati, contratti, quote arretrate",
      "Gestione sponsor (gold, silver, bronze) con contratti",
      "Organigramma club e inviti staff via link",
      "Obiettivi stagionali: pianificati vs ottenuti",
      "Compliance iscrizione campionato con checklist",
      "Notifica immediata ticket urgenti dagli impianti",
      "Report mensile esecutivo esportabile",
    ],
  },
  {
    icon: FolderOpen, name: "Segretario",
    desc: "Anagrafiche, FIGC, contabilità, documenti.",
    functions: [
      "Anagrafica giocatori con import CSV in blocco",
      "Tesseramenti FIGC: definitivo, prestito, prova, svincolo",
      "Certificati medici con avvisi a 30 / 7 / 0 giorni",
      "Importazione calendario partite da PDF FIGC",
      "Distinte gara generate e stampabili in 1 click",
      "Quote iscrizione con piano rateale 2-12 rate",
      "Solleciti pagamento in-app o email",
      "Analisi automatica del C.U. FIGC con applicazione squalifiche",
      "Generazione file XML SEPA per bonifici in batch",
      "Registro IVA sincronizzato dalla prima nota",
      "Quietanze in blocco e libreria documenti",
      "Comunicazioni massive con scelta canale",
    ],
  },
  {
    icon: Target, name: "Direttore Sportivo",
    desc: "Rosa, contratti, scouting, mercato.",
    functions: [
      "Rosa completa con filtri reparto e tesseramento",
      "Contratti staff con avviso scadenza 90 giorni",
      "Ingaggi, bonus, opzioni rinnovo e clausole rescissorie",
      "Pipeline trattative entrata / uscita",
      "Database giocatori osservati e movimenti mercato",
      "Esiti scouting: in valutazione, ingaggiato, rifiutato",
      "Voto complessivo, potenziale, punti di forza/debolezze",
      "Integrazione DM Scout con import schede",
      "Export PDF report giocatore brandizzato",
    ],
  },
  {
    icon: ClipboardCheck, name: "Allenatore",
    desc: "Allenamenti, presenze, tattica, valutazioni.",
    functions: [
      "Pianificazione sessioni: tecnico, tattico, fisico, partitella",
      "Registrazione presenze digitale con motivo assenza",
      "Convocazioni con risposte in tempo reale",
      "Statistiche individuali: presenze, gol, assist, cartellini",
      "Valutazioni 1-10 su tecnica, tattica, fisico, mentalità",
      "Scelta visibilità valutazioni alla famiglia",
      "Schema tattico interattivo drag-and-drop",
      "Cronologia valutazioni per crescita giocatore",
    ],
  },
  {
    icon: Search, name: "Osservatore",
    desc: "Report scouting, confronto, mappa.",
    functions: [
      "Report osservazione con voto, potenziale, punti forza",
      "Esiti report: in valutazione, ingaggiato, rifiutato, lista d'attesa",
      "Mappa geografica delle osservazioni",
      "Confronto fianco a fianco di 2+ giocatori osservati",
      "Dashboard personale con tasso di conversione",
      "Export PDF report professionale",
    ],
  },
  {
    icon: Stethoscope, name: "Medico",
    desc: "Cartelle cliniche, infortuni, idoneità.",
    functions: [
      "Cartelle cliniche digitali con anamnesi ed esami",
      "Registro infortuni con gravità e data rientro stimata",
      "Calendario visite mediche programmate",
      "Certificati di idoneità con upload PDF",
      "Avvisi automatici scadenze certificati",
      "Piani di prevenzione personalizzati per giocatore",
    ],
  },
  {
    icon: ClipboardList, name: "Team Manager",
    desc: "Calendario, trasferte, materiale, accrediti.",
    functions: [
      "Calendario partite e allenamenti condiviso",
      "Convocazioni con stato risposte (conferma/in attesa)",
      "Distinte gara nel formato regolamentare",
      "Trasferte: destinazione, mezzo, costi previsti",
      "Richieste materiale sportivo con livello urgenza",
      "Accrediti gara: famiglie, sponsor, giornalisti",
      "Totale costi trasferte stagionali",
    ],
  },
  {
    icon: Trophy, name: "Giocatore",
    desc: "Profilo, calendario, stat, pagamenti.",
    functions: [
      "Profilo personale con codice tessera FIGC",
      "Calendario allenamenti e percentuale presenze",
      "Notifiche convocazione con conferma 1-click",
      "Statistiche personali: presenze, gol, assist",
      "Valutazioni ricevute dall'allenatore",
      "Stato quota con barra di progresso",
      "Comunicazioni dirette dal club",
    ],
  },
  {
    icon: Users, name: "Famiglia",
    desc: "App per i genitori: tutto in un posto.",
    functions: [
      "Profilo del figlio con presenze ultimi 30 giorni",
      "Valutazioni tecniche condivise con cronologia",
      "Stato quota: pagato, in corso, scadenze rate",
      "Avviso quando una rata sta per scadere",
      "Calendario partite e allenamenti del figlio",
      "Comunicazioni ufficiali e bacheca del club",
    ],
  },
  {
    icon: Newspaper, name: "Ufficio Stampa",
    desc: "Media, interviste, locandine, accrediti.",
    functions: [
      "Calendario media: interviste, conferenze, podcast",
      "Stato eventi: da confermare, confermato, completato",
      "Suggerimenti AI per preparare interviste",
      "Brief locandine partita per il grafico",
      "Generazione automatica template articoli partita",
      "Gestione accrediti stampa con approvazione",
    ],
  },
  {
    icon: Wrench, name: "Custode",
    desc: "Impianti, checklist, ticket urgenti.",
    functions: [
      "Checklist giornaliere, settimanali e pre-gara",
      "Apertura ticket con livello urgenza",
      "Notifica automatica al presidente sui ticket urgenti",
      "Stato impianti: spogliatoi, campo, palestra",
      "Storico interventi e ticket risolti",
    ],
  },
];

/* ───────────── ClubIS screenshots ───────────── */
const CLUBSHOTS = [
  { src: clubPresidenza, label: "Presidenza", desc: "Riepilogo esecutivo del presidente: setup, scadenze FIGC critiche e azioni rapide finanziarie con organigrammi e sponsor a portata di click." },
  { src: clubSegreteria, label: "Segreteria", desc: "Hub operativo del segretario: anagrafica, contabilità, FIGC, documenti, comunicazioni e settore giovanile in un'unica vista a colonne." },
  { src: clubKpi, label: "KPI & FIGC", desc: "Card KPI in tempo reale: tesserati, certificati in scadenza, quote arretrate, prossime partite e portafoglio FIGC con saldo stimato." },
  { src: clubAzioni, label: "Azioni Rapide", desc: "Banner scadenze FIGC e azioni rapide raggruppate per area: nessun click sprecato per le operazioni quotidiane." },
  { src: clubTeamManager, label: "Team Manager", desc: "Logistica squadra: convocazioni, trasferte, presenze, materiale. KPI sulla rosa attiva e sulle trasferte in programma." },
  { src: clubDisponibilita, label: "Disponibilità", desc: "Chi può giocare: stato in tempo reale di squalificati, diffidati, infortunati e certificati scaduti, con motivazioni e dettaglio per giocatore." },
  { src: clubRosa, label: "Gestione Rosa", desc: "Rosa completa con filtri età, ruolo, piede, nazionalità, contratto e tipo tesseramento. KPI sintetici su tesserati e scadenze." },
  { src: clubMercato, label: "Budget Mercato", desc: "Budget di mercato per stagione: assegnato dal presidente, totale acquisti e cessioni, saldo disponibile e trattative in corso." },
  { src: clubTracker, label: "Tracker Movimenti", desc: "Monitoraggio completo delle operazioni: acquisti, cessioni, prestiti in/out e flusso finanziario di mercato per stagione." },
  { src: clubBudget, label: "Budget Stagionale", desc: "Pianificazione finanziaria: tetto budget, uscite effettive, saldo previsto, % di consumo e riepilogo entrate/uscite previste vs effettive." },
  { src: clubComunicati, label: "Comunicati FIGC", desc: "Incolla il testo del C.U. FIGC: il sistema estrae squalifiche e diffide e le applica automaticamente alla rosa." },
  { src: clubDocumenti, label: "Documenti", desc: "Libreria documenti per categoria (Riforma dello Sport, fiscali, tesseramenti, GDPR…) con template verificati e generazione 1-click." },
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

/* ───────────── DM Scout funzionalità ───────────── */
const DM_FEATURES = [
  {
    icon: Database, title: "Database giocatori",
    desc: "Tutti i tuoi osservati in un unico posto, sempre filtrabili per ciò che ti serve davvero.",
    bullets: [
      "Filtri per ruolo, piede, età, nazionalità, campionato",
      "Vista grid, lista o mappa geografica",
      "Tag personalizzati e liste dinamiche",
    ],
  },
  {
    icon: Brain, title: "AI Report da PDF",
    desc: "Carichi un report in PDF, DOCX o TXT: l'AI estrae i dati e crea la scheda completa nel database.",
    bullets: [
      "Riconoscimento automatico di skills, voti e note",
      "Compilazione scheda in pochi secondi",
      "Zero inserimento manuale ripetitivo",
    ],
  },
  {
    icon: Radar, title: "Radar a 6 assi",
    desc: "Visualizzi punti di forza e debolezze su Tecnica, Tattica, Fisico, Mentalità, Decisioni, Potenziale.",
    bullets: [
      "100+ skills mappate per ogni giocatore",
      "Valutazione a stelle e voto complessivo",
      "Confronto immediato con la media del ruolo",
    ],
  },
  {
    icon: GitCompare, title: "Confronto multi-giocatore",
    desc: "Metti fianco a fianco fino a 6 giocatori sulle stesse metriche. Il vincitore di ogni voce è evidenziato.",
    bullets: [
      "Confronto su 100+ skills",
      "Highlight automatico del migliore per metrica",
      "Export confronto in PDF",
    ],
  },
  {
    icon: Target, title: "Fit Score tattico",
    desc: "Per ogni modulo (4-3-3, 3-5-2, 4-2-3-1…) il sistema calcola la % di compatibilità con i ruoli tattici.",
    bullets: [
      "60+ ruoli tattici mappati",
      "Fit Score % per ogni modulo",
      "Suggerimenti su ruolo ottimale e alternativo",
    ],
  },
  {
    icon: MapPin, title: "Mappa interattiva",
    desc: "Vedi su mappa Italia o mondo dove si trovano i tuoi giocatori, con clustering e filtri rapidi.",
    bullets: [
      "Cluster automatici per area",
      "Filtri per verdetto, ruolo, fascia d'età",
      "Pianificazione trasferte di osservazione",
    ],
  },
  {
    icon: TagIcon, title: "Verdetti & shortlist",
    desc: "Assegna BUY, MONITOR o PASS. Crei shortlist dinamiche per direttori sportivi e agenti.",
    bullets: [
      "Verdetti con motivazione e data",
      "Shortlist condivisibili via link",
      "Storico decisioni per giocatore",
    ],
  },
  {
    icon: Filter, title: "Ricerca avanzata",
    desc: "Trovi in pochi secondi il giocatore giusto incrociando criteri tecnici, fisici e contrattuali.",
    bullets: [
      "Ricerca booleana su 30+ campi",
      "Salvataggio query come liste vive",
      "Alert quando un nuovo giocatore matcha",
    ],
  },
  {
    icon: Download, title: "Export PDF brandizzato",
    desc: "Generi report giocatore in PDF con il tuo logo, pronti da inviare a club o famiglie.",
    bullets: [
      "Template professionale personalizzabile",
      "Esportazione in 1 click",
      "Versione sintetica e versione completa",
    ],
  },
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
              "radial-gradient(ellipse 65% 55% at 50% 25%, rgba(200,240,0,0.10), transparent 70%), linear-gradient(to bottom, rgba(10,10,10,0.55), rgba(10,10,10,0.85))",
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

          {/* ClubIS screenshot gallery — schermate reali */}
          <div className="mt-20 fade-up">
            <ScreenshotGallery shots={CLUBSHOTS} accent="green" />
          </div>

          {/* Roles — click to expand */}
          <div className="mt-28">
            <div className="fade-up"><Tag>Dashboard per ruolo</Tag></div>
            <h3 className="fade-up font-display font-black text-cis-white uppercase mt-5 text-3xl md:text-4xl" data-delay="80" style={{ letterSpacing: "-0.005em" }}>
              11 ruoli. Clicca per scoprire le funzioni.
            </h3>
            <p className="fade-up font-body text-cis-muted mt-4 max-w-2xl" data-delay="160">
              Ogni ruolo ha la sua dashboard con permessi e funzioni dedicate. Apri ogni card per vedere cosa può fare.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
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

          {/* DM Scout features grid */}
          <div className="mt-20">
            <div className="fade-up"><Tag>Cosa puoi fare</Tag></div>
            <h3 className="fade-up font-display font-black text-cis-white uppercase mt-5 text-3xl md:text-4xl" data-delay="80" style={{ letterSpacing: "-0.005em" }}>
              Lo scouting moderno, in un'unica piattaforma.
            </h3>
            <p className="fade-up font-body text-cis-muted mt-4 max-w-2xl" data-delay="160">
              Ogni funzione è pensata per il flusso reale di scout, agenti e direttori sportivi. Niente rumore, solo decisioni.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DM_FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className="card-cis gold fade-up p-6"
                  data-delay={String((i % 3) * 60)}
                >
                  <f.icon size={22} className="text-cis-gold" strokeWidth={1.6} />
                  <div className="font-display font-bold uppercase text-cis-white text-[15px] mt-4" style={{ letterSpacing: "0.08em" }}>
                    {f.title}
                  </div>
                  <p className="font-body text-[13.5px] text-cis-muted mt-2 leading-relaxed">
                    {f.desc}
                  </p>
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

          {/* Screenshot gallery */}
          <div className="mt-24 fade-up">
            <div className="fade-up mb-8"><Tag>Schermate reali</Tag></div>
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
          style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200,240,0,0.08), transparent 70%)" }}
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
            <a href="https://clubis.it" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Prova ClubIS — 7 giorni <ArrowRight size={15} />
            </a>
            <a href="https://dmscout.it" target="_blank" rel="noopener noreferrer" className="btn-gold">
              Prova DM Scout — 7 giorni <ArrowRight size={15} />
            </a>
          </div>
          <div className="fade-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 font-body text-sm" data-delay="320">
            <a href="mailto:info@dmfootballservices.it" className="text-cis-white hover:text-cis-green underline underline-offset-4">
              info@dmfootballservices.it
            </a>
            <span className="hidden sm:inline text-cis-muted">·</span>
            <a href="tel:+393334218596" className="text-cis-white hover:text-cis-green underline underline-offset-4">
              +39 333 421 8596
            </a>
          </div>
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

/* ───────────── Screenshot Gallery ───────────── */
function ScreenshotGallery({
  shots,
  accent = "gold",
}: {
  shots: { src: string; label: string; desc: string }[];
  accent?: "green" | "gold";
}) {
  const [idx, setIdx] = useState(0);
  const cur = shots[idx];
  const activeBg = accent === "green" ? "bg-cis-green" : "bg-cis-gold";
  return (
    <div className="card-cis overflow-hidden">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-cis-line bg-[#101010]">
        {shots.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setIdx(i)}
            className={`font-display font-bold uppercase text-[11px] px-3 py-2 rounded-full transition-colors ${
              i === idx
                ? `${activeBg} text-cis-black`
                : "text-cis-muted hover:text-cis-white"
            }`}
            style={{ letterSpacing: "0.14em" }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="p-3 sm:p-5 bg-[#0a0a0a]">
        <div className="rounded-xl overflow-hidden border border-cis-line">
          <img
            src={cur.src}
            alt={cur.label}
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
                  background: annual ? "rgba(10,10,10,0.18)" : "rgba(200,240,0,0.18)",
                  color: annual ? "#0a0a0a" : "#c8f000",
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
  name, tagline, price, annual, features, cta, variant, ribbon, href = "#contatti",
}: {
  name: string;
  tagline: string;
  price: number;
  annual: boolean;
  features: string[];
  cta: string;
  variant: "default" | "featured" | "gold";
  ribbon?: string;
  href?: string;
}) {
  const isFeatured = variant === "featured";
  const isGold = variant === "gold";
  const accent = isGold ? "text-cis-gold" : "text-cis-green";
  const ringStyle: React.CSSProperties = isFeatured
    ? { borderColor: "#c8f000" }
    : isGold
    ? { borderColor: "#FFB300" }
    : {};

  return (
    <div className={`card-cis ${isGold ? "gold" : ""} p-7 md:p-8 fade-up relative rounded-xl`} style={ringStyle}>
      {ribbon && (
        <span
          className="absolute -top-3 left-7 font-display font-black uppercase text-[10px] px-2.5 py-1 rounded"
          style={{
            background: isGold ? "#FFB300" : "#c8f000",
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
