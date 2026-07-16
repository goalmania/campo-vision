import { useFadeUp } from "@/hooks/useFadeUp";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Nav from "@/components/Nav";
import { ArrowLeft } from "lucide-react";

/* ───────────── helpers ───────────── */
const Section = ({
  n, title, children,
}: { n: string; title: string; children: React.ReactNode }) => (
  <section className="fade-up">
    <h2
      className="font-display font-bold uppercase text-cis-green text-xl md:text-2xl"
      style={{ letterSpacing: "0.01em" }}
    >
      {n}. {title}
    </h2>
    <div className="font-body text-cis-white/85 mt-4 space-y-4 leading-relaxed text-[15px]">
      {children}
    </div>
  </section>
);

/* ───────────── Page ───────────── */
const CookiePolicy = () => {
  useFadeUp();
  useDocumentMeta({
    title: "Cookie Policy — ClubIS",
    description: "Informativa sui cookie utilizzati dal sito ClubIS e DM Football Services: categorie, finalità e gestione del consenso.",
    canonical: "https://dmfootballservices.it/cookie",
  });

  return (
    <div id="top" className="relative min-h-screen">
      <Nav />

      <main className="pt-[60px]">
        <section className="max-w-4xl mx-auto px-6 md:px-10 py-24">
          {/* Header */}
          <div className="fade-up"><span className="tag">Legale</span></div>
          <h1
            className="fade-up font-display font-black uppercase text-cis-white mt-5"
            data-delay="80"
            style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)", lineHeight: 0.95, letterSpacing: "-0.01em" }}
          >
            Cookie Policy
          </h1>
          <p className="fade-up font-body text-cis-muted mt-4 text-[13px] uppercase" data-delay="140" style={{ letterSpacing: "0.1em" }}>
            Ultimo aggiornamento: 15 luglio 2026
          </p>
          <p className="fade-up font-body text-cis-muted mt-6 max-w-2xl text-[1.02rem] leading-relaxed" data-delay="180">
            Questa Cookie Policy spiega cosa sono i cookie, quali vengono utilizzati sul sito e sulla piattaforma
            di <span className="text-cis-white">DM Football Services</span> (ClubIS e DM Scout) e come puoi gestirne
            l'utilizzo.
          </p>

          {/* Body */}
          <div className="mt-16 space-y-14">
            <Section n="1" title="Cosa sono i cookie">
              <p>
                I cookie sono piccoli file di testo che i siti web visitati inviano al dispositivo dell'utente (computer,
                tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita
                successiva. I cookie svolgono funzioni diverse: alcuni sono necessari al corretto funzionamento del
                sito, altri servono a raccogliere statistiche di utilizzo o a personalizzare i contenuti e la
                pubblicità.
              </p>
            </Section>

            <Section n="2" title="Cookie utilizzati su questo sito">
              <p>
                Ad oggi, questo sito utilizza <span className="text-cis-white">esclusivamente cookie tecnici necessari</span> al
                funzionamento della piattaforma e alla navigazione (ad esempio per mantenere la sessione di accesso,
                ricordare le preferenze di visualizzazione o garantire la sicurezza del sito). Questi cookie non
                richiedono il consenso preventivo dell'utente ai sensi della normativa applicabile, in quanto
                strettamente necessari all'erogazione del servizio richiesto.
              </p>
              <p>
                Non utilizziamo, ad oggi, cookie di profilazione pubblicitaria di terze parti. Eventuali cookie di
                analisi/statistica non sono attualmente installati sul sito. Qualunque cookie di terze parti (analytics,
                marketing o altro) venga eventualmente introdotto in futuro sarà elencato in questa pagina, con
                indicazione della relativa finalità e durata, e richiederà il consenso preventivo dell'utente tramite
                un apposito banner conforme alla normativa vigente prima di essere attivato.
              </p>
            </Section>

            <Section n="3" title="Come gestire e revocare il consenso">
              <p>
                Poiché il sito utilizza esclusivamente cookie tecnici necessari, non è al momento presente un banner
                di raccolta del consenso. Qualora in futuro vengano introdotti cookie che richiedono consenso, sarà
                messo a disposizione un banner che permetterà di accettare, rifiutare o personalizzare le proprie
                preferenze in qualsiasi momento.
              </p>
              <p>
                Nel frattempo, puoi comunque gestire o eliminare i cookie già presenti sul tuo dispositivo tramite le
                impostazioni del tuo browser, che consentono generalmente di bloccare i cookie, eliminarli o essere
                avvisato prima che vengano salvati. Ti ricordiamo che disabilitare i cookie tecnici necessari potrebbe
                compromettere il corretto funzionamento del sito e della piattaforma.
              </p>
            </Section>

            <Section n="4" title="Durata dei cookie">
              <p>
                I cookie tecnici attualmente in uso hanno una durata limitata alla sessione di navigazione (cookie di
                sessione) oppure, per alcune funzionalità come il mantenimento del login, una durata persistente
                limitata al tempo strettamente necessario a garantire la continuità del servizio. Nessun cookie
                attualmente installato ha finalità di profilazione o tracciamento pubblicitario.
              </p>
            </Section>

            <Section n="5" title="Aggiornamenti a questa policy">
              <p>
                Questa Cookie Policy potrà essere aggiornata in caso di introduzione di nuovi cookie o nuove
                tecnologie di tracciamento. Ti invitiamo a consultare periodicamente questa pagina per rimanere
                informato su eventuali modifiche.
              </p>
            </Section>

            <Section n="6" title="Contatti">
              <p>
                Per qualsiasi domanda relativa all'uso dei cookie, puoi contattarci
                all'indirizzo <a href="mailto:info@dmfootballservices.it" className="text-cis-green underline underline-offset-4">info@dmfootballservices.it</a> o
                al numero <a href="tel:+393334218596" className="text-cis-green underline underline-offset-4">+39 333 421 8596</a>.
              </p>
            </Section>
          </div>

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-cis-line fade-up">
            <a href="/" className="nav-link inline-flex items-center gap-2">
              <ArrowLeft size={14} /> Torna alla home
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CookiePolicy;
