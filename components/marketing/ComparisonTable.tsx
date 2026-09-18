import { Check, Lock } from 'lucide-react';
import { TIER_INFO, ORDINE_TIER } from '@/lib/tiers';
import { cn } from '@/lib/utils';

type Riga = { etichetta: string; valori: [string | boolean, string | boolean, string | boolean] };

// Stesso identico elenco mostrato in ComparisonTable e nella versione mobile a card.
const RIGHE: Riga[] = [
  { etichetta: 'Manuale', valori: [true, true, true] },
  { etichetta: 'Livelli', valori: [true, true, true] },
  { etichetta: 'Quiz', valori: ['500', '2500', 'Tutti'] },
  { etichetta: 'Flashcard', valori: ['250', 'Tutte', 'Tutte'] },
  { etichetta: 'Simulazioni', valori: ['5', 'Illimitate', 'Illimitate'] },
  { etichetta: 'Tutor AI', valori: [false, true, true] },
  { etichetta: 'Video', valori: [false, true, true] },
  { etichetta: 'Ripasso', valori: [false, true, true] },
  { etichetta: 'Statistiche', valori: [false, true, true] },
  { etichetta: 'Modalità Esame', valori: [false, true, true] },
  { etichetta: 'Aggiornamenti', valori: [false, false, true] },
  { etichetta: 'Accesso a vita', valori: [false, false, true] },
];

function Cella({ valore }: { valore: string | boolean }) {
  if (valore === true) return <Check className="mx-auto h-4 w-4 text-superato" strokeWidth={2.5} />;
  if (valore === false) return <Lock className="mx-auto h-3.5 w-3.5 text-ardesia/35" strokeWidth={2} />;
  return <span className="text-[13px] font-medium text-asfalto">{valore}</span>;
}

/** Confronto dettagliato dei 3 piani — Premium sempre evidenziato, righe alternate, lucchetti per il non incluso. */
export function ComparisonTable() {
  return (
    <div>
      {/* Desktop: tabella completa */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-nebbia">
              <th className="py-3 pr-4 text-[13px] font-medium text-ardesia">Funzione</th>
              {ORDINE_TIER.map((id) => (
                <th
                  key={id}
                  className={cn(
                    'px-4 py-3 text-center font-display text-[15px] font-bold',
                    id === 'premium' && 'rounded-t-md bg-superato/[0.06] text-superato'
                  )}
                >
                  {TIER_INFO[id].nome}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RIGHE.map((riga, i) => (
              <tr key={riga.etichetta} className={cn('border-b border-nebbia', i % 2 === 1 && 'bg-nebbia/40')}>
                <td className="py-3 pr-4 text-[14px] text-asfalto">{riga.etichetta}</td>
                {riga.valori.map((v, j) => (
                  <td key={j} className={cn('px-4 py-3 text-center', ORDINE_TIER[j] === 'premium' && 'bg-superato/[0.05]')}>
                    <Cella valore={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: una card impilata per piano */}
      <div className="flex flex-col gap-4 md:hidden">
        {ORDINE_TIER.map((id) => (
          <div
            key={id}
            className={cn(
              'rounded-lg border p-4',
              id === 'premium' ? 'border-[2px] border-superato bg-superato/[0.04]' : 'border-nebbia'
            )}
          >
            <h3 className={cn('mb-3 font-display text-[16px] font-bold', id === 'premium' && 'text-superato')}>
              {TIER_INFO[id].nome}
            </h3>
            <dl className="flex flex-col divide-y divide-nebbia">
              {RIGHE.map((riga) => (
                <div key={riga.etichetta} className="flex items-center justify-between py-2">
                  <dt className="text-[13px] text-ardesia">{riga.etichetta}</dt>
                  <dd>
                    <Cella valore={riga.valori[ORDINE_TIER.indexOf(id)]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
