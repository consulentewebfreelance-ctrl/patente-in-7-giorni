'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { calcolaBadgeSbloccati } from '@/lib/achievements';
import type { Progresso } from '@/lib/xp';
import type { Streak } from '@/lib/streak';
import { cn } from '@/lib/utils';

/** Fase 4, §1: badge sbloccabili, calcolati dallo stato di progresso e streak esistenti. */
export function BadgeShelf({ progresso, streak }: { progresso: Progresso; streak: Streak }) {
  const badge = calcolaBadgeSbloccati(progresso, streak);

  return (
    <div>
      <h2 className="mb-3 font-display text-[16px] font-bold">Badge</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {badge.map((b, i) => (
          <motion.div
            key={b.id}
            initial={b.ottenuto ? { scale: 0.6, opacity: 0 } : false}
            animate={b.ottenuto ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.03, ease: 'easeOut' }}
            className={cn(
              'flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center',
              b.ottenuto ? 'border-superato/30 bg-superato/[0.06]' : 'border-asfalto/[0.06] bg-nebbia opacity-60'
            )}
            title={b.descrizione}
          >
            <span className="text-[22px]" aria-hidden>
              {b.ottenuto ? b.emoji : <Lock className="h-5 w-5 text-ardesia/50" />}
            </span>
            <span className="text-[11px] font-medium leading-tight text-asfalto">{b.titolo}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
