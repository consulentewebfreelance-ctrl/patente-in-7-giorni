'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ProgressBar({
  percentuale,
  className,
  etichetta = 'Progresso',
}: {
  percentuale: number;
  className?: string;
  etichetta?: string;
}) {
  const valore = Math.max(0, Math.min(100, percentuale));
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-nebbia', className)}>
      <motion.div
        className="h-full rounded-full bg-superato"
        initial={false}
        animate={{ width: `${valore}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        role="progressbar"
        aria-label={etichetta}
        aria-valuenow={Math.round(valore)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

/** Variante "a tappe": usata nella dashboard per mostrare i 7 livelli come nodi collegati. */
export function ProgressoTappe({ totale, completate }: { totale: number; completate: number }) {
  return (
    <div className="flex items-center gap-1.5" role="img" aria-label={`${completate} livelli completati su ${totale}`}>
      {Array.from({ length: totale }).map((_, i) => (
        <motion.span
          key={i}
          initial={false}
          animate={{ scale: i < completate ? [0.7, 1.15, 1] : 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={cn(
            'h-2.5 w-2.5 rounded-full transition-colors duration-300',
            i < completate ? 'bg-superato' : 'border border-ardesia/40 bg-transparent'
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}
