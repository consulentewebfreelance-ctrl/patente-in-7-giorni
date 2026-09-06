import { Compass, Target, Zap } from 'lucide-react';

const blocchi = [
  {
    icona: Target,
    titolo: 'Solo quello che serve',
    testo: 'Niente capitoli infiniti: ogni lezione copre esattamente ciò che serve per rispondere al quiz.',
  },
  {
    icona: Zap,
    titolo: 'Fatto per la tua attenzione',
    testo: 'Lezioni brevi, flashcard veloci, quiz immediati — pensati per chi ha pochi minuti alla volta.',
  },
  {
    icona: Compass,
    titolo: 'Un percorso, non un libro',
    testo: 'Sette tappe in ordine logico: ogni giorno sblocca il successivo, senza doverti orientare da solo.',
  },
];

export function WhyItWorks() {
  return (
    <section className="bg-nebbia py-16 md:py-24">
      <div className="container-app">
        <h2 className="max-w-[520px] font-display text-[28px] font-bold leading-tight md:text-[40px]">
          Perché funziona
        </h2>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3 md:gap-10">
          {blocchi.map(({ icona: Icona, titolo, testo }) => (
            <div key={titolo}>
              <Icona className="h-6 w-6 text-asfalto" strokeWidth={2} />
              <h3 className="mt-4 font-display text-[18px] font-bold">{titolo}</h3>
              <p className="mt-2 text-[15px] text-ardesia">{testo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
