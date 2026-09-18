// Definizione dei tre piani (Masterplan 2.0). Questo file è pubblico (letto
// anche dal client per decidere cosa mostrare sbloccato/bloccato) ma non
// contiene alcun contenuto protetto: solo numeri e flag.
//
// IMPORTANTE sulla crescita dei contenuti: i limiti "Starter" sono un tetto
// fisso (restano quelli anche se la banca quiz/flashcard cresce). Premium e
// Pro invece vedono SEMPRE l'intera banca disponibile in quel momento: quando
// in futuro si aggiungono domande a lib/server/livelli-content.ts, Premium e
// Pro ne beneficiano automaticamente, senza toccare questo file. È così che
// "2500 quiz" e "250 flashcard" diventano un traguardo verso cui l'architettura
// cresce, invece di un numero finto scritto oggi.

export type Tier = 'starter' | 'premium' | 'pro';

export const ORDINE_TIER: Tier[] = ['starter', 'premium', 'pro'];

export function tierMaggioreOuguale(a: Tier, b: Tier): boolean {
  return ORDINE_TIER.indexOf(a) >= ORDINE_TIER.indexOf(b);
}

export type InfoTier = {
  id: Tier;
  nome: string;
  prezzo: number;
  tagline: string;
  evidenziato?: boolean;
};

export const TIER_INFO: Record<Tier, InfoTier> = {
  starter: { id: 'starter', nome: 'Starter', prezzo: 19, tagline: 'Per iniziare con il metodo essenziale.' },
  premium: {
    id: 'premium',
    nome: 'Premium',
    prezzo: 29,
    tagline: 'Il piano più scelto: banca completa e strumenti intelligenti.',
    evidenziato: true,
  },
  pro: { id: 'pro', nome: 'Pro', prezzo: 39, tagline: 'Tutto, senza limiti, per arrivare pronti al 100%.' },
};

/** Limiti quiz/flashcard PER LIVELLO. null = intera banca disponibile (cresce nel tempo). */
export const LIMITI_CONTENUTO: Record<Tier, { quizPerLivello: number | null; flashcardPerLivello: number | null }> = {
  starter: { quizPerLivello: 3, flashcardPerLivello: 2 },
  premium: { quizPerLivello: null, flashcardPerLivello: null },
  pro: { quizPerLivello: null, flashcardPerLivello: null },
};

/** Memory Game — Fase 2: Starter gioca solo con le "categorie iniziali", Premium/Pro con tutte. */
export const LIVELLI_MEMORY_STARTER = ['segnali', 'precedenze'];

export function livelliMemoryDisponibili(tier: Tier, tuttiGliId: string[]): string[] {
  return tier === 'starter' ? tuttiGliId.filter((id) => LIVELLI_MEMORY_STARTER.includes(id)) : tuttiGliId;
}

/** Il livello "Simulazione Finale" è escluso dal piano Starter. */
export function puoAccedereASimulazioneFinale(tier: Tier): boolean {
  return tier !== 'starter';
}

export type IdFunzione =
  | 'memoryGame'
  | 'speedChallenge'
  | 'tutorAI'
  | 'miniVideo'
  | 'ripassoAI'
  | 'heatmapErrori'
  | 'modalitaEsame'
  | 'erroriGravi';

export type StatoFunzione = 'live' | 'prossimamente';

export type Funzione = {
  id: IdFunzione;
  nome: string;
  descrizione: string;
  minimoTier: Tier;
  stato: StatoFunzione; // 'live' = costruita e funzionante oggi, 'prossimamente' = interfaccia pronta, in arrivo
};

// Elenco unico, mostrato in dashboard: definisce sia il minimo piano richiesto
// sia se la funzione è già costruita ("live") o solo interfaccia/architettura
// pronta ("prossimamente"). Aggiungere una funzione reale in futuro significa
// solo cambiare "stato" da 'prossimamente' a 'live': nessun altro file da
// toccare per la UI di sblocco.
export const FUNZIONI: Funzione[] = [
  { id: 'memoryGame', nome: 'Memory Game', descrizione: 'Abbina le coppie di flashcard a tempo.', minimoTier: 'starter', stato: 'live' },
  { id: 'speedChallenge', nome: 'Speed Challenge', descrizione: 'Quiz rapido a cronometro, per allenare i riflessi.', minimoTier: 'starter', stato: 'live' },
  { id: 'tutorAI', nome: 'Tutor AI', descrizione: 'Fai domande e ricevi spiegazioni su misura.', minimoTier: 'premium', stato: 'prossimamente' },
  { id: 'miniVideo', nome: 'Mini-video', descrizione: 'Brevi video di spiegazione per ogni argomento.', minimoTier: 'premium', stato: 'prossimamente' },
  { id: 'ripassoAI', nome: 'Ripasso intelligente', descrizione: 'Un ripasso costruito sui tuoi errori reali.', minimoTier: 'premium', stato: 'prossimamente' },
  { id: 'heatmapErrori', nome: 'Heatmap errori', descrizione: 'Dove sbagli di più, in un colpo d\'occhio.', minimoTier: 'premium', stato: 'prossimamente' },
  { id: 'modalitaEsame', nome: 'Modalità Esame', descrizione: 'Simulazione a tempo, identica al giorno vero.', minimoTier: 'premium', stato: 'prossimamente' },
  { id: 'erroriGravi', nome: 'Modalità Errori Gravi', descrizione: 'Ripasso mirato solo sugli errori che fanno bocciare.', minimoTier: 'pro', stato: 'prossimamente' },
];

export function funzioniSbloccate(tier: Tier): Funzione[] {
  return FUNZIONI.filter((f) => tierMaggioreOuguale(tier, f.minimoTier));
}

export function funzioniBloccate(tier: Tier): Funzione[] {
  return FUNZIONI.filter((f) => !tierMaggioreOuguale(tier, f.minimoTier));
}
