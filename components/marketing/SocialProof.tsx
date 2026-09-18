import { Compass, Gamepad2, Timer } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const voci: { Icona: LucideIcon; titolo: string; testo: string }[] = [
  {
    Icona: Compass,
    titolo: 'Metodo guidato',
    testo: 'Sette livelli in ordine logico: sai sempre cosa fare oggi, senza doverti organizzare da solo.',
  },
  {
    Icona: Gamepad2,
    titolo: 'Esperienza gamificata',
    testo: 'XP, streak e badge trasformano il ripasso in un percorso che vuoi completare, non in un compito.',
  },
  {
    Icona: Timer,
    titolo: 'Studio veloce',
    testo: 'Lezioni brevi e quiz immediati, pensati per i minuti liberi tra un impegno e l\'altro.',
  },
];

/** Fase 8 del Masterplan 2.0 — 1.5: tre card descrittive, nessuna recensione inventata. */
export function SocialProof() {
  return (
    <section className="container-app py-14 md:py-20">
      <div className="grid gap-6 md:grid-cols-3">
        {voci.map(({ Icona, titolo, testo }) => (
          <div key={titolo} className="rounded-lg border border-asfalto/[0.06] bg-segnaletica p-6 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-superato/10 text-superato">
              <Icona className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="mt-4 font-display text-[17px] font-bold">{titolo}</h3>
            <p className="mt-2 text-[14px] text-ardesia">{testo}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
