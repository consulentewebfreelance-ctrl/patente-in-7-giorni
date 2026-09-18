'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button, ButtonLink } from '@/components/ui/Button';
import { MnemonicTrick } from '@/components/lesson/MnemonicTrick';
import { CommonMistakes } from '@/components/lesson/CommonMistakes';
import { FlashcardDeck } from '@/components/lesson/FlashcardDeck';
import { LessonSection } from '@/components/lesson/LessonSection';
import { SignalGallery } from '@/components/lesson/signals/SignalGallery';
import { LevelIntro } from './LevelIntro';
import { LevelSummary } from './LevelSummary';
import { MemoryGamePlay } from '@/components/games/memory/MemoryGamePlay';
import { SpeedChallengePlay } from '@/components/games/speed/SpeedChallengePlay';
import { BossFightPlay } from '@/components/games/boss/BossFightPlay';
import { useProgresso } from '@/lib/xp';
import { useLivelloProtetto } from '@/lib/access';
import { useCheckpoint, type FaseLivello } from '@/lib/checkpoints';import { useRecordGiochi } from '@/lib/gameRecords';
import { registraLivelloGiocato } from '@/lib/lastPlayed';
import { registraProgressoMissione } from '@/lib/missions';
import { calcolaStelle } from '@/lib/stars';
import { livelli } from '@/lib/livelli-data';

// Il quiz spiegato riusa lo stesso QuizRunner del resto del sito (feedback,
// spiegazione ed errore comune dopo ogni risposta): caricato solo quando
// serve, per non appesantire il bundle iniziale della pagina.
const QuizRunner = dynamic(() => import('@/components/lesson/QuizRunner').then((m) => m.QuizRunner), {
  loading: () => <div className="h-[320px] animate-pulse rounded-lg bg-nebbia" />,
});

type Step = 'intro' | 'lezione' | 'segnali' | 'flashcard' | 'memory' | 'speed' | 'quiz' | 'boss' | 'fine';

const STEP_DA_FASE: Record<FaseLivello, Step> = {
  lezione: 'lezione',
  segnali: 'segnali',
  flashcard: 'flashcard',
  memory: 'memory',
  speed: 'speed',
  quiz: 'quiz',
  boss: 'boss',
  completato: 'fine',
};

function LivelloSkeleton() {
  return (
    <div>
      <div className="h-[64px] animate-pulse bg-nebbia" />
      <div className="container-app max-w-[640px] py-8 md:py-12">
        <div className="flex flex-col gap-4">
          <div className="h-4 w-24 animate-pulse rounded bg-nebbia" />
          <div className="h-8 w-2/3 animate-pulse rounded bg-nebbia" />
          <div className="h-24 animate-pulse rounded-lg bg-nebbia" />
          <div className="h-24 animate-pulse rounded-lg bg-nebbia" />
        </div>
      </div>
    </div>
  );
}

/**
 * Fase 3 (Masterplan 2.0) — percorso completo del livello: Introduzione,
 * Lezione a blocchi, Segnali interattivi, Flashcard, Memory dedicato, Speed
 * Challenge dedicata, Quiz spiegati, Boss Fight, Ricompensa finale — in
 * quest'ordine fisso. Ogni passaggio salva un checkpoint: se l'utente esce a
 * metà, la prossima volta riprende esattamente da lì.
 */
