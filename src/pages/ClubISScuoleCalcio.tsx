import { useFadeUp } from "@/hooks/useFadeUp";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useJsonLd } from "@/hooks/useJsonLd";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import logoClubis from "@/assets/logo-clubis.webp";
import DemoRequestDialog from "@/components/DemoRequestDialog";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import {
  ArrowRight, Check, Users, Smartphone, HeartHandshake, ShieldCheck, Wallet,
} from "lucide-react";
import {
  Tag, SectionTitle, CLUBSHOTS, ScreenshotGallery,
  SCUOLA_CALCIO_HIGHLIGHTS as HIGHLIGHTS, SCUOLA_CALCIO_FEATURES as CLUB_FEATURES,
} from "./Index";

const TITLE = "ClubIS per Scuole Calcio — Iscrizioni, Quote e App Genitori | DM Football Services";
const DESCRIPTION =
  "ClubIS per le Scuole Calcio: iscrizioni online, quote con stato sempre visibile, quietanze pronte per il 730 e app dedicata ai genitori. 7 giorni di prova gratuita, da €30/mese.";
const CANONICAL = "https://dmfootballservices.it/clubis-scuole-calcio";
const TRIAL_HREF = "https://clubis.it/registrati?piano=scuola_calcio";

const FAMILY_POINTS = [
  {
    icon: Smartphone, title: "Tutto quello che serve a un genitore",
    desc: "Quando si allena mio figlio, quanto devo pagare, come sta andando. Un'app che dice esattamente questo, niente di più.",
  },
  {
    icon: Users, title: "Solo la categoria di tuo figlio",
    desc: "Se il figlio è dei Pulcini, non si perde tra allenamenti e comunicazioni degli Esordienti.",
  },
  {
    icon: HeartHandshake, title: "Progressi a misura di bambino",
    desc: "Niente gergo da spogliatoio professionistico su un bambino di 8 anni: coordinazione, divertimento, gioco di squadra.",
  },
  {
    icon: Wallet, title: "Paga con un tap",
    desc: "Niente più bonifici da ricordarsi, niente contanti in busta, niente \"te lo porto la prossima volta\".",
  },
];

