'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faq = [
  {
    domanda: 'In quanto tempo posso davvero prepararmi?',
    risposta:
      'Il piano è costruito su 7 giorni con un obiettivo chiaro ciascuno, ma resta accessibile per sempre: puoi seguirlo al tuo ritmo se hai meno tempo a disposizione.',
  },
  {
    domanda: 'Le domande dei quiz sono uguali a quelle ufficiali?',
    risposta:
      'Le domande sono originali e costruite sugli stessi argomenti e sullo stesso formato dell\'esame ufficiale, per allenarti sul ragionamento e non sulla memoria.',
  },
  {
    domanda: 'Posso usarlo dal telefono?',
    risposta:
      'Sì, l\'intero metodo è pensato prima per lo smartphone: dashboard, quiz e flashcard funzionano allo stesso modo su telefono, tablet e computer.',
  },
  {
    domanda: 'Cosa succede dopo il pagamento?',
    risposta:
      'Accedi subito alla dashboard con tutti i livelli sbloccati in base al pacchetto scelto, oltre al PDF scaricabile.',
  },
  {
    domanda: 'C\'è differenza tra i tre pacchetti?',
    risposta:
      'Sì: variano per contenuti inclusi e numero di simulazioni d\'esame disponibili. I dettagli sono elencati in ogni scheda pacchetto qui sopra.',
  },
];

export function FAQAccordion() {
  const [aperta, setAperta] = useState<number | null>(0);

  return (
    <div className="mx-auto flex max-w-[680px] flex-col divide-y divide-nebbia">
      {faq.map((item, i) => {
        const isAperta = aperta === i;
        return (
          <div key={item.domanda} className="py-5">
            <button
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setAperta(isAperta ? null : i)}
              aria-expanded={isAperta}
            >
              <span className="font-display text-[16px] font-bold md:text-[17px]">{item.domanda}</span>
              <ChevronDown
                className={cn('h-5 w-5 flex-shrink-0 text-ardesia transition-transform duration-200', isAperta && 'rotate-180')}
              />
            </button>
            {isAperta && (
              <p className="mt-3 animate-slide-up text-[15px] leading-relaxed text-ardesia">{item.risposta}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
