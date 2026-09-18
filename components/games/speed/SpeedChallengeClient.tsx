'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Gauge, RotateCcw, Trophy, Volume2, VolumeX } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Confetti } from '@/components/games/shared/Confetti';
import { useRichiedeAcquisto, useSpeedQuestions } from '@/lib/access';
import { useProgresso } from '@/lib/xp';
import { useRecordGiochi } from '@/lib/gameRecords';
import { useSuoni } from '@/lib/sounds';
import { registraProgressoMissione } from '@/lib/missions';
import { cn } from '@/lib/utils';

const DURATA_SECONDI = 60;

export function SpeedChallengeClient() {
  const { pronto, tier } = useRichiedeAcquisto();
  const { progresso, aggiungiXPBonus } = useProgresso();
  const { play, toggle, attivi } = useSuoni();
  const { record, registraSpeed } = useRecordGiochi();
  const { stato: statoDomande, domande } = useSpeedQuestions();

  const [iniziata, setIniziata] = useState(false);
  const [indice, setIndice] = useState(0);
  const [corrette, setCorrette] = useState(0);
  const [combo, setCombo] = useState(0);
  const [miglioreCombo, setMiglioreCombo] = useState(0);
  const [tempoRimanente, setTempoRimanente] = useState(DURATA_SECONDI);
  const [selezionata, setSelezionata] = useState<number | null>(null);
  const [finita, setFinita] = useState(false);
  const [xpGuadagnato, setXpGuadagnato] = useState(0);
  const registrataRef = useRef(false);

  useEffect(() => {
    if (!iniziata || finita) return;
    if (tempoRimanente <= 0) {
      setFinita(true);
      return;
    }
    const t = setTimeout(() => setTempoRimanente((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [iniziata, finita, tempoRimanente]);

  useEffect(() => {
    if (finita && !registrataRef.current) {
      registrataRef.current = true;
      registraSpeed(corrette, miglioreCombo);
      registraProgressoMissione('speed');
      const xp = corrette * 10;
      setXpGuadagnato(xp);
      aggiungiXPBonus(xp);
      play('vittoria');
    }
  }, [finita, corrette, miglioreCombo, registraSpeed, aggiungiXPBonus, play]);

  if (!pronto || !tier) {
    return <div className="h-[64px] animate-pulse bg-nebbia" />;
  }

  function rispondi(i: number) {
    if (selezionata !== null || finita) return;
    const domanda = domande[indice];
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
      if (indice + 1 >= domande.length) {
        setFinita(true);
      } else {
        setIndice((n) => n + 1);
      }
    }, 350);
  }

  function ricomincia() {
    setIniziata(false);
    setIndice(0);
    setCorrette(0);
    setCombo(0);
    setMiglioreCombo(0);
    setTempoRimanente(DURATA_SECONDI);
    setSelezionata(null);
    setFinita(false);
    setXpGuadagnato(0);
    registrataRef.current = false;
  }

  const domanda = domande[indice];

  return (
    <div>
      <AppHeader xpTotale={progresso.xpTotale} percentualeCompletamento={0} />
      <div className="container-app flex max-w-[560px] flex-col gap-6 py-8 md:py-12">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[13px] font-medium text-ardesia">Mini-gioco</span>
            <h1 className="mt-1 flex items-center gap-2 font-display text-[24px] font-bold">
              <Gauge className="h-6 w-6 text-superato" /> Speed Challenge
            </h1>
          </div>
          <button
            onClick={toggle}
            aria-label={attivi ? 'Disattiva i suoni' : 'Attiva i suoni'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-nebbia text-ardesia hover:bg-nebbia"
          >
            {attivi ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>

        {!iniziata && statoDomande === 'carica' && <div className="h-40 animate-pulse rounded-lg bg-nebbia" />}

        {!iniziata && statoDomande === 'pronto' && (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-asfalto/[0.06] p-8 text-center">
            <p className="text-[15px] text-ardesia">
              {domande.length} domande, {DURATA_SECONDI} secondi. Rispondi il più velocemente possibile: ogni combo aumenta il punteggio.
            </p>
            {record.speedMigliorPunteggio > 0 && (
              <p className="text-[13px] text-ardesia">
                Il tuo record: <strong className="text-asfalto">{record.speedMigliorPunteggio}</strong> corrette, combo massima{' '}
                <strong className="text-asfalto">{record.speedMiglioreCombo}</strong>
              </p>
            )}
            <Button onClick={() => setIniziata(true)}>Via!</Button>
          </div>
        )}

        {iniziata && !finita && domanda && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span
                className={cn(
                  'font-display text-[28px] font-bold tabular-nums',
                  tempoRimanente <= 10 ? 'text-erroreLieve' : 'text-asfalto'
                )}
              >
                {tempoRimanente}s
              </span>
              <div className="flex items-center gap-1.5 text-[14px] font-bold text-superato">
                <Flame className="h-4 w-4" /> Combo {combo}
              </div>
              <span className="text-[13px] text-ardesia">
                {indice + 1}/{domande.length}
              </span>
            </div>

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
          </div>
        )}

        {finita && (
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative flex flex-col items-center gap-4 py-8 text-center">
            <Confetti attivo={corrette > 0} />
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-superato/10 text-superato">
              <Trophy className="h-8 w-8" />
            </div>
            <p className="font-display text-[24px] font-bold">Tempo scaduto!</p>
            <p className="text-[15px] text-ardesia">
              {corrette} corrette · combo massima {miglioreCombo} · +{xpGuadagnato} XP
            </p>
            {corrette >= record.speedMigliorPunteggio && corrette > 0 && (
              <span className="rounded-full bg-superato/10 px-3 py-1 text-[13px] font-bold text-superato">Nuovo record!</span>
            )}
            <div className="flex gap-2.5">
              <Button onClick={ricomincia} variante="secondario" className="gap-1.5">
                <RotateCcw className="h-4 w-4" /> Rigioca
              </Button>
              <ButtonLink href="/dashboard">Torna alla Dashboard</ButtonLink>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
