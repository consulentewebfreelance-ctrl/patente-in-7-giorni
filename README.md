# Patente in 7 Giorni — Web App

Web app statica (Next.js + React + Tailwind CSS) per il metodo "Patente in 7 Giorni". Nessun backend: pagamento tramite Stripe Payment Link, progresso salvato in `localStorage` sul dispositivo dello studente. Pronta per il deploy su Netlify.

> **Fase 4 completata:** dashboard con statistiche/badge/streak, quiz con feedback animato, hero ad alta conversione, miglioramenti di accessibilità e performance. Elenco file, motivazioni e codice completo di ogni modifica sono in [`CHANGELOG.md`](./CHANGELOG.md).

Identità visiva e design ereditati integralmente dalle Fasi 1 e 2 del progetto: palette, font, design system e le 7 schermate sono già implementati secondo le specifiche approvate.

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

L'app sarà disponibile su `http://localhost:3000`.

## 3. Build di produzione

```bash
npm run build
```

Il progetto è configurato con `output: 'export'` (vedi `next.config.js`): la build genera un sito interamente statico nella cartella `out/`, senza bisogno di alcun server Node in produzione.

## 4. Deploy su Netlify

Due strade equivalenti:

**A. Collegando il repository Git a Netlify**
1. Importa il repository su Netlify ("Add new site" → "Import an existing project").
2. Build command: `npm run build` — Publish directory: `out` (già preconfigurato in `netlify.toml`, non serve reinserirlo a mano).
3. Deploy.

