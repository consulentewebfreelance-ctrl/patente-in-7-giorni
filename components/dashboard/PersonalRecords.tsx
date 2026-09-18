'use client';

import { Brain, Flame, Gauge, Swords, Zap } from 'lucide-react';
import { useRecordGiochi } from '@/lib/gameRecords';
import type { Streak } from '@/lib/streak';

/** Classifica personale (Fase 2): record di Speed, Memory, Boss Fight e streak, tutti locali. */
export function PersonalRecords({ streak, xpTotale }: { streak: Streak; xpTotale: number }) {
  const { record } = useRecordGiochi();

  const voci = [
    { icona: Gauge, valore: record.speedMigliorPunteggio, etichetta: 'Miglior punteggio Speed' },
    { icona: Brain, valore: record.memoryMigliorTempo !== null ? `${record.memoryMigliorTempo}s` : '—', etichetta: 'Miglior tempo Memory' },
    { icona: Swords, valore: record.bossVinte, etichetta: 'Boss Fight vinte' },
    { icona: Flame, valore: streak.giorniConsecutivi, etichetta: 'Streak attuale' },
    { icona: Zap, valore: xpTotale, etichetta: 'XP totali' },
  ];

  return (
    <div>
      <h2 className="mb-3 font-display text-[16px] font-bold">I tuoi record</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {voci.map(({ icona: Icona, valore, etichetta }) => (
          <div key={etichetta} className="rounded-lg border border-asfalto/[0.06] bg-segnaletica p-3.5 text-center">
            <Icona className="mx-auto h-4 w-4 text-superato" strokeWidth={2} />
            <p className="mt-1.5 font-display text-[17px] font-bold">{valore}</p>
            <p className="text-[11px] leading-tight text-ardesia">{etichetta}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
