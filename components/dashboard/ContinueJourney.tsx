'use client';

import { PlayCircle } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { useUltimoCheckpoint, etichettaFase } from '@/lib/checkpoints';
import { livelli } from '@/lib/livelli-data';

/** Banner "riprendi da dove eri rimasto" (Fase 3), mostrato in cima alla dashboard se c'è un livello a metà. */
export function ContinueJourney() {
  const ultimo = useUltimoCheckpoint();
  if (!ultimo) return null;

  const livello = livelli.find((l) => l.id === ultimo.livelloId);
  if (!livello) return null;

  return (
    <div className="flex items-center gap-4 rounded-lg border border-segnale/30 bg-segnale/[0.05] p-4">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-segnale/10 text-segnale">
        <PlayCircle className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-ardesia">Riprendi da dove eri rimasto</p>
        <p className="font-display text-[15px] font-bold text-asfalto">
          Livello {livello.numero} — {livello.titolo} · {etichettaFase(ultimo.fase)}
        </p>
      </div>
      <ButtonLink href={`/dashboard/livello/${livello.id}`} className="h-[40px] px-4 text-[14px]">
        Continua
      </ButtonLink>
    </div>
  );
}
