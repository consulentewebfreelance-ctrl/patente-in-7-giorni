'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'patente7giorni_calendario_esame_v1';

export type Urgenza = 'nessuna' | 'normale' | 'alta';
export type OpzioneGiorni = 3 | 7 | 14 | 30;

type CalendarioEsame = { impostatoIl: string; giorniScelti: OpzioneGiorni };

function leggi(): CalendarioEsame | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CalendarioEsame) : null;
  } catch {
    return null;
  }
}

/**
 * Calendario Esame (Fase 2): l'utente sceglie tra 3/7/14/30 giorni all'esame;
 * missioni e countdown si adattano di conseguenza (vedi lib/missions.ts).
 */
export function useCalendarioEsame() {
  const [calendario, setCalendario] = useState<CalendarioEsame | null>(null);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setCalendario(leggi());
    setPronto(true);
  }, []);

  function imposta(giorni: OpzioneGiorni) {
    const nuovo: CalendarioEsame = { impostatoIl: new Date().toISOString().slice(0, 10), giorniScelti: giorni };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nuovo));
    setCalendario(nuovo);
  }

  const giorniRimanenti = calendario
    ? Math.max(0, calendario.giorniScelti - Math.floor((Date.now() - Date.parse(calendario.impostatoIl)) / 86400000))
    : null;

  // "Urgenza" usata da lib/missions.ts per adattare il tipo di missioni proposte.
  const urgenza: Urgenza =
    giorniRimanenti === null ? 'nessuna' : giorniRimanenti <= 3 ? 'alta' : giorniRimanenti <= 10 ? 'normale' : 'nessuna';

  return { calendario, pronto, giorniRimanenti, urgenza, imposta };
}
