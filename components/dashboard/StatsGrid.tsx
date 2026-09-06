import { Award, Clock, Layers, Zap } from 'lucide-react';
import { livelli } from '@/lib/livelli-data';
import type { Progresso } from '@/lib/xp';

const MINUTI_PER_LIVELLO = 12;

/** Fase 4, §1: statistiche riassuntive della dashboard (Livello, XP, Quiz completati, Tempo stimato). */
export function StatsGrid({ progresso }: { progresso: Progresso }) {
  const completati = livelli.filter((l) => progresso.livelli[l.id]?.stato === 'completato').length;
  const inCorso = livelli.find((l) => progresso.livelli[l.id]?.stato === 'in-corso');
  const quizCompletatiTotali = Object.values(progresso.livelli).reduce(
    (tot, l) => tot + l.domandeCorrette.length,
    0
  );
  const livelliRimanenti = livelli.length - completati;
  const minutiStimati = livelliRimanenti * MINUTI_PER_LIVELLO;

  const voci = [
    {
      icona: Layers,
      etichetta: 'Livello attuale',
      valore: inCorso ? `${inCorso.numero} · ${inCorso.titolo}` : completati === livelli.length ? 'Completato' : '—',
    },
    { icona: Zap, etichetta: 'XP totali', valore: `${progresso.xpTotale}` },
    { icona: Award, etichetta: 'Quiz completati', valore: `${quizCompletatiTotali}` },
    {
      icona: Clock,
      etichetta: 'Tempo stimato rimanente',
      valore: livelliRimanenti === 0 ? 'Nessuno' : `~${minutiStimati} min`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {voci.map(({ icona: Icona, etichetta, valore }) => (
        <div key={etichetta} className="rounded-lg border border-asfalto/[0.06] bg-segnaletica p-4 shadow-sm">
          <Icona className="h-4 w-4 text-superato" strokeWidth={2} aria-hidden />
          <p className="mt-2 truncate font-display text-[16px] font-bold" title={valore}>
            {valore}
          </p>
          <p className="text-[12px] text-ardesia">{etichetta}</p>
        </div>
      ))}
    </div>
  );
}
