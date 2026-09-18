'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'patente7giorni_checkpoint_v1';

export type FaseLivello = 'lezione' | 'segnali' | 'flashcard' | 'memory' | 'speed' | 'quiz' | 'boss' | 'completato';

const ETICHETTA_FASE: Record<FaseLivello, string> = {
  lezione: 'Lezione',
  segnali: 'Segnali',
  flashcard: 'Flashcard',
  memory: 'Memory',
  speed: 'Speed Challenge',
  quiz: 'Quiz',
  boss: 'Boss Fight',
  completato: 'Completato',
};

export function etichettaFase(fase: FaseLivello): string {
  return ETICHETTA_FASE[fase];
}

type Mappa = Record<string, FaseLivello>;

function leggiTutto(): Mappa {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function scriviTutto(m: Mappa) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
}

/**
 * Checkpoint per livello (Fase 3): se l'utente esce a metà, riprende dalla
 * fase raggiunta invece che dall'introduzione. Usato anche dalla dashboard
 * per il banner "Riprendi dal Livello X".
 */
export function useCheckpoint(livelloId: string) {
  const [fase, setFase] = useState<FaseLivello | null>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const mappa = leggiTutto();
    setFase(mappa[livelloId] ?? null);
    setPronto(true);
  }, [livelloId]);

  function segnaFase(nuovaFase: FaseLivello) {
    const mappa = leggiTutto();
    mappa[livelloId] = nuovaFase;
    scriviTutto(mappa);
    setFase(nuovaFase);
  }

  function azzera() {
    const mappa = leggiTutto();
    delete mappa[livelloId];
    scriviTutto(mappa);
    setFase(null);
  }

  return { fase, pronto, segnaFase, azzera };
}

/** Legge il checkpoint più recente su QUALSIASI livello, per il banner "Riprendi da dove eri rimasto" in dashboard. */
export function useUltimoCheckpoint(): { livelloId: string; fase: FaseLivello } | null {
  const [ultimo, setUltimo] = useState<{ livelloId: string; fase: FaseLivello } | null>(null);

  useEffect(() => {
    const mappa = leggiTutto();
    const ids = Object.keys(mappa).filter((id) => mappa[id] !== 'completato');
    if (ids.length === 0) {
      setUltimo(null);
      return;
    }
    const livelloId = ids[ids.length - 1];
    setUltimo({ livelloId, fase: mappa[livelloId] });
  }, []);

  return ultimo;
}
