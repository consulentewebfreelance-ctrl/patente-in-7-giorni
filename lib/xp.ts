'use client';

import { useCallback, useEffect, useState } from 'react';
import { livelli } from './livelli-data';

const STORAGE_KEY = 'patente7giorni_progresso_v1';

export type StatoLivello = 'bloccato' | 'in-corso' | 'completato';

export type ProgressoLivello = {
  stato: StatoLivello;
  xp: number;
  domandeCorrette: number[];
};

export type Progresso = {
  xpTotale: number;
  livelli: Record<string, ProgressoLivello>;
};

function statoIniziale(): Progresso {
  const mappa: Record<string, ProgressoLivello> = {};
  livelli.forEach((livello, index) => {
    mappa[livello.id] = {
      stato: index === 0 ? 'in-corso' : 'bloccato',
      xp: 0,
      domandeCorrette: [],
    };
  });
  return { xpTotale: 0, livelli: mappa };
}

function leggiDalLocalStorage(): Progresso {
  if (typeof window === 'undefined') return statoIniziale();
  try {
    const salvato = window.localStorage.getItem(STORAGE_KEY);
    if (!salvato) return statoIniziale();
    const parsed = JSON.parse(salvato) as Progresso;
    // Verifica minima di integrità: se manca un livello noto, ricostruisce da zero
    // per evitare crash se lib/livelli-data.ts viene aggiornato in futuro.
    const idsAttuali = livelli.map((l) => l.id);
    const idsSalvati = Object.keys(parsed.livelli ?? {});
    const compatibile = idsAttuali.every((id) => idsSalvati.includes(id));
    return compatibile ? parsed : statoIniziale();
  } catch {
    return statoIniziale();
  }
}

function scriviSuLocalStorage(progresso: Progresso) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progresso));
}

/**
 * Hook client-side per leggere e aggiornare il progresso dello studente.
 * Nessun backend: tutto è salvato in localStorage sul dispositivo.
 *
 * Regole XP (vedi brief Fase 3):
 * - risposta corretta al quiz: +10 XP
 * - livello completato: +50 XP
 */
export function useProgresso() {
  const [progresso, setProgresso] = useState<Progresso>(statoIniziale);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    setProgresso(leggiDalLocalStorage());
    setPronto(true);
  }, []);

  const registraRispostaCorretta = useCallback((livelloId: string, indiceDomanda: number) => {
    setProgresso((prev) => {
      const livelloPrec = prev.livelli[livelloId];
      if (!livelloPrec || livelloPrec.domandeCorrette.includes(indiceDomanda)) {
        return prev; // XP già assegnato per questa domanda, evita duplicati
      }
      const livelloAgg: ProgressoLivello = {
        ...livelloPrec,
        xp: livelloPrec.xp + 10,
        domandeCorrette: [...livelloPrec.domandeCorrette, indiceDomanda],
      };
      const nuovo: Progresso = {
        xpTotale: prev.xpTotale + 10,
        livelli: { ...prev.livelli, [livelloId]: livelloAgg },
      };
      scriviSuLocalStorage(nuovo);
      return nuovo;
    });
  }, []);

  const completaLivello = useCallback((livelloId: string, prossimoLivelloId?: string) => {
    setProgresso((prev) => {
      const livelloPrec = prev.livelli[livelloId];
      if (!livelloPrec || livelloPrec.stato === 'completato') return prev;

      const livelliAgg: Record<string, ProgressoLivello> = {
        ...prev.livelli,
        [livelloId]: { ...livelloPrec, stato: 'completato', xp: livelloPrec.xp + 50 },
      };

      if (prossimoLivelloId && livelliAgg[prossimoLivelloId]?.stato === 'bloccato') {
        livelliAgg[prossimoLivelloId] = { ...livelliAgg[prossimoLivelloId], stato: 'in-corso' };
      }

      const nuovo: Progresso = { xpTotale: prev.xpTotale + 50, livelli: livelliAgg };
      scriviSuLocalStorage(nuovo);
      return nuovo;
    });
  }, []);

  const reset = useCallback(() => {
    const nuovo = statoIniziale();
    scriviSuLocalStorage(nuovo);
    setProgresso(nuovo);
  }, []);

  return { progresso, pronto, registraRispostaCorretta, completaLivello, reset };
}
