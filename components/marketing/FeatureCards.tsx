import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { CalendarDays, FileText, HelpCircle, Layers } from 'lucide-react';

const items = [
  {
    icona: CalendarDays,
    titolo: 'Piano 7 Giorni',
    testo: 'Un obiettivo chiaro per ogni giorno, dal primo segnale alla simulazione finale.',
    href: '/prodotto',
  },
  {
    icona: FileText,
    titolo: 'PDF Premium',
    testo: 'La guida completa in un unico documento, organizzata per essere letta in poco tempo.',
    href: '/prodotto',
  },
  {
    icona: HelpCircle,
    titolo: 'Quiz',
    testo: 'Domande in stile esame, con spiegazione ed errore comune per ogni risposta.',
    href: '/demo',
  },
  {
    icona: Layers,
    titolo: 'Flashcard',
    testo: 'Ripasso veloce, pensato per i minuti liberi tra un impegno e l\'altro.',
    href: '/demo',
  },
];

export function FeatureCards() {
  return (
    <section className="container-app py-16 md:py-24" id="metodo">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
        {items.map(({ icona: Icona, titolo, testo, href }) => (
          <Link key={titolo} href={href}>
            <Card hover className="h-full">
              <Icona className="h-7 w-7 text-superato" strokeWidth={2} />
              <h3 className="mt-4 font-display text-[19px] font-bold">{titolo}</h3>
              <p className="mt-2 text-[14px] text-ardesia">{testo}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
