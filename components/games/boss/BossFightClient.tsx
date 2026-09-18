'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, Sparkles, Swords, X } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Confetti } from '@/components/games/shared/Confetti';
import { useLivelloProtetto } from '@/lib/access';
import type { Domanda } from '@/lib/livelli-data';
import { useProgresso } from '@/lib/xp';
import { useRecordGiochi } from '@/lib/gameRecords';
import { useSuoni } from '@/lib/sounds';
import { registraProgressoMissione } from '@/lib/missions';
import { cn } from '@/lib/utils';

const DOMANDE_BOSS = 10;
const ERRORI_MASSIMI = 1;

function mescola<T>(arr: T[]): T[] {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

export function BossFightClient({ id }: { id: string }) {
  const { stato, livello, tier } = useLivelloProtetto(id);
  const { progresso, aggiungiXPBonus } = useProgresso();
  const { play } = useSuoni();
  const { registraBossVinta } = useRecordGiochi();

  const [domande, setDomande] = useState<Domanda[]>([]);
  const [indice, setIndice] = useState(0);
  const [errori, setErrori] = useState(0);
  const [selezionata, setSelezionata] = useState<number | null>(null);
  const [esito, setEsito] = useState<'in-corso' | 'vinta' | 'persa'>('in-corso');
  const [registrato, setRegistrato] = useState(false);

  useEffect(() => {
    if (stato !== 'pronto' || !livello || livello.quiz.length === 0) return;
    const quizDelLivello: Domanda[] = livello.quiz;
    const pool: Domanda[] = [];
    while (pool.length < DOMANDE_BOSS) {
      pool.push(...mescola(quizDelLivello));
    }
    setDomande(pool.slice(0, DOMANDE_BOSS));
  }, [stato, livello]);

  if (stato === 'upgrade-richiesto') {
    return (
      <div className="container-app flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
        <Sparkles className="h-8 w-8 text-segnale" />
        <p className="font-display text-[20px] font-bold">Questa Boss Fight è inclusa da Premium in su</p>
        <ButtonLink href="/prodotto">Sblocca Premium</ButtonLink>
      </div>
    );
  }
  if (stato !== 'pronto' || !livello || domande.length === 0 || !tier) {
    return <div className="h-[64px] animate-pulse bg-nebbia" />;
  }

  function rispondi(i: number) {
    if (selezionata !== null) return;
    const domanda = domande[indice];
    setSelezionata(i);
    const corretta = i === domanda.corretta;

    if (corretta) {
      play('corretto');
    } else {
      play('errore');
    }

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
    }, 500);
  }

  useEffect(() => {
    if (esito === 'vinta' && !registrato) {
      setRegistrato(true);
      registraBossVinta(errori === 0);
      registraProgressoMissione('boss');
      aggiungiXPBonus(100);
      play('vittoria');
    }
  }, [esito, registrato, errori, registraBossVinta, aggiungiXPBonus, play]);

  function riprova() {
    setIndice(0);
    setErrori(0);
    setSelezionata(null);
    setEsito('in-corso');
    setRegistrato(false);
    if (livello) {
      const quizDelLivello: Domanda[] = livello.quiz;
      const pool: Domanda[] = [];
      while (pool.length < DOMANDE_BOSS) pool.push(...mescola(quizDelLivello));
      setDomande(pool.slice(0, DOMANDE_BOSS));
    }
  }

  const domanda = domande[indice];

  return (
    <div>
      <AppHeader xpTotale={progresso.xpTotale} percentualeCompletamento={0} />
      <div className="container-app flex max-w-[560px] flex-col gap-6 py-8 md:py-12">
        {esito === 'in-corso' && (
          <>
            <div className="flex items-center justify-between">
              <h1 className="flex items-center gap-2 font-display text-[22px] font-bold">
                <Swords className="h-6 w-6 text-erroreLieve" /> Boss Fight — {livello.titolo}
              </h1>
              <div className="flex items-center gap-1">
                {Array.from({ length: ERRORI_MASSIMI + 1 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn('h-2.5 w-2.5 rounded-full', i < ERRORI_MASSIMI + 1 - errori ? 'bg-erroreLieve' : 'bg-nebbia')}
                  />
                ))}
              </div>
            </div>
            <p className="text-[13px] text-ardesia">
              Domanda {indice + 1} di {domande.length} · massimo {ERRORI_MASSIMI} errore consentito
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={indice}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-3"
              >
                <p className="text-center font-display text-[19px] font-bold leading-snug">{domanda.domanda}</p>
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
                        'min-h-[52px] rounded-md border-[1.5px] px-4 py-3 text-left text-[15px] font-medium transition-colors',
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
          </>
        )}

        {esito === 'vinta' && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative flex flex-col items-center gap-4 py-10 text-center">
            <Confetti attivo />
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-superato/10 text-superato">
              <Sparkles className="h-8 w-8" />
            </div>
            <p className="font-display text-[24px] font-bold">Boss sconfitto!</p>
            <p className="text-[15px] text-ardesia">
              {errori === 0 ? 'Nessun errore — prestazione perfetta.' : `${errori} errore.`} +100 XP
            </p>
            <div className="flex gap-2.5">
              <Button onClick={riprova} variante="secondario">Rigioca</Button>
              <ButtonLink href="/dashboard">Torna alla Dashboard</ButtonLink>
            </div>
          </motion.div>
        )}

        {esito === 'persa' && (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-erroreLieve/10 text-erroreLieve">
              <Skull className="h-8 w-8" />
            </div>
            <p className="font-display text-[22px] font-bold">Il boss ha resistito</p>
            <p className="text-[14px] text-ardesia">Troppi errori — ripassa lezione ed errori comuni e riprova quando vuoi.</p>
            <div className="flex gap-2.5">
              <Button onClick={riprova}>Riprova</Button>
              <ButtonLink href={`/dashboard/livello/${id}`} variante="secondario">
                <X className="mr-1 h-4 w-4" /> Torna al livello
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
