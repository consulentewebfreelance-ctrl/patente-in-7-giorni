import { PlayCircle } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { livelli } from '@/lib/livelli-data';

/** Fase 4, §4: sezione dedicata "Prova gratis il Livello 1", per aumentare la conversione verso la demo. */
export function FreeLevelBand() {
  const livello1 = livelli[0];
  return (
    <section className="border-y border-nebbia bg-nebbia py-14 md:py-20">
      <div className="container-app flex flex-col items-center gap-5 text-center">
        <PlayCircle className="h-8 w-8 text-superato" strokeWidth={1.75} aria-hidden />
        <h2 className="max-w-[440px] font-display text-[26px] font-bold leading-tight md:text-[34px]">
          Prova gratis il Livello 1
        </h2>
        <p className="max-w-[440px] text-[15px] text-ardesia">
          Lezione, flashcard e {livello1.quiz.length} domande in stile esame su &ldquo;{livello1.titolo}&rdquo; — senza carta di credito, senza impegno.
        </p>
        <ButtonLink href="/demo" variante="secondario" className="bg-segnaletica">
          Inizia la Demo Gratuita
        </ButtonLink>
      </div>
    </section>
  );
}
