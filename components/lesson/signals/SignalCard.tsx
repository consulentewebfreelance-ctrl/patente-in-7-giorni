'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { SignalShape } from './SignalShape';
import type { Segnale } from '@/lib/livelli-content-shared';

const ETICHETTA_CATEGORIA: Record<Segnale['categoria'], string> = {
  pericolo: 'Pericolo',
  divieto: 'Divieto',
  obbligo: 'Obbligo',
  indicazione: 'Indicazione',
};

/** Card di un singolo segnale, con tap per ingrandire (Fase 3: "zoom, tap per ingrandire, animazione"). */
export function SignalCard({ segnale }: { segnale: Segnale }) {
  const [ingrandito, setIngrandito] = useState(false);

  return (
    <>
      <button
        onClick={() => setIngrandito(true)}
        className="group flex flex-col items-center gap-2 rounded-lg border border-asfalto/[0.06] bg-segnaletica p-4 text-center transition-shadow hover:shadow-md"
      >
        <div className="relative">
          <SignalShape categoria={segnale.categoria} simbolo={segnale.simbolo} dimensione={72} />
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-asfalto text-segnaletica opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-3 w-3" />
          </span>
        </div>
        <span className="text-[13px] font-bold leading-tight text-asfalto">{segnale.nome}</span>
        <span className="text-[11px] text-ardesia">{ETICHETTA_CATEGORIA[segnale.categoria]}</span>
      </button>

      <AnimatePresence>
        {ingrandito && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-asfalto/70 p-6 backdrop-blur-sm"
            onClick={() => setIngrandito(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex w-full max-w-[340px] flex-col items-center gap-4 rounded-lg bg-segnaletica p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIngrandito(false)}
                aria-label="Chiudi"
                className="ml-auto flex h-9 w-9 items-center justify-center rounded-full hover:bg-nebbia"
              >
                <X className="h-4 w-4" />
              </button>
              <SignalShape categoria={segnale.categoria} simbolo={segnale.simbolo} dimensione={140} />
              <div>
                <p className="font-display text-[18px] font-bold">{segnale.nome}</p>
                <span className="text-[12px] font-medium text-ardesia">{ETICHETTA_CATEGORIA[segnale.categoria]}</span>
              </div>
              <p className="text-[14px] text-asfalto">{segnale.spiegazione}</p>
              <div className="w-full rounded-md bg-nebbia p-3 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wide text-ardesia">Esempio</span>
                <p className="mt-1 text-[13px] text-asfalto">{segnale.esempio}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
