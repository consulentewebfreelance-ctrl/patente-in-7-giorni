'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRightCircle, Flag, Gauge, Lock, MapPin, ShieldCheck, Sparkles, TrafficCone } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { UpgradeModal } from './UpgradeModal';
import { cn } from '@/lib/utils';
import type { LivelloMeta } from '@/lib/livelli-data';
import type { StatoLivello } from '@/lib/xp';

const icone: Record<LivelloMeta['icona'], typeof TrafficCone> = {
  segnali: TrafficCone,
  precedenze: ArrowRightCircle,
  velocita: Gauge,
  sorpassi: AlertTriangle,
  parcheggi: MapPin,
  sicurezza: ShieldCheck,
  esame: Flag,
};

export function LevelCard({
  livello,
  stato,
  xp,
  totaleDomande,
  bloccatoDaPiano,
}: {
  livello: LivelloMeta;
  stato: StatoLivello;
  xp: number;
  totaleDomande: number;
  /** true se il livello esiste ma non è incluso nel piano attuale (es. Simulazione Finale su Starter). */
  bloccatoDaPiano?: boolean;
}) {
  const Icona = icone[livello.icona];
  const bloccatoDaProgresso = stato === 'bloccato';
  const bloccato = bloccatoDaProgresso || Boolean(bloccatoDaPiano);
  const [modaleAperta, setModaleAperta] = useState(false);
  // Ogni risposta corretta vale 10 XP: min(domande "coperte" dagli XP, totale) è
  // equivalente a filtrare l'array delle domande per indice, ma senza doverlo avere qui.
  const percentuale = totaleDomande > 0 ? Math.min(100, (Math.min(xp / 10, totaleDomande) / totaleDomande) * 100) : 0;

  // Blocco "da piano": lucchetto elegante + modale di upgrade (mai un link diretto),
  // richiesto esplicitamente dal Masterplan 2.0 per aumentare il valore percepito.
  if (bloccatoDaPiano) {
    return (
      <>
        <button
          onClick={() => setModaleAperta(true)}
          className="flex w-full items-center gap-4 rounded-lg border border-segnale/30 bg-segnale/[0.04] p-4 text-left transition-colors hover:bg-segnale/[0.07] md:p-5"
        >
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-segnale/10 text-segnale">
            <Lock className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-[16px] font-bold">
                Livello {livello.numero} — {livello.titolo}
              </span>
              <Badge variante="in-corso">Premium</Badge>
            </div>
            <p className="mt-1 text-[13px] text-ardesia">Incluso da Premium in su.</p>
          </div>
          <span className="hidden h-[40px] flex-shrink-0 items-center gap-1.5 rounded-md border-[1.5px] border-segnale px-4 text-[14px] font-extrabold text-segnale sm:inline-flex">
            <Sparkles className="h-3.5 w-3.5" /> Sblocca Premium
          </span>
        </button>
        <UpgradeModal aperto={modaleAperta} onChiudi={() => setModaleAperta(false)} richiedePiano="premium" />
      </>
    );
  }

  const contenuto = (
    <div
      className={cn(
        'flex items-center gap-4 rounded-lg border p-4 transition-shadow md:p-5',
        stato === 'in-corso' ? 'border-[1.5px] border-segnale shadow-md' : 'border-asfalto/[0.06]',
        bloccato && 'opacity-60'
      )}
    >
      <div
        className={cn(
          'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full',
          stato === 'completato' ? 'bg-superato/10 text-superato' : bloccato ? 'bg-nebbia text-ardesia/50' : 'bg-segnale/10 text-segnale'
        )}
      >
        {bloccato ? <Lock className="h-5 w-5" /> : <Icona className="h-5 w-5" strokeWidth={2} />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-[16px] font-bold">
            Livello {livello.numero} — {livello.titolo}
          </span>
          {stato === 'completato' && <Badge variante="successo">Completato</Badge>}
          {stato === 'in-corso' && <Badge variante="in-corso">In corso</Badge>}
          {bloccatoDaProgresso && <Badge variante="bloccato">Bloccato</Badge>}
        </div>
        {!bloccato && (
          <div className="mt-2">
            <ProgressBar percentuale={percentuale} />
          </div>
        )}
        {bloccatoDaProgresso && <p className="mt-1 text-[12.5px] text-ardesia">Completa il livello precedente per sbloccare.</p>}
      </div>

      {!bloccato && (
        <Button variante={stato === 'completato' ? 'secondario' : 'primario'} className="hidden h-[40px] px-4 text-[14px] sm:inline-flex">
          {stato === 'completato' ? 'Ripassa' : 'Continua'}
        </Button>
      )}
    </div>
  );

  if (bloccato) return <div aria-disabled>{contenuto}</div>;
  return <Link href={`/dashboard/livello/${livello.id}`}>{contenuto}</Link>;
}
