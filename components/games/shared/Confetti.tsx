'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

const COLORI = ['#17C964', '#0B0B0D', '#2F6FED', '#F4F4F6'];

/** Piccola esplosione di coriandoli in puro Framer Motion, nessuna dipendenza esterna. */
export function Confetti({ attivo }: { attivo: boolean }) {
  const pezzi = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 320,
        rotazione: Math.random() * 360,
        colore: COLORI[i % COLORI.length],
        ritardo: Math.random() * 0.15,
        dimensione: 6 + Math.random() * 6,
      })),
    []
  );

  if (!attivo) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pezzi.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: 260, opacity: 0, rotate: p.rotazione }}
          transition={{ duration: 1.1, delay: p.ritardo, ease: 'easeOut' }}
          className="absolute left-1/2 top-0 block"
          style={{ width: p.dimensione, height: p.dimensione * 0.4, backgroundColor: p.colore, borderRadius: 2 }}
        />
      ))}
    </div>
  );
}
