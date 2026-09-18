'use client';

import { BookOpen, Brain, Flame, Gauge, HelpCircle, Layers, Swords, type LucideIcon } from 'lucide-react';
import { useMissioniGiornaliere, segnaPremioRiscattato, type TipoMissione } from '@/lib/missions';
import type { Urgenza } from '@/lib/examCalendar';
import { useProgresso } from '@/lib/xp';
import { Button } from '@/components/ui/Button';

const ICONE: Record<TipoMissione, LucideIcon> = {
  lezione: BookOpen,
  quiz: HelpCircle,
  flashcard: Layers,
  memory: Brain,
  speed: Gauge,
  boss: Swords,
};

/** Sfida del giorno (Fase 2): la prima missione di oggi, con XP doppi se completata. */
export function DailyChallengeBanner({ urgenza }: { urgenza: Urgenza }) {
  const missioni = useMissioniGiornaliere(urgenza);
  const { aggiungiXPBonus } = useProgresso();

  if (missioni.length === 0) return null;
  const sfida = missioni[0];
  const Icona = ICONE[sfida.id];
  const xpDoppio = sfida.xp * 2;

  function riscatta() {
    aggiungiXPBonus(xpDoppio);
    segnaPremioRiscattato(sfida.id);
  }

  return (
    <div
      className="flex items-center gap-4 rounded-lg p-4 text-segnaletica md:p-5"
      style={{ background: 'linear-gradient(135deg, #14532d 0%, #166534 100%)' }}
    >
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
        <Icona className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <Flame className="h-3.5 w-3.5 text-white/70" />
          <span className="text-[11px] font-bold uppercase tracking-wide text-white/70">Sfida del giorno</span>
        </div>
        <p className="font-display text-[15px] font-bold">{sfida.titolo}</p>
        <p className="text-[12.5px] text-white/70">
          {sfida.fatto}/{sfida.target} · XP doppi oggi: <strong>{xpDoppio}</strong>
        </p>
      </div>
      {sfida.completata && !sfida.riscattata && (
        <Button onClick={riscatta} variante="successo" className="h-[38px] px-3 text-[13px]">
          Riscatta
        </Button>
      )}
      {sfida.riscattata && <span className="text-[13px] font-medium text-white/90">Fatto ✓</span>}
    </div>
  );
}
