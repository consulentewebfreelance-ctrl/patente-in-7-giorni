'use client';

import { AnimatePresence, motion } from 'framer-motion';

/**
 * Piccolo indicatore animato "+N XP" (Fase 4, §2 e §3: "animazioni quando gli
 * XP aumentano"). Puramente visivo: chi lo usa gestisce il proprio stato
 * `visibile`/`valore` e lo rimuove dopo l'animazione.
 */
export function XPGainToast({ valore, visibile }: { valore: number; visibile: boolean }) {
  return (
    <AnimatePresence>
      {visibile && (
        <motion.span
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: -18, scale: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="pointer-events-none absolute -top-2 right-0 font-display text-[15px] font-bold text-superato"
          aria-hidden
        >
          +{valore} XP
        </motion.span>
      )}
    </AnimatePresence>
  );
}
