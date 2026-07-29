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
  {
    slug: "come-scegliere-gestionale-societa-calcio",
    title: "Come scegliere il gestionale giusto per la tua società di calcio: 10 criteri (con checklist)",
    description: "10 criteri concreti per valutare un gestionale per società di calcio dilettantistiche: cosa chiedere prima di comprare, quali red flag evitare e una checklist da usare durante la valutazione.",
    publishDate: "2026-07-29",
    readingMinutes: 7,
    body: (
      <>
        <P>Scegliere il gestionale sbagliato costa più che non averne nessuno: significa migrare dati due volte, riformare lo staff da capo, e tornare — nel frattempo — a Excel e WhatsApp per non fermare la stagione. Prima di firmare un abbonamento, vale la pena valutare un gestionale per società di calcio con gli stessi criteri con cui si valuterebbe qualsiasi altro fornitore che tocca dati sensibili, pagamenti e adempimenti federali.</P>

        <H2>I 10 criteri da controllare prima di scegliere</H2>
        <UL>
          <li><strong>1. Copre davvero i processi FIGC/LND</strong> o è un gestionale sportivo generico (spesso pensato per altri sport o altri paesi) adattato alla meglio?</li>
          <li><strong>2. Ha dashboard per ruolo</strong> — presidente, segretario, direttore sportivo, allenatore — o un'unica schermata uguale per tutti, che nessuno userà davvero?</li>
          <li><strong>3. Automatizza le distinte gara</strong> con controllo squalifiche, o resta un calcolo manuale che il segretario deve rifare ogni settimana?</li>
          <li><strong>4. Legge i Comunicati Ufficiali</strong> o richiede comunque la lettura riga per riga di un documento di decine di pagine?</li>
          <li><strong>5. Gestisce pagamenti reali</strong> (quote rateali, rimborsi SEPA) o è solo un'anagrafica giocatori senza alcuna funzione finanziaria?</li>
          <li><strong>6. Cosa succede ai tuoi dati se smetti di usarlo</strong> — sono esportabili, o restano bloccati nel sistema del fornitore?</li>
          <li><strong>7. Funziona da smartphone</strong> senza installare nulla (PWA), visto che gran parte dello staff di un club dilettantistico non userà mai un desktop per queste attività?</li>
          <li><strong>8. Quanto costa davvero</strong> — il prezzo mensile pubblicizzato include già le funzioni federali, o sono moduli a pagamento extra?</li>
          <li><strong>9. Si può provare prima di pagare</strong>, con i propri dati reali, o solo con una demo precompilata dal fornitore?</li>
          <li><strong>10. Regge un settore giovanile multi-squadra</strong> sulla stessa piattaforma, se il club ne ha uno, senza dover attivare un abbonamento separato per ogni categoria?</li>
        </UL>

        <H2>I tre criteri su cui vale la pena insistere di più</H2>
        <P>Tra i dieci, tre fanno la differenza pratica più grande nella prima stagione d'uso. Il primo è la copertura reale dei processi FIGC/LND: un gestionale generico costringe comunque il segretario a leggere il Comunicato Ufficiale a mano e a ricostruire la distinta gara fuori dal sistema, vanificando gran parte del risparmio di tempo promesso. Il secondo è la gestione dei pagamenti: se il club incassa quote associative e rimborsa trasferte, un sistema che si ferma all'anagrafica lascia comunque la parte più delicata — i soldi — su bonifici manuali e fogli separati. Il terzo è la possibilità di provarlo con i dati veri del proprio club prima di pagare: una demo precompilata dal fornitore non mostra mai i problemi reali (rose incomplete, tesseramenti misti, categorie multiple) che emergono solo caricando la propria situazione.</P>

        <H2>Una checklist da portare al colloquio con il fornitore</H2>
        <P>Prima di firmare, è utile chiedere direttamente al fornitore: quanto tempo serve per caricare la rosa attuale? I Comunicati Ufficiali si leggono automaticamente o vanno inseriti a mano? I rimborsi generano un file bancario pronto o solo un elenco da ricopiare? C'è un periodo di prova gratuito con i propri dati? Le risposte vaghe o rimandate a "una demo con il commerciale" su queste domande sono di per sé un segnale da non ignorare.</P>
        <P><a href="/clubis" style={{ color: "var(--c-green)" }}>ClubIS</a> è stato costruito rispondendo esattamente a questi dieci criteri per il calcio dilettantistico italiano: dashboard per ruolo, lettura automatica dei Comunicati Ufficiali, distinte gara con controllo squalifiche, rimborsi SEPA in batch e 7 giorni di prova gratuita senza carta di credito, per verificare tutto questo con i dati reali del proprio club prima di decidere.</P>

        <H2>Domande frequenti</H2>
        <P><strong>Quanto tempo serve per valutare un gestionale prima di scegliere?</strong><br/>In genere una settimana di prova gratuita con i dati reali del club (rosa, calendario, un ciclo di distinta gara) è sufficiente per capire se copre davvero l'operatività quotidiana, molto più di una demo guidata dal commerciale.</P>
        <P><strong>Conviene scegliere il gestionale più economico?</strong><br/>Non necessariamente: un prezzo basso che esclude le funzioni FIGC/LND o i pagamenti spesso significa dover comunque usare Excel o WhatsApp in parallelo, annullando il risparmio di tempo che era l'obiettivo iniziale.</P>
      </>
    ),
  },
  {
    slug: "clubis-vs-excel-whatsapp-gestione-squadra-calcio",
    title: "Gestionale calcio vs Excel e WhatsApp: perché le società di calcio stanno abbandonando i fogli di calcolo",
    description: "Dove Excel e WhatsApp smettono di reggere la gestione di una società di calcio strutturata, cosa cambia passando a un gestionale dedicato, e quando invece non serve ancora cambiare.",
    publishDate: "2026-07-29",
    readingMinutes: 6,
    body: (
      <>
        <P>Quasi ogni società di calcio dilettantistica parte allo stesso modo: un foglio Excel per la rosa e il budget, un gruppo WhatsApp per le comunicazioni allo staff, una cartella Drive per i documenti, qualche PDF salvato sul telefono del segretario. Funziona, finché il club resta piccolo e con una sola squadra. Il problema emerge quando le squadre diventano due o tre, i ruoli si moltiplicano, e le stesse informazioni devono essere coerenti in più posti contemporaneamente.</P>

        <H2>Dove Excel e WhatsApp smettono di reggere</H2>
        <UL>
          <li>La distinta gara viene ricostruita a mano ogni settimana, incrociando rosa, squalifiche e certificati medici sparsi in file diversi</li>
          <li>Un Comunicato Ufficiale con una squalifica passa inosservato in mezzo a decine di altri messaggi nel gruppo WhatsApp dello staff</li>
          <li>Le quote associative si tracciano su un foglio che solo il segretario aggiorna, e nessun altro ruolo sa in tempo reale chi è in regola</li>
          <li>I rimborsi trasferte si fanno con bonifici singoli uno per uno, spesso con ricevute cartacee smarrite prima di fine mese</li>
          <li>Quando il segretario cambia o si assenta, chi lo sostituisce eredita file sparsi senza uno storico ordinato</li>
        </UL>

        <H2>Cosa cambia con un gestionale dedicato</H2>
        <P>Un gestionale pensato per società di calcio strutturate mette gli stessi dati — rosa, tesseramenti, comunicati, pagamenti — in un unico posto, con una dashboard diversa per ogni ruolo invece di un solo foglio condiviso da tutti. Il vantaggio non è solo estetico: significa che il presidente vede il quadro finanziario, il segretario vede le scadenze tesseramenti, il direttore sportivo vede il mercato, senza che nessuno debba rincorrere l'altro per un aggiornamento mancante. È il principio su cui sono costruite le 11 dashboard per ruolo di <a href="/clubis" style={{ color: "var(--c-green)" }}>ClubIS</a>: stessa base dati, vista diversa per ciascun ruolo del club.</P>

        <H2>Quando invece Excel basta ancora</H2>
        <P>Va detto con onestà: un club piccolissimo, con una sola squadra, pochi tesserati e nessun problema di coordinamento tra ruoli, può ragionevolmente continuare con un foglio Excel ben tenuto ancora per un po'. Il punto di svolta arriva quasi sempre con la seconda squadra, il primo settore giovanile, o il primo errore concreto — un giocatore squalificato schierato per una squalifica letta in ritardo — che costa più di un abbonamento mensile.</P>

        <H2>Come avviene la transizione, in pratica</H2>
        <P>Il timore più comune è dover fermare la stagione per migrare tutto in un colpo solo. In pratica non serve: si può iniziare caricando la rosa attuale e il prossimo turno di campionato, tenendo Excel come backup per le prime settimane, e spostare gradualmente comunicati, tesseramenti e pagamenti man mano che ogni funzione viene verificata con i dati reali del club — è anche il motivo per cui una prova gratuita reale, non una demo precompilata, conta più di ogni altra caratteristica in fase di scelta.</P>

        <H2>Domande frequenti</H2>
        <P><strong>Serve migrare tutti i dati storici per iniziare a usare un gestionale?</strong><br/>No. Basta caricare la rosa attuale e i dati del ciclo di gioco in corso; lo storico delle stagioni passate può restare in archivio senza bloccare l'adozione.</P>
        <P><strong>WhatsApp resta comunque utile per un club?</strong><br/>Sì, per la comunicazione informale e rapida allo staff. Il problema non è WhatsApp in sé, ma usarlo come unico posto dove finiscono anche le informazioni che richiedono un'azione tracciabile, come una squalifica o una scadenza di tesseramento.</P>
      </>
    ),
  },
  {
    slug: "rimborsi-trasferte-quote-sepa-societa-calcio",
    title: "Rimborsi trasferte e quote associative: come automatizzare i pagamenti SEPA in una società di calcio dilettantistica",
    description: "Come funzionano i rimborsi SEPA in batch e la rateizzazione delle quote associative in un gestionale per società di calcio, e perché sostituiscono i bonifici manuali uno per uno.",
    publishDate: "2026-07-29",
    readingMinutes: 6,
    body: (
      <>
        <P>In molte società di calcio dilettantistiche la parte finanziaria più dispersiva non è il budget in sé, ma la sua esecuzione materiale: bonifici singoli per ogni rimborso trasferta, quote associative incassate in contanti o su conti diversi, ricevute cartacee che si perdono prima della chiusura di stagione. Il tesoriere o il segretario che se ne occupa finisce per dedicare ore ogni mese a un lavoro meccanico e ripetitivo, con un margine di errore tutt'altro che trascurabile quando si parla di denaro.</P>

        <H2>Cosa sono i rimborsi SEPA in batch</H2>
        <P>Un bonifico SEPA (Single Euro Payments Area) è il meccanismo standard per i trasferimenti in euro tra conti europei. "In batch" significa che, invece di compilare un bonifico alla volta per ogni giocatore o membro dello staff da rimborsare, il sistema genera un unico file XML con tutti i pagamenti del mese, da caricare una sola volta nel portale della propria banca. Per un club con decine di tesserati, la differenza pratica è passare da decine di operazioni manuali a un solo caricamento verificato.</P>

        <H2>Quote associative: rateizzazione e sollecito</H2>
        <P>Sul fronte incassi, il problema speculare è tracciare chi ha pagato la quota associativa e chi è in ritardo, spesso su piani rateali diversi da famiglia a famiglia. Senza un sistema dedicato, questa informazione vive in un foglio aggiornato manualmente, con il rischio concreto di perdere traccia di una rata scaduta finché la famiglia stessa non lo segnala — o non lo segnala affatto.</P>

        <H2>Cosa serve per gestirlo senza un commercialista dedicato</H2>
        <UL>
          <li>Un'anagrafica unica dove ogni tesserato ha il proprio piano di pagamento (2-12 rate) e lo stato aggiornato automaticamente</li>
          <li>Pagamento online delle quote (carta, Stripe/PayPal) invece di contanti o bonifici sparsi, per avere una traccia automatica di ogni incasso</li>
          <li>Generazione automatica del file XML dei rimborsi da caricare in banca, senza ricopiare IBAN e importi a mano uno per uno</li>
          <li>Un quadro in tempo reale di quanto è stato incassato rispetto a quanto previsto — la stessa base dati usata per il monitoraggio del <a href="/risorse/financial-fair-play-calcio-dilettantistico" style={{ color: "var(--c-green)" }}>Financial Fair Play</a> del club</li>
        </UL>

        <H2>Come lo fa ClubIS</H2>
        <P>La dashboard Presidente e Segretario di <a href="/clubis" style={{ color: "var(--c-green)" }}>ClubIS</a> include quote iscrizione con piani rateali da 2 a 12 rate e pagamento online Stripe/PayPal, oltre alla generazione di rimborsi SEPA in batch con file XML pronto per la banca — così il tesoriere carica un solo file invece di ripetere lo stesso bonifico decine di volte a fine mese, e il presidente vede in ogni momento quante quote sono state effettivamente incassate rispetto al budget previsto.</P>

        <H2>Domande frequenti</H2>
        <P><strong>Serve un conto business dedicato per usare i rimborsi SEPA in batch?</strong><br/>No: il file XML generato è compatibile con il normale portale online della maggior parte delle banche italiane; serve solo che il conto supporti il caricamento di bonifici multipli da file, una funzione ormai comune anche sui conti base.</P>
        <P><strong>Cosa succede se una famiglia salta una rata della quota?</strong><br/>Con un sistema che traccia automaticamente lo stato di ogni piano rateale, il ritardo emerge subito nella dashboard del segretario invece che a fine stagione, permettendo un sollecito tempestivo invece che tardivo.</P>
      </>
    ),
  },
];
