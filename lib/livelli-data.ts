// Metadati PUBBLICI dei 7 livelli: solo ciò che serve per liste, progress bar
// e pagine di marketing (id, titolo, icona, numero di domande). Il contenuto
// vero e proprio (lezione, trucco mnemonico, errori, flashcard, quiz) NON vive
// più qui: è servito solo dopo verifica dell'acquisto da
// netlify/functions/get-livello-content.ts, a partire dai dati in
// netlify/functions/_data/livelli-content.ts. Questo file può restare
// nel bundle pubblico del sito senza esporre nulla di valore.

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
  icona: 'segnali' | 'precedenze' | 'incroci' | 'velocita' | 'sorpassi' | 'ripasso' | 'finale';
  quizCount: number;
};

export const livelli: LivelloMeta[] = [
  { id: 'segnali', numero: 1, titolo: 'Segnali', icona: 'segnali', quizCount: 5 },
  { id: 'precedenze', numero: 2, titolo: 'Precedenze', icona: 'precedenze', quizCount: 3 },
  { id: 'incroci', numero: 3, titolo: 'Incroci', icona: 'incroci', quizCount: 3 },
  { id: 'velocita', numero: 4, titolo: 'Velocità', icona: 'velocita', quizCount: 3 },
  { id: 'sorpassi', numero: 5, titolo: 'Sorpassi', icona: 'sorpassi', quizCount: 3 },
  { id: 'ripasso', numero: 6, titolo: 'Ripasso', icona: 'ripasso', quizCount: 3 },
  { id: 'finale', numero: 7, titolo: 'Simulazione finale', icona: 'finale', quizCount: 5 },
];

export function getLivelloById(id: string): LivelloMeta | undefined {
  return livelli.find((l) => l.id === id);
}

export function getProssimoLivelloId(id: string): string | undefined {
  const index = livelli.findIndex((l) => l.id === id);
  if (index === -1 || index === livelli.length - 1) return undefined;
  return livelli[index + 1].id;
}
