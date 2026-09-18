'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Urgenza } from './examCalendar';

const STORAGE_PREFIX = 'patente7giorni_missioni_';

export type TipoMissione = 'lezione' | 'quiz' | 'flashcard' | 'memory' | 'speed' | 'boss';

export type Missione = {
  id: TipoMissione;
  titolo: string;
  descrizione: string;
  xp: number;
  target: number;
};

const CATALOGO: Record<TipoMissione, Missione> = {
  lezione: { id: 'lezione', titolo: 'Completa una lezione', descrizione: 'Apri un livello e leggi la lezione.', xp: 50, target: 1 },
  quiz: { id: 'quiz', titolo: 'Rispondi a 5 domande', descrizione: 'Rispondi correttamente a 5 domande, in qualsiasi quiz.', xp: 40, target: 5 },
  flashcard: { id: 'flashcard', titolo: 'Ripassa 10 flashcard', descrizione: 'Sfoglia 10 flashcard, in qualsiasi livello.', xp: 20, target: 10 },
  memory: { id: 'memory', titolo: 'Gioca una partita a Memory', descrizione: 'Completa una partita al Memory Game.', xp: 35, target: 1 },
  speed: { id: 'speed', titolo: 'Completa una Speed Challenge', descrizione: 'Finisci una sessione di Speed Challenge.', xp: 45, target: 1 },
  boss: { id: 'boss', titolo: 'Vinci una Boss Fight', descrizione: 'Supera una Boss Fight con al massimo un errore.', xp: 100, target: 1 },
};

function oggiISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Selezione deterministica (stesso giorno = stesse missioni) con piccola influenza dall'urgenza esame. */
function seleziona3(seed: string, urgenza: Urgenza): TipoMissione[] {
  const ordineBase: TipoMissione[] =
    urgenza === 'alta'
      ? ['boss', 'speed', 'quiz', 'memory', 'flashcard', 'lezione']
      : urgenza === 'normale'
        ? ['quiz', 'speed', 'boss', 'memory', 'flashcard', 'lezione']
        : ['lezione', 'quiz', 'flashcard', 'memory', 'speed', 'boss'];

  // Hash semplice e deterministico della data, per variare leggermente l'ordine giorno per giorno.
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  const rotazione = hash % ordineBase.length;
  const ruotato = [...ordineBase.slice(rotazione), ...ordineBase.slice(0, rotazione)];
  return ruotato.slice(0, 3);
}

type ProgressoGiornaliero = Partial<Record<TipoMissione, number>>;
type RiscattiGiornalieri = Partial<Record<TipoMissione, boolean>>;

function leggiProgresso(giorno: string): ProgressoGiornaliero {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + giorno);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function scriviProgresso(giorno: string, progresso: ProgressoGiornaliero) {
  window.localStorage.setItem(STORAGE_PREFIX + giorno, JSON.stringify(progresso));
}

function leggiRiscatti(giorno: string): RiscattiGiornalieri {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + 'riscatti_' + giorno);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function scriviRiscatti(giorno: string, riscatti: RiscattiGiornalieri) {
  window.localStorage.setItem(STORAGE_PREFIX + 'riscatti_' + giorno, JSON.stringify(riscatti));
}

/** Segna il premio di una missione come riscattato oggi (chiamare INSIEME a aggiungiXPBonus, mai al posto). */
export function segnaPremioRiscattato(tipo: TipoMissione) {
  const giorno = oggiISO();
  const riscatti = leggiRiscatti(giorno);
  riscatti[tipo] = true;
  scriviRiscatti(giorno, riscatti);
  window.dispatchEvent(new Event('patente7-missioni-aggiornate'));
}

/** Incrementa il progresso di una missione per l'utente, se attiva oggi. Da chiamare nei punti di interazione reali. */
export function registraProgressoMissione(tipo: TipoMissione, incremento = 1) {
  if (typeof window === 'undefined') return;
  const giorno = oggiISO();
  const progresso = leggiProgresso(giorno);
  progresso[tipo] = Math.min(CATALOGO[tipo].target, (progresso[tipo] ?? 0) + incremento);
  scriviProgresso(giorno, progresso);
  window.dispatchEvent(new Event('patente7-missioni-aggiornate'));
}

export type MissioneConStato = Missione & { fatto: number; completata: boolean; riscattata: boolean };

/** Le 3 missioni di oggi, con il progresso reale dell'utente e lo stato di riscatto del premio. */
export function useMissioniGiornaliere(urgenza: Urgenza) {
  const [missioni, setMissioni] = useState<MissioneConStato[]>([]);

  const aggiorna = useCallback(() => {
    const giorno = oggiISO();
    const tipi = seleziona3(giorno, urgenza);
    const progresso = leggiProgresso(giorno);
    const riscatti = leggiRiscatti(giorno);
    setMissioni(
      tipi.map((tipo) => {
        const m = CATALOGO[tipo];
        const fatto = progresso[tipo] ?? 0;
        return { ...m, fatto, completata: fatto >= m.target, riscattata: Boolean(riscatti[tipo]) };
      })
    );
  }, [urgenza]);

  useEffect(() => {
    aggiorna();
    window.addEventListener('patente7-missioni-aggiornate', aggiorna);
    return () => window.removeEventListener('patente7-missioni-aggiornate', aggiorna);
  }, [aggiorna]);

  return missioni;
}
