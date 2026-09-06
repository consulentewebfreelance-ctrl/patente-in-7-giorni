'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock } from 'lucide-react';

/**
 * Data di lancio: modifica solo questa costante per cambiare il countdown.
 * Formato ISO 8601 con fuso orario esplicito (qui: Europe/Rome, +02:00 in ora legale).
 */
const LAUNCH_DATE = new Date('2026-10-07T00:00:00+02:00');

type Tempo = { giorni: number; ore: number; minuti: number; secondi: number };

function calcolaTempo(): Tempo {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - Date.now());
  const secondiTotali = Math.floor(diff / 1000);
  return {
    giorni: Math.floor(secondiTotali / 86400),
    ore: Math.floor((secondiTotali % 86400) / 3600),
    minuti: Math.floor((secondiTotali % 3600) / 60),
    secondi: secondiTotali % 60,
  };
}

/** Un singolo riquadro del countdown, con transizione fluida ad ogni cambio di valore. */
function CountUnit({ valore, etichetta }: { valore: number; etichetta: string }) {
  return (
    <div className="flex w-[58px] flex-col items-center gap-1 rounded-md bg-white/10 py-2 backdrop-blur-sm sm:w-[68px]">
      <div className="h-[26px] overflow-hidden sm:h-[30px]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={valore}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="block font-display text-[20px] font-bold text-white sm:text-[24px]"
          >
            {String(valore).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] font-medium uppercase tracking-wide text-white/70">{etichetta}</span>
    </div>
  );
}

/** Banner di lancio, subito sotto l'hero: countdown verso LAUNCH_DATE. */
export function LaunchBanner() {
  const [montato, setMontato] = useState(false);
  const [tempo, setTempo] = useState<Tempo>({ giorni: 0, ore: 0, minuti: 0, secondi: 0 });

  useEffect(() => {
    setMontato(true);
    setTempo(calcolaTempo());
    const interval = setInterval(() => setTempo(calcolaTempo()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #14532d 0%, #166534 100%)' }}
    >
      <div className="container-app flex flex-col items-center gap-5 py-6 sm:flex-row sm:justify-between sm:gap-6 sm:py-7">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
            <Clock className="h-5 w-5 text-white" strokeWidth={2} aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-white/70">Lancio ufficiale</p>
            <p className="font-display text-[19px] font-bold text-white sm:text-[22px]">Premium • 29€</p>
          </div>
        </div>

        <div
          className="flex items-center gap-2 sm:gap-3"
          role="timer"
          aria-live="off"
          aria-label={
            montato
              ? `Mancano ${tempo.giorni} giorni, ${tempo.ore} ore, ${tempo.minuti} minuti e ${tempo.secondi} secondi al lancio`
              : 'Countdown al lancio'
          }
        >
          <CountUnit valore={montato ? tempo.giorni : 0} etichetta="Giorni" />
          <span className="pb-4 font-display text-[18px] font-bold text-white/40">:</span>
          <CountUnit valore={montato ? tempo.ore : 0} etichetta="Ore" />
          <span className="pb-4 font-display text-[18px] font-bold text-white/40">:</span>
          <CountUnit valore={montato ? tempo.minuti : 0} etichetta="Min" />
          <span className="pb-4 font-display text-[18px] font-bold text-white/40">:</span>
          <CountUnit valore={montato ? tempo.secondi : 0} etichetta="Sec" />
        </div>
      </div>
    </motion.section>
  );
}
