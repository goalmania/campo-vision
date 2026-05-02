import { useFadeUp } from "@/hooks/useFadeUp";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import PitchCanvas from "@/components/PitchCanvas";
import Logo from "@/components/Logo";
import Contatti from "@/components/Contatti";
import { ArrowDown, ArrowRight, Check, FolderX, MessageSquare, EuroIcon } from "lucide-react";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="eyebrow">{children}</div>
);

const SectionDivider = () => (
  <div className="flex justify-center py-8"><div className="divider-h" /></div>
);

const Index = () => {
  useFadeUp();

  return (
    <div id="top" className="relative">
      <Cursor />
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob absolute -top-20 -left-20 w-[60vw] h-[60vw] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(200,240,0,0.04), transparent 60%)" }} />
          <div className="blob absolute -bottom-20 -right-20 w-[60vw] h-[60vw] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(0,200,160,0.03), transparent 60%)", animationDelay: "-4s" }} />
        </div>
        <PitchCanvas />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-24 w-full">
          <div className="fade-up"><Eyebrow>// DM Football Services</Eyebrow></div>
          <h1 className="font-display font-black uppercase mt-6 leading-[0.95] fade-up" data-delay="80"
            style={{ fontSize: "clamp(48px, 8vw, 120px)" }}>
            <span className="block text-white">Intelligenza Calcistica</span>
            <span className="block text-lime">Per Il Campo Reale.</span>
          </h1>
          <p className="fade-up mt-8 font-body text-[1.1rem] max-w-[520px]" data-delay="160" style={{ color: "#888" }}>
            Due piattaforme. Un ecosistema. Per chi nel calcio italiano non vuole più lavorare alla cieca.
          </p>
          <div className="fade-up mt-10 flex flex-wrap gap-4" data-delay="240">
            <a href="#clubis" className="btn-lime">Scopri ClubIS</a>
            <a href="#dmscout" className="btn-ghost">Scopri DM Scout</a>
          </div>
          <div className="fade-up mt-12 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase" data-delay="320" style={{ letterSpacing: "2px", color: "#888" }}>
            <span>Eccellenza → Serie D</span>
            <span className="w-6 h-px bg-white/20" />
            <span>AI-Powered</span>
            <span className="w-6 h-px bg-white/20" />
            <span>Made In Puglia</span>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bounce-down text-lime">
            <ArrowDown size={20} />
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="relative py-24 md:py-32" style={{ background: "#0a0a0a" }}>
        <SectionDivider />
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="fade-up"><Eyebrow>// Il Problema</Eyebrow></div>
          <h2 className="fade-up font-display font-extrabold text-white mt-6 max-w-4xl" data-delay="80"
            style={{ fontSize: "clamp(28px, 4vw, 2.8rem)", lineHeight: 1.1 }}>
            Il calcio semiprofessionistico italiano lavora ancora con WhatsApp, fogli Excel e intuito.
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[
              { icon: FolderX, t: "Dati sparsi, zero visibilità", d: "I club non hanno una visione centralizzata della propria rosa, dei contratti, delle spese. Ogni informazione vive in un posto diverso — e spesso nella testa di una sola persona." },
              { icon: MessageSquare, t: "Lo scouting su WhatsApp", d: "Liste di osservati su note vocali, segnalazioni perse nelle chat di gruppo, report scritti a mano. Non è un sistema — è caos organizzato." },
              { icon: EuroIcon, t: "Strumenti da top club, prezzi da top club", d: "Le piattaforme esistenti sono pensate per chi ha budget da professionisti. Il resto del calcio italiano, quello vero, non ha uno strumento costruito per sé." },
            ].map((c, i) => (
              <div key={i} className="glass p-7 fade-up" data-delay={String(i * 80)}>
                <div className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-5" style={{ background: "var(--c-accent-dim)", color: "#c8f000" }}>
                  <c.icon size={20} />
                </div>
                <h3 className="font-display font-bold text-xl uppercase text-white mb-3" style={{ letterSpacing: "1px" }}>{c.t}</h3>
                <p className="text-[#888] text-[0.95rem] leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <p className="fade-up text-center text-white font-body font-medium mt-16 text-lg">
            Abbiamo costruito due strumenti per risolvere esattamente questo.
          </p>
        </div>
      </section>

      {/* PRODOTTI INTRO */}
      <section id="prodotti" className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <div className="fade-up"><Eyebrow>// I Nostri Prodotti</Eyebrow></div>
          <h2 className="fade-up font-display font-extrabold text-white mt-6" data-delay="80"
            style={{ fontSize: "clamp(32px, 5vw, 3.5rem)", lineHeight: 1 }}>
            Due piattaforme. Un ecosistema.
          </h2>
          <p className="fade-up max-w-2xl mx-auto mt-6 text-[#888] font-body" data-delay="160">
            Uno per gestire il club. L'altro per costruire la rosa di domani. Costruiti per parlarsi.
          </p>
        </div>
      </section>

      {/* CLUBIS */}
      <ProductSection
        id="clubis"
        glowColor="rgba(200,240,0,0.05)"
        glowPos="left"
        badge="Per i Club"
        badgeColor="lime"
        title="ClubIS"
        subtitle="Club Intelligence System"
        subtitleColor="#00c8a0"
        description="Il gestionale intelligente costruito per la realtà del calcio italiano. Non per la Serie A. Per te — presidente, DS, allenatore, segretario — che gestisci un club con risorse limitate e zero margine d'errore."
        listLabel="Quello Che Solo ClubIS Offre"
        listLabelColor="#c8f000"
        features={[
          "6 dashboard role-based (Presidente, DS, Allenatore, Segretario, Osservatore, Famiglia)",
          "Gestione rosa, contratti e scadenze in un'unica vista",
          "Report automatici per ogni ruolo — zero setup manuale",
          "Notifiche intelligenti su scadenze mediche, contratti, pagamenti",
          "Accesso differenziato per collaboratori — ognuno vede solo il suo",
          "Archivio documentale condiviso e tracciabile",
          "Moduli personalizzabili sulla struttura del tuo club",
          "Costruito per Eccellenza, Promozione e Serie D — non adattato",
        ]}
        checkColor="#c8f000"
        problemBorder="#c8f000"
        problemText="Smetti di rincorrere informazioni tra telefonate, fogli Excel e cartelle Drive condivise male. ClubIS mette tutto in un posto — e ogni persona vede esattamente quello che le serve."
        ctaClass="btn-lime"
        ctaLabel="Scopri ClubIS"
        stats={[
          { v: "6", l: "Dashboard ruolo" },
          { v: "100%", l: "Italiano" },
          { v: "<30min", l: "Setup" },
        ]}
      />

      {/* DM SCOUT */}
      <ProductSection
        id="dmscout"
        glowColor="rgba(0,200,160,0.05)"
        glowPos="right"
        reversed
        badge="Per Agenzie & Scout"
        badgeColor="teal"
        title="DM Scout"
        subtitle="Intelligence Scouting Platform"
        subtitleColor="#c8f000"
        description="La piattaforma multi-tenant per agenzie e reparti scouting che vogliono lavorare con dati, non con istinto. Dalla ricerca del talento al report professionale in PDF, in un click."
        listLabel="Quello Che Solo DM Scout Offre"
        listLabelColor="#00c8a0"
        features={[
          "~60 ruoli tattici dettagliati (stile Football Manager) — nessuno ha questa granularità",
          "Radar chart e visualizzazioni campo generate automaticamente",
          "Generazione report AI in italiano via Anthropic API",
          "Upload video e tagging delle azioni — tutto collegato al profilo",
          "Architettura multi-tenant: agenzie con account club separati",
          "Cross-account access — condividi profili selezionati con club partner",
          "Comparatore giocatori con visualizzazione sovrapposta",
          "Mappa mondiale/Italia dei talenti monitorati",
          "Shortlist, Shadow Team, piano partite integrato",
          "PDF export e link di condivisione pubblica dei profili",
          "Tactical DNA Search — trova giocatori per stile di gioco, non solo per statistiche",
        ]}
        checkColor="#00c8a0"
        problemBorder="#00c8a0"
        problemText="Smetti di perdere segnalazioni nei messaggi, di mandare PDF fatti in Word, di non avere uno storico delle valutazioni. DM Scout è il tuo ufficio scouting digitale — professionale, organizzato, condivisibile."
        ctaClass="btn-teal"
        ctaLabel="Scopri DM Scout"
        stats={[
          { v: "60+", l: "Ruoli tattici" },
          { v: "AI", l: "Report in IT" },
          { v: "Multi", l: "Tenant" },
        ]}
      />

      {/* PERCHÉ NOI */}
      <section className="relative py-24 md:py-32" style={{ background: "#0a0a0a" }}>
        <SectionDivider />
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="fade-up"><Eyebrow>// Perché DM Football Services</Eyebrow></div>
          <h2 className="fade-up font-display font-extrabold text-white mt-6 mb-16" data-delay="80"
            style={{ fontSize: "clamp(28px, 4vw, 3rem)", lineHeight: 1 }}>
            Costruito da chi conosce questo calcio.
          </h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="fade-up">
              <div className="text-lime text-4xl font-display mb-6">"</div>
              <p className="font-display font-extrabold text-white" style={{ fontSize: "clamp(20px, 2.4vw, 2rem)", lineHeight: 1.15 }}>
                Le piattaforme che esistono non parlano la tua lingua. Sono progettate per chi ha un reparto IT, un budget da milioni e un ufficio a Londra.
              </p>
            </div>

            <div className="space-y-8">
              {[
                ["01", "Pensato per il calcio italiano reale", "Non un adattamento dall'inglese, non uno strumento enterprise tagliato a metà. Costruito da zero per Eccellenza, Promozione, Serie D — con le parole, i ruoli e le logiche del calcio italiano."],
                ["02", "Prezzo accessibile, qualità enterprise", "Non devi scegliere tra uno strumento professionale e un costo sostenibile. Abbiamo costruito ClubIS e DM Scout per essere economicamente reali per un club di semiprofessionisti."],
                ["03", "Due prodotti che si parlano", "Il club usa ClubIS. L'osservatore usa DM Scout. I dati fluiscono tra i due. È l'unico ecosistema che copre tutta la filiera — dalla gestione del club alla talent acquisition."],
                ["04", "Supporto territoriale — non un ticket in coda", "Siamo in Puglia. Parlate con noi in italiano, in tempo reale. Conosciamo il vostro contesto perché ci lavoriamo dentro ogni giorno."],
              ].map(([n, t, d], i) => (
                <div key={n} className="fade-up" data-delay={String(i * 80)}>
                  <div className="font-mono text-lime text-xs mb-2" style={{ letterSpacing: "2px" }}>// {n}</div>
                  <h3 className="font-display font-bold text-white text-xl uppercase mb-2" style={{ letterSpacing: "1px" }}>{t}</h3>
                  <p className="text-[#888] text-[0.95rem] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="fade-up text-center"><Eyebrow>// Onboarding</Eyebrow></div>
          <h2 className="fade-up text-center font-display font-extrabold text-white mt-6 mb-16" data-delay="80"
            style={{ fontSize: "clamp(28px, 4vw, 3rem)", lineHeight: 1 }}>
            Operativo in meno di 30 minuti.
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-gradient-to-r from-lime via-teal to-lime opacity-30" />
            {[
              ["01", "Scegli il prodotto", "ClubIS per la gestione del club. DM Scout per lo scouting. O entrambi."],
              ["02", "Setup guidato", "Nessun tecnico necessario. Onboarding in autonomia con guida passo-passo. Siamo disponibili per una chiamata di 20 minuti se preferisci."],
              ["03", "Lavori meglio dal giorno uno", "Dati centralizzati, report automatici, zero WhatsApp per le cose importanti."],
            ].map(([n, t, d], i) => (
              <div key={n} className="glass p-7 fade-up relative" data-delay={String(i * 100)}>
                <div className="font-display font-black text-lime text-5xl mb-4">{n}</div>
                <h3 className="font-display font-bold text-white text-xl uppercase mb-3" style={{ letterSpacing: "1px" }}>{t}</h3>
                <p className="text-[#888] text-[0.95rem] leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <Contatti />

      {/* FOOTER */}
      <footer className="relative py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo />
            <div className="flex flex-wrap items-center gap-6">
              <a href="#prodotti" className="font-display uppercase text-[11px] text-white/70 hover:text-lime" style={{ letterSpacing: "2px" }}>Prodotti</a>
              <a href="#clubis" className="font-display uppercase text-[11px] text-white/70 hover:text-lime" style={{ letterSpacing: "2px" }}>ClubIS</a>
              <a href="#dmscout" className="font-display uppercase text-[11px] text-white/70 hover:text-lime" style={{ letterSpacing: "2px" }}>DM Scout</a>
              <a href="#contatti" className="font-display uppercase text-[11px] text-white/70 hover:text-lime" style={{ letterSpacing: "2px" }}>Contatti</a>
            </div>
            <a href="#contatti" className="btn-lime !py-2.5 !px-5 !text-[11px]">Richiedi Demo</a>
          </div>

          <div className="my-8 h-px bg-white/5" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 font-mono text-[10px] uppercase text-[#888]" style={{ letterSpacing: "2px" }}>
            <div>DM Football Services — Puglia, Italia</div>
            <div className="flex gap-5">
              <a href="#" className="hover:text-lime">Instagram</a>
              <a href="#" className="hover:text-lime">LinkedIn</a>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-2 font-mono text-[10px] text-[#666]" style={{ letterSpacing: "1px" }}>
            <div>© 2025 DM Football Services — Tutti i diritti riservati</div>
            <a href="#" className="hover:text-lime">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

function ProductSection({
  id, glowColor, glowPos, reversed = false,
  badge, badgeColor, title, subtitle, subtitleColor, description,
  listLabel, listLabelColor, features, checkColor, problemBorder, problemText, ctaClass, ctaLabel, stats,
}: {
  id: string; glowColor: string; glowPos: "left" | "right"; reversed?: boolean;
  badge: string; badgeColor: "lime" | "teal";
  title: string; subtitle: string; subtitleColor: string; description: string;
  listLabel: string; listLabelColor: string; features: string[];
  checkColor: string; problemBorder: string; problemText: string;
  ctaClass: string; ctaLabel: string;
  stats: { v: string; l: string }[];
}) {
  const badgeBorder = badgeColor === "lime" ? "rgba(200,240,0,0.4)" : "rgba(0,200,160,0.4)";
  const badgeText = badgeColor === "lime" ? "#c8f000" : "#00c8a0";
  return (
    <section id={id} className="relative py-24 md:py-32 overflow-hidden">
      <div
        className={`absolute ${glowPos === "left" ? "-left-40" : "-right-40"} top-1/3 w-[600px] h-[600px] rounded-full pointer-events-none`}
        style={{ background: `radial-gradient(circle, ${glowColor}, transparent 60%)` }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className={`grid md:grid-cols-12 gap-10 items-start ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}>
          {/* Left: title + summary + stats */}
          <div className="md:col-span-5 fade-up md:sticky md:top-28">
            <span
              className="font-mono uppercase text-[10px] inline-block px-3 py-1.5 rounded-[12px] border"
              style={{ borderColor: badgeBorder, color: badgeText, letterSpacing: "2px" }}
            >
              {badge}
            </span>
            <h3 className="font-display font-black text-white mt-6" style={{ fontSize: "clamp(40px, 5vw, 4rem)", lineHeight: 0.95 }}>{title}</h3>
            <div className="font-mono text-sm mt-3" style={{ color: subtitleColor, letterSpacing: "1px" }}>{subtitle}</div>
            <p className="text-[#888] text-[0.98rem] mt-6 leading-relaxed">{description}</p>

            <div className="grid grid-cols-3 gap-3 mt-8">
              {stats.map((s, i) => (
                <div key={i} className="glass p-4 text-center">
                  <div className="font-display font-black text-2xl" style={{ color: checkColor }}>{s.v}</div>
                  <div className="font-mono text-[9px] uppercase text-[#888] mt-1" style={{ letterSpacing: "1.5px" }}>{s.l}</div>
                </div>
              ))}
            </div>

            <a href="#contatti" className={`${ctaClass} mt-8`}>
              {ctaLabel} <ArrowRight size={16} />
            </a>
          </div>

          {/* Right: features + problem */}
          <div className="md:col-span-7 fade-up" data-delay="120">
            <div className="glass p-7 md:p-9">
              <div className="font-mono text-[10px] uppercase mb-5" style={{ color: listLabelColor, letterSpacing: "2px" }}>// {listLabel}</div>
              <ul className="space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 fade-up" data-delay={String(i * 80)}>
                    <Check size={16} style={{ color: checkColor }} className="mt-1 flex-shrink-0" />
                    <span className="font-body font-medium text-white/90 text-[0.95rem]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-6 rounded-[12px] fade-up" data-delay="160"
              style={{ borderLeft: `2px solid ${problemBorder}`, background: "rgba(255,255,255,0.02)" }}>
              <div className="font-mono text-[10px] uppercase text-[#888] mb-2" style={{ letterSpacing: "2px" }}>// Problema Risolto</div>
              <p className="text-white/85 text-[0.95rem] leading-relaxed">{problemText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
