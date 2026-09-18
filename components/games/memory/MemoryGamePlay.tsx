'use client';

import { useEffect, useState } from 'react';
import { MemoryCard, type StatoCarta } from './MemoryCard';
import { useSuoni } from '@/lib/sounds';
import type { CoppiaMemory } from '@/lib/access';

type Carta = { id: string; pairId: string; testo: string; stato: StatoCarta };

function mescola<T>(arr: T[]): T[] {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

/**
 * Meccanica di gioco del Memory, senza chrome di pagina: usata dal Memory
 * dedicato di ogni livello (Fase 3). Usa tutte le coppie ricevute, senza
 * selezione di difficoltà (quella resta nel Memory Game generico standalone).
 */
export function MemoryGamePlay({ coppie, onCompletato }: { coppie: CoppiaMemory[]; onCompletato: (tempoSecondi: number, mosse: number) => void }) {
  const { play } = useSuoni();
  const [carte, setCarte] = useState<Carta[]>([]);
  const [girate, setGirate] = useState<string[]>([]);
  const [mosse, setMosse] = useState(0);
  const [bloccoInput, setBloccoInput] = useState(false);
  const [inizio] = useState(Date.now());
  const [completato, setCompletato] = useState(false);

  useEffect(() => {
    const mazzo: Carta[] = mescola(
      coppie.flatMap((c) => [
        { id: `${c.id}-a`, pairId: c.id, testo: c.fronte, stato: 'coperta' as StatoCarta },
        { id: `${c.id}-b`, pairId: c.id, testo: c.retro, stato: 'coperta' as StatoCarta },
      ])
    );
    setCarte(mazzo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function giraCarta(id: string) {
    if (bloccoInput || girate.length === 2) return;
    setCarte((prev) => prev.map((c) => (c.id === id ? { ...c, stato: 'girata' } : c)));
    const nuoveGirate = [...girate, id];
    setGirate(nuoveGirate);

    if (nuoveGirate.length === 2) {
      setMosse((m) => m + 1);
      const [primaId, secondaId] = nuoveGirate;
      const prima = carte.find((c) => c.id === primaId);
      const seconda = carte.find((c) => c.id === secondaId);
      setBloccoInput(true);

      if (prima && seconda && prima.pairId === seconda.pairId) {
        play('corretto');
        setTimeout(() => {
          setCarte((prev) => prev.map((c) => (c.pairId === prima.pairId ? { ...c, stato: 'trovata' } : c)));
          setGirate([]);
          setBloccoInput(false);
        }, 350);
      } else {
        play('errore');
        setTimeout(() => {
          setCarte((prev) => prev.map((c) => (c.id === primaId || c.id === secondaId ? { ...c, stato: 'coperta' } : c)));
          setGirate([]);
          setBloccoInput(false);
        }, 700);
      }
    }
  }

  useEffect(() => {
    if (carte.length === 0 || completato) return;
    if (carte.every((c) => c.stato === 'trovata')) {
      setCompletato(true);
      const tempo = Math.round((Date.now() - inizio) / 1000);
      play('vittoria');
      onCompletato(tempo, mosse);
    }
  }, [carte, completato, inizio, mosse, onCompletato, play]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[13px] text-ardesia">
        <span>Memory del livello</span>
        <span>Mosse: {mosse}</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {carte.map((c) => (
          <MemoryCard key={c.id} testo={c.testo} stato={c.stato} onClick={() => giraCarta(c.id)} />
        ))}
      </div>
    </div>
  );
}
