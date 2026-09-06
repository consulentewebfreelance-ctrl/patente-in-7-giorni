# Changelog — Fase 4: Rifinitura Professionale

Il progetto esistente (Fase 3) non è stato rigenerato: struttura, design system, componenti e architettura restano gli stessi. Questo documento elenca solo ciò che è cambiato, perché, e riporta il codice completo di ogni file nuovo o modificato.

## Riepilogo

- **File nuovi:** 10
- **File modificati:** 15
- **File NON toccati:** tutto il resto del progetto (`lib/livelli-data.ts`, `lib/xp.ts`, `lib/utils.ts`, pagine `prodotto`/`demo`/`successo`, componenti `ui/Alert`, `ui/Input`, `layout/Header`, `layout/Footer`, `layout/Logo`, `layout/AppHeader`, `marketing/FeatureCards`, `marketing/WhyItWorks`, `marketing/FAQAccordion`, `marketing/Timeline`, `marketing/PricingCard`, `marketing/FinalCTA`, `mockups/BrowserMockup`, `mockups/DashboardMockup`, `mockups/PDFMockup`, `mockups/FlashcardMockup`, `dashboard/LevelCard`, config e asset) — nessuna modifica richiesta dal brief.

### File nuovi

| File | Perché |
|---|---|
| `lib/streak.ts` | Hook `useStreak()`: calcola lo streak giornaliero da `localStorage` (§1). |
| `lib/achievements.ts` | Definizione dei badge sbloccabili, derivati dallo stato esistente di XP/livelli/streak, senza nuovi dati da sincronizzare (§1). |
| `components/dashboard/XPGainToast.tsx` | Indicatore animato "+N XP" (§2, §3). |
| `components/dashboard/StatsGrid.tsx` | Statistiche dashboard: livello attuale, XP, quiz completati, tempo stimato (§1). |
| `components/dashboard/BadgeShelf.tsx` | Griglia dei badge sbloccabili con animazione allo sblocco (§1). |
| `components/dashboard/StreakIndicator.tsx` | Indicatore streak giornaliero (fiamma + contatore) (§1). |
| `components/marketing/DayTracker.tsx` | Anteprima visiva dei 7 giorni del metodo nell'hero ("countdown dei 7 giorni") (§4). |
| `components/marketing/StatsStrip.tsx` | Striscia di statistiche visive sotto l'hero (§4). |
| `components/marketing/FreeLevelBand.tsx` | Sezione dedicata "Prova gratis il Livello 1" (§4). |
| `components/marketing/StickyCTA.tsx` | CTA sticky in fondo allo schermo su mobile (§4). |

### File modificati

| File | Cosa cambia | Perché |
|---|---|---|
| `components/ui/Badge.tsx` | Rimossa l'opacità sul testo della variante "bloccato" | Contrasto sotto la soglia AA (§7) |
| `components/ui/ProgressBar.tsx` | Riempimento animato con molla (framer-motion), `aria-label`, animazione sui pallini di `ProgressoTappe` | Barra XP animata, animazioni più fluide (§1, §6) |
| `components/ui/Card.tsx` | Curva di easing coerente sull'hover | Animazioni più fluide (§6) |
| `components/ui/Button.tsx` | Stessa curva di easing, focus-visible esplicito | Animazioni più fluide, tastiera (§6, §7) |
| `components/ui/Modal.tsx` | Tap target del pulsante chiudi portato a 44×44px, `aria-labelledby` | Accessibilità (§7) |
| `components/mockups/PhoneMockup.tsx` | Tasti laterali, riflesso sul vetro, ombra più profonda | Smartphone più realistico (§4) |
| `components/lesson/FlashcardDeck.tsx` | Frecce prev/next, flip da tastiera (Invio/Spazio/frecce), `aria-label` descrittivi | Accessibilità, navigazione desktop (§7) |
| `components/lesson/QuizRunner.tsx` | Toast "+XP" animato, shake sulla risposta sbagliata, pulsante "Prossima domanda"/"Vedi il risultato", `aria-live` | Quiz Premium (§2, §3) |
| `components/demo/DemoExperience.tsx` | CTA finale rinominata "Sblocca il Percorso Completo"; QuizRunner caricato via `next/dynamic` | Coerenza testo (§5), bundle (§8) |
| `components/dashboard/DashboardClient.tsx` | Integrati `StatsGrid`, `BadgeShelf`, `StreakIndicator` | Dashboard Premium (§1) |
| `components/dashboard/LivelloClient.tsx` | Animazione di completamento livello più elaborata (badge +50 XP, comparsa scaglionata); QuizRunner via `next/dynamic` | Animazione completamento (§1), bundle (§8) |
| `components/marketing/Hero.tsx` | CTA secondaria "Prova gratis il Livello 1", `DayTracker` integrato | Hero ad alta conversione (§4) |
| `app/(marketing)/page.tsx` | Aggiunte `StatsStrip`, `FreeLevelBand`, `StickyCTA` | Hero ad alta conversione (§4) |
| `app/layout.tsx` | Aggiunto `export const viewport` con `theme-color` | Performance/UX mobile (§8) |
| `next.config.js` | `reactStrictMode: true`, `poweredByHeader: false` | Buone pratiche/performance (§8) |

---

## Changelog dettagliato per sezione del brief

**1. Dashboard Premium** — Aggiunte `StatsGrid` (livello attuale, XP totali, quiz completati, tempo stimato rimanente), `BadgeShelf` (6 badge sbloccabili: primo passo, primo livello, a metà strada, metodo completo, costanza/streak, oltre i 100 XP) e `StreakIndicator` (giorni consecutivi). La barra XP nell'header (`AppHeader` → `ProgressBar`) ora si anima con una molla invece di una semplice transizione CSS.

**2. Sistema XP migliorato** — Le regole (+10 quiz corretto, +50 livello completato, salvataggio locale) erano già presenti in `lib/xp.ts` e non sono state toccate. Aggiunta l'animazione mancante: `XPGainToast` mostra "+10 XP" in dissolvenza ogni volta che una risposta è corretta.

