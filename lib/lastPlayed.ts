'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'patente7giorni_ultimo_livello_v1';

function leggi(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

/** Traccia l'ultimo livello aperto (Fase 9: "ultimo livello giocato"). */
export function useUltimoLivello() {
  const [ultimoLivelloId, setUltimoLivelloId] = useState<string | null>(null);

  useEffect(() => {
    setUltimoLivelloId(leggi());
  }, []);

  return ultimoLivelloId;
}

/** Da chiamare quando l'utente apre un livello, per registrarlo come "ultimo giocato". */
export function registraLivelloGiocato(id: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, id);
}
