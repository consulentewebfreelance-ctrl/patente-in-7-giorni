'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { XPGainToast } from '@/components/dashboard/XPGainToast';
import { cn } from '@/lib/utils';
import type { Domanda } from '@/lib/livelli-data';

type Props = {
  domande: Domanda[];
  onRispostaCorretta: (indiceDomanda: number) => void;
  onCompletato: () => void;
  numerazioneTotale?: number;
};

/**
 * Fase 2/3/4, Schermata 5 — Quiz Premium: una domanda alla volta, feedback
 * immediato animato, +XP animato, spiegazione, errore comune, indicatore
 * "N di totale", pulsante "Prossima domanda" (o "Vedi il risultato" sull'ultima).
 */
export function QuizRunner({ domande, onRispostaCorretta, onCompletato, numerazioneTotale }: Props) {
  const [indice, setIndice] = useState(0);
  const [selezionata, setSelezionata] = useState<number | null>(null);
  const [xpGuadagnato, setXpGuadagnato] = useState(0);
  const [mostraToast, setMostraToast] = useState(false);

  const domanda = domande[indice];
  const risposta = selezionata !== null;
  const corretta = selezionata === domanda.corretta;
  const totale = numerazioneTotale ?? domande.length;
  const ultimaDomanda = indice === domande.length - 1;

  const rispondi = (i: number) => {
    if (risposta) return;
    setSelezionata(i);
    if (i === domanda.corretta) {
      setXpGuadagnato((x) => x + 10);
      setMostraToast(true);
      window.setTimeout(() => setMostraToast(false), 700);
      onRispostaCorretta(indice);
    }
  };

  const prosegui = () => {
    if (!ultimaDomanda) {
      setIndice((n) => n + 1);
      setSelezionata(null);
    } else {
      onCompletato();
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[520px] flex-col gap-6">
      <div className="flex items-center justify-between text-[13px] font-medium text-ardesia">
        <span aria-live="polite">Domanda {indice + 1} di {totale}</span>
        <span className="relative">
          {xpGuadagnato} XP in questo quiz
          <XPGainToast valore={10} visibile={mostraToast} />
        </span>
      </div>
      <ProgressBar
        percentuale={((indice + (risposta ? 1 : 0)) / domande.length) * 100}
        etichetta={`Domanda ${indice + 1} di ${domande.length}`}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={indice}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-6"
        >
          <p className="text-center font-display text-[20px] font-bold leading-snug md:text-[22px]">
            {domanda.domanda}
          </p>

          <div className="flex flex-col gap-3" role="radiogroup" aria-label="Risposte">
            {domanda.risposte.map((testo, i) => {
              const isCorretta = i === domanda.corretta;
              const isSelezionata = i === selezionata;
              return (
                <motion.button
                  key={testo}
                  onClick={() => rispondi(i)}
                  disabled={risposta}
                  role="radio"
                  aria-checked={isSelezionata}
                  animate={
                    risposta && isSelezionata
                      ? { x: isCorretta ? 0 : [0, -6, 6, -4, 4, 0] }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.35 }}
                  className={cn(
                    'flex min-h-[52px] items-center justify-between rounded-md border-[1.5px] px-4 py-3 text-left text-[15px] font-medium transition-all duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-segnale',
                    !risposta && 'border-nebbia hover:border-asfalto/30',
                    risposta && isCorretta && 'border-superato bg-superato/[0.08]',
                    risposta && isSelezionata && !isCorretta && 'border-erroreLieve bg-erroreLieve/[0.08]',
                    risposta && !isSelezionata && !isCorretta && 'border-nebbia opacity-50'
                  )}
                >
                  {testo}
                  {risposta && isCorretta && <Check className="h-5 w-5 flex-shrink-0 text-superato" />}
                  {risposta && isSelezionata && !isCorretta && <X className="h-5 w-5 flex-shrink-0 text-erroreLieve" />}
                </motion.button>
              );
            })}
          </div>

          {risposta && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3 rounded-lg bg-nebbia p-5"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-center gap-2">
                {corretta ? (
                  <span className="flex items-center gap-1.5 text-[14px] font-bold text-superato">
                    <Check className="h-4 w-4" /> Corretto · +10 XP
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[14px] font-bold text-erroreLieve">
                    <X className="h-4 w-4" /> Sbagliato
                  </span>
                )}
              </div>
              <p className="text-[14px] text-asfalto">{domanda.spiegazione}</p>
              {!corretta && (
                <p className="text-[13px] text-ardesia">
                  <strong className="text-asfalto">Errore comune:</strong> {domanda.erroreComune}
                </p>
              )}
              <Button onClick={prosegui} className="mt-2 w-fit">
                {ultimaDomanda ? 'Vedi il risultato' : 'Prossima domanda'}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
