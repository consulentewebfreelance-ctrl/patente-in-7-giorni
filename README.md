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

⚠️ Nota: essendo un sito statico senza backend, l'accesso alla dashboard dopo il pagamento non è oggi protetto da una verifica server-side dell'acquisto — la pagina `/successo/` rimanda semplicemente alla dashboard. Se in futuro vorrai proteggere l'accesso (es. con login o codice di sblocco legato all'acquisto), sarà necessario introdurre un minimo di backend (es. una funzione serverless Netlify) — non incluso in questa fase per rispettare il vincolo "nessun backend complesso".

## 6. Dove modificare i prezzi

Stesso file, `components/marketing/PricingCard.tsx`: l'array `pacchetti` contiene nome, prezzo, descrizione e voci incluse di ciascun pacchetto (Base 19€, Premium 29€, Pro 39€). Modifica i valori `prezzo` e `incluso` liberamente: il layout si adatta automaticamente.

## 7. Dove sostituire il PDF

- Il file `public/assets/patente-in-7-giorni-anteprima.pdf` è un placeholder realistico (copertina, indice, esempio di impaginazione di una lezione) — sostituiscilo con il PDF definitivo mantenendo lo stesso nome file, oppure aggiorna i riferimenti se cambi nome.
- Il **contenuto testuale** di lezioni, trucchi mnemonici, errori frequenti, flashcard e domande quiz si trova in un unico punto: `lib/livelli-data.ts`. Ogni livello è un oggetto con questa struttura:

```ts
{
  id: 'segnali',
  numero: 1,
  titolo: 'Segnali',
  lezione: '...',
  truccoMnemonico: '...',
  erroriFrequenti: ['...', '...'],
  flashcard: [{ fronte: '...', retro: '...' }],
  quiz: [{ domanda: '...', risposte: ['...','...','...'], corretta: 0, spiegazione: '...', erroreComune: '...' }],
}
```

Aggiornare questo file aggiorna automaticamente dashboard, missioni, quiz e demo gratuita, senza toccare i componenti.

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
    marketing/     # Hero, StatsStrip, FeatureCards, WhyItWorks, FAQ, Timeline,
                   # Pricing, FreeLevelBand, FinalCTA, StickyCTA, DayTracker
    mockups/       # PhoneMockup, BrowserMockup, DashboardMockup, PDFMockup, FlashcardMockup
    dashboard/     # LevelCard, DashboardClient, LivelloClient,
                   # StatsGrid, BadgeShelf, StreakIndicator, XPGainToast
    lesson/        # MnemonicTrick, CommonMistakes, FlashcardDeck, QuizRunner
    demo/          # DemoExperience
  lib/
    livelli-data.ts   # contenuti dei 7 livelli (unica fonte di verità)
    xp.ts             # sistema XP/progresso su localStorage
    streak.ts         # streak giornaliero su localStorage (Fase 4)
    achievements.ts   # definizione badge sbloccabili (Fase 4)
    utils.ts
  public/
    favicon.svg
    og-image.png
    assets/patente-in-7-giorni-anteprima.pdf
  netlify.toml
  package.json
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
- Al primo deploy, verifica il punteggio con Lighthouse (Chrome DevTools) e, se necessario, valuta la conversione di `og-image.png` in formato WebP.

## Contenuti attuali

I testi di lezioni, trucchi mnemonici e domande quiz in `lib/livelli-data.ts` sono contenuti **di esempio**, corretti nella sostanza ma pensati per validare struttura e funzionamento del sistema (formato, XP, sblocchi). Prima della pubblicazione definitiva, vanno rivisti ed eventualmente ampliati da chi cura i contenuti del corso.
