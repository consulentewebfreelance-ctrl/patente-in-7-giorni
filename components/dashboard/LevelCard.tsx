import Link from 'next/link';
import { AlertTriangle, ArrowRightCircle, Flag, Gauge, Lock, Repeat2, TrafficCone, TriangleAlert } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { LivelloMeta } from '@/lib/livelli-data';
import type { StatoLivello } from '@/lib/xp';

const icone: Record<LivelloMeta['icona'], typeof TrafficCone> = {
  segnali: TrafficCone,
  precedenze: ArrowRightCircle,
  incroci: TriangleAlert,
  velocita: Gauge,
  sorpassi: AlertTriangle,
  ripasso: Repeat2,
  finale: Flag,
};

export function LevelCard({
  livello,
  stato,
  xp,
  totaleDomande,
}: {
  livello: LivelloMeta;
  stato: StatoLivello;
  xp: number;
  totaleDomande: number;
}) {
  const Icona = icone[livello.icona];
  const bloccato = stato === 'bloccato';
  // Ogni risposta corretta vale 10 XP: min(domande "coperte" dagli XP, totale) è
  // equivalente a filtrare l'array delle domande per indice, ma senza doverlo avere qui.
  const percentuale = totaleDomande > 0 ? Math.min(100, (Math.min(xp / 10, totaleDomande) / totaleDomande) * 100) : 0;

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
          {bloccato && <Badge variante="bloccato">Bloccato</Badge>}
        </div>
        {!bloccato && (
          <div className="mt-2">
            <ProgressBar percentuale={percentuale} />
          </div>
        )}
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
