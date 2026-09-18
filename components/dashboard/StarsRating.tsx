'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

/** Sistema stelle (1-3) mostrato a fine livello e nella mappa (Fase 3). */
export function StarsRating({ stelle, dimensione = 22 }: { stelle: number; dimensione?: number }) {
  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${stelle} stelle su 3`}>
      {[1, 2, 3].map((n) => (
        <motion.span
          key={n}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: n * 0.12, type: 'spring', stiffness: 260, damping: 14 }}
        >
          <Star
            width={dimensione}
            height={dimensione}
            className={n <= stelle ? 'fill-superato text-superato' : 'fill-nebbia text-nebbia'}
            strokeWidth={1.5}
          />
        </motion.span>
      ))}
    </div>
  );
}
