'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PartyPopper } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button, ButtonLink } from '@/components/ui/Button';
import { MnemonicTrick } from '@/components/lesson/MnemonicTrick';
import { CommonMistakes } from '@/components/lesson/CommonMistakes';
import { FlashcardDeck } from '@/components/lesson/FlashcardDeck';
import { useProgresso } from '@/lib/xp';
import { useLivelloProtetto } from '@/lib/access';

// Caricato solo quando l'utente clicca "Inizia Quiz" (Fase 4 §8: riduce il bundle iniziale).
const QuizRunner = dynamic(() => import('@/components/lesson/QuizRunner').then((m) => m.QuizRunner), {
  loading: () => <div className="h-[320px] animate-pulse rounded-lg bg-nebbia" />,
});

type Step = 'lezione' | 'quiz' | 'completato';

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
 * Fase 2/3, Schermata 4 + 5 — Fase 6: missione completa (lezione -> quiz).
 * Il contenuto vero (lezione, trucco, errori, flashcard, quiz) non è più
 * incluso staticamente nella pagina: viene richiesto a
 * netlify/functions/get-livello-content.ts solo dopo aver verificato
 * l'acquisto (vedi lib/access.ts). Se l'accesso non è valido, l'hook
 * reindirizza automaticamente alla home.
 */
export function LivelloClient({ id, prossimoLivelloId }: { id: string; prossimoLivelloId?: string }) {
  const { stato: statoAccesso, livello } = useLivelloProtetto(id);
  const { progresso, pronto, registraRispostaCorretta, completaLivello } = useProgresso();
  const [step, setStep] = useState<Step>('lezione');

  const xpTotale = progresso.xpTotale;
  const percentuale = pronto
    ? (Object.values(progresso.livelli).filter((l) => l.stato === 'completato').length / Object.keys(progresso.livelli).length) * 100
    : 0;

  if (statoAccesso !== 'pronto' || !livello) {
    if (statoAccesso === 'errore') {
      return (
        <div className="container-app flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
          <p className="font-display text-[18px] font-bold">Non riusciamo a caricare questo livello</p>
          <p className="max-w-[360px] text-[14px] text-ardesia">Riprova tra qualche istante o torna alla dashboard.</p>
          <ButtonLink href="/dashboard">Torna alla Dashboard</ButtonLink>
        </div>
      );
    }
    return <LivelloSkeleton />;
  }

  const handleCompletaQuiz = () => {
    completaLivello(id, prossimoLivelloId);
    setStep('completato');
  };

  return (
    <div>
      <AppHeader xpTotale={xpTotale} percentualeCompletamento={percentuale} />

      <div className="container-app max-w-[640px] py-8 md:py-12">
        <Link href="/dashboard" className="mb-6 flex items-center gap-2 text-[14px] font-medium text-ardesia hover:text-asfalto">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>

        <AnimatePresence mode="wait">
          {step === 'lezione' && (
            <motion.div
              key="lezione"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-8 pb-24"
            >
              <div>
                <span className="text-[13px] font-medium text-ardesia">Livello {livello.numero}</span>
                <h1 className="mt-1 font-display text-[26px] font-bold md:text-[30px]">{livello.titolo}</h1>
              </div>

              <div>
                <span className="text-[13px] font-medium text-ardesia">Lezione</span>
                <p className="mt-2 text-[16px] leading-relaxed text-asfalto">{livello.lezione}</p>
              </div>

              <MnemonicTrick testo={livello.truccoMnemonico} />
              <CommonMistakes errori={livello.erroriFrequenti} />

              <div>
                <span className="mb-4 block text-[13px] font-medium text-ardesia">Flashcard di ripasso</span>
                <FlashcardDeck carte={livello.flashcard} />
              </div>

              <div className="fixed inset-x-0 bottom-0 border-t border-nebbia bg-segnaletica/95 p-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0">
                <Button onClick={() => setStep('quiz')} fullWidth className="mx-auto max-w-[640px] md:w-auto">
                  Inizia Quiz
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="py-4"
            >
              <QuizRunner
                domande={livello.quiz}
                onRispostaCorretta={(i) => registraRispostaCorretta(id, i)}
                onCompletato={handleCompletaQuiz}
              />
            </motion.div>
          )}

          {step === 'completato' && (
            <motion.div
              key="completato"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-5 py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -12, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-superato/10 text-superato"
              >
                <PartyPopper className="h-8 w-8" strokeWidth={2} />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.25 }}
                className="font-display text-[24px] font-bold"
              >
                Livello completato
              </motion.h2>
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.25 }}
                className="rounded-full bg-superato/10 px-4 py-1.5 font-display text-[15px] font-bold text-superato"
              >
                +50 XP
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.25 }}
                className="max-w-[360px] text-[15px] text-ardesia"
              >
                Il livello successivo è ora sbloccato nella tua dashboard.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.25 }}>
                <ButtonLink href="/dashboard">Torna alla Dashboard</ButtonLink>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
