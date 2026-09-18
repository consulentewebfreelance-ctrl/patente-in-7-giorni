'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'patente7giorni_record_v1';

export type RecordGiochi = {
  speedMigliorPunteggio: number; // risposte corrette su 20
  speedMiglioreCombo: number;
  memoryMigliorTempo: number | null; // secondi, null = mai completato
  memoryMigliorMosse: number | null;
  partiteMemory: number;
  partiteSpeed: number;
  bossVinte: number;
  bossPerfette: number; // boss fight vinte con zero errori (non solo <= 1)
};

const VUOTO: RecordGiochi = {
  speedMigliorPunteggio: 0,
  speedMiglioreCombo: 0,
  memoryMigliorTempo: null,
  memoryMigliorMosse: null,
  partiteMemory: 0,
  partiteSpeed: 0,
  bossVinte: 0,
  bossPerfette: 0,
};

function leggi(): RecordGiochi {
  if (typeof window === 'undefined') return VUOTO;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...VUOTO, ...JSON.parse(raw) } : VUOTO;
  } catch {
    return VUOTO;
  }
}

function scrivi(record: RecordGiochi) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

/** Record personali di Memory, Speed Challenge e Boss Fight (Fase 2: "Classifica personale"). */
export function useRecordGiochi() {
  const [record, setRecord] = useState<RecordGiochi>(VUOTO);

  useEffect(() => {
    setRecord(leggi());
  }, []);

  function registraSpeed(punteggio: number, miglioreCombo: number) {
    setRecord((prev) => {
      const nuovo: RecordGiochi = {
        ...prev,
        speedMigliorPunteggio: Math.max(prev.speedMigliorPunteggio, punteggio),
        speedMiglioreCombo: Math.max(prev.speedMiglioreCombo, miglioreCombo),
        partiteSpeed: prev.partiteSpeed + 1,
      };
      scrivi(nuovo);
      return nuovo;
    });
  }

  function registraMemory(tempoSecondi: number, mosse: number) {
    setRecord((prev) => {
      const nuovo: RecordGiochi = {
        ...prev,
        memoryMigliorTempo: prev.memoryMigliorTempo === null ? tempoSecondi : Math.min(prev.memoryMigliorTempo, tempoSecondi),
        memoryMigliorMosse: prev.memoryMigliorMosse === null ? mosse : Math.min(prev.memoryMigliorMosse, mosse),
        partiteMemory: prev.partiteMemory + 1,
      };
      scrivi(nuovo);
      return nuovo;
    });
  }

  function registraBossVinta(perfetta: boolean) {
    setRecord((prev) => {
      const nuovo: RecordGiochi = {
        ...prev,
        bossVinte: prev.bossVinte + 1,
        bossPerfette: prev.bossPerfette + (perfetta ? 1 : 0),
      };
      scrivi(nuovo);
      return nuovo;
    });
  }

  return { record, registraSpeed, registraMemory, registraBossVinta };
}
