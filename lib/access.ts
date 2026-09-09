'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Domanda, Flashcard } from './livelli-data';

const STORAGE_KEY = 'patente7giorni_accesso_v1';
const RINNOVA_SE_MANCANO_MENO_DI_MS = 3 * 24 * 60 * 60 * 1000; // rinnova entro 3 giorni dalla scadenza

export type LivelloContenuto = {
  id: string;
  numero: number;
  titolo: string;
  icona: string;
  lezione: string;
  truccoMnemonico: string;
  erroriFrequenti: string[];
  flashcard: Flashcard[];
  quiz: Domanda[];
};

type Accesso = { sessionId: string; token: string; exp: number };

function leggi(): Accesso | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Accesso) : null;
  } catch {
    return null;
  }
}

function scrivi(accesso: Accesso) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(accesso));
}

function rimuovi() {
  window.localStorage.removeItem(STORAGE_KEY);
}

async function verificaSessione(sessionId: string): Promise<Accesso | null> {
  try {
    const res = await fetch(`/api/verify-purchase?session_id=${encodeURIComponent(sessionId)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.valid || !data.token) return null;
    // Il token porta già scadenza ed è firmato dal server: qui ci fidiamo del
    // solo campo "exp" per sapere quando rinnovare, senza decodificarlo.
    const scadenza = Date.now() + 30 * 24 * 60 * 60 * 1000;
    return { sessionId, token: data.token, exp: scadenza };
  } catch {
    return null;
  }
}

/** Pagina /successo: verifica il session_id tornato da Stripe e salva l'accesso. */
export function useConvalidaAcquisto(sessionId: string | null) {
  const [stato, setStato] = useState<'in-corso' | 'valido' | 'non-valido'>('in-corso');

  useEffect(() => {
    let annullato = false;
    if (!sessionId) {
      setStato('non-valido');
      return;
    }
    verificaSessione(sessionId).then((accesso) => {
      if (annullato) return;
      if (accesso) {
        scrivi(accesso);
        setStato('valido');
      } else {
        setStato('non-valido');
      }
    });
    return () => {
      annullato = true;
    };
  }, [sessionId]);

  return stato;
}

/** Pagine della dashboard: reindirizza alla home se manca un accesso valido. */
export function useRichiedeAcquisto() {
  const router = useRouter();
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let annullato = false;

    async function controlla() {
      const accesso = leggi();
      if (!accesso) {
        router.replace('/');
        return;
      }
      if (Date.now() > accesso.exp) {
        // Token scaduto (30gg): ri-verifica con Stripe usando la stessa sessione.
        const rinnovato = await verificaSessione(accesso.sessionId);
        if (annullato) return;
        if (rinnovato) {
          scrivi(rinnovato);
          setPronto(true);
        } else {
          rimuovi();
          router.replace('/');
        }
        return;
      }
      if (accesso.exp - Date.now() < RINNOVA_SE_MANCANO_MENO_DI_MS) {
        // Rinnovo silenzioso in background, non blocca la visualizzazione.
        verificaSessione(accesso.sessionId).then((rinnovato) => {
          if (rinnovato) scrivi(rinnovato);
        });
      }
      setPronto(true);
    }

    controlla();
    return () => {
      annullato = true;
    };
  }, [router]);

  return pronto;
}

/** Pagina di un livello: richiede l'accesso, poi carica il contenuto protetto. */
export function useLivelloProtetto(id: string) {
  const router = useRouter();
  const [stato, setStato] = useState<'verifica' | 'carica' | 'pronto' | 'errore'>('verifica');
  const [livello, setLivello] = useState<LivelloContenuto | null>(null);

  useEffect(() => {
    let annullato = false;

    async function esegui() {
      const accesso = leggi();
      if (!accesso) {
        router.replace('/');
        return;
      }

      let tokenValido = accesso.token;
      if (Date.now() > accesso.exp) {
        const rinnovato = await verificaSessione(accesso.sessionId);
        if (annullato) return;
        if (!rinnovato) {
          rimuovi();
          router.replace('/');
          return;
        }
        scrivi(rinnovato);
        tokenValido = rinnovato.token;
      }

      setStato('carica');
      try {
        const res = await fetch(`/api/get-livello-content?token=${encodeURIComponent(tokenValido)}&id=${encodeURIComponent(id)}`, {
          cache: 'no-store',
        });
        if (annullato) return;
        if (res.status === 401) {
          rimuovi();
          router.replace('/');
          return;
        }
        if (!res.ok) {
          setStato('errore');
          return;
        }
        const data = await res.json();
        setLivello(data.livello);
        setStato('pronto');
      } catch {
        if (!annullato) setStato('errore');
      }
    }

    esegui();
    return () => {
      annullato = true;
    };
  }, [id, router]);

  return { stato, livello };
}
