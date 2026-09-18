'use client';

import { BookOpen, Brain, Gauge, HelpCircle, Layers, Swords, type LucideIcon } from 'lucide-react';
import { useMissioniGiornaliere, segnaPremioRiscattato, type TipoMissione } from '@/lib/missions';
import type { Urgenza } from '@/lib/examCalendar';
import { useProgresso } from '@/lib/xp';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';

const ICONE: Record<TipoMissione, LucideIcon> = {
  lezione: BookOpen,
  quiz: HelpCircle,
  flashcard: Layers,
  memory: Brain,
  speed: Gauge,
  boss: Swords,
};

/**
 * Missioni Giornaliere (Fase 2): 3 missioni al giorno, la prima mostrata come
 * "Sfida del giorno" (vedi DailyChallengeBanner) — qui restano le altre due.
 */
export function DailyMissions({ urgenza }: { urgenza: Urgenza }) {
  const missioni = useMissioniGiornaliere(urgenza);
  const { aggiungiXPBonus } = useProgresso();

  if (missioni.length < 3) return null;
  const altre = missioni.slice(1);

  function riscatta(tipo: TipoMissione, xp: number) {
    aggiungiXPBonus(xp);
    segnaPremioRiscattato(tipo);
  }

  return (
    <div>
      <h2 className="mb-3 font-display text-[16px] font-bold">Missioni di oggi</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {altre.map((m) => {
          const Icona = ICONE[m.id];
          return (
            <div key={m.id} className="flex flex-col gap-2.5 rounded-lg border border-asfalto/[0.06] bg-segnaletica p-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-nebbia text-asfalto">
                  <Icona className="h-4 w-4" strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold text-asfalto">{m.titolo}</p>
                  <p className="text-[12px] text-ardesia">+{m.xp} XP</p>
                </div>
              </div>
              <ProgressBar percentuale={(m.fatto / m.target) * 100} etichetta={m.titolo} />
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-ardesia">
                  {m.fatto}/{m.target}
                </span>
                {m.completata && !m.riscattata && (
                  <Button onClick={() => riscatta(m.id, m.xp)} className="h-[32px] px-3 text-[12.5px]">
                    Riscatta +{m.xp} XP
                  </Button>
                )}
                {m.riscattata && <span className="text-[12px] font-medium text-superato">Riscattata ✓</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
