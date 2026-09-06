import { CalendarCheck, HelpCircle, Timer } from 'lucide-react';

// Numeri illustrativi del metodo (non contano utenti reali): da confermare/aggiornare
// con dati reali prima del lancio pubblico.
const voci = [
  { icona: CalendarCheck, valore: '7', etichetta: 'giorni di metodo' },
  { icona: Timer, valore: '~15', etichetta: 'minuti al giorno' },
  { icona: HelpCircle, valore: '20+', etichetta: 'domande in stile esame' },
];

/** Fase 4, §4: statistiche visive nella homepage, sotto l'hero. */
export function StatsStrip() {
  return (
    <div className="grid grid-cols-3 divide-x divide-nebbia border-y border-nebbia">
      {voci.map(({ icona: Icona, valore, etichetta }) => (
        <div key={etichetta} className="flex flex-col items-center gap-1 px-2 py-6 text-center">
          <Icona className="h-4 w-4 text-superato" strokeWidth={2} aria-hidden />
          <span className="font-display text-[22px] font-bold md:text-[28px]">{valore}</span>
          <span className="text-[12px] text-ardesia">{etichetta}</span>
        </div>
      ))}
    </div>
  );
}
