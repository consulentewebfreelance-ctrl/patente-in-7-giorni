'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRightCircle, Check, Flag, Gauge, Lock, MapPin, ShieldCheck, Sparkles, TrafficCone } from 'lucide-react';
import { UpgradeModal } from './UpgradeModal';
import { StarsRating } from './StarsRating';
import { cn } from '@/lib/utils';
import type { LivelloMeta } from '@/lib/livelli-data';
import type { Progresso } from '@/lib/xp';
import { puoAccedereASimulazioneFinale, type Tier } from '@/lib/tiers';

const ICONE: Record<LivelloMeta['icona'], typeof TrafficCone> = {
  segnali: TrafficCone,
  precedenze: ArrowRightCircle,
  velocita: Gauge,
  sorpassi: AlertTriangle,
  parcheggi: MapPin,
  sicurezza: ShieldCheck,
  esame: Flag,
};

// Posizione orizzontale alternata dei nodi, per il tipico effetto "sentiero" a zig-zag.
const ALLINEAMENTO = ['justify-center', 'justify-end', 'justify-center', 'justify-start'];

/** Mappa dei livelli stile Duolingo (Fase 3): ogni nodo mostra stato, stelle, lucchetto. */
export function LevelMap({ livelli, progresso, tier }: { livelli: LivelloMeta[]; progresso: Progresso; tier: Tier }) {
  const [modaleAperta, setModaleAperta] = useState(false);

  return (
    <div className="flex flex-col">
      {livelli.map((livello, i) => {
        const statoLivello = progresso.livelli[livello.id];
        const stato = statoLivello?.stato ?? 'bloccato';
        const stelle = statoLivello?.stelle ?? 0;
        const bloccatoDaPiano = livello.id === 'esame' && !puoAccedereASimulazioneFinale(tier);
        const bloccatoDaProgresso = stato === 'bloccato';
        const bloccato = bloccatoDaProgresso || bloccatoDaPiano;
        const Icona = ICONE[livello.icona];

        const nodo = (
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                'flex h-16 w-16 items-center justify-center rounded-full border-[3px] shadow-md transition-transform duration-200',
                stato === 'completato' && 'border-superato bg-superato/10 text-superato',
                stato === 'in-corso' && 'border-segnale bg-segnale/10 text-segnale',
                bloccatoDaPiano && 'border-segnale/40 bg-segnale/[0.06] text-segnale',
                bloccatoDaProgresso && 'border-nebbia bg-nebbia text-ardesia/50',
                !bloccato && 'hover:scale-105 active:scale-95'
              )}
            >
              {bloccato ? <Lock className="h-6 w-6" /> : stato === 'completato' ? <Check className="h-7 w-7" /> : <Icona className="h-7 w-7" strokeWidth={2} />}
            </div>
            <span className={cn('max-w-[96px] text-center text-[12px] font-bold leading-tight', bloccato ? 'text-ardesia/60' : 'text-asfalto')}>
              {livello.titolo}
            </span>
            {stato === 'completato' && stelle > 0 && <StarsRating stelle={stelle} dimensione={14} />}
          </div>
        );

        return (
          <div key={livello.id} className={cn('flex px-4', ALLINEAMENTO[i % ALLINEAMENTO.length])}>
            <div className="flex flex-col items-center">
              {i > 0 && <div className="h-6 w-[3px] bg-nebbia" aria-hidden />}
              {bloccatoDaPiano ? (
                <button onClick={() => setModaleAperta(true)} aria-label={`${livello.titolo} — Premium`}>
                  {nodo}
                </button>
              ) : bloccato ? (
                <div aria-disabled>{nodo}</div>
              ) : (
                <Link href={`/dashboard/livello/${livello.id}`} aria-label={livello.titolo}>
                  {nodo}
                </Link>
              )}
              {bloccatoDaPiano && (
                <span className="mt-1 flex items-center gap-1 text-[10px] font-medium text-segnale">
                  <Sparkles className="h-3 w-3" /> Premium
                </span>
              )}
            </div>
          </div>
        );
      })}

      <UpgradeModal aperto={modaleAperta} onChiudi={() => setModaleAperta(false)} richiedePiano="premium" />
    </div>
  );
}
