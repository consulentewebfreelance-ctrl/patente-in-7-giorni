'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, BookOpen, Lightbulb, Wrench, type LucideIcon } from 'lucide-react';
import type { BloccoLezione, IconaBlocco } from '@/lib/livelli-content-shared';

const ICONE: Record<IconaBlocco, LucideIcon> = {
  regola: BookOpen,
  esempio: Lightbulb,
  attenzione: AlertTriangle,
  pratica: Wrench,
};

/** Lezione interattiva (Fase 3): blocchi brevi invece di un muro di testo, ognuno con titolo, esempio e mini riepilogo. */
export function LessonSection({ blocchi }: { blocchi: BloccoLezione[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocchi.map((blocco, i) => {
        const Icona = ICONE[blocco.icona];
        return (
          <motion.div
            key={blocco.titolo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.25 }}
            className="rounded-lg border border-asfalto/[0.06] bg-segnaletica p-5"
          >
            <div className="mb-2 flex items-center gap-2.5">
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-superato/10 text-superato">
                <Icona className="h-4 w-4" strokeWidth={2} />
              </span>
              <h3 className="font-display text-[16px] font-bold">{blocco.titolo}</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-asfalto">{blocco.testo}</p>
            <div className="mt-3 rounded-md bg-nebbia p-3">
              <span className="text-[11px] font-bold uppercase tracking-wide text-ardesia">Esempio</span>
              <p className="mt-1 text-[13.5px] text-asfalto">{blocco.esempio}</p>
            </div>
            <p className="mt-2.5 text-[13px] font-medium text-superato">{blocco.riepilogo}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
