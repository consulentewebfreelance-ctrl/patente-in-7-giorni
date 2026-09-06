import { livelli } from '@/lib/livelli-data';

/** Timeline dei 7 giorni nella pagina prodotto (Fase 2, Schermata 2). */
export function Timeline() {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-7 md:gap-4 md:overflow-visible">
      {livelli.map((l) => (
        <div key={l.id} className="flex min-w-[120px] flex-col items-center text-center md:min-w-0">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-asfalto font-display text-[15px] font-bold">
            {l.numero}
          </div>
          <span className="mt-2 text-[13px] font-medium text-asfalto">Giorno {l.numero}</span>
          <span className="text-[12px] text-ardesia">{l.titolo}</span>
        </div>
      ))}
    </div>
  );
}
