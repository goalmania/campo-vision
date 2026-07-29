# Sequenza email di nurture — lead "Richiedi una demo" ClubIS

Il form "Richiedi una demo" (homepage `/#contatti`, `/clubis`, popup exit-intent) oggi invia solo una notifica via Web3Forms a `info@dmfootballservices.it`. Non esiste ancora un invio automatico al lead stesso: questa sequenza è pronta da caricare non appena scegli un servizio email (ESP).

## Come attivarla

1. **Scegli un ESP.** Consigliato **Brevo** (ex Sendinblue) — piano gratuito con automazioni incluse fino a 300 email/giorno, contatti illimitati, in italiano, adatto a un funnel B2B piccolo come questo. Alternative valide: Mailchimp (automazioni solo da piano a pagamento), MailerLite.
2. **Crea una lista** "Richieste demo ClubIS" e un'**automazione** con trigger "contatto aggiunto alla lista".
3. **Collega il form del sito alla lista.** Il modo più semplice: nel form Web3Forms aggiungi come seconda destinazione l'indirizzo di "aggiungi contatto via email" del tuo ESP (Brevo e Mailchimp supportano l'aggiunta contatto via inoltro email a un indirizzo dedicato), oppure — meglio — quando sei pronto, dimmi quale ESP hai scelto: aggiorno `src/lib/leadForm.ts` per inviare il lead sia a Web3Forms sia direttamente all'API del tuo ESP in un'unica submission.
4. Carica le 4 email sotto nell'automazione, con questi ritardi rispetto al momento dell'iscrizione (= invio del form).

Prima di attivarla, sostituisci ogni placeholder tra `[...]` con un dato reale: non inviare mai un numero, un nome cliente o una percentuale inventati.

---

## Email 1 — Subito (T+0)

**Oggetto:** Abbiamo ricevuto la tua richiesta — ti rispondiamo entro 24 ore

Ciao [Nome],

grazie per aver richiesto una demo di ClubIS per [Società].

Ti contattiamo entro 24 ore lavorative per fissare una chiamata di 20 minuti: ti mostriamo la piattaforma sui casi concreti della tua società (numero di squadre, settore giovanile, come gestite oggi Comunicati Ufficiali e rimborsi).

Se preferisci saltare l'attesa, scrivici subito su WhatsApp: rispondiamo di persona.

[Bottone: Scrivici su WhatsApp → https://wa.me/393334218596]

A presto,
Il team di DM Football Services

---

## Email 2 — Dopo 1 giorno (T+1)

**Oggetto:** Il problema che ClubIS risolve per primo

Ciao [Nome],

mentre aspettiamo di sentirci, ti racconto la funzione che la maggior parte delle società apprezza per prima: l'**analisi automatica dei Comunicati Ufficiali FIGC/LND**. ClubIS legge il C.U. e applica in automatico le squalifiche alla rosa — un lavoro che oggi molte segreterie fanno a mano, comunicato per comunicato.

[Caso reale: aggiungere qui una citazione o un dato di [Società cliente], quando disponibile — es. "quante ore alla settimana ha tolto alla segreteria".]

Se vuoi vedere questa funzione dal vivo sulla tua società, rispondi a questa email o scrivici su WhatsApp.

[Bottone: Scrivici su WhatsApp]

---

## Email 3 — Dopo 3 giorni (T+3)

**Oggetto:** "Cambiare gestionale è complicato?" — la domanda che ci fate sempre

Ciao [Nome],

capisco il dubbio: passare da fogli Excel, chat e PDF sparsi a un'unica piattaforma sembra un progetto lungo.

In pratica, l'onboarding di ClubIS è: importazione anagrafica giocatori via CSV, invito dello staff via link, e la società è operativa. [Aggiungere qui il tempo medio reale di onboarding, quando disponibile un dato verificabile.]

Il periodo di prova è di 7 giorni, senza carta di credito: puoi verificare tu stesso quanto tempo serve prima di decidere.

[Bottone: Prova ClubIS — 7 giorni gratis → https://clubis.it/registrati?piano=pro]
[Link: Preferisci parlarne prima? Richiedi una demo]

---

## Email 4 — Dopo 6 giorni (T+6)

**Oggetto:** Ultima email di questa serie — restiamo a disposizione

Ciao [Nome],

questa è l'ultima email automatica di questa serie: non vogliamo riempirti la casella di posta.

Se il momento non è giusto, nessun problema — la nostra email e il numero WhatsApp restano gli stessi quando vorrai riprendere in mano il discorso.

Se invece vuoi solo qualche informazione in più prima di decidere (prezzi, migrazione dati, un piano dedicato al settore giovanile), rispondi pure a questa email: ti risponde una persona, non un bot.

[Bottone: Scrivici su WhatsApp]
[Bottone: Vedi i piani e i prezzi → https://dmfootballservices.it/clubis#prezzi]

---

## Note

- Nessuna email sopra usa numeri, percentuali o nomi di clienti inventati: i placeholder `[...]` vanno riempiti solo con dati verificabili che hai davvero (es. le prime testimonianze reali già raccomandate in `audit/ACTION-PLAN.md` punto 8). Un'affermazione falsa in un'email commerciale è un rischio legale (pratiche commerciali scorrette) oltre che di fiducia.
- Se un lead risponde manualmente in qualsiasi punto della sequenza, l'automazione va fermata (quasi tutti gli ESP hanno un'opzione "esci dall'automazione se il contatto risponde" o "se apre un ticket").
- Una volta scelto l'ESP, posso anche collegare il form del sito via API così i lead finiscono nella lista in tempo reale invece che via inoltro email.
