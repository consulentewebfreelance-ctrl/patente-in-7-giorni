import { SignalCard } from './SignalCard';
import type { Segnale } from '@/lib/livelli-content-shared';

/** Galleria dei segnali del livello (Fase 3). */
export function SignalGallery({ segnali }: { segnali: Segnale[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {segnali.map((s) => (
        <SignalCard key={s.id} segnale={s} />
      ))}
    </div>
  );
}