const ClubISScuoleCalcio = () => {
  useFadeUp();
  useDocumentMeta({ title: TITLE, description: DESCRIPTION, canonical: CANONICAL });
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://dmfootballservices.it/" },
      { "@type": "ListItem", position: 2, name: "ClubIS per Scuole Calcio", item: CANONICAL },
    ],
  });

  return (
    <div id="top" className="relative">
      <Nav />
      <ExitIntentPopup source="exit-intent-clubis-scuole-calcio" />

      {/* HEADER */}
      <section className="relative pt-[60px] border-b border-cis-line" style={{ background: "#0c0c0c" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
          <div className="fade-up flex items-center gap-4 mb-6">
            <img src={logoClubis} alt="ClubIS" style={{ height: 46, width: "auto" }} className="select-none" draggable={false} />
            <span className="badge-green">ClubIS per Scuole Calcio</span>
          </div>
          <h1
            className="fade-up font-display font-black uppercase text-cis-white"
            data-delay="80"
            style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.2rem)", lineHeight: 0.95, letterSpacing: "-0.01em" }}
          >
            Tu pensi alla crescita dei tuoi ragazzi. A tutto il resto, ci pensa ClubIS.
          </h1>
          <p className="fade-up mt-7 font-body text-cis-muted text-[1.1rem] max-w-2xl" data-delay="160">
            Chi gestisce una scuola calcio oggi fa il presidente, il segretario, il contabile e il centralino — tutto
            insieme, spesso gratis, spesso la sera dopo il lavoro. ClubIS non è un gestionale in più: è il posto unico
            dove Excel, WhatsApp e il quaderno delle rette smettono di essere un problema.
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
            <a href={TRIAL_HREF} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Prova ClubIS Scuole Calcio — 7 giorni gratis <ArrowRight size={15} />
            </a>
            <DemoRequestDialog source="header-clubis-scuole-calcio">
              <button type="button" className="btn-outline">Richiedi una demo</button>
            </DemoRequestDialog>
            <a href="#prezzi-scuole-calcio" className="nav-link">Vedi i piani e i prezzi →</a>
          </div>
        </div>
      </section>

      {/* IL PROBLEMA VERO */}
      <section className="relative py-24 md:py-32 border-b border-cis-line">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionTitle
            tag="Il problema vero"
            title={<span>Le serate perse a fare i conti a mano.</span>}
            sub="Excel per le iscrizioni, un gruppo WhatsApp per le comunicazioni, un quaderno per chi ha pagato la retta, rincorse telefoniche a fine mese, ricevute scritte a mano quando arriva marzo e i genitori chiedono i documenti per il 730."
          />
          <p className="fade-up mt-8 font-body text-cis-white/85 text-[1.05rem] leading-relaxed max-w-2xl" data-delay="200">
            E i genitori dall'altra parte non sanno mai: quando c'è allenamento, se il figlio è stato convocato,
            quanto devono ancora pagare. Il dolore non è "non abbiamo un software" — è "passiamo le serate a fare i
            conti a mano e i genitori si lamentano che non sanno niente".
          </p>
        </div>
      </section>

      {/* PER CHI GESTISCE */}
      <section className="relative py-24 md:py-32 border-b border-cis-line" style={{ background: "#0c0c0c" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionTitle
            tag="Per chi gestisce"
            title={<span>Tutto quello che serve a chi guida la scuola calcio.</span>}
            sub="Presidenti e dirigenti, spesso volontari, spesso genitori loro stessi: uno strumento che toglie lavoro invece di aggiungerne."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLUB_FEATURES.map((f, i) => (
              <div key={f.title} className="card-cis fade-up p-6" data-delay={String((i % 3) * 60)}>
                <f.icon size={22} className="text-cis-green" strokeWidth={1.6} />
                <div className="font-display font-bold uppercase text-cis-white text-[15px] mt-4" style={{ letterSpacing: "0.08em" }}>
                  {f.title}
                </div>
                <p className="font-body text-[13.5px] text-cis-muted mt-2 leading-relaxed">{f.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <Check size={12} className="text-cis-green mt-1 flex-shrink-0" strokeWidth={2.6} />
                      <span className="font-body text-[12.5px] text-cis-white/80 leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PER LE FAMIGLIE */}
      <section className="relative py-24 md:py-32 border-b border-cis-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionTitle
            tag="Per le famiglie"
            title={<span>Un'app che dice esattamente quello che serve a un genitore.</span>}
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FAMILY_POINTS.map((f, i) => (
              <div key={f.title} className="card-cis fade-up p-6 flex items-start gap-4" data-delay={String((i % 2) * 80)}>
                <f.icon size={22} className="text-cis-green mt-1 flex-shrink-0" strokeWidth={1.6} />
                <div>
                  <div className="font-display font-bold uppercase text-cis-white text-[15px]" style={{ letterSpacing: "0.08em" }}>
                    {f.title}
                  </div>
                  <p className="font-body text-[13.5px] text-cis-muted mt-2 leading-relaxed">{f.desc}</p>
                </div>
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
            title={<span>Stessa piattaforma ClubIS, pensata anche per le scuole calcio.</span>}
            sub="Ogni schermata è presa dal prodotto in uso, non un mockup."
          />
          <div className="mt-16 fade-up">
            <ScreenshotGallery shots={CLUBSHOTS} accent="green" />
          </div>
        </div>
      </section>

      {/* DOVE VANNO I SOLDI */}
      <section className="relative py-24 md:py-32 border-b border-cis-line">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <SectionTitle
            tag="Trasparenza sui pagamenti"
            title={<span>Dove vanno davvero i soldi.</span>}
            sub="Il punto che rassicura di più."
          />
          <div className="mt-10 card-cis fade-up p-8" data-delay="120">
            <div className="flex items-start gap-3">
              <ShieldCheck size={22} className="text-cis-green mt-1 flex-shrink-0" strokeWidth={1.6} />
              <p className="font-body text-[15px] text-cis-white/90 leading-relaxed">
                I soldi del pagamento vanno dritti sul conto corrente della società, non passano da noi, non restano
                "in sospeso" da qualche parte in attesa di un bonifico.
              </p>
            </div>
            <div className="my-6 h-px bg-cis-line" />
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Check size={14} className="text-cis-green mt-1 flex-shrink-0" strokeWidth={2.4} />
                <span className="font-body text-[14px] text-cis-white/85 leading-snug">
                  Zero canone sui pagamenti, zero costi fissi: si paga solo una piccola commissione quando c'è
                  davvero un incasso — 1,5%, la metà di quello che chiede il principale concorrente di settore.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check size={14} className="text-cis-green mt-1 flex-shrink-0" strokeWidth={2.4} />
                <span className="font-body text-[14px] text-cis-white/85 leading-snug">
                  Metà commissione (0,75%) la vede il genitore come piccolo sovrapprezzo in fase di pagamento,
                  l'altra metà (0,75%) è trattenuta sull'incasso della società — dichiarata, visibile, mai
                  nascosta in fondo a un contratto.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PREZZI */}
      <section id="prezzi-scuole-calcio" className="relative py-24 md:py-32 border-b border-cis-line" style={{ background: "#0c0c0c" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionTitle
            tag="Prezzi"
            title={<span>Un prezzo semplice, una sola cifra.</span>}
            sub="Nessun costo di attivazione. 7 giorni di prova gratuita, nessuna carta richiesta."
            align="center"
          />
          <div className="mt-14 grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="card-cis fade-up p-7 md:p-8 rounded-xl">
              <div className="font-display font-black uppercase text-cis-white text-2xl" style={{ letterSpacing: "0.08em" }}>
                Mensile
              </div>
              <div className="font-display font-bold uppercase text-cis-muted text-[10px] mt-1.5" style={{ letterSpacing: "0.18em" }}>
                Disattivabile quando vuoi
              </div>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display font-black text-cis-green text-5xl leading-none">€30</span>
                <span className="font-body text-cis-muted text-sm">/ mese</span>
              </div>
              <a
                href={`${TRIAL_HREF}&ciclo=mensile`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-7 w-full justify-center rounded-lg"
              >
                Inizia Prova Gratuita <ArrowRight size={15} />
              </a>
              <div className="text-center font-body text-cis-muted text-[12px] mt-3">
                7 giorni gratis · nessuna carta richiesta
              </div>
            </div>
            <div className="card-cis fade-up p-7 md:p-8 rounded-xl relative" data-delay="80" style={{ borderColor: "#c8f000" }}>
              <span
                className="absolute -top-3 left-7 font-display font-black uppercase text-[10px] px-2.5 py-1 rounded"
                style={{ background: "#c8f000", color: "#0a0a0a", letterSpacing: "0.18em" }}
              >
                -10%
              </span>
              <div className="font-display font-black uppercase text-cis-white text-2xl" style={{ letterSpacing: "0.08em" }}>
                Stagionale
              </div>
              <div className="font-display font-bold uppercase text-cis-muted text-[10px] mt-1.5" style={{ letterSpacing: "0.18em" }}>
                Agosto → Giugno, 11 mesi
              </div>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display font-black text-cis-green text-5xl leading-none">€300</span>
                <span className="font-body text-cis-muted text-sm">/ stagione</span>
              </div>
              <div className="font-body text-[12px] text-cis-muted mt-1.5">
                invece di €330 pagando mese per mese
              </div>
              <a
                href={`${TRIAL_HREF}&ciclo=stagionale`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-7 w-full justify-center rounded-lg"
              >
                Inizia Prova Gratuita <ArrowRight size={15} />
              </a>
              <div className="text-center font-body text-cis-muted text-[12px] mt-3">
                7 giorni gratis · nessuna carta richiesta
              </div>
            </div>
          </div>
          <p className="fade-up text-center font-body text-cis-muted text-sm mt-10">
            Tutti i prezzi sono IVA esclusa. Nessun costo di attivazione. Cancellazione in qualsiasi momento.
          </p>
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
            Basta rincorrere i genitori per la retta.
          </h2>
          <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-3" data-delay="180">
            <a href={TRIAL_HREF} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Prova ClubIS Scuole Calcio — 7 giorni <ArrowRight size={15} />
            </a>
            <DemoRequestDialog source="footer-clubis-scuole-calcio">
              <button type="button" className="btn-outline">Richiedi una demo</button>
            </DemoRequestDialog>
          </div>
          <div className="fade-up mt-6" data-delay="220">
            <a href="/" className="nav-link">← Torna alla home</a>
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
              <a href="/clubis-scuole-calcio" className="nav-link active">Scuole Calcio</a>
              <a href="/dmscout" className="nav-link">DM Scout</a>
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

export default ClubISScuoleCalcio;
