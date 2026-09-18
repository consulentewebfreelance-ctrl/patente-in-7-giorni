// Metadati PUBBLICI dei 7 livelli: solo ciò che serve per liste, mappa,
// progress bar e pagine di marketing (id, titolo, icona, numero di domande).
// Il contenuto vero e proprio (introduzione, lezione a blocchi, segnali,
// flashcard, quiz, boss) NON vive più qui: è servito solo dopo verifica
// dell'acquisto da app/api/get-livello-content.ts, a partire dai dati in
// lib/server/livelli-content.ts. Questo file può restare nel bundle
// pubblico del sito senza esporre nulla di valore.

export type Domanda = {
  domanda: string;
  risposte: [string, string, string];
  corretta: 0 | 1 | 2;
  spiegazione: string;
  erroreComune: string;
};

export type Flashcard = {
  fronte: string;
  retro: string;
};

export type LivelloMeta = {
  id: string;
  numero: number;
  titolo: string;
  icona: 'segnali' | 'precedenze' | 'velocita' | 'sorpassi' | 'parcheggi' | 'sicurezza' | 'esame';
  quizCount: number;
};

export const livelli: LivelloMeta[] = [
  { id: 'segnali', numero: 1, titolo: 'Segnali di Pericolo', icona: 'segnali', quizCount: 4 },
  { id: 'precedenze', numero: 2, titolo: 'Precedenze', icona: 'precedenze', quizCount: 4 },
  { id: 'velocita', numero: 3, titolo: 'Velocità', icona: 'velocita', quizCount: 4 },
  { id: 'sorpassi', numero: 4, titolo: 'Sorpassi', icona: 'sorpassi', quizCount: 4 },
  { id: 'parcheggi', numero: 5, titolo: 'Parcheggi', icona: 'parcheggi', quizCount: 4 },
  { id: 'sicurezza', numero: 6, titolo: 'Sicurezza', icona: 'sicurezza', quizCount: 4 },
  { id: 'esame', numero: 7, titolo: 'Preparazione Esame', icona: 'esame', quizCount: 6 },
];

export function getLivelloById(id: string): LivelloMeta | undefined {
  return livelli.find((l) => l.id === id);
}

export function getProssimoLivelloId(id: string): string | undefined {
  const index = livelli.findIndex((l) => l.id === id);
  if (index === -1 || index === livelli.length - 1) return undefined;
  return livelli[index + 1].id;
}
