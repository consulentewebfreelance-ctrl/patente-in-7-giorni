import { Flame } from 'lucide-react';
import type { Streak } from '@/lib/streak';

/** Fase 4, §1: streak giornaliero, mostrato in dashboard accanto alle statistiche. */
export function StreakIndicator({ streak }: { streak: Streak }) {
  const attivo = streak.giorniConsecutivi > 0;
  return (
    <div
      className="flex items-center gap-2 rounded-full border border-asfalto/[0.06] bg-segnaletica px-3.5 py-1.5 shadow-sm"
      aria-label={`Streak: ${streak.giorniConsecutivi} ${streak.giorniConsecutivi === 1 ? 'giorno' : 'giorni'} consecutivi`}
    >
      <Flame className={attivo ? 'h-4 w-4 text-superato' : 'h-4 w-4 text-ardesia/40'} strokeWidth={2} aria-hidden />
      <span className="text-[13px] font-bold text-asfalto">{streak.giorniConsecutivi}</span>
      <span className="text-[12px] text-ardesia">{streak.giorniConsecutivi === 1 ? 'giorno' : 'giorni'}</span>
    </div>
  );
}
