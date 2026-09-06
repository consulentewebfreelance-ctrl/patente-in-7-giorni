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