export function LivelloClient({ id, prossimoLivelloId }: { id: string; prossimoLivelloId?: string }) {
  const { stato: statoAccesso, livello } = useLivelloProtetto(id);
  const { progresso, pronto, registraRispostaCorretta, completaLivello, aggiungiXPBonus } = useProgresso();
  const { fase, segnaFase, azzera } = useCheckpoint(id);
  const { registraMemory, registraSpeed, registraBossVinta } = useRecordGiochi();

  const [step, setStep] = useState<Step>('intro');
  const [tempoInizio] = useState(() => Date.now());
  const [corretteQuiz, setCorretteQuiz] = useState(0);
  const [xpGuadagnatiLivello, setXpGuadagnatiLivello] = useState(0);
  const [stelleFinali, setStelleFinali] = useState(0);
  const [memoryFatto, setMemoryFatto] = useState<{ tempo: number; mosse: number } | null>(null);
  const [speedFatto, setSpeedFatto] = useState<{ corrette: number; combo: number } | null>(null);

  useEffect(() => {
    registraLivelloGiocato(id);
  }, [id]);

  if (statoAccesso === 'upgrade-richiesto') {
    return (
      <div className="container-app flex min-h-[60vh] flex-col items-center justify-center gap-5 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-segnale/10 text-segnale">
          <Sparkles className="h-8 w-8" strokeWidth={2} />
        </div>
        <p className="font-display text-[20px] font-bold">Questo livello è incluso da Premium in su</p>
        <p className="max-w-[360px] text-[14px] text-ardesia">
          Passa a Premium per sbloccarlo insieme al resto della banca quiz.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <ButtonLink href="/prodotto">Sblocca Premium</ButtonLink>
          <ButtonLink href="/dashboard" variante="secondario">Torna alla Dashboard</ButtonLink>
        </div>
      </div>
    );
  }
  if (statoAccesso === 'errore') {
    return (
      <div className="container-app flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="font-display text-[18px] font-bold">Non riusciamo a caricare questo livello</p>
        <p className="max-w-[360px] text-[14px] text-ardesia">Riprova tra qualche istante o torna alla dashboard.</p>
        <ButtonLink href="/dashboard">Torna alla Dashboard</ButtonLink>
      </div>
    );
  }
  if (statoAccesso !== 'pronto' || !livello || !pronto) {
    return <LivelloSkeleton />;
  }

  const percentuale =
    (Object.values(progresso.livelli).filter((l) => l.stato === 'completato').length / Object.keys(progresso.livelli).length) * 100;

  function vai(nuovoStep: Step, faseCheckpoint?: FaseLivello) {
    setStep(nuovoStep);
    if (faseCheckpoint) segnaFase(faseCheckpoint);
  }

  function onFineLezione() {
    aggiungiXPBonus(50);
    setXpGuadagnatiLivello((x) => x + 50);
    vai('segnali', 'segnali');
  }
  function onFineSegnali() {
    vai('flashcard', 'flashcard');
  }
  function onFineFlashcard() {
    aggiungiXPBonus(20);
    setXpGuadagnatiLivello((x) => x + 20);
    vai('memory', 'memory');
  }
  function onMemoryCompletato(tempo: number, mosse: number) {
    setMemoryFatto({ tempo, mosse });
    registraMemory(tempo, mosse);
    registraProgressoMissione('memory');
  }
  function onFineMemory() {
    aggiungiXPBonus(20);
    setXpGuadagnatiLivello((x) => x + 20);
    vai('speed', 'speed');
  }
  function onSpeedCompletato(corrette: number, combo: number) {
    setSpeedFatto({ corrette, combo });
    registraSpeed(corrette, combo);
    registraProgressoMissione('speed');
  }
  function onFineSpeed() {
    aggiungiXPBonus(20);
    setXpGuadagnatiLivello((x) => x + 20);
    vai('quiz', 'quiz');
  }
  function onQuizCompletato() {
    aggiungiXPBonus(40);
    setXpGuadagnatiLivello((x) => x + 40 + corretteQuiz * 10);
    vai('boss', 'boss');
  }
  function onBossEsito(vinta: boolean, errori: number) {
    if (!vinta) return; // BossFightPlay gestisce da sé il "riprova"
    aggiungiXPBonus(100);
    registraBossVinta(errori === 0);
    registraProgressoMissione('boss');

    const secondiImpiegati = Math.round((Date.now() - tempoInizio) / 1000);
    const stelle = calcolaStelle(corretteQuiz, livello.quiz.length, secondiImpiegati, 12);
    setStelleFinali(stelle);
    setXpGuadagnatiLivello((x) => x + 100);
    completaLivello(id, prossimoLivelloId, stelle);
    segnaFase('completato');
    setStep('fine');
  }

  const secondiTotali = Math.round((Date.now() - tempoInizio) / 1000);
  const prossimoTitolo = prossimoLivelloId ? livelli.find((l) => l.id === prossimoLivelloId)?.titolo : undefined;

  return (
    <div>
      <AppHeader xpTotale={progresso.xpTotale} percentualeCompletamento={percentuale} />

      <div className="container-app max-w-[640px] py-8 md:py-12">
        <Link href="/dashboard" className="mb-6 flex items-center gap-2 text-[14px] font-medium text-ardesia hover:text-asfalto">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>

        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div key="intro" exit={{ opacity: 0 }}>
              <LevelIntro
                numero={livello.numero}
                titolo={livello.titolo}
                icona={livello.icona}
                testoMotivazionale={livello.testoMotivazionale}
                tempoStimatoMinuti={livello.tempoStimatoMinuti}
                xpOttenibili={livello.xpOttenibili}
                badge={livello.badge}
                checkpointFase={fase}
                onInizia={() => {
                  azzera();
                  vai('lezione', 'lezione');
                }}
                onContinua={() => fase && vai(STEP_DA_FASE[fase])}
              />
            </motion.div>
          )}

          {step === 'lezione' && (
            <motion.div key="lezione" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="flex flex-col gap-6 pb-24">
              <h1 className="font-display text-[22px] font-bold">Lezione</h1>
              <LessonSection blocchi={livello.blocchiLezione} />
              <MnemonicTrick testo={livello.truccoMnemonico} />
              <CommonMistakes errori={livello.erroriFrequenti} />
              <div className="fixed inset-x-0 bottom-0 border-t border-nebbia bg-segnaletica/95 p-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0">
                <Button onClick={onFineLezione} fullWidth className="mx-auto max-w-[640px] gap-1.5 md:w-auto">
                  Continua ai Segnali <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'segnali' && (
            <motion.div key="segnali" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="flex flex-col gap-6 pb-24">
              <div>
                <h1 className="font-display text-[22px] font-bold">Segnali di questo livello</h1>
                <p className="mt-1 text-[14px] text-ardesia">Tocca un segnale per ingrandirlo e leggere la spiegazione completa.</p>
              </div>
              <SignalGallery segnali={livello.segnali} />
              <div className="fixed inset-x-0 bottom-0 border-t border-nebbia bg-segnaletica/95 p-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0">
                <Button onClick={onFineSegnali} fullWidth className="mx-auto max-w-[640px] gap-1.5 md:w-auto">
                  Continua alle Flashcard <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'flashcard' && (
            <motion.div key="flashcard" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="flex flex-col gap-6 pb-24">
              <h1 className="font-display text-[22px] font-bold">Flashcard</h1>
              <FlashcardDeck carte={livello.flashcard} />
              <div className="fixed inset-x-0 bottom-0 border-t border-nebbia bg-segnaletica/95 p-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0">
                <Button onClick={onFineFlashcard} fullWidth className="mx-auto max-w-[640px] gap-1.5 md:w-auto">
                  Continua al Memory <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'memory' && (
            <motion.div key="memory" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="flex flex-col gap-6 pb-24">
              <h1 className="font-display text-[22px] font-bold">Memory del livello</h1>
              <MemoryGamePlay coppie={livello.flashcard.map((f, i) => ({ id: `${id}-${i}`, fronte: f.fronte, retro: f.retro }))} onCompletato={onMemoryCompletato} />
              {memoryFatto && (
                <div className="fixed inset-x-0 bottom-0 border-t border-nebbia bg-segnaletica/95 p-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0">
                  <Button onClick={onFineMemory} fullWidth className="mx-auto max-w-[640px] gap-1.5 md:w-auto">
                    Continua alla Speed Challenge <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {step === 'speed' && (
            <motion.div key="speed" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="flex flex-col gap-6 pb-24">
              <h1 className="font-display text-[22px] font-bold">Speed Challenge del livello</h1>
              <SpeedChallengePlay domande={livello.quiz.map((q, i) => ({ ...q, id: `${id}-${i}` }))} onCompletato={onSpeedCompletato} />
              {speedFatto && (
                <div className="fixed inset-x-0 bottom-0 border-t border-nebbia bg-segnaletica/95 p-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0">
                  <Button onClick={onFineSpeed} fullWidth className="mx-auto max-w-[640px] gap-1.5 md:w-auto">
                    Continua al Quiz <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="py-4">
              <QuizRunner
                domande={livello.quiz}
                onRispostaCorretta={(i) => {
                  registraRispostaCorretta(id, i);
                  setCorretteQuiz((c) => c + 1);
                }}
                onCompletato={onQuizCompletato}
              />
            </motion.div>
          )}

          {step === 'boss' && (
            <motion.div key="boss" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <BossFightPlay quiz={livello.quiz} bossNome={livello.bossNome} onEsito={onBossEsito} />
            </motion.div>
          )}

          {step === 'fine' && (
            <motion.div key="fine">
              <LevelSummary
                xpGuadagnati={xpGuadagnatiLivello}
                badge={livello.badge}
                percentuale={livello.quiz.length > 0 ? (corretteQuiz / livello.quiz.length) * 100 : 100}
                tempoImpiegatoSecondi={secondiTotali}
                stelle={stelleFinali}
                livelloId={id}
                prossimoLivelloTitolo={prossimoTitolo}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
