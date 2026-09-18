'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSuoni } from '@/lib/sounds';
import { cn } from '@/lib/utils';
import type { Domanda } from '@/lib/livelli-data';

const DOMANDE_BOSS = 8;
const ERRORI_MASSIMI = 1;

function mescola<T>(arr: T[]): T[] {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function costruisciPool(quiz: Domanda[]): Domanda[] {
  const pool: Domanda[] = [];
  while (pool.length < DOMANDE_BOSS) pool.push(...mescola(quiz));
  return pool.slice(0, DOMANDE_BOSS);
}

/**
 * Meccanica della Boss Fight, senza chrome di pagina: usata come tappa fissa
 * nel flusso del livello (Fase 3), dopo i quiz spiegati. Stessa regola della
 * versione standalone (/dashboard/livello/[id]/boss): massimo un errore.
 */
export function BossFightPlay({
  quiz,
  bossNome,
  onEsito,
}: {
  quiz: Domanda[];
  bossNome: string;
  onEsito: (vinta: boolean, errori: number) => void;
}) {
  const { play } = useSuoni();
  const [domande, setDomande] = useState<Domanda[]>(() => costruisciPool(quiz));
  const [indice, setIndice] = useState(0);
  const [errori, setErrori] = useState(0);
  const [selezionata, setSelezionata] = useState<number | null>(null);
  const [esito, setEsito] = useState<'in-corso' | 'vinta' | 'persa'>('in-corso');

  useEffect(() => {
    if (esito !== 'in-corso') onEsito(esito === 'vinta', errori);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [esito]);

  function rispondi(i: number) {
    if (selezionata !== null) return;
    const domanda = domande[indice];
    setSelezionata(i);
    const corretta = i === domanda.corretta;
    play(corretta ? 'corretto' : 'errore');

    setTimeout(() => {
      const nuoviErrori = errori + (corretta ? 0 : 1);
      if (!corretta) setErrori(nuoviErrori);

      if (nuoviErrori > ERRORI_MASSIMI) {
        setEsito('persa');
        return;
      }
      if (indice + 1 >= domande.length) {
        setEsito('vinta');
        return;
      }
      setIndice((n) => n + 1);
      setSelezionata(null);
    }, 450);
  }

  function riprova() {
    setDomande(costruisciPool(quiz));
    setIndice(0);
    setErrori(0);
    setSelezionata(null);
    setEsito('in-corso');
  }

  if (esito === 'persa') {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-erroreLieve/10 text-erroreLieve">
          <Skull className="h-7 w-7" />
        </div>
        <p className="font-display text-[19px] font-bold">{bossNome} ha resistito</p>
        <p className="text-[13.5px] text-ardesia">Troppi errori — riprova quando vuoi.</p>
        <Button onClick={riprova}>Riprova</Button>
      </div>
    );
  }

  if (esito === 'vinta' || domande.length === 0) {
    return null; // il chiamante mostra la ricompensa (LevelSummary)
  }

  const domanda = domande[indice];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-[16px] font-bold">{bossNome}</h2>
        <div className="flex items-center gap-1">
          {Array.from({ length: ERRORI_MASSIMI + 1 }).map((_, i) => (
            <span key={i} className={cn('h-2.5 w-2.5 rounded-full', i < ERRORI_MASSIMI + 1 - errori ? 'bg-erroreLieve' : 'bg-nebbia')} />
          ))}
        </div>
      </div>
      <p className="mb-3 text-[13px] text-ardesia">
        Domanda {indice + 1} di {domande.length} · massimo {ERRORI_MASSIMI} errore consentito
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={indice}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.15 }}
          className="flex flex-col gap-3"
        >
          <p className="text-center font-display text-[18px] font-bold leading-snug">{domanda.domanda}</p>
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
                  'min-h-[50px] rounded-md border-[1.5px] px-4 py-2.5 text-left text-[14.5px] font-medium transition-colors',
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
