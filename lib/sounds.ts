'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'patente7giorni_suoni_attivi_v1';

export type TipoSuono = 'corretto' | 'errore' | 'badge' | 'vittoria';

type FinestraConWebkit = Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };

const CONFIGURAZIONI: Record<TipoSuono, { frequenze: number[]; durata: number; tipo: OscillatorType }> = {
  corretto: { frequenze: [880], durata: 0.12, tipo: 'sine' },
  errore: { frequenze: [220], durata: 0.18, tipo: 'sawtooth' },
  badge: { frequenze: [660, 880], durata: 0.28, tipo: 'triangle' },
  vittoria: { frequenze: [523, 659, 784], durata: 0.45, tipo: 'triangle' },
};

// Placeholder sonori generati al volo con la Web Audio API: toni brevi e
// distinti per ciascun evento, senza alcun file audio da produrre o caricare.
// Pronti per essere sostituiti in futuro con veri effetti sonori: basta
// cambiare l'implementazione di questa funzione, l'API (play('corretto'), ecc.)
// resta identica.
function suona(tipo: TipoSuono) {
  if (typeof window === 'undefined') return;
  const AudioContextClass = window.AudioContext || (window as FinestraConWebkit).webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const oscillatore = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillatore.connect(gain);
  gain.connect(ctx.destination);

  const { frequenze, durata, tipo: formaOnda } = CONFIGURAZIONI[tipo];
  oscillatore.type = formaOnda;
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);

  frequenze.forEach((freq, i) => {
    oscillatore.frequency.setValueAtTime(freq, ctx.currentTime + i * (durata / frequenze.length));
  });
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durata);

  oscillatore.start(ctx.currentTime);
  oscillatore.stop(ctx.currentTime + durata + 0.05);
  oscillatore.onended = () => ctx.close();
}

/** Hook per riprodurre i suoni dell'app, con toggle persistente (Masterplan 2.0 — Fase 2: "tutti disattivabili"). */
export function useSuoni() {
  const [attivi, setAttivi] = useState(true);

  useEffect(() => {
    const salvato = window.localStorage.getItem(STORAGE_KEY);
    if (salvato !== null) setAttivi(salvato === 'true');
  }, []);

  const toggle = useCallback(() => {
    setAttivi((prev) => {
      const nuovo = !prev;
      window.localStorage.setItem(STORAGE_KEY, String(nuovo));
      return nuovo;
    });
  }, []);

  const play = useCallback(
    (tipo: TipoSuono) => {
      if (attivi) suona(tipo);
    },
    [attivi]
  );

  return { attivi, toggle, play };
}
