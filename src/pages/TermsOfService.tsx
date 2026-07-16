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
const TermsOfService = () => {
  useFadeUp();
  useDocumentMeta({
    title: "Termini di Servizio — ClubIS",
    description: "Termini e condizioni di utilizzo di ClubIS e DM Scout: abbonamento, fatturazione, prova gratuita, recesso e responsabilità.",
    canonical: "https://dmfootballservices.it/termini",
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
            Termini di Servizio
          </h1>
          <p className="fade-up font-body text-cis-muted mt-4 text-[13px] uppercase" data-delay="140" style={{ letterSpacing: "0.1em" }}>
            Ultimo aggiornamento: 15 luglio 2026
          </p>
          <p className="fade-up font-body text-cis-muted mt-6 max-w-2xl text-[1.02rem] leading-relaxed" data-delay="180">
            I presenti Termini di Servizio ("Termini") regolano l'utilizzo di <span className="text-cis-white">ClubIS</span> e
            di <span className="text-cis-white">DM Scout</span>, i software erogati in modalità SaaS (Software as a
            Service) da <span className="text-cis-white">DM Football Services</span>. Utilizzando i nostri servizi,
            accetti integralmente i presenti Termini.
          </p>

          {/* Body */}
          <div className="mt-16 space-y-14">
            <Section n="1" title="Oggetto del servizio">
              <p>
                DM Football Services fornisce, tramite abbonamento, l'accesso a due piattaforme software distinte e
                complementari:
              </p>
              <ul className="list-disc list-inside space-y-2 marker:text-cis-green">
                <li><span className="text-cis-white">ClubIS</span> — il gestionale per società di calcio strutturate (club di Eccellenza, Promozione e Serie D), con dashboard dedicate ai diversi ruoli del club (presidenza, segreteria, area tecnica, mercato, area medica, famiglie e altri);</li>
                <li><span className="text-cis-white">DM Scout</span> — la piattaforma di scouting con intelligenza artificiale per agenzie, scout e direttori sportivi.</li>
              </ul>
              <p>
                L'accesso ai servizi avviene tramite abbonamento SaaS a pagamento, secondo i piani descritti all'art. 2.
              </p>
            </Section>

            <Section n="2" title="Piani, prezzi e fatturazione">
              <p>ClubIS è disponibile nei seguenti piani, fatturati mensilmente o annualmente:</p>
              <ul className="list-disc list-inside space-y-2 marker:text-cis-green">
                <li><span className="text-cis-white">Starter</span> — a partire da €59/mese, IVA esclusa;</li>
                <li><span className="text-cis-white">Pro</span> — a partire da €99/mese, IVA esclusa;</li>
                <li><span className="text-cis-white">Elite</span> — a partire da €179/mese, IVA esclusa.</li>
              </ul>
              <p>
                DM Scout è disponibile in un unico piano a <span className="text-cis-white">€49/mese</span>, IVA esclusa.
              </p>
              <p>
                Con la fatturazione annuale è previsto uno sconto sui prezzi mensili sopra indicati, come specificato
                al momento della sottoscrizione. Tutti i prezzi indicati sul sito e nel presente documento si
                intendono IVA esclusa. Non è previsto alcun costo di attivazione. Gli importi sono addebitati in
                automatico alla scadenza di ciascun periodo di fatturazione (mensile o annuale), salvo disdetta
                comunicata secondo quanto previsto all'art. 4.
              </p>
            </Section>

            <Section n="3" title="Prova gratuita">
              <p>
                ClubIS e DM Scout offrono una prova gratuita di <span className="text-cis-white">7 giorni</span>, senza
                necessità di inserire una carta di credito. Al termine del periodo di prova, l'account non si
                trasforma automaticamente in un abbonamento a pagamento: l'attivazione di un piano richiede una
                scelta esplicita da parte dell'utente.
              </p>
            </Section>

            <Section n="4" title="Recesso e cancellazione">
              <p>
                L'utente può cancellare il proprio abbonamento in qualsiasi momento, senza vincoli di durata minima e
                senza penali, direttamente dalle impostazioni dell'account o contattando l'assistenza. La
                cancellazione ha effetto alla fine del periodo di fatturazione già pagato; non sono previsti rimborsi
                per i periodi già fatturati, salvo diversamente concordato per iscritto.
              </p>
            </Section>

            <Section n="5" title="Disponibilità del servizio e limitazioni di responsabilità">
              <p>
                ClubIS e DM Scout sono forniti "as-is" e "as-available". DM Football Services adotta misure
                ragionevoli per garantire la continuità, la sicurezza e le prestazioni del servizio, ma non garantisce
                che il servizio sarà disponibile ininterrottamente al 100% o esente da errori, interruzioni o difetti.
              </p>
              <p>
                Nei limiti massimi consentiti dalla legge applicabile, DM Football Services non è responsabile per
                danni indiretti, incidentali o consequenziali derivanti dall'uso o dall'impossibilità di uso del
                servizio, inclusi ma non limitati a perdita di dati, mancato guadagno o interruzione dell'attività,
                salvo il caso di dolo o colpa grave.
              </p>
            </Section>

            <Section n="6" title="Proprietà intellettuale">
              <p>
                Il software, il codice sorgente, il design, i marchi "ClubIS" e "DM Scout", i loghi e tutti i
                contenuti relativi alle piattaforme sono di proprietà di DM Football Services o dei rispettivi
                licenzianti e sono protetti dalle leggi vigenti in materia di proprietà intellettuale. L'abbonamento
                concede all'utente una licenza d'uso limitata, non esclusiva, non trasferibile e revocabile,
                esclusivamente per la durata dell'abbonamento e per gli scopi previsti dal servizio. È vietata
                qualsiasi riproduzione, copia, modifica, distribuzione o decompilazione del software non
                espressamente autorizzata.
              </p>
              <p>
                I dati inseriti dall'utente e dal club (anagrafiche, documenti, contenuti caricati) restano di
                proprietà dell'utente/club stesso; DM Football Services li tratta esclusivamente per l'erogazione del
                servizio, secondo quanto previsto dalla Privacy Policy.
              </p>
            </Section>

            <Section n="7" title="Obblighi dell'utente">
              <p>Utilizzando ClubIS o DM Scout, l'utente si impegna a:</p>
              <ul className="list-disc list-inside space-y-2 marker:text-cis-green">
                <li>Fornire dati veritieri, corretti e aggiornati in fase di registrazione e utilizzo della piattaforma;</li>
                <li>Utilizzare il servizio nel rispetto delle leggi applicabili e dei regolamenti federali (FIGC) pertinenti;</li>
                <li>Non utilizzare la piattaforma per finalità illecite, fraudolente o lesive dei diritti di terzi;</li>
                <li>Mantenere riservate le proprie credenziali di accesso e informare tempestivamente DM Football Services in caso di uso non autorizzato dell'account;</li>
                <li>Garantire, ove il club inserisca dati di terzi (tesserati, familiari, staff), di avere una base giuridica adeguata e, se necessario, il consenso dell'interessato per il relativo trattamento all'interno della piattaforma.</li>
              </ul>
            </Section>

            <Section n="8" title="Modifiche al servizio e ai Termini">
              <p>
                DM Football Services può aggiornare o modificare le funzionalità del servizio e i presenti Termini in
                qualsiasi momento, dandone comunicazione tramite il sito o via email. L'uso continuato del servizio
                dopo la pubblicazione delle modifiche costituisce accettazione dei nuovi Termini.
              </p>
            </Section>

            <Section n="9" title="Legge applicabile e foro competente">
              <p>
                I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia relativa
                all'interpretazione, esecuzione o risoluzione dei presenti Termini, sarà competente in via esclusiva
                il <span className="text-cis-white">[FORO COMPETENTE]</span>, salvo le disposizioni inderogabili di
                legge a tutela dei consumatori.
              </p>
            </Section>

            <Section n="10" title="Contatti">
              <p>
                Per qualsiasi domanda relativa ai presenti Termini di Servizio, puoi contattarci
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

export default TermsOfService;