**B. Deploy manuale (drag & drop)**
1. `npm run build`
2. Trascina la cartella `out/` generata su [app.netlify.com/drop](https://app.netlify.com/drop).

Non è necessario alcun plugin Netlify per Next.js: essendo un sito 100% statico, Netlify serve direttamente i file generati.

## 5. Dove inserire Stripe

Il progetto usa **Stripe Payment Link** (nessuna chiave segreta nel codice, nessun backend necessario):

1. Crea i tuoi Payment Link su [dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links), uno per ciascun pacchetto (Base, Premium, Pro).
2. Nel Payment Link, imposta come **pagina di conferma personalizzata** l'URL del tuo sito seguito da `/successo/` (es. `https://tuosito.it/successo/`) — corrisponde alla Schermata 7 "Conferma acquisto" già pronta.
3. Apri `components/marketing/PricingCard.tsx` e sostituisci i tre placeholder in cima al file:

```ts
export const STRIPE_PAYMENT_LINKS: Record<string, string> = {
  base: 'https://buy.stripe.com/STRIPE_PAYMENT_LINK_BASE',
  premium: 'https://buy.stripe.com/STRIPE_PAYMENT_LINK_PREMIUM',
  pro: 'https://buy.stripe.com/STRIPE_PAYMENT_LINK_PRO',
};
```

con i tuoi link reali.

✅ L'accesso alla dashboard è ora verificato davvero (non più solo un rimando diretto): vedi sezione **"8. Sicurezza dashboard"** qui sotto per la configurazione necessaria — senza quella configurazione, nessuno (nemmeno chi ha pagato) riesce ad entrare.

## 6. Dove modificare i prezzi

Stesso file, `components/marketing/PricingCard.tsx`: l'array `pacchetti` contiene nome, prezzo, descrizione e voci incluse di ciascun pacchetto (Base 19€, Premium 29€, Pro 39€). Modifica i valori `prezzo` e `incluso` liberamente: il layout si adatta automaticamente.

## 7. Dove sostituire il PDF

- Il file `public/assets/patente-in-7-giorni-anteprima.pdf` è un placeholder realistico (copertina, indice, esempio di impaginazione di una lezione) — sostituiscilo con il PDF definitivo mantenendo lo stesso nome file, oppure aggiorna i riferimenti se cambi nome.
- Il **contenuto testuale reale** (lezioni, trucchi mnemonici, errori frequenti, flashcard, domande quiz) **non è più in `lib/`**: da questa versione vive in `netlify/functions/_data/livelli-content.ts`, servito solo dopo verifica dell'acquisto (vedi punto 8). `lib/livelli-data.ts` contiene solo i metadati pubblici (id, titolo, icona, numero di domande) usati per liste e progress bar. Ogni livello protetto è un oggetto con questa struttura:

```ts
{
  id: 'segnali',
  numero: 1,
  titolo: 'Segnali',
  icona: 'segnali',
  lezione: '...',
  truccoMnemonico: '...',
  erroriFrequenti: ['...', '...'],
  flashcard: [{ fronte: '...', retro: '...' }],
  quiz: [{ domanda: '...', risposte: ['...','...','...'], corretta: 0, spiegazione: '...', erroreComune: '...' }],
}
```

Se aggiungi o modifichi un livello, aggiorna **entrambi** i file in coppia: i metadati in `lib/livelli-data.ts` (incluso `quizCount`) e il contenuto in `netlify/functions/_data/livelli-content.ts`. Il livello demo gratuito (`/demo`) è indipendente e vive per intero, pubblicamente, in `lib/demo-livello.ts`.

## 8. Sicurezza dashboard

L'accesso a `/dashboard` e a ogni missione (`/dashboard/livello/...`) richiede un acquisto verificato con Stripe. Due funzioni serverless Netlify (`netlify/functions/`) si occupano della verifica; non serve un database né un sistema di login.

**Come funziona, in breve**

1. Dopo il pagamento, Stripe riporta l'utente su `/successo?session_id=...`.
2. La pagina chiama `verify-purchase`, che controlla con l'API di Stripe che quella sessione risulti pagata, e — solo in quel caso — rilascia un **token firmato** (valido 30 giorni, rinnovato automaticamente in background).
3. Il token viene salvato in `localStorage`. Ogni pagina della dashboard lo controlla prima di mostrare qualunque cosa; se manca o non è valido, reindirizza subito alla home.
4. Il contenuto vero e proprio di ogni missione (lezione, quiz, flashcard...) **non è incluso nei file statici del sito**: la pagina lo richiede a `get-livello-content` solo dopo aver verificato il token. Prima di quel momento, quel contenuto semplicemente non esiste da nessuna parte nel sito pubblicato.

**Configurazione necessaria (senza questa, la dashboard non si apre per nessuno)**

1. Su Netlify: *Site settings → Environment variables*, aggiungi:
   - `STRIPE_SECRET_KEY` — la chiave **segreta** di Stripe (`sk_live_...` in produzione, `sk_test_...` per testare). Mai la chiave pubblicabile (`pk_...`), mai nel codice.
   - `ACCESS_TOKEN_SECRET` — una stringa lunga e casuale, generata una sola volta (es. `openssl rand -hex 32`). Cambiarla in futuro invalida tutti gli accessi già emessi.
2. Su Stripe: per ciascuno dei 3 Payment Link (Base/Premium/Pro), in *"After payment" → "Redirect customers to a website"*, imposta come URL di conferma:
   ```
   https://tuosito.it/successo?session_id={CHECKOUT_SESSION_ID}
   ```
   Il segnaposto `{CHECKOUT_SESSION_ID}` è sostituito automaticamente da Stripe con l'id reale della sessione.

**Sviluppo e test in locale**

Le funzioni serverless non girano con `next dev`: servono la Netlify CLI e `netlify dev`.

```bash
npm install -g netlify-cli   # una sola volta
netlify dev
```

Copia `.env.example` in `.env` e inserisci i tuoi valori di **test** (`sk_test_...` + un `ACCESS_TOKEN_SECRET` qualsiasi per lo sviluppo). Con le chiavi di test puoi creare Payment Link e pagamenti finti direttamente dalla dashboard Stripe in modalità test, senza muovere soldi veri.

**Cosa protegge davvero, e cosa no**

- Blocca efficacemente l'accesso casuale: navigare su `/dashboard` senza aver pagato reindirizza sempre alla home, e il contenuto delle missioni non è scaricabile finché il token non è verificato. Non è aggirabile scrivendo un flag a mano in `localStorage`, perché la firma richiede un segreto che esiste solo sul server.
- **Limite intrinseco di ogni sito che gira nel browser:** chi ha già ottenuto un token valido (cioè chi ha pagato) potrebbe, con un minimo di competenza tecnica, salvare le risposte lette dalla propria dashboard e ridistribuirle. Nessuna protezione lato client può impedirlo del tutto: succede con qualunque prodotto digitale scaricabile. Quello che questa implementazione garantisce è che nessuno *arrivi* al contenuto senza aver pagato — non che il contenuto, una volta consegnato a un cliente, resti per sempre indistribuibile.
- Un rimborso su Stripe non revoca l'accesso all'istante: verrà rilevato entro 30 giorni al massimo (quando il token scade e viene ri-verificato), non subito. Se ti serve la revoca immediata, si può aggiungere in un secondo momento controllando lo stato della sessione ad ogni caricamento invece che ogni 30 giorni — a scapito di qualche chiamata in più verso Stripe.
- Non c'è modo di recuperare l'accesso da un nuovo dispositivo o dopo aver cancellato i dati del browser (nessun sistema di login/email). Se ti serve, si può aggiungere una pagina "Ho già acquistato" che cerca il pagamento per email — non inclusa qui per restare nel perimetro richiesto.

---

## Struttura del progetto

```
patente-in-7-giorni/
  app/
    layout.tsx              # layout radice: font, meta tag SEO globali
    globals.css
    (marketing)/             # route group: Header + Footer marketing
      layout.tsx
      page.tsx                # Homepage — "/"
      demo/page.tsx            # Demo gratuita — "/demo"
      prodotto/page.tsx        # Pagina prodotto — "/prodotto"
      successo/page.tsx        # Conferma acquisto — "/successo"
    dashboard/                # area riservata, header applicativo (XP/progresso)
      layout.tsx
      page.tsx                 # Dashboard — "/dashboard"
      livello/[id]/page.tsx    # Missione — "/dashboard/livello/segnali" ecc.
  components/
    ui/            # Button, Card, Badge, ProgressBar, Input, Alert, Modal
    layout/        # Logo, Header, Footer, AppHeader
    marketing/     # Hero, LaunchBanner, TrustBar, StatsStrip, FeatureCards, WhyItWorks, FAQ,
                   # Timeline, Pricing, FreeLevelBand, FinalCTA, StickyCTA, DayTracker, SuccessoClient
    mockups/       # PhoneMockup, BrowserMockup, DashboardMockup, PDFMockup, FlashcardMockup
    dashboard/     # LevelCard, DashboardClient, LivelloClient,
                   # StatsGrid, BadgeShelf, StreakIndicator, XPGainToast
    lesson/        # MnemonicTrick, CommonMistakes, FlashcardDeck, QuizRunner
    demo/          # DemoExperience
  lib/
    livelli-data.ts   # SOLO metadati pubblici dei 7 livelli (id, titolo, icona, quizCount)
    demo-livello.ts   # contenuto completo e pubblico del livello demo gratuito
    access.ts         # verifica acquisto, token, fetch del contenuto protetto (Fase 6)
    xp.ts             # sistema XP/progresso su localStorage
    streak.ts         # streak giornaliero su localStorage (Fase 4)
    achievements.ts   # definizione badge sbloccabili (Fase 4)
    utils.ts
  netlify/functions/
    verify-purchase.ts       # verifica il pagamento con Stripe, rilascia il token
    get-livello-content.ts   # serve il contenuto di un livello se il token è valido
    _shared/token.ts         # firma/verifica HMAC del token
    _data/livelli-content.ts # contenuto REALE e protetto dei 7 livelli (mai nel bundle del sito)
  public/
    favicon.svg
    og-image.png
    assets/patente-in-7-giorni-anteprima.pdf
  netlify.toml
  package.json
  .env.example        # variabili d'ambiente richieste (vedi punto 8)
```

## Sistema XP

Interamente client-side, salvato in `localStorage` (chiave `patente7giorni_progresso_v1`), gestito dall'hook `useProgresso()` in `lib/xp.ts`:

- risposta corretta al quiz → **+10 XP**
- livello completato → **+50 XP**, sblocca automaticamente il livello successivo

Nessun dato lascia il dispositivo dello studente: non c'è tracciamento server-side del progresso in questa fase.

## Animazioni

Realizzate con **Framer Motion** (transizioni tra step, flip delle flashcard, feedback del quiz, badge di completamento) e Tailwind (`animate-pop-in`, `animate-slide-up`, transizioni su hover/press). Rispettano `prefers-reduced-motion` (vedi `app/globals.css`).

## SEO

Ogni pagina imposta i propri meta tag tramite l'API `Metadata` di Next.js (title, description, Open Graph, Twitter Card) — vedi `app/layout.tsx` per i default globali e ogni `page.tsx` per gli override specifici. Le pagine private (`/dashboard`, `/successo`) sono escluse dall'indicizzazione (`robots: { index: false }`).

## Performance

- Nessuna immagine raster pesante: i mockup (smartphone, dashboard, PDF, flashcard) sono realizzati in CSS/SVG, non in screenshot — zero richieste di rete aggiuntive, zero layout shift da immagini in caricamento.
- `next.config.js` con `output: 'export'`: HTML statico pre-generato per ogni pagina, incluse le 7 pagine livello (`generateStaticParams`).
- Font (Space Grotesk, Inter) caricati con `next/font`, self-hosted automaticamente da Next.js: nessuna richiesta esterna a Google Fonts a runtime.
- Le due funzioni serverless (punto 8) non toccano le pagine pubbliche (homepage, prodotto, demo): restano statiche come prima. Solo le pagine della dashboard fanno una chiamata di rete in più, per verificare l'accesso e caricare il contenuto del livello.
- Al primo deploy, verifica il punteggio con Lighthouse (Chrome DevTools) e, se necessario, valuta la conversione di `og-image.png` in formato WebP.

## Contenuti attuali

I testi di lezioni, trucchi mnemonici e domande quiz in `netlify/functions/_data/livelli-content.ts` sono contenuti **di esempio**, corretti nella sostanza ma pensati per validare struttura e funzionamento del sistema (formato, XP, sblocchi). Prima della pubblicazione definitiva, vanno rivisti ed eventualmente ampliati da chi cura i contenuti del corso.
