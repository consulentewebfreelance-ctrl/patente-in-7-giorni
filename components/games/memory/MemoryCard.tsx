'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export type StatoCarta = 'coperta' | 'girata' | 'trovata';

export function MemoryCard({
  testo,
  stato,
  onClick,
}: {
  testo: string;
  stato: StatoCarta;
  onClick: () => void;
}) {
  const girata = stato !== 'coperta';

  return (
    <button
      onClick={onClick}
      disabled={girata}
      aria-label={girata ? testo : 'Carta coperta'}
      className="aspect-[3/4] w-full"
      style={{ perspective: 800 }}
    >
      <motion.div
        animate={{ rotateY: girata ? 180 : 0 }}
        transition={{ duration: 0.35 }}
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* fronte (coperto) */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-asfalto shadow-sm"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="h-2 w-2 rounded-full bg-segnaletica/30" />
        </div>
        {/* retro (scoperto) */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-lg border-2 p-2 text-center shadow-sm ${
            stato === 'trovata' ? 'border-superato bg-superato/[0.08]' : 'border-segnale bg-segnaletica'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {stato === 'trovata' && <Check className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-superato" />}
          <span className="text-[11px] font-medium leading-tight text-asfalto sm:text-[12px]">{testo}</span>
        </div>
      </motion.div>
    </button>
  );
}
