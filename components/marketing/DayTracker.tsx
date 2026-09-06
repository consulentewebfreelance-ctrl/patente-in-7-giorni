import { livelli } from '@/lib/livelli-data';

/** Fase 4, §4: anteprima visiva dei 7 giorni del metodo, vicino all'hero ("countdown dei 7 giorni"). */
export function DayTracker() {
  return (
    <div className="flex items-center gap-1.5" role="list" aria-label="I 7 giorni del metodo">
      {livelli.map((l, i) => (
        <div key={l.id} role="listitem" className="flex flex-col items-center gap-1.5">
          <div
            className={
              'flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold ' +
              (i === 0 ? 'bg-superato text-asfalto' : 'border border-segnaletica/25 text-segnaletica/70')
            }
          >
            {l.numero}
          </div>
        </div>
      ))}
    </div>
  );
}