**3. Quiz Premium** — Il feedback verde/rosso era già presente; ora la risposta sbagliata ha un piccolo scuotimento, compare il toast "+XP" animato sulla risposta corretta, il pulsante finale si chiama "Prossima domanda" (o "Vedi il risultato" sull'ultima domanda) e il blocco di feedback ha `aria-live="polite"` per essere annunciato dagli screen reader.

**4. Hero ad alta conversione** — `PhoneMockup` più realistico (tasti laterali, riflesso, ombra più profonda). Aggiunta una CTA secondaria "Prova gratis il Livello 1" accanto a "Inizia Ora", un `DayTracker` con i 7 giorni sotto le CTA, una `StatsStrip` sotto l'hero, una sezione dedicata `FreeLevelBand` più in basso nella pagina e una `StickyCTA` che compare su mobile dopo 640px di scroll.

**5. Livello Demo** — La demo (livello "Segnali" completo con mini lezione, trucco mnemonico, errori frequenti, flashcard e le sue 5 domande) era già implementata in Fase 3. L'unico intervento richiesto era il testo della CTA finale, aggiornato in "Sblocca il Percorso Completo".

**6. Animazioni** — Curva di easing (`cubic-bezier(0.22,1,0.36,1)`) unificata su hover di card e pulsanti; barra di progresso e pallini "a tappe" animati con framer-motion; animazione di completamento livello scomposta in più passaggi scaglionati invece di un unico pop-in.

**7. Accessibilità** — Fix di contrasto sul badge "Bloccato"; tap target del pulsante di chiusura del modale portato a 44×44px; `FlashcardDeck` reso operabile da tastiera (Invio/Spazio per girare, frecce per navigare) con `aria-label` descrittivi; `QuizRunner` con `role="radiogroup"`, `aria-checked` sulle risposte e `aria-live` sul feedback; `focus-visible` esplicito sui pulsanti.

**8. Performance** — `QuizRunner` caricato con `next/dynamic` sia nella missione sia nella demo: il codice del quiz non è nel bundle iniziale, si carica solo quando lo studente clicca "Inizia Quiz". Aggiunto `export const viewport` in `app/layout.tsx` (rendering mobile corretto dal primo paint) e `reactStrictMode`/`poweredByHeader: false` in `next.config.js`. Nessuna nuova immagine raster: tutti i nuovi elementi visivi (mockup, badge, statistiche) restano CSS/SVG, coerentemente con la scelta della Fase 3.

**9. Output** — Questo stesso documento: elenco file, motivazioni, codice completo di ogni file nuovo/modificato (sezioni seguenti) e riepilogo per punto del brief.

---

## Codice completo — file nuovi

### `lib/streak.ts`

```ts
'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'patente7giorni_streak_v1';

export type Streak = {
  giorniConsecutivi: number;
  ultimaVisita: string | null; // formato YYYY-MM-DD
};

function oggiISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function giorniTraDateISO(a: string, b: string): number {
  const msAl = Date.parse(a);
  const msBi = Date.parse(b);
  return Math.round((msBi - msAl) / (1000 * 60 * 60 * 24));
}

function leggi(): Streak {
  if (typeof window === 'undefined') return { giorniConsecutivi: 0, ultimaVisita: null };
  try {
    const salvato = window.localStorage.getItem(STORAGE_KEY);
    if (!salvato) return { giorniConsecutivi: 0, ultimaVisita: null };
    return JSON.parse(salvato) as Streak;
  } catch {
    return { giorniConsecutivi: 0, ultimaVisita: null };
  }
}

/**
 * Hook per lo streak giornaliero: aggiorna il conteggio al primo accesso della
 * giornata. Visite multiple nello stesso giorno non incrementano ulteriormente.
 * Se manca un giorno, lo streak si azzera e riparte da 1.
 */
export function useStreak() {
  const [streak, setStreak] = useState<Streak>({ giorniConsecutivi: 0, ultimaVisita: null });

  useEffect(() => {
    const attuale = leggi();
    const oggi = oggiISO();

    let nuovo: Streak;
    if (attuale.ultimaVisita === oggi) {
      nuovo = attuale; // già registrata la visita di oggi
    } else if (attuale.ultimaVisita && giorniTraDateISO(attuale.ultimaVisita, oggi) === 1) {
      nuovo = { giorniConsecutivi: attuale.giorniConsecutivi + 1, ultimaVisita: oggi };
    } else {
      nuovo = { giorniConsecutivi: 1, ultimaVisita: oggi };
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nuovo));
    setStreak(nuovo);
  }, []);

  return streak;
}
```

### `lib/achievements.ts`

```ts
import { livelli } from './livelli-data';
import type { Progresso } from './xp';
import type { Streak } from './streak';

export type Achievement = {
  id: string;
  titolo: string;
  descrizione: string;
  emoji: string;
  sbloccato: (ctx: { progresso: Progresso; streak: Streak; quizCompletatiTotali: number }) => boolean;
};

// Badge derivati sempre dallo stato esistente (XP, livelli, streak):
// nessun dato aggiuntivo da salvare, quindi nessun rischio di disallineamento.
export const achievements: Achievement[] = [
  {
    id: 'primo-passo',
    titolo: 'Primo passo',
    descrizione: 'Rispondi correttamente alla tua prima domanda.',
    emoji: '🎯',
    sbloccato: ({ quizCompletatiTotali }) => quizCompletatiTotali >= 1,
  },
  {
    id: 'primo-livello',
    titolo: 'Primo livello',
    descrizione: 'Completa il tuo primo livello.',
    emoji: '✅',
    sbloccato: ({ progresso }) => Object.values(progresso.livelli).some((l) => l.stato === 'completato'),
  },
  {
    id: 'a-meta-strada',
    titolo: 'A metà strada',
    descrizione: 'Completa almeno 4 dei 7 livelli.',
    emoji: '🚦',
    sbloccato: ({ progresso }) =>
      Object.values(progresso.livelli).filter((l) => l.stato === 'completato').length >= 4,
  },
  {
    id: 'metodo-completo',
    titolo: 'Metodo completo',
    descrizione: 'Completa tutti e 7 i livelli, simulazione finale inclusa.',
    emoji: '🏁',
    sbloccato: ({ progresso }) => livelli.every((l) => progresso.livelli[l.id]?.stato === 'completato'),
  },
  {
    id: 'streak-3',
    titolo: 'Costanza',
    descrizione: 'Torna a studiare per 3 giorni consecutivi.',
    emoji: '🔥',
    sbloccato: ({ streak }) => streak.giorniConsecutivi >= 3,
  },
  {
    id: 'cento-xp',
    titolo: 'Oltre i 100 XP',
    descrizione: 'Raggiungi 100 XP totali.',
    emoji: '⭐',
    sbloccato: ({ progresso }) => progresso.xpTotale >= 100,
  },
];

export function calcolaBadgeSbloccati(progresso: Progresso, streak: Streak) {
  const quizCompletatiTotali = Object.values(progresso.livelli).reduce(
    (tot, l) => tot + l.domandeCorrette.length,
    0
  );
  return achievements.map((a) => ({
    ...a,
    ottenuto: a.sbloccato({ progresso, streak, quizCompletatiTotali }),
  }));
}
```

### `components/dashboard/XPGainToast.tsx`

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';

/**
 * Piccolo indicatore animato "+N XP" (Fase 4, §2 e §3: "animazioni quando gli
 * XP aumentano"). Puramente visivo: chi lo usa gestisce il proprio stato
 * `visibile`/`valore` e lo rimuove dopo l'animazione.
 */
export function XPGainToast({ valore, visibile }: { valore: number; visibile: boolean }) {
  return (
    <AnimatePresence>
      {visibile && (
        <motion.span
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: -18, scale: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="pointer-events-none absolute -top-2 right-0 font-display text-[15px] font-bold text-superato"
          aria-hidden
        >
          +{valore} XP
        </motion.span>
      )}
    </AnimatePresence>
  );
}
```

### `components/dashboard/StatsGrid.tsx`

```tsx
import { Award, Clock, Layers, Zap } from 'lucide-react';
import { livelli } from '@/lib/livelli-data';
import type { Progresso } from '@/lib/xp';

const MINUTI_PER_LIVELLO = 12;

/** Fase 4, §1: statistiche riassuntive della dashboard (Livello, XP, Quiz completati, Tempo stimato). */
export function StatsGrid({ progresso }: { progresso: Progresso }) {
  const completati = livelli.filter((l) => progresso.livelli[l.id]?.stato === 'completato').length;
  const inCorso = livelli.find((l) => progresso.livelli[l.id]?.stato === 'in-corso');
  const quizCompletatiTotali = Object.values(progresso.livelli).reduce(
    (tot, l) => tot + l.domandeCorrette.length,
    0
  );
  const livelliRimanenti = livelli.length - completati;
  const minutiStimati = livelliRimanenti * MINUTI_PER_LIVELLO;

  const voci = [
    {
      icona: Layers,
      etichetta: 'Livello attuale',
      valore: inCorso ? `${inCorso.numero} · ${inCorso.titolo}` : completati === livelli.length ? 'Completato' : '—',
    },
    { icona: Zap, etichetta: 'XP totali', valore: `${progresso.xpTotale}` },
    { icona: Award, etichetta: 'Quiz completati', valore: `${quizCompletatiTotali}` },
    {
      icona: Clock,
      etichetta: 'Tempo stimato rimanente',
      valore: livelliRimanenti === 0 ? 'Nessuno' : `~${minutiStimati} min`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {voci.map(({ icona: Icona, etichetta, valore }) => (
        <div key={etichetta} className="rounded-lg border border-asfalto/[0.06] bg-segnaletica p-4 shadow-sm">
          <Icona className="h-4 w-4 text-superato" strokeWidth={2} aria-hidden />
          <p className="mt-2 truncate font-display text-[16px] font-bold" title={valore}>
            {valore}
          </p>
          <p className="text-[12px] text-ardesia">{etichetta}</p>
        </div>
      ))}
    </div>
  );
}
```

### `components/dashboard/BadgeShelf.tsx`

```tsx
'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { calcolaBadgeSbloccati } from '@/lib/achievements';
import type { Progresso } from '@/lib/xp';
import type { Streak } from '@/lib/streak';
import { cn } from '@/lib/utils';

/** Fase 4, §1: badge sbloccabili, calcolati dallo stato di progresso e streak esistenti. */
export function BadgeShelf({ progresso, streak }: { progresso: Progresso; streak: Streak }) {
  const badge = calcolaBadgeSbloccati(progresso, streak);

  return (
    <div>
      <h2 className="mb-3 font-display text-[16px] font-bold">Badge</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {badge.map((b, i) => (
          <motion.div
            key={b.id}
            initial={b.ottenuto ? { scale: 0.6, opacity: 0 } : false}
            animate={b.ottenuto ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.03, ease: 'easeOut' }}
            className={cn(
              'flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center',
              b.ottenuto ? 'border-superato/30 bg-superato/[0.06]' : 'border-asfalto/[0.06] bg-nebbia opacity-60'
            )}
            title={b.descrizione}
          >
            <span className="text-[22px]" aria-hidden>
              {b.ottenuto ? b.emoji : <Lock className="h-5 w-5 text-ardesia/50" />}
            </span>
            <span className="text-[11px] font-medium leading-tight text-asfalto">{b.titolo}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

### `components/dashboard/StreakIndicator.tsx`

```tsx
import { Flame } from 'lucide-react';
import type { Streak } from '@/lib/streak';

/** Fase 4, §1: streak giornaliero, mostrato in dashboard accanto alle statistiche. */
export function StreakIndicator({ streak }: { streak: Streak }) {
  const attivo = streak.giorniConsecutivi > 0;
  return (
    <div
      className="flex items-center gap-2 rounded-full border border-asfalto/[0.06] bg-segnaletica px-3.5 py-1.5 shadow-sm"
      aria-label={`Streak: ${streak.giorniConsecutivi} ${streak.giorniConsecutivi === 1 ? 'giorno' : 'giorni'} consecutivi`}
    >
      <Flame className={attivo ? 'h-4 w-4 text-superato' : 'h-4 w-4 text-ardesia/40'} strokeWidth={2} aria-hidden />
      <span className="text-[13px] font-bold text-asfalto">{streak.giorniConsecutivi}</span>
      <span className="text-[12px] text-ardesia">{streak.giorniConsecutivi === 1 ? 'giorno' : 'giorni'}</span>
    </div>
  );
}
```

### `components/marketing/DayTracker.tsx`

```tsx
import { livelli } from '@/lib/livelli-data';

/** Fase 4, §4: anteprima visiva dei 7 giorni del metodo, vicino all'hero ("countdown dei 7 giorni"). */
export function DayTracker() {
  return (
    <div className="flex items-center gap-1.5" role="list" aria-label="I 7 giorni del metodo">
      {livelli.map((l, i) => (
        <div key={l.id} role="listitem" className="flex flex-col items-center gap-1.5">
          <div
            className={
              'flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold ' +
              (i === 0 ? 'bg-superato text-asfalto' : 'border border-segnaletica/25 text-segnaletica/70')
            }
          >
            {l.numero}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### `components/marketing/StatsStrip.tsx`

```tsx
import { CalendarCheck, HelpCircle, Timer } from 'lucide-react';

// Numeri illustrativi del metodo (non contano utenti reali): da confermare/aggiornare
// con dati reali prima del lancio pubblico.
const voci = [
  { icona: CalendarCheck, valore: '7', etichetta: 'giorni di metodo' },
  { icona: Timer, valore: '~15', etichetta: 'minuti al giorno' },
  { icona: HelpCircle, valore: '20+', etichetta: 'domande in stile esame' },
];

/** Fase 4, §4: statistiche visive nella homepage, sotto l'hero. */
export function StatsStrip() {
  return (
    <div className="grid grid-cols-3 divide-x divide-nebbia border-y border-nebbia">
      {voci.map(({ icona: Icona, valore, etichetta }) => (
        <div key={etichetta} className="flex flex-col items-center gap-1 px-2 py-6 text-center">
          <Icona className="h-4 w-4 text-superato" strokeWidth={2} aria-hidden />
          <span className="font-display text-[22px] font-bold md:text-[28px]">{valore}</span>
          <span className="text-[12px] text-ardesia">{etichetta}</span>
        </div>
      ))}
    </div>
  );
}
```

### `components/marketing/FreeLevelBand.tsx`

```tsx
import { PlayCircle } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { livelli } from '@/lib/livelli-data';

/** Fase 4, §4: sezione dedicata "Prova gratis il Livello 1", per aumentare la conversione verso la demo. */
export function FreeLevelBand() {
  const livello1 = livelli[0];
  return (
    <section className="border-y border-nebbia bg-nebbia py-14 md:py-20">
      <div className="container-app flex flex-col items-center gap-5 text-center">
        <PlayCircle className="h-8 w-8 text-superato" strokeWidth={1.75} aria-hidden />
        <h2 className="max-w-[440px] font-display text-[26px] font-bold leading-tight md:text-[34px]">
          Prova gratis il Livello 1
        </h2>
        <p className="max-w-[440px] text-[15px] text-ardesia">
          Lezione, flashcard e {livello1.quiz.length} domande in stile esame su &ldquo;{livello1.titolo}&rdquo; — senza carta di credito, senza impegno.
        </p>
        <ButtonLink href="/demo" variante="secondario" className="bg-segnaletica">
          Inizia la Demo Gratuita
        </ButtonLink>
      </div>
    </section>
  );
}
```

### `components/marketing/StickyCTA.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';

/** Fase 4, §4: CTA sticky in fondo allo schermo su mobile, dopo l'hero (pattern ad alta conversione). */
export function StickyCTA() {
  const [visibile, setVisibile] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisibile(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visibile) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-nebbia bg-segnaletica/95 p-3 backdrop-blur-md animate-slide-up md:hidden">
      <ButtonLink href="/prodotto" fullWidth>
        Inizia Ora
      </ButtonLink>
    </div>
  );
}
```

---

## Codice completo — file modificati

### `components/ui/Badge.tsx`

```tsx
import { cn } from '@/lib/utils';

type Variante = 'neutro' | 'successo' | 'in-corso' | 'bloccato';

const stiliVariante: Record<Variante, string> = {
  neutro: 'bg-nebbia text-ardesia',
  successo: 'bg-superato/10 text-superato',
  'in-corso': 'bg-segnale/10 text-segnale',
  bloccato: 'bg-nebbia text-ardesia',
};

export function Badge({ variante = 'neutro', children }: { variante?: Variante; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-[13px] font-medium',
        stiliVariante[variante]
      )}
    >
      {children}
    </span>
  );
}
```

### `components/ui/ProgressBar.tsx`

```tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ProgressBar({
  percentuale,
  className,
  etichetta = 'Progresso',
}: {
  percentuale: number;
  className?: string;
  etichetta?: string;
}) {
  const valore = Math.max(0, Math.min(100, percentuale));
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-nebbia', className)}>
      <motion.div
        className="h-full rounded-full bg-superato"
        initial={false}
        animate={{ width: `${valore}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        role="progressbar"
        aria-label={etichetta}
        aria-valuenow={Math.round(valore)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

/** Variante "a tappe": usata nella dashboard per mostrare i 7 livelli come nodi collegati. */
export function ProgressoTappe({ totale, completate }: { totale: number; completate: number }) {
  return (
    <div className="flex items-center gap-1.5" role="img" aria-label={`${completate} livelli completati su ${totale}`}>
      {Array.from({ length: totale }).map((_, i) => (
        <motion.span
          key={i}
          initial={false}
          animate={{ scale: i < completate ? [0.7, 1.15, 1] : 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={cn(
            'h-2.5 w-2.5 rounded-full transition-colors duration-300',
            i < completate ? 'bg-superato' : 'border border-ardesia/40 bg-transparent'
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}
```

### `components/ui/Card.tsx`

```tsx
import { cn } from '@/lib/utils';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  evidenziata?: boolean;
};

export function Card({ children, className, hover = false, evidenziata = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-segnaletica p-6 shadow-md md:p-8',
        evidenziata ? 'border-[1.5px] border-superato' : 'border-asfalto/[0.06]',
        hover &&
          'transition-all duration-[250ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}
```

### `components/ui/Button.tsx`

```tsx
'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variante = 'primario' | 'secondario' | 'successo';

type PropsComuni = {
  variante?: Variante;
  className?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
};

const stiliBase =
  'inline-flex items-center justify-center h-[52px] px-7 rounded-md font-sans font-extrabold text-[16px] tracking-[0.2px] transition-all duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-segnale';

const stiliVariante: Record<Variante, string> = {
  primario: 'bg-asfalto text-segnaletica hover:bg-[#1c1c1f] hover:shadow-md',
  secondario: 'bg-transparent text-asfalto border-[1.5px] border-asfalto hover:bg-nebbia',
  successo: 'bg-superato text-segnaletica hover:brightness-95 hover:shadow-md',
};

type ButtonProps = PropsComuni & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variante = 'primario', className, fullWidth, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(stiliBase, stiliVariante[variante], fullWidth && 'w-full', className)}
      {...rest}
    >
      {children}
    </button>
  )
);
Button.displayName = 'Button';

type ButtonLinkProps = PropsComuni & {
  href: string;
  target?: string;
  rel?: string;
};

/** Stessa identità visiva del Button, ma per link (es. CTA verso pagina prodotto). */
export function ButtonLink({ variante = 'primario', className, fullWidth, children, href, ...rest }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(stiliBase, stiliVariante[variante], fullWidth && 'w-full', className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
```

### `components/ui/Modal.tsx`

```tsx
'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  aperto: boolean;
  onChiudi: () => void;
  children: React.ReactNode;
  titolo?: string;
};

export function Modal({ aperto, onChiudi, children, titolo }: ModalProps) {
  useEffect(() => {
    if (!aperto) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onChiudi();
    window.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [aperto, onChiudi]);

  if (!aperto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-asfalto/60 backdrop-blur-sm animate-[fadeIn_200ms_ease-out] md:items-center"
      onClick={onChiudi}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titolo ? 'modal-titolo' : undefined}
      aria-label={titolo ? undefined : 'Finestra'}
    >
      <div
        className="w-full max-w-[480px] animate-slide-up rounded-lg bg-segnaletica p-6 shadow-lg md:animate-none md:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          {titolo && (
            <h3 id="modal-titolo" className="font-display text-[20px] font-bold">
              {titolo}
            </h3>
          )}
          <button
            onClick={onChiudi}
            aria-label="Chiudi"
            className="ml-auto flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full hover:bg-nebbia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-segnale"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
```

### `components/mockups/PhoneMockup.tsx`

```tsx
import { cn } from '@/lib/utils';

/**
 * Cornice smartphone realistica in CSS (Fase 4 §4: "smartphone più realistico"):
 * tasti laterali, notch, riflesso sottile sullo schermo, ombra più profonda.
 */
export function PhoneMockup({
  children,
  inclinato = false,
  className,
}: {
  children: React.ReactNode;
  inclinato?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative mx-auto w-[280px] rounded-[36px] border-[6px] border-asfalto bg-asfalto p-2 shadow-lg md:w-[300px]',
        'shadow-[0_24px_60px_rgba(11,11,13,0.28)]',
        inclinato && 'rotate-[6deg]',
        className
      )}
    >
      {/* tasto volume e power, solo dettaglio visivo */}
      <div className="absolute -left-[8px] top-20 h-8 w-[3px] rounded-full bg-asfalto/80" aria-hidden />
      <div className="absolute -left-[8px] top-32 h-12 w-[3px] rounded-full bg-asfalto/80" aria-hidden />
      <div className="absolute -right-[8px] top-28 h-14 w-[3px] rounded-full bg-asfalto/80" aria-hidden />

      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-asfalto" aria-hidden />

      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[28px] bg-segnaletica">
        {children}
        {/* riflesso sottile per dare profondità al vetro */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 26%)',
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
```

### `components/lesson/FlashcardDeck.tsx`

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Flashcard } from '@/lib/livelli-data';

/**
 * Flashcard con flip 3D al tap/Invio e swipe orizzontale per navigare
 * (Fase 2/3, Schermata 6). Fase 4 §7: frecce prev/next per navigazione da
 * tastiera e desktop, non solo swipe.
 */
export function FlashcardDeck({ carte }: { carte: Flashcard[] }) {
  const [indice, setIndice] = useState(0);
  const [girata, setGirata] = useState(false);

  const vaiA = (nuovoIndice: number) => {
    if (nuovoIndice < 0 || nuovoIndice >= carte.length) return;
    setGirata(false);
    setIndice(nuovoIndice);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) vaiA(indice + 1);
    else if (info.offset.x > 60) vaiA(indice - 1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setGirata((g) => !g);
    } else if (e.key === 'ArrowRight') {
      vaiA(indice + 1);
    } else if (e.key === 'ArrowLeft') {
      vaiA(indice - 1);
    }
  };

  const carta = carte[indice];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-[420px] items-center gap-3">
        <button
          onClick={() => vaiA(indice - 1)}
          disabled={indice === 0}
          aria-label="Flashcard precedente"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-nebbia text-asfalto transition-colors hover:bg-nebbia disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="relative h-[220px] flex-1" style={{ perspective: 1000 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={indice}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              onClick={() => setGirata((g) => !g)}
              onKeyDown={onKeyDown}
              tabIndex={0}
              role="button"
              aria-label={girata ? `Risposta: ${carta.retro}. Premi Invio per tornare alla domanda.` : `Domanda: ${carta.fronte}. Premi Invio per vedere la risposta.`}
            >
              <motion.div
                animate={{ rotateY: girata ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                className="relative h-full w-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-asfalto/[0.06] bg-segnaletica p-6 text-center shadow-lg"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-[12px] font-medium text-ardesia">Domanda</span>
                  <p className="mt-3 font-display text-[18px] font-bold leading-snug">{carta.fronte}</p>
                  <p className="mt-4 text-[12px] text-ardesia">tocca o premi Invio per girare</p>
                </div>
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-asfalto p-6 text-center text-segnaletica shadow-lg"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className="text-[12px] font-medium text-segnaletica/60">Risposta</span>
                  <p className="mt-3 text-[15px] leading-snug">{carta.retro}</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => vaiA(indice + 1)}
          disabled={indice === carte.length - 1}
          aria-label="Flashcard successiva"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-nebbia text-asfalto transition-colors hover:bg-nebbia disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-1.5" aria-hidden>
        {carte.map((_, i) => (
          <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === indice ? 'bg-superato' : 'bg-nebbia'}`} />
        ))}
      </div>
      <p className="text-[13px] text-ardesia" aria-live="polite">
        Flashcard {indice + 1}/{carte.length}
      </p>
    </div>
  );
}
```

### `components/lesson/QuizRunner.tsx`

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { XPGainToast } from '@/components/dashboard/XPGainToast';
import { cn } from '@/lib/utils';
import type { Domanda } from '@/lib/livelli-data';

type Props = {
  domande: Domanda[];
  onRispostaCorretta: (indiceDomanda: number) => void;
  onCompletato: () => void;
  numerazioneTotale?: number;
};

/**
 * Fase 2/3/4, Schermata 5 — Quiz Premium: una domanda alla volta, feedback
 * immediato animato, +XP animato, spiegazione, errore comune, indicatore
 * "N di totale", pulsante "Prossima domanda" (o "Vedi il risultato" sull'ultima).
 */
export function QuizRunner({ domande, onRispostaCorretta, onCompletato, numerazioneTotale }: Props) {
  const [indice, setIndice] = useState(0);
  const [selezionata, setSelezionata] = useState<number | null>(null);
  const [xpGuadagnato, setXpGuadagnato] = useState(0);
  const [mostraToast, setMostraToast] = useState(false);

  const domanda = domande[indice];
  const risposta = selezionata !== null;
  const corretta = selezionata === domanda.corretta;
  const totale = numerazioneTotale ?? domande.length;
  const ultimaDomanda = indice === domande.length - 1;

  const rispondi = (i: number) => {
    if (risposta) return;
    setSelezionata(i);
    if (i === domanda.corretta) {
      setXpGuadagnato((x) => x + 10);
      setMostraToast(true);
      window.setTimeout(() => setMostraToast(false), 700);
      onRispostaCorretta(indice);
    }
  };

  const prosegui = () => {
    if (!ultimaDomanda) {
      setIndice((n) => n + 1);
      setSelezionata(null);
    } else {
      onCompletato();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[520px] flex-col gap-6">
      <div className="flex items-center justify-between text-[13px] font-medium text-ardesia">
        <span aria-live="polite">Domanda {indice + 1} di {totale}</span>
        <span className="relative">
          {xpGuadagnato} XP in questo quiz
          <XPGainToast valore={10} visibile={mostraToast} />
        </span>
      </div>
      <ProgressBar
        percentuale={((indice + (risposta ? 1 : 0)) / domande.length) * 100}
        etichetta={`Domanda ${indice + 1} di ${domande.length}`}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={indice}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-6"
        >
          <p className="text-center font-display text-[20px] font-bold leading-snug md:text-[22px]">
            {domanda.domanda}
          </p>

          <div className="flex flex-col gap-3" role="radiogroup" aria-label="Risposte">
            {domanda.risposte.map((testo, i) => {
              const isCorretta = i === domanda.corretta;
              const isSelezionata = i === selezionata;
              return (
                <motion.button
                  key={testo}
                  onClick={() => rispondi(i)}
                  disabled={risposta}
                  role="radio"
                  aria-checked={isSelezionata}
                  animate={
                    risposta && isSelezionata
                      ? { x: isCorretta ? 0 : [0, -6, 6, -4, 4, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.35 }}
                  className={cn(
                    'flex min-h-[52px] items-center justify-between rounded-md border-[1.5px] px-4 py-3 text-left text-[15px] font-medium transition-all duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-segnale',
                    !risposta && 'border-nebbia hover:border-asfalto/30',
                    risposta && isCorretta && 'border-superato bg-superato/[0.08]',
                    risposta && isSelezionata && !isCorretta && 'border-erroreLieve bg-erroreLieve/[0.08]',
                    risposta && !isSelezionata && !isCorretta && 'border-nebbia opacity-50'
                  )}
                >
                  {testo}
                  {risposta && isCorretta && <Check className="h-5 w-5 flex-shrink-0 text-superato" />}
                  {risposta && isSelezionata && !isCorretta && <X className="h-5 w-5 flex-shrink-0 text-erroreLieve" />}
                </motion.button>
              );
            })}
          </div>

          {risposta && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3 rounded-lg bg-nebbia p-5"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-center gap-2">
                {corretta ? (
                  <span className="flex items-center gap-1.5 text-[14px] font-bold text-superato">
                    <Check className="h-4 w-4" /> Corretto · +10 XP
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[14px] font-bold text-erroreLieve">
                    <X className="h-4 w-4" /> Sbagliato
                  </span>
                )}
              </div>
              <p className="text-[14px] text-asfalto">{domanda.spiegazione}</p>
              {!corretta && (
                <p className="text-[13px] text-ardesia">
                  <strong className="text-asfalto">Errore comune:</strong> {domanda.erroreComune}
                </p>
              )}
              <Button onClick={prosegui} className="mt-2 w-fit">
                {ultimaDomanda ? 'Vedi il risultato' : 'Prossima domanda'}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

### `components/demo/DemoExperience.tsx`

```tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import { ButtonLink, Button } from '@/components/ui/Button';
import { MnemonicTrick } from '@/components/lesson/MnemonicTrick';
import { CommonMistakes } from '@/components/lesson/CommonMistakes';
import { FlashcardDeck } from '@/components/lesson/FlashcardDeck';
import { livelli } from '@/lib/livelli-data';

const QuizRunner = dynamic(() => import('@/components/lesson/QuizRunner').then((m) => m.QuizRunner), {
  loading: () => <div className="h-[320px] animate-pulse rounded-lg bg-nebbia" />,
});

type Step = 'lezione' | 'quiz' | 'finale';

const livelloDemo = livelli[0]; // "Segnali": livello 1 completo, usato come demo gratuita

/** Fase 3: demo gratuita — livello 1 completo, 5 domande, CTA finale di sblocco. Nessun XP salvato. */
export function DemoExperience() {
  const [step, setStep] = useState<Step>('lezione');

  return (
    <div className="container-app max-w-[640px] py-10 md:py-16">
      <AnimatePresence mode="wait">
        {step === 'lezione' && (
          <motion.div
            key="lezione"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-8 pb-24"
          >
            <div>
              <span className="text-[13px] font-medium text-superato">Demo gratuita · Livello 1</span>
              <h1 className="mt-1 font-display text-[28px] font-bold md:text-[34px]">{livelloDemo.titolo}</h1>
            </div>

            <div>
              <span className="text-[13px] font-medium text-ardesia">Lezione</span>
              <p className="mt-2 text-[16px] leading-relaxed text-asfalto">{livelloDemo.lezione}</p>
            </div>

            <MnemonicTrick testo={livelloDemo.truccoMnemonico} />
            <CommonMistakes errori={livelloDemo.erroriFrequenti} />

            <div>
              <span className="mb-4 block text-[13px] font-medium text-ardesia">Flashcard di ripasso</span>
              <FlashcardDeck carte={livelloDemo.flashcard} />
            </div>

            <div className="fixed inset-x-0 bottom-0 border-t border-nebbia bg-segnaletica/95 p-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0">
              <Button onClick={() => setStep('quiz')} fullWidth className="mx-auto max-w-[640px] md:w-auto">
                Inizia Quiz Demo
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <QuizRunner
              domande={livelloDemo.quiz}
              onRispostaCorretta={() => {}}
              onCompletato={() => setStep('finale')}
              numerazioneTotale={livelloDemo.quiz.length}
            />
          </motion.div>
        )}

        {step === 'finale' && (
          <motion.div
            key="finale"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-5 py-16 text-center"
          >
            <div className="flex h-16 w-16 animate-pop-in items-center justify-center rounded-full bg-asfalto text-segnaletica">
              <Lock className="h-7 w-7" strokeWidth={2} />
            </div>
            <h2 className="font-display text-[26px] font-bold">Ottimo inizio.</h2>
            <p className="max-w-[380px] text-[15px] text-ardesia">
              Hai completato il primo livello. Altri 6 livelli, il PDF completo e le simulazioni d&apos;esame ti aspettano nel metodo completo.
            </p>
            <ButtonLink href="/prodotto">
              <Sparkles className="mr-2 h-4 w-4" /> Sblocca il Percorso Completo
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

### `components/dashboard/DashboardClient.tsx`

```tsx
'use client';

import { useMemo } from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { LevelCard } from './LevelCard';
import { StatsGrid } from './StatsGrid';
import { BadgeShelf } from './BadgeShelf';
import { StreakIndicator } from './StreakIndicator';
import { ProgressoTappe } from '@/components/ui/ProgressBar';
import { livelli } from '@/lib/livelli-data';
import { useProgresso } from '@/lib/xp';
import { useStreak } from '@/lib/streak';

/**
 * Fase 2/3/4, Schermata 3 — Dashboard Premium: header (XP, progresso),
 * streak giornaliero, statistiche, badge sbloccabili e le 7 card missione.
 */
export function DashboardClient() {
  const { progresso, pronto } = useProgresso();
  const streak = useStreak();

  const completati = useMemo(
    () => livelli.filter((l) => progresso.livelli[l.id]?.stato === 'completato').length,
    [progresso]
  );
  const percentuale = (completati / livelli.length) * 100;

  if (!pronto) {
    // Skeleton semplice invece di uno spinner, coerente con le linee guida micro-interazioni.
    return (
      <div>
        <div className="h-[64px] animate-pulse bg-nebbia" />
        <div className="container-app py-8">
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[84px] animate-pulse rounded-lg bg-nebbia" />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-[72px] animate-pulse rounded-lg bg-nebbia" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppHeader xpTotale={progresso.xpTotale} percentualeCompletamento={percentuale} />
      <div className="container-app flex flex-col gap-10 py-8 md:py-12">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-display text-[24px] font-bold">La tua dashboard</h1>
            <StreakIndicator streak={streak} />
          </div>
          <StatsGrid progresso={progresso} />
        </div>

        <BadgeShelf progresso={progresso} streak={streak} />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-[16px] font-bold">I tuoi livelli</h2>
            <ProgressoTappe totale={livelli.length} completate={completati} />
          </div>
          <div className="flex flex-col gap-3">
            {livelli.map((livello) => {
              const stato = progresso.livelli[livello.id]?.stato ?? 'bloccato';
              const xp = progresso.livelli[livello.id]?.xp ?? 0;
              return (
                <LevelCard key={livello.id} livello={livello} stato={stato} xp={xp} totaleDomande={livello.quiz.length} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### `components/dashboard/LivelloClient.tsx`

```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PartyPopper } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button, ButtonLink } from '@/components/ui/Button';
import { MnemonicTrick } from '@/components/lesson/MnemonicTrick';
import { CommonMistakes } from '@/components/lesson/CommonMistakes';
import { FlashcardDeck } from '@/components/lesson/FlashcardDeck';
import { useProgresso } from '@/lib/xp';
import type { Livello } from '@/lib/livelli-data';

// Caricato solo quando l'utente clicca "Inizia Quiz" (Fase 4 §8: riduce il bundle iniziale).
const QuizRunner = dynamic(() => import('@/components/lesson/QuizRunner').then((m) => m.QuizRunner), {
  loading: () => <div className="h-[320px] animate-pulse rounded-lg bg-nebbia" />,
});

type Step = 'lezione' | 'quiz' | 'completato';

/** Fase 2/3, Schermata 4 + 5: missione completa (lezione -> quiz) con progresso salvato in locale. */
export function LivelloClient({ livello, prossimoLivelloId }: { livello: Livello; prossimoLivelloId?: string }) {
  const { progresso, pronto, registraRispostaCorretta, completaLivello } = useProgresso();
  const [step, setStep] = useState<Step>('lezione');

  const xpTotale = progresso.xpTotale;
  const percentuale = pronto
    ? (Object.values(progresso.livelli).filter((l) => l.stato === 'completato').length / Object.keys(progresso.livelli).length) * 100
    : 0;

  const handleCompletaQuiz = () => {
    completaLivello(livello.id, prossimoLivelloId);
    setStep('completato');
  };

  return (
    <div>
      <AppHeader xpTotale={xpTotale} percentualeCompletamento={percentuale} />

      <div className="container-app max-w-[640px] py-8 md:py-12">
        <Link href="/dashboard" className="mb-6 flex items-center gap-2 text-[14px] font-medium text-ardesia hover:text-asfalto">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>

        <AnimatePresence mode="wait">
          {step === 'lezione' && (
            <motion.div
              key="lezione"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-8 pb-24"
            >
              <div>
                <span className="text-[13px] font-medium text-ardesia">Livello {livello.numero}</span>
                <h1 className="mt-1 font-display text-[26px] font-bold md:text-[30px]">{livello.titolo}</h1>
              </div>

              <div>
                <span className="text-[13px] font-medium text-ardesia">Lezione</span>
                <p className="mt-2 text-[16px] leading-relaxed text-asfalto">{livello.lezione}</p>
              </div>

              <MnemonicTrick testo={livello.truccoMnemonico} />
              <CommonMistakes errori={livello.erroriFrequenti} />

              <div>
                <span className="mb-4 block text-[13px] font-medium text-ardesia">Flashcard di ripasso</span>
                <FlashcardDeck carte={livello.flashcard} />
              </div>

              <div className="fixed inset-x-0 bottom-0 border-t border-nebbia bg-segnaletica/95 p-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0">
                <Button onClick={() => setStep('quiz')} fullWidth className="mx-auto max-w-[640px] md:w-auto">
                  Inizia Quiz
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="py-4"
            >
              <QuizRunner
                domande={livello.quiz}
                onRispostaCorretta={(i) => registraRispostaCorretta(livello.id, i)}
                onCompletato={handleCompletaQuiz}
              />
            </motion.div>
          )}

          {step === 'completato' && (
            <motion.div
              key="completato"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-5 py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -12, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-superato/10 text-superato"
              >
                <PartyPopper className="h-8 w-8" strokeWidth={2} />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.25 }}
                className="font-display text-[24px] font-bold"
              >
                Livello completato
              </motion.h2>
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.25 }}
                className="rounded-full bg-superato/10 px-4 py-1.5 font-display text-[15px] font-bold text-superato"
              >
                +50 XP
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.25 }}
                className="max-w-[360px] text-[15px] text-ardesia"
              >
                Il livello successivo è ora sbloccato nella tua dashboard.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.25 }}>
                <ButtonLink href="/dashboard">Torna alla Dashboard</ButtonLink>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

### `components/marketing/Hero.tsx`

```tsx
import { ButtonLink } from '@/components/ui/Button';
import { PhoneMockup } from '@/components/mockups/PhoneMockup';
import { DashboardMockup } from '@/components/mockups/DashboardMockup';
import { DayTracker } from './DayTracker';

/** Fase 2/4, Schermata 1 — Hero ad alta conversione: titolo enorme, sottotitolo, mockup smartphone, doppia CTA, anteprima dei 7 giorni. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-asfalto pb-16 pt-14 text-segnaletica md:pb-24 md:pt-20">
      {/* linee diagonali sottili che richiamano la segnaletica orizzontale */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, transparent, transparent 68px, #17C964 68px, #17C964 70px)',
        }}
      />
      <div className="container-app relative grid items-center gap-10 md:grid-cols-2 md:gap-8">
        <div className="flex flex-col items-start gap-6">
          <h1 className="font-display text-[40px] font-bold leading-[1.05] md:text-[64px]">
            La patente non aspetta. Nemmeno tu dovresti.
          </h1>
          <p className="max-w-[440px] text-[17px] text-segnaletica/70 md:text-[18px]">
            Un metodo di studio organizzato in guide, schemi, flashcard e quiz originali per superare l&apos;esame in una settimana.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href="/prodotto" className="w-full sm:w-auto">
              Inizia Ora
            </ButtonLink>
            <ButtonLink
              href="/demo"
              variante="secondario"
              className="w-full border-segnaletica/40 bg-transparent text-segnaletica hover:bg-segnaletica/10 sm:w-auto"
            >
              Prova gratis il Livello 1
            </ButtonLink>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[12px] font-medium text-segnaletica/50">I tuoi 7 giorni</span>
            <DayTracker />
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <PhoneMockup inclinato>
            <DashboardMockup />
          </PhoneMockup>
        </div>
      </div>
    </section>
  );
}
```

### `app/(marketing)/page.tsx`

```tsx
import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/Hero';
import { StatsStrip } from '@/components/marketing/StatsStrip';
import { FeatureCards } from '@/components/marketing/FeatureCards';
import { WhyItWorks } from '@/components/marketing/WhyItWorks';
import { FreeLevelBand } from '@/components/marketing/FreeLevelBand';
import { FinalCTA } from '@/components/marketing/FinalCTA';
import { StickyCTA } from '@/components/marketing/StickyCTA';

export const metadata: Metadata = {
  title: 'Patente in 7 Giorni — Il metodo per superare il quiz in una settimana',
  description:
    'Un metodo di studio organizzato in guide, schemi, flashcard e quiz originali per superare il quiz della patente in 7 giorni.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeatureCards />
      <WhyItWorks />
      <FreeLevelBand />
      <FinalCTA />
      <StickyCTA />
    </>
  );
}
```

### `app/layout.tsx`

```tsx
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://patentein7giorni.it'),
  title: {
    default: 'Patente in 7 Giorni — Il metodo per superare il quiz in una settimana',
    template: '%s · Patente in 7 Giorni',
  },
  description:
    'Un metodo di studio organizzato in guide, schemi, flashcard e quiz originali per superare il quiz della patente in 7 giorni.',
  openGraph: {
    title: 'Patente in 7 Giorni',
    description: 'Il metodo per superare il quiz della patente in una settimana.',
    url: 'https://patentein7giorni.it',
    siteName: 'Patente in 7 Giorni',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patente in 7 Giorni',
    description: 'Il metodo per superare il quiz della patente in una settimana.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B0B0D',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-segnaletica font-sans text-asfalto antialiased">{children}</body>
    </html>
  );
}
```

### `next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Il progetto viene esportato come sito statico: nessun backend,
  // pubblicabile su Netlify come cartella "out".
  output: 'export',
  images: {
    // Non usiamo l'ottimizzazione immagini di Next (richiede un server):
    // i mockup sono realizzati in CSS/SVG, quindi non serve un loader remoto.
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```
