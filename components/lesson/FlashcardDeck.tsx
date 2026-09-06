'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Flashcard } from '@/lib/livelli-data';

/**
 * Flashcard con flip 3D al tap/Invio e swipe orizzontale per navigare
 * (Fase 2/3, Schermata 6). Fase 4 §7: frecce prev/next per navigazione da
 * tastiera e desktop, non solo swipe.
 */
export function FlashcardDeck({ carte }: { carte: Flashcard[] }) {
  const [indice, setIndice] = useState(0);
  const [girata, setGirata] = useState(false);

  const vaiA = (nuovoIndice: number) => {
    if (nuovoIndice < 0 || nuovoIndice >= carte.length) return;
    setGirata(false);
    setIndice(nuovoIndice);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) vaiA(indice + 1);
    else if (info.offset.x > 60) vaiA(indice - 1);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setGirata((g) => !g);
    } else if (e.key === 'ArrowRight') {
      vaiA(indice + 1);
    } else if (e.key === 'ArrowLeft') {
      vaiA(indice - 1);
    }
  };

  const carta = carte[indice];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-[420px] items-center gap-3">
        <button
          onClick={() => vaiA(indice - 1)}
          disabled={indice === 0}
          aria-label="Flashcard precedente"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-nebbia text-asfalto transition-colors hover:bg-nebbia disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="relative h-[220px] flex-1" style={{ perspective: 1000 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={indice}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              onClick={() => setGirata((g) => !g)}
              onKeyDown={onKeyDown}
              tabIndex={0}
              role="button"
              aria-label={girata ? `Risposta: ${carta.retro}. Premi Invio per tornare alla domanda.` : `Domanda: ${carta.fronte}. Premi Invio per vedere la risposta.`}
            >
              <motion.div
                animate={{ rotateY: girata ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                className="relative h-full w-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-lg border border-asfalto/[0.06] bg-segnaletica p-6 text-center shadow-lg"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-[12px] font-medium text-ardesia">Domanda</span>
                  <p className="mt-3 font-display text-[18px] font-bold leading-snug">{carta.fronte}</p>
                  <p className="mt-4 text-[12px] text-ardesia">tocca o premi Invio per girare</p>
                </div>
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-asfalto p-6 text-center text-segnaletica shadow-lg"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <span className="text-[12px] font-medium text-segnaletica/60">Risposta</span>
                  <p className="mt-3 text-[15px] leading-snug">{carta.retro}</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => vaiA(indice + 1)}
          disabled={indice === carte.length - 1}
          aria-label="Flashcard successiva"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-nebbia text-asfalto transition-colors hover:bg-nebbia disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-1.5" aria-hidden>
        {carte.map((_, i) => (
          <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === indice ? 'bg-superato' : 'bg-nebbia'}`} />
        ))}
      </div>
      <p className="text-[13px] text-ardesia" aria-live="polite">
        Flashcard {indice + 1}/{carte.length}
      </p>
    </div>
  );
}
