'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';
import { ButtonLink, Button } from '@/components/ui/Button';
import { MnemonicTrick } from '@/components/lesson/MnemonicTrick';
import { CommonMistakes } from '@/components/lesson/CommonMistakes';
import { FlashcardDeck } from '@/components/lesson/FlashcardDeck';
import { LessonSection } from '@/components/lesson/LessonSection';
import { SignalGallery } from '@/components/lesson/signals/SignalGallery';
import { livelloDemo } from '@/lib/demo-livello';

const QuizRunner = dynamic(() => import('@/components/lesson/QuizRunner').then((m) => m.QuizRunner), {
  loading: () => <div className="h-[320px] animate-pulse rounded-lg bg-nebbia" />,
});

type Step = 'lezione' | 'segnali' | 'quiz' | 'finale';

/** Fase 3: demo gratuita — livello 1 completo (lezione, segnali, flashcard, quiz), CTA finale di sblocco. Nessun XP salvato. */
export function DemoExperience() {
  const [step, setStep] = useState<Step>('lezione');

  return (
    <div className="container-app max-w-[640px] py-10 md:py-16">
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
              <span className="text-[13px] font-medium text-superato">Demo gratuita · Livello 1</span>
              <h1 className="mt-1 font-display text-[28px] font-bold md:text-[34px]">{livelloDemo.titolo}</h1>
            </div>

            <LessonSection blocchi={livelloDemo.blocchiLezione} />
            <MnemonicTrick testo={livelloDemo.truccoMnemonico} />
            <CommonMistakes errori={livelloDemo.erroriFrequenti} />

            <div>
              <span className="mb-4 block text-[13px] font-medium text-ardesia">Flashcard di ripasso</span>
              <FlashcardDeck carte={livelloDemo.flashcard} />
            </div>

            <div className="fixed inset-x-0 bottom-0 border-t border-nebbia bg-segnaletica/95 p-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0">
              <Button onClick={() => setStep('segnali')} fullWidth className="mx-auto max-w-[640px] gap-1.5 md:w-auto">
                Vedi i Segnali <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'segnali' && (
          <motion.div
            key="segnali"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6 pb-24"
          >
            <div>
              <h2 className="font-display text-[22px] font-bold">Segnali di questo livello</h2>
              <p className="mt-1 text-[14px] text-ardesia">Tocca un segnale per ingrandirlo — nel metodo completo, ogni livello ha la sua galleria.</p>
            </div>
            <SignalGallery segnali={livelloDemo.segnali} />
            <div className="fixed inset-x-0 bottom-0 border-t border-nebbia bg-segnaletica/95 p-4 backdrop-blur-md md:static md:border-0 md:bg-transparent md:p-0">
              <Button onClick={() => setStep('quiz')} fullWidth className="mx-auto max-w-[640px] md:w-auto">
                Inizia Quiz Demo
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            <QuizRunner
              domande={livelloDemo.quiz}
              onRispostaCorretta={() => {}}
              onCompletato={() => setStep('finale')}
              numerazioneTotale={livelloDemo.quiz.length}
            />
          </motion.div>
        )}

        {step === 'finale' && (
          <motion.div
            key="finale"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-5 py-16 text-center"
          >
            <div className="flex h-16 w-16 animate-pop-in items-center justify-center rounded-full bg-asfalto text-segnaletica">
              <Lock className="h-7 w-7" strokeWidth={2} />
            </div>
            <h2 className="font-display text-[26px] font-bold">Ottimo inizio.</h2>
            <p className="max-w-[380px] text-[15px] text-ardesia">
              Nel metodo completo ogni livello aggiunge anche Memory dedicato, Speed Challenge e Boss Fight. Altri 6 livelli ti aspettano.
            </p>
            <ButtonLink href="/prodotto">
              <Sparkles className="mr-2 h-4 w-4" /> Sblocca il Percorso Completo
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
