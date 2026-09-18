# Patente in 7 Giorni — Web App

Web app Next.js + React + Tailwind CSS per il metodo "Patente in 7 Giorni", con tre piani reali (Starter/Premium/Pro), pagamento Stripe, dashboard con gamification e progresso salvato in `localStorage`. Pensata per il deploy su **Vercel**.

> **Masterplan 2.0 — Fase 1 completata:** i tre piani sono ora davvero diversi (non solo nel testo): accesso, quiz, flashcard e funzioni sbloccate dipendono dal piano acquistato, verificato lato server. Dettagli nella sezione **"Piani e sicurezza"** qui sotto. Changelog della Fase 4 precedente in [`CHANGELOG.md`](./CHANGELOG.md) (si riferisce ancora a Netlify: superato dalla migrazione a Vercel descritta qui).

---

## 1. Installazione

Requisiti: Node.js 20 o superiore.

```bash
npm install
```

## 2. Avvio in locale

```bash
npm run dev
```

L'app, incluse le API (`/api/...`), sarà disponibile su `http://localhost:3000`. Copia `.env.example` in `.env.local` e inserisci le tue chiavi di **test** prima di avviare (vedi sezione 5).

## 3. Build di produzione

```bash
npm run build
```

## 4. Deploy su Vercel

1. Importa il repository su [vercel.com/new](https://vercel.com/new): Vercel riconosce Next.js automaticamente, zero configurazione.
2. In *Project Settings → Environment Variables*, aggiungi `STRIPE_SECRET_KEY` e `ACCESS_TOKEN_SECRET` (vedi sezione 5).
3. Deploy. Le route in `app/api/` diventano funzioni serverless automaticamente.

## 5. Piani e sicurezza

Il progetto ha **tre piani realmente diversi**, non solo nel prezzo:

| | Starter (19€) | Premium (29€) | Pro (39€) |
|---|---|---|---|
| Quiz per livello | primi 3 | tutti quelli pubblicati | tutti |
| Flashcard per livello | prime 2 | tutte quelle pubblicate | tutte |
| Simulazione finale | ✗ | ✓ | ✓ |
| Tutor AI, mini-video, ripasso AI, heatmap, modalità esame | ✗ (bloccati, CTA di upgrade) | interfaccia pronta, "in arrivo" | interfaccia pronta, "in arrivo" |
| Modalità Errori Gravi | ✗ | ✗ | interfaccia pronta, "in arrivo" |

**Perché "in arrivo" e non i numeri finali (2500 quiz, 150 video...):** i numeri del Masterplan sono il traguardo verso cui il progetto cresce, non qualcosa da inventare in un colpo solo per non perdere qualità. L'architettura è già pronta a scalare: vedi `lib/tiers.ts` — Premium e Pro vedono **sempre l'intera banca disponibile in quel momento** (nessun tetto), quindi aggiungere contenuti a `lib/server/livelli-content.ts` in futuro aumenta automaticamente cosa vedono, senza toccare altro codice. Starter invece ha un tetto fisso per livello, che resta tale indipendentemente da quanto cresce la banca.

### Come funziona la verifica

1. Dopo il pagamento, Stripe riporta l'utente su `/successo?session_id=...`.
2. `/api/verify-purchase` controlla con l'API di Stripe che la sessione risulti pagata, **ricava il piano dal prezzo acquistato** e rilascia un token firmato (30 giorni, rinnovato automaticamente).
3. Ogni pagina della dashboard verifica il token prima di mostrare qualunque cosa; se manca, reindirizza alla home.
4. Il contenuto reale di ogni livello (lezione, quiz, flashcard) non è nei file statici del sito: `/api/get-livello-content` lo consegna solo dopo aver verificato token e piano, già filtrato ai limiti di quel piano.

### Configurazione necessaria

1. **Su Vercel** (*Project Settings → Environment Variables*):
   - `STRIPE_SECRET_KEY` — chiave **segreta** di Stripe (`sk_live_...` / `sk_test_...`). Mai quella pubblicabile.
   - `ACCESS_TOKEN_SECRET` — stringa lunga e casuale, generata una volta (`openssl rand -hex 32`). Cambiarla invalida tutti gli accessi già emessi.
2. **Su Stripe**, per ciascuno dei 3 Payment Link:
   - *"After payment" → "Redirect customers to a website"* → imposta `https://tuosito.it/successo?session_id={CHECKOUT_SESSION_ID}`.
   - Apri `lib/server/tier-map.ts` e sostituisci i tre `price_..._DA_SOSTITUIRE` con i **Price ID** reali (Stripe Dashboard → Product catalog → apri il prodotto → copia il Price ID, non il Payment Link).
3. Aggiorna i tre link in `components/marketing/PricingCard.tsx` (`STRIPE_PAYMENT_LINKS`) con gli URL reali dei Payment Link.

### Cosa protegge davvero, e cosa no

- Blocca l'accesso casuale e la lettura del contenuto senza aver pagato: non aggirabile scrivendo un flag in `localStorage`, perché la firma richiede un segreto che esiste solo sul server.
- **Limite intrinseco di ogni sito che gira nel browser:** chi ha un token valido (cioè ha pagato quel piano) potrebbe salvare e ridistribuire ciò che legge nella propria dashboard. Nessuna protezione lato client lo impedisce del tutto — vale per qualunque prodotto digitale.
- Un rimborso Stripe libera l'accesso entro 30 giorni al massimo (quando il token scade e viene ri-verificato), non all'istante.
- Non c'è recupero dell'accesso da un nuovo dispositivo senza il link di conferma originale (nessun sistema di login/email) — estendibile in futuro con una pagina "Ho già acquistato".

## 6. Dove modificare i prezzi e i piani

- Prezzi e testo delle card: `components/marketing/PricingCard.tsx` (`TIER_INFO` in `lib/tiers.ts` per il prezzo vero e proprio).
- Limiti quiz/flashcard per piano, quali funzioni sono incluse da quale piano: tutto in **un unico file**, `lib/tiers.ts`. Non serve toccare componenti o API per cambiare un limite.
- Tabella di confronto dettagliata: `components/marketing/ComparisonTable.tsx`.

## 7. Dove aggiungere contenuti (lezioni, segnali, quiz, flashcard)

Il contenuto reale vive in `lib/server/livelli-content.ts` (SOLO server, mai importato da `app/` pubblico o da componenti client). Ogni livello è un oggetto con questa struttura (Fase 3 — percorso completo):

```ts
{
  id: 'segnali',
  numero: 1,
  titolo: 'Segnali di Pericolo',
  icona: 'segnali',
  testoMotivazionale: '...',      // schermata di introduzione
  tempoStimatoMinuti: 12,
  xpOttenibili: 290,               // indicativo: somma delle ricompense di ogni tappa
  badge: 'Occhio di Falco',
  bossNome: 'Il Guardiano dei Segnali',
  bossDescrizione: '...',
  blocchiLezione: [                // lezione a blocchi, non un muro di testo
    { titolo: '...', testo: '...', icona: 'regola', esempio: '...', riepilogo: '...' },
  ],
  segnali: [                       // galleria segnali interattiva
    { id: '...', nome: '...', categoria: 'pericolo', simbolo: 'CURVA', spiegazione: '...', esempio: '...' },
  ],
  truccoMnemonico: '...',
  erroriFrequenti: ['...', '...'],
  flashcard: [{ fronte: '...', retro: '...' }],
  quiz: [{ domanda: '...', risposte: ['...','...','...'], corretta: 0, spiegazione: '...', erroreComune: '...' }],
}
```

`icona` di un blocco lezione è una delle 4 stringhe `'regola' | 'esempio' | 'attenzione' | 'pratica'` (mappate a un'icona in `LessonSection.tsx`). `categoria` di un segnale è una delle 4 famiglie `'pericolo' | 'divieto' | 'obbligo' | 'indicazione'`, che determina forma e colore in `SignalShape.tsx` — è una classificazione semplificata a scopo didattico, non la riproduzione grafica del segnale reale (non abbiamo un generatore di immagini in questa pipeline).

Aggiungere domande/flashcard a un livello le rende automaticamente disponibili a Premium e Pro (nessun tetto); Starter resta al suo limite fisso. Se cambi il numero di domande di un livello, aggiorna anche `quizCount` in `lib/livelli-data.ts` (metadati pubblici, usati per le progress bar). Se aggiungi/rimuovi un livello, aggiorna in coppia anche l'id in `lib/tiers.ts` (`LIVELLI_MEMORY_STARTER`) e in `app/api/get-livello-content/route.ts` (id del livello escluso da Starter, oggi `'esame'`).

Il livello demo gratuito (`/demo`) è indipendente e vive per intero, pubblicamente, in `lib/demo-livello.ts`, con la stessa struttura ricca (senza Memory/Speed/Boss dedicati, riservati alla dashboard).

## 8. Tutor AI e Mini-video: architettura pronta, non ancora collegati

Entrambi hanno un'**interfaccia completa e funzionante** in `/dashboard/tutor` e `/dashboard/video`, sbloccata da Premium in su — ma senza un motore reale dietro, per non promettere ciò che non esiste ancora.

- **Tutor AI** (`app/api/tutor-ai/route.ts`): il controllo di accesso (token + piano) è reale; la chiamata al modello è uno stub che risponde "non ancora collegato". Per attivarlo con l'API di Claude, le istruzioni esatte sono commentate in cima al file.
- **Mini-video** (`components/dashboard/VideoPlayer.tsx`): un placeholder con miniatura e pulsante play, pronto per essere sostituito da un player reale (basta cambiare questo componente) quando i video saranno girati.

## 9. Dove sostituire il PDF

Il file `public/assets/patente-in-7-giorni-anteprima.pdf` è un placeholder (copertina, indice, esempio di impaginazione) — sostituiscilo con il PDF definitivo mantenendo lo stesso nome, o aggiorna i riferimenti se cambi nome.

## 10. Il percorso completo del livello (Masterplan 2.0 — Fase 3)

Ogni livello (`/dashboard/livello/[id]`, orchestrato da `LivelloClient.tsx`) segue sempre questa sequenza fissa: **Introduzione → Lezione → Segnali → Flashcard → Memory dedicato → Speed Challenge dedicata → Quiz spiegati → Boss Fight → Ricompensa finale**.

- **Checkpoint** (`lib/checkpoints.ts`): ad ogni passaggio tra una tappa e l'altra viene salvato un checkpoint locale. Se l'utente esce a metà, la schermata di introduzione mostra "Continua da [tappa]" invece di "Inizia livello". La dashboard mostra lo stesso checkpoint nel banner `ContinueJourney`.
- **Memory e Speed Challenge dedicati**: usano gli stessi componenti di gioco della versione standalone (`/dashboard/games/...`), ma tramite le varianti "play" senza chrome di pagina (`MemoryGamePlay.tsx`, `SpeedChallengePlay.tsx`) con i dati del solo livello corrente, già disponibili da `useLivelloProtetto`, senza una seconda chiamata di rete.
- **Boss Fight dedicata**: `BossFightPlay.tsx`, stessa regola della versione standalone (`/dashboard/livello/[id]/boss`, ancora raggiungibile direttamente): massimo un errore. Le due versioni condividono la stessa logica ma sono file separati per non rischiare di rompere quella già esistente.
- **Stelle** (`lib/stars.ts`): calcolate da precisione del quiz e tempo impiegato rispetto a `tempoStimatoMinuti`; salvate nel progresso del livello (`stelle` in `lib/xp.ts`) e mostrate nella mappa e nella schermata finale.
- **XP per tappa**: Lezione +50, Flashcard +20, Memory +20, Speed +20, Quiz +40 (oltre ai +10 per ogni risposta corretta, invariati), Boss +100 — assegnati con `aggiungiXPBonus` in `lib/xp.ts`. Il valore `xpOttenibili` di ogni livello in `lib/server/livelli-content.ts` è la somma di queste tappe: se cambi le ricompense, ricalcola anche quel numero per coerenza con la schermata di introduzione.


## 11. Mini-giochi e gamification (Masterplan 2.0 — Fase 2)

**Memory Game** (`/dashboard/games/memory`) — abbina fronte/retro delle flashcard, 3 difficoltà (6/8/12 coppie, ridotte in automatico se un livello ha meno coppie disponibili). Starter gioca solo le categorie in `LIVELLI_MEMORY_STARTER` (`lib/tiers.ts`), Premium/Pro tutte. Contenuto servito da `/api/get-memory-content`, mai esposto staticamente.

**Speed Challenge** (`/dashboard/games/speed`) — 60 secondi, fino a 20 domande pescate da tutti i livelli, combo e XP (+10 per risposta corretta). Il pool rispetta lo stesso limite quiz-per-livello del piano (`LIMITI_CONTENUTO`), quindi cresce da solo insieme alla banca quiz. Domande servite da `/api/get-speed-questions`.

**Boss Fight** (`/dashboard/livello/[id]/boss`) — 10 domande pescate (e ripetute se necessario) dal pool del livello, massimo 1 errore per vincere, +100 XP e badge alla vittoria. Riusa la stessa protezione di `/dashboard/livello/[id]` (incluso il blocco della Simulazione Finale per Starter).

**Missioni giornaliere** (`lib/missions.ts`) — 3 missioni al giorno, scelte in modo deterministico (stesso giorno = stesse missioni) e leggermente orientate dal Calendario Esame (più vicino l'esame, più missioni di pratica). Il progresso si aggiorna dai punti di interazione reali (risposta corretta, flashcard girata, lezione aperta, partita completata) — non è simulato. Il premio XP va riscattato con un tap (`segnaPremioRiscattato`), per restare nel normale flusso React senza stati disallineati tra componenti.

**Sfida del giorno** (`DailyChallengeBanner.tsx`) — la prima delle 3 missioni, con ricompensa raddoppiata.

**Calendario Esame** (`lib/examCalendar.ts`) — l'utente sceglie 3/7/14/30 giorni all'esame; il countdown e l'urgenza (usata dalle missioni) si aggiornano da soli.

**Suoni** (`lib/sounds.ts`) — toni brevi generati al volo con la Web Audio API per corretto/errore/badge/vittoria: nessun file audio da produrre, toggle persistente in ogni schermata di gioco. Sostituibili in futuro con effetti sonori veri senza cambiare l'API (`play('corretto')` ecc.).

**Mappa dei livelli** (`LevelMap.tsx`) — sostituisce la lista piatta con un sentiero verticale a zig-zag; stessa logica di sblocco (progressione + piano) di prima.

**Nuovi badge** — 7 aggiunti in `lib/achievements.ts`: Primo Memory, Primo Speed, Combo Master (combo ≥10 in Speed), Zero Errori (Boss Fight perfetta), 7 Giorni (streak), Re dei Segnali (100% sul livello Segnali), Boss Killer.

## 12. Nota sulla verifica TypeScript in questo ambiente

Questo repository è stato scritto e controllato in un sandbox **senza `node_modules` installato** (nessun accesso di rete): il controllo sintattico è pulito su tutti i file, ma una build reale (`npm install && npm run build`) potrebbe emergere errori di tipo legati a pacchetti che qui non erano risolvibili (`react`, `next`, `stripe`...). È normale e atteso: esegui `npm run build` una volta in locale prima del deploy, come da checklist.

---

## Struttura del progetto

```
patente-in-7-giorni/
  app/
    layout.tsx
    globals.css
    api/
      verify-purchase/route.ts       # verifica Stripe + rilascio token con piano
      get-livello-content/route.ts   # contenuto protetto di un livello, filtrato per piano
      get-memory-content/route.ts    # coppie flashcard per il Memory Game, filtrate per piano
      get-speed-questions/route.ts   # pool domande per la Speed Challenge, filtrato per piano
      tutor-ai/route.ts              # stub Tutor AI, pronto per Claude
    (marketing)/
      layout.tsx
      page.tsx                # Homepage — "/"
      demo/page.tsx            # Demo gratuita — "/demo"
      prodotto/page.tsx        # Pagina prodotto — "/prodotto"
      successo/page.tsx        # Conferma acquisto — "/successo"
    dashboard/
      layout.tsx
      page.tsx                       # Dashboard — "/dashboard"
      livello/[id]/page.tsx          # Missione — "/dashboard/livello/segnali" ecc.
      livello/[id]/boss/page.tsx     # Boss Fight — "/dashboard/livello/segnali/boss" ecc.
      tutor/page.tsx                 # Tutor AI — "/dashboard/tutor"
      video/page.tsx                 # Mini-video — "/dashboard/video"
      games/memory/page.tsx          # Memory Game — "/dashboard/games/memory"
      games/speed/page.tsx           # Speed Challenge — "/dashboard/games/speed"
  components/
    ui/            # Button, Card, Badge, ProgressBar, Input, Alert, Modal
    layout/        # Logo, Header, Footer, AppHeader
    marketing/     # Hero, LaunchBanner, TrustBar, StatsStrip, FeatureCards, WhyItWorks, FAQ,
                   # Timeline, PricingCard, ComparisonTable, SocialProof, FreeLevelBand, FinalCTA,
                   # StickyCTA, DayTracker, SuccessoClient
    mockups/       # PhoneMockup, BrowserMockup, DashboardMockup, PDFMockup, FlashcardMockup
    dashboard/     # LevelMap, LevelCard (non più usata, lasciata come riferimento), DashboardClient,
                   # LivelloClient, StatsGrid, BadgeShelf, StreakIndicator, XPGainToast, FeatureCard,
                   # FeatureGrid, MissioneDelGiorno, ProgressRing, AnimatedNumber, UpgradeModal,
                   # DailyMissions, DailyChallengeBanner, PersonalRecords, ExamCalendarCard,
                   # ContinueJourney, LevelIntro, LevelSummary, StarsRating,
                   # TutorAIClient, VideoLibraryClient, VideoPlayer
    lesson/        # MnemonicTrick, CommonMistakes, FlashcardDeck, QuizRunner, LessonSection
      signals/     # SignalShape, SignalCard, SignalGallery
    demo/          # DemoExperience
    games/
      memory/      # MemoryGameClient (standalone), MemoryGamePlay (embedded nel livello), MemoryCard
      speed/       # SpeedChallengeClient (standalone), SpeedChallengePlay (embedded nel livello)
      boss/        # BossFightClient (standalone), BossFightPlay (embedded nel livello)
      shared/      # Confetti
  lib/
    livelli-data.ts   # metadati PUBBLICI dei 7 livelli (id, titolo, icona, quizCount)
    livelli-content-shared.ts  # tipi pubblici condivisi (blocchi lezione, segnali) — nessun contenuto
    demo-livello.ts   # contenuto completo e pubblico del livello demo gratuito
    tiers.ts          # piani, limiti per piano (quiz/flashcard/memory), elenco funzioni
    access.ts         # verifica acquisto, token, fetch del contenuto protetto (livelli/memory/speed)
    xp.ts             # sistema XP/progresso su localStorage (incl. aggiungiXPBonus, stelle)
    stars.ts          # calcolo stelle (1-3) da precisione e tempo
    checkpoints.ts    # checkpoint per livello + "riprendi da dove eri rimasto"
    streak.ts         # streak giornaliero su localStorage
    achievements.ts   # definizione badge sbloccabili (13, di cui 7 legati ai giochi)
    missions.ts       # missioni giornaliere + tracciamento progresso
    examCalendar.ts   # calendario esame (3/7/14/30 giorni) e urgenza
    gameRecords.ts    # record personali (Speed, Memory, Boss Fight)
    lastPlayed.ts     # ultimo livello aperto
    sounds.ts         # suoni placeholder (Web Audio API) con toggle
    utils.ts
    server/                    # SOLO import da app/api/*, mai dal client
      token.ts                 # firma/verifica HMAC del token (con piano)
      tier-map.ts               # Stripe Price ID → piano
      livelli-content.ts       # contenuto REALE e protetto dei 7 livelli (percorso completo)
  public/
    favicon.svg
    og-image.png
    assets/patente-in-7-giorni-anteprima.pdf
  package.json
  .env.example
```

## Sistema XP

Interamente client-side, salvato in `localStorage`, gestito da `useProgresso()` in `lib/xp.ts`: risposta corretta al quiz → **+10 XP**, livello completato → **+50 XP**, sblocca automaticamente il successivo. Nessun dato lascia il dispositivo dello studente: il progresso non è tracciato server-side (solo l'accesso/piano lo è).

## Animazioni

Framer Motion per transizioni tra step, flip delle flashcard, feedback del quiz, badge di completamento, comparsa dei badge sbloccati; Tailwind per hover/press. Rispetta `prefers-reduced-motion`.

## SEO

Ogni pagina imposta i propri meta tag tramite l'API `Metadata` di Next.js. Le pagine private (`/dashboard`, `/dashboard/tutor`, `/dashboard/video`, `/successo`) sono escluse dall'indicizzazione.

## Performance

- Font (Space Grotesk, Inter) self-hosted via `next/font`: nessuna richiesta esterna a Google Fonts a runtime.
- Mockup in CSS/SVG, non screenshot: zero richieste di rete aggiuntive.
- `QuizRunner` caricato con `next/dynamic` solo quando serve (missione e demo).
- Le pagine pubbliche (homepage, prodotto, demo) restano leggere; solo le pagine della dashboard fanno chiamate a `/api/...` per verificare accesso e piano.

## Contenuti attuali

I testi in `lib/server/livelli-content.ts` sono contenuti **di esempio**, corretti nella sostanza ma pensati per validare struttura e funzionamento (formato, XP, piani). Vanno rivisti/ampliati da chi cura i contenuti prima della pubblicazione definitiva — vedi sezione 7 per come farlo senza toccare il codice.
