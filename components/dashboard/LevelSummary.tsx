'use client';

import { motion } from 'framer-motion';
import { Award, Swords, Zap } from 'lucide-react';
import { ButtonLink, Button } from '@/components/ui/Button';
import { StarsRating } from './StarsRating';
import { Confetti } from '@/components/games/shared/Confetti';

/** Schermata di fine livello (Fase 3): XP, badge, percentuale, tempo, stelle. */
export function LevelSummary({
  xpGuadagnati,
  badge,
  percentuale,
  tempoImpiegatoSecondi,
  stelle,
  livelloId,
  prossimoLivelloTitolo,
}: {
  xpGuadagnati: number;
  badge: string;
  percentuale: number;
  tempoImpiegatoSecondi: number;
  stelle: number;
  livelloId: string;
  prossimoLivelloTitolo?: string;
}) {
  const minuti = Math.floor(tempoImpiegatoSecondi / 60);
  const secondi = tempoImpiegatoSecondi % 60;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col items-center gap-5 py-10 text-center"
    >
      <Confetti attivo={stelle >= 2} />

      <StarsRating stelle={stelle} dimensione={32} />

      <div>
        <p className="font-display text-[26px] font-bold">Livello completato</p>
        <p className="mt-1 text-[14px] text-ardesia">
          {Math.round(percentuale)}% corretto · {minuti}:{String(secondi).padStart(2, '0')} impiegati
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <span className="flex items-center gap-1.5 rounded-full bg-superato/10 px-3.5 py-1.5 text-[14px] font-bold text-superato">
          <Zap className="h-4 w-4" /> +{xpGuadagnati} XP
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-segnale/10 px-3.5 py-1.5 text-[14px] font-bold text-segnale">
          <Award className="h-4 w-4" /> {badge}
        </span>
      </div>

      <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
        <ButtonLink href={`/dashboard/livello/${livelloId}/boss`} variante="secondario" className="gap-1.5">
          <Swords className="h-4 w-4" /> Boss Fight
        </ButtonLink>
        <ButtonLink href="/dashboard">{prossimoLivelloTitolo ? 'Continua al prossimo livello' : 'Torna alla Dashboard'}</ButtonLink>
      </div>
    </motion.div>
  );
}
