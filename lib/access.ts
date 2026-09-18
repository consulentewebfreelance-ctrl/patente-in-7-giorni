'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Domanda, Flashcard } from './livelli-data';
import type { BloccoLezione, Segnale } from './livelli-content-shared';
import type { Tier } from './tiers';

const STORAGE_KEY = 'patente7giorni_accesso_v2';
const RINNOVA_SE_MANCANO_MENO_DI_MS = 3 * 24 * 60 * 60 * 1000; // rinnova entro 3 giorni dalla scadenza

export type LivelloContenuto = {
  id: string;
  numero: number;
  titolo: string;
  icona: string;
  testoMotivazionale: string;
  tempoStimatoMinuti: number;
  xpOttenibili: number;
  badge: string;
  bossNome: string;
  bossDescrizione: string;
  blocchiLezione: BloccoLezione[];
  segnali: Segnale[];
  truccoMnemonico: string;
  erroriFrequenti: string[];
  flashcard: Flashcard[];
  quiz: Domanda[];
};

type Accesso = { sessionId: string; token: string; tier: Tier; exp: number };

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
    if (!data.valid || !data.token || !data.tier) return null;
    const scadenza = Date.now() + 30 * 24 * 60 * 60 * 1000;
    return { sessionId, token: data.token, tier: data.tier, exp: scadenza };
  } catch {
    return null;
  }
}

/** Pagina /successo: verifica il session_id tornato da Stripe e salva l'accesso (con piano). */
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

/** Pagine della dashboard: reindirizza alla home se manca un accesso valido. Espone anche il piano. */
export function useRichiedeAcquisto() {
  const router = useRouter();
  const [pronto, setPronto] = useState(false);
  const [tier, setTier] = useState<Tier | null>(null);

  useEffect(() => {
    let annullato = false;

    async function controlla() {
      const accesso = leggi();
      if (!accesso) {
        router.replace('/');
        return;
      }
      if (Date.now() > accesso.exp) {
        const rinnovato = await verificaSessione(accesso.sessionId);
        if (annullato) return;
        if (rinnovato) {
          scrivi(rinnovato);
          setTier(rinnovato.tier);
          setPronto(true);
        } else {
          rimuovi();
          router.replace('/');
        }
        return;
      }
      if (accesso.exp - Date.now() < RINNOVA_SE_MANCANO_MENO_DI_MS) {
        verificaSessione(accesso.sessionId).then((rinnovato) => {
          if (rinnovato) scrivi(rinnovato);
        });
      }
      setTier(accesso.tier);
      setPronto(true);
    }

    controlla();
    return () => {
      annullato = true;
    };
  }, [router]);

  return { pronto, tier };
}

/** Pagina di un livello: richiede l'accesso, poi carica il contenuto protetto (già filtrato per piano). */
export function useLivelloProtetto(id: string) {
  const router = useRouter();
  const [stato, setStato] = useState<'verifica' | 'carica' | 'pronto' | 'upgrade-richiesto' | 'errore'>('verifica');
  const [livello, setLivello] = useState<LivelloContenuto | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);

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
        setTier(rinnovato.tier);
      } else {
        setTier(accesso.tier);
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
        if (res.status === 403) {
          setStato('upgrade-richiesto');
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

  return { stato, livello, tier };
}

/** Selezione livello per il Memory Game: elenco delle categorie giocabili per il piano attuale. */
export function useMemoryLivelli() {
  const router = useRouter();
  const [stato, setStato] = useState<'carica' | 'pronto' | 'errore'>('carica');
  const [elenco, setElenco] = useState<{ id: string; titolo: string }[]>([]);
  const [tier, setTier] = useState<Tier | null>(null);

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
        setTier(rinnovato.tier);
      } else {
        setTier(accesso.tier);
      }

      try {
        const res = await fetch(`/api/get-memory-content?token=${encodeURIComponent(tokenValido)}`, { cache: 'no-store' });
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
        setElenco(data.livelli);
        setStato('pronto');
      } catch {
        if (!annullato) setStato('errore');
      }
    }

    esegui();
    return () => {
      annullato = true;
    };
  }, [router]);

  return { stato, elenco, tier };
}

export type CoppiaMemory = { id: string; fronte: string; retro: string };

/** Contenuto (coppie fronte/retro) di una specifica categoria del Memory Game. */
export function useMemoryContenuto(id: string | null) {
  const router = useRouter();
  const [stato, setStato] = useState<'verifica' | 'pronto' | 'upgrade-richiesto' | 'errore'>('verifica');
  const [titolo, setTitolo] = useState('');
  const [coppie, setCoppie] = useState<CoppiaMemory[]>([]);

  useEffect(() => {
    if (!id) return;
    const livelloId = id;
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

      try {
        const res = await fetch(`/api/get-memory-content?token=${encodeURIComponent(tokenValido)}&id=${encodeURIComponent(livelloId)}`, {
          cache: 'no-store',
        });
        if (annullato) return;
        if (res.status === 401) {
          rimuovi();
          router.replace('/');
          return;
        }
        if (res.status === 403) {
          setStato('upgrade-richiesto');
          return;
        }
        if (!res.ok) {
          setStato('errore');
          return;
        }
        const data = await res.json();
        setTitolo(data.titolo);
        setCoppie(data.coppie);
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

  return { stato, titolo, coppie };
}

export type DomandaSpeed = Domanda & { id: string };

/** Pool di domande per una sessione di Speed Challenge, già filtrato per piano. Se livelloId è dato, pesca solo da quel livello. */
export function useSpeedQuestions(livelloId?: string) {
  const router = useRouter();
  const [stato, setStato] = useState<'carica' | 'pronto' | 'errore'>('carica');
  const [domande, setDomande] = useState<DomandaSpeed[]>([]);

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

      try {
        const parametroLivello = livelloId ? `&livelloId=${encodeURIComponent(livelloId)}` : '';
        const res = await fetch(`/api/get-speed-questions?token=${encodeURIComponent(tokenValido)}${parametroLivello}`, { cache: 'no-store' });
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
        setDomande(data.domande);
        setStato('pronto');
      } catch {
        if (!annullato) setStato('errore');
      }
    }

    esegui();
    return () => {
      annullato = true;
    };
  }, [router, livelloId]);

  return { stato, domande };
}
