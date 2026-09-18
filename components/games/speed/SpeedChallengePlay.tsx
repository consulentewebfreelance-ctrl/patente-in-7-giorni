'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useSuoni } from '@/lib/sounds';
import { cn } from '@/lib/utils';
import type { DomandaSpeed } from '@/lib/access';

const DURATA_SECONDI = 45;

/**
 * Meccanica di gioco della Speed Challenge, senza chrome di pagina: usata
 * dalla Speed Challenge dedicata di ogni livello (Fase 3), con domande solo
 * di quell'argomento e un timer più breve (45s) rispetto alla versione
 * standalone (60s, mista su tutti i livelli).
 */
export function SpeedChallengePlay({
  domande,
  onCompletato,
}: {
  domande: DomandaSpeed[];
  onCompletato: (corrette: number, miglioreCombo: number) => void;
}) {
  const { play } = useSuoni();
  const [indice, setIndice] = useState(0);
  const [corrette, setCorrette] = useState(0);
  const [combo, setCombo] = useState(0);
  const [miglioreCombo, setMiglioreCombo] = useState(0);
  const [tempoRimanente, setTempoRimanente] = useState(DURATA_SECONDI);
  const [selezionata, setSelezionata] = useState<number | null>(null);
  const [finita, setFinita] = useState(false);

  useEffect(() => {
    if (finita || tempoRimanente <= 0) {
      if (!finita) setFinita(true);
      return;
    }
    const t = setTimeout(() => setTempoRimanente((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [finita, tempoRimanente]);

  useEffect(() => {
    if (finita) onCompletato(corrette, miglioreCombo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finita]);

  if (domande.length === 0) {
    return <div className="h-40 animate-pulse rounded-lg bg-nebbia" />;
  }

  if (finita) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <p className="font-display text-[20px] font-bold">Tempo!</p>
        <p className="text-[14px] text-ardesia">
          {corrette} corrette su {indice + (selezionata !== null ? 1 : 0)} · combo massima {miglioreCombo}
        </p>
      </div>
    );
  }

  function rispondi(i: number) {
    if (selezionata !== null) return;
    const domanda = domande[indice % domande.length];
    setSelezionata(i);
    const corretta = i === domanda.corretta;

    if (corretta) {
      play('corretto');
      setCorrette((c) => c + 1);
      setCombo((c) => {
        const nuovo = c + 1;
        setMiglioreCombo((m) => Math.max(m, nuovo));
        return nuovo;
      });
    } else {
      play('errore');
      setCombo(0);
    }

    setTimeout(() => {
      setSelezionata(null);
      setIndice((n) => n + 1);
    }, 300);
  }

  const domanda = domande[indice % domande.length];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className={cn('font-display text-[24px] font-bold tabular-nums', tempoRimanente <= 8 ? 'text-erroreLieve' : 'text-asfalto')}>
          {tempoRimanente}s
        </span>
        <div className="flex items-center gap-1.5 text-[14px] font-bold text-superato">
          <Flame className="h-4 w-4" /> Combo {combo}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={indice}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.12 }}
          className="flex flex-col gap-2.5"
        >
          <p className="text-center font-display text-[17px] font-bold leading-snug">{domanda.domanda}</p>
          {domanda.risposte.map((r, i) => {
            const mostraEsito = selezionata !== null;
            const isCorretta = i === domanda.corretta;
            const isSelezionata = i === selezionata;
            return (
              <button
                key={r}
                onClick={() => rispondi(i)}
                disabled={mostraEsito}
                className={cn(
                  'min-h-[48px] rounded-md border-[1.5px] px-4 py-2.5 text-left text-[14px] font-medium transition-colors',
                  !mostraEsito && 'border-nebbia hover:border-asfalto/30',
                  mostraEsito && isCorretta && 'border-superato bg-superato/[0.08]',
                  mostraEsito && isSelezionata && !isCorretta && 'border-erroreLieve bg-erroreLieve/[0.08]',
                  mostraEsito && !isSelezionata && !isCorretta && 'border-nebbia opacity-50'
                )}
              >
                {r}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
