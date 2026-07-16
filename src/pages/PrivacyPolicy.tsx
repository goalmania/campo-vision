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

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-display font-bold uppercase text-cis-white text-[13px] mt-6 mb-1" style={{ letterSpacing: "0.08em" }}>
    {children}
  </h3>
);

/* ───────────── Page ───────────── */
const PrivacyPolicy = () => {
  useFadeUp();
  useDocumentMeta({
    title: "Privacy Policy — ClubIS",
    description: "Informativa sulla privacy di ClubIS e DM Football Services ai sensi del GDPR (Regolamento UE 2016/679) e del Codice Privacy italiano.",
    canonical: "https://dmfootballservices.it/privacy",
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
            Privacy Policy
          </h1>
          <p className="fade-up font-body text-cis-muted mt-4 text-[13px] uppercase" data-delay="140" style={{ letterSpacing: "0.1em" }}>
            Ultimo aggiornamento: 15 luglio 2026
          </p>
          <p className="fade-up font-body text-cis-muted mt-6 max-w-2xl text-[1.02rem] leading-relaxed" data-delay="180">
            La presente informativa descrive come <span className="text-cis-white">DM Football Services</span> tratta i dati
            personali raccolti tramite <span className="text-cis-white">ClubIS</span>, il gestionale per società di calcio
            strutturate, e i siti e le applicazioni ad esso collegati, in conformità al Regolamento (UE) 2016/679
            ("GDPR") e al D.Lgs. 196/2003 ("Codice Privacy"), come modificato dal D.Lgs. 101/2018.
          </p>

          {/* Body */}
          <div className="mt-16 space-y-14">
            <Section n="1" title="Titolare del trattamento">
              <p>
                Il Titolare del trattamento dei dati è <span className="text-cis-white">[RAGIONE SOCIALE COMPLETA]</span>,
                operante con il marchio "DM Football Services", con sede legale in <span className="text-cis-white">[INDIRIZZO SEDE LEGALE]</span>,
                P.IVA/C.F. <span className="text-cis-white">[P.IVA/C.F.]</span>.
              </p>
              <p>
                Per qualsiasi richiesta relativa al trattamento dei dati personali, il Titolare è contattabile
                all'indirizzo email <a href="mailto:info@dmfootballservices.it" className="text-cis-green underline underline-offset-4">info@dmfootballservices.it</a> o
                al numero <a href="tel:+393334218596" className="text-cis-green underline underline-offset-4">+39 333 421 8596</a>.
              </p>
              <p>
                Responsabile della Protezione dei Dati (DPO): <span className="text-cis-white">[NOME DPO O RESPONSABILE PROTEZIONE DATI, SE NOMINATO]</span>.
              </p>
            </Section>

            <Section n="2" title="Tipologie di dati trattati">
              <p>Nell'ambito dell'utilizzo di ClubIS da parte delle società calcistiche clienti e dei loro utenti (dirigenti, staff tecnico, tesserati e famiglie), possono essere trattate le seguenti categorie di dati:</p>
              <H3>Dati anagrafici dei tesserati</H3>
              <p>Nome, cognome, data e luogo di nascita, codice fiscale, codice tessera FIGC, recapiti, ruolo sportivo e dati relativi al tesseramento (definitivo, prestito, prova, svincolo).</p>
              <H3>Dati sanitari (categoria particolare, art. 9 GDPR)</H3>
              <p>
                Certificati medici di idoneità sportiva, informazioni su infortuni e stato di recupero, cartelle cliniche
                digitali quando presenti. Trattandosi di dati relativi alla salute, questi sono trattati sulla base del
                <span className="text-cis-white"> consenso esplicito</span> dell'interessato (o di chi ne esercita la
                responsabilità genitoriale per i minori) ai sensi dell'art. 9, par. 2, lett. a) GDPR, oppure, ove
                applicabile, sulla base dell'esecuzione di obblighi previsti dalla normativa sportiva e di sicurezza
                sanitaria per la partecipazione ad attività agonistiche (art. 9, par. 2, lett. h) e art. 2-septies del
                Codice Privacy). Tali dati sono accessibili esclusivamente al personale medico e ai ruoli
                espressamente autorizzati dal club all'interno della piattaforma.
              </p>
              <H3>Documenti d'identità</H3>
              <p>Copie di documenti di riconoscimento caricati per finalità di tesseramento, verifica identità o adempimenti amministrativi richiesti dalla FIGC o da enti federali.</p>
              <H3>Dati di pagamento</H3>
              <p>
                Dati relativi a quote di iscrizione, abbonamenti e pagamenti in genere. I dati della carta di
                pagamento non sono mai memorizzati né accessibili da DM Football Services: la transazione è gestita
                interamente dai processori di pagamento <span className="text-cis-white">Stripe</span> e <span className="text-cis-white">PayPal</span>, che agiscono come sub-responsabili del trattamento.
              </p>
              <H3>Dati di navigazione e cookie</H3>
              <p>Dati tecnici di navigazione e cookie strettamente necessari al funzionamento del sito e della piattaforma, oltre a eventuali cookie di analisi, se e quando attivati (si veda la Cookie Policy).</p>
            </Section>

            <Section n="3" title="Finalità e basi giuridiche del trattamento">
              <p>I dati personali sono trattati per le seguenti finalità:</p>
              <ul className="list-disc list-inside space-y-2 marker:text-cis-green">
                <li>Erogazione del servizio ClubIS e delle funzionalità richieste dal club cliente (esecuzione del contratto, art. 6, par. 1, lett. b GDPR);</li>
                <li>Gestione amministrativa dei tesseramenti, delle quote e della contabilità del club (esecuzione del contratto e obblighi di legge, art. 6, par. 1, lett. b e c GDPR);</li>
                <li>Trattamento dei dati sanitari dei tesserati per finalità di idoneità sportiva e sicurezza (consenso esplicito, art. 9, par. 2, lett. a GDPR, o altra base come indicato al punto 2);</li>
                <li>Gestione dei pagamenti tramite Stripe e PayPal (esecuzione del contratto, art. 6, par. 1, lett. b GDPR);</li>
                <li>Adempimento di obblighi di legge, fiscali e verso la FIGC (art. 6, par. 1, lett. c GDPR);</li>
                <li>Sicurezza della piattaforma, prevenzione di frodi e miglioramento del servizio (legittimo interesse, art. 6, par. 1, lett. f GDPR);</li>
                <li>Comunicazioni relative al servizio, assistenza clienti e, previo consenso, comunicazioni commerciali (consenso, art. 6, par. 1, lett. a GDPR).</li>
              </ul>
            </Section>

            <Section n="4" title="Modalità e tempi di conservazione">
              <p>
                I dati sono trattati con strumenti informatici e conservati su infrastruttura hosting con server
                collocati in ambito europeo, con backup giornalieri e crittografia dei dati sia in transito che a riposo.
              </p>
              <p>
                I dati sono conservati per tutta la durata del rapporto contrattuale con il club e, successivamente,
                per il periodo necessario ad adempiere agli obblighi di legge (fiscali, contabili, federali) o, in
                assenza di un termine specifico, per un periodo massimo di 10 anni dalla cessazione del rapporto,
                salvo diverso termine richiesto da specifiche normative di settore. I dati sanitari sono conservati
                solo per il tempo necessario alle finalità per cui sono stati raccolti e comunque nel rispetto dei
                termini previsti dalla normativa sportiva e sanitaria applicabile.
              </p>
            </Section>

            <Section n="5" title="Sub-responsabili del trattamento e destinatari dei dati">
              <p>Per l'erogazione del servizio, il Titolare si avvale dei seguenti sub-responsabili del trattamento (art. 28 GDPR):</p>
              <ul className="list-disc list-inside space-y-2 marker:text-cis-green">
                <li><span className="text-cis-white">Stripe</span> — elaborazione dei pagamenti tramite carta e altri metodi supportati;</li>
                <li><span className="text-cis-white">PayPal</span> — elaborazione dei pagamenti tramite conto PayPal;</li>
                <li><span className="text-cis-white">[NOME PROVIDER HOSTING]</span> — fornitore dell'infrastruttura di hosting su cui è ospitata la piattaforma ClubIS.</li>
              </ul>
              <p>
                I dati possono inoltre essere comunicati a soggetti terzi ove necessario per adempiere a obblighi di
                legge o a richieste di autorità competenti (es. FIGC, autorità fiscali, autorità giudiziarie).
              </p>
            </Section>

            <Section n="6" title="Trasferimenti extra-UE">
              <p>
                Stripe e PayPal possono trattare i dati anche al di fuori dello Spazio Economico Europeo. In tal
                caso, il trasferimento avviene sulla base delle garanzie previste dal GDPR, quali le Clausole
                Contrattuali Standard approvate dalla Commissione Europea o altre misure di adeguatezza previste
                dagli artt. 44-49 GDPR, come indicato nelle rispettive informative privacy di Stripe e PayPal.
              </p>
            </Section>

            <Section n="7" title="Diritti dell'interessato">
              <p>In qualità di interessato, hai diritto di:</p>
              <ul className="list-disc list-inside space-y-2 marker:text-cis-green">
                <li>Accedere ai tuoi dati personali (art. 15 GDPR);</li>
                <li>Ottenere la rettifica dei dati inesatti o incompleti (art. 16 GDPR);</li>
                <li>Ottenere la cancellazione dei dati, nei limiti previsti dalla legge (art. 17 GDPR);</li>
                <li>Ottenere la limitazione del trattamento (art. 18 GDPR);</li>
                <li>Ricevere i dati in un formato strutturato e portarli ad altro titolare (portabilità, art. 20 GDPR);</li>
                <li>Opporti al trattamento basato sul legittimo interesse (art. 21 GDPR);</li>
                <li>Revocare in qualsiasi momento il consenso prestato, senza pregiudicare la liceità del trattamento svolto prima della revoca;</li>
                <li>Proporre reclamo al Garante per la Protezione dei Dati Personali (www.garanteprivacy.it), qualora ritieni che il trattamento violi il GDPR.</li>
              </ul>
            </Section>

            <Section n="8" title="Come esercitare i tuoi diritti">
              <p>
                Per esercitare i diritti sopra descritti, puoi contattare il Titolare del trattamento all'indirizzo
                email <a href="mailto:info@dmfootballservices.it" className="text-cis-green underline underline-offset-4">info@dmfootballservices.it</a> o
                al numero <a href="tel:+393334218596" className="text-cis-green underline underline-offset-4">+39 333 421 8596</a>. Risponderemo alla tua richiesta entro i termini previsti dalla normativa vigente.
              </p>
            </Section>

            <Section n="9" title="Modifiche alla presente informativa">
              <p>
                Il Titolare si riserva il diritto di modificare la presente informativa privacy in qualsiasi momento,
                dandone comunicazione tramite pubblicazione sul sito. Si consiglia di consultare periodicamente
                questa pagina per rimanere aggiornati.
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

export default PrivacyPolicy;
