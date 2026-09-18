'use client';

import { useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { useCalendarioEsame, type OpzioneGiorni } from '@/lib/examCalendar';

const OPZIONI: OpzioneGiorni[] = [3, 7, 14, 30];

/** Calendario Esame (Fase 2): l'utente sceglie tra quanti giorni sostiene l'esame; missioni e urgenza si adattano. */
export function ExamCalendarCard() {
  const { calendario, pronto, giorniRimanenti, imposta } = useCalendarioEsame();
  const [modificaAperta, setModificaAperta] = useState(false);

  if (!pronto) return null;

  function scegli(giorni: OpzioneGiorni) {
    imposta(giorni);
    setModificaAperta(false);
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-asfalto/[0.06] bg-segnaletica p-4">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-nebbia text-asfalto">
        <CalendarClock className="h-4.5 w-4.5" strokeWidth={2} />
      </span>
      {calendario && !modificaAperta ? (
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-bold text-asfalto">
            {giorniRimanenti === 0 ? "È il giorno dell'esame!" : `${giorniRimanenti} giorni all'esame`}
          </p>
          <button onClick={() => setModificaAperta(true)} className="text-[12px] text-ardesia underline-offset-2 hover:underline">
            Cambia data
          </button>
        </div>
      ) : (
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-[13px] font-medium text-ardesia">Tra quanto è il tuo esame?</p>
          <div className="flex flex-wrap gap-1.5">
            {OPZIONI.map((giorni) => (
              <button
                key={giorni}
                onClick={() => scegli(giorni)}
                className="rounded-full border border-nebbia px-3 py-1 text-[12.5px] font-medium text-asfalto hover:border-asfalto/30"
              >
                {giorni} giorni
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
