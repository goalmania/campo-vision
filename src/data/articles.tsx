import type { ReactNode } from "react";

export type Article = {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  readingMinutes: number;
  body: ReactNode;
};

const P = ({ children }: { children: ReactNode }) => (
  <p className="font-body text-[15px] text-cis-white/85 leading-relaxed mb-5">{children}</p>
);
const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="font-display font-bold uppercase text-cis-green text-xl md:text-2xl mt-12 mb-4" style={{ letterSpacing: "0.01em" }}>
    {children}
  </h2>
);
const UL = ({ children }: { children: ReactNode }) => (
  <ul className="font-body text-[15px] text-cis-white/85 leading-relaxed mb-5 space-y-2 list-disc pl-5">{children}</ul>
);

export const ARTICLES: Article[] = [
  {
    slug: "financial-fair-play-calcio-dilettantistico",
    title: "Financial Fair Play nel calcio dilettantistico: cos'è e perché conta anche per un club di Eccellenza o Serie D",
    description: "Cos'è il Financial Fair Play, perché non riguarda solo i grandi club professionistici, e come una società di calcio strutturata può monitorarlo senza un ufficio amministrativo dedicato.",
    publishDate: "2026-07-16",
    readingMinutes: 6,
    body: (
      <>
        <P>Quando si parla di Financial Fair Play (FFP), il pensiero va quasi sempre ai grandi club professionistici e ai controlli UEFA. Ma il principio di fondo — non spendere più di quanto un club possa realisticamente sostenere — riguarda in modo altrettanto concreto anche una società di calcio dilettantistico o semiprofessionistico di Eccellenza, Promozione o Serie D. Su scala più piccola, gli stessi rischi si presentano: sponsor che tardano a pagare, quote di iscrizione arretrate, ingaggi promessi senza una reale copertura di budget.</P>

        <H2>Cosa significa FFP per un club strutturato</H2>
        <P>In termini pratici, per una società di calcio strutturata il Financial Fair Play si traduce in una domanda semplice: il club sa, in ogni momento della stagione, quanto ha effettivamente disponibile rispetto a quanto ha già impegnato? Senza un sistema che tenga insieme entrate (quote, sponsor, contributi), uscite (ingaggi, trasferte, materiale tecnico) e impegni futuri (rate ancora da incassare, pagamenti dilazionati), la risposta spesso arriva solo a fine stagione — quando è troppo tardi per correggere la rotta.</P>

        <H2>I segnali che un club dovrebbe monitorare</H2>
        <UL>
          <li>Scostamento tra budget pianificato a inizio stagione e spesa effettiva mese per mese</li>
          <li>Percentuale di quote iscrizione realmente incassate rispetto al totale previsto</li>
          <li>Sponsor con pagamenti in ritardo rispetto al contratto</li>
          <li>Rapporto tra costi fissi (staff, impianti) e ricavi certi (non stimati)</li>
          <li>Esposizione verso giocatori/staff per ingaggi o rimborsi non ancora liquidati</li>
        </UL>

        <H2>Perché senza un gestionale è difficile farlo bene</H2>
        <P>Il problema, per la maggior parte dei club dilettantistici, non è la mancanza di volontà ma la frammentazione dei dati: il budget vive in un foglio Excel del presidente, le quote iscrizione in un quaderno del segretario, gli sponsor in una cartella email. Mettere insieme questi tre pezzi per avere un quadro reale richiede tempo che, in una società gestita da volontari o da uno staff ridotto, semplicemente non c'è.</P>
        <P>Un gestionale pensato per società di calcio strutturate — con dashboard dedicate al presidente per il quadro esecutivo e al segretario per l'operatività quotidiana — permette di vedere il Financial Fair Play in tempo reale invece che ricostruirlo a posteriori. È esattamente uno dei motivi per cui <a href="/clubis" style={{ color: "var(--c-green)" }}>ClubIS</a> include il monitoraggio FFP tra le funzioni della dashboard Presidente, calcolato automaticamente dagli stessi dati già inseriti per quote, sponsor e budget di mercato.</P>

        <H2>Domande frequenti</H2>
        <P><strong>Il Financial Fair Play riguarda solo i club professionistici?</strong><br/>No. Il principio di sostenibilità finanziaria si applica a qualsiasi società strutturata, indipendentemente dalla categoria: cambia la scala dei numeri, non la logica.</P>
        <P><strong>Serve un commercialista per monitorarlo?</strong><br/>Per gli adempimenti fiscali sì, ma il monitoraggio operativo quotidiano (quanto ho impegnato vs quanto ho disponibile) può essere gestito direttamente dal presidente o dal segretario con gli strumenti giusti, senza attendere il bilancio di fine stagione.</P>
      </>
    ),
  },
  {
    slug: "comunicato-ufficiale-figc-guida",
    title: "Comunicati Ufficiali FIGC: come leggerli e perché il segretario perde tempo ogni settimana",
    description: "Cosa contiene un Comunicato Ufficiale FIGC/LND, perché la lettura manuale è un collo di bottiglia per il segretario di un club, e come automatizzare l'applicazione di squalifiche e diffide.",
    publishDate: "2026-07-16",
    readingMinutes: 5,
    body: (
      <>
        <P>Ogni settimana, durante la stagione, la Lega Nazionale Dilettanti pubblica il Comunicato Ufficiale (C.U.) con gli esiti del giudice sportivo: squalifiche, diffide, ammende, provvedimenti disciplinari. Per il segretario di un club è uno dei documenti più importanti da leggere — e anche uno dei più dispersivi, perché le informazioni rilevanti per la propria squadra sono mescolate a quelle di decine di altre squadre del girone.</P>

        <H2>Cosa contiene tipicamente un Comunicato Ufficiale</H2>
        <UL>
          <li>Provvedimenti del giudice sportivo (squalifiche per giornate, ammende alle società)</li>
          <li>Comunicazioni relative a variazioni di calendario</li>
          <li>Delibere e comunicazioni della Lega/Comitato regionale</li>
          <li>A volte, informazioni tesseramenti o disposizioni amministrative</li>
        </UL>

        <H2>Perché la lettura manuale è un collo di bottiglia</H2>
        <P>Il problema non è capire il contenuto — è trovare, ogni settimana, esattamente le righe che riguardano la propria squadra dentro un documento che elenca provvedimenti per l'intero girone, e poi ricordarsi di applicare quella squalifica alla distinta gara della settimana successiva. È un lavoro meccanico e ripetitivo, ma che richiede attenzione: un errore — schierare un giocatore squalificato — ha conseguenze sportive dirette, non solo amministrative.</P>
        <P>Per un segretario che segue anche il settore giovanile multi-squadra, moltiplicare questa lettura per ogni categoria diventa rapidamente un'attività che assorbe una parte significativa del tempo disponibile durante la settimana.</P>

        <H2>Come si può automatizzare</H2>
        <P>Il punto centrale è che il contenuto del C.U. è testo strutturato e ripetitivo nel formato: un sistema può riconoscere automaticamente i pattern (nome giocatore, numero di giornate, tipo di provvedimento) ed applicarli direttamente ai profili dei tesserati, aggiornando in automatico la disponibilità per la distinta gara successiva. È il principio su cui si basa la funzione di analisi automatica dei Comunicati Ufficiali di <a href="/clubis" style={{ color: "var(--c-green)" }}>ClubIS</a>: il segretario incolla il testo del C.U., il sistema individua le squalifiche relative alla propria rosa e le applica automaticamente, eliminando la lettura manuale riga per riga.</P>

        <H2>Domande frequenti</H2>
        <P><strong>Ogni girone pubblica i C.U. con la stessa frequenza?</strong><br/>In genere con cadenza settimanale durante la stagione regolare, ma la frequenza esatta dipende dal Comitato Regionale e dalla categoria.</P>
        <P><strong>Cosa succede se una squalifica non viene applicata in tempo?</strong><br/>Schierare un giocatore squalificato espone la società a sanzioni sportive aggiuntive, motivo per cui molti club preferiscono un doppio controllo — manuale e automatico — nelle prime settimane di adozione di un nuovo sistema.</P>
      </>
    ),
  },
  {
    slug: "tesseramenti-figc-guida",
    title: "Tesseramenti FIGC: definitivo, prestito, prova, svincolo — una guida rapida per segretari di club",
    description: "Le differenze tra le principali tipologie di tesseramento FIGC e perché tenerne traccia in modo organizzato evita errori nella compilazione delle distinte gara.",
    publishDate: "2026-07-16",
    readingMinutes: 5,
    body: (
      <>
        <P>Uno dei compiti meno visibili ma più delicati del segretario di un club è la gestione corretta dei tesseramenti: sapere in ogni momento sotto quale forma un giocatore è tesserato per la società, perché da questo dipendono eleggibilità in distinta gara, scadenze da rispettare e comunicazioni da inviare.</P>

        <H2>Le principali tipologie di tesseramento</H2>
        <UL>
          <li><strong>Definitivo</strong> — il vincolo ordinario tra giocatore e società, valido secondo le norme federali in vigore per la stagione sportiva.</li>
          <li><strong>Prestito</strong> — il giocatore resta tesserato per la società di appartenenza ma viene fatto giocare temporaneamente per un'altra società, secondo accordi e vincoli regolamentari specifici.</li>
          <li><strong>Prova</strong> — una forma temporanea utilizzata per valutare un giocatore prima di un tesseramento definitivo, con vincoli temporali stretti.</li>
          <li><strong>Svincolo</strong> — la cessazione del vincolo tra giocatore e società, che libera il giocatore per un nuovo tesseramento altrove.</li>
        </UL>
        <P>Le regole esatte (finestre temporali, documentazione richiesta, categorie interessate) sono stabilite dalla FIGC e dalla Lega Nazionale Dilettanti e possono variare da una stagione all'altra: per i dettagli aggiornati il riferimento resta sempre la normativa federale in vigore, non una guida generica.</P>

        <H2>Perché è facile perdere il controllo senza un sistema centralizzato</H2>
        <P>Il rischio tipico non è ignorare le regole, ma perdere traccia di scadenze e stati intermedi quando la rosa è ampia o quando il club gestisce anche un settore giovanile multi-squadra. Un giocatore in prova che scade senza essere confermato, un prestito che termina senza che nessuno se ne accorga, un tesseramento in attesa di completamento: sono tutte situazioni che, su un foglio Excel condiviso tra più persone, sfuggono facilmente.</P>

        <H2>Come un gestionale aiuta a tenere tutto in ordine</H2>
        <P>Avere un'anagrafica giocatori in cui ogni tesseramento è tracciato con il proprio stato e la propria scadenza — con avvisi automatici quando una situazione richiede un'azione — riduce drasticamente il rischio di errori nella compilazione della distinta gara. È una delle funzioni base della dashboard Segretario di <a href="/clubis" style={{ color: "var(--c-green)" }}>ClubIS</a>: ogni tesseramento (definitivo, prestito, prova, svincolo) è visibile con scadenziario automatico, così la distinta gara si genera già con i controlli di eleggibilità applicati.</P>

        <H2>Domande frequenti</H2>
        <P><strong>Chi decide le finestre di tesseramento?</strong><br/>Le finestre e le regole di dettaglio sono stabilite dalla FIGC/LND e dai Comitati Regionali, e possono differire tra categorie e stagioni.</P>
        <P><strong>Un errore di tesseramento in distinta ha conseguenze immediate?</strong><br/>Sì, in genere comporta provvedimenti del giudice sportivo: è uno dei motivi per cui molti segretari preferiscono un sistema con controlli automatici di eleggibilità prima dell'invio della distinta.</P>
      </>
    ),
  },
];
